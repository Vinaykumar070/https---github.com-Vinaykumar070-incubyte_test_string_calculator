import StringCalculator from "@/components/StringCalculator";
import { render, screen } from "@testing-library/react";
import { addition } from "@/helper/calculator";

describe("StringCalculator Component", () => {
  test("renders heading with correct text", () => {
    render(<StringCalculator />);

    const headingElement = screen.getByRole("heading", {
      name: "Simple String Calculator",
    });
    expect(headingElement).toBeInTheDocument();
  });
});

describe("addition function", () => {
  test("should return 0 for an empty string input", () => {
    expect(addition("")).toBe(0);
  });

  test("should return the number itself for a single number input", () => {
    expect(addition("1")).toBe(1);
    expect(addition("7")).toBe(7);
    expect(addition("21")).toBe(21);
  });

  test("should return the sum of two comma-separated numbers", () => {
    expect(addition("1,5")).toBe(6);
    expect(addition("5,5")).toBe(10);
    expect(addition("4,3")).toBe(7);
    expect(addition("7,2")).toBe(9);
  });

  test("should return the sum of multiple comma-separated numbers", () => {
    expect(addition("1,5,4")).toBe(10);
    expect(addition("5,5,7,8")).toBe(25);
    expect(addition("4,3,99,100")).toBe(206);
    expect(addition("7,2,1000,150000,21")).toBe(151030);
  });

  test("should handle newline characters between numbers", () => {
    expect(addition("1\n2,3")).toBe(6);
    expect(addition("4\n5\n6")).toBe(15);
  });

  test("should support custom delimiters", () => {
    expect(addition("//;\n1;2")).toBe(3);
    expect(addition("//-\n2-3-4")).toBe(9);
    expect(addition("//^\n1^3^4^6")).toBe(14);
  });

  test("should throw an error for negative numbers, listing all negatives", () => {
    expect(() => addition("21,0,-3")).toThrow("negative numbers not allowed: -3");
    expect(() => addition("1,-2,3")).toThrow("negative numbers not allowed: -2");
    expect(() => addition("1,-2,-3")).toThrow("negative numbers not allowed: -2,-3");
    expect(() => addition("-1,-2,-3,-4,-5,-6,-7,-8,-9")).toThrow(
      "negative numbers not allowed: -1,-2,-3,-4,-5,-6,-7,-8,-9"
    );
  });

  test("should multiply numbers when custom delimiter is '*'", () => {
    expect(addition("//*\n1*2")).toBe(2);
    expect(addition("//*\n2*3*4")).toBe(24);
    expect(addition("//*\n1*3*4*6")).toBe(72);
  });

  test("should handle complex custom delimiters of any length", () => {
    expect(addition("//;*\n1;*2")).toBe(3);
    expect(addition("//--\n2--3--4")).toBe(9);
    expect(addition("//^$^\n1^$^3^$^4^$^6")).toBe(14);
    expect(addition("//^xy\n1^xy3^xy4^xy6")).toBe(14);
  });

  test("should addition the cube of a number if it appears more than 3 times", () => {
    expect(addition("//;\n1;2;2;2")).toBe(9); // 2 appears 3 times, addition 2^3
    expect(addition("//+\n3+2+3+1+3+3+3+3")).toBe(30); // 3 appears 4 times, addition 3^3
    expect(addition("//+\n3+2+3+1+3+3+3+3+4+6+1+4+3+4")).toBe(101); // multiple occurrences handled
  });

  // Additional edge case tests
  test("should handle large numbers", () => {
    expect(addition("1000,2000,3000")).toBe(6000);
  });

  test("should handle mixed delimiters and numbers with multiple rules applied", () => {
    expect(addition("//;*\n1;*2;*3;*4")).toBe(10); // simple addition
    expect(addition("//;*\n1;*2;*2;*2")).toBe(9); // 2 appears 3 times, addition 2^3
    expect(addition("//*\n3*2*3*3*3*3")).toBe(54); // mix multiplication and cube rule
  });
});
