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
    var HBMJGameScene = (function (_super) {
        __extends(HBMJGameScene, _super);
        function HBMJGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "hbmj";
            _this.startNumber = 112;
            /**
             * 检查玩家是否有叫
             */
            _this.currentTings = [];
            _this.needCheckTing = true;
            //---检查有没有可以胡牌
            _this.huCards = [];
            _this.lastHuTips = [];
            _this.isTingStatus = false;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_HBMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_HBMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_HBMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_HBMJ_MATCHING;
            _this.skinName = new majiang.HBMJGameSceneSkin();
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        HBMJGameScene.prototype.fapaiRound4 = function (sortDir) {
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
                this.fapaiRoundOver();
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
                        _this.fapaiRoundOver();
                    }, _this, 400);
                }, _this, 400);
            });
        };
        HBMJGameScene.prototype.fapaiRoundOver = function () {
            var _this = this;
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            var roomInfo = Global.gameProxy.roomInfo;
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            this.setAutoTimeout(function () {
                _this.timeDirectionBar.startTime(_this);
                roomInfo.curPlay = roomInfo.dealer;
                _this.checkChupaiStatus();
            }, this, 200);
        };
        HBMJGameScene.prototype.startChupai = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            this.checkChupaiStatus();
            this.timeDirectionBar.startTime(this);
        };
        HBMJGameScene.prototype.checkChupaiStatus = function () {
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
                this.checkHuTips();
            }
        };
        /**
         * 显示重新连接上来的UI
         */
        HBMJGameScene.prototype.showReconnectUI = function () {
            // this.checkHszStatus(roomInfo);
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        };
        HBMJGameScene.prototype.renderContent = function () {
            var _this = this;
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            if (Global.gameProxy.reconnect) {
                var roomInfo = Global.gameProxy.roomInfo;
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
                this.checkPlayerLiangdao();
                this.timeDirectionBar.startTime(this);
            }
            else {
                var roomInfo = Global.gameProxy.roomInfo;
                this.showStartAni(function () {
                    //展现牌局开始动画
                    for (var i = 1; i <= 3; i++) {
                        _this.showShoupaiByIndex(i, false);
                    }
                    _this.setAutoTimeout(_this.fapaiAni, _this, 500);
                });
            }
        };
        HBMJGameScene.prototype.reloadPlayerGangs = function () {
            var players = Global.gameProxy.getPlayers();
            for (var key in players) {
                var playerData = players[key];
                var direction = this.directions[key];
                var pengs = playerData.gangCards;
                for (var i = 0; i < pengs.length; i++) {
                    this[direction + 'PgGroup'].add(pengs[i].realGang, pengs[i].card, 2);
                }
            }
            this.reloadPlayerChis();
        };
        /**
         * 重连回显玩家亮倒
         */
        HBMJGameScene.prototype.checkPlayerLiangdao = function () {
            var players = Global.gameProxy.roomInfo.players;
            for (var key in players) {
                var playerData = players[key];
                if (playerData.displayCard) {
                    if (Global.gameProxy.checkIndexIsMe(key)) {
                        this.mineShoupaiGroup.lockHu();
                    }
                    else {
                        var direction = this.directions[key];
                        this.playerLiangPai(direction, playerData);
                        this[direction + "HuTip"].setPlayerIndex(key);
                        this[direction + "HuTip"].showLightTip();
                    }
                }
            }
        };
        HBMJGameScene.prototype.chupaiReq = function (touchShoupai) {
            return __awaiter(this, void 0, void 0, function () {
                var pai, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.majiangStatus = MajiangStatusEnum.BLANK;
                            pai = this.touchShoupai;
                            return [4 /*yield*/, Global.pomelo.request('game.mjHandler.c_playCard', { card: pai.value, isDisplayCard: this.isTingStatus })];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code == 0) {
                                CF.dP(ENo.SHOUPAI_TOUCH_SUC, touchShoupai);
                                this.majiangStatus = MajiangStatusEnum.OTHER_CHUPAI;
                                // this.touchShoupaiClear();
                            }
                            else if (resp && resp.error && resp.error.code == -10101) {
                                Global.pomelo.disConnect();
                            }
                            else if (resp && resp.error && resp.error.code == -10235) {
                                Toast.launch("癞子牌不能打出~");
                            }
                            else if (resp && resp.error && resp.error.code == -12001) {
                                Toast.launch("炮牌不能打出~");
                            }
                            else {
                                this.majiangStatus = MajiangStatusEnum.MINE_CHUPAI;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * 开始发牌动画
        */
        HBMJGameScene.prototype.fapaiAni = function () {
            this.majiangStatus = MajiangStatusEnum.FAPAI;
            //庄家几号位
            this.syLabel.text = this.startNumber + "";
            Global.gameProxy.roomInfo.publicCardNum = this.startNumber;
            var zhuangIndex = Global.gameProxy.roomInfo.dealer;
            var sortDir = majiang.MajiangUtils.getDirectionSortByZhuangHBMJ(zhuangIndex);
            //开始第一轮发牌
            this.fapaiRound1(sortDir);
        };
        /**
         * 展示我的手牌
         */
        HBMJGameScene.prototype.showShoupaiByMine = function (flag) {
            if (flag === void 0) { flag = true; }
            var cardsArr = Global.gameProxy.getMineSHoupaiArrLz();
            if (!flag) {
                cardsArr = _.shuffle(cardsArr);
            }
            this.mineShoupaiGroup.initWithArr(cardsArr, flag);
        };
        HBMJGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            // this.needCheckTing = true;
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
        };
        HBMJGameScene.prototype.checkPlayerHasJiao = function () {
            return __awaiter(this, void 0, void 0, function () {
                var mineInfo;
                return __generator(this, function (_a) {
                    mineInfo = Global.gameProxy.getMineGameData();
                    this.currentTings = mineInfo.tingCards;
                    if (this.currentTings) {
                        this.tipBtn.visible = this.currentTings.length > 0;
                        this.checkHuTips();
                    }
                    return [2 /*return*/];
                });
            });
        };
        HBMJGameScene.prototype.createChildren = function () {
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
                    this.directions = majiang.MajiangUtils.getDirectionByHBMJ(Global.gameProxy.getMineIndex());
                    this.paiQiang.showPaiQiang(this.directions);
                    this.renderChupaiGroups();
                    this.renderHupaiGroup();
                    this.renderContent();
                    this.backMovie();
                    this.wanfaImage.source = RES.getRes("hbmj_wanfa_png");
                    // this.mineShoupaiGroup.showo()
                    this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                    SoundManager.getInstance().playMusic("playingingame_mp3");
                    return [2 /*return*/];
                });
            });
        };
        HBMJGameScene.prototype.renderHupaiGroup = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                var hupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                var huCardsArr = this.getHupaiArrByHuTask(key);
                hupaiGroup.initWithArr(huCardsArr);
            }
        };
        HBMJGameScene.prototype.onTouchTap = function (e) {
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
                                case this.lsBtn: return [3 /*break*/, 4];
                                case this.ctBar: return [3 /*break*/, 5];
                                case this.qxtgBtn: return [3 /*break*/, 6];
                                case this.gnBtn: return [3 /*break*/, 7];
                                case this.btn_shou: return [3 /*break*/, 8];
                                case this.btn_set: return [3 /*break*/, 9];
                                case this.btn_help: return [3 /*break*/, 10];
                                case this.touchGroup: return [3 /*break*/, 11];
                                case this.backBtn: return [3 /*break*/, 12];
                                case this.gmBtn: return [3 /*break*/, 13];
                                case this.gmStop: return [3 /*break*/, 14];
                                case this.gmRun: return [3 /*break*/, 16];
                            }
                            return [3 /*break*/, 18];
                        case 1:
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    HBMJClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            if (this.restartBtn.alpha != 1) {
                                return [2 /*return*/];
                            }
                            this.allowBack = this.restartBtn.visible;
                            this.restartBtnTouch();
                            return [3 /*break*/, 18];
                        case 2:
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            this.chatBtnTouch();
                            return [3 /*break*/, 18];
                        case 3:
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.tipsBtnTouch();
                            return [3 /*break*/, 18];
                        case 4:
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.lsBtnTouch();
                            return [3 /*break*/, 18];
                        case 5: return [3 /*break*/, 18];
                        case 6:
                            this.cacelTuoguan();
                            return [3 /*break*/, 18];
                        case 7:
                            this.gnBtn.visible = false;
                            this.gnGroup.visible = true;
                            this.touchGroup.addChild(this.gnGroup);
                            return [3 /*break*/, 18];
                        case 8:
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 18];
                        case 9:
                            this.settingBtnTouch();
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 18];
                        case 10:
                            this.helpBtnTouch();
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            return [3 /*break*/, 18];
                        case 11:
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
                            return [3 /*break*/, 18];
                        case 12:
                            if (this.allowBack) {
                                this.backBtnTouch();
                                return [2 /*return*/];
                            }
                            if (this.restartBtn.alpha != 1) {
                                return [2 /*return*/];
                            }
                            this.allowBack = this.restartBtn.visible;
                            this.backBtnTouch();
                            return [3 /*break*/, 18];
                        case 13:
                            this.showMajiangTest();
                            return [3 /*break*/, 18];
                        case 14:
                            handler = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                            multi = { multi: 10 };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, multi)];
                        case 15:
                            resp = _b.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert("失败，重试", null, null, true);
                            }
                            return [3 /*break*/, 18];
                        case 16:
                            handler1 = ServerPostPath.game_mjHandler_c_setAIThinkTime;
                            multi1 = { multi: 0 };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler1, multi1)];
                        case 17:
                            resp1 = _b.sent();
                            if (resp.error && resp.error.code != 0) {
                                Global.alertMediator.addAlert("失败，重试", null, null, true);
                            }
                            return [3 /*break*/, 18];
                        case 18: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 出牌的点击
         * @param  {egret.TouchEvent} e
         */
        HBMJGameScene.prototype.shoupaiTouchOn = function (e) {
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
        HBMJGameScene.prototype.onAdded = function () {
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
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.aE(ServerNotify.s_displayCardInfo, this.s_displayCardInfo, this);
        };
        HBMJGameScene.prototype.onRemoved = function () {
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
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.rE(ServerNotify.s_displayCardInfo, this.s_displayCardInfo, this);
        };
        /**
         * 听牌提示
         * @param  {egret.TouchEvent} e
         */
        HBMJGameScene.prototype.s_playerTingCards = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            if (data && data.outCardTingCards) {
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                // if (this.needCheckTing) {
                this.checkHuTips();
                // this.needCheckTing = false;
                // }
            }
            if (data && data.tingCards) {
                var playerData_1 = Global.gameProxy.getMineGameData();
                playerData_1.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData_1.tingCards.length > 0;
                playerData_1.outCardTingCards = null;
            }
        };
        /**
         *
         * @param  {egret.TouchEvent} e
         */
        HBMJGameScene.prototype.s_displayCardInfo = function (e) {
            var data = e.data;
            var playerIndex = data.pIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.displayCard = data.displayCard;
            playerData.canHuCards = data.canHuCards;
            if (data.cardNum) {
                playerData.cardNum = data.cardNum;
            }
            var direction = this.directions[playerIndex];
            if (direction == "mine") {
                this.mineShoupaiGroup.lockHu();
                this.mineShoupaiGroup.showHuTipsByValue(-1);
            }
            else {
                //其他玩家摊牌
                this.playerLiangPai(direction, playerData);
                this[direction + "HuTip"].setPlayerIndex(playerIndex);
                this[direction + "HuTip"].showLightTip();
                this.mineShoupaiGroup.flushPaoImage();
            }
            var header = this.getHeaderByDirection(playerIndex);
            header.showLiangDaoImage(true);
            this.addEffectAni(direction, "liangdao");
        };
        /**
         * 正常胡牌与牌局结束牌面展示
         */
        HBMJGameScene.prototype.playerLiangPai = function (direction, playerData) {
            switch (direction) {
                case "left":
                    this.leftHuShowGroup.removeChildren();
                    var lefts = new majiang.LeftShowPai(this.leftShoupaiGroup.shoupais, 3);
                    this.leftHuShowGroup.addChild(lefts);
                    this.leftHuShowGroup.visible = true;
                    this.leftShoupaiGroup.shoupaisVisible(); //手牌影藏。
                    lefts.liangdaoMJ(playerData);
                    break;
                case "right":
                    this.rightHuShowGroup.removeChildren();
                    var rights = new majiang.RightShowPai(this.rightShoupaiGroup.shoupais, 3);
                    this.rightHuShowGroup.addChild(rights);
                    this.rightHuShowGroup.visible = true;
                    this.rightShoupaiGroup.shoupaisVisible();
                    rights.liangdaoMJ(playerData);
                    break;
            }
        };
        HBMJGameScene.prototype.tingInfoPush = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            playerData.tingCards = this.currentTings = data;
        };
        HBMJGameScene.prototype.add2HuGroup = function (card, playerIndex) {
            var direction = this.directions[playerIndex];
            this[direction + "HupaiGroup"].addBuhua(card);
        };
        HBMJGameScene.prototype.clearTingStatus = function () {
            if (this.isTingStatus) {
                this.isTingStatus = false;
                var mineData = Global.gameProxy.getMineGameData();
                this.mineShoupaiGroup.unLockAll();
                if (mineData.displayCard != null) {
                    this.mineShoupaiGroup.lockHu();
                }
            }
        };
        /**
         * 玩家出牌推送
         * {"playerIndex":1,"card":28}
         * @param  {egret.Event} e
         */
        HBMJGameScene.prototype.playCardPush = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var card = resp.card;
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            this.mineShoupaiGroup.changePaiToVisible(false);
            if (direction == "mine") {
                this.closeGameTipsGroup();
                this.updateTingByValue(card);
                playerData.outCardTingCards = [];
                playerData.lastCard = 0;
                Global.gameProxy.updateWanjiaShoupai(card, -1);
                playerData.hangupTasks = null;
                this.taskBar.visible = false;
                this.taskBar.hideAllBtns();
                Global.gameProxy.clearTasks();
                //隐藏胡牌的箭头
                this.mineShoupaiGroup.sortShoupaisByChupai(card);
                this.chupaiCallback();
                this.clearTouchOn();
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            }
            else {
                playerData.lastCard = 0;
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, card);
        };
        HBMJGameScene.prototype.clearTouchOn = function () {
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
        HBMJGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang.GDMJMineShoupai);
            tempChupai.resetValue(value);
            // let tempChupai = new GDMJMineShoupai(value);
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
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.displayCard != null);
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.displayCard != null);
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.displayCard != null);
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
          * 玩家task推送
          * @param  {egret.Event} e
          */
        HBMJGameScene.prototype.hangupTaskPush = function (e) {
            var resp = e.data;
            var mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
        };
        /**
         * 麻将关闭界面
         * @param  {egret.TouchEvent} e
         */
        HBMJGameScene.prototype.closeMJCall = function (e) {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        };
        /**
         * 检查task状态
         */
        HBMJGameScene.prototype.checkTask = function () {
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
        HBMJGameScene.prototype.playerGangCard = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var from = resp.from;
            var direction = this.directions[playerIndex];
            var group = this[direction + "ShoupaiGroup"];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            //记录玩家杠牌
            Global.gameProxy.recordPlayerGang(resp, true);
            if (direction == "mine") {
                Global.gameProxy.clearLastPai();
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.hideBars();
                this.touchShoupaiClear();
            }
            if (resp.gang == 5 || resp.gsg) {
                this.addEffectAni(direction, "gsg");
            }
            else {
                this.addEffectAni(direction, "gang");
            }
            this.hideChupaiTips();
            playerData.hangupTasks = null;
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                this.mineShoupaiGroup.removeShoupaiByGang(resp.card);
                this[direction + 'ShoupaiGroup'].hideMopai();
                // if(resp.gang == 2 || resp.gang == 4){
                //     this.updateTingByValue(resp.card);
                // }
            }
            switch (resp.realGang) {
                case 1://碰变杠,吊4个正面，巴雨
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
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
                    break;
            }
            //玩家在胡牌后，当玩家再次产生杠牌的时候，需要减少扣下的牌。
            switch (direction) {
                case "left":
                    if (this.leftHuShowGroup.visible == true) {
                        this.playerLiangPai(direction, playerData);
                    }
                    break;
                case "right":
                    if (this.rightHuShowGroup.visible == true) {
                        this.playerLiangPai(direction, playerData);
                    }
                    break;
                case "top":
                    if (this.topHuShowGroup.visible == true) {
                        this.playerLiangPai(direction, playerData);
                    }
                    break;
            }
            //以上玩家数据修改 以下 玩家UI修改
            switch (resp.realGang) {
                case 1://碰变杠,吊4个正面，巴雨
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(1, resp.card, 1);
                            break;
                        case "right":
                            this.rightPgGroup.add(1, resp.card, 1);
                            break;
                        case "top":
                            this.topPgGroup.add(1, resp.card, 1);
                            break;
                        case "mine":
                            this.minePgGroup.add(1, resp.card, 1);
                            break;
                    }
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(4, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(4, resp.card);
                            break;
                        case "top":
                            this.topPgGroup.add(4, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(4, resp.card);
                            break;
                    }
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(2, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(2, resp.card);
                            break;
                        case "top":
                            this.topPgGroup.add(2, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(2, resp.card);
                            break;
                    }
                    break;
                case 3://碰变杠,调4个正面，这里是自己碰，别人点。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(3, resp.card);
                            break;
                        case "right":
                            this.rightPgGroup.add(3, resp.card);
                            break;
                        case "top":
                            this.topPgGroup.add(3, resp.card);
                            break;
                        case "mine":
                            this.minePgGroup.add(3, resp.card);
                            break;
                    }
                    break;
            }
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "gang");
            group.hideMopai();
            //再次检查
            // this.checkTask();
        };
        HBMJGameScene.prototype.publicCardChangedPush = function (e) {
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
        HBMJGameScene.prototype.newCardPush = function (e) {
            var resp = e.data;
            // this.taskBar.hideAllBtns();
            this.newCard(resp);
            if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                this.setAutoTimeout(function () {
                    CF.dP(ENo.TING_FLUSH, resp);
                }, this, 400);
            }
        };
        HBMJGameScene.prototype.newCard = function (resp) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            var direction = this.directions[resp.playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            // this.needCheckTing = true;
            if (direction == "mine") {
                //先刷新自己手牌
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
                }
                this.checkHuTips();
                Global.gameProxy.updateWanjiaShoupai(resp.card, 1);
                playerData.lastCard = resp.card;
                if (playerData.isTrustee && Math.floor(resp.card / 5) == 0) {
                }
                else {
                    this.mineShoupaiGroup.playerNewCardPush(playerData.lastCard);
                    this.checkShowTips();
                    this.lockChupai = true;
                    egret.clearTimeout(this.lockChupaiTimeout);
                    this.lockChupaiTimeout = this.setAutoTimeout(function () {
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
        HBMJGameScene.prototype.hupaiPush = function (e) {
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
        HBMJGameScene.prototype.playerBrights = function (tasks) {
            this.isTingStatus = true;
            var brights = tasks[0].brights;
            this.mineShoupaiGroup.lockHu();
            if (this.mineShoupaiGroup.mopai) {
                this.mineShoupaiGroup.mopai.huLight();
            }
            for (var i = 0; i < brights.length; i++) {
                var task = brights[i];
                var out = task.out;
                this.mineShoupaiGroup.unLockByValue(out);
            }
        };
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        HBMJGameScene.prototype.createHJZYByDirection = function (direction, value) {
        };
        HBMJGameScene.prototype.showHuangZhuang = function (callback) {
            var image = new eui.Image(RES.getRes("hnmj_liuju_png"));
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
         * 对局结束
         */
        HBMJGameScene.prototype.showDuijuAni = function (winPlayerLength) {
            var name = "duijujieshu";
            if (this.paiQiang.getPaiQiangNum() <= 0 && winPlayerLength == 0) {
                name = "hnmj_liuju_png";
            }
            var image = GameCacheManager.instance.getCache(name, eui.Image);
            image.source = RES.getRes(name);
            image.horizontalCenter = -30;
            image.verticalCenter = -50;
            this.addChild(image);
            image.alpha = 0;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 30, alpha: 1 }, 1000)
                .to({ alpha: 0 }, 500);
        };
        /**
         * 游戏数据结算信息。
         */
        HBMJGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players;
                return __generator(this, function (_a) {
                    this.allowBack = false;
                    this.restartBtn.visible = false;
                    this.majiangStatus = MajiangStatusEnum.OVER;
                    this.timeDirectionBar.removeTimer();
                    this.tgGroup.visible = false;
                    resp = e.data;
                    resp.winPlayer = _.unique(resp.winPlayer);
                    LogUtils.logD("结算日志：有问题复制这个:  " + JSON.stringify(resp));
                    players = resp.players;
                    this.gameOverShow(players);
                    this.setAutoTimeout(function () {
                        _this.showDuijuAni(resp.winPlayer.length);
                    }, this, 1000);
                    this.setAutoTimeout(function () {
                        if (!Global.gameProxy.roomInfo) {
                            return;
                        }
                        //修改所有玩家金币至抽水过后的金币
                        for (var index in players) {
                            var goldData = players[index];
                            var header = _this.getHeaderByDirection(index);
                            // if (goldData.ownGold) {
                            goldData.ownGold = goldData.ownGold;
                            header.updateGold(goldData.ownGold);
                            if (Global.gameProxy.checkIndexIsMe(index)) {
                                var mineData = Global.gameProxy.getMineGameData();
                                Global.playerProxy.updatePlayerGold(goldData.ownGold);
                            }
                            // }
                        }
                        _this.allowBack = true;
                        CF.sN(SceneNotify.OPEN_HBMJ_OVER, resp);
                    }, this, 3500);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 听牌提示
         */
        HBMJGameScene.prototype.tipsBtnTouch = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsScrollerBar();
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
        HBMJGameScene.prototype.qiangGangHu = function (e) {
            this.g2p = 1;
            var resp = e.data;
            var direction = this.directions[resp.playerIndex];
            var color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        };
        /**
         * 刷新胡牌提示
         */
        HBMJGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        HBMJGameScene.prototype.showhupaiBar = function () {
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
        HBMJGameScene.prototype.updateTingByValue = function (value) {
            var playerData = Global.gameProxy.getMineGameData();
            var tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = this.currentTings.length > 0;
            }
        };
        /**
         * 展现胡牌
         */
        HBMJGameScene.prototype.showHuTips = function () {
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
        HBMJGameScene.prototype.getTingArr = function (tings, value) {
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
        HBMJGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
            if (mineData.displayCard) {
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
        /**
         * 牌局结束，暂时没有用。
         */
        HBMJGameScene.prototype.roomGameOver = function (e) {
            _super.prototype.roomGameOver.call(this, e);
            var resp = e.data;
            this.allowBack = false;
            // this.restartBtn.visible = true;
            // this.restartBtn.alpha = 0;
        };
        //-------游戏内提示
        HBMJGameScene.prototype.showGameTipGroup2 = function () {
        };
        HBMJGameScene.prototype.checkShowTips = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == 112 && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
        };
        return HBMJGameScene;
    }(majiang.BaseMajiangScene));
    majiang.HBMJGameScene = HBMJGameScene;
    __reflect(HBMJGameScene.prototype, "majiang.HBMJGameScene");
})(majiang || (majiang = {}));
