import FamilyModel from "@/database/models/Family";

class Family {
  private createFamilyShape: ColshapeMp;

  constructor() {
    mp.blips.new(685, new mp.Vector3(-1007.85, -487.04, 39.97), {
      dimension: 0,
      name: "Создание семьи",
      shortRange: true,
      scale: 0.7,
      color: 38,
    });

    mp.markers.new(27, new mp.Vector3(-1007.85, -487.04, 39), 1, {
      color: [0, 178, 255, 198],
      dimension: 0,
      visible: true,
    });

    this.createFamilyShape = mp.colshapes.newSphere(-1007.85, -487.04, 39.97, 1, 0);

    this.events();
  }

  private playerEnterColshape(player: PlayerMp, colshape: ColshapeMp): void {
    try {
        if (colshape === this.createFamilyShape) {
            player.call('bindFamilyShape');

            console.log(player.firstName, player.lastName)
        }
    } catch (e) {
        console.log(e);
    }
  }

  private playerExitColshape(player: PlayerMp, colshape: ColshapeMp): void {
    try {
        if (colshape === this.createFamilyShape) return;
    } catch (e) {
        console.log(e);
    }
  }

  private events(): void {
    mp.events.add({
        playerEnterColshape: this.playerEnterColshape.bind(this),
        playerExitColshape: this.playerExitColshape.bind(this),
        createNewFamily: async (player: PlayerMp, name: string, money?: number) => {
            const newFamily = await new FamilyModel({
                name: name,
                leader: player.firstName + ' ' + player.lastName,
                group: {
                    fullName: player.firstName + ' ' + player.lastName,
                    uid: player.uid
                },
                money: money
            });

            await newFamily.save();

            console.log(`Создана новая семья, id: `, newFamily.id);
        }
    });
  }
}

new Family();
