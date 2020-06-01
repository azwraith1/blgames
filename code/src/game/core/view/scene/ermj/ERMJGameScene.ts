module majiang {
    export class ERMJGameScene extends BaseMajiangScene {
        public pmdKey: string = "ermj";
        public cacheHua: boolean = false;
        public startNumber: number = 144;
        public paiQiang: PaiQiang144;
        public touchShoupai: MineShoupai;
        public mineShoupaiGroup: MineShoupaiGroup;
        public huTipsBar: HuTipsBar;
        public constructor() {
            super();
            this.skinName = new majiang.ERMJGameSceneSkin();
            this.leftHuShowGroup.removeChildren();
            this.rightHuShowGroup.removeChildren();
            this.topHuShowGroup.removeChildren();
            this.mineHuShowGroup.removeChildren();
        }

        /**
		* 开始发牌动画
		*/
        protected fapaiAni() {
            this.majiangStatus = MajiangStatusEnum.FAPAI;
            //庄家几号位
            this.syLabel.text = this.startNumber + "";
            Global.gameProxy.roomInfo.publicCardNum = this.startNumber;
            let zhuangIndex = Global.gameProxy.roomInfo.dealer;
            let sortDir = MajiangUtils.getDirectionSortByZhuangERMJ(zhuangIndex);
            //开始第一轮发牌
            this.fapaiRound1(sortDir);
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
                this.runBuhuaAni();
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
                        if (!Global.gameProxy.roomInfo) {
                            return;
                        }
                        this.mineShoupaiGroup.visible = true;
                        this.mineKoupaiGroup.visible = false;
                        this.setAutoTimeout(() => {
                            this.runBuhuaAni();
                        }, this, 400);
                    }, this, 400);
                }, this, 400);
            });
        }

        public fapaiRoundOver() { }

        /**
         * 补花
         */
        public runBuhuaAni() {
            let roomInfo = Global.gameProxy.roomInfo;
            let players = roomInfo.players;
            for (let key in players) {
                let player = players[key] as PlayerGameDataBean;
                let outCard = player.initHuaCards || [];
                let newCard = player.huaNewCards || [];
                if (outCard.length > 0) {
                    this.playerAddBuhua(outCard, newCard, key);
                }
            }
            Global.gameProxy.roomInfo.publicCardNum = this.paiQiang.getPaiQiangNum();
            this.updateSypai();
            this.timeDirectionBar.startTime(this);
            this.setAutoTimeout(() => {
                roomInfo.curPlay = roomInfo.dealer;
                this.checkChupaiStatus();
            }, this, 1000);
        }

        /**
         * 检查补花状态
         */
        public checkHuaStatus() {
            let roomInfo = Global.gameProxy.roomInfo;
            let players = roomInfo.players;
            for (let key in players) {
                let player = players[key] as PlayerGameDataBean;
                let outCard = player.huaCards;
                let newCard = player.huaNewCards;
                if (outCard.length > 0) {
                    this.playerAddBuhua(outCard, newCard, key);
                }
            }
            this.timeDirectionBar.startTime(this);
            this.setAutoTimeout(() => {
                roomInfo.curPlay = roomInfo.dealer;
                this.checkChupaiStatus();
            }, this, 300);
        }


        public playerAddBuhua(outCard, newCard, playerIndex) {
            let direction = this.directions[playerIndex];
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            if (Global.gameProxy.checkIndexIsMe(playerIndex)) {
                let mineShoupaiGroup = this.mineShoupaiGroup;
                for (let i = 0; i < outCard.length; i++) {
                    let card = outCard[i];
                    Global.gameProxy.updateWanjiaShoupai(card, -1);
                    mineShoupaiGroup.hidePaiByValue(card, false);
                    // mineShoupaiGroup.removeShoupaiByValue(card, 1);
                    this.add2HuGroup(card, playerIndex);
                }
                if (newCard && newCard.length > 0) {
                    this.setAutoTimeout(() => {
                        for (let i = 0; i < newCard.length; i++) {
                            let card = newCard[i];
                            Global.gameProxy.updateWanjiaShoupai(card, 1);
                            this.paiQiang.removeNumByIndex();
                            this.updateSypai();
                        }
                        if (newCard.length > 0) {
                            MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                        }
                        let cards = Global.gameProxy.getMineShuopaiArr();
                        mineShoupaiGroup.sortShoupaiByValue(cards, false);
                    }, this, 300);
                }
            } else {
                let shoupaiGroup = this[`${direction}ShoupaiGroup`] as LeftShoupaiGroup;
                shoupaiGroup.hideRightByCount(outCard.length, false);
                for (let i = 0; i < outCard.length; i++) {
                    let card = outCard[i];
                    this.add2HuGroup(card, playerIndex);
                }
                this.setAutoTimeout(() => {
                    for (let i = 0; i < outCard.length; i++) {
                        this.paiQiang.removeNumByIndex();
                        this.updateSypai();
                    }
                    if (outCard.length > 0) {
                        MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                    }
                    shoupaiGroup.hideRightByCount(outCard.length, true);
                }, this, 300);
            }
        }

        /**
         * todo不花
         */
        public playerBuhua(e: egret.TouchEvent) {
            let datas = e.data.huaInfo;
            let playerIndex = e.data.playerIndex;
            this.clearTingStatus()
            let direction = this.directions[playerIndex];
            let shoupaiGroup = this[`${direction}ShoupaiGroup`] as MineShoupaiGroup;
            let hupaiGroup = this[`${direction}HupaiGroup`] as MajiangHupaiGroup;
            // this.taskBar.hideAllBtns();
            this.newCard({ card: datas[0].cards[0], playerIndex: playerIndex });
            async.eachSeries(datas, (data: any, callback) => {
                let outCard = data.cards;
                let newCard = data.newCards || [];
                let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                this.lockChupai = true;
                playerData.cardNum--;
                playerData.lastCard = 0;
                if (direction == "mine") {
                    Global.gameProxy.updateWanjiaShoupai(outCard[0], -1);
                    //隐藏胡牌的箭头
                }
                this.setAutoTimeout(() => {
                    this.addEffectAni(direction, "buhua");
                    shoupaiGroup.hideMopai();
                    hupaiGroup.addBuhua(outCard[0]);
                    MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                    if (this.paiQiang.getPaiQiangNum() == 0) {
                        callback();
                        return;
                    }
                    this.setAutoTimeout(() => {
                        this.newCard({ card: newCard[0], playerIndex: playerIndex, notHideBtn: true });
                        callback();
                    }, this, 400);
                }, this, 500);
            }, () => {
                this.lockChupai = false;
                this.checkHuTips();
            })
        }

        public checkChupaiStatus() {
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != 0) {
                let direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                //这里判断如果手牌=14 则把最后一张牌给change出去
                let playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkShowTips();
            }
        }

        /**
         * 回显花牌
         */
        public reloadHuas() {
            let roomInfo = Global.gameProxy.roomInfo;
            for (let key in roomInfo.players) {
                let player: PlayerGameDataBean = roomInfo.players[key];
                let direction = this.directions[key];
                let hupaiGroup: MajiangHupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                let huaCard = player.huaCards;
                for (let i = 0; i < huaCard.length; i++) {
                    hupaiGroup.addBuhua(huaCard[i]);
                }
            }
        }


        public reloadPlayerGangs() {
            super.reloadPlayerGangs();
        }

        /**
         * 显示重新连接上来的UI
         */
        public showReconnectUI() {
            let roomInfo = Global.gameProxy.roomInfo;
            // this.checkHszStatus(roomInfo);
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        }

        public renderContent() {
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            if (Global.gameProxy.reconnect) {
                this.paiQiang.reloadPaiQiang();
                for (let i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.timeDirectionBar.startTime(this);
                this.reloadPlayerChupais();
                this.showShengyuPai();
                this.showReconnectUI();
                this.checkPlayerIsOver();
                this.checkPlayerHasJiao();
            } else {
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
         * 检查玩家是否有叫
         */
        public currentTings = [];
        public async checkPlayerHasJiao() {
            let mineInfo = Global.gameProxy.getMineGameData();
            if (mineInfo['isBaoTing']) {
                this.mineShoupaiGroup.playerTing();
            }
            this.currentTings = mineInfo.tingCards
            this.tipBtn.visible = this.currentTings.length > 0;
            this.checkHuTips();
        }

        public async createChildren() {
            super.createChildren();
            // if (!Global.gameProxy.roomInfo) {
            // await Global.gameProxy.req2updateRoom();
            // }
            this.dizhu.bold = true;
            this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;//this.difeng;
            //设置玩家座位标示
            this.majiangStatus = MajiangStatusEnum.READY;
            //记录玩家坐标
            this.directions = MajiangUtils.getDirectionByERMJ(Global.gameProxy.getMineIndex());
            this.paiQiang.showPaiQiang(this.directions);
            this.renderChupaiGroups();
            this.reloadHuas();
            this.renderContent();
            this.backMovie();
            this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
            SoundManager.getInstance().playMusic("playingingame_mp3");
        }

        public async onTouchTap(e: egret.TouchEvent) {
            e.stopPropagation();
            switch (e.target) {
                case this.restartBtn:
                    if (this.restartBtn.alpha != 1) {
                        return;
                    }
                    if (this.isClubGame) {
                        this.back2ReadyScene(() => {
                            ERenClubReadyScene.instance.show(true);
                            CF.sN(this.CLOSE_NOTIFY);
                        }, () => {
                            CF.sN(this.CLOSE_NOTIFY);
                        });
                        return;
                    }
                    this.allowBack = this.restartBtn.visible;
                    this.restartBtnTouch();
                    break;
                case this.chatBtn:
                    if (this.huTipsBar) {
                        this.huTipsBar.hideBar();
                    }
                    this.chatBtnTouch();
                    break;
                case this.tipBtn:
                    if (this.ctBar) {
                        this.ctBar.hideBar();
                    }
                    this.tipsBtnTouch();
                    break;
                case this.ctBar:
                    break;
                case this.qxtgBtn:
                    this.cacelTuoguan();
                    break;
                case this.gnBtn://点击功能按钮
                    this.gnBtn.visible = false;
                    this.gnGroup.visible = true;
                    this.touchGroup.addChild(this.gnGroup);
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

        //提牌，换三张，打牌的效果。
        public shoupaiTouchOn(e: egret.TouchEvent) {
            let touchShoupai: MineShoupai = e.data;
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

        public async chupaiReq(touchShoupai: MineShoupai) {
            this.majiangStatus = MajiangStatusEnum.BLANK;
            let pai = this.touchShoupai;
            if (this.isTingStatus) {
                let mineData = Global.gameProxy.getMineGameData();
                if (mineData.outCardTingCards) {
                    for (let i = 0; i < mineData.outCardTingCards.length; i++) {
                        let outCardArr = mineData.outCardTingCards[i];
                        let tings = outCardArr.tings;
                        for (let j = 0; j < tings.length; j++) {
                            let outTings = tings[j];
                            outTings.fan += 2;
                        }
                    }
                }
            }
            let resp: any = await Global.pomelo.request('game.mjHandler.c_playCard', { card: pai.value, isBaoTing: this.isTingStatus });
            if (resp.error.code == 0) {
                CF.dP(ENo.SHOUPAI_TOUCH_SUC, touchShoupai);
                this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
                // this.touchShoupaiClear();
            } else if (resp.error.code == -10101) {
                Global.pomelo.disConnect();
            } else {
                this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
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
            CF.aE(ServerNotify.s_playHua, this.playerBuhua, this);
            CF.aE(ServerNotify.s_playerChiCard, this.playerChiCard, this);
            CF.aE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
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
            CF.rE(ServerNotify.s_playHua, this.playerBuhua, this);
            CF.rE(ServerNotify.s_playerChiCard, this.playerChiCard, this);
            CF.rE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
        }

        /**
       * 麻将关闭界面
       * @param  {egret.TouchEvent} e
       */
        public closeMJCall(e: egret.TouchEvent) {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        }


        public tingInfoPush(e: egret.TouchEvent) {
            let data = e.data;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            playerData.tingCards = this.currentTings = data;
        }

        /**
         * 听牌提示
         * @param  {egret.TouchEvent} e
         */
        public needCheckTing: boolean = true;
        public s_playerTingCards(e: egret.TouchEvent) {
            let data = e.data;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            if (data.outCardTingCards) {
                if (playerData.isBaoTing) {
                    return;
                }
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                // if (this.needCheckTing) {
                this.checkHuTips();
                // this.needCheckTing = false;
                // }
            }
            if (data.tingCards) {
                let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
                playerData.tingCards = this.currentTings = data.tingCards;
            }
        }

        /**
         * 添加花牌到胡牌组
         * @param  {} card
         * @param  {} playerIndex
         */
        public add2HuGroup(card, playerIndex) {
            let direction = this.directions[playerIndex];
            this[`${direction}HupaiGroup`].addBuhua(card);
        }

        public tuoguanStatusPush(e: egret.TouchEvent) {
            let resp = e.data;
            this.clearTingStatus()
            this.tgGroup.visible = resp.isTrustee;
        }

        /**
         * 玩家报听推送
         */
        public playerBaoTingPush(e: egret.TouchEvent) {
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData['isBaoTing'] = true;
            this.addEffectAni(this.directions[playerIndex], "ting");
            let header = this.getHeaderByDirection(playerIndex);
            header.showTingImages(true);
            if (playerIndex == Global.gameProxy.getMineIndex()) {
                LogUtils.logD("玩家报听")
                this.mineShoupaiGroup.playerTing();
            }
        }

        /**
         * 玩家吃牌推送
         */
        public playerChiCard(e: egret.Event) {
            this.clearCountDown();
            this.clearTingStatus()
            let resp: any = e.data;
            let playerIndex = resp.playerIndex;
            let chiMaxCard = resp.selectCard;
            let direction = this.directions[playerIndex];
            let from = resp.from;
            let playCard = resp.card;
            //记录玩家碰牌
            Global.gameProxy.recordPlayerChis(playerIndex, playCard, chiMaxCard, resp);
            //最后一张出牌UI删掉
            Global.gameProxy.recordChu2Dianpao(from);
            let lastDirection = this.directions[from];
            this[lastDirection + "ChupaiGroup"].removeLastChupai();
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            //调用碰
            if (direction != "mine") {
                this[direction + "ShoupaiGroup"].removeShoupaiByChi();
                this[direction + "ShoupaiGroup"].changeLast2Mopai(0);
            } else {
                this.mineShoupaiGroup.removeShoupaiByChi(playCard, chiMaxCard);
                this.touchShoupaiClear();
                this.mineShoupaiGroup.sortShoupais();
                this.mineShoupaiGroup.changeLast2Mopai();
                this.hideBars();
                this.taskBar.hideAllBtns();
                Global.gameProxy.roomInfo.curPlay = Global.gameProxy.getMineIndex();
                this.checkShowTips();
                this.lockChupai = false;
            }
            //播放碰牌动画
            this.addEffectAni(direction, "chi");
            this.hideChupaiTips();
            let pgGroup = this[`${direction}PgGroup`] as MjMineGroup;
            let pengItem = pgGroup.add(5, chiMaxCard);
            pengItem.peng2Chi(chiMaxCard);

            //播放吃牌音效
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "chi");
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
            this.clearTingStatus()
            let resp: any = e.data;
            let playerIndex = resp.playerIndex;
            let card = resp.card;
            let direction = this.directions[playerIndex];
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            playerData.lastCard = 0;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            // this.needCheckTing = false;
            if (direction == "mine") {
                // this.needCheckTing = false;
                this.updateTingByValue(card);
                playerData.outCardTingCards = [];
                this.closeGameTipsGroup();
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
            let tempChupai = GameCacheManager.instance.getCache(name, MineShoupai) as MineShoupai;
            tempChupai.resetValue(value);
            // let tempChupai = new MineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            let targetMajiang;
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
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
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
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
                    // this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
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
                    // this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
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
            this.gangCallbackUI(resp, direction);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "gang");
            group.hideMopai();
            //再次检查
        }


        public playerPengCardPush(e: egret.Event) {
            super.playerPengCardPush(e);
            //播放碰牌音效
            // this.needCheckTing = true;
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
            // majiang.MajiangUtils.playHPGSound(playerData.sex, 1);
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
            this.clearTingStatus()
            this.newCard(resp);
            if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                this.setAutoTimeout(() => {
                    // this.needCheckTing = true;
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
            if (direction == "mine") {
                //先刷新自己手牌
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
                }
                Global.gameProxy.updateWanjiaShoupai(resp.card, 1);
                playerData.lastCard = resp.card;
                if (playerData.isTrustee && Math.floor(resp.card / 5) == 0) {
                } else {
                    this.mineShoupaiGroup.playerNewCardPush(playerData.lastCard);
                    this.checkShowTips();
                    this.lockChupai = true;
                    egret.clearTimeout(this.lockChupaiTimeout);
                    this.lockChupaiTimeout = egret.setTimeout(function () {
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
            let mineData = Global.gameProxy.getMineGameData();
            let tings = mineData.outCardTingCards;
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
         * 玩家认输
         * @param  {} direction
         */
        public createRenshuFont(direction) {

        }
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        public createHJZYByDirection(direction, value) {

        }

        /**
         * 对局结束
         */
        public showDuijuAni(callback: Function) {
            var name = "duijujieshu";
            let image = GameCacheManager.instance.getCache(name, eui.Image) as eui.Image;
            image.source = RES.getRes("duijujieshu_png");
            image.horizontalCenter = -30;
            image.verticalCenter = - 50;
            this.addChild(image);
            image.alpha = 0;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 30, alpha: 1 }, 1000)
                .to({ alpha: 0 }, 500)
                .wait(1000).call(callback, this);
        }


        public showHuangZhuang(callback: Function) {
            var name = "dzmj_hpts";
            let image = new eui.Image(RES.getRes("dzmj_hpts_png"));
            image.horizontalCenter = -30;
            image.verticalCenter = - 50;
            this.addChild(image);
            image.alpha = 0;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 0, alpha: 1 }, 1000)
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
            let players = resp.players;
            this.tgGroup.visible = false;//解决牌局结束，托管不消失。
            this.gameOverShow(players);
            LogUtils.logD("结算日志：有问题复制这个:  " + JSON.stringify(resp));
            if (resp.winPlayer == -1) {
                this.showHuangZhuang(() => {
                    this.restartBtn.visible = true;
                    this.restartBtn.alpha = 0;
                    egret.Tween.get(this.restartBtn).to({
                        alpha: 1
                    }, 300);
                })
                return;
            }
            this.showDuijuAni(() => {
                if (!Global.gameProxy.roomInfo) {
                    return;
                }
            });
            this.setAutoTimeout(() => {
                //修改所有玩家金币至抽水过后的金币
                for (let index in players) {
                    let goldData = players[index];
                    let header = this.getHeaderByDirection(index) as WidgetHeader;
                    goldData.ownGold = goldData.ownGold;
                    header.updateGold(goldData.ownGold);
                }
                let mineData = Global.gameProxy.getMineGameData();
                Global.playerProxy.updatePlayerGold(mineData.gold);
                CF.sN(SceneNotify.OPEN_ERMJ_OVER, { players: players, status: resp.status, winPlayer: resp.winPlayer });
            }, this, 2500);

        }

        public hideBars() {
            if (this.huTipsBar) {
                this.huTipsBar.hideBar();
            }
            if (this.ctBar) {
                this.ctBar.hideBar();
            }
        }

        /**
         * 听牌提示
         */
        public tipsBtnTouch() {
            if (!this.huTipsBar) {
                this.huTipsBar = new HuTipsBar();
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
        public qiangGangHu(e: egret.TouchEvent) {
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
                this.huTipsBar = new HuTipsBar();
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
            if (playerData.isBaoTing) {
                this.tipBtn.visible = true;
                return;
            }
            let tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = this.currentTings.length > 0
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
            if (mineData.isBaoTing) {
                return;
            }
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
            if (roomInfo.publicCardNum == this.startNumber && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
        }

        //new
		/**
		 * 打开游戏界面通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_ERMJ;

		/**
		 * 关闭游戏界面通知
		 */
        public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_ERMJ_HALL;

		/**
		 * 关闭当前界面通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ERMJ;

		/**
		 * 对应匹配界面通知
		 */
        public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_ERMJ_MATCHING;
    }
}
