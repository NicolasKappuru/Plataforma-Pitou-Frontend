import "./Boton.css";

const Boton = ({ label, onClick, variant = "sidebar", icon, type = "button", disabled = false }) => {
  const clases = {
    sidebar:     "btn btn-sidebar",
    action:      "btn btn-action",
    bloquear:    "btn btn-bloquear",
    desbloquear: "btn btn-desbloquear",
    aceptar:     "btn btn-aceptar",
    rechazar:    "btn btn-rechazar",
    regreso:     "btn btn-regreso",
    logout:      "btn btn-logout",
    login:       "btn btn-login",
    form_action: "btn btn-form-action",
  };

  return (
    <button className={clases[variant]} onClick={onClick} type={type} disabled={disabled}>
      {icon && <i className={`ti ti-${icon}`} aria-hidden="true" />} 
      {label}
    </button>
  );
};

export default Boton;