import React, { useState } from "react";

interface ToolbarProps {
  list: string[];
  onChange: (current: string) => void;
  current: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ list, onChange, current }) => {
  return (
    <div className="btn-group">
      {list.map((item, index) => (
        <a
          href="#"
          className={`btn btn-primary ${item === current || (current === "" && index === 0) ? "active" : ""}`}
          aria-current={
            item === current || (current === "" && index === 0)
              ? "page"
              : undefined
          }
          onClick={() => {
            onChange(item);
          }}
        >
          {item}
        </a>
      ))}
    </div>
  );
};

export default Toolbar;
