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
var niuniu;
(function (niuniu) {
    var NiuniuMatchingScene = (function (_super) {
        __extends(NiuniuMatchingScene, _super);
        function NiuniuMatchingScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "blnn";
            _this.GAME_ID = "blnn";
            _this.players = {};
            _this.bgMusic = "niuniu_bgm_mp3";
            /**
            /**
             * 关闭匹配通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIU_MATCHING;
            /**
             * 打开游戏大厅
             */
            _this.GAME_HALL_NOTIFY = SceneNotify.OPEN_NIUNIUSELECT;
            /**
             * 进入游戏通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUGAMES;
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
            _this.autoBtnSelecIcon = "niuniu_guaji_select_png";
            _this.autoBtnUnSelecIcon = "niuniu_gj_unselect_png";
            _this.skinName = new NiuniuMatchingSceneSkin();
            return _this;
        }
        /**挂机tips弹窗 */
        NiuniuMatchingScene.prototype.showGuaJiTips = function (text) {
            this.tisiGroup0.visible = true;
            this.tisiGroup0.alpha = 1;
            this.tisiLable0.text = text;
            egret.Tween.get(this.tisiGroup0).to({ alpha: 0 }, 2000);
        };
        NiuniuMatchingScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    this.diFen.text = Global.gameProxy.lastGameConfig.diFen;
                    LogUtils.logD("===========最后的配置===========" + JSON.stringify(Global.gameProxy.lastGameConfig));
                    if (NiuniuGuaJiConfig.Instance.autoStatus) {
                        this.autoBtn.source = this.autoBtnSelecIcon;
                    }
                    else {
                        this.autoBtn.source = this.autoBtnUnSelecIcon;
                    }
                    return [2 /*return*/];
                });
            });
        };
        NiuniuMatchingScene.prototype.resetPMDPosition = function () {
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 24;
            publicMsg.horizontalCenter = 10;
            publicMsg.top = 50;
        };
        NiuniuMatchingScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
        };
        NiuniuMatchingScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
        };
        /**重置挂机按钮得状态 */
        NiuniuMatchingScene.prototype.setAutoBtnState = function (e) {
            var isAuto = e.data;
            NiuniuGuaJiConfig.Instance.setAutoStatus(isAuto);
            if (isAuto) {
                this.autoBtn.source = this.autoBtnSelecIcon;
            }
            else {
                this.autoBtn.source = this.autoBtnUnSelecIcon;
            }
            this.autoBar.resetState();
            if (!isAuto) {
                this.autoBar.visible = false;
                this.rectMask.visible = false;
            }
        };
        NiuniuMatchingScene.prototype.enterResult = function (e) {
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
        NiuniuMatchingScene.prototype.playerEnter = function (e) {
            var data = e.data;
            this.players[data.playerIndex] = data.player;
            Global.roomProxy.updatePlayer(data.playerIndex, data.player);
        };
        NiuniuMatchingScene.prototype.startNewRound = function (e) {
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.GAME_SCENE_NOTIFY);
        };
        // public onTouchTap(event: egret.TouchEvent) {
        // 	super.onTouchTap(event);
        // 	switch (event.target) {
        // 		case this.recordBtn:
        // 			this.showBtnsType(1);
        // 			CF.sN(PanelNotify.OPEN_NIUGAMERECORD, "blnn");
        // 			break;
        // 		case this.helpBtn:
        // 			this.showBtnsType(1);
        // 			CF.sN(PanelNotify.OPEN_HELP_SHU, { type: "blnn" });
        // 			break;
        // 		case this.settingBtn:
        // 			this.showBtnsType(1);
        // 			CF.sN(PanelNotify.OPEN_SETTING, {});
        // 			break;
        // 		case this.xlbtn:
        // 			this.showBtnsType(2);
        // 			break;
        // 		case this.xlbtn1:
        // 			this.showBtnsType(1);
        // 			break;
        // 	}
        // }
        NiuniuMatchingScene.prototype.onTouchTap = function (e) {
            _super.prototype.onTouchTap.call(this, e);
            //挂机功能 点击弹窗外其他区域关闭窗口
            if (e.target == this.rectMask) {
                LogUtils.logD("===当前点击得目标===" + e.target);
                if (this.autoBar && this.autoBar.visible)
                    CF.dP(ENo.NIUNIU_GUAJI, false);
            }
            switch (e.target) {
                //点击autoBtn
                case this.autoBtn:
                    if (this.autoBtn.source == this.autoBtnSelecIcon) {
                        CF.dP(ENo.NIUNIU_GUAJI, false);
                        this.showGuaJiTips("停止挂机");
                        //Global.alertMediator.addAlert("停止挂机", null, null, true);
                        this.autoBtn.source = this.autoBtnUnSelecIcon;
                    }
                    else {
                        this.rectMask.visible = true;
                        this.autoBar.visible = true;
                        this.autoBar.resetState();
                    }
                    break;
            }
        };
        return NiuniuMatchingScene;
    }(game.BaseMatchingScene));
    niuniu.NiuniuMatchingScene = NiuniuMatchingScene;
    __reflect(NiuniuMatchingScene.prototype, "niuniu.NiuniuMatchingScene");
})(niuniu || (niuniu = {}));
