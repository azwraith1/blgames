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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaGameScene = (function (_super) {
        __extends(ZajinhuaGameScene, _super);
        function ZajinhuaGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "zjh";
            _this.fcsSet = true;
            /**
             * 判断玩家是否能操作
             */
            _this.isQp = false;
            _this.isBp = false;
            _this.isKp = false;
            _this.isJz = false;
            _this.isGz = false;
            /**
             * 总下注
             */
            _this.flt = 0;
            /**
             * 自带监听
             */
            _this.flag = false;
            _this.flag1 = false;
            _this.flag2 = false;
            _this.isZdgz = false; //自动跟注;
            /**
             * 比牌
             */
            _this.isTwoPlayer = false;
            /**
             * 给每个玩家一张一张的发牌;
             * 根据每个玩家本地座位号实现。
             */
            _this.playerSetNumber = [];
            _this.showCount = 0;
            /**
             * 创造金币
             */
            _this.iconList = [];
            _this.cmList1 = [];
            _this.cmNumList = []; //玩家加注时候的筹码数字大小
            /**
             * 玩家加注
             */
            _this.lock = false;
            /**
             * 展示玩家,重连。
             */
            _this.onlineCM = [];
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_ZJHGAME;
            /**
             * 对应游戏大厅
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_ZJHSELECT;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_ZJHGAME;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_ZJH_MATCHING;
            _this.skinName = new ZajinhuaGameSkin();
            return _this;
        }
        ZajinhuaGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                var sceneId, gameConfig, publicMsg, players, key, dir, i, button, handler, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _super.prototype.createChildren.call(this);
                            this.proxy = Global.roomProxy;
                            this.timeBar.visible = false;
                            sceneId = Global.roomProxy.roomInfo.sceneId;
                            gameConfig = Global.gameProxy.lastGameConfig;
                            this.diFen.text = "底分：" + gameConfig.diFen;
                            this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 5);
                            this.chushihua();
                            this.createDBComponents();
                            if (!Global.roomProxy.reconnect) {
                                this.createPokers();
                            }
                            this.showHeaders();
                            SoundManager.getInstance().playMusic("zjh_bgm_mp3");
                            publicMsg = PMDComponent.instance;
                            publicMsg.anchorOffsetY = 24;
                            publicMsg.horizontalCenter = 10;
                            publicMsg.top = 40;
                            this.recordBtn.top = this.helpBtn.top = this.settingBtn.top = this.xlBtn.top;
                            players = Global.roomProxy.getPlayers();
                            for (key in players) {
                                if (Global.roomProxy.getMineIndex() == key) {
                                    if (Global.roomProxy.fcsIndex == 1) {
                                        this.fcs.alpha = 1;
                                    }
                                    else {
                                        this.fcs.alpha = 0;
                                    }
                                }
                                dir = this.directions[key];
                                this.playerSetNumber.push(Number(dir));
                            }
                            this.inits();
                            for (i = 1; i <= 5; i++) {
                                button = this["yzBtn" + i];
                                button.addTouchOn();
                            }
                            handler = ServerPostPath.game_zjhHandler_c_timeOutProject;
                            data = { project: Global.roomProxy.fcsIndex };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code == 0) {
                            }
                            //clubnew
                            this.isClubGame = Global.roomProxy.roomInfo.tableId != undefined;
                            if (this.isClubGame) {
                                this.recordBtn.visible = false;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ZajinhuaGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.ZJH_CM_TOUCH, this.rbwarTouch, this);
            CF.aE(ENo.ZJH_HEADER_TOUCH, this.playerTouch, this);
            CF.aE(ServerNotify.s_addBet, this.s_addBet, this);
            CF.aE(ServerNotify.s_abandonCard, this.s_abandonCard, this);
            CF.aE(ServerNotify.s_lookCard, this.s_lookCard, this);
            CF.aE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
            CF.aE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
            CF.aE(ServerNotify.s_curPlay, this.s_curPlay, this);
            CF.aE(ServerNotify.s_countdown, this.s_countdown, this);
            CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.aE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
            CF.aE(ServerNotify.s_guZhuYiZhi, this.s_guZhuYiZhi, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_roundMaxTurn, this.s_roundMaxTurn, this);
            CF.aE(ServerNotify.s_notify, this.guZhuYiZhiNotify, this);
            CF.aE(ServerNotify.s_operation, this.operation, this);
        };
        ZajinhuaGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeAllListen();
            this.clearAllTimeout();
        };
        ZajinhuaGameScene.prototype.removeAllListen = function () {
            CF.rE(ENo.ZJH_CM_TOUCH, this.rbwarTouch, this);
            CF.rE(ENo.ZJH_HEADER_TOUCH, this.playerTouch, this);
            CF.rE(ServerNotify.s_addBet, this.s_addBet, this);
            CF.rE(ServerNotify.s_abandonCard, this.s_abandonCard, this);
            CF.rE(ServerNotify.s_lookCard, this.s_lookCard, this);
            CF.rE(ServerNotify.s_compareCardResult, this.s_compareCardResult, this);
            CF.rE(ServerNotify.s_playerHandCard, this.s_playerHandCard, this);
            CF.rE(ServerNotify.s_curPlay, this.s_curPlay, this);
            CF.rE(ServerNotify.s_countdown, this.s_countdown, this);
            CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.rE(ServerNotify.s_roomFinished, this.s_roomFinished, this);
            CF.rE(ServerNotify.s_guZhuYiZhi, this.s_guZhuYiZhi, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_roundMaxTurn, this.s_roundMaxTurn, this);
            CF.rE(ServerNotify.s_notify, this.guZhuYiZhiNotify, this);
            CF.rE(ServerNotify.s_operation, this.operation, this);
            this.box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.box1, this);
        };
        ZajinhuaGameScene.prototype.operation = function (e) {
            var data = e.data;
            this.isBp = data.Compare;
            this.isQp = data.canAbandon;
            this.isKp = data.canLook;
            this.isJz = data.Add;
            this.isGz = data.follow;
            if (this.btnGroup) {
                this.qpBtn.visible = this.isQp;
                this.qpBtn0.visible = !this.isQp;
                if (!this.isZdgz) {
                    this.bpBtn.visible = this.isBp;
                    this.bpBtn0.visible = !this.isBp;
                }
                this.openCard.visible = this.isKp;
            }
        };
        /**
         * 测试所用，后期要删除
         */
        ZajinhuaGameScene.prototype.notifyCardsForTest = function (e) {
            var _this = this;
            var data = e.data;
            var playerIndex = data.playerIndex;
            var pattern = data.roundPattern;
            var cards = data.cards.value;
            var pais = this.exchangeCards(cards);
            if (Global.roomProxy.getMineIndex() == playerIndex) {
                if (pais.length > 0) {
                    this.cards1.renderByList(this.sortPokers(pais), true);
                    this.openCard.visible = false;
                    this['timeout1'] = this.setAutoTimeout(function () {
                        _this.cards1.showFen(pattern);
                    }, this, 150);
                }
            }
            else {
                var pi = this.directions[playerIndex];
                var cd_1 = this["cards" + pi];
                var roomInfo = Global.roomProxy.roomInfo;
                if (!roomInfo) {
                    return;
                }
                var players = roomInfo.players;
                if (pais.length > 0) {
                    cd_1.renderByList(this.sortPokers(pais), true);
                    this.setAutoTimeout(function () {
                        cd_1.showFen(pattern);
                    }, this, 150);
                }
            }
        };
        ZajinhuaGameScene.prototype.box1 = function (e) {
            var _this = this;
            if (this.box_texts.visible) {
                return;
            }
            this.box_texts.left = 10;
            this.box_texts.verticalCenter = -170;
            this.box_texts.visible = true;
            this.box_texts.scaleX = this.box_texts.scaleY = 0;
            egret.Tween.get(this.box_texts).to({ scaleX: 1.2, scaleY: 1.2 }, 200).to({ scaleX: 1, scaleY: 1 }, 100).wait(3000).call(function () {
                _this.box_texts.visible = false;
            });
        };
        ZajinhuaGameScene.prototype.clearAllTimeout = function () {
            for (var i = 1; i <= 50; i++) {
                egret.clearTimeout(this['timeout' + i]);
                this['timeout' + i] = null;
            }
        };
        /**
         * 断线重连
         */
        ZajinhuaGameScene.prototype.reconnectSuc = function (e) {
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
        /**
         * 最大上限后比牌
         */
        ZajinhuaGameScene.prototype.s_roundMaxTurn = function (e) {
            var _this = this;
            var d = e.data;
            game.UIUtils.removeSelf(this.timeBar);
            var startImage = new eui.Image("zjh_yxks_png_png");
            this.addChild(startImage);
            game.UIUtils.setAnchorPot(startImage);
            startImage.scaleX = 1;
            startImage.scaleY = 1;
            startImage.verticalCenter = -20;
            startImage.horizontalCenter = 0;
            egret.Tween.get(startImage).to({
                scaleX: 0.8,
                scaleY: 0.8,
            }, 500, egret.Ease.backOut).wait(700).to({ alpha: 0 }, 300).call(function () {
                game.UIUtils.removeSelf(startImage);
            }, this).call(function () {
                _this.s_roundMaxTurn_next(d);
            }, this);
        };
        ZajinhuaGameScene.prototype.s_roundMaxTurn_next = function (d) {
            var _this = this;
            var pi = d.playerIndex;
            var result = d.result;
            var header = this.directions[pi];
            var pais = this.exchangeCards(d.cards.value);
            if (Global.roomProxy.getMineIndex() == pi) {
                this.openCard.visible = false;
                if (pais.length > 0) {
                    if (!this.isShowCardsNum(pi)) {
                        this.cards1.renderByList(this.sortPokers(pais), true);
                        this['timeout13'] = this.setAutoTimeout(function () {
                            _this.cards1.showFen(d.roundPattern);
                        }, this, 150);
                    }
                }
                this.caozuoBtnGroup(1);
                if (result == 1) {
                    var ti = this.header1.getChildByName("1");
                    if (ti) {
                        ti.visible = false;
                        game.UIUtils.removeSelf(ti);
                    }
                }
                else {
                    this.setAutoTimeout(function () {
                        _this.header1.bpwin2lose(true);
                        _this.cards1.paiBianHui();
                        _this.header1.bplose(true);
                    }, this, 1500);
                }
            }
            if (header != 1) {
                var cd1_1 = this["cards" + header];
                cd1_1.renderByList(this.sortPokers(pais), true);
                this['timeout14'] = this.setAutoTimeout(function () {
                    cd1_1.showFen(d.roundPattern);
                }, this, 150);
                if (result == 1) {
                    this.otherPlayerTimeVisible(pi);
                }
                else {
                    this.setAutoTimeout(function () {
                        _this["header" + header].bpwin2lose();
                        cd1_1.paiBianHui();
                        _this["gz2jz" + header].source = "";
                        _this["header" + header].bplose(true);
                    }, this, 1500);
                }
            }
        };
        /**
         * 孤注一掷；
                playerIndex: 1, //玩家座位号
                result: 0, // 0.失败  1.成功
                design:true;
        */
        ZajinhuaGameScene.prototype.s_guZhuYiZhi = function (e) {
            var _this = this;
            var d = e.data;
            var pi = d.playerIndex;
            var header = this.directions[pi];
            var design = d.design;
            var image = this["gz2jz" + header];
            image.visible = false;
            this['gzyzGroup' + header].visible = false;
            image.source = "";
            if (Global.roomProxy.checkIndexIsMe(pi)) {
                this.header1.updateGold(0);
            }
            //自己孤注一掷成功
            if (d.result == 1) {
                //this.sourcePlayer(d.playerIndex);
                var pais1 = this.exchangeCards(d.cards.value);
                if (Global.roomProxy.getMineIndex() == pi) {
                    if (design) {
                        this.player2plyerbyboom(pi);
                    }
                    this.caozuoBtnGroup(1);
                    this.openCard.visible = false;
                    //这里不需要给牌面赋值，会在另一个接口推牌。
                }
                if (header != 1) {
                    var cd1 = this["cards" + header];
                    if (design) {
                        this.player2plyerbyboom(pi);
                    }
                    this["gz2jz" + header].source = "";
                }
            }
            //自己孤注一掷失败，只返回自己。
            if (d.result == 2) {
                //标记失败玩家。
                //this.sourcePlayer(d.playerIndex);
                this.setPlayerStus(4, pi);
                this["header" + header].bplose(true);
                var pais_1 = this.exchangeCards(d.cards.value);
                if (Global.roomProxy.getMineIndex() == pi) {
                    if (pais_1.length > 0) {
                        this.boom2plyer(header);
                        var ti = this.header1.getChildByName("1");
                        if (ti) {
                            ti.visible = false;
                            game.UIUtils.removeSelf(ti);
                        }
                        this['timeout15'] = this.setAutoTimeout(function () {
                            _this.caozuoBtnGroup(1);
                            _this.header1.bpwin2lose(true);
                            _this.cards1.paiBianHui();
                            _this.openCard.visible = false;
                            _this['timeout16'] = _this.setAutoTimeout(function () {
                                _this.showRestartBtn();
                            }, _this, 200);
                            if (_this.isShowCardsNum(pi)) {
                                return;
                            }
                            _this.cards1.renderByList(_this.sortPokers(pais_1), true);
                            _this['timeout17'] = _this.setAutoTimeout(function () {
                                _this.cards1.showFen(d.roundPattern);
                            }, _this, 150);
                        }, this, 1500);
                    }
                }
                if (header != 1) {
                    this.boom2plyer(header);
                    this.otherPlayerTimeVisible(header);
                    this['timeout18'] = this.setAutoTimeout(function () {
                        var cd1 = _this["cards" + header];
                        _this["header" + header].bpwin2lose();
                        cd1.paiBianHui();
                        cd1.showFen(10);
                        _this["gz2jz" + header].source = "";
                    }, this, 1500);
                }
            }
            //广播孤注一掷失败的玩家。
            if (d.result == 0) {
                var pais = this.exchangeCards(d.cards.value);
                if (Global.roomProxy.getMineIndex() == pi) {
                    if (pais.length > 0) {
                        this.cards1.renderByList(this.sortPokers(pais), true);
                        this['timeout19'] = this.setAutoTimeout(function () {
                            _this.cards1.showFen(d.roundPattern);
                        }, this, 150);
                        this.header1.bpwin2lose(true);
                        this.cards1.paiBianHui();
                        this.openCard.visible = false;
                        this.caozuoBtnGroup(1);
                    }
                }
                this["header" + header].bplose(true);
                if (header != 1) {
                    var cd1_2 = this["cards" + header];
                    cd1_2.renderByList(this.sortPokers(pais), true);
                    this['timeout20'] = this.setAutoTimeout(function () {
                        cd1_2.showFen(d.roundPattern);
                    }, this, 150);
                    this["header" + header].bpwin2lose();
                    cd1_2.paiBianHui();
                    this["gz2jz" + header].source = "";
                }
            }
        };
        /**
         * 广播孤注一掷
         */
        ZajinhuaGameScene.prototype.guZhuYiZhiNotify = function (e) {
            var _this = this;
            var d = e.data;
            var pi = this.directions[d.index];
            var gp = this["gzyzGroup" + pi];
            var img = this["gz2jz" + pi];
            img.visible = false;
            if (Global.roomProxy.getMineIndex() == d.index) {
                this.gzyzMine = new DBComponent("zjh_gzyz");
                this.gzyzGroup1.addChild(this.gzyzMine);
                this.gzyzMine.x = 0;
                this.gzyzMine.y = 10;
                this.gzyzMine.scaleX = this.gzyzMine.scaleY = 0.8;
                var time = this.header1.getChildByName(pi);
                if (time) {
                    game.UIUtils.removeSelf(time);
                }
                this.gzyzMine.playByFilename(1);
                zjh.ZajinhuaUtils.playGzyz(this.findPlayerSex(d.index));
                this.gzyzMine.callback = function () {
                    _this['timeout21'] = _this.setAutoTimeout(function () {
                        _this.gzyzMine.visible = false;
                    }, _this, 800);
                };
            }
            else {
                if (pi != 1) {
                    img.source = "";
                    var gzyz_1 = new DBComponent("zjh_gzyz");
                    this.otherPlayerTimeVisible(pi);
                    gp.addChild(gzyz_1);
                    gzyz_1.scaleX = gzyz_1.scaleY = 0.5;
                    gzyz_1.x = -18;
                    gzyz_1.y = 10;
                    gzyz_1.playByFilename(1);
                    zjh.ZajinhuaUtils.playGzyz(this.findPlayerSex(d.index));
                    gzyz_1.callback = function () {
                        _this['timeout22'] = _this.setAutoTimeout(function () {
                            gzyz_1.visible = false;
                        }, _this, 800);
                    };
                }
            }
        };
        /**
         * 其他玩家时间操作
         */
        ZajinhuaGameScene.prototype.otherPlayerTimeVisible = function (player) {
            var header = this["header" + player];
            var ti = header.getChildByName(player);
            if (ti) {
                ti.visible = false;
                game.UIUtils.removeSelf(ti);
            }
        };
        /**
         * 是否看牌
         */
        ZajinhuaGameScene.prototype.isShowCardsNum = function (index) {
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                if (i = index) {
                    var s = players[i]["isLookCards"];
                    return s;
                }
            }
        };
        /**
         * 炸弹炸自己。
         */
        ZajinhuaGameScene.prototype.boom2plyer = function (header) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
            var gp = this["player" + header];
            var hd = this["header" + header];
            this.boom = new DBComponent("bomb");
            gp.addChild(this.boom);
            this.boom.name = "boom";
            this.boom.scaleX = this.boom.scaleY = 0.6;
            this.boom.x = hd.x + 50;
            this.boom.y = 50;
            this.boom.play("fire_drop", 1);
            zjh.ZajinhuaUtils.PlayBoom();
            this.boom.callback = function () {
                _this.boom.play("boom", 1);
                _this.boom.callback = function () {
                    _this.boom.visible = false;
                    if (gp.getChildByName("boom")) {
                        game.UIUtils.removeSelf(gp.getChildByName("boom"));
                    }
                };
            };
        };
        /**
         * 炸弹炸别人
         */
        ZajinhuaGameScene.prototype.player2plyerbyboom = function (pi) {
            return __awaiter(this, void 0, void 0, function () {
                var header, gp, hd, players, _loop_1, this_1, i;
                return __generator(this, function (_a) {
                    if (Global.runBack) {
                        return [2 /*return*/];
                    }
                    header = this.directions[pi];
                    gp = this["player" + header];
                    hd = this["header" + header];
                    players = this.findLivePlayer(pi);
                    if (!players) {
                        return [2 /*return*/];
                    }
                    _loop_1 = function (i) {
                        var boom = new DBComponent("bomb");
                        boom.name = "boom" + i;
                        gp.addChild(boom);
                        boom.x = hd.x + 20;
                        boom.y = hd.y + 60;
                        boom.scaleX = boom.scaleY = 0.6;
                        boom.play("rotation", -1);
                        var pi_1 = this_1.directions[players[i]];
                        var gp1 = this_1["player" + pi_1];
                        var hd1 = this_1["header" + pi_1];
                        var point = gp1.globalToLocal(boom.localToGlobal().x, boom.localToGlobal().y);
                        boom.x = point.x;
                        boom.y = point.y;
                        gp1.addChild(boom);
                        if (!Global.runBack) {
                            egret.Tween.get(boom).to({ x: hd1.x + 50, y: 60 }, 600 + (i * 200));
                            this_1.setAutoTimeout(function () {
                                boom.play("boom", 1);
                                zjh.ZajinhuaUtils.PlayBoom();
                                boom.callback = function () {
                                    if (gp1.getChildByName(boom.name)) {
                                        game.UIUtils.removeSelf(gp1.getChildByName(boom.name));
                                    }
                                };
                            }, this_1, 600 + (i * 200));
                        }
                    };
                    this_1 = this;
                    for (i = 0; i < players.length; i++) {
                        _loop_1(i);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 初始化玩家。
         */
        ZajinhuaGameScene.prototype.inits = function () {
            var room = Global.roomProxy.roomInfo;
            this.box.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.box1, this);
            this.lunci.text = "第" + room.curGameTurn + "/" + room.maxTurn + "轮";
            this.roomid.text = "牌局编号：" + room.roomId;
        };
        /**
         * 展现玩家头像
         */
        ZajinhuaGameScene.prototype.showHeaders = function () {
            var _this = this;
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var dir = this.directions[key];
                var player = this['player' + dir];
                var header = this['header' + dir];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this['cards' + dir];
                }
                else {
                    var cards = this['cards' + dir];
                }
                header.initWithPlayer(players[key]);
                header.setIndex(key);
                player.visible = true;
                header.visible = true;
                var goldGroup = this["playerYZGroup" + dir];
                if (goldGroup) {
                    goldGroup.visible = true;
                }
                this.updateShowPlayerBet(key, players[key]);
            }
            if (Global.roomProxy.reconnect || Global.runBack) {
                this.timeBar.startTime(this);
                this.timeBar.visible = true;
                var roomInfo = Global.roomProxy.roomInfo;
                this.showRunTimeByStep(roomInfo);
            }
            else {
                this.setAutoTimeout(function () {
                    _this.showStartAni();
                }, this, 500);
            }
        };
        /**
         * 开始游戏动画
         */
        ZajinhuaGameScene.prototype.showStartAni = function () {
            this.fapai_Promise();
        };
        /**
         * 倒计时
         */
        ZajinhuaGameScene.prototype.s_countdown = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            if (!roomInfo.countdown) {
                roomInfo.countdown = {};
            }
            roomInfo.countdown = data;
            game.DateTimeManager.instance.updateServerTime(data.start);
        };
        /**
         * 展现玩家当前下注总额
         * @param  {} playerIndex
         * @param  {} playerData
         */
        ZajinhuaGameScene.prototype.updateShowPlayerBet = function (playerIndex, playerData) {
            var dir = this.directions[playerIndex];
            var playerYzGroup = this["playerYZGroup" + dir];
            if (playerYzGroup) {
                playerYzGroup.visible = true;
                this["playerYzLabel" + dir].text = playerData.playerBet;
            }
        };
        /**
         *  // 玩家加注(玩家加注、跟注都返回这个消息)
                playerIndex: 1, //玩家座位号
                addBet: 10, //本次押注金额
                type: 0,//1，不加2，加,3比牌；
                playerBet: 205, //玩家总押注
                sumPlayerBet: 1200, //房间玩家总押注
         */
        ZajinhuaGameScene.prototype.s_addBet = function (e) {
            var data = e.data;
            this.zyzs(data.sumPlayerBet);
            var player = this.directions[data.playerIndex];
            var header = this["header" + player];
            var playerGroup = this["player" + player];
            var playerData = Global.roomProxy.getPlayerByIndex(data.playerIndex);
            playerData['playerBet'] = data.playerBet;
            this.updateShowPlayerBet(data.playerIndex, playerData);
            if (data.isAdd == 1) {
                this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this["header" + player], 3);
                header.updateGold(data.ownGold, false);
            }
            else {
                if (data.playerIndex == Global.roomProxy.getMineIndex() && data.type == 1) {
                    var player_1 = Global.roomProxy.getMineData();
                    if (!player_1) {
                        return;
                    }
                    if (player_1.isLookCards) {
                        this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, true), this.header1, player_1.sex);
                    }
                    else {
                        this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this.header1, player_1.sex);
                    }
                    this.header1.updateGold(data.ownGold, false);
                    this.cmYzGroup(2);
                    this.showBtnType(2);
                }
                else {
                    if (player != 1) {
                        var pi = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
                        if (pi.isLookCards) {
                            this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, true), this["header" + player], pi.sex);
                        }
                        else {
                            this.playerYzAni(data.addBet, data.type, this.findCmByMoney(data.addBet, false), this["header" + player], pi.sex);
                        }
                        header.updateGold(data.ownGold, false);
                        if (data.ownGold > 0) {
                            if (data.type == 3) {
                                var image = this["gz2jz" + player];
                                image.visible = true;
                                image.source = "";
                            }
                            if (data.type != 3) {
                                var image = this["gz2jz" + player];
                                image.visible = true;
                                image.alpha = 0;
                                image.source = RES.getRes(this.cz(data.type, player));
                                egret.Tween.get(image).to({ alpha: 1 }, 200);
                            }
                        }
                    }
                }
            }
        };
        /**
         * 单注
         */
        ZajinhuaGameScene.prototype.dyzs = function (num) {
            this.dyz.text = "单注：" + num;
        };
        ZajinhuaGameScene.prototype.zyzs = function (num) {
            this.zyz.text = "总注：" + num;
            if (num / Global.roomProxy.roomInfo.betBase > 150 && this.flt == 0) {
                this.flt = 1;
            }
        };
        /**
         * 根据玩家找性别。
         */
        ZajinhuaGameScene.prototype.findPlayerSex = function (index) {
            var player = Global.roomProxy.getPlayerByIndex(index);
            return player.sex;
        };
        /**
         * 跟注还是加注，还是弃牌
         */
        ZajinhuaGameScene.prototype.cz = function (num, index) {
            switch (num) {
                case 1:
                    // if (index == 2 || index == 3) {
                    return "zjh_gz_1_png";
                // }
                // return "zjh_gz_2_png"
                case 2:
                    // if (index == 2 || index == 3) {
                    return "zjh_jz_1_png";
            }
        };
        /**
         * 玩家弃牌
            playerIndex: 1, //玩家座位号
            addBet: 10, //本次押注金额
            playerBet: 205, //玩家总押注
                sumPlayerBet: 1200, //房间玩家总押注
         */
        ZajinhuaGameScene.prototype.s_abandonCard = function (e) {
            var _this = this;
            var data = e.data;
            var pi = this.directions[data.playerIndex];
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                if (Global.roomProxy.getMineIndex() == data.playerIndex) {
                    this['timeout23'] = this.setAutoTimeout(function () {
                        _this.mineDiscard(2);
                    }, this, 210);
                }
                if (i == data.playerIndex) {
                    players[i]["status"] = 2;
                }
            }
            if (pi != 1) {
                this.otherDiscard(pi);
            }
        };
        /**
         * 广播玩家看牌
                playerIndex: 1, //玩家座位号
         */
        ZajinhuaGameScene.prototype.s_lookCard = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                if (i == data.playerIndex) {
                    players[i]["isLookCards"] = true;
                }
            }
            var pi = this.directions[data.playerIndex];
            if (pi != 1) {
                var card = this["cards" + pi];
                card.showLookPai(true);
                card.showFen(6);
            }
        };
        ZajinhuaGameScene.prototype.createDBComponents = function () {
            this.pkDb = DBComponent.create("zjh_vs", "zjh_vs");
            this.bpGroupEffect.addChild(this.pkDb);
            this.pkDb.x = 400;
            this.pkDb.y = 140;
            this.pkDb.visible = false;
            this.pkDb.play_first("zjh_vs", 1);
            this.pkDb.callback = function () {
            };
            this.box = new DBComponent("zjh_xq");
            this.touchGroup.addChild(this.box);
            this.box.x = 50;
            this.box.y = GameConfig.curHeight() / 2 - 100;
            this.box.visible = false;
            this.box.playByTime("zjh_xq_wait", -1);
            this.zdgzDBs = DBComponent.create("zjh_autobutton", "zjh_autobutton");
            this.zdgzDB.addChild(this.zdgzDBs);
            this.zdgzDBs.x = 78;
            this.zdgzDBs.y = 35;
            this.zdgzDBs.visible = false;
            this.zdgzDBs.callback = function () {
            };
            this.win = new DBComponent("zjh_win");
            this.effectGroup.addChild(this.win);
            this.win.scaleX = this.win.scaleY = 0.6;
            this.win.horizontalCenter = 0;
            this.win.verticalCenter = -100;
            this.win.visible = false;
            this.win.callback = function () {
            };
            // this.win1 = new DBComponent("win_2_wait");
            // this.effectGroup.addChild(this.win1);
            // this.win1.width = 512;
            // this.win1.height = 512;
            // this.win1.visible = false;
            // this.win1.callback = () => {
            // }
            // this.win2 = new DBComponent("win_2");
            // this.effectGroup.addChild(this.win2);
            // this.win2.visible = false;
            // this.win2.width = 512;
            // this.win2.height = 512;
            // this.win2.callback = () => {
            // }
        };
        ZajinhuaGameScene.prototype.niuFenFDSX = function (num) {
            game.UIUtils.setAnchorPot(num);
            egret.Tween.get(num).to({ alpha: 1, scaleX: 1, scaleY: 1 }).to({ alpha: 1, scaleX: 0.6, scaleY: 0.6 }, 300);
        };
        /**
         * 玩家比牌
            winIndex: 1, //赢家座位号
            FailIndex: 2, //输家座位号
            sourceIndex: 2, //比牌发起者
            targetIndex: 1, //被比牌者
         */
        ZajinhuaGameScene.prototype.s_compareCardResult = function (e) {
            var data = e.data;
            this.timeBar.visible = false;
            this.bipai_Promise(data);
            this.closebiPai();
        };
        //比牌发起者,扣钱。
        ZajinhuaGameScene.prototype.sourcePlayer = function (sourceIndex) {
            if (Global.roomProxy.getMineIndex() == sourceIndex) {
                var player = Global.roomProxy.getMineData();
                if (!player) {
                    return;
                }
                if (player.isLookCards) {
                    if (player.gold <= Global.roomProxy.roomInfo.minYZ * 2) {
                        this.playerYzAni(player.gold, 3, this.findCmByMoney(player.gold, true), this.header1, 3);
                        this.header1.updateGold(-player.gold, true);
                    }
                    else {
                        this.playerYzAni(Global.roomProxy.roomInfo.minYZ * 2, 3, this.findCmByMoney(Global.roomProxy.roomInfo.minYZ * 2, true), this.header1, 3);
                        this.header1.updateGold(-Global.roomProxy.roomInfo.minYZ * 2, true);
                    }
                }
                else {
                    if (player.gold <= Global.roomProxy.roomInfo.minYZ) {
                        this.playerYzAni(player.gold, 3, this.findCmByMoney(player.gold, false), this.header1, 3);
                        this.header1.updateGold(-player.gold, true);
                    }
                    else {
                        this.playerYzAni(Global.roomProxy.roomInfo.minYZ, 3, this.findCmByMoney(Global.roomProxy.roomInfo.minYZ, false), this.header1, 3);
                        this.header1.updateGold(-Global.roomProxy.roomInfo.minYZ, true);
                    }
                }
                this.showBtnType(2);
            }
        };
        ZajinhuaGameScene.prototype.bipai_Promise = function (data1) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var showCount, lists;
                return __generator(this, function (_a) {
                    showCount = data1.length;
                    lists = data1.concat();
                    async.eachSeries(lists, function (data, callback) {
                        var sourceIndex = data.sourceIndex;
                        zjh.ZajinhuaUtils.playBp(_this.findPlayerSex(sourceIndex)); //比牌声音；
                        var targetIndex = data.targetIndex;
                        var winIndex = data.winIndex;
                        _this.windex = data.winIndex;
                        var FailIndex = data.FailIndex;
                        _this.lindex = data.FailIndex;
                        _this.sourcePlayer(sourceIndex);
                        var p1 = _this.directions[sourceIndex];
                        var p2 = _this.directions[targetIndex];
                        var p3 = _this.directions[winIndex];
                        var p4 = _this.directions[FailIndex];
                        if (Global.roomProxy.getMineIndex() == sourceIndex || Global.roomProxy.getMineIndex() == targetIndex) {
                            //比牌发起者，或者被比牌。
                            _this.openCard.visible = false;
                            _this.caozuoBtnGroup(1);
                        }
                        if (Global.roomProxy.getMineIndex() == sourceIndex) {
                            //移除时间
                            var time = _this.header1.getChildByName("1");
                            if (time) {
                                game.UIUtils.removeSelf(time);
                            }
                        }
                        //设置输家。
                        _this.setPlayerStus(4, FailIndex);
                        //比牌动画。
                        _this.tweenSync1(p1, p2, p3, p4);
                        _this.setAutoTimeout(callback, _this, 2500);
                    });
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 设置玩家状态
         */
        ZajinhuaGameScene.prototype.setPlayerStus = function (value, index) {
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                if (i == index) {
                    players[i]["status"] = value;
                }
            }
        };
        ZajinhuaGameScene.prototype.tweenSync1 = function (player1, player2, p3, p4) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var cd1, cd2, hd1, hd2, point1, point2;
                return __generator(this, function (_a) {
                    this.bpGroup.visible = true;
                    this.bpGroupRect.visible = true;
                    this.touchGroup.addChild(this.bpGroupRect);
                    this.touchGroup.addChild(this.bpGroup);
                    if (player1 == 1) {
                        cd1 = this["cards" + player1];
                    }
                    else {
                        cd1 = this["cards" + player1];
                    }
                    if (player2 == 1) {
                        cd2 = this["cards" + player2];
                    }
                    else {
                        cd2 = this["cards" + player2];
                    }
                    cd1.visible = cd2.visible = false;
                    this["gz2jz" + player2].visible = false;
                    hd1 = this["header" + player1];
                    hd2 = this["header" + player2];
                    point1 = this.bpGroup1.globalToLocal(hd1.localToGlobal().x, hd1.localToGlobal().y);
                    point2 = this.bpGroup2.globalToLocal(hd2.localToGlobal().x, hd2.localToGlobal().y);
                    hd1.x = point1.x;
                    hd1.y = point1.y;
                    this.bpGroup1.addChild(hd1);
                    hd2.x = point2.x;
                    hd2.y = point2.y;
                    this.bpGroup2.addChild(hd2);
                    if (Global.runBack) {
                        hd1.x = 0;
                        hd1.y = 0;
                        hd2.x = this.bpGroup2.width - hd2.width;
                        hd2.y = 0;
                    }
                    else {
                        egret.Tween.get(hd1).to({ x: 0, y: 0 }, 400);
                        egret.Tween.get(hd2).to({ x: this.bpGroup2.width - hd2.width, y: 0 }, 400);
                    }
                    this.setAutoTimeout(function () {
                        _this.bpCard1.visible = _this.bpCard2.visible = true;
                        _this.pkDb.playByTime("zjh_vs", 1);
                        _this.pkDb.callback = function () {
                            _this.findheaders(player1, p3);
                        };
                    }, this, 550);
                    setTimeout(function () {
                        _this.bipaiOver(player1, player2, hd1, hd2, p3, p4);
                    }, 3000);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 比牌结束
         */
        ZajinhuaGameScene.prototype.bipaiOver = function (player1, player2, hd1, hd2, p3, p4) {
            this.pkDb.visible = false;
            this.bpGroup.visible = false;
            this.bpGroupRect.visible = false;
            this.bpCard1.visible = false;
            this.bpCard2.visible = false;
            var gp1 = this["player" + player1];
            var gp2 = this["player" + player2];
            var point3 = gp1.globalToLocal(hd1.localToGlobal().x, hd1.localToGlobal().y);
            var point4 = gp2.globalToLocal(hd2.localToGlobal().x, hd2.localToGlobal().y);
            hd1.x = point3.x;
            hd1.y = point3.y;
            gp1.addChild(hd1);
            hd2.x = point4.x;
            hd2.y = point4.y;
            gp2.addChild(hd2);
            this.overBipaishowPlayer(player1, p3, gp1, hd1);
            this.overBipaishowPlayer(player2, p3, gp2, hd2);
        };
        /**
         * 比牌结束后显示玩家状态。
         */
        ZajinhuaGameScene.prototype.overBipaishowPlayer = function (player1, p3, gp1, hd1) {
            var _this = this;
            var setX;
            var setY;
            switch (player1) {
                case "1":
                case 1:
                    setX = 0;
                    setY = 0;
                    break;
                case "2":
                case 2:
                    setX = 177;
                    setY = 0;
                    break;
                case "3":
                case 3:
                    setX = 177;
                    setY = 0;
                    break;
                case "4":
                case 4:
                    setX = 0;
                    setY = 0;
                    break;
                case "5":
                case 5:
                    setX = 0;
                    setY = 0;
                    break;
            }
            // if (player1 != 2 && player1 != 3) {//比牌发起者设置坐标位置。2,3号位是一组，其他另一组。
            // 	setX = -15; setY = 0;
            // } else {
            // 	setX = gp1.width - hd1.width + 11; setY = 0;
            // }
            egret.Tween.removeTweens(hd1);
            if (Global.runBack) {
                hd1.x = setX;
                hd1.y = setY;
            }
            else {
                egret.Tween.get(hd1).to({ x: setX, y: setY }, 400);
            }
            this.setAutoTimeout(function () {
                if (player1 == p3) {
                    if (Global.roomProxy.getMineIndex() == _this.windex) {
                        _this.caozuoBtnGroup(3);
                        var isLook = Global.roomProxy.getMineData();
                        if (!isLook) {
                            return;
                        }
                        _this.cards1.visible = true;
                        if (!isLook.isLookCards) {
                            _this.openCard.visible = true;
                        }
                    }
                    else {
                        _this.winPlayer(player1);
                    }
                }
                else {
                    //比牌发起者同时也是比牌输家情况
                    if (Global.roomProxy.getMineIndex() == _this.lindex) {
                        _this.openCard.visible = false;
                        _this.header1.bpwin2lose(true);
                        _this.header1.bplose(true);
                        _this.cards1.paiBianHui();
                        _this.cards1.visible = true;
                        _this.setAutoTimeout(function () {
                            _this.showRestartBtn();
                        }, _this, 400);
                    }
                    else {
                        _this.losePlayer(player1);
                    }
                }
                if (Global.roomProxy.getMineIndex() == _this.windex) {
                    if (_this.isTwoPlayer) {
                        _this.caozuoBtnGroup(1);
                    }
                }
                if (!_this.findLivePlayer()) {
                    return;
                }
                if (_this.findLivePlayer().length == 0 && Global.roomProxy.getMineIndex() == _this.windex) {
                    _this.caozuoBtnGroup(1);
                }
            }, this, 400);
        };
        ZajinhuaGameScene.prototype.createBoom = function () {
            if (Global.runBack) {
                return;
            }
            this.boom = new DBComponent("bomb");
            this.bpGroup.addChild(this.boom);
            this.boom.name = "boom1";
            this.boom.width = 169;
            this.boom.height = 160;
            this.boom.scaleX = this.boom.scaleY = 0.8;
            this.boom.visible = false;
            this.boom.callback = function () {
            };
            return this.boom;
        };
        /**
         * 找炸弹的头像
         */
        ZajinhuaGameScene.prototype.findheaders = function (p1, p3) {
            var _this = this;
            var boom = this.createBoom();
            if (p1 == p3) {
                boom.x = 170;
                boom.y = 110;
                boom.play("rotation", -1);
                egret.Tween.get(this.boom).to({ x: 1120, y: 160 }, 800, egret.Ease.sineIn).call(function () {
                    _this.boom.play("boom", 1);
                    zjh.ZajinhuaUtils.PlayBoom();
                    _this.boom.callback = function () {
                        if (_this.bpGroup.getChildByName("boom1")) {
                            game.UIUtils.removeSelf(_this.bpGroup.getChildByName("boom1"));
                        }
                    };
                });
            }
            else {
                boom.x = 1120;
                boom.y = 160;
                boom.play("rotation", -1);
                egret.Tween.get(this.boom).to({ x: 170, y: 110 }, 800, egret.Ease.sineIn).call(function () {
                    _this.boom.play("boom", 1);
                    zjh.ZajinhuaUtils.PlayBoom();
                    _this.boom.callback = function () {
                        if (_this.bpGroup.getChildByName("boom1")) {
                            game.UIUtils.removeSelf(_this.bpGroup.getChildByName("boom1"));
                        }
                    };
                });
            }
        };
        /**
         * 操作按钮组效果
         */
        ZajinhuaGameScene.prototype.caozuoBtnGroup = function (num) {
            var _this = this;
            egret.Tween.removeTweens(this.btnGroup);
            if (num == 1) {
                this.yzGroup.visible = false;
                egret.Tween.get(this.btnGroup).to({ right: -this.btnGroup.width }, 200);
                this.setAutoTimeout(function () {
                    _this.btnGroup.visible = false;
                }, this, 200);
            }
            else if (num == 2) {
                this.btnGroup.right = -this.btnGroup.width;
                this.btnGroup.visible = true;
                egret.Tween.get(this.btnGroup).to({ right: 0 }, 200);
            }
            else if (num == 3) {
                this.btnGroup.right = 0;
                this.btnGroup.visible = true;
            }
        };
        /**
         * 筹码组动态。
         */
        ZajinhuaGameScene.prototype.cmYzGroup = function (num) {
            var _this = this;
            if (num == 1) {
                this.yzGroup.right = -437;
                egret.Tween.get(this.yzGroup).to({ right: 0 }, 100);
                this.yzGroup.visible = true;
            }
            else {
                egret.Tween.get(this.yzGroup).to({ right: -437 }, 100).call(function () {
                    _this.yzGroup.visible = false;
                });
            }
        };
        /**
         *移除比牌
         */
        ZajinhuaGameScene.prototype.ycBiPai = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                var pi = this.directions[i];
                this["header" + pi].showBiPai(false);
            }
        };
        ZajinhuaGameScene.prototype.s_playerHandCard = function (e) {
            var _this = this;
            var data = e.data;
            var playerIndex = data.playerIndex;
            var pattern = data.roundPattern;
            var cards = data.cards.value;
            var pais = this.exchangeCards(cards);
            if (data.isAbandon) {
                this.qpcards = data;
                return;
            }
            if (Global.roomProxy.getMineIndex() == playerIndex) {
                if (pais.length > 0) {
                    if (this.isShowCardsNum(playerIndex)) {
                        return;
                    }
                    if (Global.runBack) {
                        this.cards1.renderByList(this.sortPokers(pais), false);
                        this.openCard.visible = false;
                        this.caozuoBtnGroup(1);
                        this.cards1.showFen(pattern);
                        return;
                    }
                    this.cards1.renderByList(this.sortPokers(pais), true);
                    this.openCard.visible = false;
                    this['timeout1'] = this.setAutoTimeout(function () {
                        _this.cards1.showFen(pattern);
                    }, this, 150);
                }
            }
            else {
                var pi = this.directions[playerIndex];
                var cd_2 = this["cards" + pi];
                var roomInfo = Global.roomProxy.roomInfo;
                if (!roomInfo) {
                    return;
                }
                cd_2.resetPosition();
                var players = roomInfo.players;
                for (var i in players) {
                    if (players[i]["status"] == 2 && i == playerIndex) {
                        cd_2.paiBianHui();
                    }
                }
                if (Global.runBack) {
                    cd_2.houtaiRun(this.sortPokers(pais));
                    cd_2.showFen(pattern);
                    return;
                }
                if (pais.length > 0) {
                    cd_2.renderByList(this.sortPokers(pais), true);
                    this.setAutoTimeout(function () {
                        cd_2.showFen(pattern);
                    }, this, 150);
                }
            }
        };
        /**
         * 把poker转换成数组。
         */
        ZajinhuaGameScene.prototype.exchangeCards = function (cards) {
            var cars = [];
            for (var i in cards) {
                if (i.length == 3) {
                    cars.push(Number(i));
                }
            }
            return cars;
        };
        /**
         * 播放输掉动画
         */
        ZajinhuaGameScene.prototype.playLoseDb = function () {
            var lose = new DBComponent("zjh_lose");
            lose.scaleX = lose.scaleY = 0.6;
            this.touchGroup.addChild(lose);
            lose.horizontalCenter = 0;
            lose.verticalCenter = -100;
            lose.playByFilename(1);
        };
        ZajinhuaGameScene.prototype.s_roundSettlement = function (e) {
            var data = e.data;
            this.timeBar.removeTimer();
            this.timeBar.visible = false;
            this.openCard.visible = false;
            this.fcsGroup.visible = false;
            this.fcsGroup1.visible = false;
            if (data) {
                for (var i in data) {
                    if (Global.roomProxy.checkIndexIsMe(i)) {
                        this.header1.updateGold(data[i]["ownGold"]);
                        this.header1.showLiushuiLabel(data[i]["gainGold"], data[i]["happyGold"]);
                        if (data[i]["gainGold"] > 0) {
                            var cars = data[i]["cards"]["value"];
                            var roundptn = data[i]["roundPattern"];
                            this.coin2Component(this.header1, 1, cars, roundptn, data[i]["happyGold"], true);
                            this.caozuoBtnGroup(1);
                            this.gz2jz1.source = "";
                            this.openCard.visible = false;
                            var ti = this.header1.getChildByName("1");
                            if (ti) {
                                game.UIUtils.removeSelf(ti);
                            }
                            this.win.playByFilename(1);
                        }
                        else {
                            //播放输了
                            this.playLoseDb();
                        }
                    }
                    else {
                        if (i != "dealerIndex") {
                            var pi = this.directions[i];
                            var header = this["header" + pi];
                            header.updateGold(data[i]["ownGold"]);
                            header.showLiushuiLabel(data[i]["gainGold"], data[i]["happyGold"]);
                            if (data[i]["gainGold"] > 0) {
                                var cars = data[i]["cards"]["value"];
                                var roundptn = data[i]["roundPattern"];
                                this.coin2Component(header, pi, cars, roundptn, data[i]["happyGold"], false);
                                this["gz2jz" + pi].source = "";
                                this.otherPlayerTimeVisible(pi);
                            }
                        }
                    }
                }
            }
        };
        /**
         * 游戏结束
         * @param  {egret.TouchEvent} e
         */
        ZajinhuaGameScene.prototype.s_roomFinished = function (e) {
            _super.prototype.roomGameOver.call(this, e);
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            roomInfo.roundStatus = data.status;
            this.timeBar.visible = false;
            this.timeBar.removeTimer();
        };
        ZajinhuaGameScene.prototype.s_curPlay = function (e) {
            var _this = this;
            var data = e.data;
            this.curPlayer = data.playerIndex;
            this.lunci.text = "第" + data.curGameTurn + "/" + Global.roomProxy.roomInfo.maxTurn + "轮";
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            this.cmNumList = roomInfo.betRatio;
            var playerIndex = this.directions[data.playerIndex];
            var headerGroup = this["header" + playerIndex];
            this.timeBar.startTime(this);
            this.timeBar.visible = true;
            headerGroup.addChild(this.timeBar);
            this.timeBar.name = playerIndex;
            this.timeBar.x = headerGroup.headerImage_mask.x;
            this.timeBar.y = headerGroup.headerImage_mask.y;
            roomInfo.minYZ = data.minBet;
            var currentLunci = roomInfo['curTurns'];
            this["gz2jz" + playerIndex].visible = false;
            Global.roomProxy.roomInfo['curTurns'] = data.curGameTurn;
            this.dyzs(data.minBet);
            if (Global.roomProxy.checkIndexIsMe(data.playerIndex)) {
                this.closebiPai();
                if (this.isZdgz) {
                    this.bpBtn.visible = false;
                    this.bpBtn0.visible = true;
                    this.jzBtn.visible = false;
                    this.jzBtn0.visible = true;
                    this['timeout2'] = this.setAutoTimeout(function () {
                        _this.gz();
                    }, this, 500);
                }
                else {
                    this.showBtnType(1);
                    this.showBtnS();
                }
            }
        };
        ZajinhuaGameScene.prototype.cleatAllTalkAbout = function () {
            for (var i = 1; i <= 5; i++) {
                this["gz2jz" + i].source = "";
                this["gz2jz" + i].visible = false;
            }
        };
        /**
         * 展示下次加注按钮的状态
         */
        ZajinhuaGameScene.prototype.showBtnS = function () {
            this.initCMList();
            var islook = Global.roomProxy.getMineData();
            if (!islook) {
                return;
            }
            if (islook.isLookCards) {
                if (this.cmNumList[this.cmNumList.length - 1] * 2 <= Global.roomProxy.roomInfo.minYZ * 2 || islook.gold < this.choseMoney(Global.roomProxy.roomInfo.minYZ * 2)) {
                    this.jzBtn0.visible = true;
                }
                else {
                    this.jzBtn.visible = true;
                }
                this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ * 2;
            }
            else {
                if (this.cmNumList[this.cmNumList.length - 1] <= Global.roomProxy.roomInfo.minYZ || islook.gold < this.choseMoney(Global.roomProxy.roomInfo.minYZ)) {
                    this.jzBtn0.visible = true;
                }
                else {
                    this.jzBtn.visible = true;
                }
                this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ;
            }
        };
        //找下次押注的钱。
        ZajinhuaGameScene.prototype.choseMoney = function (money) {
            for (var i = 0; i < this.cmNumList.length; i++) {
                if (this.cmNumList[i] == money) {
                    if (i != 4) {
                        return this.cmNumList[i + 1];
                    }
                    else {
                        return this.cmNumList[i];
                    }
                }
            }
        };
        ZajinhuaGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var sum, roomInfo, type, isLook, type;
                return __generator(this, function (_a) {
                    sum = 0;
                    e.stopPropagation();
                    switch (e.target) {
                        case this.restartBtn:
                            this.allowBack = this.restartBtn.visible;
                            roomInfo = Global.roomProxy.roomInfo;
                            //clubnew
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    ZJHClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            this.restartBtnTouch();
                            break;
                        case this.backBtn:
                            this.allowBack = this.restartBtn.visible;
                            this.backBtnTouch();
                            break;
                        case this.settingBtn:
                            this.flag = false;
                            this.gnBtnAni(false);
                            CF.sN(PanelNotify.OPEN_ZJHSET);
                            break;
                        case this.xlBtn:
                            type = (this.flag = !this.flag) ? true : false;
                            this.gnBtnAni(type);
                            break;
                        case this.helpBtn:
                            this.flag = false;
                            this.gnBtnAni(false);
                            CF.sN(PanelNotify.OPEN_ZJHHELP);
                            break;
                        case this.recordBtn:
                            this.flag = false;
                            this.gnBtnAni(false);
                            CF.sN(PanelNotify.OPEN_ZJHRECORD);
                            break;
                        case this.qpBtn:
                            this.qpBtn.enabled = false;
                            isLook = Global.roomProxy.getMineData();
                            if (!isLook) {
                                return [2 /*return*/];
                            }
                            if (isLook.isLookCards) {
                                this.mineDiscard(1);
                            }
                            else {
                                Global.alertMediator.addAlert("你未看牌，确定要弃牌", function () {
                                    _this.mineDiscard(1);
                                }, function () {
                                    _this.qpBtn.enabled = true;
                                }, false);
                            }
                            break;
                        case this.bpBtn:
                            this.bpBtn.enabled = false;
                            this.bp();
                            if (this.yzGroup) {
                                this.cmYzGroup(2);
                            }
                            break;
                        case this.jzBtn:
                            if (!this.yzGroup) {
                                this.cmYzGroup(2);
                            }
                            else {
                                this.mineAddBet();
                            }
                            break;
                        case this.gzBtn:
                            this.gzBtn.enabled = false;
                            this.gzBtn.visible = false;
                            this.zdgzBtn.visible = true;
                            this.jzBtn.visible = false;
                            this.jzBtn0.visible = true;
                            this.bpBtn.visible = false;
                            this.bpBtn0.visible = true;
                            this.gz();
                            if (this.yzGroup) {
                                this.cmYzGroup(2);
                            }
                            break;
                        case this.openCard:
                            this.openMineCards();
                            if (this.yzGroup) {
                                this.cmYzGroup(2);
                            }
                            break;
                        case this.zdgzBtn:
                            type = (this.flag1 = !this.flag1) ? true : false;
                            this.zdgz(type);
                            break;
                        case this.fcs:
                            this.overTimeProtect();
                            break;
                        // case this.fcs1:
                        // 	// this.fcs.visible = true;
                        // 	this.overTimeProtect(false);
                        // 	break;
                        case this.touchGroup:
                            if (this.yzGroup) {
                                this.cmYzGroup(2);
                            }
                            this.closebiPai();
                            this.flag = false;
                            this.gnBtnAni(false);
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 跟注
         */
        ZajinhuaGameScene.prototype.gz = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, cardss, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.closebiPai();
                            handler = ServerPostPath.game_zjhHandler_c_followBet;
                            cardss = {};
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0) {
                                if (resp.error.msg != "成功") {
                                    Global.alertMediator.addAlert(resp.error.msg);
                                    this.gzBtn.enabled = true;
                                    game.PomeloManager.instance.disConnectAndReconnect();
                                    return [2 /*return*/];
                                }
                            }
                            this.gzBtn.enabled = true;
                            this.showBtnType(2);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ZajinhuaGameScene.prototype.zdgz = function (type) {
            this.isZdgz = type;
            if (type) {
                this.zdgzDBs.playByTime("zjh_autobutton", -1);
            }
            else {
                this.zdgzDBs.visible = false;
            }
        };
        /**
         * 展示按钮组，加注，跟注状态
         */
        ZajinhuaGameScene.prototype.showBtnType = function (num) {
            this.bpBtn.visible = num == 1 ? true : false;
            this.jzBtn.visible = num == 1 ? true : false;
            this.gzBtn.visible = num == 1 ? true : false;
            this.zdgzBtn.visible = num == 1 ? false : true;
            this.bpBtn0.visible = num == 1 ? false : true;
            this.jzBtn0.visible = num == 1 ? false : true;
        };
        /**
         * 自己点击开牌
         */
        ZajinhuaGameScene.prototype.openMineCards = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var islook, handler, cardss, resp, data, pais;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            islook = Global.roomProxy.getMineData();
                            if (!islook) {
                                return [2 /*return*/];
                            }
                            if (Global.roomProxy.getMineIndex() == this.curPlayer) {
                                this.gzBtn["gzLable"].text = Global.roomProxy.roomInfo.minYZ * 2;
                                if (islook.gold < Global.roomProxy.roomInfo.minYZ * 2 || Global.roomProxy.roomInfo.minYZ == this.cmNumList[this.cmNumList.length - 1]) {
                                    this.jzBtn0.visible = true;
                                    this.jzBtn.visible = false;
                                }
                                else {
                                    this.jzBtn.visible = true;
                                    this.jzBtn0.visible = false;
                                }
                            }
                            handler = ServerPostPath.game_zjhHandler_c_lookCard;
                            cardss = {};
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            if (!resp || !resp.cards) {
                                return [2 /*return*/];
                            }
                            this.openCard.visible = false;
                            if (this.isKp) {
                                this.isKp = false;
                            }
                            this.isKp = false;
                            data = resp.cards.value;
                            pais = this.exchangeCards(data);
                            if (pais.length > 0) {
                                this.cards1.renderByList(this.sortPokers(pais), true);
                                this['timeout3'] = this.setAutoTimeout(function () {
                                    _this.cards1.showFen(resp.roundPattern);
                                }, this, 150);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ZajinhuaGameScene.prototype.bp = function () {
            return __awaiter(this, void 0, void 0, function () {
                var plList, i, pi, handler, cardss, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            plList = this.findLivePlayer();
                            if (!(plList.length > 1)) return [3 /*break*/, 1];
                            for (i = 0; i < plList.length; i++) {
                                pi = this.directions[plList[i]];
                                this["header" + pi].showBiPai(true);
                            }
                            return [3 /*break*/, 3];
                        case 1:
                            this.isTwoPlayer = true;
                            handler = ServerPostPath.game_zjhHandler_c_compareCard;
                            cardss = { playerIndex: plList[0] };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 2:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0 && resp.error.msg != "成功") {
                                Global.alertMediator.addAlert(resp.error.msg);
                                return [2 /*return*/];
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 寻找可操作玩家
         */
        ZajinhuaGameScene.prototype.findLivePlayer = function (header) {
            var plList = [];
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            if (header) {
                for (var i in players) {
                    if (i != header) {
                        var s = players[i]["status"];
                        if (s != 2 && s != 4) {
                            plList.push(i);
                        }
                    }
                }
                return plList;
            }
            else {
                for (var i in players) {
                    if (i != Global.roomProxy.getMineIndex()) {
                        var s = players[i]["status"];
                        if (s != 2 && s != 4) {
                            plList.push(i);
                        }
                    }
                }
                return plList;
            }
        };
        /**
         * 比牌赢家展示其他客户端
         */
        ZajinhuaGameScene.prototype.winPlayer = function (index) {
            var hd = this["header" + index];
            var cd = this["cards" + index];
            var gzjz = this["gz2jz" + index];
            // cd.resetPosition();
            cd.visible = true;
            hd.bplose(false);
            gzjz.source = "";
        };
        /**
         * 比牌输家展示其他客户端
         */
        ZajinhuaGameScene.prototype.losePlayer = function (index) {
            var hd = this["header" + index];
            var gzjz = this["gz2jz" + index];
            var cd = this["cards" + index];
            this["header" + index].bpwin2lose();
            cd.paiBianHui();
            cd.showFen(10);
            hd.bplose(true);
            gzjz.source = "";
            cd.visible = true;
        };
        /**
         * 创牌
         */
        ZajinhuaGameScene.prototype.createPokers = function () {
            if (Global.runBack) {
                return;
            }
            // let length = this.playerSetNumber.length;
            var players = Global.roomProxy.roomInfo.players;
            var length = _.keys(players).length;
            for (var i = 0; i <= length * 3 - 1; i++) {
                var tempPokers = ObjectPool.produce("zjh_poker", zajinhua.ZajinhuaCard);
                if (!tempPokers) {
                    tempPokers = new zajinhua.ZajinhuaCard();
                }
                game.UIUtils.setAnchorPot(tempPokers);
                this.touchGroup.addChild(tempPokers);
                tempPokers.name = "poker" + i;
                tempPokers.scaleX = 0.5;
                tempPokers.scaleY = 0.5;
                tempPokers.alpha = 0;
                tempPokers.rotation = -90;
                tempPokers.x = GameConfig.CURRENT_WIDTH / 2;
                tempPokers.y = 0;
            }
        };
        ZajinhuaGameScene.prototype.fapai_Promise = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var after, startIndex, before, i, index, arr, count, i, player;
                return __generator(this, function (_a) {
                    this.showCount = 3;
                    after = [];
                    startIndex = Global.roomProxy.roomInfo.dealer;
                    before = [];
                    for (i = 0; i < this.playerSetNumber.length; i++) {
                        index = this.playerSetNumber[i];
                        if (index >= startIndex) {
                            before.push(index);
                        }
                        else {
                            after.push(index);
                        }
                    }
                    arr = before.concat(after);
                    this.playerSetNumber = arr;
                    count = 0;
                    do {
                        for (i = 0; i < this.playerSetNumber.length; i++) {
                            this.tweenSync(i + this.playerSetNumber.length * (3 - this.showCount), this.playerSetNumber[i], this.showCount, count);
                            count++;
                        }
                        this.showCount--;
                        if (this.showCount == 0) {
                            player = Global.roomProxy.getMineData();
                            if (player) {
                                if (player["status"] < 2) {
                                    this.setAutoTimeout(function () {
                                        _this.openCard.visible = _this.isKp;
                                    }, this, 1000);
                                    this.caozuoBtnGroup(2);
                                }
                            }
                        }
                    } while (this.showCount > 0);
                    return [2 /*return*/];
                });
            });
        };
        ZajinhuaGameScene.prototype.tweenSync = function (i, number, showCount, index) {
            var poker = this.touchGroup.getChildByName("poker" + ((this.playerSetNumber.length * 3 - 1) - i));
            this.setAutoTimeout(function () {
                zjh.ZajinhuaUtils.fapai();
            }, this, (index - 1) * 155 / 2);
            var time1 = index * 155 / 2;
            var moveTime = 150;
            if (number == 1) {
                var targetCard_1 = this.cards1["card" + (this.showCount - 1)];
                var pos = targetCard_1.localToGlobal();
                egret.Tween.get(poker).wait(time1).to({ x: pos.x + targetCard_1.width / 2 * 0.75, y: pos.y + targetCard_1.height / 2 * 0.75, scaleX: 0.75, scaleY: 0.75, rotation: 0, alpha: 1 }, moveTime, egret.Ease.circOut);
                this.setAutoTimeout(function () {
                    egret.Tween.removeTweens(poker);
                    game.UIUtils.removeSelf(poker);
                    ObjectPool.reclaim("zjh_poker", poker);
                    targetCard_1.visible = true;
                }, this, time1 + moveTime);
            }
            else {
                var targetCard_2 = this["cards" + number]["card" + (this.showCount - 1)];
                var pos = targetCard_2.localToGlobal();
                egret.Tween.get(poker).wait(time1).to({ x: pos.x + targetCard_2.width / 4, y: pos.y + targetCard_2.height / 4, scaleX: 0.5, scaleY: 0.5, rotation: 0, alpha: 1 }, moveTime, egret.Ease.circOut);
                this.setAutoTimeout(function () {
                    egret.Tween.removeTweens(poker);
                    game.UIUtils.removeSelf(poker);
                    ObjectPool.reclaim("zjh_poker", poker);
                    targetCard_2.visible = true;
                }, this, time1 + moveTime);
            }
        };
        ZajinhuaGameScene.prototype.box2player = function (header) {
            var _this = this;
            var pos = header.localToGlobal();
            var boxX = this.box.x;
            var boxY = this.box.y;
            egret.Tween.get(this.box).to({ x: pos.x + 55, y: pos.y + 50 }, 200).call(function () {
                _this.box.playNamesAndLoop(["zjh_xq_win", "zjh_xq_wait"]);
            }).wait(2000).to({ x: boxX, y: boxY }, 200);
        };
        ZajinhuaGameScene.prototype.showRestartBtn = function (realyShow) {
            if (realyShow === void 0) { realyShow = false; }
            if (this.isClubGame && !realyShow) {
                return;
            }
            this.restartBtn.visible = true;
        };
        /**
         * 筹码飞赢的玩家
         */
        ZajinhuaGameScene.prototype.coin2Component = function (playerGroup, id, cards, roundptn, happyGold, isWin) {
            var _this = this;
            if (isWin === void 0) { isWin = false; }
            async.waterfall([
                function (callback) {
                    zjh.ZajinhuaUtils.otherPlayFjb();
                    var _loop_2 = function () {
                        var jinbi = _this.cmList1.pop();
                        var point = playerGroup.globalToLocal(jinbi.localToGlobal().x, jinbi.localToGlobal().y);
                        jinbi.x = point.x;
                        jinbi.y = point.y;
                        playerGroup.addChild(jinbi);
                        egret.Tween.get(jinbi).to({
                            x: playerGroup.width / 2,
                            y: playerGroup.height / 2
                        }, _.random(400, 800)).call(function () {
                            game.UIUtils.removeSelf(jinbi);
                        });
                    };
                    while (_this.cmList1.length > 0) {
                        _loop_2();
                    }
                    _this['timeout4'] = _this.setAutoTimeout(function () {
                        callback();
                    }, _this, 850);
                },
                function (callback) {
                    _this.showRestartBtn(true);
                    if (happyGold > 0) {
                        _this.box2player(_this["header" + id]);
                    }
                    if (roundptn >= 3) {
                        // this.win2.play("default", 1);
                        // this.win2.verticalCenter = 300;
                        // this.win2.horizontalCenter = 240;
                        // this.win2.callback = () => {
                        // 	this.win2.visible = false;
                        // 	let pais = this.exchangeCards(cards);
                        // 	this.tsPais(pais);
                        // 	this.win1.play("default", 1);
                        // 	let img = new eui.Image(`zjh_nyl${roundptn}_png`)
                        // 	this.effectGroup.addChild(img);
                        // 	img.name = "bz";
                        // 	img.verticalCenter = 45;
                        // 	img.horizontalCenter = -20;
                        // 	this.niuFenFDSX(img);
                        // 	this.win1.verticalCenter = 0;
                        // 	this.win1.horizontalCenter = 240;
                        // 	this.win1.callback = () => {
                        // 		this.win1.visible = false;
                        // 		if (this.effectGroup.getChildByName("bz")) {
                        // 			game.UIUtils.removeSelf(this.effectGroup.getChildByName("bz"));
                        // 		}
                        // 		this.tsPais(null);
                        // 	}
                        // }
                    }
                    else {
                    }
                }
            ], function (data, callback) {
            });
        };
        /**
         * 展示特殊牌型。
         */
        ZajinhuaGameScene.prototype.tsPais = function (cds) {
            if (cds != null) {
                this.pokerGroup.visible = true;
                for (var i = 0; i < cds.length; i++) {
                    var cd = this["cd" + i];
                    cd.initWithNum(cds[i]);
                    cd.showB2Z();
                    cd.visible = true;
                    if (i == 0) {
                        egret.Tween.get(cd).to({ rotation: -15 }, 300);
                    }
                    else if (i == 1) {
                        egret.Tween.get(cd).to({ y: 0 }, 300);
                    }
                    else {
                        egret.Tween.get(cd).to({ rotation: 15 }, 300);
                    }
                }
            }
            else {
                this.pokerGroup.visible = false;
                for (var i = 0; i < 3; i++) {
                    var cd = this["cd" + i];
                    cd.visible = false;
                    if (i == 0) {
                        cd.rotation = 0;
                    }
                    else if (i == 1) {
                        cd.y = 13;
                    }
                    else {
                        cd.rotation = 0;
                    }
                }
            }
        };
        /**
         * 宝箱飞玩家
         */
        ZajinhuaGameScene.prototype.boxIcon2header = function (header) {
            var icons = this.createIcon();
            var _loop_3 = function () {
                var jinbi = icons.pop();
                var point = header.globalToLocal(jinbi.localToGlobal().x, jinbi.localToGlobal().y);
                jinbi.x = point.x;
                jinbi.y = point.y;
                header.addChild(jinbi);
                egret.Tween.get(jinbi).to({
                    x: header.x + 40,
                    y: header.y + 40
                }, _.random(600, 800)).call(function () {
                    game.UIUtils.removeSelf(jinbi);
                });
            };
            while (icons.length > 0) {
                _loop_3();
            }
        };
        ZajinhuaGameScene.prototype.createIcon = function () {
            var icon;
            for (var i = 0; i < 20; i++) {
                icon = new eui.Image();
                icon.name = "icon" + i;
                icon.source = RES.getRes("zjh_gold_png");
                this.effectGroup.addChild(icon);
                icon.x = 55;
                icon.y = 155;
                this.iconList.push(icon);
            }
            return this.iconList;
        };
        /**
         * 获取一个筹码
         * index :筹码颜色大小
         * value :值
         */
        ZajinhuaGameScene.prototype.getNewZJHYz = function (index, value) {
            var color;
            var jinbi = new zajinhua.ZajinhuaYzBtn(true);
            if (value == 1) {
                color = 1;
            }
            else {
                color = index;
            }
            jinbi.setIndex(color);
            jinbi.setContent(value);
            return jinbi;
        };
        ZajinhuaGameScene.prototype.playerYzAni = function (value, type, index, component, sex) {
            if (type == 1) {
                zjh.ZajinhuaUtils.playGz(sex);
            }
            if (type == 2) {
                zjh.ZajinhuaUtils.playJz(sex);
            }
            var jinbi = this.getNewZJHYz(index, Math.ceil(value));
            if (component == null) {
                this.coinMoveAni(jinbi, null);
            }
            else {
                var startPoint = component.localToGlobal();
                this.coinMoveAni(jinbi, startPoint);
            }
            return jinbi;
        };
        /**
         * 金币move动画
         * @param  {RBWarYzBtn} jinbi
         * @param  {number} type
         * @param  {egret.Point} startPoint 若果这个为空那么表示重连
         */
        ZajinhuaGameScene.prototype.coinMoveAni = function (jinbi, startPoint) {
            zjh.ZajinhuaUtils.PlayFcm();
            var group = this.cmsGroup;
            game.UIUtils.setAnchorPot(jinbi);
            jinbi.rotation = 0;
            jinbi.scaleX = jinbi.scaleY = 0.8;
            startPoint = group.globalToLocal(startPoint.x + 30, startPoint.y + 60);
            jinbi.x = startPoint.x;
            jinbi.y = startPoint.y;
            group.addChild(jinbi);
            egret.Tween.get(jinbi).to({
                x: _.random(20, group.width - jinbi.width * 0.15),
                y: _.random(20, group.height - jinbi.height * 0.15),
                rotation: _.random(0, 360)
            }, _.random(200, 400), egret.Ease.sineOut);
            this.cmList1.push(jinbi);
            return jinbi;
        };
        /**
         * 其他玩家弃牌
         *
         */
        ZajinhuaGameScene.prototype.otherDiscard = function (playerIndex) {
            var _this = this;
            var card = this["cards" + playerIndex];
            var header = this["header" + playerIndex];
            this.otherPlayerTimeVisible(playerIndex);
            this["gz2jz" + playerIndex].source = "";
            card.setNomal2(); //先恢复
            card.showFen(10);
            this['timeout5'] = this.setAutoTimeout(function () {
                _this.otherDiscardAni(card, playerIndex);
            }, this, 200);
        };
        /**
         * 其他玩家弃牌效果
         *
         */
        ZajinhuaGameScene.prototype.otherDiscardAni = function (card, playerIndex) {
            var _this = this;
            var header = this["header" + playerIndex];
            var playerGroup = this["player" + playerIndex];
            header.qpVisible(true);
            var _loop_4 = function (i) {
                var cd = card["card" + i];
                var point = this_2.cmsGroup.globalToLocal(cd.localToGlobal().x, cd.localToGlobal().y);
                cd.x = point.x;
                cd.y = point.y;
                this_2.cmsGroup.addChild(cd);
                egret.Tween.get(cd).to({
                    x: this_2.cmsGroup.width / 2,
                    y: this_2.cmsGroup.height / 2,
                    rotation: 720,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    alpha: 0.3
                }, 300 + (i * 200)).call(function () {
                    card.addChild(cd);
                    cd.visible = false;
                    _this['timeout6'] = _this.setAutoTimeout(function () {
                        card.setNomal();
                    }, _this, 1000);
                });
            };
            var this_2 = this;
            for (var i = 2; i >= 0; i--) {
                _loop_4(i);
            }
        };
        /**
         * 自己弃牌
         *
         */
        ZajinhuaGameScene.prototype.mineDiscard = function (num) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var handler, cardss, resp, isLook, playerIndex, pattern_1, cards, pais, ti, roomInfo, players;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(num == 1)) return [3 /*break*/, 2];
                            handler = ServerPostPath.game_zjhHandler_c_abandonCard;
                            cardss = {};
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                // if (resp.error.code != 10711) {
                                // 	game.PomeloManager.instance.disConnectAndReconnect();
                                // }
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2:
                            if (Global.runBack) {
                                this.showRestartBtn();
                                this.openCard.visible = false;
                                this.caozuoBtnGroup(1);
                                this.closebiPai();
                                this.cards1.setNomal(2);
                                isLook = Global.roomProxy.getMineData();
                                if (!isLook) {
                                    return [2 /*return*/];
                                }
                                if (isLook.isLookCards) {
                                    this.header1.qpVisible(true);
                                    this.cards1.showFen1(1);
                                }
                                else {
                                    playerIndex = this.qpcards.playerIndex;
                                    pattern_1 = this.qpcards.roundPattern;
                                    cards = this.qpcards.cards.value;
                                    this.header1.qpVisible(true);
                                    pais = this.exchangeCards(cards);
                                    if (pais.length > 0) {
                                        this.cards1.paiBianHui();
                                        this.cards1.renderByList(this.sortPokers(pais), true);
                                        this['timeout8'] = this.setAutoTimeout(function () {
                                            _this.cards1.showFen(pattern_1);
                                        }, this, 150);
                                    }
                                }
                                this.allowBack = true;
                                this.showRestartBtn();
                                return [2 /*return*/];
                            }
                            this.openCard.visible = false;
                            this.qpBtn.enabled = true;
                            this.caozuoBtnGroup(1);
                            this.closebiPai();
                            ti = this.header1.getChildByName("1");
                            if (ti) {
                                ti.visible = false;
                                game.UIUtils.removeSelf(ti);
                            }
                            roomInfo = Global.roomProxy.roomInfo;
                            if (!roomInfo) {
                                return [2 /*return*/];
                            }
                            players = roomInfo.players;
                            this.cards1.zhongjianShouPai();
                            this.cards1.showFen1(2);
                            if (num == 2) {
                                this.setAutoTimeout(function () {
                                    _this.mineDiscardAni();
                                }, this, 150);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 自己弃牌动画。
         *
         */
        ZajinhuaGameScene.prototype.mineDiscardAni = function () {
            var _this = this;
            var _loop_5 = function (i) {
                var cd = this_3.cards1["card" + i];
                var point = this_3.cards1.globalToLocal(this_3.effectGroup.width / 2, this_3.effectGroup.height / 2);
                this_3.header1.qpVisible(true);
                egret.Tween.get(cd).to({
                    x: point.x,
                    y: point.y,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    rotation: 720,
                    alpha: 0.3
                }, (400 + (i * 200))).call(function () {
                    cd.visible = false;
                    _this.cards1.addChild(cd);
                });
            };
            var this_3 = this;
            for (var i = 2; i >= 0; i--) {
                _loop_5(i);
            }
            this['timeout7'] = egret.setTimeout(function () {
                _this.cards1.setNomal(2);
                var isLook = Global.roomProxy.getMineData();
                if (!isLook) {
                    return;
                }
                if (isLook.isLookCards) {
                    _this.cards1.showFen1(1);
                }
                else {
                    var playerIndex = _this.qpcards.playerIndex;
                    var pattern_2 = _this.qpcards.roundPattern;
                    var cards = _this.qpcards.cards.value;
                    var pais = _this.exchangeCards(cards);
                    if (Global.roomProxy.getMineIndex() == playerIndex) {
                        if (pais.length > 0) {
                            _this.cards1.renderByList(_this.sortPokers(pais), true);
                            _this['timeout8'] = _this.setAutoTimeout(function () {
                                _this.cards1.showFen(pattern_2);
                            }, _this, 150);
                        }
                    }
                }
                _this.allowBack = true;
                _this.showRestartBtn();
            }, this, 2000);
        };
        ZajinhuaGameScene.prototype.initCMList = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            this.cmNumList = roomInfo.betRatio;
        };
        /**
         * 初始化筹码，并赋值。
         */
        ZajinhuaGameScene.prototype.init = function () {
            this.initCMList();
            for (var i = 1; i <= 5; i++) {
                var yzBtn = this['yzBtn' + i];
                var isLook = Global.roomProxy.getMineData();
                if (!isLook) {
                    return;
                }
                if (isLook.isLookCards) {
                    if (this.cmNumList[i - 1] * 2 > Global.roomProxy.roomInfo.minYZ * 2) {
                        if (isLook.gold < this.cmNumList[i - 1] * 2) {
                            yzBtn.setTouchon(2);
                            yzBtn.alpha = 0.5;
                        }
                        else {
                            yzBtn.setTouchon(1);
                        }
                    }
                    else {
                        yzBtn.setTouchon(2);
                        yzBtn.alpha = 0.5;
                    }
                    yzBtn.setContent(this.cmNumList[i - 1] * 2);
                }
                else {
                    if (this.cmNumList[i - 1] > Global.roomProxy.roomInfo.minYZ) {
                        if (isLook.gold < this.cmNumList[i - 1]) {
                            yzBtn.setTouchon(2);
                            yzBtn.alpha = 0.5;
                        }
                        else {
                            yzBtn.setTouchon(1);
                        }
                    }
                    else {
                        yzBtn.setTouchon(2);
                        yzBtn.alpha = 0.5;
                    }
                    yzBtn.setContent(this.cmNumList[i - 1]);
                }
                yzBtn.setIndex(i);
            }
        };
        /**
         * 自己下注
         */
        ZajinhuaGameScene.prototype.mineAddBet = function () {
            this.closebiPai();
            this.cmYzGroup(1);
            this.init();
        };
        /**
         * 根据押注金额返回筹码颜色；
         */
        ZajinhuaGameScene.prototype.findCmByMoney = function (num, isK) {
            this.initCMList();
            if (isK) {
                var twoList = [];
                for (var i = 0; i < this.cmNumList.length; i++) {
                    twoList.push(this.cmNumList[i] * 2);
                }
                if (twoList.indexOf(num) > -1) {
                    return twoList.indexOf(num) + 1;
                }
                else {
                    for (var i = 0; i < twoList.length; i++) {
                        if (twoList[i] > num) {
                            return i + 1;
                        }
                    }
                }
            }
            else {
                if (this.cmNumList.indexOf(num) > -1) {
                    return this.cmNumList.indexOf(num) + 1;
                }
                else {
                    for (var i = 0; i < this.cmNumList.length; i++) {
                        if (this.cmNumList[i] > num) {
                            return i + 1;
                        }
                    }
                }
            }
        };
        ZajinhuaGameScene.prototype.rbwarTouch = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var data, player, handler, cardss, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = e.data;
                            this.currentMoney = data;
                            player = Global.roomProxy.getMineData();
                            if (!player) {
                                return [2 /*return*/];
                            }
                            if (player.isLookCards) {
                                if (data <= Global.roomProxy.roomInfo.minYZ * 2 || player.gold < data) {
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                if (data <= Global.roomProxy.roomInfo.minYZ || player.gold < data) {
                                    return [2 /*return*/];
                                }
                            }
                            if (this.lock) {
                                return [2 /*return*/];
                            }
                            this.lock = true;
                            handler = ServerPostPath.game_zjhHandler_c_addBet;
                            cardss = { addBet: this.currentMoney };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0) {
                                if (resp.error.msg != "成功") {
                                    Global.alertMediator.addAlert(resp.error.msg);
                                    return [2 /*return*/];
                                }
                            }
                            this.lock = false;
                            if (player.isLookCards) {
                                if (player.gold <= data) {
                                    this.playerYzAni(player.gold, 2, this.findCmByMoney(this.currentMoney, true), this.header1, player.sex);
                                    this.header1.updateGold(-player.gold, true);
                                }
                                else {
                                    this.playerYzAni(this.currentMoney, 2, this.findCmByMoney(this.currentMoney, true), this.header1, player.sex);
                                    this.header1.updateGold(-this.currentMoney, true);
                                }
                            }
                            else {
                                if (player.gold <= data) {
                                    this.playerYzAni(player.gold, 2, this.findCmByMoney(this.currentMoney, false), this.header1, player.sex);
                                    this.header1.updateGold(-player.gold, true);
                                }
                                else {
                                    this.playerYzAni(this.currentMoney, 2, this.findCmByMoney(this.currentMoney, false), this.header1, player.sex);
                                    this.header1.updateGold(-this.currentMoney, true);
                                }
                            }
                            this.cmYzGroup(2);
                            this.showBtnType(2);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 玩家比牌选择的玩家
         */
        ZajinhuaGameScene.prototype.playerTouch = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var data, value, pi, handler, cardss, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = e.data;
                            this.playerindex = data.index;
                            value = data.value;
                            if (!value) return [3 /*break*/, 2];
                            pi = this.directions[this.playerindex];
                            this.closebiPai();
                            handler = ServerPostPath.game_zjhHandler_c_compareCard;
                            cardss = { playerIndex: this.playerindex };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code != 0) {
                                //Global.alertMediator.addAlert(resp.error.msg);
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 功能按钮效果动画
         */
        ZajinhuaGameScene.prototype.gnBtnAni = function (type) {
            var _this = this;
            if (type) {
                this.recordBtn.visible = this.helpBtn.visible = this.settingBtn.visible = true;
                this.recordBtn.top = this.helpBtn.top = this.settingBtn.top = this.xlBtn.top;
                if (this.isClubGame) {
                    this.recordBtn.visible = false;
                }
                egret.Tween.get(this.helpBtn).to({ top: 165 }, 200);
                egret.Tween.get(this.settingBtn).to({ top: 91 }, 200);
                egret.Tween.get(this.recordBtn).to({ top: 239 }, 200);
            }
            else {
                egret.Tween.get(this.helpBtn).to({ top: this.xlBtn.top }, 200);
                egret.Tween.get(this.recordBtn).to({ top: this.xlBtn.top }, 200);
                egret.Tween.get(this.settingBtn).to({ top: this.xlBtn.top }, 200).call(function () {
                    _this.recordBtn.visible = _this.helpBtn.visible = _this.settingBtn.visible = false;
                });
            }
        };
        ZajinhuaGameScene.prototype.overTimeProtect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var value, handler, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = Global.roomProxy.fcsIndex;
                            handler = ServerPostPath.game_zjhHandler_c_timeOutProject;
                            data = { project: value };
                            if (value == 1) {
                                data.project = 0;
                            }
                            else {
                                data.project = 1;
                            }
                            this.fcs.touchEnabled = false;
                            this.fcs1.touchEnabled = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code == 0) {
                                if (data.project == 1) {
                                    Global.roomProxy.fcsIndex = 1;
                                    this.fcs.alpha = 1;
                                }
                                else {
                                    Global.roomProxy.fcsIndex = 0;
                                    this.fcs.alpha = 0;
                                }
                                egret.setTimeout(function () {
                                    _this.fcs1.touchEnabled = true;
                                    _this.fcs.touchEnabled = true;
                                }, this, 2000);
                            }
                            else {
                                egret.setTimeout(function () {
                                    _this.fcs1.touchEnabled = true;
                                    _this.fcs.touchEnabled = true;
                                }, this, 2000);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 取消比牌
         */
        ZajinhuaGameScene.prototype.closebiPai = function () {
            this.bpBtn.enabled = true;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var players = roomInfo.players;
            for (var i in players) {
                var pi = this.directions[i];
                this["header" + pi].closeBipai();
            }
        };
        /**
         * 初始化
         */
        ZajinhuaGameScene.prototype.chushihua = function () {
            this.playerSetNumber = [];
            for (var i = 1; i <= 5; i++) {
                var hd = this["header" + i];
                hd.visible = false;
                var goldGroup = this["playerYZGroup" + i];
                if (goldGroup) {
                    goldGroup.visible = false;
                }
                var cd = void 0;
                if (i == 1) {
                    cd = this["cards" + i];
                    cd.setNomal(1);
                }
                else {
                    cd = this["cards" + i];
                    cd.setNomal();
                }
            }
        };
        ZajinhuaGameScene.prototype.showRunTimeByStep = function (room) {
            var players = room.players;
            this.dyzs(room.betBase);
            this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), 5);
            Global.roomProxy.roomInfo.minYZ = room.betBase;
            this.playerCaozuo = room.checkOperaInfo;
            this.cmNumList = room.betRatio;
            this.zyzs(room.totalBet);
            this.lunci.text = "第" + room.curGameTurn + "/" + room.maxTurn + "轮";
            for (var key in players) {
                var dir = this.directions[key];
                this.playerSetNumber.push(Number(dir));
                var player = this['player' + dir];
                var header = this['header' + dir];
                var cms = players[key]["turnBet"];
                for (var i = 0; i < cms.length; i++) {
                    if (typeof (cms[i]) == "number") {
                        this.onlineCM.push(cms[i]);
                    }
                }
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this['cards' + dir];
                    this.showMineStat(players[key], room.curPlay, key);
                }
                else {
                    var cards = this['cards' + dir];
                    this.showOtherStat(key, players[key], room.curPlay);
                }
                header.initWithPlayer(players[key]);
                header.setIndex(key);
                player.visible = true;
                header.visible = true;
            }
            for (var i = 0; i < this.onlineCM.length; i++) {
                var nums = Math.floor(this.onlineCM[i]);
                var jinbi = this.getNewZJHYz(this.clcm(nums), nums);
                this.cmList1.push(jinbi);
                this.cmsGroup.addChild(jinbi);
                jinbi.scaleX = jinbi.scaleY = 0.8;
                jinbi.x = _.random(10, this.cmsGroup.width - 10);
                jinbi.y = _.random(10, this.cmsGroup.height - 10);
            }
        };
        /**
         * 重连设置操作按钮状态
         */
        ZajinhuaGameScene.prototype.setStus = function (num) {
            for (var i in num) {
                switch (i) {
                    case "Add":
                        // this.isJz = num[i];
                        // this.jzBtn.visible = num[i];
                        // this.jzBtn0.visible = !num[i];
                        break;
                    case "Compare":
                        this.isBp = num[i];
                        this.bpBtn.visible = num[i];
                        this.bpBtn0.visible = !num[i];
                        break;
                    case "canAbandon":
                        this.isQp = num[i];
                        this.qpBtn.visible = num[i];
                        if (this.isQp) {
                            this.qpBtn.currentState = "disabled";
                            this.qpBtn.currentState = "disabled";
                        }
                        this.qpBtn0.visible = !num[i];
                        break;
                    case "canLook":
                        this.isKp = num[i];
                        break;
                    case "follow":
                        // this.isGz = num[i];
                        // this.gzBtn.visible = num[i];
                        // this.zdgzBtn.visible = !num[i];
                        break;
                }
            }
        };
        /**
         * 重连找筹码。
         */
        ZajinhuaGameScene.prototype.clcm = function (num) {
            if (this.cmNumList.indexOf(num) > -1) {
                return this.cmNumList.indexOf(num) + 1;
            }
            if (this.cmNumList[this.cmNumList.length - 1] > num) {
                for (var i = 0; i < this.cmNumList.length; i++) {
                    if (this.cmNumList[i] > num) {
                        return i + 1;
                    }
                }
            }
            else {
                var twoList = [];
                for (var i = 0; i < this.cmNumList.length; i++) {
                    twoList.push(this.cmNumList[i] * 2);
                }
                if (twoList.indexOf(num) > -1) {
                    return twoList.indexOf(num) + 1;
                }
                for (var i = 0; i < twoList.length; i++) {
                    if (twoList[i] > num) {
                        return i + 1;
                    }
                }
            }
        };
        /**
         * 展示自己的状态
         */
        ZajinhuaGameScene.prototype.showMineStat = function (mine, curPlay, key) {
            var _this = this;
            var status = mine.status;
            var islook = mine.isLookCards;
            switch (status) {
                case 0:
                case 1:
                    this.mineType(islook, mine);
                    this.caozuoBtnGroup(3);
                    if (curPlay == key) {
                        this.curPlayer = curPlay;
                        this.timeBar.startTime(this);
                        this.timeBar.visible = true;
                        this.header1.addChild(this.timeBar);
                        this.timeBar.name = "1";
                        this.timeBar.x = this.header1.headerImage_mask.x - 3;
                        this.timeBar.y = this.header1.headerImage_mask.y - 3;
                        888;
                        this.showBtnType(1);
                        this.setStus(this.playerCaozuo);
                        this.showBtnS();
                    }
                    else {
                        this.showBtnType(2);
                        this.setStus(this.playerCaozuo);
                    }
                    break;
                case 2:
                    game.UIUtils.removeSelf(this.timeBar);
                    var pattern2_1 = mine.cardValue;
                    var cards2 = mine.handCards;
                    if (cards2.length > 0) {
                        this.cards1.renderByList(this.sortPokers(cards2), false);
                        this['timeout10'] = this.setAutoTimeout(function () {
                            _this.cards1.showFen(pattern2_1, true);
                        }, this, 150);
                    }
                    for (var i = 0; i < 3; i++) {
                        this.cards1.showCardByIndex(i);
                    }
                    this.header1.qpVisible(true);
                    this.cards1.paiBianHui();
                    this.yzGroup.visible = false;
                    this.btnGroup.visible = false;
                    this.showRestartBtn();
                    this.caozuoBtnGroup(1);
                    break;
                case 4:
                    game.UIUtils.removeSelf(this.timeBar);
                    var pattern4 = mine.cardValue;
                    var cards4_1 = mine.handCards;
                    if (cards4_1.length > 0) {
                        this.cards1.showFen(pattern4, true);
                        this['timeout11'] = this.setAutoTimeout(function () {
                            _this.cards1.renderByList(_this.sortPokers(cards4_1), false);
                        }, this, 150);
                    }
                    for (var i = 0; i < 3; i++) {
                        this.cards1.showCardByIndex(i);
                    }
                    this.header1.bplose(true);
                    this.header1.bpwin2lose(false);
                    this.cards1.paiBianHui();
                    this.yzGroup.visible = false;
                    this.btnGroup.visible = false;
                    this.showRestartBtn();
                    this.caozuoBtnGroup(1);
                    break;
                case 5:
                case 6:
                    this.mineType(islook, mine);
                    this.caozuoBtnGroup(3);
                    this.showBtnType(2);
                    this.setStus(this.playerCaozuo);
                    break;
                case 7:
                    game.UIUtils.removeSelf(this.timeBar);
                    this.mineType(islook, mine);
                    this.caozuoBtnGroup(3);
                    this.showBtnType(2);
                    break;
            }
        };
        /**
         * 展示其他玩家的状态
         */
        ZajinhuaGameScene.prototype.showOtherStat = function (key, other, curPlay) {
            var status = other.status;
            var islook = other.isLookCards;
            var dir = this.directions[key];
            var header = this["header" + dir];
            var cd = this["cards" + dir];
            switch (status) {
                case 1:
                    if (islook) {
                        var card = this["cards" + dir];
                        for (var i = 0; i < 3; i++) {
                            this["cards" + dir].showCardByIndex(i);
                        }
                        card.showLookPai(false);
                        card.showFen(6);
                    }
                    else {
                        for (var i = 0; i < 3; i++) {
                            this["cards" + dir].showCardByIndex(i);
                        }
                    }
                    if (key == curPlay) {
                        this.timeBar.startTime(this);
                        this.timeBar.visible = true;
                        header.addChild(this.timeBar);
                        this.timeBar.name = "dir";
                        this.timeBar.x = this.header1.headerImage_mask.x - 3;
                        this.timeBar.y = this.header1.headerImage_mask.y - 3;
                    }
                    if (other.lastOperate == 5) {
                        this["gz2jz" + dir].visible = true;
                        this["gz2jz" + dir].source = this.cz(1, dir);
                    }
                    ;
                    if (other.lastOperate == 6) {
                        this["gz2jz" + dir].visible = true;
                        this["gz2jz" + dir].source = this.cz(2, dir);
                    }
                    break;
                case 7:
                case 0:
                    this.otherType(islook, dir);
                    break;
                case 2:
                    header.qpVisible(true);
                    break;
                case 4:
                    if (islook) {
                        cd.showLookPai(false);
                        cd.showFen(6);
                    }
                    for (var i = 0; i < 3; i++) {
                        this["cards" + dir].showCardByIndex(i);
                    }
                    header.bpwin2lose(false);
                    cd.paiBianHui();
                    cd.showFen(10);
                    header.bplose(true);
                    cd.visible = true;
                    break;
                case 5:
                    this.otherType(islook, dir);
                    this["gz2jz" + dir].visible = true;
                    this["gz2jz" + dir].source = this.cz(1, dir);
                    break;
                case 6:
                    this.otherType(islook, dir);
                    this["gz2jz" + dir].visible = true;
                    this["gz2jz" + dir].source = this.cz(2, dir);
                    break;
            }
        };
        ZajinhuaGameScene.prototype.mineType = function (islook, mine) {
            var _this = this;
            if (islook) {
                //看牌展示牌值
                var pattern_3 = mine.cardValue;
                var cards = mine.handCards;
                if (cards.length > 0) {
                    this.cards1.renderByList(this.sortPokers(cards), false);
                    this['timeout12'] = this.setAutoTimeout(function () {
                        _this.cards1.showFen(pattern_3, true);
                    }, this, 150);
                }
                for (var i = 0; i < 3; i++) {
                    this.cards1.showCardByIndex(i);
                }
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this.cards1.showCardByIndex(i);
                }
                this.openCard.visible = true;
            }
        };
        ZajinhuaGameScene.prototype.otherType = function (islook, dir) {
            if (islook) {
                var card = this["cards" + dir];
                for (var i = 0; i < 3; i++) {
                    this["cards" + dir].showCardByIndex(i);
                }
                card.showLookPai(false);
                card.showFen(6);
            }
            else {
                for (var i = 0; i < 3; i++) {
                    this["cards" + dir].showCardByIndex(i);
                }
            }
        };
        /**
         * 扑克特殊排序；
         */
        ZajinhuaGameScene.prototype.sortPokers = function (listData) {
            var newList = [];
            var t;
            for (var i = 0; i < listData.length; i++) {
                for (var j = i + 1; j < listData.length; j++) {
                    var i1 = listData[i] % 100;
                    var j1 = listData[j] % 100;
                    if (i1 <= j1) {
                        t = listData[i];
                        listData[i] = listData[j];
                        listData[j] = t;
                    }
                }
            }
            for (var j = 0; j < listData.length; j++) {
                if (listData[j] % 100 == 1) {
                    newList.push(listData[j]);
                }
            }
            newList.sort();
            for (var k = 0; k < newList.length; k++) {
                listData.pop();
            }
            for (var m = newList.length - 1; m >= 0; m--) {
                listData.unshift(newList[m]);
            }
            return listData;
        };
        return ZajinhuaGameScene;
    }(game.BaseGameScene));
    zajinhua.ZajinhuaGameScene = ZajinhuaGameScene;
    __reflect(ZajinhuaGameScene.prototype, "zajinhua.ZajinhuaGameScene");
})(zajinhua || (zajinhua = {}));
var PLAYER_STATUS = {
    WAIT: 1,
    ABANDON: 2,
    FAIL: 4,
    GEN: 5,
    ADD: 6,
    COMPARE: 7 // 比牌
};
