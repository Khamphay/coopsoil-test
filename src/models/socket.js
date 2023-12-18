import { io } from "socket.io-client";

export function socket() {
  let client = io("http://100.93.101.37", { autoConnect: true });
  return client;
}
