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
var gdzw;
(function (gdzw) {
    var GDZWBigwinGroup = (function (_super) {
        __extends(GDZWBigwinGroup, _super);
        function GDZWBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "GDZWBigwinGroupSkin";
            return _this;
        }
        GDZWBigwinGroup.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        GDZWBigwinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        GDZWBigwinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        GDZWBigwinGroup.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bigwinPanel.visible = true;
            this.bgAni = DBComponent.create("gdzw_bgAni", "gdzw_win");
            this.bigwinAni = DBComponent.create("gdzw_bigwin", "gdzw_bigwin");
            this.megawinAni = DBComponent.create("gdzw_megawin", "gdzw_megawin");
            this.superwinAni = DBComponent.create("gdzw_superwin", "gdzw_superwin");
            this.winImagAni = DBComponent.create("gdzw_bigwintitle", "bskg_bigwin1");
            this.titleChangeAni = new DBComponent("gdzw_win_change");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.titleChangeAni.play("", 1);
            this.titleChangeAni.scaleX = this.titleChangeAni.scaleY = 0.8;
            this.titleChangeAni.horizontalCenter = 1600;
            this.titleChangeAni.bottom = -2800;
            this.resizeGroup.addChild(this.titleChangeAni);
            this.titleChangeAni.resetPosition();
            SoundManager.getInstance().playEffect("gdzw_ex1_mp3");
            this.winNum.scaleX = this.winNum.scaleY = 1;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.GDZWUtils.bet * 2 * 15 && num < game.GDZWUtils.bet * 2 * 30) {
                    index1 = num / 305;
                    time = 10000;
                }
                else if (num >= (game.GDZWUtils.bet * 2) * 30 && num < (game.GDZWUtils.bet * 2) * 50) {
                    index1 = 30 * (game.GDZWUtils.bet * 2) / 305;
                    index2 = (num - 30 * (game.GDZWUtils.bet * 2)) / 305;
                    time = 20000;
                }
                else if (num >= (game.GDZWUtils.bet * 2) * 50) {
                    index1 = 30 * (game.GDZWUtils.bet * 2) / 305;
                    index2 = 50 * (game.GDZWUtils.bet * 2) / 305;
                    index3 = (num - 50 * (game.GDZWUtils.bet * 2)) / 305;
                    time = 30000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("gdzw_bigwincombo_mp3");
                _this.winImagAni.play("", 0);
                _this.winImagAni.horizontalCenter = 0;
                _this.winImagAni.bottom = -350;
                _this.bigwinPanel.addChild(_this.winImagAni);
                _this.winImagAni.resetPosition();
                _this.winNum.alpha = _this.winImag.alpha = 1;
                _this.bigwinAni.play("", 0);
                _this.bigwinAni.horizontalCenter = 0;
                _this.bigwinAni.bottom = 400;
                _this.effectGroup.addChild(_this.bigwinAni);
                _this.bigwinAni.resetPosition();
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                _this.effectGroup.visible = true;
                // this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                _this.bigwinPanel.horizontalCenter = 0;
                // game.GDZWUtils.bigwinAni1.play("", 0);
                // game.GDZWUtils.bigwinAni1.horizontalCenter = 0;
                // game.GDZWUtils.bigwinAni1.bottom = -350;
                // this.resizeGroup.addChild(game.GDZWUtils.bigwinAni1);
                _this.bgAni.play("", 0);
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = -20;
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.winImag);
                _this.resizeGroup.addChild(_this.effectGroup);
                _this.resizeGroup.addChild(_this.bigwinImagGroup);
                // game.GDZWUtils.bigwinAni1.resetPosition();
                // game.GDZWUtils.bigwinAni1.touchEnabled = false;
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                });
            }, this, 800);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.GDZWUtils.bet * 2) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = "gdzw_game_txt6_png";
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.GDZWUtils.bet * 2) && _this.testscore >= 30 * (game.GDZWUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.winImag.source = "gdzw_game_txt2_png";
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            game.UIUtils.removeSelf(_this.bigwinAni);
                            _this.megawinAni.play("", 0);
                            _this.megawinAni.horizontalCenter = 0;
                            _this.megawinAni.bottom = 405;
                            _this.effectGroup.addChild(_this.megawinAni);
                            _this.megawinAni.resetPosition();
                        });
                    }
                    is_mega = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore >= 50 * (game.GDZWUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.superwinAni.play("", 0);
                            _this.superwinAni.horizontalCenter = 0;
                            _this.superwinAni.bottom = 405;
                            _this.effectGroup.addChild(_this.superwinAni);
                            _this.superwinAni.resetPosition();
                        });
                        _this.winImag.source = "gdzw_game_txt4_png";
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("gdzw_bigwinend_mp3");
                    // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                    _this.timer1.stop();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    // this.bigwinPanel.visible = false;
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.GDZWUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("gdzw_game_txt2_png");
                        });
                    }
                    if (num == 50 * (game.GDZWUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("gdzw_game_txt4_png");
                        });
                    }
                    if (num >= 30 * (game.GDZWUtils.bet * 2)) {
                        _this.winImag.source = "gdzw_game_txt2_png";
                    }
                    if (num >= 50 * (game.GDZWUtils.bet * 2)) {
                        _this.winImag.source = "gdzw_game_txt4_png";
                    }
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        GDZWBigwinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("gdzw_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                // this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1;
                this.winNum.alpha = 1;
                if (this.score == 30 * (game.GDZWUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("gdzw_game_txt2_png");
                    });
                }
                if (this.score == 50 * (game.GDZWUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("gdzw_game_txt4_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                // this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.GDZWUtils.bet * 2)) {
                    this.winImag.source = "gdzw_game_txt2_png";
                }
                if (this.score >= 50 * (game.GDZWUtils.bet * 2)) {
                    this.winImag.source = "gdzw_game_txt4_png";
                }
            }
        };
        GDZWBigwinGroup.prototype.addGoldDown = function () {
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
        GDZWBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            game.UIUtils.removeSelf(this.winImagAni);
            game.UIUtils.removeSelf(this.bigwinAni);
            game.UIUtils.removeSelf(this.megawinAni);
            game.UIUtils.removeSelf(this.superwinAni);
            game.UIUtils.removeSelf(this.titleChangeAni);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("gdzw_bigwinend_mp3");
                //恢复背景音乐      
                // this.maskRect.fillAlpha = 0;
                _this.winNum.alpha = 0;
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
        return GDZWBigwinGroup;
    }(game.BaseComponent));
    gdzw.GDZWBigwinGroup = GDZWBigwinGroup;
    __reflect(GDZWBigwinGroup.prototype, "gdzw.GDZWBigwinGroup");
})(gdzw || (gdzw = {}));
