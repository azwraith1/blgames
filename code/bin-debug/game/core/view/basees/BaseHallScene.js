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
 * @Date: 2019-05-20 19:15:54
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-27 18:57:12
 * @Description: 游戏选场大厅基础类
 */
var game;
(function (game) {
    var BaseHallScene = (function (_super) {
        __extends(BaseHallScene, _super);
        function BaseHallScene() {
            var _this = _super.call(this) || this;
            /**
             * 进入房间
             */
            _this.lockEnter = false;
            return _this;
        }
        BaseHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //控制返回按钮
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.backBtn.visible = false;
            }
            if (ServerConfig.RECHARGE_URL && ServerConfig.RECHARGE_URL != "null") {
                if (this.addGoldBtn) {
                    this.addGoldBtn.visible = true;
                }
                //  else {
                // 	this.addGoldBtn.visible = false;
                // }
            }
            this.renderPlayerInfo();
            this.checkReconnect();
            this.showHallBars();
            //热门游戏 hotBar
            this.showHotBar();
            if (this.contentGroup) {
                this.contentGroup.alpha = 0;
                egret.Tween.get(this.contentGroup).to({
                    alpha: 1
                }, 500, egret.Ease.circIn);
            }
            if (this.topGroup) {
                this.topGroup.top = -this.topGroup.height;
                egret.Tween.get(this.topGroup).to({
                    top: 0
                }, 300, egret.Ease.bounceIn);
            }
        };
        //热门游戏
        BaseHallScene.prototype.showHotBar = function () {
            var hotBar = GameLayerManager.gameLayer().hotBar;
            hotBar.left = 0;
            this.resizeGroup.addChild(hotBar);
            hotBar.init();
            if (GameConfig.CURRENT_ISSHU) {
                hotBar.verticalCenter = 460;
            }
            else {
                hotBar.verticalCenter = -200;
            }
        };
        /**
         * 玩家信息
         */
        BaseHallScene.prototype.renderPlayerInfo = function () {
            var playerInfo = Global.playerProxy.playerData;
            this.nameLabel.text = playerInfo.nickname;
            var headerImage = this.headerFront + "_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
            this.headerImage.source = headerImage;
            this.updateGold();
        };
        /**
         * 重连检测
         */
        BaseHallScene.prototype.checkReconnect = function () {
            var _this = this;
            var roomState = Global.gameProxy.roomState;
            if (roomState && roomState.state == 1) {
                if (GameConfig.CURRENT_ISSHU) {
                    RotationLoadingShu.instance.load(this.loadGroups, "", function () {
                        _this.enterScene({ data: roomState });
                    });
                }
                else {
                    RotationLoading.instance.load(this.loadGroups, "", function () {
                        _this.enterScene({ data: roomState });
                    });
                }
            }
        };
        BaseHallScene.prototype.enterScene = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.lockEnter = true;
                    return [2 /*return*/];
                });
            });
        };
        ;
        /**
         * 进入房间回调
         */
        BaseHallScene.prototype.enterSceneCall = function (resp, data) {
            var _this = this;
            this.lockEnter = false;
            if (!resp) {
                return false;
            }
            if (resp && resp.error && resp.error.code) {
                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                return false;
            }
            Global.gameProxy.lastGameConfig = data;
            Global.gameProxy.lastGameConfig.gameId = data.gameId;
            if (resp.reconnect) {
                HallForwardFac.redirectScene(resp, data, function () {
                    CF.sN(_this.CLOSE_NOTIFY);
                });
            }
            else {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(this.MATCHING_NOTIFY, data);
            }
            return true;
        };
        BaseHallScene.prototype.onTouchTap = function (event) {
            event.stopPropagation();
            switch (event.target) {
                case this.backBtn://
                    this.backBtnTouch();
                    break;
                case this.recordBtn:
                    this.recordBtnTouch();
                    break;
                case this.helpBtn:
                    this.helpBtnTouch();
                    break;
                case this.settingBtn:
                    this.settingBtnTouch();
                    break;
                case this.addGoldBtn:
                    this.addGoldBtnTouch();
                    break;
            }
        };
        BaseHallScene.prototype.addGoldBtnTouch = function () {
            FrameUtils.goRecharge();
        };
        /**
         * 返回按钮
         */
        BaseHallScene.prototype.backBtnTouch = function () {
            var _this = this;
            if (ServerConfig.OP_RETURN_TYPE == "2") {
                FrameUtils.goHome();
                return;
            }
            if (GameConfig.CURRENT_ISSHU) {
                RotationLoadingShu.instance.load(["main"], "", function () {
                    CF.sN(_this.CLOSE_NOTIFY);
                    CF.sN(SceneNotify.OPEN_MAIN_HALL);
                }, 100);
            }
            else {
                RotationLoading.instance.load(["main"], "", function () {
                    CF.sN(_this.CLOSE_NOTIFY);
                    CF.sN(SceneNotify.OPEN_MAIN_HALL);
                }, 100);
            }
        };
        /**
         * 记录按钮
         */
        BaseHallScene.prototype.recordBtnTouch = function () {
            CF.sN(this.RECORD_NOTIFY, Global.gameProxy.gameIds[this.hallId]);
        };
        /**
         * 帮助按钮
         */
        BaseHallScene.prototype.helpBtnTouch = function () {
            CF.sN(this.HELP_NOTIFY, { type: this.hallId });
        };
        BaseHallScene.prototype.settingBtnTouch = function () {
            CF.sN(this.SETTING_NOTIFY, { setIndex: this.hallId });
        };
        BaseHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.GO_OTHERHALL_SCENE, this.goOtherHall, this);
            CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            if (this.headerImage) {
                this.headerImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headerImageTouch, this);
            }
        };
        BaseHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.GO_OTHERHALL_SCENE, this.goOtherHall, this);
            CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            if (this.headerImage) {
                this.headerImage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.headerImageTouch, this);
            }
        };
        BaseHallScene.prototype.changHeader = function (e) {
            var data = e.data;
            this.headerImage.source = this.headerFront + "_" + data.sex + "_" + data.figureUrl + "_png";
            Global.playerProxy.playerData.figure_url = data.figureUrl;
            Global.playerProxy.playerData.sex = data.sex;
        };
        /**
         * 换头像
         */
        BaseHallScene.prototype.headerImageTouch = function () {
            CF.sN(PanelNotify.OPEN_HEADER);
        };
        /**
         *
         * 去其他热门
         */
        BaseHallScene.prototype.goOtherHall = function (evt) {
            var _this = this;
            var gameId = evt.data.gameId;
            if (gameId == this.pmdKey) {
                return;
            }
            var sourceName = gameId + "_hall";
            switch (gameId) {
                case "mjxzdd":
                    sourceName = "xzdd_hall";
                    break;
                case "mjxlch":
                case "scmj":
                    sourceName = "majiang_hall";
                    break;
                case "blnn":
                    sourceName = "niuniu_hall";
                    break;
                case "zjh":
                    sourceName = "zhajinhua_hall";
                    break;
                case "baccarat":
                    sourceName = "bjl_hall";
                    break;
            }
            var resource = [sourceName];
            if (gameId.indexOf("mj") > -1) {
                resource.push("majiang_common");
            }
            FrameUtils.changeBgImage("");
            if (GameConfig.CURRENT_ISSHU) {
                RotationLoadingShu.instance.load(resource, "", function () {
                    CF.sN("OPEN_" + gameId.toLocaleUpperCase() + "_HALL");
                    CF.sN(_this.CLOSE_NOTIFY);
                });
            }
            else {
                RotationLoading.instance.load(resource, "", function () {
                    CF.sN("OPEN_" + gameId.toLocaleUpperCase() + "_HALL");
                    CF.sN(_this.CLOSE_NOTIFY);
                });
            }
        };
        return BaseHallScene;
    }(game.BaseScene));
    game.BaseHallScene = BaseHallScene;
    __reflect(BaseHallScene.prototype, "game.BaseHallScene");
})(game || (game = {}));
