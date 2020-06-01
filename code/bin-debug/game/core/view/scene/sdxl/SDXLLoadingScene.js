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
 * @Author: real MC Lee
 * @Date: 2019-05-27 18:44:13
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-16 14:48:47
 * @Description:
 */
var SDXLLoadingScene = (function (_super) {
    __extends(SDXLLoadingScene, _super);
    function SDXLLoadingScene() {
        var _this = _super.call(this) || this;
        if (SDXLLoadingScene._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new SDXLLoadingSkin();
        return _this;
    }
    Object.defineProperty(SDXLLoadingScene, "instance", {
        get: function () {
            if (!SDXLLoadingScene._instance) {
                SDXLLoadingScene._instance = new SDXLLoadingScene();
            }
            return SDXLLoadingScene._instance;
        },
        enumerable: true,
        configurable: true
    });
    SDXLLoadingScene.prototype.load = function (resGroup, callback) {
        this.resGroup = RESUtils.combGroupName(resGroup);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    SDXLLoadingScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    SDXLLoadingScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.clickDb = DBComponent.create("sdxl_click", "click");
        this.clickDb.x = 250;
        this.clickDb.y = 80;
        this.clickGroup2.addChild(this.clickDb);
        this.clickDb.resetPosition();
    };
    SDXLLoadingScene.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    SDXLLoadingScene.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    };
    SDXLLoadingScene.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.loadingPrograssBar.width = rate / 100 * 679;
        }
    };
    SDXLLoadingScene.prototype.onResourceLoadOver = function () {
        this.startText.alpha = 1;
        this.tipsLabel.visible = this.m_pProgressGroup.visible = false;
        this.clickIma.visible = this.startText.visible = true;
        this.showClickAni();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterSDXL, this);
    };
    SDXLLoadingScene.prototype.showClickAni = function () {
        var _this = this;
        this.startText.alpha = 1;
        egret.Tween.get(this.startText).to({ alpha: 0 }, 2000).call(function () {
            _this.clickDb.play("", 1);
        });
        this.clickDb.callback = function () {
            return _this.showClickAni();
        };
    };
    SDXLLoadingScene.prototype.enterSDXL = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.callback && this.callback();
                game.UIUtils.removeFromParent(this);
                SDXLLoadingScene._instance = null;
                this.startText.alpha = 1;
                return [2 /*return*/];
            });
        });
    };
    return SDXLLoadingScene;
}(game.BaseComponent));
__reflect(SDXLLoadingScene.prototype, "SDXLLoadingScene");
