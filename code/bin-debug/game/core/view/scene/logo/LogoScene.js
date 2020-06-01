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
  *  @Author:  Li  MengChan
  *  @Date:  2018-07-02  15:04:51
  *  @Descxription:  加载界面
  */
var game;
(function (game) {
    var LogoScene = (function (_super) {
        __extends(LogoScene, _super);
        function LogoScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "common";
            _this.maxX = 668;
            _this.skinName = new LogoSceneSkin();
            return _this;
        }
        LogoScene.prototype.showVersions = function (serverVer, clientVer) {
            this.resVersion.text = TextUtils.instance.getCurrentTextById(70) + serverVer;
            this.clientVersion.text = TextUtils.instance.getCurrentTextById(71) + clientVer;
        };
        LogoScene.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            // alert(1);
            //是否是pc
            this.createDb();
            this.resGroups = ["main"];
            // /home/cdgame/logo/platform_18luck
            var windowHerf = window.location.href;
            if (windowHerf.indexOf("127.0.0.1") > -1 || windowHerf.indexOf("192.168") > -1) {
                Global.platfromType = "inner";
                this.bgImage.source = RES.getRes("plaform_loading_" + Global.platfromType + "_jpg");
            }
            else {
                var str = "./../logo/platform_" + Global.platfromType + "/plaform_loading_" + Global.platfromType + ".jpg";
                RES.getResByUrl(str, function (texture) {
                    _this.bgImage.source = texture;
                });
            }
            this.startLogin();
        };
        LogoScene.prototype.createDb = function () {
            this.loadingDB = new DBComponent("loading_db");
            this.progressGroup.addChild(this.loadingDB);
            this.loadingDB.playDefault(-1);
            this.loadingDB.y += 11;
        };
        /**
          *  开始加载资源
          */
        LogoScene.prototype.beganLoadResGroup = function () {
            this.resGroup = this.resGroups.pop();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.resGroup);
        };
        LogoScene.prototype.onResourceLoadComplete = function (e) {
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
          *  preload资源组加载进度
          *  loading  process  of  preload  resource
          */
        LogoScene.prototype.onResourceProgress = function (e) {
            if (e.groupName == this.resGroup) {
                this.currentLoader++;
                var rate = Math.floor(this.currentLoader / this.totalLoader * 100);
                this.progressBar.width = Math.floor(1008 * rate / 100);
                this.loadingDB.x = this.progressBar.width;
            }
        };
        LogoScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        };
        LogoScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        };
        LogoScene.prototype.reconnectSuc = function () {
            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(64), function () {
                FrameUtils.flushWindow();
            }, null, true);
        };
        /**
         * 资源加载完毕
         */
        LogoScene.prototype.onResourceLoadOver = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i, name_1;
                return __generator(this, function (_a) {
                    RES.loadGroup("common");
                    for (i = 0; i < this.backGroups.length; i++) {
                        name_1 = this.backGroups[i];
                        RES.loadGroup(name_1);
                    }
                    this.resLoadedOK = true;
                    this.checkLoginOver();
                    return [2 /*return*/];
                });
            });
        };
        LogoScene.prototype.checkLoginOver = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.resLoadedOK && this.sceneConfigOK) {
                        this.userLoginSuc();
                    }
                    return [2 /*return*/];
                });
            });
        };
        return LogoScene;
    }(game.BaseLoginScene));
    game.LogoScene = LogoScene;
    __reflect(LogoScene.prototype, "game.LogoScene");
})(game || (game = {}));
