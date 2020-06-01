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
/**
 * 基础的奖金池类场景
 */
var BaseJackeyGameScene = (function (_super) {
    __extends(BaseJackeyGameScene, _super);
    function BaseJackeyGameScene(gameName) {
        if (gameName === void 0) { gameName = "default"; }
        var _this = _super.call(this) || this;
        _this.gameName = gameName;
        return _this;
    }
    BaseJackeyGameScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initProxyByGameName();
        this.hideUI();
        this.renderSeats();
        this.showPlayingAni(true);
    };
    BaseJackeyGameScene.prototype.initProxyByGameName = function () {
        switch (this.gameName) {
            case "blnn":
            case "zjh":
            case "bdz":
            case "gdmj":
                this['proxy'] = Global.roomProxy;
                break;
            default:
                this['proxy'] = Global.gameProxy;
                break;
        }
    };
    BaseJackeyGameScene.prototype.hideUI = function () {
        this.hidePlayerHeader();
    };
    BaseJackeyGameScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.backBtn:
                this.backBtnTouch();
                return;
        }
        _super.prototype.onTouchTap.call(this, e);
    };
    BaseJackeyGameScene.prototype.showPlayers = function (players) {
        for (var key in players) {
            var playerData = players[key];
            this.showPlayerHeader(key, playerData);
        }
    };
    BaseJackeyGameScene.prototype.showPlayerHeader = function (index, playerData) {
        var uiIndex = this.directions[index];
        if (this["header" + uiIndex]) {
            this["header" + uiIndex].initWithPlayer(playerData);
            this["header" + uiIndex].visible = true;
        }
        if (this["player" + uiIndex]) {
            this["player" + uiIndex].visible = true;
        }
    };
    /**
     * 隐藏玩家头像(不同游戏重写即可)
     */
    BaseJackeyGameScene.prototype.hidePlayerHeader = function () {
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
    BaseJackeyGameScene.prototype.backBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_luckyHandler_c_quitLuckyGame;
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
                        game.AppFacade.instance.sendNotification(SceneNotify.OPEN_MATCH_HALL);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseJackeyGameScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.aE(ServerNotify.s_pushLuckyTablePlayerInfo, this.syncTablePlayer, this);
    };
    BaseJackeyGameScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.rE(ServerNotify.s_pushLuckyTablePlayerInfo, this.syncTablePlayer, this);
    };
    BaseJackeyGameScene.prototype.syncTablePlayer = function (e) {
        var data = e.data;
        var playerArr = data.tablePlayerInfos;
        MatchManager.instance.tablePlayers = playerArr;
        this.renderSeats();
    };
    BaseJackeyGameScene.prototype.renderSeats = function () {
        this.hidePlayerHeader();
        var playerArr = MatchManager.instance.tablePlayers;
        var playerJson = {};
        for (var i = 0; i < playerArr.length; i++) {
            var playerData = playerArr[i];
            playerData.gold = 0;
            playerJson[playerData.seatId] = playerData;
            if (Global.playerProxy.checkIsMe(playerData.uid)) {
                this.mineIndex = playerData.seatId;
            }
        }
        this.changeDirections();
        this.showPlayers(playerJson);
    };
    BaseJackeyGameScene.prototype.showPlayingAni = function (show) {
        var _this = this;
        egret.Tween.removeTweens(this.tipsGroup);
        if (show) {
            var point_1 = 1;
            this.point1.visible = this.point2.visible = this.point3.visible = false;
            egret.Tween.get(this.tipsGroup, { loop: true }).wait(1000).call(function () {
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
    };
    return BaseJackeyGameScene;
}(game.BaseScene));
__reflect(BaseJackeyGameScene.prototype, "BaseJackeyGameScene");
