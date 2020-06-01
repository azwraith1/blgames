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
 * @Date: 2019-11-25 13:42:42
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-02 10:09:33
 * @Description: 比赛场大厅
 */
var MatchHallScene = (function (_super) {
    __extends(MatchHallScene, _super);
    function MatchHallScene() {
        var _this = _super.call(this) || this;
        _this.hallId = "blackjack";
        _this.pmdKey = "blackjack";
        /**
         * 头像前缀
         */
        _this.headerFront = "hall_header";
        /**
         * 背景音乐
         */
        _this.bgMusic = "match_hall_bg_mp3";
        /**
         * 关闭当前界面的通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_MATCH_HALL;
        /**
         * 进入正确匹配的通知
         */
        _this.MATCHING_NOTIFY = SceneNotify.OPEN_BLACKJ_MATCHING;
        /**
         * 帮助界面的通知
         */
        _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU;
        /**
         * 记录界面的通知
         */
        _this.RECORD_NOTIFY = PanelNotify.OPEN_BASE_RECORD;
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = PanelNotify.OPEN_SETTING;
        /**
         * 需要加载的资源组
         */
        _this.loadGroups = [];
        //血战到底
        _this.currentGameId = 10001;
        _this.tabItems = [];
        _this.luckyItems = [];
        _this.dataSources = [];
        _this.totalBet = 0;
        _this.skinName = new MatchHallSceneSkin();
        return _this;
    }
    MatchHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initList();
        // game.UIUtils.removeSelf(GameLayerManager.gameLayer().hotBar);
        this.initTabList();
        this.tabScroller.scrollPolicyH = "off";
        this.checkFirstIn();
        var hotBar = GameLayerManager.gameLayer().hotBar;
        hotBar.verticalCenter = 260;
    };
    MatchHallScene.prototype.checkFirstIn = function () {
        var playerId = Global.playerProxy.playerData.id;
        var data = localStorage.getItem("match_first");
        if (!data) {
            localStorage.setItem("match_first", "1");
            EnterAndClosePanel.getInstance(new MatchHallFirstSkin()).show();
        }
    };
    /**
         * 初始化List
         */
    MatchHallScene.prototype.initList = function () {
        this.gameGroup.dataProvider = null;
        this.gameGroup.itemRenderer = MatchHallListRender;
    };
    MatchHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.MATCH_TAB_TOUCH, this.matchTabTouch, this);
        CF.aE(ENo.ENTER_MATCH, this.enterMatch, this);
        CF.aE(ENo.JACKEY_ITEM_TOUCH, this.jackyItemTouch, this);
        CF.aE(ServerNotify.s_pushRaceRewardChange, this.s_pushRaceRewardChange, this);
    };
    MatchHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.MATCH_TAB_TOUCH, this.matchTabTouch, this);
        CF.rE(ENo.ENTER_MATCH, this.enterMatch, this);
        CF.rE(ENo.JACKEY_ITEM_TOUCH, this.jackyItemTouch, this);
        CF.rE(ServerNotify.s_pushRaceRewardChange, this.s_pushRaceRewardChange, this);
        egret.clearTimeout(this.interval);
        this.interval = null;
    };
    MatchHallScene.prototype.startInterval = function () {
        var _this = this;
        this.interval = egret.setInterval(function () {
            if (GameConst.MATCH_TAB_INDEX == 2) {
                return;
            }
            var update = false;
            for (var i = 0; i < _this.dataSources.length; i++) {
                var itemData = _this.dataSources[i];
                var startRaceTime = itemData.startRaceTime;
                var now = game.DateTimeManager.instance.now;
                if (now >= startRaceTime) {
                    game.Utils.removeArrayItem(_this.dataSources, itemData);
                    i--;
                    update = true;
                    continue;
                }
                ;
            }
            if (update) {
                _this.gameGroup.dataProvider = new eui.ArrayCollection(_this.dataSources);
            }
            for (var i = 0; i < _this.gameGroup.numChildren; i++) {
                var item = _this.gameGroup.getChildAt(i);
                item.flushState();
            }
            //检查活动是否都没了
            _this.noItemImage.visible = _this.gameGroup.numChildren == 0;
        }, this, 1000);
    };
    MatchHallScene.prototype.s_pushRaceRewardChange = function (e) {
        var data = e.data;
        for (var i = 0; i < this.gameGroup.numChildren; i++) {
            var item = this.gameGroup.getChildAt(i);
            var itemData = item.data;
            if (itemData.activityId == data.activityId) {
                itemData.contest_allreward = data.contest_allreward;
                item.flushReward();
            }
        }
    };
    /**
     * 进入匹配
     */
    MatchHallScene.prototype.enterMatch = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data;
            return __generator(this, function (_a) {
                if (this.lockEnter) {
                    return [2 /*return*/];
                }
                data = e.data;
                RotationLoading.instance.load(['match_mjxzdd'], "", function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var route, resp;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.lockEnter = true;
                                Global.gameProxy.lastGameConfig = {};
                                Global.gameProxy.lastGameConfig.gameId = data.gameId;
                                route = ServerPostPath.hall_userHandler_c_enterRace;
                                return [4 /*yield*/, Global.pomelo.request(route, { id: data.activityId })];
                            case 1:
                                resp = _a.sent();
                                Global.gameProxy.matchItemData = data;
                                egret.setTimeout(function () { _this.lockEnter = false; }, this, 1000);
                                if (resp.error && resp.error.code != 0) {
                                    Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                }
                                else {
                                    Global.gameProxy.matchItemData.enterNum = resp.enterNum;
                                    MatchWaitPanel.instance.show();
                                    CF.sN(this.CLOSE_NOTIFY);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 左侧条
     */
    MatchHallScene.prototype.initTabList = function () {
        // let list = [1, 3, 2];
        // if (ServerConfig.PATH_TYPE == PathTypeEnum.WAI_PRODUCT || ServerConfig.PATH_TYPE == PathTypeEnum.PUBLISH_TEST) {
        // 	list = [1, 2];
        // }
        var sceneList = Global.gameProxy.backSceneList;
        var list = [1];
        for (var i = 0; i < sceneList.length; i++) {
            var sceneConfig = sceneList[i];
            if (sceneConfig.gameId == "luckyAwardPool") {
                list.push(2);
            }
        }
        this.tabGroup.removeChildren();
        for (var i = 0; i < list.length; i++) {
            var id = list[i];
            var tab = new MatchHallTab();
            tab.changeImageId(id);
            tab.x = 14;
            tab.y = i * tab.height;
            this.tabGroup.addChild(tab);
            this.tabItems.push(tab);
        }
        // Global.pomelo.request()
        // this.getGameList();
        this.initCurrentTab();
    };
    MatchHallScene.prototype.matchTabTouch = function (e) {
        var data = e.data;
        if (this.lockTab) {
            return;
        }
        if (data == GameConst.MATCH_TAB_INDEX) {
            return;
        }
        GameConst.MATCH_TAB_INDEX = data;
        for (var i = 0; i < this.tabItems.length; i++) {
            var tab = this.tabItems[i];
            tab.changeImage();
        }
        this.initCurrentTab();
    };
    MatchHallScene.prototype.initCurrentTab = function () {
        this.lockTab = true;
        switch (GameConst.MATCH_TAB_INDEX) {
            case 1:
                this.jackeyGroup.visible = false;
                this.gameScroller.visible = true;
                this.noItemImage.visible = false;
                this.getGameList();
                break;
            case 2:
                this.gameScroller.visible = false;
                this.jackeyGroup.visible = false;
                this.noItemImage.visible = false;
                this.getJackeyList();
                break;
            case 3:
                this.jackeyGroup.visible = false;
                this.gameScroller.visible = true;
                this.noItemImage.visible = false;
                this.getGameList();
                break;
        }
    };
    /**
     * 获取游戏列表
     * @param  {} gameId=10001
     */
    MatchHallScene.prototype.getGameList = function (gameId) {
        if (gameId === void 0) { gameId = 10002; }
        return __awaiter(this, void 0, void 0, function () {
            var route, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        route = ServerPostPath.hall_userHandler_c_raceScenes;
                        return [4 /*yield*/, Global.pomelo.request(route, { gameId: gameId })];
                    case 1:
                        resp = _a.sent();
                        this.lockTab = false;
                        Global.pomelo.clearLastLock();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                        }
                        else {
                            this.showDatas(resp);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchHallScene.prototype.getJackeyList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (MatchManager.instance.luckyConfigs && MatchManager.instance.luckyGameIds) {
                            this.lockTab = false;
                            this.showLuckeyData();
                            return [2 /*return*/];
                        }
                        route = ServerPostPath.hall_luckyHandler_c_getLuckyGameListInfo;
                        return [4 /*yield*/, Global.pomelo.request(route, {})];
                    case 1:
                        resp = _a.sent();
                        this.lockTab = false;
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                        }
                        else {
                            MatchManager.instance.setLuckyConfig(resp);
                            this.showLuckeyData();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchHallScene.prototype.jackyItemTouch = function (e) {
        var index = e.data;
        if (index == MatchManager.instance.selectIndex) {
            return;
        }
        var gameConfigs = MatchManager.instance.luckyConfigs;
        var currentGameConfig = gameConfigs[MatchManager.instance.selectGameId];
        MatchManager.instance.selectIndex = index;
        MatchManager.instance.selectGameGold = currentGameConfig[index].entryFeeGold;
        for (var i = 0; i < this.luckyItems.length; i++) {
            this.luckyItems[i].showPoint();
        }
    };
    MatchHallScene.prototype.backBtnTouch = function () {
        _super.prototype.backBtnTouch.call(this);
        MatchManager.instance.luckyConfigs = null;
        MatchManager.instance.luckyGameIds = null;
    };
    MatchHallScene.prototype.showLuckeyData = function () {
        var openGameId = MatchManager.instance.luckyGameIds;
        var gameConfigs = MatchManager.instance.luckyConfigs;
        if (!openGameId || !gameConfigs) {
            this.noItemImage.visible = true;
            this.jackeyGroup.visible = false;
            return;
        }
        var currentGameConfig = gameConfigs[MatchManager.instance.selectGameId];
        MatchManager.instance.selectGameGold = currentGameConfig[MatchManager.instance.selectIndex].entryFeeGold;
        this.switchBtn.visible = openGameId.length > 1;
        if (this.luckyItems.length == currentGameConfig.length) {
            for (var i = 0; i < this.luckyItems.length; i++) {
                var item = this.luckyItems[i];
                item.changeConfig(currentGameConfig[i]);
            }
        }
        else {
            for (var i = 0; i < currentGameConfig.length; i++) {
                var matchItem = new MatchJackeyItem(i, currentGameConfig[i]);
                this.luckyItems.push(matchItem);
                this.jItemGroup.addChild(matchItem);
            }
        }
        this.noItemImage.visible = false;
        this.jackeyGroup.visible = true;
    };
    MatchHallScene.prototype.showDatas = function (listData) {
        var scenes = listData.raceScenesArray;
        if (listData.totalBet != undefined) {
            this.totalBet = listData.totalBet;
        }
        var newList = [];
        for (var i = 0; i < scenes.length; i++) {
            var sceneData = scenes[i];
            var startTime = sceneData.startRaceTime;
            if (startTime > game.DateTimeManager.instance.now && sceneData.state != 2) {
                var joinType = sceneData.joinTypeAndGold;
                if (GameConst.MATCH_TAB_INDEX == 1 && joinType[0] == 1) {
                    //免费赛
                    newList.push(sceneData);
                }
                if (GameConst.MATCH_TAB_INDEX == 3 && joinType[0] == 2) {
                    newList.push(sceneData);
                }
            }
        }
        var sortList = _.sortBy(newList, "startRaceTime");
        //最近的一个报名
        var alertData;
        for (var i = 0; i < sortList.length; i++) {
            var sceneData = sortList[i];
            sceneData.totalBet = this.totalBet;
            if (!alertData && sceneData.state == 1) {
                alertData = sceneData;
            }
        }
        this.dataSources = sortList;
        this.gameGroup.dataProvider = new eui.ArrayCollection(sortList);
        this.noItemImage.visible = sortList.length == 0;
        if (alertData) {
            var startTime = alertData.startRaceTime;
            if (startTime - game.DateTimeManager.instance.now < Const.LAST_TIME_RACE) {
                Global.alertMediator.addAlert("\u4F60\u62A5\u540D\u7684 " + alertData.title + " \u5373\u5C06\u5F00\u8D5B,\u662F\u5426\u7ACB\u5373\u8FDB\u5165?", function () {
                    CF.dP(ENo.ENTER_MATCH, alertData);
                });
            }
        }
        this.startInterval();
    };
    MatchHallScene.prototype.onTouchTap = function (e) {
        var _this = this;
        switch (e.target) {
            case this.jJoinBtn:
                var resGroup = this.getResourceGroup();
                resGroup.push("match_common");
                RotationLoading.instance.load(resGroup, "", function () {
                    _this.jJoinBtnTouch();
                });
                return;
        }
        _super.prototype.onTouchTap.call(this, e);
    };
    MatchHallScene.prototype.showHallBars = function () {
    };
    MatchHallScene.prototype.getResourceGroup = function () {
        switch (MatchManager.instance.selectGameId) {
            case GAME_ID.MJXZDD:
                return ["majiang_game", "majiang_common"];
        }
    };
    /**
     * 新模式加入
     */
    MatchHallScene.prototype.jJoinBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var route, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        route = ServerPostPath.hall_luckyHandler_c_joinLuckyGame;
                        data = {
                            gameId: MatchManager.instance.selectGameId,
                            entryFeeGold: MatchManager.instance.selectGameGold,
                            sceneIndex: MatchManager.instance.selectIndex
                        };
                        return [4 /*yield*/, Global.pomelo.request(route, data)];
                    case 1:
                        resp = _a.sent();
                        this.lockTab = false;
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                        }
                        else {
                            MatchManager.instance.tablePlayers = resp;
                            MatchManager.instance.matchConfig = data;
                            MatchManager.instance.redirectScene(function () {
                                CF.sN(_this.CLOSE_NOTIFY);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchHallScene.prototype.helpBtnTouch = function () {
        // WinNumberPanel.instance.show(Math.floor(100000), null);
        MatchHelpPanel.instance.show();
        // EnterAndClosePanel.getInstance(new MatchHelpPanelSkin()).show();
    };
    return MatchHallScene;
}(game.BaseHallScene));
__reflect(MatchHallScene.prototype, "MatchHallScene");
