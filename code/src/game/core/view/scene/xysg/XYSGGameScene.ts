// TypeScript file
module xysg {
    export class XYSGGameScene extends game.BaseSlotScene {
        public scroller: XYSGScroller;
        public startBtn: eui.Image;
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_XYSG;
        public AUTOGAME_NOTIFY: string = PanelNotify.OPEN_XYSG_AUTO_PANEL;
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
        public sceneId = 1015;
        public maskGroup: eui.Group;
        public effectGroup: eui.Group;
        public paylist1: eui.BitmapLabel;
        public paylist2: eui.BitmapLabel;
        public paylist3: eui.BitmapLabel;
        public paylist4: eui.BitmapLabel;
        public paylist5: eui.BitmapLabel;
        public paylist6: eui.BitmapLabel;
        public paylist7: eui.BitmapLabel;
        public payAniGroup: eui.Group;
        public winaniGroup1: eui.Group;
        public winaniGroup2: eui.Group;
        public maxBet: eui.Image;
        public spinTest: number = 0;//测试模式
        public wheel: Array<Array<number>>;//测试填写的转动模型

        public lineSmall = "";
        public lineMid = "";
        public lineBig = "";
        public lineHuge = "";
        public buttonEffect = "xysg_button_mp3";
        public scrollerFastEffect = "";
        public lineAniXArray = [];
        public lineAniYArray = [];
        public lineAniRotation = [];
        public firstLineX = -490;
        public lastLineX = 340;
        public utilsTotalMoney = game.XYSGUtils.ToTalMoney;
        public utilsBet = game.XYSGUtils.bet;
        public fixpositionY = [];
        public fastSpeedTime = 4500;
        public isSetHui = false;
        public gameId = "xysg";
        public pmdKey = "slot";
        public constructor() {
            super();
            this.skinName = new XYSGGameSceneSkin();
        }

