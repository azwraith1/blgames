// TypeScript file
module zcjl {
    export class ZCJLGameScene extends game.BaseSlotScene {
        public scroller: ZCJLScroller;
        public startBtn: eui.Image;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ZCJL;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_ZCJL_AUTO_PANEL;
        public TIPS_NOTIFY: string = "";
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
        public yudiAtrHui;
        public yudiAtrHui2;
        public sceneId = 1011;
        public maskGroup: eui.Group;
        public effectGroup: eui.Group;
        public goldFishBonus: eui.BitmapLabel;
        public redFishBonus: eui.BitmapLabel;
        public greenFishBonus: eui.BitmapLabel;
        public chockFishBonus: eui.BitmapLabel;
        public pmdKey = "slot";

        public spinTest: number = 0;//测试模式
        public wheel: Array<Array<number>>;//测试填写的转动模型

        public lineSmall = "";
        public lineMid = "";
        public lineBig = "";
        public lineHuge = "";
        public buttonEffect = "zcjl_button_mp3";
        public scrollerFastEffect = "";
        public lineAniXArray = [];
        public lineAniYArray = [];
        public lineAniRotation = [];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
        public utilsBet = game.ZCJLUtils.bet;
        public fixpositionY = [];
        public fastSpeedTime = 4500;
        public isSetHui = false;
        public gameId = "zcjl";

        public constructor() {
            super();
            this.skinName = new ZCJLGameSceneSkin();
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFirst(1);
            game.LaohuUtils.currentSceneId = 1011;
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
            this.initAni();
            this.startGame();
            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 80;
            this.resizeGroup.addChild(publicMsg);
        }

        public onAdded() {
            super.onAdded();
            SoundManager.getInstance().playMusic("zcjl_background_mus_mp3");
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
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
            egret.clearInterval(this.logoaninterval);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnTouch, this);
            this.maxBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.setMaxBet, this);
            this.addbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addbetTouch, this);
            this.subbet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subBetTouch, this);
            this.maskRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.scrollerFastGame, this);
            game.LaohuUtils.isAutoGame = false;
            this.timesLabel.visible = false;
            game.LaohuUtils.auto_times = 0;
        }

        public bgAni: DBComponent;
        public logoAni: DBComponent;
        public spinDefault: DBComponent;
        public spinStartRun: DBComponent;
        public spinRunning: DBComponent;
        public spinStopRun: DBComponent;
        private logoaninterval: any;


        /**
         * 初始化招财锦鲤动画
         */

        protected initAni() {
            this.bgAni = DBComponent.create("zcjl_bgani", "zcjl_bg");
            this.bgAni.play("", 0);
            this.bgAni.bottom = 80;
            this.bgAni.horizontalCenter = 0;
            this.effectGroup.addChild(this.bgAni);
            this.bgAni.resetPosition();
            this.logoaninterval = egret.setInterval(this.logoAniFun, this, 4000)
            this.spinDefault = DBComponent.create("zcjl_spinDefault", "zcjl_spin01");
            this.spinStartRun = DBComponent.create("zcjl_spinStartRun", "zcjl_spin02");
            this.spinRunning = DBComponent.create("zcjl_spinRunning", "zcjl_spin03");
            this.spinStopRun = DBComponent.create("zcjl_spinStopRun", "zcjl_spin04");

            // this.spinStopRun.play("",0);
            // this.spinStopRun.horizontalCenter = -3;
            // this.spinStopRun.bottom = 47;
            // this.spinGroup.addChild(this.spinStopRun);
            // this.spinStopRun.resetPosition();
            this.spinDefault.touchEnabled = this.spinStartRun.touchEnabled = this.spinRunning.touchEnabled = this.spinStopRun.touchEnabled = false;

            this.spinDefault.play("", 0);
            this.spinDefault.horizontalCenter = -3;
            this.spinDefault.bottom = 90;
            this.spinGroup.addChild(this.spinDefault);
            this.spinDefault.resetPosition();

        }

        private logoAniFun() {
            game.UIUtils.removeSelf(this.logoAni);
            this.logoAni = DBComponent.create("zcjl_logoAni", "zcjl_logo");
            this.logoAni.play("", 1);
            this.effectGroup.addChild(this.logoAni);
            this.logoAni.horizontalCenter = 85;
            this.logoAni.bottom = 625;
            this.logoAni.resetPosition();
        }

        /**
        * 开始按钮动画
        */
        private setStartBtn() {
            game.UIUtils.removeSelf(this.spinDefault);
            this.spinRunning.play("", 0);
            this.spinRunning.bottom = 47; this.spinRunning.horizontalCenter = 0;
            this.spinGroup.addChild(this.spinRunning);
            this.spinRunning.resetPosition();
            this.spinStartRun.play("", 1);
            this.spinStartRun.horizontalCenter = 0; this.spinStartRun.bottom = 47;
            this.spinGroup.addChild(this.spinStartRun);
            this.spinStartRun.resetPosition();
        }
        /**
         * 还原开始按钮
         */
        private resetStartBtn() {
            game.UIUtils.removeSelf(this.spinRunning);
            this.spinDefault.play("", 0);
            this.spinGroup.addChild(this.spinDefault);
            this.spinDefault.resetPosition();
        }

        /**
         * 掉线重连成功返回大厅
         * @param  {egret.Event} e
         */
        public reconnectSuc(e: egret.Event) {
            game.LaohuUtils.auto_times = 0;
            this.closeGame("请重新进入游戏");
        }

        public closeGameCall() {
            CF.sN(SceneNotify.OPEN_MAIN_HALL);
            CF.sN(SceneNotify.CLOSE_ZCJL);
            CF.sN(PanelNotify.CLOSE_ZCJL_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
        }

        private ownGold: number = 0//玩家当前金钱

        /**
        * @param  {egret.Event} e
        */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.ZCJLUtils.bets = [];
            // let playerIdnex = resp.playerInfo.playerIndex;
            for (let key in resp.roomInfo.players) {
                let players: any = {};
                // if (key != playerIdnex) {
                players = resp.roomInfo.players[key];
                game.LaohuUtils.slotDeskGid.push(key);
                let head = `hall_header_${players.sex}_${players.figureUrl}_png`
                game.LaohuUtils.slotDeskHead.push(head);
                game.LaohuUtils.slotDeskName.push(players.nickname);
                this.deskMate.initDeskMate();
                // }
            }
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.ZCJLUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.ZCJLUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.ZCJLUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.ZCJLUtils.FreeTimeMulIndex = resp.roomInfo.players.freeMulIndex;
                game.ZCJLUtils.FreeTimeMul = game.ZCJLUtils.FreeTimeMul[game.ZCJLUtils.FreeTimeMulIndex];
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
            game.ZCJLUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
            game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
            //重连后倍数判断
            switch (game.ZCJLUtils.bet) {
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
                case 20:
                    this.bet = 5;
                    break;
                case 40:
                    this.bet = 6;
                    break;
                case 80:
                    this.bet = 7;
                    break;
                case 100:
                    this.bet = 8;
                    break;
                case 200:
                    this.bet = 9;
                    break;
                case 400:
                    this.bet = 10;
                    break;
            }
            let data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.utilsBet = game.ZCJLUtils.bet;
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
        }
        /**
         * 移除上次转动特效
         */
        private removeLastAni() {
            if (this.winGold >= 50 * game.ZCJLUtils.bet) {
                this.isStopLine = true;
                game.UIUtils.removeSelf(this.commomScore);
                SoundManager.getInstance().playMusic("zcjl_background_mus_mp3");

                this.bigwinAniGroup.visible = false;
                this.bigwinAniGroup.removeChildren();
                egret.clearInterval(this.timer2);
                ObjectPool.cancelPool("zcjl_fire01");
                ObjectPool.cancelPool("zcjl_fire02");
            }

            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            SoundManager.getInstance().stopEffectByName("zcjl_fireworks_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_largewin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_mediumwin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_smallwin_mp3");
        }

        /**
         * spin旋转
         */
        public startBtnTouch() {
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.ZCJLUtils.bet * 0.5 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "zcjl_game_spin_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.speed = 50;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                    this.resetStartBtn();
                    this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = this.ownGold;
                }, "", true);
                return;
            }
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            //转轴是否准备就绪
            if (this.runningType == RUNNING_TYPE.EMPTY) {
                // 判断是否为免费游戏并且是否有剩余的免费次数
                if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times >= 1) {
                    if (game.LaohuUtils.isAutoGame && game.LaohuUtils.auto_times <= 0) {
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        this.resetOtherBtn();
                        this.startBtn.source = "zcjl_game_spin_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.speed = 50;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "zcjl_game_spin_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
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
                            this.startBtn.source = "zcjl_game_spin_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.ZCJLUtils.bet * 0.5
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
                    this.startBtn.source = "zcjl_game_spin_png";
                    this.resetOtherBtn();
                    this.resetStartBtn();
                    return;
                } //为满足完成自动游戏条件，开始自动游戏旋转
                else if (!game.LaohuUtils.isAutoGame) {
                    this.setStartBtn();
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.speed = 50;
                }
                this.isTest = false;
                this.winNum.text = 0 + "";
                this.startBtn.filters = [colorFlilter];
                this.runningType = RUNNING_TYPE.LOOP;
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                SoundManager.getInstance().playEffect("zcjl_reel_mp3");
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
        public isTest: boolean = false;
        /**
         * 测试按钮转动
         */
        public async startBtnTouch0() {
            this.isTest = true;
            this.wheel = [[], [], []];
            let data = this.spinresult.text;
            for (let i = 0; i < 3; i++) {
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
         * 快速结束游戏
         */
        private fastGame() {
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.speed = 50;
                egret.clearTimeout(this.autoGameTimeout);
                game.LaohuUtils.isAutoGame = false;
                this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "zcjl_game_spin_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;

                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            //其他情况下，正常处理快速停止
            else {
                this.startBtn.source = "zcjl_game_spin_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            this.spinStopRun.play("", 1);
            this.spinStopRun.horizontalCenter = -3; this.spinStopRun.bottom = 47;
            this.spinGroup.addChild(this.spinStopRun);
            this.spinStopRun.resetPosition();

            this.spinStopRun.callback = () => {
                game.UIUtils.removeSelf(this.spinStopRun);
            }
            SoundManager.getInstance().stopEffectByName("ayls_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
        }

        public scrollerFastGame() {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("ayls_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
            }
        }

        public showAtr: Array<Array<number>>; //所有图标展示数组
        private bonusAtr: Array<Array<number>>;//获奖图标数组
        private scatterIcon: number; //scatterIcon数量 
        private eachLineScore: Array<number>;//每条连线的中奖金额 
        public yudiAtr: Array<number>;//scatter图标所在行
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
        public yudiAtr2: Array<number>;//scatter所在列
        public lineTime: number = 2000;
        private gameGroup: eui.Group;
        public lineImaArr: Array<number> = [];

        /**
       * 发送c_bet请求
       */
        private async messageSend() {
            this.showAtr = [[], [], [], [], []];
            this.lineImaArr = [];
            this.bonusAtr = [];
            this.scatterIcon = 0;
            this.eachLineScore = [];
            this.yudiAtr = [];
            this.allAtr = [[], [], [], [], []];
            this.scatter = 0;
            let data2: any;
            this.allLine = [];
            this.eachLineIconIndex = [];
            this.fastItemIndex = 0;
            //测试专用消息
            if (this.isTest) {
                if (this.spinTest == 1) {
                    data2 = { "spinType": this.spinTest, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                data2 = { "spinType": 0, "bet": game.ZCJLUtils.bet, "lineCount": 1, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                this.closeGame("");
                return;
            }
            this.ownGold -= game.ZCJLUtils.bet * 0.5;
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
            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2]];
            this.messageTimeOut = egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 300);
            this.runningType = RUNNING_TYPE.RESULT;
            this.winGold = resp2.winCount;
            this.ownGold = resp2.own_gold;
            if (this.winGold >= game.ZCJLUtils.bet * 50) {
                this.lineTime = 12000;
            } else {
                this.lineTime = 2000;
            }
            game.ZCJLUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.ZCJLUtils.ToTalMoney;
            this.scatter = resp2.sactter;
            if (this.winGold > 0) {
                this.bonusAtr = [[1], [1], [1]];
            }
            //自动游戏情况下累加赢取金额
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.totoalWinGold += this.winGold;
            }
            this.isStopAni = false;
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
                case 3:
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "zcjl_game_spin_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.speed = 50;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                this.resetStartBtn();
                            }
                        }
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                        SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
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
                            if (this.scatter != 1) this.resetOtherBtn();
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
                case 2:
                    SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3) this.scrollerItemFast(this.fastItemIndex, this.showAtr);
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("zcjl_reelstop_mp3");
                    break;
            }
        }

        /**
      * 播放总连线
      */
        public checkBonusIcon() {
            if (this.winGold > 0) {
                if (this.winGold >= game.ZCJLUtils.bet * 50) {
                    this.bigwinAni();
                    this.eachLineFun();
                    SoundManager.getInstance().playEffect("zcjl_largewin_mp3");
                    SoundManager.getInstance().playMusic("zcjl_fire_mp3");
                    SoundManager.getInstance().playEffect("zcjl_fireworks_mp3", true);

                } else if (this.winGold > 12.5 * game.ZCJLUtils.bet && this.winGold <= game.ZCJLUtils.bet * 25) {
                    SoundManager.getInstance().playEffect("zcjl_mediumwin_mp3");
                    this.eachLineFun();

                } else if (this.winGold > 0 && this.winGold <= game.ZCJLUtils.bet * 12.5) {
                    SoundManager.getInstance().playEffect("zcjl_smallwin_mp3");
                    this.eachLineFun();

                }
            }
            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
        }

        public eachLineFun() {
            this.scroller.stopIconDb();
            this.scroller.addBonusAni(this.bonusAtr);
            game.UIUtils.removeSelf(this.commomScore);
            this.commomScore.font = "zcjl_paylistnum_fnt";
            this.commomScore.letterSpacing = -20;
            this.commomScore.text = this.winGold + "";
            this.commomScore.verticalCenter = this.commomScore.horizontalCenter = 0;
            this.gameGroup.addChild(this.commomScore);
            egret.clearTimeout(this.eachLineTimeOut);
            if (!game.LaohuUtils.isAutoGame) {
                this.eachLineTimeOut = egret.setTimeout(() => {
                    this.eachLineFun();
                }, this, this.lineTime);
            }
        }


        private timer2: any;
        public bigwinAniGroup: eui.Group;
        /**
         * 中了金鲤鱼特效
         */
        private bigwinAni() {
            this.bigwinAniGroup.visible = true;
            this.timer2 = egret.setInterval(() => {
                if (this.bigwinAniGroup.numChildren < 8) {
                    let gold_right1 = game.GoldDownPanel.createZcjlGold("zcjl_fire01");
                    this.bigwinAniGroup.addChild(gold_right1);
                    let gold_right2 = game.GoldDownPanel.createZcjlGold("zcjl_fire02");
                    this.bigwinAniGroup.addChild(gold_right2);
                }
            }, this, 250);

        }

        /**
         * 开始自动游戏
         */
        public startAutoGame() {
            //余额判断
            if (game.ZCJLUtils.bet * 0.5 > this.ownGold) {
                this.startBtn.source = "zcjl_game_spin_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.speed = 50;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("zcjl_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefault);
            this.startBtn.source = "zcjl_game_spin2_png";
            game.LaohuUtils.isAutoGame = true;
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.speed = 100;
            //无穷次数情况
            if (game.LaohuUtils.auto_times > 1000) {
                this.timesLabel.text = "s";
            } else {
                this.timesLabel.text = game.LaohuUtils.auto_times + "";
            }
            this.startBtnTouch();
        }


        /**
         * 设置最大倍数
         */
        public setMaxBet() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            let bet = game.ZCJLUtils.bets[9];
            //金币是否满足条件
            if (0.5 * bet > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            let data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 10;
            this.beishu.text = game.ZCJLUtils.bet + "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        }
        /**
         * 加注
         */
        public addbetTouch() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
                        break;
                    case 2:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[1];

                        break;
                    case 3:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[2];
                        break;
                    case 4:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[3];
                        break;
                    case 5:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[4];
                        break;
                    case 6:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[5];
                        break;
                    case 7:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[6];
                        break;
                    case 8:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[7];
                        break;
                    case 9:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[8];
                        break;
                    case 10:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.ZCJLUtils.bet * 0.5) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        }
        /**
         * 减注
         */
        public subBetTouch() {
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (this.bet <= 1) {
                return;
            } else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[0];
                        break;
                    case 2:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[1];
                        break;
                    case 3:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[2];
                        break;
                    case 4:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[3];
                        break;
                    case 5:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[4];
                        break;
                    case 6:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[5];
                        break;
                    case 7:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[6];
                        break;
                    case 8:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[7];
                        break;
                    case 9:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[8];
                        break;
                    case 10:
                        game.ZCJLUtils.bet = game.ZCJLUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.ZCJLUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            // this[`betTtipsGroup`].visible = true;
            this.beishu.text = game.ZCJLUtils.bet + "";
            this.utilsBet = game.ZCJLUtils.bet;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(game.ZCJLUtils.bet * 50 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.goldFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 50) + "";
            this.redFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 25) + "";
            this.greenFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 12.5) + "";
            this.chockFishBonus.text = NumberFormat.handleFloatDecimal(game.ZCJLUtils.bet * 2.5) + "";
        }


    }
}