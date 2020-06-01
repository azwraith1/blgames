/*
 * @Author: real MC Lee 
 * @Date: 2019-06-28 16:02:17 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 17:40:14
 * @Description: 
 */

module sdmn {
    export class SDMNScene1 extends game.BaseScene {
        public resizeGroup: eui.Group;
        public gameGroup: eui.Group;
        public bottomGroup: eui.Group;
        public tipsBtn: eui.Button;
        public menuBtn: eui.Button;
        public maxBetBtn: eui.Image;
        public playerGold: eui.Label;
        public winNum: eui.Label;
        public subbet: eui.Button;
        public addbet: eui.Button;
        public totalBet: eui.Label;
        public spinGroup: eui.Group;
        public autoGameBtn: eui.Button;
        public startBtn: eui.Image;
        public timesLabel: eui.BitmapLabel;
        public scroller: SDMNScroller;
        public betTtipsGroup: eui.Group
        public maxWinLabel: eui.Label;
        public testGroup: eui.Group;
        public pscen1: eui.EditableText;
        public startBtn0: eui.Button;
        public spinresult: eui.EditableText;
        public lable2: eui.Label;
        public lable1: eui.Label;
        public sdmnBg: eui.Image;
        public sdmnBg1: eui.Image;

        private ownGold: number; //玩家当前金钱
        private spinDefAni: DBComponent; // 默认旋转动画
        private spinRunAni: DBComponent;// 旋转动画
        private spinGuang: DBComponent;// 旋转光
        private spin2stopAni: DBComponent;//旋转停止效果
        private winGoldDiAni: DBComponent;//奖励数字下特效
        private bet: number = 1;
        public clickTime: number = 0;
        public isFastGame: boolean = false;
        public lineTime: number;

