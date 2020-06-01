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
 * @Date: 2019-03-28 10:30:04
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-05-11 14:21:27
 * @Description: 游戏主场景
 */
var BDZGameScene = (function (_super) {
    __extends(BDZGameScene, _super);
    function BDZGameScene() {
        var _this = _super.call(this) || this;
        _this.pokerList = [];
        _this.cmItemList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this.switchCardList = null;
        _this.clickSoundName = "bdz_btn_click_mp3";
        _this.bgMusic = "";
        _this.allInAnis = [];
        _this.aniTotalBet = 0;
        _this.lockSwitch = false;
        //new
        /**
         * 打开游戏界面通知
         */
        _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_BDZ;
        /**
         * 关闭游戏界面通知
         */
        _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_BDZ_HALL;
        /**
         * 关闭当前界面通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BDZ;
        /**
         * 对应匹配界面通知
         */
        _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_BDZ_MATCHING;
        _this.skinName = new BDZGameSceneSkin();
        return _this;
    }
    BDZGameScene.prototype.s_pushRaceInvite = function () {
    };
    BDZGameScene.prototype.settingBtnTouch = function () {
        CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "bdz" });
    };
    BDZGameScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.BDZ_CARD_TOUCH, this.bdzCardTouch, this);
        CF.aE(ServerNotify.s_curPlay, this.s_curPlayPush, this);
        CF.aE(ServerNotify.s_handleBetTask, this.s_handleBetTaskPush, this);
        CF.aE(ServerNotify.s_hangupTask, this.s_hangupTaskPush, this);
        CF.aE(ServerNotify.s_switchCard, this.s_switchCardPush, this);
        CF.aE(ServerNotify.s_curPlaySwitchCard, this.s_curPlaySwitchCardPush, this);
        CF.aE(ServerNotify.s_handleOperateTask, this.s_handleOperateTaskPush, this);
        CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlementPush, this);
        CF.aE(ServerNotify.s_startSwitchCard, this.s_startSwitchCardPush, this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.aE(ServerNotify.s_roomFinished, this.s_roomFinishedPush, this);
        CF.aE(ServerNotify.s_countdown, this.s_countdown, this);
        CF.aE(ServerNotify.s_startBet, this.s_startBetPush, this);
    };
    BDZGameScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        this.timeBar.stopTimer();
        SoundManager.getInstance().stopEffectByName("bdz_timer_mp3");
        CF.rE(ENo.BDZ_CARD_TOUCH, this.bdzCardTouch, this);
        CF.rE(ServerNotify.s_curPlay, this.s_curPlayPush, this);
        CF.rE(ServerNotify.s_handleBetTask, this.s_handleBetTaskPush, this);
        CF.rE(ServerNotify.s_hangupTask, this.s_hangupTaskPush, this);
        CF.rE(ServerNotify.s_switchCard, this.s_switchCardPush, this);
        CF.rE(ServerNotify.s_curPlaySwitchCard, this.s_curPlaySwitchCardPush, this);
        CF.rE(ServerNotify.s_handleOperateTask, this.s_handleOperateTaskPush, this);
        CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlementPush, this);
        CF.rE(ServerNotify.s_startSwitchCard, this.s_startSwitchCardPush, this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        CF.rE(ServerNotify.s_roomFinished, this.s_roomFinishedPush, this);
        CF.rE(ServerNotify.s_startBet, this.s_startBetPush, this);
        CF.rE(ServerNotify.s_countdown, this.s_countdown, this);
    };
    BDZGameScene.prototype.showPatternTip = function (playerIndex) {
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        var tipCards = playerData.tipCards || [];
        var mineCard = playerData.handCards.value;
        var roundPattern = playerData.roundPattern;
        var str = "";
        if (roundPattern == 4) {
            var card = PukerUtils.number2Puker(mineCard[mineCard.length - 1] % 100);
            str = "\uBA54\uC774\uB4DC " + card + " \uD0D1";
        }
        else {
            for (var i = 0; i < mineCard.length; i++) {
                var card = mineCard[i];
                if (tipCards.indexOf(card) == -1) {
                    str += PukerUtils.number2Puker(card % 100) + " ";
                }
            }
            if (roundPattern == 3) {
                str += "베이스";
            }
            else if (roundPattern == 2) {
                str += "투베이스";
            }
        }
        var button = this["patternTip" + this.directions[playerIndex]];
        button.visible = true;
        button.labelDisplay.text = str;
    };
    BDZGameScene.prototype.s_startBetPush = function (e) {
        // this.showChangeGroup(false)
    };
    BDZGameScene.prototype.s_roomFinishedPush = function (e) {
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.roundStatus = ROUND_STATUS.CLOSE;
        this.status = ROUND_STATUS.CLOSE;
        // if (data.status == 2) {
        // 	Global.alertMediator.addAlert("牌局异常结束,请联系客服", () => {
        // 		CF.sN(SceneNotify.OPEN_SANGONG_HALL);
        // 		CF.sN(SceneNotify.CLOSE_SANGONG_GAME);
        // 	}, null, true);
        // }
    };
    BDZGameScene.prototype.clearTabelInfo = function () {
        for (var i = 1; i <= 5; i++) {
            this["tipImage" + i].source = "";
            this["czTipImage" + i].source = "";
        }
    };
    BDZGameScene.prototype.s_startSwitchCardPush = function (e) {
        this.switchCardList = null;
        this.lockHuanpaiGroup(false);
        this.clearTabelInfo();
    };
    BDZGameScene.prototype.reconnectSuc = function (e) {
        var _this = this;
        //对局已经结束不做处理
        if (this.status == ROUND_STATUS.CLOSE) {
            game.NetReconnect.instance.hide();
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
        Global.playerProxy.updatePlayerInfo(function () { return __awaiter(_this, void 0, void 0, function () {
            var handler, resp, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.status == ROUND_STATUS.CLOSE) {
                            // game.NetReconnect.instance.hide();
                            return [2 /*return*/];
                        }
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        reqData['isContinue'] = false;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, reqData)];
                    case 1:
                        resp = _a.sent();
                        if (!resp) {
                            return [2 /*return*/];
                        }
                        if (!resp.error) {
                            resp.error = {};
                            resp.error.code = 0;
                        }
                        //游戏房间已经解散
                        if (resp.error.code == -213) {
                            this.backHall();
                            text = TextUtils.instance.getCurrentTextById(63);
                            Global.alertMediator.addAlert(text);
                            //弹出提示
                        }
                        else if (resp.error.code == 0) {
                            Global.roomProxy.clearRoomInfo();
                            Global.roomProxy.setRoomInfo(resp);
                            CF.sN(SceneNotify.CLOSE_BDZ);
                            CF.sN(SceneNotify.OPEN_BDZ);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    BDZGameScene.prototype.s_handleOperateTaskPush = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        playerData.gameStatus = data.gameStatus;
        playerData.task = data.task;
        if (data.task == 1) {
            //弃牌
            var shoupai = this["shoupai" + this.directions[playerIndex]];
            shoupai.showQipaiAni(true);
            this.allowBack = true;
            if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                this.checkShowRestart();
                this.patternTip1.visible = false;
            }
        }
        this.playPlayerTouch(data.task, playerData.sex);
        this.curGoldLabel.text = "0";
        playerData.taskInfo = this.defaultTaskInfo;
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.renderButtonGroup();
        }
        this.showPlayerTask(playerIndex, data.task, true);
    };
    BDZGameScene.prototype.realeaseAllin = function () {
        while (this.allInAnis.length > 0) {
            var ani = this.allInAnis.pop();
            ani.stop();
            ani.realease();
        }
    };
    /**
     * 游戏结算
     * @param  {egret.Event} e
     */
    BDZGameScene.prototype.s_roundSettlementPush = function (e) {
        var _this = this;
        this.clearTabelInfo();
        this.timeBar.hideTimeBar();
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.curPlay = 0;
        this.showCurPlay();
        this.realeaseAllin();
        var data = e.data;
        var showResultInfo = data.showResultInfo;
        var winGoldInfo = data.winGoldInfo;
        var allinBackInfo = data.allinBackInfo;
        //给玩家赋值牌
        var players = roomInfo.players;
        var indexes = [];
        for (var key in players) {
            if (showResultInfo[key]) {
                var player = players[key];
                player.handCards = showResultInfo[key].handCards;
                player.tipCards = showResultInfo[key].tipCards;
                player.roundPattern = showResultInfo[key].roundPattern || showResultInfo[key].pattern;
                indexes.push(key);
            }
        }
        var mineGainGold;
        var resultPlayers = data.players;
        var trueGainGold = 0;
        for (var key in resultPlayers) {
            var dir = this.directions[key];
            var player = resultPlayers[key];
            var gainGold = player.gainGold;
            var ownGold = player.ownGold;
            var header = this["header" + dir];
            if (key == Global.roomProxy.getMineIndex()) {
                mineGainGold = gainGold;
                Global.playerProxy.playerData.gold = ownGold;
            }
            if (gainGold > 0) {
                trueGainGold = gainGold;
            }
            header.updateGold(ownGold, false);
        }
        //allin 返回一些
        for (var key in allinBackInfo) {
            var dir = this.directions[key];
            var header = this["header" + dir];
            header.updateGold(allinBackInfo[key].ownGold, false);
            if (key == Global.roomProxy.getMineIndex()) {
                Global.playerProxy.playerData.gold = allinBackInfo[key].ownGold;
            }
        }
        var startIndex = showResultInfo.turnStartIndex;
        var chaiIndex = indexes.indexOf(startIndex + "");
        var newIndexes = indexes.slice(chaiIndex, indexes.length).concat(indexes.slice(0, chaiIndex));
        // this.checkMineIsBDZ(Global.roomProxy.getMineIndex());
        //翻牌
        async.eachSeries(newIndexes, function (playerIndex, callback) {
            var player = Global.roomProxy.getPlayerByIndex(playerIndex);
            if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                if (newIndexes.length > 1) {
                    SoundManager.getInstance().playEffect("bdz_" + player.sex + "_par" + player.roundPattern + "_mp3");
                }
                callback();
                return;
            }
            var shoupai = _this["shoupai" + _this.directions[playerIndex]];
            shoupai.showOtherFanpai(playerIndex);
            _this.setAutoTimeout(function () {
                _this.showPatternTip(playerIndex);
                if (newIndexes.length > 1) {
                    SoundManager.getInstance().playEffect("bdz_" + player.sex + "_par" + (16 - player.roundPattern) + "_mp3");
                }
            }, _this, 700);
            _this.setAutoTimeout(callback, _this, 1500);
        }, function () {
            var keys = _.keys(winGoldInfo);
            for (var key in winGoldInfo) {
                var goldInfo = winGoldInfo[key];
                var gainGold = goldInfo.gainGold;
                var ownGold = goldInfo.ownGold;
                var dir = _this.directions[key];
                var header = _this["header" + dir];
                if (gainGold && gainGold > 0) {
                    _this.showWinAni(key);
                    _this.showWinGoldAni(trueGainGold);
                    // header.showLsLabel(gainGold);
                }
            }
            if (mineGainGold > 0) {
                SoundManager.getInstance().playEffect("bdz_winner_mp3");
            }
            else if (mineGainGold < 0) {
                SoundManager.getInstance().playEffect("bdz_lose_mp3");
            }
            //飞CM
            _this.setAutoTimeout(function () {
                _this.settlePanel.showRoundLiushui(resultPlayers);
                _this.playerWin2CM(keys);
                SoundManager.getInstance().playEffect("bdz_chip3_mp3");
            }, _this, 1500);
            _this.setAutoTimeout(function () {
                _this.winPattern.visible = false;
                _this.restartBtn.visible = true;
            }, _this, 2500);
        });
    };
    BDZGameScene.prototype.showWinGoldAni = function (winGold) {
        this.winLabel.text = "+" + winGold;
        egret.Tween.get(this.winLabel).to({
            alpha: 1
        }, 300, egret.Ease.backIn);
    };
    BDZGameScene.prototype.playerWin2CM = function (keys) {
        var _this = this;
        var size = keys;
        var cms = [];
        var point = this.cmGroup.localToGlobal();
        for (var i_1 = 0; i_1 < this.cmGroup.numChildren; i_1++) {
            var cm = this.cmGroup.getChildAt(i_1);
            if (cm.cmList.length > 0) {
                cms.push(cm);
            }
        }
        var cmDatas = {};
        var result = [];
        var num = Math.floor(cms.length / size.length);
        for (var i = 0, len = cms.length; i < len; i += num) {
            result.push(cms.slice(i, i + num));
        }
        async.eachSeries(size, function (index, callback) {
            var arrIndex = size.indexOf(index);
            var newGroup = new eui.Group();
            newGroup.width = _this.cmGroup.width;
            newGroup.height = _this.cmGroup.height;
            newGroup.x = point.x;
            newGroup.y = point.y;
            var dir = _this.directions[index];
            _this.touchGroup.addChild(newGroup);
            for (var i_2 = 0; i_2 < result[arrIndex].length; i_2++) {
                var cm = result[arrIndex][i_2];
                newGroup.addChild(cm);
            }
            _this.coin2Component(newGroup, _this["header" + dir]);
            _this.setAutoTimeout(function () {
                callback();
            }, _this, 300);
        }, function () {
        });
    };
    /**
     * 金币从group飞回来
     */
    BDZGameScene.prototype.coin2Component = function (newGroup, component) {
        var point = component.localToGlobal();
        this.setAutoTimeout(function () {
            egret.Tween.get(newGroup).to({
                alpha: 0
            }, 400);
        }, this, 400);
        egret.Tween.get(newGroup).to({
            x: point.x - component.width / 2,
            y: point.y
        }, 800, egret.Ease.sineOut);
        egret.setTimeout(function () {
            game.UIUtils.removeSelf(newGroup);
        }, this, 800);
    };
    BDZGameScene.prototype.showAllIn = function (playerIndex) {
        var dir = this.directions[playerIndex];
        var group = this["playerGroup" + dir];
        var dbComponent = GameCacheManager.instance.getCache(dir + "_bdz_allin_ani", null);
        if (!dbComponent) {
            dbComponent = new DBComponent("all_in");
            dbComponent.touchEnabled = false;
            group.addChild(dbComponent);
            dbComponent.resetPosition();
        }
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        SoundManager.getInstance().playEffect("bdz_" + playerData.sex + "_allin_mp3");
        switch (dir) {
            case "1":
                dbComponent.x = group.width / 2 - 20 + 5;
                dbComponent.y = group.height / 2 + 50 + 5;
                break;
            case "2":
            case "3":
                dbComponent.x = group.width / 2 - 15;
                dbComponent.y = group.height / 2 + 40;
                break;
            case "4":
            case "5":
                dbComponent.x = group.width / 2 + 20 - 7;
                dbComponent.y = group.height / 2 + 40;
                break;
        }
        dbComponent.playNamesAndLoop(["appear", "loop"]);
        this.allInAnis.push(dbComponent);
    };
    BDZGameScene.prototype.showWinAni = function (playerIndex) {
        var dir = this.directions[playerIndex];
        var group = this["playerGroup" + dir];
        var dbComponent = GameCacheManager.instance.getCache(dir + "_bdz_win_ani", null);
        if (!dbComponent) {
            dbComponent = new DBComponent("bdz_win");
            dbComponent.touchEnabled = false;
            group.addChild(dbComponent);
            dbComponent.resetPosition();
        }
        switch (dir) {
            case "1":
                dbComponent.x = group.width / 2 - 20 + 3;
                dbComponent.y = group.height / 2 + 73;
                break;
            case "2":
            case "3":
                dbComponent.x = group.width / 2 - 20 + 1;
                dbComponent.y = group.height / 2 + 44;
                break;
            case "4":
            case "5":
                dbComponent.x = group.width / 2 + 20;
                dbComponent.y = group.height / 2 + 44;
                break;
        }
        dbComponent.playNamesAndLoop(['bdz_win_start', 'bdz_win_loop']);
    };
    BDZGameScene.prototype.showBDZAni = function (playerIndex) {
        var dir = this.directions[playerIndex];
        var group = this["playerGroup" + dir];
        var dbComponent = GameCacheManager.instance.getCache(dir + "_bdz_win_ani", null);
        if (!dbComponent) {
            dbComponent = new DBComponent("notice");
            dbComponent.touchEnabled = false;
            group.addChild(dbComponent);
            dbComponent.resetPosition();
        }
        switch (dir) {
            case "1":
                dbComponent.x = group.width / 2 - 20 + 3;
                dbComponent.y = group.height / 2;
                break;
            case "2":
            case "3":
                dbComponent.x = group.width / 2 - 20 + 1;
                dbComponent.y = group.height / 2;
                break;
            case "4":
            case "5":
                dbComponent.x = group.width / 2 + 20;
                dbComponent.y = group.height / 2;
                break;
        }
        dbComponent.play("default", 1);
    };
    BDZGameScene.prototype.lockHuanpaiGroup = function (isLock) {
        this.changeGroup.touchEnabled = !isLock;
        this.changeGroup.touchChildren = !isLock;
        this.shoupai1.addTouchEvent(!isLock);
        var status = isLock ? "disabled" : "up";
        this.changeBtn.currentState = this.noChangeBtn.currentState = status;
    };
    BDZGameScene.prototype.s_curPlaySwitchCardPush = function (e) {
        var _this = this;
        var data = e.data;
        this.clearTabelInfo();
        var playerIndex = data.playerIndex;
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            if (this.switchCardList) {
                this.setAutoTimeout(function () {
                    _this.sendSwitchCardsReq();
                }, this, 500);
            }
        }
    };
    BDZGameScene.prototype.s_hangupTaskPush = function (e) {
        var data = e.data;
        var mineData = Global.roomProxy.getMineData();
        mineData.taskInfo = data;
        this.renderButtonGroup();
    };
    /**
     * 玩家换牌
     */
    BDZGameScene.prototype.s_switchCardPush = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var num = data.num;
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        if (!playerData.switchCardNum) {
            playerData.switchCardNum = [];
        }
        playerData.switchCardNum.push(num);
        var shoupai = this["shoupai" + this.directions[playerIndex]];
        shoupai.showHuanpaiCount(playerData.switchCardNum);
        if ((Global.roomProxy.checkIndexIsMe(playerIndex))) {
            this.lockHuanpaiGroup(true);
            this.shoupai1.cardsAllDown();
            this.syncShouapi();
            // this.showPatternTip(Global.roomProxy.getMineIndex());
        }
        else {
            this.otherPlayerHuanpai(this.directions[playerIndex], num);
        }
        switch (num) {
            case 0:
                SoundManager.getInstance().playEffect("bdz_" + playerData.sex + "_pass_mp3");
                break;
            default:
                SoundManager.getInstance().playEffect("bdz_" + playerData.sex + "_" + num + "cut_mp3");
                break;
        }
    };
    /**
     * 玩家下注
     * @param  {egret.Event} e
     */
    BDZGameScene.prototype.s_handleBetTaskPush = function (e) {
        var data = e.data;
        var addBet = data.addBet;
        var playerIndex = data.playerIndex;
        var roomInfo = Global.roomProxy.roomInfo;
        roomInfo.totalBet = data.roomTotalBet;
        var player = Global.roomProxy.getPlayerByIndex(playerIndex);
        player.taskInfo = null;
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            if (player.gameStatus != BDZ_PLAYER_STATUS.ABANDON) {
                this.renderButtonGroup();
            }
        }
        var beforeAllIn = player.isAllIn;
        if (!player.isAllIn && data.isAllIn) {
            this.showAllIn(playerIndex);
        }
        player.isAllIn = data.isAllIn;
        player.gold = data.ownGold;
        player.playerBet = data.playerTotalBet;
        if (addBet > 0) {
            SoundManager.getInstance().playEffect("bdz_chip_mp3");
            this.playerYZ(playerIndex, addBet);
        }
        this.updatePotScore();
        // this.showPot();
        //头像扣钱
        var header = this["header" + this.directions[playerIndex]];
        header.updateGold(player.gold, false);
        //展现本轮次押注
        player.gameStatus = data.gameStatus;
        player.task = data.task;
        if (player.task != 0) {
            var yzLabel = this["curGoldLabel"];
            if (addBet == 0) {
                yzLabel.text = "0";
            }
            else {
                yzLabel.text = NumberFormat.fNumberBDZStr2(addBet);
            }
            this.playPlayerTouch(data.task, player.sex);
        }
        this.showPlayerTask(playerIndex, data.task, true);
    };
    BDZGameScene.prototype.playPlayerTouch = function (task, sex) {
        switch (task) {
            case 6:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_half_mp3");
                break;
            case 5:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_quarter_mp3");
                break;
            case 4:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_call_mp3");
                break;
            case 3:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_double_mp3");
                break;
            case 7:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_check_mp3");
                break;
            case 2:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_bbing_mp3");
                break;
            case 1:
                SoundManager.getInstance().playEffect("bdz_" + sex + "_die_mp3");
                break;
        }
    };
    /**
     * 玩家押注的提示
     * @param  {} playerIndex
     * @param  {} gameStatus
     * @param  {} needAni
     */
    BDZGameScene.prototype.showPlayerTask = function (playerIndex, task, needAni) {
        var str = TASK_STATUS_STR[task];
        var dir = this.directions[playerIndex];
        var czTipsImage = this["czTipImage" + dir];
        czTipsImage.source = RES.getRes("bdz_" + str + "_3_png");
        if (needAni && !Global.runBack) {
            var tipsImage_1 = this["tipImage" + dir];
            if (dir == "4" || dir == "5") {
                tipsImage_1.source = RES.getRes("bdz_" + str + "_1_png");
            }
            else {
                tipsImage_1.source = RES.getRes("bdz_" + str + "_2_png");
            }
            tipsImage_1.visible = true;
            tipsImage_1.alpha = 1;
            egret.Tween.get(tipsImage_1).to({
                alpha: 1
            }, 400).wait(400)
                .call(function () {
                czTipsImage.visible = true;
            }).to({
                alpha: 0
            }, 400).call(function () {
                tipsImage_1.visible = false;
            });
        }
        else {
            czTipsImage.visible = true;
        }
    };
    BDZGameScene.prototype.s_countdown = function (e) {
        var data = e.data;
        Global.roomProxy.roomInfo.countdown = data;
        this.timeBar.showTime();
        if (Global.roomProxy.roomInfo.curPlay == Global.roomProxy.getMineIndex()) {
            this.timeBar.scaleX = this.timeBar.scaleY = 1.4;
            this.timeBar.x = 10;
            this.timeBar.y = -22;
            this.playerGroup1.addChild(this.timeBar);
            this.shoupai1.parent.addChild(this.shoupai1);
        }
        else {
            var direction = this.directions[Global.roomProxy.roomInfo.curPlay];
            this["playerGroup" + direction].addChild(this.timeBar);
            this.timeBar.scaleX = this.timeBar.scaleY = 1;
            this.timeBar.x = 10;
            this.timeBar.y = 5;
        }
    };
    BDZGameScene.prototype.s_curPlayPush = function (e) {
        var data = e.data;
        var roomInfo = Global.roomProxy.roomInfo;
        var lastGameTurn = roomInfo.curGameTurn;
        var nowGameTurn = data.curGameTurn;
        if (lastGameTurn != nowGameTurn) {
            roomInfo.curGameTurn = nowGameTurn;
            this.changeGameTurn();
        }
        var lastRoundStatus = roomInfo.roundStatus;
        var nowRoundStatus = data.roundStatus;
        if (lastRoundStatus != nowRoundStatus) {
            roomInfo.roundStatus = nowRoundStatus;
            this.changeRoundStatus();
        }
        this.timeBar.hideTimeBar();
        roomInfo.curPlay = data.curPlay;
        this.showCurPlay();
    };
    /**
     * 改变当前房间状态 button显示规则
     */
    BDZGameScene.prototype.changeRoundStatus = function () {
        var nowRoundStatus = Global.roomProxy.roomInfo.roundStatus;
        var mineData = Global.roomProxy.getMineData();
        if (mineData.gameStatus == BDZ_PLAYER_STATUS.ABANDON) {
            return;
        }
        if (nowRoundStatus == ROUND_STATUS.BETTING) {
            this.showButtonGroup(true);
            this.showChangeGroup(false);
        }
        else if (nowRoundStatus == ROUND_STATUS.SWITCH_CARD) {
            this.showButtonGroup(false);
            this.showChangeGroup(true);
        }
    };
    BDZGameScene.prototype.renderButtonGroup = function () {
        var mineData = Global.roomProxy.getMineData();
        var taskInfo = mineData.taskInfo;
        if (!taskInfo) {
            taskInfo = this.defaultTaskInfo;
        }
        for (var key in taskInfo) {
            var button = this.buttonGroup.getChildByName("btn" + key);
            this.setButtonGray(button, taskInfo[key].opt == 0);
            if (taskInfo[key].score) {
                button.labelDisplay.text = NumberFormat.fNumberBDZStr2(taskInfo[key].score);
            }
            else {
                button.labelDisplay.text = "";
            }
        }
        var passShow = false;
        if (taskInfo[7] && taskInfo[7].opt == 1) {
            passShow = true;
        }
        this.btnpass.visible = passShow;
        this.btngz.visible = !passShow;
    };
    BDZGameScene.prototype.setButtonGray = function (button, isGray) {
        if (isGray) {
            button.touchEnabled = false;
            button.currentState = "disabled";
        }
        else {
            button.touchEnabled = true;
            button.currentState = "up";
        }
    };
    BDZGameScene.prototype.createDBs = function () {
        var _this = this;
        this.roundDb = new DBComponent("bdz_time");
        this.roundDb.callback = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var gameTurn = roomInfo.curGameTurn;
            _this.roundDb.visible = false;
            _this.nightImage.visible = true;
        };
        this.dateGroup.addChild(this.roundDb);
        this.timeBar = new BDZTimeBar();
        this.timeBar.visible = false;
    };
    BDZGameScene.prototype.changeGameTurn = function (needAni) {
        if (needAni === void 0) { needAni = true; }
        if (!this.nightImage) {
            this.nightImage = new eui.Image();
            this.dateGroup.addChild(this.nightImage);
        }
        var roomInfo = Global.roomProxy.roomInfo;
        var gameTurn = roomInfo.curGameTurn;
        if (gameTurn < 1) {
            return;
        }
        var point = this["roundImg" + gameTurn];
        this.nightImage.source = RES.getRes("bdz_round_" + gameTurn + "_2_png");
        this.nightImage.x = point.x;
        SoundManager.getInstance().playEffect("bdz_cut_" + gameTurn + "_mp3");
        if (needAni) {
            this.roundDb.visible = true;
            this.roundDb.x = point.x + 24;
            this.roundDb.y = point.y + 25;
            this.nightImage.y = point.y;
            this.nightImage.visible = false;
            this.roundDb.play("bdz_" + gameTurn, 1);
        }
        else {
            this.nightImage.y = point.y;
        }
        for (var i = 1; i <= 3; i++) {
            this["roundType" + i].visible = false;
        }
        this["roundType" + gameTurn].visible = true;
        if (needAni) {
            var mineData = Global.roomProxy.getMineData();
            if (mineData.gameStatus == BDZ_PLAYER_STATUS.ABANDON) {
                return;
            }
            this.showButtonGroup(false);
            this.showChangeGroup(true);
        }
    };
    BDZGameScene.prototype.bdzCardTouch = function (e) {
        var data = e.data;
        this.cardTouch(Number(data));
        this.syncChangeButton();
    };
    BDZGameScene.prototype.dealerBtnHandle = function () {
        var isDealer = Global.roomProxy.isDealer(Global.roomProxy.getMineIndex());
        this.btnpass.visible = isDealer;
        this.btngz.visible = !isDealer;
    };
    BDZGameScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.proxy = Global.roomProxy;
        this.isClubGame = Global.roomProxy.roomInfo.tableId != undefined;
        var id = this.isClubGame ? this.proxy.roomInfo.tableId : this.proxy.roomInfo.roomId;
        this.tableIdLabel.text = TextUtils.instance.getCurrentTextById(54) + ":" + id;
        this.diFen.text = TextUtils.instance.getCurrentTextById(29) + ":" + this.proxy.roomInfo.betBase;
        this.createDBs();
        this.defaultTaskInfo = {
            1: { opt: 0, score: 0 },
            2: { opt: 0, score: 0 },
            3: { opt: 0, score: 0 },
            4: { opt: 0, score: 0 },
            5: { opt: 0, score: 0 },
            6: { opt: 0, score: 0 },
            7: { opt: 0, score: 0 }
        };
        this.buttonGroup.bottom = -95;
        this.changeGroup.bottom = -95;
        this.aniTotalBet = Global.roomProxy.roomInfo.totalBet;
        this.hideAll();
        this.dealerBtnHandle();
        // this.showButtonGroup(true);
        this.timeBar.startTimer();
        this.showRoomInfo();
        this.renderButtonGroup();
        // this.showChangeGroup(true);
    };
    BDZGameScene.prototype.checkShowRestart = function () {
        if (!this.isClubGame) {
            this.restartBtn.visible = true;
        }
    };
    BDZGameScene.prototype.showRoomInfo = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var length = _.values(Global.roomProxy.getPlayers()).length;
        this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), length);
        var players = roomInfo.players;
        this.showHeaders(players);
        if (!Global.roomProxy.reconnect) {
            this.showFapai();
        }
        else {
            this.winPattern.showPattern();
            this.showPaiByReconnect();
            this.shoupai1.addTouchEvent(true);
            this.showRoomByStep();
            this.checkTimberBar();
            this.showPatternTip(Global.roomProxy.getMineIndex());
            var mineDATA = Global.roomProxy.getMineData();
            if (mineDATA.gameStatus == BDZ_PLAYER_STATUS.ABANDON) {
                this.patternTip1.visible = false;
                this.checkShowRestart();
            }
        }
        var gameTurn = roomInfo.curGameTurn;
        this.showPot();
        this.showCms(false);
        this.changeGameTurn(false);
    };
    BDZGameScene.prototype.checkTimberBar = function () {
        if (Global.roomProxy.roomInfo.curPlay == Global.roomProxy.getMineIndex()) {
            this.timeBar.scaleX = this.timeBar.scaleY = 1.4;
            this.timeBar.x = 10;
            this.timeBar.y = -22;
            this.playerGroup1.addChild(this.timeBar);
            this.shoupai1.parent.addChild(this.shoupai1);
        }
        else {
            var direction = this.directions[Global.roomProxy.roomInfo.curPlay];
            this["playerGroup" + direction].addChild(this.timeBar);
            this.timeBar.scaleX = this.timeBar.scaleY = 1;
            this.timeBar.x = 10;
            this.timeBar.y = 5;
        }
        this.timeBar.checkShow();
    };
    /**
     * 当前玩家
     */
    BDZGameScene.prototype.showCurPlay = function () {
        var players = Global.roomProxy.roomInfo.players;
        var curPlay = Global.roomProxy.roomInfo.curPlay;
        for (var key in players) {
            var dir = this.directions[key];
            var shoupai = this["shoupai" + dir];
            shoupai.showKuangAni(game.Utils.valueEqual(key, curPlay));
        }
        if (curPlay == Global.roomProxy.getMineIndex()) {
            SoundManager.getInstance().playEffect("bdz_myturn_mp3");
        }
    };
    BDZGameScene.prototype.showHeaders = function (players) {
        for (var key in players) {
            var player = players[key];
            var dir = this.directions[key];
            var header = this["header" + dir];
            header.initWithData(players[key]);
            var isBoss = Global.roomProxy.isDealer(key);
            header.showBoss(isBoss);
            header.visible = true;
            this["playerGroup" + dir].visible = true;
            var shoupais = this["shoupai" + dir];
            shoupais.showHuanpaiCount(player.switchCardNum);
        }
    };
    BDZGameScene.prototype.hideAll = function () {
        for (var i = 1; i <= 5; i++) {
            var shoupai = this["shoupai" + i];
            shoupai.hideAllShoupai();
            this["tipImage" + i].visible = false;
            this["playerGroup" + i].visible = false;
            this["header" + i].visible = false;
            this["czTipImage" + i].visible = false;
        }
        this.winPattern.visible = false;
    };
    BDZGameScene.prototype.showPaiByReconnect = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var players = roomInfo.players;
        for (var key in players) {
            var player = players[key];
            var dir = this.directions[key];
            var shoupai = this["shoupai" + dir];
            if (Global.roomProxy.checkIndexIsMe(key)) {
                shoupai.showShoupaiRecCard(player.handCards.value);
            }
            else {
                shoupai.showShoupaiRecLength(player.handCardsNum);
            }
            if (player.gameStatus == BDZ_PLAYER_STATUS.ABANDON) {
                shoupai.showQipaiAni(false);
                this.allowBack = true;
            }
            else {
                if (player.isAllIn) {
                    this.showAllIn(key);
                }
            }
        }
    };
    BDZGameScene.prototype.showRoomByStep = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        switch (roomInfo.roundStatus) {
            case ROUND_STATUS.BETTING:
                this.showBettingStatus(roomInfo);
                break;
            case ROUND_STATUS.SWITCH_CARD:
                this.showSwitchCardStatus(roomInfo);
                break;
        }
    };
    /**
     * 回显当前状态
     * @param  {BaseRoomInfo} roomInfo
     */
    BDZGameScene.prototype.showSwitchCardStatus = function (roomInfo) {
        var mineData = Global.roomProxy.getMineData();
        this.showCurPlay();
        if (mineData.gameStatus == BDZ_PLAYER_STATUS.ABANDON) {
            this.showButtonGroup(true, false);
            return;
        }
        if (mineData.switchCardNum.length == roomInfo.curGameTurn) {
            //我换了牌
            this.lockHuanpaiGroup(true);
        }
        else {
            this.lockHuanpaiGroup(false);
        }
        this.showChangeGroup(true, false);
    };
    /**
     * 玩家下注状态回显
     */
    BDZGameScene.prototype.showBettingStatus = function (roomInfo) {
        this.showCurPlay();
        this.showButtonGroup(true, false);
        var players = roomInfo.players;
        for (var key in players) {
            var player = players[key];
            this.showPlayerTask(key, player.task, false);
        }
    };
    BDZGameScene.prototype.showFapai = function () {
        var _this = this;
        var roomInfo = Global.roomProxy.roomInfo;
        var playerKeys = _.keys(roomInfo.players);
        var playerCount = playerKeys.length;
        for (var i = 1; i <= playerCount * 4; i++) {
            var poker = ObjectPool.produce("dbz_poker", BDZPoker);
            if (!poker) {
                poker = new BDZPoker();
            }
            this.effectGroup.addChild(poker);
            game.UIUtils.setAnchorPot(poker);
            poker.x = GameConfig.CURRENT_WIDTH / 2; //- poker.width / 2;
            poker.y = -poker.anchorOffsetY;
            // poker.visible = false;
            // poker.rotation = 40;
            this.pokerList.push(poker);
        }
        // return;
        var index = 0;
        var soundIndex = Math.floor(_.random(1, 2));
        SoundManager.getInstance().playEffect("bdz_start_intro_mp3");
        SoundManager.getInstance().playEffect("bdz_start" + soundIndex + "_mp3");
        async.eachSeries(this.pokerList, function (poker, callback) {
            SoundManager.getInstance().playEffect("bdz_deal_mp3");
            _this.touchGroup.addChild(poker);
            poker.visible = true;
            var toIndex = Number(playerKeys[index]);
            var shoupais = _this["shoupai" + toIndex];
            var endP = shoupais.getGlobalIndex();
            var endPX = endP.x + poker.width * poker.scaleX / 2;
            var endYX = endP.y + poker.height * poker.scaleX / 2;
            var scale = 1;
            if (toIndex != 1) {
                scale = 0.72;
                endPX = endP.x + poker.width * 0.72 / 2;
                endYX = endP.y + poker.height * 0.72 / 2;
            }
            if (toIndex == 4 || toIndex == 5) {
                poker.x -= poker.width / 2;
            }
            else {
                poker.x += poker.width / 2;
            }
            var currentIndex = shoupais.moveIndex;
            shoupais.moveIndex++;
            index++;
            if (index > playerKeys.length - 1) {
                index = 0;
            }
            poker.rotation = -180;
            egret.Tween.get(poker).to({
                rotation: 0,
                scaleX: scale,
                scaleY: scale,
                x: endPX,
                y: endYX
            }, 100, egret.Ease.circOut);
            _this.setAutoTimeout(function () {
                if (toIndex == 1) {
                    shoupais.showShoupaiByAni(currentIndex, null);
                }
                else {
                    shoupais.showShoupai(currentIndex);
                }
                ObjectPool.reclaim("dbz_poker", poker);
                game.UIUtils.removeSelf(poker);
            }, _this, 100);
            _this.setAutoTimeout(function () {
                callback();
            }, _this, 30);
        }, function () {
            _this.winPattern.showPattern();
            if (Global.runBack) {
                _this.showButtonGroup(true);
                _this.shoupai1.addTouchEvent(true);
                //自动提示一下
                _this.shoupai1.autoTipsCards();
                _this.checkMineIsBDZ(Global.roomProxy.getMineIndex());
                _this.showPatternTip(Global.roomProxy.getMineIndex());
            }
            else {
                _this.showButtonGroup(false);
                egret.setTimeout(function () {
                    _this.showButtonGroup(true);
                    _this.shoupai1.addTouchEvent(true);
                    //自动提示一下
                    _this.shoupai1.autoTipsCards();
                    _this.checkMineIsBDZ(Global.roomProxy.getMineIndex());
                    _this.showPatternTip(Global.roomProxy.getMineIndex());
                }, _this, 400);
            }
        });
    };
    /**
     * 判断百得之动画
     * @param  {} playerIndex
     */
    BDZGameScene.prototype.checkMineIsBDZ = function (playerIndex) {
        var player = Global.roomProxy.getPlayerByIndex(playerIndex);
        var pattern = player.roundPattern;
        if (this.checkIsBdzPattern(pattern)) {
            this.showBDZAni(playerIndex);
        }
    };
    BDZGameScene.prototype.onTouchTap = function (e) {
        var _this = this;
        switch (e.target) {
            case this.selectBtn1:
                this.cardTouch(1);
                break;
            case this.selectBtn2:
                this.cardTouch(2);
                break;
            case this.selectBtn3:
                this.cardTouch(3);
                break;
            case this.selectBtn4:
                this.cardTouch(4);
                break;
            case this.noChangeBtn:
                this.noChangeBtnTouch();
                break;
            case this.changeBtn:
                this.changeBtnTouch();
                break;
            case this.btnqp:
                this.sendPlayerChoose(1);
                break;
            case this.btn2bd:
                this.sendPlayerChoose(2);
                break;
            case this.btn1bd:
                this.sendPlayerChoose(3);
                break;
            case this.btngz:
                this.sendPlayerChoose(4);
                break;
            case this.btnper25:
                this.sendPlayerChoose(5);
                break;
            case this.btnper50:
                this.sendPlayerChoose(6);
                break;
            case this.btnpass:
                this.sendPlayerChoose(7);
                break;
            case this.backBtn:
                if (this.restartBtn.visible) {
                    this.allowBack = true;
                }
                this.backBtnTouch();
                break;
            case this.restartBtn:
                this.allowBack = this.restartBtn.visible;
                if (this.isClubGame) {
                    this.back2ReadyScene(function () {
                        BDZClubReadyScene.instance.show(true);
                        CF.sN(_this.CLOSE_NOTIFY);
                    }, function () {
                        CF.sN(_this.CLOSE_NOTIFY);
                    });
                    return;
                }
                this.restartBtnTouch();
                break;
            case this.settingBtn:
                this.settingBtnTouch();
                break;
        }
    };
    BDZGameScene.prototype.sendPlayerChoose = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var mineData, curTask, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mineData = Global.roomProxy.getMineData();
                        curTask = mineData.taskInfo;
                        mineData.taskInfo = this.defaultTaskInfo;
                        this.renderButtonGroup();
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_bdzHandler_c_submitOperateTask, { type: task })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error != 0) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 点击哪几个按钮
     */
    BDZGameScene.prototype.cardTouch = function (index) {
        var selected = this.shoupai1.selectUpByIndex(index);
        var button = this["selectBtn" + index];
        button.currentState = selected ? "down" : "up";
        this.syncChangeButton();
    };
    BDZGameScene.prototype.showChangeGroup = function (isShow, needAni) {
        var _this = this;
        if (needAni === void 0) { needAni = true; }
        this.changeGroup.visible = true;
        var bottom = isShow ? 0 : -this.changeGroup.height;
        if (needAni && !Global.runBack) {
            egret.Tween.get(this.changeGroup).to({
                bottom: bottom
            }, 300);
            egret.setTimeout(function () {
                _this.changeGroup.visible = isShow;
            }, this, 300);
        }
        else {
            this.changeGroup.bottom = bottom;
        }
        this.syncChangeButton();
        //同步选择状态
        this.syncShouapi();
    };
    BDZGameScene.prototype.syncChangeButton = function () {
        var shoupais = this.shoupai1.pokerLists.concat(this.shoupai1.selectLists);
        var selected = false;
        for (var i = 0; i < shoupais.length; i++) {
            var poker = shoupais[i];
            if (poker.selected) {
                selected = true;
            }
        }
        this.changeBtn.currentState = selected ? "up" : "disabled";
    };
    BDZGameScene.prototype.syncShouapi = function () {
        var shoupais = this.shoupai1.pokerLists.concat(this.shoupai1.selectLists);
        for (var i = 0; i < shoupais.length; i++) {
            var poker = shoupais[i];
            var button = this["selectBtn" + (i + 1)];
            button.currentState = poker.selected ? "down" : "up";
        }
    };
    BDZGameScene.prototype.showButtonGroup = function (isShow, needAni) {
        var _this = this;
        if (needAni === void 0) { needAni = true; }
        this.buttonGroup.visible = true;
        var bottom = isShow ? 0 : -this.buttonGroup.height;
        if (needAni && !Global.runBack) {
            egret.Tween.get(this.buttonGroup).to({
                bottom: bottom
            }, 300);
            egret.setTimeout(function () {
                _this.buttonGroup.visible = isShow;
            }, this, 300);
        }
        else {
            this.buttonGroup.bottom = bottom;
        }
    };
    /**
     * 其他玩家换牌
     */
    BDZGameScene.prototype.otherPlayerHuanpai = function (playerIndex, num) {
        var _this = this;
        var shoupais = this["shoupai" + playerIndex];
        var cards = shoupais.getSelectCardsByOther(num);
        var movePoker = [];
        for (var i = 0; i < cards.length; i++) {
            var poker = cards[i];
            poker.visible = false;
            var outerPoker = ObjectPool.produce("dbz_poker", BDZPoker);
            if (!outerPoker) {
                outerPoker = new BDZPoker();
            }
            game.UIUtils.setAnchorPot(outerPoker);
            poker.name = "";
            var point = poker.localToGlobal();
            outerPoker.scaleX = outerPoker.scaleY = 1;
            outerPoker.x = point.x + outerPoker.anchorOffsetX;
            outerPoker.y = point.y + outerPoker.anchorOffsetY;
            this.touchGroup.addChild(outerPoker);
            movePoker.push(outerPoker);
        }
        //飞向牌堆
        var length = movePoker.length;
        async.eachSeries(movePoker, function (outerPoker, callback) {
            SoundManager.getInstance().playEffect("bdz_deal_mp3");
            var x = outerPoker.x;
            var y = outerPoker.y;
            egret.Tween.get(outerPoker).to({
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                x: GameConfig.CURRENT_WIDTH / 2,
                y: -outerPoker.width
            }, 100, egret.Ease.sineIn);
            _this.setAutoTimeout(callback, _this, 50);
        }, function () {
            shoupais.moveIndex = 4 - movePoker.length + 1;
            shoupais.hebingCards(false);
            _this.setAutoTimeout(function () {
                _this.back2Shoupai(playerIndex, movePoker, null);
            }, _this, 300);
        });
    };
    BDZGameScene.prototype.updatePotScore = function () {
        var totalBet = Global.roomProxy.roomInfo.totalBet;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ aniTotalBet: totalBet }, 200, egret.Ease.bounceIn);
    };
    BDZGameScene.prototype.onChange = function () {
        if (!this.aniTotalBet) {
            this.aniTotalBet = 0;
        }
        this.totalGoldLabel.text = Number(new Big(this.aniTotalBet).round(2, 0)) + "";
    };
    BDZGameScene.prototype.chaifenGold = function (gold) {
        //元拆分
        var yuanGold = Math.floor(gold / KOREA_GOLD.YUAN);
        var jiaoGold = Math.floor((gold - yuanGold * KOREA_GOLD.YUAN) / KOREA_GOLD.JIAO);
        var fenGold = Math.floor(gold - (jiaoGold * KOREA_GOLD.JIAO) - (yuanGold * KOREA_GOLD.YUAN));
        // 3058
        var data = [];
        var yuanGoldStr = yuanGold + "";
        for (var i = 0; i < yuanGoldStr.length; i++) {
            var count = Number(yuanGoldStr[i]);
            if (count > 0) {
                var unit = Math.pow(10, yuanGoldStr.length - i - 1);
                data.push({ unit: unit, count: count, total: count * unit, type: "yuan" });
            }
        }
        var jiaoGoldStr = jiaoGold + "";
        for (var i = 0; i < jiaoGoldStr.length; i++) {
            var count = Number(jiaoGoldStr[i]);
            if (count > 0) {
                var unit = Math.pow(10, jiaoGoldStr.length - i - 1);
                data.push({ unit: unit, count: count, total: count * unit, type: "jiao" });
            }
        }
        var fenGoldStr = fenGold + "";
        for (var i = 0; i < fenGoldStr.length; i++) {
            var count = Number(fenGoldStr[i]);
            if (count > 0) {
                var unit = Math.pow(10, fenGoldStr.length - i - 1);
                data.push({ unit: unit, count: count, total: count * unit, type: "fen" });
            }
        }
        data = _.sortBy(data, function (item) {
            return item.count * -1;
        });
        return data;
    };
    BDZGameScene.prototype.showCms = function (needAni) {
        if (needAni === void 0) { needAni = false; }
        var gold = Global.roomProxy.roomInfo.totalBet;
        // this.showPot(gold);
        var useGold = Math.floor(gold / KOREA_GOLD.QIAN_FEN) * KOREA_GOLD.QIAN_FEN;
        var rules = this.chaifenGold(useGold);
        for (var i = 1; i <= 9; i++) {
            var cmList = this["cmList" + i];
            cmList.visible = false;
            // 	cmList.showGolds(900, 100);
        }
        var length = rules.length;
        if (length > 9) {
            length = 9;
        }
        for (var i = 0; i < length; i++) {
            var cmList = this["cmList" + this.cmItemList[i]];
            cmList.visible = true;
            cmList.showGolds(rules[i]);
            if (needAni) {
                egret.Tween.removeTweens(cmList);
                cmList.alpha = 0.5;
                egret.Tween.get(cmList).to({
                    alpha: 1
                }, 200, egret.Ease.backInOut);
            }
        }
    };
    BDZGameScene.prototype.showPot = function () {
        var gold = Global.roomProxy.roomInfo.totalBet;
        if (!gold || gold == 0) {
            this.totalGoldLabel.text = "0";
            return;
        }
        // let yuanGold = Math.floor(gold / KOREA_GOLD.YUAN);
        // let jiaoGold = Math.floor((gold - yuanGold * KOREA_GOLD.YUAN) / KOREA_GOLD.JIAO);
        // let fenGold = Math.floor(gold - (jiaoGold * KOREA_GOLD.JIAO) - (yuanGold * KOREA_GOLD.YUAN));
        // let str = "";
        // if (yuanGold > 0) {
        // 	str += yuanGold + "억";
        // }
        // if (jiaoGold > 0) {
        // 	str += jiaoGold + "만";
        // }
        // if (fenGold > 0) {
        // 	str += fenGold;
        // }
        this.totalGoldLabel.text = gold;
    };
    BDZGameScene.prototype.playerYZ = function (playerIndex, gold) {
        var _this = this;
        var data = this.chaifenGold(gold);
        var cmPoint = this["cmPoint" + this.directions[playerIndex]];
        var _loop_1 = function (i) {
            var item = data[i];
            var count = item.count;
            var cm = ObjectPool.produce("bdz_move_cm", BDZCM);
            if (!cm) {
                cm = new BDZCM();
                cm.scaleX = cm.scaleY = 0.7;
            }
            cm.alpha = 1;
            cm.changeGold(item.unit);
            cm.changeColor(item.type);
            this_1.effectGroup.addChild(cm);
            cm.x = cmPoint.localToGlobal().x - 30;
            cm.y = cmPoint.localToGlobal().y - 30;
            this_1.setAutoTimeout(function () {
                egret.Tween.get(cm).to({
                    alpha: 0
                }, 100);
            }, this_1, 300);
            egret.Tween.get(cm).to({
                x: this_1.cmGroup.localToGlobal().x + this_1.cmGroup.width / 2 + _.random(-50, 0),
                y: this_1.cmGroup.localToGlobal().y + this_1.cmGroup.height / 2 + _.random(-80, 0),
            }, 400);
            this_1.setAutoTimeout(function () {
                game.UIUtils.removeSelf(cm);
                ObjectPool.reclaim("bdz_move_cm", cm);
            }, this_1, 400);
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
        this.setAutoTimeout(function () {
            _this.showCms();
        }, this, 400);
    };
    /**
     * 我的牌飞回来
     */
    BDZGameScene.prototype.back2Shoupai = function (index, movePoker, backValues) {
        var _this = this;
        var shoupais = this["shoupai" + index];
        async.eachSeries(movePoker, function (poker, callback) {
            SoundManager.getInstance().playEffect("bdz_deal_mp3");
            var endP = shoupais.getGlobalIndex();
            var endPX = endP.x + poker.width * poker.scaleX / 2;
            var endYX = endP.y + poker.height * poker.scaleX / 2;
            var scale = 1;
            if (index != 1) {
                scale = 0.72;
                endPX = endP.x + poker.width * 0.72 / 2;
                endYX = endP.y + poker.height * 0.72 / 2;
            }
            if (index == 4 || index == 5) {
                poker.x -= poker.width / 2;
            }
            else {
                poker.x += poker.width / 2;
            }
            var currentIndex = shoupais.moveIndex;
            shoupais.moveIndex++;
            if (Global.runBack) {
                poker.x = endPX;
                poker.y = endYX;
                poker.scaleX = poker.scaleY = scale;
                poker.rotation = 0;
                if (index == 1) {
                    var movePokerIndex = movePoker.indexOf(poker);
                    shoupais.showShoupaiByAni(currentIndex, backValues[movePokerIndex]);
                }
                else {
                    shoupais.showShoupai(currentIndex);
                }
                ObjectPool.reclaim("dbz_poker", poker);
                game.UIUtils.removeSelf(poker);
                callback();
            }
            else {
                poker.rotation = -180;
                egret.Tween.get(poker).to({
                    rotation: 0,
                    scaleX: scale,
                    scaleY: scale,
                    x: endPX,
                    y: endYX
                }, 150, egret.Ease.circOut);
                _this.setAutoTimeout(function () {
                    if (index == 1) {
                        var movePokerIndex = movePoker.indexOf(poker);
                        shoupais.showShoupaiByAni(currentIndex, backValues[movePokerIndex]);
                    }
                    else {
                        shoupais.showShoupai(currentIndex);
                    }
                    ObjectPool.reclaim("dbz_poker", poker);
                    game.UIUtils.removeSelf(poker);
                }, _this, 150);
                _this.setAutoTimeout(function () {
                    callback();
                }, _this, 100);
            }
        }, function () {
            _this.setAutoTimeout(function () {
                if (index == 1) {
                    shoupais.sortShoupaiByValue();
                    _this.showButtonGroup(true);
                    _this.showChangeGroup(false);
                    if (Global.runBack) {
                        _this.shoupai1.fixedShoupai();
                    }
                }
            }, _this, 400);
        });
    };
    BDZGameScene.prototype.sendSwitchCardsReq = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var num, mineData, values, i, poker, resp, movePoker_1, beforePattern_1, afterPattern_1, backCards_1, i, poker, outerPoker, point, length_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = [];
                        mineData = Global.roomProxy.getMineData();
                        values = mineData.handCards.value;
                        for (i = 0; i < this.switchCardList.length; i++) {
                            poker = this.switchCardList[i];
                            num.push(values.indexOf(poker.number));
                        }
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_bdzHandler_c_switchCard, { cardIndex: num })];
                    case 1:
                        resp = _a.sent();
                        if (resp && resp.error) {
                        }
                        else {
                            movePoker_1 = [];
                            beforePattern_1 = mineData.roundPattern;
                            afterPattern_1 = resp.roundPattern;
                            mineData.roundPattern = resp.roundPattern;
                            mineData.handCards = resp.handCards;
                            backCards_1 = resp.switchCard || [];
                            mineData.tipCards = resp.tipCards || [];
                            for (i = 0; i < this.switchCardList.length; i++) {
                                poker = this.switchCardList[i];
                                poker.visible = false;
                                poker.showZ2B();
                                outerPoker = ObjectPool.produce("dbz_poker", BDZPoker);
                                if (!outerPoker) {
                                    outerPoker = new BDZPoker();
                                }
                                game.UIUtils.setAnchorPot(outerPoker);
                                poker.name = "";
                                point = poker.localToGlobal();
                                outerPoker.scaleX = outerPoker.scaleY = 1;
                                outerPoker.x = point.x + outerPoker.anchorOffsetX;
                                outerPoker.y = point.y + outerPoker.anchorOffsetY;
                                this.touchGroup.addChild(outerPoker);
                                movePoker_1.push(outerPoker);
                            }
                            this.switchCardList = null;
                            length_1 = movePoker_1.length;
                            async.eachSeries(movePoker_1, function (outerPoker, callback) {
                                var x = outerPoker.x;
                                var y = outerPoker.y;
                                egret.Tween.get(outerPoker).to({
                                    rotation: 0,
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: GameConfig.CURRENT_WIDTH / 2,
                                    y: -outerPoker.anchorOffsetY
                                }, 75, egret.Ease.sineIn);
                                _this.setAutoTimeout(callback, _this, 30);
                            }, function () {
                                _this.shoupai1.moveIndex = 4 - movePoker_1.length + 1;
                                _this.shoupai1.sortShoupaiByValue();
                                _this.shoupai1.hebingCards();
                                _this.setAutoTimeout(function () {
                                    _this.back2Shoupai(1, movePoker_1, backCards_1);
                                    var roomInfo = Global.roomProxy.roomInfo;
                                    _this.setAutoTimeout(function () {
                                        if (roomInfo.curGameTurn != 3) {
                                            _this.shoupai1.autoTipsCards();
                                            _this.shoupai1.addTouchEvent(true);
                                        }
                                        if (!_this.checkIsBdzPattern(beforePattern_1) && _this.checkIsBdzPattern(afterPattern_1)) {
                                            _this.showBDZAni(Global.roomProxy.getMineIndex());
                                        }
                                        _this.showPatternTip(Global.roomProxy.getMineIndex());
                                        _this.winPattern.showPattern();
                                    }, _this, 900);
                                }, _this, length_1 * 90);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BDZGameScene.prototype.checkIsBdzPattern = function (pattern) {
        var newPattern = 16 - pattern;
        return newPattern <= 12;
    };
    BDZGameScene.prototype.changeBtnTouch = function () {
        var cards = this.shoupai1.getSelectCards();
        if (cards.length > 0) {
            this.switchCardList = cards;
            this.lockHuanpaiGroup(true);
            if (Global.roomProxy.curIndexIsMe()) {
                this.sendSwitchCardsReq();
            }
            this.syncShouapi();
        }
    };
    BDZGameScene.prototype.noChangeBtnTouch = function () {
        this.switchCardList = [];
        this.lockHuanpaiGroup(true);
        if (Global.roomProxy.curIndexIsMe()) {
            this.sendSwitchCardsReq();
        }
        this.syncShouapi();
    };
    return BDZGameScene;
}(game.BaseGameScene));
__reflect(BDZGameScene.prototype, "BDZGameScene");
