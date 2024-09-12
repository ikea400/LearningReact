import { useState } from "react";

enum OperationType {
  Number,
  SingleOperator,
  DoubleOperator,
}

enum OperatorType {
  None = "None",
  Addition = "Addition",
  Substraction = "Substraction",
  Multiplication = "Multiplication",
  Division = "Division",
  Square = "Square",
  Sqrt = "Sqrt",
}

interface OperationProps {
  data: string;
  type: OperationType;
}

function findFirstNotOf(str: string, char: string): number {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== char) {
      return i;
    }
  }
  return -1;
}

function findFirstOf(str: string, char: string): number {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      return i;
    }
  }
  return -1;
}

function parseFloatWithComma(input: string) {
  return parseFloat(input.replace(",", "."));
}

//The following doesnt check PEMDAS
// function PerformSimpleEquations(): number | undefined {
//   let result: number | undefined = undefined;
//   for (let i = 0; i < operationsList.length; i++) {
//     if (operationsList[i].type === OperationType.Number) continue;
//
//     if (operationsList[i].type === OperationType.DoubleOperator) {
//       //Double operator need a number before and after example: 1 + 1
//       if (
//         i === 0 ||
//         i === operationsList.length - 1 ||
//         operationsList[i - 1].type !== OperationType.Number ||
//         operationsList[i + 1].type !== OperationType.Number
//       ) {
//         result = undefined;
//         break;
//       }
//
//       if (result === undefined) {
//         result = parseFloatWithComma(operationsList[i - 1].data);
//         console.log("parsed: " + result);
//         if (isNaN(result)) {
//           result = undefined;
//           break;
//         }
//       }
//
//       const other = parseFloatWithComma(operationsList[i + 1].data);
//       if (isNaN(result)) {
//         result = undefined;
//         break;
//       }
//
//       switch (operationsList[i].data) {
//         case "+":
//           result += other;
//           break;
//         case "-":
//           result -= other;
//           break;
//         case "X":
//           result *= other;
//           break;
//         case "÷":
//           result /= other;
//           break;
//         default:
//           result = undefined;
//           break;
//       }
//
//       if (result === undefined || isNaN(result) || !isFinite(result)) {
//         result = undefined;
//         break;
//       }
//     }
//   }
//   return result;
// }

function PerformPemdasEquation(): number | undefined {
  let hasError = false;
  const operatorPriority = [
    {
      list: [OperatorType.Square, OperatorType.Sqrt],
      isDouble: false,
    },
    {
      list: [OperatorType.Multiplication, OperatorType.Division],
      isDouble: true,
    },
    {
      list: [OperatorType.Addition, OperatorType.Substraction],
      isDouble: true,
    },
  ];

  const operationsCopy: (number | string)[] = [];
  operationsList.forEach((operation) => {
    if (operation.type === OperationType.Number) {
      const value = parseFloatWithComma(operation.data);
      if (isNaN(value)) {
        hasError = true;
      }
      operationsCopy.push(value);
    } else if (
      operation.type === OperationType.DoubleOperator ||
      operation.type === OperationType.SingleOperator
    ) {
      let operator = OperatorType.None;
      switch (operation.data) {
        case "+":
          operator = OperatorType.Addition;
          break;
        case "X":
          operator = OperatorType.Multiplication;
          break;
        case "-":
          operator = OperatorType.Substraction;
          break;
        case "÷":
          operator = OperatorType.Division;
          break;
        case "x²":
          operator = OperatorType.Square;
          break;
        case "√":
          operator = OperatorType.Sqrt;
          break;
        default:
          hasError = true;
          break;
      }

      operationsCopy.push(operator);
    } else hasError = true;
  });

  console.log("Start " + operationsCopy);

  if (hasError) return undefined;

  operatorPriority.forEach((operators) => {
    console.log("Checking op " + operators);
    let bestPos: number;
    do {
      bestPos = -1;
      operators.list.forEach((operator) => {
        const index = operationsCopy.indexOf(operator);
        if (bestPos === -1) {
          bestPos = index;
        } else if (index !== -1) {
          if (index < bestPos) bestPos = index;
        }
      });
      console.log("bestPos " + bestPos);
      if (bestPos > -1) {
        //Handle double operator like +-*x (1+1)(1*1)
        if (operators.isDouble) {
          //Currently handle only the double operator  ex: +-X/  and not the single op like sqrt
          if (
            bestPos === 0 ||
            bestPos === operationsCopy.length - 1 ||
            typeof operationsCopy[bestPos - 1] !== "number" ||
            typeof operationsCopy[bestPos + 1] !== "number" ||
            typeof operationsCopy[bestPos] === "number"
          ) {
            console.log("shit " + typeof operationsCopy[bestPos]);
            hasError = true;
            break;
          }

          const first = operationsCopy[bestPos - 1] as number;
          const second = operationsCopy[bestPos + 1] as number;
          let value = first;
          console.log(
            "Calculating: " +
              first +
              " " +
              operationsCopy[bestPos] +
              " " +
              second,
          );
          switch (operationsCopy[bestPos]) {
            case OperatorType.Addition:
              value += second;
              break;
            case OperatorType.Substraction:
              value -= second;
              break;
            case OperatorType.Multiplication:
              value *= second;
              break;
            case OperatorType.Division:
              value /= second;
              break;
            default:
              hasError = true;
              break;
          }

          // abcdefgh lets take d has the index. We want to  get abXfgh
          // 1. Modify d to X -> abcXefgh
          // 2. Remove d-1(c) -> abXefgh
          // 3. Remove d+1(e) -> abXfgh

          operationsCopy[bestPos] = value;
          operationsCopy.splice(bestPos - 1, 1);
          operationsCopy.splice(bestPos, 1);
          console.log(operationsCopy);
        } else {
          //Handle single operator like sqrt and power
          if (
            bestPos === 0 ||
            typeof operationsCopy[bestPos - 1] !== "number" ||
            typeof operationsCopy[bestPos] === "number"
          ) {
            hasError = true;
            break;
          }

          let value = operationsCopy[bestPos - 1] as number;
          switch (operationsCopy[bestPos]) {
            case OperatorType.Square:
              value *= value;
              break;
            case OperatorType.Sqrt:
              value = Math.sqrt(value);
              break;
            default:
              hasError = true;
              break;
          }

          // abcdefgh lets take d has the index. We want to  get abXefgh where X is the calculated value
          // 1. Modify d to X -> abcXefgh
          // 2. Remove d-1(c) -> abXefgh

          operationsCopy[bestPos] = value;
          operationsCopy.splice(bestPos - 1, 1);
        }
      }
    } while (bestPos !== -1 && !hasError);
  });

  if (hasError || operationsCopy.length !== 1) return undefined;

  return operationsCopy[0] as number;
}

