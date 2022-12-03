import React from "react";
import { useQRCode } from "next-qrcode";

function QR(props) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={`name=${props.name}|studentId=${props.studentId}`}
      options={{
        level: "M",
        margin: 3,
        scale: 4,
        width: 300,
      }}
    />
  );
}

export default QR;
