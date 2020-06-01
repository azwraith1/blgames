/*
 * @Author: real MC Lee 
 * @Date: 2019-05-31 17:46:05 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-10 17:48:17
 * @Description: 
 */
module sdmn {
    export class SDMNBigwinPanel extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public maskRect: eui.Rect;
        public bigwinPanel: eui.Group;
        public winImag: eui.Image;
        public winNum: eui.BitmapLabel;
        public effectGroup: eui.Group;

        public titleChangeAni: DBComponent;
        public megawinAni: DBComponent;
        public superwinAni: DBComponent;
        public bgAni: DBComponent;
        // public bgAni2: DBComponent;

        public constructor() {
            super();
            this.skinName = "SDMNBigwinSkin";
        }

        public createChildren() {
            super.createChildren();

        }

        private score: number = 0;
        private timer1: egret.Timer;
        private showResultTimeOut: any;
        private testscore: number = 0;
        private isTouched: boolean = false;
        private isPlayingMusic: boolean = false; //是否在播放背景音乐

        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        public showScore(num: number, callback?: Function) {
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
            let index1, index2, index3, time: number = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 15 && num < game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30) {
                    index1 = num / (330 * (num / (game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30)));
                    time = 11000 * (num / (game.SDMNUtils.bet * game.SDMNUtils.mul * 50 * 30));
                } else if (num >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 30 && num < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 330;
                    index2 = (num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / (336 * ((num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / ((game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 20)));
                    time = 11000 * (1 + ((num - 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / ((game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 20)));
                } else if (num >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 50) {
                    index1 = 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 330;
                    index2 = 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) / 336;
                    index3 = (num - 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) / 330;
                    time = 33000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(() => {
                this.winImag.alpha = this.winNum.alpha = 1;
                egret.Tween.get(this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                this.effectGroup.visible = true;
                this.bgAni.play("", 0);
                this.bgAni.horizontalCenter = 0;
                this.bgAni.bottom = -200;
                this.initBgAni();
                this.addGoldDown();
                this.resizeGroup.addChild(this.bgAni);
                this.bgAni.resetPosition();
                // this.bgAni2.play("", 0);
                // this.bgAni2.horizontalCenter = 0;
                // this.bgAni2.bottom = 0;
                // this.resizeGroup.addChild(this.bgAni2);
                // this.bgAni2.resetPosition();

                this.titleChangeAni.play("dntg_bigwin_guang", 1);
                this.titleChangeAni.horizontalCenter = 0;
                this.titleChangeAni.bottom = 300;

                this.maskRect.fillAlpha = 0.7;
                this.bigwinPanel.visible = true;
                this.bigwinPanel.horizontalCenter = 0;
                this.winImag.source = RES.getRes("sdmn_bigwin_ima_png");
                this.resizeGroup.addChild(this.bigwinPanel);
                this.resizeGroup.addChild(this.winNum);
                this.resizeGroup.addChild(this.winImag);
                this.effectGroup.addChild(this.titleChangeAni);
                this.titleChangeAni.resetPosition();
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(() => {
                })
            }, this, 1200);

            let is_big, is_mega, is_super: boolean = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, () => {
                if (this.testscore < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 30 && this.testscore < num) {
                    this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        this.winImag.source = RES.getRes("sdmn_bigwin_ima_png")
                    }
                    is_big = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (this.testscore < 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && this.testscore >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && this.testscore < num) {
                    this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 300;
                        this.effectGroup.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();

                        this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                        SoundManager.getInstance().playEffect("sdmn_winchangemp3_mp3");
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.megawinAni.play("", 0);
                            this.megawinAni.horizontalCenter = 0;
                            this.megawinAni.bottom = 397;
                            this.resizeGroup.addChild(this.megawinAni);
                            this.megawinAni.resetPosition();
                        })
                    }
                    is_mega = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else if (this.testscore >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) && this.testscore < num) {
                    this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(this.megawinAni);
                        this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 300;
                        this.effectGroup.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();
                        SoundManager.getInstance().playEffect("sdmn_winchangemp3_mp3");
                        this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.superwinAni.play("", 0);
                            this.resizeGroup.addChild(this.superwinAni);
                            this.superwinAni.resetPosition();
                        })
                    }
                    is_super = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("sdmn_bigwin_combo_mp3");
                    SoundManager.getInstance().playEffect("sdmn_bigwin_comboend_mp3");
                    this.timer1.stop();
                    this.isTouched = true;
                    game.UIUtils.removeSelf(this.bgAni);
                    // game.UIUtils.removeSelf(this.bgAni2);
                    game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                    egret.Tween.removeTweens(this.winNum);
                    egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    this.bigwinPanel.visible = false;
                    let data = Number(new Big(num).mul(100));
                    this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    this.removeThisPanel(callback);
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                        })

                    }
                    if (num == 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                        })

                    }
                    if (num >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                    }
                    if (num >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                        this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                    }
                }
            }, this);
        }

        private initBgAni() {
            game.SDMNUtils.bgAni3.play("", 1);
            game.SDMNUtils.bgAni3.horizontalCenter = Math.floor(Math.random() * 1000) - 500;
            game.SDMNUtils.bgAni3.bottom = Math.floor(Math.random() * 700);
            game.SDMNUtils.bgAni3.scaleX = game.SDMNUtils.bgAni3.scaleY = 2;
            game.SDMNUtils.bgAni3.callback = () => {
                game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                return this.initBgAni();
            }
            this.resizeGroup.addChild(game.SDMNUtils.bgAni3);
            game.SDMNUtils.bgAni3.resetPosition();
        }

        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        public stopShowBigWin(callback?: Function) {
            //禁止重复点击
            if (this.isTouched) return;
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
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                    })
                }
                if (this.score == 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                    })
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                game.UIUtils.removeSelf(this.bgAni);
                // game.UIUtils.removeSelf(this.bgAni2);
                game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);

                let data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";

                if (this.score >= 30 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    // this.resizeGroup.addChild(ion();
                    this.winImag.source = RES.getRes("sdmn_megawin_ima_png");
                }
                if (this.score >= 50 * (game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                    this.winImag.source = RES.getRes("sdmn_superwin_ima_png");
                }
            }
        }
        /**
       * 金币对象池金币效果
       */
        private timer2: any;
        private addGoldDown() {
            this.timer2 = egret.setInterval(() => {
                if (this.bigwinPanel.numChildren < 20) {
                    let gold_right1 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin1");
                    this.bigwinPanel.addChild(gold_right1);
                    let gold_right2 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin3");
                    this.bigwinPanel.addChild(gold_right2);
                    let gold_left1 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin2");
                    this.bigwinPanel.addChild(gold_left1);
                    let gold_left2 = game.GoldDownPanel.createsdxlGold2("sdmn_bigwin_coin4");
                    this.bigwinPanel.addChild(gold_left2);
                }
            }, this, 250);
        }

        /**
       * 移除bigwin窗口
       * @param  {Function} callback?
       */
        public removeThisPanel(callback?: Function) {
            ObjectPool.cancelPool("sdmn_bigwin_coin1");
            ObjectPool.cancelPool("sdmn_bigwin_coin2");
            ObjectPool.cancelPool("sdmn_bigwin_coin3");
            ObjectPool.cancelPool("sdmn_bigwin_coin4");
            this.bigwinPanel.removeChildren();
            game.UIUtils.removeSelf(this.bgAni);
            // game.UIUtils.removeSelf(this.bgAni2);
            game.UIUtils.removeSelf(game.SDMNUtils.bgAni3);
            egret.clearInterval(this.timer2);
            egret.setTimeout(() => {
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(this.megawinAni);
                game.UIUtils.removeSelf(this.superwinAni);
                SoundManager.getInstance().stopEffectByName("sdmn_bigwin_combo_mp3");
                SoundManager.getInstance().stopEffectByName("sdmn_bigwin_comboend_mp3");
                game.UIUtils.removeSelf(this.titleChangeAni);
                //恢复背景音乐      
                this.maskRect.fillAlpha = 0;
                this.winImag.alpha = this.winNum.alpha = 0;
                this.winNum.text = "0";
                this.testscore = 0;
                callback && callback();
                this.removeChildren();
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }, this, 5000)
        }

    }
}