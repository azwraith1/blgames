// TypeScript file
module xcbs {
    export class XCBSScene1 extends game.BaseSlotScene {
        public scroller: XCBSScroller;
        public startBtn: eui.Image;
        public getFreeGroup: eui.Group;
        public freeTimesLabel: eui.Image;
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
        public buttonEffect = "xcbs_button_mp3";
        public scrollerFastEffect = "xcbs_reel_fast_spin_mp3";
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.LaohuUtils.ToTalMoney;
        public utilsBet = game.LaohuUtils.bet;
        public fixpositionY = [40, 40, 20, 20];
        public fastSpeedTime = 3000;
        public isSetHui = false;
        public baiseIma: eui.Image;
        public sceneId = 1016;
        public quitBtn: eui.Button;
        public gameId = "xcbs";
        public yudiAtrHui;
        public yudiAtrHui2;

        public playerGold: eui.Label;
        public maskRect: eui.Rect;
        public effectGroup: eui.Group;
        public spinGroup: eui.Group;
        public bet: number = 1;
        public totalBet: eui.Label;
        public beishu: eui.Label;
        public timesLabel: eui.BitmapLabel;
        public winNum: eui.Label;
        public free_times: eui.Image;
        public HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];

        public bgDB: DBComponent;//背景动画
        public bgDb2: DBComponent;
        public changeAni: DBComponent;
        public logoAni: DBComponent;
        private spinDefaultAni: DBComponent;//spin默认动画
        private spinStartAni: DBComponent;//spin点击特效
        private spinRunningAni: DBComponent;//spin旋转特效
        private spinStopAni: DBComponent;//spin停止特效
        public smashbg: DBComponent;

        public smashingAni: DBComponent;

        public constructor() {
            super();
            this.skinName = "XCBSScene1Skin";
        }

        public createChildren() {
            super.createChildren();
            SoundManager.getInstance().playMusic("xcbs_background_mus_mp3");

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
        }

