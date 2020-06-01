var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var game;
(function (game) {
    var UIUtils = (function () {
        function UIUtils() {
        }
        UIUtils.removeFromParent = function (child) {
            if (child && child.parent) {
                child.parent.removeChild(child);
            }
        };
        /**
        * 设置锚点居中
        * @param compt 组件
        * @param allChild 是否全部child设置锚点居中
        */
        UIUtils.setAnchorCenter = function (compt, allChild) {
            if (allChild) {
                for (var i = 0; i < compt.parent.numChildren; i++) {
                    if (compt.parent.getChildAt(i).anchorOffsetX == 0) {
                        compt.parent.getChildAt(i).anchorOffsetX = compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).anchorOffsetY = compt.parent.getChildAt(i).height / 2;
                        compt.parent.getChildAt(i).x += compt.parent.getChildAt(i).width / 2;
                        compt.parent.getChildAt(i).y += compt.parent.getChildAt(i).height / 2;
                    }
                }
            }
            else {
                if (compt.anchorOffsetX == 0) {
                    compt.anchorOffsetX = compt.width / 2;
                    compt.anchorOffsetY = compt.height / 2;
                    compt.x += compt.width / 2;
                    compt.y += compt.height / 2;
                }
            }
        };
        UIUtils.resetAnchorPoint = function (p) {
            p.x -= p.anchorOffsetX;
            p.y -= p.anchorOffsetY;
            p.anchorOffsetX = 0;
            p.anchorOffsetY = 0;
        };
        UIUtils.updatePosistion = function (p) {
            if (p.width === GameConfig.WINSIZE_WIDTH) {
                p.width = GameConfig.curWidth();
            }
            if (p.height === GameConfig.WINSIZE_HEIGHT) {
                p.height = GameConfig.curHeight();
            }
        };
        UIUtils.addButtonScaleEffects = function (p, soundName) {
            if (soundName === void 0) { soundName = "ui_click_mp3"; }
            if (!p)
                return;
            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                if (!p.name) {
                    p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                        UIUtils.onButtonTouchBegan(p, soundName);
                    }, p);
                }
                UIUtils.setAnchorPot(p);
            }
            else {
                // if (!egret.is(p.parent, egret.getQualifiedClassName(eui.Group))) {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch = p.getChildAt(i);
                    UIUtils.addButtonScaleEffects(ch, soundName);
                }
                // }
            }
        };
        UIUtils.changeButtonLanguage = function (button) {
        };
        UIUtils.addTouchScaleEffect = function (p) {
            p.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
        };
        UIUtils.playScaleAni = function (btn) {
            egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        UIUtils.onButtonTouchBegan = function (btn, soundName) {
            SoundManager.getInstance().playEffect(soundName); //管理声音的
            var scaleX = btn.scaleX;
            var scaleY = btn.scaleY;
            // egret.Tween.removeTweens()
            egret.Tween.get(btn).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        UIUtils.removeButtonScaleEffects = function (p) {
            if (!p)
                return;
            if (egret.is(p, egret.getQualifiedClassName(eui.Button))) {
                p.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, p);
            }
            else {
                var len = p.numChildren;
                for (var i = 0; i < len; i++) {
                    var ch = p.getChildAt(i);
                    UIUtils.removeButtonScaleEffects(ch);
                }
            }
        };
        UIUtils.setAnchorPot = function (p) {
            if (p.anchorOffsetX || p.anchorOffsetY) {
                return;
            }
            p.anchorOffsetX = p.width / 2; // * p.scaleX;
            p.anchorOffsetY = p.height / 2; // * p.scaleY;
            p.x += p.width / 2; //* p.scaleX;
            p.y += p.height / 2; // * p.scaleY;
        };
        UIUtils.setAnchorPotAndScale = function (p) {
            if (p.anchorOffsetX || p.anchorOffsetY) {
                return;
            }
            p.anchorOffsetX = p.width / 2 * p.scaleX;
            p.anchorOffsetY = p.height / 2 * p.scaleY;
            p.x += p.width / 2 * p.scaleX;
            p.y += p.height / 2 * p.scaleY;
        };
        UIUtils.removeSelf = function (p) {
            if (p) {
                UIUtils.removeFromParent(p);
            }
        };
        UIUtils.removeSelfByAmi = function (p, time) {
            return new Promise(function (resolve, reject) {
                egret.Tween.get(p).to({
                    alpha: 0
                }, time).call(function () {
                    UIUtils.removeFromParent(p);
                    resolve('success');
                }, p);
            });
        };
        UIUtils.getParentByClass = function (p, classType) {
            var parent = p.parent;
            if (parent) {
                if (parent instanceof classType) {
                    return parent;
                }
                else {
                    return UIUtils.getParentByClass(parent, classType);
                }
            }
            else {
                return null;
            }
        };
        UIUtils.getChildByClass = function (p, classType) {
            var len = p.numChildren;
            for (var i = 0; i < len; i++) {
                var ch = p.getChildAt(i);
                if (ch instanceof classType) {
                    return ch;
                }
            }
            return null;
        };
        //全屏适配方法，给最大的外层做适配，里面的直接勾
        UIUtils.fullscreen = function (p) {
            // if (GameConfig.curStage().orientation == egret.OrientationMode.PORTRAIT) {
            //      p.width = GameConfig.curWidth();
            //     p.height = GameConfig.curHeight();
            // } else {
            //     p.width = GameConfig.curWidth();
            //     p.height = GameConfig.curHeight();
            // }
            p.width = GameConfig.curWidth();
            p.height = GameConfig.curHeight();
        };
        UIUtils.getRealWidth = function (p) {
            return p.width * p.scaleX;
        };
        UIUtils.getRealHeight = function (p) {
            return p.height * p.scaleY;
        };
        /**
         * 设置组件居中X
         * @param  {egret.DisplayObject} p
         */
        UIUtils.setUI2CenterX = function (p) {
            p.x = GameConfig.curWidth() / 2 - p.width / 2;
        };
        /**
         * 设置组件居中Y
         * @param  {egret.DisplayObject} p
         */
        UIUtils.setUI2CenterY = function (p) {
            p.y = GameConfig.curHeight() / 2 - p.height / 2;
        };
        UIUtils.lockObject = function (p) {
            p.touchEnabled = false;
            egret.setTimeout(function () {
                p.touchEnabled = true;
            }, this, 1000);
        };
        /**
         * 窗口全屏
         */
        UIUtils.windowFullscreen = function () {
            if (egret.Capabilities.os == "iOS") {
                TipsCompoment.instance.show("苹果系统无法全屏，推荐chrome浏览器");
                return;
            }
            TipsCompoment.instance.show("若游戏无法全屏请使用浏览器自带全屏功能.");
            if (FrameUtils.iframeIsOk && window.parent && window.parent['screenfull']) {
                window.parent['screenfull'].enabled && window.parent['screenfull'].toggle();
                return;
            }
            window['screenfull'].enabled && window['screenfull'].toggle();
        };
        UIUtils.setGray = function (p, flag) {
            if (flag === void 0) { flag = true; }
            if (!flag) {
                p.filters = null;
                return;
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            p.filters = [colorFlilter];
        };
        UIUtils.changeOritation1 = function (isShu) {
            if (isShu) {
                GameConfig.curStage().orientation = egret.OrientationMode.PORTRAIT;
            }
            else {
                GameConfig.curStage().orientation = egret.OrientationMode.LANDSCAPE;
            }
        };
        UIUtils.getTweenTime = function (time) {
            return time;
        };
        UIUtils.isPortait1 = function () {
            return GameConfig.curStage().orientation == egret.OrientationMode.PORTRAIT;
        };
        /**
         * 1---横屏 1280 * 720
         * 2---竖屏 720 * 1280
         */
        UIUtils.changeResize = function (model) {
            if (this.currentModel == model) {
                return;
            }
            this.currentModel = model;
            switch (model) {
                case 1:
                    if (egret.Capabilities.isMobile) {
                        egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                    }
                    GameConfig.CURRENT_ISSHU = false;
                    egret.MainContext.instance.stage.setContentSize(1280, 720);
                    FrameUtils.changeBgImage("");
                    break;
                case 2:
                    if (egret.Capabilities.isMobile) {
                        egret.MainContext.instance.stage.orientation = egret.OrientationMode.PORTRAIT;
                    }
                    GameConfig.CURRENT_ISSHU = true;
                    egret.MainContext.instance.stage.setContentSize(720, 1280);
                    break;
            }
        };
        UIUtils.checkFull1 = function () {
            var _this = this;
            if (!FrameUtils.iframeIsOk) {
                return;
            }
            var windowParent = window.parent;
            if (windowParent && windowParent['checkSafiraStart']) {
                egret.clearTimeout(this.resizeTimeout);
                windowParent.onresize = function () {
                    if (_this.lock) {
                        return;
                    }
                    _this.lock = true;
                    _this.resizeTimeout = egret.setTimeout(function () {
                        _this.lock = false;
                        //当前角度
                        var thisRotation = windowParent.orientation;
                        //窗口变化过后safari的高度
                        var onResizeHeight = windowParent.innerHeight;
                        if (thisRotation == 90 || thisRotation == -90) {
                            if (onResizeHeight == windowParent['maxHeight']) {
                                if (windowParent['gameStart']) {
                                    FrameUtils.postMessage('1');
                                    windowParent['lastRotation'] = thisRotation;
                                    return;
                                }
                                else {
                                    windowParent['needShow'] = false;
                                    windowParent['lastRotation'] = thisRotation;
                                    return;
                                }
                            }
                            else {
                                if (windowParent['gameStart']) {
                                    FrameUtils.postMessage('0');
                                    windowParent['lastRotation'] = thisRotation;
                                    return;
                                }
                                else {
                                    windowParent['needShow'] = true;
                                    windowParent['lastRotation'] = thisRotation;
                                    return;
                                }
                            }
                        }
                        else {
                            if (thisRotation == 0) {
                                if (windowParent['minWidth'] == null) {
                                    windowParent['minWidth'] = windowParent.innerHeight;
                                }
                                if (windowParent['lastRotation'] == 90 || windowParent['lastRotation'] == -90) {
                                    if (windowParent['gameStart']) {
                                        FrameUtils.postMessage('0');
                                        alert("请重新上滑全屏!");
                                        // if (NativeApi.instance.isIphoneX || NativeApi.instance.isiPhoneIOS10) {
                                        // 
                                        // return;
                                        // }
                                    }
                                    else {
                                        windowParent['needShow'] = true;
                                        // windowParent['lastRotation'] = thisRotation;
                                        return;
                                    }
                                }
                                else {
                                    if (NativeApi.instance.isiPhoneIOS10) {
                                        if (window.innerHeight == windowParent['minWidth']) {
                                            if (windowParent['gameStart']) {
                                                FrameUtils.tipsToggle();
                                            }
                                            else {
                                                windowParent['needShow'] = false;
                                            }
                                            windowParent['lastRotation'] = thisRotation;
                                            return;
                                        }
                                    }
                                    if (window.innerHeight > windowParent['minWidth']) {
                                        if (windowParent['gameStart']) {
                                            FrameUtils.postMessage('1');
                                            windowParent['lastRotation'] = thisRotation;
                                            return;
                                        }
                                        else {
                                            windowParent['needShow'] = false;
                                        }
                                    }
                                    else {
                                        if (windowParent['gameStart']) {
                                            FrameUtils.postMessage('0');
                                        }
                                        else {
                                            windowParent['needShow'] = true;
                                        }
                                    }
                                }
                            }
                        }
                        windowParent['lastRotation'] = thisRotation;
                    }, _this, 500);
                };
            }
        };
        return UIUtils;
    }());
    game.UIUtils = UIUtils;
    __reflect(UIUtils.prototype, "game.UIUtils");
})(game || (game = {}));
