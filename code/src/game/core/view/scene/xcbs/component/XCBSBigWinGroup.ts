module xcbs {
    export class XCBSBigwinGroup extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public maskRect: eui.Rect;
        public bigwinPanel: eui.Group;
        public winImag: eui.Image;
        public winNum: eui.BitmapLabel;
        public effectGroup: eui.Group;
        public titleChangeAni: DBComponent;
        // public bigwinAni: DBComponent;
        // public megawinAni: DBComponent;
        // public superwinAni: DBComponent;
        public effectGroup1: eui.Group;

        public constructor() {
            super();
            this.skinName = "XCBSBigwinGroup";
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
        // private winImagAni: DBComponent;
        public bigwinImagGroup: eui.Group;
        // public bigwinGuangAni: DBComponent;
        public bgAni: DBComponent;
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        public showScore(num: number, callback?: Function) {
            this.bgAni = DBComponent.create("xcbs_bigwin_bg", "xcbs_bigwin_2")
            // this.bigwinAni = DBComponent.create("xcbs_bigwin_1_ske", "xcbs_bigwin_1");
            // this.megawinAni = DBComponent.create("xcbs_megawin_1_ske", "xcbs_megawin_1");
            // this.superwinAni = DBComponent.create("xcbs_superwin_1_ske", "xcbs_superwin_1");
            this.titleChangeAni = DBComponent.create("xcbs_winboom", "xcbs_winboom");
            this.maskRect.fillAlpha = 0;
            this.score = num;
            this.timer1 = new egret.Timer(20);
            this.winNum.scaleX = this.winNum.scaleY = 1;

            // this.superwinAni.play("", 0);
            // this.superwinAni.horizontalCenter = 0;
            // this.superwinAni.bottom = 445;
            let index1, index2, index3, time: number = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15 && num < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 30) {
                    index1 = num / 335;
                    time = 11000;
                } else if (num >= ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 30 && num < ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 50) {
                    index1 = 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index2 = (num - 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) / 335;
                    time = 22000;
                } else if (num >= ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 50) {
                    index1 = 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index2 = 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) / 335;
                    index3 = (num - 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) / 365;
                    time = 34000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("xcbs_bigwincombo_mp3", true);
                this.winImag.alpha = this.winNum.alpha = 1;
                // this.bigwinAni.play("", 0);
                // this.bigwinAni.horizontalCenter = 0;
                // this.bigwinAni.bottom = 433;
                // this.effectGroup1.addChild(this.bigwinAni);
                // this.bigwinAni.resetPosition();

                this.titleChangeAni.play("", 1);
                this.titleChangeAni.horizontalCenter = 0;
                this.titleChangeAni.bottom = 0;
                this.resizeGroup.addChild(this.titleChangeAni);
                this.titleChangeAni.resetPosition();

                this.bgAni.play("", 0)
                this.bgAni.horizontalCenter = 0;
                this.bgAni.bottom = -300;
                this.bgAni.touchEnabled = false;
                this.effectGroup.addChild(this.bgAni);
                this.bgAni.resetPosition();

                // egret.Tween.get(this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);
                egret.Tween.get(this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200);
                this.effectGroup.visible = true;
                this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                this.bigwinPanel.visible = true;
                this.bigwinPanel.horizontalCenter = 0;
                this.resizeGroup.addChild(this.bigwinPanel);
                this.resizeGroup.addChild(this.effectGroup);
                this.resizeGroup.addChild(this.winImag);
                this.resizeGroup.addChild(this.winNum);
                this.resizeGroup.addChild(this.effectGroup1);
                this.resizeGroup.addChild(this.bigwinImagGroup);
                SoundManager.getInstance().pauseMusic();
            }, this, 800);

            let is_big, is_mega, is_super: boolean = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, () => {
                if (this.testscore < ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) * 30 && this.testscore < num) {
                    this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        this.winImag.source = "xcbs_bigwin1_png";
                    }
                    is_big = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (this.testscore < 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && this.testscore >= 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && this.testscore < num) {
                    this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        this.titleChangeAni.play("", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 0;
                        this.resizeGroup.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();
                        this.winImag.source = "xcbs_bigwin2_png";
                        this.bgAni = DBComponent.create("xcbs_megawin_2", "xcbs_megawin_2");
                        this.bgAni.play("", 0);
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            // game.UIUtils.removeSelf(this.bigwinAni);
                            // this.megawinAni.play("", 0);
                            // this.megawinAni.horizontalCenter = 0;
                            // this.megawinAni.bottom = 433;
                            // this.effectGroup1.addChild(this.megawinAni);
                            // this.megawinAni.resetPosition();
                        })
                    }
                    is_mega = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else if (this.testscore >= 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) && this.testscore < num) {
                    this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        // game.UIUtils.removeSelf(this.megawinAni);
                        this.titleChangeAni.play("", 1);
                        this.titleChangeAni.horizontalCenter = 0;
                        this.titleChangeAni.bottom = 0;
                        this.resizeGroup.addChild(this.titleChangeAni);
                        this.titleChangeAni.resetPosition();
                        this.bgAni = DBComponent.create("xcbs_superwin_2", "xcbs_superwin_2");
                        this.bgAni.play("", 0);
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            // this.superwinAni.play("", 0);
                            // this.superwinAni.horizontalCenter = 0;
                            // this.superwinAni.bottom = 433;
                            // this.effectGroup1.addChild(this.superwinAni);
                            // this.superwinAni.resetPosition();
                        })
                        this.winImag.source = "xcbs_bigwin3_png";
                    }
                    is_super = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("xcbs_bigwinend_mp3");
                    this.timer1.stop();
                    egret.Tween.removeTweens(this.winNum);
                    egret.Tween.get(this.winNum).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backInOut)
                    this.bigwinPanel.visible = false;
                    let data = Number(new Big(num).mul(100));
                    this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    this.removeThisPanel(callback);
                    this.isTouched = true;
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
                SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("xcbs_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                this.maskRect.fillAlpha = 0.7;
                this.winNum.alpha = 1;
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);

                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);

                let data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";

                if (this.score >= 30 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) {
                    // game.UIUtils.removeSelf(this.bigwinAni);
                    this.winImag.source = RES.getRes("xcbs_bigwin2_png");
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.bgAni = DBComponent.create("xcbs_megawin_2", "xcbs_megawin_2");
                        this.bgAni.play("", 0);
                        // this.megawinAni.play("", 0);
                        // this.megawinAni.horizontalCenter = 0;
                        // this.megawinAni.bottom = 390;
                        // this.effectGroup1.addChild(this.megawinAni);
                        // this.megawinAni.resetPosition();
                    })

                }
                if (this.score >= 50 * ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50))) {
                    this.winImag.source = RES.getRes("xcbs_bigwin3_png");
                    // game.UIUtils.removeSelf(this.megawinAni);
                    // game.UIUtils.removeSelf(this.bigwinAni);
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.bgAni = DBComponent.create("xcbs_superwin_2", "xcbs_superwin_2");
                        this.bgAni.play("", 0);
                        // this.superwinAni.play("", 0);
                        // this.superwinAni.horizontalCenter = 0;
                        // this.superwinAni.bottom = 394;
                        // this.effectGroup1.addChild(this.superwinAni);
                        // this.superwinAni.resetPosition();
                    })

                }
            }
        }

        /**
        * 金币对象池金币效果
        */
        private timer2: any;
        private addGoldDown() {
            this.timer2 = egret.setInterval(() => {
                if (this.bigwinPanel.numChildren < 30) {
                    let gold_right1 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right1");
                    this.bigwinPanel.addChild(gold_right1);
                    let gold_right2 = game.GoldDownPanel.createsdLeftGold("sdxl_gold_right2");
                    this.bigwinPanel.addChild(gold_right2);
                    let gold_left1 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left1");
                    this.bigwinPanel.addChild(gold_left1);
                    let gold_left2 = game.GoldDownPanel.createsdxlGold("sdxl_gold_left2");
                    this.bigwinPanel.addChild(gold_left2);
                }
            }, this, 300);
        }

        /**
        * 移除bigwin窗口
        * @param  {Function} callback?
        */
        public removeThisPanel(callback?: Function) {
            ObjectPool.cancelPool("sdxl_gold_right1");
            ObjectPool.cancelPool("sdxl_gold_right2");
            ObjectPool.cancelPool("sdxl_gold_left1");
            ObjectPool.cancelPool("sdxl_gold_left2");
            this.bigwinPanel.removeChildren();
            egret.clearInterval(this.timer2);
            egret.setTimeout(() => {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("xcbs_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_bigwinend_mp3");
                // game.UIUtils.removeSelf(this.bigwinAni);
                // game.UIUtils.removeSelf(this.megawinAni);
                // game.UIUtils.removeSelf(this.superwinAni);
                game.UIUtils.removeSelf(this.bgAni);
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