/// <reference path="keys.d.ts" />

declare global {
	interface Job {
        vehicleIsActive: boolean;
        coordsVehicle: Vector3;
    }
}

export {};