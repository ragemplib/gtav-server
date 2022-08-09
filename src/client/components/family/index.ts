import notifyBlack from "../jobs/scripts/startNotify";

const createNewFamily = () => {
    mp.events.callRemote('createNewFamily', 'test123', 5000);

    setTimeout(() => {
        mp.keys.unbind(key.E, true, createNewFamily);
    }, 150);
}

mp.events.add({
    bindFamilyShape: () => {
        notifyBlack('чтобы открыть меню покупки.');
        mp.keys.bind(key.E, true, createNewFamily);
    }
});