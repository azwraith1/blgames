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
var GDMJClubReadyScene = (function (_super) {
    __extends(GDMJClubReadyScene, _super);
    function GDMJClubReadyScene() {
        var _this = _super.call(this, "gdmj") || this;
        _this.GAME_NOTIFY = SceneNotify.OPEN_GDMJ;
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_GDMJ;
        _this.ready = false;
        _this.players = {};
        _this.isStart = false;
        _this.isInitHand = false;
        /**
         * 背景音乐
         */
        _this.bgMusic = "playingingame_mp3";
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
        _this.skinName = "GDMJClubReadySceneSkin";
        return _this;
    }
    Object.defineProperty(GDMJClubReadyScene, "instance", {
        get: function () {
            if (!GDMJClubReadyScene._instance) {
                GDMJClubReadyScene._instance = new GDMJClubReadyScene();
            }
            return GDMJClubReadyScene._instance;
        },
        enumerable: true,
        configurable: true
    });
    GDMJClubReadyScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.showRoomInfo();
        Global.gameProxy.lastGameConfig = {
            gameId: GAME_ID.GDMJ,
            sceneId: GAME_SCENEID.CLUB,
            diFen: this.proxy.roomInfo.betBase,
        };
    };
    GDMJClubReadyScene.prototype.show = function (ready) {
        game.UIUtils.changeResize(1);
        this.ready = ready;
        if (this.ready) {
            this.zuoxiaBtnTouch();
        }
        GameLayerManager.gameLayer().sceneLayer.addChild(this);
    };
    GDMJClubReadyScene.prototype.showRoomInfo = function () {
        _super.prototype.showRoomInfo.call(this);
        this.changeDirections();
        this.showPlayers();
    };
    GDMJClubReadyScene.prototype.changeDirections = function () {
        var mineIndex = Global.gameProxy.getMineIndex();
        if (mineIndex && mineIndex > 0) {
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
        }
        else {
            this.directions = NiuniuUtils.getDirectionByMine(1, 4);
        }
    };
    GDMJClubReadyScene.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        GDMJClubReadyScene._instance = null;
    };
    GDMJClubReadyScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_countdown, this.countdDown, this);
        CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
        CF.aE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
    };
    GDMJClubReadyScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_countdown, this.countdDown, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
        CF.rE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
    };
    /**
       * 买马
       */
    GDMJClubReadyScene.prototype.s_roomBuyMa = function (e) {
        var data = e.data;
        var roomInfo = Global.gameProxy.roomInfo;
        roomInfo.maCardNumPerSeat = data.maCardNumPerSeat;
        this.isInitHand = true;
        this.checkStart();
    };
    GDMJClubReadyScene.prototype.s_roomSetBaoCard = function (e) {
        var data = e.data;
        LogUtils.logD("===s_roomSetBaoCard==" + JSON.stringify(data));
        var baoCard = data.baoCard;
        var fanCard = data.fanCard;
        var roomInfo = Global.gameProxy.roomInfo;
        roomInfo.baoCards = [baoCard];
        roomInfo.fanCard = fanCard;
    };
    GDMJClubReadyScene.prototype.countdDown = function (e) {
        var resp = e.data;
        if (Global.gameProxy.roomInfo) {
            Global.gameProxy.roomInfo.countdown = resp;
        }
    };
    GDMJClubReadyScene.prototype.s_startNewRound = function (e) {
        var data = e.data;
        Global.gameProxy.roomInfo.dealer = data.dealer;
        this.isStart = true;
        this.checkStart();
    };
    GDMJClubReadyScene.prototype.playerEnter = function (e) {
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    };
    GDMJClubReadyScene.prototype.enterResult = function (e) {
        var data = e.data;
        if (data.code && data.code != 0) {
            Global.alertMediator.addAlert(data.msg, function () {
            }, null, true);
            return;
        }
        Global.gameProxy.setRoomInfo(e.data);
        Global.gameProxy.roomInfo.playing = true;
    };
    /**
     * 发牌
     * 收到发牌的消息跳转界面
     * @param  {egret.Event} e
     */
    GDMJClubReadyScene.prototype.initHandCards = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, roomInfo, mineData, hua, key, playerData;
            return __generator(this, function (_a) {
                data = e.data;
                roomInfo = Global.gameProxy.roomInfo;
                mineData = Global.gameProxy.getMineGameData();
                mineData.cards = e.data.cards;
                hua = data.hua;
                for (key in roomInfo.players) {
                    if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
                        playerData = roomInfo.players[key];
                        if (game.Utils.valueEqual(key, roomInfo.dealer)) {
                            playerData.cardNum = 14;
                        }
                        else {
                            playerData.cardNum = 13;
                        }
                    }
                }
                this.isInitHand = true;
                this.checkStart();
                return [2 /*return*/];
            });
        });
    };
    GDMJClubReadyScene.prototype.checkStart = function () {
        if (this.isInitHand && this.isStart) {
            this.hide();
            CF.sN(this.GAME_NOTIFY);
        }
    };
    /**
     * 开始游戏
     */
    GDMJClubReadyScene.prototype.startNewRound = function (e) {
        Global.gameProxy.roomInfo.setRoundData(e.data);
        this.isStart = true;
        this.checkStart();
    };
    /**
     * 玩家加入
     * @param  {egret.Event} e
     */
    GDMJClubReadyScene.prototype.playerjoin = function (e) {
        var resp = e.data;
        Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
    };
    GDMJClubReadyScene.prototype.reconnectSuc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ClubManager.instance.flushClubTable(function () {
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
    return GDMJClubReadyScene;
}(BaseClubReadyScene));
__reflect(GDMJClubReadyScene.prototype, "GDMJClubReadyScene");
