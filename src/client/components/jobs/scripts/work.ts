import rpc from 'rage-rpc';

let collectorBrowser: BrowserMp | null = null;

const stopWork = () => {
  mp.events.callRemote("playerStopWorkOnCollectors");
  setTimeout(() => {
    mp.keys.unbind(key.E, true, stopWork);
  }, 100);
};

const showCollectorMenu = async () => {
  if (!collectorBrowser) {
    collectorBrowser = mp.browsers.new('http://localhost:3000/collectors');
    await rpc.callBrowser(collectorBrowser, 'getJobLocation', 'santos');
  } else {
    collectorBrowser.destroy();
    collectorBrowser = null;
  }

  setTimeout(() => {
    mp.keys.unbind(key.E, true, showCollectorMenu);
  }, 150);
  // mp.events.callRemote("playerStartWorkOnCollectors", "santos");
};

const startWorkSandy = () => {
  mp.events.callRemote("playerStartWorkOnCollectors", "sandy");
  setTimeout(() => {
    mp.keys.unbind(key.E, true, startWorkSandy);
  }, 150);
};

const startWorkPaleto = () => {
  mp.events.callRemote("playerStartWorkOnCollectors", "paleto");
  setTimeout(() => {
    mp.keys.unbind(key.E, true, startWorkPaleto);
  }, 150);
};

const enterWorkSantos = () => {
  mp.events.callRemote('playerEnterWorkOnCollectors', 'santos');
  setTimeout(() => {
    mp.keys.unbind(key.E, true, enterWorkSantos);
  }, 150);
}

const playerLastShapeRoute = () => {
  mp.events.callRemote('playerFollowsTheBank');

  setTimeout(() => {
    mp.keys.unbind(key.E, true, playerLastShapeRoute);
  }, 150);
}

export default {
  stopWork,
  showCollectorMenu,
  startWorkSandy,
  startWorkPaleto,
  enterWorkSantos,
  playerLastShapeRoute,
};
