// TypeScript file
module gdzw {
    export class GDZWBigwinGroup extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public maskRect: eui.Rect;
        public bigwinPanel: eui.Group;
        public winImag: eui.Image;
        public winNum: eui.BitmapLabel;
        public effectGroup: eui.Group;
        public bgAni: DBComponent;
        public bigwinAni: DBComponent;
        public megawinAni: DBComponent;
        public superwinAni: DBComponent;
        public titleChangeAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "GDZWBigwinGroupSkin";
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
        private winImagAni: DBComponent;
        public bigwinImagGroup: eui.Group;
        /**
         * 分数跳动方法
         * @param  {number} num
         * @param  {Function} callback?
         */
        public showScore(num: number, callback?: Function) {
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
            this.titleChangeAni.scaleX = this.titleChangeAni.scaleY = 0.8
            this.titleChangeAni.horizontalCenter = 1600;
            this.titleChangeAni.bottom = -2800;
            this.resizeGroup.addChild(this.titleChangeAni);
            this.titleChangeAni.resetPosition();
            SoundManager.getInstance().playEffect("gdzw_ex1_mp3");
            this.winNum.scaleX = this.winNum.scaleY = 1;
            let index1, index2, index3, time: number = 0; //bigwin,megawin,superwin 累加值
            if (num) {
                if (num >= game.GDZWUtils.bet * 2 * 15 && num < game.GDZWUtils.bet * 2 * 30) {
                    index1 = num / 305;
                    time = 10000;
                } else if (num >= (game.GDZWUtils.bet * 2) * 30 && num < (game.GDZWUtils.bet * 2) * 50) {
                    index1 = 30 * (game.GDZWUtils.bet * 2) / 305;
                    index2 = (num - 30 * (game.GDZWUtils.bet * 2)) / 305;
                    time = 20000;
                } else if (num >= (game.GDZWUtils.bet * 2) * 50) {
                    index1 = 30 * (game.GDZWUtils.bet * 2) / 305;
                    index2 = 50 * (game.GDZWUtils.bet * 2) / 305;
                    index3 = (num - 50 * (game.GDZWUtils.bet * 2)) / 305;
                    time = 30000;
                }
            }
            this.timer1.start();
            this.showResultTimeOut = egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("gdzw_bigwincombo_mp3");
                this.winImagAni.play("", 0);
                this.winImagAni.horizontalCenter = 0;
                this.winImagAni.bottom = -350;
                this.bigwinPanel.addChild(this.winImagAni);
                this.winImagAni.resetPosition();
                this.winNum.alpha = this.winImag.alpha = 1;
                this.bigwinAni.play("", 0);
                this.bigwinAni.horizontalCenter = 0;
                this.bigwinAni.bottom = 400;
                this.effectGroup.addChild(this.bigwinAni);
                this.bigwinAni.resetPosition();
                egret.Tween.get(this.winNum).to({ scaleX: 1.4, scaleY: 1.4 }, time);

                this.effectGroup.visible = true;

                // this.maskRect.fillAlpha = 0.7;
                // this.addGoldDown();
                this.bigwinPanel.horizontalCenter = 0;
                // game.GDZWUtils.bigwinAni1.play("", 0);
                // game.GDZWUtils.bigwinAni1.horizontalCenter = 0;
                // game.GDZWUtils.bigwinAni1.bottom = -350;
                // this.resizeGroup.addChild(game.GDZWUtils.bigwinAni1);
                this.bgAni.play("", 0);
                this.bgAni.horizontalCenter = 0;
                this.bgAni.bottom = -20;
                this.resizeGroup.addChild(this.bigwinPanel);
                this.resizeGroup.addChild(this.bgAni);
                this.bgAni.resetPosition();
                this.resizeGroup.addChild(this.winNum);
                this.resizeGroup.addChild(this.winImag);
                this.resizeGroup.addChild(this.effectGroup);
                this.resizeGroup.addChild(this.bigwinImagGroup);
                // game.GDZWUtils.bigwinAni1.resetPosition();
                // game.GDZWUtils.bigwinAni1.touchEnabled = false;
                SoundManager.getInstance().pauseMusic();
                egret.Tween.get(this.winImag).to({ scaleX: 1.1, scaleY: 1.1 }, 200).to({ scaleX: 0.9, scaleY: 0.9 }, 200).to({ scaleX: 1, scaleY: 1 }, 200).call(() => {
                })
            }, this, 800);

            let is_big, is_mega, is_super: boolean = false;
            this.timer1.addEventListener(egret.TimerEvent.TIMER, () => {
                if (this.testscore < (game.GDZWUtils.bet * 2) * 30 && this.testscore < num) {
                    this.testscore += index1;
                    //判断是否添加了动画
                    if (!is_big) {
                        this.winImag.source = "gdzw_game_txt6_png";
                    }
                    is_big = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                }
                else if (this.testscore < 50 * (game.GDZWUtils.bet * 2) && this.testscore >= 30 * (game.GDZWUtils.bet * 2) && this.testscore < num) {
                    this.testscore += index2;
                    //判断是否添加了动画
                    if (!is_mega) {
                        this.winImag.source = "gdzw_game_txt2_png";
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            game.UIUtils.removeSelf(this.bigwinAni);
                            this.megawinAni.play("", 0);
                            this.megawinAni.horizontalCenter = 0;
                            this.megawinAni.bottom = 405;
                            this.effectGroup.addChild(this.megawinAni);
                            this.megawinAni.resetPosition();
                        })
                    }
                    is_mega = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else if (this.testscore >= 50 * (game.GDZWUtils.bet * 2) && this.testscore < num) {
                    this.testscore += index3;
                    //判断是否添加了动画
                    if (!is_super) {
                        game.UIUtils.removeSelf(this.megawinAni);
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.superwinAni.play("", 0);
                            this.superwinAni.horizontalCenter = 0;
                            this.superwinAni.bottom = 405;
                            this.effectGroup.addChild(this.superwinAni);
                            this.superwinAni.resetPosition();
                        })
                        this.winImag.source = "gdzw_game_txt4_png";
                    }
                    is_super = true;
                    if (this.testscore) {
                        let data = Number(new Big(this.testscore).mul(100));
                        this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    }
                } else {
                    //满足条件timer结束，调用callback方法
                    SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                    SoundManager.getInstance().playEffect("gdzw_bigwinend_mp3");
                    // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");
                    this.timer1.stop();
                    egret.Tween.removeTweens(this.winNum);
                    egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                    // this.bigwinPanel.visible = false;
                    let data = Number(new Big(num).mul(100));
                    this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                    this.removeThisPanel(callback);
                    this.isTouched = true;
                    //刚好满足bet的倍数时补加特效
                    if (num == 30 * (game.GDZWUtils.bet * 2)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("gdzw_game_txt2_png");
                        })

                    }
                    if (num == 50 * (game.GDZWUtils.bet * 2)) {
                        egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                            this.winImag.source = RES.getRes("gdzw_game_txt4_png");
                        })
                    }
                    if (num >= 30 * (game.GDZWUtils.bet * 2)) {
                        this.winImag.source = "gdzw_game_txt2_png";
                    }
                    if (num >= 50 * (game.GDZWUtils.bet * 2)) {
                        this.winImag.source = "gdzw_game_txt4_png";
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
                SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                SoundManager.getInstance().playEffect("gdzw_bigwinend_mp3");
                egret.clearTimeout(this.showResultTimeOut);
                // this.maskRect.fillAlpha = 0.7;
                this.winImag.alpha = 1
                this.winNum.alpha = 1;
                if (this.score == 30 * (game.GDZWUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("gdzw_game_txt2_png");
                    })
                }
                if (this.score == 50 * (game.GDZWUtils.bet * 2)) {
                    egret.Tween.get(this.winImag).to({ scaleX: 0.2, scaleY: 0.2 }, 20).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut).to({ scaleX: 0.8, scaleY: 0.8 }, 80).to({ scaleX: 1.1, scaleY: 1.1 }, 60).to({ scaleX: 0.9, scaleY: 0.9 }, 60).to({ scaleX: 1, scaleY: 1 }, 50).call(() => {
                        this.winImag.source = RES.getRes("gdzw_game_txt4_png");
                    })
                }
                this.timer1.stop();
                egret.Tween.removeTweens(this.winNum);
                // SoundManager.getInstance().stopEffectByName("cbzz_bigwin_mus1_mp3");

                egret.Tween.get(this.winNum).to({ scaleX: 1.3, scaleY: 1.3 }, 100).to({ scaleX: 1.5, scaleY: 1.5 }, 100).to({ scaleX: 1.4, scaleY: 1.4 }, 80);
                // this.bigwinPanel.visible = false;
                this.removeThisPanel(callback);

                let data = Number(new Big(this.score).mul(100));
                this.winNum.text = NumberFormat.handleFloatDecimal(data, 0) + "";

                if (this.score >= 30 * (game.GDZWUtils.bet * 2)) {
                    this.winImag.source = "gdzw_game_txt2_png";
                }
                if (this.score >= 50 * (game.GDZWUtils.bet * 2)) {
                    this.winImag.source = "gdzw_game_txt4_png";
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
            game.UIUtils.removeSelf(this.winImagAni);
            game.UIUtils.removeSelf(this.bigwinAni);
            game.UIUtils.removeSelf(this.megawinAni);
            game.UIUtils.removeSelf(this.superwinAni);
            game.UIUtils.removeSelf(this.titleChangeAni);
            egret.setTimeout(() => {
                SoundManager.getInstance().remuseMusic();
                SoundManager.getInstance().stopEffectByName("gdzw_bigwincombo_mp3");
                SoundManager.getInstance().stopEffectByName("gdzw_bigwinend_mp3");
                //恢复背景音乐      
                // this.maskRect.fillAlpha = 0;
                this.winNum.alpha = 0;
                this.winImag.alpha = 0;
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