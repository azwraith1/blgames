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
/*
 * @Author: real MC Lee
 * @Date: 2019-05-31 17:46:05
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-10 17:48:17
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNBigwinPanel = (function (_super) {
        __extends(SDMNBigwinPanel, _super);
        // public bgAni2: DBComponent;
        function SDMNBigwinPanel() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "SDMNBigwinSkin";
            return _this;
        }
        SDMNBigwinPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        SDMNBigwinPanel.prototype.showScore = function (num, callback) {
            var _this = this;
            this.megawinAni = DBComponent.create("sdmn_megawin_ani", "sdmn_megawin_ani");
            this.superwinAni = DBComponent.create("sdmn_superwin_ani", "sdmn_superwin_ani");
            this.bgAni = DBComponent.create("sdmn_bgani", "sdmn_bigwin1");
            // this.bgAni2 = DBComponent.create("sdmn_bgani2", "sdmn_bigwin2");
            this.titleChangeAni = DBComponent.create("sdmn_titleChange_ani", "dntg_bigwin_guang");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            this.superwinAni.horizontalCenter = 0;
            this.superwinAni.bottom = 365;
            SoundManager.getInstance().playEffect("sdmn_bigwin_combo_mp3");
            SoundManager.getInstance().playEffect("sdmn_winchangemp3_mp3");
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 15 && num < game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30) {
                    index1 = num / (330 * (num / (game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30)));
                    time = 11000 * (num / (game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30));
                }
                else if (num >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 30 && num < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 330;
                    index2 = (num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / (336 * ((num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / ((game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 20)));
                    time = 11000 * (1 + ((num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / ((game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 20)));
                }
                else if (num >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 330;
                    index2 = 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 336;
                    index3 = (num - 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / 330;
                    time = 33000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                _this.winImag.alpha = _this.winNum.alpha = 1;
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                _this.effectGroup.visible = true;
                _this.bgAni.play("", 0);
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = -200;
                _this.initBgAni();
                _this.addGoldDown();
                _this.resizeGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                // this.bgAni2.play("", 0);
                // this.bgAni2.horizontalCenter = 0;
                // this.bgAni2.bottom = 0;
                // this.resizeGroup.addChild(this.bgAni2);
                // this.bgAni2.resetPosition();
                _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                _this.titleChangeAni.horizontalCenter = 0;
                _this.titleChangeAni.bottom = 300;
                _this.maskRect.fillAlpha = 0.7;
                _this.bigwinPanel.visible = true;
                _this.bigwinPanel.horizontalCenter = 0;
                _this.winImag.source = RES.getRes("sdmn_bigwin_ima_png");
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.winImag);
                _this.effectGroup.addChild(_this.titleChangeAni);
                _this.titleChangeAni.resetPosition();
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                });
            }, this, 1200);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = RES.getRes("sdmn_bigwin_ima_png");
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && _this.testscore >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 300;
                        _this.effectGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                        SoundManager.getInstance().playEffect("sdmn_winchangemp3_mp3");
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.megawinAni.play("", 0);
                            _this.megawinAni.horizontalCenter = 0;
                            _this.megawinAni.bottom = 397;
                            _this.resizeGroup.addChild(_this.megawinAni);
                            _this.megawinAni.resetPosition();
                        });
                    }
                    is_mega = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        _this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 300;
                        _this.effectGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        SoundManager.getInstance().playEffect("sdmn_winchangemp3_mp3");
                        _this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.superwinAni.play("", 0);
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
                    SoundManager.getInstance().stopEffectByName("sdmn_bigwin_combo_mp3");
                    SoundManager.getInstance().playEffect("sdmn_bigwin_comboend_mp3");
                    _this.timer1.stop();
                    _this.isTouched = true;
                    game.UIUtils.removeSelf(_this.bgAni);
                    // game.UIUtils.removeSelf(this.bgAni2);
                    game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    _this.bigwinPanel.visible = false;
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                        });
                    }
                    if (num == 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                        });
                    }
                    if (num >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        _this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                    }
                    if (num >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        _this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                    }
                }
            }, this);
        };
        SDMNBigwinPanel.prototype.initBgAni = function () {
            var _this = this;
            game.SDMNUtils.bgAni3.play("", 1);
            game.SDMNUtils.bgAni3.horizontalCenter = Math.floor(Math.random() * 1000) - 500;
            game.SDMNUtils.bgAni3.bottom = Math.floor(Math.random() * 700);
            game.SDMNUtils.bgAni3.scaleX = game.SDMNUtils.bgAni3.scaleY = 2;
            game.SDMNUtils.bgAni3.callback = function () {
                game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                return _this.initBgAni();
            };
            this.resizeGroup.addChild(game.SDMNUtils.bgAni3);
            game.SDMNUtils.bgAni3.resetPosition();
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        SDMNBigwinPanel.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (this.isTouched)
                return;
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("sdmn_bigwin_combo_mp3");
                SoundManager.getInstance().playEffect("sdmn_bigwin_comboend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = this.winNum.alpha = 1;
                game.UIUtils.removeSelf(this.megawinAni);
                game.UIUtils.removeSelf(this.superwinAni);
                if (this.score == 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                    });
                }
                if (this.score == 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                game.UIUtils.removeSelf(this.bgAni);
                // game.UIUtils.removeSelf(this.bgAni2);
                game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    // this.resizeGroup.addChild(ion();
                    this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                }
                if (this.score >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                }
            }
        };
        SDMNBigwinPanel.prototype.addGoldDown = function () {
            var _this = this;
            this.timer2 = egret.setInterval(function () {
                if (_this.bigwinPanel.numChildren < 20) {
                    var gold_right1 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin1");
                    _this.bigwinPanel.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin3");
                    _this.bigwinPanel.addChild(gold_right2);
                    var gold_left1 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin2");
                    _this.bigwinPanel.addChild(gold_left1);
                    var gold_left2 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin4");
                    _this.bigwinPanel.addChild(gold_left2);
                }
            }, this, 250);
        };
        /**
       * 移除bigwin窗口
       * @param  {Function} callback?
       */
        SDMNBigwinPanel.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdmn_bigwin_coin1");
            ObjectPool.cancelPool("sdmn_bigwin_coin2");
            ObjectPool.cancelPool("sdmn_bigwin_coin3");
            ObjectPool.cancelPool("sdmn_bigwin_coin4");
            this.bigwinPanel.removeChildren();
            game.UIUtils.removeSelf(this.bgAni);
            // game.UIUtils.removeSelf(this.bgAni2);
            game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
            egret.clearInterval(this.timer2);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(_this.megawinAni);
                game.UIUtils.removeSelf(_this.superwinAni);
                SoundManager.getInstance().stopEffectByName("sdmn_bigwin_combo_mp3");
                SoundManager.getInstance().stopEffectByName("sdmn_bigwin_comboend_mp3");
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
        return SDMNBigwinPanel;
    }(game.BaseComponent));
    sdmn.SDMNBigwinPanel = SDMNBigwinPanel;
    __reflect(SDMNBigwinPanel.prototype, "sdmn.SDMNBigwinPanel");
})(sdmn || (sdmn = {}));
