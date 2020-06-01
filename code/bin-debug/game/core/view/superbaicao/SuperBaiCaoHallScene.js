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
var SuperBaiCaoHallScene = (function (_super) {
    __extends(SuperBaiCaoHallScene, _super);
    function SuperBaiCaoHallScene() {
        var _this = _super.call(this) || this;
        _this.hallId = "superbaicao";
        _this.pmdKey = "superbaicao";
        /**
         * 头像前缀
         */
        _this.headerFront = "nns";
        /**
         * 背景音乐
         */
        _this.bgMusic = "bc_bgm_mp3";
        /**
         * 关闭当前界面的通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SUPERBAICAO_HALL;
        /**
         * 进入正确匹配的通知
         */
        _this.MATCHING_NOTIFY = SceneNotify.OPEN_SUPERBAICAO_MATCHING;
        /**
         * 帮助界面的通知
         */
        _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU;
        /**
         * 记录界面的通知
         */
        _this.RECORD_NOTIFY = PanelNotify.OPEN_BASE_RECORD;
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = PanelNotify.OPEN_SETTING;
        /**
         * 需要加载的资源组
         */
        _this.loadGroups = ['superbaicao_game'];
        _this.skinName = "SuperBaiCaoHallSceneSkin";
        return _this;
    }
    SuperBaiCaoHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var hotBar = GameLayerManager.gameLayer().hotBar;
        game.UIUtils.removeSelf(hotBar);
        hotBar.visible = false;
    };
    SuperBaiCaoHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        // CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
    };
    SuperBaiCaoHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
        // CF.rE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
    };
    SuperBaiCaoHallScene.prototype.onTouchTap = function (e) {
        _super.prototype.onTouchTap.call(this, e);
        switch (e.target) {
        }
    };
    /**
     * 进入匹配或者重新获取数据
     * @param  {egret.Event} e?
     */
    SuperBaiCaoHallScene.prototype.enterScene = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data;
            return __generator(this, function (_a) {
                if (this.lockEnter) {
                    return [2 /*return*/];
                }
                this.lockEnter = true;
                data = event.data;
                data.gameId = Global.gameProxy.gameIds[this.hallId];
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
    SuperBaiCaoHallScene.prototype.showHallBars = function () {
        this.centerGroup.alpha = 0;
        var nums = Global.gameProxy.gameNums["superbaicao"];
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
    SuperBaiCaoHallScene.prototype.resetPosition = function (item, index) {
        switch (index) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    };
    /**
     * 帮助按钮
     */
    SuperBaiCaoHallScene.prototype.helpBtnTouch = function () {
        BaiCaoHelpPanel.instance.show("superbaicao");
    };
    return SuperBaiCaoHallScene;
}(game.BaseHallScene));
__reflect(SuperBaiCaoHallScene.prototype, "SuperBaiCaoHallScene");
