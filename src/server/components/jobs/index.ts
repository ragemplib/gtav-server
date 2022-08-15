import "./collectors";
import Collectors from "./collectors";

class Jobs {
  constructor() {
    this.initCollector();
  }

  private initCollector() {
    new Collectors({
      routes: {
        Santos: {
          0: {
            coordinates: [
              [new mp.Vector3(-81.64, -622.26, 36.31)],
              [new mp.Vector3(-48.29, -505.1, 40.46)],
              [new mp.Vector3(-34.59, -463.0, 40.62)],
              [new mp.Vector3(-12.14, -424.34, 39.52)],
              [new mp.Vector3(18.12, -386.89, 39.38)],
              [new mp.Vector3(119.55, -395.04, 41.26)],
              [new mp.Vector3(210.28, -360.74, 44.08)],
              [new mp.Vector3(264.92, -368.55, 44.88)],
              [new mp.Vector3(284.71, -341.80, 45.74)],
            ],
          },
        },
      },
    });
  }
}

new Jobs();
