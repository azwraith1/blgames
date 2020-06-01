module snyx {
    export class SNYXScene3 extends game.BaseSlotScene3 {
        public resizeGroup: eui.Group;
        public scroller: snyx.SNYXScroller;
        public freeTimesLabel: eui.BitmapLabel;
        public freewinLabel: eui.BitmapLabel;
        public totalwinGroup: eui.Group;
        public freeTotalWin: eui.BitmapLabel;
        public roleAniGroup: eui.Group;
        public commondi: eui.Image;
        public commomScore: eui.BitmapLabel;
        public free2commGroup: eui.Group;
        public freetimeIma: eui.Image;

        public freeWin: number;

        public addedFreeTime: number = 0;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SNYX;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_SNYX_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_SNYX_TIPS_PANEL;
        public RECORD_NOTIFY: string = PanelNotify.OPEN_DNTG_RECORD_PANEL;
        public SETING_NOTIFY: string = PanelNotify.OPEN_SETTING;
        public QUIT_NOTIFY: string = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
        public lineSmall = "ayls_line1";
        public lineMid = "ayls_line2";
        public lineBig = "ayls_line3";
        public lineHuge = "ayls_line4";
        public scrollerFastEffect = "bscs_reel_fast_spin_mp3";
        public gameId = "sgws";
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.LaohuUtils.ToTalMoney;
        public utilsBet = game.LaohuUtils.bet;
        public fixpositionY = [40, 40, 20, 20];

        public constructor() {
            super();
            this.skinName = "SNYXScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFreeFirst(3);
            this.initAni();
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.SNYX_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.SNYX_START_FREE_GAME, this.startFreeGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
        }

        /**
		 * 超时未下注请出房间
		 */
        private kickGame() {
            let text = "你已超过5分钟局未下注,请重新进入游戏";
            Global.alertMediator.addAlert(text, () => {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SNYX);
                CF.sN(PanelNotify.CLOSE_SNYX_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        }

        public freeBgAni: DBComponent;
        public initAni() {
            this.freeBgAni = DBComponent.create("snyx_bg03", "snyx_bg03");
            this.freeBgAni.play("", 0);
            this.freeBgAni.bottom = 27; this.freeBgAni.horizontalCenter = 0;
            this.resizeGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
        }
        private reconnectArray: Array<number> = [];
        /**
        * 进场后继续免费游戏
        */
        private startFreeGame(e: egret.Event) {
            if (!this.isMessaged) {
                if (e.data) {
                    this.isFastGame = e.data.isfast;
                    if (e.data.atr) this.reconnectArray = e.data.atr;
                }
                if (this.reconnectArray) {
                    this.wildKuang(this.reconnectArray);
                    this.lastSmahs = 1;
                }
                SoundManager.getInstance().playMusic("snyx_freegame_bgm_mp3");
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                if (game.LaohuUtils.freeWin) {
                    this.freeWin = game.LaohuUtils.freeWin;
                    this.freewinLabel.text = game.LaohuUtils.freeWin + "";
                } else {
                    this.freeWin = 0;
                    this.freewinLabel.text = game.LaohuUtils.freeWin + "";
                }
                egret.setTimeout(() => {
                    this.playFreeRound();
                }, this, 1500);
            }
        }

        /**
		 * 开始播放免费游戏
		 */
        private playFreeRound() {
            this.removeLastAni();
            //免费游戏条件判断
            if (game.LaohuUtils.freeTimes <= 0) {
                this.freeTimesLabel.text = 0 + "";
                LogUtils.logD(game.LaohuUtils.freeTimes + "   freetime");
                game.XCBSUtils.isFreeGame = false;
                this.showToalWin();
                return;
            }
            this.freeGameTimeOut = egret.setTimeout(() => {
                game.LaohuUtils.freeTimes -= 1;
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                // SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("snyx_reel_mp3");
                this.scroller.run();
                this.messageSend();
                egret.setTimeout(() => { this.isMessaged = false }, this, 600);
            }, this, 500);

        }

        private showAtr: Array<Array<number>>; //所有图标展示数组
        private bonusAtr: Array<Array<number>>;//获奖图标数组
        private scatterIcon: number; //scatterIcon数量 
        private eachLineScore: Array<number>;//每条连线的中奖金额 
        public yudiAtr: Array<number>;//scatter图标位置数组 
        private allAtr: Array<Array<number>>;//所有连线图标数组
        private scatter: number;//是否为scatter 
        private messageTimeOut: any;//收到消息后延迟停止转动timeout
        private fastEnd: boolean = false;
        private showIconTimeOut: any; //每条连线循环播放的timeout
        private removeLineTimeOUt: any;
        private eachLineTimeOut: any;
        public runningType: number = 3;//选择类型
        private sethuiTimeout: any; //icon置灰timeout
        private winGold: number = 0;
        private removeScoreTimeout: any; //提前移除金额数字timeout
        private isStopAni: boolean = false;//播放stop动画flag
        private fastItemIndex: number = 0;
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        public yudiAtr2: Array<number>;//scatter图标所在的列
        public lineTime: number = 1500;
        private ownGold: number = 0//玩家当前金钱
        private gameGroup: eui.Group;
        private scatterNum: number = 0;

        /**
         * 发送免费游戏旋转消息
         */
        public async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.showAtr2 = [[], [], [], [], []];
            this.bonusAtr = [];
            this.scatterIcon = 0;
            this.eachLineScore = [];
            this.yudiAtr = [];
            this.yudiAtr2 = [];
            this.allAtr = [];
            this.wildAtr = [];
            this.scatter = 0;
            let data2: any;
            this.scatterNum = 0;
            //测试专用消息

            data2 = { "spinType": 1, "bet": game.LaohuUtils.bet, "lineCount": 243, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SNYX);
                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                return;
            }
            let data = Number(new Big(game.LaohuUtils.bet).mul(0.5));
            this.ownGold -= NumberFormat.handleFloatDecimal(data);
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            let resp1: any = resp2.spinRes[0];
            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
            this.wildAtr = resp2.smashingMatrix;
            let isbonus = resp2.isBonus;
            if (this.isSmash == 1) { this.lastSmahs = 1 }
            if (this.lastSmahs && isbonus == 0) {
                this.wildDown(resp2.smashingMatrix);
            }
            this.isSmash = resp2.isSmashing;
            if (this.isSmash) {
                this.showAtr2 = [resp1.matrix1[0], resp1.matrix1[1], resp1.matrix1[2], resp1.matrix1[3], resp1.matrix1[4]];
                this.showAtr = this.showAtr2;
            }
            //第一次出现wild
            if (this.isSmash == 1 && isbonus == 1) {
                if (this.lastSmahs == 1) {
                    this.scroller.removeWild();
                }
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(this.showAtr);
                    this.wildKuang(this.wildAtr);
                    this.runningType = RUNNING_TYPE.RESULT;
                }, this, 4500);
                for (let i = 0; i < this.wildAtr.length; i++) {
                    if (this.wildAtr[i] >= 0) { this.wildWin(i); SoundManager.getInstance().playEffect("snyx_firework_mp3"); }
                }
            }
            //继续wild
            else if (this.isSmash == 1 && isbonus == 0) {
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(this.showAtr);
                    this.runningType = RUNNING_TYPE.RESULT;
                }, this, 300);
            }
            //没有wild
            else if (this.isSmash == 0) {
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(this.showAtr);
                    if (this.isFastGame) {
                        this.scroller.runResultFast();
                    }
                }, this, 300);
                this.runningType = RUNNING_TYPE.RESULT;
                this.scroller.removeWild();
            }
            this.lastSmahs = this.isSmash;
            this.winGold = resp2.winCount;
            this.freeWin += resp2.winCount;
            game.LaohuUtils.freeTimes = resp2.freeTimes;
            if (this.winGold > 0) { this.lineTime = 2000 } else { this.lineTime = 1000 }
            game.LaohuUtils.ToTalMoney = resp2.own_gold;
            this.scatter = resp2.sactter;
            if (resp1.rmIndex) {
                for (let i in resp1.rmIndex) {
                    this.allAtr.push(resp1.rmIndex[i]);
                }
            }
            //消息判断
            if (resp1.winnerInfo) {
                for (let i = 0; i < resp1.winnerInfo.length; i++) {
                    for (let j = 0; j < resp1.winnerInfo[i].length; j++) {
                        resp1.winnerInfo[i][j] = resp1.winnerInfo[i][j].myReplace(" ", "");
                        let aaa = resp1.winnerInfo[i][j];
                        let str_lingshi: number[] = [];
                        let temp: any = [];
                        temp = resp1.winnerInfo[i][j].split(":")[2];
                        let temp2 = resp1.winnerInfo[i][j].split(":")[1];
                        temp = temp.myReplace("{", "");
                        temp = temp.myReplace("}", "");
                        let arr = temp.split(",")
                        this.eachLineScore.push(temp2);
                        for (let k = 0; k < arr.length; k++) {
                            str_lingshi.push(parseInt(arr[k]));
                        }
                        this.bonusAtr.push(str_lingshi);
                    }
                }
            } else {
                this.bonusAtr = [];
            }
            if (resp2.sactter == 1) {
                for (let i = 0; i <= 4; i++) {
                    for (let j = 0; j < this.showAtr[i].length; j++) {
                        if (this.showAtr[i][j] == 2) {
                            this.yudiAtr.push(j);
                            this.yudiAtr2.push(i + 1);
                            this.scatterNum += 1;
                        }
                    }
                }
            }
        }

        /**
         * @param  {egret.Event} e
         */
        public scrollerEnd(e: egret.Event) {
            let data = e.data;
            //场景id判断
            if (data.sceneIndex != 3) {
                return;
            }
            let index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            egret.setTimeout(() => {
                                this.removeLastAni();
                            }, this, this.lineTime);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, this.lineTime);
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, this.lineTime);
                    }
                    // if (this.isSmash) this.scroller.wildIcon(this.wildAtr);
                    this.addFreeBonusAni();
                    // this.isMessaged = true;
                    this.isMessaged = false
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                    break;
            }
        }
        public isSmash: number;
        public wildAtr: Array<number>;
        public showAtr2: Array<Array<number>>;
        public lastSmahs: number = 0;
        /**
       * 移除之前动画
       */
        private removeLastAni() {
            if (this.winGold > 0) {
                this.commondi.visible = this.commomScore.visible = false;
                this.commomScore.text = "";
            }
            // this.scroller.hideIcon();
            SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
            this.scroller.stopIconDb();
        }

        public addFreeBonusAni() {
            if (this.isSmash == 1 && this.lastSmahs == 0) {
                // this.wildWin();
                // this.wildKuang(this.wildAtr);
            }
            this.commwin();
        }

        /**
         * wild游戏的框
         * @param  {Array<number>} smashAtr
         */
        public wildKuang(smashAtr: Array<number>) {
            for (let i = 0; i < smashAtr.length; i++) {
                if (smashAtr[i] >= 0) this.scroller.wildKuang(i, smashAtr[i]);
            }
        }

        public wildDown(smashAtr: Array<number>) {
            for (let i = 0; i < smashAtr.length; i++) {
                if (smashAtr[i] == -1) {
                    this.scroller.removeWild(i);
                } else {
                    this.scroller.wildMove(i, smashAtr[i]);
                }
            }
        }

        /**
        * 普通中奖效果
        */
        private commwin() {
            if (this.winGold >= game.LaohuUtils.bet * 30) {
                this.bigwin()
            } else {
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    this.commomScore.visible = this.commondi.visible = true;
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    SoundManager.getInstance().playEffect("snyx_award_mp3");
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.freeGameTimeOut);
                        switch (this.scatterNum) {
                            case 3:
                                this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.setTimeout(() => {
                            egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(() => {
                                egret.setTimeout(() => { this.free2commGroup.scaleX = this.free2commGroup.scaleY = 0; }, this, 2800);
                                this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, 3000);
                            })
                        }, this, 2100);
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                    }
                } else {
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.freeGameTimeOut);
                        switch (this.scatterNum) {
                            case 3:
                                this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(() => {
                            egret.setTimeout(() => { this.free2commGroup.scaleX = this.free2commGroup.scaleY = 0; }, this, 2800);
                            this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, 3000);
                        })
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                    }
                }
            }
            this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
        }

        public bigWinPanel: SNYXBigwinPanel;

        public bigwin() {
            egret.clearTimeout(this.freeGameTimeOut);
            let func = () => {
                this.bigWinPanel.touchEnabled = false;
                this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);

                if (!game.LaohuUtils.isAutoGame) {
                    this.runningType = RUNNING_TYPE.EMPTY;
                }
                /**
                 * bigwin结束窗口效果
                 */
                this.bigWinPanel.stopShowBigWin(() => {
                    this.commomScore.visible = this.commondi.visible = false;
                    //自动游戏bigwin后开始下一把
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.freeGameTimeOut);
                        switch (this.scatterNum) {
                            case 3:
                                this.freetimeIma.source = "snyx_free" + 10 + "_png";
                                break;
                            case 4:
                                this.freetimeIma.source = "snyx_free" + 15 + "_png";
                                break;
                            case 5:
                                this.freetimeIma.source = "snyx_free" + 20 + "_png";
                                break;
                        }
                        egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(() => {
                            egret.setTimeout(() => { this.free2commGroup.scaleX = this.free2commGroup.scaleY = 0; }, this, 2800);
                            this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, 3000);
                        })
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(() => {
                            this.playFreeRound();
                        }, this, 800);
                    }
                    game.UIUtils.removeSelf(this.bigWinPanel);
                    this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                });
            }

            this.bigWinPanel = new SNYXBigwinPanel();
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
                this.commomScore.visible = this.commondi.visible = false;
                this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWin, 3) + "";
                //自动游戏bigwin后开始下一把
                if (this.scatter == 1) {
                    egret.clearTimeout(this.freeGameTimeOut);
                    switch (this.scatterNum) {
                        case 3:
                            this.freetimeIma.source = "snyx_free" + 10 + "_png";
                            break;
                        case 4:
                            this.freetimeIma.source = "snyx_free" + 15 + "_png";
                            break;
                        case 5:
                            this.freetimeIma.source = "snyx_free" + 20 + "_png";
                            break;
                    }
                    egret.Tween.get(this.free2commGroup).to({ scaleX: 1, scaleY: 1 }, 1200, egret.Ease.sineInOut).call(() => {
                        egret.setTimeout(() => { this.free2commGroup.scaleX = this.free2commGroup.scaleY = 0; }, this, 2800);
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, 3000);
                    })
                } else {
                    this.freeGameTimeOut = egret.setTimeout(() => {
                        this.playFreeRound();
                    }, this, 800);
                }
                game.UIUtils.removeSelf(this.bigWinPanel);
            })
            this.resizeGroup.addChild(this.bigWinPanel);
        }

        /** 
         * wild 中奖主界面烟花效果
         */
        private wildWin(i) {
            let wildAni: DBComponent = new DBComponent("snyx_wild");
            wildAni.play("", 1);
            wildAni.horizontalCenter = (i - 2) * 170;
            wildAni.bottom = 290;
            this[`roleAniGroup`].addChild(wildAni);
            wildAni.resetPosition();
        }

        /**
        * 免费游戏结束展示总赢取
        */
        public showToalWin() {
            egret.setTimeout(() => {
                this.freeTotalWin.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                this.totalwinGroup.visible = true;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("snyx_freegame_end_mp3");
            }, this, 1000)

            egret.setTimeout(() => {
                CF.dP(ENo.SNYX_QUIT_FREE_GAME);
                this.totalwinGroup.visible = false;
                this.scroller.removeWild();
                this.freeWin = 0;
                this.freewinLabel.text = 0 + "";
            }, this, 10000)
        }
    }
}