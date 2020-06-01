var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var majiang;
(function (majiang) {
    var BaseMajiangScene = (function (_super) {
        __extends(BaseMajiangScene, _super);
        function BaseMajiangScene() {
            var _this = _super.call(this) || this;
            //最大手牌可以同时选定
            _this.maxTouchShoupai = 0;
            _this.beforeShow = true;
            /**
             * 更新该谁打牌
             *
             * {"curPlay":2,"newCard":true}
             * @param  {egret.TouchEvent} e
             */
            _this.roundMe = false;
            /**
             * 玩家出牌
             */
            _this.lockChupai = false;
            /**
           * 抢杠胡牌
           */
            _this.g2p = 0;
            _this.showType1 = false;
            return _this;
        }
        ;
        BaseMajiangScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.HEADER_TOUCH, this.headerTouch, this);
            CF.aE(ServerNotify.s_playerEmoji, this.s_playerEmoji, this);
            CF.aE(ENo.EMOJI_SEND, this.emojiSend, this);
        };
        BaseMajiangScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.HEADER_TOUCH, this.headerTouch, this);
            CF.rE(ServerNotify.s_playerEmoji, this.s_playerEmoji, this);
            CF.rE(ENo.EMOJI_SEND, this.emojiSend, this);
        };
        BaseMajiangScene.prototype.emojiSend = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var data, index, gold, mineIndex, roomInfo, sendData, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = e.data;
                            index = data.index;
                            gold = data.gold;
                            mineIndex = Global.gameProxy.getMineIndex();
                            if (this.headerIndex == mineIndex) {
                                TipsCompoment.instance.show("不能对自己使用表情.");
                                return [2 /*return*/];
                            }
                            roomInfo = Global.gameProxy.roomInfo;
                            sendData = {
                                activityId: roomInfo.activityId,
                                emojiId: index,
                                from: mineIndex,
                                to: this.headerIndex
                            };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_userHandler_c_playerEmoji, sendData)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                return [2 /*return*/];
                            }
                            if (this.playerInfoPanel) {
                                this.playerInfoPanel.visible = false;
                            }
                            if (resp.gold) {
                                Global.playerProxy.playerData.gold = resp.gold;
                            }
                            else if (gold) {
                                Global.playerProxy.playerData.gold -= gold;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 玩家发送表情
         * @param  {egret.Event} e
         */
        BaseMajiangScene.prototype.s_playerEmoji = function (e) {
            var _this = this;
            var data = e.data;
            var from = data.from;
            var to = data.to;
            var emojiId = data.emojiId;
            var fromHeader = this.getHeaderByDirection(from);
            var toHeader = this.getHeaderByDirection(to);
            var mcName = "emoji_" + emojiId;
            var db = new DBComponent(mcName, false);
            db.callback = function () {
            };
            SoundManager.getInstance().playEffect("m_xzdd_e_sound" + emojiId + "_mp3");
            this.touchGroup.addChild(db);
            db.x = fromHeader.localToGlobal().x + fromHeader.width / 2;
            db.y = fromHeader.localToGlobal().y + fromHeader.height / 3;
            db.play("animation1", 1);
            egret.Tween.get(db).to({
                x: toHeader.localToGlobal().x + fromHeader.width / 2,
                y: toHeader.localToGlobal().y + fromHeader.height / 3
            }, 300);
            this.setAutoTimeout(function () {
                db.play("animation2", 1);
                _this.setAutoTimeout(function () {
                    game.UIUtils.removeSelf(db);
                }, _this, 1000);
            }, this, 300);
        };
        BaseMajiangScene.prototype.headerTouch = function (e) {
            var roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo.emoji) {
                return;
            }
            // this.s_playerEmoji({ data: {} });
            // return;
            var data = e.data;
            if (!this.playerInfoPanel) {
                this.playerInfoPanel = new MatchMJPlayerInfo();
                this.touchGroup.addChild(this.playerInfoPanel);
            }
            var mineIndex = Global.gameProxy.getMineIndex();
            this.playerInfoPanel.visible = true;
            this.playerInfoPanel.x = data.localToGlobal().x;
            this.playerInfoPanel.y = data.localToGlobal().y;
            switch (data.direction) {
                case "mine":
                    this.playerInfoPanel.x += 100;
                    this.playerInfoPanel.y -= 70;
                    break;
                case "left":
                    this.playerInfoPanel.x += 100;
                    this.playerInfoPanel.y -= 40;
                    break;
                case "right":
                    this.playerInfoPanel.x -= 300;
                    this.playerInfoPanel.y -= 70;
                    break;
                case "top":
                    this.playerInfoPanel.x -= 100;
                    this.playerInfoPanel.y += 100;
                    break;
            }
            for (var key in this.directions) {
                if (this.directions[key] == data.direction) {
                    this.headerIndex = key;
                }
            }
            this.playerInfoPanel.initPlayerInfo(data.playerInfo);
        };
        BaseMajiangScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.gmGroup) {
                if (ServerConfig.PATH_TYPE == PathTypeEnum.DEMO_TEST || ServerConfig.PATH_TYPE == PathTypeEnum.WAI_PRODUCT || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
                    this.gmGroup.visible = false;
                }
                else {
                    this.gmGroup.visible = true;
                }
            }
            this.gnGroup.visible = false;
            if (this.recordBtn) {
                this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recordBtnTouch, this);
            }
            this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
            this.isLuckeyGame = Global.gameProxy.roomInfo.backGold != undefined;
            if (this.isClubGame || this.isLuckeyGame) {
                if (!this.recordBtn.anchorOffsetX) {
                    game.UIUtils.setAnchorPot(this.recordBtn);
                }
                this.recordBtn.visible = false;
                this.fullScreenBtn.x = this.recordBtn.x;
                this.fullScreenBtn.y = this.recordBtn.y;
            }
            if (this.isLuckeyGame) {
                this.showLuckPoint();
                this.luckyPoint.show();
            }
        };
        BaseMajiangScene.prototype.setLuckPointPos = function () {
            this.uiGroup.addChild(this.luckyPoint);
            this.luckyPoint.right = 15;
            this.luckyPoint.bottom = 112;
            this.luckyPoint.visible = false;
        };
        BaseMajiangScene.prototype.checkAllIsJihu = function () {
            var playerData = Global.gameProxy.getMineGameData();
            var flag = true;
            for (var key in playerData.tingCards) {
                var tingInfo = playerData.tingCards[key];
                if (tingInfo.fan > 2) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.showGameTipGroup(4);
            }
        };
        BaseMajiangScene.prototype.showMajiangTest = function () {
            var majiangTest = new majiang.MajiangTestScene();
            this.addChild(majiangTest);
            majiangTest.initData();
        };
        BaseMajiangScene.prototype.changGnBtnStat = function (e) {
            this.gnBtn.visible = true;
            this.gnGroup.x = 2560;
        };
        BaseMajiangScene.prototype.lsBtnTouch = function () {
            if (!this.recordBar) {
                this.recordBar = new majiang.RecordBar();
                this.panelGroup.addChild(this.recordBar);
            }
            if (this.recordBar.visible) {
                this.recordBar.hide();
                return;
            }
            this.recordBar.show();
            this.recordBar.bottom = 150;
            this.recordBar.right = 150;
        };
        /**
         * 倒计时推送
         * @param  {egret.Event} e
         */
        BaseMajiangScene.prototype.countDownPush = function (e) {
            var resp = e.data;
            game.DateTimeManager.instance.updateServerTime(resp.start);
            if (Global.gameProxy.roomInfo) {
                Global.gameProxy.roomInfo.countdown = resp;
            }
        };
        /**
         * 牌局结束，暂时没有用。
         */
        BaseMajiangScene.prototype.roomGameOver = function (e) {
            _super.prototype.roomGameOver.call(this, e);
            var resp = e.data;
            // this.restartBtn.visible = true;
            // this.restartBtn.alpha = 0;
            this.allowBack = false;
        };
        /**
         * 游戏积分变化
         * @param  {egret.Event} e
         */
        BaseMajiangScene.prototype.syncGoldPush = function (e) {
            var _this = this;
            var resp = e.data;
            this.setAutoTimeout(function () {
                _this.syncGold(resp);
            }, this, 800);
        };
        //回显玩家胡碰杠的牌
        BaseMajiangScene.prototype.publicCardChangedPush = function (e) {
            var resp = e.data;
            if (resp.cardNum == 55) {
                return;
            }
            if (resp.cardNum != this.getPaiqiangCount - 1) {
                game.PomeloManager.instance.disConnect();
            }
            // this.syLabel.text = resp.cardNum;
        };
        /**
         * 断线重连
         */
        BaseMajiangScene.prototype.reconnectSuc = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var reqData;
                return __generator(this, function (_a) {
                    //对局已经结束不做处理
                    if (this.majiangStatus == MajiangStatusEnum.OVER) {
                        return [2 /*return*/];
                    }
                    if (this.allowBack) {
                        Global.alertMediator.addAlert("对局已经结束", null, null, true);
                        this.backHall();
                        return [2 /*return*/];
                    }
                    reqData = Global.gameProxy.lastGameConfig;
                    if (!reqData)
                        reqData = {};
                    if (!Global.gameProxy.roomInfo || !Global.gameProxy.roomInfo.roomId) {
                        this.backHall();
                        return [2 /*return*/];
                    }
                    reqData.roomId = Global.gameProxy.roomInfo.roomId;
                    this.reconnectCall(reqData, Global.gameProxy);
                    return [2 /*return*/];
                });
            });
        };
        /**
        * 玩家过操作
        */
        BaseMajiangScene.prototype.passTaskPush = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            if (Global.gameProxy.checkIndexIsMe(playerIndex)) {
                this.taskBar.hideAllBtns();
            }
        };
        /**
         * 清除倒计时
         * @param  {egret.TouchEvent} e
         */
        BaseMajiangScene.prototype.clearCountDown = function () {
            if (Global.gameProxy.roomInfo) {
                Global.gameProxy.roomInfo.countdown = null;
            }
            this.taskBar.visible = false;
        };
        /**
         * 托管推送
         * @param  {egret.TouchEvent} e
         */
        BaseMajiangScene.prototype.tuoguanStatusPush = function (e) {
            var resp = e.data;
            this.tgGroup.visible = resp.isTrustee;
        };
        /**
         * 给玩家广播消息。
         */
        BaseMajiangScene.prototype.sendMessage = function (e) {
            var data = e.data;
            var playerIndex = data.playerIndex;
            var message = data.message;
            var direction = this.directions[playerIndex];
            var header = this[direction + 'Header'];
            if (MajiangConfig.msgType.Word == data.type) {
                for (var i = 0; i < MajiangConfig.commonMessage.length; i++) {
                    var item = MajiangConfig.commonMessage[i];
                    if (item["id"] == message) {
                        header.showMsgAndImg(direction, item["message"], message, playerIndex, 0);
                    }
                }
            }
            else {
                header.showMsgAndImg(direction, 0, 0, 0, message);
            }
        };
        /**
         * 取消托管
         */
        BaseMajiangScene.prototype.cacelTuoguan = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_mjHandler_c_cancelTrustee;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, null)];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BaseMajiangScene.prototype.touchShoupaiClear = function () {
            if (this.touchShoupai) {
                this.touchShoupai.selectDown();
                this.touchShoupai = null;
                CF.dP(ENo.FIND_COLOR, 0);
            }
        };
        /**
         * 玩家碰牌
         * {"playerIndex":1,"from":2,"card":12}
         * @param  {egret.Event} e
         */
        BaseMajiangScene.prototype.playerPengCardPush = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var from = resp.from;
            var color = resp.card;
            this.taskBar.hideAllBtns();
            //记录玩家碰牌
            Global.gameProxy.recordPlayerPengs(playerIndex, resp.card, resp.from);
            //碰牌吧最后一张出牌UI删掉
            Global.gameProxy.recordChu2Dianpao(from);
            var lastDirection = this.directions[from];
            this[lastDirection + "ChupaiGroup"].removeLastChupai();
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            //以上玩家数据修改 以下 玩家UI修改
            var direction = this.directions[playerIndex];
            //调用碰
            this[direction + "ShoupaiGroup"].removeShoupaiByPeng(color);
            //播放碰牌动画
            this.addEffectAni(direction, "peng");
            this.hideChupaiTips();
            switch (direction) {
                case "left":
                    //这里Add方法里面的两个参数第一个是1，2，3.1代表碰，2明杠，3暗杠。   color是牌面的花色值,还有个可选参数pbg?即碰变杠。
                    this.leftShoupaiGroup.changeLast2Mopai(0);
                    var pg = this.leftPgGroup.add(5, color);
                    this.showPengAni(pg, 55, 55);
                    break;
                case "right":
                    this.rightShoupaiGroup.changeLast2Mopai(0);
                    var pg1 = this.rightPgGroup.add(5, color);
                    this.showPengAni(pg1, 40, 55);
                    break;
                case "top":
                    this.topShoupaiGroup.changeLast2Mopai(0);
                    var pg2 = this.topPgGroup.add(5, color);
                    this.showPengAni(pg2, 55, 55);
                    break;
                case "mine":
                    this.touchShoupaiClear();
                    this.mineShoupaiGroup.sortShoupais();
                    this.mineShoupaiGroup.changeLast2Mopai();
                    this.hideBars();
                    this.taskBar.hideAllBtns();
                    var pg3 = this.minePgGroup.add(5, color);
                    this.showPengAni(pg3, 80, 55);
                    this.mineShoupaiGroup.checkHuTips();
                    Global.gameProxy.roomInfo.curPlay = Global.gameProxy.getMineIndex();
                    this.checkShowTips();
                    break;
            }
        };
        /**
          * 玩家task推送
          * @param  {egret.Event} e
          */
        BaseMajiangScene.prototype.hangupTaskPush = function (e) {
            var resp = e.data;
            var mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            this.clearTingStatus();
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
            this.checkHuTips();
        };
        BaseMajiangScene.prototype.clearTingStatus = function () {
        };
        BaseMajiangScene.prototype.createTaskBar = function () {
            if (!this.taskBar) {
                this.taskBar = new majiang.MajiangTaskBar();
                this.touchGroup.addChild(this.taskBar);
                this.taskBar.width = 520;
                this.taskBar.height = 132;
                this.taskBar.setRoot(this);
                this.taskBar.right = 230;
                this.taskBar.bottom = 160;
            }
        };
        /**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
        BaseMajiangScene.prototype.addEffectAni = function (direction, effectName) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
            GameCacheManager.instance.getMcCache(effectName, direction + "_" + effectName, function (mv) {
                if (mv) {
                    mv.scaleX = mv.scaleY = 1.2;
                    var mcCallback_1 = function () {
                        mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                        game.UIUtils.removeSelf(mv);
                    };
                    mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                    _this.effectGroup.addChild(mv);
                    switch (direction) {
                        case "mine":
                            mv.x = GameConfig.curWidth() * 0.5;
                            mv.y = GameConfig.curHeight() * 0.75;
                            break;
                        case "left":
                            mv.x = GameConfig.curWidth() * 0.22;
                            mv.y = GameConfig.curHeight() * 0.4;
                            break;
                        case "right":
                            mv.x = GameConfig.curWidth() * 0.77;
                            mv.y = GameConfig.curHeight() * 0.4;
                            break;
                        case "top":
                            mv.x = GameConfig.curWidth() * 0.5;
                            mv.y = GameConfig.curHeight() * 0.2;
                            break;
                    }
                    mv.gotoAndPlay(1, 1);
                }
            });
        };
        BaseMajiangScene.prototype.checkGangError = function () {
        };
        /**
         * 显示出牌group
         */
        BaseMajiangScene.prototype.renderChupaiGroups = function () {
            this.mineChupaiGroup.visible = true;
            this.mineChupaiGroup.clearDatas();
            var data = [];
            this.mineChupaiGroup.createByArr(data);
            this.leftChupaiGroup.visible = true;
            this.leftChupaiGroup.clearDatas();
            this.leftChupaiGroup.createByArr(data);
            this.topChupaiGroup.visible = true;
            this.topChupaiGroup.clearDatas();
            this.topChupaiGroup.createByArr(data);
            this.rightChupaiGroup.visible = true;
            this.rightChupaiGroup.clearDatas();
            this.rightChupaiGroup.createByArr(data);
        };
        BaseMajiangScene.prototype.hideChupaiTips = function () {
            this.lastChupai = null;
            if (this.chupaiTips) {
                this.chupaiTips.visible = false;
                egret.Tween.removeTweens(this.chupaiTips);
            }
        };
        /**
         * 碰牌的一个动画
         * @param  {eui.Component} penggang
         * @param  {} x
         * @param  {} y
         */
        BaseMajiangScene.prototype.showPengAni = function (penggang, x, y) {
            var db = new DBComponent("mj_peng");
            db.x = penggang.localToGlobal().x + x;
            db.y = penggang.localToGlobal().y + y;
            db.callback = function () {
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this.effectGroup2.addChild(db);
            db.playByFilename(1);
        };
        //---回显玩家打过的牌
        BaseMajiangScene.prototype.reloadPlayerChupais = function () {
            var players = Global.gameProxy.getPlayers();
            for (var key in players) {
                var playerData = players[key];
                var direction = this.directions[key];
                this[direction + 'PgGroup'].removeChildren();
                this[direction + "ChupaiGroup"].createByArr(playerData.playCards || []);
            }
            this.reloadPlayerPengs();
            // egret.setTimeout(()=>{
            // 	this.showLastPlayCard();
            // }, this, 100);
        };
        //---回显玩家打过的牌
        /**
         * 回显玩家碰牌
         */
        BaseMajiangScene.prototype.reloadPlayerPengs = function () {
            var players = Global.gameProxy.getPlayers();
            for (var key in players) {
                var playerData = players[key];
                var direction = this.directions[key];
                var pengs = playerData.pengCards;
                for (var i = 0; i < pengs.length; i++) {
                    this[direction + 'PgGroup'].add(5, pengs[i], 2);
                }
            }
            this.reloadPlayerGangs();
        };
        /**
         * 回显玩家杠牌
         */
        BaseMajiangScene.prototype.reloadPlayerGangs = function () {
            var players = Global.gameProxy.getPlayers();
            for (var key in players) {
                var playerData = players[key];
                var direction = this.directions[key];
                var pengs = playerData.gangCards;
                for (var i = 0; i < pengs.length; i++) {
                    this[direction + 'PgGroup'].add(pengs[i].gang, pengs[i].card, 2);
                }
            }
            this.reloadPlayerChis();
        };
        /**
         * 回显玩家吃牌
         */
        BaseMajiangScene.prototype.reloadPlayerChis = function () {
            var players = Global.gameProxy.getPlayers();
            for (var key in players) {
                var playerData = players[key];
                var direction = this.directions[key];
                var chiCards = playerData.chiCards || [];
                for (var i = 0; i < chiCards.length; i++) {
                    var chiItem = this[direction + 'PgGroup'].add(5, chiCards[i].selectCard, 2);
                    chiItem.peng2Chi(chiCards[i].selectCard);
                }
            }
        };
        //--回显玩家胡碰杠的牌
        //---更新剩余牌
        BaseMajiangScene.prototype.updateSypai = function () {
            this.syLabel.text = this.paiQiang.getPaiQiangNum(); //Global.gameProxy.addPublicCardPush(num) + "";
        };
        Object.defineProperty(BaseMajiangScene.prototype, "getPaiqiangCount", {
            /**this is a Test */
            get: function () {
                var paiqiang = this.paiQiang;
                return paiqiang.getPaiQiangNum();
            },
            enumerable: true,
            configurable: true
        });
        BaseMajiangScene.prototype.showLastPlayCard = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var lastPlayCardIndex = roomInfo.lastPlayCardIndex;
            if (lastPlayCardIndex < 1) {
                return;
            }
            var dir = this.directions[lastPlayCardIndex];
            var chupaiGroup = this[dir + "ChupaiGroup"];
            if (!chupaiGroup) {
                return;
            }
            var card = chupaiGroup.getLastChuipai();
            if (!card) {
                return;
            }
            var pos = card.localToGlobal();
            this.showChupaiTips(pos, dir);
        };
        /**
         * 显示出牌的提示
         * @param  {eui.Component} image
         */
        BaseMajiangScene.prototype.showChupaiTips = function (image, dirction) {
            if (!this.chupaiTips) {
                this.chupaiTips = new eui.Image("img_cptip_png");
                this.effectGroup.addChild(this.chupaiTips);
            }
            egret.Tween.removeTweens(this.chupaiTips);
            this.chupaiTips.visible = true;
            var lastChupai = this[dirction + "ChupaiGroup"].getLastChuipai();
            if (lastChupai) {
                lastChupai.addChild(this.chupaiTips);
                switch (dirction) {
                    case "mine":
                        this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
                        this.chupaiTips.y = -10;
                        break;
                    case "left":
                        this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
                        this.chupaiTips.y = -20;
                        break;
                    case "right":
                        this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
                        this.chupaiTips.y = -20;
                        break;
                    case "top":
                        this.chupaiTips.x = lastChupai.width / 2 - 39 / 2;
                        this.chupaiTips.y = -5;
                        break;
                }
            }
            var y = this.chupaiTips.y;
            egret.Tween.get(this.chupaiTips, { loop: true }).to({
                y: y - 3
            }, 1000).to({
                y: y
            }, 1000);
        };
        /**
        * 开始发牌动画
        */
        BaseMajiangScene.prototype.fapaiAni = function () {
            this.majiangStatus = MajiangStatusEnum.FAPAI;
            //庄家几号位
            this.syLabel.text = this.startNumber + "";
            Global.gameProxy.roomInfo.publicCardNum = this.startNumber;
            var zhuangIndex = Global.gameProxy.roomInfo.dealer;
            var sortDir = majiang.MajiangUtils.getDirectionSortByZhuang(zhuangIndex);
            //开始第一轮发牌
            this.fapaiRound1(sortDir);
        };
        /**
         * 4张牌4张牌落下动画
         * @param  {} num
         */
        BaseMajiangScene.prototype.mineFapaiAni = function (num) {
            var mineNum = this.mineShoupaiGroup.mainGroup.numChildren;
            for (var i = num; i < num + 4; i++) {
                // this.paiQiang.removeNumByIndex();
                var minePai = this.mineShoupaiGroup.mainGroup.getChildByName("mj" + i);
                if (minePai && minePai.value) {
                    var y = minePai.y;
                    minePai.visible = true;
                    if (!Global.runBack) {
                        minePai.y -= minePai.height / 2;
                        egret.Tween.get(minePai).to({
                            y: y
                        }, game.UIUtils.getTweenTime(150));
                    }
                }
            }
        };
        /**
         * 其他人得手牌，改变visible属性
         * @param  {} index
         * @param  {} num
         */
        BaseMajiangScene.prototype.otherFapaiAni = function (index, num) {
            var direction = this.directions[index];
            var mineNum = this[direction + 'ShoupaiGroup'].mainGroup.numChildren;
            for (var i = num; i < num + 4; i++) {
                // this.paiQiang.removeNumByIndex();
                var minePai = this[direction + 'ShoupaiGroup'].mainGroup.getChildByName("mj" + i);
                if (minePai) {
                    minePai.visible = true;
                }
            }
        };
        /**
         * 展现剩余的牌数量
         */
        BaseMajiangScene.prototype.showShengyuPai = function () {
            this.syLabel.text = Global.gameProxy.roomInfo.publicCardNum.toString();
        };
        //----回显胡牌 
        BaseMajiangScene.prototype.getHupaiArrByHuTask = function (playerIndex) {
            var roomInfo = Global.gameProxy.roomInfo;
            var huTasks = roomInfo.huTasks;
            var huTaskGroup = _.groupBy(huTasks, "playerIndex");
            var findArr = huTaskGroup[playerIndex];
            return findArr || [];
        };
        /**
        * 检查玩家是已经输光
        */
        BaseMajiangScene.prototype.checkPlayerIsOver = function () {
            var players = Global.gameProxy.roomInfo.players;
            for (var playerIndex in players) {
                var player = players[playerIndex];
                if (player.gold <= 0) {
                    var direction = this.directions[playerIndex];
                    this.createRenshuFont(direction);
                    if (Global.gameProxy.roomInfo.publicCardNum != 0) {
                        this.huPaiOrGameOver(direction);
                    }
                }
            }
        };
        /**
         * 展现玩家头像
         */
        BaseMajiangScene.prototype.showHeaders = function () {
            var players = Global.gameProxy.getPlayers();
            var zhuangId = Global.gameProxy.roomInfo.dealer;
            for (var key in players) {
                var playerData = players[key];
                var dir = this.directions[key];
                var header = this[dir + 'Header'];
                header.initWithData(playerData, dir);
                header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
                header.visible = true;
                if (playerData.isBaoTing) {
                    header.showTingImages(false);
                }
            }
        };
        /**
         * 检查托管状态
         */
        BaseMajiangScene.prototype.checkTrusteeStatus = function () {
            var mineData = Global.gameProxy.getMineGameData();
            this.tgGroup.visible = mineData.isTrustee == true;
        };
        /**
         * 第一轮发牌
         */
        BaseMajiangScene.prototype.fapaiRound1 = function (sortDir) {
            var _this = this;
            var fapaiCall = function (index) {
                if (index == Global.gameProxy.playerInfo.playerIndex + "") {
                    _this.mineFapaiAni(1);
                }
                else {
                    _this.otherFapaiAni(index, 1);
                }
                _this.updateSypai();
                _this.removePaiQiang(4);
            };
            if (Global.runBack) {
                for (var i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.fapaiRound2(sortDir);
            }
            else {
                async.eachSeries(sortDir, function (index, callback) {
                    fapaiCall(index);
                    _this.setAutoTimeout(callback, _this, GameConfig.time_config['200']);
                }, function () {
                    _this.fapaiRound2(sortDir);
                });
            }
        };
        BaseMajiangScene.prototype.removePaiQiang = function (length) {
            for (var i = 0; i < length; i++) {
                this.paiQiang.removeNumByIndex();
            }
        };
        /**
         * 第二轮发牌
         */
        BaseMajiangScene.prototype.fapaiRound2 = function (sortDir) {
            var _this = this;
            var fapaiCall = function (index) {
                if (index == Global.gameProxy.playerInfo.playerIndex + "") {
                    _this.mineFapaiAni(5);
                }
                else {
                    _this.otherFapaiAni(index, 5);
                }
                _this.updateSypai();
                _this.removePaiQiang(4);
            };
            if (Global.runBack) {
                for (var i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.fapaiRound3(sortDir);
            }
            else {
                async.eachSeries(sortDir, function (index, callback) {
                    fapaiCall(index);
                    _this.setAutoTimeout(callback, _this, GameConfig.time_config['200']);
                }, function () {
                    _this.fapaiRound3(sortDir);
                });
            }
        };
        /**
         * 第三轮发牌
         */
        BaseMajiangScene.prototype.fapaiRound3 = function (sortDir) {
            var _this = this;
            var fapaiCall = function (index) {
                if (index == Global.gameProxy.playerInfo.playerIndex + "") {
                    _this.mineFapaiAni(9);
                }
                else {
                    _this.otherFapaiAni(index, 9);
                }
                _this.updateSypai();
                _this.removePaiQiang(4);
            };
            if (Global.runBack) {
                for (var i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.fapaiRound4(sortDir);
            }
            else {
                async.eachSeries(sortDir, function (index, callback) {
                    fapaiCall(index);
                    _this.setAutoTimeout(callback, _this, GameConfig.time_config['200']);
                }, function () {
                    _this.fapaiRound4(sortDir);
                });
            }
        };
        /**
         * 手动适配组件位子
         */
        BaseMajiangScene.prototype.eventResize = function (data) {
            _super.prototype.eventResize.call(this);
            if (egret.Capabilities.isMobile) {
                if (GameConfig.WINSIZE_BILI_WIDTH >= 1) {
                    this.mineGroup.scaleX = this.mineShoupaiGroup.scaleY = GameConfig.WINSIZE_BILI_WIDTH;
                    this.mineGroup.bottom = 0;
                }
            }
            if (this.chupaiTips) {
                this.chupaiTips.visible = false;
            }
        };
        /**
         * 牌局开始的动画
         * @param  {} callback
         */
        BaseMajiangScene.prototype.showStartAni = function (callback) {
            var _this = this;
            var mc = GameCacheManager.instance.getMcCache("start", "mine_start", null); //game.MCUtils.getMc("start")
            this.effectGroup.addChild(mc);
            mc.x = GameConfig.curWidth() / 2 + 5;
            mc.y = GameConfig.curHeight() * 0.42;
            var mcCallback = function () {
                mc.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, _this);
                game.UIUtils.removeSelf(mc);
            };
            this.setAutoTimeout(callback, this, 500);
            mc.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback, this);
            mc.play(1);
        };
        BaseMajiangScene.prototype.updateGold = function () {
            this['mineHeader'].updateGold(Global.playerProxy.playerData.gold);
        };
        BaseMajiangScene.prototype.curPlayPush = function (e) {
            var resp = e.data;
            this.maxTouchShoupai = 1;
            this.timeDirectionBar.showLightByDirection(this.directions[resp.curPlay]);
            Global.gameProxy.roomInfo.curPlay = resp.curPlay;
            this.checkOutPutByDirection();
            this.showHeaderTips(Global.gameProxy.roomInfo);
        };
        BaseMajiangScene.prototype.chupaiReq = function (touchShoupai) {
            return __awaiter(this, void 0, void 0, function () {
                var pai, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.majiangStatus = MajiangStatusEnum.BLANK;
                            pai = this.touchShoupai;
                            return [4 /*yield*/, Global.pomelo.request('game.mjHandler.c_playCard', { card: pai.value, ting: false })];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code == 0) {
                                CF.dP(ENo.SHOUPAI_TOUCH_SUC, touchShoupai);
                                this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
                                // this.touchShoupaiClear();
                            }
                            else if (resp && resp.error && resp.error.code == -10101) {
                                Global.pomelo.disConnect();
                            }
                            else if (resp && resp.error && resp.error.code == -10235) {
                                Toast.launch("癞子牌不能打出~");
                            }
                            else {
                                this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BaseMajiangScene.prototype.chupaiCallback = function () {
            this.mineShoupaiGroup.hideMopai();
            Global.gameProxy.clearTasks();
            Global.gameProxy.clearCurPlay();
            this.mineShoupaiGroup.shoupaiDowns();
            if (this.mineShoupaiGroup.isMopais(this.mineShoupaiGroup.shoupais.length)) {
                this.mineShoupaiGroup.removeLastPai();
            }
        };
        /**
        * 展现header
        */
        BaseMajiangScene.prototype.showHeaderTips = function (roomInfo) {
            for (var key in roomInfo.players) {
                this.getHeaderByDirection(key).showTip(game.Utils.valueEqual(key, roomInfo.curPlay));
            }
        };
        /**
         * 根据座位选择谁开始打牌
         */
        BaseMajiangScene.prototype.checkOutPutByDirection = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var curPlay = roomInfo.curPlay;
            var direction = this.directions[curPlay];
            if (direction == "mine") {
                this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
            }
            else {
                this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
            }
        };
        BaseMajiangScene.prototype.addXZDDHuTip = function (from, playerIndex, ani) {
            if (ani === void 0) { ani = false; }
        };
        BaseMajiangScene.prototype.renderHupaiGroup = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                var hupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                var huCardsArr = this.getHupaiArrByHuTask(key);
                if (huCardsArr && huCardsArr.length > 0) {
                    this.addXZDDHuTip(huCardsArr[0].from, huCardsArr[0].playerIndex, true);
                }
                if (direction == "mine") {
                    if (Global.gameProxy.roomInfo.gameId.indexOf("xlch") > -1 && huCardsArr.length > 0) {
                        this.showGameTipGroup(3);
                    }
                }
                // let hus = player.huCards || [];
                hupaiGroup.initWithArr(huCardsArr);
            }
        };
        /**
         * 在重新连接上来过后或者才发完手牌之后改变最后一张为摸牌
         * @param  {} direction
         */
        BaseMajiangScene.prototype.showShoupai = function (direction) {
            this[direction + "ShoupaiGroup"].changeLast2Mopai();
        };
        /**
         * 展示我的手牌
         */
        BaseMajiangScene.prototype.showShoupaiByMine = function (flag) {
            if (flag === void 0) { flag = true; }
            var cardsArr = Global.gameProxy.getMineShuopaiArr();
            if (!flag) {
                cardsArr = _.shuffle(cardsArr);
            }
            this.mineShoupaiGroup.initWithArr(cardsArr, flag);
        };
        /**
         * 显示其他玩家的手牌, 如果新创建则隐藏起来，做动画
         * @param  {number} index
         */
        BaseMajiangScene.prototype.showShoupaiByIndex = function (index, isVisible) {
            if (isVisible === void 0) { isVisible = true; }
            //显示重连
            var direction = this.directions[index];
            var mineData = Global.gameProxy.getPlayerByIndex(index);
            if (direction == "mine") {
                this.showShoupaiByMine(isVisible);
                if (mineData.huCards.length > 0) {
                    this.mineShoupaiGroup.lockHu();
                }
                return;
            }
            if (mineData) {
                if (mineData.cards && this[direction + 'ShoupaiGroup'].initWithCards) {
                    this[direction + 'ShoupaiGroup'].initWithCards(index, isVisible);
                    return;
                }
                var number = mineData.cardNum;
                this[direction + 'ShoupaiGroup'].initWithArr(number, isVisible);
            }
        };
        /**
        *  玩家回显胡牌展示。
        */
        BaseMajiangScene.prototype.backMovie = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                switch (direction) {
                    case "left":
                        if (player.huCards.length > 0) {
                            this.huPaiOrGameOver(direction);
                        }
                        break;
                    case "top":
                        if (player.huCards.length > 0) {
                            this.huPaiOrGameOver(direction);
                        }
                        break;
                    case "right":
                        if (player.huCards.length > 0) {
                            this.huPaiOrGameOver(direction);
                        }
                        break;
                }
            }
        };
        /**
         * 正常胡牌与牌局结束牌面展示
         */
        BaseMajiangScene.prototype.huPaiOrGameOver = function (direction) {
            switch (direction) {
                case "left":
                    this.leftHuShowGroup.removeChildren();
                    var lefts = new majiang.LeftShowPai(this.leftShoupaiGroup.shoupais, 1);
                    this.leftHuShowGroup.addChild(lefts);
                    this.leftHuShowGroup.visible = true;
                    this.leftShoupaiGroup.shoupaisVisible(); //手牌影藏。
                    break;
                case "top":
                    this.topHuShowGroup.removeChildren();
                    var tops = new majiang.TopShowPai(this.topShoupaiGroup.shoupais, 1);
                    this.topHuShowGroup.addChild(tops);
                    this.topHuShowGroup.visible = true;
                    this.topShoupaiGroup.shoupaisVisible();
                    break;
                case "right":
                    this.rightHuShowGroup.removeChildren();
                    var rights = new majiang.RightShowPai(this.rightShoupaiGroup.shoupais, 1);
                    this.rightHuShowGroup.addChild(rights);
                    this.rightHuShowGroup.visible = true;
                    this.rightShoupaiGroup.shoupaisVisible();
                    break;
            }
        };
        /**
         * 显示换桌子按钮
         */
        BaseMajiangScene.prototype.checkShowrestartBtn = function () {
            if (this.isClubGame || this.isLuckeyGame) {
                return;
            }
            var roomInfo = Global.gameProxy.roomInfo;
            var notHuIndex = 0;
            for (var key in roomInfo.players) {
                if (roomInfo.players[key].huCards && roomInfo.players[key].huCards.length < 1) {
                    notHuIndex++;
                }
            }
            this.checkShowTips();
            this.restartBtn.visible = !(notHuIndex == 1);
            //因某次需求 去掉提示
            //  && ServerConfig.PATH_TYPE != PathTypeEnum.WAI_PRODUCT
            if (this.restartBtn.visible) {
                var count = NativeApi.instance.showIsFirstLogin();
                // if (parseInt(count) % 3 == 1) {
                // this.showGameTipGroup2();
                // }
                NativeApi.instance.addPlayCount();
            }
        };
        /**
         * 创建金币减少
         * @param  {} direction
         * @param  {} value
         */
        BaseMajiangScene.prototype.createFontByDirection = function (direction, value) {
            if (Global.runBack) {
                return;
            }
            var text = NumberFormat.handleFloatDecimalStr(value);
            if (value >= 0) {
                text = "+" + text;
            }
            else {
                text = text + "";
            }
            var label = new eui.BitmapLabel(text);
            if (value >= 0) {
                label.font = "ying_font_fnt"; //RES.getRes("");
            }
            else {
                label.font = "shu_font_fnt"; //RES.getRes("");
            }
            label.text = text;
            label.alpha = 0;
            label.scaleX = label.scaleY = 0.5;
            this.effectGroup.addChild(label);
            var pos = { x: 0, y: 0 };
            game.UIUtils.setAnchorPot(label);
            var endX;
            var endY;
            switch (direction) {
                case "mine":
                    label.x = GameConfig.curWidth() * 0.5 + pos.x;
                    label.y = GameConfig.curHeight() * 0.7 + pos.y;
                    break;
                case "left":
                    label.x = GameConfig.curWidth() * 0.28 + pos.x;
                    label.y = GameConfig.curHeight() * 0.4 + pos.y;
                    break;
                case "right":
                    label.x = GameConfig.curWidth() * 0.72 + pos.x;
                    label.y = GameConfig.curHeight() * 0.4 + pos.y;
                    break;
                case "top":
                    label.x = GameConfig.curWidth() * 0.5 + pos.x;
                    label.y = GameConfig.curHeight() * 0.2 + pos.y;
                    break;
            }
            egret.Tween.get(label).to({
                x: label.x + 30,
                alpha: 1
            }, 300).to({
                alpha: 0
            }, 1000);
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(label);
                game.UIUtils.removeSelf(label);
            }, this, 1300);
        };
        /*
         * 更新金币。
         */
        BaseMajiangScene.prototype.syncGold = function (syncData) {
            var _this = this;
            var _loop_1 = function (key) {
                var dirction = this_1.directions[key];
                var info = syncData[key].info;
                info.gainGold = info.gainGold;
                info.ownGold = info.ownGold;
                LogUtils.logD("info.gainGold= " + info.gainGold);
                if (dirction == "mine") {
                    Global.gameProxy.getMineGameData().gold = info.ownGold;
                    Global.playerProxy.playerData.gold = info.ownGold;
                    Global.gameProxy.addRecord(syncData[key]);
                }
                if (syncData[key].type == 6) {
                    this_1.setAutoTimeout(function () {
                        if (info.gainGold < 0) {
                            _this.createHJZYByDirection(dirction, info.gainGold);
                        }
                        else {
                            _this.createFontByDirection(dirction, info.gainGold);
                        }
                    }, this_1, 1000);
                }
                else {
                    this_1.createFontByDirection(dirction, info.gainGold);
                }
                this_1.getHeaderByDirection(key).updateGold(info.ownGold);
                //输光了豆子
                if (info.isDefeat) {
                    this_1.setAutoTimeout(function () {
                        _this.createRenshuFont(dirction);
                        if (dirction == "mine") {
                            _this.mineShoupaiGroup.lockHu();
                        }
                        if (Global.gameProxy.roomInfo.publicCardNum != 0) {
                            _this.huPaiOrGameOver(dirction);
                        }
                    }, this_1, 1000);
                }
            };
            var this_1 = this;
            for (var key in syncData) {
                _loop_1(key);
            }
        };
        /**
        * 展现漂分动画
        * type score
        * @param  {} scoreData
        */
        BaseMajiangScene.prototype.showScoreAni = function (playerIndex, scoreData) {
            var _this = this;
            var directionStr = this.directions[playerIndex];
            if (Global.runBack) {
                var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
                return;
            }
            var image = new eui.Image(RES.getRes("over_type_" + scoreData.type + "_png"));
            var _id = Global.gameProxy.roomInfo.gameId;
            if (_id == "gyzjmj") {
                image.scaleX = 0.6;
                image.scaleY = 0.6;
            }
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
                    image.x = GameConfig.curWidth() * 0.5;
                    image.y = GameConfig.curHeight() * 0.2;
                    break;
            }
            if (scoreData.score > 0) {
                image.visible = false;
            }
            egret.Tween.get(image).to({ alpha: 1, x: image.x + 50 }, 300).wait(1000).call(function () {
                game.UIUtils.removeSelf(image);
                /**
                 * @param  {} directionStr
                 */
                if (_id == "gyzjmj")
                    return;
                _this.createFontByDirection(directionStr, scoreData.score);
                var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                _this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
            }, this);
            // }
        };
        /**
         * 获取玩家头像
         * @param  {number} index
         */
        BaseMajiangScene.prototype.getHeaderByDirection = function (index) {
            return this[this.directions[index] + "Header"];
        };
        /**
         * 获取玩家头像
         * @param  {number} index
         */
        BaseMajiangScene.prototype.getHeader = function (direction) {
            return this[direction + "Header"];
        };
        /**
         * 牌局结束显示自己手上的牌。
         */
        BaseMajiangScene.prototype.gameOverShow = function (players) {
            for (var key in players) {
                var data = players[key];
                if (Global.gameProxy.checkIndexIsMe(key)) {
                    var mines = new majiang.MineShowPai(data["handCards"], 2);
                    this.mineHuShowGroup.addChild(mines);
                    this.mineHuShowGroup.visible = true;
                    this.mineGroup.removeChildren();
                }
                else {
                    this.showOthers(data, key);
                }
            }
        };
        /**
         * 牌局结束显示别人手上的牌。
         */
        BaseMajiangScene.prototype.showOthers = function (data, key) {
            //this.directions = MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
            var players = Global.gameProxy.getPlayers();
            switch (this.directions[key]) {
                case "left":
                    this.leftHuShowGroup.removeChildren();
                    var lefts = new majiang.LeftShowPai(data["handCards"], 2);
                    this.leftHuShowGroup.addChild(lefts);
                    this.leftHuShowGroup.visible = true;
                    this.leftGroup.removeChildren();
                    break;
                case "top":
                    this.topHuShowGroup.removeChildren();
                    var tops = new majiang.TopShowPai(data["handCards"], 2);
                    this.topHuShowGroup.addChild(tops);
                    this.topHuShowGroup.visible = true;
                    this.topGroup.removeChildren();
                    break;
                case "right":
                    this.rightHuShowGroup.removeChildren();
                    var rights = new majiang.RightShowPai(data["handCards"], 2);
                    this.rightHuShowGroup.addChild(rights);
                    this.rightHuShowGroup.visible = true;
                    this.rightGroup.removeChildren();
            }
        };
        BaseMajiangScene.prototype.chatBtnTouch = function () {
            if (!this.ctBar) {
                this.ctBar = new majiang.ChatBar();
                this.panelGroup.addChild(this.ctBar);
            }
            if (this.ctBar.visible) {
                this.ctBar.hide();
                return;
            }
            this.ctBar.show();
            this.ctBar.scaleX = this.ctBar.scaleY = 1.5;
            this.ctBar.x = GameConfig.curWidth() * 0.8 - this.ctBar.width;
            this.ctBar.y = GameConfig.curHeight() * 0.7 - this.ctBar.height;
        };
        BaseMajiangScene.prototype.hideBars = function () {
            if (this.recordBar) {
                this.recordBar.hide();
            }
            if (this.huTipsBar) {
                this.huTipsBar.hideBar();
            }
            if (this.ctBar) {
                this.ctBar.hideBar();
            }
            if (this.playerInfoPanel) {
                this.playerInfoPanel.visible = false;
            }
        };
        BaseMajiangScene.prototype.qiangGangHu = function (e) {
            this.g2p = 1;
            var resp = e.data;
            var direction = this.directions[resp.playerIndex];
            var color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
            if (direction == "mine") {
                Global.gameProxy.changeGang2Peng(color);
                this.checkHuTips();
            }
        };
        BaseMajiangScene.prototype.checkHuTips = function () { };
        ;
        BaseMajiangScene.prototype.createHJZYByDirection = function (direction, value) { };
        BaseMajiangScene.prototype.checkShowTips = function () { };
        ;
        BaseMajiangScene.prototype.showGameTipGroup2 = function () {
            this.gameTipsGroup2.visible = true;
            this.gameTipsLabel2.text = "牌局结束前离开可能收不到退税的收入";
            this.gameTipsGroup2.visible = true;
            this.gameTipsGroup2.alpha = 1;
        };
        BaseMajiangScene.prototype.showGameTipGroup = function (type) {
            var _this = this;
            if (this.currentTipsType == 3) {
                return;
            }
            if (type == 1 && this.showType1) {
                return;
            }
            this.currentTipsType = type;
            this.clearAutoTimeout(this.gameTipTimeOut);
            egret.Tween.removeTweens(this.gameTipsGroup);
            this.gameTipsGroup.visible = true;
            this.gameTipsGroup.alpha = 1;
            if (type == 1) {
                this.showType1 = true;
                this.gameTipsLabel.text = "你是庄家,请先出牌";
            }
            else if (type == 2) {
                this.gameTipsLabel.text = "牌局结束未打完缺牌会被扣分哦";
            }
            else if (type == 3) {
                this.gameTipsLabel.text = "胡牌后将由系统代打";
            }
            else if (type == 4) {
                this.gameTipsLabel.text = "鸡胡只能自摸或抢杠胡";
            }
            if (type != 3) {
                this.gameTipTimeOut = this.setAutoTimeout(function () {
                    _this.closeGameTipsGroup();
                }, this, 2000);
            }
        };
        /**杭州麻将的Tips提示*/
        BaseMajiangScene.prototype.showHZMJGameTips = function (type) {
        };
        BaseMajiangScene.prototype.closeGameTipsGroup = function () {
            var _this = this;
            if (this.currentTipsType == 3) {
                return;
            }
            this.clearAutoTimeout(this.gameTipTimeOut);
            this.gameTipTimeOut = null;
            egret.Tween.get(this.gameTipsGroup).to({
                alpha: 0
            }, 200).call(function () {
                _this.gameTipsGroup.visible = false;
                _this.gameTipsGroup.alpha = 1;
            });
        };
        /**
         * 玩家认输
         * @param  {} direction
         */
        BaseMajiangScene.prototype.createRenshuFont = function (direction) {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.publicCardNum < 1) {
                return;
            }
            //认输使用缓存
            var image = new eui.Image();
            image.source = RES.getRes("wz_rs_png");
            game.UIUtils.setAnchorPot(image);
            image.alpha = 0;
            this.effectGroup.addChild(image);
            switch (direction) {
                case "mine":
                    image.horizontalCenter = 0;
                    image.bottom = 120;
                    break;
                case "left":
                    image.left = 210;
                    image.verticalCenter = -50;
                    break;
                case "right":
                    image.right = 210;
                    image.verticalCenter = -50;
                    break;
                case "top":
                    image.horizontalCenter = 0;
                    image.top = 100;
                    break;
            }
            if (Global.runBack) {
                image.alpha = 1;
            }
            else {
                egret.Tween.get(image).to({
                    alpha: 1
                }, 1000);
            }
            if (direction == "mine") {
                this.allowBack = true;
            }
        };
        BaseMajiangScene.prototype.helpBtnTouch = function () {
            BaseMajiangHelpScene.getInstance("MajiangHelpSkin", "mj_help", this.pmdKey).show();
        };
        BaseMajiangScene.prototype.settingBtnTouch = function () {
            CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "majiang" });
        };
        BaseMajiangScene.prototype.recordBtnTouch = function () {
            this.gnGroup.visible = false;
            this.gnBtn.visible = true;
            CF.sN(PanelNotify.OPEN_BASE_RECORD, this.pmdKey);
        };
        /**
         * 杠牌UI回调
         * @param  {} resp
         * @param  {} direction
         */
        BaseMajiangScene.prototype.gangCallbackUI = function (resp, direction) {
            //以上玩家数据修改 以下 玩家UI修改
            var pg = null;
            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(1, resp.card, 1);
                            break;
                        case "right":
                            this.rightPgGroup.add(1, resp.card, 1);
                            break;
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
                            pg = this.leftPgGroup.add(4, resp.card);
                            break;
                        case "right":
                            pg = this.rightPgGroup.add(4, resp.card);
                            break;
                        case "top":
                            pg = this.topPgGroup.add(4, resp.card);
                            break;
                        case "mine":
                            pg = this.minePgGroup.add(4, resp.card);
                            break;
                    }
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    switch (direction) {
                        case "left":
                            pg = this.leftPgGroup.add(2, resp.card);
                            break;
                        case "right":
                            pg = this.rightPgGroup.add(2, resp.card);
                            break;
                        case "top":
                            pg = this.topPgGroup.add(2, resp.card);
                            break;
                        case "mine":
                            pg = this.minePgGroup.add(2, resp.card);
                            break;
                    }
                    break;
                case 3://碰变杠,调4个正面，这里是自己碰，别人点。
                    switch (direction) {
                        case "left":
                            pg = this.leftPgGroup.add(3, resp.card);
                            break;
                        case "right":
                            pg = this.rightPgGroup.add(3, resp.card);
                            break;
                        case "top":
                            pg = this.topPgGroup.add(3, resp.card);
                            break;
                        case "mine":
                            pg = this.minePgGroup.add(3, resp.card);
                            break;
                    }
                    break;
            }
            if (pg) {
                switch (direction) {
                    case "left":
                        this.showPengAni(pg, 55, 55);
                        break;
                    case "right":
                        this.showPengAni(pg, 40, 55);
                        break;
                    case "top":
                        this.showPengAni(pg, 55, 55);
                        break;
                    case "mine":
                        this.showPengAni(pg, 80, 55);
                        break;
                }
            }
        };
        return BaseMajiangScene;
    }(game.BaseGameScene));
    majiang.BaseMajiangScene = BaseMajiangScene;
    __reflect(BaseMajiangScene.prototype, "majiang.BaseMajiangScene");
})(majiang || (majiang = {}));
