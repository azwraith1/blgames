/*
 * @Author: real MC Lee 
 * @Date: 2019-06-04 16:24:30 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-04 13:59:12
 * @Description: 
 */
module bskg {
    export class BSKGScene3 extends game.BaseScene {
        public resizeGroup: eui.Group;
        public effectGroup: eui.Group;
        public freeGroup: eui.Group;
        public freeMulGroup: eui.Group;
        public freeMulGroup0: eui.Group;
        public bei: eui.BitmapLabel;
        public scroller: bskg.BSKGScroller;
        public freeWinGroup: eui.Group;
        public freeTimesLabel: eui.BitmapLabel;
        public freeWinLabel: eui.BitmapLabel;
        public roleAniGroup: eui.Group;
        public totalWinGroup: eui.Group;
        public totalWinLabel: eui.BitmapLabel;
        public lineScoreGroup: eui.Group;
        public lineNum: eui.BitmapLabel;
        public shakeGroup: eui.Group;


        private bskgFreeBgAni: DBComponent;//宝石矿工免费游戏场景特效

        public constructor() {
            super();
            this.skinName = "BSKGScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFreeFirst(3);
            this.initAni();
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.BSKG_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.BSKG_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
        }
        /**
         * 初始化免费场景特效缓存
         */
        private initAni() {
            game.BSKGUtils.bskgDust1 = DBComponent.create("bskg_dust1", "bskg_dust_1");
            game.BSKGUtils.bskgDust2 = DBComponent.create("bskg_dust2", "bskg_dust_2");
            game.BSKGUtils.bskgDust1.horizontalCenter = 0; game.BSKGUtils.bskgDust1.bottom = 150;
            game.BSKGUtils.bskgDust2.horizontalCenter = 0; game.BSKGUtils.bskgDust2.bottom = 200;
            game.BSKGUtils.bskgDust1.touchEnabled = game.BSKGUtils.bskgDust2.touchEnabled = false;
            this.bskgFreeBgAni = DBComponent.create("bskg_bskgFreeBgAni", "bskg_freebgani");
            this.bskgFreeBgAni.play("", 0);
            this.bskgFreeBgAni.horizontalCenter = 0;
            this.bskgFreeBgAni.bottom = 280;
            this.effectGroup.addChild(this.bskgFreeBgAni);
            this.bskgFreeBgAni.resetPosition();
        }
        public isFastGame = false;
        /**
         * 准备开始免费游戏
         */
        public startFreeGame(e: egret.Event) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("bskg_freespinbackground_mus_mp3");
            game.BSKGUtils.bskgRoleAni1.play("", 0);
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            this.freeWins = game.LaohuUtils.freeWin;
            this.freeWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.BSKGUtils.bskgRoleAni1.horizontalCenter = game.BSKGUtils.bskgRoleAni1.bottom = 0
            this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni1);
            game.BSKGUtils.bskgRoleAni1.resetPosition();
            egret.setTimeout(() => {
                this.playFreeGame();
            }, this, 2000);
        }
        /**
         * 上次中奖效果移除
         */
        private removeLastAni() {
            if (this.winGold > 0) {
                this.freeMulGroup0.top = -85;
                this.lineScoreGroup.visible = false;
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        }
        private isMessaged: boolean = false; //防止重复发送免费旋转消息
        /**
         * 免费游戏旋转，次数判断
         */
        private playFreeGame() {
            //防止重复发消息
            if (!this.isMessaged) {
                this.scroller.showIconBg();
                this.removeLastAni();
                if (game.BSKGUtils.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(game.BSKGUtils.freeTimes + "   freetime")
                    this.showTotalwin();
                    return;
                }
                this.isMessaged = true;
                game.BSKGUtils.freeTimes -= 1;
                this.freeTimesLabel.text = game.BSKGUtils.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        }
        private showAtr: Array<Array<number>>;
        private bonusAtr: Array<Array<number>>;//中奖图标数组
        private winGold: number; //中奖金额 
        private freeMulIndex: number;//免费游戏中奖倍数索引
        private freeWins: number = 0;//免费游戏总赢取
        private freeMulBei: number; //免费游戏中奖倍数

        /**
         * 发送免费游戏旋转消息
         */
        public async messageSend() {
            this.showAtr = [];
            this.bonusAtr = [];
            this.winGold = 0;
            let data2 = { "spinType": 1, "bet": game.BSKGUtils.bet, "multiple": game.BSKGUtils.mul, "lineCount": 243, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_BSKG);
                SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                return;
            }
            let resp1: any = resp2.spinRes[0];
            if (resp1.rmIndex) {
                for (let i in resp1.rmIndex) {
                    this.bonusAtr.push(resp1.rmIndex[i]);
                }
            } else {
                this.bonusAtr = [];
            }
            this.winGold = resp2.winCount;
            this.freeMulIndex = resp1.freeMulIndex;
            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
            this.freeWins += this.winGold;
            this.freeMulBei = resp1.freeMul;
            game.BSKGUtils.ToTalMoney = resp2.own_gold;
            egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 300)
        }
        public freeGameTimeOut: any;
        /**
         * 各个转轴结束监听
         * @param  {egret.Event} e
         */
        private scrollerEnd(e: egret.Event) {
            let data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            let index = e.data.index;
            switch (index) {
                case 5:
                    SoundManager.getInstance().stopEffectByName("bskg_reel_mp3");
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
                            // egret.setTimeout(() => { this.lineScoreGroup.visible = false; this.removeLastAni(); }, this, 1600);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3500);
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freeWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("bskg_reelstop_mp3");
                    break;
            }
        }

        public commomScore: eui.BitmapLabel = new eui.BitmapLabel();
        private scoreAni: DBComponent;
        private bigWinPanel: BSKGBigwinPanel;
        /**
         * 免费游戏中奖连线
         */
        private addFreeBonusAni() {
            //判断是否为bigwin
            if (this.winGold >= (game.BSKGUtils.bet * game.BSKGUtils.mul * 50) * 15) {
                egret.clearTimeout(this.freeGameTimeOut);
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    let func = () => {
                        if (!this.bigWinPanel.touchEnabled) return;
                        this.bigWinPanel.touchEnabled = false;
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
                		/**
                		 * bigwin结束窗口效果
                		 */
                        this.bigWinPanel.stopShowBigWin(() => {
                            this.scroller.stopIconDb();
                            this.scroller.setIconHui();
                            this.scroller.removeIconHui(this.bonusAtr);
                            this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                            this.addTittleMul();
                            game.BSKGUtils.screamLittleShake(this.shakeGroup);
                            game.BSKGUtils.bskgDust1.play("", 1);
                            this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                            game.BSKGUtils.bskgDust1.resetPosition();
                            SoundManager.getInstance().playEffect("bskg_bom_mp3");
                            game.BSKGUtils.bskgRoleAni1.visible = false;


                            game.BSKGUtils.bskgRoleAni1.visible = true;
                            game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);

                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeGame();
                            }, this, 3500);
                        });
                    }
                    this.bigWinPanel = new BSKGBigwinPanel();
                    // let i;
                    // i = Math.floor(Math.random() * 2);
                    SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
                    game.BSKGUtils.bskgRoleAni3.play("", 0);
                    this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni3);
                    game.BSKGUtils.bskgRoleAni1.visible = false;
                    game.BSKGUtils.bskgRoleAni3.resetPosition();
                    this.bigWinPanel.touchEnabled = false;
                    egret.setTimeout(() => {
                        this.bigWinPanel.touchEnabled = true;
                        this.bigWinPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this)
                    }, this, 1500);
                	/**
                	 * bigwin窗口
                	 * @param score,callback?
                	 */
                    this.bigWinPanel.showScore(this.winGold, () => {
                        this.scroller.setIconHui();
                        game.BSKGUtils.screamLittleShake(this.shakeGroup);
                        game.BSKGUtils.bskgDust1.play("", 1);
                        this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                        game.BSKGUtils.bskgDust1.resetPosition();
                        SoundManager.getInstance().playEffect("bskg_bom_mp3");
                        this.scroller.removeIconHui(this.bonusAtr);
                        this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                        this.addTittleMul();

                        game.BSKGUtils.bskgRoleAni1.visible = true;
                        game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni3);

                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3410);
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            //普通中奖
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("bskg_win_mp3");
                game.BSKGUtils.screamLittleShake(this.shakeGroup);
                game.BSKGUtils.bskgDust1.play("", 1);
                this.effectGroup.addChild(game.BSKGUtils.bskgDust1);
                game.BSKGUtils.bskgDust1.resetPosition();
                SoundManager.getInstance().playEffect("bskg_bom_mp3");
                this.scroller.setIconHui();
                this.scroller.removeIconHui(this.bonusAtr);
                this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                let data = Number(new Big(this.winGold).mul(100));
                this.lineNum.text = NumberFormat.handleFloatDecimal(data) + "";
                this.lineScoreGroup.visible = true;
                game.BSKGUtils.bskgRoleAni1.visible = false;
                game.BSKGUtils.bskgRoleAni2.play("", 1);
                let i;
                i = Math.ceil(Math.random() * 2);
                egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("bskg_role_win" + i + "_mp3");
                }, this, 800);
                this.roleAniGroup.addChild(game.BSKGUtils.bskgRoleAni2);
                game.BSKGUtils.bskgRoleAni2.resetPosition();
                game.BSKGUtils.bskgRoleAni2.callback = () => {
                    game.UIUtils.removeSelf(game.BSKGUtils.bskgRoleAni2);
                    game.BSKGUtils.bskgRoleAni1.visible = true;
                }
                this.addTittleMul();
            }
            // }


        }
        /**
         * 中奖倍数
         */
        private addTittleMul() {
            this.bei.text = this.freeMulBei + "倍";
            egret.Tween.get(this.freeMulGroup0).to({ top: 25 }, 100).to({ top: 0 }, 80).to({ top: 15 }, 40).to({ top: 0 }, 10);
        }

        /**
        * 免费游戏结束，初始化免费游戏场景
        */
        private showTotalwin() {
            this.totalWinGroup.visible = true;
            this.totalWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.LaohuUtils.totoalWinGold = this.freeWins;
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("bskg_free_win_mp3");
            // SoundManager.getInstance().playEffect("bskg_role_freenend_mp3");
            egret.setTimeout(() => {
                this.freeWins = 0;
                SoundManager.getInstance().remuseMusic();
                this.totalWinLabel.text = 0 + "";
                this.freeWinGroup.visible = false;
                this.totalWinGroup.visible = false;
                this.freeWinLabel.text = 0 + "";
                CF.dP(ENo.BSKG_QUIT_FREE_GAME);
            }, this, 5000)
        }

        public askAutoGame() {
            let slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            if (this.isFastGame) {
                egret.clearTimeout(this.freeGameTimeOut);
            }
            let func = () => {
                // CF.sN(this.AUTOGAME_NOTIFY);
                this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                }, this, 500);
            }
            let func2 = () => {
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("bskg_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                }, this, 500);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            }
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        }

    }
}