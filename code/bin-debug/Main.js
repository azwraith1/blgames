//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var game;
(function (game) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isFullScreen = false;
            return _this;
        }
        Main.prototype.pauseGame = function () {
            if (!Global.runBack) {
                // egret.ticker.pause();
                Global.runBack = true;
                CF.dP(ENo.RUN_BACKEND);
            }
        };
        Main.prototype.resumeGame = function () {
            if (Global.runBack) {
                // egret.ticker.resume();
                Global.runBack = false;
                CF.dP(ENo.RUN_FORTEND);
            }
        };
        /**
         * 检查运行平台
         */
        Main.prototype.checkPlatform = function () {
            var platform = game.Utils.getURLQueryString("op_code");
            if (!platform) {
                platform = "bole";
            }
            if (platform == "bole") {
                var language = game.Utils.getURLQueryString("lan");
                if (language == "ko_KR" || language == "ko_kr") {
                    platform = "bole_kr";
                }
                else if (language == "vi_VN" || language == "vi_vn") {
                    platform = "bole_vn";
                }
            }
            Global.platfromType = platform;
        };
        Main.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //初始化设备信息
            FrameUtils.iframeload();
            //硬件信息
            NativeApi.instance.initApi();
            //跨域图片可加载            
            egret.ImageLoader.crossOrigin = "anonymous";
            egret.TextField.default_fontFamily = "SimHei";
            if (NativeApi.instance.isSafari && NativeApi.instance.isiOSDevice) {
                game.UIUtils.checkFull1();
            }
            this.checkServerTime();
            //加载相应服务器配置
            ServerConfig.PATH_CONFIG = PathConfigFac.getPathByType(ServerConfig.PATH_TYPE);
            GameConfig.JS_VERSION = window['jsVersion'];
            GameConfig.RES_VERSION = window['resVersion'];
            //生命周期管理
            this.lifeCycleNew();
            //检查资源版本
            this.checkVersion();
            //检查运行环境
            this.checkRuntime();
            //检查运行平台
            this.checkPlatform();
            this.addChild(GameLayerManager.gameLayer());
            game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
            this.selectServerConfig();
            if (ServerConfig.PATH_CONFIG.token_login) {
                if (!Global.playerProxy.token) {
                    alert("请用正确的游戏打开方式！");
                    return;
                }
            }
            LogUtils.loglevel = ServerConfig.PATH_CONFIG.log_level;
            //inject the custom material parser
            //注入自定义的素材解析器
            var assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            this.runGame().catch(function (e) {
                console.log(e);
            });
        };
        /**
         * 检查全屏
         */
        Main.prototype.checkVersion = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                RES['getVirtualUrl'] = this.getVirtualUrl.bind(this);
            }
        };
        /**
         * 资源版本
         * @param  {string} url
         * @returns string
         */
        Main.prototype.getVirtualUrl = function (url) {
            var ret;
            // if (url.match("http")) {
            // return url + GameConfig.JS_VERSION;
            // }
            url += "?v=" + GameConfig.JS_VERSION;
            return url;
        };
        Main.prototype.lifeCycleNew = function () {
            var _this = this;
            egret.lifecycle.addLifecycleListener(function (context) {
                // custom lifecycle plugin
                context.onUpdate = function () {
                };
            });
            if (!egret.Capabilities.isMobile) {
                document.addEventListener("visibilitychange", function () {
                    document.hidden ? _this.pauseGame() : _this.resumeGame();
                });
            }
            else {
                egret.lifecycle.onPause = function () {
                    _this.pauseGame();
                };
                egret.lifecycle.onResume = function () {
                    _this.resumeGame();
                    if (game.PomeloManager.instance.state == PomeloStateEnum.DISCONNECT) {
                        game.NetReconnect.instance.show();
                    }
                    else {
                        game.NetReconnect.instance.hide();
                        CF.sN(PanelNotify.CLOSE_ALERT);
                    }
                    if (NativeApi.instance.isiOSDevice && NativeApi.instance.isChromeForIOS) {
                        FrameUtils.postMessage("0");
                    }
                };
            }
        };
        Main.prototype.runGame = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.loadResource()];
                        case 1:
                            _a.sent();
                            this.createGameScene();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Main.prototype.loadResource = function () {
            return __awaiter(this, void 0, void 0, function () {
                var loadingView, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            loadingView = new LoadingUI();
                            this.stage.addChild(loadingView);
                            return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.loadTheme()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, RES.loadGroup("platform_inner", 0)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                        case 4:
                            _a.sent();
                            this.stage.removeChild(loadingView);
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Main.prototype.loadTheme = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                var theme = new eui.Theme("resource/default.thm.json", _this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                    resolve();
                }, _this);
            });
        };
        /**
         * 选择连接方式
         */
        Main.prototype.selectServerConfig = function () {
            var token = game.Utils.getURLQueryString("token");
            if (token) {
                Global.playerProxy.token = token;
            }
            ServerConfig.RECHARGE_URL = decodeURIComponent(game.Utils.getURLQueryString("op_pay_url"));
            ServerConfig.HOME_PAGE_URL = decodeURIComponent(game.Utils.getURLQueryString("op_home_url"));
            ServerConfig.OP_RETURN_TYPE = decodeURIComponent(game.Utils.getURLQueryString("op_return_type"));
            ServerConfig.BACK_URL = decodeURIComponent(game.Utils.getURLQueryString("back_url"));
            ServerConfig.gid = game.Utils.getURLQueryString("gid") || "";
            ServerConfig.USER_NAME = game.Utils.getURLQueryString("un") || null;
            if (!ServerConfig.USER_NAME) {
                var name_1 = egret.localStorage.getItem(GameConfig.DEFUALT_NAME);
                if (!name_1) {
                    var uuid = game.Utils.S4();
                    name_1 = "t" + Math.floor(_.random(10000, 99999)) + uuid.substring(0, 3);
                    // egret.localStorage.setItem(GameConfig.DEFUALT_NAME, name);
                }
                ServerConfig.USER_NAME = name_1;
            }
        };
        Main.prototype.createGameScene = function () {
            var _this = this;
            //监听窗口大小的改变
            this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, function (e) {
                if (NativeApi.instance.isIphoneX && NativeApi.getChromeVersion() > 70) {
                    if (GameConfig.CURRENT_WIDTH == _this.stage.stageWidth && _this.stage.stageHeight == GameConfig.CURRENT_HEIGHT) {
                        return;
                    }
                    if (NativeApi.instance.isSafari) {
                        return;
                    }
                    FrameUtils.postMessage("0");
                }
            }, this);
            this.stage.addEventListener(egret.Event.RESIZE, function () {
                var _this = this;
                GameConfig.WINSIZE_WIDTH = this.stage.stageWidth;
                GameConfig.WINSIZE_HEIGHT = this.stage.stageHeight;
                var beforeData = { wBili: GameConfig.WINSIZE_BILI_WIDTH, hBili: GameConfig.WINSIZE_BILI_HEIGHT };
                GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
                GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
                CF.dP(ENo.EVENT_RESIZE, beforeData);
                if (this.resetZise) {
                    egret.clearTimeout(this.resetZise);
                    this.resetZise = null;
                }
                this.resetZise = egret.setTimeout(function () {
                    _this.checkIsFull();
                    GameConfig.CURRENT_WIDTH = _this.stage.stageWidth;
                    GameConfig.CURRENT_HEIGHT = _this.stage.stageHeight;
                    _this.resetZise = null;
                }, this, 500);
            }, this);
            GameConfig.GAME_CONFIG = RES.getRes("client_json");
            game.DateTimeManager.instance.run();
            //this.addChild(new testFgui());
            CF.sN(SceneNotify.OPEN_LOADING);
        };
        Main.prototype.checkIsFull = function () {
            if (!FrameUtils.iframeIsOk) {
                return;
            }
            //只有ios移动端才会执行
            var width = GameConfig.CURRENT_WIDTH;
            var height = GameConfig.CURRENT_HEIGHT;
            var stageWidth = this.stage.stageWidth;
            var stageHeight = this.stage.stageHeight;
            if (GameConfig.CURRENT_ISSHU) {
                width = GameConfig.CURRENT_HEIGHT;
                height = GameConfig.CURRENT_WIDTH;
                stageWidth = this.stage.stageHeight;
                stageHeight = this.stage.stageWidth;
            }
            if (NativeApi.instance.isSafari) {
                return;
            }
            if (NativeApi.instance.isIphoneX) {
                FrameUtils.iphoneXScreen(stageWidth, stageHeight);
                return;
            }
            this.checkIsHengShu();
            //横屏
            if (width == this.stage.stageWidth && this.stage.stageHeight == height) {
                return;
            }
            if (width == 1280) {
                if (stageWidth != 1280) {
                    if (NativeApi.getChromeVersion() > 70) {
                        FrameUtils.postMessage("0");
                    }
                }
                else {
                    //横屏的相互操作
                    if (stageHeight > height) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    }
                    else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
            else if (height == 720) {
                if (NativeApi.instance.getIphoneBanben()) {
                    this.isFullScreen = true;
                    FrameUtils.postMessage("1");
                    return;
                }
                if (stageHeight != 720) {
                    if (NativeApi.getChromeVersion() > 70) {
                        FrameUtils.postMessage("0");
                    }
                }
                else {
                    if (stageWidth > width) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    }
                    else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
        };
        /**
         * PC或者手机做出不同的适配
         */
        Main.prototype.checkRuntime = function () {
            this.checkIsHengShu();
            GameConfig.CURRENT_WIDTH = this.stage.stageWidth;
            GameConfig.CURRENT_HEIGHT = this.stage.stageHeight;
            GameConfig.WINSIZE_WIDTH = this.stage.stageWidth;
            GameConfig.WINSIZE_HEIGHT = this.stage.stageHeight;
            GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
            GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
            this.stage.orientation = egret.OrientationMode.LANDSCAPE;
            if (!egret.Capabilities.isMobile) {
                this.stage.orientation = egret.OrientationMode.AUTO;
                this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            }
            else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            }
        };
        Main.prototype.checkIsHengShu = function () {
            if (window.orientation === 180 || window.orientation === 0) {
                GameConfig.CURRENT_DIRECTION = "portrait";
            }
            else if (window.orientation === 90 || window.orientation === -90) {
                GameConfig.CURRENT_DIRECTION = "landscape";
            }
            else {
                GameConfig.CURRENT_DIRECTION = "running";
            }
        };
        /**
         * 检查服务器链接版本
         */
        Main.prototype.checkServerTime = function () {
            var locationHref = window.location.host;
            var search = location.search;
            var host = window.location.host;
            if (host.indexOf("publish") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.PUBLISH_TEST;
            }
            else if (host.indexOf("intdemo") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.INTDEMO_TEST;
            }
            else if (host.indexOf("demo") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.DEMO_TEST;
            }
            else if (host.indexOf("test") > -1 || host.indexOf("47.112") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.QA_TEST;
            }
            else if (host.indexOf("127.0.0.1") > -1) {
            }
            else if (host.indexOf("192.168.2.102") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST2;
            }
            else if (host.indexOf("192.168") > -1) {
            }
            else {
                ServerConfig.PATH_TYPE = PathTypeEnum.WAI_PRODUCT;
                return;
            }
            var tType = game.Utils.getURLQueryString("t");
            switch (tType) {
                case "1":
                    //192.168.2.6
                    ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST;
                    break;
                case "2":
                    //192.168.2.6
                    ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST1;
                    break;
                case "3":
                    //192.168.2.6
                    ServerConfig.PATH_TYPE = PathTypeEnum.QA_TEST;
                    break;
                case "4":
                    //192.168.2.6
                    ServerConfig.PATH_TYPE = PathTypeEnum.DEMO_TEST;
                    break;
                case "5":
                    //192.168.2.6
                    ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST2;
                    break;
            }
            var type = game.Utils.getURLQueryString("target");
            if (type) {
                ServerConfig.PATH_TYPE = PathTypeEnum.ZIDINGYI;
            }
        };
        return Main;
    }(eui.UILayer));
    game.Main = Main;
    __reflect(Main.prototype, "game.Main");
})(game || (game = {}));
