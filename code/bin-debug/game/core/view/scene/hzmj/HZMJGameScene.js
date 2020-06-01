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
    var HZMJGameScene = (function (_super) {
        __extends(HZMJGameScene, _super);
        function HZMJGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "hzmj";
            _this.cacheHua = false;
            _this.startNumber = 136;
            /**玩家第一次有财神牌*/
            _this.m_firtTimeHaveCaiShen = false;
            /**
             * 检查玩家是否有叫
             */
            _this.currentTings = [];
            _this.shuzu = ["piao", "caipiao", "chengbao", "scp", "shuangcp", "stld", "baotou", "gsh"];
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
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_HZMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_HZMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_HZMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_HZMJ_MATCHING;
            // this.skinName = new majiang.DZMJGameSceneSkin();
            _this.skinName = "resource/skins/scene/hzmj/HZMJGameSceneSkin.exml";
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        HZMJGameScene.prototype.fapaiRound4 = function (sortDir) {
            var _this = this;
            var indexNum = 0;
            var fapaiCall = function (index) {
                if (indexNum == 0) {
                    /**移动牌墙 更新手牌的个数  index=0是庄家*/
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
                /**当到了玩家的索引号的时候 表现玩家的发牌动画 */
                if (index == Global.gameProxy.playerInfo.playerIndex) {
                    _this.mineFapaiAni(13);
                }
                else {
                    _this.otherFapaiAni(index, 13);
                }
                indexNum++;
            };
            /**Global.runBack 表示有没有后台运行 */
            if (Global.runBack) {
                for (var i = 0; i < sortDir.length; i++) {
                    fapaiCall(sortDir[i]);
                }
                this.updateSypai();
                this.mineShoupaiGroup.sortShoupais();
                this.fapaiRoundOver();
                return;
            }
            /**串联执行*/
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
                    // this.haveCaiShenCard();
                    _this.setAutoTimeout(function () {
                        _this.fapaiRoundOver();
                    }, _this, 400);
                }, _this, 400);
            });
        };
        /**手牌第一次有财神牌时*/
        HZMJGameScene.prototype.showCaiShenCardTips = function (playerindex) {
            // let roomInfo = Global.gameProxy.roomInfo;
            // let playerData: PlayerGameDataBean = roomInfo.players[playerindex];
            var direction = this.directions[playerindex];
            var mineData = Global.gameProxy.getPlayerByIndex(playerindex);
            var haveshowCaiShenTip = mineData.haveShowCaiShenTip;
            var cards = mineData.cards;
            if (haveshowCaiShenTip)
                return;
            for (var key in cards) {
                if (Number(key) == 46) {
                    mineData.haveShowCaiShenTip = true;
                    this.showHZMJGameTips(1);
                    break;
                }
            }
            //let minecards: Array<any> = playerData.cards;
            //let index = minecards.indexOf(46);
            // if (index > 0) {
            //     // this.m_firtTimeHaveCaiShen = true;
            // }
        };
        HZMJGameScene.prototype.fapaiRoundOver = function () {
            var _this = this;
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            var roomInfo = Global.gameProxy.roomInfo;
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            // this.haveCaiShenCard();
            this.setAutoTimeout(function () {
                _this.timeDirectionBar.startTime(_this);
                roomInfo.curPlay = roomInfo.dealer;
                _this.checkChupaiStatus();
            }, this, 200);
        };
        HZMJGameScene.prototype.startChupai = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            this.checkChupaiStatus();
            this.timeDirectionBar.startTime(this);
        };
        /**
           * 回显
           */
        HZMJGameScene.prototype.showLaiziCard = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var card = roomInfo.baoCards[0];
            this.laiziGroup.visible = true;
            this.laiziColorImage.source = RES.getRes("color_value_" + card + "_png");
        };
        /**
         * todo不花
         */
        HZMJGameScene.prototype.playerBuhua = function (e) {
            var _this = this;
            var datas = e.data.huaInfo;
            var playerIndex = e.data.playerIndex;
            this.clearTingStatus();
            var direction = this.directions[playerIndex];
            // let shoupaiGroup = this[`${direction}ShoupaiGroup`] as MineShoupaiGroup;
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
        HZMJGameScene.prototype.checkChupaiStatus = function () {
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
        HZMJGameScene.prototype.reloadPlayerGangs = function () {
            _super.prototype.reloadPlayerGangs.call(this);
        };
        /**
         * 显示重新连接上来的UI
         */
        HZMJGameScene.prototype.showReconnectUI = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            // this.checkHszStatus(roomInfo);
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        };
        HZMJGameScene.prototype.renderContent = function () {
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
                //this.mineShoupaiGroup.sortShoupais();
            }
            else {
                //   this.timeDirectionBar.startTime(this);
                var roomInfo = Global.gameProxy.roomInfo;
                this.baoCard = roomInfo.baoCards;
                // roomInfo.baoCards = null;
                this.showStartAni(function () {
                    //展现牌局开始动画
                    for (var i = 1; i <= 4; i++) {
                        _this.showShoupaiByIndex(i, false);
                    }
                    _this.setAutoTimeout(_this.fapaiAni, _this, 500);
                });
            }
        };
        HZMJGameScene.prototype.checkPlayerHasJiao = function () {
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
        HZMJGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    // if (!Global.gameProxy.roomInfo) {
                    // await Global.gameProxy.req2updateRoom();
                    // }
                    this.baoCard = Global.gameProxy.roomInfo.baoCards;
                    //    this.baoCard = [46];
                    this.showLaiziCard();
                    this.dizhu.bold = true;
                    this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen; //this.difeng;
                    //设置玩家座位标示
                    this.majiangStatus = MajiangStatusEnum.READY;
                    //记录玩家坐标
                    this.directions = majiang.MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
                    this.paiQiang.showPaiQiang(this.directions);
                    this.renderChupaiGroups();
                    this.reloadHuas();
                    this.renderContent();
                    this.backMovie();
                    this.wanfaImage.source = RES.getRes("wanfa_hzmj_png_png");
                    this.wanfaImage.scaleX = 0.6;
                    this.wanfaImage.scaleY = 0.6;
                    this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                    SoundManager.getInstance().playMusic("playingingame_mp3");
                    return [2 /*return*/];
                });
            });
        };
        HZMJGameScene.prototype.testMV = function (i, name) {
            var _this = this;
            this.setAutoTimeout(function () {
                _this.addEffectAni("mine", name);
            }, this, i * 2000);
        };
        HZMJGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
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
        HZMJGameScene.prototype.shoupaiTouchOn = function (e) {
            var touchShoupai = e.data;
            //出牌状态
            if (this.maxTouchShoupai == 1) {
                //已经有选择的牌
                if (this.touchShoupai == touchShoupai && this.touchShoupai.isSelect()) {
                    if (Global.gameProxy.getMineGameData().isBaoTing && this.touchShoupai != this.mineShoupaiGroup.mopai) {
                        return;
                    }
                    if (this.lockChupai) {
                        return;
                    }
                    if (!Global.gameProxy.checkIsRoundMe()) {
                        return;
                    }
                    /**只可以打摸起来的牌 在飘的状态 */
                    //如果是轮到出牌
                    CF.dP(ENo.FIND_COLOR, 0);
                    this.chupaiReq(touchShoupai);
                    //new====?
                    // this.showHuTips();
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
        HZMJGameScene.prototype.chupaiReq = function (touchShoupai) {
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
                                            //LogUtils.logD(outTings.fan);
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
        //countDownPush
        HZMJGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.aE(ServerNotify.s_roomStatusChange, this.roomStatusChange, this);
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
        };
        HZMJGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_roomStatusChange, this.roomStatusChange, this);
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
        };
        /**监听房间状态的变化 当玩家是飘的时候限制玩家打牌 除了传来的索引号 其他玩家都摸啥打啥*/
        HZMJGameScene.prototype.roomStatusChange = function (e) {
            //**当前飘的玩家索引号*/;
            var _resp = e.data;
            switch (_resp.eventType) {
                case 2:
                    var _index = _resp.eventData.playerIndex;
                    var direction = this.directions[_index];
                    this.showHZMJGameTips(3);
                    // if (direction == "mine") 
                    break;
                case 1:
                    this.showDriftTips(_resp.eventData);
                    break;
                default:
                    break;
            }
        };
        /**展示飘的tips */
        HZMJGameScene.prototype.showDriftTips = function (_data) {
            var roomInfo = Global.gameProxy.roomInfo;
            // console.log(_data.isDrift);
            /**更新玩家状态*/
            if (!_data.isDrift) {
                for (var key in roomInfo.players) {
                    var player = roomInfo.players[key];
                    player.isDrift = false;
                }
                this.mineShoupaiGroup.unLockAll();
                return;
            }
            /**玩家的索引号 */
            var playerIndex = _data.driftPlayerIndex;
            var direction = this.directions[playerIndex];
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                if (key == playerIndex) {
                    player.isDrift = false;
                }
                else {
                    player.isDrift = true;
                }
            }
            var mineData = Global.gameProxy.getMineGameData();
            if (mineData.isDrift) {
                this.showHZMJGameTips(5);
            }
            // if (!mineData.isDrift) {
            //财飘
            this.addEffectAni(direction, "piao");
            // }
        };
        HZMJGameScene.prototype.tingInfoPush = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            playerData.tingCards = this.currentTings = data;
        };
        HZMJGameScene.prototype.s_playerTingCards = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            if (data.outCardTingCards) {
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                // if (this.needCheckTing) {
                this.checkHuTips();
                // this.needCheckTing = false;
                // }
            }
            if (data.tingCards) {
                playerData.outCardTingCards = null;
                playerData.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData.tingCards.length > 0;
            }
        };
        HZMJGameScene.prototype.tuoguanStatusPush = function (e) {
            var resp = e.data;
            this.clearTingStatus();
            this.tgGroup.visible = resp.isTrustee;
        };
        /**
         * 玩家报听推送
         */
        HZMJGameScene.prototype.playerBaoTingPush = function (e) {
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
        HZMJGameScene.prototype.playerChiCard = function (e) {
            var _this = this;
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var chiMaxCard = resp.selectCard;
            //====>
            var roomInfo = Global.gameProxy.roomInfo;
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
                this.showCaiShenCardTips(playerIndex);
                this.lockChupai = false;
            }
            /**玩家首次被下家吃牌*/
            if (from == Global.gameProxy.getMineIndex() && playerData.chiCards && playerData.chiCards.length == 1) {
                if (from == roomInfo.dealer || playerIndex == roomInfo.dealer) {
                    this.showHZMJGameTips(2);
                }
            }
            /**三滩落地 吃上家牌达到三滩时播放 */
            if (playerData.chiCards && playerData.chiCards.length == 3) {
                this.setAutoTimeout(function () {
                    _this.addEffectAni(direction, "stld");
                }, this, 1000);
            }
            // if (playerData.chiCards && playerData.chiCards.length == 3) {
            // egret.setTimeout(() => {
            //     if(direction=="mine")
            //     this.addEffectAni(direction, "stld");
            // }, this, 1000);
            //   }
            //播放碰牌动画
            this.addEffectAni(direction, "chi");
            this.hideChupaiTips();
            var pgGroup = this[direction + "PgGroup"];
            var pengItem = pgGroup.add(5, chiMaxCard);
            pengItem.peng2Chi(chiMaxCard);
            //播放吃牌音效
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "chi");
        };
        HZMJGameScene.prototype.clearTingStatus = function () {
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
        HZMJGameScene.prototype.playCardPush = function (e) {
            this.clearCountDown();
            this.clearTingStatus();
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var card = resp.card;
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            var roomInfo = Global.gameProxy.roomInfo;
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
                /**其他玩家打出财神时*/
                // if (playerIndex != roomInfo.dealer && card == 46) {
                //     this.showHZMJGameTips(5);
                // }
            }
            else {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, card);
        };
        HZMJGameScene.prototype.clearTouchOn = function () {
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
        HZMJGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
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
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isDrift); //playerData.isBaoTing
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isDrift); //playerData.isBaoTing
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isDrift); //playerData.isBaoTing
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
            /**当玩家是飘的状态的时候*/
            var a = 1;
            //playerData.isDrift
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
        HZMJGameScene.prototype.checkTask = function () {
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
        HZMJGameScene.prototype.playerGangCard = function (e) {
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
                this.showCaiShenCardTips(playerIndex);
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
        HZMJGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            // this.needCheckTing = true;
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
            var direction = this.directions[playerIndex];
            if (direction == "mine")
                this.showCaiShenCardTips(playerIndex);
            /**隐藏所有 任务按钮 杭州麻将 */
            this.taskBar.hideAllBtns();
            // majiang.MajiangUtils.playHPGSound(playerData.sex, 1);
        };
        HZMJGameScene.prototype.publicCardChangedPush = function (e) {
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
        HZMJGameScene.prototype.newCardPush = function (e) {
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
        HZMJGameScene.prototype.newCard = function (resp) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            /**牌墙剩余30张牌时（所有玩家提示)*/
            if (resp.remain == 30) {
                this.showHZMJGameTips(4);
            }
            var paiqiangCount = this.getPaiqiangCount;
            if (resp.remain != paiqiangCount) {
                // this.paiQiang.reloadPaiQiang();
                // LogUtils.logI("remain  ==========>:" + resp.remain + "前端显示剩余：" + paiqiangCount);
                Global.pomelo.disConnectAndReconnect();
                return;
            }
            var direction = this.directions[resp.playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            if (direction == "mine") {
                //先刷新自己手牌
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
                    //this.checkTask();
                }
                //先刷新自己手牌
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
                /**展示财神提示 */
                this.showCaiShenCardTips(resp.playerIndex);
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
         *
         */
        HZMJGameScene.prototype.hupaiPush = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, playerIndex, card, from, mainCard, pattens, mineData, huPlayerData, direction, lastDirection, time;
                return __generator(this, function (_a) {
                    /**让他不能退出房间*/
                    this.clearCountDown();
                    this.clearTingStatus();
                    resp = e.data;
                    playerIndex = resp.playerIndex;
                    card = resp.card;
                    from = resp.from;
                    mainCard = resp.mainCard;
                    pattens = resp.patterns;
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
                        // if (resp.gsh) {
                        //     this.addEffectAni(direction, "gsh")
                        //     /**添加胡牌的动画*/
                        // } else if (pattens == 2) {
                        //     //爆头
                        //     this.addEffectAni(direction, "baotou")
                        // }
                        // else if (pattens == 3) {
                        //     //财飘
                        //     this.addEffectAni(direction, "caipiao")
                        // }
                        // //双财飘
                        // else if (pattens == 4) {
                        //     this.addEffectAni(direction, "shuangcp")
                        // }
                        // else if (pattens == 5) {
                        //     this.addEffectAni(direction, "scp")
                        // }
                        // //承包所有===============》
                        // else {
                        //     this.addEffectAni(direction, "zimo")
                        // }
                        this.showHuPaiAni(direction, pattens[0], huPlayerData);
                        this[direction + "HupaiGroup"].addHu(resp, 2);
                        // majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
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
                    majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
                    return [2 /*return*/];
                });
            });
        };
        //     	"0": "",
        // "1": "平胡",
        // "2": "爆头",
        // "3": "财飘",
        // "4": "双财飘",
        // "5": "三财飘",
        // "6": "杠上开花",
        // "7": "二连杠",
        // "8": "三连杠",
        // "9": "四连杠",
        // "10": "清七对",
        // "11": "豪华清七对",
        // "12": "双豪华清七对",
        // "13": "三豪华清七对",
        // "14": "财神七对",
        // "15": "财神豪华七对",
        // "16": "财神双豪华七对",
        // "17": "财神三豪华七对",
        // "18": "杠爆",
        // "19": "杠飘",
        // "20": "飘杠",
        // "21": "七对爆头",
        // "22": "豪华七对爆头",
        // "23": "七对财飘",
        // "24": "豪华七对财飘",
        // "25": "豪华七对双财飘",
        // "26": "豪华七对三财飘",
        // "27": "双豪华七对财飘",
        // "28": "双豪华七对双财飘",
        // "29": "双豪华七对三财飘",
        // "30": "三豪华七对财飘",
        // "31": "三豪华七对双财飘",
        // "32": "三豪华七对三财飘",
        // "33": "七对双财飘",
        // "34": "七对三财飘",
        // "35": "双豪华七对爆头",
        // "36": "三豪华七对爆头"
        /**展示胡牌的动画*/
        HZMJGameScene.prototype.showHuPaiAni = function (direction, type, huPlayerData) {
            switch (type) {
                case 4:
                case 25:
                case 28:
                case 31:
                case 33:
                    this.addEffectAni(direction, "shuangcp");
                    break;
                case 5:
                case 26:
                case 29:
                case 32:
                case 34:
                    this.addEffectAni(direction, "scp");
                    break;
                case 23:
                case 3:
                case 24:
                case 27:
                case 30:
                case 19:
                    this.addEffectAni(direction, "caipiao");
                    break;
                case 2:
                case 35:
                case 36:
                case 21:
                case 22:
                case 18:
                    this.addEffectAni(direction, "baotou");
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 18:
                    this.addEffectAni(direction, "gsh");
                    break;
                default:
                    this.addEffectAni(direction, "zimo");
                    break;
            }
        };
        /**
         * 玩家报听
         */
        HZMJGameScene.prototype.playerBaoTing = function (tasks) {
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
        HZMJGameScene.prototype.createRenshuFont = function (direction) {
        };
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        HZMJGameScene.prototype.createHJZYByDirection = function (direction, value) {
        };
        /**
         * 对局结束
         */
        HZMJGameScene.prototype.showDuijuAni = function (callback) {
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
        HZMJGameScene.prototype.showHuangZhuang = function (callback) {
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
   * 回显花牌 // 这个是显示胡牌啦？？
   */
        HZMJGameScene.prototype.reloadHuas = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                var hupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                // let huaCard = player.huaCards;
                // for (let i = 0; i < huaCard.length; i++) {
                //     hupaiGroup.addBuhua(huaCard[i]);
                // }
            }
        };
        /**
         * 游戏数据结算信息。
         */
        HZMJGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players, includePlayerIndex, _delayShowPais, chengBaoIndex, direction, i;
                return __generator(this, function (_a) {
                    // console.log("settlementData is  重新开始的按钮是否可见================" + this.restartBtn.visible);
                    this.restartBtn.visible = false;
                    //  console.log("settlementData is  重新开始的按钮是否可见================" + this.restartBtn.visible);
                    this.majiangStatus = MajiangStatusEnum.OVER;
                    this.timeDirectionBar.removeTimer();
                    //LogUtils.logD(" game in  settlement data" + Global.gameProxy.roomInfo.baoCards);
                    this.tgGroup.visible = false;
                    resp = e.data;
                    LogUtils.logD("结算日志：有问题复制这个:  " + JSON.stringify(resp));
                    players = resp.players;
                    this.tgGroup.visible = false; //解决牌局结束，托管不消失。
                    includePlayerIndex = resp["includePlayerIndex"];
                    _delayShowPais = 2000;
                    if (includePlayerIndex.length > 0) {
                        for (i = 0; i < includePlayerIndex.length; ++i) {
                            chengBaoIndex = includePlayerIndex[i];
                            direction = this.directions[chengBaoIndex];
                            this.addEffectAni(direction, "chengbao");
                        }
                        this.setAutoTimeout(function () {
                            _this.gameOverShow(players);
                            //LogUtils.logD("结算界面显示不出来========================================================    ---3》in  settlementData" + _delayShowPais);
                        }, this, _delayShowPais);
                    }
                    else {
                        _delayShowPais = 0;
                        this.gameOverShow(players);
                        //LogUtils.logD("结算界面显示不出来========================================================    ---2》in  settlementData" + _delayShowPais);
                    }
                    /**荒庄 长度为1*/
                    if (resp.winPlayerIndex.length <= 0) {
                        this.showHuangZhuang(function () {
                            _this.restartBtn.visible = true;
                            _this.restartBtn.alpha = 0;
                            egret.Tween.get(_this.restartBtn).to({
                                alpha: 1
                            }, 300);
                        });
                        // LogUtils.logD("结算界面显示不出来 请截图========================================================   荒庄1》in  settlementData" + _delayShowPais);
                        return [2 /*return*/];
                    }
                    this.setAutoTimeout(function () {
                        /**流局特效*/
                        _this.showDuijuAni(function () {
                            // LogUtils.logD("结算界面显示不出来 请截图========================================================1》in  settlementData" + _delayShowPais);
                        });
                        _this.setAutoTimeout(function () {
                            if (!Global.gameProxy.roomInfo) {
                                // LogUtils.logD("结算界面显示不出来 请截图==========================================================2》:  " + Global.gameProxy.roomInfo + _delayShowPais);
                                return;
                            }
                            //LogUtils.logD("结算界面显示不出来 请截图 Global.gameProxy.roomInfo=================================3》:  " + "发消息打开结算界面之后" + _delayShowPais);
                            // LogUtils.logD("结算界面显示不出来   看这里==========================================================》:  " + JSON.stringify(Global.gameProxy.roomInfo));
                            //修改所有玩家金币至抽水过后的金币
                            for (var index in players) {
                                var goldData = players[index];
                                var header = _this.getHeaderByDirection(index);
                                goldData.ownGold = goldData.ownGold;
                                header.updateGold(goldData.ownGold);
                            }
                            // LogUtils.logD("结算界面显示不出来   看这里 let index in players=================================4》:  " + "发消息打开结算界面之后" + _delayShowPais);
                            var mineData = Global.gameProxy.getMineGameData();
                            Global.playerProxy.updatePlayerGold(mineData.gold);
                            // LogUtils.logD("结算界面显示不出来   看这里 settlementData===============================5》:  " + " CF.sN" + "发消息打开结算界面之前" + _delayShowPais);
                            CF.sN(SceneNotify.OPEN_HZMJ_OVER, { players: players, status: resp.status, winPlayer: resp.winPlayerIndex });
                            //LogUtils.logD("结算界面显示不出来   看这里 settlementData=================================6》:  " + " CF.sN" + "发消息打开结算界面之后" + (1500 + _delayShowPais));
                        }, _this, 2000);
                    }, this, 1500 + _delayShowPais);
                    return [2 /*return*/];
                });
            });
        };
        HZMJGameScene.prototype.hideBars = function () {
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
        HZMJGameScene.prototype.tipsBtnTouch = function () {
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
        HZMJGameScene.prototype.qiangGangHu = function (e) {
            this.g2p = 1;
            var resp = e.data;
            var direction = this.directions[resp.playerIndex];
            var color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        };
        /**
         * 刷新胡牌提示
         */
        HZMJGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        HZMJGameScene.prototype.showhupaiBar = function () {
            for (var i = 0; i < this.lastHuTips.length; i++) {
                var huTip = this.lastHuTips[i];
                var count = majiang.MajiangUtils.findValueLess(huTip.value || huTip.card);
                huTip.count = count;
            }
            this.huTipsBar.showBar(this.lastHuTips);
            if (this.lastHuTips.length > 0) {
                LogUtils.logI("this is hutipsBar====================================data>" + this.lastHuTips);
            }
        };
        /**
         * 检查当前手牌能否胡牌
         */
        HZMJGameScene.prototype.updateTingByValue = function (value) {
            var playerData = Global.gameProxy.getMineGameData();
            var tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = playerData.tingCards.length > 0;
            }
        };
        /**
         * 展现胡牌
         */
        HZMJGameScene.prototype.showHuTips = function () {
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
        HZMJGameScene.prototype.getTingArr = function (tings, value) {
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
        HZMJGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
            // if (Global.gameProxy.checkIsRoundMe()) {
            var tings = mineData.outCardTingCards;
            if (tings) {
                for (var i = 0; i < tings.length; i++) {
                    var data = tings[i].out;
                    // LogUtils.logD("本局要胡的牌是"+JSON.stringify(data));
                    this.mineShoupaiGroup.showHuTipsByValue(data);
                }
                // }
            }
        };
        //-------游戏内提示
        HZMJGameScene.prototype.showGameTipGroup2 = function () {
        };
        HZMJGameScene.prototype.checkShowTips = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == this.startNumber && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showHZMJGameTips(6);
            }
        };
        HZMJGameScene.prototype.setHZMJFont = function (target) {
            target.textAlign = egret.HorizontalAlign.CENTER;
            target.textColor = 0xfcc74d;
            target.size = 30;
            target.bold = true;
            target.stroke = 1;
            target.strokeColor = 0x080909;
        };
        /**杭州麻将的Tips提示*/
        HZMJGameScene.prototype.showHZMJGameTips = function (type) {
            var _this = this;
            this.clearAutoTimeout(this.gameTipTimeOut);
            egret.Tween.removeTweens(this.gameTipsGroup);
            this.gameTipsGroup.visible = true;
            this.gameTipsGroup.alpha = 1;
            this.setHZMJFont(this.gameTipsLabel);
            this.gameHZMJTipsGroup.visible = false;
            switch (type) {
                case 1:
                    // this.gameTipsGroup.visible = false;
                    // this.gameHZMJTipsGroup.visible = true;
                    // this.setHZMJFont(this.gameHZMJTipsLabel);
                    this.gameTipsLabel.text = "保留财神，促成爆头或财飘";
                    break;
                case 2:
                    this.gameTipsLabel.text = "下家再吃两滩，" + "\n" + "胡牌时您要承包所有输分";
                    break;
                case 3:
                    this.gameTipsLabel.text = "仅庄闲之间可以吃三滩";
                    break;
                case 4:
                    this.gameTipsLabel.text = "剩余20张未胡牌则流局";
                    break;
                case 5:
                    this.gameTipsLabel.text = "打出财神，本轮您不能换牌";
                    break;
                case 6:
                    this.gameTipsLabel.text = "你是庄家,请先出牌";
                    break;
                default:
                    break;
            }
            this.gameTipTimeOut = this.setAutoTimeout(function () {
                _this.closeGameTipsGroup();
            }, this, 2000);
        };
        HZMJGameScene.prototype.closeGameTipsGroup = function () {
            var _this = this;
            _super.prototype.closeGameTipsGroup.call(this);
            egret.Tween.get(this.gameHZMJTipsGroup).to({
                alpha: 0
            }, 1000).call(function () {
                _this.gameHZMJTipsGroup.visible = false;
                _this.gameHZMJTipsGroup.alpha = 1;
            });
        };
        /**
         * 展示我的手牌
         */
        HZMJGameScene.prototype.showShoupaiByMine = function (flag) {
            if (flag === void 0) { flag = true; }
            var cardsArr = Global.gameProxy.getMineSHoupaiArrLz();
            if (!flag) {
                cardsArr = _.shuffle(cardsArr);
            }
            this.mineShoupaiGroup.initWithArr(cardsArr, flag);
        };
        /**
                 * 牌局结束，暂时没有用。
                 */
        HZMJGameScene.prototype.roomGameOver = function (e) {
            _super.prototype.roomGameOver.call(this, e);
            this.restartBtn.visible = false;
            // console.log("room is gameover===============" + JSON.stringify(e.data, null, "\t"));
            // console.log("paiju jiesu=======================================================>");
        };
        HZMJGameScene.jieSuanBug = { "players": { "1": { "isDefeat": false, "handCards": { "23": 1, "27": 1, "28": 1, "46": 1 }, "pengCards": [12], "gangCards": [], "chiCards": [{ "card": 27, "from": 4, "selectCard": 27, "playerIndex": 1 }, { "card": 28, "from": 4, "selectCard": 28, "playerIndex": 1 }], "huCards": [46], "gainGold": 205.24, "ownGold": 1000205.24, "bills": [{ "type": 2, "info": { "score": 48, "gainGold": 216.04, "pumpGold": 0, "ownGold": 1000216.04, "card": 46, "from": 1, "isDefeat": false } }], "playerWinStatus": 5, "roundPattern": [2], "roundPatternScore": 16, "roundPatternScoreArray": [2], "score": 48 }, "2": { "isDefeat": true, "handCards": { "25": 1, "26": 1, "29": 2 }, "gainGold": -58.88, "ownGold": 0, "bills": [{ "type": 2, "info": { "score": -16, "gainGold": -58.88, "pumpGold": 0, "ownGold": 0, "card": 46, "from": 1, "isDefeat": true } }], "score": -16 }, "3": { "isDefeat": true, "handCards": { "16": 2, "22": 1, "24": 1, "25": 1, "34": 2, "39": 1, "41": 2, "46": 1, "47": 2 }, "gainGold": -77.16, "ownGold": 0, "bills": [{ "type": 2, "info": { "score": -16, "gainGold": -77.16, "pumpGold": 0, "ownGold": 0, "card": 46, "from": 1, "isDefeat": true } }], "score": -16 }, "4": { "isDefeat": false, "handCards": { "13": 1, "14": 1, "31": 2 }, "gainGold": -80, "ownGold": 126.84, "bills": [{ "type": 2, "info": { "score": -16, "gainGold": -80, "pumpGold": 0, "ownGold": 126.84, "card": 46, "from": 1, "isDefeat": false } }], "score": -16 } }, "status": 1, "winPlayerIndex": [1], "lossPlayerIndexs": [2, 3, 4] };
        return HZMJGameScene;
    }(majiang.BaseMajiangScene));
    majiang.HZMJGameScene = HZMJGameScene;
    __reflect(HZMJGameScene.prototype, "majiang.HZMJGameScene");
})(majiang || (majiang = {}));
