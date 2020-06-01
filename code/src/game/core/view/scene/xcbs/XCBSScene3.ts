// TypeScript file
module xcbs {
    export class XCBSScene3 extends game.BaseSlotScene3 {
        public addedFreeTime: number = 0;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_XCBS;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_XCBS_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_XCBS_TIPS_PANEL;
        public RECORD_NOTIFY: string = PanelNotify.OPEN_DNTG_RECORD_PANEL;
        public SETING_NOTIFY: string = PanelNotify.OPEN_SETTING;
        public QUIT_NOTIFY: string = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
        public lineSmall = "ayls_line1";
        public lineMid = "ayls_line2";
        public lineBig = "ayls_line3";
        public lineHuge = "ayls_line4";
        public scrollerFastEffect = "bscs_reel_fast_spin_mp3";
        public gameId = "xcbs";
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.LaohuUtils.ToTalMoney;
        public utilsBet = game.LaohuUtils.bet;
        public fixpositionY = [40, 40, 20, 20];
        public freewinFreeTime: eui.BitmapLabel;
        public freegameAniGroup: eui.Group;
        public scroller: XCBSScroller;
        public smashingAni: DBComponent;

        public totalwinGroup: eui.Group;
        public freeTotalWin: eui.BitmapLabel;
        public effectGroup: eui.Group;
        public freeBgAni: DBComponent;
        public smashKuangAni: DBComponent;
        public freemulLight: DBComponent;

        public constructor() {
            super();
            this.skinName = "XCBSScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFreeFirst(3);
            this.initAni();
        }

