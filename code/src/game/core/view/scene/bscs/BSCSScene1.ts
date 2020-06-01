// TypeScript file
module bscs {
    export class BSCSScene1 extends game.BaseSlotScene {
        public scroller: BSCSScroller;
        public startBtn: eui.Image;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_BSCS;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_BSCS_AUTO_PANEL;
        public TIPS_NOTIFY: string = PanelNotify.OPEN_BSCS_TIPS_PANEL;
        public RECORD_NOTIFY: string = PanelNotify.OPEN_DNTG_RECORD_PANEL;
        public SETING_NOTIFY: string = PanelNotify.OPEN_SETTING;
        public QUIT_NOTIFY: string = PanelNotify.OPEN_LEAVE_LAOHU_PANEL;
        public playerGold: eui.Label;
        public maskRect: eui.Rect;
        public effectGroup1: eui.Group;
        public spinGroup: eui.Group;
        public bet: number = 1;
        public totalBet: eui.Label;
        public beishu: eui.Label;
        public timesLabel: eui.BitmapLabel;
        public winNum: eui.Label;
        public free_times: eui.Image;
        public freeTimeGroup: eui.Group;
        public HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
        public yudiAtrHui;
        public yudiAtrHui2;
        public sceneId = 1009;

        public bgDB: DBComponent;//背景动画
        private spinDefaultAni: DBComponent;//spin默认动画
        private spinStartAni: DBComponent;//spin点击特效
        private spinRunningAni: DBComponent;//spin旋转特效
        private spinStopAni: DBComponent;//spin停止特效
        public lineSmall = "ayls_line1";
        public lineMid = "ayls_line2";
        public lineBig = "ayls_line3";
        public lineHuge = "ayls_line4";
        public buttonEffect = "bscs_startreel_mp3";
        public scrollerFastEffect = "bscs_reel_fast_spin_mp3";
        public lineAniXArray = [-345, -172, 0, 171, 340];
        public lineAniYArray = [347, 204, 60];
        public lineAniRotation = [-59.15, 59.15, -39.92, 39.92];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.BSCSUtils.ToTalMoney;
        public utilsBet = game.BSCSUtils.bet;
        public fixpositionY = [];
        public fastSpeedTime = 4500;
        public isSetHui = true;
        public gameId = "bscs";

        public constructor() {
            super();
            this.skinName = "BSCSScene1Skin";
        }
        public createChildren() {
            super.createChildren();
            SoundManager.getInstance().playMusic("bscs_background_mus_mp3");
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this[`quitBtn`].visible = false;
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.setOtherBtn();
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            this.startGame();
            this.initAni();
            this.scroller.showFirst(1);
        }


        private initAni() {
            this.bgDB = new DBComponent("bscq_bg01");
            this.bgDB.play("", 0);
            this.bgDB.horizontalCenter = 0;
            this.bgDB.bottom = 135;
            this.bgDB.touchEnabled = false;
            this.resizeGroup.addChild(this.bgDB);
            this.bgDB.resetPosition();
            this.resizeGroup.addChild(this.quitBtn);
            this.spinDefaultAni = new DBComponent("bscq_spin01");
            this.spinRunningAni = new DBComponent("bscq_spin03");
            this.spinStartAni = new DBComponent("bscq_spin02");
            this.spinStopAni = new DBComponent("bscq_spin04");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinDefaultAni.horizontalCenter = -3; this.spinDefaultAni.bottom = 54;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();

            // this.spinStopAni.horizontalCenter = 0; this.spinStopAni.bottom = 88;
            // this.spinGroup.addChild(this.spinStopAni);
            // this.spinStopAni.resetPosition();
        }


        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.BSCS_ENTER_COMMOM_GAME, this.free2Commom, this);
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
            CF.rE(ENo.BSCS_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
        }


