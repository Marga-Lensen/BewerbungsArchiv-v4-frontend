// ~/fileUpload-frontend/src/components/FilePreviewClaude.jsx

import React from "react";
import { API_BASE_URL } from "../config"; // adjust path as needed
import { getFileTypeFromName } from "../utils/fileHelpers";

const FilePreview = ({ file, filename, type }) => {
  if (!file && !filename) return null;

  const isNewFile = file instanceof File;
  const previewUrl = isNewFile
    ? URL.createObjectURL(file)
    : `${API_BASE_URL}/uploads/${filename}`;
  console.log(API_BASE_URL);

  const displayName = isNewFile ? file.name : filename;
  const fileType = isNewFile ? file.type : getFileTypeFromName(filename);

  return (
    <div className="preview-container">
      <h3 className="preview-title">
        {type === "cv" ? "CV" : "Anschreiben"} Preview:
      </h3>
      <div className="file-info">
        <span className="file-name">{displayName}</span>
        {isNewFile && (
          <span className="file-size">
            ({(file.size / 1024).toFixed(1)} KB)
          </span>
        )}
      </div>

      {fileType.startsWith("image/") ? (
        <img src={previewUrl} alt="Preview" className="image-preview" />
      ) : fileType === "application/pdf" ? (
        <div className="pdf-preview">
          <iframe src={previewUrl} title="PDF Preview" className="pdf-iframe" />
          <p className="preview-note">
            PDF Preview -{" "}
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              {" "}
              👉️ Open in new tab
            </a>
          </p>
        </div>
      ) : (
        <div className="file-placeholder">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="file-icon-link"
          >
            <div className="file-icon">📄</div>
          </a>
          <p className="preview-note">
            No Preview –{" "}
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              👉️ Open in new tab
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