        public initAni() {
            this.smashingAni = DBComponent.create("xcbs_icon_1_long1", "xcbs_icon_1_long");
            this.freeBgAni = DBComponent.create("xcbs_freebg", "xcbs_bg02");
            this.smashKuangAni = DBComponent.create("xcbs_wild_1", "xcbs_wild_1");
            this.freemulLight = DBComponent.create("xcbs_shine_x", "xcbs_shine_x");

            this.freeBgAni.play("", 0);
            this.effectGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
            this.freeBgAni.horizontalCenter = 0;
            this.freeBgAni.bottom = 100;
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.XCBS_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.XCBS_START_FREE_GAME, this.startFreeGame, this);
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
                CF.sN(SceneNotify.CLOSE_XCBS);
                CF.sN(PanelNotify.CLOSE_LAOHU_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_LAOHUGAME_TIPS);
                CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            }, "", true);
            return;
        }

        public freeTimesLabel: eui.BitmapLabel;
        public freeWin: number;
        public winNumLabel: eui.BitmapLabel;
        /**
		 * 进场后继续免费游戏
		 */
        private startFreeGame(e: egret.Event) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            if (!this.isMessaged) {

                SoundManager.getInstance().playMusic("xcbs_freespinbackground_mus_mp3");
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                if (game.LaohuUtils.freeWin) {
                    this.freeWin = game.LaohuUtils.freeWin;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                } else {
                    this.freeWin = 0;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                }
                egret.setTimeout(this.playFreeRound, this, 1500);
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
            game.LaohuUtils.freeTimes -= 1;
            this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
            this.freeGameTimeOut = egret.setTimeout(() => {
                this.scroller.run();
                this.messageSend();
                SoundManager.getInstance().playEffect("xcbs_reelstart_mp3");
                SoundManager.getInstance().playEffect("xcbs_reel_mp3");
                egret.setTimeout(() => { this.isMessaged = false }, this, 600);
            }, this, 500);
            // if (this.isFastGame) {
            //     this.askAutoGame();
            // }

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
        public commomScore: eui.BitmapLabel; //中奖展示金额数字
        public commondi: eui.Image;
        private removeScoreTimeout: any; //提前移除金额数字timeout
        private isStopAni: boolean = false;//播放stop动画flag
        private fastItemIndex: number = 0;
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        public yudiAtr2: Array<number>;//scatter图标所在的列
        public lineTime: number = 1500;
        private ownGold: number = 0//玩家当前金钱
        private gameGroup: eui.Group;
        private smashingReelIndex: number = 0;


        /**
         * c_bet
         */
        public async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.bonusAtr = [];
            this.scatterIcon = 0;
            this.eachLineScore = [];
            this.yudiAtr = [];
            this.allAtr = [];
            this.scatter = 0;
            let data2: any;
            this.allLine = [];
            this.eachLineIconIndex = [];
            this.fastItemIndex = 0;
            this.lineTime = 1500;
            data2 = { "spinType": 1, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 0, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_XCBS);
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                return;
            }
            this.showAtr = this.respShowAtr(resp2.spinRes[resp2.spinRes.length - 1]);
            this.smashingReelIndex = resp2.smashingReelIndex;
            this.c_betResp(resp2);
            if (resp2.isSmashing == 1) {
                this.lineTime = 3300;
                this.showSmashingAni();
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(game.LaohuUtils.showAtrs[0]);
                    this.runningType = RUNNING_TYPE.RESULT;
                }, this, 6000);
            } else {
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(game.LaohuUtils.showAtrs[0]);
                    if (this.isFastGame) {
                        this.scroller.runResultFast();
                    }
                }, this, 300);
                this.runningType = RUNNING_TYPE.RESULT;
            }
            this.lineTime = (resp2.spinRes.length - 1) * 3300 + 1500;
            //是否为scatter
            if (resp2.sactter == 1) {
                game.LaohuUtils.isScatter = true;
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
            game.LaohuUtils.freeTimes = resp2.freeTimes;
            this.freeWin += this.winGold;
            game.LaohuUtils.ToTalMoney = resp2.own_gold;
        }



        /**
        * 冰球联盟resp处理
        * @param  {} resp
        */
        public c_betResp(resp) {
            game.LaohuUtils.allAtrs = [];
            game.LaohuUtils.showAtrs = [];
            game.LaohuUtils.winGolds = [];
            for (let i = resp.spinRes.length - 1; i >= 0; i--) {
                let resp1: any = resp.spinRes[i];
                this.showAtr = this.respShowAtr(resp1);
                game.LaohuUtils.showAtrs.push(this.showAtr);
                if (resp1.rmIndex) {
                    for (let i in resp1.rmIndex) {
                        this.allAtr.push(resp1.rmIndex[i]);
                    }
                }
                game.LaohuUtils.allAtrs.push(this.allAtr);
                this.allAtr = [];
                game.LaohuUtils.winGolds.push(resp1.winGold);
            }
        }



        /**
         * 
         * 每次消除完成展示数组
         * @param  {} resp
         */
        private respShowAtr(resp) {
            let showAtr = [resp.matrix1[0], resp.matrix1[1], resp.matrix1[2], resp.matrix1[3], resp.matrix1[4]];
            return showAtr;
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
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
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
                    this.scroller.sort1();
                    this.addFreeBonusAni();
                    // this.isMessaged = true;
                    this.isMessaged = false
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                    break;
            }
        }

        /**
        * 移除之前动画
        */
        private removeLastAni() {
            if (this.winGold > 0) {
                this.commondi.visible = this.commomScore.visible = false;
                this.commomScore.text = "";
            }
            SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
            this.scroller.stopIconDb(); this.smashingReelIndex = 0;
            game.UIUtils.removeSelf(this.smashingAni);
        }
        /**
         */
        public showSmashingAni() {
            egret.clearTimeout(this.messageTimeOut);
            SoundManager.getInstance().playEffect("xcbs_wildfengbao_mp3");
            egret.setTimeout(() => {
                this.smashingAni.play("xcbs_icon_1_roll", 1);
                this.smashKuangAni.horizontalCenter = 0; this.smashKuangAni.bottom = 60;
                this.smashKuangAni.play("", 0);
                this.resizeGroup.addChild(this.smashKuangAni);
                this.smashKuangAni.resetPosition();
                this.gameGroup.addChild(this.smashingAni);
                this.gameGroup.addChild(this.commondi);
                this.gameGroup.addChild(this.commomScore);
                this.smashingAni.resetPosition();
                this.smashingAni.bottom = 90;
                this.smashingAni.touchEnabled = false;
                this.smashingAni.horizontalCenter = (this.smashingReelIndex - 2) * 193
                this.smashingAni.callback = () => {
                    this.smashingAni.play("xcbs_icon_1_stop", 0);
                }
            }, this, 3000);
        }

        /**
         * 中奖消除
         */
        public addFreeBonusAni() {
            if (this.winGold > 0) {
                this.eachLine();
            }
        }
        public addwin: number = 0;
        public eachLine() {
            if (this.winGold > 0) SoundManager.getInstance().playEffect("xcbs_win_mp3");
            if (this.winGold && !this.smashingReelIndex) {
                let count: number = 0;
                async.eachSeries(game.LaohuUtils.allAtrs, (item, callback) => {
                    for (let i = 0; i < item.length; i++) {
                        for (let j = 0; j < item[i].length; j++) {
                            this.scroller[`item${i + 1}`].showAni(game.LaohuUtils.allAtrs[count][i][j]);
                        }
                    }
                    if (game.LaohuUtils.winGolds[count] > 0) {
                        this.commondi.visible = this.commomScore.visible = true;
                        let data = game.LaohuUtils.winGolds[count] * 100;
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data) + ""
                    } else {
                        this.commomScore.text = "";
                        this.commondi.visible = this.commomScore.visible = false;
                    }
                    if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                    if (count < game.LaohuUtils.allAtrs.length - 1) {
                        this.showMulAni(count);
                        egret.setTimeout(() => {
                            SoundManager.getInstance().playEffect("xcbs_clear_mp3");
                        }, this, 2700);
                    }
                    this.showIconTimeOut = egret.setTimeout(() => {
                        this.scroller.eliminateIcons(game.LaohuUtils.allAtrs[count], game.LaohuUtils.showAtrs[count + 1]);
                        count += 1;
                        callback && callback();
                    }, this, 3300);
                    if (item == game.LaohuUtils.allAtrs[game.LaohuUtils.allAtrs.length - 1]) {
                        egret.clearTimeout(this.showIconTimeOut);
                        callback && callback();
                    }
                }, () => {
                    if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                        egret.setTimeout(this.showBigwin, this, 1000)
                    } else {
                        this.commomScore.text = "";
                        this.commondi.visible = this.commomScore.visible = false;
                        this.scroller.setIconHui();
                        this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                    }
                    count = 0;
                })
            } else if (this.smashingReelIndex) {
                this.commondi.visible = this.commomScore.visible = true;
                let data = this.winGold * 100;
                this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                this.showIconTimeOut = egret.setTimeout(() => {
                    this.commondi.visible = this.commomScore.visible = false;
                    this.commomScore.text = "";
                }, this, 1500);
                this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 1);
                this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            }
        }

        private bigWinPanel: XCBSBigwinGroup;
        public freemulAni: DBComponent;

        /**
         * bigwin
         */
        public showBigwin() {
            //非空判断
            if (this.winGold > 0) {
                egret.clearTimeout(this.freeGameTimeOut);
                if (this.winGold > 0) {
                    let func = () => {
                        if (!this.bigWinPanel.touchEnabled) return;
                        this.bigWinPanel.touchEnabled = false;
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
                		/**
                		 * bigwin结束窗口效果
                		 */
                        this.bigWinPanel.stopShowBigWin(() => {
                            this.scroller.stopIconDb();
                            this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeRound();
                            }, this, 1500);
                        });
                    }
                    this.bigWinPanel = new XCBSBigwinGroup();
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
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
                        this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeRound, this, 1500);
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
        }

        public showMulAni(index) {
            let mulImag: eui.Image = new eui.Image();
            if (index == 0) { }
            else if (index == 1) {
                let mulAni: DBComponent = this.creatmulAni(2);
                mulImag.source = "xcbs_freegame_2_png";
                mulImag.horizontalCenter = 0; mulImag.y = 300; this.resizeGroup.addChild(mulImag);
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 800).to({ horizontalCenter: -320, y: 9.78, scaleX: 0.45, scaleY: 0.45 }, 400, egret.Ease.sineIn).call(() => {
                    this.freemulLight.play("", 1);
                    this.gameGroup.addChild(this.freemulLight);
                    this.freemulLight.resetPosition();
                    this.freemulLight.horizontalCenter = -325; this.freemulLight.bottom = 550;
                    game.UIUtils.removeSelf(mulImag);
                    mulAni.play("", 1);
                })
                mulAni.horizontalCenter = -320;
                mulAni.bottom = 40;
            }
            else if (index == 2) {
                let mulAni: DBComponent = this.creatmulAni(3);
                mulImag.source = "xcbs_freegame_3_png";
                mulImag.horizontalCenter = 0; mulImag.y = 300; this.resizeGroup.addChild(mulImag);
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 800).to({ horizontalCenter: -160, y: 9.78, scaleX: 0.45, scaleY: 0.45 }, 400, egret.Ease.sineIn).call(() => {
                    game.UIUtils.removeSelf(mulImag);
                    this.freemulLight.play("", 1);
                    this.gameGroup.addChild(this.freemulLight);
                    this.freemulLight.resetPosition();
                    this.freemulLight.horizontalCenter = -175; this.freemulLight.bottom = 550;
                    mulAni.play("", 1);
                })
                mulAni.horizontalCenter = -160;
                mulAni.bottom = 40;
            }
            else if (index == 3) {
                let mulAni: DBComponent = this.creatmulAni(4);
                mulImag.source = "xcbs_freegame_4_png";
                mulImag.horizontalCenter = 0; mulImag.y = 300; this.resizeGroup.addChild(mulImag);
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 800).to({ horizontalCenter: 0, y: 9.78, scaleX: 0.45, scaleY: 0.45 }, 400, egret.Ease.sineIn).call(() => {
                    game.UIUtils.removeSelf(mulImag);
                    this.freemulLight.play("", 1);
                    this.gameGroup.addChild(this.freemulLight);
                    this.freemulLight.resetPosition();
                    this.freemulLight.horizontalCenter = 0; this.freemulLight.bottom = 550;
                    mulAni.play("", 1);
                })
                mulAni.horizontalCenter = 0;
                mulAni.bottom = 40;
            }
            else if (index == 4) {
                let mulAni: DBComponent = this.creatmulAni(5);
                mulImag.source = "xcbs_freegame_5_png";
                mulImag.horizontalCenter = 0; mulImag.y = 300; this.resizeGroup.addChild(mulImag);
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 800).to({ horizontalCenter: 160, y: 9.78, scaleX: 0.45, scaleY: 0.45 }, 400, egret.Ease.sineIn).call(() => {
                    game.UIUtils.removeSelf(mulImag);
                    this.freemulLight.play("", 1);
                    this.gameGroup.addChild(this.freemulLight);
                    this.freemulLight.resetPosition();
                    this.freemulLight.horizontalCenter = 175; this.freemulLight.bottom = 550;
                    mulAni.play("", 1);
                })
                mulAni.horizontalCenter = 160;
                mulAni.bottom = 40;
            } else if (index >= 5) {
                let mulAni: DBComponent = this.creatmulAni(10);
                mulImag.source = "xcbs_freegame_10_png";
                mulImag.horizontalCenter = 0; mulImag.y = 300; this.resizeGroup.addChild(mulImag);
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 800).to({ horizontalCenter: 320, y: 9.78, scaleX: 0.45, scaleY: 0.45 }, 400, egret.Ease.sineIn).call(() => {
                    game.UIUtils.removeSelf(mulImag);
                    this.freemulLight.play("", 1);
                    this.gameGroup.addChild(this.freemulLight);
                    this.freemulLight.resetPosition();
                    this.freemulLight.horizontalCenter = 320; this.freemulLight.bottom = 550;
                    mulAni.play("", 1);
                })
                mulAni.horizontalCenter = 320;
                mulAni.bottom = 40;
            }
        }

        private creatmulAni(index) {
            let mulAni: DBComponent = new DBComponent("xcbs_freemul_" + index);
            this[`mulGroup`].addChild(mulAni);
            mulAni.resetPosition();
            return mulAni;
        }

        /**
         * 免费游戏结束展示总赢取
         */
        public showToalWin() {
            egret.setTimeout(() => {
                this.freeTotalWin.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                this.totalwinGroup.visible = true;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("xcbs_freeend_mp3");
            }, this, 1000)

            egret.setTimeout(() => {
                CF.dP(ENo.XCBS_QUIT_FREE_GAME);
                this.totalwinGroup.visible = false;
                this.freeWin = 0;
                this.winNumLabel.text = 0 + "";
            }, this, 7000)
        }
    }
}