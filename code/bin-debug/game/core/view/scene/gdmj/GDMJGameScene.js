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
    var GDMJGameScene = (function (_super) {
        __extends(GDMJGameScene, _super);
        function GDMJGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "gdmj";
            _this.startNumber = 136;
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
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_GDMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_GDMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_GDMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_GDMJ_MATCHING;
            _this.skinName = new majiang.GDMJGameSceneSkin();
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        GDMJGameScene.prototype.fapaiRound4 = function (sortDir) {
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
                this.runSetBaoCard();
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
        GDMJGameScene.prototype.fapaiRoundOver = function () {
            var _this = this;
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            this.setAutoTimeout(function () {
                LogUtils.logD("===========fapaiRoundOver===========");
                _this.runSetBaoCard();
            }, this, 200);
        };
        /**
         * 定癞子流程
         */
        GDMJGameScene.prototype.runSetBaoCard = function () {
            var _this = this;
            var roomInfo = Global.gameProxy.roomInfo;
            //  LogUtils.logD("===runSetBaoCard==" + JSON.stringify(roomInfo));
            roomInfo.baoCards = this.baoCard;
            var direction = this.directions[roomInfo.dealer];
            var chupaiGroup = this[direction + "ChupaiGroup"];
            chupaiGroup.addChupai(roomInfo.fanCard);
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            this.setAutoTimeout(function () {
                var cardAni = new GDMJBaoCardAni(roomInfo.baoCards[0]);
                _this.effectGroup.addChild(cardAni);
                cardAni.horizontalCenter = 0;
                cardAni.verticalCenter = -40;
                _this.setAutoTimeout(function () {
                    var colorImage = cardAni.pai;
                    var pos = colorImage.localToGlobal();
                    _this.effectGroup.addChild(colorImage);
                    colorImage.x = pos.x + colorImage.anchorOffsetX;
                    colorImage.y = pos.y + colorImage.anchorOffsetY;
                    game.UIUtils.removeSelf(cardAni);
                    cardAni = null;
                    var movePos = _this.laiziColorImage.localToGlobal();
                    egret.Tween.get(colorImage).to({
                        x: movePos.x + 20,
                        y: movePos.y + 20,
                        scaleX: 0.4,
                        scaleY: 0.4
                    }, 300).call(function () {
                        game.UIUtils.removeSelf(colorImage);
                        colorImage = null;
                        _this.showLaiziCard();
                        _this.runBuyHouse();
                        _this.updateSypai();
                        egret.setTimeout(function () {
                            _this.mineShoupaiGroup.sortShoupais();
                            _this.startChupai();
                        }, _this, 500);
                    });
                }, _this, 2000);
            }, this, 700);
            //定癞子动画
        };
        /**
         * 买马
         */
        GDMJGameScene.prototype.runBuyHouse = function (needRemove) {
            if (needRemove === void 0) { needRemove = true; }
            if (needRemove) {
                for (var i = 0; i < 4; i++) {
                    this.paiQiang.removeLast();
                }
            }
            // this.updateSypai();
            this.mineHupaiGroup.addHousePai();
            this.leftHupaiGroup.addHousePai();
            this.rightHupaiGroup.addHousePai();
            this.topHupaiGroup.addHousePai();
        };
        GDMJGameScene.prototype.startChupai = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            this.checkChupaiStatus();
            this.timeDirectionBar.startTime(this);
        };
        GDMJGameScene.prototype.checkChupaiStatus = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != 0) {
                var direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                this.showShoupai(direction);
                //这里判断如果手牌=14 则把最后一张牌给change出去
                var playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkShowTips();
            }
        };
        /**
         * 显示重新连接上来的UI
         */
        GDMJGameScene.prototype.showReconnectUI = function () {
            // this.checkHszStatus(roomInfo);
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay == 0) {
                roomInfo.curPlay = roomInfo.dealer;
            }
            this.showLaiziCard();
            this.checkChupaiStatus();
            this.checkTrusteeStatus();
            this.checkTask();
        };
        /**
         * 回显
         */
        GDMJGameScene.prototype.showLaiziCard = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var card = roomInfo.baoCards[0];
            this.laiziGroup.visible = true;
            this.laiziColorImage.source = RES.getRes("color_value_" + card + "_png");
        };
        GDMJGameScene.prototype.renderContent = function () {
            var _this = this;
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            if (Global.gameProxy.reconnect) {
                var roomInfo = Global.gameProxy.roomInfo;
                // roomInfo.publicCardNum += 4;
                this.paiQiang.reloadPaiQiang();
                for (var i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.runBuyHouse();
                this.timeDirectionBar.startTime(this);
                this.reloadPlayerChupais();
                this.showShengyuPai();
                this.showReconnectUI();
                this.checkPlayerIsOver();
                this.checkPlayerHasJiao();
            }
            else {
                var roomInfo = Global.gameProxy.roomInfo;
                this.baoCard = roomInfo.baoCards;
                roomInfo.baoCards = null;
                this.showStartAni(function () {
                    //展现牌局开始动画
                    for (var i = 1; i <= 4; i++) {
                        _this.showShoupaiByIndex(i, false);
                    }
                    _this.setAutoTimeout(_this.fapaiAni, _this, 500);
                });
            }
        };
        /**
         * 展示我的手牌
         */
        GDMJGameScene.prototype.showShoupaiByMine = function (flag) {
            if (flag === void 0) { flag = true; }
            var cardsArr = Global.gameProxy.getMineSHoupaiArrLz();
            if (!flag) {
                cardsArr = _.shuffle(cardsArr);
            }
            this.mineShoupaiGroup.initWithArr(cardsArr, flag);
        };
        GDMJGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            // this.needCheckTing = true;
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
        };
        GDMJGameScene.prototype.checkPlayerHasJiao = function () {
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
        GDMJGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    // if (!Global.gameProxy.roomInfo) {
                    // await Global.gameProxy.req2updateRoom();
                    // }
                    this.baoCard = Global.gameProxy.roomInfo.baoCards;
                    this.dizhu.bold = true;
                    this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen; //this.difeng;
                    //设置玩家座位标示
                    this.majiangStatus = MajiangStatusEnum.READY;
                    //记录玩家坐标
                    this.directions = majiang.MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
                    this.paiQiang.showPaiQiang(this.directions);
                    this.renderChupaiGroups();
                    this.renderHupaiGroup();
                    this.renderContent();
                    this.backMovie();
                    this.wanfaImage.source = RES.getRes("gdmj_wanfa_png");
                    this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                    SoundManager.getInstance().playMusic("playingingame_mp3");
                    return [2 /*return*/];
                });
            });
        };
        GDMJGameScene.prototype.renderHupaiGroup = function () {
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
        GDMJGameScene.prototype.onTouchTap = function (e) {
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
                                case this.tipBtn: return [3 /*break*/, 2];
                                case this.lsBtn: return [3 /*break*/, 3];
                                case this.ctBar: return [3 /*break*/, 4];
                                case this.chatBtn: return [3 /*break*/, 5];
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
                            if (this.restartBtn.alpha != 1) {
                                return [2 /*return*/];
                            }
                            this.allowBack = this.restartBtn.visible;
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    GDMJClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            this.restartBtnTouch();
                            return [3 /*break*/, 18];
                        case 2:
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.tipsBtnTouch();
                            return [3 /*break*/, 18];
                        case 3:
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.lsBtnTouch();
                            return [3 /*break*/, 18];
                        case 4: return [3 /*break*/, 18];
                        case 5:
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            this.chatBtnTouch();
                            return [3 /*break*/, 18];
                        case 6:
                            this.cacelTuoguan();
                            return [3 /*break*/, 18];
                        case 7:
                            this.gnBtn.visible = false;
                            this.gnGroup.visible = true;
                            this.touchGroup.addChild(this.gnGroup);
                            //smart
                            if (this.isClubGame) {
                                this.fullScreenBtn.right = 53;
                                this.fullScreenBtn.top = 254;
                            }
                            else {
                                this.fullScreenBtn.right = 53;
                                this.fullScreenBtn.top = 326;
                            }
                            //smart
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
        GDMJGameScene.prototype.shoupaiTouchOn = function (e) {
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
        GDMJGameScene.prototype.onAdded = function () {
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
            //smart
            CF.aE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
            CF.aE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
            //smart
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            //smart
            // CF.aE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        };
        GDMJGameScene.prototype.onRemoved = function () {
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
            //smart
            CF.rE(ServerNotify.s_roomBuyMa, this.s_roomBuyMa, this);
            CF.rE(ServerNotify.s_roomSetBaoCard, this.s_roomSetBaoCard, this);
            //smart
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            // CF.rE(ServerNotify.s_pushTableStateInfo, this.s_pushTableStateInfo, this);
        };
        // protected s_pushTableStateInfo(e: egret.Event) {
        //     let data = e.data;
        //     if (data.tableId == this.proxy.roomInfo.tableId) {
        //         this.proxy.roomInfo.state = data.status;
        //     }
        // }
        /**
         * 麻将关闭界面
         * @param  {egret.TouchEvent} e
         */
        GDMJGameScene.prototype.closeMJCall = function (e) {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        };
        /**
         * 听牌提示
         * @param  {egret.TouchEvent} e
         */
        GDMJGameScene.prototype.s_playerTingCards = function (e) {
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
            // if (data && data.tingCards) {
            //     let playerData = Global.gameProxy.getMineGameData() as PlayerGameDataBean;
            //     playerData.tingCards = this.currentTings = data.tingCards;
            // }
            //smart
            if (data.tingCards) {
                playerData.outCardTingCards = null;
                playerData.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData.tingCards.length > 0;
            }
        };
        GDMJGameScene.prototype.s_roomSetBaoCard = function (e) {
            var data = e.data;
            LogUtils.logD("===GDMJGameScene===" + JSON.stringify(data));
            var baoCard = data.baoCard;
            var fanCard = data.fanCard;
            var roomInfo = Global.gameProxy.roomInfo;
            this.baoCard = [baoCard]; //roomInfo.baoCards =
            //this.baoCard = [baoCard];
            // roomInfo.baoCard = baoCard;
            roomInfo.fanCard = fanCard;
        };
        /**
         * 买马
         */
        GDMJGameScene.prototype.s_roomBuyMa = function (e) {
            var data = e.data;
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.maCardNumPerSeat = data.maCardNumPerSeat;
        };
        GDMJGameScene.prototype.tingInfoPush = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            playerData.tingCards = this.currentTings = data;
        };
        GDMJGameScene.prototype.add2HuGroup = function (card, playerIndex) {
            var direction = this.directions[playerIndex];
            this[direction + "HupaiGroup"].addBuhua(card);
        };
        GDMJGameScene.prototype.clearTingStatus = function () {
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
        GDMJGameScene.prototype.playCardPush = function (e) {
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
            // this.needCheckTing = false;
            if (direction == "mine") {
                // this.needCheckTing = false;
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
                this.mineShoupaiGroup.changePaiToVisible(false);
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
        GDMJGameScene.prototype.clearTouchOn = function () {
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
        GDMJGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang.GDMJMineShoupai);
            tempChupai.resetValue(value);
            // let tempChupai = new GDMJMineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            var targetMajiang;
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
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
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
        GDMJGameScene.prototype.hangupTaskPush = function (e) {
            var resp = e.data;
            var mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
        };
        /**
         * 检查task状态
         */
        GDMJGameScene.prototype.checkTask = function () {
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
        GDMJGameScene.prototype.playerGangCard = function (e) {
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
                // if(resp.gang == 2 || resp.gang == 4){
                //     this.updateTingByValue(resp.card);
                // }
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
            //以上玩家数据修改 以下 玩家UI修改
            switch (resp.gang) {
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
        GDMJGameScene.prototype.publicCardChangedPush = function (e) {
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
        GDMJGameScene.prototype.newCardPush = function (e) {
            var resp = e.data;
            // this.taskBar.hideAllBtns();
            this.newCard(resp);
            if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                this.setAutoTimeout(function () {
                    CF.dP(ENo.TING_FLUSH, resp);
                }, this, 400);
            }
        };
        GDMJGameScene.prototype.newCard = function (resp) {
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            var direction = this.directions[resp.playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            // this.needCheckTing = true;
            if (direction == "mine") {
                if (resp.outCardTingCards) {
                    playerData.outCardTingCards = resp.outCardTingCards;
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
        GDMJGameScene.prototype.hupaiPush = function (e) {
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
        GDMJGameScene.prototype.playerBaoTing = function (tasks) {
            this.isTingStatus = true;
            var tings = tasks[0].tings;
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
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        GDMJGameScene.prototype.createHJZYByDirection = function (direction, value) {
        };
        GDMJGameScene.prototype.showHuangZhuang = function (callback) {
            var image = new eui.Image(RES.getRes("dzmj_hpts_png"));
            image.horizontalCenter = 10;
            image.verticalCenter = -52.5;
            this.effectGroup.addChild(image);
            image.alpha = 0;
            image.horizontalCenter -= 30;
            egret.Tween.get(image)
                .to({ alpha: 0 }, 200)
                .to({ horizontalCenter: 10, alpha: 1 }, 1000)
                .wait(1000).call(callback, this);
        };
        /**
         * 游戏数据结算信息。
         */
        GDMJGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players;
                return __generator(this, function (_a) {
                    this.restartBtn.visible = false;
                    this.majiangStatus = MajiangStatusEnum.OVER;
                    this.timeDirectionBar.removeTimer();
                    this.tgGroup.visible = false;
                    resp = e.data;
                    LogUtils.logDJ("广东麻将 结算界面" + JSON.stringify(resp));
                    players = resp.players;
                    this.gameOverShow(players);
                    if (resp.winPlayer.length < 1) {
                        this.showHuangZhuang(function () {
                            _this.restartBtn.visible = true;
                            _this.restartBtn.alpha = 0;
                            egret.Tween.get(_this.restartBtn).to({
                                alpha: 1
                            }, 300);
                        });
                        return [2 /*return*/];
                    }
                    this.setAutoTimeout(function () {
                        var kaima = new DBComponent("gdmj_kaima");
                        _this.effectGroup.addChild(kaima);
                        kaima.horizontalCenter = 0;
                        kaima.verticalCenter = -40;
                        kaima.playByFilename(1);
                        _this.setAutoTimeout(function () {
                            var buyMaInfo = resp.buyMaInfo;
                            for (var key in buyMaInfo) {
                                var data = buyMaInfo[key][0];
                                var hupaiGroup = _this[_this.directions[key] + "HupaiGroup"];
                                hupaiGroup.showHouseValue(data.maCard, data.buyMaState);
                            }
                            _this.setAutoTimeout(function () {
                                game.UIUtils.removeSelf(kaima);
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
                                CF.sN(SceneNotify.OPEN_GDMJ_OVER, resp);
                            }, _this, 2000);
                        }, _this, 2500);
                    }, this, 1000);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 听牌提示
         */
        GDMJGameScene.prototype.tipsBtnTouch = function () {
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
        GDMJGameScene.prototype.qiangGangHu = function (e) {
            this.g2p = 1;
            var resp = e.data;
            var direction = this.directions[resp.playerIndex];
            var color = resp.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        };
        /**
         * 刷新胡牌提示
         */
        GDMJGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        GDMJGameScene.prototype.showhupaiBar = function () {
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
        GDMJGameScene.prototype.updateTingByValue = function (value) {
            var playerData = Global.gameProxy.getMineGameData();
            var tings = playerData.outCardTingCards;
            if (tings) {
                playerData.tingCards = this.currentTings = this.getTingArr(tings, value);
                this.tipBtn.visible = this.currentTings.length > 0;
                if (this.tipBtn.visible) {
                    if (playerData.lastCard != value && this.beforeShow) {
                        this.checkAllIsJihu();
                        this.beforeShow = false;
                    }
                }
                else {
                    this.beforeShow = true;
                }
            }
        };
        /**
         * 展现胡牌
         */
        GDMJGameScene.prototype.showHuTips = function () {
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
        GDMJGameScene.prototype.getTingArr = function (tings, value) {
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
        GDMJGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
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
        GDMJGameScene.prototype.showGameTipGroup2 = function () {
        };
        GDMJGameScene.prototype.checkShowTips = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == 136 && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
        };
        return GDMJGameScene;
    }(majiang.BaseMajiangScene));
    majiang.GDMJGameScene = GDMJGameScene;
    __reflect(GDMJGameScene.prototype, "majiang.GDMJGameScene");
})(majiang || (majiang = {}));
