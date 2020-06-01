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
 * @Author: wangtao
 * @Date: 2019-04-09 10:30:03
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-20 18:55:55
 * @Description:
 */
var sdxl;
(function (sdxl) {
    var SDXLGameScene3 = (function (_super) {
        __extends(SDXLGameScene3, _super);
        function SDXLGameScene3() {
            var _this = _super.call(this) || this;
            _this.isReconnect = true; //是否为掉线后重新连接
            _this.isFastGame = false;
            _this.isSelect = false; //是否选择完免费游戏
            /**
             * 开始自动游戏
             */
            _this.isSendMessage = false; //防止重复发送免费游戏消息
            _this.freeWin = 0; //免费游戏总赢取
            return _this;
            // this.skinName = new SDXLGameScene3Skin();
        }
        SDXLGameScene3.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SDXL_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.SDXL_ENTER_FREE_GAME, this.enterFreeGame, this);
        };
        SDXLGameScene3.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SDXL_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.SDXL_ENTER_FREE_GAME, this.enterFreeGame, this);
            this.removeMouseOn();
            egret.clearInterval(this.timer2);
            egret.clearInterval(this.timer3);
            this.scroller.removeScroller();
            this.resizeGroup.removeChildren();
            egret.clearTimeout(this.freeGameTimeOut);
        };
        SDXLGameScene3.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.addSakuraDown();
            // this.addSakuraHeadDown();
            this.ygAni = DBComponent.create("ygAni", "sdxl_yg");
            this.xlnAni = DBComponent.create("xlnAni", "sdxl_xln");
            this.FreeMulAni = DBComponent.create("FreeMulAni", "sdxl_mul_diguang");
            this.selectAni1 = DBComponent.create("selectAni1", "sdxl_select_ani1");
            this.selectAni2 = DBComponent.create("selectAni2", "sdxl_select_ani2");
            // this.ygAni = new DBComponent("sdxl_yg");
            // this.xlnAni = new DBComponent("sdxl_xln");
            // this.FreeMulAni = new DBComponent("sdxl_mul_diguang");
            // this.selectAni1 = new DBComponent("sdxl_select_ani1");
            // this.selectAni2 = new DBComponent("sdxl_select_ani2");
            this.selectAni1.touchEnabled = false;
            this.selectAni2.touchEnabled = false;
            this.ygAni.scaleX = this.ygAni.scaleY = this.xlnAni.scaleX = this.xlnAni.scaleY = 4 / 3;
            this.ygAni.touchEnabled = this.xlnAni.touchEnabled = false;
            this.xlnAni.horizontalCenter = 265;
            this.ygAni.horizontalCenter = -269;
            this.xlnAni.bottom = 10;
            this.ygAni.bottom = -58;
            this.ygAni.visible = this.xlnAni.visible = true;
            this.commomScore = new eui.BitmapLabel();
            this.commomScore.font = "sdxl_wingold_fnt";
            this.commomScore.verticalCenter = 0;
            this.commomScore.horizontalCenter = 0;
            this.scroller.showFreeFirst(3);
        };
        /**
         * 添加鼠标监听事件
         */
        SDXLGameScene3.prototype.addMouseOn = function () {
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                this.free20.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.free5Ani, this);
                this.free20.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.free5Ani, this);
                this.free15.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.free10Ani, this);
                this.free15.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.free10Ani, this);
                this.free10.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.free15Ani, this);
                this.free10.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.free15Ani, this);
                this.free5.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.free20Ani, this);
                this.free5.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.free20Ani, this);
            }
        };
        SDXLGameScene3.prototype.removeMouseOn = function () {
            var isPC = NativeApi.instance.IsPC();
            if (isPC) {
                this.free20.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.free5Ani, this);
                this.free20.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.free5Ani, this);
                this.free15.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.free10Ani, this);
                this.free15.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.free10Ani, this);
                this.free10.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.free15Ani, this);
                this.free10.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.free15Ani, this);
                this.free5.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.free20Ani, this);
                this.free5.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.free20Ani, this);
            }
        };
        /**
         * 20次免费游戏鼠标动画
         */
        SDXLGameScene3.prototype.free5Ani = function () {
            this.selectAni1.bottom = 112;
            this.selectAni1.horizontalCenter = -466;
            this.selectAni1.play("", 0);
            this.selectGroup.addChild(this.selectAni1);
            this.selectAni1.resetPosition();
        };
        /**
        * 15次免费游戏鼠标动画
        */
        SDXLGameScene3.prototype.free10Ani = function () {
            this.selectAni1.bottom = 112;
            this.selectAni1.horizontalCenter = -165;
            this.selectAni1.play("", 0);
            this.selectGroup.addChild(this.selectAni1);
            this.selectAni1.resetPosition();
        };
        /**
        * 10次免费游戏鼠标动画
        */
        SDXLGameScene3.prototype.free15Ani = function () {
            this.selectAni1.bottom = 112;
            this.selectAni1.horizontalCenter = 150;
            this.selectAni1.play("", 0);
            this.selectGroup.addChild(this.selectAni1);
            this.selectAni1.resetPosition();
        };
        /**
        * 5次免费游戏鼠标动画
        */
        SDXLGameScene3.prototype.free20Ani = function () {
            this.selectAni1.bottom = 112;
            this.selectAni1.horizontalCenter = 475;
            this.selectAni1.play("", 0);
            this.selectGroup.addChild(this.selectAni1);
            this.selectAni1.resetPosition();
        };
        /**
         * 进入免费场景再开始免费游戏
         */
        SDXLGameScene3.prototype.enterFreeGame = function (e) {
            var _this = this;
            this.addMouseOn();
            this.addSakuraDown();
            this.addSakuraHeadDown();
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            this.isReconnect = false;
            this.touchGuangAni = DBComponent.create("touchGuangAni", "sdxl_freegame_guang");
            // this.touchGuangAni = new DBComponent("sdxl_freegame_guang");
            this.touchGuangAni.bottom = 230;
            this.touchGuangAni.horizontalCenter = 80;
            this.ygAni.touchEnabled = this.xlnAni.touchEnabled = false;
            game.SDXLUtils.scene = 3;
            this.ygImag.visible = this.xlnImag.visible = true;
            egret.Tween.get(this.xlnImag).to({ right: 0 }, 2000);
            egret.Tween.get(this.ygImag).to({ left: 70 }, 2000).call(function () {
                _this.ygImag.visible = _this.xlnImag.visible = false;
                _this.touchGuangAni.play("sdxl_freegame_guang", 1);
                _this.resizeGroup.addChild(_this.sakuraFlow);
                _this.ygAni.visible = _this.xlnAni.visible = true;
                _this.resizeGroup.addChild(_this.xlnAni);
                _this.resizeGroup.addChild(_this.ygAni);
                _this.ygAni.resetPosition();
                _this.xlnAni.resetPosition();
                _this.xlnAni.play("sdxl_xln", 0);
                _this.ygAni.play("sdxl_yg", 0);
                _this.resizeGroup.addChild(_this.touchGuangAni);
                _this.resizeGroup.addChild(_this.sakuraFlowHead);
                egret.setTimeout(function () {
                    _this.selectGroup.visible = true;
                    _this.freeGroup5.visible = _this.freeGroup10.visible = _this.freeGroup15.visible = _this.freeGroup20.visible = true;
                    _this.resizeGroup.addChild(_this.selectGroup);
                    // SoundManager.getInstance().playEffect("sdxl_scatin_dntg_mp3");
                    if (game.LaohuUtils.free_time_times) {
                        switch (game.LaohuUtils.free_time_times + "") {
                            case "20":
                                _this.selectFreeBonus(0);
                                break;
                            case "15":
                                _this.selectFreeBonus(1);
                                break;
                            case "10":
                                _this.selectFreeBonus(2);
                                break;
                            case "5":
                                _this.selectFreeBonus(3);
                                break;
                        }
                    }
                }, _this, 1500);
            });
        };
        /**
        * @param  {} name
        * 创建big名的花瓣动画
        */
        SDXLGameScene3.prototype.createsdLeftGold = function (name, effectname) {
            var sakura = ObjectPool.produce(name, null);
            if (!sakura) {
                sakura = new DBComponent(effectname);
                sakura.scaleY = 1;
                sakura.scaleX = 1;
            }
            sakura.callback = function () {
                game.UIUtils.removeSelf(sakura);
                ObjectPool.reclaim(name, sakura);
            };
            sakura.play("big_sakura", 1);
            sakura.x = Math.ceil(Math.random() * 1280);
            sakura.y = Math.ceil(Math.random() * 200);
            sakura.touchEnabled = false;
            sakura.touchChildren = false;
            return sakura;
        };
        /**
       * @param  {} name
       * 创建mid名的花瓣动画
       */
        SDXLGameScene3.prototype.createMidSakura = function (name, effectname) {
            var sakura = ObjectPool.produce(name, null);
            if (!sakura) {
                sakura = new DBComponent(effectname);
                sakura.scaleY = 1;
                sakura.scaleX = 1;
            }
            sakura.callback = function () {
                game.UIUtils.removeSelf(sakura);
                ObjectPool.reclaim(name, sakura);
            };
            sakura.play("mid_sakura", 1);
            sakura.x = Math.ceil(Math.random() * 1280);
            sakura.y = Math.ceil(Math.random() * 200);
            sakura.touchEnabled = false;
            sakura.touchChildren = false;
            return sakura;
        };
        /**
       * @param  {} name
       * 创建small名的花瓣动画
       */
        SDXLGameScene3.prototype.createSmallSakura = function (name, effectname) {
            var sakura = ObjectPool.produce(name, null);
            if (!sakura) {
                sakura = new DBComponent(effectname);
                sakura.scaleY = 1;
                sakura.scaleX = 1;
            }
            sakura.callback = function () {
                game.UIUtils.removeSelf(sakura);
                ObjectPool.reclaim(name, sakura);
            };
            sakura.play("small_sakura", 1);
            sakura.x = Math.ceil(Math.random() * 1280);
            sakura.y = Math.ceil(Math.random() * 200);
            sakura.touchEnabled = false;
            sakura.touchChildren = false;
            return sakura;
        };
        /**
         * 后置花瓣飘落
         */
        SDXLGameScene3.prototype.addSakuraDown = function () {
            var _this = this;
            this.sakuraFlow = new eui.Component();
            this.timer2 = egret.setInterval(function () {
                if (_this.sakuraFlow.numChildren < 15) {
                    var gold_right1 = _this.createsdLeftGold("back_sakura", "sdxl_sakura");
                    _this.sakuraFlow.addChild(gold_right1);
                    var gold_right2 = _this.createMidSakura("back_sakura", "sdxl_sakura");
                    _this.sakuraFlow.addChild(gold_right2);
                    var gold_right3 = _this.createSmallSakura("back_sakura", "sdxl_sakura");
                    _this.sakuraFlow.addChild(gold_right3);
                }
            }, this, 200);
        };
        /**
         * 前置花瓣飘落效果
         */
        SDXLGameScene3.prototype.addSakuraHeadDown = function () {
            var _this = this;
            this.sakuraFlowHead = new eui.Component();
            this.timer3 = egret.setInterval(function () {
                if (_this.sakuraFlowHead.numChildren < 15) {
                    var gold_right1 = _this.createsdLeftGold("head_sakura", "sdxl_sakura");
                    _this.sakuraFlowHead.addChild(gold_right1);
                    var gold_right2 = _this.createMidSakura("head_sakura", "sdxl_sakura");
                    _this.sakuraFlowHead.addChild(gold_right2);
                    var gold_right3 = _this.createSmallSakura("head_sakura", "sdxl_sakura");
                    _this.sakuraFlowHead.addChild(gold_right3);
                }
            }, this, 200);
        };
        /**
         * @param  {egret.TouchEvent} e
         */
        SDXLGameScene3.prototype.onTouchTap = function (e) {
            if (game.LaohuUtils.free_time_times != 0) {
                return;
            }
            switch (e.target) {
                case this.free20:
                    this.selectFreeBonus(0);
                    break;
                case this.free15:
                    this.selectFreeBonus(1);
                    break;
                case this.free10:
                    this.selectFreeBonus(2);
                    break;
                case this.free5:
                    this.selectFreeBonus(3);
                    break;
            }
        };
        /**
         * 选择免费游戏次数
         * @param  {number} times
         */
        SDXLGameScene3.prototype.selectFreeBonus = function (times) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.isSelect) return [3 /*break*/, 2];
                            SoundManager.getInstance().playEffect("sdxl_freegame3_dntg_mp3");
                            this.isSelect = true;
                            game.SDXLUtils.FreeTimeMul = [];
                            data2 = { "bonusIndex": times };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2)];
                        case 1:
                            resp = _a.sent();
                            this.freeTimes = resp.freeGameTimes;
                            game.LaohuUtils.freeTimes = this.freeTimes;
                            game.LaohuUtils.freeWin = 0;
                            this.freeTimeLabel.text = this.freeTimes + "";
                            for (i = 0; i < resp.freeGameMuls.length; i++) {
                                game.SDXLUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                            }
                            this.freeMul1.text = game.SDXLUtils.FreeTimeMul[0] + "";
                            this.freeMul2.text = game.SDXLUtils.FreeTimeMul[1] + "";
                            this.freeMul3.text = game.SDXLUtils.FreeTimeMul[2] + "";
                            switch (times) {
                                case 0:
                                    this.selectAni2.bottom = 125;
                                    this.selectAni2.horizontalCenter = -466;
                                    this.selectAni2.play("", 1);
                                    this.selectGroup.addChild(this.selectAni2);
                                    this.selectAni2.resetPosition();
                                    this.removeMouseOn();
                                    game.UIUtils.removeSelf(this.selectAni1);
                                    this.selectAni2.callback = function () {
                                        _this.freeGroup10.visible = _this.freeGroup15.visible = _this.freeGroup5.visible = false;
                                        egret.Tween.get(_this.freeGroup20).to({ x: 507 }, 500).call(function () {
                                            egret.Tween.get(_this.free20).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                                                egret.setTimeout(function () {
                                                    egret.Tween.get(_this.selectGroup).to({ y: 720 }, 1000).call(function () {
                                                        egret.setTimeout(function () {
                                                            _this.startFreeGame();
                                                        }, _this, 800);
                                                    });
                                                }, _this, 800);
                                            });
                                        });
                                    };
                                    break;
                                case 1:
                                    this.selectAni2.bottom = 125;
                                    this.selectAni2.horizontalCenter = -166;
                                    this.selectAni2.play("", 1);
                                    this.selectGroup.addChild(this.selectAni2);
                                    this.selectAni2.resetPosition();
                                    this.removeMouseOn();
                                    game.UIUtils.removeSelf(this.selectAni1);
                                    this.selectAni2.callback = function () {
                                        _this.freeGroup20.visible = _this.freeGroup10.visible = _this.freeGroup5.visible = false;
                                        egret.Tween.get(_this.freeGroup15).to({ x: 507 }, 500).call(function () {
                                            egret.Tween.get(_this.free15).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                                                egret.setTimeout(function () {
                                                    egret.Tween.get(_this.selectGroup).to({ y: 720 }, 1000).call(function () {
                                                        egret.setTimeout(function () {
                                                            _this.startFreeGame();
                                                        }, _this, 800);
                                                    });
                                                }, _this, 800);
                                            });
                                        });
                                    };
                                    break;
                                case 2:
                                    this.selectAni2.bottom = 125;
                                    this.selectAni2.horizontalCenter = 148;
                                    this.selectAni2.play("", 1);
                                    this.selectGroup.addChild(this.selectAni2);
                                    this.selectAni2.resetPosition();
                                    this.removeMouseOn();
                                    game.UIUtils.removeSelf(this.selectAni1);
                                    this.selectAni2.callback = function () {
                                        _this.freeGroup20.visible = _this.freeGroup15.visible = _this.freeGroup5.visible = false;
                                        egret.Tween.get(_this.freeGroup10).to({ x: 507 }, 500).call(function () {
                                            egret.Tween.get(_this.free10).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                                                egret.setTimeout(function () {
                                                    egret.Tween.get(_this.selectGroup).to({ y: 720 }, 1000).call(function () {
                                                        egret.setTimeout(function () {
                                                            _this.startFreeGame();
                                                        }, _this, 800);
                                                    });
                                                }, _this, 800);
                                            });
                                        });
                                    };
                                    break;
                                case 3:
                                    this.selectAni2.bottom = 125;
                                    this.selectAni2.horizontalCenter = 475;
                                    this.selectAni2.play("", 1);
                                    this.selectGroup.addChild(this.selectAni2);
                                    this.selectAni2.resetPosition();
                                    this.removeMouseOn();
                                    game.UIUtils.removeSelf(this.selectAni1);
                                    this.selectAni2.callback = function () {
                                        _this.freeGroup20.visible = _this.freeGroup15.visible = _this.freeGroup10.visible = false;
                                        egret.Tween.get(_this.freeGroup5).to({ x: 507 }, 500).call(function () {
                                            egret.Tween.get(_this.free5).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                                                egret.setTimeout(function () {
                                                    egret.Tween.get(_this.selectGroup).to({ y: 720 }, 1000).call(function () {
                                                        egret.setTimeout(function () {
                                                            _this.startFreeGame();
                                                        }, _this, 800);
                                                    });
                                                }, _this, 800);
                                            });
                                        });
                                    };
                                    break;
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 直接开始免费游戏
         */
        SDXLGameScene3.prototype.startFreeGame = function () {
            var _this = this;
            game.UIUtils.removeSelf(this.selectAni1);
            //是否为重连
            if (this.isReconnect) {
                this.freeGroup3.bottom = this.freeGroup3.top = 0;
                this.freeGroup3.visible = true;
                game.SDXLUtils.scene = 3;
                this.selectGroup.visible = false;
                this.ygAni.visible = this.xlnAni.visible = false;
                this.visible = true;
                this.winGroup.visible = true;
                this.freeMulGroup.visible = true;
                this.freeTimes = game.SDXLUtils.freeTimes;
                this.freeWin = game.SDXLUtils.freeWin;
                this.freeWinLabel.text = this.freeWin + "";
                game.UIUtils.removeSelf(this.sakuraFlowHead);
                this.freeGroup2.addChild(this.freeGroup3);
                this.freeMul1.text = game.SDXLUtils.FreeTimeMul[0] + "";
                this.freeMul2.text = game.SDXLUtils.FreeTimeMul[1] + "";
                this.freeMul3.text = game.SDXLUtils.FreeTimeMul[2] + "";
                if (game.SDXLUtils.freeWin) {
                    this.freeWin = game.SDXLUtils.freeWin;
                    this.freeWinLabel.text = game.SDXLUtils.freeWin + "";
                }
                else {
                    this.freeWin = 0;
                }
                egret.setTimeout(this.startFreeRun, this, 500);
            }
            else {
                game.SDXLUtils.scene = 3;
                this.selectGroup.visible = false;
                this.ygAni.visible = this.xlnAni.visible = false;
                this.ygImag.visible = this.xlnImag.visible = true;
                this.visible = true;
                this.freeTimes = game.LaohuUtils.freeTimes;
                this.freeWin = game.LaohuUtils.freeWin;
                this.freeWinLabel.text = this.freeWin + "";
                this.sakuraFlowHead.removeChildren();
                game.UIUtils.removeSelf(this.sakuraFlowHead);
                ObjectPool.cancelPool("head_sakura");
                this.freeGroup2.addChild(this.sakuraFlow);
                this.freeGroup2.addChild(this.freeGroup3);
                egret.Tween.get(this.ygImag).to({ left: -628 }, 800);
                egret.Tween.get(this.xlnImag).to({ right: -739 }, 800).call(function () {
                    egret.Tween.get(_this.freeGroup3).to({ bottom: 0, top: 0 }, 1000).call(function () {
                        _this.freeGroup3.visible = true;
                        _this.winGroup.visible = true;
                        _this.freeMulGroup.visible = true;
                        egret.setTimeout(_this.startFreeRun, _this, 500);
                    });
                });
            }
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            SoundManager.getInstance().playMusic("sdxl_freespinbackground_mus_dntg_mp3");
        };
        /**
         * 移除上次转动展示动画
         */
        SDXLGameScene3.prototype.removeLastAni = function () {
            if (this.winGold > 0) {
                game.UIUtils.removeSelf(this.commomScore);
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        };
        SDXLGameScene3.prototype.startFreeRun = function () {
            var _this = this;
            if (!this.isSendMessage) {
                this.removeLastAni();
                if (this.freeTimes <= 0) {
                    this.freeTimeLabel.text = 0 + "";
                    LogUtils.logD(this.freeTimes + "   freetime");
                    this.showTotalwin();
                    return;
                }
                this.isSendMessage = true;
                this.freeTimes -= 1;
                this.freeTimeLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("reel_dntg_mp3");
                    _this.scroller.run();
                    _this.messageSend();
                    egret.setTimeout(function () { _this.isSendMessage = false; }, _this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        };
        /**
         * 发送c_bet消息
         */
        SDXLGameScene3.prototype.messageSend = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data2, resp2, text, resp1, i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showAtr = [];
                            this.bonusAtr = [];
                            this.winGold = 0;
                            data2 = { "spinType": 1, "bet": game.SDXLUtils.bet, "multiple": game.SDXLUtils.mul, "lineCount": 243, "activityId": 0 };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2)];
                        case 1:
                            resp2 = _a.sent();
                            if (resp2.error) {
                                text = resp2.error.msg;
                                Global.alertMediator.addAlert(text, "", "", true);
                                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                                CF.sN(SceneNotify.CLOSE_SDXL);
                                SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                                return [2 /*return*/];
                            }
                            resp1 = resp2.spinRes[0];
                            if (resp1.rmIndex) {
                                for (i in resp1.rmIndex) {
                                    this.bonusAtr.push(resp1.rmIndex[i]);
                                }
                            }
                            else {
                                this.bonusAtr = [];
                            }
                            this.winGold = resp2.winCount;
                            this.freeMulIndex = resp1.freeMulIndex;
                            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
                            this.freeWin += this.winGold;
                            game.SDXLUtils.ToTalMoney = resp2.own_gold;
                            egret.setTimeout(function () {
                                _this.scroller.runResult(_this.showAtr);
                                if (_this.isFastGame) {
                                    _this.scroller.runResultFast();
                                }
                            }, this, 300);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @param  {egret.Event} e
         * 转轴转动结束
         */
        SDXLGameScene3.prototype.scrollerEnd = function (e) {
            var _this = this;
            var data = e.data;
            if (data.sceneIndex != 3) {
                return;
            }
            var index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().stopEffectByName("sdxl_reel_mp3");
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    if (this.winGold > 0) {
                        if (this.winGold < (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 15) {
                            if (!Global.runBack) {
                                egret.setTimeout(function () { game.UIUtils.removeSelf(_this.commomScore); _this.removeLastAni(); }, this, 1600);
                            }
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.startFreeRun, this, 2000);
                    }
                    else {
                        this.freeGameTimeOut = egret.setTimeout(this.startFreeRun, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freeWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("sdxl_reelstop1_dntg_mp3");
                    break;
            }
        };
        /**
         * 免费游戏中奖连线
         */
        SDXLGameScene3.prototype.addFreeBonusAni = function () {
            var _this = this;
            if (this.winGold >= (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 15) {
                egret.clearTimeout(this.freeGameTimeOut);
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    var func_1 = function () {
                        if (!_this.bigWinPanel.touchEnabled)
                            return;
                        _this.bigWinPanel.touchEnabled = false;
                        _this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                        /**
                         * bigwin结束窗口效果
                         */
                        _this.bigWinPanel.stopShowBigWin(function () {
                            _this.scroller.stopIconDb();
                            _this.scroller.setIconHui();
                            _this.scroller.removeIconHui(_this.bonusAtr);
                            _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                            egret.clearTimeout(_this.freeGameTimeOut);
                            _this.freeGameTimeOut = egret.setTimeout(function () {
                                _this.startFreeRun();
                            }, _this, 2000);
                        });
                    };
                    this.bigWinPanel = new sdxl.SDXLBigWinGroup();
                    this.bigWinPanel.showPanel();
                    this.bigWinPanel.touchEnabled = false;
                    egret.setTimeout(function () {
                        _this.bigWinPanel.touchEnabled = true;
                        _this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func_1, _this);
                    }, this, 1500);
                    /**
                     * bigwin窗口
                     * @param score,callback?
                     */
                    this.bigWinPanel.showScore(this.winGold, function () {
                        _this.scroller.setIconHui();
                        _this.scroller.removeIconHui(_this.bonusAtr);
                        _this.scroller.addBonusAni(_this.bonusAtr, _this.winGold);
                        _this.freeGameTimeOut = egret.setTimeout(_this.startFreeRun, _this, 1710);
                        game.UIUtils.removeSelf(_this.bigWinPanel);
                    });
                    this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func_1, this);
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            else {
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    SoundManager.getInstance().playEffect("sdxl_win_dntg_mp3");
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.bonusAtr);
                    this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                    this.commomScore = new eui.BitmapLabel();
                    this.commomScore.font = "sdxl_wingold_fnt";
                    var data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.scroller.addChild(this.commomScore);
                }
                // }
            }
            if (this.winGold > 0) {
                if (this.freeMulIndex == 0) {
                    this.FreeMulAni.horizontalCenter = -140;
                    this.FreeMulAni.play("", 1);
                    this.FreeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.FreeMulAni);
                    };
                    this.freeMulGroup.addChild(this.FreeMulAni);
                    this.FreeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.bei_1);
                    this.freeMulGroup.addChild(this.freeMul1);
                    egret.Tween.get(this.bei_1).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul1).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
                else if (this.freeMulIndex == 1) {
                    this.FreeMulAni.horizontalCenter = 30;
                    this.FreeMulAni.play("", 1);
                    this.FreeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.FreeMulAni);
                    };
                    this.freeMulGroup.addChild(this.FreeMulAni);
                    this.FreeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.bei_2);
                    this.freeMulGroup.addChild(this.freeMul2);
                    egret.Tween.get(this.bei_2).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul2).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
                else if (this.freeMulIndex == 2) {
                    this.FreeMulAni.horizontalCenter = 160;
                    this.FreeMulAni.play("", 1);
                    this.FreeMulAni.callback = function () {
                        game.UIUtils.removeSelf(_this.FreeMulAni);
                    };
                    this.freeMulGroup.addChild(this.FreeMulAni);
                    this.FreeMulAni.resetPosition();
                    this.freeMulGroup.addChild(this.bei_3);
                    this.freeMulGroup.addChild(this.freeMul3);
                    egret.Tween.get(this.bei_3).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                    egret.Tween.get(this.freeMul3).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 300);
                }
            }
        };
        /**
         * 免费游戏结束进入普通游戏
         */
        SDXLGameScene3.prototype.showTotalwin = function () {
            var _this = this;
            //场景初始化
            this.freeBg2.visible = this.scroller.visible = true;
            game.UIUtils.removeSelf(this.xlnAni);
            game.UIUtils.removeSelf(this.ygAni);
            this.winPanel.visible = true;
            this.addMouseOn();
            this.freeGroup3.visible = false;
            this.freeGroup3.bottom = this.freeGroup3.top = 720;
            this.selectGroup.y = 358;
            this.isSendMessage = false;
            this.ygImag.left = -628;
            this.xlnImag.right = -739;
            this.free5.scaleX = this.free5.scaleY = this.free10.scaleX = this.free10.scaleY = this.free15.scaleX = this.free15.scaleY = this.free20.scaleX = this.free20.scaleY = 1;
            this.freeGroup5.x = 984;
            this.freeGroup10.x = 654;
            this.freeGroup15.x = 350;
            this.freeGroup20.x = 42;
            this.isSelect = false;
            this.free5.touchEnabled = this.free10.touchEnabled = this.free15.touchEnabled = this.free20.touchEnabled = true;
            //创建bigwin窗口
            SoundManager.getInstance().playEffect("sdxl_scatwin_dntg_mp3");
            //创建窗口遮罩
            this.winNum.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            game.SDXLUtils.freeWin = this.freeWin;
            //发送退出免费游戏消息
            egret.setTimeout(function () {
                if (!_this.isReconnect) {
                    egret.clearInterval(_this.timer2);
                    egret.clearInterval(_this.timer3);
                    _this.sakuraFlow.removeChildren();
                }
                _this.isReconnect = true;
                _this.freeWin = 0;
                _this.winPanel.visible = false;
                game.UIUtils.removeSelf(_this.sakuraFlow);
                ObjectPool.cancelPool("back_sakura");
                CF.dP(ENo.SDXL_QUIT_FREE_GAME);
            }, this, 2500);
        };
        SDXLGameScene3.prototype.askAutoGame = function () {
            var _this = this;
            var slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            if (this.isFastGame) {
                egret.clearTimeout(this.freeGameTimeOut);
            }
            var func = function () {
                // CF.sN(this.AUTOGAME_NOTIFY);
                _this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("sdxl_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
            };
            var func2 = function () {
                _this.freeGameTimeOut = egret.setTimeout(function () {
                    SoundManager.getInstance().playEffect("sdxl_reel_mp3", true);
                    _this.scroller.run();
                    _this.messageSend();
                }, _this, 500);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            };
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        };
        return SDXLGameScene3;
    }(game.BaseComponent));
    sdxl.SDXLGameScene3 = SDXLGameScene3;
    __reflect(SDXLGameScene3.prototype, "sdxl.SDXLGameScene3");
})(sdxl || (sdxl = {}));
