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
 * @Author: He Bing
 * @Date: 2018-07-03 14:11:47
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
 */
var HBMJHallScene = (function (_super) {
    __extends(HBMJHallScene, _super);
    function HBMJHallScene() {
        var _this = _super.call(this) || this;
        _this.pmdKey = "hbmj";
        _this.hallId = "majiang";
        // /**
        //  * 头像前缀
        //  */
        // public headerFront: string = "hall_header";
        /**
         * 背景音乐
         */
        _this.bgMusic = "home_bg_mp3";
        /**
         * 关闭当前界面的通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_HBMJ_HALL;
        /**
         * 进入正确匹配的通知
         */
        _this.MATCHING_NOTIFY = SceneNotify.OPEN_HBMJ_MATCHING;
        /**
         * 帮助界面的通知
         */
        _this.HELP_NOTIFY = PanelNotify.OPEN_GDMJ_HELP;
        /**
         * 记录界面的通知
         */
        _this.RECORD_NOTIFY = PanelNotify.OPEN_GDMJRECORD;
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = null;
        /**
         * 需要加载的资源组
         */
        _this.loadGroups = ['hbmj_game'];
        return _this;
        //	this.skinName = `majiang.HBMJHallSceneSkin`;
    }
    HBMJHallScene.prototype.helpBtnTouch = function () {
        BaseMajiangHelpScene.getInstance("MajiangHelpSkin", "mj_help", "hbmj").show();
    };
    HBMJHallScene.prototype.recordBtnTouch = function () {
        CF.sN(PanelNotify.OPEN_BASE_RECORD, "hbmj");
    };
    HBMJHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
    };
    HBMJHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
    };
    /**
     * 获取对局信息
     * @param  {egret.Event} e?
     */
    HBMJHallScene.prototype.enterScene = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data;
            return __generator(this, function (_a) {
                if (this.lockEnter) {
                    return [2 /*return*/];
                }
                this.lockEnter = true;
                data = e.data;
                RotationLoading.instance.load(["hbmj_game"], "", function () { return __awaiter(_this, void 0, void 0, function () {
                    var handler, resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                handler = ServerPostPath.hall_sceneHandler_c_enter;
                                data['isContinue'] = false;
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
    HBMJHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.headerImage.mask = this.headerMask;
    };
    return HBMJHallScene;
}(BaseMaJiangHallScene));
__reflect(HBMJHallScene.prototype, "HBMJHallScene");
