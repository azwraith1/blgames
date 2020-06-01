module rdsg {
    export class RDSGScene1 extends game.BaseScene {
        public resizeGroup: eui.Group;
        public gameGroup: eui.Group;
        public scroller: rdsg.RDSGScroller;
        public bottomGroup: eui.Group;
        public memuBtn: eui.Button;
        public tipsBtn: eui.Button;
        public menuGroup0: eui.Group;
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
        public maskRect: eui.Rect;
        public effectGroup: eui.Group;
        public winLineGroup: eui.Group;
        public testGroup: eui.Group;
        public pscen1: eui.EditableText;
        public startBtn0: eui.Button;
        public spinresult: eui.EditableText;
        public lable2: eui.Label;
        public lable1: eui.Label;
        public effectGroup2: eui.Group;

        public bet: number = 1;
        private spinDefaultAni: DBComponent;//spin默认动画
        private spinStartAni: DBComponent;//spin点击特效
        private spinRunningAni: DBComponent;//spin旋转特效
        private spinStopAni: DBComponent;//spin停止特效
        public scrollerAni: DBComponent;
        private bgAni: DBComponent;
        public lineTime: number = 1500;
        public friutAni: DBComponent;//水果特效


        public constructor() {
            super();
            this.skinName = "RDSGScene1Skin";
        }

        public createChildren() {
            super.createChildren();
            SoundManager.getInstance().playMusic("rdsg_background_mus_mp3");
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.setOtherBtn();
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this[`quitBtn`].visible = false;
            }
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.startBtn.filters = [colorFlilter];
            this.startBtn.touchEnabled = false;
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this.quitBtn.visible = false;
            }
            this.startGame();
            let isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.scroller.showFirst(1);
            this.initAni();
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.RDSG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            this.removeEvent();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.RDSG_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
        }
        /**
       * 鼠标手势库
       */
        public addMouseOnEvent() {
            this.memuBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.memuBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.setingBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.setingBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this[`quitBtn`].addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this[`quitBtn`].addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }
        public removeEvent() {
            this.memuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.memuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.setingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.setingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this[`quitBtn`].removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this[`quitBtn`].removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }

        private changeMenuBtn() {
            this.memuBtn.currentState = "down";
        }
        private changeMenuBtn2() {
            this.memuBtn.currentState = "up";
        }
        private changesettingBtn() {
            this.setingBtn.currentState = "down";
        }
        private changesettingBtn2() {
            this.setingBtn.currentState = "up";
        }
        private changetipsBtn() {
            this.tipsBtn.currentState = "down";
        }
        private changetipsBtn2() {
            this.tipsBtn.currentState = "up";
        }
        private changeBetAddBtn() {
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.addbet.currentState = "down";
            this[`betTtipsGroup`].visible = true;
        }
        private changeBetAddBtn2() {
            this.addbet.currentState = "up";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false; }, this, 5000)
        }
        private changeBetSubBtn() {
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.subbet.currentState = "down";
            this[`betTtipsGroup`].visible = true;
        }
        private changeBetSubBtn2() {
            this.subbet.currentState = "up";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false; }, this, 5000)
        }
        private changeyazhuBtn() {
            // this[`betTtipsGroup`].visible = true;
            // this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            // egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.maxBet.source = RES.getRes("sdxl_bet2_png");
        }
        private changeyazhuBtn2() {
            this.maxBet.source = RES.getRes("sdxl_bet1_png");
        }
        private changeAutoRunBtn() {
            this.autoGameBtn.currentState = "down";
        }
        private changeAutoRunBtn2() {
            this.autoGameBtn.currentState = "up";
        }
        private changeGameRecord() {
            this.recordBtn.currentState = "down";
        }
        private changeGameRecord2() {
            this.recordBtn.currentState = "up";
        }

        private changeOutBtn() {
            this[`quitBtn`].currentState = "donw";
        }
        private changeOutBtn2() {
            this[`quitBtn`].currentState = "up";
        }
        /**
         * 初始化特效
         */
        private initAni() {
            this.spinDefaultAni = DBComponent.create("rdsg_spinDefaultAni", "rdsg_spin_default");
            this.spinRunningAni = DBComponent.create("rdsg_spinRunningAni", "rdsg_spining");
            this.spinStartAni = DBComponent.create("rdsg_spinStartAni", "rdsg_spin_start");
            this.spinStopAni = DBComponent.create("rdsg_spinStopAni", "rdsg_spin_stop");
            this.scrollerAni = DBComponent.create("rdsg_scrollerAni", "rdsg_commonback");
            this.friutAni = DBComponent.create("rdsg_friutAni", "rdsg_logoturn");
            this.spinDefaultAni.touchEnabled = this.spinRunningAni.touchEnabled = this.spinStartAni.touchEnabled = this.spinStopAni.touchEnabled = false;
            this.spinDefaultAni.play("", 0);
            this.spinStopAni.horizontalCenter = this.spinStartAni.horizontalCenter = this.spinRunningAni.horizontalCenter = this.spinDefaultAni.horizontalCenter = 0;
            this.spinStopAni.bottom = this.spinStartAni.bottom = this.spinRunningAni.bottom = this.spinDefaultAni.bottom = 55;
            this.spinGroup.addChild(this.spinDefaultAni);
            this.spinDefaultAni.resetPosition();
            this.bgAni = new DBComponent("rdsg_commombg1");
            this.bgAni.play("", 0);
            this.bgAni.horizontalCenter = 0;
            this.bgAni.bottom = -995;
            this.effectGroup.addChild(this.bgAni);
            this.bgAni.resetPosition();
            this.friutAni.play("", 0);
            this.friutAni.horizontalCenter = 2;
            this.friutAni.verticalCenter = -333;
            this.resizeGroup.addChild(this.friutAni);
            this.friutAni.resetPosition();
        }

        /**
        * 开始游戏发送请求
        */
        public async startGame() {
            let resp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
            let data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1006 }
            let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data);
            if (resp) {
                if (resp.error.code != 0) {
                    let text = resp.error.msg;
                    CF.sN(SceneNotify.CLOSE_RDSG);
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    Global.alertMediator.addAlert(text, () => {

                    }, "", true);
                    return;
                }
            }
            else {
                CF.sN(SceneNotify.CLOSE_RDSG);
                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
            }

        }

        private ownGold: number //玩家当前金钱
        /**
        * 进入游戏数据处理
        * @param  {egret.Event} e
        */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.RDSGUtils.bets = [];
            let playerIdnex = resp.playerInfo.playerIndex;
            let players: any = {};
            for (let key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.RDSGUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            if (resp.roomInfo.gamePayTable) {
                game.RDSGUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.RDSGUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.RDSGUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.RDSGUtils.FreeTimeMul = game.RDSGUtils.FreeTimeMul[game.RDSGUtils.FreeTimeMulIndex];
                game.RDSGUtils.freeTimes = players.freeTimes;
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
            game.RDSGUtils.ToTalMoney = this.ownGold;
            game.RDSGUtils.bet = game.RDSGUtils.bets[0];
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                // CF.dP(ENo.CBZZ_ENTER_FREE_GAME_SCENE);
            } else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.RDSGUtils.bet = players.lastBet;
                CF.dP(ENo.RDSG_START_FREE_GAME_SCENE);
            }
            //重连后倍数判断
            switch (game.RDSGUtils.bet) {
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
            let data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.RDSGUtils.bet + "";
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
        }

        protected onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this.startBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.startBtnTouch();
                    break;
                case this[`quitBtn`]:
                    if (this.scatter == 1) return;
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
                    break;
                case this.memuBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    if (this[`menuGroup`].visible == false) {
                        this[`menuGroup`].visible = true;
                    } else {
                        this[`menuGroup`].visible = false;
                    }
                    break;
                //游戏记录按钮
                case this[`recordBtn`]:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
                    this[`menuGroup`].visible = false;
                    break;
                //游戏设置按钮
                case this[`setingBtn`]:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this[`menuGroup`].visible = false;
                    break;
                //转轴快速停止
                case this[`maskRect`]:
                    this.scrollerFastGame();
                    break;
                //赔付表按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_RDSG_TIPS_PANEL);
                    break;
                //最大bet按钮
                case this.maxBet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.setMaxBet();
                    break;
                //减少bet按钮
                case this.subbet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.reduceBet();
                    break;
                //增加bet按钮
                case this.addbet:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    this.addBetFunc();
                    break;
                //自动游戏窗口
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.OPEN_RDSG_AUTO_PANEL);
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        }
        public isTest: boolean = false;
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
         * 开始转动
         */
        public startBtnTouch() {
            //判断余额
            if (game.RDSGUtils.bet * 2 > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.startBtn.source = "rdsg_startbtn_png";
                    game.LaohuUtils.isAutoGame = false;
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                        this.startBtn.source = "rdsg_startbtn_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "rdsg_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                            this.startBtn.source = "rdsg_startbtn_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.downTime2 = 200;
                    game.LaohuUtils.downTime3 = 400;
                    game.LaohuUtils.downTime4 = 600;
                    game.LaohuUtils.downTime5 = 800;
                    game.LaohuUtils.speed = 85;
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.RDSGUtils.bet * 2
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
                    this.startBtn.source = "rdsg_startbtn_png";
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
                this.scrollerAni.play("", 0);
                this.scrollerAni.horizontalCenter = 0;
                this.scrollerAni.bottom = 100;
                this.effectGroup2.addChild(this.scrollerAni);
                this.scrollerAni.resetPosition();
                SoundManager.getInstance().playEffect("rdsg_reel_mp3", true);
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
            // else if (this.runningType == RUNNING_TYPE.LOOP) {
            //     let slotTips = slot.SlotAutoTips.instance;
            //     slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            //     this.resizeGroup.addChild(slotTips);
            //     let func = () => {
            //         CF.sN(PanelNotify.OPEN_RDSG_AUTO_PANEL);
            //         game.UIUtils.removeSelf(slotTips);
            //     }
            //     slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            // }
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
                this.startBtn.source = "rdsg_startbtn_png";
                this.scroller.runResultFast();
                for (let i = 1; i <= 4; i++) {
                    // this.scroller[`item${i}`].resetSpecilHui();
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
                if (this.scatter != 1) this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "rdsg_startbtn_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spinStopAni.play("", 1);
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
                this.startBtn.source = "rdsg_startbtn_png";
                // this.setBgColor();
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
            SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                    // this.scroller[`item${i}`].resetSpecilHui();
                    // }
                    // this.scroller.runResultFast();

                }
                // this.setBgColor();
                this.scroller.runResultFast();
                SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3");
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
            }
            this.clearAniPool();
            game.UIUtils.removeSelf(this.commomScore);
            this.scroller.visible = true;
            this.fastEnd = false;
            this.scroller.stopIconDb();
            egret.clearTimeout(this.removeScoreTimeout);
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
        }
        /**
        * 功能按钮屏蔽效果
        */
        private setOtherBtn() {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this[`quitBtn`].touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = false;
        }
        /**
         * 功能按钮效果还原
         */
        private resetOtherBtn() {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this[`quitBtn`].touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = true;
        }
        /**
        * 开始按钮动画
        */
        private setStartBtn() {
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.spinRunningAni.play("", 0);
            this.spinGroup.addChild(this.spinRunningAni);
            this.spinRunningAni.resetPosition();
            this.spinStartAni.play("", 1);
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
        private yudiAtr: Array<number>;//scatter图标位置数组 
        private allAtr: Array<Array<number>>;//所有连线图标数组
        private scatter: number;//是否为scatter 
        private messageTimeOut: any;//收到消息后延迟停止转动timeout
        private fastEnd: boolean = false;
        private scatter3timeout: any;
        private scatter4timeout: any;
        private scatter5timeout: any;
        private autoGameTimeout: any;
        private showIconTimeOut: any; //每条连线循环播放的timeout
        public runningType: number = 3;//选择类型
        private sethuiTimeout: any; //icon置灰timeout
        private winGold: number = 0;
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel(); //中奖展示金额数字
        private removeScoreTimeout: any; //提前移除金额数字timeout
        private isStopAni: boolean = false;//播放stop动画flag
        private fastItemIndex: number = 0;
        private eachLineIconIndex: Array<number> = [] //20条线中奖连线中中奖的图标index
        private allLine: Array<Array<number>> = [] //20线总中奖连线
        private yudiAtr2: Array<number>;
        // private HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];

        /**
        * 发送c_bet请求
        */
        private async messageSend() {
            this.showAtr = [[], [], [], [], []];
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
            this.lineTime = 1500;
            //测试专用消息
            if (this.isTest) {
                if (this.spinTest == 1) {
                    data2 = { "spinType": this.spinTest, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                data2 = { "spinType": 0, "bet": game.RDSGUtils.bet, "lineCount": 20, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_RDSG);
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                return;
            }
            this.ownGold -= game.RDSGUtils.bet * 2;
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
            game.RDSGUtils.ToTalMoney = this.ownGold;
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
            this.lineTime = this.lineTime + this.bonusAtr.length * 400;
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
         * 每列转轴结束监听
         * @param  {egret.Event} e
         */
        private scrollerEnd(e: egret.Event) {
            let data = e.data;
            //场景判断
            if (data.sceneIndex != 1) {
                return;
            }
            let index = e.data.index;
            switch (index) {
                case 5:
                    this.isStopLine = false;
                    game.UIUtils.removeSelf(this.scrollerAni);
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "rdsg_startbtn_png";
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
                        // this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 5 && !this.isFastGame) this.scrollerItemFast(this.fastItemIndex);
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
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2) {
                            let atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            // this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd) return;
                            if (this.fastItemIndex == 4 && !this.isFastGame) this.scrollerItemFast(this.fastItemIndex);
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
                    if (this.fastEnd) return;
                    if (this.fastItemIndex == 3 && !this.isFastGame) this.scrollerItemFast(this.fastItemIndex);
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
        private bigWinPanel: RDSGBigwinGroup;
        private eachLineTimeOut: any;
        private removeLineTimeOUt: any;
        /**
        * 播放总连线
        */
        private checkBonusIcon() {
            //满足bigwin
            if (this.winGold >= (game.RDSGUtils.bet * 2) * 15) {
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
                                // this.scroller.setIconHui();
                                // this.scroller.removeIconHui(this.allAtr);
                                this.scroller.addBonusAni(this.allAtr, this.winGold);
                                this.winLine(this.winLineGroup, this.allLine);
                                this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, this.lineTime);
                                if (!game.LaohuUtils.isAutoGame) {
                                    egret.clearTimeout(this.eachLineTimeOut);
                                    this.eachLineTimeOut = egret.setTimeout(() => {
                                        this.addEachLineAni();
                                    }, this, this.lineTime)
                                }
                                if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                            }
                            if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) this.memuBtn.touchEnabled = this.maxBet.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this[`quitBtn`].touchEnabled = true;
                            if (this.scatter == 1) { egret.clearTimeout(this.eachLineTimeOut); this.addEachLineAni(); }
                        });
                    }

                    this.bigWinPanel = new RDSGBigwinGroup();
                    // let i;
                    // i = Math.floor(Math.random() * 2);
                    // SoundManager.getInstance().playEffect("bskg_role_cheer1_mp3");
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
                        // SoundManager.getInstance().playEffect("bskg_bom_mp3");
                        if (game.LaohuUtils.isAutoGame && this.scatter != 1) {
                            this.autoGameTimeout = egret.setTimeout(() => {
                                this.startBtnTouch();
                            }, this, this.lineTime);
                        }
                        if (this.scatter != 1) {
                            this.startBtn.touchEnabled = true; this.scroller.stopIconDb();
                            // this.scroller.setIconHui();
                            // this.scroller.removeIconHui(this.allAtr);
                            this.scroller.addBonusAni(this.allAtr, this.winGold);
                            this.winLine(this.winLineGroup, this.allLine);
                            this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, this.lineTime);
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
                    SoundManager.getInstance().playEffect("rdsg_win_mp3");
                    if (this.scatter == 1) this.runningType = RUNNING_TYPE.STOP;
                    // this.scroller.setIconHui();
                    // this.scroller.removeIconHui(this.allAtr);
                    this.winLine(this.winLineGroup, this.allLine);
                    this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.font = "rdsg_winnum_big_fnt";
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.gameGroup.addChild(this.commomScore);
                    this.removeScoreTimeout = egret.setTimeout(() => {
                        game.UIUtils.removeSelf(this.commomScore);
                        this.scroller.stopIconDb();
                        if (!game.LaohuUtils.isAutoGame || this.scatter == 1) this.addEachLineAni();
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }, this, this.lineTime);
                }
                //未中奖 
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        game.RDSGUtils.comm2FreeModel = this.showAtr;
                        SoundManager.getInstance().playEffect("rdsg_scat_mp3");
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "rdsg_icon_2");
                            SoundManager.getInstance().playEffect("rdsg_ding_mp3");
                        }
                        egret.setTimeout(() => {
                            CF.dP(ENo.RDSG_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            this[`quitBtn`].visible = false;
                        }, this, 4000);
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
        private addEachLineAni() {
            //非空判断
            this.clearAniPool();
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) { this[`quitBtn`].touchEnabled = false; this.resetStartBtn(); }
                this.scroller.stopIconDb();
                let count = 0;
                let eachLineArray: Array<Array<number>> = [];
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, (index, callback) => {
                    if (this.isStopAni) return;
                    eachLineArray = [];
                    // this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (let j = 0; j < index.length; j++) {
                        let k = j + 1;
                        // this.scroller[`item${k}`].resetIconHui(index[j]);
                        this.scroller[`item${k}`].showAni(index[j]);
                        this.commomScore.font = "rdsg_winnum_samll_fnt";
                        let data = Number(new Big(this.eachLineScore[count]).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        this.commomScore.verticalCenter = ((index[2] - 1)) * 163;
                        this.commomScore.horizontalCenter = 0;
                        this.commomScore.textAlign = "center";
                        // this.gameGroup.addChild(this[`lineImag`]);
                        this.gameGroup.addChild(this.commomScore);
                    }
                    //单一连线
                    if (this.bonusAtr.length == 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray.push(this.allLine[count]);
                        this.winLine(this.winLineGroup, eachLineArray);
                        this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                // this.scroller.setIconHui();
                                game.UIUtils.removeSelf(this.commomScore);
                            }, this, 2000)
                        }

                        this.showIconTimeOut = egret.setTimeout(callback, this, 2300);
                    }
                    //多条连线
                    if (this.bonusAtr.length > 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                        eachLineArray.push(this.allLine[count]);
                        this.winLine(this.winLineGroup, eachLineArray);
                        this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                // this.scroller.setIconHui();
                                this.scroller.stopIconDb();
                                game.UIUtils.removeSelf(this.commomScore);
                            }, this, 2000)
                        }
                        this.showIconTimeOut = egret.setTimeout(callback, this, 2300);
                    }
                    count++;
                    eachLineArray = [];
                }, () => {
                    //callback 判断结果是否为scatter
                    if (this.scatter == 1) {
                        game.UIUtils.removeSelf(this.commomScore);
                        this.runningType = RUNNING_TYPE.STOP;
                        this.removeLineTimeOUt = egret.setTimeout(this.clearAniPool, this, 2000);
                        // this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().playEffect("rdsg_scat_mp3");
                        for (let i = 0; i < this.yudiAtr2.length; i++) {
                            this.scroller.addFoGuang(this.yudiAtr2[i], this.yudiAtr[i], "rdsg_icon_2");
                            SoundManager.getInstance().playEffect("rdsg_ding_mp3");
                        }
                        game.RDSGUtils.comm2FreeModel = this.showAtr;
                        egret.setTimeout(() => {
                            CF.dP(ENo.RDSG_ENTER_FREE_GAME, { isfast: this.isFastGame });
                            this.resetOtherBtn();
                        }, this, 4000)
                        if (!game.LaohuUtils.isAutoGame) this.resetStartBtn();
                    }
                    else {
                        count = 0;
                        eachLineArray = [];
                        // this.scroller.setIconHui();
                        game.UIUtils.removeSelf(this.commomScore);
                        this.clearAniPool();
                        return this.addEachLineAni();
                    }

                })
            }
        }

        /**
         * 设置最大倍数
         */
        private setMaxBet() {
            let bet = game.RDSGUtils.bets[8];
            //金币是否满足条件
            if (2 * bet > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.RDSGUtils.bet = game.RDSGUtils.bets[8];
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            let data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.bet = 9;
            this.beishu.text = game.RDSGUtils.bet + "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }
        /**
        * 减少倍数
        */
        private reduceBet() {
            //倍数判断
            if (this.bet <= 1) {
                return;
            } else {
                game.LaohuUtils.totalWin = 0;
                this.bet -= 1;
                switch (this.bet) {
                    case 1:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[0];
                        break;
                    case 2:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[1];
                        break;
                    case 3:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[2];
                        break;
                    case 4:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[3];
                        break;
                    case 5:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[4];
                        break;
                    case 6:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[5];
                        break;
                    case 7:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[6];
                        break;
                    case 8:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[7];
                        break;
                    case 9:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[8];
                        break;
                    case 10:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this[`betTtipsGroup`].visible = true;
            this.beishu.text = game.RDSGUtils.bet + "";
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
        }
        private addBetFunc() {
            //是否超出倍数范围
            if (this.bet <= 8) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[0];
                        break;
                    case 2:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[1];

                        break;
                    case 3:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[2];
                        break;
                    case 4:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[3];
                        break;
                    case 5:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[4];
                        break;
                    case 6:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[5];
                        break;
                    case 7:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[6];
                        break;
                    case 8:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[7];
                        break;
                    case 9:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[8];
                        break;
                    case 10:
                        game.RDSGUtils.bet = game.RDSGUtils.bets[9];
                        break;
                }
            }
            let data = Number(new Big(game.RDSGUtils.bet).mul(2));
            this.totalBet.text = NumberFormat.handleFloatDecimal(data) + "";
            this.beishu.text = game.RDSGUtils.bet + "";
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * game.RDSGUtils.bet * 4000 + ""); "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if ((game.RDSGUtils.bet * 2) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        }

        public isFreeBack: boolean = false;

        /**
         * 开始免费游戏
         */
        private startAutoGame() {
            //余额判断
            if (game.RDSGUtils.bet * 2 > this.ownGold) {
                this.isFreeBack = false;
                this.startBtn.source = "rdsg_startbtn_png";
                this.timesLabel.text = "";
                game.LaohuUtils.downTime2 = 400;
                game.LaohuUtils.downTime3 = 800;
                game.LaohuUtils.downTime4 = 1200;
                game.LaohuUtils.downTime5 = 1600;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
                this.resetStartBtn();
                this.resetOtherBtn();
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefaultAni);
            this.startBtn.source = "rdsg_stopbtn_png";
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
         * 部分转轴加速
         * @param  {number} index
         */
        public scrollerItemFast(index: number) {
            if (this.isFastGame) return;
            let item3 = this.scroller[`item${3}`];
            let item4 = this.scroller[`item${4}`];
            let item5 = this.scroller[`item${5}`];
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(3, 0);
                    this.scroller.speed = 85;
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
                        egret.clearTimeout(this.autoGameTimeout);
                    }, this, 9000);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(4, 0);
                    this.scroller.speed = 85;
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
                        egret.clearTimeout(this.autoGameTimeout);
                    }, this, 6000);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(5, 0);
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect("rdsg_reel_fast_spin_mp3", true)
                    this.scatter5timeout = egret.setTimeout(() => {
                        item5.changeResult(this.showAtr[4]);
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName("rdsg_reel_fast_spin_mp3")
                        egret.clearTimeout(this.autoGameTimeout);
                    }, this, 3000);
                    break;
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
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.RDSGUtils.ToTalMoney) + "";
            this.ownGold = game.RDSGUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.RDSGUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.LaohuUtils.freeWin = 0;
            SoundManager.getInstance().playMusic("rdsg_background_mus_mp3");
            if (this[`quitBtn`]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this[`quitBtn`].visible = true;;
                }
            }
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "rdsg_startbtn_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.RDSGUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "rdsg_startbtn_png";
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
                    this.startBtn.source = "rdsg_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
                    this.startBtn.source = "rdsg_startbtn_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("rdsg_reel_mp3");
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
        public isStopLine: boolean = false;
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
                            if (!this.isStopLine) this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);

                            break;
                        case 1:
                            if (!this.isStopLine) this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);

                            break;
                        case 0:
                            if (!this.isStopLine) this.midLineHandle(object, this.atr2[this.i]);
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
                if (!this.isStopLine) rdsgLineHuge.play("rdsg_line_huge_2", 0);
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
                if (!this.isStopLine) rdsgLineBig.play("rdsg_line_big_2", 0);
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
                if (!this.isStopLine) rdsgLineMid.play("rdsg_line_mid_2", 0);
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
                if (!this.isStopLine) rdsgLineSmall.play("rdsg_line_small_2", 0);
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
                if (!this.isStopLine) rdsgLineSmall.play("rdsg_line_small_2", 0);
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

        public clickTime: number = 0;
        public isFastGame: boolean = false;

        public askAutoGame() {
            let slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            game.LaohuUtils.isTips = true;
            if (game.LaohuUtils.isAutoGame) {
                egret.clearTimeout(this.autoGameTimeout);
            }
            let func = () => {
                // CF.sN(this.AUTOGAME_NOTIFY);
                if (game.LaohuUtils.isAutoGame) this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                this.clickTime = 0;
            }
            let func2 = () => {
                if (game.LaohuUtils.isAutoGame) this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, this.lineTime);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            }
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        }
    }
}