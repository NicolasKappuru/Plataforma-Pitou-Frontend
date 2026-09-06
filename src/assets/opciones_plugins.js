import ImagenForm from "../plugins/Imagen/ImagenForm/ImagenForm";
import BloqueCodigoForm from "../plugins/BloqueCodigo/BloqueCodigoForm/BloqueCodigoForm";
import FormularioForm from "../plugins/Formula/FormulaForm/FormularioForm";

export const opcionesPlugins = [
  { tipo: "imagen", nombre: "Imagen", icono: "photo", Formulario: ImagenForm },
  { tipo: "bloque_codigo", nombre: "Bloque de código", icono: "code", Formulario: BloqueCodigoForm },
  { tipo: "formula", nombre: "Fórmula", icono: "math-function", Formulario: FormularioForm },
];