var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
 * @Author: MC Lee
 * @Date: 2020-01-06 17:25:52
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-04 15:46:26
 * @Description: 俱乐部内部大厅
 */
var ClubInnerHallScene = (function (_super) {
    __extends(ClubInnerHallScene, _super);
    function ClubInnerHallScene() {
        var _this = _super.call(this) || this;
        /**
         * 背景音乐
         */
        _this.bgMusic = "main_bg_mp3";
        _this.lockReq = false;
        /**
         * 默认选择
         */
        _this.clubItems = [];
        _this.skinName = "ClubInnerHallSceneSkin" + CF.tis;
        return _this;
    }
    Object.defineProperty(ClubInnerHallScene, "instance", {
        get: function () {
            if (!ClubInnerHallScene._instance) {
                ClubInnerHallScene._instance = new ClubInnerHallScene();
            }
            return ClubInnerHallScene._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubInnerHallScene.prototype.showDBComponent = function () {
        var db = new DBComponent("jlb_tittle", false);
        db.playByFilename(-1);
        db.x = 0;
        db.y = 40;
        this.dbGroup.addChild(db);
    };
    ClubInnerHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.fastBtn.touchEnabled = false;
        this.initList();
        this.ggBtn.visible = false;
        game.UIUtils.changeResize(1);
        this.showClubInfo();
        this.showDBComponent();
    };
    //当有新成员的审批的时候 显示红色暗点
    ClubInnerHallScene.prototype.showRedPoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (ClubManager.instance.currentClub.role == 3)
                            return [2 /*return*/];
                        if (!ClubManager.instance.currentClub || !ClubManager.instance.currentClub.clubId)
                            return [2 /*return*/];
                        hander = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            ClubManager.instance.canShowPoint = this.redPointImg.visible = resp.length > 0;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubInnerHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_INNER_ITEM_TOUCH, this.innerItemTouch, this);
        CF.aE(ENo.CLUB_INNER_TABLE_TOUCH, this.innerTableTouch, this);
        CF.aE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
        CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
        CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        CF.aE(ServerNotify.s_pushNewTables, this.s_pushNewTables, this);
        CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
        this.tableScroller.addEventListener(egret.Event.CHANGE, this.scrollerChange, this);
        //smart 牌桌设置
        CF.aE(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.innerTableSet, this);
        //牌桌销毁 smart
        CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
        /**smart 有新成员加入 */
        CF.aE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
        /**踢出玩家 */
        CF.aE(ServerNotify.s_clubPlayerKick, this.s_clubPlayerKick, this);
        //游戏关闭 smart
        CF.aE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
    };
    //牌桌设置
    ClubInnerHallScene.prototype.innerTableSet = function (e) {
        ClubTableManagePanel.instance.show();
    };
    ClubInnerHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_INNER_ITEM_TOUCH, this.innerItemTouch, this);
        CF.rE(ENo.CLUB_INNER_TABLE_TOUCH, this.innerTableTouch, this);
        CF.rE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
        CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
        CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        CF.rE(ServerNotify.s_pushNewTables, this.s_pushNewTables, this);
        this.tableScroller.removeEventListener(egret.Event.CHANGE, this.scrollerChange, this);
        CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
        //smart 牌桌设置
        CF.rE(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.innerTableSet, this);
        //牌桌销毁 smart
        CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
        /**smart 有新成员加入 */
        CF.rE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
        /**踢出玩家 */
        CF.rE(ServerNotify.s_clubPlayerKick, this.s_clubPlayerKick, this);
        //游戏关闭 smart
        CF.rE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
    };
    ClubInnerHallScene.prototype.s_pushClubOpenGameChange = function (e) {
        ClubManager.instance.clearOpenGameClubDatas();
        ClubInnerHallScene.instance.showClubInfo();
    };
    ClubInnerHallScene.prototype.scrollerChange = function (e) {
        var scrollH = this.tableScroller.viewport.scrollH;
        this.bgImage1.x = scrollH / 20;
        this.bgImage2.x = -1860 + this.bgImage1.x;
    };
    ClubInnerHallScene.prototype.s_pushNewApprovalMessagesEvent = function (e) {
        var data = e.data;
        if (data.clubId != ClubManager.instance.currentClub.clubId || ClubManager.instance.currentClub.role == 3) {
            return;
        }
        this.redPointImg.visible = true;
        ClubManager.instance.canShowPoint = true;
    };
    ClubInnerHallScene.prototype.s_pushTableStateInfo = function (e) {
        var data = e.data;
        var clubData = ClubManager.instance.getTableData(data.tableId);
        clubData.status = data.status;
        this.updateItemData(clubData);
    };
    ClubInnerHallScene.prototype.updateItemData = function (clubData) {
        for (var i = 0; i < this.tableList.numChildren; i++) {
            var render = this.tableList.getChildAt(i);
            if (render.data.tableId == clubData.tableId) {
                render.data = clubData;
            }
        }
    };
    /**
     * 服务器创建了新的桌子
     */
    ClubInnerHallScene.prototype.s_pushNewTables = function (e) {
        var data = e.data;
        ClubManager.instance.addTableData(data.tableList);
        //smrat
        //刷新列表
        this.showCurrentGameList();
        //smart
        //=======================>
        // for (let i = 0; i < data.tableList.length; i++) {
        // 	let tableData = data.tableList[i];
        // 	if (tableData.gameId == this.currentClubGameId) {
        // 		this.currentArryData.addItem(data.tableList[i]);
        // 	}
        // }
    };
    /**服务器销毁新桌子*/
    ClubInnerHallScene.prototype.s_pushDestoryTables = function (e) {
        var data = e.data;
        LogUtils.logD("====s_pushDestoryTables===" + JSON.stringify(data));
        if (data["tableIds"]) {
            ClubManager.instance.clearTableData(data["tableIds"]);
            //刷新列表
            this.showCurrentGameList();
        }
    };
    /**
     * 玩家坐下
     * @param  {egret.Event} e
     */
    ClubInnerHallScene.prototype.s_clubPlayerSitdown = function (e) {
        // 		gameId: 10005
        // playerInfo: {seatId: 3, figureUrl: "8", nickname: "test12", gold: 1000000, uid: 1100002, …}
        // playerNum: 1
        // status: 1
        // tableId: 374605
        var clubData = ClubManager.instance.playerSiteDown(e.data);
        this.updateItemData(clubData);
    };
    /**
     * 玩家离开
     * @param  {egret.Event} e
     */
    ClubInnerHallScene.prototype.s_clubTablePlayerLeave = function (e) {
        var clubData = ClubManager.instance.playerLeave(e.data);
        this.updateItemData(clubData);
    };
    ClubInnerHallScene.prototype.innerTableTouch = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                if (this.lockReq) {
                    return [2 /*return*/];
                }
                data = e.data;
                this.joinScene(data);
                return [2 /*return*/];
            });
        });
    };
    // public joinSceneCall
    ClubInnerHallScene.prototype.innerItemTouch = function (e) {
        var data = e.data;
        for (var i = 0; i < this.clubItems.length; i++) {
            var club = this.clubItems[i];
            club.showStatus(club == data);
        }
        this.currentClubGameId = data.gameId;
        ClubManager.instance.lastClubGameId = data.gameId;
        this.showCurrentGameList();
    };
    /**
     * 玩家信息
        */
    ClubInnerHallScene.prototype.renderPlayerInfo = function () {
        var playerInfo = Global.playerProxy.playerData;
        this.nameLabel.text = playerInfo.nickname;
        var headerImage = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
        this.headerImage.source = headerImage;
        this.updateGold();
    };
    ClubInnerHallScene.prototype.initList = function () {
        this.tableList.dataProvider = null;
        this.tableList.itemRenderer = ClubInnerTableRender;
    };
    ClubInnerHallScene.prototype.showClubInfo = function () {
        var clubData = ClubManager.instance.currentClub;
        this.clubIdLabel.text = "ID:" + clubData.clubId;
        this.clubNameLabel.text = clubData.name || "";
        this.renderPlayerInfo();
        this.showClubTable();
    };
    ClubInnerHallScene.prototype.show = function () {
        //smart
        GameLayerManager.gameLayer().sceneLayer.addChild(this);
    };
    ClubInnerHallScene.prototype.showClubTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_clubHandler_c_enterClubHall;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            this.hide();
                            CF.sN(SceneNotify.OPEN_CLUB_HALL);
                            return [2 /*return*/];
                        }
                        ClubManager.instance.setClubData(resp);
                        this.fastBtn.touchEnabled = true;
                        this.flushUI();
                        //smrat
                        this.showRedPoint();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubInnerHallScene.prototype.flushUI = function () {
        //smart 重置tabItemGroup的状态 
        this.tabItemGroup.removeChildren();
        this.tableList.dataProvider = null;
        var clubIds = ClubManager.instance.clubIds;
        if (ClubManager.instance.lastClubGameId) {
            this.currentClubGameId = ClubManager.instance.lastClubGameId;
        }
        else {
            if (clubIds.length > 0) {
                this.currentClubGameId = clubIds[0];
                ClubManager.instance.lastClubGameId = this.currentClubGameId;
            }
        }
        if (this.bgImg3)
            this.bgImg3.source = "club_inner_bg2_png";
        if (clubIds.length < 1) {
            if (this.bgImg3)
                this.bgImg3.source = "club_game_closeall_png";
            return;
        }
        LogUtils.logD("============this.currentClubGameId============" + this.currentClubGameId);
        for (var i = 0; i < clubIds.length; i++) {
            var item = new ClubInnerTabItem(clubIds[i]);
            this.tabItemGroup.addChild(item);
            item.showStatus(clubIds[i] == this.currentClubGameId);
            this.clubItems.push(item);
        }
        this.showCurrentGameList();
    };
    ClubInnerHallScene.prototype.showCurrentGameList = function () {
        this.tableScroller.stopAnimation();
        this.tableScroller.viewport.scrollV = 0;
        this.tableList.dataProvider = null;
        var tableData = ClubManager.instance.getTableListByGameId(this.currentClubGameId);
        var newTableData = tableData;
        tableData = _.sortBy(tableData, "createTime");
        ClubManager.instance.setTableNum(tableData);
        //smart 加条记录做牌桌管理
        if (ClubManager.instance.currentClub.role == 1) {
            var newData = { createTime: 0, "tableId": -10800, "gameId": 10020, "betBase": 0, "seatNum": 2, "usedSeatNum": 0, "tableListPlayerInfo": [], "status": 1, "isNew": -1 };
            // let newData = JSON.parse(JSON.stringify(tableData[0]));
            // newData["isNew"] = -1;
            // newData["tableId"] = -10800;
            tableData.unshift(newData);
        }
        // LogUtils.logD("==showCurrentGameList==" + JSON.stringify(tableData));
        if (!tableData || tableData.length == 0)
            return;
        this.currentArryData = new eui.ArrayCollection(tableData);
        this.tableList.dataProvider = this.currentArryData;
    };
    ClubInnerHallScene.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        ClubInnerHallScene._instance = null;
    };
    ClubInnerHallScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.clubRecordBtn:
                //语言是韩国语言 战绩不开启
                // if (TextUtils.instance.currentLanguage == "ko_kr") {
                // 	Toast.launch("곧 개방되니 기대하세요", 1);
                // 	return;
                // }
                if (!this.currentClubGameId) {
                    return;
                }
                ClubGainPanel.instance.show();
                break;
            case this.backBtn:
                this.backBtnTouch();
                break;
            case this.fastBtn:
                this.fastJoin();
                break;
            case this.memberBtn:
                ClubMemberPanel.instance.show();
                break;
            case this.managerBtn:
                ClubConfigPanel.instance.show();
                this.setAutoTimeout(function () { }, this, 5000);
                break;
        }
    };
    ClubInnerHallScene.prototype.backBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_clubHandler_c_leaveClubHall;
                        data = {};
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            return [2 /*return*/];
                        }
                        this.hide();
                        ClubManager.instance.clearClubDatas();
                        CF.sN(SceneNotify.OPEN_CLUB_HALL);
                        return [2 /*return*/];
                }
            });
        });
    };
    //clubnew
    ClubInnerHallScene.prototype.getResGroupById = function (gameId) {
        switch (gameId) {
            case GAME_ID.MJXZDD:
                return ['majiang_game'];
            case GAME_ID.ERMJ:
                return ['ermj_game', "majiang_game"];
            case GAME_ID.BLNN:
                return ['niuniu_game'];
            case GAME_ID.ZJH:
                return ['zhajinhua_game'];
            case GAME_ID.HBMJ:
                return ['hbmj_game'];
            case GAME_ID.BDZ:
                return ['bdz_game'];
            case GAME_ID.GDMJ:
                return ['gdmj_game'];
            case GAME_ID.BAICAO:
                return ['baicao_game'];
        }
    };
    /**
     * 快速加入
     */
    ClubInnerHallScene.prototype.fastJoin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameId, handler, data, resp, players, i, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        game.UIUtils.playScaleAni(this.fastImage);
                        gameId = this.currentClubGameId;
                        handler = ServerPostPath.hall_clubHandler_c_fastJoinTable;
                        data = { gameId: gameId };
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            return [2 /*return*/];
                        }
                        players = {};
                        for (i = 0; i < resp.roomInfo.players.length; i++) {
                            player = resp.roomInfo.players[i];
                            players[player.seatId] = player;
                        }
                        resp.roomInfo.players = players;
                        this.joinSceneCall(resp);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    ClubInnerHallScene.prototype.joinScene = function (itemData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var respGroup, instance;
            return __generator(this, function (_a) {
                respGroup = this.getResGroupById(itemData.gameId);
                respGroup.unshift("club_hall");
                instance = RotationLoading.instance;
                if (GameConfig.CURRENT_ISSHU) {
                    instance = RotationLoadingShu.instance;
                }
                instance.load(respGroup, "", function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var handler, data, resp, players, i, player;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.lockReq = true;
                                egret.setTimeout(function () {
                                    _this.lockReq = false;
                                }, this, 5000);
                                handler = ServerPostPath.hall_clubHandler_c_enterClubTable;
                                data = { tableId: itemData.tableId };
                                if (itemData.clubId) {
                                    data = { tableId: itemData.tableId, clubId: itemData.clubId };
                                }
                                return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                            case 1:
                                resp = _a.sent();
                                if (resp.error && resp.error.code != 0) {
                                    this.lockReq = false;
                                    Toast.launch(resp.error.msg);
                                    return [2 /*return*/];
                                    // Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
                                }
                                players = {};
                                for (i = 0; i < resp.roomInfo.players.length; i++) {
                                    player = resp.roomInfo.players[i];
                                    players[player.seatId] = player;
                                }
                                resp.roomInfo.players = players;
                                ClubManager.instance.currentClub.tableId = itemData.tableId;
                                if (itemData.clubId) {
                                    ClubManager.instance.currentClub.clubId = itemData.clubId;
                                }
                                this.joinSceneCall(resp);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    //clubnew
    ClubInnerHallScene.prototype.joinSceneCall = function (resp) {
        var roomInfo = resp.roomInfo;
        Global.gameProxy.clearAllRoomInfo();
        CF.dP(ENo.CLOSE_ALL);
        switch (roomInfo.gameId) {
            case GAME_ID.BLNN:
                this.hide();
                Global.roomProxy.setRoomInfo(resp);
                QZNNClubReadyScene.instance.show(false);
                break;
            case GAME_ID.ERMJ:
                Global.gameProxy.setRoomInfo(resp);
                this.hide();
                ERenClubReadyScene.instance.show(false);
                break;
            case GAME_ID.MJXZDD:
                Global.gameProxy.setRoomInfo(resp);
                this.hide();
                XZDDClubReadyScene.instance.show(false);
                break;
            case GAME_ID.ZJH:
                Global.roomProxy.setRoomInfo(resp);
                this.hide();
                ZJHClubReadyScene.instance.show(false);
                break;
            case GAME_ID.HBMJ:
                Global.gameProxy.setRoomInfo(resp);
                this.hide();
                HBMJClubReadyScene.instance.show(false);
                break;
            case GAME_ID.BDZ:
                Global.roomProxy.setRoomInfo(resp);
                this.hide();
                BDZClubReadyScene.instance.show(false);
                break;
            case GAME_ID.GDMJ:
                Global.gameProxy.setRoomInfo(resp);
                this.hide();
                GDMJClubReadyScene.instance.show(false);
                break;
            case GAME_ID.BAICAO:
                Global.roomProxy.setRoomInfo(resp);
                this.hide();
                BAICAOClubReadyScene.instance.show(false);
                break;
        }
        this.lockReq = false;
    };
    ClubInnerHallScene.prototype.dstoryClub = function () {
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubInnerHallScene._instance);
        ClubInnerHallScene._instance = null;
        Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);
        CF.sN(SceneNotify.OPEN_CLUB_HALL);
    };
    ClubInnerHallScene.prototype.s_clubPlayerKick = function () {
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubInnerHallScene._instance);
        ClubInnerHallScene._instance = null;
        Toast.launch(TextUtils.instance.getCurrentTextById(60), 1);
        CF.sN(SceneNotify.OPEN_CLUB_HALL);
    };
    return ClubInnerHallScene;
}(game.BaseScene));
__reflect(ClubInnerHallScene.prototype, "ClubInnerHallScene");
