function Calculator() {
  const backgroundColor = "#7e66ad";
  const keyColor = "#0bdbfb";

  const keys = [
    "%",
    "CE",
    "C",
    "⬅",
    "1/x",
    "x²",
    "√",
    "➗",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "±",
    "0",
    ",",
    "=",
  ];

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
                  backgroundColor: "blue",
                  borderRadius: "15px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: backgroundColor,
                }}
              ></div>
              <div>
                {keys.map((key) => (
                  <button
                    style={{
                      backgroundColor: keyColor,
                      width: "75px",
                      height: "75px",
                      float: "left",
                      borderRadius: "15px",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: backgroundColor,
                    }}
                    onClick={() => {}}
                  >
                    {key}
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
