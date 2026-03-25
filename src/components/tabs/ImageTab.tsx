"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Image as ImageIcon, X, ArrowRight, AlertCircle } from "lucide-react";
import { validateImageFile, formatBytes } from "@/lib/utils";

interface ImageTabProps {
  onGenerate: (file: File) => void;
  loading: boolean;
}

export function ImageTab({ onGenerate, loading }: ImageTabProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const err = validateImageFile(f);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setPreview("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    onGenerate(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          }`}
        >
          <Upload size={28} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — max 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="relative">
            {/* Only render the img once the FileReader has loaded the data URL */}
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-48 object-contain bg-gray-50 dark:bg-gray-800"
              />
            ) : (
              <div className="w-full h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <span className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              </div>
            )}
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-gray-900/70 hover:bg-gray-900 text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          <div className="px-3 py-2 flex items-center gap-2 bg-white dark:bg-gray-900">
            <ImageIcon size={14} className="text-blue-500 shrink-0" />
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1">
              {file.name}
            </span>
            <span className="text-xs text-gray-400 shrink-0">{formatBytes(file.size)}</span>
          </div>
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !file}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors text-sm"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Uploading & Generating...
          </span>
        ) : (
          <>
            Upload & Generate QR
            <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}
