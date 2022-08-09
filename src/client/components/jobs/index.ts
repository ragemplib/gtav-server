import './collectors';

const jobVehicle = {} as Job;

mp.events.add({
    setMarkerOnJobVehicle: (position: any) => {
        const {x, y, z} = position;
        jobVehicle.vehicleIsActive = true;
        jobVehicle.coordsVehicle = new mp.Vector3(x, y, z);

        // I do not know how this will affect the performance of the client part of the user
        mp.events.add('render', () => {
            if (jobVehicle.vehicleIsActive === true) {
                mp.game.graphics.drawMarker(39, x, y, z + 3.25, 0, 0, 0,  0, 0, 0, 1.0, 1.0, 1.0, 0, 178, 255, 198, true, false, 2, false, null, null, false);
            } else return;
        });
    },

    unsetMarkerOnJobVehicle: () => {
        jobVehicle.vehicleIsActive = false;
    }
});