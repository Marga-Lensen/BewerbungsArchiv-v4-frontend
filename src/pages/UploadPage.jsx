import React from "react";
import UploadForm from "../components/UploadForm";

const UploadPage = () => {
  return (
    <div>
      <h1><img
  src="/upload-favicon-no-bg.png"
  alt="Upload Icon"
  style={{ width: "30px", height: "30px", verticalAlign: "middle", marginRight: "8px" }}
/>
{/* 📤  */}Upload Page</h1>
      <UploadForm />
    </div>
  );
};

export default UploadPage;
