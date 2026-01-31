import api from "../services/api";

export default function Upload({ onUpload }) {
  const upload = async (e) => {
  try {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await api.post("/files/upload", formData);
    onUpload();
  } catch (err) {
    alert(err.response?.data?.error || "Upload failed UnSupported Type");
  }
};


  return <input type="file" onChange={upload} />;
}
