import jobApi from "@/api/Job";
import workersUser from "@/database/scripts/workers-user";
import config from "./config/collector.config";

export default class Collectors {
  public routes: any;
  private vehicle!: VehicleMp; // Машина для спавна
  private collector = {} as CollectorJob; // Для действий с поинтами, роутами
  private shapeRoute!: ColshapeMp; // Основной шейп для маршрута
  private lastShapeRoute!: ColshapeMp; // Последний шейп для маршрута
  private checkpointRoute!: CheckpointMp; // Основной чекпоинт для маршрута
  private blipRoute!: BlipMp; // Основной блип для маршрута

  constructor({ routes }: any) {
    this.routes = routes;

    config.bankBlips.map((position: any) => {
      const { x, y, z } = position;

      mp.blips.new(408, new mp.Vector3(x, y, z), {
        name: "Работа инкассатора [dev]",
        scale: 0.7,
        color: 43,
        shortRange: true,
        dimension: 0,
      });
    });

    config.markers.map((position: any) => {
      const { x, y, z } = position;

      mp.markers.new(27, new mp.Vector3(x, y, z), 1, {
        color: [0, 178, 255, 198],
        dimension: 0,
        visible: true,
      });
    });

    this.events();
    this.commands();
  }

  /**
   * Необходимые комманды для работы
   */
  private async commands(): Promise<void> {
    mp.events.addCommand({
      fsc: (player: PlayerMp) =>
        (player.position = new mp.Vector3(-37.6, -665.3, 33.48)),
      tsc: (player: PlayerMp) =>
        (player.position = new mp.Vector3(1177.51, 2704.83, 38.09)),
      thsc: (player: PlayerMp) =>
        (player.position = new mp.Vector3(-111.9, 6466.44, 31.63)),
    });
  }

