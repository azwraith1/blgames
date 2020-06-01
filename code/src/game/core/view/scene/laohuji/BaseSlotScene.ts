/*
 * @Author: real MC Lee 
 * @Date: 2019-07-16 13:49:06 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-03 17:29:34
 * @Description: slot基类
 */
module game {
    export abstract class BaseSlotScene extends BaseScene {
        protected quitBtn: eui.Button;
        protected tipsBtn: eui.Button;
        protected memuBtn: eui.Button;
        protected recordBtn: eui.Button;
        protected setingBtn: eui.Button;
        protected maxBet: eui.Image;
        protected subbet: eui.Button;
        protected addbet: eui.Button;
        protected autoGameBtn: eui.Button;
        protected menuGroup: eui.Group;
        protected winLineGroup: eui.Group;
        protected pscen1: eui.EditableText;
        protected startBtn0: eui.Button;
        protected spinresult: eui.EditableText;
        protected lable1: eui.Label;
        public testGroup: eui.Group;
        protected label2: eui.Label;
        public HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
        protected betTtipsGroup: eui.Group;
        protected maxWinLabel: eui.Label;
        abstract yudiAtrHui;
        abstract yudiAtrHui2;
        abstract sceneId: number;

        abstract CLOSE_NOTIFY: string;
        abstract QUIT_NOTIFY: string;
        abstract TIPS_NOTIFY: string;
        abstract AUTOGAME_NOTIFY: string;
        abstract RECORD_NOTIFY: string;
        abstract SETING_NOTIFY: string;
        abstract lineSmall: string;
        abstract lineMid: string;
        abstract lineBig: string;
        abstract lineHuge: string;
        abstract scroller;
        abstract buttonEffect: string;
        abstract fastSpeedTime;
        abstract scrollerFastEffect: string;
        abstract lineAniXArray: Array<number>;
        abstract lineAniYArray: Array<number>;
        abstract lineAniRotation: Array<number>;
        abstract firstLineX: number;
        abstract lastLineX: number;
        abstract utilsTotalMoney;
        abstract utilsBet;
        abstract fixpositionY: Array<number>;
        abstract isSetHui: boolean;
        abstract gameId: string;
        public deskMate: slot.SlotDeskMate;
        public closeDeskTimeOut: any;

        public clickTime: number = 0;
        public isFastGame: boolean = false;


        public constructor() {
            super();
        }

        public createChildren() {
            super.createChildren();
            let isPC = NativeApi.instance.IsPC();
            if (isPC) {
                mouse.enable(this.stage);
                this.addMouseOnEvent();
            }
            this.addDesk();
        }

        public addDesk() {
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                this.deskMate = slot.SlotDeskMate.instance;
                this.deskMate.right = 0; this.deskMate.verticalCenter = -50;
                this.deskMate.openrect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
                this.deskMate.openrect.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
                this.deskMate.openrect.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
                this.resizeGroup.addChild(this.deskMate);
                this.closeDeskTimeOut = egret.setTimeout(() => {
                    egret.Tween.get(this.deskMate).to({ right: -180 }, 500, egret.Ease.quadOut).call(() => {
                        this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                    })
                }, this, 5000);
            }
        }

