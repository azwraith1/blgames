function enterSlotScene(scene) {
    PMDFactory.instance.clearWaitList();
    switch (scene) {
        case "snyx":
            RotationLoading.instance.load(["snyx_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("snyx_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.snyx).load("snyx_game", function () {
                    CF.sN(SceneNotify.OPEN_SNYX);
                });
            });
            break;
        case "sgws":
            RotationLoading.instance.load(["sgws_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("sgws_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sgws).load("sgws_game", function () {
                    CF.sN(SceneNotify.OPEN_SGWS);
                });
            });
            break;
        case "xysg":
            RotationLoading.instance.load(["xysg_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("xysg_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xysg).load("xysg_game", function () {
                    CF.sN(SceneNotify.OPEN_XYSG);
                });
            });
            break;
        case "xcbs":
            RotationLoading.instance.load(["xcbs_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("xcbs_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xcbs).load("xcbs_game", function () {
                    CF.sN(SceneNotify.OPEN_XCBS);
                });
            });
            break;
        case "csd":
            RotationLoading.instance.load(["csd_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("csd_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.csd).load("csd_game", function () {
                    CF.sN(SceneNotify.OPEN_CSD);
                });
            });
            break;
        case "lucky7":
            RotationLoading.instance.load(["lucky7_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("lucky7_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.lucky7).load("lucky7_game", function () {
                    CF.sN(SceneNotify.OPEN_LUCKY7);
                });
            });
            break;
        case "wszw":
            RotationLoading.instance.load(["wszw_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("wszw_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.wszw).load("wszw_game", function () {
                    CF.sN(SceneNotify.OPEN_WSZW);
                });
            });
            break;
        case "zcjl":
            RotationLoading.instance.load(["zcjl_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("zcjl_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.zcjl).load("zcjl_game", function () {
                    CF.sN(SceneNotify.OPEN_ZCJL);
                });
            });
            break;
        case "ceby":
            RotationLoading.instance.load(["ceby_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("ceby_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ceby).load("ceby_game", function () {
                    CF.sN(SceneNotify.OPEN_CEBY);
                });
            });
            break;
        case "bscs":
            RotationLoading.instance.load(["bscs_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("bscs_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bscs).load("bscs_game", function () {
                    CF.sN(SceneNotify.OPEN_BSCS);
                });
            });
            break;
        case "gdzw":
            RotationLoading.instance.load(["gdzw_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("gdzw_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.gdzw).load("gdzw_game", function () {
                    CF.sN(SceneNotify.OPEN_GDZW);
                });
            });
            break;
        case "ayls":
            RotationLoading.instance.load(["ayls_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("ayls_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ayls).load("ayls_game", function () {
                    CF.sN(SceneNotify.OPEN_AYLS);
                });
            });
            break;
        case "rdsg":
            RotationLoading.instance.load(["rdsg_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("rdsg_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.rdsg).load("rdsg_game", function () {
                    CF.sN(SceneNotify.OPEN_RDSG);
                });
            });
            break;
        case "bskg":
            RotationLoading.instance.load(["bskg_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("bskg_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bskg).load("bskg_game", function () {
                    CF.sN(SceneNotify.OPEN_BSKG);
                });
            });
            break;
        case "sdmn":
            RotationLoading.instance.load(["sdmn_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("sdmn_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdmn).load("sdmn_game", function () {
                    CF.sN(SceneNotify.OPEN_SDMN);
                });
            });
            break;
        case "cbzz":
            RotationLoading.instance.load(["cbzz_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                RES.loadGroup("cbzz_back");
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.cbzz).load("cbzz_game", function () {
                    CF.sN(SceneNotify.OPEN_CBZZ);
                });
            });
            break;
        case "sdxl":
            RotationLoading.instance.load(["sdxl_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdxl).load("sdxl_game", function () {
                    RES.loadGroup("sdxl_back");
                    CF.sN(SceneNotify.OPEN_SDXL);
                });
            });
            break;
        case "dntg":
            RotationLoading.instance.load(["dntg_hall"], "", function () {
                CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.dntg).load("dntg_game", function () {
                    RES.loadGroup("dntg_back");
                    CF.sN(SceneNotify.OPEN_DNTG);
                });
            });
            break;
    }
}
