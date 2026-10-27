
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useContext(authContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="protected-loading">
                <div className="protected-spinner" />
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return (
        <>
            <style>
                {
                    `
.protected-loading {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #f7f8f3;
  color: #17231a;
  font-family: "DM Sans", sans-serif;
}

.protected-loading p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.protected-spinner {
  width: 38px;
  height: 38px;
  border: 3px solid #e1e7d8;
  border-top-color: #17231a;
  border-radius: 50%;
  animation: protected-spin 0.8s linear infinite;
}

@keyframes protected-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .protected-spinner {
    animation: none;
  }
}

                    `
                }
            </style>
            < Outlet />
        </>
    )
    
};

export default ProtectedRoute;
