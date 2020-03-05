import {
  triggerSocket,
  dispatchSocket,
  socketEpic,
  SOCKET_NAMESPACE,
} from "./epics";
import { socketHelper } from "./lib";

export const socketStore = {
  name: SOCKET_NAMESPACE,
  emitters: {
    triggerSocket,
    dispatchSocket,
  },
  epic: socketEpic,
  helper: socketHelper,
};
