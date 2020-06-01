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
 * @Date: 2019-11-27 10:51:34
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-19 05:13:40
 * @Description: 进入匹配界面
 */
var MatchWaitPanel = (function (_super) {
    __extends(MatchWaitPanel, _super);
    function MatchWaitPanel() {
        var _this = _super.call(this) || this;
        _this.players = {};
        _this.lockReq = false;
        _this.isStart = false;
        _this.isInitHand = false;
        /**
         * 背景音乐
         */
        _this.bgMusic = "m_mjxzdd_bg_mp3";
        _this.skinName = new MatchWaitPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchWaitPanel, "instance", {
        get: function () {
            if (!MatchWaitPanel._instance) {
                MatchWaitPanel._instance = new MatchWaitPanel();
            }
            return MatchWaitPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchWaitPanel.prototype.clubInvite = function (e) {
    };
    MatchWaitPanel.prototype.s_pushRaceInvite = function () {
    };
    MatchWaitPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_raceStartResult, this.s_raceStartResult, this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_countdown, this.countdDown, this);
        CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_enterRace, this.s_enterRace, this);
        CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
        CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
    };
    MatchWaitPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
        CF.rE(ServerNotify.s_countdown, this.countdDown, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ServerNotify.s_raceStartResult, this.s_raceStartResult, this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_enterRace, this.s_enterRace, this);
        CF.rE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        clearInterval(this.interval);
        this.interval = null;
    };
    MatchWaitPanel.prototype.reconnectSuc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var resp, handler, resp_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, {})];
                    case 1:
                        resp = _a.sent();
                        Global.gameProxy.roomState = resp;
                        Global.gameProxy.lastGameConfig = resp;
                        if (!(Global.gameProxy.roomState && Global.gameProxy.roomState.state == 1)) return [3 /*break*/, 3];
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, Global.gameProxy.roomState)];
                    case 2:
                        resp_1 = _a.sent();
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
                                    else {
                                        Global.gameProxy.clearAllRoomInfo();
                                        CF.sN(SceneNotify.OPEN_MATCH_HALL);
                                    }
                                });
                                return [2 /*return*/];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 3) {
                            Global.alertMediator.addAlert("您已经被淘汰.", null, null, true);
                            this.hide();
                        }
                        else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 1) {
                            //可能会轮空
                            MatchPassPanel.instance.showLunKong();
                            this.hide();
                        }
                        else if (Global.gameProxy.roomState && Global.gameProxy.roomState.raceState == 4) {
                            MatchPassPanel.instance.showWating();
                            this.hide();
                        }
                        else {
                            Global.alertMediator.addAlert("您掉线了,请退出后重新加入比赛", null, null, true);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 奖励
     */
    MatchWaitPanel.prototype.s_pushRaceReward = function (e) {
        var data = e.data;
        var roomInfo = Global.gameProxy.roomInfo;
        roomInfo.rewardDatas = data;
        if (data && data.reward) {
            //淘汰了
            MatchOverPanel.instance.show(roomInfo.rewardDatas);
            this.hide();
        }
    };
    /**
     * 轮空
     * @param  {egret.Event} e
     */
    MatchWaitPanel.prototype.s_freePlayer = function (e) {
        this.hide();
        MatchPassPanel.instance.showLunKong();
    };
    MatchWaitPanel.prototype.s_enterRace = function (e) {
        var data = e.data;
        var enterNum = data.enterNum;
        var count = (this.itemData.cutoffNum - enterNum);
        if (count < 0) {
            count = 0;
        }
        var str = "<font color=\"#E7D6B5\" size=\"32\">\u5F53\u524D\u8FDB\u5165\u6BD4\u8D5B\u4EBA\u6570 </font><font color=\"#67C62E\" size=\"32\">" + data.enterNum + "</font>"
            + ("<font color=\"#E7D6B5\" size=\"32\"> \u4EBA,\u8FD8\u9700 </font><font color=\"#67C62E\" size=\"32\">" + count + "</font><font color=\"#E7D6B5\" size=\"32\"> \u4EBA\u5373\u53EF\u5F00\u8D5B</font>");
        this.textLabel.textFlow = (new egret.HtmlTextParser).parser(str);
        this.totalLabel.text = enterNum + "";
        this.needLabel.text = count + "";
    };
    MatchWaitPanel.prototype.startCountDown = function (e) {
        var data = e.data;
    };
    MatchWaitPanel.prototype.show = function () {
        this.itemData = Global.gameProxy.matchItemData;
        this.showInfo();
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    MatchWaitPanel.prototype.showInfo = function () {
        this.startInterval();
        var data = Global.gameProxy.matchItemData;
        this.totalLabel.text = data.enterNum;
        var needCount = this.itemData.cutoffNum - data.enterNum;
        if (needCount < 0) {
            needCount = 0;
        }
        this.needLabel.text = needCount + "";
        var str = "<font color=\"#E7D6B5\" size=\"32\">\u5F53\u524D\u8FDB\u5165\u6BD4\u8D5B\u4EBA\u6570 </font><font color=\"#67C62E\" size=\"32\">" + data.enterNum + "</font>"
            + ("<font color=\"#E7D6B5\" size=\"32\"> \u4EBA,\u8FD8\u9700 </font><font color=\"#67C62E\" size=\"32\">" + needCount + "</font><font color=\"#E7D6B5\" size=\"32\"> \u4EBA\u5373\u53EF\u5F00\u8D5B</font>");
        this.textLabel.textFlow = (new egret.HtmlTextParser).parser(str);
        this.titleLabel.text = this.itemData.title;
        var reward = this.itemData.contest_rankreward;
        var totalMoney = this.itemData.contest_allreward;
        for (var i = 0; i < reward.length; i++) {
            var rewardItem = new MatchWaitingItem();
            rewardItem.showData(reward[i], totalMoney);
            this.contentGroup.addChild(rewardItem);
        }
    };
    MatchWaitPanel.prototype.hide = function () {
        if (MatchWaitPanel._instance) {
            SoundManager.getInstance().stopAllEffects();
            game.UIUtils.removeSelf(this);
            MatchWaitPanel._instance = null;
        }
    };
    MatchWaitPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchWaitPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.backBtn:
                this.backBtnTouch();
                break;
        }
    };
    MatchWaitPanel.prototype.backBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Global.alertMediator.addAlert("少侠，记得即时回来参赛哦(不参赛视为自动放弃)", function () { return __awaiter(_this, void 0, void 0, function () {
                    var route, resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                route = ServerPostPath.hall_userHandler_quitRace;
                                return [4 /*yield*/, Global.pomelo.request(route, { id: this.itemData.activityId })];
                            case 1:
                                resp = _a.sent();
                                if (resp.error && resp.error.code != 0) {
                                    Global.alertMediator.addAlert(resp.error.msg);
                                }
                                else {
                                    this.hide();
                                    CF.sN(SceneNotify.OPEN_MATCH_HALL);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, null, false);
                return [2 /*return*/];
            });
        });
    };
    MatchWaitPanel.prototype.startInterval = function () {
        var _this = this;
        this.calcTime();
        this.interval = setInterval(function () {
            _this.calcTime();
        }, 1000);
    };
    MatchWaitPanel.prototype.calcTime = function () {
        var startRaceTime = this.itemData.startRaceTime;
        var cha = startRaceTime - game.DateTimeManager.instance.now;
        if (cha > 0) {
            if (cha < 60000) {
                this.timeLabel.textColor = 0XFF0000;
            }
            var timeArr = NumberFormat.getTimeDaojishi(cha);
            this.timeLabel.text = timeArr[0] + ":" + timeArr[1];
            if (cha < 30000) {
                egret.Tween.get(this.timeLabel).to({
                    scaleX: 3,
                    scaleY: 3
                }, 300, egret.Ease.circIn).to({
                    scaleX: 1,
                    scaleY: 1
                }, 400, egret.Ease.circOut);
            }
            if (Math.floor(cha / 1000) == 11) {
                SoundManager.getInstance().playEffect("m_match_countdown_mp3");
                this.isPlaySound = true;
            }
        }
        else {
            this.timeLabel.text = "00:00";
        }
    };
    MatchWaitPanel.prototype.enterResult = function (e) {
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
     *
     */
    MatchWaitPanel.prototype.s_raceStartResult = function (e) {
        var _this = this;
        var data = e.data;
        if (data.result == 0) {
            //s失败
            Global.alertMediator.addAlert("人数未达到开赛最低要求，比赛取消", function () {
                _this.hide();
                CF.sN(SceneNotify.OPEN_MATCH_HALL);
            }, null, true);
        }
    };
    MatchWaitPanel.prototype.countdDown = function (e) {
        var resp = e.data;
        if (Global.gameProxy.roomInfo) {
            Global.gameProxy.roomInfo.countdown = resp;
        }
    };
    MatchWaitPanel.prototype.s_startNewRound = function (e) {
        var data = e.data;
        Global.gameProxy.roomInfo.dealer = data.dealer;
        this.isStart = true;
        this.checkStart();
    };
    MatchWaitPanel.prototype.playerEnter = function (e) {
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    };
    /**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
    MatchWaitPanel.prototype.initHandCards = function (e) {
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
    MatchWaitPanel.prototype.checkStart = function () {
        if (this.isInitHand && this.isStart) {
            this.hide();
            CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
        }
    };
    /**
     * 开始游戏
     */
    MatchWaitPanel.prototype.startNewRound = function (e) {
        Global.gameProxy.roomInfo.setRoundData(e.data);
        this.isStart = true;
        this.checkStart();
    };
    /**
     * 玩家加入
     * @param  {egret.Event} e
     */
    MatchWaitPanel.prototype.playerjoin = function (e) {
        var resp = e.data;
        Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
    };
    return MatchWaitPanel;
}(game.BaseScene));
__reflect(MatchWaitPanel.prototype, "MatchWaitPanel");
