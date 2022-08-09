/**
 * @name Название семьи
 * @leader ИФ создавшего семью
 * @group список всех участников семьи (формат: ИФ, UID)
 * @position Позиция дома / офиса где будет проходить спавн участников
 * @money Общак
 */

export type Family = {
  id: number;
  name: string;
  leader: string;
  group: {
    fullName: string;
    uid: number;
  };
  position: Object;
  money: number;
};

// todo: Покупка в собственность семьи машин, домов и пр.