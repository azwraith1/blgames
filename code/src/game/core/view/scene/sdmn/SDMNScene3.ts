/*
 * @Author: real MC Lee 
 * @Date: 2019-05-27 18:43:59 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-28 17:14:26
 * @Description: 
 */
module sdmn {
    export class SDMNScene3 extends game.BaseScene {
        public resizeGroup: eui.Group;
        public freebg: eui.Image;
        public freeGroup: eui.Group;
        public freemulGroup: eui.Group;
        public bei0: eui.Group;
        public bei1: eui.Group;
        public bei2: eui.Group
        public freemul0: eui.BitmapLabel;
        public freemul1: eui.BitmapLabel;
        public freemul2: eui.BitmapLabel;
        public freewinGroup: eui.Group;
        public freeTimesLabel: eui.BitmapLabel;
        public freewinLabel: eui.BitmapLabel;
        public scroller: sdmn.SDMNScroller;
        public selectGroup: eui.Group;
        public roleGroup: eui.Group;
        public role1Group: eui.Group;
        public role1: sdmn.SDMNRole;
        public role2Group: eui.Group;
        public role2: sdmn.SDMNRole;
        public role3Group: eui.Group;
        public role3: sdmn.SDMNRole;
        public role4Group: eui.Group;
        public role4: sdmn.SDMNRole;
        public roleEffectGroup: eui.Group;
        public selectAniGroup: eui.Group;
        private gameBg: eui.Image;
        // public roleImag: eui.Image;
        public rect1: eui.Rect;
        public rect2: eui.Rect;
        public rect3: eui.Rect;
        public rect4: eui.Rect;

        private selectAni: DBComponent;// 选择框效果动画
        private freeBgAni: DBComponent;//四大美女背景动画
        // private freeDefRole0: DBComponent;//四大美女角色默认动画1
        private freewinRole0: DBComponent;//四大美女角色中奖动画1
        // private freeDefRole1: DBComponent;//四大美女角色默认动画2
        private freewinRole1: DBComponent;//四大美女角色中奖动画2
        // private freeDefRole2: DBComponent;//四大美女角色默认动画3
        private freewinRole2: DBComponent;//四大美女角色中奖动画3
        // private freeDefRole3: DBComponent;//四大美女角色默认动画4
        private freewinRole3: DBComponent;//四大美女角色中奖动画4
        private index: number //四大美女选次数索引;
        private freewinBeiAni: DBComponent//免费游戏赢取框动画
        private selectLeaveAni: DBComponent;//选次数场景移除动画
        private rolewenzi0: DBComponent;
        private rolewenzi1: DBComponent;
        private rolewenzi2: DBComponent;
        private rolewenzi3: DBComponent;

