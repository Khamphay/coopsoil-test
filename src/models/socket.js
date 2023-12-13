import { io } from "socket.io-client";

export function socket() {
  let client = io("http://127.0.0.1:5000", { autoConnect: true });
  return client;
}
