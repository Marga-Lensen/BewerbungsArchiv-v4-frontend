// components/DevDashboard.jsx
import React from "react";

export default function DevDashboard({ logs = [], uploads = [] }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        margin: "1rem",
        fontFamily: "monospace",
        fontSize: "12px",
        backgroundColor: "#2c2c6ca2",
        color: "#fff"
      }}
    >
      <h3 style={{ marginBottom: "0.9rem" }}>🧪 Dev Dashboard</h3>

      <div>
        <strong>Recent Uploads:</strong>
        <ul>
          {uploads.length > 0 ? (
            uploads.map((file, i) => (
              <li key={i}>{file.filename || JSON.stringify(file)}</li>
            ))
          ) : (
            <li>No uploaded files found.</li>
          )}
        </ul>
      </div>

      <hr />

      <div>
        <strong>Logs:</strong>
        <ul>
          {logs.length > 0 ? (
            logs.slice(-5).map((log, i) => <li key={i}>{log}</li>)
          ) : (
            <li>No logs to display.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
