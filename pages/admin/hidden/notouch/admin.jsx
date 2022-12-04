import { useState } from "react";
import QRScan from "../../../../components/QRScan";

export default function Admin() {
  const [data, setData] = useState();
  return (
    <>
      <QRScan setData={setData} />
      <h1>{data}</h1>
    </>
  );
}