        /**
         * @param  {egret.Event} e
         */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.BSCSUtils.bets = [];
            let playerIdnex = resp.playerInfo.playerIndex;
            let players: any = {};
            for (let key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.BSCSUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.BSCSUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.BSCSUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.BSCSUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.BSCSUtils.FreeTimeMul = game.BSCSUtils.FreeTimeMul[game.BSCSUtils.FreeTimeMulIndex];
                game.LaohuUtils.freeTimes = players.freeTimes;
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

            this.ownGold = players.gold;
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            game.BSCSUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            game.BSCSUtils.bet = game.BSCSUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.BSCSUtils.bet = players.lastBet;
                CF.dP(ENo.BSCS_START_FREE_GAME_SCENE);
            }
            //重连后倍数判断
            switch (game.BSCSUtils.bet) {
                case 0.25:
                    this.bet = 1;
                    break;
                case 0.5:
                    this.bet = 2;
                    break;
                case 0.75:
                    this.bet = 3;
                    break;
                case 1:
                    this.bet = 4;
                    break;
                case 5:
                    this.bet = 5;
                    break;
                case 10:
                    this.bet = 6;
                    break;
                case 20:
                    this.bet = 7;
                    break;
                case 25:
                    this.bet = 8;
                    break;
                case 50:
                    this.bet = 9;
                    break;
                case 100:
                    this.bet = 10;
                    break;
            }
            this.utilsBet = game.BSCSUtils.bet;
            let data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.BSCSUtils.bet + "";
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + ""); "";
        }
        public isFreeBack: boolean = false;
        public isTest: boolean = false;

        /**
         * spin旋转
         */
        public startBtnTouch() {
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.BSCSUtils.bet * 2 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "bscq_spin_1_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                        this.startBtn.source = "bscq_spin_1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "bscq_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                            this.startBtn.source = "bscq_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.BSCSUtils.bet * 2
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
                    this.startBtn.source = "bscq_spin_1_png";
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
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("bscs_reel_mp3", true);
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
                this.removeScatterAni();
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "bscq_spin_1_png";
                this.scroller.runResultFast();
                for (let i = 1; i <= 4; i++) {
                    this.scroller[`item${i}`].resetSpecilHui();
                }

            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);

                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                if (this.scatter != 1) this.resetOtherBtn();
                this.resetStartBtn();
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "bscq_spin_1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
                this.spinStopAni.horizontalCenter = 0; this.spinStopAni.bottom = 88;
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
                this.startBtn.source = "bscq_spin_1_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            SoundManager.getInstance().stopEffectByName("bscs_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                    this.removeScatterAni();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;
                    for (let i = 1; i <= 4; i++) {
                        this.scroller[`item${i}`].resetSpecilHui();
                    }

                }
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("bscs_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
            }
        }

        /**
         * 上次游戏效果移除
         */
        public removeLastAni() {
            if (this.winGold > 0) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                egret.clearTimeout(this.sethuiTimeout);
                for (let i = 1; i <= 5; i++) {
                    this.scroller[`item${i}`].resetSpecilHui();
                }
                this.clearLineImaPool();
            }

            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
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
            this.spinRunningAni.bottom = 54; this.spinRunningAni.horizontalCenter = -3;
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
            this.spinStartAni.horizontalCenter = 0; this.spinStartAni.bottom = 88;
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
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel(); //中奖展示金额数字
        private removeScoreTimeout: any; //提前移除金额数字timeout
        private isStopAni: boolean = false;//播放stop动画flag
        private fastItemIndex: number = 0;
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        public yudiAtr2: Array<number>;
        public lineTime: number = 2000;
        private ownGold: number = 0//玩家当前金钱
        private gameGroup: eui.Group;
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
            this.allAtr = [[], [], [], [], []];
            this.scatter = 0;
            let data2: any;
            this.allLine = [];
            this.eachLineIconIndex = [];
            this.fastItemIndex = 0;
            this.lineTime = 2800;
            //测试专用消息
            if (this.isTest) {
                if (this.spinTest == 1) {
                    data2 = { "spinType": this.spinTest, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                data2 = { "spinType": 0, "bet": game.BSCSUtils.bet, "lineCount": 20, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_BSCS);
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                return;
            }
            this.ownGold -= game.BSCSUtils.bet * 2;
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
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
            this.messageTimeOut = egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 300);
            this.runningType = RUNNING_TYPE.RESULT;
            this.winGold = resp2.winCount;
            this.ownGold = resp2.own_gold;
            game.BSCSUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
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
                            this.eachLineScore.push(temp2);
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
            if (this.winGold > 0) {
                this.lineTime = 2800;
            } else {
                this.lineTime = 1000;
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
                game.LaohuUtils.freeTimes = resp2.freeTimes;
            }
            this.yudiAtrHui = [];
            this.yudiAtrHui2 = [];
            for (let i = 0; i <= 4; i++) {
                for (let j = 0; j < this.showAtr[i].length; j++) {
                    if (this.showAtr[i][j] == 2) {
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
                                this.startBtn.source = "bscq_spin_1_png";
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
                        this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this.quitBtn.touchEnabled = false;
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(() => {
                                LogUtils.logD("empty4");
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
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) this.resetOtherBtn();
                            this.resetStartBtn();
                            egret.setTimeout(() => {
                                LogUtils.logD("empty5");
                                if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.checkBonusIcon();
                    }
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
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 5&&!this.isFastGame) this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd) return;
                            if (this.fastItemIndex == 4&&!this.isFastGame) this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3&&!this.isFastGame) this.scrollerItemFast(this.fastItemIndex, this.showAtr);
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

        private bigWinPanel: BSCSBigwinGroup;

        /**
       * 播放总连线
       */
        public checkBonusIcon() {
            //满足bigwin
            if (this.winGold >= (game.BSCSUtils.bet * 2) * 15) {
                egret.clearTimeout(this.autoGameTimeout);
                //非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
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
                            if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                                this.autoGameTimeout = egret.setTimeout(() => {
                                    this.startBtnTouch();
                                }, this, this.lineTime);
                            }
                            //未中scatter，播放一次总连线                            
                            if (this.scatter != 1) {
                                this.scroller.setIconHui();
                                this.scroller.removeIconHui(this.allAtr);
                                this.scroller.addBonusAni(this.allAtr, this.winGold);
                                if (this.lineImaArr) {
                                    for (let i = 0; i < this.lineImaArr.length; i++) {
                                        this.lineUseImag(this.lineImaArr[i]);
                                    }
                                }
                                if (!game.LaohuUtils.isAutoGame) {
                                    egret.clearTimeout(this.eachLineTimeOut);
                                    this.eachLineTimeOut = egret.setTimeout(() => {
                                        this.addEachLineAni();
                                    }, this, this.lineTime);
                                }
                                if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                            }
                            if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) this.memuBtn.touchEnabled = this.maxBet.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this[`quitBtn`].touchEnabled = true;
                            if (this.scatter == 1) { egret.clearTimeout(this.eachLineTimeOut); this.addEachLineAni(); }
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
                        game.UIUtils.removeSelf(this.commomScore);
                        //自动游戏bigwin后开始下一把
                        if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                            this.autoGameTimeout = egret.setTimeout(() => {
                                this.startBtnTouch();
                            }, this, this.lineTime);
                        }
                        if (this.scatter != 1) {
                            this.startBtn.touchEnabled = true; this.scroller.stopIconDb();
                            this.scroller.addBonusAni(this.allAtr, this.winGold);
                            if (this.lineImaArr) {
                                for (let i = 0; i < this.lineImaArr.length; i++) {
                                    this.lineUseImag(this.lineImaArr[i]);
                                }
                            }
                            if (!game.LaohuUtils.isAutoGame) {
                                egret.clearTimeout(this.eachLineTimeOut);
                                this.eachLineTimeOut = egret.setTimeout(() => {
                                    if (!game.LaohuUtils.isAutoGame) this.addEachLineAni();
                                }, this, this.lineTime)
                            }
                            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                        }
                        if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            this.memuBtn.touchEnabled = this.maxBet.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this[`quitBtn`].touchEnabled = true;
                        }
                        if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                        if (this.scatter == 1) { egret.clearTimeout(this.eachLineTimeOut); this.addEachLineAni(); }
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            //未中bigwin 
            //中奖
            else {
                //展示图标非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    SoundManager.getInstance().playEffect("bscs_win_mp3");
                    if (this.scatter == 1) this.runningType = RUNNING_TYPE.STOP;
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
                    this.removeScoreTimeout = egret.setTimeout(() => {
                        game.UIUtils.removeSelf(this.commomScore);
                        this.scroller.stopIconDb();
                        if (!game.LaohuUtils.isAutoGame || this.scatter == 1) {
                            this.addEachLineAni(); if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                                this.askAutoGame();
                            }
                        }
                    }, this, this.lineTime);
                }
                //未中奖 
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        game.BSCSUtils.comm2FreeModel = this.showAtr;
                        SoundManager.getInstance().playMusic("bscs_changeground_mus_mp3");
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "bscs_icon_2");
                        }
                        egret.setTimeout(() => {
                            this.free_times.source = "bscs_enter_free_" + game.LaohuUtils.freeTimes + "_png";
                            this.freeTimeGroup.visible = true;
                            egret.Tween.get(this.freeTimeGroup).to({ alpha: 1 }, 2000);
                        }, this, 2000);
                        egret.setTimeout(() => {
                            this.freeTimeGroup.visible = false;
                            this.freeTimeGroup.alpha = 0;
                            CF.dP(ENo.BSCS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            this[`quitBtn`].visible = false;
                        }, this, 6000);
                    } else {
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
            }
        }
        /**
       * 每条连线动画
       */
        public addEachLineAni() {
            //非空判断
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) { this[`quitBtn`].touchEnabled = false; this.resetStartBtn(); }
                this.scroller.stopIconDb();
                let count = 0;
                let eachLineArray: number;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, (index, callback) => {
                    if (this.isStopAni) return;
                    this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (let j = 0; j < index.length; j++) {
                        let k = j + 1;
                        this.scroller[`item${k}`].resetIconHui(index[j]);
                        this.scroller[`item${k}`].showAni(index[j]);
                        this.commomScore.font = "bscs_wingold_2_fnt";
                        let data = Number(new Big(this.eachLineScore[count]).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        this.commomScore.verticalCenter = ((index[2] - 1)) * 155;
                        this.commomScore.horizontalCenter = 0;
                        this.commomScore.textAlign = "center";
                        // this.gameGroup.addChild(this[`lineImag`]);
                        this.gameGroup.addChild(this.commomScore);
                    }
                    //单一连线
                    if (this.bonusAtr.length == 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray = this.lineImaArr[count];
                        this.lineUseImag(eachLineArray);
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                this.scroller.setIconHui();
                                game.UIUtils.removeSelf(this.commomScore);
                            }, this, 2300)
                        }

                        this.showIconTimeOut = egret.setTimeout(callback, this, 2300);
                    }
                    //多条连线
                    if (this.bonusAtr.length > 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray = this.lineImaArr[count];

                        this.lineUseImag(eachLineArray);
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                this.scroller.setIconHui();
                                this.scroller.stopIconDb();
                                game.UIUtils.removeSelf(this.commomScore);
                            }, this, 2300)
                        }
                        this.showIconTimeOut = egret.setTimeout(callback, this, 2300);
                    }
                    count++;
                }, () => {
                    //callback 判断结果是否为scatter
                    if (this.scatter == 1) {
                        game.UIUtils.removeSelf(this.commomScore);
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playMusic("bscs_changeground_mus_mp3");
                        this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                        this.scroller.removeIconHui(this.HuiAtr);
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "bscs_icon_2");
                        }
                        game.BSCSUtils.comm2FreeModel = this.showAtr;
                        egret.setTimeout(() => {
                            this.free_times.source = "bscs_enter_free_" + game.LaohuUtils.freeTimes + "_png";
                            this.freeTimeGroup.visible = true;
                            egret.Tween.get(this.freeTimeGroup).to({ alpha: 1 }, 2000);
                        }, this, 2000);
                        egret.setTimeout(() => {
                            this.freeTimeGroup.visible = false;
                            this.freeTimeGroup.alpha = 0;
                            CF.dP(ENo.BSCS_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            this.resetOtherBtn();
                        }, this, 6000)
                        if (!game.LaohuUtils.isAutoGame) this.resetStartBtn();
                    }
                    else {
                        count = 0;
                        this.scroller.setIconHui();
                        game.UIUtils.removeSelf(this.commomScore);
                        this.clearAniPool();
                        return this.addEachLineAni();
                    }

                })
            }
        }


        /**
       * 免费游戏结束后到正常游戏
       */
        private free2Commom() {
            this.scatter = 0;
            this.runningType = RUNNING_TYPE.EMPTY;
            game.LaohuUtils.downTime2 = 400;
            game.LaohuUtils.downTime3 = 800;
            game.LaohuUtils.downTime4 = 1200;
            game.LaohuUtils.downTime5 = 1600;
            this.scroller.speed = 48;
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.BSCSUtils.ToTalMoney) + "";
            this.ownGold = game.BSCSUtils.ToTalMoney;
            this.utilsTotalMoney = game.BSCSUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.BSCSUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("bscs_background_mus_mp3");
            this.checkQuitVisible();
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "bscq_spin_1_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.BSCSUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "bscq_spin_1_png";
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
                    this.startBtn.source = "bscq_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
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
                    this.startBtn.source = "bscq_spin_1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.spinDefaultAni);
                this.isFreeBack = true;
                egret.setTimeout(() => { this.startAutoGame(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
            }

        }

        /**
         * 开始自动游戏
         */
        public startAutoGame() {
            //余额判断
            if (game.BSCSUtils.bet * 2 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "bscq_spin_1_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("bscs_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "bscq_spin_2_png";
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
            if (this.bet <= 8) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[0];
                        break;
                    case 2:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[1];

                        break;
                    case 3:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[2];
                        break;
                    case 4:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[3];
                        break;
                    case 5:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[4];
                        break;
                    case 6:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[5];
                        break;
                    case 7:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[6];
                        break;
                    case 8:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[7];
                        break;
                    case 9:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[8];
                        break;
                    case 10:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.BSCSUtils.bet + "";
            this.utilsBet = game.BSCSUtils.bet;
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.BSCSUtils.bet * 2) > this.ownGold) {
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
                        game.BSCSUtils.bet = game.BSCSUtils.bets[0];
                        break;
                    case 2:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[1];
                        break;
                    case 3:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[2];
                        break;
                    case 4:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[3];
                        break;
                    case 5:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[4];
                        break;
                    case 6:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[5];
                        break;
                    case 7:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[6];
                        break;
                    case 8:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[7];
                        break;
                    case 9:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[8];
                        break;
                    case 10:
                        game.BSCSUtils.bet = game.BSCSUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this[`betTtipsGroup`].visible = true;
            this.beishu.text = game.BSCSUtils.bet + "";
            this.utilsBet = game.BSCSUtils.bet;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }


        /**
         * 设置最大倍数
         */
        public setMaxBet() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            let bet = game.BSCSUtils.bets[8];
            //金币是否满足条件
            if (2 * bet > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.BSCSUtils.bet = game.BSCSUtils.bets[8];
            this[`betTtipsGroup`].visible = true;
            this.utilsBet = game.BSCSUtils.bet;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.BSCSUtils.bet * 4000 + ""); "";
            let data = Number(new Big(game.BSCSUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 9;
            this.beishu.text = game.BSCSUtils.bet + "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }
    }
}