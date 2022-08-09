const jobVehicle = {} as Job;

mp.events.add({
  playerReady: () => {
    mp.events.callRemote("hudGetDataToRPC"); // Получаю данные из БД (player.uid, player.admin)
  },

  render: () => {
    
  },
});
