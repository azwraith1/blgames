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
var sangong;
(function (sangong) {
    var SangongMatchingScene = (function (_super) {
        __extends(SangongMatchingScene, _super);
        function SangongMatchingScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "sangong";
            _this.GAME_ID = "sangong";
            _this.players = {};
            _this.bgMusic = "niuniu_bgm_mp3";
            /**
             * 关闭匹配通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SANGONG_WATING;
            /**
             * 打开游戏大厅
             */
            _this.GAME_HALL_NOTIFY = SceneNotify.OPEN_SANGONG_HALL;
            /**
             * 进入游戏通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_GAME;
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU;
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.skinName = new SangongWaitSkin();
            return _this;
        }
        SangongMatchingScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    this.diFen.text = "底分：" + Global.gameProxy.lastGameConfig.diFen;
                    return [2 /*return*/];
                });
            });
        };
        SangongMatchingScene.prototype.resetPMDPosition = function () {
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 24;
            publicMsg.horizontalCenter = -10;
            publicMsg.top = 40;
        };
        SangongMatchingScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
        };
        SangongMatchingScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
        };
        /**
                             * 屏幕旋转
                             * */
        SangongMatchingScene.prototype.oritationChange = function (e) {
            var _data = e.data;
            var currentSceneName = this.CLOSE_NOTIFY.replace("CLOSE", "OPEN");
            var sceneName;
            //横屏
            if (_data == "H") {
                sceneName = currentSceneName + "_HORIZON";
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(sceneName);
            }
            else {
                sceneName = currentSceneName.replace("_HORIZON", "");
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(sceneName);
            }
        };
        SangongMatchingScene.prototype.enterResult = function (e) {
            var data = e.data;
            if (data.code && data.code != 0) {
                this.clearJoinTimeout();
                this.backHall();
                Global.alertMediator.addAlert(data.msg, function () {
                }, null, true);
                return;
            }
            Global.roomProxy.setRoomInfo(e.data);
        };
        SangongMatchingScene.prototype.playerEnter = function (e) {
            var data = e.data;
            this.players[data.playerIndex] = data.player;
            Global.roomProxy.updatePlayer(data.playerIndex, data.player);
        };
        SangongMatchingScene.prototype.startNewRound = function (e) {
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.GAME_SCENE_NOTIFY);
        };
        return SangongMatchingScene;
    }(game.BaseMatchingScene));
    sangong.SangongMatchingScene = SangongMatchingScene;
    __reflect(SangongMatchingScene.prototype, "sangong.SangongMatchingScene");
})(sangong || (sangong = {}));
