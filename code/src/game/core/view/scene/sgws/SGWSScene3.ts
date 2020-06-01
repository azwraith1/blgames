// TypeScript file
module sgws {
    export class SGWSScene3 extends game.BaseSlotScene3 {
        public addedFreeTime: number = 0;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SGWS;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_SGWS_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_SGWS_TIPS_PANEL;
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
        public freewinFreeTime: eui.BitmapLabel;
        public freegameAniGroup: eui.Group;
        public scroller: SGWSScroller;
        public smashingAni: DBComponent;

        public totalwinGroup: eui.Group;
        public freeTotalWin: eui.BitmapLabel;
        public effectGroup: eui.Group;
        public freeBgAni: DBComponent;
        public smashKuangAni: DBComponent;
        public freemulLight: DBComponent;
        public freebgGroup: eui.Group;
        public roleAni: DBComponent;
        public roleAniGroup: eui.Group;

        public constructor() {
            super();
            this.skinName = "SGWSScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFreeFirst(3);
            this.initAni();
        }

        public initAni() {
            // this.smashingAni = DBComponent.create("xcbs_icon_1_long1", "xcbs_icon_1_long");
            this.freeBgAni = DBComponent.create("sgws_freebg_1", "sgws_freebg_1");
            // this.smashKuangAni = DBComponent.create("xcbs_wild_1", "xcbs_wild_1");
            // this.freemulLight = DBComponent.create("xcbs_shine_x", "xcbs_shine_x");

            this.freeBgAni.play("", 0);
            this.freebgGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
            this.freeBgAni.horizontalCenter = -40;
            this.freeBgAni.bottom = -280;
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.SGWS_START_FREE_GAME, this.startFreeGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.SGWS_START_FREE_GAME, this.startFreeGame, this);
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
                CF.sN(SceneNotify.CLOSE_SGWS);
                CF.sN(PanelNotify.CLOSE_SGWS_AUTO_PANEL);
                CF.sN(PanelNotify.CLOSE_SGWS_TIPS_PANEL);
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
            if (!this.isMessaged) {
                if (e.data) {
                    this.isFastGame = e.data.isfast;
                }
                SoundManager.getInstance().playMusic("sgws_freespinbackground_mus_mp3");
                this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
                if (game.LaohuUtils.freeWin) {
                    this.freeWin = game.LaohuUtils.freeWin;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                } else {
                    this.freeWin = 0;
                    this.winNumLabel.text = game.LaohuUtils.freeWin + "";
                }
                egret.setTimeout(() => {
                    this.playFreeRound(); this.roleAniFuc("sgws_role_appear", 1, () => {
                        this.roleAniFuc("sgws_role_default", 0);
                    })
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
            game.LaohuUtils.freeTimes -= 1;
            this.freeTimesLabel.text = game.LaohuUtils.freeTimes + "";
            this.freeGameTimeOut = egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("sgws_reel_mp3");
                this.scroller.run();
                this.messageSend();
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
                CF.sN(SceneNotify.CLOSE_SGWS);
                SoundManager.getInstance().stopEffectByName("sgws_reel_mp3");
                return;
            }
            this.showAtr = this.respShowAtr(resp2.spinRes[resp2.spinRes.length - 1]);
            this.smashingReelIndex = resp2.smashingReelIndex;
            this.c_betResp(resp2);
            if (resp2.isSmashing == 1) {
                this.lineTime = 5300;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("sgws_wildstorm_mus_mp3");
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
            this.lineTime = (resp2.spinRes.length - 1) * 3000 + 2000;
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
                    SoundManager.getInstance().stopEffectByName("sgws_reel_mp3");
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
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
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("sgws_reelstop_mp3");
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
            SoundManager.getInstance().stopEffectByName("sgws_wildstorm_mus_mp3");
            this.scroller.stopIconDb(); this.smashingReelIndex = 0;
            game.UIUtils.removeSelf(this.smashingAni);
        }
        /**
         * wild风暴特效
         */
        protected showSmashingAni() {
            this.smashingAni = DBComponent.create("sgws_icon_2_long", "sgws_icon_2_long");
            this.roleAniFuc("sgws_role_await", 1, () => { this.roleAniFuc("sgws_role_default", 0); });
            this.playRandomSmashWaitMus();
            egret.setTimeout(() => {
                SoundManager.getInstance().playEffect("sgws_role_shadow_mp3");
                this.roleAniFuc("sgws_role_clear2", 1, () => {
                    game.UIUtils.removeSelf(this.roleAni);
                });
            }, this, 1500);
            egret.setTimeout(() => {
                this.smashingAni.play("", 1);
                SoundManager.getInstance().playEffect("sgws_wildstomswood_mp3");
                this.scroller.smashHideIcon(this.smashingReelIndex);
                this.gameGroup.addChild(this.smashingAni);
                this.gameGroup.addChild(this.commondi);
                this.gameGroup.addChild(this.commomScore);
                this.smashingAni.resetPosition();
                this.smashingAni.bottom = 230;
                this.smashingAni.touchEnabled = false;
                this.smashingAni.horizontalCenter = (this.smashingReelIndex - 2) * 157 + 10;
                this.smashingAni.callback = () => {
                    game.UIUtils.removeSelf(this.smashingAni);
                    this.smashingAni = new DBComponent("sgws_icon_2_long_g");
                    this.roleAniFuc("sgws_role_appear", 1, () => {
                        this.roleAniFuc("sgws_role_default", 0);
                    })
                    this.gameGroup.addChild(this.smashingAni);
                    this.gameGroup.addChild(this.commondi);
                    this.gameGroup.addChild(this.commomScore);
                    this.smashingAni.play("", 0);
                    this.smashingAni.resetPosition();
                    this.smashingAni.bottom = 440;
                    this.smashingAni.touchEnabled = false;
                    this.smashingAni.horizontalCenter = (this.smashingReelIndex - 2) * 157 + 10;
                }
            }, this, 3000);
        }

        public eliminateTimeout = 0;
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
            if (this.winGold > 0) SoundManager.getInstance().playEffect("sgws_win_mp3");
            if (this.winGold && !this.smashingReelIndex) {
                let count: number = 0;
                async.eachSeries(game.LaohuUtils.allAtrs, (item, callback) => {
                    let count2 = 0;
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
                        this.swordAni();
                        egret.setTimeout(() => { SoundManager.getInstance().playEffect("sgws_role_swordlight_mp3"); }, this, 750)
                        this.playRandomClearMus();
                        egret.setTimeout(() => {
                            async.eachSeries(item, (index, callback) => {
                                this.eliminateTimeout = egret.setTimeout(() => {
                                    for (let i = 0; i < index.length; i++) {
                                        this.scroller[`item${count2 + 1}`].showAni(index[i]);
                                    }
                                    if (count2 < item.length - 1) {
                                        egret.setTimeout(() => {
                                            SoundManager.getInstance().playEffect("sgws_clear_mp3");
                                        }, this, 710);
                                    }
                                    count2++;
                                    callback && callback();
                                }, this, 200);

                            }, () => {
                                count2 = 0;
                                egret.clearTimeout(this.eliminateTimeout);
                            })
                        }, this, 300);
                        this.roleAniFuc("sgws_role_clear", 1, () => {

                        });
                    }
                    this.showIconTimeOut = egret.setTimeout(() => {
                        this.scroller.eliminateIcons(game.LaohuUtils.allAtrs[count], game.LaohuUtils.showAtrs[count + 1]);
                        count += 1;
                        callback && callback();
                    }, this, 3000);
                    if (item == game.LaohuUtils.allAtrs[game.LaohuUtils.allAtrs.length - 1]) {
                        egret.clearTimeout(this.showIconTimeOut);
                        callback && callback();
                    }
                }, () => {
                    if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                        egret.setTimeout(this.showBigwin, this, 1000);
                    } else {
                        this.roleAniFuc("sgws_role_default", 0);
                        this.commomScore.text = "";
                        this.commondi.visible = this.commomScore.visible = false;
                        this.scroller.setIconHui();
                        this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                    }
                    count = 0;
                })
            } else if (this.smashingReelIndex) {
                this.playRandomSmashWinMus();
                this.commondi.visible = this.commomScore.visible = true;
                let data = Number(new Big(this.winGold).mul(100))
                this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                this.showIconTimeOut = egret.setTimeout(() => {
                    this.commondi.visible = this.commomScore.visible = false;
                    this.commomScore.text = "";
                }, this, 1500);
                this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 1);
                this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
            }
        }

        private bigWinPanel: SGWSBigwinPanel;
        public freemulAni: DBComponent;

        private playRandomClearMus() {
            let musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_att" + musIndex + "_mp3");
        }

        private playRandomBingwinMus() {
            let musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_bigwin" + musIndex + "_mp3");
        }

        private playRandomSmashWinMus() {
            let musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_laugh" + musIndex + "_mp3");
        }

        private playRandomSmashWaitMus() {
            let musIndex = Math.ceil(Math.random() * 2);
            SoundManager.getInstance().playEffect("sgws_role_happy" + musIndex + "_mp3");
        }

        /**
         * bigwin
         */
        public showBigwin() {
            //非空判断
            if (this.winGold > 0) {
                this.roleAniFuc("sgws_role_happy", 0);
                this.playRandomBingwinMus();
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
                            this.scroller.stopIconDb(); this.roleAniFuc("sgws_role_default", 0);
                            this.winNumLabel.text = NumberFormat.handleFloatDecimal(this.freeWin) + "";
                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeRound();
                            }, this, 1500);
                        });
                    }
                    this.bigWinPanel = new SGWSBigwinPanel();
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
                        this.roleAniFuc("sgws_role_default", 0);
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
                mulImag.source = "sgws_mul_2_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0; mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -120, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(() => {
                    let mulAni: DBComponent = this.creatmulAni(2);
                    mulAni.horizontalCenter = -118;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                })
            }
            else if (index == 2) {
                mulImag.source = "sgws_mul_3_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0; mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -60, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(() => {
                    let mulAni: DBComponent = this.creatmulAni(3);
                    mulAni.horizontalCenter = -60;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                })
            }
            else if (index == 3) {
                mulImag.source = "sgws_mul_4_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0; mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -2, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(() => {
                    let mulAni: DBComponent = this.creatmulAni(4);
                    mulAni.horizontalCenter = -2;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                })
            }
            else if (index == 4) {
                mulImag.source = "sgws_mul_5_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0; mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -55, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(() => {
                    let mulAni: DBComponent = this.creatmulAni(5);
                    mulAni.horizontalCenter = 55;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                })
            } else if (index >= 5) {
                mulImag.source = "sgws_mul_10_png";
                this.gameGroup.addChild(mulImag);
                mulImag.horizontalCenter = 0; mulImag.y = 300;
                egret.Tween.get(mulImag).to({ horizontalCenter: 0, y: 300, scaleX: 1, scaleY: 1 }, 400).to({ horizontalCenter: -114, y: 50, scaleX: 0.4, scaleY: 0.4 }, 400, egret.Ease.sineIn).call(() => {
                    let mulAni: DBComponent = this.creatmulAni(10);
                    mulAni.horizontalCenter = 114;
                    mulAni.bottom = 40;
                    game.UIUtils.removeSelf(mulImag);
                })
            }
        }

        private creatmulAni(index) {
            let mulAni: DBComponent = new DBComponent("sgws_freemul_" + index);
            mulAni.play("", 1);
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
                SoundManager.getInstance().playEffect("sgws_freespinend_mus_mp3");
            }, this, 1000)

            egret.setTimeout(() => {
                CF.dP(ENo.SGWS_QUIT_FREE_GAME);
                this.totalwinGroup.visible = false;
                this.freeWin = 0;
                this.winNumLabel.text = 0 + "";
            }, this, 7000)
        }

        /**
         * 忍者角色动画
         * @param  {string} dbname
         * @param  {number} loop
         * @param  {} callback
         */
        public roleAniFuc(dbname: string, loop: number, callback?) {
            game.UIUtils.removeSelf(this.roleAni);
            this.roleAni = DBComponent.create(dbname, dbname);
            this.roleAni.play("", loop); this.roleAniGroup.addChild(this.roleAni);
            this.roleAni.horizontalCenter = -530;
            this.roleAni.bottom = 100;
            if (dbname == "sgws_role_back") {
                this.roleAni.bottom = -150;
            }
            if (dbname == "sgws_role_clear") {
                this.roleAni.bottom = -580;
            }
            if (dbname == "sgws_role_appear") {
                this.roleAni.bottom = -155;
            }
            this.roleAni.resetPosition();
            if (loop == 1) {
                this.roleAni.callback = () => {
                    callback && callback();
                }
            }
        }
        public sword: DBComponent;
        protected swordAni() {
            this.sword = DBComponent.create("sgws_sword_1", "sgws_sword_1");
            // game.UIUtils.removeSelf(this.freeBgAni);
            SoundManager.getInstance().playEffect("sgws_bet_mp3");
            this.sword.play("", 1);
            this.sword.horizontalCenter = -40;
            this.sword.bottom = 260;
            this.freebgGroup.addChild(this.sword);
            this.sword.resetPosition();
            this.sword.callback = () => {
                game.UIUtils.removeSelf(this.sword);
                // this.freeBgAni.play("", 0);
                // this.freebgGroup.addChild(this.freeBgAni);
                // this.freeBgAni.resetPosition();
                // this.freeBgAni.horizontalCenter = -40;
                // this.freeBgAni.bottom = -280;
            }
        }
    }
}