export function addition(numbers: string): number {
  
  if (!numbers) return 0;

  let delimiter = /,|\n/; // Default delimiters: comma or newline * (/\[([^\[\]]+)\]/g)
  function hasCustomDelimter() {
    return numbers.startsWith("//")
  }

  if (hasCustomDelimter()) {
    const [delimiterPart, numberPart] = numbers.split("\n", 2);
    const customDelimiter = delimiterPart.slice(2).replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    delimiter = new RegExp(customDelimiter); // is creating a new regular expression object based on the value of customDelimiter.
    numbers = numberPart;
  }

  const numArray = numbers.split(delimiter).map(Number);  // 1;2;3;4  becomes 1,2,3,4

  // Check for negative numbers
  const negatives = numArray.filter((num) => num < 0);
  if (negatives.length) throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);

  // Determine if we're summing or multiplying
  const isMultiplication = delimiter.source === "\\*";
  const initialValue = isMultiplication ? 1 : 0;

  const calculate = isMultiplication
    ? (a: number, b: number) => a * b
    : (a: number, b: number) => a + b;

  // Count occurrences and apply cubing rule
  const counts = numArray.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);


  return Object.entries(counts)   // ex {1: 1, 2: 3, 3: 1. 4:2}  to  [ ["1", 1], ["2", 3],["3", 1], ["4", 2]]
    .reduce((result, [key, count]) => {
    const num = Number(key); // Convert key to a number
    const value = count >= 3 ? Math.pow(num, 3) : num * count;
    return calculate(result, value);
  }, initialValue);
}
