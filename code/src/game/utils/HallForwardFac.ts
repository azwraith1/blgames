/*
 * @Author: li mengchan 
 * @Date: 2018-10-19 11:08:11 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-24 18:16:57
 * @Description: 统一界面跳转
 */
class HallForwardFac {
	public static redirectHall(callback, sceneName = ServerConfig.gid) {
		if (ServerConfig.gid) {
			let isOpen = Global.gameProxy.getSceneExist(ServerConfig.gid);
			if (!isOpen) {
				Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(74), () => {
					FrameUtils.flushWindow();
				}, null, true);
				return;
			}
			sceneName = Global.gameProxy.checkBackHallSceneName(ServerConfig.gid);
		}
		if (sceneName == "slot") {
			let scene = game.Utils.getURLQueryString("scene") || "";
			switch (scene) {
				case "dntg":
					RotationLoading.instance.load(["dntg_hall"], "", () => {
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.dntg).load("dntg_game", () => {
							RES.loadGroup("dntg_back");
							RES.loadGroup("slot_hall_new");
							CF.sN(SceneNotify.OPEN_DNTG);
						})
					});
					break;
				case "sdxl":
					RotationLoading.instance.load(["sdxl_hall"], "", () => {
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdxl).load("sdxl_game", () => {
							RES.loadGroup("sdxl_back");
							RES.loadGroup("slot_hall_new");
							CF.sN(SceneNotify.OPEN_SDXL);
						})
					});
					break;
				case "cbzz":
					RotationLoading.instance.load(["cbzz_hall"], "", () => {
						RES.loadGroup("cbzz_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.cbzz).load("cbzz_game", () => {
							CF.sN(SceneNotify.OPEN_CBZZ);
						});

					});
					break;
				case "sdmn":
					RotationLoading.instance.load(["sdmn_hall"], "", () => {
						RES.loadGroup("sdmn_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sdmn).load("sdmn_game", () => {
							CF.sN(SceneNotify.OPEN_SDMN);
						});

					});
					break;
				case "bskg":
					RotationLoading.instance.load(["bskg_hall"], "", () => {
						RES.loadGroup("bskg_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bskg).load("bskg_game", () => {
							CF.sN(SceneNotify.OPEN_BSKG);
						});
					});
					break;
				case "rdsg":
					RotationLoading.instance.load(["rdsg_hall"], "", () => {
						RES.loadGroup("rdsg_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.rdsg).load("rdsg_game", () => {
							CF.sN(SceneNotify.OPEN_RDSG);
						});
					});
					break;
				case "ayls":
					RotationLoading.instance.load(["ayls_hall"], "", () => {
						RES.loadGroup("ayls_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ayls).load("ayls_game", () => {
							CF.sN(SceneNotify.OPEN_AYLS);
						});
					});
					break;
				case "gdzw":
					RotationLoading.instance.load(["gdzw_hall"], "", () => {
						RES.loadGroup("gdzw_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.gdzw).load("gdzw_game", () => {
							CF.sN(SceneNotify.OPEN_GDZW);
						});
					});
					break;
				case "bscs":
					RotationLoading.instance.load(["bscs_hall"], "", () => {
						RES.loadGroup("bscs_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.bscs).load("bscs_game", () => {
							CF.sN(SceneNotify.OPEN_BSCS);
						});
					});
					break;
				case "ceby":
					RotationLoading.instance.load(["ceby_hall"], "", () => {
						RES.loadGroup("ceby_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.ceby).load("ceby_game", () => {
							CF.sN(SceneNotify.OPEN_CEBY);
						});
					});
					break;
				case "zcjl":
					RotationLoading.instance.load(["zcjl_hall"], "", () => {
						RES.loadGroup("zcjl_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.zcjl).load("zcjl_game", () => {
							CF.sN(SceneNotify.OPEN_ZCJL);
						});
					});
					break;
				case "wszw":
					RotationLoading.instance.load(["wszw_hall"], "", () => {
						RES.loadGroup("wszw_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.wszw).load("wszw_game", () => {
							CF.sN(SceneNotify.OPEN_WSZW);
						});
					});
					break;
				case "lucky7":
					RotationLoading.instance.load(["lucky7_hall"], "", () => {
						RES.loadGroup("lucky7_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.lucky7).load("lucky7_game", () => {
							CF.sN(SceneNotify.OPEN_LUCKY7);
						});
					});
					break;
				case "csd":
					RotationLoading.instance.load(["csd_hall"], "", () => {
						RES.loadGroup("csd_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.csd).load("csd_game", () => {
							CF.sN(SceneNotify.OPEN_CSD);
						});
					});
					break;
				case "xysg":
					RotationLoading.instance.load(["xysg_hall"], "", () => {
						RES.loadGroup("xysg_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xysg).load("xysg_game", () => {
							CF.sN(SceneNotify.OPEN_XYSG);
						});
					});
					break;
				case "xcbs":
					RotationLoading.instance.load(["xcbs_hall"], "", () => {
						RES.loadGroup("xcbs_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.xcbs).load("xcbs_game", () => {
							CF.sN(SceneNotify.OPEN_XCBS);
						});
					});
					break;
				case "sgws":
					RotationLoading.instance.load(["sgws_hall"], "", () => {
						RES.loadGroup("sgws_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.sgws).load("sgws_game", () => {
							CF.sN(SceneNotify.OPEN_SGWS);
						});
					});
					break;
				case "snyx":
					RotationLoading.instance.load(["snyx_hall"], "", () => {
						RES.loadGroup("snyx_back");
						RES.loadGroup("slot_hall_new");
						SlotLoadingScene.getInstance(SLOT_LOADING_SKIN.snyx).load("snyx_game", () => {
							CF.sN(SceneNotify.OPEN_SNYX);
						});
					});
					break;
				default:
					RotationLoading.instance.load(["slot_hall_new"], "", () => {
						CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
					});
					break;
			}
		} else {
			let resConfig = ResGroupConf[sceneName];
			if (!resConfig) {
				CF.sN(SceneNotify.OPEN_MAIN_HALL);
			} else {
				console.log("resConfig:" + resConfig.hall);
				RotationLoading.instance.load(resConfig.hall, "", () => {
					CF.sN(`OPEN_${ServerConfig.gid.toLocaleUpperCase()}_HALL`);
				});
			}
		}
		callback && callback();
	}


	public static async redirectRaceScene(resp, data, callback) {
		let roomInfo = resp.roomInfo;
		let gameId = roomInfo.gameId;
		Global.gameProxy.roomState = null;
		switch (gameId) {
			case "mjxzdd":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load([`match_${gameId}`], "", async () => {
					RES.loadGroup("match_hall");
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(`OPEN_MATCH_${gameId.toUpperCase()}`);
					} else {
						Global.gameProxy.clearRoomInfo();
						Global.alertMediator.addAlert("比赛已经结束或者你已被淘汰", null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
		}
	}


	public static async redirectScene(resp, data, callback) {
		let roomInfo = resp.roomInfo;
		let gameId = roomInfo.gameId;
		Global.gameProxy.roomState = null;
		switch (gameId) {
			case "blnn":
				Global.roomProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				// Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				RotationLoadingShu.instance.load(["niuniu_game"], "", async () => {
					RES.loadGroup("niuniu_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						if (roomInfo.playway == 0) {
							CF.sN(SceneNotify.OPEN_NIUNIUGAMES);
						}
						else {
							CF.sN(SceneNotify.OPEN_NIUNIUJSGAMES);
						}

					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				})
				break;
			case "sangong":
				Global.roomProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				RotationLoadingShu.instance.load(["sangong_game"], "", async () => {
					RES.loadGroup("sangong_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_SANGONG_GAME);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				})
				break;
			case "mjxlch":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["majiang_game"], "", async () => {
					RES.loadGroup("majiang_hall");
					RES.loadGroup("majiang_common");
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						let sceneName = Global.gameProxy.checkBackHallSceneName(roomInfo.gameId) + "";
						CF.sN(`OPEN_${sceneName.toUpperCase()}`);
					} else {
						Global.gameProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "mjxzdd":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["majiang_game"], "", async () => {
					RES.loadGroup("xzdd_hall");
					RES.loadGroup("majiang_common");
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						let sceneName = Global.gameProxy.checkBackHallSceneName(roomInfo.gameId) + "";
						CF.sN(`OPEN_${sceneName.toUpperCase()}`);
					} else {
						Global.gameProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "dzmj":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["majiang_game"], "", async () => {
					RES.loadGroup("dzmj_hall");
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_DZMJ);
					} else {
						Global.gameProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			/**杭州麻将*/
			case "hzmj":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["hzmj_game"], "", async () => {
					RES.loadGroup("hzmj_hall");
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_HZMJ);
					} else {
						Global.gameProxy.clearRoomInfo();
						CF.sN(SceneNotify.OPEN_HZMJ_MATCHING);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "zjh":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["zhajinhua_game"], "", async () => {
					RES.loadGroup("zhajinhua_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_ZJHGAME);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "blackjack":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["blackjack_game"], "", async () => {
					RES.loadGroup("blackjack_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_BLACKJ_GAME);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "baicao":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["baicao_game"], "", async () => {
					RES.loadGroup("baicao_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_BAICAO_GAME);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "superbaicao":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["superbaicao_game"], "", async () => {
					RES.loadGroup("superbaicao_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_SUPERBAICAO_GAME);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "hnmj":
			case "gdmj":
			case "hbmj":
			case "gyzjmj":
			case "ermj":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.gameProxy.setRoomInfo(resp);
				Global.gameProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load([`${gameId}_game`], "", async () => {
					RES.loadGroup(`${gameId}_hall`);
					await Global.gameProxy.req2updateRoom();
					let roomInfo = Global.gameProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(`OPEN_${gameId.toLocaleUpperCase()}`);
					} else {
						Global.gameProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;
			case "bdz":
				Global.gameProxy.currentSceneId = data.sceneId;
				Global.roomProxy.setRoomInfo(resp);
				Global.roomProxy.diWen = resp.roomInfo.gameId;
				game.DateTimeManager.instance.updateServerTime(resp.roomInfo.serverTime);
				Global.playerProxy.playerStatus = PlayerStatusEnum.RUUNING;
				Global.gameProxy.lastGameConfig.diFen = resp.roomInfo.betBase;
				//如果是重连并且是游戏中得状态
				RotationLoading.instance.load(["bdz_game"], "", async () => {
					RES.loadGroup("bdz_hall");
					await Global.roomProxy.req2updateRoom();
					let roomInfo = Global.roomProxy.roomInfo;
					if (roomInfo && roomInfo.playing) {
						CF.sN(SceneNotify.OPEN_BDZ);
					} else {
						Global.roomProxy.clearRoomInfo();
						Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(63), null, null, true);
					}
					callback && callback(roomInfo.playing);
				});
				break;

		}
	}
}