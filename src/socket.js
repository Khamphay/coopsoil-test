import { io } from "socket.io-client";
export const socket = () => {
  const socket = io("http://100.93.101.37");
  return socket;
};
