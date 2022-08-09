
const stopWork = () => {
  mp.events.callRemote("playerStopWorkOnCollectors");
  setTimeout(() => {
    mp.keys.unbind(key.E, true, stopWork);
  }, 100);
};

const startWorkSantos = () => {
  mp.events.callRemote("playerStartWorkOnCollectors", "santos");
  setTimeout(() => {
    mp.keys.unbind(key.E, true, startWorkSantos);
  }, 150);
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

export default {
  stopWork,
  startWorkSantos,
  startWorkSandy,
  startWorkPaleto,
  enterWorkSantos,
};
