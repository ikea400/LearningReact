import RandomImageList from "./components/RandomImageList.tsx";
import Toolbar from "./components/Toolbar.tsx";
import InfoForm from "./components/InfoForm.tsx";
import Calculator from "./components/Calculator.tsx";
import Market from "./components/Market.tsx";
import { useState } from "react";

function App() {
  const pagesList = ["images", "form", "calc", "market"];
  const [current, setCurrent] = useState(pagesList[0]);

  return (
    <>
      <Toolbar
        list={pagesList}
        onChange={(current: string) => {
          setCurrent(current);
        }}
        current={current}
      />
      <h1>Test</h1>
      {current === "images" && <RandomImageList />}
      {current === "form" && <InfoForm />}
      {current === "calc" && <Calculator />}
      {current === "market" && <Market />}
    </>
  );
}

export default App;
