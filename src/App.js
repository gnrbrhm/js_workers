import React, { useEffect, useState, memo } from "react";
import "./styles/main.css";
import "./styles/main.scss";

const PriceDisplay = memo(({ price }) => {
  return <p>BTC/USDT: {price} USD</p>;
});

function App() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const worker = new Worker(new URL("./priceWorker.js", import.meta.url));

    worker.postMessage("start"); // Web işçisine başlatma komutu gönder

    worker.onmessage = function (e) {
      if (e.data !== "error") {
        setPrice(e.data);
      } else {
        console.error("Fiyat çekme hatası");
      }
    };

    return () => {
      worker.postMessage("close"); // Web işçisine kapatma komutu gönder
      worker.terminate(); // Web işçisini sonlandır
    };
  }, []);

  return (
    <div className="App">
      <h1>Binance Canlı Bitcoin Fiyatı</h1>
      {price !== null ? (
        <PriceDisplay price={price} />
      ) : (
        <p>Fiyat alınıyor...</p>
      )}
    </div>
  );
}

export default App;
