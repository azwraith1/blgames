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
var sangong;
(function (sangong) {
    var SangongGameScene = (function (_super) {
        __extends(SangongGameScene, _super);
        function SangongGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "sangong";
            /**
             * 背景音乐
             */
            _this.bgMusic = "niuniu_bgm_mp3";
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_GAME;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SANGONG_GAME;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_WATING;
            /**
             * HELP界面
             */
            _this.HELP_PANEL_NOTIFY = PanelNotify.OPEN_HELP_SHU;
            /**
             * 记录界面
             */
            _this.RECORD_PANEL_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD;
            /**
             * 定庄动画
             */
            _this.qzLength = 0;
            GameConfig.CURRENT_ISSHU = true;
            _this.skinName = new SangongGameSceneSkin();
            return _this;
        }
        SangongGameScene.prototype.hideUI = function () {
            for (var i = 2; i <= 5; i++) {
                this['player' + i].visible = false;
            }
            for (var i = 1; i <= 5; i++) {
                this['cards' + i].visible = false;
            }
            this.timeBar.visible = false;
            this.tipsGroup.visible = false;
        };
        SangongGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        SangongGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.listenOffEvent();
        };
        SangongGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var length, i, roomInfo, publicMsg;
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    FrameUtils.changeBgImage("./resource/gameAssets/sangong_hall/sg_hall_bg.jpg");
                    this.hideUI();
                    this.cards1.setRoot(this);
                    this.showBtnsType(1);
                    this.restartBtn.visible = false;
                    this.qzBar.setRoot(this);
                    this.yzBar.setRoot(this);
                    length = _.values(Global.roomProxy.getPlayers()).length;
                    this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), length);
                    this.diFen.text = "底分：" + Global.gameProxy.lastGameConfig.diFen;
                    this.roomid.text = "牌局编号：" + Global.roomProxy.roomInfo.roomId;
                    this.showHeaders();
                    for (i = 1; i <= length; i++) {
                        this['header' + this.directions[i]].setIndex(i);
                    }
                    if (Global.roomProxy.reconnect || Global.runBack) {
                        // Global.oritationChange = false;
                        this.timeBar.startTime(this);
                        this.timeBar.visible = true;
                        roomInfo = Global.roomProxy.roomInfo;
                        this.showRunTimeByStep(roomInfo.roundStatus);
                        // if (roomInfo.roundStatus == SangongStep.CLOSE) {
                        // 	this.oritationChangeLookPais();
                        // 	this.status = SangongStatus.close;
                        // 	this.timeBar.visible = false;
                        // 	this.timeBar.removeTimer();
                        // }
                    }
                    else {
                        this.setAutoTimeout(function () {
                            _this.showStartAni();
                        }, this, 400);
                    }
                    this.listenEvent();
                    publicMsg = PMDComponent.instance;
                    publicMsg.anchorOffsetY = 24;
                    publicMsg.horizontalCenter = 10;
                    publicMsg.top = 40;
                    return [2 /*return*/];
                });
            });
        };
        SangongGameScene.prototype.showStartAni = function () {
            var _this = this;
            var startDb = GameCacheManager.instance.getCache("sg_startgame");
            if (!startDb) {
                startDb = new DBComponent("sg_startgame");
            }
            SoundManager.getInstance().playEffect("sg_game_start_mp3");
            startDb.callback = function () {
                game.UIUtils.removeSelf(startDb);
                // GameCacheManager.instance.setCache("sg_startgame", startDb);
                _this.timeBar.startTime(_this);
                _this.createPokers();
                _this.startMove();
            };
            this.effectGroup.addChild(startDb);
            //smart
            startDb.verticalCenter = 0;
            startDb.horizontalCenter = startDb.width / 2;
            //	startDb.playDefault(1);
            //smart
            startDb.playByFilename(1);
        };
        /**
         * 根据坐标找到头像
         * @param  {} index
         */
        SangongGameScene.prototype.getHeaderByIndex = function (index) {
            for (var i = 1; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return this['header' + i];
                }
            }
            return null;
        };
        /**获取headerInder smart */
        SangongGameScene.prototype.getHeaderIndex = function (index) {
            for (var i = 1; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return i;
                }
            }
            return null;
        };
        /**
         * 隐藏自己的提示语
         */
        SangongGameScene.prototype.falseMe = function (num1) {
            this.setAutoTimeout(function () {
                num1.visible = false;
            }, this, 1000);
        };
        SangongGameScene.prototype.trueMe = function (num1) {
            num1.visible = true;
        };
        /**
         * 自带监听
         */
        SangongGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var sum;
                return __generator(this, function (_a) {
                    sum = 0;
                    e.stopPropagation();
                    switch (e.target) {
                        case this.restartBtn:
                            this.restartBtnTouch();
                            break;
                        case this.backBtn:
                            this.showBtnsType(1);
                            this.backBtnTouch();
                            break;
                        case this.settingBtn:
                            // this.showGold2Header(1, 2);
                            // this.showGold2Header(1, 3);
                            // this.showGold2Header(1, 4);
                            // this.showGold2Header(1, 5);
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_SETTING, {});
                            break;
                        case this.recordBtn:
                            this.showBtnsType(1);
                            CF.sN(this.RECORD_PANEL_NOTIFY, "sangong");
                            break;
                        case this.helpBtn:
                            this.showBtnsType(1);
                            CF.sN(this.HELP_PANEL_NOTIFY, { type: "sangong" }); //samrt
                            break;
                        case this.fpBtn:
                        case this.fpBtnGroup:
                            this.fanpai();
                            break;
                        case this.xlbtn:
                            this.showBtnsType(2);
                            break;
                        case this.xlbtn1:
                            this.showBtnsType(1);
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        SangongGameScene.prototype.listenEvent = function () {
            CF.aE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
            CF.aE(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
            CF.aE(ServerNotify.s_startRobDealer, this.startRobDealer, this);
            CF.aE(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
            CF.aE(ServerNotify.s_startAddAnte, this.startAddAnte, this);
            CF.aE(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
            CF.aE(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
            CF.aE(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
            CF.aE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
            CF.aE(ServerNotify.s_dealerChanged, this.dealerChanged, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
            CF.aE(ServerNotify.s_roomFinished, this.roomFinished, this);
            CF.aE(ServerNotify.s_countdown, this.countdown, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            //	s_openCard
            CF.aE(ServerNotify.s_openCard, this.openCard, this);
            CF.aE(ServerNotify.s_openCardFinish, this.openCardFinsh, this);
            CF.aE(ServerNotify.s_startOpenCard, this.startOpenCard, this);
        };
        SangongGameScene.prototype.listenOffEvent = function () {
            CF.rE(ENo.STAGE_ORITATIONCHANGE, this.oritationChange, this);
            CF.rE(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
            CF.rE(ServerNotify.s_startRobDealer, this.startRobDealer, this);
            CF.rE(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
            CF.rE(ServerNotify.s_startAddAnte, this.startAddAnte, this);
            CF.rE(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
            CF.rE(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
            CF.rE(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
            CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
            CF.rE(ServerNotify.s_dealerChanged, this.dealerChanged, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
            CF.rE(ServerNotify.s_roomFinished, this.roomFinished, this);
            CF.rE(ServerNotify.s_countdown, this.countdown, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_openCard, this.openCard, this);
            CF.rE(ServerNotify.s_openCardFinish, this.openCardFinsh, this);
            CF.rE(ServerNotify.s_startOpenCard, this.startOpenCard, this);
        };
        SangongGameScene.prototype.countdown = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo.countdown) {
                roomInfo.countdown = {};
            }
            roomInfo.countdown = data;
            game.DateTimeManager.instance.updateServerTime(data.start);
            // roomInfo.countdown.start = data.start;
            // roomInfo.countdown.end = data.end;
        };
        //抢庄START
        /**
         * 抢庄step流程
         */
        SangongGameScene.prototype.runQzStep = function () {
            this.duanXainLookPais();
            //TipsCompoment.instance.show("开始抢庄");
            var roomInfo = Global.roomProxy.roomInfo;
            var players = roomInfo.players;
            for (var index in players) {
                var player = players[index];
                if (player.robDealerAnte == -1) {
                    //如果是我 没有抢庄状态 就显示抢庄条
                    if (Global.roomProxy.checkIndexIsMe(index)) {
                        this.qzBar.show();
                    }
                }
                else {
                    var header = this.getHeaderByIndex(index);
                    if (player.robDealerAnte == 1) {
                        header.showText("抢");
                    }
                    else {
                        header.showText("不抢");
                    }
                    // header.showBeishu(player.robDealerAnte);
                }
            }
        };
        /**
         * 接收服务器开始抢庄消息
         */
        SangongGameScene.prototype.startRobDealer = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            Global.roomProxy.roomInfo.roundStatus = SangongStep.QIANG_ZHUANG;
            this.showRunTimeByStep(Global.roomProxy.roomInfo.roundStatus);
            // if (!roomInfo.countdown) roomInfo.countdown = {};
            // roomInfo.countdown.start = data.serverTimeStampMS;
            // roomInfo.countdown.end = data.countdownMS + data.serverTimeStampMS;
        };
        /**
         * 开始抢庄显示抢庄条
         */
        SangongGameScene.prototype.robDealerMulti = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            var mine = Global.roomProxy.getMineInfo();
            mine.robDealerMulti = data;
            // this.showRunTimeByStep(roomInfo.roundStatus);
        };
        SangongGameScene.prototype.showTipsGroup = function (text) {
            this.tipsGroup.visible = true;
            this.tipLabel.text = text;
        };
        SangongGameScene.prototype.closeTipsGroup = function () {
            this.tipsGroup.visible = false;
            this.tipLabel.text = "";
        };
        /**
         * 发送抢庄信息
         */
        SangongGameScene.prototype.sendQZReq = function (rob) {
            return __awaiter(this, void 0, void 0, function () {
                var serverPath, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serverPath = ServerPostPath.game_sangongHandler_c_robDealer;
                            data = { rob: rob };
                            this.qzBar.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(serverPath, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                // if (Global.roomProxy.roomInfo.roundStatus == SangongStep.QIANG_ZHUANG) {
                                // 	this.qzBar.visible = true;
                                // }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * 收到某个玩家抢庄
        *
        */
        SangongGameScene.prototype.playerRobDealer = function (e) {
            var data = e.data;
            if (Global.roomProxy.roomInfo.roundStatus != SangongStep.QIANG_ZHUANG) {
                return;
            }
            var player = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
            player.qzMulti = data.rob;
            if (data.playerIndex == Global.roomProxy.getMineIndex()) {
                if (!this.findNotQZOver()) {
                    this.showTipsGroup("等待其他玩家抢庄");
                }
                else {
                    this.closeTipsGroup();
                    this.timeBar.visible = false;
                }
                this.qzBar.visible = false;
            }
            else {
                if (this.findNotQZOver()) {
                    this.timeBar.visible = false;
                    this.closeTipsGroup();
                }
            }
            var header = this.getHeaderByIndex(data.playerIndex);
            if (data.rob) {
                //header.showText("抢");
                //smart
                header.showQZ(this.getHeaderIndex(data.playerIndex), true);
                //smart 
            }
            else {
                // header.showText("不抢");
                //smart
                header.showQZ(this.getHeaderIndex(data.playerIndex), false);
            }
            //展示每个玩家抢庄分数
        };
        /**
         * 抢庄结果
         */
        SangongGameScene.prototype.dealerChanged = function (e) {
            this.closeTipsGroup();
            var data = e.data;
            var room = Global.roomProxy.roomInfo;
            room.dealer = data.dealer;
            room.randomDealers = data.randomDealers;
            //除了庄家的其他玩家倍数全部空
            for (var i = 1; i <= _.keys(room.players).length; i++) {
                var header = this['header' + i];
                header.hideBeishu();
            }
            Global.roomProxy.roomInfo.countdown = null;
            this.timeBar.visible = false;
            this.randomEstates();
            this.releaseQZUI();
        };
        /**
         * 回收抢庄UI
         */
        SangongGameScene.prototype.releaseQZUI = function () {
            this.qzBar.visible = false;
        };
        /**
         * 回收开牌
         */
        SangongGameScene.prototype.releaseKPUI = function () {
            this.releaseQZUI();
        };
        //抢庄END
        SangongGameScene.prototype.clearQZInfo = function () {
            var players = Global.roomProxy.roomInfo.players;
            for (var key in players) {
                var header = this.getHeaderByIndex(key);
                header.hideBeishu();
            }
        };
        //押注流程start
        /**
         * 进入押注流程 等待addAnteMulti
         */
        SangongGameScene.prototype.startAddAnte = function (e) {
            this.releaseQZUI();
            this.clearQZInfo();
            //给服务器发事件 game_sangongHandler_c_addAnte
            var data = e.data;
            var room = Global.roomProxy.roomInfo;
            room.roundStatus = SangongStep.ADDANTE;
            if (Global.roomProxy.checkIndexIsMe(room.dealer)) {
                this.showTipsGroup("等待其他玩家下注");
            }
            this.timeBar.visible = true;
            // if (!room.countdown) room.countdown = {};
            // room.countdown.start = data.serverTimeStampMS;
            // room.countdown.end = data.countdownMS + data.serverTimeStampMS;
            game.DateTimeManager.instance.updateServerTime(data.serverTimeStampMS);
            //如果是庄家就显示等待
        };
        /**
         * 闲家显示押注条 开始发送闲家押注请求
         * @param  {egret.TouchEvent} e
         *
         */
        SangongGameScene.prototype.addAnteMulti = function (e) {
            var _this = this;
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            var mine = Global.roomProxy.getMineInfo();
            mine.addAnteMulti = data;
            Global.roomProxy.roomInfo.roundStatus = SangongStep.ADDANTE;
            var time = 1000;
            if (this.qzLength > 1) {
                time = (this.qzLength) * 300;
            }
            this.setAutoTimeout(function () {
                _this.showRunTimeByStep(roomInfo.roundStatus);
            }, this, time);
        };
        /**
         * 闲家的押注UI流程
         */
        SangongGameScene.prototype.runAddanteStep = function () {
            this.releaseQZUI();
            this.duanXainLookPais();
            //TipsCompoment.instance.show("闲家开始押注");
            var roomInfo = Global.roomProxy.roomInfo;
            var players = roomInfo.players;
            if (Global.roomProxy.checkIndexIsMe(roomInfo.dealer)) {
                this.showTipsGroup("等待其他玩家下注");
            }
            for (var index in players) {
                var player = players[index];
                if (player.addAnte == -1) {
                    //我不是庄家就显示
                    if (Global.roomProxy.checkIndexIsMe(index) && roomInfo.dealer + "" != index) {
                        this.yzBar.show(player.addAnteMulti);
                    }
                }
                else {
                    if (index != roomInfo.dealer + "") {
                        var header = this.getHeaderByIndex(index);
                        header.showBeishu(player.addAnte);
                    }
                }
            }
        };
        /**
         * 闲家押注
         */
        SangongGameScene.prototype.sendYZReq = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var serverPath, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serverPath = ServerPostPath.game_sangongHandler_c_addAnte;
                            data = { multi: value };
                            this.yzBar.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(serverPath, data)];
                        case 1:
                            resp = _a.sent();
                            // this.showTipsGroup("等待其他玩家押注");
                            if (resp && resp.error && resp.error.code != 0) {
                                // if (Global.roomProxy.roomInfo.roundStatus == SangongStep.ADDANTE) {
                                // 	this.yzBar.visible = true;
                                // }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 同playerAnteChange
         * 玩家押注通知
         */
        SangongGameScene.prototype.playerAddAnte = function (e) {
            //	展示每个压住玩家的分数  game_sangongHandler_c_addAnte
            this.playerAnteChange(e);
        };
        /**
         * 玩家押注通知
         */
        SangongGameScene.prototype.playerAnteChange = function (e) {
            var data = e.data;
            var player = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
            player.addAnte = data.multi;
            if (data.playerIndex + "" == Global.roomProxy.getMineIndex() + "") {
                this.yzBar.visible = false;
                if (!this.findNotAnteOver()) {
                    this.showTipsGroup("等待其他玩家下注");
                }
                else {
                    this.closeTipsGroup();
                    this.timeBar.visible = false;
                }
            }
            else {
                if (this.findNotAnteOver()) {
                    this.closeTipsGroup();
                    this.timeBar.visible = false;
                }
            }
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo.dealer) {
                return;
            }
            var header = this.getHeaderByIndex(data.playerIndex);
            header.showYZshu(data.multi);
        };
        /**
         * 寻找没有抢庄完成的
         */
        SangongGameScene.prototype.findNotQZOver = function () {
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var player = players[key];
                if (player.qzMulti == undefined || player.qzMulti < 0) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 寻找没有押注完成的
         */
        SangongGameScene.prototype.findNotAnteOver = function () {
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                if (key == "" + Global.roomProxy.roomInfo.dealer) {
                    continue;
                }
                var player = players[key];
                if (!player.addAnte || player.addAnte < 1) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 寻找玩家开牌完成
         */
        SangongGameScene.prototype.findNotKaiPaiOver = function () {
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var player = players[key];
                if (!player.handCards || player.handCards < 1) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 押注完成
         */
        SangongGameScene.prototype.addAnteFinish = function (e) {
            //服务器会告诉,相当于清除押注的UI，开始发牌的相关UI
            this.closeTipsGroup();
            var room = Global.roomProxy.roomInfo;
            room.roundStatus = SangongStep.EMPTY;
            Global.roomProxy.roomInfo.countdown = null;
            this.timeBar.visible = false;
            this.releaseYZUI();
        };
        SangongGameScene.prototype.releaseYZUI = function () {
            this.releaseQZUI();
            this.yzBar.visible = false;
        };
        //押注end
        //发牌开始
        /**
         * 开始发牌
         */
        SangongGameScene.prototype.initHandCards = function (e) {
            this.releaseYZUI();
            var data = e.data;
            var cards = data.cards;
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = SangongStep.FAPAI;
            //	this.createPokers();
            var players = roomInfo.players;
            for (var key in players) {
                var player = players[key];
                var index = this.directions[key];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    player.handCards = cards;
                    player.roundPattern = data.roundPattern;
                    this.cards1.renderByList1(cards);
                }
                else {
                    player.cardLength = data.cardLength;
                    this['player' + index].visible = true;
                    var cards_1 = this['cards' + index];
                    cards_1.renderByList(player.cardLength);
                }
            }
        };
        /**
         * 飞金币效果
         */
        SangongGameScene.prototype.showGold2Header = function (index1, index2) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
            var header1 = this['header' + index1];
            var header2 = this['header' + index2];
            var arr = [];
            for (var i = 0; i < 12; i++) {
                arr.push(i);
            }
            async.eachSeries(arr, function (num, callback) {
                var image = ObjectPool.produce("sangong_coin_img", eui.Image);
                if (!image) {
                    image = new eui.Image("nn_coin_png");
                    image.scaleX = image.scaleY = 0.8;
                }
                // image.horizontalCenter = header1.horizontalCenter + _.random(-20, 20);
                // image.verticalCenter = header1.verticalCenter + 20 + _.random(-20, 20);
                //LogUtils.logD("============水平=========" + header1.horizontalCenter + "垂=======直：" + header1.verticalCenter);
                image.x = header1.localToGlobal().x + 60 + _.random(-20, 20);
                image.y = header1.localToGlobal().y + 120;
                _this.effectGroup.addChild(image);
                NiuniuUtils.playFjb();
                var time = _.random(200, 550);
                var length = Math.floor(game.Utils.ggdl(header1.localToGlobal().x, header2.localToGlobal().x, header1.localToGlobal().y, header2.localToGlobal().y)); //
                egret.Tween.get(image).wait(15 * (num / 2)).call(function () {
                    callback();
                }).to({
                    // horizontalCenter: header2.horizontalCenter + _.random(-20, 20),// + header2.width / 2,
                    // verticalCenter: header2.verticalCenter + 20 + _.random(-20, 20)// + header2.height / 2
                    x: header2.localToGlobal().x + 60 + _.random(-20, 20),
                    y: header2.localToGlobal().y + 130 + _.random(-20, 20)
                }, time, egret.Ease.cubicInOut).call(function () {
                    game.UIUtils.removeSelf(image);
                    ObjectPool.reclaim("sangong_coin_img", image);
                });
            });
        };
        SangongGameScene.prototype.updateZhuangjiaLiushui = function (gold) {
            var roomInfo = Global.roomProxy.roomInfo;
            var player = roomInfo.players[roomInfo.dealer];
            var header = this['header' + roomInfo.dealer];
            if (Global.roomProxy.checkIndexIsMe(roomInfo.dealer)) {
                Global.playerProxy.playerData.gold = Global.playerProxy.playerData.gold['add'](gold);
            }
            header.showLiushuiLabel(gold);
        };
        /**
         * 结算
         */
        SangongGameScene.prototype.roundSettlement = function (e) {
            //调用展示牌
            try {
                this.releaseKPUI();
                this.closeTipsGroup();
                var data = e.data;
                this.goldAni(data);
            }
            catch (e) {
            }
        };
        /**
         * 金币过滤。
         */
        SangongGameScene.prototype.goldAni = function (records) {
            var _this = this;
            var xian2zhuangRecords = [];
            var zhuang2xianRecords = [];
            var dealerRecords;
            var roomInfo = Global.roomProxy.roomInfo;
            //把庄家流水过滤出来
            for (var key in records) {
                var record = records[key];
                record.index = key;
                if (key != roomInfo.dealer + "") {
                    if (record.gainGold > 0) {
                        zhuang2xianRecords.push(record);
                    }
                    else {
                        xian2zhuangRecords.push(record);
                    }
                }
                else {
                    dealerRecords = record;
                }
            }
            var showRecord2GoldAni = function (record) {
                var player = roomInfo.players[record.index];
                var dirIndex = _this.directions[record.index];
                var header = _this.getHeaderByIndex(record.index);
                var sum = record.gainGold;
                player.gold = player.gold['add'](sum);
                if (Global.roomProxy.checkIndexIsMe(record.index)) {
                    Global.playerProxy.playerData.gold = Global.playerProxy.playerData.gold['add'](sum);
                }
                if (sum > 0) {
                    _this.showGold2Header(_this.directions[roomInfo.dealer], dirIndex);
                }
                else {
                    _this.showGold2Header(dirIndex, _this.directions[roomInfo.dealer]);
                }
            };
            async.waterfall([
                function (callback) {
                    //闲家飞庄家
                    if (xian2zhuangRecords.length == 0) {
                        callback();
                        return;
                    }
                    for (var i = 0; i < xian2zhuangRecords.length; i++) {
                        showRecord2GoldAni(xian2zhuangRecords[i]);
                    }
                    _this.setAutoTimeout(callback, _this, 1000); //1500 smart缩短等待时间
                },
                function (callback) {
                    //庄家飞闲家
                    if (zhuang2xianRecords.length == 0) {
                        callback();
                        return;
                    }
                    for (var i = 0; i < zhuang2xianRecords.length; i++) {
                        showRecord2GoldAni(zhuang2xianRecords[i]);
                    }
                    _this.setAutoTimeout(callback, _this, 700); //1000
                }
            ], function (data, callback) {
                //庄家飞闲家		
                var length = xian2zhuangRecords.length + zhuang2xianRecords.length;
                var playMusic = true;
                if (zhuang2xianRecords.length == length) {
                    //去掉同赔 smart
                    // SoundManager.getInstance().playEffect("poker_tp_mp3")
                    // PukerUtils.showZJTongPei_sg(this.effectGroup);
                    playMusic = false;
                }
                else if (xian2zhuangRecords.length == length) {
                    //smart 去掉同赢
                    //SoundManager.getInstance().playEffect("poker_tc_mp3")
                    //PukerUtils.showZJTongChi_sg(this.effectGroup);
                    playMusic = false;
                }
                for (var key in records) {
                    var player = roomInfo.players[key];
                    var header = _this.getHeaderByIndex(key);
                    var lishuis = records[key];
                    //先统计总数
                    var sum = lishuis.gainGold;
                    if (key == roomInfo.dealer + "") {
                        player.gold = player.gold['add'](sum);
                        if (Global.roomProxy.checkIndexIsMe(key)) {
                            Global.playerProxy.playerData.gold = Global.playerProxy.playerData.gold['add'](sum);
                            // header.showWinPng(sum);
                            if (sum > 0) {
                                NiuniuUtils.showWin();
                            }
                        }
                    }
                    if (Global.roomProxy.checkIndexIsMe(key)) {
                        // header.showWinPng(sum);
                        // this.showYouWin();
                        if (sum > 0) {
                            _this.showYouWin();
                            if (playMusic) {
                                NiuniuUtils.showWin();
                            }
                        }
                        else {
                            //smart 
                            _this.showMineDB("sg_lose");
                        }
                    }
                    header.showLiushuiLabel(sum);
                    //判断通吃或者通赔
                }
                _this.setAutoTimeout(function () {
                    _this.allowBack = true;
                    _this.restartBtn.visible = true;
                }, _this, 2000);
            });
        };
        /**
         * 展现玩家头像
         */
        SangongGameScene.prototype.showHeaders = function () {
            var players = Global.roomProxy.getPlayers();
            var zhuangId = Global.roomProxy.roomInfo.dealer; //换到抢庄的地方去。
            for (var key in players) {
                var dir = this.directions[key];
                var player = this['player' + dir];
                var header = this['header' + dir];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this['cards' + dir];
                }
                else {
                    var cards = this['cards' + dir];
                    cards.visible = false;
                }
                header.initWithPlayer(players[key]);
                header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
                header.exchange45(dir);
                player.visible = true;
                header.visible = true;
            }
        };
        SangongGameScene.prototype.runFapaiStep = function () {
        };
        SangongGameScene.prototype.runXuanpaiStep = function () {
            this.duanXainLookPais();
            var roomInfo = Global.roomProxy.roomInfo;
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var player = players[key];
                var dirIndex = this.directions[key];
                var header = this.getHeaderByIndex(key);
                if (!game.Utils.valueEqual(key, roomInfo.dealer)) {
                    header.showBeishu(player.addAnte);
                }
            }
        };
        /**
         * 翻牌
         */
        SangongGameScene.prototype.fanpai = function () {
            return __awaiter(this, void 0, void 0, function () {
                var fp, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.fpBtn.visible = false;
                            this.fpBtnGroup.visible = false;
                            fp = ServerPostPath.game_sangongHandler_c_openCard;
                            data = {};
                            return [4 /*yield*/, Global.pomelo.request(fp, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                this.fpBtn.visible = true;
                                this.fpBtnGroup.visible = true;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 开始开牌
         */
        SangongGameScene.prototype.startOpenCard = function (e) {
            this.timeBar.visible = true;
            this.fpBtn.visible = true;
            this.fpBtnGroup.visible = true;
        };
        /**
         * 开牌，有玩家开牌，就有推送
         */
        SangongGameScene.prototype.openCard = function (e) {
            var _this = this;
            var data = e.data;
            var player = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
            player.handCards = data.handCards;
            var handCards = data.handCards;
            var playerIndex = data.playerIndex;
            var roundPattern = data.roundPattern;
            //samrt
            player.roundPattern = data.roundPattern;
            var dirIndex = this.directions[playerIndex];
            var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
            if (data.playerIndex == Global.roomProxy.getMineIndex()) {
                var cards = this['cards' + dirIndex];
                cards.renderByList(handCards);
                this.fpBtn.visible = false;
                this.fpBtnGroup.visible = false;
                if (!this.findNotKaiPaiOver()) {
                    this.showTipsGroup("等待其他玩家开牌");
                }
                else {
                    this.closeTipsGroup();
                    this.timeBar.visible = false;
                }
            }
            else {
                var cards = this['cards' + dirIndex];
                cards.renderByList(handCards);
                if (this.findNotKaiPaiOver()) {
                    this.closeTipsGroup();
                    //this.timeBar.visible = false;
                }
            }
            this.setAutoTimeout(function () {
                _this.showNiu(roundPattern, playerIndex);
            }, this, 400);
            this.playSoundBySex(playerData.sex, roundPattern, "sg_sex_");
        };
        /**
         * 播放出牌的声音。
         * sex性别，value打的牌面值。
         */
        SangongGameScene.prototype.playSoundBySex = function (sex, value, template) {
            var sexStr = sex == 1 ? "male" : "female";
            template = template.replace("sex", sexStr) + value + "_mp3";
            SoundManager.getInstance().playEffect(template);
        };
        /**
         * 开牌完成
         */
        SangongGameScene.prototype.openCardFinsh = function (e) {
            this.timeBar.visible = false;
        };
        /**
         * 展示不同时间节点状态
         */
        SangongGameScene.prototype.showRunTimeByStep = function (step) {
            switch (step) {
                case SangongStep.QIANG_ZHUANG:
                    this.timeBar.visible = true;
                    this.runQzStep();
                    break;
                case SangongStep.FAPAI:
                    // this.timeBar.visible = false;
                    this.runFapaiStep();
                    break;
                case SangongStep.KAIPAI:
                case SangongStep.XUANPAI:
                case SangongStep.CLOSE:
                    this.timeBar.visible = true;
                    this.runXuanpaiStep();
                    break;
                case SangongStep.ADDANTE:
                    this.timeBar.visible = true;
                    this.runAddanteStep();
                    break;
            }
        };
        /**
         * 翻牌效果，就是把扣下的牌翻过来。
         */
        SangongGameScene.prototype.turnOutPoker = function (card) {
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var dir = this.directions[key];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this['cards' + dir];
                    cards.turnOutPoker_me(card);
                }
                else {
                    var cards = this['cards' + dir];
                    cards.turnOutPoker_others();
                }
            }
        };
        /**
         * 游戏结束
         * @param  {egret.TouchEvent} e
         */
        SangongGameScene.prototype.roomFinished = function (e) {
            var _this = this;
            _super.prototype.roomGameOver.call(this, e);
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = SangongStep.CLOSE;
            this.status = SangongStatus.close;
            this.timeBar.visible = false;
            this.timeBar.removeTimer();
            // this.showRunTimeByStep
            if (data.status == 2) {
                Global.alertMediator.addAlert("牌局异常结束,请联系客服", function () {
                    _this.backHall();
                }, null, true);
            }
        };
        SangongGameScene.prototype.createPokers = function () {
            var length = Global.roomProxy.getPlayersLength() || 5;
            for (var i = length * 5 - 1; i >= 0; i--) {
                var tempPokers = ObjectPool.produce("niuniu_poker", sangong.SangongCard);
                if (!tempPokers) {
                    tempPokers = new sangong.SangongCard();
                }
                this.effectGroup.addChild(tempPokers);
                tempPokers.name = "poker" + i;
                tempPokers.scaleX = tempPokers.scaleY = 0.55;
                tempPokers.verticalCenter = -178;
                tempPokers.horizontalCenter = 0.05 - i * 0.08;
            }
        };
        /**
         * 发牌
         */
        SangongGameScene.prototype.startMove = function () {
            var _this = this;
            var count = 1;
            var length = Global.roomProxy.getPlayersLength() || 5;
            var listArr = [];
            for (var i = 0; i < length; i++) {
                listArr[i] = i;
            }
            async.eachSeries(listArr, function (data, callback) {
                var time1 = 0;
                var _loop_1 = function (i) {
                    var poker = _this.effectGroup.getChildByName("poker" + i);
                    var time = (150 + (50 * time1));
                    egret.Tween.get(poker)
                        .to({ verticalCenter: _this["pl" + count].verticalCenter, horizontalCenter: _this["pl" + count].horizontalCenter }, (150 + (50 * time1)));
                    _this.setAutoTimeout(function () {
                        game.UIUtils.removeSelf(poker);
                        ObjectPool.reclaim("niuniu_poker", poker);
                    }, _this, time);
                    time1++;
                };
                // if (!Global.runBack) {
                for (var i = data * 5; i < (data + 1) * 5; i++) {
                    _loop_1(i);
                }
                // }
                _this.setAutoTimeout(function () {
                    _this["pl" + count].visible = false;
                    _this['cards' + count].visible = true;
                    _this['cards' + count].cardAnimation();
                    for (var i = 0; i < 20; i++) {
                        NiuniuUtils.fapai();
                    }
                    count++;
                    callback();
                }, _this, 150);
            }, function () {
                _this.setAutoTimeout(function () {
                    //	this.showRunTimeByStep(Global.roomProxy.roomInfo.roundStatus);
                }, _this, 1000);
            });
        };
        SangongGameScene.prototype.tweenSync = function (node, showTime, hideTime) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            NiuniuUtils.playDz();
                            egret.Tween.get(node).to({ visible: true }, showTime).to({ visible: false }, hideTime).call(function () {
                                resolve();
                            });
                        })];
                });
            });
        };
        SangongGameScene.prototype.randomEstates = function () {
            return __awaiter(this, void 0, void 0, function () {
                var players, zhuangId, dealers, showCount, header, i, dir, header_1, header_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            players = Global.roomProxy.roomInfo.randomDealers;
                            zhuangId = Global.roomProxy.roomInfo.dealer;
                            dealers = this.directions[zhuangId];
                            showCount = 3;
                            this.qzLength = players.length;
                            if (!(players.length == 1 || Global.runBack)) return [3 /*break*/, 1];
                            header = this['header' + dealers];
                            NiuniuUtils.playDz();
                            header.headerImage_k.visible = true;
                            header.showIsZhuang(true);
                            showCount = 0;
                            header.hideBeishu();
                            return [2 /*return*/];
                        case 1:
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < players.length)) return [3 /*break*/, 5];
                            dir = this.directions[players[i]];
                            header_1 = this['header' + dir];
                            header_1.hideBeishu();
                            return [4 /*yield*/, this.tweenSync(header_1.headerImage_k, 50, 50)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            showCount--;
                            _a.label = 6;
                        case 6:
                            if (showCount > 0) return [3 /*break*/, 1];
                            _a.label = 7;
                        case 7:
                            header_2 = this['header' + dealers];
                            header_2.headerImage_k.visible = true;
                            if (Global.runBack) {
                                header_2.showIsZhuang(true);
                                header_2.hideBeishu();
                            }
                            else {
                                egret.Tween.get(header_2.headerImage_k).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).call(function () {
                                    header_2.showIsZhuang(true);
                                    header_2.hideBeishu();
                                }, this);
                            }
                            _a.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        SangongGameScene.prototype.showYouWin = function () {
            // let winDb = new DBComponent("sg_win");
            // winDb.callback = function () {
            // }
            // this.effectGroup.addChild(winDb);
            // winDb.verticalCenter = 200;
            // winDb.horizontalCenter = 0;
            // winDb.playDefault(1);
            // winDb.playNamesAndLoop(["sg_win", "sg_win_loop"]);
            //smart 龙骨动画
            this.showMineDB("sg_win");
        };
        SangongGameScene.prototype.showMineDB = function (name) {
            var winDb = new DBComponent(name);
            this.mineEffect.addChild(winDb);
            winDb.callback = function () {
                game.UIUtils.removeSelf(winDb);
                winDb = null;
            };
            winDb.playByFilename(1);
        };
        /**
         * 交换group位子
         */
        SangongGameScene.prototype.changePlayerGroup = function (index1, index2) {
            this['player' + index1].bottom = this['player' + index2].bottom;
            this['player' + index1].left = this['player' + index2].left;
            this['player' + index1].top = this['player' + index2].top;
            this['player' + index1].right = this['player' + index2].right;
            this['player' + index1].verticalCenter = this['player' + index2].verticalCenter;
            this['player' + index1].horizontalCenter = this['player' + index2].horizontalCenter;
            this['player' + index1].width = this['player' + index2].width;
            this['player' + index1].height = this['player' + index2].height;
            this['header' + index1].x = this['header' + index2].x;
            this['header' + index1].y = this['header' + index2].y;
            this['cards' + index1].x = this['cards' + index2].x;
            this['cards' + index1].y = this['cards' + index2].y;
            this['pl' + index1].verticalCenter = this['pl' + index2].verticalCenter;
            this['pl' + index1].horizontalCenter = this['pl' + index2].horizontalCenter;
            this.tipsData[index1] = index2;
        };
        /**
         * 展示点数
         */
        SangongGameScene.prototype.showNiu = function (pt, direction) {
            var dir = this.directions[direction];
            var niuFen = new sangong.SangongFen(pt);
            var pl = this["player" + dir];
            pl.addChild(niuFen);
            switch (dir) {
                case "1":
                    niuFen.x = 235;
                    niuFen.y = 235;
                    break;
                case "2":
                    niuFen.x = -1;
                    niuFen.y = 308;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "3":
                    //niuFen.x = -170;
                    niuFen.x = 0;
                    niuFen.y = 308;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "4":
                    niuFen.x = -8;
                    niuFen.y = 308;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "5":
                    // niuFen.x = 143;
                    // niuFen.y = 210;
                    niuFen.x = -1;
                    niuFen.y = 308;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
            }
        };
        /**
         * 断线重连后展示玩家的手牌
         */
        SangongGameScene.prototype.duanXainLookPais = function () {
            var _this = this;
            var players = Global.roomProxy.getPlayers();
            var _loop_2 = function (key) {
                var player = players[key];
                var dirIndex = this_1.directions[key];
                var header = this_1.getHeaderByIndex(key);
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this_1['cards' + dirIndex];
                    if (player.isPlayCards && player.handCards && player.handCards.length > 1) {
                        cards.renderByList(player.handCards, 1);
                        this_1.setAutoTimeout(function () {
                            _this.showNiu(player.roundPattern, dirIndex);
                        }, this_1, 400);
                        cards.visible = true;
                        this_1.fpBtn.visible = false;
                        this_1.fpBtnGroup.visible = false;
                    }
                    else {
                        cards.renderByList2(3);
                        cards.visible = true;
                        if (Global.roomProxy.roomInfo.roundStatus == SangongStep.XUANPAI || Global.roomProxy.roomInfo.roundStatus == SangongStep.FAPAI) {
                            this_1.fpBtn.visible = true;
                            this_1.fpBtnGroup.visible = true;
                        }
                        else {
                            this_1.fpBtn.visible = false;
                            this_1.fpBtnGroup.visible = false;
                        }
                    }
                }
                else {
                    var cards = this_1['cards' + this_1.directions[key]];
                    if (player.isPlayCards && player.handCards && player.handCards.length > 0) {
                        cards.renderByList(player.handCards);
                        this_1.setAutoTimeout(function () {
                            _this.showNiu(player.roundPattern, dirIndex);
                        }, this_1, 400);
                        cards.visible = true;
                    }
                    else {
                        var hands = player.handCards || 3;
                        cards.renderByList(hands);
                        cards.visible = true;
                    }
                }
            };
            var this_1 = this;
            for (var key in players) {
                _loop_2(key);
            }
        };
        /**屏幕旋转 玩家手牌UI重绘 */
        SangongGameScene.prototype.oritationChangeLookPais = function () {
            var _this = this;
            var players = Global.roomProxy.getPlayers();
            var _loop_3 = function (key) {
                var player = players[key];
                var dirIndex = this_2.directions[key];
                var header = this_2.getHeaderByIndex(key);
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this_2['cards' + dirIndex];
                    if (player.handCards && player.handCards.length > 1) {
                        var hands = player.handCards || 3;
                        cards.renderByList(player.handCards, 1);
                        this_2.setAutoTimeout(function () {
                            _this.showNiu(player.roundPattern, dirIndex);
                        }, this_2, 400);
                        cards.visible = true;
                        this_2.fpBtn.visible = false;
                        this_2.fpBtnGroup.visible = false;
                    }
                }
                else {
                    var cards = this_2['cards' + this_2.directions[key]];
                    if (player.handCards && player.handCards.length > 0) {
                        cards.renderByList(player.handCards);
                        this_2.setAutoTimeout(function () {
                            _this.showNiu(player.roundPattern, dirIndex);
                        }, this_2, 400);
                        cards.visible = true;
                    }
                }
            };
            var this_2 = this;
            for (var key in players) {
                _loop_3(key);
            }
        };
        /**
         * 断线重连
         */
        SangongGameScene.prototype.reconnectSuc = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var reqData;
                return __generator(this, function (_a) {
                    //对局已经结束不做处理
                    if (this.allowBack) {
                        Global.alertMediator.addAlert("对局已经结束", null, null, true);
                        this.backHall();
                        return [2 /*return*/];
                    }
                    reqData = Global.gameProxy.lastGameConfig;
                    if (!reqData)
                        reqData = {};
                    if (!Global.roomProxy.roomInfo || !Global.roomProxy.roomInfo.roomId) {
                        this.backHall();
                        return [2 /*return*/];
                    }
                    reqData.roomId = Global.roomProxy.roomInfo.roomId;
                    this.reconnectCall(reqData);
                    return [2 /*return*/];
                });
            });
        };
        return SangongGameScene;
    }(game.BaseGameScene));
    sangong.SangongGameScene = SangongGameScene;
    __reflect(SangongGameScene.prototype, "sangong.SangongGameScene");
})(sangong || (sangong = {}));
