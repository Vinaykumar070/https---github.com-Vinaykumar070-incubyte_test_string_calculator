import { addition } from "@/helper/calculator";
import { useState, FormEvent } from "react";

const StringCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const handleCalculation = (e: FormEvent) => {
    e.preventDefault(); // Prevents the form from reloading the page
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
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-orange-300 to-purple-400 p-6">
      <h2 className="text-3xl font-extrabold text-orange-900 mb-10 mt-12 text-center shadow-md px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
        Calculator Assignment
      </h2>
      <form
        onSubmit={handleCalculation}
        className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl border-4 border-gradient-to-br from-purple-500 to-blue-500"
      >
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={4}
          className="w-full p-4 mb-6 text-gray-800 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          placeholder="Enter numbers separated by commas (e.g., 1,2,3)"
        />
        <div className="flex space-x-4 mt-4">
          <button
            type="submit" // Sets the button to submit the form
            className="py-3 px-8 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105"
          >
            Calculate
          </button>
          <button
            type="button" // Keeps this button from submitting the form
            onClick={resetCalculator}
            className="py-3 px-8 text-sm font-semibold text-blue-700 bg-gray-200 rounded-xl shadow-lg hover:bg-gray-300 transition duration-300 transform hover:scale-105"
          >
            Clear
          </button>
        </div>
        {!calculationResult && (
          <p className="text-md font-medium text-gray-700 mt-4 text-center">
            The result will be displayed here
          </p>
        )}
        {calculationResult && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold text-gray-700">
              Answer:{" "}
              <span className={hasError ? "text-red-600" : "text-green-600"}>
                {calculationResult}
              </span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default StringCalculator;
