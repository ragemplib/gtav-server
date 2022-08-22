'use strict';

class localHud {
    get localCursor() {
        return mp.gui.cursor.visible;
    }
    set localCursor(toggle) {
        mp.gui.cursor.show(toggle, toggle);
    }
    toggleLocalCursor() {
        this.localCursor = !this.localCursor;
    }
    enabledHud = true;
    get isEnabledHud() {
        return this.enabledHud;
    }
    setEnabledHud(toggle) {
        this.enabledHud = toggle;
        mp.gui.chat.show(toggle);
        mp.game.ui.displayHud(toggle);
        mp.game.ui.displayAreaName(toggle);
        mp.game.ui.displayRadar(toggle);
    }
}
var localHud$1 = new localHud();

const localPlayer = mp.players.local;
class Fly {
    enabled = false;
    camera = mp.cameras.new("gameplay");
    constructor() {
        mp.keys.bind(0x73, true, () => this.toggleFly());
        mp.events.add("render", () => this.fly());
    }
    set state(toggle) {
        this.enabled = toggle;
    }
    get state() {
        return this.enabled;
    }
    fly() {
        const { localCursor } = localHud$1;
        if (!this.state || localCursor)
            return;
        const cameraRot = this.camera.getRot(2);
        const nativeHeading = mp.game.invoke("0x8D4D46230B2C353A" /* RageEnums.Natives.CAM.GET_FOLLOW_PED_CAM_VIEW_MODE */) != 4
            ? cameraRot.z + 180
            : cameraRot.z;
        localPlayer.setHeading(nativeHeading);
        let { position: { x, y, z }, } = localPlayer;
        let realspeed = 1;
        if (mp.keys.isDown(160 /* key.LSHIFT */))
            realspeed *= 2;
        if (mp.keys.isDown(18 /* key.ALT */))
            realspeed *= 0.2;
        if (mp.keys.isDown(87 /* key.W */)) {
            x += realspeed * -Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * Math.cos((cameraRot.z * Math.PI) / 180);
            z += realspeed * Math.sin((cameraRot.x * Math.PI) / 180);
        }
        if (mp.keys.isDown(65 /* key.A */)) {
            cameraRot.z -= 90;
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
        }
        if (mp.keys.isDown(83 /* key.S */)) {
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
            z += realspeed * -Math.sin((cameraRot.x * Math.PI) / 180);
        }
        if (mp.keys.isDown(68 /* key.D */)) {
            cameraRot.z += 90;
            x += realspeed * Math.sin((cameraRot.z * Math.PI) / 180);
            y += realspeed * -Math.cos((cameraRot.z * Math.PI) / 180);
        }
        if (mp.keys.isDown(32 /* key.SPACE */))
            z += 0.5 * realspeed;
        if (mp.keys.isDown(162 /* key.LCTRL */))
            z -= 0.5 * realspeed;
        localPlayer.position = new mp.Vector3(x, y, z);
    }
    toggleFly() {
        if (!this.state) {
            localPlayer.freezePosition(true);
            this.state = true;
        }
        else {
            localPlayer.freezePosition(false);
            this.state = false;
            const { position } = localPlayer;
            const { x, y } = position;
            const z = mp.game.gameplay.getGroundZFor3DCoord(x, y, position.z, false, false) +
                1;
            localPlayer.position = new mp.Vector3(x, y, z);
        }
    }
}
new Fly();

