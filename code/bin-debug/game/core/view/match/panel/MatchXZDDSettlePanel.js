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
var MatchXZDDSettlePanel = (function (_super) {
    __extends(MatchXZDDSettlePanel, _super);
    function MatchXZDDSettlePanel() {
        var _this = _super.call(this) || this;
        _this.isStart = false;
        _this.isInitHand = false;
        _this.needDealer = true;
        _this.players = {};
        _this.skinName = new MatchXZDDSettlePanelSkin();
        return _this;
    }
    Object.defineProperty(MatchXZDDSettlePanel, "instance", {
        get: function () {
            if (!MatchXZDDSettlePanel._instance) {
                MatchXZDDSettlePanel._instance = new MatchXZDDSettlePanel();
            }
            return MatchXZDDSettlePanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchXZDDSettlePanel.prototype.show = function (data) {
        var _this = this;
        this.timeLabel.text = "";
        this.data = data;
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.resizeGroup.alpha = 0;
        egret.Tween.get(this.resizeGroup).to({
            alpha: 1
        }, 400);
        this.directions = majiang.MajiangUtils.getDirectionByMineNumber(Global.gameProxy.getMineIndex());
        this.showInfo();
        this.loopRewardResult = setInterval(function () {
            console.log("this.loopRewardResult1--------------");
            _this.reconnectSuc();
        }, 10000);
    };
    MatchXZDDSettlePanel.prototype.reconnectSuc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var resp, handler, resp_1, roomInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                    case 1:
                        resp = _a.sent();
                        if (!this.needDealer) {
                            return [2 /*return*/];
                        }
                        Global.gameProxy.roomState = resp;
                        Global.gameProxy.lastGameConfig = resp;
                        if (!(Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1)) return [3 /*break*/, 3];
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, Global.gameProxy.roomState)];
                    case 2:
                        resp_1 = _a.sent();
                        if (!this.needDealer) {
                            return [2 /*return*/];
                        }
                        if (resp_1.error) {
                            Global.alertMediator.addAlert(resp_1.error.msg, function () {
                            }, null, true);
                            return [2 /*return*/];
                        }
                        if (resp_1.reconnect) {
                            if (Global.gameProxy.roomState.raceState == 2) {
                                HallForwardFac.redirectRaceScene(resp_1, Global.gameProxy.roomState, function (isPlaying) {
                                    if (isPlaying) {
                                        _this.hide();
                                    }
                                });
                                return [2 /*return*/];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 3) {
                            roomInfo = Global.gameProxy.roomInfo;
                            if (roomInfo) {
                                roomInfo.rewardDatas = {
                                    rank: resp.rank,
                                    reward: resp.reward
                                };
                                this.hide();
                                CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
                                MatchOverPanel.instance.show(roomInfo.rewardDatas);
                            }
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MatchXZDDSettlePanel.prototype.clubInvite = function (e) {
    };
    MatchXZDDSettlePanel.prototype.s_pushRaceInvite = function () {
    };
    MatchXZDDSettlePanel.prototype.hide = function () {
        if (MatchXZDDSettlePanel._instance) {
            game.UIUtils.removeSelf(this);
            MatchXZDDSettlePanel._instance = null;
            console.log("clear this.loopRewardResult1-------------");
            clearInterval(this.autoInterval);
            clearInterval(this.loopRewardResult);
        }
    };
    MatchXZDDSettlePanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.enterBtn:
                this.enterBtnTouch();
                break;
        }
    };
    MatchXZDDSettlePanel.prototype.showInfo = function () {
        var roomInfo = Global.gameProxy.roomInfo;
        var players = this.data.players;
        for (var key in players) {
            var data = players[key];
            if (Global.gameProxy.checkIndexIsMe(key)) {
                var gainGold = data.gainGold;
                if (gainGold >= 0) {
                    SoundManager.getInstance().playEffect("m_game_win_mp3");
                }
                else {
                    SoundManager.getInstance().playEffect("m_game_lose_mp3");
                }
                this.showPlayerInfo(data, key, 1); //是自己，要调用的方法。
                if (roomInfo.raceType == 1) {
                    this.isTaotai = data.eliminate == 1;
                }
            }
            else {
                this.showPlayerInfo(data, key, 2);
            }
        }
        this.enterBtn.visible = false;
        this.enterType = 0;
        var rewardInfo = roomInfo.rewardDatas;
        3;
        if (rewardInfo && rewardInfo.reward) {
            this.textLabel.text = "正在结算,请耐心等待.";
            this.enterBtn.visible = true;
            this.enterType = 1;
        }
        else if (this.isTaotai) {
            this.textLabel.text = "正在结算,请耐心等待.";
            this.enterBtn.visible = true;
            this.enterType = 1;
        }
        else {
            //大力雏菊
            if (roomInfo.raceType == 1) {
                this.enterType = 3;
                this.textLabel.text = "正在等待其他桌结束，请耐心等候.";
                if (this.data.iscutoff == 1) {
                    //淘汰赛最后一轮
                    this.enterType = 4;
                    this.enterBtn.visible = true;
                }
            }
            else {
                if (roomInfo.raceNum == roomInfo.raceMaxNum) {
                    if (roomInfo.lastRace == 1) {
                        this.textLabel.text = "正在结算,请耐心等待.";
                        this.enterBtn.visible = false;
                        this.enterType = 3;
                    }
                    //最后一句
                    this.enterType = 2;
                    this.enterBtn.visible = true;
                    this.textLabel.text = "正在等待其他桌结束，请耐心等候.";
                }
                else {
                    this.enterType = 3;
                    this.textLabel.text = "即将开始下一局,请等候.";
                    this.enterBtn.visible = true;
                }
            }
        }
        if (this.enterType != 3) {
            this.setEnterBtnTouch();
        }
        LogUtils.logD("当前结算类型:" + this.enterType);
        egret.Tween.get(this.textLabel, { loop: true }).to({
            alpha: 0
        }, 1000).to({
            alpha: 1
        }, 1000);
    };
    MatchXZDDSettlePanel.prototype.setEnterBtnTouch = function () {
        var _this = this;
        var count = 5;
        this.timeLabel.text = "(" + count + ")";
        this.autoInterval = setInterval(function () {
            console.log("淘汰：" + count);
            count--;
            _this.timeLabel.text = "(" + count + ")";
            if (count == 0) {
                clearInterval(_this.autoInterval);
                _this.enterBtnTouch();
            }
        }, 1000);
    };
    MatchXZDDSettlePanel.prototype.checkStart = function () {
        if (this.isInitHand && this.isStart) {
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
            CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
        }
    };
    MatchXZDDSettlePanel.prototype.enterBtnTouch = function () {
        clearInterval(this.autoInterval);
        var roomInfo = Global.gameProxy.roomInfo;
        if (this.enterType == 1) {
            //显示淘汰界面
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
            MatchOverPanel.instance.show(roomInfo.rewardDatas);
        }
        else if (this.enterType == 2) {
            //查看晋级路线界面
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
            MatchPassPanel.instance.showRaceDingju({});
        }
        else if (this.enterType == 3) {
            //查看桌面
            this.visible = false;
        }
        else if (this.enterType == 4) {
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
            MatchPassPanel.instance.showRaceLast(this.data);
        }
    };
    /**
     * 显示自己
     */
    MatchXZDDSettlePanel.prototype.showPlayerInfo = function (player, key, type) {
        var _this = this;
        var direction = this.directions[key];
        for (var i = 0; i < player.bills.length; i++) {
            if (player.bills[i] && player.bills[i]["type"] != 0) {
                var item = new MatchSettleItem();
                item.showItemData(player.bills[i], type, key);
                this["contentGroup" + direction].addChild(item);
            }
        }
        var playerData = Global.gameProxy.getPlayerByIndex(key);
        this["nameLabel" + direction].text = playerData.nickname;
        this["scoreLabel" + direction].text = player.score;
        var roomInfo = Global.gameProxy.roomInfo;
        var showAni = function (playerData) {
            var taotai = playerData.eliminate;
            var dbName;
            if (taotai == 1) {
                dbName = "bsc_end_no4";
                //淘汰
            }
            else {
                //晋级
                dbName = "bsc_end_no1";
            }
            var db = new DBComponent(dbName);
            _this["group" + direction].addChild(db);
            db.playNamesAndLoop([dbName, dbName + "_loop"]);
            _this["rankImage" + direction].visible = false;
            db.x = _this["rankImage" + direction].x + 96 / 2;
            db.y = _this["rankImage" + direction].y + 96 / 2;
        };
        if (roomInfo.raceType == 1) {
            //大力雏菊
            if (player.eliminate == 1) {
                showAni(player);
            }
        }
        else {
            var rank = player.rank;
            this["rankImage" + direction].visible = true;
            this["rankImage" + direction].source = RES.getRes("m_mj_over_rank" + rank + "_png");
            if (roomInfo.raceNum == roomInfo.raceMaxNum && roomInfo.lastRace != 1) {
                //如果定局积分最后一盘
                this.setAutoTimeout(function () {
                    egret.Tween.get(_this["rankImage" + direction]).to({
                        alpha: 0
                    }, 300);
                    _this.setAutoTimeout(function () {
                        showAni(player);
                    }, _this, 300);
                }, this, 500);
            }
        }
    };
    MatchXZDDSettlePanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_countdown, this.countdDown, this);
        CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
    };
    MatchXZDDSettlePanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_countdown, this.countdDown, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
    };
    /**
     * 得知结果
     * @param  {egret.Event} e
     */
    MatchXZDDSettlePanel.prototype.s_pushRaceReward = function (e) {
        var data = e.data;
        var roomInfo = Global.gameProxy.roomInfo;
        if (roomInfo) {
            roomInfo.rewardDatas = data;
        }
        if (data && data.reward) {
            //淘汰了
            MatchOverPanel.instance.show(data);
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
        }
    };
    /**
     * 轮空
     * @param  {egret.Event} e
     */
    MatchXZDDSettlePanel.prototype.s_freePlayer = function (e) {
        this.hide();
        CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
        MatchPassPanel.instance.showLunKong();
    };
    MatchXZDDSettlePanel.prototype.countdDown = function (e) {
        var resp = e.data;
        if (Global.gameProxy.roomInfo) {
            Global.gameProxy.roomInfo.countdown = resp;
        }
    };
    MatchXZDDSettlePanel.prototype.s_startNewRound = function (e) {
        var data = e.data;
        Global.gameProxy.roomInfo.dealer = data.dealer;
        this.isStart = true;
        this.checkStart();
    };
    MatchXZDDSettlePanel.prototype.playerEnter = function (e) {
        this.needDealer = false;
        clearInterval(this.loopRewardResult);
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    };
    MatchXZDDSettlePanel.prototype.enterResult = function (e) {
        this.needDealer = false;
        clearInterval(this.loopRewardResult);
        var data = e.data;
        if (data.code && data.code != 0) {
            Global.alertMediator.addAlert(data.msg, function () {
            }, null, true);
            return;
        }
        Global.gameProxy.setRoomInfo(e.data);
        Global.gameProxy.roomInfo.playing = true;
        // e.data.roomInfo['players'] = this.players;
    };
    /**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
    MatchXZDDSettlePanel.prototype.initHandCards = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var roomInfo, mineData, key, playerData;
            return __generator(this, function (_a) {
                roomInfo = Global.gameProxy.roomInfo;
                mineData = Global.gameProxy.getMineGameData();
                mineData.cards = e.data.cards;
                mineData.hszCardsTip = e.data.hszCardsTip;
                for (key in roomInfo.players) {
                    if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
                        playerData = roomInfo.players[key];
                        if (game.Utils.valueEqual(key, roomInfo.dealer)) {
                            playerData.cardNum = 14;
                        }
                        else {
                            playerData.cardNum = 13;
                        }
                    }
                }
                this.isInitHand = true;
                this.checkStart();
                return [2 /*return*/];
            });
        });
    };
    /**
     * 开始游戏
     */
    MatchXZDDSettlePanel.prototype.startNewRound = function (e) {
        Global.gameProxy.roomInfo.setRoundData(e.data);
        this.isStart = true;
        this.checkStart();
    };
    /**
     * 玩家加入
     * @param  {egret.Event} e
     */
    MatchXZDDSettlePanel.prototype.playerjoin = function (e) {
        var resp = e.data;
        Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
    };
    return MatchXZDDSettlePanel;
}(game.BaseScene));
__reflect(MatchXZDDSettlePanel.prototype, "MatchXZDDSettlePanel");
