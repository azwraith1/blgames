// TypeScript file
module snyx {
    export class SNYXScene1 extends game.BaseSlotScene {
        public resizeGroup: eui.Group;
        public scroller: snyx.SNYXScroller;
        public bottomGroup: eui.Group;
        public memuBtn: eui.Button;
        public tipsBtn: eui.Button;
        public menuGroup: eui.Group;
        public recordBtn: eui.Button;
        public setingBtn: eui.Button;
        public maxBet: eui.Image;
        public beishu: eui.Label;
        public playerGold: eui.Label;
        public winNum: eui.Label;
        public subbet: eui.Button;
        public addbet: eui.Button;
        public totalBet: eui.Label;
        public spinGroup: eui.Group;
        public autoGameBtn: eui.Button;
        public startBtn: eui.Image;
        public timesLabel: eui.BitmapLabel;
        public betTtipsGroup: eui.Group;
        public maxWinLabel: eui.Label;
        public quitBtn: eui.Button;

        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_SNYX;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_SNYX_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_SNYX_TIPS_PANEL;
        public RECORD_NOTIFY: string = PanelNotify.OPEN_DNTG_RECORD_PANEL;
        public SETING_NOTIFY: string = PanelNotify.OPEN_SETTING;
        public QUIT_NOTIFY: string = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
        public lineSmall = "";
        public lineMid = "";
        public lineBig = "";
        public lineHuge = "";
        public buttonEffect = "snyx_button_mp3";
        public scrollerFastEffect = "sgws_reel_fast_spin_mp3";
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.LaohuUtils.ToTalMoney;
        public utilsBet = game.LaohuUtils.bet;
        public fixpositionY = [40, 40, 20, 20];
        public fastSpeedTime = 4000;
        public isSetHui = false;
        public sceneId = 1018;
        public gameId = "snyx";
        public yudiAtrHui;
        public yudiAtrHui2;

        public maskRect: eui.Rect;
        public effectGroup: eui.Group;
        public bet: number = 1;
        public free_times: eui.Image;
        public HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];


        public constructor() {
            super();
            this.skinName = "SNYXScene1Skin";
        }

        public bigWinPanel: SNYXBigwinPanel;

        public createChildren() {
            super.createChildren();
            SoundManager.getInstance().playMusic("snyx_bgm_mp3");

            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this[`quitBtn`].visible = false;
            }

            this.setOtherBtn();
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            this.startGame();
            this.initAni();
            this.scroller.showFirst(1);

