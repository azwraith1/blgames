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
 * @Date: 2019-11-28 17:26:34
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-01 18:23:12
 * @Description: 晋级界面
 */
var MatchPassPanel = (function (_super) {
    __extends(MatchPassPanel, _super);
    function MatchPassPanel() {
        var _this = _super.call(this) || this;
        /**
         * 背景音乐
         */
        _this.bgMusic = "m_mjxzdd_bg1_mp3";
        _this.needDealer = true;
        _this.isStart = false;
        _this.isInitHand = false;
        _this.players = {};
        _this.skinName = new MatchPassPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchPassPanel, "instance", {
        get: function () {
            if (!MatchPassPanel._instance) {
                MatchPassPanel._instance = new MatchPassPanel();
            }
            return MatchPassPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchPassPanel.prototype.clubInvite = function (e) {
    };
    MatchPassPanel.prototype.s_pushRaceInvite = function () {
    };
    MatchPassPanel.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.showEffect();
        this.loopRewardResult = setInterval(function () {
            console.log(" this.loopRewardResult22222222-------------");
            _this.c_queryGameState();
        }, 10000);
    };
    MatchPassPanel.prototype.showEffect = function () {
        var jinjiDb = GameCacheManager.instance.getCache("bsc_jinji");
        if (!jinjiDb) {
            jinjiDb = new DBComponent("bsc_jinji", false);
            GameCacheManager.instance.setCache("bsc_jinji", jinjiDb);
        }
        jinjiDb.y = 220;
        this.dbGroup.addChild(jinjiDb);
        jinjiDb.playNamesAndLoop(['bsc_jinji', "bsc_jinji_loop"]);
        this.showAni();
    };
    MatchPassPanel.prototype.showAni = function () {
        egret.Tween.get(this.tipGroup, { loop: true }).to({
            alpha: 0.4
        }, 800).to({
            alpha: 1
        }, 800);
    };
    MatchPassPanel.prototype.c_queryGameState = function () {
        this.reconnectSuc();
    };
    MatchPassPanel.prototype.show = function (data) {
        this.data = data;
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showCount();
    };
    MatchPassPanel.prototype.hide = function () {
        if (MatchPassPanel._instance) {
            game.UIUtils.removeSelf(this);
            MatchPassPanel._instance = null;
            console.log("clear this.loopRewardResult2222222-------------");
            clearInterval(this.loopRewardResult);
        }
    };
    MatchPassPanel.prototype.showCount = function () {
        if (!Global.gameProxy.roomInfo) {
            return;
        }
        var arr = Global.gameProxy.roomInfo.passLevels;
        if (arr) {
            var current = Global.gameProxy.roomInfo.curLevel;
            var index = arr.indexOf(current);
            for (var i = 0; i < arr.length; i++) {
                var item = new MatchPassItem();
                var type = i >= index ? 1 : 2;
                item.showData(type, arr[i]);
                this.countGroup.addChild(item);
            }
        }
    };
    MatchPassPanel.prototype.showLunKong = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.rankLabel.visible = false;
        this.countGroup.visible = false;
        this.tipsLabel.text = "本轮轮空直接晋级,等待其他桌结束.";
        this.showAni();
        this.gongxiImage.visible = true;
        this.reconnectSuc();
    };
    /**
     * 大力雏菊 淘汰截止
     */
    MatchPassPanel.prototype.showRaceLast = function (data) {
        var roomInfo = Global.gameProxy.roomInfo;
        var reward = roomInfo.rewardDatas;
        if (reward && reward.rank) {
            MatchOverPanel.instance.show(roomInfo.rewardDatas);
            this.hide();
            return;
        }
        this.rankLabel.text = roomInfo.currentRank;
        this.tipsLabel2.text = roomInfo.currentRank;
        this.showCount();
        this.tipsLabel1.text = "当前排名:";
        var str = "<font color=\"#FFE67C\" size=\"36\">\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21,\u5269\u4F59\u684C\u6570\uFF1A</font><font color=\"#2FE732\" size=\"36\">" + Global.gameProxy.roomInfo.remainTableNum + "</font>";
        this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    MatchPassPanel.prototype.checkNumberIsLast = function () {
        var roomInfo = Global.gameProxy.roomInfo;
        if (roomInfo && roomInfo.remainTableNum != undefined && roomInfo.remainTableNum == 0) {
            this.checkReward();
        }
    };
    MatchPassPanel.prototype.checkReward = function () {
        var roomInfo = Global.gameProxy.roomInfo;
        var reward = roomInfo.rewardDatas;
        if (reward && reward.rank) {
            MatchOverPanel.instance.show(reward);
            this.hide();
        }
    };
    /**
     * 定局积分
     * @param  {} data
     */
    MatchPassPanel.prototype.showRaceDingju = function (data) {
        var roomInfo = Global.gameProxy.roomInfo;
        this.rankLabel.text = roomInfo.tableRank;
        this.tipsLabel2.text = roomInfo.tableRank;
        this.tipsLabel1.text = "本桌排名:";
        var str = "<font color=\"#FFE67C\" size=\"36\">\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21,\u5269\u4F59\u684C\u6570\uFF1A</font><font color=\"#2FE732\" size=\"36\">" + Global.gameProxy.roomInfo.remainTableNum + "</font>";
        this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
        // this.tipsLabel.text = ;
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showCount();
        var reward = roomInfo.rewardDatas;
        if (reward && reward.rank) {
            MatchOverPanel.instance.show(reward);
            this.hide();
            return;
        }
        this.checkNumberIsLast();
    };
    MatchPassPanel.prototype.showWating = function (rank, raceNum) {
        if (rank === void 0) { rank = null; }
        if (raceNum === void 0) { raceNum = null; }
        var roomInfo = Global.gameProxy.roomInfo;
        if (roomInfo) {
            var reward = roomInfo.rewardDatas;
            if (reward && reward.rank) {
                this.rankLabel.text = reward.rank;
                this.tipsLabel2.text = reward.rank;
            }
            var str = "<font color=\"#FFE67C\" size=\"36\">\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21,\u5269\u4F59\u684C\u6570\uFF1A</font><font color=\"#2FE732\" size=\"36\">" + Global.gameProxy.roomInfo.remainTableNum + "</font>";
            this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
            this.checkNumberIsLast();
        }
        else {
            this.tipsLabel.text = "\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21.";
            if (rank) {
                this.rankLabel.text = rank;
                this.tipsLabel2.text = rank;
            }
            if (raceNum) {
                var str = "<font color=\"#FFE67C\" size=\"36\">\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21,\u5269\u4F59\u684C\u6570\uFF1A</font><font color=\"#2FE732\" size=\"36\">" + raceNum + "</font>";
                this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
            }
        }
        this.showCount();
        GameLayerManager.gameLayer().panelLayer.addChild(this);
    };
    MatchPassPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_countdown, this.countdDown, this);
        CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.aE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
        CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
    };
    MatchPassPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_countdown, this.countdDown, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_freePlayer, this.s_freePlayer, this);
        CF.rE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
        CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
    };
    MatchPassPanel.prototype.reconnectSuc = function () {
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
                            clearInterval(this.loopRewardResult);
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
                        if (Global.gameProxy.roomState.raceState == 3) {
                            roomInfo = Global.gameProxy.roomInfo;
                            if (roomInfo) {
                                roomInfo.rewardDatas = {
                                    rank: resp.rank,
                                    reward: resp.reward
                                };
                                this.hide();
                                MatchOverPanel.instance.show(roomInfo.rewardDatas);
                            }
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 得知结果
     * @param  {egret.Event} e
     */
    MatchPassPanel.prototype.s_pushRaceReward = function (e) {
        var data = e.data;
        var roomInfo = Global.gameProxy.roomInfo;
        if (roomInfo) {
            roomInfo.rewardDatas = data;
        }
        if (data && data.rank) {
            //淘汰了 or 获得奖励
            this.hide();
            MatchOverPanel.instance.show(data);
        }
    };
    /**
     *
     * @param  {egret.Event} e
     */
    MatchPassPanel.prototype.s_pushRemainTableNum = function (e) {
        var tableNum = e.data.remainTableNum;
        if (Global.gameProxy.roomInfo) {
            Global.gameProxy.roomInfo.remainTableNum = tableNum;
        }
        var str = "<font color=\"#FFE67C\" size=\"36\">\u7B49\u5F85\u5176\u4ED6\u684C\u7ED3\u675F\u6392\u5B9A\u540D\u6B21,\u5269\u4F59\u684C\u6570\uFF1A</font><font color=\"#2FE732\" size=\"36\">" + tableNum + "</font>";
        this.tipsLabel.textFlow = (new egret.HtmlTextParser).parser(str);
    };
    /**
     * 轮空
     * @param  {egret.Event} e
     */
    MatchPassPanel.prototype.s_freePlayer = function (e) {
        MatchPassPanel.instance.hide();
        this.hide();
        CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
        MatchPassPanel.instance.showLunKong();
    };
    MatchPassPanel.prototype.countdDown = function (e) {
        var resp = e.data;
        if (Global.gameProxy.roomInfo) {
            Global.gameProxy.roomInfo.countdown = resp;
        }
    };
    MatchPassPanel.prototype.s_startNewRound = function (e) {
        this.needDealer = false;
        clearInterval(this.loopRewardResult);
        var data = e.data;
        Global.gameProxy.roomInfo.dealer = data.dealer;
        this.isStart = true;
        this.checkStart();
    };
    MatchPassPanel.prototype.playerEnter = function (e) {
        this.needDealer = false;
        clearInterval(this.loopRewardResult);
        var data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    };
    MatchPassPanel.prototype.enterResult = function (e) {
        clearInterval(this.loopRewardResult);
        this.loopRewardResult = null;
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
    MatchPassPanel.prototype.initHandCards = function (e) {
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
    MatchPassPanel.prototype.startNewRound = function (e) {
        Global.gameProxy.roomInfo.setRoundData(e.data);
        this.isStart = true;
        this.checkStart();
    };
    /**
     * 玩家加入
     * @param  {egret.Event} e
     */
    MatchPassPanel.prototype.playerjoin = function (e) {
        var resp = e.data;
        Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
    };
    MatchPassPanel.prototype.checkStart = function () {
        if (this.isInitHand && this.isStart) {
            this.hide();
            CF.sN(SceneNotify.CLOSE_MATCH_MJXZDD);
            CF.sN(SceneNotify.OPEN_MATCH_MJXZDD);
        }
    };
    return MatchPassPanel;
}(game.BaseScene));
__reflect(MatchPassPanel.prototype, "MatchPassPanel");
