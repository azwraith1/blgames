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
 * @Date: 2020-04-16 14:07:52
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-16 15:30:50
 * @Description: 默认老虎机加载界面
 */
var BaseSlotLoadingScene = (function (_super) {
    __extends(BaseSlotLoadingScene, _super);
    function BaseSlotLoadingScene(scene) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.name = SLOT_LOADING_SKIN[scene];
        _this.skinName = SLOT_LOADING_SKIN[scene];
        //添加进度遮罩
        switch (_this.name) {
            case "GDZWLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 56);
                _this.processBar.mask = _this.maskRect;
                break;
            case "CSDLoadingsSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 26);
                _this.processBar.mask = _this.maskRect;
                break;
            case "SGWSLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 55);
                _this["processBar2"].mask = _this.maskRect;
                break;
            case "SNYXLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 21);
                _this["processBar2"].mask = _this.maskRect;
                break;
        }
        return _this;
        // this.skinName = `${scene.toUpperCase}LoadingSkin`;
    }
    BaseSlotLoadingScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.resGroups = ["main", this.scene + "_hall", this.scene + "_game"];
        this.startLogin();
        if (this.quitBtn)
            this.quitBtn.visible = false;
    };
    /**
     *  开始加载资源
     */
    BaseSlotLoadingScene.prototype.beganLoadResGroup = function () {
        console.log("resGroup:" + this.resGroup);
        this.resGroup = this.resGroups.pop();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    BaseSlotLoadingScene.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            if (this.resGroups.length > 0) {
                this.beganLoadResGroup();
            }
            else {
                this.onResourceLoadOver();
            }
        }
    };
    /**
     * 资源加载完成
     */
    BaseSlotLoadingScene.prototype.onResourceLoadOver = function () {
        RES.loadGroup("common");
        for (var i = 0; i < this.backGroups.length; i++) {
            var name_1 = this.backGroups[i];
            RES.loadGroup(name_1);
        }
        this.resLoadedOK = true;
        this.checkLoginOver();
    };
    BaseSlotLoadingScene.prototype.checkLoginOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.resLoadedOK && this.sceneConfigOK) {
                    this.userLoginSuc();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 资源加载进度条
     * @param  {RES.ResourceEvent} e
     */
    BaseSlotLoadingScene.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            this.currentLoader++;
            var rate = Math.floor(this.currentLoader / this.totalLoader * 100);
            switch (this.name) {
                case "DNTGLoadingSkin":
                    this.processBar.width = rate / 100 * 629;
                    break;
                case "SDXLLoadingSkin":
                    this.processBar.width = rate / 100 * 679;
                    break;
                case "SDMNLoadingSkin":
                    this.processBar.width = rate / 100 * 996;
                    break;
                case "CBZZLaodingSkin":
                    this.processBar.width = rate / 100 * 762;
                    break;
                case "BSKGLoadingSkin":
                    this.processBar.width = rate / 100 * 866;
                    break;
                case "RDSGLoadingSkin":
                    this.processBar.width = rate / 100 * 740;
                    break;
                case "AYLSLoadingSkin":
                    this.processBar.width = rate / 100 * 717;
                    break;
                case "GDZWLoadingSkin":
                    this.maskRect.width = rate / 100 * 721;
                    this.processBar.mask = this.maskRect;
                    break;
                case "BSCSLoadingSkin":
                    this.processBar.width = rate / 100 * 851;
                    break;
                case "CEBYLoadingSkin":
                    this.processBar.width = rate / 100 * 607;
                    break;
                case "ZCJLLoadingSkin":
                    this.processBar.width = rate / 100 * 941;
                    break;
                case "WSZWLoadingSkin":
                    this.processBar.width = rate / 100 * 935;
                    break;
                case "Lucky7LoadingSkin":
                    this.processBar.width = rate / 100 * 700;
                    break;
                case "CSDLoadingsSkin":
                    this.maskRect.width = rate / 100 * 795;
                    this.processBar.mask = this.maskRect;
                    break;
                case "XYSGLoadingSkin":
                    this.processBar.width = rate / 100 * 713;
                    break;
                case "XCBSLoadingSkin":
                    this.processBar.width = rate / 100 * 800;
                    break;
                case "SGWSLoadingSkin":
                    this.processBar.x = rate / 100 * 669;
                    this.maskRect.width = rate / 100 * 690;
                    this["processBar2"].mask = this.maskRect;
                    break;
                case "SNYXLoadingSkin":
                    this.processBar.x = rate / 100 * 826 - 6;
                    this.maskRect.width = rate / 100 * 826;
                    this["processBar2"].mask = this.maskRect;
                    break;
            }
            if (this.percentLabel) {
                if (this.percentLabel instanceof eui.BitmapLabel)
                    this.percentLabel.text = rate + "%";
                else
                    this.percentLabel.text = "正在加载..." + rate + "%";
            }
        }
    };
    return BaseSlotLoadingScene;
}(game.BaseLoginScene));
__reflect(BaseSlotLoadingScene.prototype, "BaseSlotLoadingScene");
