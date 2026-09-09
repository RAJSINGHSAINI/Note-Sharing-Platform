import api from "./axios.js";

export const initiateUpload = async (studentId, noteMetadata) => {
  // noteMetadata is a plain JavaScript object matching InitiateUploadRequest
  const response = await api.post(
    `/notes/initiate-upload?studentId=${studentId}`,
    noteMetadata,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // Returns { presignedUploadUrl, fileKey, noteId }
};