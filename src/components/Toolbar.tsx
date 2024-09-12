import React from "react";

interface ToolbarProps {
  list: string[];
  onChange: (current: string) => void;
  current: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ list, onChange, current }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className="btn-group">
            {list.map((item, index) => (
              <a
                href="#"
                key={"toolbox " + index + item}
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
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
