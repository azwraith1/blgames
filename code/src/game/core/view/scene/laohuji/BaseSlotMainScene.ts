/*
 * @Author: reel MC Lee 
 * @Date: 2019-08-08 18:40:53 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-30 10:20:36
 * @Description: slot mainscene 基类
 */
module game {
    export abstract class BaseSlotMainScene extends BaseScene {
        abstract gameId;
        abstract scene1;
        abstract scene3;
        abstract enterFreeNotify: string;
        abstract quitFreeNotify: string;
        abstract startFreeSceneNotify: string;
        abstract closeSceneNotify: string;
        abstract closeAutNotify: string;
        abstract closeTipsNotify: string;
        public deskMate: slot.SlotDeskMate;
        public closeDeskTimeOut: any;

        public constructor() {
            super();
        }

        public createChildren() {
            super.createChildren();
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

        public s_pushRaceInvite() {

        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.aE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.aE(this.enterFreeNotify, this.enterFreeGame, this);
            CF.aE(this.quitFreeNotify, this.quitFreeGame, this);
            CF.aE(this.startFreeSceneNotify, this.startFreeGame, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
            CF.aE(ServerNotify.s_enterResult, this.enterGame, this);
            CF.aE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
        }

        public onRemoved() {
            super.onRemoved();
            egret.clearTimeout(this.closeDeskTimeOut);
            game.LaohuUtils.isTips = false;
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_enterOtherSlotScene, this.enterOtherGame, this);
            CF.rE(ServerNotify.s_kickGame, this.kickGame, this);
            CF.rE(this.enterFreeNotify, this.enterFreeGame, this);
            CF.rE(this.quitFreeNotify, this.quitFreeGame, this);
            CF.rE(this.startFreeSceneNotify, this.startFreeGame, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ServerNotify.s_playerQuitRoom, this.playerQuit, this);
            CF.rE(ServerNotify.s_enterResult, this.enterGame, this);
            this.deskMate.openrect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDesk, this);
            this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.touchOn, this);
            this.deskMate.openrect.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.touchOff, this);
            CF.rE(ServerNotify.s_playerBigWin, this.deskmateBigwin, this);
            this.clearDeskArray();
        }

        public clearDeskArray() {
            game.LaohuUtils.slotDeskGid = [];
            game.LaohuUtils.slotDeskHead = [];
            game.LaohuUtils.slotDeskName = [];
            game.LaohuUtils.playerEnter = {
                gid: 0, head: "", name: ""
            };
        }

        /**
        * 重连成功后退回大厅
        * @param  {egret.Event} e
        */
        protected async reconnectSuc(e: egret.Event) {
            game.LaohuUtils.auto_times = 0;
            SoundManager.getInstance().stopEffectByName(this.gameId + "_reel_mp3");
            let webviewType = Utils.getURLQueryString("webview")
            if (webviewType == "app" || ServerConfig.OP_RETURN_TYPE == "3") {
                Global.alertMediator.addAlert("请刷新页面重新进入游戏", () => {
                    FrameUtils.flushWindow();
                }, null, true);
            } else {
                CF.sN(SceneNotify.OPEN_MAIN_HALL);
            }
            CF.sN(this.closeSceneNotify);
            CF.sN(this.closeAutNotify);
            CF.sN(this.closeTipsNotify);
            CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
            CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            game.LaohuUtils.isAutoGame = game.LaohuUtils.stopAuto = false;
            game.LaohuUtils.oneMax = game.LaohuUtils.totalAdd = game.LaohuUtils.totalWin = 0;
        }
        /**
        * 其他slot游戏
        * @param  {egret.Event} e
        */
        public enterOtherGame(e: egret.Event) {
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
            } else if (resp.sceneId == 1004) {
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
            }
            else if (resp.sceneId == 1003) {
                if (resp.isScatter) {
                    text = "您在“赤壁之战”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“赤壁之战”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1006) {
                if (resp.isScatter) {
                    text = "您在“热带水果”中还有未完成的免费游戏，请先去完成吧";
                } else if (resp.freeTimes) {
                    text = "您在“热带水果”中还有" + resp.freeTimes + "次免费游戏,请先去完成吧";
                }
            }
            else if (resp.sceneId == 1008) {
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
                    this.closeGame();
                }, "", true);
            }
        }

        public closeGame(text: string = null) {
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


        abstract closeGameCall();

        /**
         * 超时未下注请出房间
         */
        public kickGame(e: egret.Event) {
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
                    CF.sN(SceneNotify.OPEN_MAIN_HALL);
                    CF.sN(this.closeSceneNotify);
                    CF.sN(this.closeAutNotify);
                    CF.sN(this.closeTipsNotify);
                    CF.sN(PanelNotify.CLOSE_SETTING_LAOHU_PANEL);
                    CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
                    game.LaohuUtils.isAutoGame = game.LaohuUtils.stopAuto = false;
                    game.LaohuUtils.oneMax = game.LaohuUtils.totalAdd = game.LaohuUtils.totalWin = 0;
                })
                // CF.sN(PanelNotify.CLOSE_DNTG_RECORD_PANEL);
            }, "", true);
            return;
        }

        /**
         * 进入免费游戏
         */
        protected enterFreeGame(e: egret.Event) {
        }

        protected startFreeGame() {
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

        /**
        * 退出免费游戏
        */
        protected quitFreeGame() {
        }

        protected enterGame(e: egret.Event) {

            let resp = e.data;
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

        public playerQuit(e: egret.Event) {
            let player = e.data;
            game.LaohuUtils.playerEnter = {
                gid: player.playerIndex,
                name: "",
                head: ""
            }
            this.deskMate.playerLeave();
        }

        public touchOn() {
            this.deskMate.touchOn();
        }

        public touchOff() {
            this.deskMate.touchOff();
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
    }
}