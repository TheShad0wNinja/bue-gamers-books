import { useEffect, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import QRScan from "./QRScan";

const getData = (str) => {
  const parts = str.split("|");
  return parts.map((o) => o.split("=")[1]);
};

export default function Admin() {
  const [data, setData] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [numOfPoints, setNumOfPoints] = useState(0);

  useEffect(() => {
    if (confirm) {
      const [teamName, studentId] = getData(data);
      const query = encodeURI(
        `/api/points?teamName=${teamName}&studentId=${studentId}&points=${numOfPoints}`
      );
      fetch(query)
        .then(() => setConfirm(false))
        .then(() => setData());
    } else setData();
  }, [confirm]);

  return (
    <>
      <h1 className="text-2xl font-extrabold text-white">{data}</h1>
      <QRScan setData={setData} />
      {data && (
        <>
          <input
            value={numOfPoints}
            onChange={(e) => setNumOfPoints(e.target.value)}
            className="input-bordered input-primary input my-3 w-full max-w-xs"
          />
          <ConfirmationPopup
            setConfirm={setConfirm}
            numOfPoints={numOfPoints}
          />
        </>
      )}
    </>
  );
}
