// projects/_tools/fileUpload-fullstack/fileUpload-frontend/src/components/UploadForm.jsx

// ===================================================
// 🧩 TOP-LEVEL IMPORTS & INITIAL STATE
// ===================================================
import React, { useEffect, useState, useRef } from "react";
import FilePreview from "./FilePreview.jsx";
import { uploadFile } from "../api/uploadService.js"; //  import a custom uploadFile function from a local API service //  async utility for file uploading.
import { guideToRequiredField } from "../utils/fileHelpers.js";
import { API_BASE_URL } from "../config";

import "../styles/UploadForm.css"; // Import custom styles for the form

const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

const initialFormData = {
  position: "",
  company: "",
  city: "",
  arbeitsort: "",
  date: today, // ensures  the input is filled unless the user changes it
  method: "",
  notes: "",
  status: "",
  replyMessage: "",
  coverLetterText: "",
};

// ===================================================
// 📦 COMPONENT: UploadForm
// ===================================================
const UploadForm = () => {
  // ---------------------------------------------------
  // 🧠 STATE MANAGEMENT
  // ---------------------------------------------------  
  // State for selected files, uploaded filenames, form data, messages, and active section toggle
  const [files, setFiles] = useState([]);
  const [uploadedCv, setUploadedCv] = useState("");
  const [uploadedCover, setUploadedCover] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [activeSection, setActiveSection] = useState("basic");
  const [highlightedTab, setHighlightedTab] = useState(""); // "" or "basic"


  const companyRef = useRef(null);


  // ---------------------------------------------------
  // 🌐 FETCH EXISTING FILES FROM SERVER ON MOUNT
  // ---------------------------------------------------
    useEffect(() => {
    fetch("http://localhost:3000/files")
      .then((res) => res.json())
      .then((data) => setFiles(data)) // Stores the fetched result into files
      .catch((err) => console.error("Fehler beim Laden der Dateien:", err));
  }, []); // Loads once on mount

  // ---------------------------------------------------
  // 🎯 INPUT CHANGE HANDLERS
  // ---------------------------------------------------

  // 💬 Generic text input handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📁 File input handler
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    /* cvFile and coverFile are File objects from the input[type=file] */
    if (type === "cv") {
      setCvFile(file);
      setUploadedCv(""); // reset selection of existing file
    } else if (type === "cover") {
      setCoverFile(file);
      setUploadedCover(""); // reset selected existing
    } else {
      console.warn("Unhandled file type:", type);
    }

    setMessage("");
  };

  // ✖️ Remove selected file
  const removeFile = (type) => {
    if (type === "cv") {
      setCvFile(null);
      setUploadedCv(""); 
    } else if (type === "cover") {
      setCoverFile(null);
      setUploadedCover(""); 
    }
  };

  // 🔁 Select existing uploaded file
  const handleSelectExisting = (e, type) => {
    const filename = e.target.value;

    if (type === "cv") {
      setUploadedCv(filename);
      setCvFile(null); // reset uploaded file
    } else if (type === "cover") {
      setUploadedCover(filename);
      setCoverFile(null); // reset uploaded file
    }
  };
  
  // ===================================================
  // 🔍 FILE PREVIEW COMPONENT - 2 versions, both in components/
  // ===================================================
  // new FilePreview component to handle file previews from chatGPT.
  // also moved to src/components/
  
  // ##### New code from Claude to fix the preview issue ###########

  // Preview component for files
  /* 
new code from Claude to fix the preview issue; this is a new component that handles the preview of files based on their type.... is an imported component now ...also moved to src/components/ .*/

  /*  new code from Claude to deal with different file types;    getFileTypeFromName is a utility function - in utils/fileHelpers.js - that can be used to determine the file type based on the filename extension. */