//Bunkers
mp.game.streaming.requestIpl("gr_case10_bunkerclosed"); // - ZancudoBunker - -3058.714, 3329.19, 12.5844
mp.game.streaming.requestIpl("gr_case9_bunkerclosed"); // - Route68Bunker - 24.43542, 2959.705, 58.35517
mp.game.streaming.requestIpl("gr_case3_bunkerclosed"); // - OilfieldsBunker - 481.0465, 2995.135, 43.96672
mp.game.streaming.requestIpl("gr_case0_bunkerclosed"); // - DesertBunker - 848.6175, 2996.567, 45.81612
mp.game.streaming.requestIpl("gr_case1_bunkerclosed"); // - SmokeTreeBunker - 2126.785, 3335.04, 48.21422
mp.game.streaming.requestIpl("gr_case2_bunkerclosed"); // - ScrapyardBunker - 2493.654, 3140.399, 51.28789
mp.game.streaming.requestIpl("gr_case5_bunkerclosed"); // - GrapeseedBunker - 1823.961, 4708.14, 42.4991
mp.game.streaming.requestIpl("gr_case7_bunkerclosed"); // - PalletoBunker - -783.0755, 5934.686, 24.31475
mp.game.streaming.requestIpl("gr_case11_bunkerclosed"); // - Route1Bunker - -3180.466, 1374.192, 19.9597
mp.game.streaming.requestIpl("gr_case6_bunkerclosed"); // - FarmhouseBunker - 1570.372, 2254.549, 78.89397
mp.game.streaming.requestIpl("gr_case4_bunkerclosed"); // - RatonCanyonBunker - -391.3216, 4363.728, 58.65862
//Online Apartaments
mp.game.streaming.requestIpl("apa_v_mp_h_01_a"); // - Modern 1 Apartment - -786.8663, 315.7642, 217.6385
mp.game.streaming.requestIpl("apa_v_mp_h_01_c"); // - Modern 2 Apartment - -786.9563, 315.6229, 187.9136
mp.game.streaming.requestIpl("apa_v_mp_h_01_b"); // - Modern 3 Apartment - -774.0126, 342.0428, 196.6864
mp.game.streaming.requestIpl("apa_v_mp_h_02_a"); // - Mody 1 Apartment - -787.0749, 315.8198, 217.6386
mp.game.streaming.requestIpl("apa_v_mp_h_02_c"); // - Mody 2 Apartment - -786.8195, 315.5634, 187.9137
mp.game.streaming.requestIpl("apa_v_mp_h_02_b"); // - Mody 3 Apartment - -774.1382, 342.0316, 196.6864
mp.game.streaming.requestIpl("apa_v_mp_h_03_a"); // - Vibrant 1 Apartment - -786.6245, 315.6175, 217.6385
mp.game.streaming.requestIpl("apa_v_mp_h_03_c"); // - Vibrant 2 Apartment - -786.9584, 315.7974, 187.9135
mp.game.streaming.requestIpl("apa_v_mp_h_03_b"); // - Vibrant 3 Apartment - -774.0223, 342.1718, 196.6863
mp.game.streaming.requestIpl("apa_v_mp_h_04_a"); // - Sharp 1 Apartment - -787.0902, 315.7039, 217.6384
mp.game.streaming.requestIpl("apa_v_mp_h_04_c"); // - Sharp 2 Apartment - -787.0155, 315.7071, 187.9135
mp.game.streaming.requestIpl("apa_v_mp_h_04_b"); // - Sharp 3 Apartment - -773.8976, 342.1525, 196.6863
mp.game.streaming.requestIpl("apa_v_mp_h_05_a"); // - Monochrome 1 Apartment - -786.9887, 315.7393, 217.6386
mp.game.streaming.requestIpl("apa_v_mp_h_05_c"); // - Monochrome 2 Apartment - -786.8809, 315.6634, 187.9136
mp.game.streaming.requestIpl("apa_v_mp_h_05_b"); // - Monochrome 3 Apartment - -774.0675, 342.0773, 196.6864
mp.game.streaming.requestIpl("apa_v_mp_h_06_a"); // - Seductive 1 Apartment - -787.1423, 315.6943, 217.6384
mp.game.streaming.requestIpl("apa_v_mp_h_06_c"); // - Seductive 2 Apartment - -787.0961, 315.815, 187.9135
mp.game.streaming.requestIpl("apa_v_mp_h_06_b"); // - Seductive 3 Apartment - -773.9552, 341.9892, 196.6862
mp.game.streaming.requestIpl("apa_v_mp_h_07_a"); // - Regal 1 Apartment - -787.029, 315.7113, 217.6385
mp.game.streaming.requestIpl("apa_v_mp_h_07_c"); // - Regal 2 Apartment - -787.0574, 315.6567, 187.9135
mp.game.streaming.requestIpl("apa_v_mp_h_07_b"); // - Regal 3 Apartment - -774.0109, 342.0965, 196.6863
mp.game.streaming.requestIpl("apa_v_mp_h_08_a"); // - Aqua 1 Apartment - -786.9469, 315.5655, 217.6383
mp.game.streaming.requestIpl("apa_v_mp_h_08_c"); // - Aqua 2 Apartment - -786.9756, 315.723, 187.9134
mp.game.streaming.requestIpl("apa_v_mp_h_08_b"); // - Aqua 3 Apartment - -774.0349, 342.0296, 196.6862
//Arcadius Business Centre
mp.game.streaming.requestIpl("ex_dt1_02_office_02b"); // - Executive Rich - -141.1987, -620.913, 168.8205
mp.game.streaming.requestIpl("ex_dt1_02_office_02c"); // - Executive Cool - -141.5429, -620.9524, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_02a"); // - Executive Contrast - -141.2896, -620.9618, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_01a"); // - Old Spice Warm - -141.4966, -620.8292, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_01b"); // - Old Spice Classical - -141.3997, -620.9006, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_01c"); // - Old Spice Vintage - -141.5361, -620.9186, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_03a"); // - Power Broker Ice - -141.392, -621.0451, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_03b"); // - Power Broker Conservative - -141.1945, -620.8729, 168.8204
mp.game.streaming.requestIpl("ex_dt1_02_office_03c"); // - Power Broker Polished - -141.4924, -621.0035, 168.8205
mp.game.streaming.requestIpl("imp_dt1_02_cargarage_a"); // - Garage 1 - -191.0133, -579.1428, 135.0000
mp.game.streaming.requestIpl("imp_dt1_02_cargarage_b"); // - Garage 2 - -117.4989, -568.1132, 135.0000
mp.game.streaming.requestIpl("imp_dt1_02_cargarage_c"); // - Garage 3 - -136.0780, -630.1852, 135.0000
mp.game.streaming.requestIpl("imp_dt1_02_modgarage"); // - Mod Shop - -146.6166, -596.6301, 166.0000
//Maze Bank Building
mp.game.streaming.requestIpl("ex_dt1_11_office_02b"); // - Executive Rich - -75.8466, -826.9893, 243.3859
mp.game.streaming.requestIpl("ex_dt1_11_office_02c"); // - Executive Cool - -75.49945, -827.05, 243.386
mp.game.streaming.requestIpl("ex_dt1_11_office_02a"); // - Executive Contrast - -75.49827, -827.1889, 243.386
mp.game.streaming.requestIpl("ex_dt1_11_office_01a"); // - Old Spice Warm - -75.44054, -827.1487, 243.3859
mp.game.streaming.requestIpl("ex_dt1_11_office_01b"); // - Old Spice Classical - -75.63942, -827.1022, 243.3859
mp.game.streaming.requestIpl("ex_dt1_11_office_01c"); // - Old Spice Vintage - -75.47446, -827.2621, 243.386
mp.game.streaming.requestIpl("ex_dt1_11_office_03a"); // - Power Broker Ice - -75.56978, -827.1152, 243.3859
mp.game.streaming.requestIpl("ex_dt1_11_office_03b"); // - Power Broker Conservative - -75.51953, -827.0786, 243.3859
mp.game.streaming.requestIpl("ex_dt1_11_office_03c"); // - Power Broker Polished - -75.41915, -827.1118, 243.3858
mp.game.streaming.requestIpl("imp_dt1_11_cargarage_a"); // - Garage 1 - -84.2193, -823.0851, 221.0000
mp.game.streaming.requestIpl("imp_dt1_11_cargarage_b"); // - Garage 2 - -69.8627, -824.7498, 221.0000
mp.game.streaming.requestIpl("imp_dt1_11_cargarage_c"); // - Garage 3 - -80.4318, -813.2536, 221.000
mp.game.streaming.requestIpl("imp_dt1_11_modgarage"); // - Mod Shop - -73.9039, -821.6204, 284.0000
//Lom Bank
mp.game.streaming.requestIpl("ex_sm_13_office_02b"); // - Executive Rich - -1579.756, -565.0661, 108.523
mp.game.streaming.requestIpl("ex_sm_13_office_02c"); // - Executive Cool - -1579.678, -565.0034, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_02a"); // - Executive Contrast - -1579.583, -565.0399, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_01a"); // - Old Spice Warm - -1579.702, -565.0366, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_01b"); // - Old Spice Classical - -1579.643, -564.9685, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_01c"); // - Old Spice Vintage - -1579.681, -565.0003, 108.523
mp.game.streaming.requestIpl("ex_sm_13_office_03a"); // - Power Broker Ice - -1579.677, -565.0689, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_03b"); // - Power Broker Conservative - -1579.708, -564.9634, 108.5229
mp.game.streaming.requestIpl("ex_sm_13_office_03c"); // - Power Broker Polished - -1579.693, -564.8981, 108.5229
mp.game.streaming.requestIpl("imp_sm_13_cargarage_a"); // - Garage 1 - -1581.1120, -567.2450, 85.5000
mp.game.streaming.requestIpl("imp_sm_13_cargarage_b"); // - Garage 2 - -1568.7390, -562.0455, 85.5000
mp.game.streaming.requestIpl("imp_sm_13_cargarage_c"); // - Garage 3 - -1563.5570, -574.4314, 85.5000
mp.game.streaming.requestIpl("imp_sm_13_modgarage"); // - Mod Shop - -1578.0230, -576.4251, 104.2000
//Maze Bank West
mp.game.streaming.requestIpl("ex_sm_15_office_02b"); // - Executive Rich - -1392.667, -480.4736, 72.04217
mp.game.streaming.requestIpl("ex_sm_15_office_02c"); // - Executive Cool - -1392.542, -480.4011, 72.04211
mp.game.streaming.requestIpl("ex_sm_15_office_02a"); // - Executive Contrast - -1392.626, -480.4856, 72.04212
mp.game.streaming.requestIpl("ex_sm_15_office_01a"); // - Old Spice Warm - -1392.617, -480.6363, 72.04208
mp.game.streaming.requestIpl("ex_sm_15_office_01b"); // - Old Spice Classical - -1392.532, -480.7649, 72.04207
mp.game.streaming.requestIpl("ex_sm_15_office_01c"); // - Old Spice Vintage - -1392.611, -480.5562, 72.04214
mp.game.streaming.requestIpl("ex_sm_15_office_03a"); // - Power Broker Ice - -1392.563, -480.549, 72.0421
mp.game.streaming.requestIpl("ex_sm_15_office_03b"); // - Power Broker Conservative - -1392.528, -480.475, 72.04206
mp.game.streaming.requestIpl("ex_sm_15_office_03c"); // - Power Broker Polished - -1392.416, -480.7485, 72.04207
mp.game.streaming.requestIpl("imp_sm_15_cargarage_a"); // - Garage 1 - -1388.8400, -478.7402, 56.1000
mp.game.streaming.requestIpl("imp_sm_15_cargarage_b"); // - Garage 2 - -1388.8600, -478.7574, 48.1000
mp.game.streaming.requestIpl("imp_sm_15_cargarage_c"); // - Garage 3 - -1374.6820, -474.3586, 56.1000
mp.game.streaming.requestIpl("imp_sm_15_modgarage"); // - Mod Shop - -1391.2450, -473.9638, 77.2000
//Clubhouse & Warehouses
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_0_biker_dlc_int_01_milo"); // - Clubhouse 1 - 1107.04, -3157.399, -37.51859
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_1_biker_dlc_int_02_milo"); // - Clubhouse 2 - 998.4809, -3164.711, -38.90733
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo"); // - Meth Lab - 1009.5, -3196.6, -38.99682
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_3_biker_dlc_int_ware02_milo"); // - Weed Farm - 1051.491, -3196.536, -39.14842
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_4_biker_dlc_int_ware03_milo"); // - Cocaine Lockup - 1093.6, -3196.6, -38.99841
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_5_biker_dlc_int_ware04_milo"); // - Counterfeit Cash Factory - 1121.897, -3195.338, -40.4025
mp.game.streaming.requestIpl("bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo"); // - Document Forgery Office - 1165, -3196.6, -39.01306
mp.game.streaming.requestIpl("ex_exec_warehouse_placement_interior_1_int_warehouse_s_dlc_milo"); // - Warehouse Small - 1094.988, -3101.776, -39.00363
mp.game.streaming.requestIpl("ex_exec_warehouse_placement_interior_0_int_warehouse_m_dlc_milo"); // - Warehouse Medium - 1056.486, -3105.724, -39.00439
mp.game.streaming.requestIpl("ex_exec_warehouse_placement_interior_2_int_warehouse_l_dlc_milo"); // - Warehouse Large - 1006.967, -3102.079, -39.0035
mp.game.streaming.requestIpl("imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_"); // - Vehicle Warehouse - 994.5925, -3002.594, -39.64699
mp.game.streaming.requestIpl("bkr_bi_hw1_13_int"); // - Lost MC Clubhouse - 982.0083, -100.8747, 74.84512
//Special Locations
mp.game.streaming.requestIpl("cargoship"); // - Normal Cargo Ship - -163.3628, -2385.161, 5.999994
mp.game.streaming.requestIpl("sunkcargoship"); // - Sunken Cargo Ship - -163.3628, -2385.161, 5.999994
mp.game.streaming.requestIpl("SUNK_SHIP_FIRE"); // - Burning Cargo Ship - -163.3628, -2385.161, 5.999994
mp.game.streaming.requestIpl("redCarpet"); // - Red Carpet - 300.5927, 300.5927, 104.3776
mp.game.streaming.requestIpl("DES_StiltHouse_imapend"); // - Rekt Stilthouse Destroyed - -1020.518, 663.27, 153.5167
mp.game.streaming.requestIpl("DES_StiltHouse_rebuild"); // - Rekt Stilthouse Rebuild - -1020.518, 663.27, 153.5167
mp.game.streaming.requestIpl("FINBANK"); // - Union Depository - 2.6968, -667.0166, 16.13061
mp.game.streaming.requestIpl("TrevorsMP"); // - Trevors Trailer Dirty - 1975.552, 3820.538, 33.44833	
mp.game.streaming.requestIpl("TrevorsTrailerTidy"); // - Trevors Trailer Clean - 1975.552, 3820.538, 33.44833
mp.game.streaming.requestIpl("SP1_10_real_interior"); // - Stadium - -248.6731, -2010.603, 30.14562
mp.game.streaming.requestIpl("refit_unload"); // - Max Renda Shop - -585.8247, -282.72, 35.45475	
mp.game.streaming.requestIpl("post_hiest_unload"); // - Jewel Store - -630.07, -236.332, 38.05704
mp.game.streaming.requestIpl("FIBlobby"); // - FIB Lobby - 110.4, -744.2, 45.7496
//Special Locations - multiple IPL per location
//  Gunrunning Heist Yacht - 1373.828, 6737.393, 6.707596
mp.game.streaming.requestIpl("gr_heist_yacht2");
mp.game.streaming.requestIpl("gr_heist_yacht2_bar");
mp.game.streaming.requestIpl("gr_heist_yacht2_bedrm");
mp.game.streaming.requestIpl("gr_heist_yacht2_bridge");
mp.game.streaming.requestIpl("gr_heist_yacht2_enginrm");
mp.game.streaming.requestIpl("gr_heist_yacht2_lounge");
//  Dignity Heist Yacht - -2027.946, -1036.695, 6.707587
mp.game.streaming.requestIpl("hei_yacht_heist");
mp.game.streaming.requestIpl("hei_yacht_heist_enginrm");
mp.game.streaming.requestIpl("hei_yacht_heist_Lounge");
mp.game.streaming.requestIpl("hei_yacht_heist_Bridge");
mp.game.streaming.requestIpl("hei_yacht_heist_Bar");
mp.game.streaming.requestIpl("hei_yacht_heist_Bedrm");
mp.game.streaming.requestIpl("hei_yacht_heist_DistantLights");
mp.game.streaming.requestIpl("hei_yacht_heist_LODLights");
//  Dignity Party Yacht - -2023.643, -1038.119, 5.576781
mp.game.streaming.requestIpl("smboat");
mp.game.streaming.requestIpl("smboat_lod");
// Aircraft Carrier - 3084.73, -4770.709, 15.26167
mp.game.streaming.requestIpl("hei_carrier");
mp.game.streaming.requestIpl("hei_carrier_DistantLights");
mp.game.streaming.requestIpl("hei_carrier_int1");
mp.game.streaming.requestIpl("hei_carrier_int2");
mp.game.streaming.requestIpl("hei_carrier_int3");
mp.game.streaming.requestIpl("hei_carrier_int4");
mp.game.streaming.requestIpl("hei_carrier_int5");
mp.game.streaming.requestIpl("hei_carrier_int6");
mp.game.streaming.requestIpl("hei_carrier_LODLights");
//  Bridge Train Crash - 532.1309, 4526.187, 89.79387
mp.game.streaming.requestIpl("canyonriver01_traincrash");
mp.game.streaming.requestIpl("railing_end");
//  Bridge Train Normal
mp.game.streaming.requestIpl("canyonriver01");
mp.game.streaming.requestIpl("railing_start");
//  North Yankton - 3217.697, -4834.826, 111.8152
mp.game.streaming.requestIpl("prologue01");
mp.game.streaming.requestIpl("prologue01c");
mp.game.streaming.requestIpl("prologue01d");
mp.game.streaming.requestIpl("prologue01e");
mp.game.streaming.requestIpl("prologue01f");
mp.game.streaming.requestIpl("prologue01g");
mp.game.streaming.requestIpl("prologue01h");
mp.game.streaming.requestIpl("prologue01i");
mp.game.streaming.requestIpl("prologue01j");
mp.game.streaming.requestIpl("prologue01k");
mp.game.streaming.requestIpl("prologue01z");
mp.game.streaming.requestIpl("prologue02");
mp.game.streaming.requestIpl("prologue03");
mp.game.streaming.requestIpl("prologue03b");
mp.game.streaming.requestIpl("prologue03_grv_dug");
mp.game.streaming.requestIpl("prologue_grv_torch");
mp.game.streaming.requestIpl("prologue04");
mp.game.streaming.requestIpl("prologue04b");
mp.game.streaming.requestIpl("prologue04_cover");
mp.game.streaming.requestIpl("des_protree_end");
mp.game.streaming.requestIpl("des_protree_start");
mp.game.streaming.requestIpl("prologue05");
mp.game.streaming.requestIpl("prologue05b");
mp.game.streaming.requestIpl("prologue06");
mp.game.streaming.requestIpl("prologue06b");
mp.game.streaming.requestIpl("prologue06_int");
mp.game.streaming.requestIpl("prologue06_pannel");
mp.game.streaming.requestIpl("plg_occl_00");
mp.game.streaming.requestIpl("prologue_occl");
mp.game.streaming.requestIpl("prologuerd");
mp.game.streaming.requestIpl("prologuerdb");
//  ONeils Farm Burnt - 2469.03, 4955.278, 45.11892
mp.game.streaming.requestIpl("farmint");
mp.game.streaming.requestIpl("farm_burnt");
mp.game.streaming.requestIpl("farm_burnt_props");
mp.game.streaming.requestIpl("des_farmhs_endimap");
mp.game.streaming.requestIpl("des_farmhs_end_occl");
//  ONeils Farm
mp.game.streaming.requestIpl("farm");
mp.game.streaming.requestIpl("farm_props");
mp.game.streaming.requestIpl("farm_int");
//  Morgue - 275.446, -1361.11, 24.5378
mp.game.streaming.requestIpl("coronertrash");
mp.game.streaming.requestIpl("Coroner_Int_On");
// Cayo pericio heist island - 4840.571, -5174.425, 2.0
mp.game.streaming.requestIpl("0x9A9D1BA639675CF1");
//  Submarine - 1561.562, 410.45, -48.0
mp.game.streaming.requestIpl("entity_set_acetylene");
mp.game.streaming.requestIpl("entity_set_brig");
mp.game.streaming.requestIpl("entity_set_demolition");
mp.game.streaming.requestIpl("entity_set_fingerprint");
mp.game.streaming.requestIpl("entity_set_guide");
mp.game.streaming.requestIpl("entity_set_hatch_lights_off");
mp.game.streaming.requestIpl("entity_set_hatch_lights_on");
mp.game.streaming.requestIpl("entity_set_jammer");
mp.game.streaming.requestIpl("entity_set_plasma");
mp.game.streaming.requestIpl("entity_set_suppressors");
mp.game.streaming.requestIpl("entity_set_weapons");
//  Casino Nightclub - 1550.0, 250.0, -48.0
mp.game.streaming.requestIpl("EntitySet_DJ_Lighting");
mp.game.streaming.requestIpl("dj_01_lights_01");
mp.game.streaming.requestIpl("dj_01_lights_02");
mp.game.streaming.requestIpl("dj_01_lights_03");
mp.game.streaming.requestIpl("dj_01_lights_04");
mp.game.streaming.requestIpl("dj_02_lights_01");
mp.game.streaming.requestIpl("dj_02_lights_02");
mp.game.streaming.requestIpl("dj_02_lights_03");
mp.game.streaming.requestIpl("dj_02_lights_04");
mp.game.streaming.requestIpl("dj_03_lights_01");
mp.game.streaming.requestIpl("dj_03_lights_02");
mp.game.streaming.requestIpl("dj_03_lights_03");
mp.game.streaming.requestIpl("dj_03_lights_04");
mp.game.streaming.requestIpl("dj_04_lights_01");
mp.game.streaming.requestIpl("dj_04_lights_02");
mp.game.streaming.requestIpl("dj_04_lights_03");
mp.game.streaming.requestIpl("dj_04_lights_04");
mp.game.streaming.requestIpl("int01_ba_bar_content");
mp.game.streaming.requestIpl("int01_ba_booze_01");
mp.game.streaming.requestIpl("int01_ba_booze_02");
mp.game.streaming.requestIpl("int01_ba_booze_03");
mp.game.streaming.requestIpl("int01_ba_dj01");
mp.game.streaming.requestIpl("int01_ba_dj02");
mp.game.streaming.requestIpl("int01_ba_dj03");
mp.game.streaming.requestIpl("int01_ba_dj04");
mp.game.streaming.requestIpl("int01_ba_dj_keinemusik");
mp.game.streaming.requestIpl("int01_ba_dj_moodyman");
mp.game.streaming.requestIpl("int01_ba_dj_palms_trax");
mp.game.streaming.requestIpl("int01_ba_dry_ice");
mp.game.streaming.requestIpl("int01_ba_equipment_setup");
mp.game.streaming.requestIpl("int01_ba_equipment_upgrade");
mp.game.streaming.requestIpl("int01_ba_lightgrid_01");
mp.game.streaming.requestIpl("int01_ba_lights_screen");
mp.game.streaming.requestIpl("int01_ba_screen");
mp.game.streaming.requestIpl("int01_ba_security_upgrade");
mp.game.streaming.requestIpl("int01_ba_style02_podium");
mp.game.streaming.requestIpl("light_rigs_off");
//  Island Vault - 5012.0, -5747.5, 15.0
mp.game.streaming.requestIpl("bonds_set");
mp.game.streaming.requestIpl("files_set");
mp.game.streaming.requestIpl("panther_set");
mp.game.streaming.requestIpl("pearl_necklace_set");
mp.game.streaming.requestIpl("pink_diamond_set");
mp.game.streaming.requestIpl("tequila_set");
//Diamond Casino & Resort
mp.game.streaming.requestIpl("vw_casino_main"); // - Casino - 1100.000, 220.000, -50.000
mp.game.streaming.requestIpl("vw_casino_garage"); // - Garage - 1295.000, 230.000, -50.000
mp.game.streaming.requestIpl("vw_casino_carpark"); // - Car Park - 1380.000, 200.000, -50.000
mp.game.streaming.requestIpl("vw_casino_penthouse"); // - Penthouse - 976.636, 70.295, 115.164

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var rageRpc_min = {exports: {}};

