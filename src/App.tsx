import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type Item = {
  name: string;
  status: "pending" | "done";
  createdAt: Date;
};

function App() {
  // const items: Item[] = [
  //   { name: "Write documentation", status: "pending", createdAt: new Date() },
  //   { name: "Execute code", status: "done", createdAt: new Date() },
  // ];
  const mutableValue = useRef(5);
  // let mutableValue = 5;
  console.log("MUT VALUE:", mutableValue);

  const [items, setItems] = useState<Item[]>([
    { name: "Write documentation", status: "pending", createdAt: new Date() },
    { name: "Execute code", status: "done", createdAt: new Date() },
  ]);

  // const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // useEffect(() => {
  //   const filtered = items.filter((item) => item.status === "done");
  //   setFilteredItems(filtered);
  // }, [items]);

  useEffect(() => {
    console.log("IM AN EFFECT");
  }, [items]);

  const doneItems = useMemo(
    () => items.filter((item) => item.status === "done"),
    [items]
  );

  const todayDoneItems = useMemo(() => {
    doneItems.filter((item) => {
      // following is wrong code
      item.createdAt === new Date();
    });
  }, [doneItems]);

  const ref = useRef<HTMLDivElement>(null);
  console.log("REF CURRENT:", ref.current);

  useEffect(() => {
    console.log("REF:", ref.current?.clientHeight);
    if (ref.current) {
      ref.current.style.backgroundColor = "blue";
    }
  }, []);

  useEffect(() => {
    if (items[0].status === "done") {
      mutableValue.current = 10;
      console.log("CHANGED MUT VALUE: ", mutableValue.current);
    }
  }, [items]);

  return (
    <div ref={ref} className="container" style={{ display: "flex", gap: "10" }}>
      <ul id="checklist">
        {items.map((item, ind) => (
          <li key={item.name}>
            <span>{item.name}</span>
            <input
              type="checkbox"
              defaultChecked={item.status === "done"}
              onChange={(e) => {
                console.log(
                  "NEW CHECKED VALUE: ",
                  e.target.checked ? "done" : "pending"
                );
                // items[ind].status = e.target.checked ? "done" : "pending";
                setItems((state) => {
                  const nState = state;
                  nState[ind].status = e.target.checked ? "done" : "pending";
                  return [...nState];
                });
                console.log("ITEMS: ", items);
              }}
            />
            {/* <span>Date: {item.createdAt.toDateString()}</span> */}
          </li>
        ))}
      </ul>
      <div>
        <h2>Data:</h2>
        {items.map((item) => (
          <div key={item.name}>
            <p>
              {item.name}: {item.status}
            </p>
            {/* <p>{item.createdAt.toString()}</p> */}
          </div>
        ))}
        <h2>Filtered:</h2>
        {doneItems.map((item) => (
          <div key={item.name}>
            <p>
              {item.name}: {item.status}
            </p>
            {/* <p>{item.createdAt.toString()}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
