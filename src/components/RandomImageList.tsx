import { useState } from "react";

function RandomImageList() {
  const [list, setList] = useState<string[]>([]);

  const defaultImageUrl = "https://picsum.photos/536/354";

  return (
    <>
      <i>Image Generator</i>
      <button
        className="btn btn-primary"
        onClick={() => {
          fetch(defaultImageUrl, {
            method: "GET",
          }).then((res) => {
            if (res?.url) setList([...list, res.url]);
          });
        }}
      >
        Cliquez ici
      </button>

      <ul className="list-group">
        {list.map((item, index) => (
          <img
            key={Date.now() + index + item}
            src={item}
            onClick={() => {
              // Create a copy of the list
              const listCopy = [...list];

              // Remove the item at the specified index
              listCopy.splice(index, 1);

              // Update the state with the new list
              setList(listCopy);
            }}
          />
        ))}
      </ul>
    </>
  );
}

export default RandomImageList;