(function (module, exports) {
	!function(e,r){module.exports=r();}("undefined"!=typeof self?self:commonjsGlobal,(function(){return function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=1)}([function(e,r,n){var t;function o(e,r){const n="client"===s();if(e&&"object"==typeof e&&void 0!==e.id){const o=(r,t,o)=>n?e.type===r&&t.at(e.id)===e:e instanceof o;switch(r){case t.Blip:return o("blip",mp.blips,mp.Blip);case t.Checkpoint:return o("checkpoint",mp.checkpoints,mp.Checkpoint);case t.Colshape:return o("colshape",mp.colshapes,mp.Colshape);case t.Label:return o("textlabel",mp.labels,mp.TextLabel);case t.Marker:return o("marker",mp.markers,mp.Marker);case t.Object:return o("object",mp.objects,mp.Object);case t.Pickup:return o("pickup",mp.pickups,mp.Pickup);case t.Player:return o("player",mp.players,mp.Player);case t.Vehicle:return o("vehicle",mp.vehicles,mp.Vehicle)}}return !1}function c(){const e=46656*Math.random()|0,r=46656*Math.random()|0;return ("000"+e.toString(36)).slice(-3)+("000"+r.toString(36)).slice(-3)}function s(){return mp.joaat?"server":mp.game&&mp.game.joaat?"client":mp.trigger?"cef":void 0}function i(e){const r=s();return JSON.stringify(e,(e,n)=>{if("client"===r||"server"===r&&n&&"object"==typeof n){let e;if(o(n,t.Blip)?e=t.Blip:o(n,t.Checkpoint)?e=t.Checkpoint:o(n,t.Colshape)?e=t.Colshape:o(n,t.Marker)?e=t.Marker:o(n,t.Object)?e=t.Object:o(n,t.Pickup)?e=t.Pickup:o(n,t.Player)?e=t.Player:o(n,t.Vehicle)&&(e=t.Vehicle),e)return {__t:e,i:"number"==typeof n.remoteId?n.remoteId:n.id}}return n})}function a(e){const r=s();return JSON.parse(e,(e,n)=>{if(("client"===r||"server"===r)&&n&&"object"==typeof n&&"string"==typeof n.__t&&"number"==typeof n.i&&2===Object.keys(n).length){const e=n.i;let o;switch(n.__t){case t.Blip:o=mp.blips;break;case t.Checkpoint:o=mp.checkpoints;break;case t.Colshape:o=mp.colshapes;break;case t.Label:o=mp.labels;break;case t.Marker:o=mp.markers;break;case t.Object:o=mp.objects;break;case t.Pickup:o=mp.pickups;break;case t.Player:o=mp.players;break;case t.Vehicle:o=mp.vehicles;}if(o)return o["client"===r?"atRemoteId":"at"](e)}return n})}function l(e){return new Promise(r=>setTimeout(()=>r(e),0))}function u(e){return new Promise((r,n)=>setTimeout(()=>n(e),0))}function p(e,r){return "number"==typeof r?Promise.race([new Promise((e,n)=>{setTimeout(()=>n("TIMEOUT"),r);}),e]):e}function f(e){try{e.url;}catch(e){return !1}return !0}n.d(r,"h",(function(){return c})),n.d(r,"a",(function(){return s})),n.d(r,"g",(function(){return i})),n.d(r,"c",(function(){return a})),n.d(r,"e",(function(){return l})),n.d(r,"d",(function(){return u})),n.d(r,"f",(function(){return p})),n.d(r,"b",(function(){return f})),function(e){e.Blip="b",e.Checkpoint="cp",e.Colshape="c",e.Label="l",e.Marker="m",e.Object="o",e.Pickup="p",e.Player="pl",e.Vehicle="v";}(t||(t={}));},function(e,r,n){n.r(r),function(e){n.d(r,"register",(function(){return d})),n.d(r,"unregister",(function(){return h})),n.d(r,"call",(function(){return w})),n.d(r,"callServer",(function(){return v})),n.d(r,"callClient",(function(){return y})),n.d(r,"callBrowsers",(function(){return B})),n.d(r,"callBrowser",(function(){return x})),n.d(r,"on",(function(){return j})),n.d(r,"off",(function(){return O})),n.d(r,"trigger",(function(){return C})),n.d(r,"triggerClient",(function(){return S})),n.d(r,"triggerServer",(function(){return E})),n.d(r,"triggerBrowsers",(function(){return L})),n.d(r,"triggerBrowser",(function(){return M}));var t=n(0);const o=t.a();if(!o)throw "Unknown RAGE environment";const c="PROCEDURE_NOT_FOUND",s="__rpc:id",i="__rpc:process",a="__rpc:browserRegister",l="__rpc:browserUnregister",u="__rpc:triggerEvent",p="__rpc:triggerEventBrowsers",f="cef"===o?window:e;if(!f[i]){if(f.__rpcListeners={},f.__rpcPending={},f.__rpcEvListeners={},f[i]=(e,r)=>{"server"!==o&&(r=e);const n=t.c(r);if(n.req){const r={id:n.id,environment:n.fenv||n.env};"server"===o&&(r.player=e);const c={ret:1,id:n.id,env:o};let s;switch(o){case"server":s=e=>r.player.call(i,[t.g(e)]);break;case"client":if("server"===n.env)s=e=>mp.events.callRemote(i,t.g(e));else if("cef"===n.env){const e=n.b&&f.__rpcBrowsers[n.b];r.browser=e,s=r=>e&&t.b(e)&&g(e,r,!0);}break;case"cef":s=e=>mp.trigger(i,t.g(e));}if(s){const e=m(n.name,n.args,r);n.noRet||e.then(e=>s({...c,res:e})).catch(e=>s({...c,err:e}));}}else if(n.ret){const r=f.__rpcPending[n.id];if("server"===o&&r.player!==e)return;r&&(r.resolve(n.err?t.d(n.err):t.e(n.res)),delete f.__rpcPending[n.id]);}},"cef"!==o){if(mp.events.add(i,f[i]),"client"===o){d("__rpc:callServer",([e,r,n],t)=>_(e,r,{fenv:t.environment,noRet:n})),d("__rpc:callBrowsers",([e,r,n],t)=>P(null,e,r,{fenv:t.environment,noRet:n})),f.__rpcBrowsers={};const e=e=>{const r=t.h();Object.keys(f.__rpcBrowsers).forEach(r=>{const n=f.__rpcBrowsers[r];n&&t.b(n)&&n!==e||delete f.__rpcBrowsers[r];}),f.__rpcBrowsers[r]=e,e.execute(`\n                    window.name = '${r}';\n                    if(typeof window['${s}'] === 'undefined'){\n                        window['${s}'] = Promise.resolve(window.name);\n                    }else{\n                        window['${s}:resolve'](window.name);\n                    }\n                `);};mp.browsers.forEach(e),mp.events.add("browserCreated",e),f.__rpcBrowserProcedures={},mp.events.add(a,e=>{const[r,n]=JSON.parse(e);f.__rpcBrowserProcedures[n]=r;}),mp.events.add(l,e=>{const[r,n]=JSON.parse(e);f.__rpcBrowserProcedures[n]===r&&delete f.__rpcBrowserProcedures[n];}),d(p,([e,r],n)=>{Object.values(f.__rpcBrowsers).forEach(t=>{k(t,u,[e,r],{fenv:n.environment,noRet:1});});});}}else void 0===f[s]&&(f[s]=new Promise(e=>{window.name?e(window.name):f[s+":resolve"]=e;}));d(u,([e,r],n)=>R(e,r,n));}function g(e,r,n){const o=t.g(r);e.execute(`var process = window["${i}"]; if(process){ process(${JSON.stringify(o)}); }else{ ${n?"":`mp.trigger("${i}", '{"ret":1,"id":"${r.id}","err":"${c}","env":"cef"}');`} }`);}function m(e,r,n){const o=f.__rpcListeners[e];return o?t.e(o(r,n)):t.d(c)}function d(e,r){if(2!==arguments.length)throw 'register expects 2 arguments: "name" and "cb"';return "cef"===o&&f[s].then(r=>mp.trigger(a,JSON.stringify([r,e]))),f.__rpcListeners[e]=r,()=>h(e)}function h(e){if(1!==arguments.length)throw 'unregister expects 1 argument: "name"';"cef"===o&&f[s].then(r=>mp.trigger(l,JSON.stringify([r,e]))),f.__rpcListeners[e]=void 0;}function w(e,r,n={}){return arguments.length<1||arguments.length>3?t.d('call expects 1 to 3 arguments: "name", optional "args", and optional "options"'):t.f(m(e,r,{environment:o}),n.timeout)}function _(e,r,n={}){switch(o){case"server":return w(e,r);case"client":{const c=t.h();return new Promise(s=>{n.noRet||(f.__rpcPending[c]={resolve:s});const a={req:1,id:c,name:e,env:o,args:r,...n};mp.events.callRemote(i,t.g(a));})}case"cef":return y("__rpc:callServer",[e,r,+n.noRet])}}function v(e,r,n={}){if(arguments.length<1||arguments.length>3)return t.d('callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"');let o={};return n.noRet&&(o.noRet=1),t.f(_(e,r,o),n.timeout)}function b(e,r,n,c={}){switch(o){case"client":return w(r,n);case"server":{const s=t.h();return new Promise(a=>{c.noRet||(f.__rpcPending[s]={resolve:a,player:e});const l={req:1,id:s,name:r,env:o,args:n,...c};e.call(i,[t.g(l)]);})}case"cef":{const e=t.h();return f[s].then(s=>new Promise(a=>{c.noRet||(f.__rpcPending[e]={resolve:a});const l={b:s,req:1,id:e,name:r,env:o,args:n,...c};mp.trigger(i,t.g(l));}))}}}function y(e,r,n,c={}){switch(o){case"client":if(c=n||{},n=r,r=e,e=null,arguments.length<1||arguments.length>3||"string"!=typeof r)return t.d('callClient from the client expects 1 to 3 arguments: "name", optional "args", and optional "options"');break;case"server":if(arguments.length<2||arguments.length>4||"object"!=typeof e)return t.d('callClient from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');break;case"cef":if(c=n||{},n=r,r=e,e=null,arguments.length<1||arguments.length>3||"string"!=typeof r)return t.d('callClient from the browser expects 1 to 3 arguments: "name", optional "args", and optional "options"')}let s={};return c.noRet&&(s.noRet=1),t.f(b(e,r,n,s),c.timeout)}function k(e,r,n,c={}){return new Promise(s=>{const i=t.h();c.noRet||(f.__rpcPending[i]={resolve:s}),g(e,{req:1,id:i,name:r,env:o,args:n,...c},!1);})}function P(e,r,n,s={}){switch(o){case"client":const o=f.__rpcBrowserProcedures[r];if(!o)return t.d(c);const i=f.__rpcBrowsers[o];return i&&t.b(i)?k(i,r,n,s):t.d(c);case"server":return b(e,"__rpc:callBrowsers",[r,n,+s.noRet],s);case"cef":return b(null,"__rpc:callBrowsers",[r,n,+s.noRet],s)}}function B(e,r,n,c={}){let s,i={};switch(o){case"client":case"cef":if(c=n||{},n=r,r=e,arguments.length<1||arguments.length>3)return t.d('callBrowsers from the client or browser expects 1 to 3 arguments: "name", optional "args", and optional "options"');c.noRet&&(i.noRet=1),s=P(null,r,n,i);break;case"server":if(arguments.length<2||arguments.length>4)return t.d('callBrowsers from the server expects 2 to 4 arguments: "player", "name", optional "args", and optional "options"');c.noRet&&(i.noRet=1),s=P(e,r,n,i);}if(s)return t.f(s,c.timeout)}function x(e,r,n,c={}){if("client"!==o)return t.d("callBrowser can only be used in the client environment");if(arguments.length<2||arguments.length>4)return t.d('callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", and optional "options"');let s={};return c.noRet&&(s.noRet=1),t.f(k(e,r,n,s),c.timeout)}function R(e,r,n){const t=f.__rpcEvListeners[e];t&&t.forEach(e=>e(r,n));}function j(e,r){if(2!==arguments.length)throw 'on expects 2 arguments: "name" and "cb"';const n=f.__rpcEvListeners[e]||new Set;return n.add(r),f.__rpcEvListeners[e]=n,()=>O(e,r)}function O(e,r){if(2!==arguments.length)throw 'off expects 2 arguments: "name" and "cb"';const n=f.__rpcEvListeners[e];n&&n.delete(r);}function C(e,r){if(arguments.length<1||arguments.length>2)throw 'trigger expects 1 or 2 arguments: "name", and optional "args"';R(e,r,{environment:o});}function S(e,r,n){switch(o){case"client":if(n=r,r=e,e=null,arguments.length<1||arguments.length>2||"string"!=typeof r)throw 'triggerClient from the client expects 1 or 2 arguments: "name", and optional "args"';break;case"server":if(arguments.length<2||arguments.length>3||"object"!=typeof e)throw 'triggerClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"';break;case"cef":if(n=r,r=e,e=null,arguments.length<1||arguments.length>2||"string"!=typeof r)throw 'triggerClient from the browser expects 1 or 2 arguments: "name", and optional "args"'}b(e,u,[r,n],{noRet:1});}function E(e,r){if(arguments.length<1||arguments.length>2)throw 'triggerServer expects 1 or 2 arguments: "name", and optional "args"';_(u,[e,r],{noRet:1});}function L(e,r,n){switch(o){case"client":case"cef":if(n=r,r=e,e=null,arguments.length<1||arguments.length>2)throw 'triggerBrowsers from the client or browser expects 1 or 2 arguments: "name", and optional "args"';break;case"server":if(arguments.length<2||arguments.length>3)throw 'triggerBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"'}b(e,p,[r,n],{noRet:1});}function M(e,r,n){if("client"!==o)throw "callBrowser can only be used in the client environment";if(arguments.length<2||arguments.length>4)throw 'callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"';k(e,u,[r,n],{noRet:1});}r.default={register:d,unregister:h,call:w,callServer:v,callClient:y,callBrowsers:B,callBrowser:x,on:j,off:O,trigger:C,triggerServer:E,triggerClient:S,triggerBrowsers:L,triggerBrowser:M};}.call(this,n(2));},function(e,r){var n;n=function(){return this}();try{n=n||new Function("return this")();}catch(e){"object"==typeof window&&(n=window);}e.exports=n;}])}));
} (rageRpc_min));

