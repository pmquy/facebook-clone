import {io}  from "socket.io-client";
import { localhost } from "./utils/utils";
export const socket = io(`${localhost}:3000`)