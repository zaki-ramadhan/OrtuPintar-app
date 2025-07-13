import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// List of valid routes in your application
const VALID_ROUTES = [
    "/",
    "/home",
    "/login",
    "/register",
    "/my-account",
    "/admin/login",
    "/admin/dashboard"
];

// Hook to detect when user tries to access invalid URL while on a valid page
export function useNotFoundDetection() {
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);
    const [invalidUrl, setInvalidUrl] = useState("");
    const location = useLocation();

    useEffect(() => {
        // Check if current path is valid
        const isValidRoute = VALID_ROUTES.some(route => {
            if (route === "/" && location.pathname === "/") return true;
            if (route !== "/" && location.pathname.startsWith(route)) return true;
            return false;
        });

        // If user is on an invalid route, show modal
        if (!isValidRoute) {
            setInvalidUrl(location.pathname);
            setShowNotFoundModal(true);
        }
    }, [location.pathname]);

    const closeModal = () => {
        setShowNotFoundModal(false);
        setInvalidUrl("");
    };

    return {
        showNotFoundModal,
        invalidUrl,
        closeModal
    };
}
