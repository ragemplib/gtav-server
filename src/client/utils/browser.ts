import rpc from "rage-rpc";

class Browser {
  private hud: BrowserMp | null = null;

  constructor() {
    this.anyEvents();
  }

  private anyEvents(): void {
    mp.events.add({
      // Сделать обновление данных (online) каждые 5-10 секунд. (ПОТОМ)
      hudDataWithRPC: async (uid: number, admin: boolean) => {
        if (!this.hud) {
          const data = {
            uid: uid,
            isAdmin: admin,
            online: mp.players.length,
          };

          this.hud = mp.browsers.new("http://localhost:3000/hud");
          await rpc.callBrowser(this.hud, "hudSetData", { ...data });
        } else {
          this.hud.destroy();
          this.hud = null;
        }
      },
    });
  }

  public async createNewBrowser(): Promise<void> {
    
  }
}

const browser = new Browser();

export default browser;