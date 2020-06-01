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
var QZNNClubReadyScene = (function (_super) {
    __extends(QZNNClubReadyScene, _super);
    function QZNNClubReadyScene() {
        var _this = _super.call(this, "blnn") || this;
        _this.GAME_NOTIFY = SceneNotify.OPEN_NIUNIUGAMES;
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIUGAMES;
        _this.ready = false;
        _this.players = {};
        /**
         * 背景音乐
         */
        _this.bgMusic = "niuniu_bgm_mp3";
        // public clubInvite(e: egret.Event) {
        // 	let invitedPanel = new ClubInvitedPanel();
        // 	//smart 给游戏大厅数复制
        // 	ClubManager.instance.currentClub = e.data;
        // 	invitedPanel.initData(e);
        // 	// invitedPanel.currentState = "shu";
        // 	// invitedPanel.validateNow();
        // 	GameLayerManager.gameLayer().maskLayer.addChild(this);
        // 	invitedPanel.horizontalCenter = invitedPanel.verticalCenter = 0;
        // }
        /**
         * 帮助界面的通知
         */
        _this.HELP_NOTIFY = PanelNotify.OPEN_ZJHHELP;
        /**
         * 记录界面的通知
         */
        _this.RECORD_NOTIFY = PanelNotify.OPEN_ZJHRECORD;
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = PanelNotify.OPEN_ZJHSET;
        _this.skinName = new BLNNClubReadySceneSkin();
        return _this;
    }
    Object.defineProperty(QZNNClubReadyScene, "instance", {
        get: function () {
            if (!QZNNClubReadyScene._instance) {
                QZNNClubReadyScene._instance = new QZNNClubReadyScene();
            }
            return QZNNClubReadyScene._instance;
        },
        enumerable: true,
        configurable: true
    });
    QZNNClubReadyScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showRoomInfo();
        Global.gameProxy.lastGameConfig = {
            gameId: GAME_ID.BLNN,
            sceneId: GAME_SCENEID.CLUB,
            diFen: this.proxy.roomInfo.betBase,
        };
        this.diFen.text = this.proxy.roomInfo.betBase;
    };
    QZNNClubReadyScene.prototype.show = function (ready) {
        game.UIUtils.changeResize(2);
        this.ready = ready;
        if (this.ready) {
            this.zuoxiaBtnTouch();
        }
        GameLayerManager.gameLayer().sceneLayer.addChild(this);
    };
    QZNNClubReadyScene.prototype.showRoomInfo = function () {
        _super.prototype.showRoomInfo.call(this);
        this.changeDirections();
        this.showPlayers();
    };
    QZNNClubReadyScene.prototype.changeDirections = function () {
        var mineIndex = Global.roomProxy.getMineIndex();
        if (mineIndex && mineIndex > 0) {
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
        }
        else {
            this.directions = NiuniuUtils.getDirectionByMine(1, 4);
        }
    };
    QZNNClubReadyScene.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        QZNNClubReadyScene._instance = null;
    };
    QZNNClubReadyScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
    };
    QZNNClubReadyScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
    };
    QZNNClubReadyScene.prototype.s_tablePlayerStateInfo = function (e) {
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
    QZNNClubReadyScene.prototype.s_playerEnter = function (e) {
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.roomProxy.updatePlayer(data.playerIndex, data.player);
    };
    QZNNClubReadyScene.prototype.enterResult = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = e.data;
                Global.roomProxy.clearRoomInfo();
                if (data.code && data.code != 0) {
                    Global.alertMediator.addAlert(data.msg, function () {
                    }, null, true);
                    return [2 /*return*/];
                }
                Global.roomProxy.setRoomInfo(e.data);
                Global.roomProxy.roomInfo.dealer = e.data.dealerIndex;
                return [2 /*return*/];
            });
        });
    };
    QZNNClubReadyScene.prototype.s_startNewRound = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.hide();
                CF.sN(this.GAME_NOTIFY);
                return [2 /*return*/];
            });
        });
    };
    QZNNClubReadyScene.prototype.reconnectSuc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        game.UIUtils.changeResize(2);
                        return [4 /*yield*/, ClubManager.instance.flushClubTable(function () {
                                _this.hide();
                            }, function () {
                                _this.hide();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return QZNNClubReadyScene;
}(BaseClubReadyScene));
__reflect(QZNNClubReadyScene.prototype, "QZNNClubReadyScene");
