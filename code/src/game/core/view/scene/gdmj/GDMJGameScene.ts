module majiang {
    export class GDMJGameScene extends BaseMajiangScene {
        public pmdKey: string = "gdmj";
        public laiziGroup: eui.Group;
        public laiziColorImage: eui.Image;
        public startNumber: number = 136;
        public touchShoupai: GDMJMineShoupai;
        public mineShoupaiGroup: GDMJMineShoupaiGroup;
        public huTipsBar: HuTipsScrollerBar;
        public constructor() {
            super();
            this.skinName = new majiang.GDMJGameSceneSkin();
            this.leftHuShowGroup.removeChildren();
            this.rightHuShowGroup.removeChildren();
            this.topHuShowGroup.removeChildren();
            this.mineHuShowGroup.removeChildren();
        }

        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        public fapaiRound4(sortDir) {
            let indexNum = 0;
            let fapaiCall = (index) => {
                if (indexNum == 0) {
                    this.paiQiang.removeNumByIndex();
                    this.paiQiang.removeNumByIndex();
                    this.updateSypai();
                } else if (indexNum == 1) {
                    this.paiQiang.removeNumByIndex();
                    this.updateSypai();
                } else {
                    this.paiQiang.removeNumByIndex();
                    this.updateSypai();
                }
                if (index == Global.gameProxy.playerInfo.playerIndex) {
                    this.mineFapaiAni(13);
                } else {
                    this.otherFapaiAni(index, 13);
                }
                indexNum++;
            }

            if (Global.runBack) {
                for (let i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.updateSypai();
                this.mineShoupaiGroup.sortShoupais();
                this.runSetBaoCard();
                return;
            }

            async.eachSeries(sortDir, (index, callback) => {
                fapaiCall(index);
                this.setAutoTimeout(callback, this, GameConfig.time_config['200']);
            }, () => {
                this.setAutoTimeout(() => {
                    if (!Global.gameProxy.roomInfo) {
                        return;
                    }
                    this.mineShoupaiGroup.visible = false;
                    this.mineKoupaiGroup.visible = true;
                    // this.paiQiang.currentNumber++;
                    this.updateSypai();
                    this.mineShoupaiGroup.sortShoupais();
                    this.setAutoTimeout(() => {
                        this.fapaiRoundOver();
                    }, this, 400);
                }, this, 400);
            });
        }


        public fapaiRoundOver() {
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            this.setAutoTimeout(() => {
                LogUtils.logD("===========fapaiRoundOver===========");
                this.runSetBaoCard();
            }, this, 200);
        }

        /**
         * 定癞子流程
         */
        public runSetBaoCard() {
            let roomInfo = Global.gameProxy.roomInfo;
            //  LogUtils.logD("===runSetBaoCard==" + JSON.stringify(roomInfo));
            roomInfo.baoCards = this.baoCard;
            let direction = this.directions[roomInfo.dealer];
            let chupaiGroup = this[`${direction}ChupaiGroup`] as LeftChupaiGroup;
            chupaiGroup.addChupai(roomInfo.fanCard);
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            this.setAutoTimeout(() => {
                let cardAni = new GDMJBaoCardAni(roomInfo.baoCards[0]);
                this.effectGroup.addChild(cardAni);
                cardAni.horizontalCenter = 0;
                cardAni.verticalCenter = -40;
                this.setAutoTimeout(() => {
                    let colorImage = cardAni.pai;
                    let pos = colorImage.localToGlobal();
                    this.effectGroup.addChild(colorImage);
                    colorImage.x = pos.x + colorImage.anchorOffsetX;
                    colorImage.y = pos.y + colorImage.anchorOffsetY;
                    game.UIUtils.removeSelf(cardAni);
                    cardAni = null;
                    let movePos = this.laiziColorImage.localToGlobal();
                    egret.Tween.get(colorImage).to({
                        x: movePos.x + 20,
                        y: movePos.y + 20,
                        scaleX: 0.4,
                        scaleY: 0.4
                    }, 300).call(() => {
                        game.UIUtils.removeSelf(colorImage);
                        colorImage = null;
                        this.showLaiziCard();
                        this.runBuyHouse();
                        this.updateSypai();
                        egret.setTimeout(() => {
                            this.mineShoupaiGroup.sortShoupais();
                            this.startChupai();
                        }, this, 500);
                    })
                }, this, 2000)
            }, this, 700);
            //定癞子动画
        }

        /**
         * 买马
         */
        public runBuyHouse(needRemove = true) {
            if (needRemove) {
                for (let i = 0; i < 4; i++) {
                    this.paiQiang.removeLast();
                }
            }
            // this.updateSypai();
            this.mineHupaiGroup.addHousePai();
            this.leftHupaiGroup.addHousePai();
            this.rightHupaiGroup.addHousePai();
            this.topHupaiGroup.addHousePai();
        }


        public startChupai() {
            let roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            this.checkChupaiStatus();
            this.timeDirectionBar.startTime(this);
        }

        public checkChupaiStatus() {
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != 0) {
                let direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                this.showShoupai(direction);
                //这里判断如果手牌=14 则把最后一张牌给change出去
                let playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkShowTips();
            }
        }

        /**
         * 显示重新连接上来的UI
         */
        public showReconnectUI() {
            // this.checkHszStatus(roomInfo);
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay == 0) {
                roomInfo.curPlay = roomInfo.dealer;
            }
            this.showLaiziCard();
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        }

        /**
         * 回显
         */
        public showLaiziCard() {
            let roomInfo = Global.gameProxy.roomInfo;
            let card = roomInfo.baoCards[0];
            this.laiziGroup.visible = true;
            this.laiziColorImage.source = RES.getRes(`color_value_${card}_png`);
        }

        public renderContent() {
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            if (Global.gameProxy.reconnect) {
                let roomInfo = Global.gameProxy.roomInfo;
                // roomInfo.publicCardNum += 4;
                this.paiQiang.reloadPaiQiang();
                for (let i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.runBuyHouse();
                this.timeDirectionBar.startTime(this);
                this.reloadPlayerChupais();
                this.showShengyuPai();
                this.showReconnectUI();
                this.checkPlayerIsOver();
                this.checkPlayerHasJiao();
            } else {
                let roomInfo = Global.gameProxy.roomInfo;
                this.baoCard = roomInfo.baoCards;
                roomInfo.baoCards = null;
                this.showStartAni(() => {
                    //展现牌局开始动画
                    for (let i = 1; i <= 4; i++) {
                        this.showShoupaiByIndex(i, false);
                    }
                    this.setAutoTimeout(this.fapaiAni, this, 500);
                })
            }
        }

        /**
         * 展示我的手牌
         */
        protected showShoupaiByMine(flag: boolean = true) {
            let cardsArr = Global.gameProxy.getMineSHoupaiArrLz();
            if (!flag) {
                cardsArr = _.shuffle(cardsArr);
            }
            this.mineShoupaiGroup.initWithArr(cardsArr, flag);
        }

        public playerPengCardPush(e: egret.Event) {
            super.playerPengCardPush(e);
            //播放碰牌音效
            // this.needCheckTing = true;
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
        }

        /**
         * 检查玩家是否有叫
         */
        public currentTings = [];
        public async checkPlayerHasJiao() {
            let mineInfo = Global.gameProxy.getMineGameData();
            this.currentTings = mineInfo.tingCards;
            if (this.currentTings) {
                this.tipBtn.visible = this.currentTings.length > 0;
                this.checkHuTips();
            }

        }

        public paiQiang: PaiQiang136;
        public async createChildren() {
            super.createChildren();
            // if (!Global.gameProxy.roomInfo) {
            // await Global.gameProxy.req2updateRoom();
            // }
            this.baoCard = Global.gameProxy.roomInfo.baoCards;
            this.dizhu.bold = true;
            this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;//this.difeng;
            //设置玩家座位标示
            this.majiangStatus = MajiangStatusEnum.READY;
            //记录玩家坐标
            this.directions = MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
            this.paiQiang.showPaiQiang(this.directions);
            this.renderChupaiGroups();
            this.renderHupaiGroup();
            this.renderContent();
            this.backMovie();
            this.wanfaImage.source = RES.getRes("gdmj_wanfa_png");
            this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
            SoundManager.getInstance().playMusic("playingingame_mp3");


        }

        public renderHupaiGroup() {
            let roomInfo = Global.gameProxy.roomInfo;
            for (let key in roomInfo.players) {
                let player: PlayerGameDataBean = roomInfo.players[key];
                let direction = this.directions[key];
                let hupaiGroup: MajiangHupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                let huCardsArr = this.getHupaiArrByHuTask(key);
                hupaiGroup.initWithArr(huCardsArr);
            }
        }


        public async onTouchTap(e: egret.TouchEvent) {
            e.stopPropagation();
            switch (e.target) {
                case this.restartBtn:
                    if (this.restartBtn.alpha != 1) {
                        return;
                    }
                    this.allowBack = this.restartBtn.visible;
                    if (this.isClubGame) {
                        this.back2ReadyScene(() => {

                            GDMJClubReadyScene.instance.show(true);
                            CF.sN(this.CLOSE_NOTIFY);
                        }, () => {
                            CF.sN(this.CLOSE_NOTIFY);
                        });
                        return;
                    }
                    this.restartBtnTouch();
                    break;
                case this.tipBtn:
                    if (this.recordBar) {
                        this.recordBar.hide();
                    }
                    if (this.ctBar) {
                        this.ctBar.hideBar();
                    }
                    this.tipsBtnTouch();
                    break;
                case this.lsBtn:
                    if (this.huTipsBar) {
                        this.huTipsBar.hideBar();
                    }
                    if (this.ctBar) {
                        this.ctBar.hideBar();
                    }
                    this.lsBtnTouch();
                    break;
                case this.ctBar:
                    break;
                case this.chatBtn:
                    if (this.recordBar) {
                        this.recordBar.hide();
                    }
                    if (this.huTipsBar) {
                        this.huTipsBar.hideBar();
                    }
                    this.chatBtnTouch();
                    break;
                case this.qxtgBtn:
                    this.cacelTuoguan();
                    break;
                case this.gnBtn://点击功能按钮
                    this.gnBtn.visible = false;
                    this.gnGroup.visible = true;
                    this.touchGroup.addChild(this.gnGroup);
                    //smart
                    if (this.isClubGame) {
                        this.fullScreenBtn.right = 53;
                        this.fullScreenBtn.top = 254;
                    }
                    else {
                        this.fullScreenBtn.right = 53;
                        this.fullScreenBtn.top = 326;
                    }
                    //smart
                    break;
                case this.btn_shou://收起展开的功能组
                    this.gnBtn.visible = true;
                    this.gnGroup.visible = false;
                    break;
                case this.btn_set://设置按钮，控制音乐音效的
                    this.settingBtnTouch();
                    this.gnBtn.visible = true;
                    this.gnGroup.visible = false;
                    break;
                case this.btn_help://帮助按钮
                    this.helpBtnTouch();
                    this.gnBtn.visible = true;
                    this.gnGroup.visible = false;
                    break;
                case this.touchGroup:
                    if (this.touchShoupai) {
                        this.touchShoupai.change2NoSelect();
                        this.touchShoupai = null;
                        CF.dP(ENo.FIND_COLOR, 0);
                    }
                    if (this.isTingStatus) {
                        this.clearTingStatus()
                        this.taskBar.visible = true;
                        this.mineShoupaiGroup.unLockAll();
                    }
                    this.hideBars();
                    break;
                case this.backBtn:
                    if (this.allowBack) {
                        this.backBtnTouch();
                        return;
                    }
                    if (this.restartBtn.alpha != 1) {
                        return;
                    }
                    this.allowBack = this.restartBtn.visible;
                    this.backBtnTouch();
                    break;
                case this.gmBtn:
                    this.showMajiangTest();
                    break;
                case this.gmStop:
                    var handler = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                    let multi = { multi: 10 };
                    let resp: any = await game.PomeloManager.instance.request(handler, multi);
                    if (resp.error && resp.error.code != 0) {
                        Global.alertMediator.addAlert("失败，重试", null, null, true);
                    }
                    break;
                case this.gmRun:
                    var handler1 = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                    let multi1 = { multi: 0 };
                    let resp1: any = await game.PomeloManager.instance.request(handler1, multi1);
                    if (resp.error && resp.error.code != 0) {
                        Global.alertMediator.addAlert("失败，重试", null, null, true);
                    }
                    break;
            }
        }



        /**
         * 出牌的点击
         * @param  {egret.TouchEvent} e
         */
        public shoupaiTouchOn(e: egret.TouchEvent) {
            let touchShoupai: GDMJMineShoupai = e.data;
            //出牌状态
            if (this.maxTouchShoupai == 1) {
                //已经有选择的牌
                if (this.touchShoupai == touchShoupai && this.touchShoupai.isSelect()) {
                    if (Global.gameProxy.getMineGameData().isBaoTing && this.touchShoupai != this.mineShoupaiGroup.mopai) {
                        return;
                    }
                    if (!Global.gameProxy.checkIsRoundMe()) {
                        return;
                    }
                    if (this.lockChupai) {
                        return;
                    }
                    //如果是轮到出牌
                    CF.dP(ENo.FIND_COLOR, 0);
                    this.chupaiReq(touchShoupai);
                    return;
                    //出牌
                } else {
                    if (this.touchShoupai) {
                        this.touchShoupaiClear();
                    }
                    this.touchShoupai = touchShoupai;
                    this.touchShoupai.selectUp();
                    CF.dP(ENo.FIND_COLOR, this.touchShoupai.value);
                    this.showHuTips();
                }
            }
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.aE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.aE(ServerNotify.s_curPlay, this.curPlayPush, this);
            CF.aE(ServerNotify.s_playCard, this.playCardPush, this);
            CF.aE(ServerNotify.s_publicCardChanged, this.publicCardChangedPush, this);
            CF.aE(ServerNotify.s_newCard, this.newCardPush, this);
            CF.aE(ServerNotify.s_playerPengCard, this.playerPengCardPush, this);
            CF.aE(ServerNotify.s_hangupTask, this.hangupTaskPush, this);
            CF.aE(ServerNotify.s_playerGangCard, this.playerGangCard, this);
            CF.aE(ServerNotify.s_playerHu, this.hupaiPush, this);
            CF.aE(ServerNotify.s_syncGold, this.syncGoldPush, this);
            CF.aE(ServerNotify.s_roundSettlement, this.settlementData, this);
            CF.aE(ServerNotify.s_roomFinished, this.roomGameOver, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_playerClearWaitTimeout, this.clearCountDown, this);
            CF.aE(ServerNotify.s_trustee, this.tuoguanStatusPush, this);
            CF.aE(ServerNotify.s_cancelGangForQG, this.qiangGangHu, this);
            CF.aE(ENo.SHOW_GNBTN, this.changGnBtnStat, this);
            CF.aE(ServerNotify.s_roomChat, this.sendMessage, this);
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            //smart
            CF.aE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
            CF.aE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
            //smart
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);

            //smart
            // CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.rE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.rE(ServerNotify.s_curPlay, this.curPlayPush, this);
            CF.rE(ServerNotify.s_playCard, this.playCardPush, this);
            CF.rE(ServerNotify.s_publicCardChanged, this.publicCardChangedPush, this);
            CF.rE(ServerNotify.s_newCard, this.newCardPush, this);
            CF.rE(ServerNotify.s_playerPengCard, this.playerPengCardPush, this);
            CF.rE(ServerNotify.s_hangupTask, this.hangupTaskPush, this);
            CF.rE(ServerNotify.s_playerGangCard, this.playerGangCard, this);
            CF.rE(ServerNotify.s_playerHu, this.hupaiPush, this);
            CF.rE(ServerNotify.s_syncGold, this.syncGoldPush, this);
            CF.rE(ServerNotify.s_roundSettlement, this.settlementData, this);
            CF.rE(ServerNotify.s_roomFinished, this.roomGameOver, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_playerClearWaitTimeout, this.clearCountDown, this);
            CF.rE(ServerNotify.s_trustee, this.tuoguanStatusPush, this);
            CF.rE(ServerNotify.s_cancelGangForQG, this.qiangGangHu, this);
            CF.rE(ENo.SHOW_GNBTN, this.changGnBtnStat, this);
            CF.rE(ServerNotify.s_roomChat, this.sendMessage, this);
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            //smart
            CF.rE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
            CF.rE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
            //smart
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            // CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        }
        // protected s_pushTableStateInfo(e: egret.Event) {
        //     let data = e.data;
        //     if (data.tableId == this.proxy.roomInfo.tableId) {
        //         this.proxy.roomInfo.state = data.status;
        //     }
        // }
        /**
         * 麻将关闭界面
         * @param  {egret.TouchEvent} e
         */
        public closeMJCall(e: egret.TouchEvent) {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        }

        public needCheckTing: boolean = true;
        /**
         * 听牌提示
         * @param  {egret.TouchEvent} e
         */
        public s_playerTingCards(e: egret.TouchEvent) {
            let data = e.data;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            if (data && data.outCardTingCards) {
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                // if (this.needCheckTing) {
                this.checkHuTips();
                // this.needCheckTing = false;
                // }
            }
            // if (data && data.tingCards) {
            //     let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            //     playerData.tingCards = this.currentTings = data.tingCards;
            // }
            //smart
            if (data.tingCards) {
                playerData.outCardTingCards = null;
                playerData.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData.tingCards.length > 0
            }
        }

        /**
         * 定癞子
         */
        public baoCard: number[];
        public s_roomSetBaoCard(e: egret.TouchEvent) {
            let data = e.data;
            LogUtils.logD("===GDMJGameScene===" + JSON.stringify(data));
            let baoCard = data.baoCard;
            let fanCard = data.fanCard;
            let roomInfo = Global.gameProxy.roomInfo;
            this.baoCard = [baoCard];//roomInfo.baoCards =
            //this.baoCard = [baoCard];
            // roomInfo.baoCard = baoCard;
            roomInfo.fanCard = fanCard;
        }

        /**
         * 买马
         */
        public s_roomBuyMa(e: egret.TouchEvent) {
            let data = e.data;
            let roomInfo = Global.gameProxy.roomInfo;
            roomInfo.maCardNumPerSeat = data.maCardNumPerSeat;
        }

        public tingInfoPush(e: egret.TouchEvent) {
            let data = e.data;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            playerData.tingCards = this.currentTings = data;
        }

        public add2HuGroup(card, playerIndex) {
            let direction = this.directions[playerIndex];
            this[`${direction}HupaiGroup`].addBuhua(card);
        }

        public clearTingStatus() {
            if (this.isTingStatus) {
                this.isTingStatus = false;
                let mineData = Global.gameProxy.getMineGameData();
                this.mineShoupaiGroup.unLockAll();
                if (mineData.isBaoTing) {
                    this.mineShoupaiGroup.playerTing();
                }
            }
        }

        /**
         * 玩家出牌推送
         * {"playerIndex":1,"card":28}
         * @param  {egret.Event} e
         */
        public playCardPush(e: egret.Event) {
            this.clearCountDown();
            this.clearTingStatus();
            let resp: any = e.data;
            let playerIndex = resp.playerIndex;
            let card = resp.card;
            let direction = this.directions[playerIndex];
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            // this.needCheckTing = false;
            if (direction == "mine") {
                // this.needCheckTing = false;
                this.closeGameTipsGroup();
                this.updateTingByValue(card);
                playerData.outCardTingCards = [];
                playerData.lastCard = 0;
                Global.gameProxy.updateWanjiaShoupai(card, -1);
                playerData.hangupTasks = null;
                this.taskBar.visible = false;
                this.taskBar.hideAllBtns();
                Global.gameProxy.clearTasks();
                //隐藏胡牌的箭头
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.mineShoupaiGroup.sortShoupaisByChupai(card);
                this.chupaiCallback();
                this.clearTouchOn();
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            } else {
                playerData.lastCard = 0;
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            MajiangUtils.playMJPTHSound(playerData.sex, card);
        }

        public clearTouchOn() {
            if (this.touchShoupai) {
                this.touchShoupai.change2NoSelect();
                this.touchShoupai = null;
                // this.hideBars();
                CF.dP(ENo.FIND_COLOR, 0);
            }
        }

        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        public showChupaiAni1(playerIndex, value) {
            let direction = this.directions[playerIndex];
            let name = direction + "_ChuShoupai";
            let tempChupai = GameCacheManager.instance.getCache(name, GDMJMineShoupai) as GDMJMineShoupai;
            tempChupai.resetValue(value);
            // let tempChupai = new GDMJMineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            let targetMajiang;
            switch (direction) {
                case "mine":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.65;
                    targetMajiang = this.mineChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    break;
                case "left":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.2;
                    tempChupai.y -= 50;
                    targetMajiang = this.leftChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
                    break;
            }
            let pos = targetMajiang.localToGlobal();
            if (Global.runBack) {
                this.showChupaiTips(pos, direction);
                game.UIUtils.removeSelf(tempChupai);
                targetMajiang.visible = true;
                return;
            }
            game.UIUtils.setAnchorPot(tempChupai);
            tempChupai.scaleX = 0;
            tempChupai.scaleY = 0;
            this.lastChupai = targetMajiang;
            egret.Tween.get(tempChupai).to({
                scaleX: 1,
                scaleY: 1
            }, 50).wait(500).to({
                scaleX: 0.5,
                scaleY: 0.5,
                y: pos.y + targetMajiang.height / 2,
                x: pos.x + targetMajiang.width / 2 + 10
            }, 100);
            this.setAutoTimeout(() => {
                this.showChupaiTips(pos, direction);
                game.UIUtils.removeSelf(tempChupai);
                targetMajiang.visible = true;
            }, this, 650)
        }

        /**
          * 玩家task推送
          * @param  {egret.Event} e
          */
        public hangupTaskPush(e: egret.Event) {
            let resp: any = e.data;
            let mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
        }


        /**
         * 检查task状态
         */
        public checkTask() {
            let roomInfo = Global.gameProxy.roomInfo;
            let startX = roomInfo.curPlay;
            let direction = this.directions[startX];
            //如果房间中是有任务状态
            let mine = Global.gameProxy.getMineGameData();
            if (mine.hangupTasks) {
                this.taskBar.showBtnsByData(mine);
                this.touchGroup.addChild(this.taskBar);
            }
        }

        /**
         * 玩家杠牌
         * {"playerIndex":1,"from":2,"card":12}
         * @param  {egret.Event} e
         */
        public playerGangCard(e: egret.Event) {
            this.clearCountDown();
            this.clearTingStatus()
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let from = resp.from;
            let direction = this.directions[playerIndex];
            let group: BaseShoupaiGroup = this[direction + "ShoupaiGroup"];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            //记录玩家杠牌
            Global.gameProxy.recordPlayerGang(resp);
            if (direction == "mine") {
                Global.gameProxy.clearLastPai();
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.hideBars();
                this.touchShoupaiClear();
            }
            this.addEffectAni(direction, "gang");
            this.hideChupaiTips();
            playerData.hangupTasks = null;
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                this.mineShoupaiGroup.removeShoupaiByGang(resp.card);
                this[direction + 'ShoupaiGroup'].hideMopai();
                // if(resp.gang == 2 || resp.gang == 4){
                //     this.updateTingByValue(resp.card);
                // }
            }

            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    //手上四张暗杠
                    break;
                case 3://点杠
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    let lastDirection = this.directions[from];
                    this[lastDirection + "ChupaiGroup"].removeLastChupai();
                    break;
            }


            //玩家在胡牌后，当玩家再次产生杠牌的时候，需要减少扣下的牌。
            switch (direction) {
                case "left":
                    if (this.leftHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
                case "right":
                    if (this.rightHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
                case "top":
                    if (this.topHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
            }

            //以上玩家数据修改 以下 玩家UI修改
            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(1, resp.card, 1);
                            break;
                        case "right":
                            this.rightPgGroup.add(1, resp.card, 1);
                            break
                        case "top":
                            this.topPgGroup.add(1, resp.card, 1);
                            break;
                        case "mine":
                            this.minePgGroup.add(1, resp.card, 1);
                            break;
                    }

                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。

                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(4, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(4, resp.card);
                            break
                        case "top":
                            this.topPgGroup.add(4, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(4, resp.card);
                            break;
                    }
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(2, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(2, resp.card);
                            break
                        case "top":
                            this.topPgGroup.add(2, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(2, resp.card);
                            break;
                    }

                    break;
                case 3://碰变杠,调4个正面，这里是自己碰，别人点。

                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(3, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(3, resp.card);
                            break;
                        case "top":
                            this.topPgGroup.add(3, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(3, resp.card);
                            break;
                    }

                    break;
            }
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "gang");
            group.hideMopai();
            //再次检查
            // this.checkTask();
        }


        public publicCardChangedPush(e: egret.Event) {
            let resp = e.data;
            if (resp.cardNum > 91) {
                return;
            }
        }

        /**
         * 摸牌推送
         * {"playerIndex":2,"card":24,"remain":80,existHangup:}
         * @param  {egret.Event} e
         */
        public newCardPush(e: egret.Event) {
            let resp = e.data;
            // this.taskBar.hideAllBtns();
            this.newCard(resp);
            if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                this.setAutoTimeout(() => {
                    CF.dP(ENo.TING_FLUSH, resp);
                }, this, 400);
            }
        }

        public newCard(resp) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            let direction = this.directions[resp.playerIndex];
            let playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            // this.needCheckTing = true;
            if (direction == "mine") {
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
                }
                //先刷新自己手牌
                this.checkHuTips();
                Global.gameProxy.updateWanjiaShoupai(resp.card, 1);
                playerData.lastCard = resp.card;
                if (playerData.isTrustee && Math.floor(resp.card / 5) == 0) {
                } else {
                    this.mineShoupaiGroup.playerNewCardPush(playerData.lastCard);
                    this.checkShowTips();
                    this.lockChupai = true;
                    egret.clearTimeout(this.lockChupaiTimeout);
                    this.lockChupaiTimeout = this.setAutoTimeout(function () {
                        this.lockChupai = false;;
                    }, this, 800);
                }
            } else {
                this[direction + "ShoupaiGroup"].playerNewCardPush();
                playerData.lastCard = 1;
            }

        }

        /**
         * 胡牌推送
         *  {"playerIndex":1,"card":23,"from":1,"syncGold":{"1":{"1":{"type":2,"info":{"gainGold":3,"pumpGold":0,"ownGold":9503,"card":23}}
         * "2":{"type":2,"info":{"gainGold":-3,"pumpGold":0,"ownGold":9497,"card":23}}}}}
         * @param  {egret.Event} e
         */
        public async hupaiPush(e: egret.Event) {
            this.clearCountDown();
            this.clearTingStatus()
            let resp: any = e.data;
            let playerIndex = resp.playerIndex;
            let card = resp.card;
            let from = resp.from;
            let mainCard = resp.mainCard;
            let mineData = Global.gameProxy.getMineGameData();
            Global.gameProxy.addHuTasks(resp);
            let huPlayerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            huPlayerData.huCards.push(card);
            let direction = this.directions[playerIndex];
            this.hideChupaiTips();
            this.taskBar.hideAllBtns();
            //zimo 
            if (Global.gameProxy.roomInfo.publicCardNum != 0) {//判断是否是最后一张胡牌。
                this.huPaiOrGameOver(direction);
            }
            if (direction == "mine") {
                this[direction + "ShoupaiGroup"].lockHu();
                this.touchShoupaiClear();
                this.mineShoupaiGroup.changePaiToVisible(false);
                if (Global.gameProxy.roomInfo.gameId.indexOf("xlch") > -1) {
                    this.setAutoTimeout(() => {
                        this.showGameTipGroup(3);
                    }, this, 2000);
                }
            }
            if (game.Utils.valueEqual(playerIndex, from)) {
                this[direction + "ShoupaiGroup"].hideMopai();
                if (direction == "mine") {
                    huPlayerData.lastCard = 0;
                    this.clearTouchOn();
                    Global.gameProxy.updateWanjiaShoupai(card, -1);
                    // this.mineShoupaiGroup.sortMineShoupai();
                }
                if (resp.gsh) {
                    this.addEffectAni(direction, "gsh")
                } else {
                    this.addEffectAni(direction, "zimo")
                }
                this[direction + "HupaiGroup"].addHu(resp, 2);
                majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
            } else {
                //点炮
                let lastDirection = this.directions[from];
                this.addEffectAni(direction, "hu");
                Global.gameProxy.recordChu2Dianpao(from);
                if (this.g2p == 1) {
                    this.setAutoTimeout(() => {
                        this[direction + "HupaiGroup"].addHu(resp, 1);
                    }, this, 400)
                } else {
                    let time = this[lastDirection + "ChupaiGroup"].showDianpaoAni(mainCard);
                    this.setAutoTimeout(() => {
                        this[direction + "HupaiGroup"].addHu(resp, 1);
                    }, this, time)
                }
                this.g2p = 0;
                majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "hu");
            }
        }

        /**
         * 玩家报听
         */
        public playerBaoTing(tasks) {
            this.isTingStatus = true;
            let tings = tasks[0].tings;
            this.mineShoupaiGroup.lockHu();
            if (this.mineShoupaiGroup.mopai) {
                this.mineShoupaiGroup.mopai.huLight();
            }
            for (let i = 0; i < tings.length; i++) {
                let task = tings[i];
                let out = task.out;
                this.mineShoupaiGroup.unLockByValue(out);
            }
        }

        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        public createHJZYByDirection(direction, value) {

        }

        public showHuangZhuang(callback: Function) {
            let image = new eui.Image(RES.getRes("dzmj_hpts_png"));
            image.horizontalCenter = 10;
            image.verticalCenter = -52.5;
            this.effectGroup.addChild(image);
            image.alpha = 0;
            image.horizontalCenter -= 30;
            egret.Tween.get(image)
                .to({ alpha: 0 }, 200)
                .to({ horizontalCenter: 10, alpha: 1 }, 1000)
                .wait(1000).call(callback, this);
        }

        /**
         * 游戏数据结算信息。
         */
        public async settlementData(e: egret.Event) {
            this.restartBtn.visible = false;
            this.majiangStatus = MajiangStatusEnum.OVER;
            this.timeDirectionBar.removeTimer();
            this.tgGroup.visible = false;
            let resp = e.data;
            LogUtils.logDJ("广东麻将 结算界面" + JSON.stringify(resp));
            let players = resp.players;
            this.gameOverShow(players);
            if (resp.winPlayer.length < 1) {
                this.showHuangZhuang(() => {
                    this.restartBtn.visible = true;
                    this.restartBtn.alpha = 0;
                    egret.Tween.get(this.restartBtn).to({
                        alpha: 1
                    }, 300);
                })
                return;
            }
            this.setAutoTimeout(() => {
                let kaima = new DBComponent("gdmj_kaima");
                this.effectGroup.addChild(kaima);
                kaima.horizontalCenter = 0;
                kaima.verticalCenter = -40;
                kaima.playByFilename(1);
                this.setAutoTimeout(() => {
                    let buyMaInfo = resp.buyMaInfo;
                    for (let key in buyMaInfo) {
                        let data = buyMaInfo[key][0];
                        let hupaiGroup = this[`${this.directions[key]}HupaiGroup`] as MajiangHupaiGroup;
                        hupaiGroup.showHouseValue(data.maCard, data.buyMaState);
                    }
                    this.setAutoTimeout(() => {
                        game.UIUtils.removeSelf(kaima);
                        if (!Global.gameProxy.roomInfo) {
                            return;
                        }
                        //修改所有玩家金币至抽水过后的金币
                        for (let index in players) {
                            let goldData = players[index];
                            let header = this.getHeaderByDirection(index) as WidgetHeader;
                            // if (goldData.ownGold) {
                            goldData.ownGold = goldData.ownGold;
                            header.updateGold(goldData.ownGold);
                            if (Global.gameProxy.checkIndexIsMe(index)) {
                                let mineData = Global.gameProxy.getMineGameData();
                                Global.playerProxy.updatePlayerGold(goldData.ownGold);
                            }
                            // }
                        }
                        CF.sN(SceneNotify.OPEN_GDMJ_OVER, resp);
                    }, this, 2000);
                }, this, 2500);
            }, this, 1000)

        }

        /**
         * 听牌提示
         */
        public tipsBtnTouch() {
            if (!this.huTipsBar) {
                this.huTipsBar = new HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            if (this.huTipsBar.visible) {
                this.huTipsBar.hideBar();
                return;
            }
            this.lastHuTips = this.currentTings;
            this.showhupaiBar();
        }

        /**
        * 抢杠胡牌
        */
        protected qiangGangHu(e: egret.TouchEvent) {
            this.g2p = 1;
            let resp = e.data;
            let direction = this.directions[resp.playerIndex];
            let color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        }

        //---检查有没有可以胡牌
        public huCards: any[] = [];

        /**
         * 刷新胡牌提示
         */
        public tipsBarFlush() {
            if (!this.huTipsBar) {
                this.huTipsBar = new HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        }

        public showhupaiBar() {
            for (var i = 0; i < this.lastHuTips.length; i++) {
                let huTip = this.lastHuTips[i];
                let count = majiang.MajiangUtils.findValueLess(huTip.value || huTip.card);
                huTip.count = count;
            }
            this.huTipsBar.showBar(this.lastHuTips);
        }


        /**
         * 检查当前手牌能否胡牌
         */
        public updateTingByValue(value) {
            let playerData = Global.gameProxy.getMineGameData();
            let tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = this.currentTings.length > 0;
                if (this.tipBtn.visible) {
                    if (playerData.lastCard != value && this.beforeShow) {
                        this.checkAllIsJihu();
                        this.beforeShow = false;
                    }
                } else {
                    this.beforeShow = true;
                }
            }
        }

        public lastHuTips: any = [];

        public isTingStatus: boolean = false;

        /**
         * 展现胡牌
         */
        public showHuTips() {
            let mineShoupai = this.touchShoupai;
            if (Global.gameProxy.getMineGameData().huCards.length > 0) {
                return;
            }
            let value = mineShoupai.value;
            let mineData = Global.gameProxy.getMineGameData();
            //听牌状态
            let tings = mineData.outCardTingCards;
            if (tings) {
                this.lastHuTips = this.getTingArr(tings, mineShoupai.value);
                this.tipsBarFlush();
            }
        }



        public getTingArr(tings, value) {
            for (let i = 0; i < tings.length; i++) {
                let ting = tings[i];
                if (ting.out == value) {
                    return ting.tings;
                }
            }
            return [];
        }

        /**
         * 检测胡牌提示
         */
        public checkHuTips() {
            let mineData = Global.gameProxy.getMineGameData();
            // if (Global.gameProxy.checkIsRoundMe()) {
            let tings = mineData.outCardTingCards;
            if (tings) {
                for (let i = 0; i < tings.length; i++) {
                    let data = tings[i].out;
                    this.mineShoupaiGroup.showHuTipsByValue(data);
                }
                // }
            }
        }
        //-------游戏内提示
        public showGameTipGroup2() {

        }

        public checkShowTips() {
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == 136 && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
        }

        //new
		/**
		 * 打开游戏界面通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_GDMJ;

		/**
		 * 关闭游戏界面通知
		 */
        public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_GDMJ_HALL;

		/**
		 * 关闭当前界面通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GDMJ;

		/**
		 * 对应匹配界面通知
		 */
        public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_GDMJ_MATCHING;
    }
}
