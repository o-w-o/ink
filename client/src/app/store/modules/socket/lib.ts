import { WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";
import { remoteUrl } from "@o-w-o/config/websocket";

enum SocketConnectionStatus {
  PENDING,
  OK,
  FAILURE,
}

class SocketHelper {
  subject: any;
  pending: boolean = true;
  status: SocketConnectionStatus = SocketConnectionStatus.PENDING;
  webSocketSubjectConfig: WebSocketSubjectConfig<any>;

  async $o(cb?: Function) {
    while (this.pending) {
      switch (this.status) {
        case SocketConnectionStatus.PENDING: {
          await new Promise((resolve) => {
            console.log("等待连接……", this.status);
            setTimeout(resolve, 1000);
          });
          break;
        }
        case SocketConnectionStatus.OK: {
          this.pending = false;
          console.log("连接完成。", this.status);
          break;
        }
        case SocketConnectionStatus.FAILURE: {
          this.pending = false;
          console.log("连接异常！", this.status);
          break;
        }
      }
    }

    if (cb) {
      await cb();
    }
  }

  initConfig() {
    const s = (ss) => (this.status = ss);
    this.webSocketSubjectConfig = {
      url: remoteUrl(),
      openObserver: {
        next: () => {
          console.log("建立连接！");
          this.subject.next();
          this.pending = false;
          s(SocketConnectionStatus.OK);
        },
      },
      closeObserver: {
        next(closeEvent) {
          console.log(`连接断开！evt ->`, closeEvent);
          s(SocketConnectionStatus.FAILURE);
        },
      },
      binaryType: "arraybuffer",
    };
  }

  initSubject() {
    this.subject = new WebSocketSubject(this.webSocketSubjectConfig).pipe();
  }

  async init() {
    this.initConfig();
    this.initSubject();
  }

  $() {
    return this.subject;
  }

  test() {
    setInterval(() => {
      this.subject.next(`hi + ${new Date().getDay()} `);
    }, 3000);
  }
}

export const socketHelper = new SocketHelper();
