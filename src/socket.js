import { io } from "socket.io-client";
export const socket = () => {
  const socket = io("http://127.0.0.1:5000");
  return socket;
};
