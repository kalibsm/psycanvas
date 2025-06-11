"use client";

import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import Questionnaire from "./components/Questionnaire";
import ReportStatus from "./components/ReportStatus";
import Loading from "./components/Loading";

type AppStep = "upload" | "questionnaire" | "report";

export default function PsyCanvas() {
  const [currentStep, setCurrentStep] = useState<AppStep>("upload");
  const [taskId, setTaskId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState<any>(null);

  const handleUploadComplete = (newTaskId: string) => {
    setTaskId(newTaskId);
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireComplete = (formData?: any) => {
    if (formData) {
      setQuestionnaireData(formData);
    }
    setCurrentStep("report");
  };

  const handleBackToUpload = () => {
    setCurrentStep("upload");
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const stepTitles = {
    upload: "Шаг 1: Загрузка рисунков",
    questionnaire: "Шаг 2: Психологический опросник",
    report: "Шаг 3: Получение отчета",
  };

  const StepIndicator = () => (
    <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
      <div className="flex items-center justify-between px-2 sm:px-0">
        {Object.entries(stepTitles).map(([step, title], index) => {
          const isActive = currentStep === step;
          const isCompleted =
            (step === "upload" &&
              ["questionnaire", "report"].includes(currentStep)) ||
            (step === "questionnaire" && currentStep === "report");

          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm border-2 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div
                  className={`mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-center px-1 ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {title}
                </div>
              </div>
              {index < Object.keys(stepTitles).length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                    isCompleted || (isActive && index === 0)
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                PsyCanvas
              </h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full sm:ml-3 self-start sm:self-auto">
                Психологический анализ рисунков
              </span>
            </div>
            {taskId && (
              <div className="text-xs sm:text-sm text-gray-500 break-all sm:break-normal">
                ID: <span className="font-mono">{taskId}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator />

          <div className="relative">
            {currentStep === "upload" && (
              <ImageUpload
                onUploadComplete={handleUploadComplete}
                onLoading={handleLoading}
              />
            )}

            {currentStep === "questionnaire" && taskId && (
              <Questionnaire
                taskId={taskId}
                onSubmitComplete={handleQuestionnaireComplete}
                onLoading={handleLoading}
                onBack={handleBackToUpload}
              />
            )}

            {currentStep === "report" && taskId && (
              <ReportStatus
                taskId={taskId}
                questionnaireData={questionnaireData}
              />
            )}
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <Loading
          fullScreen={true}
          message={
            currentStep === "upload"
              ? "Загружаем ваши рисунки..."
              : "Отправляем анкету..."
          }
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>PsyCanvas - Система психологического анализа детских рисунков</p>
            <p className="mt-2">
              Загрузите рисунки, заполните анкету и получите подробный
              психологический отчет
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
