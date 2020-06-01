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
var SuperBaiCaoGameScene = (function (_super) {
    __extends(SuperBaiCaoGameScene, _super);
    function SuperBaiCaoGameScene() {
        var _this = _super.call(this) || this;
        _this.haveTouchBtn = false;
        //new
        /**
         * 打开游戏界面通知
         */
        _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SUPERBAICAO_GAME;
        /**
         * 关闭游戏界面通知
         */
        _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_SUPERBAICAO_HALL;
        /**
         * 关闭当前界面通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SUPERBAICAO_GAME;
        /**
         * 对应匹配界面通知
         */
        _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_SUPERBAICAO_MATCHING;
        _this.haveClickGiveUp = false;
        _this.allCoinsArr = {};
        _this.skinName = "SuperBaiCaoGameSceneSkin";
        return _this;
    }
    SuperBaiCaoGameScene.prototype.hideAllColock = function () {
        for (var i = 1; i < 7; ++i) {
            this["header" + i].hideClock();
        }
    };
    /**
* 开牌开始
* @param  {egret.TouchEvent} e
*/
    SuperBaiCaoGameScene.prototype.s_startOpenCard = function (e) {
        var data = e.data;
        this.hideAllBetState();
        this.xzBar.hide();
    };
    /**
 * 下注
 * @param  {egret.Event} e
 */
    SuperBaiCaoGameScene.prototype.setTotalBet = function (bet) {
        this.totalBet.text = bet.toString();
    };
    SuperBaiCaoGameScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.hideAllColock();
        this.xzBar.setRoot(this);
    };
    /**
 * 重连显示倒计时
 */
    SuperBaiCaoGameScene.prototype.showCountDown = function () {
        var roomInfo = Global.roomProxy.roomInfo;
        var data = roomInfo.countdown;
        LogUtils.logD("--showCountDown==" + data.s + "当前得状态：" + roomInfo.roundStatus + "============");
        if (!data || data.s == 0) {
            this.timeBar.visible = false;
            SoundManager.getInstance().stopEffectByName("bc_timer_mp3");
            return;
        }
    };
    SuperBaiCaoGameScene.prototype.showPattern = function (pattern, isWin, direc) {
        var _pattern = this["pattern" + direc];
        _pattern.visible = true;
        _pattern.showSuperBaiCaoPattern(pattern, isWin);
    };
    /**点击放弃 */
    SuperBaiCaoGameScene.prototype.onToucGiveUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.xzBar.hide();
                        data = {
                            type: 1
                        };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        //成功
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            this.haveClickGiveUp = true;
                            LogUtils.logD("===========onToucGive==" + JSON.stringify(resp));
                            this.haveTouchBtn = true;
                            this.xzBar.hide(false);
                            this.setAutoTimeout(function () {
                                _this.restartBtn.visible = true;
                            }, this, 500);
                            //可以开始下一局
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**隐藏所有下注得状态*/
    SuperBaiCaoGameScene.prototype.hideAllBetState = function () {
        var header;
        for (var i = 1; i < 7; ++i) {
            header = this["header" + i];
            header.betState.visible = false;
        }
    };
    SuperBaiCaoGameScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_playerOprate, this.s_playerOprate, this);
        CF.aE(ServerNotify.s_playerOprateResult, this.s_playerOprateResult, this);
        CF.aE(ServerNotify.s_newTurnOprateNotify, this.s_newTurnOprateNotify, this);
    };
    /**
 * 倒计时推送
 */
    SuperBaiCaoGameScene.prototype.countdown = function (e) {
        var dataall = e.data;
        var data = dataall.countdownMS;
        var roomInfo = Global.roomProxy.roomInfo;
        var playerIndex = dataall["pIndex"];
        var direc = this.directions[playerIndex];
        if (!roomInfo.countdown) {
            roomInfo.countdown = {};
        }
        var s = data["s"];
        roomInfo.countdown = data;
        var header = this["header" + direc];
        header.startTimer();
        header.showClock(s / 2);
    };
    SuperBaiCaoGameScene.prototype.s_newTurnOprateNotify = function (e) {
        // let data = e.data;
        // let validPlayerIndex: Array<any> = data["validPlayerIndex"];
        // if (validPlayerIndex.length == 0) {
        // 	this.hideAllHeaderKuang();
        // 	this.hideAllBetState();
        // }
        // else {
        // 	for (let i = 0; i < validPlayerIndex.length; ++i) {
        // 		let playerIndex = validPlayerIndex[i];
        // 		let direc = this.directions[playerIndex];
        // 		let header = (this["header" + direc] as baicao.BaiCaoHeader);
        // 		header.stopChuPaiDB();
        // 		header.betState.visible = false;
        // 	}
        // }
    };
    /**
     * 展现玩家头像
     */
    SuperBaiCaoGameScene.prototype.showHeaders = function () {
        var players = Global.roomProxy.getPlayers();
        for (var key in players) {
            var dir = this.directions[key];
            players[key].playerIndex = key;
            var header = this['header' + dir];
            header.initWithPlayer(players[key], "nns");
            header.visible = true;
        }
    };
    SuperBaiCaoGameScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_playerOprate, this.s_playerOprate, this);
        CF.rE(ServerNotify.s_playerOprateResult, this.s_playerOprateResult, this);
        CF.rE(ServerNotify.s_newTurnOprateNotify, this.s_newTurnOprateNotify, this);
        for (var i = 1; i <= 6; ++i) {
            this["header" + i].removeTimer();
        }
    };
    SuperBaiCaoGameScene.prototype.s_playerOprateResult = function (e) {
        var _this = this;
        // this.hideAllColock();
        // type 1是放弃 3加注 2 跟注
        var playerData = e.data;
        var playerIndex = playerData["pIndex"];
        var dirc = this.directions[playerIndex];
        var type = playerData["type"];
        var bet = playerData["bet"];
        //all in
        var allIn = playerData["allIn"];
        var dbGroup = this["db" + dirc];
        if (allIn > 0) {
            if (!this["allInDB" + dirc]) {
                this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
                SoundManager.getInstance().playEffect("bc_allin_mp3");
            }
        }
        var header = this["header" + dirc];
        header.hideClock();
        header.removeTimer();
        var list = this["card" + dirc];
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            header.mineReseatLiushuiPos(false);
        }
        else {
            header.otherReseatLiushuiPos(false);
        }
        header.setBetState(type, bet);
        this.hideAllHeaderKuang();
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            if (type != 1) {
                this.xzBar.hide();
                this.hideGiveBtn();
            }
            if (type == 1) {
                this.xzBar.hide();
                this.hideGiveBtn();
                this.xzBar.hide(false);
                this.setAutoTimeout(function () {
                    _this.restartBtn.visible = true;
                }, this, 300);
            }
        }
        if (type != 1) {
            if (bet > 0) {
                if (Global.runBack) {
                    this.playerYZ(playerIndex, bet, false);
                }
                else {
                    this.playerYZ(playerIndex, bet, true);
                }
            }
        }
        if (type == 1) {
            list.showMaskRect(true);
        }
        this.setTotalBet(playerData["totalBet"]);
    };
    SuperBaiCaoGameScene.prototype.s_playerOprate = function (e) {
        var playerData = e.data;
        var playerIndex = playerData["pIndex"];
        this.countdown(e);
        var dirc = this.directions[playerIndex];
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            //if (this.giveupBtn.verticalCenter != 530) {
            this.showGiveBtnAni();
            // }
            if (this.xzBar.xzBarVis == false || this.haveClickGiveUp == false) {
                this.xzBar.show();
            }
        }
        var followBet = playerData["followBet"];
        this.showChuPaiHeader(playerIndex);
        if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
            this.initXZBar(followBet);
            this.xzBar.show();
        }
    };
    SuperBaiCaoGameScene.prototype.onTouchTap = function (e) {
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
                CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "superbaicao" });
                break;
            case this.recordBtn:
                this.showBtnsType(1);
                CF.sN(PanelNotify.OPEN_BASE_RECORD, GAME_ID.SUPERBAICAO);
                break;
            case this.helpBtn:
                this.showBtnsType(1);
                BaiCaoHelpPanel.instance.show("superbaicao");
                break;
            case this.giveupBtn:
                this.onToucGiveUp();
                break;
        }
    };
    SuperBaiCaoGameScene.prototype.showChuPaiHeader = function (playIndex) {
        this.hideAllHeaderKuang();
        var dirc = this.directions[playIndex];
        var header = this["header" + dirc];
        header.playChuPaiDB();
    };
    SuperBaiCaoGameScene.prototype.hideAllHeaderKuang = function () {
        var header;
        for (var i = 1; i <= 6; ++i) {
            header = this["header" + i];
            header.stopChuPaiDB();
        }
    };
    /**
     * 初始化下注条
     */
    SuperBaiCaoGameScene.prototype.initXZBar = function (followBet) {
        var addBetMulti = Global.roomProxy.roomInfo.addBetMulti;
        this.xzBar.initWithArr(addBetMulti, Global.roomProxy.roomInfo.betBase, followBet);
    };
    SuperBaiCaoGameScene.prototype.showGiveBtnAni = function (needAni) {
        var _this = this;
        if (needAni === void 0) { needAni = true; }
        this.giveupBtn.visible = true;
        this.giveupBtn.alpha = 1;
        var delayTime = 400;
        if (needAni == false) {
            this.giveupBtn.verticalCenter = 530;
        }
        else {
            egret.Tween.get(this.giveupBtn).to({ verticalCenter: 530 }, delayTime, egret.Ease.quadOut);
            this.setAutoTimeout(function () {
                _this.giveupBtn.verticalCenter = 530;
            }, this, delayTime);
        }
    };
    SuperBaiCaoGameScene.prototype.hideGiveBtn = function () {
        var _this = this;
        var delayTime = 400;
        if (Global.runBack) {
            this.giveupBtn.verticalCenter = 1700;
            this.giveupBtn.visible = false;
        }
        else {
            egret.Tween.get(this.giveupBtn).to({ verticalCenter: 700, alpha: 0 }, delayTime, egret.Ease.quadOut);
            this.setAutoTimeout(function () {
                _this.giveupBtn.verticalCenter = 1700;
                _this.giveupBtn.visible = false;
            }, this, delayTime);
        }
    };
    /**
     * @param  {} playerIndex tableIndex
     * @param  {number=1} cardIndex 1
     * @param  {} cardNum 排面值
     * @param  {} index 1
     * @param  {} showPoint true
     */
    SuperBaiCaoGameScene.prototype.poker2Player = function (playerIndex, index, count) {
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
                    // this.timeBar.visible = true;
                }, _this, 350);
            }
            if (_this.currentIndex == _this.allNum && _this.haveMine == false) {
                // this.timeBar.visible = true;
            }
            if (_this.currentIndex == _this.allNum) {
                _this.showGiveBtnAni();
            }
        }, this, moveTime + time); //400
        return cardList;
    };
    SuperBaiCaoGameScene.prototype.playerYZ = function (playerIndex, coinNumber, needAni) {
        coinNumber = Number(coinNumber);
        var coin = ObjectPool.produce("superbaicao_cm", null);
        if (!coin) {
            coin = new CoinComponent(CoinType.SUPERBAICAO);
            coin.jiazhuImg.visible = false;
            coin.touchEnabled = false;
            game.UIUtils.setAnchorCenter(coin);
        }
        coin.scaleY = coin.scaleX = 0.9;
        var headerIndex = this.directions[playerIndex];
        this.pushCoin(headerIndex, coin);
        var index = this.getCMColor(coinNumber);
        coin.showBaiCaoCoin("superbaicao_cm_" + index, coinNumber);
        this.header2Group(headerIndex, coin, needAni);
        return coin;
    };
    SuperBaiCaoGameScene.prototype.pushCoin = function (headerIndex, coin) {
        if (!this.allCoinsArr[headerIndex]) {
            this.allCoinsArr[headerIndex] = [];
        }
        var temptArr = this.allCoinsArr[headerIndex];
        temptArr.push(coin);
    };
    /**
     * 结算
     * @param  {egret.Event} e
     */
    SuperBaiCaoGameScene.prototype.roundSettlement = function (e) {
        var _this = this;
        var data = e.data;
        // this.winPlayerIndex = 3;
        // let testData = { "1": { "gainGold": -19, "pumpGold": 0, "ownGold": 9981, "isDefeat": false, "backBet": 0 }, "2": { "gainGold": -26.01, "pumpGold": 0, "ownGold": 87.11, "isDefeat": false, "backBet": 2.9800000000000004 }, "3": { "gainGold": 67.47, "pumpGold": 3.56, "ownGold": 93.49, "isDefeat": false, "backBet": 0 }, "4": { "gainGold": -26.02, "pumpGold": 0, "ownGold": 53.43, "isDefeat": false, "backBet": 2 } };
        // let testdata = { "1": { "gainGold": -7, "pumpGold": 0, "ownGold": 999993, "isDefeat": false, "backBet": 0 }, "2": { "gainGold": -1, "pumpGold": 0, "ownGold": 254.65, "isDefeat": false, "backBet": 0 }, "3": { "gainGold": -1, "pumpGold": 0, "ownGold": 46.34, "isDefeat": false, "backBet": 0 }, "4": { "gainGold": -1, "pumpGold": 0, "ownGold": 35.23, "isDefeat": false, "backBet": 0 }, "5": { "gainGold": 9.5, "pumpGold": 0.5, "ownGold": 204.7, "isDefeat": false, "backBet": 0 }, "6": { "gainGold": -8, "pumpGold": 0, "ownGold": 101.88, "isDefeat": false, "backBet": 2 } };
        // data = testData;
        this.timeBar.removeTimer();
        this.xzBar.hide(false);
        this.hideGiveBtn();
        if (Global.runBack) {
            this.cmGroup.removeChildren();
        }
        LogUtils.logD("结算数据" + JSON.stringify(data));
        this.setAutoTimeout(function () {
            //smart
            for (var key in data) {
                var gainInfo = data[key];
                var gainPlayer;
                if (gainInfo.gainGold >= 0) {
                    gainPlayer = key;
                }
                _this.showLiuShui(_this.piaoFenDelay, gainInfo, key);
            }
            _this.setAutoTimeout(function () {
                _this.cmPlay(data, _this.winPlayerIndex);
            }, _this, _this.piaoFenDelay); //1000
            _this.setAutoTimeout(function () {
                _this.restartBtn.visible = true;
            }, _this, 2000);
        }, this, 1000);
    };
    SuperBaiCaoGameScene.prototype.showLiuShui = function (piaoFenDelay, gainInfo, key) {
        var _this = this;
        this.setAutoTimeout(function () { _this.showRecords(gainInfo, key); }, this, piaoFenDelay);
    };
    /**
 *
 * @param  {} roundSettlement
 */
    SuperBaiCaoGameScene.prototype.showRecords = function (gainInfo, playerIndex) {
        var header = this["header" + this.directions[playerIndex]];
        var betBack = gainInfo["backBet"];
        //播放胜利
        if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold > 0) {
        }
        if (gainInfo.gainGold > 0) {
            //筹码重新设置为0
            this.setTotalBet(0);
        }
        if (Global.roomProxy.checkIndexIsMe(playerIndex) && gainInfo.gainGold <= 0) {
        }
        header.updateGold(gainInfo.ownGold, false);
        if (gainInfo.gainGold <= 0) {
            if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                header.mineReseatLiushuiPos(false);
            }
            else {
                header.otherReseatLiushuiPos(false);
            }
            header.showSuperLiushui(gainInfo.gainGold);
        }
        else {
            this.mineWinLabel.visible = true;
            this.mineWinLabel.text = "+" + gainInfo.gainGold + "";
        }
        if (betBack > 0) {
            if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                header.mineReseatLiushuiPos(true);
            }
            else {
                header.otherReseatLiushuiPos(true);
            }
            header.rebackTxt.text = "nl" + betBack.toString();
        }
        else {
            header.mineReseatLiushuiPos(false);
            header.otherReseatLiushuiPos(false);
        }
    };
    /**飞筹码 */
    SuperBaiCaoGameScene.prototype.cmPlay = function (data, gainPlayer) {
        var players = Global.roomProxy.getPlayers();
        var playerLen = _.keys(players).length;
        if (this.haveWinPlayer == false) {
            for (var i = 1; i <= playerLen; ++i) {
                var header = this.directions[i];
                var coins = this.allCoinsArr[header];
                this.cm2Player(header, coins);
            }
        }
        else {
            var backArr = this.needCoinsPlay(data);
            if (backArr.length == 0) {
                var coins = _.values(this.allCoinsArr);
                var newCoins = [];
                for (var i = 0; i < coins.length; ++i) {
                    var tempt = coins[i];
                    for (var j = 0; j < tempt.length; ++j) {
                        var one = tempt[j];
                        newCoins.push(one);
                    }
                }
                var tableIndex = this.directions[gainPlayer];
                this.cm2Player(tableIndex, newCoins);
            }
            else {
                var allPlayer = []; //allPlayer
                for (var i = 1; i <= playerLen; ++i) {
                    allPlayer.push(i.toString());
                }
                var _diffrent = _.difference(allPlayer, backArr);
                var gainPlayerNew = gainPlayer + "";
                _diffrent = _.difference(_diffrent, [gainPlayerNew]);
                var dire = this.directions[gainPlayer];
                var winCoins = this.allCoinsArr[dire];
                for (var i = 0; i < _diffrent.length; ++i) {
                    var direc = this.directions[_diffrent[i]];
                    var arr = this.allCoinsArr[direc];
                    for (var j = 0; j < arr.length; ++j) {
                        winCoins.push(arr[j]);
                    }
                    this.allCoinsArr[direc] = [];
                }
                var _index = backArr.indexOf(gainPlayer);
                if (_index == -1) {
                    this.cm2Player(gainPlayer, winCoins);
                }
                for (var i = 0; i < backArr.length; ++i) {
                    var playerIndex = backArr[i];
                    var direc = this.directions[playerIndex];
                    var otherCoins = this.allCoinsArr[direc];
                    if (playerIndex == gainPlayer) {
                        this.cm2Player(playerIndex, winCoins);
                    }
                    else {
                        this.cm2Player(playerIndex, otherCoins);
                    }
                }
            }
        }
    };
    /**
 * 金币飞去玩家
 */
    SuperBaiCaoGameScene.prototype.cm2Player = function (tabelIndex, coins, playerIndex, realGainGold) {
        if (playerIndex === void 0) { playerIndex = null; }
        if (realGainGold === void 0) { realGainGold = null; }
        //从筹码盒子到玩家下注区域
        var header = this["header" + tabelIndex];
        var positon = new egret.Point();
        var headerPoint = header.coinTarget.localToGlobal();
        //从玩家风向头像
        SoundManager.getInstance().playEffect("bc_chip3_mp3");
        for (var i = 0; i < coins.length; i++) {
            var coin = coins[i];
            this.coinMoveAniNew(coin, headerPoint, _.random(10, 100), coins); //10, 50
        }
    };
    SuperBaiCaoGameScene.prototype.needCoinsPlay = function (data) {
        var needAni = [];
        for (var key in data) {
            var gainInfo = data[key];
            if (gainInfo["backBet"] > 0) {
                needAni.push(key);
            }
        }
        return needAni;
    };
    /**
 * 下注
 * @param  {egret.Event} e
 */
    SuperBaiCaoGameScene.prototype.s_NewAddBet = function (e) {
        var data = e.data;
        var playerIndex = data.playerIndex;
        var tableIndex = data.tableIndex;
        var betInfo = data.betInfo;
        var totalBet = data.totalBet;
        this.playerYZ(this.directions[playerIndex], betInfo, true);
    };
    /**
 * 根据房间显示数据
 */
    SuperBaiCaoGameScene.prototype.showRoomByStatus = function (reconnect) {
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
        this.haveWinPlayer = winPlayer.length > 0;
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
            case SUPERROUND_STATUS.ADD_BET:
                for (var key in players) {
                    var dirc = this.directions[key];
                    var data = players[key];
                    var allIn = data["allIn"];
                    if (allIn) {
                        if (!this["allInDB" + dirc]) {
                            this.showAllIn(dirc);
                        }
                    }
                }
                break;
            case SUPERROUND_STATUS.COMPARE_CARD:
                this.hideAllInDB();
                this.showZhengInfor(Global.roomProxy.roomInfo.players);
                this.compareResult(roomInfo["outPlayer"], roomInfo["winPlayer"]);
                break;
            case SUPERROUND_STATUS.OPEN_CARD:
                this.hideAllBetState();
                this.showZhengInfor(Global.roomProxy.roomInfo.players);
                break;
            case BAICAO_ROUND_STATUS.NEW_CARD:
                this.showPaiInfor(Global.roomProxy.roomInfo.players);
                break;
            case SUPERROUND_STATUS.RAISE_BET:
                this.showZhengInfor(Global.roomProxy.roomInfo.players);
                //加注阶段 显示加注得状态 
                for (var key in players) {
                    var dirc = this.directions[key];
                    var data = players[key];
                    var allIn = data["allIn"];
                    if (allIn) {
                        if (!this["allInDB" + dirc]) {
                            this.showAllIn(dirc);
                        }
                    }
                    var header = this["header" + dirc];
                    if (Global.roomProxy.checkIndexIsMe(key)) {
                        if (data["operate"] == 0) {
                            this.showGiveBtnAni(false);
                        }
                    }
                    header.setBetState(data["operate"], data["bet"]);
                    if (data["operate"] == 1) {
                        this["card" + dirc].showMaskRect(true);
                    }
                }
                break;
            default:
                break;
        }
    };
    SuperBaiCaoGameScene.prototype.showAllIn = function (dirc) {
        var dbGroup = this["db" + dirc];
        this["allInDB" + dirc] = Owen.UtilsString.playDB("ynbc_all_in", dbGroup, -1);
    };
    /**
 * 进入押注阶段
 */
    SuperBaiCaoGameScene.prototype.runAddBet = function (reconnect) {
        if (reconnect == false)
            return;
        var roomInfo = Global.roomProxy.roomInfo;
        var players = roomInfo.players;
        var onePlayer;
        for (var key in players) {
            onePlayer = players[key];
            var betInfo = onePlayer["bet"];
            var betArr = onePlayer["betArray"];
            if (betInfo == 0) {
                continue;
            }
            var oneBet = betArr[0];
            this.playerYZ(this.directions[key], oneBet, false);
        }
        for (var key in players) {
            onePlayer = players[key];
            var betInfo = onePlayer["bet"];
            var betArr = onePlayer["betArray"];
            if (betInfo == 0) {
                continue;
            }
            var oneBet = void 0;
            for (var i = 1; i < betArr.length; ++i) {
                oneBet = betArr[i];
                if (oneBet > 0) {
                    this.playerYZ(this.directions[key], oneBet, false);
                }
            }
        }
    };
    return SuperBaiCaoGameScene;
}(BaiCaoGameScene));
__reflect(SuperBaiCaoGameScene.prototype, "SuperBaiCaoGameScene");
var SUPERROUND_STATUS = {
    WAITING: 0,
    ADD_BET: 1,
    NEW_CARD: 2,
    RAISE_BET: 3,
    OPEN_CARD: 4,
    COMPARE_CARD: 5,
    SETTLEMENT: 6,
    STEP_WAIT: 7,
};
