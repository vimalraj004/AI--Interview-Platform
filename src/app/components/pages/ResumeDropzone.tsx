import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileUpload?: (file: File) => void;
}

const ResumeDropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");

    if (onFileUpload) {
      onFileUpload(selectedFile);
    }
  }, [onFileUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    maxFiles: 1,
    onDropRejected: () => {
      setError("Only PDF, DOC, DOCX files are allowed");
    },
  });

  return (
    <div>
      {/* DROP AREA */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
        ${isDragActive ? "border-purple-400 bg-purple-900/20" : "border-gray-600"}        `}
      >
        <input {...getInputProps()} />
       <UploadCloud className="w-10 h-10 text-yellow-400 mb-3" />


        {isDragActive ? (
          <p className="text-gray-200 font-medium">Drop your resume here...</p>
        ) : (
          <p className="text-gray-200">Drag & drop your resume here, or click to select</p>
        )}

        <p className="text-sm text-gray-500 mt-2">
          Only PDF, DOC, DOCX allowed
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {/* FILE PREVIEW */}
      {file && (
        <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <button
            onClick={() => setFile(null)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeDropzone;