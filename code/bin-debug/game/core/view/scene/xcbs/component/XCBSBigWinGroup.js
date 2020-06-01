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
var xcbs;
(function (xcbs) {
    var XCBSBigwinGroup = (function (_super) {
        __extends(XCBSBigwinGroup, _super);
        function XCBSBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "XCBSBigwinGroup";
            return _this;
        }
        XCBSBigwinGroup.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        XCBSBigwinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        XCBSBigwinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        XCBSBigwinGroup.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bgAni = DBComponent.create("xcbs_bigwin_bg", "xcbs_bigwin_2");
            // this.bigwinAni = DBComponent.create("xcbs_bigwin_1_ske", "xcbs_bigwin_1");
            // this.megawinAni = DBComponent.create("xcbs_megawin_1_ske", "xcbs_megawin_1");
            // this.superwinAni = DBComponent.create("xcbs_superwin_1_ske", "xcbs_superwin_1");
            this.titleChangeAni = DBComponent.create("xcbs_winboom", "xcbs_winboom");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            // this.superwinAni.play("", 0);
            // this.superwinAni.horizontalCenter = 0;
            // this.superwinAni.bottom = 445;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15 && num < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 30) {
                    index1 = num / 335;
                    time = 11000;
                }
                else if (num >= ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 30 && num < ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 50) {
                    index1 = 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index2 = (num - 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) / 335;
                    time = 22000;
                }
                else if (num >= ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 50) {
                    index1 = 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index2 = 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index3 = (num - 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) / 365;
                    time = 34000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("xcbs_bigwincombo_mp3", true);
                _this.winImag.alpha = _this.winNum.alpha = 1;
                // this.bigwinAni.play("", 0);
                // this.bigwinAni.horizontalCenter = 0;
                // this.bigwinAni.bottom = 433;
                // this.effectGroup1.addChild(this.bigwinAni);
                // this.bigwinAni.resetPosition();
                _this.titleChangeAni.play("", 1);
                _this.titleChangeAni.horizontalCenter = 0;
                _this.titleChangeAni.bottom = 0;
                _this.resizeGroup.addChild(_this.titleChangeAni);
                _this.titleChangeAni.resetPosition();
                _this.bgAni.play("", 0);
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = -300;
                _this.bgAni.touchEnabled = false;
                _this.effectGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                // egret.Tween.get(this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
                _this.effectGroup.visible = true;
                _this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                _this.bigwinPanel.visible = true;
                _this.bigwinPanel.horizontalCenter = 0;
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.effectGroup);
                _this.resizeGroup.addChild(_this.winImag);
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.effectGroup1);
                _this.resizeGroup.addChild(_this.bigwinImagGroup);
                SoundManager.getInstance().pauseMusic();
            }, this, 800);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = "xcbs_bigwin1_png";
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && _this.testscore >= 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.titleChangeAni.play("", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 0;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.winImag.source = "xcbs_bigwin2_png";
                        _this.bgAni = DBComponent.create("xcbs_megawin_2", "xcbs_megawin_2");
                        _this.bgAni.play("", 0);
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            // game.UIUtils.removeSelf(this.bigwinAni);
                            // this.megawinAni.play("", 0);
                            // this.megawinAni.horizontalCenter = 0;
                            // this.megawinAni.bottom = 433;
                            // this.effectGroup1.addChild(this.megawinAni);
                            // this.megawinAni.resetPosition();
                        });
                    }
                    is_mega = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore >= 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        // game.UIUtils.removeSelf(this.megawinAni);
                        _this.titleChangeAni.play("", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 0;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.bgAni = DBComponent.create("xcbs_superwin_2", "xcbs_superwin_2");
                        _this.bgAni.play("", 0);
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            // this.superwinAni.play("", 0);
                            // this.superwinAni.horizontalCenter = 0;
                            // this.superwinAni.bottom = 433;
                            // this.effectGroup1.addChild(this.superwinAni);
                            // this.superwinAni.resetPosition();
                        });
                        _this.winImag.source = "xcbs_bigwin3_png";
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("xcbs_bigwinend_mp3");
                    _this.timer1.stop();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backInOut);
                    _this.bigwinPanel.visible = false;
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        XCBSBigwinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("xcbs_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                this.maskRect.fillAlpha = 0.7;
                this.winNum.alpha = 1;
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) {
                    // game.UIUtils.removeSelf(this.bigwinAni);
                    this.winImag.source = RES.getRes("xcbs_bigwin2_png");
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.bgAni = DBComponent.create("xcbs_megawin_2", "xcbs_megawin_2");
                        _this.bgAni.play("", 0);
                        // this.megawinAni.play("", 0);
                        // this.megawinAni.horizontalCenter = 0;
                        // this.megawinAni.bottom = 390;
                        // this.effectGroup1.addChild(this.megawinAni);
                        // this.megawinAni.resetPosition();
                    });
                }
                if (this.score >= 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) {
                    this.winImag.source = RES.getRes("xcbs_bigwin3_png");
                    // game.UIUtils.removeSelf(this.megawinAni);
                    // game.UIUtils.removeSelf(this.bigwinAni);
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.bgAni = DBComponent.create("xcbs_superwin_2", "xcbs_superwin_2");
                        _this.bgAni.play("", 0);
                        // this.superwinAni.play("", 0);
                        // this.superwinAni.horizontalCenter = 0;
                        // this.superwinAni.bottom = 394;
                        // this.effectGroup1.addChild(this.superwinAni);
                        // this.superwinAni.resetPosition();
                    });
                }
            }
        };
        XCBSBigwinGroup.prototype.addGoldDown = function () {
            var _this = this;
            this.timer2 = egret.setInterval(function () {
                if (_this.bigwinPanel.numChildren < 30) {
                    var gold_right1 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right1");
                    _this.bigwinPanel.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right2");
                    _this.bigwinPanel.addChild(gold_right2);
                    var gold_left1 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left1");
                    _this.bigwinPanel.addChild(gold_left1);
                    var gold_left2 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left2");
                    _this.bigwinPanel.addChild(gold_left2);
                }
            }, this, 300);
        };
        /**
        * 移除bigwin窗口
        * @param  {Function} callback?
        */
        XCBSBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_bigwinend_mp3");
                // game.UIUtils.removeSelf(this.bigwinAni);
                // game.UIUtils.removeSelf(this.megawinAni);
                // game.UIUtils.removeSelf(this.superwinAni);
                game.UIUtils.removeSelf(_this.bgAni);
                //恢复背景音乐      
                _this.maskRect.fillAlpha = 0;
                _this.winNum.alpha = 0;
                _this.winNum.text = "0";
                _this.testscore = 0;
                callback && callback();
                _this.removeChildren();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this, 5000);
        };
        return XCBSBigwinGroup;
    }(game.BaseComponent));
    xcbs.XCBSBigwinGroup = XCBSBigwinGroup;
    __reflect(XCBSBigwinGroup.prototype, "xcbs.XCBSBigwinGroup");
})(xcbs || (xcbs = {}));
