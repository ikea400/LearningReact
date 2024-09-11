import RandomImageList from "./components/RandomImageList.tsx";
import Toolbar from "./components/Toolbar.tsx";
import InfoForm from "./components/InfoForm.tsx";
import Calculator from "./components/Calculator.tsx";
import { useState } from "react";

function App() {
  const [current, setCurrent] = useState("");
  return (
    <>
      <Toolbar
        list={["images", "form", "calc", "Four"]}
        onChange={(current: string) => {
          setCurrent(current);
          console.log(current);
        }}
        current={current}
      />
      <h1>Test</h1>
      {current === "images" && <RandomImageList />}
      {current === "form" && <InfoForm />}
      {current === "calc" && <Calculator />}
    </>
  );
}

export default App;
