import React, { useState } from "react";

interface ComboboxProps {
  defaultValue: string;
  data: string[];
}

const downArrowSVG = (
  <svg
    fill="#000000"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink={"http://www.w3.org/1999/xlink"}
    viewBox="0 0 512.002 512.002"
    xmlSpace={"preserve"}
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g>
        {" "}
        <g>
          {" "}
          <path d="M498.837,65.628c-7.957-3.328-17.152-1.472-23.253,4.629L256,289.841L36.416,70.257 c-6.101-6.101-15.275-7.936-23.253-4.629C5.184,68.913,0,76.721,0,85.34v106.667c0,5.675,2.24,11.093,6.251,15.083 l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251L505.751,207.09 c4.011-3.989,6.251-9.408,6.251-15.083V85.34C512,76.721,506.816,68.913,498.837,65.628z"></path>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
);

const Combobox: React.FC<ComboboxProps> = ({ data, defaultValue }) => {
  console.log(data);

  const [opened, setOpened] = useState(false);

  return (
    <>
      <div>
        <div
          style={{
            float: "right",
            width: "25px",
            height: "25px",
            display: "flex",
            flexDirection: "row",
            borderStyle: "solid",
            borderWidth: "1px",
            borderLeftStyle: "hidden",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          {downArrowSVG}
        </div>
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderBottomLeftRadius: "5px",
            borderTopLeftRadius: "5px",
            display: "flex",
            flexDirection: "row",
          }}
          onClick={() => {
            setOpened(!opened);
          }}
        >
          {defaultValue}
        </div>
        {opened && (
          <div style={{ borderStyle: "solid", borderRadius: "5px" }}>
            {data.map((item) => (
              <button>{item}</button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Combobox;