const operationsList: OperationProps[] = [];
let lastResult = 0;

/// DISCLAIMER: the following calculator logic was created by me who didn't do any research on the  topic. It is entirely possible that my approach is horrible
function Calculator() {
  const backgroundColor = "#124672";
  const keyColor = "#a9a7de";
  const displayColor = "#1e5a8d";

  function onNumberPress(key: string) {
    if (
      operationsList.length === 0 ||
      operationsList[operationsList.length - 1].type !== OperationType.Number
    ) {
      if (operationsList.length === 0) setCalculText("");
      setResultText(key);
      operationsList.push({ data: key, type: OperationType.Number });
    } else {
      if (
        -1 ===
        findFirstNotOf(operationsList[operationsList.length - 1].data, "0")
      ) {
        setResultText(key);
        operationsList[operationsList.length - 1].data = key;
      } else {
        setResultText(resultText + key);
        operationsList[operationsList.length - 1].data += key;
      }
    }
  }

  function operationsToString(equals: boolean) {
    const reorderedOperation: string[] = [];
    for (let i = 0; i < operationsList.length; i++) {
      switch (operationsList[i].data) {
        case "x²":
          if (reorderedOperation[reorderedOperation.length - 1].endsWith(" ")) {
            reorderedOperation[reorderedOperation.length - 1] =
              reorderedOperation[reorderedOperation.length - 1].slice(0, -1);
          }
          reorderedOperation.push("² ");
          break;
        case "1/x":
          reorderedOperation.push(
            reorderedOperation[reorderedOperation.length - 1],
          );
          reorderedOperation[reorderedOperation.length - 2] = "1/";
          break;
        case "√":
          reorderedOperation.push(
            reorderedOperation[reorderedOperation.length - 1],
          );
          reorderedOperation[reorderedOperation.length - 2] = "√";
          break;
        default:
          reorderedOperation.push(operationsList[i].data + " ");
          break;
      }
    }
    console.log("original " + operationsList);
    console.log("ordered " + reorderedOperation);
    let equation = "";

    for (let i = 0; i < reorderedOperation.length; i++) {
      equation += reorderedOperation[i];
    }

    if (equals) equation += "= ";
    return equation;
  }

  function onSingleOperatorPress(key: string) {
    if (operationsList.length === 0) {
      operationsList.push({
        data: lastResult.toString().replace(".", ","),
        type: OperationType.Number,
      });
      operationsList.push({ data: key, type: OperationType.SingleOperator });
    } else if (
      operationsList[operationsList.length - 1].type === OperationType.Number
    ) {
      operationsList.push({ data: key, type: OperationType.SingleOperator });
    } else {
      operationsList[operationsList.length - 1].data = key;
    }

    setCalculText(operationsToString(false));
  }

  function onDoubleOperatorPress(key: string) {
    if (operationsList.length === 0) {
      operationsList.push({
        data: lastResult.toString().replace(".", ","),
        type: OperationType.Number,
      });
      operationsList.push({ data: key, type: OperationType.DoubleOperator });
    } else if (
      operationsList[operationsList.length - 1].type === OperationType.Number ||
      operationsList[operationsList.length - 1].type ===
        OperationType.SingleOperator
    ) {
      operationsList.push({ data: key, type: OperationType.DoubleOperator });
    } else {
      operationsList[operationsList.length - 1].data = key;
    }

    setCalculText(operationsToString(false));
    console.log("Calc: " + operationsToString(false));
  }

  function onEqualPress() {
    if (operationsList.length !== 0) {
      const result = PerformPemdasEquation(); //PerformSimpleEquations();
      console.log(operationsToString(true) + result);
      if (result === undefined) setResultText("Error");
      else {
        lastResult = result;
        setResultText(result.toString().replace(".", ","));
      }

      setCalculText(operationsToString(true));
      operationsList.length = 0;
    }
  }

  function onBackPress() {
    if (operationsList.length !== 0) {
      if (
        operationsList[operationsList.length - 1].type === OperationType.Number
      ) {
        operationsList[operationsList.length - 1].data = operationsList[
          operationsList.length - 1
        ].data.slice(0, -1);
        setResultText(operationsList[operationsList.length - 1].data);
      }
    } else setCalculText("");
  }

  function onClearPress() {
    operationsList.length = 0;
    lastResult = 0;
    setResultText("0");
    setCalculText("");
  }

  function onClearEntryPress() {
    if (operationsList.length !== 0) {
      if (
        operationsList[operationsList.length - 1].type === OperationType.Number
      ) {
        operationsList.pop();
      }
    } else {
      setCalculText("");
    }
    setResultText("0");
  }

  function onSignPress() {
    if (operationsList.length === 0) {
      if (lastResult !== 0)
        operationsList.push({
          data: lastResult.toString().replace(".", ","),
          type: OperationType.Number,
        });
    }
    if (
      operationsList.length !== 0 &&
      operationsList[operationsList.length - 1].type === OperationType.Number &&
      -1 !== findFirstNotOf(operationsList[operationsList.length - 1].data, "0")
    ) {
      if (operationsList[operationsList.length - 1].data[0] === "-") {
        operationsList[operationsList.length - 1].data =
          operationsList[operationsList.length - 1].data.slice(1);
      } else {
        operationsList[operationsList.length - 1].data =
          "-" + operationsList[operationsList.length - 1].data;
      }
      setResultText(operationsList[operationsList.length - 1].data);
    }
  }

  function onDotPress() {
    if (
      operationsList.length === 0 ||
      operationsList[operationsList.length - 1].type !== OperationType.Number
    ) {
      if (operationsList.length === 0) setCalculText("");
      operationsList.push({ data: "0,", type: OperationType.Number });
      setResultText(operationsList[operationsList.length - 1].data);
    } else if (
      findFirstOf(operationsList[operationsList.length - 1].data, ",") === -1
    ) {
      operationsList[operationsList.length - 1].data += ",";
      setResultText(operationsList[operationsList.length - 1].data);
    }
  }

  interface KeyProps {
    key: string;
    callback: ((key: string) => void) | null;
  }

  const keys: KeyProps[] = [
    { key: "%", callback: onSingleOperatorPress },
    { key: "CE", callback: onClearEntryPress },
    { key: "C", callback: onClearPress },
    { key: "⌫", callback: onBackPress },
    { key: "1/x", callback: onSingleOperatorPress },
    { key: "x²", callback: onSingleOperatorPress },
    { key: "√", callback: onSingleOperatorPress },
    { key: "÷", callback: onDoubleOperatorPress },
    { key: "7", callback: onNumberPress },
    { key: "8", callback: onNumberPress },
    { key: "9", callback: onNumberPress },
    { key: "X", callback: onDoubleOperatorPress },
    { key: "4", callback: onNumberPress },
    { key: "5", callback: onNumberPress },
    { key: "6", callback: onNumberPress },
    { key: "-", callback: onDoubleOperatorPress },
    { key: "1", callback: onNumberPress },
    { key: "2", callback: onNumberPress },
    { key: "3", callback: onNumberPress },
    { key: "+", callback: onDoubleOperatorPress },
    { key: "±", callback: onSignPress },
    { key: "0", callback: onNumberPress },
    { key: ",", callback: onDotPress },
    { key: "=", callback: onEqualPress },
  ];

  const [calculText, setCalculText] = useState("");
  const [resultText, setResultText] = useState("0");

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div
              style={{
                width: "300px",
                height: "550px",
                backgroundColor: backgroundColor,
              }}
            >
              <div
                style={{
                  width: "300px",
                  height: "100px",
                  backgroundColor: displayColor,
                  borderRadius: "15px",
                  borderWidth: "4px",
                  borderStyle: "solid",
                  borderColor: backgroundColor,
                }}
              >
                {calculText === "" && <p style={{ visibility: "hidden" }}>0</p>}
                <p style={{ textAlign: "right" }}>{calculText}</p>
                <p style={{ textAlign: "right" }}>{resultText}</p>
              </div>
              <div>
                {keys.map((key, index) => (
                  <button
                    key={"Calc key " + key + index}
                    style={{
                      backgroundColor: keyColor,
                      width: "75px",
                      height: "75px",
                      float: "left",
                      borderRadius: "15px",
                      borderWidth: "4px",
                      borderStyle: "solid",
                      borderColor: backgroundColor,
                    }}
                    onClick={() => {
                      if (key.callback) key.callback(key.key);
                    }}
                  >
                    {key.key}
                  </button>
                ))}
              </div>
            </div>
            <i>Calc</i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
