import { useEffect, useState } from "react";
import "./AlertMessage.css";

const AlertMessage = ({ color = "#16a34a", message = "", visible = false }) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        setShow(visible);

        if (!visible) return;

        const timer = window.setTimeout(() => {
            setShow(false);
        }, 2000);

        return () => window.clearTimeout(timer);
    }, [visible]);

    if (!show || !message) return null;

    return (
        <div className="alert-message" style={{ backgroundColor: color }}>
            <span>{message}</span>
        </div>
    );
};

export default AlertMessage;