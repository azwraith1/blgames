// TypeScript file
module bscs {
    export class BSCSScene3 extends game.BaseSlotScene3 {
        public resizeGroup: eui.Group;
        public gameGroup: eui.Group;
        public scroller: BSCSScroller;
        public bottomGroup: eui.Group;
        public freeTimesLabel: eui.BitmapLabel;
        public winNumLabel: eui.BitmapLabel;
        public effectGroup1: eui.Group;
        public totalGroup: eui.Group;
        public totalwinLable: eui.BitmapLabel;
        public free: eui.Image;
        public spins: eui.Image;
        public freegetFreeGroup: eui.Group;
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.BSCSUtils.ToTalMoney;
        public utilsBet = game.BSCSUtils.bet;
        public fixpositionY = [40, 40, 20, 20];
        public freewinFreeTime: eui.BitmapLabel;

        public addedFreeTime: number = 0;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BSCS;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_BSCS_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_BSCS_TIPS_PANEL;
        public RECORD_NOTIFY: string = PanelNotify.OPEN_DNTG_RECORD_PANEL;
        public SETING_NOTIFY: string = PanelNotify.OPEN_SETTING;
        public QUIT_NOTIFY: string = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
        public lineSmall = "ayls_line1";
        public lineMid = "ayls_line2";
        public lineBig = "ayls_line3";
        public lineHuge = "ayls_line4";
        public scrollerFastEffect = "bscs_reel_fast_spin_mp3";
        public gameId = "bscs";

        /**
        * 进入游戏动画
        */
        public enterFreeAni: DBComponent;
        public waterAni: DBComponent;

        /**
         * 免费游戏中免费游戏动画
         */
        // public addFreeTimeAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "BSCSScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            // this.addFreeTimeAni = DBComponent.create("ayls_addfreetimeani", "ayls_freespins_n");
            this.enterFreeAni = new DBComponent("bscq_bg02");
            this.scroller.showFreeFirst(3);

            this.enterFreeAni.play("", 0);
            this.enterFreeAni.touchEnabled = false;
            this.effectGroup1.addChild(this.enterFreeAni);
            this.enterFreeAni.resetPosition();

