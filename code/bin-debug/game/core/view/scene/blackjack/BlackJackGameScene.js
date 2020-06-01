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
/*
 * @Author: MC Lee
 * @Date: 2019-06-05 10:08:17
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 12:02:00
 * @Description: 21点游戏场景
 */
var BlackJackGameScene = (function (_super) {
    __extends(BlackJackGameScene, _super);
    function BlackJackGameScene() {
        var _this = _super.call(this) || this;
        /**
             * 背景音乐
             */
        _this.bgMusic = "blackjack_bgm_mp3";
        //new
        /**
         * 打开游戏界面通知
         */
        _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_BLACKJ_GAME;
        /**
         * 关闭游戏界面通知
         */
        _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_BLACKJ_HALL;
        /**
         * 关闭当前界面通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BLACKJ_GAME;
        /**
         * 对应匹配界面通知
         */
        _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_BLACKJ_MATCHING;
        _this.tabelDirections = {};
        _this.mineBet = 0;
        /**
         * 发牌的信息
         */
        _this.currentFapaiData = {};
        _this.fapaiLists = [];
        _this.fapaiIndexes = [];
        /**赢了的赢分后先从筹码盒飞出筹码到赢家筹码位置，再飞向玩家 */
        _this.coinArr = [];
        _this.piaoFenDelay = 1000;
        /**
         * 筹码组点击
         * @param  {egret.Event} e
         */
        _this.lockYZ = false;
        // /**
        //  * 头像押注
        //  */
        // private header2Dealer(headerIndex, coinObj: CoinComponent) {
        // 	let header = this[`header${headerIndex}`] as BlackJHeader;
        // 	let cmGroup = this[`cmGroup${groupIndex}`] as BlackJCMGroup;
        // 	let headerPoint = header.localToGlobal();
        // 	coinObj.x = headerPoint.x + header.width / 2;
        // 	coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
        // 	this.touchGroup.addChild(coinObj);
        // 	let endPoint = cmGroup.localToGlobal();
        // 	egret.Tween.get(coinObj).to({
        // 		x: endPoint.x + _.random(10, 50),
        // 		y: endPoint.y + _.random(10, 50)
        // 	}, 300);
        // }
        _this.firstYz = true;
        _this.skinName = "BlackJackGameSceneSkin" + CF.tis;
        return _this;
    }
    BlackJackGameScene.prototype.shouPaiAni = function () {
        var _this = this;
        this.allCards = [];
        var tartgetPos = new egret.Point(this.shouPaiPos.localToGlobal().x, this.shouPaiPos.localToGlobal().y);
        var cardList;
        for (var j = 0; j < 4; ++j) {
            if (j == 0) {
                cardList = this["card" + j];
                cardList.showMaskRect(false);
                this.groupShouCardAni(tartgetPos, cardList);
            }
            else {
                for (var i = 1; i <= 2; ++i) {
                    cardList = this["card" + j + "_" + i];
                    cardList.showMaskRect(false);
                    this.groupShouCardAni(tartgetPos, cardList);
                }
            }
        }
        this.setAutoTimeout(function () {
            var count = 0;
            ;
            async.eachSeries(_this.allCards, function (card, callback) {
                var time = 1000;
                egret.Tween.get(card).wait(15 * (count / 2)).call(function () {
                    count++;
                    callback();
                }).to({
                    x: _this.fapaiGroup.x,
                    y: _this.fapaiGroup.y,
                    scaleX: 0.4,
                    scaleY: 0.4,
                    alpha: 0,
                    rotation: 0
                }, time, egret.Ease.cubicInOut).call(function () {
                    card.visible = false;
                    // game.UIUtils.removeSelf(card);
                });
            });
        }, this, 1100);
    };
    BlackJackGameScene.prototype.groupShouCardAni = function (target, cardList) {
        var _this = this;
        var arr = [];
        for (var j = 0; j < cardList.pokerGroup.numChildren; j++) {
            arr.push(cardList.pokerGroup.getChildAt(j));
            this.allCards.push(cardList.pokerGroup.getChildAt(j));
        }
        var num = 0;
        async.eachSeries(arr, function (card, callback) {
            var time = 1000;
            var startPos = card.localToGlobal();
            // let waitTime = Math.random() * 2 * 15;
            _this.effectGroup.addChild(card);
            card.x = startPos.x;
            card.y = startPos.y;
            egret.Tween.get(card).wait(15 * (num / 2)).call(function () {
                num++;
                callback();
            }).to({
                x: target.x,
                y: target.y,
            }, time, egret.Ease.cubicInOut).call(function () {
            });
        });
    };
    BlackJackGameScene.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        FrameUtils.changeBgImage("./resource/gameAssets/blackjack_hall/blackj_hall_bg.jpg");
        this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 3);
        for (var key in this.directions) {
            this.tabelDirections[this.directions[key]] = key;
        }
        this.diFen.text = CF.tigc(29) + ": " + Global.gameProxy.lastGameConfig.diFen;
        this.initUI();
        this.xzBar.setRoot(this);
        this.gameBar.setRoot(this);
        var roomInfo = Global.roomProxy.roomInfo;
        this.roomYZBets = roomInfo.addBetMulti;
        if (Global.roomProxy.reconnect) {
            this.showReconnectUI();
            this.showCountDown();
            this.showRoomByStatus(true);
        }
        else {
            this.setAutoTimeout(function () {
                _this.showStartAni();
            }, this, 400);
        }
        this.initCMList();
    };
    /**
     * 重连显示倒计时
     */
    BlackJackGameScene.prototype.showCountDown = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var data = roomInfo.countdown;
        if (!data) {
            return;
        }
        if (data.route == "s_betCountDown" || data.route == "s_startInsurance") {
            for (var i = 1; i <= 3; i++) {
                var header = this["header" + i];
                if (header.visible) {
                    header.startTimer();
                }
            }
        }
    };
    /**
     * 显示重连数据
     */
    BlackJackGameScene.prototype.showReconnectUI = function () {
        var players = Global.roomProxy.getPlayers();
        for (var key in players) {
            var playerData = players[key];
            var proxys = playerData.proxys;
            this.showProxysData(proxys, key);
        }
        this.showDealerInfo();
    };
    /**
     * 展现庄家的牌
     */
    BlackJackGameScene.prototype.showDealerInfo = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var dealerCardInfo = roomInfo.dealerCardInfo;
        if (dealerCardInfo) {
            this.card0.initWidthCard(dealerCardInfo.cards);
        }
    };
    BlackJackGameScene.prototype.findCmGroupByIndex = function (index) {
        for (var i = 1; i <= 3; i++) {
            var cmGroup = this["cmGroup" + i];
            if (cmGroup.index + "" == index + "") {
                return cmGroup;
            }
        }
        return null;
    };
    BlackJackGameScene.prototype.showOneProxyData = function (key, playerIndex, proxyData) {
        var roomInfo = Global.roomProxy.roomInfo;
        var dir = this.directions[key];
        if (key != playerIndex) {
            //不是本人
            var tableHeader = this["header" + this.directions[key]];
            tableHeader.showProxys(playerIndex);
        }
        var insuranceGold = proxyData.insuranceGold;
        var cardGroupInfo = proxyData.cardGroupInfo[0];
        if (cardGroupInfo) {
            var cmGroup = this.findCmGroupByIndex(key);
            var addBetArr = [];
            for (var i = 0; i < roomInfo.addBetMulti.length; i++) {
                addBetArr.push(roomInfo.addBetMulti[i] * roomInfo.betBase);
            }
            var numbers = NumberFormat.chaifenScore(addBetArr, cardGroupInfo.totalBet);
            if (Global.roomProxy.checkIndexIsMe(key)) {
                this.mineBet = cardGroupInfo.totalBet;
            }
            for (var numKey in numbers) {
                var num = numbers[numKey];
                for (var i = 0; i < num; i++) {
                    this.playerYZ(this.directions[key], key, numKey, false);
                }
            }
            this["scoreGroup" + dir].visible = true;
            this["scoreLabel" + dir].text = cardGroupInfo.totalBet + insuranceGold;
        }
        var size = 0;
        for (var i = 0; i <= 1; i++) {
            var cardGroupInfo_1 = proxyData.cardGroupInfo[i];
            if (cardGroupInfo_1) {
                var cards = cardGroupInfo_1.cards;
                var pattern = cardGroupInfo_1.pattern;
                var point = cardGroupInfo_1.point;
                var cardList = this["card" + this.directions[key] + "_" + (i + 1)];
                var doubleCard = cardGroupInfo_1.doubleCard;
                cardList.initWidthCard(cards);
                cardList.showPoint(pattern, point);
                size++;
                if (doubleCard) {
                    cardList.changeLast2Double();
                }
            }
        }
        //2个
        if (size == 2) {
            var cardList1 = this["card" + this.directions[key] + "_1"];
            var cardList2 = this["card" + this.directions[key] + "_2"];
            cardList1.verticalCenter -= 20;
            cardList2.verticalCenter += 60;
            //是这个牌组操作
            if (roomInfo.currentPlayerIndex == playerIndex && key == roomInfo.currentTableIndex) {
                if (roomInfo.currentCardGroupIndex == 0) {
                    cardList2.showMaskRect();
                }
                else {
                    cardList1.showMaskRect();
                }
            }
        }
    };
    /**
     * 显示玩家代理数据
     */
    BlackJackGameScene.prototype.showProxysData = function (proxys, playerIndex) {
        for (var key in proxys) {
            var proxyData = proxys[key];
            this.showOneProxyData(key, playerIndex, proxyData);
        }
        //庄家牌
    };
    BlackJackGameScene.prototype.showStartAni = function () {
        var startGame = new DBComponent("21d_startgame" + CF.tiAni);
        this.effectGroup.addChild(startGame);
        startGame.playByFilename(1);
        startGame.verticalCenter = -150;
        startGame.horizontalCenter = 0;
        SoundManager.getInstance().playEffect("blackj_start_mp3");
        // this.setAutoTimeout(() => {
        // 	this.timeBar.startTime(this);
        // 	this.timeBar.visible = true;
        // }, this, 1500);
    };
    /**
     * 根据房间显示数据
     */
    BlackJackGameScene.prototype.showRoomByStatus = function (reconnect) {
        var roomInfo = Global.roomProxy.roomInfo;
        switch (roomInfo.roomState) {
            case BLACK_J_ROUND_STATUS.ADD_BET:
                this.runAddBet(reconnect);
                break;
            case BLACK_J_ROUND_STATUS.ACTION:
                for (var i = 1; i <= 3; i++) {
                    var cmGroup = this["cmGroup" + i];
                    cmGroup.showCanYZTip(false);
                }
                this.xzBar.visible = false;
                this.runAction(reconnect);
                break;
            case BLACK_J_ROUND_STATUS.INSURANCE:
                for (var i = 1; i <= 3; i++) {
                    var cmGroup = this["cmGroup" + i];
                    cmGroup.showCanYZTip(false);
                }
                this.xzBar.visible = false;
                this.runInsuance(reconnect);
                break;
            default:
                this.xzBar.visible = false;
                break;
        }
    };
    BlackJackGameScene.prototype.runInsuance = function (reconnect) {
        if (reconnect) {
            this.checkCanMaiBx();
        }
    };
    BlackJackGameScene.prototype.runAction = function (reconnect) {
        var roomInfo = Global.roomProxy.roomInfo;
        var playerData = Global.roomProxy.getMineData();
        // if (!playerData.addAnte) {
        this.showTableTips(roomInfo.currentTableIndex);
        var player = Global.roomProxy.getMineData();
        if (roomInfo.currentPlayerIndex == Global.roomProxy.getMineIndex()) {
            var proxys = this.getCurProxyData();
            this.gameBar.initActions(proxys.actions);
            this.gameBar.visible = true;
            // if (reconnect) {
            // 	this.gameBar.visible = true;
            // } else {
            // 	this.gameBar.horizontalCenter = -720;
            // 	this.gameBar.visible = true;
            // 	egret.Tween.get(this.gameBar).to({
            // 		horizontalCenter: 0
            // 	}, 400, egret.Ease.sineIn);
            // }
        }
        else {
            this.gameBar.visible = false;
        }
        var header = this["header" + this.directions[roomInfo.currentPlayerIndex]];
        header.startTimer();
    };
    BlackJackGameScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.xlbtn:
                this.showBtnsType(2);
                return;
            case this.xlbtn1:
                this.showBtnsType(1);
                return;
            case this.buyBtn:
                this.buyBtnTouch();
                break;
            case this.noBuyBtn:
                this.noBuyBtnTouch();
                break;
            case this.restartBtn:
                this.allowBack = this.restartBtn.visible;
                this.restartBtnTouch();
                break;
            case this.backBtn:
                this.showBtnsType(1);
                this.allowBack = this.restartBtn.visible;
                this.backBtnTouch();
                break;
            case this.settingBtn:
                this.showBtnsType(1);
                CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "blackjack" });
                break;
            case this.recordBtn:
                this.showBtnsType(1);
                CF.sN(PanelNotify.OPEN_BASE_RECORD, "blackjack");
                break;
            case this.helpBtn:
                this.showBtnsType(1);
                BaseHelpShuPanel.getInstance("BlackJHelpSkin" + CF.tis, "blackj_help", CF.tic).show();
                break;
        }
        _super.prototype.onTouchTap.call(this, e);
    };
    BlackJackGameScene.prototype.buyBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp, proxyData, header;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            tableIndex: this.nextTableIndex,
                            buy: 1
                        };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_buyInsurance, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        //成功
                        if (resp && resp.error) {
                            if (resp.error.code == 0) {
                                proxyData = this.getProxyData(Global.roomProxy.getMineIndex(), this.nextTableIndex);
                                header = this["header" + this.directions[this.nextTableIndex]];
                                header.showTipsImage(false);
                                proxyData.insurance = true;
                                this.checkCanMaiBx();
                            }
                            else if (resp.error.code != -10000) {
                                Toast.launch("" + resp.error.msg);
                                this.baoxianGroup.visible = true;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BlackJackGameScene.prototype.checkCanMaiBx = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        if (roomInfo.roomState != BLACK_J_ROUND_STATUS.INSURANCE) {
            return;
        }
        var playerData = Global.roomProxy.getMineInfo();
        var proxys = playerData.proxys;
        var nextTableIndex;
        for (var tableIndex in proxys) {
            var proxyData = proxys[tableIndex];
            if (proxyData.insurance == null || proxyData.insurance == undefined) {
                nextTableIndex = Number(tableIndex);
                break;
            }
        }
        if (nextTableIndex) {
            this.nextTableIndex = nextTableIndex;
            this.baoxianGroup.visible = true;
            this.showTableTips(this.nextTableIndex);
        }
        else {
            this.baoxianGroup.visible = false;
            var index = Global.roomProxy.getMineIndex();
            var header = this["header" + this.directions[index]];
            header.removeTimer();
        }
    };
    /**
     * 不买按钮
     * @param  {egret.TouchEvent} e
     */
    BlackJackGameScene.prototype.noBuyBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp, proxyData, header;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            tableIndex: this.nextTableIndex,
                            buy: 0
                        };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_buyInsurance, data)];
                    case 1:
                        resp = _a.sent();
                        //成功
                        if (resp && resp.error && resp.error.code == 0) {
                            proxyData = this.getProxyData(Global.roomProxy.getMineIndex(), this.nextTableIndex);
                            header = this["header" + this.directions[this.nextTableIndex]];
                            header.showTipsImage(false);
                            proxyData.insurance = false;
                            this.checkCanMaiBx();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 提示板子移动
     * @param  {boolean} isShow
     */
    BlackJackGameScene.prototype.tipGroupShow = function (isShow) {
        var _this = this;
        egret.Tween.removeTweens(this.outGroup);
        if (isShow) {
            this.outImage.visible = false;
            this.inImage.visible = true;
            egret.Tween.get(this.outGroup).to({
                right: 0
            }, 300, egret.Ease.sineIn);
        }
        else {
            egret.Tween.get(this.outGroup).to({
                right: -261
            }, 300, egret.Ease.sineIn);
            this.setAutoTimeout(function () {
                _this.outImage.visible = true;
                _this.inImage.visible = false;
            }, this, 300);
        }
    };
    /**
     * 倒计时推送
     */
    BlackJackGameScene.prototype.countdown = function (e) {
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        if (!roomInfo.countdown) {
            roomInfo.countdown = {};
        }
        if (data.route == "s_betCountDown" || data.route == "s_startInsurance") {
            for (var i = 1; i <= 3; i++) {
                var header = this["header" + i];
                if (header.visible) {
                    header.startTimer();
                }
            }
        }
        roomInfo.countdown = data;
        game.DateTimeManager.instance.updateServerTime(data.start);
    };
    /**
     * 重连成功
     */
    BlackJackGameScene.prototype.reconnectSuc = function () {
        //对局已经结束不做处理
        if (this.allowBack) {
            Global.alertMediator.addAlert(CF.tigc(63), null, null, true);
            this.backHall();
            return;
        }
        var reqData = Global.gameProxy.lastGameConfig;
        if (!reqData)
            reqData = {};
        if (!Global.roomProxy.roomInfo || !Global.roomProxy.roomInfo.roomId) {
            this.backHall();
            return;
        }
        reqData.roomId = Global.roomProxy.roomInfo.roomId;
        this.reconnectCall(reqData);
    };
    BlackJackGameScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
        CF.aE(ServerNotify.s_actionsCardsIndex, this.s_actionsCardsIndex, this);
        CF.aE(ServerNotify.s_endInsurance, this.s_endInsurance, this);
        CF.aE(ServerNotify.s_dealHandCard, this.s_dealHandCard, this);
        CF.aE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
        CF.aE(ServerNotify.s_finishBet, this.s_finishBet, this);
        CF.aE(ENo.CMGROUP_TOUCH, this.cmGroupTouch, this);
        CF.aE(ServerNotify.s_addCard, this.s_addCard, this);
        // CF.aE(ServerNotify.s_addCard, this.s_addCard, this);
        CF.aE(ServerNotify.s_doubleBet, this.s_doubleBet, this);
        CF.aE(ServerNotify.s_splitCard, this.s_splitCard, this);
        CF.aE(ServerNotify.s_playerBet, this.s_addBet, this);
        CF.aE(ServerNotify.s_startBet, this.s_startBet, this);
        CF.aE(ServerNotify.s_stopBet, this.s_stopBet, this);
        CF.aE(ServerNotify.s_countdown, this.countdown, this);
        CF.aE(ServerNotify.s_notifyPlayerAction, this.s_notifyPlayerAction, this);
        CF.aE(ServerNotify.s_startInsurance, this.s_startInsurance, this);
        CF.aE(ServerNotify.s_stopInsurance, this.s_stopInsurance, this);
        CF.aE(ServerNotify.s_insuranceSettlement, this.s_insuranceSettlement, this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.aE(ServerNotify.s_dealCardsParttern, this.s_dealCardsParttern, this);
        CF.aE(ServerNotify.s_sendDealLastCards, this.s_sendDealLastCards, this);
        CF.aE(ServerNotify.s_stopCard, this.s_stopCard, this);
        CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
    };
    BlackJackGameScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_endInsurance, this.s_endInsurance, this);
        CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
        CF.rE(ServerNotify.s_actionsCardsIndex, this.s_actionsCardsIndex, this);
        CF.rE(ServerNotify.s_dealHandCard, this.s_dealHandCard, this);
        CF.rE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
        CF.rE(ServerNotify.s_finishBet, this.s_finishBet, this);
        CF.rE(ENo.CMGROUP_TOUCH, this.cmGroupTouch, this);
        CF.rE(ServerNotify.s_addCard, this.s_addCard, this);
        CF.rE(ServerNotify.s_stopCard, this.s_stopCard, this);
        CF.rE(ServerNotify.s_doubleBet, this.s_doubleBet, this);
        CF.rE(ServerNotify.s_splitCard, this.s_splitCard, this);
        CF.rE(ServerNotify.s_playerBet, this.s_addBet, this);
        CF.rE(ServerNotify.s_startBet, this.s_startBet, this);
        CF.rE(ServerNotify.s_stopBet, this.s_stopBet, this);
        CF.rE(ServerNotify.s_countdown, this.countdown, this);
        CF.rE(ServerNotify.s_notifyPlayerAction, this.s_notifyPlayerAction, this);
        CF.rE(ServerNotify.s_startInsurance, this.s_startInsurance, this);
        CF.rE(ServerNotify.s_stopInsurance, this.s_stopInsurance, this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.rE(ServerNotify.s_insuranceSettlement, this.s_insuranceSettlement, this);
        CF.rE(ServerNotify.s_sendDealLastCards, this.s_sendDealLastCards, this);
        CF.rE(ServerNotify.s_dealCardsParttern, this.s_dealCardsParttern, this);
        CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
    };
    /**
     * 游戏结束
     * @param  {egret.TouchEvent} e
     */
    BlackJackGameScene.prototype.s_roomFinished = function (e) {
        _super.prototype.roomGameOver.call(this, e);
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        if (!roomInfo) {
            return;
        }
        roomInfo.roundStatus = data.status;
    };
    /**
     *
     */
    BlackJackGameScene.prototype.s_actionsCardsIndex = function (e) {
        var data = e.data;
        var tableIndex = data.tableIndex;
        var cardGroupIndex = data.cardsIndex;
        if (cardGroupIndex == 1) {
            var cardList1 = this["card" + this.directions[tableIndex] + "_1"];
            cardList1.showMaskRect(false);
            var cardList2 = this["card" + this.directions[tableIndex] + "_2"];
            cardList2.showMaskRect();
        }
        else {
            var cardList1 = this["card" + this.directions[tableIndex] + "_1"];
            cardList1.showMaskRect();
            var cardList2 = this["card" + this.directions[tableIndex] + "_2"];
            cardList2.showMaskRect(false);
        }
    };
    /**
     * 玩家结束
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_endInsurance = function (e) {
        var roomInfo = Global.roomProxy.roomInfo;
        this.playerTimeOver(e.data.playerIndex);
        var header = this["header" + this.directions[e.data.playerIndex]];
        header.showTipsGroup(CF.tigc(118), false);
    };
    BlackJackGameScene.prototype.s_dealCardsParttern = function (e) {
        var data = e.data;
        var isBlackJack = data.isBlackJack;
        if (!data.isBlackJack) {
            Toast.launch(CF.tigc(117));
        }
    };
    /**
     * 拆牌
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_splitCard = function (e) {
        var _this = this;
        var data = e.data;
        var cardsGroup1 = data.cardGroup1;
        var cardsGroup2 = data.cardGroup2;
        var point1 = data.point1;
        var point2 = data.point2;
        var pattern1 = data.pattern1;
        var pattern2 = data.pattern2;
        var tableIndex = data.tableIndex;
        var playerIndex = data.playerIndex;
        var actions = data.actions;
        var header = this["header" + this.directions[e.data.playerIndex]];
        header.showTipsGroup(CF.tigc(119));
        if (actions && Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.gameBar.initActions(actions);
            this.gameBar.visible = true;
        }
        var proxyData = this.getProxyData(data.playerIndex, data.tableIndex);
        if (!proxyData.cardGroupInfo) {
            proxyData.cardGroupInfo = {};
        }
        proxyData.cardGroupInfo[0] = {
            cards: cardsGroup1,
            point: point1,
            pattern: pattern1
        };
        proxyData.cardGroupInfo[1] = {
            cards: cardsGroup2,
            point: point2,
            pattern: pattern2
        };
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.currentCardGroupIndex = 0;
        var cardList1 = this["card" + this.directions[tableIndex] + "_1"];
        var cardList2 = this["card" + this.directions[tableIndex] + "_2"];
        cardList1.initWidthCard([cardsGroup1[0]]);
        cardList2.initWidthCard([cardsGroup2[0]]);
        cardList2.showMaskRect(false);
        cardList1.showMaskRect(false);
        egret.Tween.get(cardList1).wait(50).to({
            verticalCenter: cardList1.verticalCenter - 20
        }, 100);
        egret.Tween.get(cardList2).wait(50).to({
            verticalCenter: cardList2.verticalCenter + 60
        }, 100);
        this.setAutoTimeout(function () {
            _this.createPokers(1);
            _this.poker2Player(tableIndex, 1, cardsGroup1[1], 1, false);
            _this.setAutoTimeout(function () {
                cardList1.showPoint(pattern1, point1);
                _this.createPokers(1);
                _this.poker2Player(tableIndex, 2, cardsGroup2[1], 1, false);
                _this.setAutoTimeout(function () {
                    cardList2.showPoint(pattern2, point2);
                }, _this, 800);
            }, _this, 800);
        }, this, 800);
        // this.showOneProxyData(data.tableIndex, data.playerIndex, proxyData);
    };
    BlackJackGameScene.prototype.showCurrentProxyData = function () {
        var roomInfo = Global.roomProxy.roomInfo;
    };
    /**
     * 买保险
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_startInsurance = function (e) {
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.roomState = BLACK_J_ROUND_STATUS.INSURANCE;
        this.checkCanMaiBx();
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            header.hideTipGroup();
        }
        // this.baoxianGroup.visible = true;
    };
    /**
     * 停止买保险
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_stopInsurance = function (e) {
        this.baoxianGroup.visible = false;
        var data = e.data;
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            header.removeTimer();
            header.hideTipGroup();
        }
        if (data.num > 0) {
            Toast.launch(CF.tigc(120), 300);
        }
    };
    /**
     * 庄家发牌
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_dealHandCard = function (e) {
        var data = e.data;
        this.currentFapaiData[6] = { cards: data.cards };
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            header.hideTipGroup();
        }
        this.startFapai(2);
    };
    /**
     * 停牌
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_stopCard = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.gameBar.visible = false;
        }
        this.playerTimeOver(playerIndex);
        var header = this["header" + this.directions[e.data.playerIndex]];
        header.showTipsGroup(CF.tigc(121));
    };
    BlackJackGameScene.prototype.playerTimeOver = function (playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        header.removeTimer();
    };
    /**
     * 要牌
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_doubleBet = function (e) {
        var data = e.data;
        data.actions = null;
        var cardList = this.addCard(e);
        cardList.currentCardOther(cardList.currentCard - 1);
        var header = this["header" + this.directions[e.data.playerIndex]];
        header.showTipsGroup(CF.tigc(122));
    };
    BlackJackGameScene.prototype.addCard = function (e) {
        var _this = this;
        var data = e.data;
        var card = data.card;
        var cardGroupIndex = data.cardGroupIndex;
        var point = data.point;
        var result = data.result;
        var tableIndex = data.tableIndex;
        var playerIndex = data.playerIndex;
        var actions = data.actions;
        if (actions && Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.gameBar.initActions(actions);
            this.gameBar.visible = true;
        }
        this.createPokers(1);
        var cardList = this.poker2Player(tableIndex, cardGroupIndex + 1, card, 1, false);
        //不是正常牌型就停止timer
        if (result != BLACKJ_RESULT.NORMAL) {
            this.stopTimerByIndex(playerIndex);
            this.gameBar.visible = false;
        }
        this.setAutoTimeout(function () {
            if (result == BLACKJ_RESULT.BOOM) {
                cardList.showPoint(BLACKJ_PATTERN.BOOM, point);
                cardList.playBoom();
                if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                    if (data.isAllBurstCard) {
                        _this.setAutoTimeout(function () {
                            _this.restartBtn.visible = true;
                        }, _this, 500);
                    }
                    // this.gameBar.visible = false;
                }
                _this.playerTimeOver(playerIndex);
            }
            else if (result == BLACKJ_RESULT.FIVE_LITTLE_DRAGONS) {
                cardList.showPoint(BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS, point);
                if (tableIndex != 6) {
                    cardList.parent.addChild(cardList);
                    //重新设置一下
                    _this.setAutoTimeout(function () {
                        var cardList1 = _this["card" + _this.directions[tableIndex] + "_" + 1];
                        var cardList2 = _this["card" + _this.directions[tableIndex] + "_" + 2];
                        cardList1.parent.addChild(cardList1);
                        cardList2.parent.addChild(cardList2);
                    }, _this, 1000);
                }
                // if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                // 	this.gameBar.visible = false;
                // }
                _this.playerTimeOver(playerIndex);
                //todo 吴晓龙
            }
            else {
                // if (point == 21) {
                // 	if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                // 		this.gameBar.visible = false;
                // 	}
                // }
                cardList.showPoint(BLACKJ_PATTERN.GENERAL_CARD, point);
            }
        }, this, 1100);
        return cardList;
    };
    /**
     * 要牌
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_addCard = function (e) {
        this.addCard(e);
        var header = this["header" + this.directions[e.data.playerIndex]];
        header.showTipsGroup(CF.tigc(123));
    };
    /**
     * 金币飞去庄家
     */
    BlackJackGameScene.prototype.cm2zhuang = function (tabelIndex) {
        var cmGroup = this.findCmGroupByIndex(tabelIndex);
        var coins = cmGroup.coinLists;
        var positon = new egret.Point();
        positon.x = GameConfig.curWidth() / 2;
        positon.y = -100;
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            this.coinMoveAni(coin, positon, _.random(10, 50), 900);
        }
    };
    /**
     * 金币飞去玩家
     */
    BlackJackGameScene.prototype.cm2Player = function (tabelIndex, playerIndex, realGainGold) {
        var _this = this;
        var cmGroup = this.findCmGroupByIndex(tabelIndex);
        var coins = cmGroup.coinLists;
        //从筹码盒子到玩家下注区域
        // let realGainGold = Number(new Big(gainGold).div(0.95).round(2, 0));
        var gaincoins = this.boxToXiaZhuQu(tabelIndex, playerIndex, realGainGold);
        var header = this["header" + this.directions[playerIndex]];
        coins.push.apply(coins, gaincoins);
        var positon = new egret.Point();
        var headerPoint = header.localToGlobal();
        positon.x = headerPoint.x + header.width / 2;
        positon.y = headerPoint.y + header.height / 2 - 30;
        //从玩家风向头像
        this.setAutoTimeout(function () {
            for (var i = 0; i < coins.length; i++) {
                var coin = coins[i];
                //	this.coinMoveAni(coin, positon, _.random(10, 50));
                _this.coinMoveAniNew(coin, positon, _.random(10, 50));
            }
        }, this, 1300);
    };
    /**创建赢了得金币数组 */
    BlackJackGameScene.prototype.createGainGoldArr = function (value, playerIndex, tabelIndex) {
        var gainCoinArr = [];
        var numbers = NumberFormat.chaifenScore(this.cmNumList, value);
        //当分数不合法时候
        if (numbers == undefined || numbers == null) {
            var realValue = Math.floor(Number(new Big(value).div(this.cmNumList[0]).round(2, 0)));
            realValue *= this.cmNumList[0];
            numbers = NumberFormat.chaifenScore(this.cmNumList, realValue);
        }
        for (var key in numbers) {
            var num = numbers[key];
            for (var i = 0; i < num; i++) {
                var coin = this.createGainCoin(playerIndex, tabelIndex, Number(key));
                coin.x = this.choumaGroup.x;
                coin.y = this.choumaGroup.y - coin.height * 0.4;
                this.touchGroup.addChild(coin);
                gainCoinArr.push(coin);
            }
        }
        return gainCoinArr;
    };
    BlackJackGameScene.prototype.initCMList = function () {
        var addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
        var bet = Global.roomProxy.roomInfo.betBase;
        this.cmNumList = _.clone(addBetMulti);
        this.cmNumList = _.map(this.cmNumList, function (num) { return num * bet; });
    };
    BlackJackGameScene.prototype.boxToXiaZhuQu = function (tableIndex, playerIndex, gaingold) {
        var arr = this.createGainGoldArr(gaingold, playerIndex, tableIndex);
        // let cmGroup = this.findCmGroupByIndex(tableIndex);
        var playercmGroup = this.findCmGroupByIndex(playerIndex);
        // let coins = cmGroup.coinLists;
        // let count = 0;
        // for (let i = 0; i < coins.length; ++i) {
        // 	let coin = ObjectPool.produce("blackjac_cm", null) as CoinComponent;
        // 	if (!coin) {
        // 		coin = new CoinComponent(CoinType.BLACKJ);
        // 		coin.touchEnabled = false;
        // 		game.UIUtils.setAnchorCenter(coin)
        // 		coin.scaleX = coin.scaleY = 0.6;
        // 	}
        // 	coin.coinImage.source = coins[i].coinImage.source;
        // 	coin.updateNumber(coins[i].score);
        // 	count += coins[i].score;
        // 	coin.x = this.choumaGroup.x;
        // 	coin.y = this.choumaGroup.y - coin.height * 0.4;
        // 	this.touchGroup.addChild(coin);
        // 	arr.push(coin);
        // 	game.UIUtils.removeSelf(coins[i]);
        // }
        // LogUtils.logD("==========分数是多少======tableIndex=======" + count);
        var endPoint = playercmGroup.localToGlobal();
        var num = 0;
        async.eachSeries(arr, function (coin, callback) {
            var endX = endPoint.x + _.random(10, 50);
            var endY = endPoint.y + _.random(10, 50);
            var time = 500;
            egret.Tween.get(coin).wait(15 * (num / 2)).call(function () {
                num++;
                callback();
            }).to({
                x: endX,
                y: endY,
            }, time).call(function () {
                coin.x = endX;
                coin.y = endY;
            });
        });
        return arr;
    };
    /**金币从盒子产生 再飞向玩家*/
    /**
     * 金币飞
     * @param  {} coin
     * @param  {} postion
     * @param  {} waitTime
     */
    BlackJackGameScene.prototype.coinMoveAni = function (coin, postion, waitTime, time) {
        if (time === void 0) { time = 500; }
        var point = coin.localToGlobal();
        this.effectGroup.addChild(coin);
        coin.x = point.x;
        coin.y = point.y;
        egret.Tween.get(coin).wait(waitTime).to({
            x: postion.x,
            y: postion.y
        }, time).call(function () {
            game.UIUtils.removeSelf(coin);
            // ObjectPool.reclaim("blackjac_cm", coin);
        });
    };
    /**金币从盒子产生 再飞向玩家*/
    /**
     * 金币飞 smart
     * @param  {} coin
     * @param  {} postion
     * @param  {} waitTime
     */
    BlackJackGameScene.prototype.coinMoveAniNew = function (coin, postion, waitTime, time) {
        if (time === void 0) { time = 500; }
        if (!this.effectGroup.contains(coin)) {
            var point = coin.localToGlobal();
            this.effectGroup.addChild(coin);
            coin.x = point.x;
            coin.y = point.y;
        }
        egret.Tween.get(coin).wait(waitTime).to({
            x: postion.x,
            y: postion.y
        }, time).call(function () {
            game.UIUtils.removeSelf(coin);
            // ObjectPool.reclaim("blackjac_cm", coin);
        });
    };
    /**
     * 庄家发牌
     */
    BlackJackGameScene.prototype.s_sendDealLastCards = function (e) {
        var data = e.data;
        this.showTableTips(0);
        this.gameBar.visible = false;
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            header.removeTimer();
            header.hideTipGroup();
            var cardList1 = this["card" + this.directions[i] + "_" + 1];
            var cardList2 = this["card" + this.directions[i] + "_" + 2];
            cardList1.showMaskRect(false);
            cardList2.showMaskRect(false);
        }
        this.showDealerCards(data);
    };
    /**
     * 结算
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.roundSettlement = function (e) {
        var _this = this;
        var data = e.data;
        // let dealerCardInfo = data.dealerCardInfo;
        // let time = this.showDealerCards(dealerCardInfo);
        // this.showTableTips(0);
        // this.gameBar.visible = false;
        // for (let i = 1; i <= 3; i++) {
        // 	let header = this[`header${i}`] as BlackJHeader;
        // 	header.removeTimer();
        // 	header.hideTipGroup();
        // 	let cardList1 = this[`card${this.directions[i]}_${1}`] as BlackJackCardList;
        // 	let cardList2 = this[`card${this.directions[i]}_${2}`] as BlackJackCardList;
        // 	cardList1.showMaskRect(false);
        // 	cardList2.showMaskRect(false);
        // }
        this.gameBar.visible = false;
        LogUtils.logD("结算数据" + JSON.stringify(data));
        this.setAutoTimeout(function () {
            var _loop_1 = function (i) {
                var gainInfo = data[i];
                if (gainInfo) {
                    var settleData = gainInfo.proxysSettlementInfo;
                    var _loop_2 = function (tabelIndex) {
                        var tableData = settleData[tabelIndex];
                        if (tableData.win) {
                            _this.piaoFenDelay = 3000;
                            _this.setAutoTimeout(function () {
                                var pattern = tableData.cardGroupInfo.pattern;
                                var realGainGold;
                                //处理gainGold
                                if (pattern == BLACKJ_PATTERN.BLACKJACK || pattern == BLACKJ_PATTERN.FIVE_LITTLE_DRAGONS) {
                                    realGainGold = Number(new Big(gainInfo.gainGold).mul(1.5).round(2, 0));
                                }
                                else {
                                    realGainGold = Number(new Big(gainInfo.gainGold).div(0.95).round(2, 0));
                                }
                                _this.cm2Player(tabelIndex, i, realGainGold);
                                SoundManager.getInstance().playEffect("blackj_cm_mp3");
                            }, _this, 1300);
                        }
                        else {
                            _this.cm2zhuang(tabelIndex);
                            SoundManager.getInstance().playEffect("blackj_cm_mp3");
                        }
                    };
                    for (var tabelIndex in settleData) {
                        _loop_2(tabelIndex);
                    }
                    // this.setAutoTimeout(() => {
                    // 	this.showRecords(gainInfo, i);
                    // }, this, this.piaoFenDelay)//1000
                }
            };
            //金币飞
            for (var i = 1; i <= 3; i++) {
                _loop_1(i);
            }
            var _loop_3 = function (i) {
                var gainInfo = data[i];
                if (gainInfo) {
                    _this.setAutoTimeout(function () {
                        _this.showRecords(gainInfo, i);
                    }, _this, _this.piaoFenDelay); //1000
                }
            };
            //smart
            for (var i = 0; i <= 3; ++i) {
                _loop_3(i);
            }
            _this.setAutoTimeout(function () {
                _this.gameBar.visible = false;
                _this.restartBtn.visible = true;
            }, _this, 2000);
        }, this, 1000);
    };
    /**
     *
     * @param  {} roundSettlement
     */
    BlackJackGameScene.prototype.showRecords = function (gainInfo, playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        //播放胜利
        if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
            this.playWinAni();
            // header.showWinAni();
            SoundManager.getInstance().playEffect("blackj_win_mp3");
        }
        header.updateGold(gainInfo.ownGold, false);
        header.showLiushui(gainInfo.gainGold);
    };
    BlackJackGameScene.prototype.playWinAni = function () {
        var winDb = new DBComponent("21d_win" + CF.tiAni);
        winDb.horizontalCenter = 0;
        ;
        winDb.verticalCenter = 0;
        ;
        winDb.callback = function () {
        };
        this.effectGroup.addChild(winDb);
        winDb.playByFilename(1);
    };
    /**
     * 展示庄家的牌
     * @param  {} dealerCardInfo
     */
    BlackJackGameScene.prototype.showDealerCards = function (dealerCardInfo) {
        var _this = this;
        var cards = dealerCardInfo.cards;
        var cardsList = this.card0;
        var points = dealerCardInfo.points;
        var patterns = dealerCardInfo.patterns;
        if (cards.length == 2) {
            cardsList.currentCard = 2;
            cardsList.showCurrent(cards[1]);
            SoundManager.getInstance().playEffect("blackj_fapai_mp3");
            cardsList.showPoint(patterns[0], points[0]);
            return 700;
        }
        var startIndex = 2;
        var pointIndex = 1;
        //先翻开当前牌
        cardsList.currentCard = 2;
        cardsList.showCurrent(cards[1]);
        cardsList.currentCard++;
        var time = 700;
        this.setAutoTimeout(function () {
            var newCard = cards.slice(2);
            cardsList.showPoint(patterns[0], points[0]);
            //然后发牌
            async.eachSeries(newCard, function (card, callback) {
                var point = [points[pointIndex]];
                var pattern = patterns[pointIndex];
                _this.createPokers(1);
                _this.poker2Player(6, 1, card, 1, false);
                _this.setAutoTimeout(function () {
                    if (pattern == BLACKJ_PATTERN.BOOM) {
                        cardsList.showMaskRect(false);
                        _this.setAutoTimeout(function () {
                            cardsList.playBoom();
                            cardsList.showMaskRect();
                            cardsList.showPoint(pattern, point);
                        }, _this, 800);
                    }
                    else {
                        _this.setAutoTimeout(function () {
                            cardsList.showPoint(pattern, point);
                        }, _this, 400);
                    }
                    pointIndex++;
                    _this.setAutoTimeout(callback, _this, 1000);
                }, _this, time + 150);
            });
        }, this, time);
        return (cards.length - 1) * 700 + 1500;
    };
    /**
     * 闲家玩家
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_playerHandCard = function (e) {
        var data = e.data;
        for (var i = 0; i < data.length; i++) {
            var infoCards = data[i];
            var playerIndex = infoCards.playerIndex;
            var tableIndex = infoCards.tableIndex;
            var proxyData = this.getProxyData(playerIndex, tableIndex);
            if (!proxyData.cardGroupInfo) {
                proxyData.cardGroupInfo = {};
                proxyData.cardGroupInfo[0] = infoCards;
            }
            var cards = infoCards.cards;
            this.currentFapaiData[tableIndex] = { cards: cards, pattern: infoCards.pattern, point: infoCards.point };
        }
    };
    /**
     * 保险
     */
    BlackJackGameScene.prototype.s_insuranceSettlement = function (e) {
        var data = e.data;
        var gold = Math.abs(data.gold);
        var playerIndex = data.playerIndex;
        var tableIndex = data.tableIndex;
        var cmGroup = this.findCmGroupByIndex(tableIndex);
        var coin = cmGroup.findCoin();
        coin.updateNumber(gold);
        var positon = new egret.Point();
        positon.x = GameConfig.curWidth() / 2;
        positon.y = -100;
        this.coinMoveAni(coin, positon, _.random(10, 50));
    };
    /**
     * 发牌
     */
    BlackJackGameScene.prototype.startFapai = function (times) {
        var number = 0;
        for (var key in this.currentFapaiData) {
            var data = this.currentFapaiData[key];
            number += data.cards.length;
        }
        this.createPokers(number);
        var index = 0;
        var cardIndex = 0;
        while (index < times) {
            var keySet = _.keys(this.currentFapaiData);
            for (var i = 0; i < keySet.length; i++) {
                var key = keySet[i];
                var fapaiData = this.currentFapaiData[key];
                var cards = fapaiData.cards;
                var pokerNum = cards[index];
                var cardList = this.poker2Player(key, 1, pokerNum, cardIndex, index == times - 1);
                cardIndex++;
                if (i == keySet.length - 1) {
                    index++;
                }
            }
        }
    };
    /**
     * @param  {} playerIndex tableIndex
     * @param  {number=1} cardIndex 1
     * @param  {} cardNum 排面值
     * @param  {} index 1
     * @param  {} showPoint true
     */
    BlackJackGameScene.prototype.poker2Player = function (playerIndex, cardIndex, cardNum, index, showPoint) {
        var _this = this;
        if (cardIndex === void 0) { cardIndex = 1; }
        var card = this.fapaiLists.pop();
        var cardList;
        if (playerIndex == 6) {
            cardList = this["card0"];
        }
        else {
            cardList = this["card" + this.directions[playerIndex] + "_" + cardIndex];
        }
        //找牌
        var cardListCard = cardList.getCurrentCard();
        cardList.currentCard++;
        cardList.changePointPosition();
        var position = cardListCard.localToGlobal();
        var time = 400;
        var moveTime = index * time;
        if (Global.runBack) {
            time = 1;
        }
        this.setAutoTimeout(function () {
            SoundManager.getInstance().playEffect("blackj_fapai_mp3");
        }, this, moveTime);
        egret.Tween.get(card).wait(moveTime).to({
            x: position.x + card.anchorOffsetX,
            y: position.y + card.anchorOffsetY,
            rotation: 0
        }, time).call(function () {
            game.UIUtils.removeSelf(card);
            card = null;
        }, egret.Ease.circOut);
        this.setAutoTimeout(function () {
            cardList.fanCurrentCard(cardNum, cardListCard);
            if (showPoint) {
                var data = _this.currentFapaiData[playerIndex];
                cardList.showPoint(data.pattern, data.point);
            }
        }, this, moveTime + 400);
        return cardList;
    };
    BlackJackGameScene.prototype.createPokers = function (number) {
        for (var i = 0; i < number; i++) {
            var card = new PokerCard(true);
            game.UIUtils.setAnchorPot(card);
            card.showOtherImage(false);
            card.scaleX = card.scaleY = 0.72;
            card.rotation = -50;
            card.showZ2B();
            this.effectGroup.addChild(card);
            card.x = this.fapaiGroup.x;
            card.y = this.fapaiGroup.y;
            this.fapaiLists.push(card);
        }
    };
    /**
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_finishBet = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var header = this["header" + this.directions[playerIndex]];
        header.showTipsGroup(CF.tigc(118), false);
        header.removeTimer();
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            //隐藏所有下注提示
            this.checkOtherCanXZ(false);
        }
    };
    BlackJackGameScene.prototype.getProxyData = function (playerIndex, tabelIndex) {
        var roomInfp = Global.roomProxy.roomInfo;
        var players = Global.roomProxy.getPlayerByIndex(playerIndex);
        if (!players.proxys[tabelIndex]) {
            players.proxys[tabelIndex] = {};
        }
        return players.proxys[tabelIndex];
    };
    /**
     * 获取当前
     */
    BlackJackGameScene.prototype.getCurProxyData = function () {
        var roomInfp = Global.roomProxy.roomInfo;
        var players = Global.roomProxy.getPlayerByIndex(roomInfp.currentPlayerIndex);
        return players.proxys[roomInfp.currentTableIndex];
    };
    BlackJackGameScene.prototype.showTableTips = function (tableIndex) {
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            if (this.tabelDirections[i] == tableIndex) {
                header.showTipsImage(true);
            }
            else {
                header.showTipsImage(false);
            }
        }
    };
    /**
     * 玩家操作
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_notifyPlayerAction = function (e) {
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.roomState = BLACK_J_ROUND_STATUS.ACTION;
        var playerIndex = data.playerIndex;
        var tableIndex = data.tableIndex;
        this.showTableTips(tableIndex);
        this.clearLastRects();
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            header.removeTimer();
        }
        var cardGroupIndex = data.cardGroupIndex;
        if (cardGroupIndex == 0) {
            var cardList1 = this["card" + this.directions[tableIndex] + "_1"];
            cardList1.showMaskRect(false);
            var cardList2 = this["card" + this.directions[tableIndex] + "_2"];
            cardList2.showMaskRect();
        }
        else {
            var cardList1 = this["card" + this.directions[tableIndex] + "_1"];
            cardList1.showMaskRect();
            var cardList2 = this["card" + this.directions[tableIndex] + "_2"];
            cardList2.showMaskRect(false);
        }
        if (!Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.gameBar.visible = false;
        }
        roomInfo.currentPlayerIndex = playerIndex;
        roomInfo.currentTableIndex = tableIndex;
        roomInfo.currentCardGroupIndex = cardGroupIndex;
        roomInfo.roomState = BLACK_J_ROUND_STATUS.ACTION;
        var player = Global.roomProxy.getMineData();
        //代理对象
        var proxyData = this.getProxyData(playerIndex, tableIndex);
        proxyData.actions = data.actions;
        this.showRoomByStatus(false);
    };
    BlackJackGameScene.prototype.clearLastRects = function () {
        for (var i = 1; i <= 3; i++) {
            // if (lastTableIndex) {
            var cardList1 = this["card" + i + "_1"];
            cardList1.showMaskRect(false);
            var cardList2 = this["card" + i + "_2"];
            cardList2.showMaskRect(false);
            // }
        }
        // let roomInfo = Global.roomProxy.roomInfo;
        // let lastTableIndex = roomInfo.currentTableIndex;
    };
    // /**
    //  * 金币从group飞回来
    //  */
    // private coin2Component(jinbi, playerIndex, component) {
    // 	let group = this['header' + playerIndex] as eui.Group;
    // 	let point1 = component.localToGlobal();
    // 	let point = group.globalToLocal(point1.x + 50, point1.y + 50);
    // 	egret.Tween.removeTweens(jinbi);
    // 	egret.Tween.get(jinbi).to({
    // 		x: point.x,
    // 		y: point.y
    // 	}, _.random(200, 400)).call(() => {
    // 		game.UIUtils.removeSelf(jinbi);
    // 		game.Utils.removeArrayItem(this['cmList' + type], jinbi);
    // 	});
    // }
    BlackJackGameScene.prototype.getHeaderByIndex = function () {
    };
    BlackJackGameScene.prototype.stopTimerByIndex = function (playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        header.removeTimer();
    };
    BlackJackGameScene.prototype.updateCurrentScore = function (tabelIndex, money) {
    };
    BlackJackGameScene.prototype.cmGroupTouch = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var roomInfo, currentSelectGold, index, player, data2, resp, max;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lockYZ) {
                            return [2 /*return*/];
                        }
                        roomInfo = Global.roomProxy.roomInfo;
                        if (roomInfo.roomState != BLACK_J_ROUND_STATUS.ADD_BET) {
                            return [2 /*return*/];
                        }
                        currentSelectGold = this.xzBar.currentScore;
                        if (!currentSelectGold) return [3 /*break*/, 2];
                        this.lockYZ = true;
                        index = e.data;
                        player = Global.roomProxy.getMineData();
                        data2 = { tableIndex: Number(index), addBet: currentSelectGold };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_bet, data2)];
                    case 1:
                        resp = _a.sent();
                        if (resp && resp.error && resp.error.code == 0) {
                            this.xzBar.grayBtn(false);
                        }
                        else {
                            if (resp.error.code == ErrorCode.BJL_BIGER2GOLD) {
                                max = Global.roomProxy.roomInfo.maxBet;
                                Toast.launch(TextUtils.instance.setTextById(124, {
                                    "1": max
                                }), 1);
                            }
                            else {
                                Toast.launch("" + resp.error.msg, 1);
                            }
                        }
                        this.lockYZ = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 头像押注
     */
    BlackJackGameScene.prototype.header2Group = function (headerIndex, groupIndex, coinObj, ani) {
        var header = this["header" + headerIndex];
        var cmGroup = this.findCmGroupByIndex(groupIndex);
        var headerPoint = header.localToGlobal();
        coinObj.x = headerPoint.x + header.width / 2;
        coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
        this.touchGroup.addChild(coinObj);
        var endPoint = cmGroup.localToGlobal();
        var endX = endPoint.x + _.random(10, 50);
        var endY = endPoint.y + _.random(10, 50);
        if (ani) {
            egret.Tween.get(coinObj).to({
                x: endX,
                y: endY
            }, 300).call(function () {
                coinObj.x = endX;
                coinObj.y = endY;
                cmGroup.addCm(coinObj);
            });
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(coinObj);
                coinObj.x = endX;
                coinObj.y = endY;
                cmGroup.addCm(coinObj);
            }, this, 300);
        }
        else {
            coinObj.x = endX;
            coinObj.y = endY;
            cmGroup.addCm(coinObj);
        }
    };
    BlackJackGameScene.prototype.getCMColor = function (coinNumber) {
        var roomInfo = Global.roomProxy.roomInfo;
        var betBase = roomInfo.betBase;
        var data = [0].concat(this.roomYZBets);
        if (coinNumber >= betBase * this.roomYZBets[this.roomYZBets.length - 1]) {
            return 4;
        }
        for (var i = 0; i < data.length; i++) {
            var small = data[i];
            var big = data[i + 1];
            if (!big) {
                big = 100000;
            }
            if (coinNumber > small * betBase && coinNumber <= big * betBase) {
                if (i >= 4) {
                    return i;
                }
                return i + 1;
            }
        }
        return 1;
    };
    BlackJackGameScene.prototype.playerYZ = function (playerIndex, tabelIndex, coinNumber, needAni) {
        coinNumber = Number(coinNumber);
        var coin = ObjectPool.produce("blackjac_cm", null);
        if (!coin) {
            coin = new CoinComponent(CoinType.BLACKJ);
            coin.touchEnabled = false;
            game.UIUtils.setAnchorCenter(coin);
            coin.scaleX = coin.scaleY = 0.6;
        }
        // let index = this.roomYZBets.indexOf(coinNumber / roomInfo.betBase) + 1;
        var index = this.getCMColor(coinNumber);
        coin.showCoin("blackj_cm_" + index, coinNumber);
        this.header2Group(playerIndex, tabelIndex, coin, needAni);
        return coin;
    };
    /**创建赢了得coin */
    BlackJackGameScene.prototype.createGainCoin = function (playerIndex, tabelIndex, coinNumber) {
        //	LogUtils.logD("====coinNumber===" + coinNumber);
        coinNumber = Number(coinNumber);
        var coin = ObjectPool.produce("blackjac_cm", null);
        if (!coin) {
            coin = new CoinComponent(CoinType.BLACKJ);
            coin.touchEnabled = false;
            game.UIUtils.setAnchorCenter(coin);
            coin.scaleX = coin.scaleY = 0.6;
        }
        // let index = this.roomYZBets.indexOf(coinNumber / roomInfo.betBase) + 1;
        var index = this.getCMColor(coinNumber);
        coin.showCoin("blackj_cm_" + index, coinNumber);
        return coin;
    };
    /**
     * 玩家动作操作
     * @param  {} data
     */
    BlackJackGameScene.prototype.gameBarTouch = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.gameBar.lockAll();
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_blackjackHandler_c_action, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp && resp.error && resp.error.code != 0) {
                            //错误
                            if (resp.error.code != ErrorCode.BUSY_REQUEST) {
                                Toast.launch(resp.error.msg);
                            }
                            this.gameBar.visible = true;
                            this.gameBar.resize2Last();
                        }
                        else {
                            // if (resp && resp.isAllBurstCard) {
                            // 	this.setAutoTimeout(() => {
                            // 		this.restartBtn.visible = true;
                            // 	}, this, 1000);
                            // }
                            // player.betInfo = resp;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 下注
     * @param  {egret.Event} e
     */
    BlackJackGameScene.prototype.s_addBet = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var tableIndex = data.tableIndex;
        var betInfo = data.betInfo;
        var totalBet = data.totalBet;
        this.playerYZ(this.directions[playerIndex], tableIndex, betInfo, true);
        var scoreLabel = this["scoreLabel" + this.directions[tableIndex]];
        scoreLabel.text = totalBet;
        this["scoreGroup" + this.directions[tableIndex]].visible = true;
        var header = this["header" + this.directions[playerIndex]];
        header.updateGold(betInfo * -1, true);
        //没有人占领
        var tableHeader = this["header" + this.directions[tableIndex]];
        if (!tableHeader.visible && !tableHeader.isProxy) {
            tableHeader.showProxys(playerIndex);
        }
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.checkOtherCanXZ();
        }
        var cmGroup = this.findCmGroupByIndex(tableIndex);
        cmGroup.showCanYZTip(false);
        //proxys
        SoundManager.getInstance().playEffect("blackj_cm_mp3");
        this.recordPlayerYz(playerIndex, tableIndex, totalBet);
    };
    BlackJackGameScene.prototype.checkOtherCanXZ = function (isVisible) {
        if (isVisible === void 0) { isVisible = true; }
        var players = Global.roomProxy.getPlayers();
        for (var i = 1; i <= 3; i++) {
            var header = this["header" + i];
            if (!header.visible) {
                var cmGroup = this["cmGroup" + i];
                cmGroup.showCanYZTip(isVisible);
            }
        }
    };
    /**
     * 记录玩家押注
     * @param  {} playerIndex
     * @param  {} tableIndex
     * @param  {} totalBet
     */
    BlackJackGameScene.prototype.recordPlayerYz = function (playerIndex, tableIndex, totalBet) {
        var player = Global.roomProxy.getPlayerByIndex(playerIndex);
        var proxyData = player.proxys[tableIndex];
        if (!proxyData) {
            proxyData = {};
            proxyData.cardGroupInfo = {
                totalBet: 0,
                pattern: 0,
                cards: [0, 0]
            };
            proxyData.insuranced = false;
        }
        proxyData.cardGroupInfo.totalBet = totalBet;
    };
    /**
     * 开始下注
     */
    BlackJackGameScene.prototype.s_startBet = function (e) {
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.roomState = BLACK_J_ROUND_STATUS.ADD_BET;
        this.showRoomByStatus(false);
    };
    /**
     * 停止下注
     */
    BlackJackGameScene.prototype.s_stopBet = function (e) {
        for (var i = 1; i <= 3; i++) {
            var cmGroup = this["cmGroup" + i];
            cmGroup.showCanYZTip(false);
            var header = this["header" + i];
            header.removeTimer();
        }
        this.xzBar.hide();
    };
    /**
     * 进入押注阶段
     */
    BlackJackGameScene.prototype.runAddBet = function (reconnect) {
        var playerData = Global.roomProxy.getMineData();
        if (!playerData.addAnte) {
            if (reconnect) {
                this.xzBar.verticalCenter = 560;
                this.xzBar.visible = true;
            }
            else {
                this.xzBar.verticalCenter = 1500;
                this.xzBar.visible = true;
                egret.Tween.get(this.xzBar).to({
                    verticalCenter: 560
                }, 400, egret.Ease.sineIn);
            }
        }
        if (this.mineBet <= 0) {
            this.xzBar.grayBtn(true);
            this.cmGroup1.showCanYZTip(true);
        }
    };
    BlackJackGameScene.prototype.initUI = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        this.roomid.text = CF.tigc(54) + ":" + roomInfo.roomId;
        this.xzBar.visible = false;
        this.gameBar.visible = false;
        this.showBtnsType(1);
        this.card0.changeScoreGroup(6);
        for (var i = 1; i < 4; i++) {
            var card1 = this["card" + i + "_1"];
            var card2 = this["card" + i + "_2"];
            card1.changeScoreGroup(i);
            card1.cardIndex = 1;
            card2.changeScoreGroup(i);
            card2.cardIndex = 2;
            // card1.visible = false;
            // card2.visible = false;
            var scoreGroup = this["scoreGroup" + i];
            scoreGroup.visible = false;
            var cmGroup = this["cmGroup" + i];
            cmGroup.init(this.tabelDirections[i]);
            var header = this["header" + i];
            header.visible = false;
        }
        this.showHeaders();
        this.initXZBar();
    };
    /**
     * 初始化下注条
     */
    BlackJackGameScene.prototype.initXZBar = function () {
        var addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
        this.xzBar.initWithArr(addBetMulti, Global.roomProxy.roomInfo.betBase);
    };
    /**
     * 展现玩家头像
     */
    BlackJackGameScene.prototype.showHeaders = function () {
        var players = Global.roomProxy.getPlayers();
        var zhuangId = Global.roomProxy.roomInfo.dealer; //换到抢庄的地方去。
        for (var key in players) {
            var dir = this.directions[key];
            players[key].playerIndex = key;
            var header = this['header' + dir];
            header.initWithPlayer(players[key]);
            header.visible = true;
            var scoreGroup = this["scoreGroup" + dir];
            var scoreLabel = this["scoreLabel" + dir];
            // scoreGroup.visible = true;
            scoreLabel.text = "0";
        }
        this["header2"].changePos2Left();
        this["header3"].changePos2Right();
        this["header1"].changePos2Right();
    };
    /**
     * 玩家押注
     */
    BlackJackGameScene.prototype.postCBet = function () {
    };
    return BlackJackGameScene;
}(game.BaseGameScene));
__reflect(BlackJackGameScene.prototype, "BlackJackGameScene");
/**游戏状态定义*/
var BLACK_J_ROUND_STATUS = {
    WAITING: 1,
    START: 2,
    ADD_BET: 3,
    NEW_CARD: 4,
    INSURANCE: 5,
    ACTION: 6,
    DEAL_ACTION: 7,
    SETTLEMENT: 8,
};
var BLACKJ_RESULT = {
    FIVE_LITTLE_DRAGONS: 1,
    BOOM: 2,
    NORMAL: 3
};
var BLACKJ_PATTERN = {
    // 黑夹克
    BLACKJACK: 3,
    // 五小龙
    FIVE_LITTLE_DRAGONS: 2,
    // 普通牌
    GENERAL_CARD: 1,
    BOOM: 0
};
