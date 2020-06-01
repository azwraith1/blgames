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
var BDZMatchingScene = (function (_super) {
    __extends(BDZMatchingScene, _super);
    function BDZMatchingScene() {
        var _this = _super.call(this) || this;
        _this.scenceId = 0;
        _this.players = {};
        _this.pmdKey = "bdz";
        _this.GAME_ID = "bdz";
        // private helpBtn: eui.Button;
        // private jiluBtn: eui.Button;
        // private setBtn: eui.Button;
        /**
       * 关闭匹配通知
       */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BDZ_MATCHING;
        /**
         * 打开游戏大厅
         */
        _this.GAME_HALL_NOTIFY = SceneNotify.OPEN_BDZ_HALL;
        /**
         * 进入游戏通知
         */
        _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_BDZ;
        _this.skinName = new BDZMatchingSceneSkin();
        RES.loadGroup("bdz_back");
        return _this;
        // game.AudioManager.getInstance().playBackgroundMusic("zjh_bgm_mp3");
    }
    BDZMatchingScene.prototype.createChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            var publicMsg;
            return __generator(this, function (_a) {
                _super.prototype.createChildren.call(this);
                egret.Tween.get(this.rotationImage, { loop: true }).to({
                    rotation: 360
                }, 3000);
                publicMsg = PMDComponent.instance;
                publicMsg.anchorOffsetY = 24;
                publicMsg.horizontalCenter = 10;
                publicMsg.top = 50;
                return [2 /*return*/];
            });
        });
    };
    BDZMatchingScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ENo.s_initHandCards, this.s_initHandCards, this);
    };
    BDZMatchingScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ENo.s_initHandCards, this.s_initHandCards, this);
    };
    BDZMatchingScene.prototype.s_initHandCards = function (e) {
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        for (var key in roomInfo.players) {
            var player = roomInfo.players[key];
            player.handCardsNum = 4;
            if (Number(key) == data.playerIndex) {
                player.handCards = data.handCards;
                player.tipCards = data.tipCards || [];
                player.roundPattern = data.roundPattern;
            }
        }
        CF.sN(SceneNotify.CLOSE_BDZ_MATCHING);
        CF.sN(SceneNotify.OPEN_BDZ, this.scenceId);
    };
    BDZMatchingScene.prototype.enterResult = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = e.data;
                Global.roomProxy.clearRoomInfo();
                if (data.code && data.code != 0) {
                    this.clearJoinTimeout();
                    this.backHall();
                    Global.alertMediator.addAlert(data.msg, function () {
                    }, null, true);
                    return [2 /*return*/];
                }
                Global.roomProxy.setRoomInfo(e.data);
                return [2 /*return*/];
            });
        });
    };
    BDZMatchingScene.prototype.playerEnter = function (e) {
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.roomProxy.updatePlayer(data.playerIndex, data.player);
    };
    BDZMatchingScene.prototype.startNewRound = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //await Global.gameProxy.req2updateRoom();
                Global.roomProxy.roomInfo.dealer = e.data.dealer;
                return [2 /*return*/];
            });
        });
    };
    return BDZMatchingScene;
}(game.BaseMatchingScene));
__reflect(BDZMatchingScene.prototype, "BDZMatchingScene");
