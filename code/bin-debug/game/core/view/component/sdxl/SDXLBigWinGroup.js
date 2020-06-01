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
 * @Author: wangtao
 * @Date: 2019-04-19 15:57:39
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 15:01:09
 * @Description:
 */
// TypeScript file
var sdxl;
(function (sdxl) {
    var SDXLBigWinGroup = (function (_super) {
        __extends(SDXLBigWinGroup, _super);
        function SDXLBigWinGroup() {
            var _this = _super.call(this) || this;
            _this.testShowNum = 0;
            // public diFire: DBComponent; //bigwin底部火光特效
            _this.score = 0; //中奖分数 
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.isTouched = false;
            _this.skinName = new SDXLBigWinGroupSkin();
            return _this;
        }
        SDXLBigWinGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SDXLBigWinGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
        };
        SDXLBigWinGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * @param  {number} score
         * @param  {Function} callback?
         * 展示分数跳动
         */
        SDXLBigWinGroup.prototype.showScore = function (score, callback) {
            var _this = this;
            this.fillMask.fillAlpha = 0;
            // this.diFire = DBComponent.create("diFire", "huoguang");
            this.megaWinAni = DBComponent.create("megaWinAni", "sdxl_megawinani");
            this.superWinAni = DBComponent.create("superWinAni", "sdxl_superwinani");
            this.goldGuang = DBComponent.create("goldGuang", "sdxl_bigwin_diguang");
            this.goldGuang.touchEnabled = false;
            game.SDXLUtils.sakura.touchEnabled = false;
            this.goldGuang.horizontalCenter = 720;
            this.goldGuang.bottom = -200;
            this.megaWinAni.touchEnabled = false;
            this.bigwinIma.source = RES.getRes("sdxl_bigwin_png");
            this.score = score;
            this.testShowNum = 0;
            this.timer = new egret.Timer(20);
            this.fillMask.touchEnabled = false;
            this.bigwinGold.textAlign = "center";
            var index1, index2, index3 = 0; //bigwin,megawin,superwin 累加值
            if (score) {
                if (score >= game.SDXLUtils.bet * game.SDXLUtils.mul * 50 * 15 && score < game.SDXLUtils.bet * game.SDXLUtils.mul * 50 * 30) {
                    index1 = score / 244;
                }
                else if (score >= (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 30 && score < (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) / 244;
                    index2 = (score - 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) / 213;
                }
                else if (score >= (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) / 244;
                    index2 = 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) / 213;
                    index3 = (score - 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) / 213;
                }
            }
            this.timer.start();
            this.showResultTimeout = egret.setTimeout(function () {
                _this.fillMask.touchEnabled = true;
                _this.fillMask.fillAlpha = 0.7;
                _this.bigwinIma.anchorOffsetX = _this.bigwinIma.width / 2;
                _this.bigwinIma.anchorOffsetY = _this.bigwinIma.height / 2;
                // this.diFire.play("fire_small", 0);
                // this.diFire.horizontalCenter = 640;
                // this.diFire.bottom = -365;
                // this.diFire.scaleX = 2;
                // this.diFire.scaleY = 2;
                // this.diFire.touchEnabled = false;
                _this.addGoldDown();
                _this.goldDown.visible = true;
                _this.goldDown.horizontalCenter = 0;
                _this.goldGuang.play("", 0);
                _this.resizeGroup.addChild(_this.goldGuang);
                // this.resizeGroup.addChild(this.diFire);
                _this.resizeGroup.addChild(_this.goldDown);
                _this.resizeGroup.addChild(_this.bigwinGold);
                _this.resizeGroup.addChild(_this.bigwinIma);
                _this.bigwinIma.alpha = 1;
                _this.bigwinGold.alpha = 1;
                egret.Tween.get(_this.bigwinGold).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                    game.SDXLUtils.sakura.horizontalCenter = 0;
                    game.SDXLUtils.sakura.bottom = 200;
                    game.SDXLUtils.sakura.play("", 1);
                    _this.resizeGroup.addChild(game.SDXLUtils.sakura);
                    SoundManager.getInstance().playEffect("sdxl_winchangemp3_mp3");
                    game.SDXLUtils.sakura.resetPosition();
                    SoundManager.getInstance().playEffect("sdxl_bigwincombo_mp3");
                    SoundManager.getInstance().pauseMusic();
                });
                egret.Tween.get(_this.bigwinIma).to({ scaleX: 1, scaleY: 1, y: _this.bigwinIma.y }, 200)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 200)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 150)
                    .to({ scaleX: 1, scaleY: 1 }, 150);
            }, this, 1200);
            var is_big, is_mega, is_super = false;
            this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                if (_this.testShowNum < (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) * 30 && _this.testShowNum < score) {
                    _this.testShowNum += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        _this.bigwinIma.source = RES.getRes("sdxl_bigwin_png");
                    }
                    is_big = true;
                    if (_this.testShowNum) {
                        var data = Number(new Big(_this.testShowNum).mul(100));
                        _this.bigwinGold.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testShowNum < 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) && _this.testShowNum >= 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) && _this.testShowNum < score) {
                    _this.testShowNum += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        game.SDXLUtils.sakura.horizontalCenter = 0;
                        game.SDXLUtils.sakura.bottom = 200;
                        game.SDXLUtils.sakura.play("", 1);
                        _this.resizeGroup.addChild(game.SDXLUtils.sakura);
                        game.SDXLUtils.sakura.resetPosition();
                        SoundManager.getInstance().playEffect("sdxl_winchangemp3_mp3");
                        _this.bigwinIma.source = RES.getRes("sdxl_megawin_png");
                        egret.Tween.get(_this.bigwinIma).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50);
                        _this.resizeGroup.addChild(_this.bigwinGold);
                        _this.resizeGroup.addChild(_this.bigwinIma);
                        _this.megaWinAni.horizontalCenter = 0;
                        _this.megaWinAni.bottom = 470;
                        _this.megaWinAni.play("", 0);
                        _this.resizeGroup.addChild(_this.megaWinAni);
                        _this.megaWinAni.resetPosition();
                    }
                    is_mega = true;
                    if (_this.testShowNum) {
                        var data = Number(new Big(_this.testShowNum).mul(100));
                        _this.bigwinGold.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (_this.testShowNum >= 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50) && _this.testShowNum < score) {
                    _this.testShowNum += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.SDXLUtils.sakura.horizontalCenter = 0;
                        game.SDXLUtils.sakura.bottom = 200;
                        game.SDXLUtils.sakura.play("", 1);
                        _this.resizeGroup.addChild(game.SDXLUtils.sakura);
                        SoundManager.getInstance().playEffect("sdxl_winchangemp3_mp3");
                        game.SDXLUtils.sakura.resetPosition();
                        game.UIUtils.removeSelf(_this.megaWinAni);
                        _this.bigwinIma.source = RES.getRes("sdxl_superwin_png");
                        _this.resizeGroup.addChild(_this.bigwinGold);
                        _this.resizeGroup.addChild(_this.bigwinIma);
                        _this.superWinAni.horizontalCenter = 0;
                        _this.superWinAni.bottom = 458;
                        _this.superWinAni.play("", 0);
                        _this.resizeGroup.addChild(_this.superWinAni);
                        _this.superWinAni.resetPosition();
                    }
                    is_super = true;
                    if (_this.testShowNum) {
                        var data = Number(new Big(_this.testShowNum).mul(100));
                        _this.bigwinGold.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("sdxl_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("sdxl_bigwincomboend_mp3");
                    _this.timer.stop();
                    _this.goldDown.visible = false;
                    game.UIUtils.removeSelf(_this.goldGuang);
                    var data = Number(new Big(score).mul(100));
                    _this.bigwinGold.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    _this.removeThisPanel(callback);
                    _this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (score == 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                        egret.Tween.get(_this.bigwinIma).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.bigwinIma.source = RES.getRes("sdxl_megawin_png");
                        });
                    }
                    if (score == 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                        egret.Tween.get(_this.bigwinIma).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            _this.bigwinIma.source = RES.getRes("sdxl_superwin_png");
                            game.UIUtils.removeSelf(_this.megaWinAni);
                            _this.superWinAni.play("", 0);
                            _this.resizeGroup.addChild(_this.superWinAni);
                            _this.superWinAni.resetPosition();
                        });
                    }
                    if (score >= 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                    }
                    if (score >= 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                        _this.bigwinIma.source = RES.getRes("sdxl_superwin_png");
                    }
                }
            }, this);
        };
        SDXLBigWinGroup.prototype.addGoldDown = function () {
            var _this = this;
            this.timer2 = egret.setInterval(function () {
                if (_this.goldDown.numChildren < 30) {
                    var gold_right1 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right1");
                    _this.goldDown.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right2");
                    _this.goldDown.addChild(gold_right2);
                    var gold_left1 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left1");
                    _this.goldDown.addChild(gold_left1);
                    var gold_left2 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left2");
                    _this.goldDown.addChild(gold_left2);
                }
            }, this, 300);
        };
        /**
         * 点击结束数字跳动
         * @param  {Function} callback?
         */
        SDXLBigWinGroup.prototype.stopShowBigWin = function (callback) {
            var _this = this;
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                egret.clearTimeout(this.showResultTimeout);
                // game.UIUtils.removeSelf(this.diFire);
                game.UIUtils.removeSelf(this.goldGuang);
                SoundManager.getInstance().stopEffectByName("sdxl_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("sdxl_bigwincomboend_mp3");
                game.UIUtils.removeSelf(this.megaWinAni);
                game.UIUtils.removeSelf(this.superWinAni);
                this.fillMask.touchEnabled = true;
                this.fillMask.fillAlpha = 0.7;
                this.bigwinIma.alpha = this.bigwinGold.alpha = 1;
                // this.diFire.play("fire_small", 0);
                // this.diFire.horizontalCenter = 640;
                // this.diFire.bottom = -365;
                // this.diFire.scaleX = 2;
                // this.diFire.scaleY = 2;
                // this.diFire.touchEnabled = false;
                this.goldGuang.play("", 0);
                // this.resizeGroup.addChild(this.diFire);
                this.resizeGroup.addChild(this.bigwinGold);
                this.resizeGroup.addChild(this.bigwinIma);
                SoundManager.getInstance().playEffect("sdxl_bigwincomboend_mp3");
                if (this.score == 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                    egret.Tween.get(this.bigwinIma).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.bigwinIma.source = RES.getRes("sdxl_megawin_png");
                    });
                }
                if (this.score == 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                    egret.Tween.get(this.bigwinIma).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                        _this.bigwinIma.source = RES.getRes("sdxl_superwin_png");
                        game.UIUtils.removeSelf(_this.megaWinAni);
                        _this.superWinAni.play("", 0);
                        _this.resizeGroup.addChild(_this.superWinAni);
                        _this.superWinAni.resetPosition();
                    });
                }
                this.timer.stop();
                this.goldDown.visible = false;
                ObjectPool.cancelPool("sdxl_gold_right1");
                ObjectPool.cancelPool("sdxl_gold_right2");
                ObjectPool.cancelPool("sdxl_gold_left1");
                ObjectPool.cancelPool("sdxl_gold_left2");
                game.UIUtils.removeSelf(this.goldGuang);
                SoundManager.getInstance().stopEffectByName("sdxl_bigwincombo_mp3");
                this.removeThisPanel(callback);
                var data = Number(new Big(this.score).mul(100));
                this.bigwinGold.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                if (this.score >= 30 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                    this.bigwinIma.source = RES.getRes("sdxl_megawin_png");
                }
                if (this.score >= 50 * (game.SDXLUtils.bet * game.SDXLUtils.mul * 50)) {
                    this.bigwinIma.source = RES.getRes("sdxl_superwin_png");
                    game.UIUtils.removeSelf(this.megaWinAni);
                }
            }
        };
        /**
         * 移除bigwin窗口
         * @param  {Function} callback?
         */
        SDXLBigWinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.goldDown.removeChildren();
            this.isTouched = true;
            egret.clearInterval(this.timer2);
            egret.setTimeout(function () {
                // game.UIUtils.removeSelf(this.diFire);
                game.UIUtils.removeSelf(_this.megaWinAni);
                game.UIUtils.removeSelf(_this.superWinAni);
                //恢复音效
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("sdxl_bigwincomboend_mp3");
                SoundManager.getInstance().stopEffectByName("sdxl_bigwincombo_mp3");
                //恢复背景音乐
                // if (this.isPlayingMusic) {
                // 	game.AudioManager.getInstance().isPlayMusic = true;
                // }
                _this.fillMask.fillAlpha = 0;
                _this.bigwinIma.alpha = _this.bigwinGold.alpha = 0;
                _this.bigwinGold.text = "0";
                _this.testShowNum = 0;
                callback && callback();
                _this.removeChildren();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this, 4000);
        };
        SDXLBigWinGroup.prototype.showPanel = function () {
            this.visible = true;
        };
        return SDXLBigWinGroup;
    }(game.BaseComponent));
    sdxl.SDXLBigWinGroup = SDXLBigWinGroup;
    __reflect(SDXLBigWinGroup.prototype, "sdxl.SDXLBigWinGroup");
})(sdxl || (sdxl = {}));