// ===================================================
// 📨 FORM SUBMISSION
// ===================================================
// basically only different naming convention; Claude suggests to use finalCvFile and finalCoverFile instead of what I had; uploadedCvResult and uploadedCoverResult...  otherwise same code
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous success or error message
    // setMessage("Processing...");  // from Claude: this is not needed, as the message is set in the response handler

    // 🧐 Validate required fields BEFORE upload or fetch
    if (!formData.company.trim()) {
      setMessage("❕ Bitte fülle alle Pflichtfelder aus.");
      // guideToRequiredField(setActiveSection, setMessage, companyRef, activeSection, setHighlightedTab)
      guideToRequiredField({
        setActiveSection,
        setMessage,
        companyRef,
        activeSection,
        setHighlightedTab
      });
      
      return;
    }

    try {
      let finalCvFile = uploadedCv;
      let finalCoverFile = uploadedCover;

      if (cvFile) {
        const res = await uploadFile(cvFile); // here the uploadFile function is called with the cvFile
        finalCvFile = res.filename;
      }

      if (coverFile) {
        const res = await uploadFile(coverFile);
        finalCoverFile = res.filename;
      }

      const submissionData = {
        ...formData,
        cvFile: finalCvFile,
        coverFile: finalCoverFile,
      };
      /* Final submission payload includes all form fields plus cvFile and coverFile (as strings — filenames). 
      that was from chatGPT < 26mai25. on 26mai25 new code from Claude and ask myself ❔ is that so ❔*/

      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      // 🧐 Check if the server responded OK before continuing
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const result = await response.json();
      setMessage(result.message || "👍️ Einreichung erfolgreich!");

      // Auto-clear the message after 4 seconds
      setTimeout(() => {
        setMessage(""); // hide success message
        // RESET inside handleSubmit after success:
        setFormData(initialFormData);
        setCvFile(null);
        // setCvPreview("");
        setCoverFile(null);
        // setCoverPreview("");
        setUploadedCv("");
        setUploadedCover("");
        setActiveSection("basic");     // Reset to first tab
        companyRef.current?.focus();   // Focus first input
        // window.location.reload();  // reset form completely
      }, 4000);
    } catch (err) {
      console.error("Fehler beim Einreichen; ", err);
      setMessage(
        "☹️ Ein Fehler ist aufgetreten. Bitte überprüfe deine Angaben.."
      );
    }
  }; // handleSubmit close



  return (
    <div className="bewerbung-container">
  
      {/* 🔢 1. Header */}
      <div className="header">
        <h1>Details zur Bewerbung eingeben</h1>
      </div>
  
      <div className="main-layout">
        <div className="form-sections">
  
          {/* 🔢 2. Tabs für Formularbereiche */}
          <div className="section-tabs">
            <button
              className={`tab-button ${activeSection === "basic" ? "active" : ""} ${highlightedTab === "basic" ? "highlight" : ""}`}
              onClick={() => setActiveSection("basic")}
            >
              Wo und wie beworben?
            </button>
            <button
              className={`tab-button ${activeSection === "details" ? "active" : ""}`}
              onClick={() => setActiveSection("details")}
            >
              Details zum Status
            </button>
            <button
              className={`tab-button ${activeSection === "files" ? "active" : ""}`}
              onClick={() => setActiveSection("files")}
            >
              Hochgeladene Dateien
            </button>
          </div>
  
          {/* 🔢 3. Formular (alle Abschnitte) */}
          {/* <form onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}> */}
          {/* <div onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}> */}
          <div onSubmit={handleSubmit} >
  
            {/* 
            =======================================
            🔢 3.1. Allgemeine Details (Basic Info)
            =======================================
            */}
            <div className={`form-section ${activeSection !== "basic" ? "hidden" : ""}`}>
              <h2 className="section-title">Allgemeine Details</h2>
              <div className="form-grid">
  
                {/* Unternehmen */}
                <div className="form-group">
                  <label>Unternehmen *</label>
                  <input
                    type="text"
                    name="company"
                    ref={companyRef}  /* useRef here */
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                </div>
  
                {/* Position */}
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Standort */}
                <div className="form-group">
                  <label>Standort</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Arbeitsort */}
                <div className="form-group">
                  <label>Arbeitsort</label>
                  <select
                    name="arbeitsort"
                    value={formData.arbeitsort}
                    onChange={handleInputChange}
                  >
                    <option value="">-- bitte wählen --</option>
                    <option value="remote">Remote</option>
                    <option value="vor Ort">Vor Ort</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
  
                {/* Bewerbungsdatum */}
                <div className="form-group">
                  <label>Bewerbungsdatum</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
  
                {/* Art der Bewerbung */}
                <div className="form-group">
                  <label>Art der Bewerbung</label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                  >
                    <option value="">-- bitte wählen --</option>
                    <option value="email">Per E-Mail</option>
                    <option value="webseite">Auf der Webseite</option>
                    <option value="plattform">Über eine Plattform (Indeed, LinkedIn)</option>
                    <option value="andere">Andere</option>
                  </select>
                </div>
  
                {/* Zusatzinfos */}
                <div className="form-group full-width">
                  <label>Zusätzliche Angaben</label>
                  <textarea
                    name="notes"
                    placeholder="Webseite, E-Mail-Adresse, Plattform, etc."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
  
            {/* 
            =======================================
            🔢 3.2. Status & Rückmeldungen
            =======================================
            */}
            <div className={`form-section ${activeSection !== "details" ? "hidden" : ""}`}>
              <h2 className="section-title">Status & Rückmeldungen</h2>
              <div className="form-grid">
  
                {/* Status */}
                <div className="form-group">
                  <label>Aktueller Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="">-- bitte wählen --</option>
                    <option value="eingereicht">Eingereicht</option>
                    <option value="autoantwort">Automatische Antwort</option>
                    <option value="plattformnachricht">Nachricht über Plattform</option>
                    <option value="eingeladen">Eingeladen</option>
                    <option value="abgelehnt">Abgelehnt</option>
                  </select>
                </div>
  
                {/* Rückmeldung */}
                <div className="form-group full-width">
                  <label>Rückmeldung / Nachrichtentext</label>
                  <textarea
                    name="replyMessage"
                    placeholder="Antwort oder Nachricht hier einfügen"
                    value={formData.replyMessage}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>
              </div>
            </div>
  
            {/* 
            =======================================
            🔢 3.3. Datei-Uploads (CV, Cover Letter)
            =======================================
            */}
            <div className={`form-section ${activeSection !== "files" ? "hidden" : ""}`}>
              <h2 className="section-title">Bewerbungsunterlagen</h2>
  
              {/* CV Upload */}
              <div className="file-section">
                <h3>Lebenslauf (CV)</h3>
                <div className="file-controls">
                  <select
                    value={uploadedCv}
                    onChange={(e) => handleSelectExisting(e, "cv")}
                  >
                    <option value="">-- Neue Datei hochladen --</option>
                    {files.map((file) => (
                      <option key={file.filename} value={file.filename}>
                        {file.filename}
                      </option>
                    ))}
                  </select>
  
                  {!uploadedCv && (
                    <>
                      {cvFile && (
                        <div className="file-preview">
                          <span>{cvFile.name}</span>
                          <button type="button" onClick={() => removeFile("cv")}>✖️</button>
                        </div>
                      )}
                      {!cvFile && (
                        <div className="file-input">
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "cv")}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
  
              {/* Cover Letter Upload */}
              <div className="file-section">
                <h3>Anschreiben (Cover Letter)</h3>
                <div className="file-controls">
                  <select
                    value={uploadedCover}
                    onChange={(e) => handleSelectExisting(e, "cover")}
                  >
                    <option value="">-- Neue Datei hochladen --</option>
                    {files.map((file) => (
                      <option key={file.filename} value={file.filename}>
                        {file.filename}
                      </option>
                    ))}
                  </select>
  
                  {!uploadedCover && (
                    <>
                      {!coverFile && (
                        <div className="file-input">
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "cover")}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                        </div>
                      )}
                      {coverFile && (
                        <div className="file-preview">
                          <span>{coverFile.name}</span>
                          <button type="button" onClick={() => removeFile("cover")}>✖️</button>
                        </div>
                      )}
                    </>
                  )}
                </div>
  
                {/* Alternativer Text */}
                <div className="form-group">
                  <label>Oder Text direkt eingeben:</label>
                  <textarea
                    name="coverLetterText"
                    rows="8"
                    value={formData.coverLetterText}
                    onChange={handleInputChange}
                    placeholder="Anschreiben hier einfügen..."
                  />
                </div>
              </div>
            </div>
  
            {/* 
            =======================================
            🔢 3.4. Formular-Submit & Meldung
            =======================================
            */}
            <div className="submit-section">
              {/* <button type="submit" className="submit-button" onClick={handleSubmit}> */}
              <button type="button" className="submit-button" onClick={handleSubmit}>
              {/* <button type="submit" className="submit-button" > */}
                Bewerbung speichern
              </button>
              {message && (
                <div className={`message ${message.includes("👍️") ? "success" : "error"}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
  
        {/* 
        =======================================
        🔢 4. Vorschau-Bereich
        =======================================
        */}
        <div className="preview-panel">
          <h2 className="preview-title">Vorschau</h2>
  
          <FilePreview file={cvFile} filename={uploadedCv} type="cv" />
          <FilePreview file={coverFile} filename={uploadedCover} type="cover" />
  
          {formData.coverLetterText && (
            <div className="preview-container">
              <h4 className="preview-title">Anschreiben Text Preview:</h4>
              <div className="text-preview">{formData.coverLetterText}</div>
            </div>
          )}
  
          {!cvFile && !uploadedCv && !coverFile && !uploadedCover && !formData.coverLetterText && (
            <p style={{ color: "purple", textAlign: "center", fontStyle: "italic" }}>
              Hier kommen die Vorschauen der hochgeladenen Dateien und Texte.
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default UploadForm;
