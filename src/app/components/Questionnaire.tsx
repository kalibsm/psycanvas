"use client";

import { useState } from "react";

interface QuestionnaireProps {
  taskId: string;
  onSubmitComplete: (formData?: any) => void;
  onLoading: (loading: boolean) => void;
  onBack: () => void;
}

interface FormData {
  // Basic info
  childName: string;
  birthDate: string;
  gender: string;
  parentName: string;

  // Section 1: Emotional sphere (4 questions)
  emotional1: string; // Ребенок часто выражает радость и удовольствие
  emotional2: string; // Ребенок часто выражает злость и удовольствие
  emotional3: string; // Ребенок часто грустит или плачет без видимой причины
  emotional4: string; // Ребенок часто грустит или плачет без видимой причины

  // Section 2: Social interaction (4 questions)
  social1: string; // Ребенок легко заводит друзей
  social2: string; // Ребенок легко заводит друзей
  social3: string; // Ребенок предпочитает играть один, а не с другими детьми
  social4: string; // Ребенок предпочитает играть один, а не с другими детьми

  // Section 3: Self-regulation and behavior (4 questions)
  behavior1: string; // Ребенок умеет следовать правилам и инструкциям
  behavior2: string; // Ребенок умеет следовать правилам и инструкциям
  behavior3: string; // Ребенку трудно контролировать свои импульсы
  behavior4: string; // Ребенку трудно контролировать свои импульсы

  // Section 4: Relationships and self-confidence (4 questions)
  confidence1: string; // Ребенок уверен в своих силах и способностях
  confidence2: string; // Ребенок уверен в своих силах и способностях
  confidence3: string; // Ребенок часто сомневается в себе
  confidence4: string; // Ребенок часто сомневается в себе

  // Section 5: General questions (2 questions)
  general1: string; // Как Вы оцениваете общее эмоциональное состояние Вашего ребенка?
  general2: string; // Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы хотели бы сообщить дополнительно?

