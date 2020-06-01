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
 * @Date: 2020-01-06 10:19:47
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-18 17:11:25
 * @Description: 俱乐部玩家准备界面
 */
var BaseClubReadyScene = (function (_super) {
    __extends(BaseClubReadyScene, _super);
    function BaseClubReadyScene(gameName) {
        if (gameName === void 0) { gameName = "default"; }
        var _this = _super.call(this) || this;
        _this.isSiteDown = false;
        _this.gameName = gameName;
        return _this;
    }
    BaseClubReadyScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initProxyByGameName();
        this.hideUI();
    };
    BaseClubReadyScene.prototype.showPlayingAni = function (show) {
        var _this = this;
        LogUtils.logD("================showPlayingAni=======" + show);
        egret.Tween.removeTweens(this.playingGroup);
        if (show) {
            this.playingGroup.visible = true;
            var point_1 = 1;
            this.point1.visible = this.point2.visible = this.point3.visible = false;
            egret.Tween.get(this.playingGroup, { loop: true }).wait(1000).call(function () {
                _this["point" + point_1].visible = true;
                point_1++;
            }, this).wait(1000).call(function () {
                _this["point" + point_1].visible = true;
                point_1++;
            }, this).wait(1000).call(function () {
                _this["point" + point_1].visible = true;
                point_1++;
            }, this).wait(1000).call(function () {
                point_1 = 1;
                _this.point1.visible = _this.point2.visible = _this.point3.visible = false;
            }, this);
        }
        else {
            this.playingGroup.visible = false;
        }
    };
    BaseClubReadyScene.prototype.showRoomInfo = function () {
        this.tableIdLabel.text = TextUtils.instance.getCurrentTextById(54) + ":" + this.proxy.roomInfo.tableId;
        this.diFen.text = TextUtils.instance.getCurrentTextById(29) + ":" + this.proxy.roomInfo.betBase;
        var roomInfo = this.proxy.roomInfo;
        var mineData = this.proxy.getMineGameData();
        //有我的数据
        if (mineData) {
            if (mineData.status == TABLE_PLAYER_STATUS.READY) {
                this.isSiteDown = true;
                this.zuoxiaBtn.visible = false;
            }
            else {
                this.isSiteDown = false;
                this.zuoxiaBtn.visible = true;
                // this.zuoxiaBtn.labelDisplay.text = "准备";
            }
        }
        else {
            this.isSiteDown = false;
            this.zuoxiaBtn.visible = true;
        }
        var state = this.proxy.roomInfo.state;
        this.showPlayingAni(state == 3);
        if (state == 3) {
            this.zuoxiaBtn.visible = false;
            this.hideAllReady();
        }
    };
    BaseClubReadyScene.prototype.initProxyByGameName = function () {
        switch (this.gameName) {
            case "blnn":
            case "zjh":
            case "bdz":
                this['proxy'] = Global.roomProxy;
                break;
            case "gdmj":
                this['proxy'] = Global.gameProxy;
                break;
            default:
                this['proxy'] = Global.gameProxy;
                break;
        }
    };
    BaseClubReadyScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.zuoxiaBtn:
                this.zuoxiaBtnTouch();
                return;
            case this.backBtn:
                this.backBtnTouch();
                return;
            case this.xlbtn1:
                return this.showButtonGroup(false);
            case this.xlbtn:
                return this.showButtonGroup(true);
            case this.recordBtn:
                this.recordBtnTouch();
                return;
            case this.helpBtn:
                this.helpBtnTouch();
                return;
            case this.settingBtn:
                this.settingBtnTouch();
                return;
            case this.yaoqingBtn:
                this.invitePlayer();
                break;
            case this["touchGroup"]:
                this.closeInvite();
                break;
        }
        _super.prototype.onTouchTap.call(this, e);
    };
    BaseClubReadyScene.prototype.recordBtnTouch = function () {
        CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.gameName]);
    };
    BaseClubReadyScene.prototype.helpBtnTouch = function () {
        CF.sN(this.HELP_NOTIFY, { type: this.gameName });
    };
    BaseClubReadyScene.prototype.settingBtnTouch = function () {
        CF.sN(this.SETTING_NOTIFY);
    };
    BaseClubReadyScene.prototype.showButtonGroup = function (show) {
        egret.Tween.removeTweens(this.buttonGroup);
        if (show) {
            this.xlbtn.visible = false;
            this.xlbtn1.visible = true;
            egret.Tween.get(this.buttonGroup).to({
                top: this.buttonGroupTop
            }, 100, egret.Ease.sineIn);
        }
        else {
            this.xlbtn1.visible = false;
            this.xlbtn.visible = true;
            egret.Tween.get(this.buttonGroup).to({
                top: -this.buttonGroup.height
            }, 100, egret.Ease.sineIn);
        }
    };
    BaseClubReadyScene.prototype.zuoxiaBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_clubHandler_c_clubPlayerSitdown;
                        data = {};
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            //smrat 游戏底分改变返回大厅 // CLUB_TABLE_SCORE_DESTORY: -576,  //金币不足返回大厅
                            if (resp.error.code == -576 || resp.error.code == ErrorCode.GOLD_TOO_LOW || resp.error.code == ErrorCode.GAME_CLOSEDE) {
                                this.hide();
                                ClubManager.instance.clearOpenGameClubDatas();
                                ClubInnerHallScene.instance.show();
                                Toast.launch(resp.error.msg, 1);
                                return [2 /*return*/];
                            }
                            Toast.launch(resp.error.msg, 1000);
                            return [2 /*return*/];
                            // ClubInnerHallScene.instance.show();
                            // Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
                        }
                        if (this.welComeMp3) {
                            SoundManager.getInstance().playEffect(this.welComeMp3);
                        }
                        this.zuoxiaBtn.visible = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseClubReadyScene.prototype.hideUI = function () {
        this.hidePlayerHeader();
        this.zuoxiaBtn.visible = false;
        if (this.buttonGroup) {
            this.buttonGroupTop = this.buttonGroup.top;
            this.buttonGroup.top = -this.buttonGroup.height;
        }
    };
    BaseClubReadyScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
        CF.aE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
        CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        CF.aE(ENo.CLUB_INVITE_PLAYER, this.invite, this);
        //smart
        CF.aE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
        CF.aE(ENo.CLOSE_ALL, this.hide, this);
        //牌桌销毁 smart
        CF.aE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
        //游戏关闭 smart
        CF.aE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
    };
    BaseClubReadyScene.prototype.s_pushClubOpenGameChange = function (e) {
        //判断是否当前房间关闭
        var data = e.data;
        var openGameId = data["openGameId"];
        if (_.contains(openGameId, Global.gameProxy.lastGameConfig["gameId"]))
            return;
        this.hide();
        ClubManager.instance.clearOpenGameClubDatas();
        ClubInnerHallScene.instance.show();
        Global.alertMediator.addAlert("游戏关闭", null, null, true);
    };
    BaseClubReadyScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_clubPlayerSitdown, this.s_clubPlayerSitdown, this);
        CF.rE(ServerNotify.s_clubTablePlayerLeave, this.s_clubTablePlayerLeave, this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
        CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        CF.rE(ENo.CLUB_INVITE_PLAYER, this.invite, this);
        CF.rE(ENo.CLOSE_ALL, this.hide, this);
        //smart
        CF.rE(ServerNotify.s_pushDestoryClub, this.dstoryClub, this);
        //牌桌销毁 smart
        CF.rE(ServerNotify.s_pushDestoryTables, this.s_pushDestoryTables, this);
        //游戏关闭 smart
        CF.rE(ServerNotify.s_pushClubOpenGameChange, this.s_pushClubOpenGameChange, this);
    };
    /**服务器销毁新桌子*/
    BaseClubReadyScene.prototype.s_pushDestoryTables = function (e) {
        var data = e.data;
        var tableIds = data["tableIds"];
        ClubManager.instance.clearTableData(tableIds);
        //刷新列表
        ClubInnerHallScene.instance.showCurrentGameList();
        for (var i = 0; i < tableIds.length; ++i) {
            var tableID = tableIds[i];
            if (tableID == this.proxy.roomInfo["tableId"]) {
                this.hide();
                ClubInnerHallScene.instance.show();
                Toast.launch(TextUtils.instance.getCurrentTextById(24), 1);
            }
        }
    };
    BaseClubReadyScene.prototype.dstoryClub = function (e) {
        this.hide();
        Toast.launch(TextUtils.instance.getCurrentTextById(56), 1);
        CF.sN(SceneNotify.OPEN_CLUB_HALL);
    };
    BaseClubReadyScene.prototype.s_pushTableStateInfo = function (e) {
        var data = e.data;
        if (data.tableId == this.proxy.roomInfo.tableId) {
            this.proxy.roomInfo.state = data.status;
            if (!this.isSiteDown) {
                this.showPlayingAni(data.status == 3);
                if (data.status == 3) {
                    this.zuoxiaBtn.visible = false;
                    this.hideAllReady();
                }
            }
            if (data.status == 1) {
                this.zuoxiaBtn.visible = true;
                this.hideAllReady();
                for (var key in this.proxy.roomInfo.players) {
                    this.proxy.roomInfo.players[key].status = TABLE_PLAYER_STATUS.NONE;
                }
            }
        }
    };
    BaseClubReadyScene.prototype.s_tablePlayerStateInfo = function (e) {
        var data = e.data;
        var seatId = data.seatId;
        var playerData = this.proxy.roomInfo.players[seatId];
        playerData.status = data.status;
        var uiIndex = this.directions[seatId];
        if (playerData.status == TABLE_PLAYER_STATUS.READY) {
            this["ready" + uiIndex].visible = true;
        }
        else {
            this["ready" + uiIndex].visible = false;
        }
    };
    BaseClubReadyScene.prototype.hideAllReady = function () {
        for (var i = 1; i <= 6; i++) {
            if (this["ready" + i]) {
                this["ready" + i].visible = false;
            }
        }
    };
    /**
     * 坐下
     * @param  {egret.Event} e
     */
    BaseClubReadyScene.prototype.s_clubPlayerSitdown = function (e) {
        var data = e.data;
        if (this.proxy.roomInfo.tableId != data.tableId) {
            return;
        }
        var players = this.proxy.roomInfo.players;
        var playerInfo = data.playerInfo;
        players[playerInfo.seatId] = playerInfo;
        playerInfo.status = TABLE_PLAYER_STATUS.READY;
        ClubInvitePanel.instance.initMember();
        if (Global.playerProxy.playerData.id == playerInfo.uid) {
            this.proxy.playerInfo.playerIndex = playerInfo.seatId;
            this.isSiteDown = true;
            this.changePosition();
            var clubData = ClubManager.instance.getTableData(this.proxy.roomInfo.tableId);
            if (e.data.remainPlayerSize > 0) {
                if (this.yaoqingImag)
                    this.yaoqingImag.visible = true;
                if (this.yaoqingBtn)
                    this.yaoqingBtn.visible = true;
            }
        }
        else {
            this.showPlayerHeader(playerInfo.seatId, playerInfo);
        }
        if (e.data.remainPlayerSize <= 0) {
            if (this.yaoqingImag)
                this.yaoqingImag.visible = false;
            if (this.yaoqingBtn)
                this.yaoqingBtn.visible = false;
            if (ClubInvitePanel._instance) {
                ClubInvitePanel.instance.hide();
            }
        }
        if (this.joinMp3) {
            SoundManager.getInstance().playEffect(this.joinMp3);
        }
    };
    BaseClubReadyScene.prototype.showPlayers = function () {
        var roomInfo = this.proxy.roomInfo;
        for (var key in roomInfo.players) {
            var playerData = roomInfo.players[key];
            this.showPlayerHeader(key, playerData);
        }
    };
    /**
     * 更换座位
     */
    BaseClubReadyScene.prototype.changePosition = function () {
        this.hideUI();
        this.changeDirections();
        this.showPlayers();
    };
    BaseClubReadyScene.prototype.showPlayerHeader = function (index, playerData) {
        var uiIndex = this.directions[index];
        var roomStatus = this.proxy.roomInfo.state;
        if (this["header" + uiIndex]) {
            this["header" + uiIndex].initWithPlayer(playerData);
            this["header" + uiIndex].visible = true;
        }
        if (this["player" + uiIndex]) {
            this["player" + uiIndex].visible = true;
        }
        if (this["ready" + uiIndex] && roomStatus != 3) {
            this["ready" + uiIndex].visible = playerData.status == TABLE_PLAYER_STATUS.READY;
        }
    };
    /**
     * 起立或者离开
     * @param  {egret.Event} e
     */
    BaseClubReadyScene.prototype.s_clubTablePlayerLeave = function (e) {
        var data = e.data;
        if (!data)
            return;
        if (this.proxy.roomInfo.tableId != data.tableId) {
            return;
        }
        if (e.data.remainPlayerSize > 0 && this.isSiteDown) {
            if (this.yaoqingImag)
                this.yaoqingImag.visible = true;
            if (this.yaoqingBtn)
                this.yaoqingBtn.visible = true;
        }
        var playerInfo = data.playerInfo;
        var playerIndex = playerInfo.seatId;
        var uiIndex = this.directions[playerIndex];
        if (this["player" + uiIndex])
            this["player" + uiIndex].visible = false;
        if (this["header" + uiIndex])
            this["header" + uiIndex].visible = false;
        if (this["ready" + uiIndex])
            this["ready" + uiIndex].visible = false;
        if (this.proxy.roomInfo) {
            delete this.proxy.roomInfo.players[playerIndex];
        }
        if (playerInfo == this.proxy.getMineIndex()) {
            if (this.leaveMp3) {
                SoundManager.getInstance().playEffect(this.leaveMp3);
            }
        }
        else {
            if (this.otherLevelMp3) {
                SoundManager.getInstance().playEffect(this.otherLevelMp3);
            }
        }
        if ((playerInfo.type == 2 || playerInfo.type == 4) && playerIndex == this.proxy.getMineIndex()) {
            Global.alertMediator.addAlert(playerInfo.reason, null, null, true);
            //显示为坐下
            this.proxy.clearRoomInfo();
            this.hide();
            ClubInnerHallScene.instance.show();
            return;
        }
        if (playerInfo.type == 3) {
            Global.alertMediator.addAlert(playerInfo.reason, null, null, true);
            //显示为坐下
            this.proxy.clearRoomInfo();
            this.hide();
            CF.sN(SceneNotify.OPEN_CLUB_HALL);
            return;
        }
    };
    /**
     * 隐藏玩家头像(不同游戏重写即可)
     */
    BaseClubReadyScene.prototype.hidePlayerHeader = function () {
        for (var i = 1; i <= 6; i++) {
            var player = this["player" + i];
            if (player) {
                player.visible = false;
            }
            var header = this["header" + i];
            if (header) {
                header.visible = false;
            }
            if (this["ready" + i]) {
                this["ready" + i].visible = false;
            }
        }
    };
    /**
     * 返回按钮
     */
    BaseClubReadyScene.prototype.backBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_clubHandler_c_leaveClubTable;
                        data = {};
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            return [2 /*return*/];
                        }
                        this.proxy.clearRoomInfo();
                        this.hide();
                        game.UIUtils.removeSelf(ClubInvitePanel._instance);
                        ClubInvitePanel._instance = null;
                        ClubInnerHallScene.instance.show();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseClubReadyScene.prototype.invitePlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, atr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.currentInvitePanel) {
                            this.currentInvitePanel.hide();
                            this.currentInvitePanel = null;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_getInvitePlayerList, {})];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp && !resp.error) {
                            atr = [];
                            for (i = 0; i < resp.length; i++) {
                                atr.push(resp[i]);
                            }
                            this.currentInvitePanel = ClubInvitePanel.instance.show(atr);
                            this.resizeGroup.addChild(this.currentInvitePanel);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseClubReadyScene.prototype.invite = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var playerId, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playerId = e.data.playerId;
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_inviteOtherPlayer, { tableId: this.proxy.roomInfo.tableId, playerUid: playerId })];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp) {
                            // ClubInvitePanel.instance.initMember();
                            Toast.launch(TextUtils.instance.getCurrentTextById(55), 1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseClubReadyScene.prototype.closeInvite = function () {
        if (this.currentInvitePanel) {
            this.currentInvitePanel.hide();
            this.currentInvitePanel = null;
        }
    };
    return BaseClubReadyScene;
}(game.BaseScene));
__reflect(BaseClubReadyScene.prototype, "BaseClubReadyScene");
