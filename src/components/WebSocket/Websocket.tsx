import { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectInterval: ReturnType<typeof setInterval> | null = null; // Updated type

    const connectWebSocket = () => {
      socket = new WebSocket("ws://localhost:4000");

      socket.onopen = () => {
        console.log("✅ Connected to WebSocket server");
        socket!.send(JSON.stringify({ message: "Hello from client!" }));

        if (reconnectInterval) {
          clearInterval(reconnectInterval);
          reconnectInterval = null;
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 Received from server:", data);
          setMessages((prev) => [...prev, data.message]);
        } catch (error) {
          console.error("⚠️ Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = () => {
        console.warn("❌ WebSocket disconnected, attempting to reconnect...");

        if (!reconnectInterval) {
          reconnectInterval = setInterval(() => {
            console.log("🔄 Reconnecting...");
            connectWebSocket();
          }, 3000);
        }
      };

      socket.onerror = (error) => {
        console.error("⚠️ WebSocket error:", error);
        socket?.close(); // Ensure socket closes on error
      };

      setWs(socket);
    };

    connectWebSocket(); // Initialize connection

    return () => {
      socket?.close();
      if (reconnectInterval) clearInterval(reconnectInterval);
    };
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({ message: "Server Response: new user clickedd " })
      );

      //   ws.send(JSON.stringify({ message: "User clicked send!" }));
    }
  };

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
