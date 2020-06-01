// TypeScript file
module bscs {
    export class BSCSBigwinGroup extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public maskRect: eui.Rect;
        public bigwinPanel: eui.Group;
        public winImag: eui.Image;
        public winNum: eui.BitmapLabel;
        public effectGroup: eui.Group;
        public bigwinAni: DBComponent;
        public megawinAni: DBComponent;
        public superwinAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "BSCSBigwinPanelSkin";
        }
        public createChildrean() {
            super.createChildren();

        }
        public onAdded() {
            super.onAdded();
        }
        public onRemoved() {
            super.onRemoved();
        }

        private score: number = 0;
        private timer1: egret.Timer;
        private showResultTimeOut: any;
        private testscore: number = 0;
        private isTouched: boolean = false;
        private isPlayingMusic: boolean = false; //是否在播放背景音乐
        private titleChangeAni: DBComponent;
        public bigwinImagGroup: eui.Group;
        public wingoldBgAni: DBComponent;
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        public showScore(num: number, callback?: Function) {
            this.bigwinAni = new DBComponent("bscq_bigwin");
            this.megawinAni = new DBComponent("bscq_megawin");
            this.superwinAni = new DBComponent("bscq_superwin");
            this.titleChangeAni = DBComponent.create("bscs_titleChange_ani", "dntg_bigwin_guang");
            this.wingoldBgAni = DBComponent.create("bscq_winani", "bscq_win");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;

            // this.superwinAni.play("", 0);
            // this.superwinAni.horizontalCenter = 0;
            // this.superwinAni.bottom = 445;
            let index1, index2, index3, time: number = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.BSCSUtils.bet * 2 * 15 && num < game.BSCSUtils.bet * 2 * 30) {
                    index1 = num / 185;
                    time = 6000;
                } else if (num >= (game.BSCSUtils.bet * 2) * 30 && num < (game.BSCSUtils.bet * 2) * 50) {
                    index1 = 30 * (game.BSCSUtils.bet * 2) / 185;
                    index2 = (num - 30 * (game.BSCSUtils.bet * 2)) / 185;
                    time = 12000;
                } else if (num >= (game.BSCSUtils.bet * 2) * 50) {
                    index1 = 30 * (game.BSCSUtils.bet * 2) / 185;
                    index2 = 50 * (game.BSCSUtils.bet * 2) / 185;
                    index3 = (num - 50 * (game.BSCSUtils.bet * 2)) / 185;
                    time = 18000;
                }
            }
            this.timer1.start();
            SoundManager.getInstance().playEffect("bscs_bigwincombo_mp3");
            this.showResultTimeOut = egret.setTimeout(() => {
                this.winNum.alpha = this.winImag.alpha = 1;
                this.bigwinAni.play("", 0);
                this.bigwinAni.horizontalCenter = 0;
                this.bigwinAni.bottom = 445;
                this.effectGroup.addChild(this.bigwinAni);
                this.bigwinAni.resetPosition();
                // SoundManager.getInstance().playEffect("bscs_bigwinend_mp3");
                // SoundManager.getInstance().playEffect("cbzz_bigwin_mus1_mp3",true);
                this.effectGroup.visible = true;

                this.maskRect.fillAlpha = 0.7;
                this.addGoldDown();
                this.bigwinPanel.visible = true;
                this.bigwinPanel.horizontalCenter = 0;
                this.titleChangeAni.play("dntg_bigwin_guang", 1);
                this.titleChangeAni.horizontalCenter = 0;
                this.titleChangeAni.bottom = 300;

                this.wingoldBgAni.play("", 0);
                this.wingoldBgAni.horizontalCenter = 0;
                this.wingoldBgAni.bottom = -65;
                this.resizeGroup.addChild(this.wingoldBgAni);
                this.wingoldBgAni.resetPosition();
                this.bigwinPanel.addChild(this.titleChangeAni);
                this.titleChangeAni.resetPosition();
                this.resizeGroup.addChild(this.bigwinPanel);
                this.resizeGroup.addChild(this.winImag);
                this.resizeGroup.addChild(this.effectGroup);
                this.resizeGroup.addChild(this.bigwinImagGroup);
                this.resizeGroup.addChild(this.winNum);

                // game.BSCSUtils.bigwinAni1.resetPosition();
                // game.BSCSUtils.bigwinAni1.touchEnabled = false;
                SoundManager.getInstance().pauseMusic();

            }, this, 800);

            let is_big, is_mega, is_super: boolean = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, () => {
                if (this.testscore < (game.BSCSUtils.bet * 2) * 30 && this.testscore < num) {
                    this.testscore += index1;
                    //判断是否添加了动画

                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (this.testscore < 50 * (game.BSCSUtils.bet * 2) && this.testscore >= 30 * (game.BSCSUtils.bet * 2) && this.testscore < num) {
                    this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        this.winImag.source = RES.getRes("bscq_bigwin_2_png");
                        this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 300;
                        this.bigwinPanel.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            game.UIUtils.removeSelf(this.bigwinAni);
                            this.megawinAni.play("", 0);
                            this.megawinAni.horizontalCenter = 0;
                            this.megawinAni.bottom = 445;
                            this.effectGroup.addChild(this.megawinAni);
                            this.megawinAni.resetPosition();
                        })

                    }
                    is_mega = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else if (this.testscore >= 50 * (game.BSCSUtils.bet * 2) && this.testscore < num) {
                    this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        this.winImag.source = RES.getRes("bscq_bigwin_3_png");
                        this.titleChangeAni.play("dntg_bigwin_guang", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 300;
                        this.bigwinPanel.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            game.UIUtils.removeSelf(this.megawinAni);
                            this.superwinAni.play("", 0);
                            this.superwinAni.horizontalCenter = 0;
                            this.superwinAni.bottom = 445;
                            this.effectGroup.addChild(this.superwinAni);
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
                    SoundManager.getInstance().stopEffectByName("bscs_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("bscs_bigwinend_mp3");
                    // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                    this.timer1.stop();

                    egret.Tween.removeTweens(this.winNum);
                    egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    this.bigwinPanel.visible = false;
                    let data = Number(new Big(num).mul(100));
                    this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    this.removeThisPanel(callback);
                    this.isTouched = true;
                    // this.resizeGroup.addChild(this.winImag);
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.BSCSUtils.bet * 2)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("bscq_bigwin_2_png");
                        })

                    }
                    if (num == 50 * (game.BSCSUtils.bet * 2)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("bscq_bigwin_3_png");
                        })


                    }
                    if (num >= 30 * (game.BSCSUtils.bet * 2)) {
                        this.winImag.source = "bscq_bigwin_2_png";
                    }
                    if (num >= 50 * (game.BSCSUtils.bet * 2)) {
                        this.winImag.source = "bscq_bigwin_3_png";
                    }
                }
            }, this);
        }

        /**
        * 点击结束数字跳动
        * @param  {Function} callback?
        */
        public stopShowBigWin(callback?: Function) {
            //禁止重复点击
            if (!this.isTouched) {
                this.isTouched = true;
                SoundManager.getInstance().stopEffectByName("bscs_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("bscs_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1
                this.winNum.alpha = 1;
                if (this.score == 30 * (game.BSCSUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("bscq_bigwin_2_png");
                        game.UIUtils.removeSelf(this.bigwinAni);
                        this.megawinAni.play("", 0);
                        this.megawinAni.horizontalCenter = 0;
                        this.megawinAni.bottom = 445;
                        this.effectGroup.addChild(this.megawinAni);
                        this.megawinAni.resetPosition();
                    })
                }
                if (this.score == 50 * (game.BSCSUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("bscq_bigwin_3_png");
                        game.UIUtils.removeSelf(this.megawinAni);
                        this.superwinAni.play("", 0);
                        this.superwinAni.horizontalCenter = 0;
                        this.superwinAni.bottom = 445;
                        this.effectGroup.addChild(this.superwinAni);
                        this.superwinAni.resetPosition();
                    })
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");

                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);

                let data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";

                if (this.score >= 30 * (game.BSCSUtils.bet * 2)) {
                    this.winImag.source = RES.getRes("bscq_bigwin_2_png");
                    game.UIUtils.removeSelf(this.bigwinAni);
                    this.megawinAni.play("", 0);
                    this.megawinAni.horizontalCenter = 0;
                    this.megawinAni.bottom = 445;
                    this.effectGroup.addChild(this.megawinAni);
                    this.megawinAni.resetPosition();
                }
                if (this.score >= 50 * (game.BSCSUtils.bet * 2)) {
                    this.winImag.source = RES.getRes("bscq_bigwin_3_png");
                    game.UIUtils.removeSelf(this.megawinAni);
                    this.superwinAni.play("", 0);
                    this.superwinAni.horizontalCenter = 0;
                    this.superwinAni.bottom = 445;
                    this.effectGroup.addChild(this.superwinAni);
                    this.superwinAni.resetPosition();
                }
            }
        }

        /**
        * 金币对象池金币效果
        */
        private timer2: any;
        private addGoldDown() {
            this.timer2 = egret.setInterval(() => {
                let gold_right1 = game.GoldDownPanel.createGold("bscs_coinlr1");
                this.bigwinPanel.addChild(gold_right1);
                let gold_right2 = game.GoldDownPanel.createGold("bscs_coinlr2");
                this.bigwinPanel.addChild(gold_right2);
                let gold_left1 = game.GoldDownPanel.createLeftGold("bscs_coinl1");
                this.bigwinPanel.addChild(gold_left1);
                let gold_left2 = game.GoldDownPanel.createLeftGold("bscs_coinl12");
                this.bigwinPanel.addChild(gold_left2);
            }, this, 250);
        }

        /**
        * 移除bigwin窗口
        * @param  {Function} callback?
        */
        public removeThisPanel(callback?: Function) {
            ObjectPool.cancelPool("bscs_coinr1");
            ObjectPool.cancelPool("bscs_coinr2");
            ObjectPool.cancelPool("bscs_coinl1");
            ObjectPool.cancelPool("bscs_coinl2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            egret.setTimeout(() => {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("bscs_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("bscs_bigwinend_mp3");
                game.UIUtils.removeSelf(this.bigwinAni);
                game.UIUtils.removeSelf(this.megawinAni);
                game.UIUtils.removeSelf(this.superwinAni);
                game.UIUtils.removeSelf(this.titleChangeAni);
                //恢复背景音乐      
                this.maskRect.fillAlpha = 0;
                this.winNum.alpha = 0;
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