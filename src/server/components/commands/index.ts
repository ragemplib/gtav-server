import CharacterModel from "@/database/models/Character";

mp.events.addCommand({
  pos: (player: PlayerMp, _: any): void => {
    let position: Vector3 = player.position;
    let heading: number | Vector3 = player.heading;
    console.log(`${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)} | * Head: ${heading.toFixed(4)}`);
  },

  // so far, the team is waiting until the admin panel is ready
  setAdmin: async (player: PlayerMp, uid: number) => {
    // const admin = await CharacterModel.findOne({ uid: player.uid });
    // if (admin!.admin === false || admin!.adminLvl < 3) return;
    const character = await CharacterModel.findOne({ uid: uid });

    if (!character) {
      player.notify("~r~Пользователь не найден!~w~");
    } else {
      if (character.admin === true) console.log('Игрок уже являеться администратором.');
      if (character.adminLvl >= 3) return console.log('Игрок уже находиться на максимально возможном админ уровне.')

      character.admin = true;
      character.adminLvl = 3;

      await character.save();

      player.notify(`~g~[${character.fullName}] ~w~стал администратором ~g~[${character.adminLvl}] ~w~уровня!`);
    }
  },

  changeUrl: async (player: PlayerMp, url: string) => {
    player.call("changeUrlToClient", [url]);
  },

  veh: (player: PlayerMp, _: any, target: number, vehicleName: string | number) => {
    if (target === undefined || null) return player.outputChatBox('/veh id vehicleName');
    const players = mp.players.at(target);
    if (players === null) return player.outputChatBox('[Error]: Players is null.');
    const {x, y, z} = players.position;
    mp.vehicles.new((vehicleName), new mp.Vector3(x + 2, y, z), { numberPlate: 'dev' });
  },

  cl: (player: PlayerMp, _: any, id: number, draw: number, texture: number, pallete: number) => {
    player.setClothes(id, draw, texture, pallete);
  }
});