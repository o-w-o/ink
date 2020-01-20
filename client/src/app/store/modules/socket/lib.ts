import { WebSocketSubject, WebSocketSubjectConfig } from "rxjs/webSocket";

class SocketHelper {
  subject: any;
  pending: boolean = true;
  status: number = 1;
  webSocketSubjectConfig: WebSocketSubjectConfig<any>;

  async $o(cb?: Function) {
    while (this.pending) {
      if (status) {
        await new Promise((resolve) => {
          console.log("等待连接……", this.status);
          setTimeout(resolve, 1000);
        });
      } else {
        this.pending = false;
        console.log("连接异常！", this.status);
      }
    }

    if (cb) {
      await cb();
    }
  }

  initConfig() {
    const s = (ss) => (this.status = ss);
    this.webSocketSubjectConfig = {
      url: "ws://localhost:8084",
      openObserver: {
        next: () => {
          console.log("建立连接！");
          this.subject.next();
          this.pending = false;
        },
      },
      closeObserver: {
        next(closeEvent) {
          console.log(`连接断开！evt ->`, closeEvent);
          s(-1);
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
      this.subject.next();
    }, 1000);
  }
}

export const socketHelper = new SocketHelper();

// @ts-ignore
window.s = socketHelper;