        public constructor() {
            super();
            this.skinName = "SDMNScene1Skin";
        }
        public createChildren() {
            super.createChildren();
            // this.addSakuraHeadDown();
            this.scroller.showFirst(1);
            this.startGame();
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
            //判断是否为pc端
            let isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            if (Global.playerProxy.playerData.nickname == "test004" || Global.playerProxy.playerData.nickname == "test001" || Global.playerProxy.playerData.nickname == "test002" || Global.playerProxy.playerData.nickname == "test003" || Global.playerProxy.playerData.nickname == "test005" || Global.playerProxy.playerData.nickname == "test006" || Global.playerProxy.playerData.nickname == "test007" || Global.playerProxy.playerData.nickname == "test008" || Global.playerProxy.playerData.nickname == "test009" || Global.playerProxy.playerData.nickname == "test010") {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.QA_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.testGroup.visible = true;
                }
            }
            if (ServerConfig.OP_RETURN_TYPE == "3") {
                this[`quitBtn`].visible = false;
            }
            egret.setInterval(this.changeBg, this, 10000);
            this.initAnis();
        }
        public onAdded() {
            super.onAdded();
            SoundManager.getInstance().playMusic("sdmn_background_mus_mp3");
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SDMN_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.aE(ENo.AUTO_GAME, this.startAutoGame, this);
        }
        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SDMN_ENTER_COMMOM_GAME, this.free2Commom, this);
            CF.rE(ENo.AUTO_GAME, this.startAutoGame, this);
            egret.clearInterval(this.timer3);
            this.timer3 = null;
            this.scroller.removeScroller();
            this.removeEvent();
            egret.clearTimeout(this.eachLineTimeOut);
            egret.clearTimeout(this.showIconTimeOut);
            ObjectPool.cancelPool("sdmn_big_sakura");
            this.effectGroup.removeChildren();
            this.resizeGroup.removeChildren();
        }

        private bgSourceIndex: number = 2;
        private changeBg() {
            if (this.sdmnBg.alpha == 1) {
                egret.Tween.get(this.sdmnBg).to({ alpha: 0 }, 3000);
                if (this.bgSourceIndex == 4) this.bgSourceIndex = 0;
                this.bgSourceIndex += 1;
                this.sdmnBg1.source = "sdmn_bg_" + this.bgSourceIndex + "_png";
                egret.Tween.get(this.sdmnBg1).to({ alpha: 1 }, 3000);
            } else {
                if (this.bgSourceIndex == 4) this.bgSourceIndex = 0;
                this.bgSourceIndex += 1;
                this.sdmnBg.source = "sdmn_bg_" + this.bgSourceIndex + "_png";
                egret.Tween.get(this.sdmnBg).to({ alpha: 1 }, 3000);
                egret.Tween.get(this.sdmnBg1).to({ alpha: 0 }, 3000);
            }

        }

        /**
       * 鼠标手势库
       */
        public addMouseOnEvent() {
            this.menuBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.menuBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.settingBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.settingBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBetBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBetBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this[`quitBtn`].addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this[`quitBtn`].addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }
        public removeEvent() {
            this.menuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeMenuBtn, this);
            this.menuBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeMenuBtn2, this);
            this.settingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changesettingBtn, this);
            this.settingBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changesettingBtn2, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changetipsBtn, this);
            this.tipsBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changetipsBtn2, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetAddBtn, this);
            this.addbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetAddBtn2, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeBetSubBtn, this);
            this.subbet.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeBetSubBtn2, this);
            this.maxBetBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeyazhuBtn, this);
            this.maxBetBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeyazhuBtn2, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeAutoRunBtn, this);
            this.autoGameBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeAutoRunBtn2, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeGameRecord, this);
            this.recordBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeGameRecord2, this);
            this[`quitBtn`].removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this[`quitBtn`].removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }

        private changeMenuBtn() {
            this.menuBtn.currentState = "down";
        }
        private changeMenuBtn2() {
            this.menuBtn.currentState = "up";
        }
        private changesettingBtn() {
            this.settingBtn.currentState = "down";
        }
        private changesettingBtn2() {
            this.settingBtn.currentState = "up";
        }
        private changetipsBtn() {
            this.tipsBtn.currentState = "down";
        }
        private changetipsBtn2() {
            this.tipsBtn.currentState = "up";
        }
        private changeBetAddBtn() {
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
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
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.subbet.currentState = "down";
            this[`betTtipsGroup`].visible = true;
        }
        private changeBetSubBtn2() {
            this.subbet.currentState = "up";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false; }, this, 5000)
        }
        private changeyazhuBtn() {
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.maxBetBtn.source = RES.getRes("sdxl_bet2_png");
        }
        private changeyazhuBtn2() {
            this.maxBetBtn.source = RES.getRes("sdxl_bet1_png");
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
         * 开始游戏，请求数据
         */
        public async startGame() {
            let resp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
            let data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": 1004 }
            let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data);
            //消息判断
            if (resp) {
                if (resp.error.code != 0) {
                    let text = resp.error.msg;
                    CF.sN(SceneNotify.CLOSE_SDMN);
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    Global.alertMediator.addAlert(text, () => {

                    }, "", true);
                    return;
                }
            }
            else {
                CF.sN(SceneNotify.CLOSE_SDMN);
                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
            }
        }
        /**
         * 进入游戏消息
         * @param  {egret.Event} e
         */
        public enterGame(e: egret.Event) {
            let resp = e.data;
            game.SDMNUtils.bets = [];
            game.SDMNUtils.muls = [];
            let playerIdnex = resp.playerInfo.playerIndex;
            let players: any = {};
            for (let key in resp.roomInfo.players) {
                if (key == playerIdnex) {
                    players = resp.roomInfo.players[key];
                }
            }
            for (let i = 0; i < resp.roomInfo.gamePayTable.bets.length; i++) {
                game.SDMNUtils.bets.push(resp.roomInfo.gamePayTable.bets[i]);
            }
            for (let j = 0; j < resp.roomInfo.gamePayTable.muls.length; j++) {
                game.SDMNUtils.muls.push(resp.roomInfo.gamePayTable.muls[j]);
            }
            game.SDMNUtils.bet = game.SDMNUtils.bets[0];
            game.SDMNUtils.mul = game.SDMNUtils.muls[0];
            //免费游戏倍数
            if (resp.roomInfo.gamePayTable) {
                game.SDMNUtils.FreeTimeMul = [];
                for (let k = 0; k < resp.roomInfo.gamePayTable.freeGameMuls.length; k++) {
                    game.SDMNUtils.FreeTimeMul.push(resp.roomInfo.gamePayTable.freeGameMuls[k]);
                }
                game.SDMNUtils.FreeTimeMulIndex = players.freeMulIndex;
                game.SDMNUtils.FreeTimeMul = game.SDMNUtils.FreeTimeMul[game.SDMNUtils.FreeTimeMulIndex];
                game.SDMNUtils.freeTimes = players.freeTimes;
            }
            //判断是否为免费游戏
            if (players.isScatter == 1 && players.freeTimes == 0) {
                game.SDMNUtils.bet = players.lastBet;
                game.SDMNUtils.mul = players.lastMul;
                CF.dP(ENo.SDMN_ENTER_FREE_GAME_SCENE);
            } else if (players.isScatter == 0 && players.freeTimes != 0) {
                game.LaohuUtils.freeWin = players.freeWinGold;
                game.LaohuUtils.freeTimes = players.freeTimes;
                game.SDMNUtils.bet = players.lastBet;
                game.SDMNUtils.mul = players.lastMul;
                CF.dP(ENo.SDMN_START_FREE_GAME_SCENE);
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
            game.SDMNUtils.ToTalMoney = this.ownGold;

            //重连后倍数判断
            switch ((game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) {
                case 0.5:
                    this.bet = 1;
                    break;
                case 1:
                    this.bet = 2;
                    break;
                case 2:
                    this.bet = 3;
                    break;
                case 5:
                    this.bet = 4;
                    break;
                case 10:
                    this.bet = 5;
                    break;
                case 15:
                    this.bet = 6;
                    break;
                case 30:
                    this.bet = 7;
                    break;
                case 50:
                    this.bet = 8;
                    break;
                case 70:
                    this.bet = 9;
                    break;
                case 100:
                    this.bet = 10;
                    break;
            }
            this[`beishu`].text = parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.SDMNUtils.bet * game.SDMNUtils.mul * 50) + "";
            this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";

        }

        private aniAtr: Array<any>;
        /**
         * 初始化游戏特效
         */
        private initAnis() {
            this.spinDefAni = DBComponent.create("sdmn_spinDefAni", "sdmn_spin_defult");
            this.spinRunAni = DBComponent.create("sdmn_spinRunAni", "sdmn_spin_run");
            this.spinGuang = DBComponent.create("sdmn_spinGuang", "sdmn_spin_1");
            this.spin2stopAni = DBComponent.create("sdmn_spin2stopAni", "sdmn_spin_stop");
            this.winGoldDiAni = DBComponent.create("sdmn_winGoldDiAni", "sdxl_gold_diguang");
            this.scoreAni = DBComponent.create("sdmn_scoreAni", "sdxl_gold_diguang");
            game.SDMNUtils.bgAni3 = DBComponent.create("sdmn_bgAni3", "sdmn_bigwin3");
            this.aniAtr = [];
            this.aniAtr.push(this.spinDefAni);
            this.aniAtr.push(this.spinRunAni);
            this.aniAtr.push(this.spinGuang);
            this.aniAtr.push(this.spin2stopAni);
            this.aniAtr.push(this.winGoldDiAni);
            this.aniAtr.push(this.scoreAni);
            this.scoreAni.horizontalCenter = 0;
            this.scoreAni.bottom = 120;
            this.spinDefAni.touchEnabled = this.spinRunAni.touchEnabled = this.spinGuang.touchEnabled = this.spin2stopAni.touchEnabled = false;

            this.winGoldDiAni.horizontalCenter = 0;
            this.winGoldDiAni.bottom = 380;

            this.spinDefAni.play("", 0);
            this.spinDefAni.horizontalCenter = 0;
            this.spinDefAni.bottom = 40;
            this.spinGroup.addChild(this.spinDefAni);
            this.spinDefAni.resetPosition();

            this.spinRunAni.horizontalCenter = 0;
            this.spinRunAni.bottom = 40;

            this.spinGuang.horizontalCenter = 0;
            this.spinGuang.bottom = 53;

            this.spin2stopAni.horizontalCenter = 0;
            this.spin2stopAni.bottom = 90;

        }

        /**
         * 点击事件
         * @param  {egret.TouchEvent} e
         */
        public onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                //spin按钮
                case this.startBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.startBtnTouch();
                    break;
                //退出按钮
                case this[`quitBtn`]:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.leaveSDMN();
                    break;
                //最大bet按钮
                case this.maxBetBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.setMaxBet();
                    break;
                //赔付表按钮
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.opensdmnTips();
                    break;
                //减少bet按钮
                case this.subbet:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.reduceBet();
                    break;
                //增加bet按钮
                case this.addbet:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.addBetFunc();
                    break;
                //自动游戏窗口
                case this.autoGameBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_SDMN_AUTO_PANEL);
                    break;
                //转轴快速停止
                case this[`maskRect`]:
                    this.scrollerFastGame();
                    break;
                //菜单按钮
                case this.menuBtn:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    if (this[`menuGroup`].visible == false) {
                        this[`menuGroup`].visible = true;
                    } else {
                        this[`menuGroup`].visible = false;
                    }
                    break;
                //游戏记录按钮
                case this[`recordBtn`]:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    this.openGameRecord();
                    this[`menuGroup`].visible = false;
                    break;
                //游戏设置按钮
                case this[`settingBtn`]:
                    SoundManager.getInstance().playEffect("sdmn_button_mp3");
                    CF.sN(PanelNotify.OPEN_SETTING);
                    this[`menuGroup`].visible = false;
                    break;
                //测试按钮
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        }

        private showIconTimeOut: any; //每条连线循环播放的timeout
        public runningType: number = 3;//选择类型
        private sethuiTimeout: any; //icon置灰timeout
        private isStopAni: boolean = false;//播放stop动画flag
        /**
         * spin按钮点击处理
         */
        public startBtnTouch() {
            //判断余额
            let data1 = Number(new Big(game.SDMNUtils.bet * game.SDMNUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, () => {
                    this.resetOtherBtn();
                    Global.playerProxy.playerData.gold = this.ownGold;
                    if (game.LaohuUtils.isAutoGame) {
                        this.resetStartBtn();
                        this.startBtn.source = "sdmn_spin1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.isAutoGame = false;
                        game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                        game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                    }
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
                        this.startBtn.source = "sdmn_spin1_png";
                        this.timesLabel.text = "";
                        game.LaohuUtils.downTime2 = 400;
                        game.LaohuUtils.downTime3 = 800;
                        game.LaohuUtils.downTime4 = 1200;
                        game.LaohuUtils.downTime5 = 1600;
                        game.LaohuUtils.speed = 48;
                        this.runningType = RUNNING_TYPE.EMPTY;
                        SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                        this.resetStartBtn();
                        return;
                    }
                    //判断是否为免费游戏并且是否有满足总下注条件
                    if (game.LaohuUtils.totalAdd && game.LaohuUtils.isAutoGame) {
                        if (game.LaohuUtils.totalBet >= game.LaohuUtils.totalAdd) {
                            game.LaohuUtils.isAutoGame = false;
                            game.LaohuUtils.free_time_times = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                            this.resetOtherBtn();
                            this.startBtn.source = "sdmn_spin1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
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
                            this.startBtn.source = "sdmn_spin1_png";
                            this.timesLabel.text = "";
                            game.LaohuUtils.downTime2 = 400;
                            game.LaohuUtils.downTime3 = 800;
                            game.LaohuUtils.downTime4 = 1200;
                            game.LaohuUtils.downTime5 = 1600;
                            game.LaohuUtils.speed = 48;
                            this.runningType = RUNNING_TYPE.EMPTY;
                            SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                            this.resetStartBtn();
                            return;
                        }
                    }
                    game.LaohuUtils.auto_times -= 1;
                    this.timesLabel.visible = true;
                    this.timesLabel.text = game.LaohuUtils.auto_times + "";
                    game.LaohuUtils.totalBet += game.SDMNUtils.bet * game.SDMNUtils.mul * 50
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
                    this.startBtn.source = "sdmn_spin1_png";
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
                SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
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
            //         CF.sN(PanelNotify.OPEN_SDMN_AUTO_PANEL);
            //         game.UIUtils.removeSelf(slotTips);
            //     }
            //     slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            // }
        }
        /**
		 * 测试按钮
		 */
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
        private eachLineTimeOut: any
        /**
         * 上次游戏效果移除
         */
        public removeLastAni() {
            if (this.winGold > 0) {
                egret.clearTimeout(this.sethuiTimeout);
                for (let i = 1; i <= 5; i++) {
                    this.scroller[`item${i}`].resetSpecilHui();
                }
            }
            game.UIUtils.removeSelf(this.commomScore);
            game.UIUtils.removeSelf(this.scoreAni);
            // this.lineScoreGroup.visible = false;
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
            this.menuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBetBtn.filters = [colorFlilter];
            this[`quitBtn`].touchEnabled = this.menuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBetBtn.touchEnabled = false;
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
            this.menuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBetBtn.filters = [colorFlilter];
            this[`quitBtn`].touchEnabled = this.menuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBetBtn.touchEnabled = true;
        }
        /**
         * 开始按钮动画
         */
        private setStartBtn() {
            game.UIUtils.removeSelf(this.spinDefAni);
            this.spinRunAni.play("", 0);
            this.spinGroup.addChild(this.spinRunAni);
            this.spinRunAni.resetPosition();
            this.spinGuang.play("", 1);
            this.spinGroup.addChild(this.spinGuang);
            this.spinGuang.resetPosition();
        }
        /**
         * 还原开始按钮
         */
        private resetStartBtn() {
            game.UIUtils.removeSelf(this.spinRunAni);
            this.spinDefAni.play("", 0);
            this.spinGroup.addChild(this.spinDefAni);
            this.spinDefAni.resetPosition();
        }
        /**
		 * 快速结束转动
		 */
        private fastGame() {
            //转轴加速情况
            if (this.scatterIcon >= 2) {
                this.fastEnd = true;
                egret.clearTimeout(this.scatter4timeout);
                egret.clearTimeout(this.scatter5timeout);

                this.scroller.removeScatterAni();
                this.scroller.item4.speed = 48;
                this.scroller.item5.speed = 48;
                this.startBtn.source = "sdmn_spin1_png";
                this.scroller.runResultFast();
            }
            //自动游戏情况
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.speed = 48;
                egret.clearTimeout(this.autoGameTimeout);
                if (this.scatter != 1) this.resetOtherBtn();
                this.resetStartBtn();
                this.timesLabel.text = "";
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.auto_times = 0;
                this.startBtn.source = "sdmn_spin1_png";
                game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totalAdd = 0;
                game.LaohuUtils.totalBet = 0;
                this.spin2stopAni.play("", 1);
                this.spinGroup.addChild(this.spin2stopAni);
                this.spin2stopAni.resetPosition();

                this.spin2stopAni.callback = () => {
                    game.UIUtils.removeSelf(this.spin2stopAni);
                }
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                this.scroller.runResultFast();
            }
            //其他情况下，正常处理快速停止
            else {
                this.startBtn.source = "sdmn_spin1_png";
                if (this.scroller.runResultFast()) {
                    this.runningType = RUNNING_TYPE.LOOP;
                }

            }
            for (let i = 1; i <= 4; i++) {
                this.scroller[`item${i}`].resetSpecilHui();
            }

            SoundManager.getInstance().stopEffectByName("sdmn_reel_fast_mp3");
            SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
        }
		/**
		 * 点击转轴区域快速停止游戏
		 */
        public scrollerFastGame() {
            //是否已经收到消息
            if (this.runningType == RUNNING_TYPE.RESULT) {
                if (this.scatterIcon >= 2) {
                    this.fastEnd = true;
                    egret.clearTimeout(this.scatter4timeout);
                    egret.clearTimeout(this.scatter5timeout);
                    this.scroller.removeScatterAni();
                    this.scroller.item4.speed = 48;
                    this.scroller.item5.speed = 48;

                }
                this.scroller.runResultFast();
                for (let i = 1; i <= 4; i++) {
                    this.scroller[`item${i}`].resetSpecilHui();
                }
                SoundManager.getInstance().stopEffectByName("sdmn_reel_fast_mp3");
                SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
            }
        }

        private HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
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
                    if (this.showAtr) {
                        //自动游戏是否满足单次赢取条件
                        if (game.LaohuUtils.oneMax && game.LaohuUtils.isAutoGame) {
                            if (this.winGold >= game.LaohuUtils.oneMax) {
                                game.LaohuUtils.isAutoGame = false;
                                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                                this.resetOtherBtn();
                                this.startBtn.source = "sdmn_spin1_png";
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
                                    for (let j = 0; j < 3; j++) {
                                        if (this.showAtr[2][j] == 2) {
                                            for (let k = 0; k < 3; k++) {
                                                if (this.showAtr[0][k] == 2) {
                                                    SoundManager.getInstance().playEffect("sdmn_scat_appear_mp3");
                                                    this.scroller.addFoGuang1(5, i, "sdmn_icon_2_guang");
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                                }
                            }
                        }
                        this.scroller.removeIconHui(this.HuiAtr);
                        this.playerGold.text = NumberFormat.handleFloatDecimal(this.ownGold) + "";
                        game.SDMNUtils.ToTalMoney = this.ownGold;
                        this.winNum.text = this.winGold + "";
                        SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                        //自动游戏自动次数大于0
                        if (game.LaohuUtils.auto_times >= 0 && game.LaohuUtils.isAutoGame) {
                            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
                            if (this.scatter == 1) {
                                this[`quitBtn`].touchEnabled = false;
                                this.checkBonusIcon();
                                return;
                            }
                            egret.setTimeout(() => {
                                LogUtils.logD("empty4");
                                if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
                            }, this, 500);
                            if (this.winGold > 0) {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 2000);
                            } else {
                                this.autoGameTimeout = egret.setTimeout(this.startBtnTouch, this, 1000);
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
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 3:
                    for (let i = 0; i < this.showAtr[2].length; i++) {
                        //判断第三列上是否有scatter
                        if (this.showAtr[2][i] == 2) {
                            for (let j = 0; j < 3; j++) {
                                if (this.showAtr[0][j] == 2) {
                                    SoundManager.getInstance().playEffect("sdmn_scat_appear_mp3");
                                    this.scroller.addFoGuang1(3, i, "sdmn_icon_2_guang");
                                }
                            }

                        } else {
                            SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                        }
                    }
                    if (this.showAtr) {
                        //第四列第五列转轴加速
                        if (this.scatterIcon >= 2 && !this.isFastGame) {
                            let atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];
                            this.scroller.setSpecilHui(atr);
                            //快速停止则跳过加速并且四五列特效
                            if (this.fastEnd) return;
                            this.scroller.item4.clearDownTimeOut();
                            this.scroller.item5.clearDownTimeOut();
                            this.scroller.item4.speed = 85;
                            this.scroller.item5.speed = 85;
                            this.scroller.addScatterAni(4);
                            this.scroller.speed = 85;
                            let item4 = this.scroller[`item${4}`];
                            let item5 = this.scroller[`item${5}`];
                            SoundManager.getInstance().playEffect("sdmn_reel_fast_mp3", true)
                            if (!Global.runBack) {
                                this.scatter4timeout = egret.setTimeout(() => {
                                    item4.changeResult(this.showAtr[3]);
                                    this.scroller.removeScatterAni(4);
                                    this.scroller.addScatterAni(5);
                                    this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                                }, this, 4000);
                                this.scatter5timeout = egret.setTimeout(() => {
                                    item5.changeResult(this.showAtr[4]);
                                    this.scroller.removeScatterAni(5);
                                    SoundManager.getInstance().stopEffectByName("sdmn_reel_fast_mp3")
                                    egret.clearTimeout(this.autoGameTimeout);
                                    this.scroller.removeIconHui(this.HuiAtr);
                                }, this, 8000);
                            }
                        }
                    }

                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 1:
                    for (let i = 0; i < this.showAtr[0].length; i++) {
                        //判断第1列上是否有scatter
                        if (this.showAtr[0][i] == 2) {
                            SoundManager.getInstance().playEffect("sdmn_scat_appear_mp3");
                            this.scroller.addFoGuang1(1, i, "sdmn_icon_2_guang");
                        } else {
                            SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                        }
                    }
                    break;
            }
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
        private scatter4timeout: any;
        private scatter5timeout: any;
        private autoGameTimeout: any;
        private winGold: number = 0;

        /**
        * 发送c_bet请求
        */
        private async messageSend() {
            this.showAtr = [];
            this.bonusAtr = [];
            this.scatterIcon = 0;
            this.eachLineScore = [];
            this.yudiAtr = [];
            this.allAtr = [];
            this.scatter = 0;
            let data2: any;
            //测试专用消息
            if (this.isTest) {
                if (this.spinTest == 1) {
                    data2 = { "spinType": this.spinTest, "bet": game.SDMNUtils.bet, "multiple": game.SDMNUtils.mul, "lineCount": 243, "activityId": 0, "freeWheel": this.wheel };
                } else {
                    data2 = { "spinType": this.spinTest, "bet": game.SDMNUtils.bet, "multiple": game.SDMNUtils.mul, "lineCount": 243, "activityId": 0, "wheel": this.wheel };
                }
            } else {
                //, "wheel": [[1, 2, 3], [4, 5, 6], [7, 2, 8], [9, 10, 11], [12, 12, 2]] 
                data2 = { "spinType": 0, "bet": game.SDMNUtils.bet, "multiple": game.SDMNUtils.mul, "lineCount": 243, "activityId": 0 };
            }
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SDMN);
                SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                return;
            }
            let data1 = Number(new Big(game.SDMNUtils.bet * game.SDMNUtils.mul).mul(50));
            this.ownGold -= NumberFormat.handleFloatDecimal(data1);
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
            }, this, 100);
            this.runningType = RUNNING_TYPE.RESULT;
            this.winGold = resp2.winCount;
            this.ownGold = resp2.own_gold;
            if (this.winGold > 0) { this.lineTime = 2000 } else { this.lineTime = 1000 }
            game.SDMNUtils.ToTalMoney = resp2.own_gold;
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
                        }
                    }
                }
            }
            //免费游戏情况下累加赢取金额
            if (game.LaohuUtils.isAutoGame) {
                game.LaohuUtils.totoalWinGold += this.winGold;
            }
            this.isStopAni = false;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < this.showAtr[i].length; j++) {
                    //判断前三列几个玉帝
                    if (this.showAtr[i][j] == 2) {
                        this.scatterIcon++;
                    } else {
                        this.startBtn.touchEnabled = true;
                        this.scroller.touchEnabled = true;
                    }
                }
            }
        }
        public isFreeBack: boolean = false;

        /**
         * 开始免费游戏
         */
        private startAutoGame() {
            //余额判断
            if (game.SDMNUtils.bet * game.SDMNUtils.mul * 50 > this.ownGold) {
                this.isFreeBack = false;
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.UIUtils.removeSelf(this.spinDefAni);
            this.startBtn.source = "sdmn_spin2_png";
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
            this.playerGold.text = NumberFormat.handleFloatDecimal(game.SDMNUtils.ToTalMoney) + "";
            this.ownGold = game.SDMNUtils.ToTalMoney;
            game.LaohuUtils.totoalWinGold += game.SDMNUtils.freeWin;
            this.winGold = game.LaohuUtils.freeWin;
            this.winNum.text = NumberFormat.handleFloatDecimal(this.winGold) + "";
            game.SDMNUtils.freeWin = 0;
            if (this[`quitBtn`]) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this[`quitBtn`].visible = true;;
                }
            }
            SoundManager.getInstance().playMusic("sdmn_background_mus_mp3");
            //是否满足免费游戏停止条件
            if (game.LaohuUtils.stopAuto) {
                game.LaohuUtils.stopAuto = false;
                game.LaohuUtils.isAutoGame = false;
                game.LaohuUtils.free_time_times = game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = game.LaohuUtils.oneMax = 0;
                game.LaohuUtils.totoalWinGold = game.LaohuUtils.totalWin = 0;
                game.LaohuUtils.speed = 48;
                this.runningType = RUNNING_TYPE.EMPTY;
                this.startBtn.source = "sdmn_spin1_png";
                this.timesLabel.text = "";
                this.resetStartBtn();
                this.resetOtherBtn();
            }
            if (game.LaohuUtils.oneMax && game.SDMNUtils.freeWin >= game.LaohuUtils.oneMax) {
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
                this.startBtn.source = "sdmn_spin1_png";
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
                    this.startBtn.source = "sdmn_spin1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
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
                    this.startBtn.source = "sdmn_spin1_png";
                    this.timesLabel.text = "";
                    game.LaohuUtils.downTime2 = 400;
                    game.LaohuUtils.downTime3 = 800;
                    game.LaohuUtils.downTime4 = 1200;
                    game.LaohuUtils.downTime5 = 1600;
                    game.LaohuUtils.speed = 48;
                    this.runningType = RUNNING_TYPE.EMPTY;
                    SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                    this.resetStartBtn();
                    return;
                }
            }
            //继续自动游戏
            if (game.LaohuUtils.isAutoGame) {
                game.UIUtils.removeSelf(this.spinDefAni);
                this.isFreeBack = true;
                egret.setTimeout(() => { this.startAutoGame(); }, this, 1000);
            }
            else {
                this.resetOtherBtn();
            }

        }

        private removeScoreTimeout: any;
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel();
        private bigWinPanel: SDMNBigwinPanel;
        private scoreAni: DBComponent;
        /**
         * 播放总连线
         */
        private checkBonusIcon() {
            //满足bigwin
            if (this.winGold >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
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
                                }, this, 2000);
                            }
                            if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                            if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) this.menuBtn.touchEnabled = this.maxBetBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this[`quitBtn`].touchEnabled = true;
                            if (this.scatter == 1) { egret.clearTimeout(this.eachLineTimeOut); this.addEachLineAni(); }
                            if (this.scatter != 1) {
                                // this.scroller.setIconHui();
                                // this.scroller.removeIconHui(this.allAtr);
                                this.scroller.addBonusAni(this.allAtr, this.winGold);
                                if (!game.LaohuUtils.isAutoGame) {
                                    egret.clearTimeout(this.eachLineTimeOut);
                                    this.eachLineTimeOut = egret.setTimeout(() => {
                                        this.addEachLineAni();
                                    }, this, 2000)
                                    if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                                }
                            }
                        });
                        //未中scatter，播放一次总连线
                    }
                    this.bigWinPanel = new SDMNBigwinPanel();

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
                            }, this, 2000);
                        }
                        if (this.scatter != 1) {
                            this.startBtn.touchEnabled = true; this.scroller.stopIconDb();
                            // this.scroller.setIconHui();
                            // this.scroller.removeIconHui(this.allAtr);
                            this.scroller.addBonusAni(this.allAtr, this.winGold);
                            if (!game.LaohuUtils.isAutoGame) {
                                egret.clearTimeout(this.eachLineTimeOut);
                                this.eachLineTimeOut = egret.setTimeout(() => {
                                    this.addEachLineAni();
                                }, this, 2000)
                                if (this.clickTime >= 3 && !game.LaohuUtils.isTips) { this.askAutoGame() };
                            }
                        }
                        if (this.scatter != 1 && !game.LaohuUtils.isAutoGame) {
                            this.menuBtn.touchEnabled = this.maxBetBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this[`quitBtn`].touchEnabled = true;
                        }
                        if (!game.LaohuUtils.isAutoGame) { this.runningType = RUNNING_TYPE.EMPTY; }
                        if (this.scatter == 1) { egret.clearTimeout(this.eachLineTimeOut); this.addEachLineAni(); }
                        game.UIUtils.removeSelf(this.bigWinPanel);
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            //未中bigwin 

            //中奖
            else {
                //展示图标非空判断
                if (this.bonusAtr.length > 0 && this.winGold > 0) {
                    SoundManager.getInstance().playEffect("sdmn_win_mp3");
                    if (this.scatter == 1) this.runningType = RUNNING_TYPE.STOP;
                    // this.scroller.setIconHui();
                    // this.scroller.removeIconHui(this.allAtr);
                    this.scroller.addBonusAni(this.allAtr, this.winGold);
                    this.scoreAni.play("", 1);
                    this.scroller.addChild(this.scoreAni);
                    this.scoreAni.resetPosition();
                    this.commomScore.font = "sdmn_wingold_big_fnt";
                    let data = Number(new Big(this.winGold).mul(100));
                    this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
                    this.commomScore.textAlign = "center";
                    this.commomScore.verticalCenter = 0;
                    this.commomScore.horizontalCenter = 0;
                    this.gameGroup.addChild(this[`lineImag`]);
                    this.gameGroup.addChild(this.commomScore);
                    // this.sethuiTimeout = egret.setTimeout(() => { this.scroller.setIconHui(); }, this, 2000)
                    if (!Global.runBack) {
                        this.removeScoreTimeout = egret.setTimeout(() => {
                            game.UIUtils.removeSelf(this.commomScore);
                            game.UIUtils.removeSelf(this.winGoldDiAni);
                            this.addEachLineAni();
                        }, this, 2300);
                        if (this.clickTime >= 3 && !game.LaohuUtils.isTips) {
                            this.askAutoGame();
                        }
                    }
                }
                //未中奖 
                else {
                    //未中奖中了scatter
                    if (this.scatter == 1) {
                        this.runningType = RUNNING_TYPE.STOP;
                        SoundManager.getInstance().playEffect("sdmn_scat_play_sdmn_mp3");
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "sdmn_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "sdmn_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "sdmn_icon_2");
                        egret.setTimeout(() => {
                            CF.dP(ENo.SDMN_ENTER_FREE_GAME_SCENE, { isfast: this.isFastGame });
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
            if (this.bonusAtr.length > 0 && this.winGold > 0) {
                if (this.scatter == 1 && !game.LaohuUtils.isAutoGame) { this[`quitBtn`].touchEnabled = false; this.resetStartBtn(); }
                this.scroller.stopIconDb();
                let count = 0;
                //逐个展示中奖连线
                async.eachSeries(this.bonusAtr, (index, callback) => {
                    if (this.isStopAni) return;
                    // this.scroller.setSpecilHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
                    for (let j = 0; j < index.length; j++) {
                        let k = j + 1;
                        // this.scroller[`item${k}`].resetIconHui(index[j]);
                        this.scroller[`item${k}`].showAni(index[j]);
                        this.commomScore.font = "sdmn_wingold_mid_fnt";
                        let data = Number(new Big(this.eachLineScore[count]).mul(100));
                        this.commomScore.text = NumberFormat.handleFloatDecimal(data, 0) + "";
                        this.commomScore.verticalCenter = ((index[2] - 1)) * 184;
                        this.commomScore.horizontalCenter = 0;
                        this.commomScore.textAlign = "center";
                        this.gameGroup.addChild(this[`lineImag`]);
                        this.gameGroup.addChild(this.commomScore);
                    }
                    //单一连线
                    if (this.bonusAtr.length == 1) {
                        if (this.scatter != 1) this.runningType = RUNNING_TYPE.EMPTY;
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
                        if (!Global.runBack) {
                            this.sethuiTimeout = egret.setTimeout(() => {
                                // this.scroller.setIconHui();
                                game.UIUtils.removeSelf(this.commomScore);
                            }, this, 2000)
                        }
                        this.showIconTimeOut = egret.setTimeout(callback, this, 2300);
                    }
                    count++;
                }, () => {
                    //callback 判断结果是否为scatter
                    if (this.scatter == 1) {
                        game.UIUtils.removeSelf(this.commomScore);
                        this.runningType = RUNNING_TYPE.STOP;
                        // this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().playEffect("sdmn_scat_play_sdmn_mp3");
                        this.scroller.addFoGuang(1, this.yudiAtr[0], "sdmn_icon_2");
                        this.scroller.addFoGuang(3, this.yudiAtr[1], "sdmn_icon_2");
                        this.scroller.addFoGuang(5, this.yudiAtr[2], "sdmn_icon_2");
                        egret.setTimeout(() => {
                            CF.dP(ENo.SDMN_ENTER_FREE_GAME_SCENE, { isfast: this.isFastGame });
                            this.resetOtherBtn();
                        }, this, 4000)
                        if (!game.LaohuUtils.isAutoGame) this.resetStartBtn();
                    }
                    else {
                        count = 0;
                        // this.scroller.setIconHui();
                        game.UIUtils.removeSelf(this.commomScore);
                        return this.addEachLineAni();
                    }

                })
            }
        }
        /**
         * 打开四大美女赔付表
         */
        private opensdmnTips() {
            CF.sN(PanelNotify.OPEN_SDMN_TIPS_PANEL);
        }

        /**
		 * 打开游戏记录
		 */
        private openGameRecord() {
            CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
        }
        /**
        * 设置最大倍数
        */
        private setMaxBet() {

            //金币是否满足条件
            let bet = game.SDMNUtils.bets[4]; let mul = game.SDMNUtils.muls[9];
            let data1 = Number(new Big(bet * mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                return;
            }
            game.SDMNUtils.bet = game.SDMNUtils.bets[4];
            game.SDMNUtils.mul = game.SDMNUtils.muls[9];
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal(game.SDMNUtils.bet * game.SDMNUtils.mul * 50) + "";
            this.bet = 10;
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this[`beishu`].text = parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 + "") + "";
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
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[0];
                        break;
                    case 2:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[1];
                        break;
                    case 3:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[3];
                        break;
                    case 4:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 5:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[1];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 6:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[2];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[5];
                        break;
                    case 7:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[3];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[5];
                        break;
                    case 8:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[3];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 9:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[4];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[6];
                        break;
                    case 10:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[4];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                }
            }
            this[`betTtipsGroup`].visible = true;
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this[`beishu`].text = parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 + "") + "";
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) + "";
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
        }
        /**
         * 增加倍数
         */
        private addBetFunc() {
            //是否超出倍数范围
            if (this.bet <= 9) {
                game.LaohuUtils.totalWin = 0;
                this.bet += 1;
                switch (this.bet) {
                    case 1:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[0];
                        break;
                    case 2:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[1];

                        break;
                    case 3:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[3];
                        break;
                    case 4:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[0];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 5:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[1];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 6:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[2];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[5];
                        break;
                    case 7:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[3];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[5];
                        break;
                    case 8:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[3];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                    case 9:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[4];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[6];
                        break;
                    case 10:
                        game.SDMNUtils.bet = game.SDMNUtils.bets[4];
                        game.SDMNUtils.mul = game.SDMNUtils.muls[9];
                        break;
                }
            }
            this[`beishu`].text = parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 + "") + "";
            this[`betTtipsGroup`].visible = true;
            this[`maxWinLabel`].text = "最高可得: " + parseInt(game.SDMNUtils.bet * game.SDMNUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            this.totalBet.text = NumberFormat.handleFloatDecimal((game.SDMNUtils.bet * game.SDMNUtils.mul * 50)) + "";
            let data1 = Number(new Big(game.SDMNUtils.bet * game.SDMNUtils.mul).mul(50));
            if (NumberFormat.handleFloatDecimal(data1) > this.ownGold) {
                let text = "金币不足";
                Global.alertMediator.addAlert(text, "", "", true);
                this.reduceBet();
            }
        }
        /**
         * 退出游戏
         */
        private leaveSDMN() {
            if (this.scatter == 1) return;
            if (ServerConfig.OP_RETURN_TYPE == "2") {
                FrameUtils.goHome();
                return;
            }
            game.releaseSlotRes.currentSlotName = "sdmn";
            CF.sN(PanelNotify.OPEN_LEAVE_LAOHU_PANEL);
        }
        private timer3: any;
        public effectGroup: eui.Group;
        /**
         * 前置花瓣飘落效果
         */
        // private addSakuraHeadDown() {
        //     this.timer3 = egret.setInterval(() => {
        //         if (this.effectGroup.numChildren < 8) {
        //             let gold_right1 = this.createsdLeftGold("sdmn_big_sakura", "sdxl_sakura", "small_sakura");
        //             this.effectGroup.addChild(gold_right1);
        //         }
        //     }, this, 500);
        // }

        /**
        * @param  {} name
        * 创建big名的花瓣动画
        */
        public createsdLeftGold(name, effectname, aniname) {
            let sakura = ObjectPool.produce(name, null);
            if (!sakura) {
                sakura = new DBComponent(effectname)
                sakura.scaleY = 1;
                sakura.scaleX = 1;
            }
            sakura.callback = () => {
                game.UIUtils.removeSelf(sakura);
                sakura = null;
                // ObjectPool.reclaim(name, sakura);
            }
            sakura.play(aniname, 1);
            sakura.x = Math.ceil(Math.random() * 1280);
            sakura.y = Math.ceil(Math.random() * 200);
            sakura.touchEnabled = false;
            sakura.touchChildren = false;
            return sakura;
        }
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