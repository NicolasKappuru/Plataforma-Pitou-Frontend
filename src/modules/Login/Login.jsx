import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import Boton from "../../shared/Boton/Boton";
import { loginUsuario, guardarSesion, limpiarSesion } from "./services/service_auth";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUsuario({ username, password });
            guardarSesion(data);
            navigate("/glosario/propio");
        } catch (err) {
            limpiarSesion();
            const mensaje = err?.response?.data?.detail || err?.response?.data?.message || "No se pudo iniciar sesión. Verifica tus credenciales.";
            setError(mensaje);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <h2>Login</h2>

            <form className="login-form" onSubmit={handleLogin}>

                <div className="username-field">
                    <div className="text-icon">
                        <i className="ti ti-user" />
                        <label htmlFor="username">Username:</label>
                    </div>

                    <input
                        type="text"
                        id="username"
                        className="username-textarea"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="password-field">
                    <div className="text-icon">
                        <i className="ti ti-key" />
                        <label htmlFor="password">Password:</label>
                    </div>

                    <input
                        type="password"
                        id="password"
                        className="password-textarea"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <Boton
                    label={loading ? "Iniciando..." : "Iniciar sesión"}
                    variant="login"
                    type="submit"
                    disabled={loading}
                />

            </form>

            <a href="#" className="register-link">
                <i className="ti ti-user-plus" /> ¿No tienes cuenta? Regístrate
            </a>

        </div>
    );
};

export default Login;