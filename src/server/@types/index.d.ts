declare global {
  interface PlayerMp {
    dbId: string;
    uid: number;
    firstName: string;
    lastName: string;
    fullName: string;
    loggedIn: boolean;
    admin: boolean;
    adminLvl: string;

    money: {
      cash: number;
      bank: number;
    };

    isOnWork: boolean;
    isJob: string;
    jobVehicle: VehicleMp | number | string;
  }

  interface CollectorJob {
    bankLevel: 1 | 2 | 3 | 0; //* sandy = 1, paleto = 2, santos = 3, 0 = finished working;
    partyFriendValue: number;
    partyFriendList: [];
    pointIndex: number;
    routeIndex: number;
    routeLocation: 'Santos' | 'Sandy' | 'Paleto' | 'None';
    leader: number; // for lobby
  }
}

declare module "express";

export {};
