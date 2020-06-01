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
var cbzz;
(function (cbzz) {
    var CBZZBigwinGroup = (function (_super) {
        __extends(CBZZBigwinGroup, _super);
        function CBZZBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "CBZZBigwinSkin";
            return _this;
        }
        CBZZBigwinGroup.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        CBZZBigwinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        CBZZBigwinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        CBZZBigwinGroup.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bgAni = DBComponent.create("cb_bigwinbgani", "cbzz_bigwintitle");
            this.titleChangeAni = DBComponent.create("cb_titleani", "dntg_bigwin_guang");
            this.megawinAni = DBComponent.create("cb_megawin", "cbzz_megawinani");
            this.superwinAni = DBComponent.create("cb_superwin", "cbzz_superwwinani");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            this.superwinAni.play("", 0);
            this.superwinAni.horizontalCenter = 0;
            this.superwinAni.bottom = 445;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.CBZZUtils.bet * game.CBZZUtils.mul * 50 * 15 && num < game.CBZZUtils.bet * game.CBZZUtils.mul * 50 * 30) {
                    index1 = num / 244;
                    time = 8000;
                }
                else if (num >= (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 30 && num < (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 50) {
                    index1 = 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) / 244;
                    index2 = (num - 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) / 305;
                    time = 18000;
                }
                else if (num >= (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 50) {
                    index1 = 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) / 244;
                    index2 = 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) / 305;
                    index3 = (num - 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) / 305;
                    time = 28000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                _this.winImag.alpha = _this.winNum.alpha = 1;
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                SoundManager.getInstance().playEffect("cbzz_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("cbzz_winchangemp3_mp3");
                // SoundManager.getInstance().playEffect("cbzz_bigwin_mus1_mp3",true);
                _this.effectGroup.visible = true;
                _this.bgAni.play("cbzz_bigwintitle1", 0);
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = -200;
                _this.effectGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                _this.titleChangeAni.horizontalCenter = 0;
                _this.titleChangeAni.bottom = 300;
                _this.maskRect.fillAlpha = 0.7;
                _this.addGoldDown();
                _this.bigwinPanel.visible = true;
                _this.bigwinPanel.horizontalCenter = 0;
                _this.winImag.source = RES.getRes("cbzz_bigwin_png");
                game.CBZZUtils.bigwinAni1.play("", 0);
                game.CBZZUtils.bigwinAni1.horizontalCenter = 0;
                game.CBZZUtils.bigwinAni1.bottom = -350;
                _this.resizeGroup.addChild(game.CBZZUtils.bigwinAni1);
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.winImag);
                _this.resizeGroup.addChild(_this.titleChangeAni);
                _this.titleChangeAni.resetPosition();
                game.CBZZUtils.bigwinAni1.resetPosition();
                game.CBZZUtils.bigwinAni1.touchEnabled = false;
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                });
            }, this, 1200);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = RES.getRes("cbzz_bigwin_png");
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) && _this.testscore >= 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 300;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.megawinAni.play("", 0);
                        _this.megawinAni.horizontalCenter = 0;
                        _this.megawinAni.bottom = 455;
                        _this.resizeGroup.addChild(_this.megawinAni);
                        _this.megawinAni.resetPosition();
                        _this.winImag.source = RES.getRes("cbzz_megawin_png");
                        SoundManager.getInstance().playEffect("cbzz_winchangemp3_mp3");
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50);
                    }
                    is_mega = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore >= 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 300;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        SoundManager.getInstance().playEffect("cbzz_winchangemp3_mp3");
                        _this.winImag.source = RES.getRes("cbzz_superwin_png");
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.resizeGroup.addChild(_this.superwinAni);
                            _this.superwinAni.resetPosition();
                        });
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("cbzz_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("cbzz_bigwincomboend_mp3");
                    // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                    _this.timer1.stop();
                    _this.bgAni.play("cbzz_bigwintitle2", 1);
                    _this.bgAni.horizontalCenter = 0;
                    _this.bgAni.bottom = -200;
                    _this.effectGroup.addChild(_this.bgAni);
                    _this.bgAni.resetPosition();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    _this.bigwinPanel.visible = false;
                    game.UIUtils.removeSelf(game.CBZZUtils.bigwinAni1);
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("cbzz_megawin_png");
                        });
                    }
                    if (num == 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("cbzz_superwin_png");
                        });
                    }
                    if (num >= 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                        _this.winImag.source = RES.getRes("cbzz_megawin_png");
                    }
                    if (num >= 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                        _this.winImag.source = RES.getRes("cbzz_superwin_png");
                    }
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        CBZZBigwinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("cbzz_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("cbzz_bigwincomboend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                game.UIUtils.removeSelf(game.CBZZUtils.bigwinAni1);
                this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = this.winNum.alpha = 1;
                game.UIUtils.removeSelf(this.megawinAni);
                game.UIUtils.removeSelf(this.superwinAni);
                if (this.score == 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("cbzz_megawin_png");
                    });
                }
                if (this.score == 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("cbzz_superwin_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                this.bgAni.play("cbzz_bigwintitle2", 1);
                this.bgAni.horizontalCenter = 0;
                this.bgAni.bottom = -200;
                this.effectGroup.addChild(this.bgAni);
                this.bgAni.resetPosition();
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                    // this.resizeGroup.addChild(this.megawinAni);
                    // this.megawinAni.resetPosition();
                    this.winImag.source = RES.getRes("cbzz_megawin_png");
                }
                if (this.score >= 50 * (game.CBZZUtils.bet * game.CBZZUtils.mul * 50)) {
                    // game.UIUtils.removeSelf(this.megawinAni);
                    // this.resizeGroup.addChild(this.superwinAni);
                    // this.superwinAni.resetPosition();
                    this.winImag.source = RES.getRes("cbzz_superwin_png");
                }
            }
        };
        CBZZBigwinGroup.prototype.addGoldDown = function () {
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
        CBZZBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(_this.megawinAni);
                game.UIUtils.removeSelf(_this.superwinAni);
                SoundManager.getInstance().stopEffectByName("cbzz_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("cbzz_bigwincomboend_mp3");
                game.UIUtils.removeSelf(_this.bgAni);
                game.UIUtils.removeSelf(_this.titleChangeAni);
                //恢复背景音乐      
                _this.maskRect.fillAlpha = 0;
                _this.winImag.alpha = _this.winNum.alpha = 0;
                _this.winNum.text = "0";
                _this.testscore = 0;
                callback && callback();
                _this.removeChildren();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this, 5000);
        };
        return CBZZBigwinGroup;
    }(game.BaseComponent));
    cbzz.CBZZBigwinGroup = CBZZBigwinGroup;
    __reflect(CBZZBigwinGroup.prototype, "cbzz.CBZZBigwinGroup");
})(cbzz || (cbzz = {}));
