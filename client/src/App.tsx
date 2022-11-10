import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import "./App.css";


function App() {
  const [data, setData] = useState<any>([{}]);

  useEffect(() => {
    fetch("/process")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // console.log(data);
      });
  }, []);
  return (
    <div>
      {typeof data.p === "undefined" ? (
        <p>Loading</p>
      ) : (
        data.p.map((member: any, i: number) => <p key={i}>{member}</p>)
      )}
      <Button>press me</Button>
    </div>
  );
}

export default App;
