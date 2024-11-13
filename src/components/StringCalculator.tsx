import { add } from "@/utils/calculator";
import { useState } from "react";

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const calculate = () => {
    try {
      const sum: number = add(input);
      setResult(sum.toString());
      setIsError(false);
    } catch (error) {
      setResult(`${error}`);
      setIsError(true);
    }
  };

  const clear = () => {
    setIsError(false);
    setInput("");
    setResult("");
  };

  return (
    <>
   <h2 className="text-lg font-bold mb-8 text-black text-center mt-28">Simple String Calculator</h2>
      <div className="max-w-2xl mx-auto p-5 mt-18 bg-white rounded-lg shadow-md bg-gradient-to-r border-2 border-green-900">
        <div className="flex flex-col">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            cols={50}
            className="p-2 text-sm text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 border-2"
            placeholder="Enter numbers separated by commas"
          />
          <div className="flex flex-row  flex justify-end">
            <button
              onClick={calculate}
              className="mt-4 py-2 px-4 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Calculate
            </button>
            <button
              onClick={clear}
              className="ml-4 mt-4 py-2 px-4 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              Clear
            </button>
          </div>
        </div>
        <p className="mt-4 text-lg font-bold mx-auto text-left">
        Answer:{" "}
        <span className={` ${isError ? "text-red-500" : "text-green-600"} `}>
          {result}
        </span>
      </p>
      </div>
    </>
  );
};

export default StringCalculator;