var rpc = /*@__PURE__*/getDefaultExportFromCjs(rageRpc_min.exports);

let settingsBrowser = null;
mp.keys.bind(114 /* key.F3 */, true, () => {
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});
mp.keys.bind(113 /* key.F2 */, true, async () => {
    mp.events.callRemote('getInfoUserData');
});
mp.events.add("receptionUserData", async (login, userAvatarUrl) => {
    if (!settingsBrowser) {
        const data = {
            login: login,
            avatarUrl: userAvatarUrl,
        };
        settingsBrowser = mp.browsers.new("http://localhost:3000/userMenu");
        await rpc.callBrowser(settingsBrowser, "CefSettings", { ...data });
        mp.gui.cursor.show(true, true);
    }
    else {
        settingsBrowser.destroy();
        settingsBrowser = null;
        mp.gui.cursor.show(false, false);
    }
});

class Browser {
    hud = null;
    anyMenu = null;
    constructor() {
        this.anyEvents();
    }
    anyEvents() {
        mp.events.add({
            // Сделать обновление данных (online) каждые 5-10 секунд. (ПОТОМ)
            hudDataWithRPC: async (uid, admin) => {
                if (!this.hud) {
                    const data = {
                        uid: uid,
                        isAdmin: admin,
                        online: mp.players.length,
                    };
                    this.hud = mp.browsers.new("http://localhost:3000/hud");
                    await rpc.callBrowser(this.hud, "hudSetData", { ...data });
                }
                else {
                    this.hud.destroy();
                    this.hud = null;
                }
            },
        });
    }
    async createNewBrowser() {
    }
}
new Browser();