        public smashKuangAni: DBComponent;
        private initAni() {
            this.bgDB = DBComponent.create("xcbs_bg01", "xcbs_bg01");
            this.smashingAni = DBComponent.create("xcbs_icon_1_long", "xcbs_icon_1_long");
            this.smashbg = DBComponent.create("xcbs_bg_wild_tex", "xcbs_bg_wild");
            this.smashKuangAni = DBComponent.create("xcbs_wild_1", "xcbs_wild_1");

            this.bgDB.play("", 0);
            this.bgDB.horizontalCenter = 20;
            this.bgDB.bottom = -860;
            this.bgDB.touchEnabled = false;
            this.resizeGroup.addChild(this.bgDB);
            this.bgDB.resetPosition();
            this.effectGroup.addChild(this.quitBtn);

            this.bgDb2 = DBComponent.create("xcbs_bg01", "xcbs_bg01");
            this.bgDb2.play("", 0);
            this.bgDb2.horizontalCenter = -20;
            this.bgDb2.bottom = -870;
            this.bgDb2.touchEnabled = false;
            this.effectGroup.addChild(this.bgDb2);
            this.bgDb2.resetPosition();
            this.resizeGroup.addChild(this.quitBtn);
            this.bgDB.touchEnabled = this.bgDb2.touchEnabled = false;
            this.spinDefaultAni = new DBComponent("xcbs_spin01");
            this.spinRunningAni = new DBComponent("xcbs_spin03");
            this.spinStartAni = new DBComponent("xcbs_spin02");
            this.spinStopAni = new DBComponent("xcbs_spin04");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = 2; this.spinDefaultAni.bottom = 56;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.logoAni = new DBComponent("xcbs_logo");
            this.logoAni.play("", 0);
            this.logoAni.bottom = 645;
            this.logoAni.touchEnabled = false;
            this.logoAni.horizontalCenter = 0;
            this.resizeGroup.addChild(this.logoAni);
            this.logoAni.resetPosition();
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ServerNotify.s_playerBigWin, this.bigwin2, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.XCBS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            this.removeEvent();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.XCBS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
            egret.clearTimeout(this.messageTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            egret.clearTimeout(this.sethuiTimeout);
            egret.clearTimeout(this.removeLineTimeOUt);
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
         * @param  {egret.Event} e
         */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.LaohuUtils.bets = [];
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.LaohuUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (let j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.LaohuUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
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
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            game.LaohuUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.bet = game.LaohuUtils.bets[0];
            game.LaohuUtils.mul = game.LaohuUtils.muls[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.LaohuUtils.bet = players.lastBet;
                game.LaohuUtils.mul = players.lastMul;
                this.setOtherBtn();
                this.startBtn.touchEnabled = false;
                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
            }
            //重连后倍数判断
            switch (game.LaohuUtils.mul) {
                case 1:
                    this.bet = 1;
                    break;
                case 2:
                    this.bet = 2;
                    break;
                case 3:
                    this.bet = 3;
                    break;
                case 4:
                    this.bet = 4;
                    break;
                case 5:
                    this.bet = 5;
                    break;
                case 5:
                    this.bet = 6;
                    break;
                case 6:
                    this.bet = 7;
                    break;
                case 7:
                    this.bet = 8;
                    break;
                case 8:
                    this.bet = 9;
                    break;
                case 10:
                    this.bet = 10;
                    break;
            }
            this.utilsBet = game.LaohuUtils.bet;
            let data = Number(new Big(game.LaohuUtils.bet).mul(2));
            let data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.beishu.text = parseInt(data1 * 2 + "") + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        }

        public bigwin2(e: egret.Event) {
            let resp = e.data;
        }


        public isFreeBack: boolean = false;
        public isTest: boolean = false;

        /**
         * spin旋转
         */
        public startBtnTouch() {
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.LaohuUtils.bet * game.LaohuUtils.mul * 50 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "xcbs_spin_2_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
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
                        this.startBtn.source = "xcbs_spin_2_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "xcbs_spin_2_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                            this.resetStartBtn();
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
                            this.startBtn.source = "xcbs_spin_2_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.LaohuUtils.bet * game.LaohuUtils.mul * 50
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
                    this.startBtn.source = "xcbs_spin_2_png";
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
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("xcbs_reelstart_mp3");
                SoundManager.getInstance().playEffect("xcbs_reel_mp3");
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
                this.startBtn.source = "xcbs_spin_2_png";
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
                if (this.scatter != 1 && this.winGold == 0) this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "xcbs_spin_2_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 0; this.spinStopAni.bottom = 56;
                this.spinGroup.addChild(this.spinStopAni);
                this.spinStopAni.resetPosition();

                this.spinStopAni.callback = () => {
                    game.UIUtils.removeSelf(this.spinStopAni);
                }
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
                if (this.smashingReelIndex) {
                    this.smashingReelIndex = 0;
                }
            }
            //其他情况下，正常处理快速停止
            else {
                this.startBtn.source = "xcbs_spin_2_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
            SoundManager.getInstance().stopEffectByName("xcbs_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
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
                SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
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
                // for (let i = 1; i <= 5; i++) {
                //     this.scroller[`item${i}`].resetSpecilHui();
                // }
                this.clearLineImaPool();
            }
            this.smashingReelIndex = 0;
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            game.UIUtils.removeSelf(this.smashbg);
            game.UIUtils.removeSelf(this.smashingAni);
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
            this.spinRunningAni.bottom = 56; this.spinRunningAni.horizontalCenter = 2;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0; this.spinStartAni.bottom = 56;
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
        public lineImaArr: Array<number> = [];

        /**
        * 发送c_bet请求
        */
        private async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.bonusAtr = [];
            this.scatterIcon = 0;
            this.eachLineScore = [];
            this.lineImaArr = [];
            this.yudiAtr = [];
            this.allAtr = [];
            this.scatter = 0;
            let data2: any;
            this.allLine = [];
            this.eachLineIconIndex = [];
            this.fastItemIndex = 0;
            this.lineTime = 1500;
            this.addwin = 0;
            //测试专用消息
            if (this.isTest) {

                if (this.spinTest == 1) {
                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.LaohuUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                data2 = { "spinType": 0, "bet": game.LaohuUtils.bet, "multiple": game.LaohuUtils.mul, "lineCount": 0, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_XCBS);
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                return;
            }
            let data = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.ownGold -= NumberFormat.handleFloatDecimal(data);
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            let showAtr2 = this.respShowAtr(resp2.spinRes[0]);
            this.c_betResp(resp2);
            this.showAtr = this.respShowAtr(resp2.spinRes[resp2.spinRes.length - 1]);
            this.winGold = resp2.winCount;
            this.ownGold = resp2.own_gold;
            this.lineTime = (resp2.spinRes.length - 1) * 3300 + 1500;
            if (resp2.isSmashing == 1) {
                this.lineTime = 5300;
                SoundManager.getInstance().pauseMusic();
                SoundManager.getInstance().playEffect("xcbs_wildfengbao_mp3");
                this.showSmashingAni();
                this.smashingReelIndex = resp2.smashingReelIndex + 1;
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
            game.LaohuUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            this.scatter = resp2.sactter;
            let flag: boolean = false;
            //是否为scatter
            if (resp2.sactter == 1) {
                game.LaohuUtils.isScatter = true;
                let scatternum = 0;
                this.yudiAtr = [];
                this.yudiAtr2 = [];
                for (let i = 0; i <= 4; i++) {
                    for (let j = 0; j < showAtr2[i].length; j++) {
                        if (showAtr2[i][j] == 2) {
                            this.yudiAtr.push(j);
                            this.yudiAtr2.push(i + 1);
                        }
                    }
                }
                game.LaohuUtils.freeTimes = resp2.freeTimes;
            }
            this.yudiAtrHui = [];
            this.yudiAtrHui2 = [];
            for (let i = 0; i <= 4; i++) {
                for (let j = 0; j < showAtr2[i].length; j++) {
                    if (showAtr2[i][j] == 2) {
                        this.yudiAtrHui.push(j);
                        this.yudiAtrHui2.push(i + 1);
                    }
                }
            }

            //免费游戏情况下累加赢取金额
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.totoalWinGold += this.winGold;
            }
            this.isStopAni = false;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < this.showAtr[i].length; j++) {
                    //判断前三列几个玉帝
                    if (this.showAtr[i][j] == 2) {
                        this.scatterIcon++;
                        if (this.scatterIcon == 2) {
                            this.fastItemIndex = i + 2;
                        }
                    } else {
                        this.startBtn.touchEnabled = true;
                        this.scroller.touchEnabled = true;
                    }
                }
            }
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
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            let index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    game.UIUtils.removeSelf(this.smashbg);
                    game.UIUtils.removeSelf(this.smashKuangAni);
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "xcbs_spin_2_png";
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

                                    SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                                    this.scroller.addFoGuang1(5, i, "xcbs_icon_2_guang");
                                } else {
                                    SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                                }
                            }
                        }
                        // this.scroller.removeIconHui(this.HuiAtr);
                        // this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            // this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.startBtn.touchEnabled = false;
                                // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                                this.scroller.sort1();
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
                            if (this.scatter != 1 && this.winGold == 0) { this.resetOtherBtn(); }
                            this.resetStartBtn();
                            egret.setTimeout(() => {
                                LogUtils.logD("empty5");
                                if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        // this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.scroller.sort1();
                        if (this.winGold > 0) { this.startBtn.touchEnabled = false };
                        this.checkBonusIcon();
                    }
                    break;
                case 4:
                    for (let i = 0; i < this.showAtr[3].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[3][i] == 2) {

                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(4, i, "xcbs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 5 && !this.isFastGame) this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    break;
                case 3:
                    for (let i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(3, i, "xcbs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            let atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            // this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd) return;
                            if (this.fastItemIndex == 4 && !this.isFastGame) this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                        }
                    }

                    break;
                case 2:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[1][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(2, i, "xcbs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3 && !this.isFastGame) this.scrollerFast(this.fastItemIndex, game.LaohuUtils.showAtrs[0]);
                    break;
                case 1:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("xcbs_appear1_mp3");
                            this.scroller.addFoGuang1(1, i, "xcbs_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("xcbs_reelstop_mp3");
                        }
                    }
                    break;
            }
        }
        public freeLeftGroup: eui.Group;
        private bigWinPanel: XCBSBigwinGroup;

        /**
       * 播放总连线
       */
        public checkBonusIcon() {
            if (game.LaohuUtils.winGolds[0] > 0) {
                this.eachLine();
            } else {
                if (this.scatter == 1) {
                    this.showBigwin();
                } else {
                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                        this.askAutoGame();
                    }
                }
            }

        }

        public addwin: number;
        /**
         * 消除/smashing 
         */
        public eachLine() {
            SoundManager.getInstance().playEffect("xcbs_win_mp3");
            this.addwin = 0;
            if (!this.smashingReelIndex) {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.startBtn.filters = [colorFlilter];
                let count: number = 0;
                async.eachSeries(game.LaohuUtils.allAtrs, (item, callback) => {
                    for (let i = 0; i < item.length; i++) {
                        for (let j = 0; j < item[i].length; j++) {
                            this.scroller[`item${i + 1}`].showAni(game.LaohuUtils.allAtrs[count][i][j]);
                        }
                    }
                    if (game.LaohuUtils.winGolds[count] > 0) {
                        this.commondi.visible = this.commomScore.visible = true;
                        let data = Number(new Big(game.LaohuUtils.winGolds[count]).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data) + ""
                    } else {
                        this.commomScore.text = "";
                        this.commondi.visible = this.commomScore.visible = false;
                    }
                    if (count < game.LaohuUtils.showAtrs.length - 1) {
                        egret.setTimeout(() => {
                            SoundManager.getInstance().playEffect("xcbs_clear_mp3");
                        }, this, 2700);
                    }
                    this.addwin += game.LaohuUtils.winGolds[count];
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.addwin) + "";
                    if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
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
                    if (this.scatter == 0) {
                        if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            egret.setTimeout(this.showBigwin, this, 1000);
                        } else {
                            this.commomScore.text = "";
                            this.commondi.visible = this.commomScore.visible = false;
                            this.scroller.setIconHui();
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                            egret.setTimeout(() => {
                                if (!game.LaohuUtils.isAutoGame) this.resetOtherBtn();
                                var colorMatrix = [
                                    1, 0, 0, 0, 0,
                                    0, 1, 0, 0, 0,
                                    0, 0, 1, 0, 0,
                                    0, 0, 0, 1, 0
                                ];
                                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                                this.startBtn.filters = [colorFlilter];
                                this.startBtn.touchEnabled = true;
                            }, this, 1000);
                            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                this.askAutoGame();
                            }
                        }
                        count = 0;
                    } else if (this.scatter == 1) {
                        if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                            this.showBigwin();
                        } else {
                            SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            this.commondi.visible = this.commomScore.visible = true;
                            let data = (this.winGold - this.addwin) * 100;
                            this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                            for (let i = 0; i < this.yudiAtr2.length; i++) {
                                this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "xcbs_icon_2");
                            }
                            egret.setTimeout(() => {
                                this.commondi.visible = this.commomScore.visible = false;
                                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            }, this, 4000);
                        }
                        count = 0;
                    }
                })
            }
            else if (this.smashingReelIndex) {
                SoundManager.getInstance().stopEffectByName("xcbs_wildfengbao_mp3");
                SoundManager.getInstance().remuseMusic();
                if (this.winGold >= (game.LaohuUtils.bet * game.LaohuUtils.mul * 50) * 15) {
                    egret.setTimeout(this.showBigwin, this, 1000);
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                } else {
                    if (!game.LaohuUtils.isAutoGame) this.resetOtherBtn();
                    this.startBtn.touchEnabled = true;
                    this.commondi.visible = this.commomScore.visible = true;
                    let data = Number(new Big(this.winGold).mul(100))
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                    this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                    this.showIconTimeOut = egret.setTimeout(() => {
                        this.commondi.visible = this.commomScore.visible = false;
                        this.commomScore.text = "";
                    }, this, 1500);
                    if (this.scatter == 1) {
                        this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 1);
                        SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                        this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                        this.commondi.visible = this.commomScore.visible = true;
                        let data = (this.winGold - this.addwin) * 100;
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "xcbs_icon_2");
                        }
                        egret.setTimeout(() => {
                            this.commondi.visible = this.commomScore.visible = false;
                            CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                        }, this, 4000);
                    } else {
                        var colorMatrix = [
                            1, 0, 0, 0, 0,
                            0, 1, 0, 0, 0,
                            0, 0, 1, 0, 0,
                            0, 0, 0, 1, 0
                        ];
                        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                        this.startBtn.filters = [colorFlilter];
                        this.scroller.smashingDBani(game.LaohuUtils.allAtrs[0], 0);
                    }
                }

            }
        }
        /**
         * bigwin
         */
        public showBigwin() {
            //非空判断
            if (this.winGold > 0) {
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
                        //自动游戏bigwin后开始下一把
                        if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                            this.autoGameTimeout = egret.setTimeout(() => {
                                this.startBtnTouch();
                            }, this, 1500);
                        }
                        if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            this.scroller.setIconHui();
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
                        if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                        if (this.scatter == 1) {
                            egret.clearTimeout(this.eachLineTimeOut);
                            this.commondi.visible = this.commomScore.visible = true;
                            let data = (this.winGold - this.addwin) * 100;
                            this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                            for (let i = 0; i < this.yudiAtr2.length; i++) {
                                this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "xcbs_icon_2");
                            }
                            egret.setTimeout(() => {
                                this.commondi.visible = this.commomScore.visible = false;
                                CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            }, this, 4000);
                        } else {
                            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                        }
                        game.UIUtils.removeSelf(this.bigWinPanel);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
                    this.commomScore.visible = this.commondi.visible = false;
                    this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                    //自动游戏bigwin后开始下一把
                    if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                        this.autoGameTimeout = egret.setTimeout(() => {
                            this.startBtnTouch();
                        }, this, 1500);
                    }
                    if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                        if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            this.scroller.setIconHui();
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
                    if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                    if (this.scatter == 1) {
                        egret.clearTimeout(this.eachLineTimeOut);
                        this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                        SoundManager.getInstance().playEffect("xcbs_scat_mp3");
                        this.commondi.visible = this.commomScore.visible = true;
                        let data = (this.winGold - this.addwin) * 100;
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "xcbs_icon_2");
                        }
                        egret.setTimeout(() => {
                            this.commondi.visible = this.commomScore.visible = false;
                            CF.dP(ENo.XCBS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                        }, this, 4000);
                    } else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                    }
                    game.UIUtils.removeSelf(this.bigWinPanel);
                })
                this.resizeGroup.addChild(this.bigWinPanel);
            }
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
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.LaohuUtils.ToTalMoney) + "";
            this.ownGold = game.LaohuUtils.ToTalMoney;
            this.utilsTotalMoney = game.LaohuUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.LaohuUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("xcbs_background_mus_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "xcbs_spin_2_png";
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
                this.startBtn.source = "xcbs_spin_2_png";
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
                    this.startBtn.source = "xcbs_spin_2_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //判断是否为免费游戏并且是否有满足总下注条件
            if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                    game.LaohuUtils.isAutoGame = false;
                    game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                    this.resetOtherBtn();
                    this.startBtn.source = "xcbs_spin_2_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                this.setOtherBtn();
                game.UIUtils.removeSelf(this.spinDefaultAni);
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
            if (game.LaohuUtils.bet * game.LaohuUtils.mul * 50 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "xcbs_spin_2_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("xcbs_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "xcbs_spin_1_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            this.smashingReelIndex = 0;
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
                        game.LaohuUtils.mul = game.LaohuUtils.muls[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[3];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[6];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                }
            }
            let data1 = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.LaohuUtils.bet * game.LaohuUtils.mul * 50) > this.ownGold) {
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
                        game.LaohuUtils.mul = game.LaohuUtils.muls[0];
                        break;
                    case 2:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[1];
                        break;
                    case 3:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[3];
                        break;
                    case 4:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[0];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 5:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[1];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 6:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[2];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 7:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[5];
                        break;
                    case 8:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[3];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                    case 9:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[6];
                        break;
                    case 10:
                        game.LaohuUtils.bet = game.LaohuUtils.bets[4];
                        game.LaohuUtils.mul = game.LaohuUtils.muls[9];
                        break;
                }
            }
            let data = Number(new Big(game.LaohuUtils.bet * game.LaohuUtils.mul).mul(50));
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.LaohuUtils.bet * game.LaohuUtils.mul * 50)) + "";
            // this[`betTtipsGroup`].visible = true;
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }


        /**
         * 设置最大倍数
         */
        public setMaxBet() {
            SoundManager.getInstance().playEffect(this.buttonEffect);

            let bet = game.LaohuUtils.bets[4]; let mul = game.LaohuUtils.muls[9];
            let data1 = Number(new Big(bet * mul).mul(50));
            //金币是否满足条件
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.LaohuUtils.bet = game.LaohuUtils.bets[4];
            game.LaohuUtils.mul = game.LaohuUtils.muls[9];
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(data1) + "";
            this.bet = 10;
            this.beishu.text = parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 + "") + "";
            this.utilsBet = game.LaohuUtils.bet;
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }
        /**
         * wild风暴特效
         */
        protected showSmashingAni() {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.smashbg.play("", 0);
            this.smashbg.horizontalCenter = 0;
            this.smashbg.bottom = -80;
            this.smashKuangAni.horizontalCenter = 0; this.smashKuangAni.bottom = 60;
            this.smashKuangAni.play("", 0);
            this.gameGroup.addChild(this.smashKuangAni);
            this.resizeGroup.addChild(this.smashbg);
            this.smashbg.resetPosition();
            this.smashKuangAni.resetPosition();
            this.smashingAni = DBComponent.create("xcbs_icon_1_long", "xcbs_icon_1_long");
            egret.setTimeout(() => {
                this.smashingAni.play("xcbs_icon_1_roll", 1);
                this.gameGroup.addChild(this.smashingAni);
                this.gameGroup.addChild(this.commondi);
                this.gameGroup.addChild(this.commomScore);
                this.smashingAni.resetPosition();
                this.smashingAni.bottom = 90;
                this.smashingAni.touchEnabled = false;
                this.smashingAni.horizontalCenter = (this.smashingReelIndex - 3) * 193
                this.smashingAni.callback = () => {
                    this.smashingAni.play("xcbs_icon_1_stop", 0);
                }
            }, this, 3000);
        }

    }
}