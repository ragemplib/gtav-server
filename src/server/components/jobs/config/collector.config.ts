const bankBlips: Array<object> = [
  { x: -41.58, y: -664.02, z: 33.48 },
  { x: 1179.79, y: 2704.90, z: 38.09 },
  { x: -117.07, y: 6469.16, z: 30.65 },
];

const markers: Array<object> = [
  { x: -41.58, y: -664.02, z: 32.5 },
  { x: 1179.79, y: 2704.90, z: 37.3 },
  { x: -117.07, y: 6469.16, z: 30.65 },
];

const startColshapeFromSantos: ColshapeMp = mp.colshapes.newSphere(-41.58, -664.02, 33.48, 1, 0); // -41.67, -662.88, 33.48 | * Head: -176.0294 - PED
const startColshapeFromSandy: ColshapeMp = mp.colshapes.newSphere(1179.79, 2704.90, 38.09, 1, 0); // 1180.71, 2704.99, 38.09 - PED ?? 1179.80, 2704.91, 38.09 - shape
const startColshapeFromPaleto: ColshapeMp = mp.colshapes.newSphere(-117.07, 6469.16, 31.63, 1, 0);

const vehicleSpawnCoords: Array<object> = [
  { x: -32.20, y: -671.56, z: 31.94 },
  { x: -36.65, y: -672.37, z: 31.94 },
  { x: -38.05, y: -698.88, z: 31.94 },
  { x: -32.72, y: -698.81, z: 31.94 },
]

export default {
  bankBlips,
  markers,
  startColshapeFromSantos,
  startColshapeFromSandy,
  startColshapeFromPaleto,
  vehicleSpawnCoords,
};

// TODO: 1-й уровень работы - sandy, 2-й уровень работы - paleto, 3-й уровень работы - santos