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
var snyx;
(function (snyx) {
    var SNYXBigwinPanel = (function (_super) {
        __extends(SNYXBigwinPanel, _super);
        function SNYXBigwinPanel() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.testscore = 0;
            _this.isTouched = false;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.skinName = "SNYXBigwinPanelSkin";
            return _this;
        }
        SNYXBigwinPanel.prototype.createChildrean = function () {
            _super.prototype.createChildren.call(this);
        };
        SNYXBigwinPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SNYXBigwinPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        SNYXBigwinPanel.prototype.showScore = function (num, callback) {
            var _this = this;
            this.bgAni = DBComponent.create("snyx_winshine", "snyx_winshine");
            // this.titleChangeAni = DBComponent.create("ceby_freegameani", "ceby_freegame");
            this.bigwinAni = DBComponent.create("snyx_bigwin", "snyx_bigwin");
            this.megawinAni = DBComponent.create("snyx_megawin", "snyx_megawin");
            this.superwinAni = DBComponent.create("snyx_superwin", "snyx_superwin");
            // this.bigwinGuangAni = DBComponent.create("ayls_bigwintitle", "ayls_bigwintitle");
            // this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;
            // this.superwinAni.play("", 0);
            // this.superwinAni.horizontalCenter = 0;
            // this.superwinAni.bottom = 445;
            var index1, index2, index3, time = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.LaohuUtils.bet * 2 * 15 && num < game.LaohuUtils.bet * 2 * 30) {
                    index1 = num / 195;
                    time = 7000;
                }
                else if (num >= (game.LaohuUtils.bet * 2) * 30 && num < (game.LaohuUtils.bet * 2) * 50) {
                    index1 = 30 * (game.LaohuUtils.bet * 2) / 195;
                    index2 = (num - 30 * (game.LaohuUtils.bet * 2)) / 225;
                    time = 15000;
                }
                else if (num >= (game.LaohuUtils.bet * 2) * 50) {
                    index1 = 30 * (game.LaohuUtils.bet * 2) / 195;
                    index2 = 50 * (game.LaohuUtils.bet * 2) / 225;
                    index3 = (num - 50 * (game.LaohuUtils.bet * 2)) / 225;
                    time = 30000;
                }
            }
            this.timer1.start();
            SoundManager.getInstance().playEffect("snyx_bigwin_mp3", true);
            this.showResultTimeOut = egret.setTimeout(function () {
                _this.winNum.alpha = _this.winImag.alpha = 1;
                _this.bigwinAni.play("", 0);
                _this.bigwinAni.horizontalCenter = 0;
                _this.bigwinAni.bottom = 390;
                _this.bgAni.horizontalCenter = 0;
                _this.bgAni.bottom = 0;
                _this.bgAni.play("", 0);
                _this.effectGroup.addChild(_this.bigwinAni);
                _this.bigwinAni.resetPosition();
                egret.Tween.get(_this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                _this.effectGroup.visible = true;
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
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(_this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
            }, this, 800);
            var is_big, is_mega, is_super = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testscore < (game.LaohuUtils.bet * 2) * 30 && _this.testscore < num) {
                    _this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.winImag.source = "snyx_bigwin_1_png";
                    }
                    is_big = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testscore < 50 * (game.LaohuUtils.bet * 2) && _this.testscore >= 30 * (game.LaohuUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        // this.titleChangeAni.play("", 1);
                        // this.titleChangeAni.horizontalCenter = 0;
                        // this.titleChangeAni.bottom = 340;
                        // this.resizeGroup.addChild(this.titleChangeAni);
                        // this.titleChangeAni.resetPosition();
                        _this.winImag.source = "snyx_megawin_1_png";
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
                else if (_this.testscore >= 50 * (game.LaohuUtils.bet * 2) && _this.testscore < num) {
                    _this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(_this.megawinAni);
                        // this.titleChangeAni.play("", 1);
                        // this.titleChangeAni.horizontalCenter = 0;
                        // this.titleChangeAni.bottom = 340;
                        // this.resizeGroup.addChild(this.titleChangeAni);
                        // this.titleChangeAni.resetPosition();
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.superwinAni.play("", 0);
                            _this.superwinAni.horizontalCenter = 0;
                            _this.superwinAni.bottom = 400;
                            _this.effectGroup.addChild(_this.superwinAni);
                            _this.superwinAni.resetPosition();
                        });
                        _this.winImag.source = "snyx_superwin_1_png";
                    }
                    is_super = true;
                    if (_this.testscore) {
                        var data = Number(new Big(_this.testscore).mul(100));
                        _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("snyx_bigwin_mp3");
                    SoundManager.getInstance().playEffect("snyx_bigwin_end_mp3");
                    _this.timer1.stop();
                    egret.Tween.removeTweens(_this.winNum);
                    egret.Tween.get(_this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    _this.bigwinPanel.visible = false;
                    var data = Number(new Big(num).mul(100));
                    _this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.LaohuUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("snyx_megawin_1_png");
                        });
                    }
                    if (num == 50 * (game.LaohuUtils.bet * 2)) {
                        egret.Tween.get(_this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.winImag.source = RES.getRes("snyx_superwin_1_png");
                        });
                    }
                    if (num >= 30 * (game.LaohuUtils.bet * 2)) {
                        _this.winImag.source = "snyx_megawin_1_png";
                    }
                    if (num >= 50 * (game.LaohuUtils.bet * 2)) {
                        _this.winImag.source = "snyx_superwin_1_png";
                    }
                }
            }, this);
        };
        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        SNYXBigwinPanel.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("snyx_bigwin_mp3");
                SoundManager.getInstance().playEffect("snyx_bigwin_end_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                // this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1;
                this.winNum.alpha = 1;
                if (this.score == 30 * (game.LaohuUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("snyx_megawin_1_png");
                    });
                }
                if (this.score == 50 * (game.LaohuUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.winImag.source = RES.getRes("snyx_superwin_1_png");
                    });
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.LaohuUtils.bet * 2)) {
                    this.winImag.source = "snyx_megawin_1_png";
                }
                if (this.score >= 50 * (game.LaohuUtils.bet * 2)) {
                    this.winImag.source = "snyx_superwin_1_png";
                }
            }
        };
        SNYXBigwinPanel.prototype.addGoldDown = function () {
            var _this = this;
            this.timer2 = egret.setInterval(function () {
                if (_this.bigwinPanel.numChildren < 30) {
                    var gold_right1 = game.GoldDownPanel.createsdLeftGold("sgws_coin1");
                    _this.bigwinPanel.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createsdLeftGold("sgws_coin2");
                    _this.bigwinPanel.addChild(gold_right2);
                    var gold_left1 = game.GoldDownPanel.createsdxlGold("sgws_coin3");
                    _this.bigwinPanel.addChild(gold_left1);
                    var gold_left2 = game.GoldDownPanel.createsdxlGold("sgws_coin4");
                    _this.bigwinPanel.addChild(gold_left2);
                }
            }, this, 300);
        };
        /**
        * 移除bigwin窗口
        * @param  {Function} callback?
        */
        SNYXBigwinPanel.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sgws_coin1");
            ObjectPool.cancelPool("sgws_coin2");
            ObjectPool.cancelPool("sgws_coin3");
            ObjectPool.cancelPool("sgws_coin4");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            game.UIUtils.removeSelf(this.bigwinAni);
            game.UIUtils.removeSelf(this.megawinAni);
            game.UIUtils.removeSelf(this.superwinAni);
            egret.setTimeout(function () {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("snyx_bigwin_mp3");
                SoundManager.getInstance().stopEffectByName("snyx_bigwin_end_mp3");
                // game.UIUtils.removeSelf(this.titleChangeAni);
                game.UIUtils.removeSelf(_this.bgAni);
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
        return SNYXBigwinPanel;
    }(game.BaseComponent));
    snyx.SNYXBigwinPanel = SNYXBigwinPanel;
    __reflect(SNYXBigwinPanel.prototype, "snyx.SNYXBigwinPanel");
})(snyx || (snyx = {}));