  // Open-ended questions
  openQuestion1: string;
  openQuestion2: string;
  openQuestion3: string;
  openQuestion4: string;
  openQuestion5: string;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  taskId,
  onSubmitComplete,
  onLoading,
  onBack,
}) => {
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    birthDate: "",
    gender: "",
    parentName: "",
    emotional1: "",
    emotional2: "",
    emotional3: "",
    emotional4: "",
    social1: "",
    social2: "",
    social3: "",
    social4: "",
    behavior1: "",
    behavior2: "",
    behavior3: "",
    behavior4: "",
    confidence1: "",
    confidence2: "",
    confidence3: "",
    confidence4: "",
    general1: "",
    general2: "",
    openQuestion1: "",
    openQuestion2: "",
    openQuestion3: "",
    openQuestion4: "",
    openQuestion5: "",
  });
  const [error, setError] = useState<string>("");

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleSubmit = async () => {
    onLoading(true);
    setError("");

    try {
      console.log("Starting survey submission...");
      console.log("Task ID:", taskId);
      console.log("Form data:", formData);

      // Map our form fields to the API's expected field names
      const surveyData = {
        task_id: taskId,
        survey: {
          // Basic info - API expects these specific field names
          childName: formData.childName,
          childDOB: formData.birthDate,
          childGender: formData.gender,
          parentName: formData.parentName,

          // Section 1: Emotional sphere - API expects q1_1 to q1_10 format
          q1_1: formData.emotional1,
          q1_2: formData.emotional2,
          q1_3: formData.emotional3,
          q1_4: formData.emotional4,
          q1_5: formData.social1, // Continue numbering
          q1_6: formData.social2,
          q1_7: formData.social3,
          q1_8: formData.social4,
          q1_9: formData.behavior1,
          q1_10: formData.behavior2,

          // Section 2: API expects q2_1 to q2_10 format
          q2_1: formData.behavior3,
          q2_2: formData.behavior4,
          q2_3: formData.confidence1,
          q2_4: formData.confidence2,
          q2_5: formData.confidence3,
          q2_6: formData.confidence4,
          q2_7: formData.general1,
          q2_8: formData.general2,
          q2_9: "1", // Placeholder for required fields
          q2_10: "1", // Placeholder for required fields

          // Section 3: API expects q3_1 to q3_10 format
          q3_1: "1", // Placeholder for required fields
          q3_2: "1",
          q3_3: "1",
          q3_4: "1",
          q3_5: "1",
          q3_6: "1",
          q3_7: "1",
          q3_8: "1",
          q3_9: "1",
          q3_10: "1",

          // Section 4: API expects q4_1 to q4_10 format
          q4_1: "1", // Placeholder for required fields
          q4_2: "1",
          q4_3: "1",
          q4_4: "1",
          q4_5: "1",
          q4_6: "1",
          q4_7: "1",
          q4_8: "1",
          q4_9: "1",
          q4_10: "1",

          // Emotional state - seems to be a required field
          emotionalState: formData.general1 || "3", // Use general assessment or default
        },
      };

      console.log(
        "Survey data to be sent:",
        JSON.stringify(surveyData, null, 2)
      );

      const response = await fetch(
        "https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
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

      const responseData = await response.json();
      console.log("Response data:", responseData);

      onSubmitComplete(formData);
    } catch (err) {
      console.error("Survey submission error details:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      setError(
        `Ошибка при отправке анкеты: ${
          err instanceof Error ? err.message : "Unknown error"
        }. Пожалуйста, попробуйте снова.`
      );
    } finally {
      onLoading(false);
    }
  };

  const RadioQuestion = ({
    field,
    question,
  }: {
    field: keyof FormData;
    question: string;
  }) => (
    <div className="py-4 border-b border-gray-100">
      <p className="text-sm text-gray-700 mb-3">{question}</p>
      <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-2 xl:flex-nowrap xl:space-x-6">
        {[
          { value: "1", label: "Очень редко" },
          { value: "2", label: "Редко" },
          { value: "3", label: "Иногда" },
          { value: "4", label: "Часто" },
          { value: "5", label: "Всегда" },
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer whitespace-nowrap"
          >
            <input
              type="radio"
              name={field}
              value={option.value}
              checked={formData[field] === option.value}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2 flex-shrink-0"
            />
            <span className="text-sm text-gray-600">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const isFormValid = () => {
    // Check basic information fields
    if (
      !formData.childName ||
      !formData.birthDate ||
      !formData.gender ||
      !formData.parentName
    ) {
      return false;
    }

    // Check rating scale questions (all sections)
    const ratingFields = [
      "emotional1",
      "emotional2",
      "emotional3",
      "emotional4",
      "social1",
      "social2",
      "social3",
      "social4",
      "behavior1",
      "behavior2",
      "behavior3",
      "behavior4",
      "confidence1",
      "confidence2",
      "confidence3",
      "confidence4",
      "general1",
      "general2",
    ];

    for (const field of ratingFields) {
      if (!formData[field as keyof FormData]) {
        return false;
      }
    }

    // Check open-ended questions
    const openFields = [
      "openQuestion1",
      "openQuestion2",
      "openQuestion3",
      "openQuestion4",
      "openQuestion5",
    ];
    for (const field of openFields) {
      if (!formData[field as keyof FormData]) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Общая информация о ребенке
        </h1>

        {/* Basic Information */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя ребенка
            </label>
            <input
              type="text"
              value={formData.childName}
              onChange={(e) => handleInputChange("childName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Лучия"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата рождения ребенка
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пол ребенка
            </label>
            <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-x-6 lg:gap-y-2 xl:flex-nowrap xl:space-x-6">
              <label className="flex items-center cursor-pointer whitespace-nowrap">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2 flex-shrink-0"
                />
                <span className="text-sm text-gray-700">Мужской</span>
              </label>
              <label className="flex items-center cursor-pointer whitespace-nowrap">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2 flex-shrink-0"
                />
                <span className="text-sm text-gray-700">Женский</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя родителя, заполняющего анкету
            </label>
            <input
              type="text"
              value={formData.parentName}
              onChange={(e) => handleInputChange("parentName", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Анонимно"
            />
          </div>
        </div>

        {/* Info sections */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="w-8 h-8 text-orange-600 mr-3 flex-shrink-0">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 21V10l3-7c.552 0 1 .448 1 1v4.586L19.414 9H22c.552 0 1 .448 1 1l-1 11c0 .552-.448 1-1 1H8zM4 21H6V10H4c-.552 0-1 .448-1 1v9c0 .552.448 1 1 1z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-800 leading-relaxed">
                Пожалуйста, внимательно прочитайте каждый вопрос и выберите
                наиболее подходящий вариант ответа, отражающий поведение и
                эмоциональное состояние вашего ребенка в течение последних 2-4
                недель. Отвечайте максимально честно и искренне, так как от
                этого зависит точность оценки психоэмоционального развития
                Вашего ребенка.
              </p>
            </div>
          </div>

          <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 text-green-600 mr-3 flex-shrink-0">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-800 font-medium">
                Все вопросы обязательны к заполнению
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Emotional sphere */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Раздел 1. Эмоциональная сфера
          </h2>
          <RadioQuestion
            field="emotional1"
            question="Ребенок часто выражает радость и удовольствие:"
          />
          <RadioQuestion
            field="emotional2"
            question="Ребенок часто выражает злость и удовольствие:"
          />
          <RadioQuestion
            field="emotional3"
            question="Ребенок часто грустит или плачет без видимой причины:"
          />
          <RadioQuestion
            field="emotional4"
            question="Ребенок часто грустит или плачет без видимой причины:"
          />
        </div>

        {/* Section 2: Social interaction */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Раздел 2. Социальное взаимодействие
          </h2>
          <RadioQuestion
            field="social1"
            question="Ребенок легко заводит друзей:"
          />
          <RadioQuestion
            field="social2"
            question="Ребенок легко заводит друзей:"
          />
          <RadioQuestion
            field="social3"
            question="Ребенок предпочитает играть один, а не с другими детьми:"
          />
          <RadioQuestion
            field="social4"
            question="Ребенок предпочитает играть один, а не с другими детьми:"
          />
        </div>

        {/* Section 3: Self-regulation and behavior */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Раздел 3. Саморегуляция и поведение
          </h2>
          <RadioQuestion
            field="behavior1"
            question="Ребенок умеет следовать правилам и инструкциям:"
          />
          <RadioQuestion
            field="behavior2"
            question="Ребенок умеет следовать правилам и инструкциям:"
          />
          <RadioQuestion
            field="behavior3"
            question="Ребенку трудно контролировать свои импульсы:"
          />
          <RadioQuestion
            field="behavior4"
            question="Ребенку трудно контролировать свои импульсы:"
          />
        </div>

        {/* Section 4: Relationships and self-confidence */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Раздел 4. Отношения и уверенность в себе
          </h2>
          <RadioQuestion
            field="confidence1"
            question="Ребенок уверен в своих силах и способностях:"
          />
          <RadioQuestion
            field="confidence2"
            question="Ребенок уверен в своих силах и способностях:"
          />
          <RadioQuestion
            field="confidence3"
            question="Ребенок часто сомневается в себе:"
          />
          <RadioQuestion
            field="confidence4"
            question="Ребенок часто сомневается в себе:"
          />
        </div>

        {/* Section 5: General questions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Раздел 5. Общие вопросы
          </h2>
          <RadioQuestion
            field="general1"
            question="Как Вы оцениваете общее эмоциональное состояние Вашего ребенка?"
          />
          <RadioQuestion
            field="general2"
            question="Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы хотели бы сообщить дополнительно?"
          />
        </div>

        {/* Open-ended questions */}
        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Есть ли у Вашего ребенка какие-либо особенности развития или
              поведения, о которых Вы хотели бы сообщить дополнительно?
            </label>
            <textarea
              value={formData.openQuestion1}
              onChange={(e) =>
                handleInputChange("openQuestion1", e.target.value)
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Нет особенностей"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Как, по Вашему мнению, изменилось поведение или настроение ребенка
              за последнее время (например, стал более агрессивным, замкнутым,
              активным и т.п.)?
            </label>
            <textarea
              value={formData.openQuestion2}
              onChange={(e) =>
                handleInputChange("openQuestion2", e.target.value)
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Проблемы нет, поведение остается стабильным, ребенок хорошо адаптирован к изменениям в распорядке, например, может спокойно остаться до ужина у бабушки без родителей и тем более ночевать у бабушки. Дружелюбная, общительная и легко находит контакт с новыми людьми, животными. С удовольствием идет на близость к малознакомым людям."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Какие, по Вашему мнению, сильные стороны и таланты есть у Вашего
              ребенка?
            </label>
            <textarea
              value={formData.openQuestion3}
              onChange={(e) =>
                handleInputChange("openQuestion3", e.target.value)
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Очень активная, любознательная, позитивная по характеру, всегда в хорошем настроении, дружелюбная. Все схватывает буквально на лету. Быстро запоминает новую информацию и с удовольствием применяет ее на практике, например, с удовольствием изучает изо (очень хорошо рисует), в также недавно начала изучать разные виды спорта и проявляет к ним большой интерес и способность к быстрому освоению."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Какие, по Вашему мнению, области требуют особого внимания и
              развития у Вашего ребенка?
            </label>
            <textarea
              value={formData.openQuestion4}
              onChange={(e) =>
                handleInputChange("openQuestion4", e.target.value)
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Самоконтроль, например безопасность (громко разговаривает, перебивает взрослых, громко смеется и т.п.). Также можно также отметить, что ребенок очень любопытный, стремящийся к новому и порою не осознает личных границ, что порождает чувство тревоги у взрослых. Также всегда очень прямолинейная, громкая, смелая, что тоже может воспринято поведение в негативе."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Обращались ли Вы ранее к специалистам (психологу, невропатологу,
              логопеду) по поводам развития или поведения Вашего ребенка?
            </label>
            <textarea
              value={formData.openQuestion5}
              onChange={(e) =>
                handleInputChange("openQuestion5", e.target.value)
              }
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Нет, не обращались."
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-8 space-y-4 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              К загрузке рисунков
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <span className="text-sm text-gray-500 text-center sm:text-left">
              Шаг 2/3
            </span>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                isFormValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Отправить анкету
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
    </div>
  );
};

export default Questionnaire;