            this.waterAni = DBComponent.create("bscs_water", "bscs_water");
            this.waterAni.play("", 0);
            this.waterAni.horizontalCenter = 0;
            this.waterAni.bottom = -450;
            this.resizeGroup.addChild(this.waterAni);
            this.waterAni.resetPosition();
            this.waterAni.touchEnabled = false;
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.BSCS_START_FREE_GAME, this.startFreeGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.BSCS_START_FREE_GAME, this.startFreeGame, this);
        }

        /**
         * 转轴转动结束
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
                    this.isStopLine = false;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                    //图标数组非空校验
                    if (this.showAtr.length != 0) {
                        for (let i = 0; i < this.showAtr[4].length; i++) {
                            //判断第5列上是否有scatter
                            if (this.showAtr[4][i] == 2) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 4) {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                    } else {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                    }
                                } else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }

                                this.scroller.addFoGuang1(5, i, "bscs_icon_2_guang");
                            } else {
                                SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                            }
                        }
                    }
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.BSCSUtils.bet * 2) * 15) {
                            egret.setTimeout(() => {
                                // this.lineScoreGroup.visible = false; 
                                this.removeLastAni();
                            }, this, this.lineTime);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    this.addFreeBonusAni();
                    this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    for (let i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            if (this.scatter == 1) {
                                if (this.yudiAtr2[1] <= 3) {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                } else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }
                            } else {
                                SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            }
                            this.scroller.addFoGuang1(4, i, "bscs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 3:
                    for (let i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            for (let j = 0; j < 3; j++) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 2) {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear2_mp3");
                                    } else {
                                        SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                    }
                                } else {
                                    SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                                }
                                this.scroller.addFoGuang1(3, i, "bscs_icon_2_guang");
                            }

                        } else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 2:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            this.scroller.addFoGuang1(2, i, "bscs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("bscs_scat_appear_mp3");
                            this.scroller.addFoGuang1(1, i, "bscs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("bscs_reelstop_mp3");
                        }
                    }
                    break;
            }
        }
        private isReconnect: boolean = true; //判断是否为断线重连
        private freeTimes: number; //免费游戏次数
        private showAtr: Array<Array<number>>;
        private bonusAtr: Array<Array<number>>;//中奖图标数组
        private winGold: number; //中奖金额 
        private freeMulIndex: number;//免费游戏中奖倍数 
        private freeWins: number = 0;//免费游戏总赢取
        private scatter: number = 0;

        /**
         * 开始免费游戏
         */
        private startFreeGame(e: egret.Event) {
            if(e.data){
                this.isFastGame = e.data.isfast;
            }
            this.scroller.showFreeFirst(3);
            this.waterAni.bottom = -450;
            egret.setTimeout(() => {
                game.LaohuUtils.downTime2 = 300;
                game.LaohuUtils.downTime3 = 600;
                game.LaohuUtils.downTime4 = 900;
                game.LaohuUtils.downTime5 = 1200;
                game.LaohuUtils.speed = 85;

                if (!this.isReconnect) {
                    egret.Tween.get(this.waterAni).to({ bottom: -300 }, 2000).call(() => {
                        this.playFreeGame();
                    })
                } else {
                    egret.Tween.get(this.waterAni).to({ bottom: -300 }, 2000).call(() => {
                        this.playFreeGame();
                    })
                }
            }, this, 300);
            this.freeWins = game.LaohuUtils.freeWin;
            this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.freeTimes = game.LaohuUtils.freeTimes;
            this.freeTimesLabel.text = this.freeTimes + ""
            SoundManager.getInstance().playMusic("bscs_freespinbackground_mus_mp3");

            /**
             * 是否为免费游戏重连
             */

        }

        /**    
         * 免费游戏旋转，次数判断
         */
        private playFreeGame() {
            //防止重复发消息
            if (!this.isMessaged) {
                this.removeLastAni();
                if (this.freeTimes <= 0) {
                    this.freeTimesLabel.text = 0 + "";
                    LogUtils.logD(this.freeTimes + "   freetime")
                    this.showTotalWin();
                    return;
                }
                this.isMessaged = true;
                this.freeTimes -= 1;
                game.LaohuUtils.freeTimes = this.freeTimes;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("bscs_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        }

        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        private allAtr: Array<Array<number>>;//所有连线图标数组
        private yudiAtr: Array<number>;//scatter图标位置数组 
        private yudiAtr2: Array<number>;
        private messageTimeOut: any;
        private scatterIcon: number; //scatterIcon数量 
        private fastItemIndex: number = 0;
        public lineTime: number = 3000;
        private freeBgAni: DBComponent;
        private totalWinAni: DBComponent;
        public lineImaArr: Array<number> = [];
        /**
         * 发送免费游戏旋转消息
         */
        public async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.bonusAtr = [];
            this.allLine = [];
            this.lineImaArr = [];
            this.eachLineIconIndex = [];
            this.allAtr = [[], [], [], [], []];
            this.fastItemIndex = 0;
            this.yudiAtr = [];
            this.scatterIcon = 0;
            this.winGold = 0;
            // this.lineTime = 2500;
            let data2 = { "spinType": 1, "bet": game.BSCSUtils.bet, "lineCount": 243, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_BSCS);
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                return;
            }
            let resp1: any = resp2.spinRes[0];
            this.scatter = resp2.sactter;
            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
            if (resp1.winnerInfo) {
                for (let i = 0; i < resp1.winnerInfo.length; i++) {
                    for (let j = 0; j < resp1.winnerInfo[i].length; j++) {
                        resp1.winnerInfo[i][j] = resp1.winnerInfo[i][j].myReplace(" ", "");
                        let aaa = resp1.winnerInfo[i][j];
                        let str_lingshi: number[] = [];
                        let str_lingshi2: number[] = [];
                        let temp: any = [];
                        let temp1: any;
                        // let temp3: any = [];
                        temp1 = resp1.winnerInfo[i][j].split(":")[0];
                        if (temp1 != 0) {
                            this.lineImaArr.push(parseInt(temp1));
                            temp = resp1.winnerInfo[i][j].split(":")[2];
                            let temp2 = resp1.winnerInfo[i][j].split(":")[1];
                            // temp3 = resp1.winnerInfo[i][j].split(":")[3];
                            temp = temp.myReplace("{", "");
                            temp = temp.myReplace("}", "");
                            let arr = temp.split(",")
                            for (let k = 0; k < resp1.winnerInfo[i][j].split(":")[3]; k++) {
                                str_lingshi.push(parseInt(arr[k]));
                            }
                            for (let k = 0; k < arr.length; k++) {
                                str_lingshi2.push(parseInt(arr[k]));
                            }
                            this.bonusAtr.push(str_lingshi);
                            this.allLine.push(str_lingshi2);
                        }
                    }
                }
            } else {
                this.bonusAtr = [];
            }
            let flag: boolean = false;
            if (this.bonusAtr) {
                for (let i = 0; i < this.bonusAtr.length; i++) {
                    for (let j = 0; j < this.bonusAtr[i].length; j++) {
                        flag = false;
                        this.allAtr[j].forEach(item => {
                            if (item == this.bonusAtr[i][j]) {
                                flag = true;
                            }
                        })
                        if (!flag) this.allAtr[j].push(this.bonusAtr[i][j]);
                    }
                }
            }
            //是否为scatter
            if (resp2.sactter == 1) {
                let scatternum = 0;
                this.yudiAtr = [];
                this.yudiAtr2 = [];
                for (let i = 0; i <= 4; i++) {
                    for (let j = 0; j < this.showAtr[i].length; j++) {
                        if (this.showAtr[i][j] == 2) {
                            this.yudiAtr.push(j);
                            this.yudiAtr2.push(i + 1);
                        }
                    }
                }
            }
            //免费游戏情况下累加赢取金额
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.totoalWinGold += this.winGold;
            }
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < this.showAtr[i].length; j++) {
                    //判断前三列几个玉帝
                    if (this.showAtr[i][j] == 2) {
                        this.scatterIcon++;
                        if (this.scatterIcon == 2) {
                            this.fastItemIndex = i + 2;
                        }
                    }
                }
            }

            this.winGold = resp2.winCount;
            if (this.winGold > 0 && this.scatter != 1) this.lineTime = 3000
            else if (this.winGold == 0 && this.scatter != 1) this.lineTime = 1500;
            if (this.scatter == 1) this.lineTime += 1500;
            this.freeMulIndex = resp1.freeMulIndex;
            this.freeTimes = resp2.freeTimes;
            this.addedFreeTime = this.freeTimes - game.LaohuUtils.freeTimes;
            this.freeWins += this.winGold;
            game.BSCSUtils.ToTalMoney = resp2.own_gold;
            this.messageTimeOut = egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 300)
        }


        /**
         * 移除之前动画
         */
        private removeLastAni() {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                this.clearLineImaPool();
            }
            this.scroller.stopIconDb();
        }

        private bigWinPanel: BSCSBigwinGroup;
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel(); //中奖展示金额数字
        /**
         * 免费游戏中奖连线
         */
        private addFreeBonusAni() {
            if (this.winGold > game.BSCSUtils.bet * 2 * 15) {
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
                            this.scroller.addBonusAni(this.allAtr, this.winGold);
                            if (this.scatter == 1) {
                                this.addFreeTime();
                                this.freeTimesLabel.text = this.freeTimes + "";
                            }
                            if (this.lineImaArr) {
                                for (let i = 0; i < this.lineImaArr.length; i++) {
                                    this.lineUseImag(this.lineImaArr[i]);
                                }
                            }
                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeGame();
                            }, this, this.lineTime);
                        });
                    }
                    this.bigWinPanel = new BSCSBigwinGroup();
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
                        if (this.lineImaArr) {
                            for (let i = 0; i < this.lineImaArr.length; i++) {
                                this.lineUseImag(this.lineImaArr[i]);
                            }
                        }
                        if (this.scatter == 1) {
                            this.addFreeTime();
                            this.freeTimesLabel.text = this.freeTimes + "";
                        }
                        this.scroller.addBonusAni(this.allAtr, this.winGold);
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this)
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            } else {
                if (this.winGold > 0) {
                    SoundManager.getInstance().playEffect("bscs_win_mp3");
                    if (this.scatter == 1) {
                        this.addFreeTime();
                        this.freeTimesLabel.text = this.freeTimes + "";
                    }
                    this.scroller.setIconHui();
                    this.scroller.removeIconHui(this.allAtr);
                    if (this.lineImaArr) {
                        for (let i = 0; i < this.lineImaArr.length; i++) {
                            this.lineUseImag(this.lineImaArr[i]);
                        }
                    }
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.font = "bscs_wingold_1_fnt";
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.gameGroup.addChild(this.commomScore);
                } else {
                    if (this.scatter == 1) {
                        this.addFreeTime();
                        this.freeTimesLabel.text = this.freeTimes + "";
                    }
                }
            }

        }

        /**
         * 免费游戏结算
         */
        public showTotalWin() {
            this.totalGroup.visible = true;
            this.resizeGroup.addChild(this.totalGroup);
            game.BSCSUtils.freeWin = this.freeWins;
            SoundManager.getInstance().pauseMusic();
            this.totalwinLable.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            SoundManager.getInstance().playEffect("bscs_free_win_mp3");
            egret.setTimeout(() => {
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(this.totalWinAni);
                this.freeWins = 0;
                this.winNumLabel.text = 0 + "";
                CF.dP(ENo.BSCS_QUIT_FREE_GAME);
                this.totalGroup.visible = false;
            }, this, 8000);
        }
        /**
         * 免费游戏中scatter添加特效
         */
        public addFreeTime() {
            egret.clearTimeout(this.freeGameTimeOut);
            this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.bonusAtr.length * 500 + 3500);
            // egret.setTimeout(() => {
            this.freegetFreeGroup.visible = true;
            this.freegetFreeGroup.alpha = 1;
            this.freewinFreeTime.text = "+" + this.addedFreeTime;
            egret.setTimeout(() => {
                egret.Tween.get(this.freegetFreeGroup).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(() => {
                    this.freegetFreeGroup.visible = false;
                })
            }, this, 500)
        }
    }
}