        public createChildren() {
            super.createChildren();
            this.scroller.showFirst(1);
            game.LaohuUtils.currentSceneId = 1015;
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
            SoundManager.getInstance().playMusic("xysg_background_mus_mp3");
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
            SoundManager.getInstance().stopAllEffects();
            egret.clearInterval(this.eachLineTimeOut2);
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
        public spinDefault: DBComponent;
        public spinStartRun: DBComponent;
        public spinRunning: DBComponent;
        public spinStopRun: DBComponent;
        public logoAni: DBComponent;

        public paylistAni1: DBComponent;
        public paylistAni2: DBComponent;
        public winKuangAni: DBComponent; //
        public winDefRoundAni: DBComponent; //转动时框特效
        public winRoundAni1: DBComponent;//默认框特效
        public winRoundAni2: DBComponent;//中奖框特效
        public diAni1: DBComponent; //中奖底部特效小
        public diAni2: DBComponent;//中奖底部特效大

        /**
         * 初始化招财锦鲤动画
         */

        protected initAni() {
            this.bgAni = DBComponent.create("cxysg_bgani", "xysg_bg01");
            this.bgAni.play("", 0);
            this.bgAni.bottom = 6;
            this.bgAni.horizontalCenter = 2;
            this.bgAni.touchEnabled = false;
            this.resizeGroup.addChild(this.bgAni);
            this.bgAni.resetPosition();

            this.spinDefault = DBComponent.create("xysg_spinDefault", "xysg_spin01");
            this.spinStartRun = DBComponent.create("xysg_spinStartRun", "xysg_spin02");
            this.spinRunning = DBComponent.create("xysg_spinRunning", "xysg_spin03");
            this.spinStopRun = DBComponent.create("xysg_spinStopRun", "xysg_spin04");

            this.spinDefault.touchEnabled = this.spinStartRun.touchEnabled = this.spinRunning.touchEnabled = this.spinStopRun.touchEnabled = false;
            this.spinDefault.play("", 0);
            this.spinDefault.horizontalCenter = -2;
            this.spinDefault.bottom = 102;
            this.spinGroup.addChild(this.spinDefault);
            this.spinDefault.resetPosition();

            this.paylistAni1 = DBComponent.create("xysg_payani1", "xysg_payani1");
            this.paylistAni2 = DBComponent.create("xysg_payani2", "xysg_payani2");

            this.winDefRoundAni = DBComponent.create("xysg_runani1", "xysg_runani1");
            this.winRoundAni1 = DBComponent.create("xysg_winani1", "xysg_winani1");
            this.winRoundAni2 = DBComponent.create("xysg_winani2", "xysg_winani2");
            this.winKuangAni = DBComponent.create("xysg_runani2", "xysg_runani2");
            this.diAni1 = DBComponent.create("xysg_winani3", "xysg_winani3");
            this.diAni2 = DBComponent.create("xysg_winani4", "xysg_winani4");
            this.winDefRoundAni.touchEnabled = this.winRoundAni1.touchEnabled = this.winRoundAni2.touchEnabled = false;
            this.showKuangAni();

        }
        /**
         * 默认框特效
         */
        private showKuangAni() {
            this.winRoundAni1.play("", 0);
            this.winRoundAni1.horizontalCenter = 3; this.winRoundAni1.bottom = 100;
            this.winaniGroup2.addChild(this.winRoundAni1);
            this.winRoundAni1.resetPosition();
        }
        /**
         * 转动时矿特效
         */
        private showrunKuangAni() {
            this.winDefRoundAni.play("", 0);
            this.winDefRoundAni.horizontalCenter = 3; this.winDefRoundAni.bottom = 100;
            this.winaniGroup2.addChild(this.winDefRoundAni);
            this.winDefRoundAni.resetPosition();
        }
        /**
         * 中奖是矿特效
         */
        private showwinKuangani() {
            this.winRoundAni2.play("", 0);
            this.winRoundAni2.horizontalCenter = 3; this.winRoundAni2.bottom = 100;
            this.winaniGroup2.addChild(this.winRoundAni2);
            this.winRoundAni2.resetPosition();
        }


        /**
        * 开始按钮动画
        */
        private setStartBtn() {
            game.UIUtils.removeSelf(this.spinDefault);
            this.spinRunning.play("", 0);
            this.spinRunning.bottom = 70; this.spinRunning.horizontalCenter = -3;
            this.spinGroup.addChild(this.spinRunning);
            this.spinRunning.resetPosition();
            this.spinStartRun.play("", 1);
            this.spinStartRun.horizontalCenter = -3; this.spinStartRun.bottom = 56;
            this.spinGroup.addChild(this.spinStartRun);
            this.spinStartRun.resetPosition();
        }
        /**
         * 还原开始按钮
         */
        private resetStartBtn() {
            game.UIUtils.removeSelf(this.spinRunning);
            this.spinDefault.play("", 0);
            this.spinDefault.bottom = 102;
            this.spinDefault.horizontalCenter = -2;
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
            CF.sN(SceneNotify.CLOSE_XYSG);
            CF.sN(PanelNotify.CLOSE_XYSG_AUTO_PANEL);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
        }

        private ownGold: number = 0//玩家当前金钱

        /**
        * @param  {egret.Event} e
        */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.XYSGUtils.bets = [];
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
                game.XYSGUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.XYSGUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.XYSGUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.XYSGUtils.FreeTimeMulIndex = resp.roomInfo.players.freeMulIndex;
                game.XYSGUtils.FreeTimeMul = game.XYSGUtils.FreeTimeMul[game.XYSGUtils.FreeTimeMulIndex];
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
            game.XYSGUtils.ToTalMoney = this.ownGold;
            game.XYSGUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.XYSGUtils.ToTalMoney;
            game.XYSGUtils.bet = game.XYSGUtils.bets[0];
            //重连后倍数判断
            switch (game.XYSGUtils.bet) {
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
            let data = Number(new Big(game.XYSGUtils.bet).mul(0.5));
            this.utilsBet = game.XYSGUtils.bet;
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.XYSGUtils.bet + "";
            this.paylist1.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 100) + "";
            this.paylist2.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 50) + "";
            this.paylist3.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 25) + "";
            this.paylist4.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 12.5) + "";
            this.paylist5.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 5) + "";
            this.paylist6.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 2.5) + "";
            this.paylist7.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 1) + "";
        }
        /**
         * 移除上次转动特效
         */
        private removeLastAni() {
            if (this.winGold >= 100 * game.XYSGUtils.bet) {
                this.isStopLine = true;
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(this.diAni2);
            }
            this.winNum.text = 0 + "";
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
            this.winGroup.visible = false;
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearInterval(this.eachLineTimeOut2);
            egret.clearTimeout(this.eachLineTimeOut3);
            egret.clearTimeout(this.showIconTimeOut);
            this.bigwinAniGroup.visible = false;
            // game.UIUtils.removeSelf(this.coinAni);
            SoundManager.getInstance().stopEffectByName("xysg_win_1_mp3");
            SoundManager.getInstance().stopEffectByName("xysg_win_2_mp3");
            SoundManager.getInstance().stopEffectByName("xysg_win_3_mp3");
            SoundManager.getInstance().stopEffectByName("xysg_fire_mus_mp3");
            game.UIUtils.removeSelf(this.paylistAni1);
            game.UIUtils.removeSelf(this.paylistAni2);
            game.UIUtils.removeSelf(this.diAni1);
            game.UIUtils.removeSelf(this.winRoundAni1);
            game.UIUtils.removeSelf(this.winRoundAni2);
        }

        /**
         * spin旋转
         */
        public startBtnTouch() {
            //判断余额
            SoundManager.getInstance().playEffect(this.buttonEffect);
            if (game.XYSGUtils.bet * 0.5 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "xysg_spin_1_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.speed = 50;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
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
                        this.startBtn.source = "xysg_spin_1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.speed = 50;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "xysg_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
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
                            this.startBtn.source = "xysg_spin_1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.speed = 50;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.XYSGUtils.bet * 0.5;
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
                    this.startBtn.source = "xysg_spin_1_png";
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
                this.startBtn.filters = [colorFlilter];
                this.runningType = RUNNING_TYPE.LOOP;
                this.removeLastAni();
                this.scroller.stopIconDb();
                this.isStopAni = true;
                this.setOtherBtn();
                this.scroller.run();
                game.UIUtils.removeSelf(this.winRoundAni1);
                this.showrunKuangAni();
                SoundManager.getInstance().playEffect("xysg_reelstart_mp3");
                SoundManager.getInstance().playEffect("xysg_reel_mp3");
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
            this.wheel = [[], [], [], [], []];
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
                this.startBtn.source = "xysg_spin_1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;

                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            //其他情况下，正常处理快速停止
            else {
                this.startBtn.source = "xysg_spin_1_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            this.spinStopRun.play("", 1);
            this.spinStopRun.horizontalCenter = -3; this.spinStopRun.bottom = 56;
            this.spinGroup.addChild(this.spinStopRun);
            this.spinStopRun.resetPosition();

            this.spinStopRun.callback = () => {
                game.UIUtils.removeSelf(this.spinStopRun);
            }
            SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
        }

        public scrollerFastGame() {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
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
        private eachLineTimeOut2: any;
        public runningType: number = 3;//选择类型
        private sethuiTimeout: any; //icon置灰timeout
        private winGold: number = 0;
        public winGroup: eui.Group;
        public commomScore: eui.BitmapLabel//中奖展示金额数字
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
                    data2 = { "spinType": this.spinTest, "bet": game.XYSGUtils.bet, "lineCount": 1, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.XYSGUtils.bet, "lineCount": 1, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                data2 = { "spinType": 0, "bet": game.XYSGUtils.bet, "lineCount": 1, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                this.closeGame("");
                return;
            }
            this.ownGold -= game.XYSGUtils.bet * 0.5;
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
            if (this.winGold >= game.XYSGUtils.bet * 100) {
                this.lineTime = 12000;
            } else {
                this.lineTime = 2000;
            }
            game.XYSGUtils.ToTalMoney = this.ownGold;
            this.utilsTotalMoney = game.XYSGUtils.ToTalMoney;
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
                                this.startBtn.source = "xysg_spin_1_png";
                                this.timesLabel.text = "";
                                game.LaohuUtils.downTime2 = 400;
                                game.LaohuUtils.downTime3 = 800;
                                game.LaohuUtils.speed = 50;
                                this.runningType = RUNNING_TYPE.EMPTY;
                                this.resetStartBtn();
                            }
                        }
                        // this.effectGroup2.visible = false;
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
                        SoundManager.getInstance().playEffect("xysg_reelstop_mp3");
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
                        game.UIUtils.removeSelf(this.winDefRoundAni);
                        this.showKuangAni();
                        this.checkBonusIcon();
                    }
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("xysg_reelstop_mp3");
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3) this.scrollerItemFast(this.fastItemIndex, this.showAtr);
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("xysg_reelstop_mp3");
                    break;
            }
        }
        private eachLineTimeOut3: any;
        /**
      * 播放总连线
      */
        public checkBonusIcon() {
            if (this.winGold > 0) {
                game.UIUtils.removeSelf(this.winDefRoundAni);
                this.scroller.addBonusAni(this.bonusAtr);
                this.showwinKuangani();
                if (!game.LaohuUtils.isAutoGame) {
                    egret.clearInterval(this.eachLineTimeOut2);
                    this.eachLineTimeOut2 = egret.setInterval(() => {
                        this.scroller.stopIconDb();
                        this.scroller.addBonusAni(this.bonusAtr);
                    }, this, 2500);
                }

                if (this.winGold >= game.XYSGUtils.bet * 100) {
                    this.eachLineFun();
                    SoundManager.getInstance().playEffect("xysg_win_3_mp3");
                    this.bigwinAni();
                    this.showpayani1();
                    this.paylistAni1.bottom = 545; this.paylistAni1.horizontalCenter = -490;
                    SoundManager.getInstance().pauseMusic();
                    SoundManager.getInstance().playEffect("xysg_fire_mus_mp3");
                } else if (this.winGold >= game.XYSGUtils.bet * 50 && this.winGold < game.XYSGUtils.bet * 100) {
                    SoundManager.getInstance().playEffect("xysg_win_3_mp3");
                    this.showpayani1();
                    this.bigwinAni1();
                    this.paylistAni1.bottom = 480; this.paylistAni1.horizontalCenter = -495;
                    this.eachLineFun();
                }
                else if (this.winGold >= game.XYSGUtils.bet * 25 && this.winGold < game.XYSGUtils.bet * 50) {
                    SoundManager.getInstance().playEffect("xysg_win_2_mp3");
                    this.showpayani1();
                    this.bigwinAni1();
                    this.paylistAni1.bottom = 415; this.paylistAni1.horizontalCenter = -500;
                    this.eachLineFun();
                } else if (this.winGold >= 12.5 * game.XYSGUtils.bet && this.winGold < game.XYSGUtils.bet * 25) {
                    SoundManager.getInstance().playEffect("xysg_win_2_mp3");
                    this.showpayani1();
                    this.bigwinAni1();
                    this.paylistAni1.bottom = 350; this.paylistAni1.horizontalCenter = -505;
                    this.eachLineFun();
                } else if (this.winGold >= 5 * game.XYSGUtils.bet && this.winGold < game.XYSGUtils.bet * 12.5) {
                    SoundManager.getInstance().playEffect("xysg_win_2_mp3");
                    this.showpayani1();
                    this.bigwinAni1();
                    this.paylistAni1.bottom = 285; this.paylistAni1.horizontalCenter = -510;
                    this.eachLineFun();
                } else if (this.winGold >= 2.5 * game.XYSGUtils.bet && this.winGold < game.XYSGUtils.bet * 5) {
                    SoundManager.getInstance().playEffect("xysg_win_1_mp3");
                    this.showpayani1();
                    this.bigwinAni1();
                    this.paylistAni1.bottom = 220; this.paylistAni1.horizontalCenter = -515;
                    this.eachLineFun();
                } else if (this.winGold >= 1 * game.XYSGUtils.bet && this.winGold < game.XYSGUtils.bet * 2.5) {
                    SoundManager.getInstance().playEffect("xysg_win_1_mp3");
                    this.showpayAni2();
                    this.bigwinAni1();
                    this.paylistAni2.bottom = 155; this.paylistAni2.horizontalCenter = -515;
                    this.eachLineFun();
                }
                egret.clearTimeout(this.eachLineTimeOut3);
                this.eachLineTimeOut3 = egret.setTimeout(() => {
                    this.winGroup.visible = false;
                }, this, 5000);
                this.commomScore.text = this.winGold + "";
                this.winGroup.visible = true;
            }
            if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
        }

        public eachLineFun() {
            egret.clearTimeout(this.eachLineTimeOut);
            if (!game.LaohuUtils.isAutoGame) {
                this.eachLineTimeOut = egret.setTimeout(() => {
                    this.eachLineFun();
                }, this, this.lineTime);
            }
        }

        public showpayani1() {
            this.paylistAni1.play("", 0);
            this.payAniGroup.addChild(this.paylistAni1);
            this.paylistAni1.resetPosition();
        }

        public showpayAni2() {
            this.paylistAni2.play("", 0);
            this.payAniGroup.addChild(this.paylistAni2);
            this.paylistAni2.resetPosition();
        }


        private timer2: any;
        private timer1: any;
        public bigwinAniGroup: eui.Group;
        /**
         * 中了金鲤鱼特效
         */
        private bigwinAni() {
            this.diAni2.play("", 0);
            this.diAni2.horizontalCenter = 2; this.diAni2.bottom = 55;
            this.winaniGroup1.addChild(this.diAni2);
            this.diAni2.resetPosition();
        }
        private bigwinAni1() {
            this.diAni1.play("", 0);
            this.diAni1.horizontalCenter = 2; this.diAni1.bottom = 55;
            this.winaniGroup1.addChild(this.diAni1);
            this.diAni1.resetPosition();
        }

        /**
         * 开始自动游戏
         */
        public startAutoGame() {
            //余额判断
            if (game.XYSGUtils.bet * 0.5 > this.ownGold) {
                this.startBtn.source = "xysg_spin_1_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.speed = 50;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("xysg_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefault);
            this.startBtn.source = "xysg_spin_2_png";
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
            let bet = game.XYSGUtils.bets[9];
            //金币是否满足条件
            if (0.5 * bet > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.XYSGUtils.bet = game.XYSGUtils.bets[9];
            this.utilsBet = game.XYSGUtils.bet;
            let data = Number(new Big(game.XYSGUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 10;
            this.beishu.text = game.XYSGUtils.bet + "";
            this.paylist1.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 100) + "";
            this.paylist2.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 50) + "";
            this.paylist3.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 25) + "";
            this.paylist4.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 12.5) + "";
            this.paylist5.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 5) + "";
            this.paylist6.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 2.5) + "";
            this.paylist7.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 1) + "";
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
                        game.XYSGUtils.bet = game.XYSGUtils.bets[0];
                        break;
                    case 2:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[1];

                        break;
                    case 3:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[2];
                        break;
                    case 4:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[3];
                        break;
                    case 5:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[4];
                        break;
                    case 6:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[5];
                        break;
                    case 7:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[6];
                        break;
                    case 8:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[7];
                        break;
                    case 9:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[8];
                        break;
                    case 10:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.XYSGUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.XYSGUtils.bet + "";
            this.utilsBet = game.XYSGUtils.bet;
            if ((game.XYSGUtils.bet * 0.5) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.subBetTouch();
            }
            this.paylist1.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 100) + "";
            this.paylist2.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 50) + "";
            this.paylist3.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 25) + "";
            this.paylist4.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 12.5) + "";
            this.paylist5.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 5) + "";
            this.paylist6.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 2.5) + "";
            this.paylist7.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 1) + "";
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
                        game.XYSGUtils.bet = game.XYSGUtils.bets[0];
                        break;
                    case 2:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[1];
                        break;
                    case 3:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[2];
                        break;
                    case 4:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[3];
                        break;
                    case 5:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[4];
                        break;
                    case 6:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[5];
                        break;
                    case 7:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[6];
                        break;
                    case 8:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[7];
                        break;
                    case 9:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[8];
                        break;
                    case 10:
                        game.XYSGUtils.bet = game.XYSGUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.XYSGUtils.bet).mul(0.5));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.XYSGUtils.bet + "";
            this.utilsBet = game.XYSGUtils.bet;
            this.paylist1.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 100) + "";
            this.paylist2.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 50) + "";
            this.paylist3.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 25) + "";
            this.paylist4.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 12.5) + "";
            this.paylist5.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 5) + "";
            this.paylist6.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 2.5) + "";
            this.paylist7.text = NumberFormat.handleFloatDecimal(game.XYSGUtils.bet * 1) + "";
        }


    }
}