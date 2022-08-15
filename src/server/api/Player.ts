import CharacterModel from "@/database/models/Character";

type ClothesProps = {
  drawable: number;
  texture: number;
  palette: number;
};

export default class PlayerApi {
  public playerSetClothesMasks(player: PlayerMp, props: ClothesProps): void {
    player.setClothes(1, props.drawable, props.texture, props.palette);
  }

  public playerSetClothesHairStyles(player: PlayerMp, props: ClothesProps): void {
    player.setClothes(1, props.drawable, props.texture, props.palette);
  }

  public async playerIsAdmin(player: PlayerMp) {
    const user = await CharacterModel.findOne({ uid: player.uid });
    if (!user) return console.log('Пользователь не найден!');
    return user?.admin;
  }
}