            // this.scroller.addBonusAni([[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2]]);
            this.roleAniFuc("snyx_role1_de", 0, true);
            this.roleAniFuc("snyx_role2_de", 0, false);
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SNYX_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SNYX_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        }
        private bgAni2: DBComponent;
        private bgAni1: DBComponent;
        private spinDefaultAni: DBComponent;//spin默认动画
        private spinStartAni: DBComponent;//spin点击特效
        private spinRunningAni: DBComponent;//spin旋转特效
        private spinStopAni: DBComponent;//spin停止特效

        private initAni() {
            this.bgAni1 = DBComponent.create("snyx_bg01", "snyx_bg01");
            this.bgAni1.play("", 0);
            this.bgAni1.bottom = 0; this.bgAni1.horizontalCenter = -7;
            this.bgAni1.touchEnabled = false;
            this.roleAniGroup.addChild(this.bgAni1);
            this.bgAni1.resetPosition();

            this.spinDefaultAni = DBComponent.create("snyx_spin01", "snyx_spin01");
            this.spinDefaultAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = 2; this.spinDefaultAni.bottom = 70;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.spinStartAni = DBComponent.create("snyx_spin02", "snyx_spin02");
            this.spinRunningAni = DBComponent.create("snyx_spin03", "snyx_spin03");
            this.spinStopAni = DBComponent.create("snyx_spin04", "snyx_spin04");

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
        private fastItemIndex: number = 0;
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        public yudiAtr2: Array<number>;//scatter图标所在的列
        public lineTime: number = 1500;
        private ownGold: number = 0//玩家当前金钱
        private gameGroup: eui.Group;
        public isSmash: number;

        /**
         * @param  {egret.Event} e
         */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.LaohuUtils.bets = [];
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.LaohuUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }

            if (resp.roomInfo.gamePayTable) {
                game.LaohuUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.LaohuUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }

                game.LaohuUtils.FreeTimeMulIndex = resp.roomInfo.players.freeMulIndex;
                game.LaohuUtils.FreeTimeMul = game.LaohuUtils.FreeTimeMul[game.LaohuUtils.FreeTimeMulIndex];
                game.LaohuUtils.freeTimes = resp.roomInfo.players.freeTimes;
            }
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = true;
            this.resetOtherBtn();
            let playerIdnex = resp.playerInfo.playerIndex;
            let players: any = {};
            for (let key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            this.ownGold = players.gold;
            this.lastSmahs = players.isSmashing;
            if (players.isSmashing) {
                this.wildAtr = players.smashingMatrix;
                if (players.freeTimes == 0) this.wildKuang(this.wildAtr);
            } else {
                this.wildAtr = [];
            }
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
            game.LaohuUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.bet = game.LaohuUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.LaohuUtils.bet = players.lastBet;
                this.setOtherBtn();
                this.startBtn.touchEnabled = false;
                // this.roleAniFuc("sgws_role_disappear", 1, () => {
                //     game.UIUtils.removeSelf(this.roleAni);
                //     SoundManager.getInstance().playEffect("sgws_role_intofree_mp3");
                CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: this.isFastGame, atr: this.wildAtr });
                // })
            }
            //重连后倍数判断
            switch (game.LaohuUtils.bet) {
                case 1:
                    this.bet = 1;
                    break;
                case 2:
                    this.bet = 2;
                    break;
                case 3:
                    this.bet = 4;
                    break;
                case 4:
                    this.bet = 10;
                    break;
                case 5:
                    this.bet = 20;
                    break;
                case 6:
                    this.bet = 30;
                    break;
                case 7:
                    this.bet = 60;
                    break;
                case 8:
                    this.bet = 100;
                    break;
                case 9:
                    this.bet = 140;
                    break;
                case 10:
                    this.bet = 200;
                    break;
            }
            this.utilsBet = game.LaohuUtils.bet;
            let data1 = Number(new Big(game.LaohuUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        }

        public isFreeBack: boolean = false;
        public isTest: boolean = false;

        /**
         * spin旋转
         */
        public startBtnTouch() {
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.LaohuUtils.bet * 0.5 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "snyx_spin_1_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    this.resetStartBtn();
                    this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = this.ownGold;
                }, "", true);
                return;
            }
            this.isFreeBack = false;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            //转轴是否准备就绪
            if (this.runningType == RUNNING_TYPE.EMPTY) {
                if (this.scatter == 1) return;
                this.isTest = false;
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "snyx_spin_1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                        this.resetStartBtn();
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "snyx_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                            this.resetStartBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            return;
                        }
                    }
                    //判断是否为免费游戏并且是否有满足总赢取条件
                    if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                        //自动游戏总赢取条件满足
                        if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "snyx_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                            this.resetStartBtn();
                            var colorMatrix = [
                                1, 0, 0, 0, 0,
                                0, 1, 0, 0, 0,
                                0, 0, 1, 0, 0,
                                0, 0, 0, 1, 0
                            ];
                            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                            this.startBtn.filters = [colorFlilter];
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.LaohuUtils.bet * 0.5
                    if (game.LaohuUtils.auto_times > 1000) {
                        this.timesLabel.text = "s";
                    }
                }
                //自动游戏次数完场
                else if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                    this.timesLabel.visible = false;
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.startBtn.source = "snyx_spin_1_png";
                    this.resetOtherBtn();
                    this.resetStartBtn();
                    return;
                } //为满足完成自动游戏条件，开始自动游戏旋转
                else if (!game.LaohuUtils.isAutoGame) {
                    this.setStartBtn();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                }
                this.winNum.text = 0 + "";
                this.startBtn.filters = [colorFlilter];
                this.runningType = RUNNING_TYPE.LOOP;
                game.LaohuUtils.isScatter = false;
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.setOtherBtn();
                this.scroller.run();
                // SoundManager.getInstance().playEffect("sgws_reelstart_mp3");
                SoundManager.getInstance().playEffect("snyx_reel_mp3");
                this.messageSend();
            }
            //是否为快速停止状态
            else if (this.runningType == RUNNING_TYPE.RESULT) {
                game.LaohuUtils.auto_times = 0;
                this.timesLabel.text = "";
                this.fastGame();
                if (this.scroller.lastClick) {
                    this.clickTime += 1;
                } else {
                    this.clickTime = 1;
                }
                game.LaohuUtils.isAutoGame = false;
            }
            //停止状态点击无效果
            else if (this.runningType == RUNNING_TYPE.STOP) {
            }
        }

        public spinTest: number = 0;
        public wheel: Array<Array<number>>;


        public async startBtnTouch0() {
            this.isTest = true;
            this.wheel = [[], [], [], [], []];
            let data = this.spinresult.text;
            for (let i = 0; i < 5; i++) {
                let j = data.split(":")[i];
                let l = j.split(",");
                for (let m = 0; m < l.length; m++) {
                    let n = parseInt(l[m]);
                    this.wheel[i].push(n);
                }
            }
            let data2 = this.pscen1.text;
            this.spinTest = parseInt(data2);
            this.removeLastAni();
            this.setStartBtn();
            this.setOtherBtn();
            this.scroller.stopIconDb();
            this.scroller.run();
            this.messageSend();
        }

        /**
        * 快速结束转动
        */
        private fastGame() {
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter3timeout);
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);
                this.scroller.removeScatterAni();
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "snyx_spin_1_png";
                this.scroller.runResultFast();
                // for (let i = 1; i <= 4; i++) {
                //     this.scroller[`item${i}`].resetSpecilHui();
                // }

            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                game.LaohuUtils.isAutoGame = false;
                if (this.scatter != 1) this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "snyx_spin_1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 2; this.spinStopAni.bottom = 40;
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();

                this.spinStopAni.callback = () => {
                    game.UIUtils.removeSelf(this.spinStopAni);
                }
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            //其他情况下，正常处理快速停止
            else {
                this.startBtn.source = "snyx_spin_1_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
            SoundManager.getInstance().stopEffectByName("snyx_reel_fast_mp3");
            SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
        }
		/**
		 * 点击转轴区域快速停止游戏
		 */
        public scrollerFastGame() {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    this.fastEnd = true;
                    egret.clearTimeout(this.scatter3timeout);
                    egret.clearTimeout(this.scatter4timeout);
                    egret.clearTimeout(this.scatter5timeout);
                    this.scroller.removeScatterAni();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;
                    // for (let i = 1; i <= 4; i++) {
                    //     this.scroller[`item${i}`].resetSpecilHui();
                    // }

                }
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("snyx_firework_mp3");
                SoundManager.getInstance().stopEffectByName("snyx_reel_fast_mp3");
                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
            }
        }

        /**
         * 上次游戏效果移除
         */
        public removeLastAni() {
            if (this.winGold > 0) {
                this.isStopLine = true;
                this.commondi.visible = this.commomScore.visible = false;
                egret.clearTimeout(this.sethuiTimeout);
                this.clearLineImaPool();
                this.scroller.removeSmashingDb();
            }
            this.scroller.visible = true;
            // this.scroller.hideIcon();
            this.fastEnd = false;
            this.scroller.stopIconDb();
            // this.scroller.setIconHui();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        }
        /**
        * 开始按钮动画
        */
        private setStartBtn() {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinRunningAni.bottom = 45; this.spinRunningAni.horizontalCenter = 0;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0; this.spinStartAni.bottom = 40;
            this.spinGroup.addChild(this.spinStartAni);
            this.spinStartAni.resetPosition();
        }
        /**
         * 还原开始按钮
         */
        private resetStartBtn() {
            game.UIUtils.removeSelf(this.spinRunningAni);
            this.spinDefaultAni.play("", 0);
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
        }

        public wildAtr: Array<number>;
        public showAtr2: Array<Array<number>>;
        public lastSmahs: number = 0;
        /**
         * 发送c_bet请求
         */
        private async messageSend() {
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
            //测试专用消息

            data2 = { "spinType": 0, "bet": game.LaohuUtils.bet, "lineCount": 243, "activityId": 0 };
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
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
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
                SoundManager.getInstance().playEffect("snyx_happy_mp3");
                this.roleAniFuc("snyx_role1_await", 0, true);
                this.roleAniFuc("snyx_role2_await", 0, false);
                this.changeBgAni()
                this.messageTimeOut = egret.setTimeout(() => {
                    this.scroller.runResult(this.showAtr);
                    this.wildKuang(this.wildAtr);
                    this.runningType = RUNNING_TYPE.RESULT;
                    game.UIUtils.removeSelf(this.bgAni2);
                    this.roleAniFuc("snyx_role1_de", 0, true);
                    this.roleAniFuc("snyx_role2_de", 0, false);
                }, this, 4800);
                for (let i = 0; i < this.wildAtr.length; i++) {
                    if (this.wildAtr[i] >= 0) { this.wildWin(i); SoundManager.getInstance().playEffect("snyx_firework_mp3"); }
                }
            }
            //继续wild
            else if (this.isSmash == 1 && this.lastSmahs == 1 && isbonus == 0) {
                this.messageTimeOut = egret.setTimeout(() => {
                    this.runningType = RUNNING_TYPE.RESULT;
                    this.scroller.runResult(this.showAtr);
                }, this, 300);
            }
            //没有wild
            else {
                this.messageTimeOut = egret.setTimeout(() => {
                    this.runningType = RUNNING_TYPE.RESULT;
                    this.scroller.runResult(this.showAtr);
                    if (this.isFastGame) {
                        this.scroller.runResultFast();
                    }
                }, this, 300);
                this.scroller.removeWild();
            }
            this.lastSmahs = this.isSmash;
            this.winGold = resp2.winCount;
            this.ownGold = resp2.own_gold;
            if (this.winGold > 0) { this.lineTime = 1500 } else { this.lineTime = 1000 }
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
            //是否为scatter
            if (resp2.sactter == 1) {
                let scatternum = 0;
                this.yudiAtr = [];
                for (let i = 0; i <= 4; i++) {
                    for (let j = 0; j < this.showAtr[i].length; j++) {
                        if (this.showAtr[i][j] == 2) {
                            this.yudiAtr.push(j);
                            this.yudiAtr2.push(i + 1);
                        }
                    }
                }
                game.LaohuUtils.freeTimes = resp2.freeTimes;
            }
            //免费游戏情况下累加赢取金额
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.totoalWinGold += this.winGold;
            }
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < this.showAtr2[i].length; j++) {
                    //判断前三列几个玉帝
                    if (this.showAtr2[i][j] == 2) {
                        this.scatterIcon++;
                    } else {
                        this.startBtn.touchEnabled = true;
                        this.scroller.touchEnabled = true;
                    }
                }
            }
        }

        public changeBgAni() {
            this.bgAni2 = DBComponent.create("snyx_bg02", "snyx_bg02");
            this.bgAni2.play("", 0);
            this.bgAni2.bottom = 0; this.bgAni2.horizontalCenter = 0;
            this.bgAni2.touchEnabled = false;
            this.roleAniGroup.addChild(this.bgAni2);
            this.bgAni2.resetPosition();
        }
        /**
         * @param  {egret.Event} e
         */
        public scrollerEnd(e: egret.Event) {
            let data = e.data;
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            let index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "snyx_spin_1_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.downTime4 = 1200;
                                game.LaohuUtils.downTime5 = 1600;
                                game.LaohuUtils.speed = 48;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                this.resetStartBtn();
                            }
                        }
                        //图标数组非空校验
                        if (this.showAtr.length != 0) {
                            for (let i = 0; i < this.showAtr[4].length; i++) {
                                //判断第5列上是否有scatter
                                if (this.showAtr[4][i] == 2) {
                                    SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                                    this.scroller.addFoGuang1(5, i, "snyx_icon_2_guang");
                                } else {
                                    SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                                }
                            }
                        }
                        // this.scroller.removeIconHui(this.HuiAtr);
                        this.winNum.text = this.winGold + "";
                        // if (this.isSmash) this.scroller.wildIcon(this.wildAtr);
                        SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            // this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.startBtn.touchEnabled = false;
                                // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(() => {
                                if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                            if (this.winGold > 0) {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                            } else {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                            }
                        }
                        //不是自动游戏
                        else {
                            this.resetOtherBtn();
                            this.resetStartBtn();
                            egret.setTimeout(() => {
                                LogUtils.logD("empty5");
                                if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
                        // if (this.winGold > 0) { this.startBtn.touchEnabled = false };
                        this.checkBonusIcon();
                    }
                    break;
                case 4:
                    for (let i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(4, i, "snyx_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 5 && !this.isFastGame) {
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    }
                    break;
                case 3:
                    for (let i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(3, i, "snyx_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            let atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            // this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd) return;
                            if (this.fastItemIndex == 4 && !this.isFastGame) {
                                this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                            }
                        }
                    }

                    break;
                case 2:
                    for (let i = 0; i < this.showAtr[1].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(2, i, "snyx_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3 && !this.isFastGame) {
                        this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("snyx_scadown_mp3");
                            this.scroller.addFoGuang1(1, i, "snyx_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("snyx_reel_stop_mp3");
                        }
                    }
                    break;
            }
        }
        /**
         * 游戏中奖结算
         */
        public checkBonusIcon() {
            if (this.isSmash == 1 && this.lastSmahs == 0) {
                // this.wildWin();
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
         * wild 中奖主界面烟花效果
         */
        private wildWin(i) {
            // for (let i = 0; i < 5; i++) {
            let wildAni: DBComponent = new DBComponent("snyx_wild");
            wildAni.play("", 1);
            wildAni.horizontalCenter = (i - 2) * 170;
            wildAni.bottom = 290;
            this.roleAniGroup.addChild(wildAni);
            wildAni.resetPosition();
            // }
        }

        /**
         * 普通中奖效果
         */
        private commwin() {
            if (this.winGold >= game.LaohuUtils.bet * 30) {
                this.bigwin()
            } else {
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    if (this.scatter == 1) this.runningType = RUNNING_TYPE.STOP;
                    this.commomScore.visible = this.commondi.visible = true;
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                    SoundManager.getInstance().playEffect("snyx_award_mp3");
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    this.roleAniFuc("snyx_role1_happy", 1, true, () => {
                        this.roleAniFuc("snyx_role1_de", 0, true);
                    });
                    this.roleAniFuc("snyx_role2_happy", 1, false, () => {
                        this.roleAniFuc("snyx_role2_de", 0, false);
                    });
                    let m = Math.ceil(Math.random() * 2);
                    SoundManager.getInstance().playEffect("snyx_laugh" + m + "_mp3");
                    this.removeScoreTimeout = egret.setTimeout(() => {
                        if (!game.LaohuUtils.isAutoGame || this.scatter == 1) { this.addEachLineAni(); }
                    }, this, 2500);
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
                //未中奖 
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("snyx_happy_mp3");
                        this.roleAniFuc("snyx_role1_cheer", 1, true, () => {
                            this.roleAniFuc("snyx_role1_de", 0, true);
                        });
                        this.roleAniFuc("snyx_role2_cheer", 1, false, () => {
                            this.roleAniFuc("snyx_role2_de", 0, false);
                        });
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                        egret.setTimeout(() => {
                            CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: this.isFastGame });
                        }, this, 2500);
                    } else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
            }
        }

        public addEachLineAni() {
            //非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) { this.quitBtn.touchEnabled = false; this.resetStartBtn(); }
                this.scroller.stopIconDb();
                let count = 0;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, (index, callback) => {
                    // if (this.isStopAni) return;
                    for (let j = 0; j < index.length; j++) {
                        let k = j + 1;
                        this.scroller[`item${k}`].showAni(index[j]);
                        let data = Number(new Big(this.eachLineScore[count]).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                        this.commomScore.visible = this.commondi.visible = true;
                    }
                    //单一连线
                    if (this.bonusAtr.length == 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                this.commomScore.visible = this.commondi.visible = false;
                            }, this, 1500)
                        }
                        this.showIconTimeOut = egret.setTimeout(callback, this, 2500);
                    }
                    //多条连线
                    if (this.bonusAtr.length > 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                this.scroller.stopIconDb();
                                this.commomScore.visible = this.commondi.visible = false;
                            }, this, 2100)
                        }
                        this.showIconTimeOut = egret.setTimeout(callback, this, 2500);
                    }
                    count++;
                }, () => {
                    //callback 判断结果是否为scatter
                    if (this.scatter == 1) {
                        this.commomScore.visible = this.commondi.visible = false;
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("snyx_happy_mp3");
                        this.roleAniFuc("snyx_role1_cheer", 1, true, () => {
                            this.roleAniFuc("snyx_role1_de", 0, true);
                        });
                        this.roleAniFuc("snyx_role2_cheer", 1, false, () => {
                            this.roleAniFuc("snyx_role2_de", 0, false);
                        });
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "snyx_icon_2");
                        }
                        egret.setTimeout(() => {
                            CF.dP(ENo.SNYX_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            this.resetOtherBtn();
                        }, this, 2500)
                        if (!game.LaohuUtils.isAutoGame) this.resetStartBtn();
                    }
                    else {
                        count = 0;
                        this.commomScore.visible = this.commondi.visible = false;
                        return this.addEachLineAni();
                    }

                })
            }
        }

        private bigwin() {
            egret.clearTimeout(this.autoGameTimeout);
            let func = () => {
                this.bigWinPanel.touchEnabled = false;
                // game.UIUtils.removeSelf(this.bigWinPanel);
                this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);

                if (this.scatter != 1) this.startBtn.touchEnabled = true;
                if (!game.LaohuUtils.isAutoGame) {
                    this.runningType = RUNNING_TYPE.EMPTY;
                }
                /**
                 * bigwin结束窗口效果
                 */
                this.bigWinPanel.stopShowBigWin(() => {
                    this.commomScore.visible = this.commondi.visible = false;
                    this.roleAniFuc("snyx_role1_de", 0, true);
                    this.roleAniFuc("snyx_role2_de", 0, false);
                    //自动游戏bigwin后开始下一把
                    if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                        this.autoGameTimeout = egret.setTimeout(() => {
                            this.startBtnTouch();
                        }, this, 2000);
                    }
                    if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                        this.resetOtherBtn();
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        this.startBtn.touchEnabled = true;
                        egret.clearTimeout(this.eachLineTimeOut);
                        this.eachLineTimeOut = egret.setTimeout(() => {
                            this.addEachLineAni();
                        }, this, this.lineTime);
                    }
                    if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.eachLineTimeOut);
                        this.addEachLineAni();
                        this.commondi.visible = this.commomScore.visible = true;
                        let data = Number(new Big(this.winGold).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                    } else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                    }
                    game.UIUtils.removeSelf(this.bigWinPanel);
                    this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
                this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold, 3) + "";
                this.roleAniFuc("snyx_role1_de", 0, true);
                this.roleAniFuc("snyx_role2_de", 0, false);
                //自动游戏bigwin后开始下一把
                if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                    this.autoGameTimeout = egret.setTimeout(() => {
                        this.startBtnTouch();
                    }, this, 2000);
                }
                if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                    if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                        this.resetOtherBtn();
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        this.startBtn.touchEnabled = true;
                    }
                }
                if (!game.LaohuUtils.isAutoGame) {
                    this.runningType = RUNNING_TYPE.EMPTY;
                    egret.clearTimeout(this.eachLineTimeOut);
                    this.eachLineTimeOut = egret.setTimeout(() => {
                        this.addEachLineAni();
                    }, this, this.lineTime)
                };
                if (this.scatter == 1) {
                    egret.clearTimeout(this.eachLineTimeOut);
                    this.addEachLineAni();
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold, 3) + "";
                    this.commondi.visible = this.commomScore.visible = true;
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data, 3) + "";
                } else {
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                }
                game.UIUtils.removeSelf(this.bigWinPanel);
            })
            this.roleAniFuc("snyx_role1_cheer", 0, true);
            this.roleAniFuc("snyx_role2_cheer", 0, false);
            this.resizeGroup.addChild(this.bigWinPanel);
        }

        /**
       * 免费游戏结束后到正常游戏
       */
        private free2Commom() {
            this.scatter = 0;
            this.startBtn.touchEnabled = true;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.ToTalMoney, 3) + "";
            this.ownGold = game.LaohuUtils.ToTalMoney;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold, 3) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("snyx_bgm_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "snyx_spin_1_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.LaohuUtils.freeWin >= game.LaohuUtils.oneMax) {
                game.LaohuUtils.auto_times = 0;
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.startBtn.source = "snyx_spin_1_png";
                this.timesLabel.text = "";
                this.runningType = RUNNING_TYPE.EMPTY;
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            //判断是否为免费游戏并且是否有满足总赢取条件
            if (game.LaohuUtils.totalWin && game.LaohuUtils.isAutoGame) {
                //自动游戏总赢取条件满足
                if (game.LaohuUtils.totoalWinGold >= game.LaohuUtils.totalWin) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "snyx_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    this.resetStartBtn();
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    return;
                }
            }
            //判断是否为免费游戏并且是否有满足总下注条件
            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "snyx_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                    this.resetStartBtn();
                    var colorMatrix = [
                        1, 0, 0, 0, 0,
                        0, 1, 0, 0, 0,
                        0, 0, 1, 0, 0,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    this.startBtn.filters = [colorFlilter];
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                this.setOtherBtn();
                this.isFreeBack = true;
                egret.setTimeout(() => { this.startBtnTouch(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
                var colorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.startBtn.filters = [colorFlilter];
            }

        }

        /**
         * 开始自动游戏
         */
        public startAutoGame() {
            //余额判断
            if (game.LaohuUtils.bet * 0.5 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "snyx_spin_1_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("snyx_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "snyx_spin_2_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            //无穷次数情况
            if (game.LaohuUtils.auto_times > 1000) {
                this.timesLabel.text = "s";
            } else {
                this.timesLabel.text = game.LaohuUtils.auto_times + "";
            } if (!this.isFreeBack) {
                game.LaohuUtils.totoalWinGold = 0;
                game.LaohuUtils.totalBet = 0;
            }
            this.startBtnTouch();
        }


        /**
         * 玩家加注
         */
        public addbetTouch() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[6];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[7];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[8];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[9];
                        break;
                }
            }
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * 0.5)) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
            if ((game.LaohuUtils.bet * 0.5) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
        }


        /**
         * 玩家减注
         */
        public subBetTouch() {
            //倍数判断
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 1) {
                return;
            } else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[6];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[7];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[8];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.LaohuUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * 0.5)) + "";
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
        }


        /**
         * 设置最大倍数
         */
        public setMaxBet() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            let bet = game.LaohuUtils.bets[9]
            let data1 = Number(new Big(bet).mul(0.5));
            //金币是否满足条件
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.LaohuUtils.bet = game.LaohuUtils.bets[9];
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.bet = 10;
            this.beishu.text = game.LaohuUtils.bet + "";
            this.utilsBet = game.LaohuUtils.bet;
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }

        public roleAniMale: DBComponent;
        public roleAniFemale: DBComponent;
        public roleAniGroup: eui.Group;
        /**
         * 老鼠角色动画
         * @param  {string} dbname3
         * @param  {number} loop
         * @param  {} callback
         */
        public roleAniFuc(dbname: string, loop: number, isMale: boolean, callback?) {
            if (isMale) {
                game.UIUtils.removeSelf(this.roleAniMale);
                this.roleAniMale = DBComponent.create(dbname, dbname);
                this.roleAniMale.play("", loop); this.roleAniGroup.addChild(this.roleAniMale);
                this.roleAniMale.horizontalCenter = 500; this.roleAniMale.bottom = 90;
                this.roleAniMale.resetPosition();
            } else {
                game.UIUtils.removeSelf(this.roleAniFemale);
                this.roleAniFemale = DBComponent.create(dbname, dbname);
                this.roleAniFemale.play("", loop); this.roleAniGroup.addChild(this.roleAniFemale);
                this.roleAniFemale.horizontalCenter = -500; this.roleAniFemale.bottom = 90;
                this.roleAniFemale.resetPosition();
            }

            if (loop == 1) {
                this.roleAniFemale.callback = () => {
                    callback && callback();
                }
                this.roleAniMale.callback = () => {
                    callback && callback();
                }
            }
        }
    }
}