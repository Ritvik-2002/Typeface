import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Upload from "../components/Upload";
import Navbar from "../components/Navbar";
import "../styles/home.css";

export default function Home() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Load files for logged-in user
  const loadFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to load files", err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // Secure download (JWT attached via Axios)
  const downloadFile = async (id, filename) => {
    try {
      const res = await api.get(`/files/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <>
      {/* Top Navbar with Logout */}
      <Navbar />

      {/* Main Content */}
      <div className="home-container">
        <h2 className="home-title">Your Files</h2>

        {/* Upload Section */}
        <div className="upload-box">
          <Upload onUpload={loadFiles} />
        </div>

        {/* File List */}
        <ul className="file-list">
          {files.length === 0 && (
            <p className="btn-empty">No files uploaded yet.</p>
          )}

          {files.map((file) => (
            <li key={file.id} className="file-item">
              {/* File name → Preview */}
              <span
                className="file-name"
                onClick={() => navigate(`/preview/${file.id}`)}
              >
                {file.filename}
              </span>

              {/* Actions */}
              <div className="file-actions">
                <button
                  className="btn btn-download"
                  onClick={() =>
                    downloadFile(file.id, file.filename)
                  }
                >
                  Download
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
