/*
 * @Author: real MC Lee 
 * @Date: 2019-07-04 10:56:42 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-03 10:24:06
 * @Description: 
 */
module rdsg {
    export class RDSGScene3 extends game.BaseScene {
        public resizeGroup: eui.Group;
        public freegameAniGroup: eui.Group;
        public gameGroup: eui.Group;
        public scroller: rdsg.RDSGScroller;
        public freeTimesGroup: eui.Group;
        public freeTimesLabel: eui.BitmapLabel;
        public freewinLabel: eui.BitmapLabel;
        public totalWinGroup: eui.Group;
        public freeAddTimesGroup: eui.Group;
        public freeAddtimesimag: eui.Image;
        public lineTime: number = 1800;
        public effectGroup2: eui.Group;
        public scrollerAni: DBComponent;
        public friutAni: DBComponent;
        public totalimag: eui.Image;

        private scatterIcon: number; //scatterIcon数量 
        private fastItemIndex: number = 0;
        private freeBgAni: DBComponent;
        private totalWinAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "RDSGScene3Skin";
        }

        public createChildren() {
            super.createChildren();
            this.freeBgAni = DBComponent.create("rdsg_freeBgAni", "rdsg_commombg2");
            this.freeBgAni.horizontalCenter = 0; this.freeBgAni.bottom = -640;
            this.freeBgAni.play("", 0);
            this.freegameAniGroup.addChild(this.freeBgAni);
            this.freeBgAni.resetPosition();
            this.scrollerAni = DBComponent.create("rdsg_scrollerAni_2", "rdsg_commonback");
            this.scrollerAni.play("", 0);
            this.scrollerAni.horizontalCenter = -8;
            this.scrollerAni.bottom = 100;
            this.effectGroup2.addChild(this.scrollerAni);
            this.scrollerAni.resetPosition();
            this.friutAni = DBComponent.create("rdsg_friutAni_2", "rdsg_logoturn");
            this.friutAni.play("", 0);
            this.friutAni.horizontalCenter = -3;
            this.friutAni.verticalCenter = -333;
            this.resizeGroup.addChild(this.friutAni);
            this.friutAni.resetPosition();
            this.totalWinAni = DBComponent.create("rdsg_totalWinAni", "rdsg_lights");

        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.RDSG_START_FREE_GAME, this.startFreeGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.RDSG_START_FREE_GAME, this.startFreeGame, this);
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
                    game.UIUtils.removeSelf(this.scrollerAni);
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                    //图标数组非空校验
                    if (this.showAtr.length != 0) {
                        for (let i = 0; i < this.showAtr[4].length; i++) {
                            //判断第5列上是否有scatter
                            if (this.showAtr[4][i] == 2) {
                                if (this.scatter == 1) {
                                    if (this.yudiAtr2[1] <= 4) {
                                        SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                    } else {
                                        SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                    }
                                } else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }

                                this.scroller.addFoGuang1(5, i, "rdsg_icon_2_guang");
                            } else {
                                SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                            }
                        }
                    }
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.RDSGUtils.bet * 2) * 15) {
                            egret.setTimeout(() => {
                                // this.lineScoreGroup.visible = false; 
                                this.removeLastAni();
                            }, this, this.lineTime - 300);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                    }
                    this.addFreeBonusAni();
                    this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    for (let i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            if (this.scatter == 1) {
                                if (this.yudiAtr2[1] <= 3) {
                                    SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                } else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }
                            } else {
                                SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            }
                            this.scroller.addFoGuang1(4, i, "rdsg_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
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
                                        SoundManager.getInstance().playEffect("rdsg_scatdown_mp3");
                                    } else {
                                        SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                    }
                                } else {
                                    SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                                }
                                this.scroller.addFoGuang1(3, i, "rdsg_icon_2_guang");
                            }

                        } else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                        }
                    }

                    break;
                case 2:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            this.scroller.addFoGuang1(2, i, "rdsg_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
                        }
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("rdsg_appear_mp3");
                            this.scroller.addFoGuang1(1, i, "rdsg_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("rdsg_reelstop_mp3");
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
            if (e.data) {
            this.isFastGame = e.data.isfast;
            }
            this.scroller.showFreeFirst(3);
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            game.LaohuUtils.speed = 85;
            this.freeWins = game.LaohuUtils.freeWin;
            this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.freeTimes = game.LaohuUtils.freeTimes;
            this.freeTimesLabel.text = this.freeTimes + "";
            SoundManager.getInstance().playMusic("rdsg_freespinbackground_mus_mp3");
            if (!this.isReconnect) {
                egret.setTimeout(this.playFreeGame, this, 2500);
            } else {
                egret.setTimeout(this.playFreeGame, this, 2500);
            }
        }
        private isMessaged: boolean = false; //防止重复发送免费旋转消息

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
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    this.scrollerAni.horizontalCenter = -8;
                    this.scrollerAni.bottom = 100;
                    this.effectGroup2.addChild(this.scrollerAni);
                    this.scrollerAni.resetPosition();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        }

        /**
         * 移除中奖连线动画
         */
        private removeLastAni() {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore)
                this.clearAniPool();
                this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        }
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        private allAtr: Array<Array<number>>;//所有连线图标数组
        private yudiAtr: Array<number>;//scatter图标位置数组 
        private yudiAtr2: Array<number>;
        private messageTimeOut: any;
        public freeGameTimeOut: any;
        /**
         * 发送免费游戏旋转消息
         */
        public async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.bonusAtr = [];
            this.allLine = [];
            this.eachLineIconIndex = [];
            this.allAtr = [[], [], [], [], []];
            this.fastItemIndex = 0;
            this.yudiAtr = [];
            this.scatterIcon = 0;
            this.winGold = 0;
            this.lineTime = 1500;
            let data2 = { "spinType": 1, "bet": game.RDSGUtils.bet, "lineCount": 243, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_RDSG);
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
            this.lineTime = this.lineTime + this.bonusAtr.length * 500;
            this.winGold = resp2.winCount;
            this.freeMulIndex = resp1.freeMulIndex;
            this.freeTimes = resp2.freeTimes;

            this.freeWins += this.winGold;
            game.RDSGUtils.ToTalMoney = resp2.own_gold;
            this.messageTimeOut = egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 400)
        }
        private bigWinPanel: RDSGBigwinGroup;
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel(); //中奖展示金额数字
        /**
         * 免费游戏中奖连线
         */
        private addFreeBonusAni() {
            //判断是否为bigwin
            if (this.winGold >= (game.RDSGUtils.bet * 2) * 15) {
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
                                this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                                egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
                                this.freeTimesLabel.text = this.freeTimes + "";
                            }
                            this.winLine(this.winLineGroup, this.allLine);
                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeGame();
                            }, this, this.lineTime);
                        });
                    }
                    this.bigWinPanel = new RDSGBigwinGroup();
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
                        this.winLine(this.winLineGroup, this.allLine);
                        if (this.scatter == 1) {
                            this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                            egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(() => { SoundManager.getInstance().playEffect("rdsg_words_mp3"); })
                            this.freeTimesLabel.text = this.freeTimes + "";
                        }
                        this.scroller.addBonusAni(this.allAtr, this.winGold);
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this)
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, this.lineTime);
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            //普通中奖
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("rdsg_win_mp3");
                if (this.scatter == 1) {
                    this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                    egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(() => { SoundManager.getInstance().playEffect("rdsg_words_mp3"); })
                    this.freeTimesLabel.text = this.freeTimes + "";
                }
                this.winLine(this.winLineGroup, this.allLine);
                this.scroller.addBonusAni(this.allAtr, this.winGold);
                let data = Number(new Big(this.winGold).mul(100));
                this.commomScore.font = "rdsg_winnum_big_fnt";
                this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                this.commomScore.textAlign = "center";
                this.commomScore.verticalCenter = 0;
                this.commomScore.horizontalCenter = 0;
                this.gameGroup.addChild(this.commomScore);
            } else {
                if (this.scatter == 1) {
                    this.freeAddtimesimag.source = "rdsg_freespin_+" + (this.freeTimes - game.LaohuUtils.freeTimes) + "_png";
                    egret.Tween.get(this.freeAddTimesGroup).to({ alpha: 1 }, 1000).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500).call(() => { SoundManager.getInstance().playEffect("rdsg_words_mp3"); })
                    this.freeTimesLabel.text = this.freeTimes + "";
                }
            }
            // }
        }

        public totalWinLabel: eui.BitmapLabel;
        /**
         * 免费游戏结算
         */
        public showTotalWin() {
            this.totalWinGroup.visible = true;
            this.resizeGroup.addChild(this.totalWinGroup);
            game.RDSGUtils.freeWin = this.freeWins;
            this.totalWinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            this.totalWinAni.play("", 0);
            this.totalWinAni.horizontalCenter = 0;
            this.totalWinAni.bottom = 80;
            this.totalWinGroup.addChild(this.totalWinAni);
            this.totalWinAni.resetPosition();
            this.totalWinGroup.addChild(this.totalimag);
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("rdsg_free_win_mp3");
            egret.setTimeout(() => {
                //恢复背景音乐
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(this.totalWinAni);
                this.freeWins = 0;
                this.freewinLabel.text = 0 + "";
                CF.dP(ENo.RDSG_QUIT_FREE_GAME);
                this.totalWinGroup.visible = false;
            }, this, 8000);
        }
        public rdsgLineBig: DBComponent;
        public rdsgLineHuge: DBComponent;
        public rdsgLineMid: DBComponent;
        public rdsgLineSmall: DBComponent;
        public i: number = 0;
        public j: number = 0;
        public atr1: Array<any> = [];
        public atr2: Array<any> = [];
        public aniPool: Array<any> = [];
        public array1: Array<any>;
        public array2: Array<any>;
        public winLineGroup: eui.Group;
        /**
         * 中奖连线
         * @param  {Array<Array<number>>} str
         * @param  {egret.DisplayObject} object
         */
        public winLine(object?: any, str?: Array<Array<number>>) {
            this.array1 = [];
            this.array2 = [];
            this.aniPool = [];
            for (let i = 0; i < str.length; i++) {
                this.array1.push(str[i][0]);
                this.array2.push(str[i][4]);
            }

            this.j = 0;
            this.atr1 = [];
            this.atr2 = [];
            this.allLineHanlde(object, str);
        }
        /**
         * 总连线
         * @param  {any} object?
         * @param  {Array<Array<number>>} atr?
         */
        public allLineHanlde(object?: any, atr?: Array<Array<number>>) {
            if (atr) this.atr1 = atr;
            if (this.j < this.atr1.length) {
                this.addFirstAni(this.array1[this.j]);
                this.i = 0;
                this.eachLineHandle(object, this.atr1[this.j]);
                this.j++;
            }
        }
        public isStopLine: boolean = false;
        /**
         * 每条连线
         * @param  {any} object?
         * @param  {Array<number>} atr?
         */
        public eachLineHandle(object?: any, atr?: Array<number>) {
            if (atr) this.atr2 = atr;
            if (!this.isStopLine) {
                if (this.i < this.atr2.length - 1) {
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);

                            break;
                        case 1:
                            this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);

                            break;
                        case 0:
                            this.midLineHandle(object, this.atr2[this.i]);
                            // this.routationHandle(0);
                            break;
                    }
                    this.i++;
                } else {
                    if (this.array2[this.j - 1] != null) {
                        this.addLastAni(this.array2[this.j - 1]);
                    }
                    this.allLineHanlde();
                }
            }

        }
        /**
         * 连线旋转角度处理
         * @param  {number} num
         */
        public routationHandle(num: number) {
            if (num == 2) {
                return -62.18;
            } else if (num == -2) {
                return 62.18;
            } else if (num == 1) {
                return -43.47;
            } else if (num == -1) {
                return 43.47;
            } else if (num == 0) {
                return 0;
            }
        }
        /**
         * 长连线播放
         */
        public hugeLineHandle(object: any, position: number, postion2: number) {
            let rdsgLineHuge = new DBComponent("rdsg_line_huge");
            rdsgLineHuge.play("rdsg_line_huge_1", 1);
            rdsgLineHuge.bottom = this.aniPositionYHandle(position);
            rdsgLineHuge.horizontalCenter = this.aniPositionXHandle(this.i);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineHuge.rotation = this.routationHandle(2);
            } else {
                rdsgLineHuge.rotation = this.routationHandle(-2);
            }
            rdsgLineHuge.callback = () => {
                rdsgLineHuge.play("rdsg_line_huge_2", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineHuge);
            rdsgLineHuge.resetPosition();
            this.aniPool.push(rdsgLineHuge);
        }
        /**
         * 中连线播放
         */
        public bigLineHandle(object: any, position: number, position2: number) {
            let rdsgLineBig = new DBComponent("rdsg_line_big");
            rdsgLineBig.play("rdsg_line_big_1", 1);
            rdsgLineBig.bottom = this.aniPositionYHandle(position);
            rdsgLineBig.horizontalCenter = this.aniPositionXHandle(this.i);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineBig.rotation = this.routationHandle(1);
            } else {
                rdsgLineBig.rotation = this.routationHandle(-1);
            }
            rdsgLineBig.callback = () => {
                rdsgLineBig.play("rdsg_line_big_2", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineBig);
            rdsgLineBig.resetPosition();
            this.aniPool.push(rdsgLineBig);
        }
        /**
         * 短连线播放
         */
        public midLineHandle(object: any, position: number) {
            let rdsgLineMid = new DBComponent("rdsg_line_mid");
            rdsgLineMid.play("rdsg_line_mid_1", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = () => {
                rdsgLineMid.play("rdsg_line_mid_2", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineMid);
            rdsgLineMid.resetPosition();
            this.aniPool.push(rdsgLineMid);
        }
        /**
         * 开头连线链接
         * @param  {Array<any>} str
         */
        public addFirstAni(str: any) {
            let rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = -420;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play("rdsg_line_small_2", 0);
            }
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        }
        /**
         * 末端连线连接
         * @param  {Array<any>} str
         */
        public addLastAni(str: any) {
            let rdsgLineSmall = new DBComponent("rdsg_line_small");
            rdsgLineSmall.play("rdsg_line_small_1", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = 340;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play("rdsg_line_small_2", 0);
            }
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        }
        /**
         * 设置连线bottom属性
         * @param  {any} postion
         */
        public aniPositionYHandle(postion: any) {
            if (postion == 0) {
                return 390;
            } else if (postion == 1) {
                return 228;
            } else if (postion == 2) {
                return 68;
            }
        }
        /**
         * 动画horizonCenter设置
         * @param  {any} x
         */
        public aniPositionXHandle(x: any) {
            if (x == 0) {
                return -340;
            } else if (x == 1) {
                return -168;
            } else if (x == 2) {
                return 0;
            } else if (x == 3) {
                return 170;
            } else if (x == 4) {
                return 400;
            }
        }
        public clearAniPool() {
            if (this.aniPool) {
                for (let i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        }
        private scatter3timeout: any;
        private scatter4timeout: any;
        private scatter5timeout: any;
        /**
         * 部分转轴加速
         * @param  {number} index
         */
        public scrollerItemFast(index: number) {
            let item3 = this.scroller.item3;
            let item4 = this.scroller.item4;
            let item5 = this.scroller.item5;
            item3.downTimeout.stop();
            item4.downTimeout.stop();
            item5.downTimeout.stop();

            if (item3.downTimeout) LogUtils.logD("true3");
            if (item4.downTimeout) LogUtils.logD("true4")
            if (item5.downTimeout) LogUtils.logD("true5")
            egret.clearTimeout(this.scatter3timeout);
            egret.clearTimeout(this.scatter4timeout);
            egret.clearTimeout(this.scatter5timeout);
            switch (index) {
                case 3:
                    this.scroller.addScatterAni(3, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true);
                    this.scatter3timeout = egret.setTimeout(() => {
                        item3.changeResult(this.showAtr[2]);
                        this.scroller.removeScatterAni(3);
                        this.scroller.addScatterAni(4, 0);
                    }, this, 3000);
                    this.scatter4timeout = egret.setTimeout(() => {
                        item4.changeResult(this.showAtr[3]);
                        this.scroller.removeScatterAni(4);
                        this.scroller.addScatterAni(5, 0);
                    }, this, 6000);
                    this.scatter5timeout = egret.setTimeout(() => {
                        item5.changeResult(this.showAtr[4]);
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3")
                    }, this, 9000);
                    break;
                case 4:
                    this.scroller.addScatterAni(4, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true)
                    this.scatter4timeout = egret.setTimeout(() => {
                        item4.changeResult(this.showAtr[3]);
                        this.scroller.removeScatterAni(4);
                        this.scroller.addScatterAni(5, 0);
                    }, this, 3000);
                    this.scatter5timeout = egret.setTimeout(() => {
                        item5.changeResult(this.showAtr[4]);
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3")
                    }, this, 6000);
                    break;
                case 5:
                    this.scroller.addScatterAni(5, 0);
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true)
                    this.scatter5timeout = egret.setTimeout(() => {
                        item5.changeResult(this.showAtr[4]);
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3")
                    }, this, 3000);
                    break;
            }
        }
        public isFastGame = false;
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
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                }, this, 500);
            }
            let func2 = () => {
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
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