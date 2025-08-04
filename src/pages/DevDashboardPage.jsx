// pages/DevDashboardPage.jsx
import React, { useEffect, useState } from "react";
import DevDashboard from "../components/DevDashboard";

export default function DevDashboardPage() {
  const [logs, setLogs] = useState([]);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const t0 = performance.now();

    fetch("http://localhost:3000/files")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch files");
        return res.json();
      })
      .then((data) => {
        const t1 = performance.now();
        setUploads(data);
        setLogs((prev) => [
          ...prev,
          `Fetched ${data.length} files in ${Math.round(t1 - t0)}ms`,
        ]);
      })
      .catch((err) => {
        setLogs((prev) => [...prev, `Error fetching files: ${err.message}`]);
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Developer Dashboard</h2>
      <DevDashboard logs={logs} uploads={uploads} />
    </div>
  );
}
