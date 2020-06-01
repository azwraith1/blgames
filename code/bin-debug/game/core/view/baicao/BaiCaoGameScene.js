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
var BaiCaoGameScene = (function (_super) {
    __extends(BaiCaoGameScene, _super);
    function BaiCaoGameScene() {
        var _this = _super.call(this) || this;
        /**
             * 背景音乐
             */
        _this.bgMusic = "bc_bgm_mp3";
        //new
        /**
         * 打开游戏界面通知
         */
        _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_BAICAO_GAME;
        /**
         * 关闭游戏界面通知
         */
        _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_BAICAO_HALL;
        /**
         * 关闭当前界面通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BAICAO_GAME;
        /**
         * 对应匹配界面通知
         */
        _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_BAICAO_MATCHING;
        _this.tabelDirections = {};
        _this.count = 0;
        _this.targetGold = 0;
        _this.mineBet = 0;
        _this.haveWinPlayer = false;
        /**
         * 发牌的信息
         */
        _this.currentFapaiData = [];
        _this.fapaiLists = [];
        _this.fapaiIndexes = [];
        /**赢了的赢分后先从筹码盒飞出筹码到赢家筹码位置，再飞向玩家 */
        _this.coinArr = [];
        _this.piaoFenDelay = 1000;
        _this.showCount = 0;
        _this.firstYz = true;
        _this.skinName = "BaiCaoGameSceneSkin";
        return _this;
    }
    BaiCaoGameScene.prototype.shouPaiAni = function () {
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
    BaiCaoGameScene.prototype.groupShouCardAni = function (target, cardList) {
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
    BaiCaoGameScene.prototype.hideAllInDB = function () {
        for (var i = 1; i <= 6; ++i) {
            var dbGroup = this["db" + i];
            dbGroup.removeChildren();
            var allInDB = this["allInDB" + i];
            if (allInDB) {
                allInDB.dbDispose();
                allInDB = null;
            }
        }
    };
    BaiCaoGameScene.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.hideAllInDB();
        //	FrameUtils.changeBgImage("./resource/gameAssets/blackjack_hall/blackj_hall_bg.jpg");
        var players = Global.roomProxy.getPlayers();
        this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), _.keys(players).length);
        LogUtils.logD("=========createChildren==========" + _.keys(players).length);
        this.diFen.text = TextUtils.instance.getCurrentTextById(29) + ":" + Global.gameProxy.lastGameConfig.diFen; //"Điểm Thấp Nhất: "
        this.initUI();
        var roomInfo = Global.roomProxy.roomInfo;
        this.roomYZBets = roomInfo.addBetMulti;
        if (Global.roomProxy.reconnect) {
            // this.showReconnectUI();
            this.showCountDown();
            this.showRoomByStatus(true);
        }
        else {
            this.currentFapaiData = [];
            for (var key in this.directions) {
                var obj = { tableIndex: this.directions[key], playerIndex: key };
                this.currentFapaiData.push(obj);
            }
            this.setAutoTimeout(function () {
                _this.showStartAni();
            }, this, 400);
        }
        this.initCMList();
    };
    /**
     * 重连显示倒计时
     */
    BaiCaoGameScene.prototype.showCountDown = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var data = roomInfo.countdown;
        LogUtils.logD("--showCountDown==" + data.s + "当前得状态：" + roomInfo.roundStatus + "============");
        if (!data || data.s == 0) {
            this.timeBar.visible = false;
            SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
            return;
        }
        this.timeBar.reseateMask();
        this.timeBar.restartTime();
        game.DateTimeManager.instance.updateServerTime(data.start);
        //SoundManager.getInstance().playEffect("bc_timer_mp3", true);
        // this.timeBar.visible = false;
    };
    /**
     * 展现庄家的牌
     */
    BaiCaoGameScene.prototype.showDealerInfo = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var dealerCardInfo = roomInfo.dealerCardInfo;
        if (dealerCardInfo) {
            this.card0.initWidthCard(dealerCardInfo.cards);
        }
    };
    BaiCaoGameScene.prototype.showStartAni = function () {
        var startDBName = "ynbc_startgame";
        var startGame = new DBComponent(startDBName);
        this.effectGroup.addChild(startGame);
        startGame.playByFilename(1);
        startGame.verticalCenter = 0;
        startGame.horizontalCenter = 0;
        SoundManager.getInstance().playEffect("bc_bigin_mp3");
        // this.setAutoTimeout(() => {
        // 	this.timeBar.startTime(this);
        // 	this.timeBar.visible = true;
        // }, this, 1500);
    };
    /**
     * 根据房间显示数据
     */
    BaiCaoGameScene.prototype.showRoomByStatus = function (reconnect) {
        var roomInfo = Global.roomProxy.roomInfo;
        var players = roomInfo.players;
        //输家显示点数
        var outPlayer = roomInfo["outPlayer"];
        if (outPlayer != null || outPlayer != undefined || outPlayer.length != 0) {
            //输得玩家全部灰色
            for (var i = 0; i < outPlayer.length; ++i) {
                var player = outPlayer[i];
                var direc = this.directions[player.playerIndex];
                var patternNum = player.pattern;
                var cards = this["card" + direc];
                this.showPattern(patternNum, 0, direc);
                cards.showMaskRect(true);
            }
        }
        var winPlayer = roomInfo["winPlayer"];
        //赢了 重新发牌
        this.currentFapaiData = [];
        for (var i = 0; i < winPlayer.length; ++i) {
            var player1 = winPlayer[i];
            var direc1 = this.directions[player1.playerIndex];
            var obj = { tableIndex: direc1, playerIndex: player1.playerIndex };
            this.currentFapaiData.push(obj);
        }
        this.runAddBet(reconnect);
        switch (roomInfo.roundStatus) {
            case BAICAO_ROUND_STATUS.ADD_BET:
                this.runAddBet(reconnect);
                break;
            case BAICAO_ROUND_STATUS.COMPARE_CARD:
                this.showZhengInfor(Global.roomProxy.roomInfo.players);
                this.compareResult(roomInfo["outPlayer"], roomInfo["winPlayer"]);
                break;
            case BAICAO_ROUND_STATUS.OPEN_CARD:
                this.showZhengInfor(Global.roomProxy.roomInfo.players);
                break;
            case BAICAO_ROUND_STATUS.NEW_CARD:
                this.showPaiInfor(Global.roomProxy.roomInfo.players);
                break;
            default:
                break;
        }
    };
    BaiCaoGameScene.prototype.showZhengInfor = function (players) {
        var dirc;
        var cardList;
        for (var key in players) {
            dirc = this.directions[key];
            var data = players[key];
            cardList = this["card" + dirc];
            var handCards = data.handCards;
            if (handCards == null || handCards == undefined || handCards.length == 0) {
                cardList.showBei();
            }
            else {
                cardList.showZheng(handCards);
            }
        }
    };
    BaiCaoGameScene.prototype.showPaiInfor = function (players) {
        var cardList;
        var dirc;
        for (var key in players) {
            var data = players[key];
            dirc = this.directions[key];
            cardList = this["card" + dirc];
            var handCards = data["handCards"];
            if (handCards == null || handCards == undefined || handCards.length == 0) {
                cardList.showBei();
            }
            else {
                cardList.showZheng(handCards);
            }
        }
    };
    BaiCaoGameScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.xlbtn:
                this.showBtnsType(2);
                return;
            case this.xlbtn1:
                this.showBtnsType(1);
                return;
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
                CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "baicao" });
                break;
            case this.recordBtn:
                this.showBtnsType(1);
                CF.sN(PanelNotify.OPEN_BASE_RECORD, GAME_ID.BAICAO);
                break;
            case this.helpBtn:
                this.showBtnsType(1);
                BaiCaoHelpPanel.instance.show("baicao");
                break;
        }
        _super.prototype.onTouchTap.call(this, e);
    };
    /**
     * 提示板子移动
     * @param  {boolean} isShow
     */
    BaiCaoGameScene.prototype.tipGroupShow = function (isShow) {
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
    BaiCaoGameScene.prototype.countdown = function (e) {
        var dataall = e.data;
        var data = dataall.countdownMS;
        var roomInfo = Global.roomProxy.roomInfo;
        if (!roomInfo.countdown) {
            roomInfo.countdown = {};
        }
        roomInfo.countdown = data;
        game.DateTimeManager.instance.updateServerTime(data.start);
    };
    /**
     * 重连成功
     */
    BaiCaoGameScene.prototype.reconnectSuc = function () {
        //对局已经结束不做处理
        if (this.allowBack) {
            Global.alertMediator.addAlert("对局已经结束", null, null, true);
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
    BaiCaoGameScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
        CF.aE(ServerNotify.s_initHandCards, this.s_initHandCards, this);
        CF.aE(ServerNotify.s_playerBet, this.s_addBet, this);
        CF.aE(ServerNotify.s_countdown, this.countdown, this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
        CF.aE(ServerNotify.s_startOpenCard, this.s_startOpenCard, this);
        CF.aE(ServerNotify.s_endOpenCard, this.s_endOpenCard, this);
        CF.aE(ServerNotify.s_openCardResult, this.s_openCardResult, this);
        /**比牌结果 */
        CF.aE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
        /**跟新金币 */
        /**比牌结果 */
        CF.aE(ServerNotify.s_asyncGoldToClient, this.s_asyncGoldToClient, this);
    };
    BaiCaoGameScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
        CF.rE(ServerNotify.s_initHandCards, this.s_initHandCards, this);
        CF.rE(ServerNotify.s_playerBet, this.s_addBet, this);
        CF.rE(ServerNotify.s_countdown, this.countdown, this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
        CF.rE(ServerNotify.s_startOpenCard, this.s_startOpenCard, this);
        CF.rE(ServerNotify.s_endOpenCard, this.s_endOpenCard, this);
        CF.rE(ServerNotify.s_openCardResult, this.s_openCardResult, this);
        /**比牌结果 */
        CF.rE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
        /**比牌结果 */
        CF.rE(ServerNotify.s_asyncGoldToClient, this.s_asyncGoldToClient, this);
        this.timeBar.removeTimer();
        SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
    };
    BaiCaoGameScene.prototype.s_asyncGoldToClient = function (e) {
        var data = e.data;
        var playerIndex = data["playerIndex"];
        var ownGold = data["ownGold"];
        var direc = this.directions[playerIndex];
        LogUtils.logD("==========s_asyncGoldToClient==========" + JSON.stringify(this.directions));
        this["header" + direc].updateGold(ownGold, false);
    };
    BaiCaoGameScene.prototype.s_compareCardResult = function (e) {
        this.hideAllInDB();
        var data = e.data;
        var outPlayer = data.outPlayer;
        var winPlayer = data.winPlayer;
        this.compareResult(outPlayer, winPlayer);
    };
    BaiCaoGameScene.prototype.resetHeader = function () {
        for (var i = 1; i <= 6; ++i) {
            this["header" + i].disposeDB();
        }
    };
    BaiCaoGameScene.prototype.compareResult = function (outPlayer, winPlayer) {
        this.currentFapaiData = [];
        ;
        var patternNum;
        var player;
        var direc;
        //输得玩家全部灰色
        for (var i = 0; i < outPlayer.length; ++i) {
            player = outPlayer[i];
            direc = this.directions[player.playerIndex];
            patternNum = player.pattern;
            var cards = this["card" + direc];
            this.showPattern(patternNum, 0, direc);
            cards.showMaskRect(true);
        }
        //赢了 重新发牌
        for (var i = 0; i < winPlayer.length; ++i) {
            player = winPlayer[i];
            direc = this.directions[player.playerIndex];
            var cards = this["card" + direc];
            patternNum = player.pattern;
            this.showPattern(patternNum, 1, direc);
            var obj = { tableIndex: direc, playerIndex: player.playerIndex };
            this.currentFapaiData.push(obj);
            var header = this['header' + direc];
            header.playDB();
        }
        if (this.haveMine && winPlayer.length == 1) {
            SoundManager.getInstance().playEffect("bc_win_mp3");
        }
        if (winPlayer.length == 1) {
            this.winPlayerIndex = winPlayer[0]["playerIndex"];
        }
        if (winPlayer.length > 1) {
            SoundManager.getInstance().playEffect("bc_tied_mp3");
        }
        if (this.haveMine == false && winPlayer.length == 1) {
            SoundManager.getInstance().playEffect("bc_lose_mp3");
        }
        this.haveWinPlayer = winPlayer.length > 0;
    };
    BaiCaoGameScene.prototype.showPattern = function (pattern, isWin, direc) {
        var _pattern = this["pattern" + direc];
        _pattern.visible = true;
        _pattern.showPattern(pattern, isWin);
    };
    BaiCaoGameScene.prototype.s_openCardResult = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var handCards = data.handCards;
        var pattern = data.pattern;
        var dire = this.directions[playerIndex];
        var patternCom = this["pattern" + dire];
        var cardList = this["card" + dire];
        cardList.initWidthCard(handCards);
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            return;
        }
        cardList.cardAnimation();
    };
    /**
* 开牌结束
* @param  {egret.TouchEvent} e
*/
    BaiCaoGameScene.prototype.s_endOpenCard = function (e) {
        var data = e.data;
        // this.timeBar.visible = false;
        this.timeBar.reseateMask();
        SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
    };
    /**
* 开牌开始
* @param  {egret.TouchEvent} e
*/
    BaiCaoGameScene.prototype.s_startOpenCard = function (e) {
        var data = e.data;
        this.countdown(e);
        this.timeBar.reseateMask();
        this.timeBar.restartTime();
        SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
        SoundManager.getInstance().playEffect("bc_timer_mp3", true);
    };
    /**
     * 游戏结束
     * @param  {egret.TouchEvent} e
     */
    BaiCaoGameScene.prototype.s_roomFinished = function (e) {
        _super.prototype.roomGameOver.call(this, e);
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        if (!roomInfo) {
            return;
        }
        roomInfo.roundStatus = data.status;
    };
    BaiCaoGameScene.prototype.showCurrentProxyData = function () {
        var roomInfo = Global.roomProxy.roomInfo;
    };
    BaiCaoGameScene.prototype.playerTimeOver = function (playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        header.removeTimer();
    };
    BaiCaoGameScene.prototype.initCMList = function () {
        var addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
        var bet = Global.roomProxy.roomInfo.betBase;
        this.cmNumList = _.clone(addBetMulti);
        this.cmNumList = _.map(this.cmNumList, function (num) { return num * bet; });
        LogUtils.logD("list" + this.cmNumList);
    };
    /**
     * 结算
     * @param  {egret.Event} e
     */
    BaiCaoGameScene.prototype.roundSettlement = function (e) {
        var _this = this;
        var data = e.data;
        this.timeBar.removeTimer();
        LogUtils.logD("结算数据" + JSON.stringify(data));
        this.setAutoTimeout(function () {
            //smart
            for (var key in data) {
                var gainInfo = data[key];
                // if (gainInfo) {
                // 	this.setAutoTimeout(() => {
                _this.showRecords(gainInfo, key);
                // 	}, this, this.piaoFenDelay)//1000
                // }
            }
            if (Global.runBack) {
                _this.removeCoins();
            }
            _this.timeBar.visible = false;
            _this.setAutoTimeout(function () {
                _this.restartBtn.visible = true;
            }, _this, 2000);
        }, this, 1000);
    };
    /**
     *
     * @param  {} roundSettlement
     */
    BaiCaoGameScene.prototype.showRecords = function (gainInfo, playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        //播放胜利
        if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
        }
        if (gainInfo.gainGold > 0) {
            this.cm2Player(this.directions[playerIndex]);
            //筹码重新设置为0
            this.setTotalBet(0);
        }
        if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold <= 0) {
        }
        header.updateGold(gainInfo.ownGold, false);
        if (gainInfo.gainGold <= 0) {
            header.showLiushui(gainInfo.gainGold);
        }
        else {
            this.mineWinLabel.visible = true;
            this.mineWinLabel.text = "+" + gainInfo.gainGold + "";
        }
    };
    /**
 * 金币飞去玩家
 */
    BaiCaoGameScene.prototype.cm2Player = function (tabelIndex, playerIndex, realGainGold) {
        if (playerIndex === void 0) { playerIndex = null; }
        if (realGainGold === void 0) { realGainGold = null; }
        var coins = this.coinArr;
        //从筹码盒子到玩家下注区域
        var header = this["header" + tabelIndex];
        var positon = new egret.Point();
        var headerPoint = header.coinTarget.localToGlobal();
        //从玩家风向头像
        SoundManager.getInstance().playEffect("bc_chip3_mp3");
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            this.coinMoveAniNew(coin, headerPoint, _.random(10, 100), this.coinArr); //10, 50
        }
    };
    BaiCaoGameScene.prototype.removeCoins = function () {
        var coins = this.coinArr;
        this.cmGroup.removeChildren();
        this.coinArr = [];
    };
    /**
     * 金币飞 smart
     * @param  {} coin
     * @param  {} postion
     * @param  {} waitTime
     */
    BaiCaoGameScene.prototype.coinMoveAniNew = function (coin, postion, waitTime, coinsArr, time) {
        var _this = this;
        if (time === void 0) { time = 500; }
        if (!this.effectGroup.contains(coin)) {
            var point = coin.localToGlobal();
            this.effectGroup.addChild(coin);
            coin.x = point.x;
            coin.y = point.y;
        }
        egret.Tween.get(coin).wait(waitTime).to({
            x: postion.x,
            y: postion.y,
        }, time).call(function () {
            game.UIUtils.removeSelf(coin);
            var index = coinsArr.indexOf(coin);
            if (index > -1) {
                coinsArr.splice(index, 1);
            }
            // ObjectPool.reclaim("blackjac_cm", coin);
        });
        this.setAutoTimeout(function () {
            game.UIUtils.removeSelf(coin);
            var index = _this.coinArr.indexOf(coin);
            if (index > -1) {
                _this.coinArr.splice(index, 1);
            }
        }, this, waitTime + time);
    };
    BaiCaoGameScene.prototype.playWinAni = function () {
        var winDb = new DBComponent("ynbc_win");
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
     * 闲家玩家
     * @param  {egret.Event} e
     */
    BaiCaoGameScene.prototype.s_initHandCards = function (e) {
        var data = e.data;
        var player = data.playerIndex;
        this.resetHeader();
        var handCards = data.cards;
        var pattern = data.pattern;
        var dirc = this.directions[player];
        if (handCards.length != 0) {
            this["card" + dirc].initCardsData(handCards);
        }
        this.startFapai(3, data.startFapaiIndex);
    };
    /**
     * 发牌
     */
    BaiCaoGameScene.prototype.hideCardsAndPattern = function (directions) {
        this["card" + directions].resetLists(); //pattern
        this["pattern" + directions].visible = false;
    };
    BaiCaoGameScene.prototype.startFapai = function (times, startFapaiIndex) {
        this.allNum = 0;
        this.showCount = 3;
        var startIndex = startFapaiIndex;
        // let keys = _.keys(this.currentFapaiData);
        var curentFaiPaiData = _.sortBy(this.currentFapaiData, "tableIndex");
        for (var i = 0; i < curentFaiPaiData.length; ++i) {
            var data = curentFaiPaiData[i];
            //data是玩家的index;
            this.hideCardsAndPattern(data["tableIndex"]);
            this.allNum += 3;
        }
        var fapaiArr = [];
        //创建手牌个数
        this.createPokers(this.allNum);
        var count = 0;
        this.currentIndex = 0;
        do {
            for (var i = 0; i < curentFaiPaiData.length; i++) {
                var playIndex = curentFaiPaiData[i]["playerIndex"];
                this.poker2Player(playIndex, i, count);
                count++;
            }
            this.showCount--;
        } while (this.showCount > 0);
    };
    Object.defineProperty(BaiCaoGameScene.prototype, "haveMine", {
        get: function () {
            var haveMine = false;
            for (var i = 0; i < this.currentFapaiData.length; ++i) {
                var data = this.currentFapaiData[i];
                if (data["playerIndex"] == Global.roomProxy.getMineIndex()) {
                    haveMine = true;
                }
            }
            return haveMine;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param  {} playerIndex tableIndex
     * @param  {number=1} cardIndex 1
     * @param  {} cardNum 排面值
     * @param  {} index 1
     * @param  {} showPoint true
     */
    BaiCaoGameScene.prototype.poker2Player = function (playerIndex, index, count) {
        var _this = this;
        var card = this.fapaiLists.pop();
        var cardList;
        cardList = this["card" + this.directions[playerIndex]];
        var cradNum = this.showCount;
        if (this.showCount == 3)
            cradNum = 1;
        if (this.showCount == 1)
            cradNum = 3;
        //找牌
        var cardListCard = cardList.getCurrentCard(cradNum);
        var _scaleX = playerIndex == Global.roomProxy.getMineIndex() ? 0.94 : 0.65;
        var _scaley = playerIndex == Global.roomProxy.getMineIndex() ? 0.94 : 0.65;
        var deltaX = 423.3 - 398;
        var deltaY = 276.8 - 245;
        if (playerIndex == Global.roomProxy.getMineIndex()) {
            deltaX = 305.4 - 290;
            deltaY = 1031.85 - 1010;
        }
        var position = cardListCard.localToGlobal();
        var posX = position.x + card.anchorOffsetX - deltaX;
        var posY = position.y + card.anchorOffsetY - deltaY;
        var time = 150;
        var moveTime = count * 155 / 2; //index * time
        var time1 = this.currentIndex * 155 / 2;
        if (Global.runBack) {
            time = 1;
        }
        this.setAutoTimeout(function () {
            SoundManager.getInstance().playEffect("bc_deal_mp3");
        }, this, moveTime);
        egret.Tween.get(card).wait(moveTime).call(function () {
        }).to({
            x: posX,
            y: posY,
            rotation: 0,
            scaleX: _scaleX,
            scaleY: _scaley
        }, time).call(function () {
            cardListCard.visible = true;
        }, egret.Ease.circOut);
        this.setAutoTimeout(function () {
            _this.currentIndex++;
            card.x = posX;
            card.y = posY;
            card.scaleX = _scaleX;
            card.scaleY = _scaley;
            egret.Tween.removeTweens(card);
            game.UIUtils.removeSelf(card);
            //如果是自己把牌翻过来
            cardListCard.visible = true;
            card = null;
            if (_this.currentIndex == _this.allNum && _this.haveMine) {
                var card1 = _this["card1"];
                card1.fanCards();
                card1.cardAnimation();
                _this.setAutoTimeout(function () {
                    _this.timeBar.visible = true;
                }, _this, 350);
            }
            if (_this.currentIndex == _this.allNum && _this.haveMine == false) {
                _this.timeBar.visible = true;
            }
        }, this, moveTime + time); //400
        return cardList;
    };
    BaiCaoGameScene.prototype.createPokers = function (number) {
        for (var i = 0; i < number; i++) {
            var card = new PokerCard(false);
            card.scaleX = card.scaleY = 0.65;
            game.UIUtils.setAnchorPot(card);
            card.showOtherImage(false);
            // card.rotation = -50;
            card.showZ2B();
            this.effectGroup.addChild(card);
            card.x = this.fapaiGroup.x;
            card.y = this.fapaiGroup.y;
            this.fapaiLists.push(card);
        }
    };
    /**
     * 获取当前
     */
    BaiCaoGameScene.prototype.getCurProxyData = function () {
        var roomInfp = Global.roomProxy.roomInfo;
        var players = Global.roomProxy.getPlayerByIndex(roomInfp.currentPlayerIndex);
        return players.proxys[roomInfp.currentTableIndex];
    };
    BaiCaoGameScene.prototype.showTableTips = function (tableIndex) {
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
    BaiCaoGameScene.prototype.getHeaderByIndex = function () {
    };
    BaiCaoGameScene.prototype.stopTimerByIndex = function (playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        header.removeTimer();
    };
    BaiCaoGameScene.prototype.cmGroupAddCm = function (coin, headIndex) {
        if (headIndex === void 0) { headIndex = null; }
        var point = this.cmGroup.globalToLocal(coin.x, coin.y);
        coin.x = point.x;
        coin.y = point.y;
        this.cmGroup.addChild(coin);
    };
    /**
     * 头像押注
     */
    BaiCaoGameScene.prototype.header2Group = function (headerIndex, coinObj, ani) {
        var _this = this;
        SoundManager.getInstance().playEffect("bc_chip_mp3");
        var header = this["header" + headerIndex];
        var headerPoint = header.localToGlobal();
        coinObj.x = headerPoint.x + header.coinTarget.x;
        coinObj.y = headerPoint.y + header.coinTarget.y;
        // coinObj.x = headerPoint.x + header.width / 2;
        // coinObj.y = headerPoint.y + header.height / 2 - coinObj.height * 0.4;
        this.touchGroup.addChild(coinObj);
        var endPoint = this.cmGroup.localToGlobal(); //cmGroup
        var endX = endPoint.x + _.random(10, 50);
        var endY = endPoint.y + _.random(10, 50);
        var time = 200; //200;
        if (ani) {
            egret.Tween.get(coinObj).to({
                x: endX,
                y: endY
            }, time);
            if (Global.runBack) {
                egret.Tween.removeTweens(coinObj);
                coinObj.x = endX;
                coinObj.y = endY;
                this.cmGroupAddCm(coinObj);
            }
            else {
                this.setAutoTimeout(function () {
                    egret.Tween.removeTweens(coinObj);
                    coinObj.x = endX;
                    coinObj.y = endY;
                    _this.cmGroupAddCm(coinObj);
                }, this, time);
            }
        }
        else {
            coinObj.x = endX;
            coinObj.y = endY;
            this.cmGroupAddCm(coinObj);
        }
    };
    BaiCaoGameScene.prototype.getCMColor = function (coinNumber) {
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
    Object.defineProperty(BaiCaoGameScene.prototype, "coinColorIndex", {
        get: function () {
            var _index;
            var roomInfo = Global.roomProxy.roomInfo;
            var betBase = roomInfo.betBase;
            if (betBase > 0) {
                _index = 2;
            }
            if (betBase > 10) {
                _index = 4;
            }
            if (betBase > 30) {
                _index = 3;
            }
            else {
                _index = 1;
            }
            return _index;
        },
        enumerable: true,
        configurable: true
    });
    BaiCaoGameScene.prototype.playerYZ = function (playerIndex, coinNumber, needAni) {
        coinNumber = Number(coinNumber);
        var coin = ObjectPool.produce("baicao_cm", null);
        if (!coin) {
            coin = new CoinComponent(CoinType.BAICAO);
            coin.touchEnabled = false;
            game.UIUtils.setAnchorCenter(coin);
        }
        coin.scaleY = coin.scaleX = 0.9;
        this.coinArr.push(coin);
        var index = this.coinColorIndex; //this.getCMColor(coinNumber);
        coin.showCoin("baicao_cm_" + index, coinNumber);
        this.header2Group(playerIndex, coin, needAni);
        return coin;
    };
    /**创建赢了得coin */
    BaiCaoGameScene.prototype.createGainCoin = function (coinNumber) {
        coinNumber = Number(coinNumber);
        var coin = ObjectPool.produce("baicao_cm", null);
        if (!coin) {
            coin = new CoinComponent(CoinType.BAICAO);
            coin.touchEnabled = false;
            game.UIUtils.setAnchorCenter(coin);
        }
        var index = this.getCMColor(coinNumber);
        coin.showCoin("baicao_cm_" + index, coinNumber);
        return coin;
    };
    /**
     * 玩家动作操作
     * @param  {} data
     */
    BaiCaoGameScene.prototype.gameBarTouch = function (data) {
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
    BaiCaoGameScene.prototype.delayShowAddBet = function (delay, playerIndex, betInfo) {
        var _this = this;
        this.setAutoTimeout(function () {
            _this.setTotalBet(betInfo + _this.getTotalBet());
            if (Global.runBack) {
                _this.playerYZ(_this.directions[playerIndex], betInfo, false);
            }
            else {
                _this.playerYZ(_this.directions[playerIndex], betInfo, true);
            }
        }, this, delay);
    };
    /**
     * 下注
     * @param  {egret.Event} e
     */
    BaiCaoGameScene.prototype.setTotalBet = function (bet) {
        this.totalBet.text = "Tổng:" + bet;
    };
    BaiCaoGameScene.prototype.getTotalBet = function () {
        var txt = this.totalBet.text;
        var val = Number(txt.replace("Tổng:", ""));
        return val;
    };
    BaiCaoGameScene.prototype.s_addBet = function (e) {
        //
        var data = e.data;
        var playerIndex;
        var totalBet = data.totalBet;
        var betInfo = data.bet;
        var delayCtrl = data.delayCtrl;
        var delay;
        var onePlayerData;
        var betDatas = _.sortBy(delayCtrl, 'delay');
        for (var i = 0; i < betDatas.length; ++i) {
            onePlayerData = betDatas[i];
            playerIndex = onePlayerData.playerIndex;
            delay = onePlayerData.delay;
            var allIn = onePlayerData["allIn"];
            var dirc = this.directions[playerIndex];
            var dbGroup = this["db" + dirc];
            this.delayShowAddBet(delay, playerIndex, betInfo);
            if (allIn > 0) {
                this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
                SoundManager.getInstance().playEffect("bc_allin_mp3");
            }
        }
    };
    BaiCaoGameScene.prototype.checkOtherCanXZ = function (isVisible) {
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
    BaiCaoGameScene.prototype.recordPlayerYz = function (playerIndex, tableIndex, totalBet) {
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
    BaiCaoGameScene.prototype.s_startBet = function (e) {
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.roomState = BLACK_J_ROUND_STATUS.ADD_BET;
        this.showRoomByStatus(false);
    };
    /**
     * 停止下注
     */
    BaiCaoGameScene.prototype.s_stopBet = function (e) {
        for (var i = 1; i <= 3; i++) {
            var cmGroup = this["cmGroup" + i];
            cmGroup.showCanYZTip(false);
            var header = this["header" + i];
            header.removeTimer();
        }
        // this.xzBar.hide();
    };
    /**
     * 进入押注阶段
     */
    BaiCaoGameScene.prototype.runAddBet = function (reconnect) {
        if (reconnect == false)
            return;
        var roomInfo = Global.roomProxy.roomInfo;
        var players = roomInfo.players;
        var onePlayer;
        for (var key in players) {
            onePlayer = players[key];
            var betInfo = onePlayer["bet"];
            if (betInfo == 0) {
                continue;
            }
            this.playerYZ(this.directions[key], betInfo, false);
        }
    };
    BaiCaoGameScene.prototype.initUI = function () {
        this.timeBar.startTime(this);
        var roomInfo = Global.roomProxy.roomInfo;
        this.roomid.text = TextUtils.instance.getCurrentTextById(48) + ":" + roomInfo.roomId; //"房间编号:"
        if (roomInfo.totalBet) {
            this.setTotalBet(roomInfo.totalBet);
        }
        else {
            this.setTotalBet(0);
        }
        this.showBtnsType(1);
        for (var i = 1; i <= 6; i++) {
            var card1 = this["card" + i];
            var pattern = this["pattern" + i];
            card1.resetLists();
            pattern.visible = false;
            var header = this["header" + i];
            header.visible = false;
        }
        this.showHeaders();
    };
    /**
     * 展现玩家头像
     */
    BaiCaoGameScene.prototype.showHeaders = function () {
        for (var i = 1; i <= 6; ++i) {
            var header = this['header' + 1];
            header.visible = false;
        }
        var players = Global.roomProxy.getPlayers();
        for (var key in players) {
            var dir = this.directions[key];
            players[key].playerIndex = key;
            var header = this['header' + dir];
            header.initWithPlayer(players[key]);
            header.visible = true;
        }
    };
    /**
     * 玩家押注
     */
    BaiCaoGameScene.prototype.postCBet = function () {
    };
    return BaiCaoGameScene;
}(game.BaseGameScene));
__reflect(BaiCaoGameScene.prototype, "BaiCaoGameScene");
//比较规则：0(Bù)<1<2<3<4<5<6<7<8<9<3 Tiên<3 Cào
var BAICAO_PATTERN = {
    BU: 0,
    TIEN3: 10,
    CAO3: 11 // 当3张牌为3，3，3时，称为3 Cào
};
//  WA
// 黑，红，梅，方 
//  J: 11,
//     Q: 12,
//     K: 13,
//     A: 1,
//  WAITING: 0,   // 等待其它玩家准备
//     ADD_BET: 1, // 下注
//     NEW_CARD: 2,   // 发牌
//     OPEN_CARD: 3,   // 开牌
//     COMPARE_CARD: 4, // 比牌
//     SETTLEMENT: 5, // 结算
//     STEP_WAIT: 6, // 步骤等待
/**游戏状态定义*/
var BAICAO_ROUND_STATUS = {
    WAITING: 0,
    ADD_BET: 1,
    NEW_CARD: 2,
    OPEN_CARD: 3,
    COMPARE_CARD: 4,
    SETTLEMENT: 5,
    STEP_WAIT: 6,
};
