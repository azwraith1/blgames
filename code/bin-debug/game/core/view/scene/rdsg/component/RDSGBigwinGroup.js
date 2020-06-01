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
// TypeScript file
var rdsg;
(function (rdsg) {
    var RDSGBigwinGroup = (function (_super) {
        __extends(RDSGBigwinGroup, _super);
        function RDSGBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "RDSGBigwinSkin";
            return _this;
        }
        RDSGBigwinGroup.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        RDSGBigwinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        RDSGBigwinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        RDSGBigwinGroup.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bgAni = DBComponent.create("rdsg_bigwinbgani", "rdsg_bigwin1");
            this.titleChangeAni = DBComponent.create("rdsg_titleani", "dntg_bigwin_guang");
            this.megawinAni = DBComponent.create("rdsg_megawin", "rdsg_mega");
            this.superwinAni = DBComponent.create("rdsg_superwin", "rdsg_super");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.RDSGUtils.bet * 2 * 15 && num < game.RDSGUtils.bet * 2 * 30) {
                    index1 = num / 244;
                    time = 8000;
                }
                else if (num >= (game.RDSGUtils.bet * 2) * 30 && num < (game.RDSGUtils.bet * 2) * 50) {
                    index1 = 30 * (game.RDSGUtils.bet * 2) / 244;
                    index2 = (num - 30 * (game.RDSGUtils.bet * 2)) / 305;
                    time = 18000;
                }
                else if (num >= (game.RDSGUtils.bet * 2) * 50) {
                    index1 = 30 * (game.RDSGUtils.bet * 2) / 244;
                    index2 = 50 * (game.RDSGUtils.bet * 2) / 305;
                    index3 = (num - 50 * (game.RDSGUtils.bet * 2)) / 305;
                    time = 28000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                _this.bigwinbg.alpha = _this.winNum.alpha = _this.winImag.alpha = 1;
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                SoundManager.getInstance().playEffect("rdsg_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("rdsg_bigwinend_mp3");
                // SoundManager.getInstance().playEffect("cbzz_bigwin_mus1_mp3",true);
                _this.effectGroup.visible = true;
                _this.bgAni.play("", 0);
                _this.bgAni.horizontalCenter = 6;
                _this.bgAni.bottom = 93;
                _this.effectGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                _this.titleChangeAni.horizontalCenter = 0;
                _this.titleChangeAni.bottom = 300;
                _this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                _this.bigwinPanel.visible = true;
                _this.bigwinPanel.horizontalCenter = 0;
                // game.RDSGUtils.bigwinAni1.play("", 0);
                // game.RDSGUtils.bigwinAni1.horizontalCenter = 0;
                // game.RDSGUtils.bigwinAni1.bottom = -350;
                // this.resizeGroup.addChild(game.RDSGUtils.bigwinAni1);
                _this.resizeGroup.addChild(_this.bigwinbg);
                _this.resizeGroup.addChild(_this.effectGroup);
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.winImag);
                _this.resizeGroup.addChild(_this.bigwinImagGroup);
                _this.resizeGroup.addChild(_this.titleChangeAni);
                _this.titleChangeAni.resetPosition();
                // game.RDSGUtils.bigwinAni1.resetPosition();
                // game.RDSGUtils.bigwinAni1.touchEnabled = false;
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                });
            }, this, 1200);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.RDSGUtils.bet * 2) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = "rdsg_bigwin_imag_png";
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.RDSGUtils.bet * 2) && _this.testscore >= 30 * (game.RDSGUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 300;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.winImag.source = "rdsg_megawin_imag_png";
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.megawinAni.play("", 0);
                            _this.megawinAni.horizontalCenter = 0;
                            _this.megawinAni.bottom = 431;
                            _this.resizeGroup.addChild(_this.megawinAni);
                            _this.megawinAni.resetPosition();
                        });
                        SoundManager.getInstance().playEffect("cbzz_winchangemp3_mp3");
                    }
                    is_mega = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore >= 50 * (game.RDSGUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 431;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        SoundManager.getInstance().playEffect("cbzz_winchangemp3_mp3");
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.superwinAni.play("", 0);
                            _this.superwinAni.horizontalCenter = 0;
                            _this.superwinAni.bottom = 431;
                            _this.resizeGroup.addChild(_this.superwinAni);
                            _this.superwinAni.resetPosition();
                        });
                        _this.winImag.source = "rdsg_superwin_imag_png";
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("rdsg_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("rdsg_bigwinend_mp3");
                    // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                    _this.timer1.stop();
                    _this.bgAni.play("", 0);
                    _this.bgAni.horizontalCenter = 6;
                    _this.bgAni.bottom = 93;
                    _this.effectGroup.addChild(_this.bgAni);
                    _this.bgAni.resetPosition();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    _this.bigwinPanel.visible = false;
                    // game.UIUtils.removeSelf(game.RDSGUtils.bigwinAni1);
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.RDSGUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("rdsg_megawin_imag_png");
                        });
                    }
                    if (num == 50 * (game.RDSGUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("rdsg_superwin_imag_png");
                        });
                    }
                    if (num >= 30 * (game.RDSGUtils.bet * 2)) {
                        _this.winImag.source = "rdsg_megawin_imag_png";
                    }
                    if (num >= 50 * (game.RDSGUtils.bet * 2)) {
                        _this.winImag.source = "rdsg_superwin_imag_png";
                    }
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        RDSGBigwinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("rdsg_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("rdsg_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                // game.UIUtils.removeSelf(game.RDSGUtils.bigwinAni1);
                this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1;
                this.bigwinbg.alpha = this.winNum.alpha = 1;
                // game.UIUtils.removeSelf(this.megawinAni);
                // game.UIUtils.removeSelf(this.superwinAni);
                if (this.score == 30 * (game.RDSGUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("rdsg_megawin_imag_png");
                    });
                }
                if (this.score == 50 * (game.RDSGUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("rdsg_superwin_imag_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                this.bgAni.play("", 0);
                this.bgAni.horizontalCenter = 6;
                this.bgAni.bottom = 93;
                this.effectGroup.addChild(this.bgAni);
                this.bgAni.resetPosition();
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.RDSGUtils.bet * 2)) {
                    this.winImag.source = "rdsg_megawin_imag_png";
                }
                if (this.score >= 50 * (game.RDSGUtils.bet * 2)) {
                    this.winImag.source = "rdsg_superwin_imag_png";
                }
            }
        };
        RDSGBigwinGroup.prototype.addGoldDown = function () {
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
        RDSGBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                // game.UIUtils.removeSelf(this.megawinAni);
                // game.UIUtils.removeSelf(this.superwinAni);
                SoundManager.getInstance().stopEffectByName("rdsg_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("rdsg_bigwinend_mp3");
                game.UIUtils.removeSelf(_this.bgAni);
                game.UIUtils.removeSelf(_this.titleChangeAni);
                //恢复背景音乐      
                _this.maskRect.fillAlpha = 0;
                _this.bigwinbg.alpha = _this.winNum.alpha = 0;
                _this.winImag.alpha = 0;
                _this.winNum.text = "0";
                _this.testscore = 0;
                callback && callback();
                _this.removeChildren();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this, 5000);
        };
        return RDSGBigwinGroup;
    }(game.BaseComponent));
    rdsg.RDSGBigwinGroup = RDSGBigwinGroup;
    __reflect(RDSGBigwinGroup.prototype, "rdsg.RDSGBigwinGroup");
})(rdsg || (rdsg = {}));