  /**
   * Обработчик входа в шейпы 
   */
  // TODO: Создать меню с выбором: начать работу, продолжить, уволиться, взять транспорт в аренду
  private playerEnterColshape(player: PlayerMp, colshape: ColshapeMp) {
    try {
      switch (colshape) {
        case config.startColshapeFromSantos:
          if (player.isOnWork === false) {
            player.call("callClientOpenMenuCollectors", ["santos", player.isOnWork]);
          } else {
            player.call('callClientOpenMenuCollectors', ['santos', player.isOnWork]);
            
            if (player.isOnWork === true && player.isJob !== "Collectors") return player.outputChatBox('Вы уже работаете на другой работе. Для начала увольтесь с текущей!');
          }
          break;

        case config.startColshapeFromSandy:
          if (player.isOnWork === false) {
            player.call("startWorkCollectors", ["sandy"]);
          } else {
            if (player.isOnWork === true && player.isJob === "Collectors") {
              player.call("enterWorkCollectors", ["sandy"]);
            }
          }
          break;

        case config.startColshapeFromPaleto:
          if (player.isOnWork === false) {
            player.call("startWorkCollectors", ["paleto"]);
          } else {
            if (player.isOnWork === true && player.isJob === "Collectors") {
              player.call("enterWorkCollectors", ["paleto"]);
            }
          }
          break;

        case this.shapeRoute:
          this.collector.pointIndex++;
          this.deleteJobPoint();
          this.createNextPoint(player);
          break;

        case this.lastShapeRoute:
          if (player.vehicle) {
            if (player.vehicle.id === this.vehicle.id) {
              player.call("playerOnLastShapeRouteCollectors");
              console.log('true last shape route')
            }
          }
          break;

        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Обработчик выхода из шейпов
   */
  private playerExitColshape(player: PlayerMp, colshape: ColshapeMp): void {
    switch (colshape) {
      case config.startColshapeFromSantos:
        break;

      case config.startColshapeFromSandy:
        break;

      case config.startColshapeFromPaleto:
        break;

      case this.shapeRoute:
        break;

      case this.lastShapeRoute:
        break;

      default:
        break;
    }
  }

  /**
   * Устройство на работу 
   */
  private async playerStartWork(
    player: PlayerMp,
    location: string
  ): Promise<void> {
    try {
      switch (location) {
        case "santos":
          jobApi.getPlayerToWork(player, true, 'Collectors');
          jobApi.setParametrJobCollector(3, 'Santos', 0, 0, player.uid);

          this.createNextPoint(player);
          this.playerClothes(player);
          this.spawnVehicle(player);
          workersUser.playerJobSave(player);
          this.getUserJobInfo(player, this.collector);
          break;

        case "sandy":
          jobApi.getPlayerToWork(player, true, 'Collectors');
          jobApi.setParametrJobCollector(1, 'Sandy', 0, 0, player.uid);

          this.createNextPoint(player);
          this.playerClothes(player);
          this.spawnVehicle(player);
          workersUser.playerJobSave(player);
          this.getUserJobInfo(player, this.collector);
          break;

        case "paleto":
          jobApi.getPlayerToWork(player, true, 'Collectors');
          jobApi.setParametrJobCollector(2, 'Paleto', 0, 0, player.uid);

          this.createNextPoint(player);
          this.playerClothes(player);
          this.spawnVehicle(player);
          workersUser.playerJobSave(player);
          this.getUserJobInfo(player, this.collector);
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Продолжение работы 
   */
  private async playerEnterWork(
    player: PlayerMp,
    location: string
  ): Promise<void> {
    try {
      switch (location) {
        case "santos":
          jobApi.setParametrJobCollector(3, 'Santos', 0, 0, player.uid);

          this.createNextPoint(player);
          this.spawnVehicle(player);
          this.playerClothes(player);
          this.getUserJobInfo(player, this.collector);
          break;

        case "sandy":
          jobApi.setParametrJobCollector(1, 'Sandy', 0, 0, player.uid);
          
          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          break;

        case "paleto":
          jobApi.setParametrJobCollector(2, 'Paleto', 0, 0, player.uid);

          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Увольнение (в данный момент не работает через шейп, в будущем будет через ui) 
   */
  private async playerStopWork(player: PlayerMp): Promise<void> {
    try {
      player.isOnWork = false;
      player.isJob = "none";
      this.collector.bankLevel = 0;
      this.collector.partyFriendList = [];
      this.collector.partyFriendValue = 0;
      this.collector.pointIndex = 0;
      this.collector.routeIndex = 0;
      this.collector.routeLocation = "None";

      this.getUserJobInfo(player, this.collector);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Создание последующего поинта 
   */
  private createNextPoint(player: PlayerMp) {
    try {
      if (player.isOnWork === true && player.isJob === "Collectors") {
        const lastArray =
          this.routes[this.collector.routeLocation][this.collector.routeIndex]
            .coordinates.length - 1;

        if (
          this.collector.pointIndex <
          this.routes[this.collector.routeLocation][this.collector.routeIndex]
            .coordinates.length -
            1
        ) {
          const waypointPosition =
            this.routes[this.collector.routeLocation][this.collector.routeIndex]
              .coordinates[this.collector.pointIndex];
          console.log(waypointPosition);

          const [{ x, y, z }] = waypointPosition;
          this.shapeRoute = mp.colshapes.newSphere(x, y, z + 0.5, 1, 0);
          this.checkpointRoute = mp.checkpoints.new(
            1,
            new mp.Vector3(x, y, z),
            1,
            {
              direction: new mp.Vector3(x, y, z),
              color: [0, 178, 255, 198],
              visible: true,
              dimension: 0,
            }
          );
          this.blipRoute = mp.blips.new(618, new mp.Vector3(x, y, z), {
            name: "Необходимый банкомат",
            dimension: 0,
            color: 11,
          });
          this.checkpointRoute.showFor(player);
          this.blipRoute.routeFor(player, 11, 1);
        }

        if (this.collector.pointIndex === lastArray) {
          this.deleteJobPoint();
          this.playerOnLastPoint(player);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Логика для последнего шейпа (когда все деньги уже собраны, и их остаётся только отвезти)
   */
  private playerOnLastPoint(player: PlayerMp) {
    const lastWaypointPosition =
      this.routes[this.collector.routeLocation][
        this.collector.routeIndex
      ].coordinates.pop();

    const [{ x, y, z }] = lastWaypointPosition;
    this.lastShapeRoute = mp.colshapes.newSphere(x, y, z + 0.5, 10, 0);
    
    this.checkpointRoute = mp.checkpoints.new(4, new mp.Vector3(x, y, z), 10, {
      direction: new mp.Vector3(x, y, z),
      color: [40, 186, 22, 113],
      visible: true,
      dimension: 0,
    });

    this.blipRoute = mp.blips.new(500, new mp.Vector3(x, y, z), {
      name: "Точка сдачи денег",
      dimension: 0,
      color: 15,
    });

    this.checkpointRoute.showFor(player);
    this.blipRoute.routeFor(player, 11, 1);
  }

  /**
   * Получение информации о устроившися пользователе 
   */
  private getUserJobInfo(player: PlayerMp, collectors: CollectorJob): void {
    const playerData = {
      isOnWork: player.isOnWork,
      isJob: player.isJob,
      jobVehicle: player.jobVehicle,
    };

    const collectorData = {
      collectorsJob: collectors,
    };

    console.table(playerData);
    console.table(collectorData);
  }

  /**
   * Спавн авто при устройстве на работу
   */
  private spawnVehicle(player: PlayerMp): void {
    const vehicleSpawnPosition: any =
      config.vehicleSpawnCoords[
        Math.floor(Math.random() * config.vehicleSpawnCoords.length)
      ];
    this.vehicle = mp.vehicles.new(
      RageEnums.Hashes.Vehicle.STOCKADE,
      new mp.Vector3(vehicleSpawnPosition)
    );
    player.jobVehicle = this.vehicle.id;
    player.call("setMarkerOnJobVehicle", [vehicleSpawnPosition]);
  }

  /**
   * Одежда для игрока
   */
  private playerClothes(player: PlayerMp): void {
    if (player.isOnWork === true && player.isJob === "Collectors") {
      switch (player.model) {
        // mp_f_freemode_01 : female
        case 0x9c9effd8:
          player.setClothes(3, 18, 1, 1); // tors
          player.setClothes(8, 3, 1, 1); // undershirts
          player.setClothes(11, 46, 1, 1); // tops
          player.setClothes(9, 18, 1, 1); // armour
          player.setClothes(4, 37, 1, 1); // legs
          break;

        // mp_m_freemode_01 : male
        case 0x705e61f2:
          player.setClothes(11, 50, 1, 1); // tops
          player.setClothes(3, 17, 1, 1); // tors
          player.setClothes(8, 2, 1, 1); // undershirts
          player.setClothes(9, 16, 1, 1); // armour
          player.setClothes(4, 24, 1, 1); // legs
          player.setClothes(6, 21, 0, 0); // shoes
          break;
      }
    } else return;
  }

  /**
   * Респавн блипов, шейпов, чекпоинтов
   */
  private deleteJobPoint(): void {
    try {
      if (mp.blips.exists(this.blipRoute)) this.blipRoute.destroy();
      if (mp.colshapes.exists(this.shapeRoute)) this.shapeRoute.destroy();
      if (mp.checkpoints.exists(this.checkpointRoute))
        this.checkpointRoute.destroy();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Удаление всех рабочих блипов, шейпов, чекпоинтов на карте (связанных с данной работой)
   */
  private deleteAllJobPoints(): void {
    try {
      if (mp.blips.exists(this.blipRoute)) this.blipRoute.destroy();
      if (mp.colshapes.exists(this.shapeRoute)) this.shapeRoute.destroy();
      if (mp.checkpoints.exists(this.checkpointRoute))
        this.checkpointRoute.destroy();
      if (mp.colshapes.exists(this.lastShapeRoute))
        this.lastShapeRoute.destroy();
    } catch (e) {
      console.error(e);
    }
  }

  private async events(): Promise<void> {
    mp.events.add({
      playerEnterColshape: this.playerEnterColshape.bind(this),
      playerExitColshape: this.playerExitColshape.bind(this),

      /**
       * Игрок начинает работать
       */
      playerStartWorkOnCollectors: async (
        player: PlayerMp,
        location: string
      ) => {
        try {
          switch (location) {
            case "santos":
              this.playerStartWork(player, location);
              break;

            case "sandy":
              this.playerStartWork(player, location);
              break;

            case "paleto":
              this.playerStartWork(player, location);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },

      /**
       * Игрок заканчивает работать 
       */
      playerStopWorkOnCollectors: async (player: PlayerMp) => {
        try {
          this.playerStopWork(player);
        } catch (e) {
          console.error(e);
        }
      },

      /**
       * Игрок продолжает работать
       */
      playerEnterWorkOnCollectors: async (
        player: PlayerMp,
        location: string
      ) => {
        try {
          switch (location) {
            case "santos":
              this.playerEnterWork(player, location);
              break;

            case "sandy":
              this.playerEnterWork(player, location);
              break;

            case "paleto":
              this.playerEnterWork(player, location);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },

      /**
       * Требуется для того, чтобы убрать мигающий маркер (над авто) 
       */
      playerEnterVehicle: (
        player: PlayerMp,
        vehicle: VehicleMp,
        seat: RageEnums.VehicleSeat
      ) => {
        if (vehicle.id === this.vehicle.id) {
          player.call("unsetMarkerOnJobVehicle");
        }
      },

      /**
       * Отправить игрока в банк
       */
      playerFollowsTheBank: (player: PlayerMp) => {
        const data = {
          point: this.collector.pointIndex,
          route: this.collector.routeIndex,
        };

        this.collector.pointIndex = 0;
        this.playerStopWork(player);
        this.deleteAllJobPoints();
        const money = data.point * 1000;

        player.notify(`${money}`);
      },
    });
  }
}

// Bug: Требуется убрать ворота через CodeWalker (в точке: 'Santos') (не могу установить OpenIv с офиц. сайта, позже займусь этим).
