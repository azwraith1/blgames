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

module game {
    export class Main extends eui.UILayer {

        private pauseGame() {
            if (!Global.runBack) {
                // egret.ticker.pause();
                Global.runBack = true;
                CF.dP(ENo.RUN_BACKEND);
            }
        }

        private resumeGame() {
            if (Global.runBack) {
                // egret.ticker.resume();
                Global.runBack = false;
                CF.dP(ENo.RUN_FORTEND);
            }
        }

        /**
         * 检查运行平台
         */
        private checkPlatform() {
            let platform = Utils.getURLQueryString("op_code");
            if (!platform) {
                platform = "bole";
            }
            if (platform == "bole") {
                let language = Utils.getURLQueryString("lan");
                if (language == "ko_KR" || language == "ko_kr") {
                    platform = "bole_kr";
                } else if (language == "vi_VN" || language == "vi_vn") {
                    platform = "bole_vn";
                }
            }

            Global.platfromType = platform;
        }

        protected createChildren(): void {
            super.createChildren();
            //初始化设备信息
            FrameUtils.iframeload();
            //硬件信息
            NativeApi.instance.initApi();
            //跨域图片可加载            
            egret.ImageLoader.crossOrigin = "anonymous";

            egret.TextField.default_fontFamily = "SimHei";

            if (NativeApi.instance.isSafari && NativeApi.instance.isiOSDevice) {
                UIUtils.checkFull1();
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
            let assetAdapter = new AssetAdapter();
            egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
            this.runGame().catch(e => {
                console.log(e);
            })
        }


        /**
         * 检查全屏
         */
        private checkVersion() {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                RES['getVirtualUrl'] = this.getVirtualUrl.bind(this);
            }
        }

        /**
         * 资源版本
         * @param  {string} url
         * @returns string
         */
        private getVirtualUrl(url: string): string {
            let ret: string;
            // if (url.match("http")) {
            // return url + GameConfig.JS_VERSION;
            // }
            url += "?v=" + GameConfig.JS_VERSION;
            return url;
        }

        private lifeCycleNew() {
            egret.lifecycle.addLifecycleListener((context) => {
                // custom lifecycle plugin
                context.onUpdate = () => {
                }

            });
            if (!egret.Capabilities.isMobile) {
                document.addEventListener("visibilitychange", () => {
                    document.hidden ? this.pauseGame() : this.resumeGame();
                });
            } else {
                egret.lifecycle.onPause = () => {
                    this.pauseGame()
                }

                egret.lifecycle.onResume = () => {
                    this.resumeGame();
                    if (PomeloManager.instance.state == PomeloStateEnum.DISCONNECT) {
                        NetReconnect.instance.show();
                    } else {
                        NetReconnect.instance.hide();
                        CF.sN(PanelNotify.CLOSE_ALERT);
                    }
                    if (NativeApi.instance.isiOSDevice && NativeApi.instance.isChromeForIOS) {
                        FrameUtils.postMessage("0");
                    }
                }
            }
        }



        private async runGame() {
            await this.loadResource()
            this.createGameScene();
        }

        private async loadResource() {
            try {
                const loadingView = new LoadingUI();
                this.stage.addChild(loadingView);
                await RES.loadConfig("resource/default.res.json", "resource/");
                await this.loadTheme();
                await RES.loadGroup(`platform_inner`, 0);
                await RES.loadGroup("preload", 0, loadingView);
                this.stage.removeChild(loadingView);
            }
            catch (e) {
                console.error(e);
            }
        }