mp.events.add({
    playerReady: () => {
        mp.events.callRemote("hudGetDataToRPC"); // Получаю данные из БД (player.uid, player.admin)
    },
});

let createAccountCef = null;
mp.events.add({
    newAccountWithCharacterFirst: (email, login, password, firstName, lastName, age, gender) => {
        mp.events.callRemote('registerNewCharacterWithUser', email, login, password, firstName, lastName, age, gender);
    },
    destroyNewAccountBrowser: () => {
        if (createAccountCef) {
            createAccountCef.destroy();
            createAccountCef = null;
            mp.gui.chat.show(true);
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            mp.players.local.freezePosition(false);
        }
    },
    showNewAccountBrowser: () => {
        if (!createAccountCef) {
            createAccountCef = mp.browsers.new("http://localhost:3000/auth");
            mp.players.local.position = new mp.Vector3(35.68, 859.94, 197.72);
            mp.gui.chat.show(false);
            mp.gui.chat.activate(false);
            mp.players.local.freezePosition(true);
            mp.gui.cursor.show(true, true);
        }
    },
});

let main = null;
mp.events.add('changeUrlToClient', async (url) => {
    if (!main) {
        main = mp.browsers.new(`http://localhost:3000/${url}`);
    }
    else {
        main.destroy();
        main = null;
    }
});

