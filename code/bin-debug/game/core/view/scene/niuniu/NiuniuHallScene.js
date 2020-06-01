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
 * @Date: 2019-05-21 10:04:33
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-17 09:27:34
 * @Description: 牛牛大厅界面
 */
var niuniu;
(function (niuniu) {
    var NiuniuHallScene = (function (_super) {
        __extends(NiuniuHallScene, _super);
        function NiuniuHallScene() {
            var _this = _super.call(this) || this;
            _this.hallId = "blnn";
            _this.pmdKey = "blnn";
            /**
             * 头像前缀
             */
            _this.headerFront = "nns";
            /**
             * 背景音乐
             */
            _this.bgMusic = "niuniu_bgm_mp3";
            /**
             * 关闭当前界面的通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIUSELECT;
            /**
             * 进入正确匹配的通知
             */
            _this.MATCHING_NOTIFY = SceneNotify.OPEN_NIUNIU_MATCHING;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU;
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD;
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = null;
            /**
             * 需要加载的资源组
             */
            _this.loadGroups = ['niuniu_game'];
            _this.skinName = new NiuniuHallSceneSkin();
            return _this;
        }
        ;
        NiuniuHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            FrameUtils.changeBgImage("./resource/gameAssets/niuniu_hall/nns_hall_bg.jpg");
            this.jsBtn.value = "1";
            this.ptBtn.value = "0";
            this.showHallBarMove();
            this.resetPMDPosition();
            this.centerGroupPos = new egret.Point(this.centerGroup.x, this.centerGroup.y);
            if (Global.gameProxy.lastGameConfig) {
                var playway = Global.gameProxy.lastGameConfig.playway;
                LogUtils.logD("============playway==========" + playway);
                if (playway) {
                    if (playway == 0) {
                        this.ptBtn.selected == true;
                    }
                    else {
                        this.jsBtn.selected = true;
                    }
                }
                else {
                    this.ptBtn.selected = true;
                }
            }
            else {
                this.ptBtn.selected = true;
            }
        };
        /**
         * 修正跑马灯位子
         */
        NiuniuHallScene.prototype.resetPMDPosition = function () {
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 24;
            publicMsg.horizontalCenter = -10;
            publicMsg.top = 120;
        };
        NiuniuHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            // window["onorientationchange"] = function () {
            // 	var or = window["orientation"];
            // 	if (or == 90 || or == -90) {
            // 		CF.dP(ENo.STAGE_ORITATIONCHANGE, "landscape");
            // 		//alert("横屏");
            // 	}
            // 	else {
            // 		CF.dP(ENo.STAGE_ORITATIONCHANGE, "vertical");
            // 		//	alert("竖屏");
            // 	}
            // }
            CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
            this.ptBtn.addEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
            this.jsBtn.addEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
            //CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
        };
        NiuniuHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
            this.ptBtn.removeEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
            this.jsBtn.removeEventListener(egret.Event.CHANGE, this.radioChangeHandler, this);
            //CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
        };
        NiuniuHallScene.prototype.radioChangeHandler = function (evt) {
            if (evt.target.value == "1") {
                if (Global.gameProxy.lastGameConfig)
                    Global.gameProxy.lastGameConfig["playway"] = 1;
                egret.Tween.get(this.moveGroup).to({ x: -719 }, 300).call(function () {
                });
            }
            else {
                if (Global.gameProxy.lastGameConfig)
                    Global.gameProxy.lastGameConfig["playway"] = 0;
                egret.Tween.get(this.moveGroup).to({ x: -719 }, 2).to({ x: 57 }, 300);
            }
        };
        /**
             * 屏幕旋转
             * */
        NiuniuHallScene.prototype.oritationChange = function (e) {
            var _data = e.data;
            //	egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
            //横屏
            if (_data == "landscape") {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE);
                LogUtils.logD("==================横屏=============");
            }
            else {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(SceneNotify.OPEN_NIUNIUSELECT);
                LogUtils.logD("==================竖屏=============");
            }
        };
        /**
         * 进入匹配或者重新获取数据
         * @param  {egret.Event} e?
         */
        NiuniuHallScene.prototype.enterScene = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data;
                return __generator(this, function (_a) {
                    if (this.lockEnter) {
                        return [2 /*return*/];
                    }
                    this.lockEnter = true;
                    data = event.data;
                    //普通或急速场
                    if (this.ptBtn.selected) {
                        data["playway"] = 0;
                        // Global.gameProxy.lastGameConfig["playway"] = 0;
                    }
                    else {
                        this.MATCHING_NOTIFY = SceneNotify.OPEN_NIUNIU_JSMATCHING;
                        data["playway"] = 1;
                        // Global.gameProxy.lastGameConfig["playway"] = 1;
                    }
                    LogUtils.logD("=========牛牛=============" + JSON.stringify(data));
                    RotationLoadingShu.instance.load(this.loadGroups, "", function () { return __awaiter(_this, void 0, void 0, function () {
                        var handler, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    handler = ServerPostPath.hall_sceneHandler_c_enter;
                                    return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                                case 1:
                                    resp = _a.sent();
                                    if (this.enterSceneCall(resp, data)) {
                                        Global.gameProxy.lastGameConfig = data;
                                        Global.gameProxy.lastGameConfig.gameId = data.gameId;
                                    }
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 渲染hallScene
         */
        NiuniuHallScene.prototype.showHallBars = function () {
            this.centerGroup.alpha = 0;
            var nums = Global.gameProxy.gameNums["blnn"];
            var index = 1;
            var item;
            var fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
            for (var i in nums) {
                var barConfig = nums[i];
                var bar = this['bar' + index];
                bar.showBarByConfig(barConfig, index, fonts[index]);
                game.UIUtils.removeSelf(this['yy' + index]);
                bar.visible = barConfig.enable;
                if (index == 6) {
                    bar.y += 12;
                }
                index++;
            }
            egret.Tween.get(this.centerGroup).to({
                alpha: 1
            }, 800);
        };
        NiuniuHallScene.prototype.showHallBarMove = function () {
            this.centerGroup0.alpha = 0;
            var nums = Global.gameProxy.gameNums["blnn"];
            var index = 1;
            var item;
            var fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
            for (var i in nums) {
                var barConfig = nums[i];
                var bar = this['bar' + index + "_M"];
                bar.showBarByConfig(barConfig, index, fonts[index]);
                game.UIUtils.removeSelf(this['yy' + index + "_M"]);
                bar.visible = barConfig.enable;
                if (index == 6) {
                    bar.y += 12;
                }
                index++;
            }
            egret.Tween.get(this.centerGroup0).to({
                alpha: 1
            }, 800);
        };
        return NiuniuHallScene;
    }(game.BaseHallScene));
    niuniu.NiuniuHallScene = NiuniuHallScene;
    __reflect(NiuniuHallScene.prototype, "niuniu.NiuniuHallScene");
})(niuniu || (niuniu = {}));
