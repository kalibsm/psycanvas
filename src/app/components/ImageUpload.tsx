"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  onUploadComplete: (taskId: string) => void;
  onLoading: (loading: boolean) => void;
}

interface ImageFile {
  file: File | null;
  preview: string | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadComplete,
  onLoading,
}) => {
  const [images, setImages] = useState<{
    house: ImageFile;
    animal: ImageFile;
    portrait: ImageFile;
  }>({
    house: { file: null, preview: null },
    animal: { file: null, preview: null },
    portrait: { file: null, preview: null },
  });

  const [error, setError] = useState<string>("");
  const fileInputRefs = useRef<{
    house: HTMLInputElement | null;
    animal: HTMLInputElement | null;
    portrait: HTMLInputElement | null;
  }>({
    house: null,
    animal: null,
    portrait: null,
  });

  const handleFileSelect = (
    type: "house" | "animal" | "portrait",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Допустимые форматы: jpg, jpeg, png, gif");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Размер файла не должен превышать 5 МБ");
      return;
    }

    setError("");
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setImages((prev) => ({
      ...prev,
      [type]: { file, preview },
    }));
  };

  const removeImage = (type: "house" | "animal" | "portrait") => {
    if (images[type].preview) {
      URL.revokeObjectURL(images[type].preview!);
    }

    setImages((prev) => ({
      ...prev,
      [type]: { file: null, preview: null },
    }));

    if (fileInputRefs.current[type]) {
      fileInputRefs.current[type]!.value = "";
    }
  };

  const isAllImagesUploaded = () => {
    return images.house.file && images.animal.file && images.portrait.file;
  };

  const handleSubmit = async () => {
    if (!isAllImagesUploaded()) {
      setError("Пожалуйста, загрузите все три файла");
      return;
    }

    onLoading(true);
    setError("");

    try {
      console.log("Starting file upload...");
      console.log("Files to upload:", {
        house: images.house.file?.name,
        animal: images.animal.file?.name,
        portrait: images.portrait.file?.name,
      });

      const formData = new FormData();
      // The API expects files to be sent as individual file fields or as a 'files' array
      // Let's try both approaches to see which one works
      formData.append("files", images.house.file!);
      formData.append("files", images.animal.file!);
      formData.append("files", images.portrait.file!);

      console.log("FormData created, making request to API...");

      const response = await fetch(
        "https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.task_id) {
        console.log("Task ID received:", data.task_id);
        onUploadComplete(data.task_id);
      } else {
        console.error("No task_id in response:", data);
        throw new Error("Task ID not received");
      }
    } catch (err) {
      console.error("Upload error details:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      setError(
        `Ошибка при загрузке файлов: ${
          err instanceof Error ? err.message : "Unknown error"
        }. Пожалуйста, попробуйте снова.`
      );
    } finally {
      onLoading(false);
    }
  };

  const UploadCard = ({
    type,
    label,
  }: {
    type: "house" | "animal" | "portrait";
    label: string;
  }) => {
    const hasFile = images[type].file;

    return (
      <div
        className={`relative bg-gray-50 rounded-lg p-8 transition-all duration-200 ${
          hasFile ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-100"
        }`}
      >
        {hasFile && images[type].preview ? (
          <div className="text-center">
            <img
              src={images[type].preview!}
              alt={label}
              className="mx-auto max-h-32 max-w-full object-contain rounded mb-4"
            />
            <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
            <p className="text-xs text-gray-500 mb-3">
              {images[type].file!.name}
            </p>
            <button
              type="button"
              onClick={() => removeImage(type)}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Удалить
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 mb-4 text-gray-400">
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-4">{label}</p>
            <label className="cursor-pointer inline-block">
              <span className="sr-only">Выберите файл</span>
              <input
                ref={(el) => {
                  fileInputRefs.current[type] = el;
                }}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(type, e)}
              />
            </label>
          </div>
        )}

        {!hasFile && (
          <label
            className="absolute inset-0 cursor-pointer"
            htmlFor={`file-${type}`}
          >
            <input
              id={`file-${type}`}
              ref={(el) => {
                fileInputRefs.current[type] = el;
              }}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileSelect(type, e)}
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Blue header bar */}
      <div className="h-3 bg-gradient-to-r from-blue-300 to-blue-400"></div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Загрузите фотографии рисунков
        </h1>

        {/* File format info */}
        <div className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center">
            <div className="w-5 h-5 text-red-500 mr-3">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-red-700">
              Допустимые форматы файлов: jpg, jpeg, png, gif. Размер не более 5
              МБ
            </p>
          </div>
        </div>

        {/* Upload cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <UploadCard type="house" label="Дом, дерево, человек" />
          <UploadCard type="animal" label="Несуществующее животное" />
          <UploadCard type="portrait" label="Автопортрет" />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          {/* Step indicator */}
          <span className="text-sm text-gray-500 text-center sm:text-left">
            Шаг 1/3
          </span>

          {/* Next button */}
          <button
            onClick={handleSubmit}
            disabled={!isAllImagesUploaded()}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
              isAllImagesUploaded()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Далее
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
