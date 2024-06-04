// priceWorker.js

let socket;

onmessage = function (e) {
  if (e.data === "start") {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

      socket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        postMessage(message.p); // Fiyat bilgisini gönder
      };

      socket.onerror = function (error) {
        postMessage("error");
      };
    }
  } else if (e.data === "close") {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  }
};