        private loadTheme() {
            return new Promise((resolve, reject) => {
                // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                let theme = new eui.Theme("resource/default.thm.json", this.stage);
                theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                    resolve();
                }, this);
            })
        }

        /**
         * 选择连接方式
         */
        private selectServerConfig() {
            let token = Utils.getURLQueryString("token");
            if (token) {
                Global.playerProxy.token = token;
            }
            ServerConfig.RECHARGE_URL = decodeURIComponent(Utils.getURLQueryString("op_pay_url"));
            ServerConfig.HOME_PAGE_URL = decodeURIComponent(Utils.getURLQueryString("op_home_url"));
            ServerConfig.OP_RETURN_TYPE = decodeURIComponent(Utils.getURLQueryString("op_return_type"));
            ServerConfig.BACK_URL = decodeURIComponent(Utils.getURLQueryString("back_url"));
            ServerConfig.gid = Utils.getURLQueryString("gid") || "";
            ServerConfig.USER_NAME = Utils.getURLQueryString("un") || null;
            if (!ServerConfig.USER_NAME) {
                let name = egret.localStorage.getItem(GameConfig.DEFUALT_NAME);
                if (!name) {
                    let uuid = Utils.S4();
                    name = "t" + Math.floor(_.random(10000, 99999)) + uuid.substring(0, 3);
                    // egret.localStorage.setItem(GameConfig.DEFUALT_NAME, name);

                }
                ServerConfig.USER_NAME = name;
            }
        }



        /**
         * 创建场景界面
         * Create scene interface
        */
        private resetZise;
        protected createGameScene(): void {

            //监听窗口大小的改变
            this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE, (e: egret.StageOrientationEvent) => {
                if (NativeApi.instance.isIphoneX && NativeApi.getChromeVersion() > 70) {
                    if (GameConfig.CURRENT_WIDTH == this.stage.stageWidth && this.stage.stageHeight == GameConfig.CURRENT_HEIGHT) {
                        return;
                    }
                    if (NativeApi.instance.isSafari) {
                        return;
                    }
                    FrameUtils.postMessage("0");
                }
            }, this);
            this.stage.addEventListener(egret.Event.RESIZE, function () {
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
                this.resetZise = egret.setTimeout(() => {
                    this.checkIsFull();
                    GameConfig.CURRENT_WIDTH = this.stage.stageWidth;
                    GameConfig.CURRENT_HEIGHT = this.stage.stageHeight;
                    this.resetZise = null;
                }, this, 500);
            }, this);
            GameConfig.GAME_CONFIG = RES.getRes("client_json");
            DateTimeManager.instance.run();
            //this.addChild(new testFgui());
            CF.sN(SceneNotify.OPEN_LOADING);
        }


        private firstWidth;
        private firstHeight;
        private isFullScreen: boolean = false;
        private maxHengWidth: number;
        private maxShuWidth: number;
        private checkIsFull() {
            if (!FrameUtils.iframeIsOk) {
                return;
            }
            //只有ios移动端才会执行
            let width = GameConfig.CURRENT_WIDTH;
            let height = GameConfig.CURRENT_HEIGHT;
            let stageWidth = this.stage.stageWidth;
            let stageHeight = this.stage.stageHeight;
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
                } else {
                    //横屏的相互操作
                    if (stageHeight > height) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    } else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
            //如果当前是竖屏 转入横屏
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
                } else {
                    if (stageWidth > width) {
                        this.isFullScreen = false;
                        FrameUtils.postMessage("0");
                    } else {
                        this.isFullScreen = true;
                        FrameUtils.postMessage("1");
                    }
                }
            }
        }

        /**
         * PC或者手机做出不同的适配
         */
        private checkRuntime() {
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
            } else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            }
        }

        private checkIsHengShu() {
            if (window.orientation === 180 || window.orientation === 0) {
                GameConfig.CURRENT_DIRECTION = "portrait";
            } else if (window.orientation === 90 || window.orientation === -90) {
                GameConfig.CURRENT_DIRECTION = "landscape";
            } else {
                GameConfig.CURRENT_DIRECTION = "running";
            }
        }



        /**
         * 检查服务器链接版本
         */
        private checkServerTime() {
            let locationHref = window.location.host;
            var search = location.search;
            var host = window.location.host;
            if (host.indexOf("publish") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.PUBLISH_TEST;
            } else if (host.indexOf("intdemo") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.INTDEMO_TEST;
            }
            else if (host.indexOf("demo") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.DEMO_TEST;
            }
            else if (host.indexOf("test") > -1 || host.indexOf("47.112") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.QA_TEST;
            } else if (host.indexOf("127.0.0.1") > - 1) {

            } else if (host.indexOf("192.168.2.102") > -1) {
                ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST2;
            } else if (host.indexOf("192.168") > -1) {

            } else {
                ServerConfig.PATH_TYPE = PathTypeEnum.WAI_PRODUCT;
                return;
            }
            let tType = Utils.getURLQueryString("t");
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
            let type = Utils.getURLQueryString("target");
            if (type) {
                ServerConfig.PATH_TYPE = PathTypeEnum.ZIDINGYI;
            }
        }
    }
}