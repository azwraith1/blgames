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
var majiang;
(function (majiang) {
    var ERMJGameScene = (function (_super) {
        __extends(ERMJGameScene, _super);
        function ERMJGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "ermj";
            _this.cacheHua = false;
            _this.startNumber = 144;
            /**
             * 检查玩家是否有叫
             */
            _this.currentTings = [];
            /**
             * 听牌提示
             * @param  {egret.TouchEvent} e
             */
            _this.needCheckTing = true;
            //---检查有没有可以胡牌
            _this.huCards = [];
            _this.lastHuTips = [];
            _this.isTingStatus = false;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_ERMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_ERMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_ERMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_ERMJ_MATCHING;
            _this.skinName = new majiang.ERMJGameSceneSkin();
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        /**
        * 开始发牌动画
        */
        ERMJGameScene.prototype.fapaiAni = function () {
            this.majiangStatus = MajiangStatusEnum.FAPAI;
            //庄家几号位
            this.syLabel.text = this.startNumber + "";
            Global.gameProxy.roomInfo.publicCardNum = this.startNumber;
            var zhuangIndex = Global.gameProxy.roomInfo.dealer;
            var sortDir = majiang.MajiangUtils.getDirectionSortByZhuangERMJ(zhuangIndex);
            //开始第一轮发牌
            this.fapaiRound1(sortDir);
        };
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        ERMJGameScene.prototype.fapaiRound4 = function (sortDir) {
            var _this = this;
            var indexNum = 0;
            var fapaiCall = function (index) {
                if (indexNum == 0) {
                    _this.paiQiang.removeNumByIndex();
                    _this.paiQiang.removeNumByIndex();
                    _this.updateSypai();
                }
                else if (indexNum == 1) {
                    _this.paiQiang.removeNumByIndex();
                    _this.updateSypai();
                }
                else {
                    _this.paiQiang.removeNumByIndex();
                    _this.updateSypai();
                }
                if (index == Global.gameProxy.playerInfo.playerIndex) {
                    _this.mineFapaiAni(13);
                }
                else {
                    _this.otherFapaiAni(index, 13);
                }
                indexNum++;
            };
            if (Global.runBack) {
                for (var i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.updateSypai();
                this.mineShoupaiGroup.sortShoupais();
                this.runBuhuaAni();
                return;
            }
            async.eachSeries(sortDir, function (index, callback) {
                fapaiCall(index);
                _this.setAutoTimeout(callback, _this, GameConfig.time_config['200']);
            }, function () {
                _this.setAutoTimeout(function () {
                    if (!Global.gameProxy.roomInfo) {
                        return;
                    }
                    _this.mineShoupaiGroup.visible = false;
                    _this.mineKoupaiGroup.visible = true;
                    // this.paiQiang.currentNumber++;
                    _this.updateSypai();
                    _this.mineShoupaiGroup.sortShoupais();
                    _this.setAutoTimeout(function () {
                        if (!Global.gameProxy.roomInfo) {
                            return;
                        }
                        _this.mineShoupaiGroup.visible = true;
                        _this.mineKoupaiGroup.visible = false;
                        _this.setAutoTimeout(function () {
                            _this.runBuhuaAni();
                        }, _this, 400);
                    }, _this, 400);
                }, _this, 400);
            });
        };
        ERMJGameScene.prototype.fapaiRoundOver = function () { };
        /**
         * 补花
         */
        ERMJGameScene.prototype.runBuhuaAni = function () {
            var _this = this;
            var roomInfo = Global.gameProxy.roomInfo;
            var players = roomInfo.players;
            for (var key in players) {
                var player = players[key];
                var outCard = player.initHuaCards || [];
                var newCard = player.huaNewCards || [];
                if (outCard.length > 0) {
                    this.playerAddBuhua(outCard, newCard, key);
                }
            }
            Global.gameProxy.roomInfo.publicCardNum = this.paiQiang.getPaiQiangNum();
            this.updateSypai();
            this.timeDirectionBar.startTime(this);
            this.setAutoTimeout(function () {
                roomInfo.curPlay = roomInfo.dealer;
                _this.checkChupaiStatus();
            }, this, 1000);
        };
        /**
         * 检查补花状态
         */
        ERMJGameScene.prototype.checkHuaStatus = function () {
            var _this = this;
            var roomInfo = Global.gameProxy.roomInfo;
            var players = roomInfo.players;
            for (var key in players) {
                var player = players[key];
                var outCard = player.huaCards;
                var newCard = player.huaNewCards;
                if (outCard.length > 0) {
                    this.playerAddBuhua(outCard, newCard, key);
                }
            }
            this.timeDirectionBar.startTime(this);
            this.setAutoTimeout(function () {
                roomInfo.curPlay = roomInfo.dealer;
                _this.checkChupaiStatus();
            }, this, 300);
        };
        ERMJGameScene.prototype.playerAddBuhua = function (outCard, newCard, playerIndex) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            if (Global.gameProxy.checkIndexIsMe(playerIndex)) {
                var mineShoupaiGroup_1 = this.mineShoupaiGroup;
                for (var i = 0; i < outCard.length; i++) {
                    var card = outCard[i];
                    Global.gameProxy.updateWanjiaShoupai(card, -1);
                    mineShoupaiGroup_1.hidePaiByValue(card, false);
                    // mineShoupaiGroup.removeShoupaiByValue(card, 1);
                    this.add2HuGroup(card, playerIndex);
                }
                if (newCard && newCard.length > 0) {
                    this.setAutoTimeout(function () {
                        for (var i = 0; i < newCard.length; i++) {
                            var card = newCard[i];
                            Global.gameProxy.updateWanjiaShoupai(card, 1);
                            _this.paiQiang.removeNumByIndex();
                            _this.updateSypai();
                        }
                        if (newCard.length > 0) {
                            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                        }
                        var cards = Global.gameProxy.getMineShuopaiArr();
                        mineShoupaiGroup_1.sortShoupaiByValue(cards, false);
                    }, this, 300);
                }
            }
            else {
                var shoupaiGroup_1 = this[direction + "ShoupaiGroup"];
                shoupaiGroup_1.hideRightByCount(outCard.length, false);
                for (var i = 0; i < outCard.length; i++) {
                    var card = outCard[i];
                    this.add2HuGroup(card, playerIndex);
                }
                this.setAutoTimeout(function () {
                    for (var i = 0; i < outCard.length; i++) {
                        _this.paiQiang.removeNumByIndex();
                        _this.updateSypai();
                    }
                    if (outCard.length > 0) {
                        majiang.MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                    }
                    shoupaiGroup_1.hideRightByCount(outCard.length, true);
                }, this, 300);
            }
        };
        /**
         * todo不花
         */
        ERMJGameScene.prototype.playerBuhua = function (e) {
            var _this = this;
            var datas = e.data.huaInfo;
            var playerIndex = e.data.playerIndex;
            this.clearTingStatus();
            var direction = this.directions[playerIndex];
            var shoupaiGroup = this[direction + "ShoupaiGroup"];
            var hupaiGroup = this[direction + "HupaiGroup"];
            // this.taskBar.hideAllBtns();
            this.newCard({ card: datas[0].cards[0], playerIndex: playerIndex });
            async.eachSeries(datas, function (data, callback) {
                var outCard = data.cards;
                var newCard = data.newCards || [];
                var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                _this.lockChupai = true;
                playerData.cardNum--;
                playerData.lastCard = 0;
                if (direction == "mine") {
                    Global.gameProxy.updateWanjiaShoupai(outCard[0], -1);
                    //隐藏胡牌的箭头
                }
                _this.setAutoTimeout(function () {
                    _this.addEffectAni(direction, "buhua");
                    shoupaiGroup.hideMopai();
                    hupaiGroup.addBuhua(outCard[0]);
                    majiang.MajiangUtils.playMJPTHSound(playerData.sex, "buhua");
                    if (_this.paiQiang.getPaiQiangNum() == 0) {
                        callback();
                        return;
                    }
                    _this.setAutoTimeout(function () {
                        _this.newCard({ card: newCard[0], playerIndex: playerIndex, notHideBtn: true });
                        callback();
                    }, _this, 400);
                }, _this, 500);
            }, function () {
                _this.lockChupai = false;
                _this.checkHuTips();
            });
        };
        ERMJGameScene.prototype.checkChupaiStatus = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != 0) {
                var direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                //这里判断如果手牌=14 则把最后一张牌给change出去
                var playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkShowTips();
            }
        };
        /**
         * 回显花牌
         */
        ERMJGameScene.prototype.reloadHuas = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                var hupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                var huaCard = player.huaCards;
                for (var i = 0; i < huaCard.length; i++) {
                    hupaiGroup.addBuhua(huaCard[i]);
                }
            }
        };
        ERMJGameScene.prototype.reloadPlayerGangs = function () {
            _super.prototype.reloadPlayerGangs.call(this);
        };
        /**
         * 显示重新连接上来的UI
         */
        ERMJGameScene.prototype.showReconnectUI = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            // this.checkHszStatus(roomInfo);
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        };
        ERMJGameScene.prototype.renderContent = function () {
            var _this = this;
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            if (Global.gameProxy.reconnect) {
                this.paiQiang.reloadPaiQiang();
                for (var i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.timeDirectionBar.startTime(this);
                this.reloadPlayerChupais();
                this.showShengyuPai();
                this.showReconnectUI();
                this.checkPlayerIsOver();
                this.checkPlayerHasJiao();
            }
            else {
                this.showStartAni(function () {
                    //展现牌局开始动画
                    for (var i = 1; i <= 4; i++) {
                        _this.showShoupaiByIndex(i, false);
                    }
                    _this.setAutoTimeout(_this.fapaiAni, _this, 500);
                });
            }
        };
        ERMJGameScene.prototype.checkPlayerHasJiao = function () {
            return __awaiter(this, void 0, void 0, function () {
                var mineInfo;
                return __generator(this, function (_a) {
                    mineInfo = Global.gameProxy.getMineGameData();
                    if (mineInfo['isBaoTing']) {
                        this.mineShoupaiGroup.playerTing();
                    }
                    this.currentTings = mineInfo.tingCards;
                    this.tipBtn.visible = this.currentTings.length > 0;
                    this.checkHuTips();
                    return [2 /*return*/];
                });
            });
        };
        ERMJGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    // if (!Global.gameProxy.roomInfo) {
                    // await Global.gameProxy.req2updateRoom();
                    // }
                    this.dizhu.bold = true;
                    this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen; //this.difeng;
                    //设置玩家座位标示
                    this.majiangStatus = MajiangStatusEnum.READY;
                    //记录玩家坐标
                    this.directions = majiang.MajiangUtils.getDirectionByERMJ(Global.gameProxy.getMineIndex());
                    this.paiQiang.showPaiQiang(this.directions);
                    this.renderChupaiGroups();
                    this.reloadHuas();
                    this.renderContent();
                    this.backMovie();
                    this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                    SoundManager.getInstance().playMusic("playingingame_mp3");
                    return [2 /*return*/];
                });
            });
        };
        ERMJGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var _a, handler, multi, resp, handler1, multi1, resp1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.stopPropagation();
                            _a = e.target;
                            switch (_a) {
                                case this.restartBtn: return [3 /*break*/, 1];
                                case this.chatBtn: return [3 /*break*/, 2];
                                case this.tipBtn: return [3 /*break*/, 3];
                                case this.ctBar: return [3 /*break*/, 4];
                                case this.qxtgBtn: return [3 /*break*/, 5];
                                case this.gnBtn: return [3 /*break*/, 6];
                                case this.btn_shou: return [3 /*break*/, 7];
                                case this.btn_set: return [3 /*break*/, 8];
                                case this.btn_help: return [3 /*break*/, 9];
                                case this.touchGroup: return [3 /*break*/, 10];
                                case this.backBtn: return [3 /*break*/, 11];
                                case this.gmBtn: return [3 /*break*/, 12];
                                case this.gmStop: return [3 /*break*/, 13];
                                case this.gmRun: return [3 /*break*/, 15];
                            }
                            return [3 /*break*/, 17];
                        case 1:
                            if (this.restartBtn.alpha != 1) {
                                return [2 /*return*/];
                            }
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    ERenClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            this.allowBack = this.restartBtn.visible;
                            this.restartBtnTouch();
                            return [3 /*break*/, 17];
                        case 2:
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            this.chatBtnTouch();
                            return [3 /*break*/, 17];
                        case 3:
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.tipsBtnTouch();
                            return [3 /*break*/, 17];
                        case 4: return [3 /*break*/, 17];
                        case 5:
                            this.cacelTuoguan();
                            return [3 /*break*/, 17];
                        case 6:
                            this.gnBtn.visible = false;
                            this.gnGroup.visible = true;
                            this.touchGroup.addChild(this.gnGroup);
                            return [3 /*break*/, 17];
                        case 7:
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 17];
                        case 8:
                            this.settingBtnTouch();
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 17];
                        case 9:
                            this.helpBtnTouch();
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 17];
                        case 10:
                            if (this.touchShoupai) {
                                this.touchShoupai.change2NoSelect();
                                this.touchShoupai = null;
                                CF.dP(ENo.FIND_COLOR, 0);
                            }
                            if (this.isTingStatus) {
                                this.clearTingStatus();
                                this.taskBar.visible = true;
                                this.mineShoupaiGroup.unLockAll();
                            }
                            this.hideBars();
                            return [3 /*break*/, 17];
                        case 11:
                            if (this.allowBack) {
                                this.backBtnTouch();
                                return [2 /*return*/];
                            }
                            if (this.restartBtn.alpha != 1) {
                                return [2 /*return*/];
                            }
                            this.allowBack = this.restartBtn.visible;
                            this.backBtnTouch();
                            return [3 /*break*/, 17];
                        case 12:
                            this.showMajiangTest();
                            return [3 /*break*/, 17];
                        case 13:
                            handler = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                            multi = { multi: 10 };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, multi)];
                        case 14:
                            resp = _b.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert("失败，重试", null, null, true);
                            }
                            return [3 /*break*/, 17];
                        case 15:
                            handler1 = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                            multi1 = { multi: 0 };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler1, multi1)];
                        case 16:
                            resp1 = _b.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert("失败，重试", null, null, true);
                            }
                            return [3 /*break*/, 17];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        //提牌，换三张，打牌的效果。
        ERMJGameScene.prototype.shoupaiTouchOn = function (e) {
            var touchShoupai = e.data;
            //出牌状态
            if (this.maxTouchShoupai == 1) {
                //已经有选择的牌
                if (this.touchShoupai == touchShoupai && this.touchShoupai.isSelect()) {
                    if (Global.gameProxy.getMineGameData().isBaoTing && this.touchShoupai != this.mineShoupaiGroup.mopai) {
                        return;
                    }
                    if (!Global.gameProxy.checkIsRoundMe()) {
                        return;
                    }
                    if (this.lockChupai) {
                        return;
                    }
                    //如果是轮到出牌
                    CF.dP(ENo.FIND_COLOR, 0);
                    this.chupaiReq(touchShoupai);
                    return;
                    //出牌
                }
                else {
                    if (this.touchShoupai) {
                        this.touchShoupaiClear();
                    }
                    this.touchShoupai = touchShoupai;
                    this.touchShoupai.selectUp();
                    CF.dP(ENo.FIND_COLOR, this.touchShoupai.value);
                    this.showHuTips();
                }
            }
        };
        ERMJGameScene.prototype.chupaiReq = function (touchShoupai) {
            return __awaiter(this, void 0, void 0, function () {
                var pai, mineData, i, outCardArr, tings, j, outTings, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.majiangStatus = MajiangStatusEnum.BLANK;
                            pai = this.touchShoupai;
                            if (this.isTingStatus) {
                                mineData = Global.gameProxy.getMineGameData();
                                if (mineData.outCardTingCards) {
                                    for (i = 0; i < mineData.outCardTingCards.length; i++) {
                                        outCardArr = mineData.outCardTingCards[i];
                                        tings = outCardArr.tings;
                                        for (j = 0; j < tings.length; j++) {
                                            outTings = tings[j];
                                            outTings.fan += 2;
                                        }
                                    }
                                }
                            }
                            return [4 /*yield*/, Global.pomelo.request('game.mjHandler.c_playCard', { card: pai.value, isBaoTing: this.isTingStatus })];
                        case 1:
                            resp = _a.sent();
                            if (resp.error.code == 0) {
                                CF.dP(ENo.SHOUPAI_TOUCH_SUC, touchShoupai);
                                this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
                                // this.touchShoupaiClear();
                            }
                            else if (resp.error.code == -10101) {
                                Global.pomelo.disConnect();
                            }
                            else {
                                this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ERMJGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.aE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.aE(ServerNotify.s_curPlay, this.curPlayPush, this);
            CF.aE(ServerNotify.s_playCard, this.playCardPush, this);
            CF.aE(ServerNotify.s_publicCardChanged, this.publicCardChangedPush, this);
            CF.aE(ServerNotify.s_newCard, this.newCardPush, this);
            CF.aE(ServerNotify.s_playerPengCard, this.playerPengCardPush, this);
            CF.aE(ServerNotify.s_hangupTask, this.hangupTaskPush, this);
            CF.aE(ServerNotify.s_playerGangCard, this.playerGangCard, this);
            CF.aE(ServerNotify.s_playerHu, this.hupaiPush, this);
            CF.aE(ServerNotify.s_syncGold, this.syncGoldPush, this);
            CF.aE(ServerNotify.s_roundSettlement, this.settlementData, this);
            CF.aE(ServerNotify.s_roomFinished, this.roomGameOver, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_playerClearWaitTimeout, this.clearCountDown, this);
            CF.aE(ServerNotify.s_trustee, this.tuoguanStatusPush, this);
            CF.aE(ServerNotify.s_cancelGangForQG, this.qiangGangHu, this);
            CF.aE(ENo.SHOW_GNBTN, this.changGnBtnStat, this);
            CF.aE(ServerNotify.s_roomChat, this.sendMessage, this);
            CF.aE(ServerNotify.s_playHua, this.playerBuhua, this);
            CF.aE(ServerNotify.s_playerChiCard, this.playerChiCard, this);
            CF.aE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
        };
        ERMJGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.rE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.rE(ServerNotify.s_curPlay, this.curPlayPush, this);
            CF.rE(ServerNotify.s_playCard, this.playCardPush, this);
            CF.rE(ServerNotify.s_publicCardChanged, this.publicCardChangedPush, this);
            CF.rE(ServerNotify.s_newCard, this.newCardPush, this);
            CF.rE(ServerNotify.s_playerPengCard, this.playerPengCardPush, this);
            CF.rE(ServerNotify.s_hangupTask, this.hangupTaskPush, this);
            CF.rE(ServerNotify.s_playerGangCard, this.playerGangCard, this);
            CF.rE(ServerNotify.s_playerHu, this.hupaiPush, this);
            CF.rE(ServerNotify.s_syncGold, this.syncGoldPush, this);
            CF.rE(ServerNotify.s_roundSettlement, this.settlementData, this);
            CF.rE(ServerNotify.s_roomFinished, this.roomGameOver, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_playerClearWaitTimeout, this.clearCountDown, this);
            CF.rE(ServerNotify.s_trustee, this.tuoguanStatusPush, this);
            CF.rE(ServerNotify.s_cancelGangForQG, this.qiangGangHu, this);
            CF.rE(ENo.SHOW_GNBTN, this.changGnBtnStat, this);
            CF.rE(ServerNotify.s_roomChat, this.sendMessage, this);
            CF.rE(ServerNotify.s_playHua, this.playerBuhua, this);
            CF.rE(ServerNotify.s_playerChiCard, this.playerChiCard, this);
            CF.rE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
        };
        /**
       * 麻将关闭界面
       * @param  {egret.TouchEvent} e
       */
        ERMJGameScene.prototype.closeMJCall = function (e) {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        };
        ERMJGameScene.prototype.tingInfoPush = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            playerData.tingCards = this.currentTings = data;
        };
        ERMJGameScene.prototype.s_playerTingCards = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            if (data.outCardTingCards) {
                if (playerData.isBaoTing) {
                    return;
                }
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                // if (this.needCheckTing) {
                this.checkHuTips();
                // this.needCheckTing = false;
                // }
            }
            if (data.tingCards) {
                var playerData_1 = Global.gameProxy.getMineGameData();
                playerData_1.tingCards = this.currentTings = data.tingCards;
            }
        };
        /**
         * 添加花牌到胡牌组
         * @param  {} card
         * @param  {} playerIndex
         */
        ERMJGameScene.prototype.add2HuGroup = function (card, playerIndex) {
            var direction = this.directions[playerIndex];
            this[direction + "HupaiGroup"].addBuhua(card);
        };
        ERMJGameScene.prototype.tuoguanStatusPush = function (e) {
            var resp = e.data;
            this.clearTingStatus();
            this.tgGroup.visible = resp.isTrustee;
        };
        /**
         * 玩家报听推送
         */
        ERMJGameScene.prototype.playerBaoTingPush = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData['isBaoTing'] = true;
            this.addEffectAni(this.directions[playerIndex], "ting");
            var header = this.getHeaderByDirection(playerIndex);
            header.showTingImages(true);
            if (playerIndex == Global.gameProxy.getMineIndex()) {
                LogUtils.logD("玩家报听");
                this.mineShoupaiGroup.playerTing();
            }
        };
        /**
         * 玩家吃牌推送
         */
        ERMJGameScene.prototype.playerChiCard = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var chiMaxCard = resp.selectCard;
            var direction = this.directions[playerIndex];
            var from = resp.from;
            var playCard = resp.card;
            //记录玩家碰牌
            Global.gameProxy.recordPlayerChis(playerIndex, playCard, chiMaxCard, resp);
            //最后一张出牌UI删掉
            Global.gameProxy.recordChu2Dianpao(from);
            var lastDirection = this.directions[from];
            this[lastDirection + "ChupaiGroup"].removeLastChupai();
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            //调用碰
            if (direction != "mine") {
                this[direction + "ShoupaiGroup"].removeShoupaiByChi();
                this[direction + "ShoupaiGroup"].changeLast2Mopai(0);
            }
            else {
                this.mineShoupaiGroup.removeShoupaiByChi(playCard, chiMaxCard);
                this.touchShoupaiClear();
                this.mineShoupaiGroup.sortShoupais();
                this.mineShoupaiGroup.changeLast2Mopai();
                this.hideBars();
                this.taskBar.hideAllBtns();
                Global.gameProxy.roomInfo.curPlay = Global.gameProxy.getMineIndex();
                this.checkShowTips();
                this.lockChupai = false;
            }
            //播放碰牌动画
            this.addEffectAni(direction, "chi");
            this.hideChupaiTips();
            var pgGroup = this[direction + "PgGroup"];
            var pengItem = pgGroup.add(5, chiMaxCard);
            pengItem.peng2Chi(chiMaxCard);
            //播放吃牌音效
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "chi");
        };
        ERMJGameScene.prototype.clearTingStatus = function () {
            if (this.isTingStatus) {
                this.isTingStatus = false;
                var mineData = Global.gameProxy.getMineGameData();
                this.mineShoupaiGroup.unLockAll();
                if (mineData.isBaoTing) {
                    this.mineShoupaiGroup.playerTing();
                }
            }
        };
        /**
         * 玩家出牌推送
         * {"playerIndex":1,"card":28}
         * @param  {egret.Event} e
         */
        ERMJGameScene.prototype.playCardPush = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var card = resp.card;
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            playerData.lastCard = 0;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            // this.needCheckTing = false;
            if (direction == "mine") {
                // this.needCheckTing = false;
                this.updateTingByValue(card);
                playerData.outCardTingCards = [];
                this.closeGameTipsGroup();
                Global.gameProxy.updateWanjiaShoupai(card, -1);
                playerData.hangupTasks = null;
                this.taskBar.visible = false;
                this.taskBar.hideAllBtns();
                Global.gameProxy.clearTasks();
                //隐藏胡牌的箭头
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.mineShoupaiGroup.sortShoupaisByChupai(card);
                this.chupaiCallback();
                this.clearTouchOn();
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            }
            else {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, card);
        };
        ERMJGameScene.prototype.clearTouchOn = function () {
            if (this.touchShoupai) {
                this.touchShoupai.change2NoSelect();
                this.touchShoupai = null;
                // this.hideBars();
                CF.dP(ENo.FIND_COLOR, 0);
            }
        };
        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        ERMJGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang.MineShoupai);
            tempChupai.resetValue(value);
            // let tempChupai = new MineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            var targetMajiang;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            switch (direction) {
                case "mine":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.65;
                    targetMajiang = this.mineChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    break;
                case "left":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.2;
                    tempChupai.y -= 50;
                    targetMajiang = this.leftChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    break;
            }
            var pos = targetMajiang.localToGlobal();
            if (Global.runBack) {
                this.showChupaiTips(pos, direction);
                game.UIUtils.removeSelf(tempChupai);
                targetMajiang.visible = true;
                return;
            }
            game.UIUtils.setAnchorPot(tempChupai);
            tempChupai.scaleX = 0;
            tempChupai.scaleY = 0;
            this.lastChupai = targetMajiang;
            egret.Tween.get(tempChupai).to({
                scaleX: 1,
                scaleY: 1
            }, 50).wait(500).to({
                scaleX: 0.5,
                scaleY: 0.5,
                y: pos.y + targetMajiang.height / 2,
                x: pos.x + targetMajiang.width / 2 + 10
            }, 100);
            this.setAutoTimeout(function () {
                _this.showChupaiTips(pos, direction);
                game.UIUtils.removeSelf(tempChupai);
                targetMajiang.visible = true;
            }, this, 650);
        };
        /**
         * 检查task状态
         */
        ERMJGameScene.prototype.checkTask = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var startX = roomInfo.curPlay;
            var direction = this.directions[startX];
            //如果房间中是有任务状态
            var mine = Global.gameProxy.getMineGameData();
            if (mine.hangupTasks) {
                this.taskBar.showBtnsByData(mine);
                this.touchGroup.addChild(this.taskBar);
            }
        };
        /**
         * 玩家杠牌
         * {"playerIndex":1,"from":2,"card":12}
         * @param  {egret.Event} e
         */
        ERMJGameScene.prototype.playerGangCard = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var from = resp.from;
            var direction = this.directions[playerIndex];
            var group = this[direction + "ShoupaiGroup"];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            //记录玩家杠牌
            Global.gameProxy.recordPlayerGang(resp);
            if (direction == "mine") {
                Global.gameProxy.clearLastPai();
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.hideBars();
                this.touchShoupaiClear();
            }
            this.addEffectAni(direction, "gang");
            this.hideChupaiTips();
            playerData.hangupTasks = null;
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                this.mineShoupaiGroup.removeShoupaiByGang(resp.card);
                this[direction + 'ShoupaiGroup'].hideMopai();
            }
            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    // this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    //手上四张暗杠
                    break;
                case 3://点杠
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    var lastDirection = this.directions[from];
                    this[lastDirection + "ChupaiGroup"].removeLastChupai();
                    // this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    break;
            }
            //玩家在胡牌后，当玩家再次产生杠牌的时候，需要减少扣下的牌。
            switch (direction) {
                case "left":
                    if (this.leftHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
                case "right":
                    if (this.rightHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
                case "top":
                    if (this.topHuShowGroup.visible == true) {
                        this.huPaiOrGameOver(direction);
                    }
                    break;
            }
            this.gangCallbackUI(resp, direction);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "gang");
            group.hideMopai();
            //再次检查
        };
        ERMJGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            // this.needCheckTing = true;
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
            // majiang.MajiangUtils.playHPGSound(playerData.sex, 1);
        };
        ERMJGameScene.prototype.publicCardChangedPush = function (e) {
            var resp = e.data;
            if (resp.cardNum > 91) {
                return;
            }
        };
        /**
         * 摸牌推送
         * {"playerIndex":2,"card":24,"remain":80,existHangup:}
         * @param  {egret.Event} e
         */
        ERMJGameScene.prototype.newCardPush = function (e) {
            var resp = e.data;
            // this.taskBar.hideAllBtns();
            this.clearTingStatus();
            this.newCard(resp);
            if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                this.setAutoTimeout(function () {
                    // this.needCheckTing = true;
                    CF.dP(ENo.TING_FLUSH, resp);
                }, this, 400);
            }
        };
        ERMJGameScene.prototype.newCard = function (resp) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            var direction = this.directions[resp.playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            if (direction == "mine") {
                //先刷新自己手牌
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
                }
                Global.gameProxy.updateWanjiaShoupai(resp.card, 1);
                playerData.lastCard = resp.card;
                if (playerData.isTrustee && Math.floor(resp.card / 5) == 0) {
                }
                else {
                    this.mineShoupaiGroup.playerNewCardPush(playerData.lastCard);
                    this.checkShowTips();
                    this.lockChupai = true;
                    egret.clearTimeout(this.lockChupaiTimeout);
                    this.lockChupaiTimeout = egret.setTimeout(function () {
                        this.lockChupai = false;
                        ;
                    }, this, 800);
                }
            }
            else {
                this[direction + "ShoupaiGroup"].playerNewCardPush();
                playerData.lastCard = 1;
            }
        };
        /**
         * 胡牌推送
         *  {"playerIndex":1,"card":23,"from":1,"syncGold":{"1":{"1":{"type":2,"info":{"gainGold":3,"pumpGold":0,"ownGold":9503,"card":23}}
         * "2":{"type":2,"info":{"gainGold":-3,"pumpGold":0,"ownGold":9497,"card":23}}}}}
         * @param  {egret.Event} e
         */
        ERMJGameScene.prototype.hupaiPush = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, playerIndex, card, from, mainCard, mineData, huPlayerData, direction, lastDirection, time;
                return __generator(this, function (_a) {
                    this.clearCountDown();
                    this.clearTingStatus();
                    resp = e.data;
                    playerIndex = resp.playerIndex;
                    card = resp.card;
                    from = resp.from;
                    mainCard = resp.mainCard;
                    mineData = Global.gameProxy.getMineGameData();
                    Global.gameProxy.addHuTasks(resp);
                    huPlayerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                    huPlayerData.huCards.push(card);
                    direction = this.directions[playerIndex];
                    this.hideChupaiTips();
                    this.taskBar.hideAllBtns();
                    //zimo 
                    if (Global.gameProxy.roomInfo.publicCardNum != 0) {
                        this.huPaiOrGameOver(direction);
                    }
                    if (direction == "mine") {
                        this[direction + "ShoupaiGroup"].lockHu();
                        this.touchShoupaiClear();
                        this.mineShoupaiGroup.changePaiToVisible(false);
                        if (Global.gameProxy.roomInfo.gameId.indexOf("xlch") > -1) {
                            this.setAutoTimeout(function () {
                                _this.showGameTipGroup(3);
                            }, this, 2000);
                        }
                    }
                    if (game.Utils.valueEqual(playerIndex, from)) {
                        this[direction + "ShoupaiGroup"].hideMopai();
                        if (direction == "mine") {
                            huPlayerData.lastCard = 0;
                            this.clearTouchOn();
                            Global.gameProxy.updateWanjiaShoupai(card, -1);
                            // this.mineShoupaiGroup.sortMineShoupai();
                        }
                        if (resp.gsh) {
                            this.addEffectAni(direction, "gsh");
                        }
                        else {
                            this.addEffectAni(direction, "zimo");
                        }
                        this[direction + "HupaiGroup"].addHu(resp, 2);
                        majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
                    }
                    else {
                        lastDirection = this.directions[from];
                        this.addEffectAni(direction, "hu");
                        Global.gameProxy.recordChu2Dianpao(from);
                        if (this.g2p == 1) {
                            this.setAutoTimeout(function () {
                                _this[direction + "HupaiGroup"].addHu(resp, 1);
                            }, this, 400);
                        }
                        else {
                            time = this[lastDirection + "ChupaiGroup"].showDianpaoAni(mainCard);
                            this.setAutoTimeout(function () {
                                _this[direction + "HupaiGroup"].addHu(resp, 1);
                            }, this, time);
                        }
                        this.g2p = 0;
                        majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "hu");
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 玩家报听
         */
        ERMJGameScene.prototype.playerBaoTing = function (tasks) {
            this.isTingStatus = true;
            var mineData = Global.gameProxy.getMineGameData();
            var tings = mineData.outCardTingCards;
            this.mineShoupaiGroup.lockHu();
            if (this.mineShoupaiGroup.mopai) {
                this.mineShoupaiGroup.mopai.huLight();
            }
            for (var i = 0; i < tings.length; i++) {
                var task = tings[i];
                var out = task.out;
                this.mineShoupaiGroup.unLockByValue(out);
            }
        };
        /**
         * 玩家认输
         * @param  {} direction
         */
        ERMJGameScene.prototype.createRenshuFont = function (direction) {
        };
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        ERMJGameScene.prototype.createHJZYByDirection = function (direction, value) {
        };
        /**
         * 对局结束
         */
        ERMJGameScene.prototype.showDuijuAni = function (callback) {
            var name = "duijujieshu";
            var image = GameCacheManager.instance.getCache(name, eui.Image);
            image.source = RES.getRes("duijujieshu_png");
            image.horizontalCenter = -30;
            image.verticalCenter = -50;
            this.addChild(image);
            image.alpha = 0;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 30, alpha: 1 }, 1000)
                .to({ alpha: 0 }, 500)
                .wait(1000).call(callback, this);
        };
        ERMJGameScene.prototype.showHuangZhuang = function (callback) {
            var name = "dzmj_hpts";
            var image = new eui.Image(RES.getRes("dzmj_hpts_png"));
            image.horizontalCenter = -30;
            image.verticalCenter = -50;
            this.addChild(image);
            image.alpha = 0;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 0, alpha: 1 }, 1000)
                .wait(1000).call(callback, this);
        };
        /**
         * 游戏数据结算信息。
         */
        ERMJGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players;
                return __generator(this, function (_a) {
                    this.restartBtn.visible = false;
                    this.majiangStatus = MajiangStatusEnum.OVER;
                    this.timeDirectionBar.removeTimer();
                    this.tgGroup.visible = false;
                    resp = e.data;
                    players = resp.players;
                    this.tgGroup.visible = false; //解决牌局结束，托管不消失。
                    this.gameOverShow(players);
                    LogUtils.logD("结算日志：有问题复制这个:  " + JSON.stringify(resp));
                    if (resp.winPlayer == -1) {
                        this.showHuangZhuang(function () {
                            _this.restartBtn.visible = true;
                            _this.restartBtn.alpha = 0;
                            egret.Tween.get(_this.restartBtn).to({
                                alpha: 1
                            }, 300);
                        });
                        return [2 /*return*/];
                    }
                    this.showDuijuAni(function () {
                        if (!Global.gameProxy.roomInfo) {
                            return;
                        }
                    });
                    this.setAutoTimeout(function () {
                        //修改所有玩家金币至抽水过后的金币
                        for (var index in players) {
                            var goldData = players[index];
                            var header = _this.getHeaderByDirection(index);
                            goldData.ownGold = goldData.ownGold;
                            header.updateGold(goldData.ownGold);
                        }
                        var mineData = Global.gameProxy.getMineGameData();
                        Global.playerProxy.updatePlayerGold(mineData.gold);
                        CF.sN(SceneNotify.OPEN_ERMJ_OVER, { players: players, status: resp.status, winPlayer: resp.winPlayer });
                    }, this, 2500);
                    return [2 /*return*/];
                });
            });
        };
        ERMJGameScene.prototype.hideBars = function () {
            if (this.huTipsBar) {
                this.huTipsBar.hideBar();
            }
            if (this.ctBar) {
                this.ctBar.hideBar();
            }
        };
        /**
         * 听牌提示
         */
        ERMJGameScene.prototype.tipsBtnTouch = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            if (this.huTipsBar.visible) {
                this.huTipsBar.hideBar();
                return;
            }
            this.lastHuTips = this.currentTings;
            this.showhupaiBar();
        };
        /**
        * 抢杠胡牌
        */
        ERMJGameScene.prototype.qiangGangHu = function (e) {
            this.g2p = 1;
            var resp = e.data;
            var direction = this.directions[resp.playerIndex];
            var color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        };
        /**
         * 刷新胡牌提示
         */
        ERMJGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        ERMJGameScene.prototype.showhupaiBar = function () {
            for (var i = 0; i < this.lastHuTips.length; i++) {
                var huTip = this.lastHuTips[i];
                var count = majiang.MajiangUtils.findValueLess(huTip.value || huTip.card);
                huTip.count = count;
            }
            this.huTipsBar.showBar(this.lastHuTips);
        };
        /**
         * 检查当前手牌能否胡牌
         */
        ERMJGameScene.prototype.updateTingByValue = function (value) {
            var playerData = Global.gameProxy.getMineGameData();
            if (playerData.isBaoTing) {
                this.tipBtn.visible = true;
                return;
            }
            var tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = this.currentTings.length > 0;
            }
        };
        /**
         * 展现胡牌
         */
        ERMJGameScene.prototype.showHuTips = function () {
            var mineShoupai = this.touchShoupai;
            if (Global.gameProxy.getMineGameData().huCards.length > 0) {
                return;
            }
            var value = mineShoupai.value;
            var mineData = Global.gameProxy.getMineGameData();
            //听牌状态
            var tings = mineData.outCardTingCards;
            if (tings) {
                this.lastHuTips = this.getTingArr(tings, mineShoupai.value);
                this.tipsBarFlush();
            }
        };
        ERMJGameScene.prototype.getTingArr = function (tings, value) {
            for (var i = 0; i < tings.length; i++) {
                var ting = tings[i];
                if (ting.out == value) {
                    return ting.tings;
                }
            }
            return [];
        };
        /**
         * 检测胡牌提示
         */
        ERMJGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
            if (mineData.isBaoTing) {
                return;
            }
            // if (Global.gameProxy.checkIsRoundMe()) {
            var tings = mineData.outCardTingCards;
            if (tings) {
                for (var i = 0; i < tings.length; i++) {
                    var data = tings[i].out;
                    this.mineShoupaiGroup.showHuTipsByValue(data);
                }
                // }
            }
        };
        //-------游戏内提示
        ERMJGameScene.prototype.showGameTipGroup2 = function () {
        };
        ERMJGameScene.prototype.checkShowTips = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == this.startNumber && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
        };
        return ERMJGameScene;
    }(majiang.BaseMajiangScene));
    majiang.ERMJGameScene = ERMJGameScene;
    __reflect(ERMJGameScene.prototype, "majiang.ERMJGameScene");
})(majiang || (majiang = {}));
