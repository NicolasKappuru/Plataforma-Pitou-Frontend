import crearBloqueCodigo from "../BloqueCodigo/services/service_crear_bloque_codigo";
import actualizarBloqueCodigo from "../BloqueCodigo/services/service_actualizar_bloque_codigo";
import eliminarBloqueCodigo from "../BloqueCodigo/services/service_eliminar_bloque_codigo";
import crearFormula from "../Formula/services/service_crear_formula";
import actualizarFormula from "../Formula/services/service_actualizar_formula";
import eliminarFormula from "../Formula/services/service_eliminar_formula";
import crearImagen from "../Imagen/services/service_crear_imagen";
import actualizarImagen from "../Imagen/services/service_actualizar_imagen";
import eliminarImagen from "../Imagen/services/service_eliminar_imagen";

const tipos = ["imagen", "bloque_codigo", "formula"];

const tieneId = (plugin) => plugin?.id !== undefined && !String(plugin.id).startsWith("nuevo-");

const sinCamposGestionados = (plugin) => {
    const copia = { ...plugin };
    delete copia.posicion;
    delete copia.tipo;
    delete copia.tipo_plugin;
    delete copia.concepto;
    delete copia.url_imagen;
    return copia;
};

const prepararPluginJson = (plugin, concepto) => {
    const copia = { ...plugin, concepto };
    delete copia.id;
    delete copia.posicion;
    delete copia.tipo;
    delete copia.tipo_plugin;
    return copia;
};

const prepararActualizacionJson = (plugin) => {
    const copia = { ...plugin };
    delete copia.posicion;
    delete copia.tipo;
    delete copia.tipo_plugin;
    return copia;
};

const valorComparable = (valor) => JSON.stringify(valor ?? "");

const pluginCambio = (actual, inicial) => {
    if (!actual || !inicial) return true;

    const campos = [
        "nombre_plugin",
        "descripcion_plugin",
        "url_imagen",
        "contenido_codigo",
        "lenguaje_programacion",
        "expresion_formula",
    ];

    return campos.some((campo) => valorComparable(actual[campo]) !== valorComparable(inicial[campo]));
};

const dataUrlAArchivo = async (url, indice) => {
    if (!url?.startsWith("data:")) {
        throw new Error(`La imagen nueva ${indice + 1} no tiene un archivo válido`);
    }

    const respuesta = await fetch(url);
    const blob = await respuesta.blob();
    const extension = blob.type.split("/")[1] || "png";
    return new File([blob], `plugin-${indice + 1}.${extension}`, { type: blob.type });
};

const guardarImagenes = async (concepto, actuales, iniciales) => {
    const nuevas = actuales.filter((plugin) => !tieneId(plugin));
    if (nuevas.length) {
        console.info("[Plugins] POST imágenes", { concepto, cantidad: nuevas.length });
        const imagenes = await Promise.all(nuevas.map((plugin, indice) => dataUrlAArchivo(plugin.url_imagen, indice)));
        await crearImagen({
            concepto,
            imagenes,
            nombres: nuevas.map((plugin) => plugin.nombre_plugin),
            descripciones: nuevas.map((plugin) => plugin.descripcion_plugin),
        });
    }

    const actualizadas = actuales
        .filter(tieneId)
        .filter((plugin) => {
            const inicial = iniciales.find((item) => `${item.id}` === `${plugin.id}`);
            return pluginCambio(plugin, inicial);
        })
        .map(sinCamposGestionados);
    if (actualizadas.length) {
        console.info("[Plugins] PUT imágenes", { cantidad: actualizadas.length });
        await actualizarImagen({ imagenes: actualizadas });
    }

    const idsEliminados = iniciales
        .filter(tieneId)
        .filter((plugin) => !actuales.some((actual) => `${actual.id}` === `${plugin.id}`))
        .map((plugin) => plugin.id);
    if (idsEliminados.length) {
        console.info("[Plugins] DELETE imágenes", { ids: idsEliminados });
        await eliminarImagen({ ids: idsEliminados });
    }
};

const guardarTipoJson = async ({ concepto, actuales, iniciales, crear, actualizar, eliminar, campo }) => {
    const nuevas = actuales
        .filter((plugin) => !tieneId(plugin))
        .map((plugin) => prepararPluginJson(plugin, concepto));
    if (nuevas.length) {
        console.info(`[Plugins] POST ${campo}`, { concepto, cantidad: nuevas.length, payload: nuevas });
        await crear({ [campo]: nuevas });
    }

    const actualizadas = actuales
        .filter(tieneId)
        .filter((plugin) => {
            const inicial = iniciales.find((item) => `${item.id}` === `${plugin.id}`);
            return pluginCambio(plugin, inicial);
        })
        .map(prepararActualizacionJson);
    if (actualizadas.length) {
        console.info(`[Plugins] PUT ${campo}`, { cantidad: actualizadas.length, payload: actualizadas });
        await actualizar({ [campo]: actualizadas });
    }

    const idsEliminados = iniciales
        .filter(tieneId)
        .filter((plugin) => !actuales.some((actual) => `${actual.id}` === `${plugin.id}`))
        .map((plugin) => plugin.id);
    if (idsEliminados.length) {
        console.info(`[Plugins] DELETE ${campo}`, { ids: idsEliminados });
        await eliminar({ ids: idsEliminados });
    }
};

const guardarPluginsConcepto = async ({ concepto, plugins = [], pluginsIniciales = [] }) => {
    if (!concepto) throw new Error("Se requiere el id del concepto para guardar sus plugins");

    console.info("[Plugins] Inicio persistencia", {
        concepto,
        cantidadActual: plugins.length,
        cantidadInicial: pluginsIniciales.length,
    });

    const porTipo = (tipo) => ({
        actuales: plugins.filter((plugin) => (plugin.tipo || plugin.tipo_plugin) === tipo),
        iniciales: pluginsIniciales.filter((plugin) => (plugin.tipo || plugin.tipo_plugin) === tipo),
    });

    const imagenes = porTipo("imagen");
    await guardarImagenes(concepto, imagenes.actuales, imagenes.iniciales);

    const bloques = porTipo("bloque_codigo");
    await guardarTipoJson({
        concepto,
        ...bloques,
        crear: crearBloqueCodigo,
        actualizar: actualizarBloqueCodigo,
        eliminar: eliminarBloqueCodigo,
        campo: "bloques_codigo",
    });

    const formulas = porTipo("formula");
    await guardarTipoJson({
        concepto,
        ...formulas,
        crear: crearFormula,
        actualizar: actualizarFormula,
        eliminar: eliminarFormula,
        campo: "formulas",
    });

    return { tiposProcesados: tipos };
};

export default guardarPluginsConcepto;
