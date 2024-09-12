import { useState } from "react";

enum OperationType {
  Number,
  SingleOperator,
  DoubleOperator,
}

interface OperationProps {
  data: string;
  type: OperationType;
}

const operationsList: OperationProps[] = [];

/// DISCLAIMER: the following calculator logic was created by me who didnt do any research on the  topic. It is entirely possible that my approach is horrible
function Calculator() {
  const backgroundColor = "#124672";
  const keyColor = "#a9a7de";
  const dislpayColor = "#1e5a8d";

  function onNumberPress(key: string) {
    console.log("onNumberPress " + key);
    if (
      operationsList.length === 0 ||
      operationsList[operationsList.length - 1].type !== OperationType.Number
    ) {
      setResultText(key);
      operationsList.push({ data: key, type: OperationType.Number });
    } else {
      setResultText(resultText + key);
      operationsList[operationsList.length - 1].data += key;
    }
  }

  function operationsToString(equals: boolean) {
    let equation = "";

    for (let i = 0; i < operationsList.length; i++) {
      equation += operationsList[i].data + " ";
    }

    if (equals) equation += "= ";
    return equation;
  }

  function onOperatorPress(key: string) {
    console.log("onOperatorPress " + key);
    if (operationsList.length === 0) {
      operationsList.push({ data: "0", type: OperationType.Number });
      operationsList.push({ data: key, type: OperationType.DoubleOperator });
    } else if (
      operationsList[operationsList.length - 1].type === OperationType.Number
    ) {
      operationsList.push({ data: key, type: OperationType.DoubleOperator });
    } else {
      operationsList[operationsList.length - 1].data = key;
    }

    setCalculText(operationsToString(false));
    console.log("Calc: " + operationsToString(false));
  }

  //The following doesnt check PEMDAS
  function PerformSimpleEquations(): number | undefined {
    let result: number | undefined = undefined;
    for (let i = 0; i < operationsList.length; i++) {
      if (operationsList[i].type === OperationType.Number) continue;

      if (operationsList[i].type === OperationType.DoubleOperator) {
        //Double operator need a number before and after example: 1 + 1
        if (
          i === 0 ||
          i === operationsList.length - 1 ||
          operationsList[i - 1].type !== OperationType.Number ||
          operationsList[i + 1].type !== OperationType.Number
        ) {
          result = undefined;
          break;
        }

        if (result === undefined) {
          result = parseFloat(operationsList[i - 1].data);
          if (isNaN(result)) {
            result = undefined;
            break;
          }
        }

        const other = parseFloat(operationsList[i + 1].data);
        if (isNaN(result)) {
          result = undefined;
          break;
        }

        switch (operationsList[i].data) {
          case "+":
            result += other;
            break;
          case "-":
            result -= other;
            break;
          case "X":
            result *= other;
            break;
          case "÷":
            result /= other;
            break;
          default:
            result = undefined;
            break;
        }

        if (result === undefined || isNaN(result)) {
          result = undefined;
          break;
        }
      }
    }
    return result;
  }

  function onEqualPress() {
    console.log("onEqualPress");
    if (operationsList.length !== 0) {
      const result = PerformSimpleEquations();
      console.log(operationsToString(true) + result);
      if (result === undefined) setResultText("Error");
      else setResultText(result.toString());

      setCalculText(operationsToString(true));
      operationsList.length = 0;
    }
  }

  function onBackPress() {
    console.log("onBackPress");
  }

  function onClearPress() {
    console.log("onClearPress");
    operationsList.length = 0;
    setResultText("0");
    setCalculText("");
  }

  function onClearEntryPress() {
    console.log("onClearEntryPress");
    if (
      operationsList.length !== 0 &&
      operationsList[operationsList.length - 1].type === OperationType.Number
    ) {
      operationsList.pop();
    }
    setResultText("0");
  }

  function onSignPress() {
    console.log("onSignPress");
    if (
      operationsList.length !== 0 &&
      operationsList[operationsList.length - 1].type === OperationType.Number
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
    console.log("onDotPress");
  }

  interface KeyProps {
    key: string;
    callback: ((key: string) => void) | null;
  }

  const keys: KeyProps[] = [
    { key: "%", callback: onOperatorPress },
    { key: "CE", callback: onClearEntryPress },
    { key: "C", callback: onClearPress },
    { key: "⌫", callback: onBackPress },
    { key: "1/x", callback: onOperatorPress },
    { key: "x²", callback: onOperatorPress },
    { key: "√", callback: onOperatorPress },
    { key: "÷", callback: onOperatorPress },
    { key: "7", callback: null },
    { key: "8", callback: null },
    { key: "9", callback: null },
    { key: "X", callback: onOperatorPress },
    { key: "4", callback: null },
    { key: "5", callback: null },
    { key: "6", callback: null },
    { key: "-", callback: onOperatorPress },
    { key: "1", callback: null },
    { key: "2", callback: null },
    { key: "3", callback: null },
    { key: "+", callback: onOperatorPress },
    { key: "±", callback: onSignPress },
    { key: "0", callback: null },
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
                  backgroundColor: dislpayColor,
                  borderRadius: "15px",
                  borderWidth: "4px",
                  borderStyle: "solid",
                  borderColor: backgroundColor,
                }}
              >
                {calculText === "" && <p style={{ visibility: "hidden" }}>0</p>}
                <p>{calculText}</p>
                <p>{resultText}</p>
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
                      else onNumberPress(key.key);
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
