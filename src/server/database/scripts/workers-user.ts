import CharacterModel from "../models/Character";
import UserModel from "../models/User";

class WorkersUser {
    // TODO: Сделать кастомные уведомления!

    public async getUserWithUID(player: PlayerMp, uid: number): Promise<void> {
        const user = await CharacterModel.findOne({ uid: uid });
        if (!user) {
            player.call('callNotify', ['Персонаж не был найден!']);
        } else {
            console.log(user);
        }
    }

    public async getAccountUserWithUID(player: PlayerMp, accountUid: number): Promise<void> {
        const user = await UserModel.findOne({ accountUid: accountUid });
        if (!user) {
            player.call('callNotify', ['Аккаунт не был найден!']);
        } else {
            console.log(user);
        }
    }

    public async getJobUserWithUID(player: PlayerMp, uid: number): Promise<void> {
        const user = await CharacterModel.findOne({ uid: uid });
        if (!user) {
            player.call('callNotify', ['Персонаж не был найден!']);
        } else {
            console.log(user.isWorkOnJob, user.isJob);
        }
    }

    // Сохранение состояние работы в бд пользователя
    public async playerJobSave(player: PlayerMp): Promise<void> {
        const user = await CharacterModel.findOne({ uid: player.uid });

        if (!user) {
            return console.log('Пользователь не найден!'); // silent error
        } else {
            if (user.loggedIn === true && user.isWorkOnJob === false && user.isJob === 'none') {
                user.isWorkOnJob = player.isOnWork;
                user.isJob = player.isJob;

                user.save();
            }
        }
    }

    // TODO: Сохранить состояние когда пользователь выйдет из игры (оставить работать, при этом снять рабочую одежду и т.п)
    public async playerJobQuit(player: PlayerMp): Promise<void> {
        const user = await CharacterModel.findOne({ uid: player.uid });

        if (!user) {
            return console.log('Пользователь не найден!'); // silent error
        } else {
            if (user.loggedIn === false) {
            
            }
        }
    }
}

const workersUser = new WorkersUser();

export default workersUser;