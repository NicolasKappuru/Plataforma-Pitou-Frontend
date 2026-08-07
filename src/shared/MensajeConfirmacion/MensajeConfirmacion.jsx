import "./MensajeConfirmacion.css";

const MensajeConfirmacion = ({ visible, title, message, onConfirm, onCancel, confirmLabel = "Sí, continuar", cancelLabel = "Cancelar" }) => {
    if (!visible) return null;

    return (
        <div className="mensaje-confirmacion__popup" role="status" aria-live="polite">
            <div className="mensaje-confirmacion">
                <h3 className="mensaje-confirmacion__title">{title}</h3>
                <p className="mensaje-confirmacion__message">{message}</p>

                <div className="mensaje-confirmacion__actions">
                    <button type="button" className="mensaje-confirmacion__cancel" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className="mensaje-confirmacion__confirm" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MensajeConfirmacion;
