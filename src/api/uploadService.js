// projects/Database-Management/Datenbankprojekte/Bewerbungsarchiv/fileUpload-fullstack-cruiseship/fileUpload-frontend/src/api/uploadService.js

export const uploadFile = async (file) => {
  console.log('📤 [uploadService] Uploading file:', file.name);

    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) throw new Error('Serverfehler beim Upload');
  
    return await response.json();
    console.log('📥 [uploadService] Server responded with:', result);
    return result;
  };
  