        public onAdded() {
            super.onAdded();
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
                CF.aE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
                CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
                CF.aE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
            }

        }

        public onRemoved() {
            super.onRemoved();
            if (this.sceneId < 1016 && this.sceneId > 1010) {
                CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
                CF.rE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
                CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
                this.deskMate.openrect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
                this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
                this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
                CF.rE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
                this.clearDeskArray();
            }

        }


        public clearDeskArray() {
            game.LaohuUtils.slotDeskGid = [];
            game.LaohuUtils.slotDeskHead = [];
            game.LaohuUtils.slotDeskName = [];
            game.LaohuUtils.playerEnter = {
                gid: 0, head: "", name: ""
            };
        }

        protected enterGame(e: egret.Event) {
        }

        public deskmateBigwin(e: egret.Event) {
            let data = e.data;
            for (let i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
                if (game.LaohuUtils.slotDeskGid[i] == data.playerIndex) {
                    if (!this.deskMate.visible) return;
                    let slotdeskwin = slot.SlotDeskWinIten.instance;
                    egret.Tween.get(slotdeskwin).to({ scaleX: 0, scaleY: 0 }, 10).to({
                        scaleX: 0.6, scaleY: 0.6
                    }, 300, egret.Ease.sineInOut);
                    slotdeskwin.showWin(data);
                    this.deskMate.visible = false;
                    this.deskMate.right = -180;
                    slotdeskwin.right = 0;
                    slotdeskwin.verticalCenter = -200;
                    this.resizeGroup.addChild(slotdeskwin);
                    egret.setTimeout(() => {
                        egret.Tween.get(slotdeskwin).to({ scaleX: 0.6, scaleY: 0.6 }, 10).to({
                            scaleX: 0, scaleY: 0
                        }, 300, egret.Ease.sineInOut).call(() => {
                            slotdeskwin.remove();
                        })
                        this.deskMate.visible = true;
                        this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                    }, this, 8000);
                    egret.clearTimeout(this.closeDeskTimeOut);
                }

            }
        }
        public playerQuit(e: egret.Event) {
            let player = e.data;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: "",
                head: ""
            }
            this.deskMate.playerLeave();
        }

        public playerEnter(e: egret.Event) {
            let player = e.data;
            if (player.player.uid == Global.playerProxy.playerData.id) return;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: player.player.nickname,
                head: `hall_header_${player.player.sex}_${player.player.figureUrl}_png`
            }
            this.deskMate.playerEnter();
        }

        public openDesk() {
            egret.clearTimeout(this.closeDeskTimeOut);
            if (this.deskMate.right == 0) {
                egret.Tween.get(this.deskMate).to({ right: -180 }, 500, egret.Ease.quadOut).call(() => {
                    this.deskMate.deskopen.source = "slot_hall_opendesk_png";
                })
            } else if (this.deskMate.right == -180) {
                egret.Tween.get(this.deskMate).to({ right: 0 }, 500, egret.Ease.quadOut).call(() => {
                    this.deskMate.deskopen.source = "slot_hall_closedesk_png";
                })
            }
        }

        public touchOn() {
            this.deskMate.touchOn();
        }

        public touchOff() {
            this.deskMate.touchOff();
        }

        /**
        * 鼠标手势监听函数
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
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }
        /**
         * 鼠标手势监听移除
         */
        protected removeEvent() {
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
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.changeOutBtn, this);
            this.quitBtn.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.changeOutBtn2, this);
        }
        /**
         * 菜单按钮悬浮效果
         */
        protected changeMenuBtn() {
            this.memuBtn.currentState = "down";
        }
        /**
         * 菜单按钮悬浮效果移除
         */
        protected changeMenuBtn2() {
            this.memuBtn.currentState = "up";
        }
        /**
         * 设置按钮悬浮效果
         */
        protected changesettingBtn() {
            this.setingBtn.currentState = "down";
        }
        /**
         * 设置按钮悬浮效果移除
         */
        protected changesettingBtn2() {
            this.setingBtn.currentState = "up";
        }
        /**
         * 赔付表按钮悬浮效果
         */
        protected changetipsBtn() {
            this.tipsBtn.currentState = "down";
        }
        /**
         * 赔付表按钮悬浮效果移除
         */
        protected changetipsBtn2() {
            this.tipsBtn.currentState = "up";
        }
        /**
         * 加注按钮悬浮效果
         */
        protected changeBetAddBtn() {
            this.addbet.currentState = "down";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if (this.sceneId <= 1010) {
                this.betTtipsGroup.visible = true;
                this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * this.utilsBet * 4000 + ""); "";
            } else if (this.sceneId >= 1016) {
                // "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            }

        }
        /**
         * 加注按钮悬浮效果移除
         */
        protected changeBetAddBtn2() {
            this.addbet.currentState = "up";
        }
        /**
         * 减注按钮悬浮效果
         */
        protected changeBetSubBtn() {
            this.subbet.currentState = "down";
            egret.setTimeout(() => { this[`betTtipsGroup`].visible = false }, this, 5000);
            if (this.sceneId <= 1010) {
                this.betTtipsGroup.visible = true;
                this[`maxWinLabel`].text = "最高可得: " + parseInt(0.1 * this.utilsBet * 4000 + ""); "";
            } else if (this.sceneId >= 1016) {
                // "最高可得: " + parseInt(game.LaohuUtils.bet * game.LaohuUtils.mul * 100 * (20 * 3 * 30 + 20 * 18 + 15 * 8) + "") + "";
            }

        }
        /**
         * 减注按钮悬浮效果移除
         */

        protected changeBetSubBtn2() {
            this.subbet.currentState = "up";
        }
        /**
         * maxbet按钮悬浮效果
         */
        protected changeyazhuBtn() {
            this.maxBet.source = RES.getRes("ayls_bet2_png");
        }
        /**
         * maxbet按钮悬浮效果移除
         */
        protected changeyazhuBtn2() {
            this.maxBet.source = RES.getRes("ayls_bet1_png");
        }
        /**
         * 自动游戏按钮悬浮效果
         */
        protected changeAutoRunBtn() {
            this.autoGameBtn.currentState = "down";
        }
        /**
         * 自动游戏按钮悬浮效果移除
         */
        protected changeAutoRunBtn2() {
            this.autoGameBtn.currentState = "up";
        }
        /**
         * 游戏记录按钮悬浮效果
         */
        protected changeGameRecord() {
            this.recordBtn.currentState = "down";
        }
        /**
         * 游戏记录按钮悬浮效果移除
         */
        protected changeGameRecord2() {
            this.recordBtn.currentState = "up";
        }
        /**
         * 退出游戏按钮悬浮效果
         */
        protected changeOutBtn() {
            this[`quitBtn`].currentState = "donw";
        }
        /**
         * 退出游戏按钮悬浮效果移除
         */
        protected changeOutBtn2() {
            this[`quitBtn`].currentState = "up";
        }

        public onTouchTap(e: egret.TouchEvent) {
            event.stopPropagation();
            switch (e.target) {
                case this.quitBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    if (game.LaohuUtils.isAutoGame) return;
                    CF.sN(this.QUIT_NOTIFY);
                    break;
                case this.setingBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    this.menuGroup.visible = false;
                    CF.sN(this.SETING_NOTIFY);
                    break;
                case this.tipsBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    CF.sN(this.TIPS_NOTIFY);
                    break;
                case this.autoGameBtn:
                    if (this.sceneId <= 1010) {
                        if (this.utilsTotalMoney < this.utilsBet * 2) {
                            Global.alertMediator.addAlert("金币不足", () => {
                            }, "", true);
                            return;
                        }
                    } else if (this.sceneId >= 1011) {
                        if (this.utilsTotalMoney < this.utilsBet * 0.5) {
                            Global.alertMediator.addAlert("金币不足", () => {
                            }, "", true);
                            return;
                        }
                    }
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    CF.sN(this.AUTOGAME_NOTIFY);
                    break;
                case this.recordBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    this.menuGroup.visible = false;
                    CF.sN(this.RECORD_NOTIFY);
                    break;
                case this.memuBtn:
                    SoundManager.getInstance().playEffect(this.buttonEffect);
                    if (this[`menuGroup`].visible == false) {
                        this[`menuGroup`].visible = true;
                    } else {
                        this[`menuGroup`].visible = false;
                    }
                    break;
                case this.startBtn0:
                    this.startBtnTouch0();
                    break;
            }
        }

        /**
       * 开始游戏发送请求
       */
        public async startGame() {
            let resp1: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {});
            let data = { "gameId": Global.gameProxy.gameIds["slot"], "sceneId": this.sceneId }
            let resp: any = await Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data);
            if (resp) {
                if (resp.error.code != 0) {
                    let text = resp.error.msg;
                    CF.sN(this.CLOSE_NOTIFY);
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    Global.alertMediator.addAlert(text, () => {
                    }, "", true);
                    return;
                }
            }
            else {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
            }
        }

        /**
         * 功能按钮效果还原
         */
        protected resetOtherBtn() {
            var colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.recordBtn.filters = this.setingBtn.filters = this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.setingBtn.touchEnabled = this.recordBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = true;
            if (!game.LaohuUtils.isAutoGame) this[`quitBtn`].touchEnabled = true;
        }

        /**
        * 功能按钮屏蔽效果
        */
        protected setOtherBtn() {
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.recordBtn.filters = this.setingBtn.filters = this.memuBtn.filters = this.autoGameBtn.filters = this.tipsBtn.filters = this.addbet.filters = this.subbet.filters = this.maxBet.filters = [colorFlilter];
            this.setingBtn.touchEnabled = this.recordBtn.touchEnabled = this.quitBtn.touchEnabled = this.memuBtn.touchEnabled = this.autoGameBtn.touchEnabled = this.tipsBtn.touchEnabled = this.addbet.touchEnabled = this.subbet.touchEnabled = this.maxBet.touchEnabled = false;
        }

        protected startBtnTouch0() {

        }


        /**
         * 第3条中奖连线
         */
        public rdsgLineBig: DBComponent;
        /**
         * 第4条中奖连线
         */
        public rdsgLineHuge: DBComponent;
        /**
         * 第2条中奖连线
         */
        public rdsgLineMid: DBComponent;
        /**
         * 第1条中奖连线
         */
        public rdsgLineSmall: DBComponent;
        public i: number = 0;
        public j: number = 0;
        /**
         * 中奖数组的元素（数组）
         */
        public atr1: Array<any> = [];
        /**
         * 中奖数组的数组的元素
         */
        public atr2: Array<any> = [];
        /**
         * 中奖连线对象的存储数组
         */
        public aniPool: Array<any> = [];
        public array1: Array<any>;
        public array2: Array<any>;
        /**
         * 是否停止添加连线
         */
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
                    /**
                     * 前一列减后一列取绝对值决定使用哪种线
                     */
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 1:
                            this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 0:
                            this.midLineHandle(object, this.atr2[this.i]);
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
            /**
             * icon的宽/高取arctan值得到线动画rotation属性
             */
            if (num == 2) {
                return this.lineAniRotation[0];
            } else if (num == -2) {
                return this.lineAniRotation[1];
            } else if (num == 1) {
                return this.lineAniRotation[2];
            } else if (num == -1) {
                return this.lineAniRotation[3];
            } else if (num == 0) {
                return 0;
            }
        }


        /**
         * 长连线播放
         */
        public hugeLineHandle(object: any, position: number, postion2: number) {
            let rdsgLineHuge = new DBComponent(this.lineHuge);
            rdsgLineHuge.play(this.lineHuge + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineHuge.rotation = this.routationHandle(2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[0]);
            } else {
                rdsgLineHuge.rotation = this.routationHandle(-2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[1]);
            }
            rdsgLineHuge.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineHuge.callback = () => {
                rdsgLineHuge.play(this.lineHuge + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineHuge);
            rdsgLineHuge.anchorOffsetY = rdsgLineHuge.height / 2;
            rdsgLineHuge.resetPosition();
            this.aniPool.push(rdsgLineHuge);
        }


        /**
         * 中连线播放
         */
        public bigLineHandle(object: any, position: number, position2: number) {
            let rdsgLineBig = new DBComponent(this.lineBig);
            rdsgLineBig.play(this.lineBig + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineBig.rotation = this.routationHandle(1);
                if (this.fixpositionY[3]) {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[3]);
                } else {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
                }
            } else {
                rdsgLineBig.rotation = this.routationHandle(-1);
                rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
            }
            rdsgLineBig.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineBig.callback = () => {
                rdsgLineBig.play(this.lineBig + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineBig);
            rdsgLineBig.anchorOffsetY = rdsgLineBig.height / 2;
            rdsgLineBig.resetPosition();
            this.aniPool.push(rdsgLineBig);
        }


        /**
         * 短连线播放
         */
        public midLineHandle(object: any, position: number) {
            let rdsgLineMid = new DBComponent(this.lineMid);
            rdsgLineMid.play(this.lineMid + "_begin", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = () => {
                rdsgLineMid.play(this.lineMid + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineMid);
            rdsgLineMid.anchorOffsetY = rdsgLineMid.height / 2;
            rdsgLineMid.resetPosition();
            this.aniPool.push(rdsgLineMid);
        }


        /**
         * 开头连线链接
         * @param  {Array<any>} str
         */
        public addFirstAni(str: any) {
            let rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.firstLineX;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play(this.lineSmall + "_common", 0);
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
            let rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.lastLineX;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play(this.lineSmall + "_common", 0);
            }
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        }


        /**
         * 设置连线bottom属性
         * @param  {any} postion
         */
        public aniPositionYHandle(postion: any, fixposition?: any) {
            if (postion == 0) {
                if (fixposition) {
                    return this.lineAniYArray[0] - fixposition;
                }
                return this.lineAniYArray[0];
            } else if (postion == 1) {
                if (fixposition) {
                    return this.lineAniYArray[1] - fixposition;
                }
                return this.lineAniYArray[1];
            } else if (postion == 2) {
                if (fixposition) {
                    return this.lineAniYArray[2] - fixposition;
                }
                return this.lineAniYArray[2];
            }
        }


        /**
         * 动画horizonCenter设置
         * @param  {any} x
         */
        public aniPositionXHandle(x: any) {
            if (x == 0) {
                return this.lineAniXArray[0];
            } else if (x == 1) {
                return this.lineAniXArray[1];
            } else if (x == 2) {
                return this.lineAniXArray[2];
            } else if (x == 3) {
                return this.lineAniXArray[3];
            } else if (x == 4) {
                return this.lineAniXArray[4];
            }
        }


        /**
         * 连线动画对象池清空
         */
        public clearAniPool() {
            if (this.aniPool) {
                for (let i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        }
        /**
         * 所有中奖图标动画
         */
        protected checkBonusIcon() { }
        /**
         * 每条连线动画展示
         */
        protected addEachLineAni() { }
        /**
         * 加速效果timeout对象
         */
        protected scatter3timeout: any;
        /**
         * 加速效果timeout对象
         */
        protected scatter4timeout: any;
        /**
         * 加速效果timeout对象
         */
        protected scatter5timeout: any;

        protected setAutoTimeout(fn, thisObj, time) {
            for (var a = [], n = 3; n < arguments.length; n++) a[n - 3] = arguments[n];
            return (s = this.pauseHandler).setAutoTimeout.apply(s, [fn, thisObj, time].concat(a));
            var s
        }
        /**
         * 部分转轴加速
         * @param  {number} index
         */
        public scrollerItemFast(index: number, atr: Array<Array<number>>) {
            if (Global.runBack) {
                return;
            }
            let item3 = this.scroller[`item${3}`];
            let item4 = this.scroller[`item${4}`];
            let item5 = this.scroller[`item${5}`];
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    let temp_atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [], [], []];
                    if (this.isSetHui) this.scroller.setSpecilHui(temp_atr);
                    this.scroller.item1.resetIconHui(this.yudiAtrHui[0]);
                    this.scroller.item2.resetIconHui(this.yudiAtrHui[1]);
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs") this.addScatterAni(3, 0)
                    else { this.scroller.addScatterAni(3, 0); }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true);
                    this.scatter3timeout = this.setAutoTimeout(() => {
                        item3.changeResult(atr[2]);
                        if (this.isSetHui) this.scroller.setSpecilHui([[], [], [0, 1, 2], [], []]);
                        if (this.yudiAtrHui2[2] && this.yudiAtrHui2[2] == 3) this.scroller.item3.resetIconHui(this.yudiAtrHui[2]);
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(3)
                        else if (this.gameId == "bscs") this.removeScatterAni(3);
                        if (this.gameId == "bscs") this.addScatterAni(4, 0)
                        else { this.scroller.addScatterAni(4, 0); }
                    }, this, this.fastSpeedTime);
                    this.scatter4timeout = this.setAutoTimeout(() => {
                        item4.changeResult(atr[3]);
                        if (this.isSetHui) this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                        if (this.yudiAtrHui2[2] && this.yudiAtrHui2[2] == 4) this.scroller.item4.resetIconHui(this.yudiAtrHui[2]);
                        if (this.yudiAtrHui2[3] && this.yudiAtrHui2[3] == 4) this.scroller.item4.resetIconHui(this.yudiAtrHui[3]);
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(4)
                        else if (this.gameId == "bscs") this.removeScatterAni(4);
                        if (this.gameId == "bscs") this.addScatterAni(5, 0)
                        else { this.scroller.addScatterAni(5, 0); }
                    }, this, this.fastSpeedTime * 2);
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(5)
                        else if (this.gameId == "bscs") this.removeScatterAni(5);
                        if (this.isSetHui) this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime * 3);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    let temp_atr2: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [], []];
                    if (this.isSetHui) this.scroller.setSpecilHui(temp_atr2);
                    if (this.yudiAtrHui2[0] == 1) this.scroller.item1.resetIconHui(this.yudiAtrHui[0]);
                    if (this.yudiAtrHui2[0] == 2) this.scroller.item2.resetIconHui(this.yudiAtrHui[0]);
                    if (this.yudiAtrHui2[1] == 2) this.scroller.item2.resetIconHui(this.yudiAtrHui[1]);
                    if (this.yudiAtrHui2[1] == 3) this.scroller.item3.resetIconHui(this.yudiAtrHui[1]);
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs") this.addScatterAni(4, 0)
                    else { this.scroller.addScatterAni(4, 0); }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true)
                    this.scatter4timeout = this.setAutoTimeout(() => {
                        item4.changeResult(atr[3]);
                        if (this.isSetHui) this.scroller.setSpecilHui([[], [], [], [0, 1, 2], []]);
                        for (let i = 0; i < this.yudiAtrHui2.length; i++) {
                            if (this.yudiAtrHui2[i] == 4) {
                                this.scroller.item4.resetIconHui(this.yudiAtrHui[this.yudiAtrHui[i]]);
                            }
                        }
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(4)
                        else if (this.gameId == "bscs") this.removeScatterAni(4);
                        if (this.gameId == "bscs") this.addScatterAni(5, 0)
                        else { this.scroller.addScatterAni(5, 0); }
                    }, this, this.fastSpeedTime);
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(5)
                        else if (this.gameId == "bscs") this.removeScatterAni(5);
                        if (this.isSetHui) this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime * 2);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    if (this.gameId == "bscs") this.addScatterAni(5, 0)
                    else { this.scroller.addScatterAni(5, 0); }
                    let temp_atr3: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], []];
                    if (this.isSetHui) this.scroller.setSpecilHui(temp_atr3);
                    for (let i = 0; i < this.yudiAtrHui2.length; i++) {
                        if (this.yudiAtrHui2[i] == 1) {
                            this.scroller.item1.resetIconHui(this.yudiAtrHui[i]);
                        } else if (this.yudiAtrHui2[i] == 2) {
                            this.scroller.item2.resetIconHui(this.yudiAtrHui[i]);
                        } else if (this.yudiAtrHui2[i] == 3) {
                            this.scroller.item3.resetIconHui(this.yudiAtrHui[i]);
                        } else if (this.yudiAtrHui2[i] == 4) {
                            this.scroller.item4.resetIconHui(this.yudiAtrHui[i]);
                        }
                    }
                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true)
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        if (this.gameId != "bscs") this.scroller.removeScatterAni(5)
                        else if (this.gameId == "bscs") this.removeScatterAni(5);
                        if (this.isSetHui) this.scroller.removeIconHui(this.HuiAtr);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime);

                    break;
            }

        }
        public lineImaPool: Array<any> = [];
        /**
         * 连线为图片时
         */
        public lineUseImag(lineIndex: number) {
            let Line: eui.Image = new eui.Image(this.gameId + "_line_" + lineIndex + "_png");
            Line.alpha = 0;
            Line.horizontalCenter = Line.verticalCenter = 0;
            this.winLineGroup.addChild(Line);
            this.lineImaPool.push(Line);
            egret.Tween.get(Line).to({ alpha: 1 }, 1000, egret.Ease.circOut).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(() => {
                game.UIUtils.removeSelf(Line);
                Line = null;
            })
        }
        /**
         * 图片连线的移除，释放内存
         */
        public clearLineImaPool() {
            if (this.lineImaPool) {
                for (let i = 0; i < this.lineImaPool.length; i++) {
                    game.UIUtils.removeSelf(this.lineImaPool[i]);
                    this.lineImaPool[i] = null;
                }
            }
        }

        public scatterAni: DBComponent;

        /**
		 * @param  {number} index
		 */
        public addScatterAni(index: number, fixPosition?: number) {
            this.scatterAni = new DBComponent("bscq_reel_fast");
            switch (index) {
                case 3:
                    this.scatterAni.x = 508 - fixPosition;
                    this.scatterAni.y = 243;
                    this.scatterAni.scaleY = 1;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = 712 - fixPosition;
                    this.scatterAni.y = 243;
                    this.scatterAni.scaleY = 1;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = 916 - fixPosition;
                    this.scatterAni.y = 243;
                    this.winLineGroup.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }

        }
        /**
		 * @param  {} index?
		 */
        public removeScatterAni(index?) {
            game.UIUtils.removeSelf(this.scatterAni);
        }

        protected showSmashingAni() {

        }

        /**
        * 部分转轴加速
        * @param  {number} index
        */
        public scrollerFast(index: number, atr: Array<Array<number>>) {
            if (Global.runBack) {
                return;
            }
            if (this.isFastGame) return;
            let item3 = this.scroller[`item${3}`];
            let item4 = this.scroller[`item${4}`];
            let item5 = this.scroller[`item${5}`];
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    let temp_atr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [], [], []];
                    this.scroller.item3.speed = 85;
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(3, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect);
                    this.scatter3timeout = this.setAutoTimeout(() => {
                        item3.changeResult(atr[2]);
                        this.scroller.removeScatterAni(3);
                        this.scroller.addScatterAni(4, 0);
                    }, this, this.fastSpeedTime);
                    this.scatter4timeout = this.setAutoTimeout(() => {
                        item4.changeResult(atr[3]);
                        this.scroller.removeScatterAni(4)
                        this.scroller.addScatterAni(5, 0);
                    }, this, this.fastSpeedTime * 2);
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        this.scroller.removeScatterAni(5)
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime * 3);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    let temp_atr2: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [], []];
                    this.scroller.item4.speed = 85;
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(4, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect)
                    this.scatter4timeout = this.setAutoTimeout(() => {
                        item4.changeResult(atr[3]);

                        this.removeScatterAni(4);
                        this.scroller.addScatterAni(5, 0);
                    }, this, this.fastSpeedTime);
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        this.scroller.removeScatterAni(5)
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime * 2);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.speed = 85;
                    this.scroller.addScatterAni(5, 0);
                    let temp_atr3: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], []];

                    this.scroller.speed = 85;
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect)
                    this.scatter5timeout = this.setAutoTimeout(() => {
                        item5.changeResult(atr[4]);
                        this.scroller.removeScatterAni(5)
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, this.fastSpeedTime);

                    break;
            }

        }

        public startBtnTouch() { };
        public lineTime: number = 1500;
        public autoGameTimeout: any;

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


        protected checkQuitVisible() {
            if (this.quitBtn) {
                if (ServerConfig.OP_RETURN_TYPE != "3") {
                    this[`quitBtn`].visible = true;;
                }
            }
        }


        /**
		 * 超时未下注请出房间
		 */
        protected kickGame(e: egret.Event) {
            let text = e.data.reason;
            let webviewType = Utils.getURLQueryString("webview")
            if (webviewType == "app" || ServerConfig.OP_RETURN_TYPE == "3") {
                Global.alertMediator.addAlert(text + ",请刷新页面重新进入游戏", () => {
                    FrameUtils.flushWindow();
                }, null, true);
                return;
            }
            Global.alertMediator.addAlert(text, () => {
                Global.playerProxy.updatePlayerInfo(async () => {
                    this.closeGame("");
                })
            }, "", true);
            return;
        }


        public closeGame(text: string) {
            let type = ServerConfig.OP_RETURN_TYPE == "3";
            let callback = () => {
                if (type) {
                    FrameUtils.flushWindow();
                } else {
                    this.closeGameCall();
                }
            }
            if (text) {
                Global.alertMediator.addAlert(text, () => {
                    callback();
                }, null, true)
            } else {
                callback();
            }
        }

        protected closeGameCall() {

        }

        protected enterOtherGame(e: egret.Event) {
            let resp = e.data;
            let text: string;
            if (resp.sceneId == 1001) {
                if (resp.isScatter) {
                    text = "您在“大闹天宫”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“大闹天宫”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1002) {
                if (resp.isScatter) {
                    text = "您在“神雕侠侣”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“神雕侠侣”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1003) {
                if (resp.isScatter) {
                    text = "您在“赤壁之战”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“赤壁之战”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1004) {
                if (resp.isScatter) {
                    text = "您在“四大美女”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“四大美女”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }

            else if (resp.sceneId == 1005) {
                if (resp.isScatter) {
                    text = "您在“宝石矿工”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“宝石矿工”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1006) {
                if (resp.isScatter) {
                    text = "您在“热带水果”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“热带水果”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1007) {
                if (resp.isScatter) {
                    text = "您在“暗夜猎手”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“暗夜猎手”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1008) {
                if (resp.isScatter) {
                    text = "您在“格斗之王”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“格斗之王”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1009) {
                if (resp.isScatter) {
                    text = "您在“白蛇传说”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“白蛇传说”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1010) {
                if (resp.isScatter) {
                    text = "您在“嫦娥奔月”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“嫦娥奔月”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1016) {
                if (resp.isScatter) {
                    text = "您在“星尘宝石”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“星尘宝石”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1017) {
                if (resp.isScatter) {
                    text = "您在“水果武士”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“水果武士”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            } else if (resp.sceneId == 1018) {
                if (resp.isScatter) {
                    text = "您在“鼠年有喜”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“鼠年有喜”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            if (resp) {
                Global.alertMediator.addAlert(text, () => {
                    this.closeGame(null);
                }, "", true);
            }
        }
    }
}

