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
var ceby;
(function (ceby) {
    var CEBYBigwinGroup = (function (_super) {
        __extends(CEBYBigwinGroup, _super);
        function CEBYBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "CEBYBigwinPanelSkin";
            return _this;
        }
        CEBYBigwinGroup.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        CEBYBigwinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        CEBYBigwinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        CEBYBigwinGroup.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bgAni = DBComponent.create("ceby_bigwin_bgani", "ceby_win");
            this.titleChangeAni = DBComponent.create("ceby_freegameani", "ceby_freegame");
            this.bigwinAni = DBComponent.create("ceby_bigwinani", "ceby_bigwin");
            this.megawinAni = DBComponent.create("ceby_megawinani", "ceby_megawin");
            this.superwinAni = DBComponent.create("ceby_superwinani", "ceby_superwin");
            // this.bigwinGuangAni = DBComponent.create("ayls_bigwintitle", "ayls_bigwintitle");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            // this.superwinAni.play("", 0);
            // this.superwinAni.horizontalCenter = 0;
            // this.superwinAni.bottom = 445;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.CEBYUtils.bet * 2 * 15 && num < game.CEBYUtils.bet * 2 * 30) {
                    index1 = num / 335;
                    time = 11000;
                }
                else if (num >= (game.CEBYUtils.bet * 2) * 30 && num < (game.CEBYUtils.bet * 2) * 50) {
                    index1 = 30 * (game.CEBYUtils.bet * 2) / 335;
                    index2 = (num - 30 * (game.CEBYUtils.bet * 2)) / 335;
                    time = 22000;
                }
                else if (num >= (game.CEBYUtils.bet * 2) * 50) {
                    index1 = 30 * (game.CEBYUtils.bet * 2) / 335;
                    index2 = 50 * (game.CEBYUtils.bet * 2) / 335;
                    index3 = (num - 50 * (game.CEBYUtils.bet * 2)) / 365;
                    time = 34000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(function () {
                SoundManager.getInstance().playEffect("ceby_bigwincombo_mp3", true);
                _this.winNum.alpha = _this.winImag.alpha = 1;
                _this.bigwinAni.play("", 0);
                _this.bigwinAni.horizontalCenter = 0;
                _this.bigwinAni.bottom = 400;
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = 0;
                _this.bgAni.play("", 0);
                _this.effectGroup.addChild(_this.bigwinAni);
                _this.bigwinAni.resetPosition();
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                _this.effectGroup.visible = true;
                _this.titleChangeAni.play("", 1);
                _this.titleChangeAni.horizontalCenter = 0;
                _this.titleChangeAni.bottom = 380;
                _this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                _this.bigwinPanel.visible = true;
                _this.bigwinPanel.horizontalCenter = 0;
                _this.resizeGroup.addChild(_this.bgAni);
                _this.bgAni.resetPosition();
                _this.resizeGroup.addChild(_this.bigwinPanel);
                _this.resizeGroup.addChild(_this.effectGroup1);
                _this.resizeGroup.addChild(_this.winNum);
                _this.resizeGroup.addChild(_this.winImag);
                _this.resizeGroup.addChild(_this.effectGroup);
                _this.resizeGroup.addChild(_this.bigwinImagGroup);
                _this.resizeGroup.addChild(_this.titleChangeAni);
                _this.titleChangeAni.resetPosition();
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                });
            }, this, 800);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.CEBYUtils.bet * 2) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = "ceby_bigwin1_png";
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.CEBYUtils.bet * 2) && _this.testscore >= 30 * (game.CEBYUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        _this.titleChangeAni.play("", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 340;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        _this.winImag.source = "ceby_megawin1_png";
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            game.UIUtils.removeSelf(_this.bigwinAni);
                            _this.megawinAni.play("", 0);
                            _this.megawinAni.horizontalCenter = 0;
                            _this.megawinAni.bottom = 400;
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
                else if (_this.testscore >= 50 * (game.CEBYUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        _this.titleChangeAni.play("", 1);
                        _this.titleChangeAni.horizontalCenter = 0;
                        _this.titleChangeAni.bottom = 340;
                        _this.resizeGroup.addChild(_this.titleChangeAni);
                        _this.titleChangeAni.resetPosition();
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.superwinAni.play("", 0);
                            _this.superwinAni.horizontalCenter = 0;
                            _this.superwinAni.bottom = 400;
                            _this.effectGroup.addChild(_this.superwinAni);
                            _this.superwinAni.resetPosition();
                        });
                        _this.winImag.source = "ceby_superwin1_png";
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("ceby_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("ceby_bigwinend_mp3");
                    _this.timer1.stop();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    _this.bigwinPanel.visible = false;
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.CEBYUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("ceby_megawin1_png");
                        });
                    }
                    if (num == 50 * (game.CEBYUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("ceby_superwin1_png");
                        });
                    }
                    if (num >= 30 * (game.CEBYUtils.bet * 2)) {
                        _this.winImag.source = "ceby_megawin1_png";
                    }
                    if (num >= 50 * (game.CEBYUtils.bet * 2)) {
                        _this.winImag.source = "ceby_superwin1_png";
                    }
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        CEBYBigwinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("ceby_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("ceby_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1;
                this.winNum.alpha = 1;
                if (this.score == 30 * (game.CEBYUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("ceby_megawin1_png");
                    });
                }
                if (this.score == 50 * (game.CEBYUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("ceby_superwin1_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.CEBYUtils.bet * 2)) {
                    this.winImag.source = "ceby_megawin1_png";
                }
                if (this.score >= 50 * (game.CEBYUtils.bet * 2)) {
                    this.winImag.source = "ceby_superwin1_png";
                }
            }
        };
        CEBYBigwinGroup.prototype.addGoldDown = function () {
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
        CEBYBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            game.UIUtils.removeSelf(this.bigwinAni);
            game.UIUtils.removeSelf(this.megawinAni);
            game.UIUtils.removeSelf(this.superwinAni);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("ceby_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("ceby_bigwinend_mp3");
                game.UIUtils.removeSelf(_this.titleChangeAni);
                game.UIUtils.removeSelf(_this.bgAni);
                //恢复背景音乐      
                _this.maskRect.fillAlpha = 0;
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
        return CEBYBigwinGroup;
    }(game.BaseComponent));
    ceby.CEBYBigwinGroup = CEBYBigwinGroup;
    __reflect(CEBYBigwinGroup.prototype, "ceby.CEBYBigwinGroup");
})(ceby || (ceby = {}));
