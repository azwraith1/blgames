module majiang {
    export class GYZJGameScene extends BaseMajiangScene {
        public pmdKey: string = "gyzjmj";
        protected mainGroup: eui.Group;
        //选中的手牌
        protected hszShoupaiArr: MineShoupai[] = [];
        //换三张提示
        protected hszBar: HSZBar;
        //换三张
        protected topHsz: eui.Group;
        protected rightHsz: eui.Group;
        protected leftHsz: eui.Group;
        protected mineHsz: eui.Group;
        //---------定缺----------
        protected mjDqBar: MajiangDQBar;
        //是否显示过
        protected showQingqueTipState: boolean = false;

        public startNumber: number = 108;

        public touchShoupai: MineShoupai;

        public mineShoupaiGroup: MineShoupaiGroup;
        public paiQiang: PaiQiangComponent;
        public huTipsBar: HuTipsScrollerBar;
        public fanPai: majiang.GYZJFanPai;
        public jiPaiNumGroup: majiang.GYZJJiPaiNumGroup;
        public rightChickenSign: majiang.GYZJChichenSign;
        public leftChickenSign: majiang.GYZJChichenSign;
        public toptChickenSign: majiang.GYZJChichenSign;
        public mineChickenSign: majiang.GYZJChichenSign;
        public chickenSignGroup: eui.Group;
        public fanpaiGroup: eui.Group;
        private gyzjtitle: eui.Image;
        /**冲锋鸡 责任鸡的容器 */
        private mineChickenGroup: eui.Group;
        public constructor() {
            super();
            this.skinName = "resource/skins/scene/gyzj/GYZJGameSceneSkin.exml";
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
                    egret.setTimeout(() => {
                        this.fapaiRoundOver();
                    }, this, 400);
                }, this, 400);
            });
        }

        public fapaiRoundOver() {
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            let roomInfo = Global.gameProxy.roomInfo;
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            // this.haveCaiShenCard();
            this.setAutoTimeout(() => {
                this.timeDirectionBar.startTime(this);
                roomInfo.curPlay = roomInfo.dealer;
                this.checkChupaiStatus();
            }, this, 400);
        }

        /**
         * 这里是自动给玩家推荐三张牌的方法
         */
        public tishiSanzhang() {
            let mineData = Global.gameProxy.getMineGameData();
            let hszCards = mineData.hszCardsTip;
            let data = [];
            for (let i = 0; i < hszCards.length; i++) {
                let hszCardVal = hszCards[i];
                let shoupai = this.mineShoupaiGroup.randomChoseThree(hszCardVal);
                if (shoupai) {
                    data.push(shoupai);
                }
            }
            return data;
        }

        /**
         * 这里将随机的三张牌加进去。
         */
        public showHSZTip() {
            let items = this.tishiSanzhang();
            try {
                for (let i = 0; i < 3; i++) {
                    this.hszShoupaiArr.push(items[i]);
                }
            } catch (e) {
                console.error(items);
            }
            if (!this.hszBar) {
                this.hszBar = new HSZBar();
                this.hszBar.horizontalCenter = 0;
                this.hszBar.bottom = 163;
                this.touchGroup.addChild(this.hszBar);
            }
            this.hszBar.onStart(this);
            this.hszBar.visible = true;
            this.maxTouchShoupai = 3;
            CF.dP(ENo.HSZ_SELECT_NUM, this.hszShoupaiArr.length);

        }





        //---回显胡牌end----------------------------------------------

        /**
         * 显示重新连接上来的UI
         */
        protected showReconnectUI() {
            let roomInfo = Global.gameProxy.roomInfo;
            // this.checkHszStatus(roomInfo);
            this.checkTrusteeStatus();
            this.checkChupaiStatus();
            this.checkTask();
            this.reloadAllChickenSign();
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
         * 移除和换三张有关的UI
         */
        protected removeHszUI() {
            for (let key in this.directions) {
                let direction = this.directions[key];
                game.UIUtils.removeSelf(this[direction + "NoHsz"]);
                game.UIUtils.removeSelf(this[direction + "Hsz"]);
                game.UIUtils.removeSelf(this.hszBar);
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        }

        /**
         * 移除和换三张有关的UI
         */
        protected hideHszUI() {
            for (let key in this.directions) {
                let direction = this.directions[key];
                if (this[direction + "NoHsz"]) {
                    this[direction + "NoHsz"].visible = false;
                }
                if (this[direction + "Hsz"]) {
                    this[direction + "Hsz"].visible = false;
                }
                if (this.hszBar) {
                    this.hszBar.visible = false;
                }
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        }


        /**
         * 移除定缺UI
         */
        protected removeDQUI() {
            if (this.mjDqBar) {
                this.mjDqBar.visible = false;
                game.UIUtils.removeSelf(this.mjDqBar);
                this.mjDqBar = null;
                this.otherChose.visible = false;
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        }

        /**
         * 展示玩家没有换三张的状态
         * @param  {number} index
         */
        protected showNoSelectHszUI(index: number) {
            //如果是本人
            let direction = this.directions[index];
            if (direction == "mine") {
                this.showHSZTip();
            } else {
                let image: eui.Group = this[direction + "NoHsz"];
                let image1 = image.getChildAt(1) as eui.Image;
                let image2 = image.getChildAt(2) as eui.Image;
                let image3 = image.getChildAt(3) as eui.Image;
                image.visible = true;
                egret.Tween.get(this, { loop: true }).call(() => {
                    image1.visible = true;
                }).wait(200).call(() => {
                    image2.visible = true;
                }).wait(200).call(() => {
                    image3.visible = true;
                }).wait(200).call(() => {
                    image2.visible = image3.visible = false;
                })
            }
        }

        /**
        * 展示玩家没有定缺的状态。
        * @param  {number} index
        */
        protected showNoSelectDqUI(index: number) {
            //如果是本人
            let direction = this.directions[index];
            if (direction == "mine") {
                let mine = Global.gameProxy.getMineGameData();
                if (mine.selectColor == -1) {
                    this.showDingQue();
                }
            } else {
                let image: eui.Group = this[direction + "NoHsz"];
                let image1 = image.getChildAt(1) as eui.Image;
                let image2 = image.getChildAt(2) as eui.Image;
                let image3 = image.getChildAt(3) as eui.Image;
                image.visible = true;
                egret.Tween.get(this, { loop: true }).call(() => {
                    image1.visible = true;
                }).wait(200).call(() => {
                    image2.visible = true;
                }).wait(200).call(() => {
                    image3.visible = true;
                }).wait(200).call(() => {
                    image2.visible = image3.visible = false;
                })
            }
        }
        /**
         * 展现换三张已经选择OK的界面
         * @param  {number} index
         */
        protected showSelectedHszUI(index: number) {
            let direction = this.directions[index];
            //扣牌组
            let group: eui.Group = this[direction + "Hsz"];
            let shoupaiGroup: BaseShoupaiGroup = this[direction + "ShoupaiGroup"];
            //隐藏三张
            shoupaiGroup.hideRight3pais();
            if (direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
            group.visible = true;
        }

        /**
       * 展现定缺已经选择OK的界面
       * @param  {number} index
       */
        protected showSelectedDqUI(index: number) {
            let direction = this.directions[index];
            if (direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
        }


        /**
         * 展示换三张动画
         * @param  {number} index
         * @param  {boolean} flag
         */
        protected showHszAni(index: number) {
            let direction = this.directions[index];
            //扣牌组
            let group: eui.Group = this[direction + "Hsz"];
            //如果不是我
            let image: eui.Group = this[direction + "NoHsz"];
            if (image) {
                image.visible = false;
            }
            this[direction + "ShoupaiGroup"].hideRight3pais();
            //等待换三张的图片
            group.visible = true;
            switch (direction) {
                case "top":
                    egret.Tween.get(group).to({
                        top: group.top + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "mine":
                    egret.Tween.get(group).to({
                        bottom: group.bottom + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "left":
                    egret.Tween.get(group).to({
                        horizontalCenter: group.horizontalCenter + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "right":
                    egret.Tween.get(group).to({
                        horizontalCenter: group.horizontalCenter - 15
                    }, 300, egret.Ease.sineIn);
                    break;

            }
        }


        public renderContent() {
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            //  || Global.runBack
            if (Global.gameProxy.reconnect) {
                this.paiQiang.reloadPaiQiang();
                for (let i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.timeDirectionBar.removeTimer();
                this.timeDirectionBar.removeAllTween();
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




        public async createChildren() {
            super.createChildren();
            if (!Global.gameProxy.roomInfo) {
                await Global.gameProxy.req2updateRoom();
            }

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
            this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
            SoundManager.getInstance().playMusic("playingingame_mp3");
            this.showWanfa();
            //CF.dP(ENo.FIND_GYZJ_JIPAICOLOR, { "gyzj": [18, 21] });
        }
        public chickDB(name: string = "gyzj_chong", afterfinish: Function = null, thisobj: any = null) {
            let db = new DBComponent(name);
            // db.x = penggang.localToGlobal().x + x;
            // db.y = penggang.localToGlobal().y + y;
            db.callback = () => {
                if (afterfinish) afterfinish.call(thisobj);
                game.UIUtils.removeSelf(db)
                db = null;
            };
            this.addChild(db);
            db.playByFilename(0);
            db.x = 596.52 + 20;
            db.y = 382.85 + 10;
        }
        private test(direction: string, i) {
            egret.setTimeout(() => {
                this.playChickenDB("gyzj_zrj", direction, 2);
                //this.chickDB();
            }, this, 4000 * i);
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


        public async onTouchTap(e: egret.TouchEvent) {
            e.stopPropagation();
            switch (e.target) {
                case this.backBtn:
                    if (this.restartBtn.visible) {
                        this.allowBack = true;
                    }
                    this.backBtnTouch();
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
                case this.chatBtn:
                    // this.testPeng();
                    // //  syncGold
                    // return;
                    if (this.recordBar) {
                        this.recordBar.hide();
                    }
                    if (this.huTipsBar) {
                        this.huTipsBar.hideBar();
                    }
                    this.chatBtnTouch();
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
                case this.recordBar:
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
                    //CF.sN(PanelNotify.OPEN_HELP);
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
                case this.restartBtn:
                    this.restartBtnTouch();
                    break;
                case this.gmBtn:
                    this.showMajiangTest();
                    break;
            }
        }

        protected settingBtnTouch() {
            CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "majiang" });
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
            } else if (this.maxTouchShoupai == 3) {
                //换三张
                if (touchShoupai.selected) {
                    touchShoupai.selectTouch();
                    game.Utils.removeArrayItem(this.hszShoupaiArr, touchShoupai);
                } else {
                    //判断花色
                    if (this.hszShoupaiArr.length < 3) {
                        if (this.hszShoupaiArr.length == 0) {
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        } else if (this.hszShoupaiArr.length > 0) {
                            let shoupai = this.hszShoupaiArr[0];
                            if (MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
                                touchShoupai.selectTouch();
                                this.hszShoupaiArr.push(touchShoupai);
                            } else {
                                for (let i = 0; i < this.hszShoupaiArr.length; i++) {
                                    this.hszShoupaiArr[i].selectTouch();
                                }
                                this.hszShoupaiArr = []
                                touchShoupai.selectTouch();
                                this.hszShoupaiArr.push(touchShoupai);
                            }
                        }
                    } else if (this.hszShoupaiArr.length == 3) {
                        let shoupai = this.hszShoupaiArr[0];
                        if (MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
                            this.hszShoupaiArr[0].selectTouch();
                            game.Utils.removeArrayItem(this.hszShoupaiArr, this.hszShoupaiArr[0]);
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        } else {
                            for (let i = 0; i < this.hszShoupaiArr.length; i++) {
                                this.hszShoupaiArr[i].selectTouch();
                            }
                            this.hszShoupaiArr = []
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        }
                    }
                }
                CF.dP(ENo.HSZ_SELECT_NUM, this.hszShoupaiArr.length);
            }
        }

        /**
         * 接收服务器换三张结束 开始走非定缺
         * @param  {egret.TouchEvent} e
         */
        protected roomHszFinishiedPush(e: egret.TouchEvent) {
            this.otherChose.visible = false;
            Global.gameProxy.getMineGameData().selectColorTip = Number(e.data.selectColorTip);
            // this.checkDQStatus();
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_roomStatusChange, this.roomStatusChange, this);
            CF.aE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.aE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.aE(ServerNotify.s_playerSelectHSZ, this.playerSelectHSZPush, this);
            CF.aE(ServerNotify.s_HSZCardExchanged, this.hSZCardExchangedPush, this);
            CF.aE(ServerNotify.s_roomHSZFinished, this.roomHszFinishiedPush, this);
            CF.aE(ServerNotify.s_playerSelectColor, this.playerSelectColorPush, this);
            CF.aE(ServerNotify.s_playerColorSelected, this.playerColorSelected, this);
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
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.aE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(ENo.GYZJ_ONCLICKJIXU, this.onClickJiXu, this);

        }
        public tuoguanStatusPush(e: egret.TouchEvent) {
            let resp = e.data;
            this.clearTingStatus()
            this.tgGroup.visible = resp.isTrustee;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            playerData["isTrustee"] = resp.isTrustee;
        }
        private onClickJiXu() {
            this.fanPai.visible = false;
            this.jiPaiNumGroup.visible = false;
            CF.sN(this.GAME_OVER_NOTIFY, this.overSceneData);
        }
        /**
  * 玩家task推送
  * @param  {egret.Event} e
  */
        protected hangupTaskPush(e: egret.Event) {
            let resp: any = e.data;
            let mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            this.clearTingStatus()
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
            //贵阳捉鸡修改
            let mineData = Global.gameProxy.getMineGameData();
            //  if (!mineData.isBaoTing && !mineData.isTrustee) this.checkHuTips();

        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.GYZJ_ONCLICKJIXU, this.onClickJiXu, this);
            CF.rE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.rE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.rE(ServerNotify.s_playerSelectHSZ, this.playerSelectHSZPush, this);
            CF.rE(ServerNotify.s_HSZCardExchanged, this.hSZCardExchangedPush, this);
            CF.rE(ServerNotify.s_roomHSZFinished, this.roomHszFinishiedPush, this);
            CF.rE(ServerNotify.s_playerSelectColor, this.playerSelectColorPush, this);
            CF.rE(ServerNotify.s_playerColorSelected, this.playerColorSelected, this);
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
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.rE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            this.timeDirectionBar.removeTimer();
            this.timeDirectionBar.removeAllTween();

        }
        private isOverSceneLoad: boolean = false;
        private canShowOverScene: boolean = false;
        private overSceneData: any;
        /**
      * 玩家报听
      */
        public isTingStatus: boolean = false;
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

        /**监听房间状态的变化 当玩家是飘的时候限制玩家打牌 除了传来的索引号 其他玩家都摸啥打啥*/
        public roomStatusChange(e: egret.Event) {
            //**当前飘的玩家索引号*/;
            var _resp = e.data;
            var _index = _resp.eventData.playerIndex;
            let direction = this.directions[_index];
            switch (_resp.eventData.chickType) {//_resp.eventType
                case 1:

                    LogUtils.logD("====================冲锋鸡=========================");
                    this.setAutoTimeout(() => {
                        this.playChickenDB("gyzj_cfj", direction, 1);
                    }, this, 1000);

                    // this.setAutoTimeout(() => {
                    //     this[direction + "ChickenSign"].setCFChickenVis(true);
                    // }, this, 2000);
                    break;
                case 2:
                    this.setAutoTimeout(() => {
                        this.playChickenDB("gyzj_zrj", direction, 2);
                    }, this, 1000)

                    LogUtils.logD("====================责任鸡=========================");
                    // this.showDriftTips(_resp.eventData)
                    break;
                case 3:
                    LogUtils.logD("====================包鸡=========================");
                    break;
                case 4:
                    LogUtils.logD("====================捉鸡=========================");
                    break;
                case 5:
                    LogUtils.logD("====================幺鸡=========================");
                    break;
                case 6:
                    LogUtils.logD("====================八筒=========================");
                    break;

                default:
                    break;
            }

        }

        protected closeMJCall() {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        }

        /**
         * 有玩家确定换三张的推送
         * @param  {egret.Event} e
         */
        protected playerSelectHSZPush(e: egret.Event) {
            let resp = e.data;
            let players = [];
            let mineIndex = Global.gameProxy.getMineIndex();
            if (game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                Global.gameProxy.getMineGameData().selectedHSZCards = resp.cards;
            }
            if (!game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                players.push[resp.playerIndex];
            }
            if (players.length < 3 && game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
            this.showHszAni(resp.playerIndex);
        }

        /**
         * 换三张结果推送
         * @param  {egret.Event} e
         */
        protected async hSZCardExchangedPush(e: egret.Event) {
            let resp = e.data;
            if (this.hszBar) {
                this.hszBar.visible = false;
            }
            this.otherChose.visible = false;
            for (let i = 0; i < this.hszShoupaiArr.length; i++) {
                this.hszShoupaiArr[i].change2NoSelect();
            }
            Global.gameProxy.roomInfo.countdown = null;
            // await game.Utils.sleepTime(1000);
            let type = resp.type;
            let player = Global.gameProxy.getMineGameData();
            let hszArr = player.selectedHSZCards;
            //删掉玩家手牌
            await Global.gameProxy.req2updateRoom();
            // this.clearCountDown(null);
            let cards = resp.cards;
            this.hszCards = cards;
            this.showHSZSucTip(type);
        }

        /**
         * 展现换三张动画
         */
        protected hszTipBar: HSZTipBar;
        //换三张换过来的牌
        protected hszCards: number[];
        public showHSZSucTip(type) {
            this.hszTipBar = new HSZTipBar(type);
            this.touchGroup.addChild(this.hszTipBar);
            this.hszTipBar.horizontalCenter = 0;
            this.hszTipBar.verticalCenter = -42;
            this.setAutoTimeout(this.hszOver, this, 1500);
        }

        /**
         * 发送换三张的请求
         */
        public async sendHSZReq() {
            if (this.hszShoupaiArr.length != 3) {
                return;
            }
            let cardValue = [];
            this.hszShoupaiArr.forEach(function (shoupai: MineShoupai) {
                shoupai.selectTouch();
                cardValue.push(shoupai.value);
            });
            this.maxTouchShoupai = 0;
            let reqData = { cards: cardValue };
            let resp: any = await Global.pomelo.request(ServerPostPath.game_mjHandler_c_selectHSZ, reqData);
            //返回扣牌成功
            if (resp.error.code == 0) {
                this.hszBar.visible = false;
                let playerData = Global.gameProxy.getMineGameData();
                playerData.selectedHSZCards = cardValue;
                this.mineShoupaiGroup.hideRight3pais();
            } else {
                this.maxTouchShoupai = 3;
            }
        }

        /**
         * 换三张完毕过后加入手牌
         */
        protected hszJoinpai() {
            game.UIUtils.removeSelf(this.hszBar);
            this.hszBar = null;
            // let values = [13, 22, 23];
            let myCarsArr = Global.gameProxy.getMineShuopaiArr();
            this.mineShoupaiGroup.sortShoupaiByValue(myCarsArr, false);
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[0]).showDownAni();
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[1]).showDownAni();
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[2]).showDownAni();
            this.hszCards = null;
            this.topShoupaiGroup.showAllShoupai();
            this.leftShoupaiGroup.showAllShoupai();
            this.rightShoupaiGroup.showAllShoupai();
            //200毫秒后
            this.setAutoTimeout(() => {
                this.checkDQStatus();
            }, this, 1000);
        }
        /**
         * 换三张结束
         */
        public hszOver() {
            this.hszShoupaiArr = [];
            game.UIUtils.removeSelf(this.hszTipBar);
            this.hszTipBar = null;
            this.leftHsz.visible = false;
            this.rightHsz.visible = false;
            this.mineHsz.visible = false;
            this.topHsz.visible = false;
            this.hszJoinpai();
        }


        protected showDingQue() {
            if (this.mjDqBar) {
                return;
            }
            this.mjDqBar = new MajiangDQBar(this);
            this.touchGroup.addChild(this.mjDqBar);
            this.mjDqBar.horizontalCenter = 0;
            this.mjDqBar.bottom = 140;
        }

        /**
         * 选择定缺
         * @param  {number} type
         */
        public async chooseDQ(type: number) {
            let route = ServerPostPath.game_mjHandler_c_selectColor;
            this.mjDqBar.visible = false;
            Global.gameProxy.getMineGameData().selectColor = type;
            let resp: any = await Global.pomelo.request(route, { color: type });
        }

        /**
         * 判断定缺
         */
        protected checkDQStatus() {
            let roomInfo = Global.gameProxy.roomInfo;
            let step = roomInfo.steps;
            if (roomInfo.selectColorStatus == 0 && step.indexOf(1) > -1) {
                this.hideHszUI();
                this.majiangStatus = MajiangStatusEnum.QINGQUE;
                let players = roomInfo.players;
                //2018-8-22,缺牌显示选择UI
                for (let key in players) {
                    let player: PlayerGameDataBean = players[key];
                    //如果长度为0 则展现没有换三张的状态
                    if (player.selectColor == -1) {
                        this.showNoSelectDqUI(parseInt(key));
                    } else {
                        this.showSelectedDqUI(parseInt(key));
                    }
                }
            } else {
                //不需要定缺
                this.removeDQUI();
                this.removeHszUI();
                let direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                //这里判断如果手牌=14 则把最后一张牌给change出去
                let playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkHuTips();
                this.checkShowTips();
                // this.checkMineShoupaiHu
            }
            //如果不走定缺,就开始走座位算
        }


        /**
         * 在重新连接上来过后或者才发完手牌之后改变最后一张为摸牌
         * @param  {} direction
         */
        protected showShoupai(direction) {
            this[direction + "ShoupaiGroup"].changeLast2Mopai();
        }

        /**
         * 定缺完毕
         */
        protected dingqueOver(player) {
            this.removeHszUI();
            game.UIUtils.removeSelf(this.mjDqBar);
            //重新排序手牌
            // this.mineShoupaiGroup.sortMineShoupai();
            let cards = Global.gameProxy.getMineShuopaiArr();
            this.mineShoupaiGroup.sortShoupaiByValue(cards, false);
            let roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            let direction = this.directions[roomInfo.curPlay];
            let playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
            if (Global.gameProxy.checkIndexIsMe(roomInfo.dealer)) {
                playerData.lastCard = cards[0];
            }
            //只是显示动画
            this.maxTouchShoupai = 1;
            this.showShoupai(direction);
            //定缺动画
            for (let i in player) {
                let name = i + "_DqImage";
                let image = GameCacheManager.instance.getCache(name, eui.Image) as eui.Image;
                image.width = image.height = 100;
                switch (this.directions[i]) {
                    case "left":
                        image.x = GameConfig.curWidth() / 2 - 190; //这里是获取中间计时器的坐标。计时器不偏离，这个就不得偏离。
                        image.y = GameConfig.curHeight() / 2 - 100;
                        break;
                    case "right":
                        image.x = GameConfig.curWidth() / 2 + 110;
                        image.y = GameConfig.curHeight() / 2 - 100;
                        break;
                    case "top":
                        image.x = GameConfig.curWidth() / 2 - 40;
                        image.y = GameConfig.curHeight() / 2 - 215;
                        break;
                    case "mine":
                        image.x = GameConfig.curWidth() / 2 - 40;
                        image.y = GameConfig.curHeight() / 2 + 25;
                        break;

                }
                this.dqtubiao(player[i], image);
                this.effectGroup.addChild(image);
                this.dqDonghua(i, player[i], image);
            }
            if (Global.gameProxy.roomInfo)
                this.checkTask();
            this.checkHuTips();
            this.checkShowTips();
            // this.checkOutPutByDirection(false);
        }

        /**
         * 定缺动画
         */
        public dqDonghua(i, pi, img) {
            let tw = egret.Tween.get(img);
            tw.to({ scaleX: 1, scaleY: 1 }, 300).to({}, 300).to({ x: this.getHeaderByDirection(i).x + 133.5, y: this.getHeaderByDirection(i).y - 19, scaleX: 0.35, scaleY: 0.35 }, 500).call(() => {
                // img.visible = false;
                game.UIUtils.removeSelf(img);
                this.getHeaderByDirection(i).showColor(pi);

            });//这里是获得头像的坐标。
        }

        /**
         * 定缺图标赋值
         */
        public dqtubiao(nums, img) {

            if (nums == 1) {
                img.source = "dq_color_1_png";

            }
            if (nums == 2) {
                img.source = "dq_color_2_png";

            }
            if (nums == 3) {
                img.source = "dq_color_3_png";

            }
        }

        /**
         * 哪一方玩家定缺完成
         * @param  {egret.Event} e
         */
        protected playerSelectColorPush(e: egret.Event) {
            let resp = e.data;
            let players = [];
            let mineIndex = Global.gameProxy.getMineIndex();
            let direction = this.directions[resp.playerIndex];
            if (direction != "mine") {
                players.push[resp.playerIndex];
                let image: eui.Group = this[direction + "NoHsz"];
                image.visible = false;
            }
            if (players.length < 3 && direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
        }

        /**
         * "players":{"1":3,"2":2}
         * 全部定缺完成
         * @param  {egret.Event} e
         */
        protected playerColorSelected(e: egret.Event) {
            this.otherChose.visible = false;
            this.removeDQUI();
            this.otherChose.visible = false;
            let resp = e.data;
            let players = resp.players;
            for (let key in players) {
                let playerData = Global.gameProxy.getPlayerByIndex(key);
                playerData.selectColor = players[key];
                this.getHeaderByDirection(key);

            }
            //差一个动画
            this.dingqueOver(players);
        }

        /**
         * 玩家出牌推送
         * {"playerIndex":1,"card":28}
         * @param  {egret.Event} e
         */
        protected playCardPush(e: egret.Event) {
            let resp: any = e.data;
            let playerIndex = resp.playerIndex;
            let card = resp.card;
            this.clearCountDown();
            this.clearTingStatus()
            let direction = this.directions[playerIndex];
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            playerData.lastCard = 0;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            if (direction == "mine") {
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
                //this.checkMineShoupaiHu()
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            } else {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            MajiangUtils.playMJPTHSound(playerData.sex, card);//playMJPTHSound//playCardSound
            //  CF.dP(ENo.FIND_GYZJ_JIPAICOLOR, { "gyzj": [18, 21] });
        }




        protected clearTouchOn() {
            if (this.touchShoupai) {
                this.touchShoupai.change2NoSelect();
                this.touchShoupai = null;
                // this.hideBars();
                CF.dP(ENo.FIND_COLOR, 0);
            }
        }

        protected playerIsHu(playerIndex) {
            let data = Global.gameProxy.getPlayerByIndex(playerIndex);
            return data.huCards.length > 0;
        }

        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        protected showChupaiAni1(playerIndex, value) {
            let direction = this.directions[playerIndex];
            let name = direction + "_ChuShoupai";
            let tempChupai = GameCacheManager.instance.getCache(name, MineShoupai) as MineShoupai;
            tempChupai.resetValue(value);
            // let tempChupai = new MineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
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
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    } else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    } else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    } else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
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
         * 检查task状态`
         */
        public checkTask() {
            let roomInfo = Global.gameProxy.roomInfo;
            let startX = roomInfo.curPlay;
            let direction = this.directions[startX];
            //如果房间中是有任务状态
            if (roomInfo.hangupTaskSource) {
                let mine = Global.gameProxy.getMineGameData();
                this.taskBar.showBtnsByData(mine);
                this.touchGroup.addChild(this.taskBar);
                // this.lockChupai = false;
            }
        }

        /**
         * 玩家杠牌
         * {"playerIndex":1,"from":2,"card":12}
         * @param  {egret.Event} e
         */
        public playerGangCard(e: egret.Event) {
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let from = resp.from;
            let direction = this.directions[playerIndex];
            this.clearCountDown();
            this.clearTingStatus()
            let group: BaseShoupaiGroup = this[direction + "ShoupaiGroup"];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            //记录玩家杠牌
            Global.gameProxy.recordPlayerGang(resp);
            if (direction == "mine") {
                Global.gameProxy.clearLastPai();
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.hideBars();
                this.touchShoupaiClear();
                if (playerData.huCards.length > 0) {
                    this.flushTingCards();
                }
            }
            this.addEffectAni(direction, "gang");
            this.hideChupaiTips();
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                this.mineShoupaiGroup.removeShoupaiByGang(resp.card);
                this[direction + 'ShoupaiGroup'].hideMopai();
            }

            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨

                    //    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    //   this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    //    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    // group.removeLastPai();
                    //手上四张暗杠
                    break;
                case 3://点杠
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    //  majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
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
            // this.checkTask();
        }


        public playerPengCardPush(e: egret.Event) {
            super.playerPengCardPush(e);
            //播放碰牌音效
            let resp = e.data;
            let playerIndex = resp.playerIndex;
            let playerData = Global.gameProxy.getPlayerByIndex(playerIndex) as PlayerGameDataBean;
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
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
        protected async hupaiPush(e: egret.Event) {
            let resp: any = e.data;
            this.clearCountDown();
            this.clearTingStatus()
            let playerIndex = resp.playerIndex;
            let card = resp.card;
            let from = resp.from;
            let mainCard = resp.mainCard;
            let mineData = Global.gameProxy.getMineGameData();
            Global.gameProxy.addHuTasks(resp);
            let huPlayerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            huPlayerData.huCards.push(card);
            let direction = this.directions[playerIndex];
            let fireChickPlayer = resp.fireChickPlayer;
            if (fireChickPlayer > 0) {
                this.showShaoJi(fireChickPlayer);
            }
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
                this.setAutoTimeout(() => {
                    this.addXZDDHuTip(from, playerIndex, true)
                }, this, 2000);

                this[direction + "HupaiGroup"].addHu(resp, 2);
                majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
                // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 4);
            } else {
                //点炮
                let lastDirection = this.directions[from];
                this.addEffectAni(direction, "hu");
                this.setAutoTimeout(() => {
                    this.addXZDDHuTip(from, playerIndex, true)
                }, this, 2000);
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
                // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 5);
            }
        }
        /**
         * 显示血战到底胡牌的提示
         */
        protected addXZDDHuTip(from, playerIndex, ani = false) {
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.gameId != MajiangConfig.MJXZDD) {
                return;
            }
            if (playerIndex == Global.gameProxy.getMineIndex()) {
                this.checkShowrestartBtn();
                this.tgGroup.visible = false;
                return;
            }
            let name = "player_zimo_png";
            if (from != playerIndex) {
                name = "player_hu_png";
            }
            let direction = this.directions[playerIndex];
            let image = new eui.Image(name);
            image.scaleX = image.scaleY = 1.5;
            this.effectGroup.addChild(image);
            switch (direction) {
                case "mine":
                    image.horizontalCenter = 0;
                    image.bottom = 148;
                    this.checkShowrestartBtn();
                    this.tgGroup.visible = false;
                    break;
                case "left":
                    image.left = 220;
                    image.verticalCenter = -80;
                    break;
                case "right":
                    image.right = 220;
                    image.verticalCenter = -80;
                    break;
                case "top":
                    image.horizontalCenter = 0;
                    image.top = 80;
                    break;
            }
            if (ani) {
                image.alpha = 0;
                egret.Tween.get(image).to({
                    alpha: 1
                }, 200);
            }

        }

        /**
        * 刮风下雨
        * @param  {} direction
        * @param  {} effectName
        */
        protected addGangAni(effectName, offerX, offerY, scale = 1) {
            GameCacheManager.instance.getMcCache(effectName, effectName, (mv: egret.MovieClip) => {
                if (mv) {
                    let mcCallback = () => {
                        mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
                        game.UIUtils.removeSelf(mv);
                    }

                    mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this)
                    this.effectGroup.addChild(mv);
                    // game.UIUtils.setAnchorPot(mv);
                    mv.x = offerX;
                    mv.y = offerY;
                    mv.scaleX = mv.scaleY = scale;
                    mv.play(1);
                }
            });
        }

        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        protected createHJZYByDirection(direction, value) {
            let name = direction + "_hjzy";
            let hjzyTip = GameCacheManager.instance.getCache(name, HjzyTip) as HjzyTip;
            hjzyTip.showText(value);
            switch (direction) {
                case "mine":
                    hjzyTip.horizontalCenter = -15;
                    hjzyTip.bottom = 130;
                    break;
                case "left":
                    hjzyTip.left = 180;
                    hjzyTip.verticalCenter = -44;
                    break;
                case "right":
                    hjzyTip.right = 180;
                    hjzyTip.verticalCenter = -44;
                    break;
                case "top":
                    hjzyTip.horizontalCenter = -15;
                    hjzyTip.top = 100;
                    break;
            }
            this.effectGroup.addChild(hjzyTip);
            hjzyTip.showAni();
        }

        /**
         * 对局结束
         */
        protected showDuijuAni(callback: Function) {
            var name = "duijujieshu";
            let image = GameCacheManager.instance.getCache(name, eui.Image) as eui.Image;
            image.source = RES.getRes("duijujieshu_png");
            LogUtils.logD("=======对局结束==============" + image.source);
            image.horizontalCenter = -30;
            image.verticalCenter = - 50;
            this.addChild(image);
            image.alpha = 0;
            // image.alpha=1;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 30, alpha: 1 }, 1000)
                .to({ alpha: 0 }, 500);
            this.setAutoTimeout(() => {
                callback()
            }, this, 2500)
        }

        /**
         * 游戏数据结算信息。
         */
        protected async settlementData(e: egret.Event) {
            this.overSceneData = null;
            this.restartBtn.visible = false;
            this.majiangStatus = MajiangStatusEnum.OVER;
            this.gameTipsGroup.visible = this.gameTipsGroup2.visible = false;
            this.timeDirectionBar.removeTimer();
            this.timeDirectionBar.removeAllTween();
            this.taskBar.hideAllBtns();
            Global.gameProxy.roomInfo.curPlay = 0;
            this.showHeaderTips(Global.gameProxy.roomInfo);
            this.tgGroup.visible = false;
            let resp = e.data;
            //testBug2
            //  resp = this.testBug1;
            this.overSceneData = resp;
            LogUtils.logDJ("THIS IS  贵阳捉鸡结算界面 结算有问题 请复制这一段数据给我 不要截图  不要截图==================" + JSON.stringify(resp));
            let players = resp.players;
            this.tgGroup.visible = false;//解决牌局结束，托管不消失。
            this.gameOverShow(players);
            //鸡牌高亮
            var chichenCards = resp.chickCards;
            CF.dP(ENo.FIND_GYZJ_JIPAICOLOR, { "gyzj": chichenCards });

            this.showDuijuAni(() => {
                //this.checkChajiao(resp.players);
                var catchChickCard = resp.catchChickCard;
                var jiesuanDelayShow: number = 8000;
                let mineData = Global.gameProxy.getMineGameData();
                let mineIndex = Global.gameProxy.getMineIndex();
                let showFanAni: boolean = true;
                if (resp.winPlayer.length <= 0 && players[mineIndex].bills.length <= 0) {
                    showFanAni = false;
                }
                if (showFanAni) {
                    if (catchChickCard) {
                        jiesuanDelayShow += 1400;
                        this.setAutoTimeout(() => {
                            this.fanPaiAni(catchChickCard, players, resp.winPlayer);
                        }, this, 1400);
                    }
                    else {
                        this.setAutoTimeout(() => {
                            this.jiPaiNumGroup.visible = true;
                            for (var key in players) {
                                let direction = this.directions[key];
                                let playerData = players[key];
                                let chickCardInfo = playerData["chickCardInfo"];
                                let isTing = playerData["isTing"];
                                if (key == resp.winPlayer) {
                                    this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, true);
                                }
                                else {
                                    this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, false);
                                }
                            }
                        }, this, 3000);

                        jiesuanDelayShow = 4000;
                    }
                }


                //修改所有玩家金币至抽水过后的金币
                for (let index in players) {
                    let goldData = players[index];
                    let header = this.getHeaderByDirection(index) as WidgetHeader;
                    goldData.ownGold = goldData.ownGold;
                    header.updateGold(goldData.ownGold);
                }


                Global.playerProxy.updatePlayerGold(mineData.gold);

                if (resp.winPlayer.length <= 0 && players[mineIndex].bills.length <= 0) {
                    this.showHuangZhuang(() => {
                        this.restartBtn.visible = true;
                        this.restartBtn.alpha = 0;
                        egret.Tween.get(this.restartBtn).to({
                            alpha: 1
                        }, 300);
                    })
                    return;
                }
                if (resp.remainNum >= 0) return;
                this.setAutoTimeout(() => {
                    this.fanPai.visible = false;
                    this.jiPaiNumGroup.visible = false;
                    CF.sN(this.GAME_OVER_NOTIFY, this.overSceneData);
                }, this, jiesuanDelayShow);
            });

        }
        public showHuangZhuang(callback: Function) {

            let image = new eui.Image(RES.getRes("gyzjmj_game_liuju_png"));
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
        /**翻牌动画*/
        private fanPaiAni(catchChickCard, players, winPlayer) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            this.fanpaiGroup.visible = true;
            this.fanPai.visible = true;
            this.fanPai.alpha = 1;
            // this.fanPai.anchorOffsetX = this.fanPai.width / 2;
            // this.fanPai.anchorOffsetY = this.fanPai.height / 2;
            var fanCard = Number(catchChickCard["fanCard"]);
            var chickCard = Number(catchChickCard["chickCard"]);
            this.fanPai.fanPaiDB(fanCard, chickCard);
            var direction: string;
            var playerData: any;
            //代表是否下叫
            var isTing: boolean;
            var chickCardInfo: any;
            this.setAutoTimeout(() => {
                egret.Tween.get(this.fanpaiGroup).to({ alpha: 0 }, 800).call(() => {
                    this.jiPaiNumGroup.visible = true;
                    for (var key in players) {
                        direction = this.directions[key];
                        playerData = players[key];
                        chickCardInfo = playerData["chickCardInfo"];
                        isTing = playerData["isTing"];
                        if (key == winPlayer) {
                            this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, true);
                        }
                        else {
                            this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, false);
                        }
                    }
                }, this);
                // }, this, 300);
            }, this, 1500);
        }
        private showShaoJi(playerIndex) {
            let directionStr = this.directions[playerIndex];
            let image = new eui.Image(RES.getRes("gyzj_over_shaoji1_png"));
            image.scaleX = 0.4;
            image.scaleY = 0.4;
            var _id = Global.gameProxy.roomInfo.gameId;
            image.alpha = 0;
            game.UIUtils.resetAnchorPoint(image);
            this.effectGroup.addChild(image);
            game.UIUtils.setAnchorPot(image);
            switch (directionStr) {
                case "mine":
                    image.x = GameConfig.curWidth() * 0.5;
                    image.y = GameConfig.curHeight() * 0.7;
                    break;
                case "left":
                    image.x = GameConfig.curWidth() * 0.24;
                    image.y = GameConfig.curHeight() * 0.4;
                    break;
                case "right":
                    image.x = GameConfig.curWidth() * 0.72;
                    image.y = GameConfig.curHeight() * 0.4;
                    break;
                case "top":
                    image.x = GameConfig.curWidth() * 0.5
                    image.y = GameConfig.curHeight() * 0.2
                    break;
            }
            egret.Tween.get(image).to({ alpha: 1, x: image.x + 50 }, 300).wait(1000).call(() => {
                game.UIUtils.removeSelf(image);
            }, this)
        }
        /**
         * 查大叫
         * type 3 : 5 一组
         * @param  {} records
         */
        protected checkChajiao(players) {
            //   let chajiaoArr = records[3] || {};
            let roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            let data = {};
            for (var key in players) {
                var bills: Array<any> = players[key].bills;
                for (let i = 0; i < bills.length; ++i) {
                    var bill = bills[i];
                    let type = bill.type;
                    if (type == 3) {
                        data[key] = { score: bill.info.score, type: "gyzj_3" };//4
                    }
                }
            }
            for (var key in data) {
                this.showScoreAni(key, data[key]);
            }
        }

        /**
         * 退税
         * @param  {} records
         */
        protected checkTuishui(records, callback) {
            let tuishuiArr = records[5] || {};
            let roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            let data = {};
            for (let playerIndex in tuishuiArr) {
                let goldData = tuishuiArr[playerIndex];
                let playerData = roomInfo.players[playerIndex] as PlayerGameDataBean;
                goldData.gainGold = goldData.gainGold;
                playerData.gold += goldData.gainGold;
                data[playerIndex] = { score: goldData.gainGold, type: 5 };
            }
            let time = 0;
            for (var key in data) {
                time = 3000;
                if (data[key].score != 0) {
                    this.showScoreAni(key, data[key]);
                }
            }
            this.setAutoTimeout(callback, this, time);
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
         * 听牌提示
         */
        // public tipsBtnTouch() {
        //     if (!this.huTipsBar) {
        //         this.huTipsBar = new HuTipsBar();
        //         this.panelGroup.addChild(this.huTipsBar);
        //     }
        //     if (this.huTipsBar.visible) {
        //         this.huTipsBar.hideBar();
        //         return;
        //     }
        //     let mineData = Global.gameProxy.getMineGameData();
        //     let cards = _.clone(mineData.cards);
        //     if (mineData.lastCard) {
        //         MajiangUtils.updateCardsNum(cards, mineData.lastCard, -1);
        //     }
        //     let huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
        //     this.lastHuTips = huCards;
        //     this.showhupaiBar();
        // }
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

        protected getGangArr(gangJson) {
            let gangArr = [];
            for (let i = 0; i < gangJson.length; i++) {
                gangArr.push(gangJson[i].card);
            }
            return gangArr;
        }

        /**
         * 杠牌之后如果胡牌了 刷新一次
         */
        public flushTingCards() {
            let mineData = Global.gameProxy.getMineGameData();
            let cards = this.mineShoupaiGroup.getShoupaiArr();
            let huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCards;
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
                this.tipBtn.visible = playerData.tingCards.length > 0
            }
        }
        /**
         * 检查当前手牌能否胡牌
         */
        // public checkMineShoupaiHu() {
        //     let mineData = Global.gameProxy.getMineGameData();
        //     if (!mineData.selectColor) {
        //         return
        //     }
        //     //已经胡牌就确定牌型
        //     if (mineData.huCards.length > 0) {
        //         return;
        //     }
        //     let huCards = window['TingCardTip'].getTings(mineData.cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
        //     this.lastHuTips = huCards;
        //     this.tipBtn.visible = huCards.length > 0;
        // }

        protected lastHuTips: any = [];
        /**
         * 展现胡牌
         */
        // protected showHuTips() {
        //     let mineShoupai = this.touchShoupai;
        //     if (Global.gameProxy.getMineGameData().huCards.length > 0) {
        //         return;
        //     }
        //     let value = mineShoupai.value;
        //     let mineCard = _.clone(Global.gameProxy.getMineGameData().cards);
        //     if (mineCard[value] > 1) {
        //         mineCard[value] -= 1;
        //     } else {
        //         delete mineCard[value];
        //     }
        //     let mineData = Global.gameProxy.getMineGameData();
        //     // if()
        //     let huCard = window['TingCardTip'].getTings(mineCard, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
        //     this.lastHuTips = huCard;
        //     this.tipsBarFlush();
        // }
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
        /**
             * 检测胡牌提示
             */
        public checkHuTips() {
            let mineData = Global.gameProxy.getMineGameData();
            // if (Global.gameProxy.checkIsRoundMe()) {
            let tings = mineData.outCardTingCards;
            //  LogUtils.logD("===================哪些牌下叫===============" + JSON.stringify(tings));
            if (tings) {
                for (let i = 0; i < tings.length; i++) {
                    let data = tings[i].out;
                    LogUtils.logD("============本局要胡的牌是===========" + JSON.stringify(data));
                    this.mineShoupaiGroup.showHuTipsByValue(data);
                }
                // }
            }
        }
        //-------游戏内提示







        protected checkShowTips() {
            let roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == this.startNumber && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            } else {
                if (Global.gameProxy.findHasQueColor() && !this.showQingqueTipState) {
                    this.showQingqueTipState = true;
                    this.showGameTipGroup(2);
                }
            }
        }





		/**
		 * 打开游戏界面通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJMJ;

		/**
		 * 关闭游戏界面通知
		 */
        public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJMJ_HALL;
		/**
		 * 关闭当前界面通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GYZJMJ;

		/**
		 * 对应匹配界面通知
		 */
        public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJ_MATCHING;
        /**
         * 结算界面
         */
        public GAME_OVER_NOTIFY: string = SceneNotify.OPEN_GYZJMJ_OVER;



        public showWanfa() {
            this.wanfaImage.source = RES.getRes("gyzj_game_title_png");
        }

        /**
      * 检查玩家是否有叫
      */
        public currentTings = [];
        public s_playerTingCards(e: egret.TouchEvent) {
            // this.mineShoupaiGroup.changePaiToVisible(false);
            let data = e.data;
            // LogUtils.logD("听牌===============s_playerTingCards" + JSON.stringify(data, null, '\t'));
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            if (data.outCardTingCards) {
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                let mineData = Global.gameProxy.getMineGameData();
                if (!mineData.isBaoTing && !playerData["isTrustee"]) this.checkHuTips();

                // if (this.needCheckTing) {

                // this.needCheckTing = false;
                // }
            }
            if (data.tingCards) {
                playerData.outCardTingCards = null;
                playerData.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData.tingCards.length > 0
            }
        }
        public tingInfoPush(e: egret.TouchEvent) {
            let data = e.data;
            let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            playerData.tingCards = this.currentTings = data;
        }
        public async checkPlayerHasJiao() {
            let mineInfo = Global.gameProxy.getMineGameData();
            if (mineInfo['isBaoTing']) {
                this.mineShoupaiGroup.playerTing();
            }
            this.currentTings = mineInfo.tingCards
            this.tipBtn.visible = this.currentTings.length > 0;
            this.checkHuTips();
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
        /**重显所有的鸡牌标识*/
        private reloadAllChickenSign() {
            var playerIndex: number;
            var chongfengVis: boolean;
            var responseVis: boolean;
            let roomInfo = Global.gameProxy.roomInfo;

            for (let key in roomInfo.players) {
                let player: PlayerGameDataBean = roomInfo.players[key];
                let direction = this.directions[key];
                let chickCards = player["chickCards"];
                if (chickCards.duty.length > 0) {
                    for (let i = 0; i < chickCards.duty.length; ++i) {
                        this[direction + "ChickenSign"].setChickenVisble(2);
                    }
                }
                if (chickCards.assault.length > 0) {
                    for (let i = 0; i < chickCards.assault.length; ++i) {
                        this[direction + "ChickenSign"].setChickenVisble(1);
                    }
                }
            }
        }
        /**播放动画*/
        public playChickenDB(name: string, direction: string, type: number) {
            let db = new DBComponent(name);
            db.callback = () => {
                game.UIUtils.removeSelf(db)
                db = null;
            };
            this[direction + "ChickenGroup"].addChild(db);
            db.playByFilename(1);
            this.setAutoTimeout(() => {
                this[direction + "ChickenSign"].setChickenVisble(type);
                // if (type == 1) {
                //     this[direction + "ChickenSign"].setCFChickenVis();
                // } else if (type == 2) {
                //     this[direction + "ChickenSign"].setZRchichenVis();
                // }
            }, this, 1000);
        }




        public testBug1 =
        { "players": { "1": { "isDefeat": false, "handCards": { "17": 2, "19": 2, "23": 1, "24": 1, "25": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 4107.19, "bills": [], "score": 0, "isTing": true }, "2": { "isDefeat": false, "handCards": { "36": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 624.29, "bills": [], "score": 0, "isTing": true }, "3": { "isDefeat": false, "handCards": { "38": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 564.44, "bills": [], "score": 0, "isTing": true }, "4": { "isDefeat": false, "handCards": { "17": 2, "23": 1, "25": 1, "37": 1, "38": 1, "39": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 838.68, "bills": [], "score": 0, "isTing": true } }, "status": 1, "fireChickPlayerIndex": -1, "winPlayer": [], "lossPlayer": [], "chickCards": [21, 18], "catchChickCard": null, "remainNum": 0 }
    }



}













































