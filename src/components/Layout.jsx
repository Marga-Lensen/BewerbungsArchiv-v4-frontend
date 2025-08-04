// src/components/Layout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <div className="floating-home" onClick={() => navigate("/")}>
        🏠
        <div className="nav-dropdown">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/upload");
            }}
          >
            Upload
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/submissions");
            }}
          >
            Submissions
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/dashboard");
            }}
          >
            Dev Panel
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
