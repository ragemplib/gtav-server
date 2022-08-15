import "./scripts/peds";
import "./scripts/rpc";
import notifyBlack from "./scripts/startNotify";
import script from "./scripts/work";

mp.events.add({
  startWorkCollectors: (location: string) => {
    switch (location) {
      case "santos":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, script.showCollectorMenu);
        break;

      case "sandy":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, script.startWorkSandy);
        break;

      case "paleto":
        notifyBlack("чтобы поговорить с работодателем.");
        mp.keys.bind(key.E, true, script.startWorkPaleto);
        break;

      default:
        break;
    }
  },

  stopWorkCollectors: () => {
    notifyBlack("чтобы открыть меню.");
    mp.keys.bind(key.E, true, script.stopWork);
  },

  // TODO: Доделать
  enterWorkCollectors: (location: string) => {
    switch (location) {
      case "santos":
        notifyBlack("хотите продолжить работу?");
        mp.keys.bind(key.E, true, script.enterWorkSantos);
        break;

      case "sandy":
        notifyBlack("хотите продолжить работу?");

        break;

      case "paleto":
        notifyBlack("хотите продолжить работу?");

        break;

      default:
        break;
    }
  },

  cantWorkThisLocationCollectors: () => {
    // alert('Вы не можете продолжить работу на данном уровне!')
  },

  playerOnLastShapeRouteCollectors: () => {
    notifyBlack("чтобы сдать деньги в банк.");
    mp.keys.bind(key.E, true, script.playerLastShapeRoute);
  },
});
