import React, { useEffect, useState } from "react";
// import "./SubmissionsList.scss";

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:3000/bewerbungen");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("❌ Fehler beim Abrufen der Bewerbungen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p>Lade Bewerbungen...</p>;

  return (
    <div className="submissions-list">
      <h3> Gespeicherte Bewerbungen</h3>
      {submissions.length === 0 ? (
        <p>Keine Einträge gefunden.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Firma</th>
              <th>Position</th>
              <th>Stadt</th>
              <th>Status</th>
              <th>Datum</th>
              <th>CV</th>
              <th>Anschreiben</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item) => (
              <tr key={item._id}>
                <td>{item.company}</td>
                <td>{item.position || "-"}</td>
                <td>{item.city || "-"}</td>
                <td>{item.status || "-"}</td>
                <td>{new Date(item.date).toLocaleDateString("de-DE")}</td>
                <td>
                  {item.cvFile ? (
                    <a href={`http://localhost:3000/uploads/${item.cvFile}`} target="_blank" rel="noopener noreferrer"  title={item.cvFile}  /* // ← tooltip on hover */>
                      📄
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {item.coverFile ? (
                    <a href={`http://localhost:3000/uploads/${item.coverFile}`} target="_blank" rel="noopener noreferrer"   title={item.coverFile}  /* // ← tooltip on hover */>
                      📝
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubmissionsList;
