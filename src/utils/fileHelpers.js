// projects/_tools/fileUpload-fullstack/fileUpload-frontend/src/utils/fileHelpers.js

export const getFileTypeFromName = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const typeMap = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain'
  };
  return typeMap[ext] || 'application/octet-stream';
};




export const guideToRequiredField = ({
  setMessage,
  companyRef,
  activeSection,
  setHighlightedTab,
}) => {
  if (activeSection !== "basic") {
    setMessage(`❕ Das Feld „Unternehmen“ ist erforderlich.
👈️ Es befindet sich im linken Tab an erster Stelle.`);

    // Optionally highlight the basic tab
    setHighlightedTab?.("basic");

    // Clear the highlight after delay
    setTimeout(() => {
      setHighlightedTab?.("");
    }, 3500);
  } else {
    setMessage("❕ Bitte das Feld „Unternehmen“ ausfüllen.");

    // Focus the field only if we're already on the correct tab
    setTimeout(() => {
      companyRef?.current?.focus();
    }, 50);
  }
};
