import { addition } from "@/helper/calculator";
import { useState } from "react";

const StringCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCalculation = () => {
    try {
      const result: number = addition(inputValue);
      setCalculationResult(result.toString());
      setHasError(false);
    } catch (error) {
      setCalculationResult(`${error}`);
      setHasError(true);
    }
  };

  const resetCalculator = () => {
    setHasError(false);
    setInputValue("");
    setCalculationResult("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 mt-12 text-center">
        Simple String Calculator
      </h2>
      <div className="max-w-lg w-full bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={4}
          className="w-full p-3 mb-4 text-gray-700 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter numbers separated by commas (e.g., 1,2,3)"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCalculation}
            className="py-2 px-6 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200"
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="py-2 px-6 text-sm font-semibold text-blue-600 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
          >
            Clear
          </button>
        </div>
        {calculationResult && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-700">
              Answer:{" "}
              <span className={hasError ? "text-red-600" : "text-green-600"}>
                {calculationResult}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringCalculator;