        public constructor() {
            super();
            this.skinName = "SDMNScene3Skin";
        }
        public onAdded() {
            super.onAdded();
            CF.aE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.aE(ENo.SDMN_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.aE(ENo.SDMN_START_FREE_GAME, this.startFreeGame, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.LHJ_ITEM_OVER, this.scrollerEnd, this);
            CF.rE(ENo.SDMN_ENTER_FREE_GAME, this.enterFreeGame, this);
            CF.rE(ENo.SDMN_START_FREE_GAME, this.startFreeGame, this);
            this.scroller.removeScroller();
            this.removeMouseOnEvent();
            egret.clearTimeout(this.freeGameTimeOut);
            this.resizeGroup.removeChildren();
        }

        public createChildren() {
            super.createChildren();
            this.role1.showRoleAni("sdmn_role1");
            this.role2.showRoleAni("sdmn_role2");
            this.role3.showRoleAni("sdmn_role3");
            this.role4.showRoleAni("sdmn_role4");
            let isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.freewinRole0 = DBComponent.create("sdmn_sdmn_win_role0", "sdmn_win_role1");
            this.freewinRole1 = DBComponent.create("sdmn_sdmn_win_role1", "sdmn_win_role2");
            this.freewinRole2 = DBComponent.create("sdmn_sdmn_win_role2", "sdmn_win_role3");
            this.freewinRole3 = DBComponent.create("sdmn_sdmn_win_role3", "sdmn_win_role4");
            this.freewinBeiAni = DBComponent.create("sdmn_freewinBeiAni", "sdmn_freebei_ani");
            this.selectLeaveAni = DBComponent.create("sdmn_selectLeaveAni", "sdmn_select3");
            this.rolewenzi0 = DBComponent.create("sdmn_role1wenzi", "sdmn_role1_wenzi");
            this.rolewenzi1 = DBComponent.create("sdmn_role2wenzi", "sdmn_role2_wenzi");
            this.rolewenzi2 = DBComponent.create("sdmn_role3wenzi", "sdmn_role3_wenzi");
            this.rolewenzi3 = DBComponent.create("sdmn_role4wenzi", "sdmn_role4_wenzi");

            this.rolewenzi0.horizontalCenter = -450;
            this.rolewenzi0.bottom = 320;
            this.rolewenzi1.horizontalCenter = -450;
            this.rolewenzi1.bottom = 350;
            this.rolewenzi2.horizontalCenter = -450;
            this.rolewenzi2.bottom = 330;
            this.rolewenzi3.horizontalCenter = -450;
            this.rolewenzi3.bottom = 350;

            this.selectLeaveAni.horizontalCenter = 9;
            this.selectLeaveAni.bottom = 0;
            // this.freewinRole0.scaleX = this.freewinRole0.scaleY = 2;
            this.freewinRole0.bottom = this.freewinRole1.bottom = this.freewinRole2.bottom = this.freewinRole3.bottom = 100;
            this.freewinRole0.horizontalCenter = this.freewinRole1.horizontalCenter = this.freewinRole2.horizontalCenter = this.freewinRole3.horizontalCenter = -500;
            this.selectAni = DBComponent.create("sdmn_selectAni", "sdmn_select2");
            this.scroller.showFreeFirst(3);
        }
        /**
         * 鼠标悬浮动画
         */
        private addMouseOnEvent() {
            this.rect1.addEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(1) }, this);
            this.rect1.addEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(1) }, this);
            this.rect2.addEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(2) }, this);
            this.rect2.addEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(2) }, this);
            this.rect3.addEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(3) }, this);
            this.rect3.addEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(3) }, this);
            this.rect4.addEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(4) }, this);
            this.rect4.addEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(4) }, this);
        }
        private removeMouseOnEvent() {
            this.rect1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(1) }, this);
            this.rect1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(1) }, this);
            this.rect2.removeEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(2) }, this);
            this.rect2.removeEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(2) }, this);
            this.rect3.removeEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(3) }, this);
            this.rect3.removeEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(3) }, this);
            this.rect4.removeEventListener(mouse.MouseEvent.MOUSE_OVER, () => { this.mouseOverHandle(4) }, this);
            this.rect4.removeEventListener(mouse.MouseEvent.MOUSE_OUT, () => { this.mouseOutHandle(4) }, this);
        }
        /**
         * 鼠标悬浮动画
         * @param  {number} num
         */
        private mouseOverHandle(num: number) {
            if (!this.isSelected) {
                this[`roleSelectbg${num}`].visible = true;
            }
        }
        /**
         * 鼠标移除动画
         * @param  {number} num
         */
        private mouseOutHandle(num: number) {
            if (!this.isSelected) {
                this[`roleSelectbg${num}`].visible = false;
            }
        }

        /**
      * 进入免费游戏效果
      */
        private enterFreeGame(e: egret.Event) {
            if (e.data) {
                this.isFastGame = e.data.isfast;
            }
            SoundManager.getInstance().playMusic("sdmn_sactbackground_mus_mp3");
            if (game.LaohuUtils.free_time_times != 0) {
                switch (game.LaohuUtils.free_time_times + "") {
                    case "20":
                        this.selectPeachs(0);
                        break;
                    case "15":
                        this.selectPeachs(1);
                        break;
                    case "10":
                        this.selectPeachs(2);
                        break;
                    case "5":
                        this.selectPeachs(3);
                        break;
                }
            }
        }
        /**
         * 点击事件
         * @param  {egret.TouchEvent} e
         */
        public onTouchTap(e: egret.TouchEvent) {
            /**
             * 已选择免费次数 退出
             */
            if (game.LaohuUtils.free_time_times != 0) {
                return;
            }
            switch (e.target) {
                case this[`rect1`]:
                    this.selectPeachs(0);
                    break;
                case this[`rect2`]:
                    this.selectPeachs(1);
                    break;
                case this[`rect3`]:
                    this.selectPeachs(2);
                    break;
                case this[`rect4`]:
                    this.selectPeachs(3);
                    break;
            }
        }

        private isSelected: boolean = false; //防止重复选择
        private freeTimes: number; //免费游戏次数
        private isReconnect: boolean = true; //判断是否为断线重连
        /**
        * 发送选择桃子index
        * @param  {number} index
        */
        private async selectPeachs(index: number) {
            /**
             * 防止重复选择免费次数
             */
            if (!this.isSelected) {
                this.isSelected = true;
                let data2 = { "bonusIndex": index };
                let resp: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_selectBonusGame, data2);
                this.freeTimes = resp.freeGameTimes;
                game.SDMNUtils.freeTimes = this.freeTimes;
                game.SDMNUtils.freeWin = 0;
                this.freeTimesLabel.text = this.freeTimes + "";
                for (let i = 0; i < resp.freeGameMuls.length; i++) {
                    game.SDMNUtils.FreeTimeMul.push(resp.freeGameMuls[i]);
                }
                this.freemul0.text = resp.freeGameMuls[0] + "";
                this.freemul1.text = resp.freeGameMuls[1] + "";
                this.freemul2.text = resp.freeGameMuls[2] + "";
                this.isReconnect = false;
                this.selectAni.bottom = this.selectAni.top = 0;
                switch (index) {
                    case 0:
                        this.selectAni.play("", 1);
                        this.selectAni.horizontalCenter = -470;
                        this.selectAniGroup.addChild(this.selectAni);
                        this.selectAni.resetPosition();
                        break;
                    case 1:
                        this.selectAni.play("", 1);
                        this.selectAni.top = -10;
                        this.selectAni.horizontalCenter = -150;
                        this.selectAniGroup.addChild(this.selectAni);
                        this.selectAni.resetPosition();

                        break;
                    case 2:
                        this.selectAni.play("", 1);
                        this.selectAni.horizontalCenter = 160;

                        this.selectAniGroup.addChild(this.selectAni);
                        this.selectAni.resetPosition();

                        break;
                    case 3:
                        this.selectAni.play("", 1);
                        this.selectAni.horizontalCenter = 480;

                        this.selectAniGroup.addChild(this.selectAni);
                        this.selectAni.resetPosition();

                        break;
                }
                SoundManager.getInstance().playEffect("sdmn_freegame_3_mp3");
                this.index = index;
                this.roleSelectAni(index);
                this.roleEffectGroup.addChild(this[`freewinRole${this.index}`]);
                this[`freewinRole${this.index}`].resetPosition();
                this.roleEffectGroup.addChild(this[`rolewenzi${this.index}`]);
                this[`rolewenzi${this.index}`].resetPosition();
                this.freeBgAni = DBComponent.create("sdmn_freebgAni" + index, "sdmn_freebg" + (index + 2));
                this.freeBgAni.horizontalCenter = 0;
                this.freeBgAni.bottom = 0;
                this.freeBgAni.play("", 0);
                this[`bgEffectGroup`].addChild(this.freeBgAni);
                this.freeBgAni.resetPosition();
                this.freebg.source = RES.getRes(`sdmn_freebg` + (index + 1) + `_png`);
                this.gameBg.source = "sdmn_freebg_" + index + "_png";
                egret.setTimeout(() => {
                    game.UIUtils.removeSelf(this.selectAni);
                    this.selectGroup.visible = false;
                    this.startFreeGame();
                }, this, 3330);
            }
        }
        /**
         * 正常流程开始游戏&&重连后继续免费游戏
         */
        private startFreeGame() {
            this.freeGroup.visible = true;
            this.selectGroup.visible = false;
            this.selectLeaveAni.play("", 1);
            this.resizeGroup.addChild(this.selectLeaveAni);
            this.selectLeaveAni.resetPosition();
            game.LaohuUtils.downTime2 = 200;
            game.LaohuUtils.downTime3 = 400;
            game.LaohuUtils.downTime4 = 600;
            game.LaohuUtils.downTime5 = 800;
            game.LaohuUtils.speed = 85;
            if (!this.isReconnect) {
                switch (this.index) {
                    case 0:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_01_mp3");
                        break;
                    case 1:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_02_mp3");
                        break;
                    case 2:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_03_mp3");
                        break;
                    case 3:
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_04_mp3");
                        break;
                }
                egret.setTimeout(this.playFreeGame, this, 1500);
            } else {
                this.freeWins = game.LaohuUtils.freeWin;
                this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                this.freeTimes = game.LaohuUtils.freeTimes;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freemul0.text = game.SDMNUtils.FreeTimeMul[0] + "";
                this.freemul1.text = game.SDMNUtils.FreeTimeMul[1] + "";
                this.freemul2.text = game.SDMNUtils.FreeTimeMul[2] + "";
                let index: number;
                switch (game.SDMNUtils.FreeTimeMul[0]) {
                    case 2:
                        this.index = 0;
                        index = 0;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_01_mp3");
                        break;
                    case 3:
                        this.index = 1;
                        index = 1;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_02_mp3");
                    case 5:
                        this.index = 2;
                        index = 2;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_03_mp3");
                        break;
                    case 10:
                        this.index = 3;
                        index = 3;
                        SoundManager.getInstance().playMusic("sdmn_freespinbackground_04_mp3");
                        break;
                }
                this.roleEffectGroup.addChild(this[`freewinRole${this.index}`]);
                this[`freewinRole${this.index}`].resetPosition();
                this.freeBgAni = DBComponent.create("sdmn_freebgAni" + index, "sdmn_freebg" + (index + 2));
                this.freeBgAni.horizontalCenter = 0;
                this.freeBgAni.bottom = 0;
                this.freeBgAni.play("", 0);
                this[`bgEffectGroup`].addChild(this.freeBgAni);
                this.freeBgAni.resetPosition();
                this.freebg.source = RES.getRes(`sdmn_freebg` + (index + 1) + `_png`);
                this.gameBg.source = "sdmn_freebg_" + index + "_png";
                this.selectGroup.visible = false;
                egret.setTimeout(this.playFreeGame, this, 3000);
            }
        }
        /**
         * 选择次数后播放角色动画
         */
        private roleSelectAni(index: number) {
            this[`role${index + 1}`].roleAni(index);
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
                    this.showTotalwin();
                    return;
                }
                this.isMessaged = true;
                this.freeTimes -= 1;
                this.freeTimesLabel.text = this.freeTimes + "";
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
                // if (this.isFastGame) {
                //     this.askAutoGame();
                // }
            }
        }
        /**
         * 上次动画移除
         */
        private removeLastAni() {
            if (this.winGold > 0) {
                game.UIUtils.removeSelf(this.commomScore);
                // this.scroller.removeIconHui([[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]);
            }
            this.scroller.stopIconDb();
        }

        private showAtr: Array<Array<number>>;
        private bonusAtr: Array<Array<number>>;//中奖图标数组
        private winGold: number; //中奖金额 
        private freeMulIndex: number;//免费游戏中奖倍数索引
        private freeWins: number = 0;//免费游戏总赢取
        private freeMulBei: number; //免费游戏中奖倍数
        public freeGameTimeOut: any;

        /**
         * 发送免费游戏旋转消息
         */
        public async messageSend() {
            this.showAtr = [];
            this.bonusAtr = [];
            this.winGold = 0;
            let data2 = { "spinType": 1, "bet": game.SDMNUtils.bet, "multiple": game.SDMNUtils.mul, "lineCount": 243, "activityId": 0 };
            let resp2: any = await Global.pomelo.request(ServerPostPath.game_slotHandler_c_bet, data2);
            if (resp2.error) {
                let text = resp2.error.msg;
                Global.alertMediator.addAlert(text, "", "", true);
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
                CF.sN(SceneNotify.CLOSE_SDMN);
                SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                return;
            }
            let resp1: any = resp2.spinRes[0];
            if (resp1.rmIndex) {
                for (let i in resp1.rmIndex) {
                    this.bonusAtr.push(resp1.rmIndex[i]);
                }
            } else {
                this.bonusAtr = [];
            }
            this.winGold = resp2.winCount;
            this.freeMulIndex = resp1.freeMulIndex;
            this.showAtr = [resp1.matrix[0], resp1.matrix[1], resp1.matrix[2], resp1.matrix[3], resp1.matrix[4]];
            this.freeWins += this.winGold;
            this.freeMulBei = resp1.freeMul;
            game.SDMNUtils.ToTalMoney = resp2.own_gold;
            egret.setTimeout(() => {
                this.scroller.runResult(this.showAtr);
                if (this.isFastGame) {
                    this.scroller.runResultFast();
                }
            }, this, 100)
        }
        public isFastGame = false;

        /**
         * 各个转轴结束监听
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
                    SoundManager.getInstance().stopEffectByName("sdmn_reel_mp3");
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    //是否中奖
                    if (this.winGold > 0) {
                        if (this.winGold < (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
                            // egret.setTimeout(() => { this.lineScoreGroup.visible = false; this.removeLastAni(); }, this, 1600);
                        }
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3500);
                    } else {
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 1000);
                    }
                    this.addFreeBonusAni();
                    this.freewinLabel.text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
                    break;
                case 4:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 3:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 2:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
                case 1:
                    SoundManager.getInstance().playEffect("sdmn_reelstop_mp3");
                    break;
            }
        }

        private bigWinPanel: SDMNBigwinPanel;

        /**
         * 免费游戏中奖连线
         */
        private addFreeBonusAni() {
            //判断是否为bigwin
            if (this.winGold >= (game.SDMNUtils.bet * game.SDMNUtils.mul * 50) * 15) {
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
                            // this.scroller.setIconHui();
                            // this.scroller.removeIconHui(this.bonusAtr);
                            this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                            this.addTittleMul();
                            egret.clearTimeout(this.freeGameTimeOut);
                            this.freeGameTimeOut = egret.setTimeout(() => {
                                this.playFreeGame();
                            }, this, 3500);
                        });
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
                        // this.scroller.setIconHui();
                        // this.scroller.removeIconHui(this.bonusAtr);
                        this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                        this.addTittleMul();
                        this.bigWinPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this)
                        this.freeGameTimeOut = egret.setTimeout(this.playFreeGame, this, 3500);
                        game.UIUtils.removeSelf(this.bigWinPanel);
                    })
                    this.resizeGroup.addChild(this.bigWinPanel);
                }
            }
            //普通中奖
            else if (this.bonusAtr.length > 0 && this.winGold > 0) {
                SoundManager.getInstance().playEffect("sdmn_win_mp3");
                // this.scroller.setIconHui();
                // this.scroller.removeIconHui(this.bonusAtr);
                this.scroller.addBonusAni(this.bonusAtr, this.winGold);
                this.addTittleMul();
            }
            // }
        }
        public commomScore: eui.BitmapLabel = new eui.BitmapLabel();
        private scoreAni: DBComponent;
        private scoreAni2: DBComponent;
        /**
         * 四大美女免费游戏倍数效果
         */
        private addTittleMul() {
            this.commomScore.font = "sdmn_wingold_big_fnt";
            this.scoreAni = DBComponent.create("sdmn_scoreAni2", "sdmn_win_gunang");
            this.scoreAni2 = DBComponent.create("sdmn_scoreAni", "sdxl_gold_diguang");
            this.scoreAni2.horizontalCenter = this.scoreAni.horizontalCenter = 0;
            this.scoreAni.bottom = 130;
            this.scoreAni2.bottom = 120;
            let data = Number(new Big(this.winGold).mul(100).div(this.freeMulBei));
            this.commomScore.text = NumberFormat.handleFloatDecimal(data) + "";
            this.commomScore.textAlign = "center";
            this.commomScore.verticalCenter = 0;
            this.commomScore.horizontalCenter = 0;
            this[`scoreGroup`].addChild(this.commomScore);
            this.scoreAni2.play("", 1);
            this.scroller.addChild(this.scoreAni2);
            this.scoreAni2.resetPosition();
            this[`freewinRole${this.index}`].play("", 1);
            this[`freewinRole${this.index}`].callback = () => {
                this.roleEffectGroup.addChild(this[`freewinRole${this.index}`]);
                this[`freewinRole${this.index}`].resetPosition();
                this[`rolewenzi${this.index}`].bottom = 95;
                this.roleEffectGroup.addChild(this[`rolewenzi${this.index}`]);
                this[`rolewenzi${this.index}`].resetPosition();
            }
            this[`rolewenzi${this.index}`].play("", 1);
            SoundManager.getInstance().playEffect("sdmn_mulhighlight_mp3");
            this.freewinBeiAni.bottom = 6;
            this.freewinBeiAni.horizontalCenter = (this.freeMulIndex - 1) * 78;
            this.freewinBeiAni.play("", 1);
            this[`freeMulAniGroup`].addChild(this.freewinBeiAni);
            this.freewinBeiAni.resetPosition();
            egret.Tween.get(this[`bei${this.freeMulIndex}`])
                .to({ scaleX: 1.2, scaleY: 1.2 }, 400)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 200)
                .to({ scaleX: 4.1, scaleY: 4.1, horizontalCenter: 0 }, 100, egret.Ease.sineIn)
                .to({ scaleX: 4, scaleY: 4 }, 80)
                .call(() => {
                    egret.setTimeout(() => {
                        SoundManager.getInstance().playEffect("sdmn_mul_flying_mp3");
                        egret.Tween.get(this[`bei${this.freeMulIndex}`]).to({ horizontalCenter: 560, bottom: 230 }, 500, egret.Ease.sineOut)
                            .call(() => {
                                let data2 = Number(new Big(data).mul(this.freeMulBei));
                                this.commomScore.text = NumberFormat.handleFloatDecimal(data2) + "";
                                SoundManager.getInstance().playEffect("sdmn_win_mp3");
                                egret.Tween.get(this.commomScore).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 80);
                                this.scoreAni.play("", 1);
                                this.scroller.addChild(this.scoreAni);
                                this.scoreAni.resetPosition();
                                this[`scoreGroup`].addChild(this.commomScore);
                                //倍数位置对应的横坐标位置
                                let horizontalCenterPosition: number = 0;
                                switch (this.freeMulIndex) {
                                    case 0:
                                        horizontalCenterPosition = -78;
                                        break;
                                    case 1:
                                        horizontalCenterPosition = 0;
                                        break;
                                    case 2:
                                        horizontalCenterPosition = 78;
                                        break;
                                }
                                egret.Tween.get(this[`bei${this.freeMulIndex}`]).to({ horizontalCenter: horizontalCenterPosition, bottom: 20, scaleX: 1, scaleY: 1 }, 10);
                            })
                    }, this, 500);

                })

        }

        /**
        * 免费游戏结束，初始化免费游戏场景
        */
        private showTotalwin() {
            this[`totalGroup`].visible = true;
            this[`totalWin`].text = NumberFormat.handleFloatDecimal(this.freeWins) + "";
            game.SDMNUtils.freeWin = this.freeWins;
            this.isSelected = false;
            SoundManager.getInstance().pauseMusic();
            SoundManager.getInstance().playEffect("sdmn_scat_win_mp3");
            this[`roleSelectbg4`].visible = this[`roleSelectbg3`].visible = this[`roleSelectbg2`].visible = this[`roleSelectbg1`].visible = false;
            egret.setTimeout(() => {
                this.freeWins = 0;
                SoundManager.getInstance().remuseMusic();
                game.UIUtils.removeSelf(this[`freewinRole${this.index}`]);
                this.freewinLabel.text = 0 + "";
                this.selectGroup.visible = true;
                this.freeGroup.visible = false;
                this[`totalGroup`].visible = false;
                game.UIUtils.removeSelf(this.freeBgAni);
                CF.dP(ENo.SDMN_QUIT_FREE_GAME);
            }, this, 8000)
        }

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
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                }, this, 500);
            }
            let func2 = () => {
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("sdmn_reel_mp3", true);
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