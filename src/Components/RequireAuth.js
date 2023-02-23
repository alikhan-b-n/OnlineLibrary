import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import React from "react";

export const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.user
                ? <Outlet />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

