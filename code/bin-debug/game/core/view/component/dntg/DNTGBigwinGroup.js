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
 * @Date: 2019-03-27 13:55:32
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-05-27 12:03:19
 * @Description:
 */
var dntg;
(function (dntg) {
    var DNTGBigwinGroup = (function (_super) {
        __extends(DNTGBigwinGroup, _super);
        function DNTGBigwinGroup() {
            var _this = _super.call(this) || this;
            _this.testShowNum = 0;
            _this.score = 0;
            _this.isPlayingMusic = false; //是否在播放背景音乐
            _this.megaWinTextAni = DBComponent.create("dntg_megaWinTextAni", "dntg_megawin"); //megawin字体特效
            _this.superWinTextAni = DBComponent.create("dntg_superWinTextAni", "dntg_superwin"); //superwin字体特效
            // public onTouchTap(e: egret.TouchEvent) {
            // 	switch (e.target) {
            // 		case this.bigwinStopRect:
            // 			this.stopShowBigWin()
            // 			break;
            // 	}
            // }
            _this.isTouched = false;
            _this.skinName = new DNTGBigWinSkin();
            return _this;
        }
        DNTGBigwinGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.LaohuUtils.scoreguang = DBComponent.create("dntg_scoreguang", "dntg_bigwin_guang");
            // game.LaohuUtils.scoreguang = new DBComponent("dntg_bigwin_guang");
        };
        /**
         * 调用方法，展示bigwin特效
         * @param  {number} score
         * @param  {Function} callback?
         */
        DNTGBigwinGroup.prototype.scoreShow = function (score, callback) {
            var _this = this;
            this.score = score;
            this.testShowNum = 0;
            this.bigwinStopRect.alpha = 0;
            this.bigwinStopRect.touchEnabled = false;
            //延迟置灰屏幕，添加数字标题放大效果
            this.setAutoTimeout(function () {
                _this.bigwinStopRect.touchEnabled = true;
                _this.bigwinStopRect.alpha = _this.bigwinTitle.alpha = _this.countWonLabel.alpha = 1;
                _this.bigwinTitle.scaleX = _this.countWonLabel.scaleX = 0.2;
                _this.countWonLabel.anchorOffsetX = _this.countWonLabel.width / 2;
                _this.countWonLabel.anchorOffsetY = _this.countWonLabel.height / 2;
                // this.big_win_fire = new DBComponent("huoguang");
                _this.big_win_fire = DBComponent.create("dntg_big_win_fire", "huoguang");
                _this.big_win_fire.play("fire_small", 0);
                _this.big_win_fire.horizontalCenter = 0;
                _this.big_win_fire.bottom = 0;
                _this.big_win_fire.scaleX = 2;
                _this.big_win_fire.scaleY = 2;
                _this.big_win_fire.touchEnabled = false;
                _this.bigwinTitle.scaleY = _this.countWonLabel.scaleY = 0.2;
                egret.Tween.get(_this.bigwinTitle).to({ scaleX: 1, scaleY: 1, y: _this.bigwinTitle.y }, 200).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50);
                egret.Tween.get(_this.countWonLabel).to({ scaleX: 1, scaleY: 1 }, 200);
                game.LaohuUtils.scoreguang.play("", 1);
                game.LaohuUtils.scoreguang.left = 650;
                game.LaohuUtils.scoreguang.bottom = 130;
                _this.bigwinGroup.addChild(game.LaohuUtils.scoreguang);
                _this.bigwinGroup.addChild(_this.countWonLabel);
                _this.addGoldDown();
                _this.bigwinGroup.addChild(_this.goldDown);
                SoundManager.getInstance().playEffect("bigwincombo_mp3");
                _this.bigwinStopRect.fillAlpha = 0.7;
                SoundManager.getInstance().pauseMusic();
                var index1, index2, index3 = 0;
                _this.timer = new egret.Timer(20);
                var is_maga, is_super, is_big = false;
                // game.LaohuUtils.titaleChangeAni = new DBComponent("win_change");
                game.LaohuUtils.titaleChangeAni = DBComponent.create("dntg_titaleChangeAni", "win_change");
                game.LaohuUtils.titaleChangeAni.touchEnabled = false;
                // game.LaohuUtils.titaleChangeAni.horizontalCenter = 250;
                // game.LaohuUtils.titaleChangeAni.bottom = 130;
                // game.LaohuUtils.titaleChangeAni.touchEnabled = false;
                // game.LaohuUtils.titaleChangeAni.play("super_win", -1);
                _this.bigwinGroup.addChild(_this.bigwinTitle);
                // game.LaohuUtils.titaleChangeAni.resetPosition();
                _this.bigwinGroup.addChild(_this.countWonLabel);
                _this.bigwinGroup.addChild(_this.big_win_fire);
                _this.big_win_fire.resetPosition();
                //设置每帧添加的数值算法
                if (score) {
                    if (score >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15 && score < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 30) {
                        index1 = score / 244;
                    }
                    else if (score >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 30 && score < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 50) {
                        index1 = 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) / 244;
                        index2 = (score - 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 213;
                    }
                    else if (score >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 50) {
                        index1 = 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) / 244;
                        index2 = 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) / 213;
                        index3 = (score - 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 213;
                    }
                }
                //开始计数
                _this.timer.start();
                _this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    if (_this.testShowNum < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 30 && _this.testShowNum < score) {
                        _this.testShowNum += index1;
                        //判断是否添加了动画
                        if (!is_big) {
                            game.LaohuUtils.titaleChangeAni.play("big_win", 0);
                            game.LaohuUtils.titaleChangeAni.bottom = 400;
                            game.LaohuUtils.titaleChangeAni.horizontalCenter = 0;
                            _this.bigwinGroup.addChild(game.LaohuUtils.titaleChangeAni);
                            game.LaohuUtils.titaleChangeAni.resetPosition();
                            _this.bigwinGroup.addChild(_this.bigwinTitle);
                            _this.bigwinGroup.addChild(_this.countWonLabel);
                        }
                        is_big = true;
                        _this.bigwinTitle.source = "bigwinplist_json.big_win";
                        _this.countWonLabel.text = NumberFormat.handleFloatDecimal(_this.testShowNum * 100, 0) + "";
                    }
                    else if (_this.testShowNum < 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) && _this.testShowNum >= 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) && _this.testShowNum < score) {
                        _this.testShowNum += index2;
                        //判断是否添加了动画
                        if (!is_maga) {
                            _this.megaWinTextAni = DBComponent.create("dntg_megaWinTextAni", "dntg_megawin");
                            // this.megaWinTextAni = new DBComponent("dntg_megawin");
                            _this.megaWinTextAni.touchEnabled = false;
                            egret.Tween.get(_this.bigwinTitle).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                                _this.megaWinTextAni.play("dntg_megawin", 0);
                                _this.megaWinTextAni.horizontalCenter = 39;
                                _this.megaWinTextAni.bottom = 418;
                                _this.bigwinGroup.addChild(_this.megaWinTextAni);
                            });
                            _this.big_win_fire.play("fire_small", 0);
                            game.LaohuUtils.titaleChangeAni.horizontalCenter = 0;
                            game.LaohuUtils.titaleChangeAni.bottom = 400;
                            _this.bigwinGroup.addChild(game.LaohuUtils.titaleChangeAni);
                            game.LaohuUtils.titaleChangeAni.play("mega_win", 0);
                            game.LaohuUtils.scoreguang.play("", 1);
                            game.LaohuUtils.scoreguang.left = 650;
                            game.LaohuUtils.scoreguang.bottom = 130;
                            _this.bigwinGroup.addChild(_this.bigwinTitle);
                            _this.bigwinGroup.addChild(game.LaohuUtils.scoreguang);
                            _this.bigwinGroup.addChild(_this.countWonLabel);
                            game.LaohuUtils.titaleChangeAni.resetPosition();
                        }
                        is_maga = true;
                        _this.bigwinTitle.source = "bigwinplist_json.MEGA_WIN";
                        _this.countWonLabel.text = NumberFormat.handleFloatDecimal(_this.testShowNum * 100, 0) + "";
                    }
                    else if (_this.testShowNum >= 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) && _this.testShowNum < score) {
                        _this.testShowNum += index3;
                        //判断是否添加了动画
                        if (!is_super) {
                            _this.superWinTextAni = DBComponent.create("dntg_superWinTextAni", "dntg_superwin");
                            // this.superWinTextAni = new DBComponent("dntg_superwin");
                            _this.superWinTextAni.touchEnabled = false;
                            egret.Tween.get(_this.bigwinTitle).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                                game.UIUtils.removeSelf(_this.megaWinTextAni);
                                _this.superWinTextAni.play("dntg_superwin", 0);
                                _this.superWinTextAni.horizontalCenter = 465;
                                _this.superWinTextAni.bottom = 420;
                                _this.bigwinGroup.addChild(_this.superWinTextAni);
                            });
                            _this.big_win_fire.play("fire_small", 0);
                            game.LaohuUtils.titaleChangeAni.horizontalCenter = 0;
                            game.LaohuUtils.titaleChangeAni.bottom = 400;
                            _this.bigwinGroup.addChild(game.LaohuUtils.titaleChangeAni);
                            game.LaohuUtils.titaleChangeAni.play("super_win", 0);
                            game.LaohuUtils.titaleChangeAni.resetPosition();
                            game.LaohuUtils.scoreguang.play("", 1);
                            game.LaohuUtils.scoreguang.left = 650;
                            game.LaohuUtils.scoreguang.bottom = 130;
                            _this.bigwinGroup.addChild(_this.bigwinTitle);
                            _this.bigwinGroup.addChild(game.LaohuUtils.scoreguang);
                            _this.bigwinGroup.addChild(_this.countWonLabel);
                        }
                        is_super = true;
                        _this.bigwinTitle.source = "bigwinplist_json.SUPER_WIN";
                        _this.countWonLabel.text = NumberFormat.handleFloatDecimal(_this.testShowNum * 100, 0) + "";
                    }
                    else {
                        //满足条件timer结束，调用callback方法
                        _this.timer.stop();
                        _this.countWonLabel.text = NumberFormat.handleFloatDecimal(score * 100, 0) + "";
                        SoundManager.getInstance().stopAllEffects();
                        SoundManager.getInstance().playEffect("bigwincomboend_mp3");
                        _this.removeThisPanel(callback);
                        //刚好满足bet的倍数时补加特效
                        if (score == 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                            egret.Tween.get(_this.bigwinTitle).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                                _this.megaWinTextAni.play("dntg_megawin", 0);
                                _this.megaWinTextAni.horizontalCenter = 39;
                                _this.megaWinTextAni.bottom = 418;
                                game.LaohuUtils.titaleChangeAni.horizontalCenter = 0;
                                game.LaohuUtils.titaleChangeAni.bottom = 400;
                                _this.bigwinGroup.addChild(game.LaohuUtils.titaleChangeAni);
                                game.LaohuUtils.titaleChangeAni.play("mega_win", 1);
                                _this.bigwinGroup.addChild(_this.bigwinTitle);
                                _this.bigwinGroup.addChild(_this.megaWinTextAni);
                                game.LaohuUtils.titaleChangeAni.resetPosition();
                            });
                        }
                        if (score == 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                            egret.Tween.get(_this.bigwinTitle).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                                game.UIUtils.removeSelf(_this.megaWinTextAni);
                                _this.superWinTextAni.play("dntg_superwin", 0);
                                _this.superWinTextAni.horizontalCenter = 465;
                                _this.superWinTextAni.bottom = 420;
                                game.LaohuUtils.titaleChangeAni.horizontalCenter = 0;
                                game.LaohuUtils.titaleChangeAni.bottom = 400;
                                _this.bigwinGroup.addChild(game.LaohuUtils.titaleChangeAni);
                                game.LaohuUtils.titaleChangeAni.play("super_win", 1);
                                game.LaohuUtils.titaleChangeAni.resetPosition();
                                _this.bigwinGroup.addChild(_this.bigwinTitle);
                                _this.bigwinGroup.addChild(_this.superWinTextAni);
                                _this.bigwinGroup.addChild(_this.countWonLabel);
                            });
                        }
                        if (score >= 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                            game.LaohuUtils.titaleChangeAni.play("mega_win", 0);
                            _this.bigwinTitle.source = "bigwinplist_json.MEGA_WIN";
                            _this.megaWinTextAni.play("dntg_megawin", 0);
                            _this.megaWinTextAni.horizontalCenter = 39;
                            _this.megaWinTextAni.bottom = 418;
                            _this.bigwinGroup.addChild(_this.megaWinTextAni);
                        }
                        if (score >= 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                            game.LaohuUtils.titaleChangeAni.play("super_win", 0);
                            _this.bigwinTitle.source = "bigwinplist_json.SUPER_WIN";
                            game.UIUtils.removeSelf(_this.megaWinTextAni);
                            _this.superWinTextAni.play("dntg_superwin", 0);
                            _this.superWinTextAni.horizontalCenter = 465;
                            _this.superWinTextAni.bottom = 420;
                            _this.bigwinGroup.addChild(_this.superWinTextAni);
                        }
                    }
                }, _this);
            }, this, 1500);
        };
        DNTGBigwinGroup.prototype.addGoldDown = function () {
            var _this = this;
            this.timer2 = egret.setInterval(function () {
                if (_this.goldDown.numChildren < 25) {
                    var gold_right1 = game.GoldDownPanel.createGold("coin_r1");
                    _this.goldDown.addChild(gold_right1);
                    var gold_right2 = game.GoldDownPanel.createGold("coin_r2");
                    _this.goldDown.addChild(gold_right2);
                    var gold_left1 = game.GoldDownPanel.createLeftGold("coin_l1");
                    _this.goldDown.addChild(gold_left1);
                    var gold_left2 = game.GoldDownPanel.createLeftGold("coin_l2");
                    _this.goldDown.addChild(gold_left2);
                }
            }, this, 250);
        };
        /**
         * bigwin播放结束调用方法
         * @param  {Function} callback?
         */
        DNTGBigwinGroup.prototype.stopShowBigWin = function (callback) {
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().playEffect("bigwincomboend_mp3");
                this.timer.stop();
                SoundManager.getInstance().stopEffectByName("bigwincombo_mp3");
                if (this.score >= 30 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                    game.LaohuUtils.titaleChangeAni.play("mega_win", 0);
                    this.bigwinTitle.source = "bigwinplist_json.MEGA_WIN";
                    this.megaWinTextAni.play("dntg_megawin", 0);
                    this.megaWinTextAni.horizontalCenter = 39;
                    this.megaWinTextAni.bottom = 418;
                    this.bigwinGroup.addChild(this.megaWinTextAni);
                }
                if (this.score >= 50 * (game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) {
                    game.LaohuUtils.titaleChangeAni.play("super_win", 0);
                    this.bigwinTitle.source = "bigwinplist_json.SUPER_WIN";
                    game.UIUtils.removeSelf(this.megaWinTextAni);
                    this.superWinTextAni.play("dntg_superwin", 0);
                    this.superWinTextAni.horizontalCenter = 465;
                    this.superWinTextAni.bottom = 420;
                    this.bigwinGroup.addChild(this.superWinTextAni);
                }
                this.countWonLabel.text = NumberFormat.handleFloatDecimal(this.score * 100, 0) + "";
                this.removeThisPanel(callback);
            }
        };
        /**
         * 移除bigwin效果方法（外部调用）
         * @param  {Function} callback?
         */
        DNTGBigwinGroup.prototype.removeThisPanel = function (callback) {
            var _this = this;
            ObjectPool.cancelPool("coin_r1");
            ObjectPool.cancelPool("coin_r2");
            ObjectPool.cancelPool("coin_l1");
            ObjectPool.cancelPool("coin_l1");
            this.goldDown.removeChildren();
            game.UIUtils.removeSelf(game.LaohuUtils.titaleChangeAni);
            this.isTouched = true;
            egret.clearInterval(this.timer2);
            this.setAutoTimeout(function () {
                game.UIUtils.removeSelf(_this.big_win_fire);
                SoundManager.getInstance().stopEffectByName("bigwincomboend_mp3");
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                _this.bigwinStopRect.fillAlpha = 0;
                _this.countWonLabel.alpha = 0;
                _this.bigwinTitle.alpha = 0;
                callback && callback();
                game.UIUtils.removeSelf(_this.megaWinTextAni);
                game.UIUtils.removeSelf(_this.superWinTextAni);
                _this.removeChildren();
                if (_this.parent) {
                    _this.parent.removeChild(_this);
                }
            }, this, 4000);
        };
        DNTGBigwinGroup.prototype.showpanel = function () {
            this.visible = true;
        };
        return DNTGBigwinGroup;
    }(game.BaseComponent));
    dntg.DNTGBigwinGroup = DNTGBigwinGroup;
    __reflect(DNTGBigwinGroup.prototype, "dntg.DNTGBigwinGroup");
})(dntg || (dntg = {}));
