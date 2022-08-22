import rpc from 'rage-rpc';
import { notifyBlack } from '@/utils/notify';

let collectorBrowser: BrowserMp | null = null;

const showCollectorMenu = async() => {
  if (!collectorBrowser) {
    collectorBrowser = mp.browsers.new('http://localhost:3000/collectors');
    mp.gui.cursor.show(true, true);
    mp.players.local.freezePosition(true);
    await rpc.callBrowser(collectorBrowser, 'getJobLocation', { location: 'santos', status: 'true' });
  } else {
    collectorBrowser.destroy();
    collectorBrowser = null;
  }

  setTimeout(() => {
    mp.keys.unbind(key.E, true, showCollectorMenu);
  }, 150);
}

mp.events.add({
  callClientOpenMenuCollectors: (location: string, status: boolean) => {
    switch (location) {
      case "santos":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, showCollectorMenu);
        mp.console.logInfo('playerDialog is true', true);
        break;

      case "sandy":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, showCollectorMenu);
        break;

      case "paleto":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, showCollectorMenu);
        break;

      default:
        break;
    }
  },

  callServerPlayerStartWorkOnCollectors: (location: string) => {
    mp.events.callRemote('playerStartWorkOnCollectors', location)
  },

  callServerPlayerStopWorkOnCollectors: () => {
    mp.events.callRemote('playerStopWorkOnCollectors');
  }
})

class ClientCollectors {
  constructor() {
    // mp.events.add('callClientOpenMenuCollectors', this.playerDialog.bind(this));
    // mp.events.add('callServerPlayerStartWorkOnCollectors', this.playerStartWorkCollectors.bind(this));
    // mp.events.add('callServerPlayerStopWorkOnCollectors', this.playerStopWorkCollectors.bind(this));
    // mp.events.add('closeCollectorsMenu', this.closeMenu.bind(this));

    mp.peds.new(0xCDEF5408, new mp.Vector3(-41.67, -662.88, 33.48), -176, 0);
    mp.peds.new(0xE7565327, new mp.Vector3(1181.01, 2704.97, 38.09), 87, 0);
    mp.peds.new(0x0703F106, new mp.Vector3(-117.59, 6469.70, 31.63), -132, 0);
  }
  
  // private async playerDialog(location: string, status: boolean): Promise<void> {
  //   switch (location) {
  //     case "santos":
  //       notifyBlack("чтобы поговорить с работодателем.");
  //       mp.keys.bind(key.E, true, () => showCollectorMenu(location, status));
  //       mp.console.logInfo('playerDialog is true', true);
  //       break;

  //     case "sandy":
  //       notifyBlack("чтобы поговорить с работодателем.");
  //       mp.keys.bind(key.E, true,() =>  showCollectorMenu(location, status));
  //       break;

  //     case "paleto":
  //       notifyBlack("чтобы поговорить с работодателем.");
  //       mp.keys.bind(key.E, true, () => showCollectorMenu(location, status));
  //       break;

  //     default:
  //       break;
  //   }
  // }

  private playerStartWorkCollectors(location: string): void {
    mp.events.callRemote('playerStartWorkOnCollectors', location)
  }

  private playerStopWorkCollectors(): void {
    mp.events.callRemote('playerStopWorkOnCollectors');
  }

  // private closeMenu(): void {
  //   this.collectorBrowser?.destroy();
  //   this.collectorBrowser = null;
  //   mp.players.local.freezePosition(false);
  //   mp.gui.cursor.show(false, false);
  // }

  // private async showCollectorMenu(location: string, status: boolean): Promise<void> {
  //   if (!this.collectorBrowser) {
  //    this.collectorBrowser = mp.browsers.new('http://localhost:3000/collectors');
  //    mp.gui.cursor.show(true, true);
  //    mp.players.local.freezePosition(true);
  //       // await rpc.callBrowser(this.collectorBrowser, 'getJobLocation', { location: location, status: status });
  //   } else {
  //    this.collectorBrowser.destroy();
  //    this.collectorBrowser = null;
  //   }

  //   setTimeout(() => {
  //     mp.keys.unbind(key.E, true, () => this.showCollectorMenu(location, status));
  //   }, 150);
  // }

  // private async showCollectorMenuOnLastPoint(location: string, status: boolean): Promise<void> {
  //   if (!this.collectorBrowser) {
  //     this.collectorBrowser = mp.browsers.new('http://localhost:3000/collectors');
  //     mp.gui.cursor.show(true, true);
  //     await rpc.callBrowser(this.collectorBrowser, 'getLastPointCollectors', { location: location, status: status });
  //   } else {
  //     this.collectorBrowser.destroy();
  //     this.collectorBrowser = null;
  //   }

  //   setTimeout(() => {
  //     mp.keys.unbind(key.E, true, () => this.showCollectorMenuOnLastPoint(location, status));
  //   }, 150);
  // }
}


new ClientCollectors();

// TODO: Изменить названия функций на нормальные