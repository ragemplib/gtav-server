import workersUser from '@/database/scripts/workers-user';
import config from './config/collector.config';

export default class Collectors {
  public routes: any;
  private vehicle!: VehicleMp;
  private collector = {} as CollectorJob;
  private shapeRoute!: ColshapeMp;
  private checkpointRoute!: CheckpointMp;
  private blipRoute!: BlipMp;

  constructor({ routes }: any) {
    this.routes = routes;

    config.bankBlips.map((position: any) => {
      const { x, y, z } = position;

      mp.blips.new(408, new mp.Vector3(x, y, z), {
        name: 'Работа инкассатора [dev]',
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

  // TODO: Создать меню с выбором: начать работу, продолжить, уволиться, взять транспорт в аренду
  private playerEnterColshape(player: PlayerMp, colshape: ColshapeMp) {
    try {
      switch (colshape) {
        case config.startColshapeFromSantos:
          if (player.isOnWork === false) {
            player.call('startWorkCollectors', ['santos']);
          } else {
            if (player.isOnWork === true && player.isJob !== 'Collectors') {
              player.call('cantWorkThisLevelCollectors');
            }
            
            if (player.isOnWork === true && player.isJob === 'Collectors') {
              player.call('enterWorkCollectors', ['santos']);
            }
            // player.call('stopWorkCollectors');
          }
          break;

        case config.startColshapeFromSandy:
          if (player.isOnWork === false) {
            player.call('startWorkCollectors', ['sandy']);
          } else {
            if (player.isOnWork === true && player.isJob === 'Collectors') {
              player.call('enterWorkCollectors', ['sandy']);
            }
          }
          break;

        case config.startColshapeFromPaleto:
          if (player.isOnWork === false) {
            player.call('startWorkCollectors', ['paleto']);
          } else {
            if (player.isOnWork === true && player.isJob === 'Collectors') {
              player.call('enterWorkCollectors', ['paleto']);
            }
          }
          break;

        case this.shapeRoute:
          this.collector.pointIndex++;
          this.deleteJobPoint();
          this.createNextPoint(player);
          break;

        default:
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

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
      default:
        break;
    }
  }

  private async playerStartWork(player: PlayerMp, location: string): Promise<void> {
    try {
      switch (location) {
        case 'santos':
          player.isOnWork = true;
          player.isJob = 'Collectors';
          this.collector.bankLevel = 3;
          this.collector.routeLocation = 'Santos';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.playerClothes(player);
          this.spawnVehicle(player);
          workersUser.playerJobSave(player);
          this.getUserJobInfo(player, this.collector);
          break;

        case 'sandy':
          player.isOnWork = true;
          player.isJob = 'Collectors';
          this.collector.bankLevel = 1;
          this.collector.routeLocation = 'Sandy';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          workersUser.playerJobSave(player);
          break;

        case 'paleto':
          player.isOnWork = true;
          player.isJob = 'Collectors';
          this.collector.bankLevel = 1;
          this.collector.routeLocation = 'Paleto';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          workersUser.playerJobSave(player);
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  private async playerEnterWork(player: PlayerMp, location: string): Promise<void> {
    try {
      switch (location) {
        case 'santos':
          this.collector.bankLevel = 3;
          this.collector.routeLocation = 'Santos';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.spawnVehicle(player);
          this.playerClothes(player);
          this.getUserJobInfo(player, this.collector);
          break;

        case 'sandy':
          this.collector.bankLevel = 1;
          this.collector.routeLocation = 'Sandy';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          break;

        case 'paleto':
          this.collector.bankLevel = 1;
          this.collector.routeLocation = 'Paleto';
          this.collector.routeIndex = 0; // TODO: Create a function for randomizing routes
          this.collector.pointIndex = 0;

          this.createNextPoint(player);
          this.getUserJobInfo(player, this.collector);
          this.playerClothes(player);
          break;
      }
    } catch (e) {
      console.error(e);
    }
  }

  private async playerStopWork(player: PlayerMp): Promise<void> {
    try {
      player.isOnWork = false;
      player.isJob = 'none';
      this.collector.bankLevel = 0;
      this.collector.partyFriendList = [];
      this.collector.partyFriendValue = 0;
      this.collector.pointIndex = 0;
      this.collector.routeIndex = 0;
      this.collector.routeLocation = 'None';

      this.getUserJobInfo(player, this.collector);
    } catch (e) {
      console.error(e);
    }
  }

  private createNextPoint(player: PlayerMp) {
    try {
      if (player.isOnWork === true && player.isJob === 'Collectors') {
        if (this.collector.pointIndex < 7) {
          const waypointPosition = this.routes[this.collector.routeLocation][this.collector.routeIndex].coordinates[this.collector.pointIndex];
          console.log(waypointPosition);

          const [{ x, y, z }] = waypointPosition;
          this.shapeRoute = mp.colshapes.newSphere(x, y, z + 0.5, 1, 0);
          this.checkpointRoute = mp.checkpoints.new(1, new mp.Vector3(x, y, z), 1, { direction: new mp.Vector3(x, y, z), color: [0, 178, 255, 198], visible: true, dimension: 0 });
          this.blipRoute = mp.blips.new(618, new mp.Vector3(x, y, z), {
            name: 'Необходимый банкомат',
            dimension: 0,
            color: 11,
          });
          this.checkpointRoute.showFor(player);
          this.blipRoute.routeFor(player, 11, 1);
        } else {
          console.log('createNextPoint > 7');

          const waypointPositionLast = [...this.routes[this.collector.routeLocation][this.collector.routeIndex].coordinates[this.collector.pointIndex]].pop();
          console.log(waypointPositionLast);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

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

  private spawnVehicle(player: PlayerMp): void {
    const vehicleSpawnPosition: any = config.vehicleSpawnCoords[Math.floor(Math.random() * config.vehicleSpawnCoords.length)];
    this.vehicle = mp.vehicles.new(RageEnums.Hashes.Vehicle.STOCKADE, new mp.Vector3(vehicleSpawnPosition));
    player.jobVehicle = this.vehicle.id;
    player.call('setMarkerOnJobVehicle', [vehicleSpawnPosition]);
  }

  private playerClothes(player: PlayerMp): void {
    if (player.isOnWork === true && player.isJob === 'Collectors') {
      switch (player.model) {
        // mp_f_freemode_01 : female
        case 0x9C9EFFD8:
            player.setClothes(3, 18, 1, 1); // tors
            player.setClothes(8, 3, 1, 1); // undershirts
            player.setClothes(11, 46, 1, 1); // tops
            player.setClothes(9, 18, 1, 1); // armour
            player.setClothes(4, 37, 1, 1); // legs
          break;
  
        // mp_m_freemode_01 : male
        case 0x705E61F2:
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

  private deleteJobPoint() {
    try {
      if (mp.blips.exists(this.blipRoute)) this.blipRoute.destroy();
      if (mp.colshapes.exists(this.shapeRoute)) this.shapeRoute.destroy();
      if (mp.checkpoints.exists(this.checkpointRoute)) this.checkpointRoute.destroy();
    } catch (e) {
      console.error(e);
    }
  }

  private async events(): Promise<void> {
    mp.events.add({
      playerEnterColshape: this.playerEnterColshape.bind(this),
      playerExitColshape: this.playerExitColshape.bind(this),
      playerStartWorkOnCollectors: async (player: PlayerMp, location: string) => {
        try {
          switch (location) {
            case 'santos':
              this.playerStartWork(player, location);
              break;

            case 'sandy':
              this.playerStartWork(player, location);
              break;

            case 'paleto':
              this.playerStartWork(player, location);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },

      playerStopWorkOnCollectors: async (player: PlayerMp) => {
        try {
          this.playerStopWork(player);
        } catch (e) {
          console.error(e);
        }
      },

      playerEnterWorkOnCollectors: async (player: PlayerMp, location: string) => {
        try {
          switch (location) {
            case 'santos':
              this.playerEnterWork(player, location);
              break;

            case 'sandy':
              this.playerEnterWork(player, location);
              break;

            case 'paleto':
              this.playerEnterWork(player, location);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },

      playerEnterVehicle: (player: PlayerMp, vehicle: VehicleMp, seat: RageEnums.VehicleSeat) => {
        console.log(vehicle.id, seat);
        
        if (vehicle.id === this.vehicle.id) {
          player.call('unsetMarkerOnJobVehicle');

          console.log('TRUE')
        }
      }
    });
  }
}

// Bug: Требуется убрать ворота через CodeWalker (в точке: 'Santos') (не могу установить OpenIv с офиц. сайта, позже займусь этим).