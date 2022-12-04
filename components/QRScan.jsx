import { useState } from "react";
import { useZxing } from "react-zxing";

export default function BarcodeScanner({ setData }) {
  const { ref } = useZxing({
    onResult(result) {
      setData(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
      </p>
    </>
  );
}