mp.events.add({
    changeToMale: () => {
        mp.players.local.model = mp.game.joaat('mp_m_freemode_01');
    },
    changeToFemale: () => {
        mp.players.local.model = mp.game.joaat('mp_f_freemode_01');
    }
});

function notifyBlack(message) {
    if (mp.players.local.vehicle)
        return;
    if (mp.players.local.isTypingInTextChat)
        return;
    if (mp.game.ui.isPauseMenuActive())
        return;
    mp.game.ui.setTextComponentFormat("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(`Нажмите ~INPUT_CONTEXT~ ${message}`);
    mp.game.ui.displayHelpTextFromStringLabel(0, false, true, 3000);
}

let collectorBrowser = null;
const showCollectorMenu = async () => {
    if (!collectorBrowser) {
        collectorBrowser = mp.browsers.new('http://localhost:3000/collectors');
        mp.gui.cursor.show(true, true);
        mp.players.local.freezePosition(true);
        await rpc.callBrowser(collectorBrowser, 'getJobLocation', { location: 'santos', status: 'true' });
    }
    else {
        collectorBrowser.destroy();
        collectorBrowser = null;
    }
    setTimeout(() => {
        mp.keys.unbind(69 /* key.E */, true, showCollectorMenu);
    }, 150);
};
mp.events.add({
    callClientOpenMenuCollectors: (location, status) => {
        switch (location) {
            case "santos":
                notifyBlack("чтобы поговорить с работодателем.");
                mp.keys.bind(69 /* key.E */, true, showCollectorMenu);
                mp.console.logInfo('playerDialog is true', true);
                break;
            case "sandy":
                notifyBlack("чтобы поговорить с работодателем.");
                mp.keys.bind(69 /* key.E */, true, showCollectorMenu);
                break;
            case "paleto":
                notifyBlack("чтобы поговорить с работодателем.");
                mp.keys.bind(69 /* key.E */, true, showCollectorMenu);
                break;
        }
    },
    callServerPlayerStartWorkOnCollectors: (location) => {
        mp.events.callRemote('playerStartWorkOnCollectors', location);
    },
    callServerPlayerStopWorkOnCollectors: () => {
        mp.events.callRemote('playerStopWorkOnCollectors');
    }
});
class ClientCollectors {
    constructor() {
        // mp.events.add('callClientOpenMenuCollectors', this.playerDialog.bind(this));
        // mp.events.add('callServerPlayerStartWorkOnCollectors', this.playerStartWorkCollectors.bind(this));
        // mp.events.add('callServerPlayerStopWorkOnCollectors', this.playerStopWorkCollectors.bind(this));
        // mp.events.add('closeCollectorsMenu', this.closeMenu.bind(this));
        mp.peds.new(0xCDEF5408, new mp.Vector3(-41.67, -662.88, 33.48), -176, 0);
        mp.peds.new(0xE7565327, new mp.Vector3(1181.01, 2704.97, 38.09), 87, 0);
        mp.peds.new(0x0703F106, new mp.Vector3(-117.59, 6469.70, 31.63), -132, 0);
    }
    // private async playerDialog(location: string, status: boolean): Promise<void> {
    //   switch (location) {
    //     case "santos":
    //       notifyBlack("чтобы поговорить с работодателем.");
    //       mp.keys.bind(key.E, true, () => showCollectorMenu(location, status));
    //       mp.console.logInfo('playerDialog is true', true);
    //       break;
    //     case "sandy":
    //       notifyBlack("чтобы поговорить с работодателем.");
    //       mp.keys.bind(key.E, true,() =>  showCollectorMenu(location, status));
    //       break;
    //     case "paleto":
    //       notifyBlack("чтобы поговорить с работодателем.");
    //       mp.keys.bind(key.E, true, () => showCollectorMenu(location, status));
    //       break;
    //     default:
    //       break;
    //   }
    // }
    playerStartWorkCollectors(location) {
        mp.events.callRemote('playerStartWorkOnCollectors', location);
    }
    playerStopWorkCollectors() {
        mp.events.callRemote('playerStopWorkOnCollectors');
    }
}
new ClientCollectors();
// TODO: Изменить названия функций на нормальные

const jobVehicle = {};
mp.events.add({
    setMarkerOnJobVehicle: (position) => {
        const { x, y, z } = position;
        jobVehicle.vehicleIsActive = true;
        jobVehicle.coordsVehicle = new mp.Vector3(x, y, z);
        // I do not know how this will affect the performance of the client part of the user
        mp.events.add('render', () => {
            if (jobVehicle.vehicleIsActive === true) {
                mp.game.graphics.drawMarker(39, x, y, z + 3.25, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 0, 178, 255, 198, true, false, 2, false, null, null, false);
            }
            else
                return;
        });
    },
    unsetMarkerOnJobVehicle: () => {
        jobVehicle.vehicleIsActive = false;
    }
});

const createNewFamily = () => {
    mp.events.callRemote("createNewFamily", "test123", 5000);
    setTimeout(() => {
        mp.keys.unbind(69 /* key.E */, true, createNewFamily);
    }, 150);
};
mp.events.add({
    bindFamilyShape: () => {
        notifyBlack("чтобы открыть меню покупки.");
        mp.keys.bind(69 /* key.E */, true, createNewFamily);
    },
});
