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
var niuniu;
(function (niuniu) {
    var NiuniuSGameScene = (function (_super) {
        __extends(NiuniuSGameScene, _super);
        function NiuniuSGameScene() {
            var _this = _super.call(this) || this;
            //选出来的牛牌。
            _this.nplist = [];
            _this.niuniuTipsData = {};
            _this.pmdKey = "blnn";
            /**挂机*/
            //protected isAuto: boolean = false;
            _this.autoDelayTime = 1000;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUGAMES;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUSELECT;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIUGAMES;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIU_MATCHING;
            /**
             * 背景音乐
             */
            _this.bgMusic = "niuniu_bgm_mp3";
            _this.autoBtnSelecIcon = "niuniu_guaji_select_png";
            _this.autoBtnUnSelecIcon = "niuniu_gj_unselect_png";
            _this.lockTouch = false;
            /**
             * 定庄动画
             */
            _this.qzLength = 0;
            _this.targetGold = 0;
            GameConfig.CURRENT_ISSHU = true;
            _this.skinName = new NiuniuSGameSceneSkin();
            return _this;
        }
        /**挂机tips弹窗 */
        NiuniuSGameScene.prototype.showGuaJiTips = function (text) {
            this.tisiGroup0.visible = true;
            this.tisiGroup0.alpha = 1;
            this.tisiLable0.text = text;
            egret.Tween.get(this.tisiGroup0).to({ alpha: 0 }, 2000);
        };
        NiuniuSGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            this.listenEvent();
        };
        NiuniuSGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.listenOffEvent();
        };
        /**有牛龙骨 */
        NiuniuSGameScene.prototype.createYNDB = function () {
            var _this = this;
            this.ynDB.visible = true;
            var dbComp = new DBComponent("nn_button");
            dbComp.callback = function () {
                dbComp = null;
                game.UIUtils.removeFromParent(dbComp);
                _this.ynDB.visible = false;
            };
            this.ynDB.addChild(dbComp);
            dbComp.playByFilename(1);
        };
        NiuniuSGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var length, i, roomInfo, publicMsg;
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    this.proxy = Global.roomProxy;
                    FrameUtils.changeBgImage("./resource/gameAssets/niuniu_hall/nns_hall_bg.jpg");
                    this.timeBar.visible = false;
                    this.restartBtn.visible = false;
                    this.showBtnsType(1);
                    game.UIUtils.setAnchorPot(this.ynBtn);
                    game.UIUtils.setAnchorPot(this.wnBtn);
                    this.niuniuTipsData = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6" };
                    this.qzBar.setRoot(this);
                    this.yzBar.setRoot(this);
                    this.autoBar.setRoot(this);
                    length = _.values(Global.roomProxy.getPlayers()).length;
                    this.directions = NiuniuUtils.getDirectionByMine(Global.roomProxy.getMineIndex(), length);
                    this.diFen.text = Global.gameProxy.lastGameConfig.diFen;
                    this.roomid.text = "牌局编号：" + Global.roomProxy.roomInfo.roomId;
                    this.showHeaders();
                    //交换一下位子 适配一下
                    for (i = 1; i <= length; i++) {
                        this['header' + this.directions[i]].setIndex(i);
                    }
                    if (Global.roomProxy.reconnect) {
                        this.timeBar.startTime(this);
                        this.timeBar.visible = true;
                        roomInfo = Global.roomProxy.roomInfo;
                        this.showRunTimeByStep(roomInfo.roundStatus);
                    }
                    else {
                        this.setAutoTimeout(function () {
                            _this.showStartAni();
                        }, this, 400);
                    }
                    publicMsg = PMDComponent.instance;
                    publicMsg.anchorOffsetY = 24;
                    publicMsg.horizontalCenter = 10;
                    publicMsg.top = 50;
                    this.setYNBtnGray();
                    if (NiuniuGuaJiConfig.Instance.autoStatus) {
                        this.autoBtn.source = this.autoBtnSelecIcon;
                    }
                    else {
                        this.autoBtn.source = this.autoBtnUnSelecIcon;
                    }
                    //clubnew
                    this.isClubGame = Global.roomProxy.roomInfo.tableId != undefined;
                    if (this.isClubGame) {
                        this.btnsbg.height = 273;
                        this.btsBgHeigth = 273;
                        this.recordBtn.visible = false;
                    }
                    else {
                        this.btnsbg.height = 364;
                        this.recordBtn.visible = true;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**设置有牛为灰色*/
        NiuniuSGameScene.prototype.setYNBtnGray = function (gray) {
            if (gray === void 0) { gray = true; }
            game.UIUtils.setGray(this.ynBtn, gray);
            this.ynBtn.touchEnabled = !gray;
        };
        /**重置挂机按钮得状态 */
        NiuniuSGameScene.prototype.setAutoBtnState = function (e) {
            var _this = this;
            var isAuto = e.data;
            NiuniuGuaJiConfig.Instance.setAutoStatus(isAuto);
            if (isAuto) {
                this.autoBtn.source = this.autoBtnSelecIcon;
            }
            else {
                this.autoBtn.source = this.autoBtnUnSelecIcon;
            }
            this.autoBar.resetState();
            if (!isAuto) {
                this.autoBar.visible = false;
                this.rectMask.visible = false;
            }
            else if (isAuto) {
                if (this.restartBtn.visible) {
                    var remaicount = NiuniuGuaJiConfig.Instance.remainCount;
                    remaicount -= 1;
                    if (remaicount <= 0) {
                        NiuniuGuaJiConfig.Instance.setAutoStatus(false);
                        this.autoBtn.source = this.autoBtnUnSelecIcon;
                        this.showGuaJiTips("停止挂机");
                        //	Global.alertMediator.addAlert("停止挂机", null, null, true);
                    }
                    if (NiuniuGuaJiConfig.Instance.autoStatus && remaicount > 0) {
                        LogUtils.logD("===remainCount===" + remaicount);
                        NiuniuGuaJiConfig.Instance.setRemainCount(remaicount);
                        this.setAutoTimeout(function () {
                            _this.restartBtnTouch();
                        }, this, this.autoDelayTime);
                    }
                }
                else {
                    this.setAutoTimeout(function () {
                        _this.showRunTimeByStep(Global.roomProxy.roomInfo.roundStatus);
                    }, this, this.autoDelayTime);
                }
            }
        };
        //重写
        NiuniuSGameScene.prototype.showBtnsType = function (num, type) {
            var numArray = [this.settingBtn, this.recordBtn, this.helpBtn, this.backBtn];
            if (!this.topBtns) {
                this.topBtns = [this.settingBtn.top, this.recordBtn.top, this.helpBtn.top, this.backBtn.top];
            }
            if (this.isClubGame) {
                this.topBtns = [193, 377, 101, 285];
            }
            this.settingBtn.visible = (num == 1) ? false : true;
            //smart
            this.recordBtn.visible = (num == 1) ? false : true;
            if (this.isClubGame)
                this.recordBtn.visible = false;
            this.backBtn.visible = (num == 1) ? false : true;
            this.helpBtn.visible = (num == 1) ? false : true;
            this.xlbtn1.visible = (num == 1) ? false : true;
            this.xlbtn.visible = (num == 1) ? true : false;
            this.btnsbg.height = 0;
            switch (num) {
                case 1:
                    for (var i = 0; i < numArray.length; i++) {
                        egret.Tween.get(numArray[i]).to({ top: this.xlbtn.top }, 200);
                    }
                    egret.Tween.get(this.btnsbg).to({ height: 0 }, 200);
                    this.settingBtn.top = this.recordBtn.top = this.backBtn.top = this.helpBtn.top = this.xlbtn1.top = this.xlbtn.top;
                    break;
                case 2:
                    for (var i = 0; i < numArray.length; i++) {
                        egret.Tween.get(numArray[i]).to({ top: this.topBtns[i] }, 200);
                    }
                    egret.Tween.get(this.btnsbg).to({ height: this.btsBgHeigth }, 200); //364
                    break;
            }
        };
        NiuniuSGameScene.prototype.showStartAni = function () {
            var _this = this;
            var startGame = new DBComponent("nn_startgame");
            this.effectGroup.addChild(startGame);
            startGame.play("nn_startgame", 1);
            startGame.verticalCenter = -150;
            startGame.horizontalCenter = 0;
            SoundManager.getInstance().playEffect("nn_game_start_mp3");
            this.setAutoTimeout(function () {
                _this.timeBar.startTime(_this);
                _this.timeBar.visible = true;
            }, this, 1500);
        };
        /**
         * 根据坐标找到头像
         * @param  {} index
         */
        NiuniuSGameScene.prototype.getHeaderByIndex = function (index) {
            for (var i = 1; i <= 4; i++) {
                if (this['header' + i].index == index) {
                    return this['header' + i];
                }
            }
            return null;
        };
        /**
         * 隐藏自己的提示语
         */
        NiuniuSGameScene.prototype.falseMe = function (num1) {
            this.setAutoTimeout(function () {
                num1.visible = false;
            }, this, 1000);
        };
        NiuniuSGameScene.prototype.trueMe = function (num1) {
            num1.visible = true;
        };
        /**
         * 有牛BTN点击
         */
        NiuniuSGameScene.prototype.ynBtnTouchEnd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var sum, handler, cardss, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.nplist || this.nplist.length != 3) {
                                //TipsCompoment.instance.show("请选牌");
                                this.tisiLable.text = "请选牌";
                                this.trueMe(this.tisiGroup);
                                this.falseMe(this.tisiGroup);
                                return [2 /*return*/];
                            }
                            sum = NiuniuUtils.getNumberSum(this.nplist);
                            if (sum % 10 != 0) {
                                //TipsCompoment.instance.show("选牌错误");
                                this.tisiLable.text = "选牌错误";
                                this.trueMe(this.tisiGroup);
                                this.falseMe(this.tisiGroup);
                                return [2 /*return*/];
                            }
                            this.cards1.visible = false;
                            this.cards1_1.visible = true;
                            this.caculatorGroup.visible = false;
                            handler = ServerPostPath.game_nnHandle_rc_playCards;
                            cardss = { cards: this.nplist };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp = _a.sent();
                            // this.showTipsGroup("等待其他玩家选牛");
                            if (resp && resp.error && resp.error.code == 0) {
                                // 	this.caculator.visible = false;
                                // } else {
                                // 	this.ynBtn.visible = true;
                                // 	this.wnBtn.visible = true;
                                // 	this.cards1_1.visible = false;
                                // 	this.cards1.visible = true;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 无牛按钮点击
         */
        NiuniuSGameScene.prototype.wxBtnTouchEnd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var player, handler, cardss, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            player = Global.roomProxy.getMineInfo();
                            if (player.roundPattern > 0) {
                                //TipsCompoment.instance.show("你再看看，可能有牛哦");
                                this.tisiLable.text = "你再看看，可能有牛哦";
                                this.trueMe(this.tisiGroup);
                                this.falseMe(this.tisiGroup);
                                return [2 /*return*/];
                            }
                            handler = ServerPostPath.game_nnHandle_rc_playCards;
                            cardss = { cards: [] };
                            this.cards1_1.visible = true;
                            this.cards1.visible = false;
                            this.caculatorGroup.visible = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 摊牌点击
         */
        NiuniuSGameScene.prototype.tpBtnTouchEnd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, cardss, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_nnHandle_rc_playCards;
                            cardss = { cards: [] };
                            this.cards1_1.visible = true;
                            this.cards1.visible = false;
                            this.caculatorGroup.visible = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NiuniuSGameScene.prototype.boomBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, cardss, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_nnHandle_rc_playCards;
                            cardss = { cards: [] };
                            this.cards1_1.visible = true;
                            this.cards1.visible = false;
                            this.boomBtn.visible = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NiuniuSGameScene.prototype.fiveBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, cardss, resp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_nnHandle_rc_playCards;
                            cardss = { cards: [] };
                            this.cards1_1.visible = true;
                            this.cards1.visible = false;
                            this.fiveBtn.visible = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, cardss)];
                        case 1:
                            resp1 = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 自带监听
         */
        NiuniuSGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var sum;
                return __generator(this, function (_a) {
                    sum = 0;
                    e.stopPropagation();
                    //挂机功能 点击弹窗外其他区域关闭窗口
                    if (e.target == this.rectMask) {
                        LogUtils.logD("===当前点击得目标===" + e.target);
                        if (this.autoBar && this.autoBar.visible)
                            CF.dP(ENo.NIUNIU_GUAJI, false);
                    }
                    switch (e.target) {
                        case this.ynBtn:
                            this.ynBtnTouchEnd();
                            break;
                        case this.wnBtn:
                            this.wxBtnTouchEnd();
                            break;
                        case this.restartBtn:
                            //clubnew
                            this.allowBack = this.restartBtn.visible;
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    QZNNClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            this.restartBtnTouch();
                            break;
                        case this.backBtn:
                            this.showBtnsType(1);
                            this.allowBack = this.restartBtn.visible;
                            this.backBtnTouch();
                            break;
                        case this.settingBtn:
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_SETTING);
                            break;
                        case this.boomBtn:
                            this.boomBtnTouch();
                            break;
                        case this.fiveBtn:
                            this.fiveBtnTouch();
                            break;
                        case this.recordBtn:
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_NIUGAMERECORD, "blnn");
                            break;
                        case this.helpBtn:
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_HELP_SHU, { type: "blnn" });
                            break;
                        case this.xlbtn:
                            this.showBtnsType(2);
                            break;
                        case this.xlbtn1:
                            this.showBtnsType(1);
                            break;
                        //smart 摊牌按钮点击
                        case this.tanPaiBtn:
                            this.tpBtnTouchEnd();
                            break;
                        //点击autoBtn
                        case this.autoBtn:
                            if (this.autoBtn.source == this.autoBtnSelecIcon) {
                                CF.dP(ENo.NIUNIU_GUAJI, false);
                                //	Global.alertMediator.addAlert("停止挂机", null, null, true);
                                this.showGuaJiTips("停止挂机");
                                this.autoBtn.source = this.autoBtnUnSelecIcon;
                            }
                            else {
                                this.rectMask.visible = true;
                                this.autoBar.visible = true;
                                this.autoBar.resetState();
                            }
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 打开panl，关闭szGroup；
         */
        // private closePanls() {
        // 	this.btnzuo.visible = true;
        // 	this.btnxia.visible = false;
        // 	egret.Tween.get(this.gnGroup).to({ top: -80 }, 100);
        // }
        NiuniuSGameScene.prototype.listenEvent = function () {
            CF.aE(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
            CF.aE(ServerNotify.s_startRobDealer, this.startRobDealer, this);
            CF.aE(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
            CF.aE(ServerNotify.s_startAddAnte, this.startAddAnte, this);
            CF.aE(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
            CF.aE(ServerNotify.s_startPlayCards, this.startPlayCards, this);
            CF.aE(ServerNotify.s_playCards, this.playCards, this);
            CF.aE(ServerNotify.s_playCardsFinish, this.playCardsFinish, this);
            CF.aE(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
            CF.aE(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
            CF.aE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
            CF.aE(ServerNotify.s_dealerChanged, this.dealerChanged, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
            CF.aE(ServerNotify.s_roomFinished, this.roomFinished, this);
            CF.aE(ServerNotify.s_countdown, this.countdown, this);
            CF.aE(ENo.CACULATOR_VALUE, this.touchList, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
        };
        NiuniuSGameScene.prototype.listenOffEvent = function () {
            CF.rE(ServerNotify.s_robDealerMulti, this.robDealerMulti, this);
            CF.rE(ServerNotify.s_startRobDealer, this.startRobDealer, this);
            CF.rE(ServerNotify.s_playerRobDealer, this.playerRobDealer, this);
            CF.rE(ServerNotify.s_startAddAnte, this.startAddAnte, this);
            CF.rE(ServerNotify.s_addAnteFinish, this.addAnteFinish, this);
            CF.rE(ServerNotify.s_startPlayCards, this.startPlayCards, this);
            CF.rE(ServerNotify.s_playCards, this.playCards, this);
            CF.rE(ServerNotify.s_playCardsFinish, this.playCardsFinish, this);
            CF.rE(ServerNotify.s_playerAddAnte, this.playerAddAnte, this);
            CF.rE(ServerNotify.s_playerAnteChange, this.playerAnteChange, this);
            CF.rE(ServerNotify.s_roundSettlement, this.roundSettlement, this);
            CF.rE(ServerNotify.s_dealerChanged, this.dealerChanged, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ENo.CACULATOR_VALUE, this.touchList, this);
            CF.rE(ServerNotify.s_addAnteMulti, this.addAnteMulti, this);
            CF.rE(ServerNotify.s_roomFinished, this.roomFinished, this);
            CF.rE(ServerNotify.s_countdown, this.countdown, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ENo.NIUNIU_GUAJI, this.setAutoBtnState, this);
        };
        NiuniuSGameScene.prototype.countdown = function (e) {
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
        NiuniuSGameScene.prototype.runQzStep = function () {
            var _this = this;
            //TipsCompoment.instance.show("开始抢庄");
            var roomInfo = Global.roomProxy.roomInfo;
            var players = roomInfo.players;
            for (var index in players) {
                var player = players[index];
                if (player.robDealerAnte == -1) {
                    //如果是我 没有抢庄状态 就显示抢庄条
                    if (Global.roomProxy.checkIndexIsMe(index)) {
                        this.qzBar.show(player.robDealerMulti);
                        //挂机状态 根据挂机得选择自动选择
                        if (NiuniuGuaJiConfig.Instance.autoStatus) {
                            this.setAutoTimeout(function () {
                                var count = Number(_.last(NiuniuGuaJiConfig.Instance.qzVal));
                                LogUtils.logD("======挂机状态====抢庄得值=" + count);
                                _this.sendQZReq(_this.qzBar.qzList[count]);
                            }, this, this.autoDelayTime);
                        }
                    }
                }
                else {
                    var header = this.getHeaderByIndex(index);
                    header.showBeishu(player.robDealerAnte);
                }
            }
        };
        /**
         * 接收服务器开始抢庄消息
         */
        NiuniuSGameScene.prototype.startRobDealer = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            // this.timeBar.visible = true;
            // if (!roomInfo.countdown) roomInfo.countdown = {};
            // roomInfo.countdown.start = data.serverTimeStampMS;
            // roomInfo.countdown.end = data.countdownMS + data.serverTimeStampMS;
        };
        /**
         * 开始抢庄显示抢庄条
         */
        NiuniuSGameScene.prototype.robDealerMulti = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            var mine = Global.roomProxy.getMineInfo();
            mine.robDealerMulti = data;
            roomInfo.roundStatus = NiuniuStep.QIANG_ZHUANG;
            this.showRunTimeByStep(roomInfo.roundStatus);
            // this.showRunTimeByStep(roomInfo.roundStatus);
        };
        NiuniuSGameScene.prototype.showTipsGroup = function (text) {
            this.tipsGroup.visible = true;
            this.tipLabel.text = text;
        };
        NiuniuSGameScene.prototype.closeTipsGroup = function () {
            this.tipsGroup.visible = false;
            this.tipLabel.text = "";
        };
        /**
         * 发送抢庄信息
         */
        NiuniuSGameScene.prototype.sendQZReq = function (multi) {
            return __awaiter(this, void 0, void 0, function () {
                var serverPath, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serverPath = ServerPostPath.game_nnHandler_c_robDealer;
                            data = { multi: multi };
                            this.qzBar.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(serverPath, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                if (Global.roomProxy.roomInfo.roundStatus == NiuniuStep.QIANG_ZHUANG) {
                                    this.qzBar.visible = true;
                                }
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
        NiuniuSGameScene.prototype.playerRobDealer = function (e) {
            var data = e.data;
            if (Global.roomProxy.roomInfo.roundStatus != NiuniuStep.QIANG_ZHUANG) {
                return;
            }
            var player = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
            player.qzMulti = data.multi;
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
            header.showBeishu(data.multi);
            //展示每个玩家抢庄分数
        };
        /**
         * 抢庄结果
         */
        NiuniuSGameScene.prototype.dealerChanged = function (e) {
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
        NiuniuSGameScene.prototype.releaseQZUI = function () {
            this.qzBar.visible = false;
        };
        NiuniuSGameScene.prototype.releaseKPUI = function () {
            this.caculatorGroup.visible = false;
            this.cards1.visible = false;
            this.releaseQZUI();
        };
        //抢庄END
        NiuniuSGameScene.prototype.clearQZInfo = function () {
            var players = Global.roomProxy.roomInfo.players;
            for (var key in players) {
                if (key != "" + Global.roomProxy.roomInfo.dealer) {
                    var header = this.getHeaderByIndex(key);
                    header.hideBeishu();
                }
            }
        };
        //押注流程start
        /**
         * 进入押注流程 等待addAnteMulti
         */
        NiuniuSGameScene.prototype.startAddAnte = function (e) {
            this.releaseQZUI();
            this.clearQZInfo();
            //给服务器发事件 game_nnHandler_c_addAnte
            var data = e.data;
            var room = Global.roomProxy.roomInfo;
            room.roundStatus = NiuniuStep.ADDANTE;
            if (Global.roomProxy.checkIndexIsMe(room.dealer)) {
                this.showTipsGroup("等待其他玩家下注");
            }
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
        NiuniuSGameScene.prototype.addAnteMulti = function (e) {
            var _this = this;
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            var mine = Global.roomProxy.getMineInfo();
            mine.addAnteMulti = data;
            Global.roomProxy.roomInfo.roundStatus = NiuniuStep.ADDANTE;
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
        NiuniuSGameScene.prototype.runAddanteStep = function () {
            var _this = this;
            this.releaseQZUI();
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
                        LogUtils.logD("=====player.addAnteMulti==" + JSON.stringify(player.addAnteMulti));
                        this.yzBar.show(player.addAnteMulti);
                        //再挂机状态下
                        if (NiuniuGuaJiConfig.Instance.autoStatus) {
                            for (var key in player.addAnteMulti) {
                                var result = player.addAnteMulti[key];
                                if (!result) {
                                    //如果 金币不足 
                                    if (key == NiuniuGuaJiConfig.Instance.yzVal) {
                                        //当金币不满足选项要求时停止挂机，界面上弹出tips提示“金币不足，停止挂机”，挂机按钮变为正常状态
                                        CF.dP(ENo.NIUNIU_GUAJI, false);
                                        //Global.alertMediator.addAlert("金币不足，停止挂机", null, null, true);
                                        this.showGuaJiTips("金币不足，停止挂机");
                                        this.autoBtn.source = this.autoBtnUnSelecIcon;
                                    }
                                }
                            }
                        }
                        //挂机状态
                        if (NiuniuGuaJiConfig.Instance.autoStatus) {
                            this.setAutoTimeout(function () {
                                var yzVal = Number(NiuniuGuaJiConfig.Instance.yzIndex);
                                LogUtils.logD("====挂机状态==倍数得值==" + yzVal);
                                _this.sendYZReq(_this.yzBar.qzList[yzVal]);
                            }, this, this.autoDelayTime);
                        }
                    }
                }
                else {
                    var header = this.getHeaderByIndex(index);
                    header.showBeishu(player.addAnte);
                }
            }
        };
        /**
         * 闲家押注
         */
        NiuniuSGameScene.prototype.sendYZReq = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var serverPath, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            serverPath = ServerPostPath.game_nnHandler_c_addAnte;
                            data = { multi: value };
                            this.yzBar.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(serverPath, data)];
                        case 1:
                            resp = _a.sent();
                            // this.showTipsGroup("等待其他玩家押注");
                            if (resp && resp.error && resp.error.code != 0) {
                                if (Global.roomProxy.roomInfo.roundStatus == NiuniuStep.ADDANTE) {
                                    this.yzBar.visible = true;
                                }
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
        NiuniuSGameScene.prototype.playerAddAnte = function (e) {
            //	展示每个压住玩家的分数  game_nnHandler_c_addAnte
            this.playerAnteChange(e);
        };
        /**
         * 玩家押注通知
         */
        NiuniuSGameScene.prototype.playerAnteChange = function (e) {
            var data = e.data;
            var player = Global.roomProxy.getPlayerInfoByIndex(data.playerIndex);
            player.addAnte = data.multi;
            if (data.playerIndex == Global.roomProxy.getMineIndex()) {
                this.yzBar.visible = false;
                if (!this.findNotAnteOver()) {
                    this.showTipsGroup("等待其他玩家下注");
                }
                else {
                    this.closeTipsGroup();
                    //	this.timeBar.visible = false;
                }
            }
            else {
                if (this.findNotAnteOver()) {
                    this.closeTipsGroup();
                    //	this.timeBar.visible = false;
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
        NiuniuSGameScene.prototype.findNotQZOver = function () {
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
        NiuniuSGameScene.prototype.findNotAnteOver = function () {
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
         * 押注完成
         */
        NiuniuSGameScene.prototype.addAnteFinish = function (e) {
            //服务器会告诉,相当于清除押注的UI，开始发牌的相关UI
            this.closeTipsGroup();
            var room = Global.roomProxy.roomInfo;
            room.roundStatus = NiuniuStep.EMPTY;
            Global.roomProxy.roomInfo.countdown = null;
            this.timeBar.visible = false;
            this.releaseYZUI();
        };
        NiuniuSGameScene.prototype.releaseYZUI = function () {
            this.releaseQZUI();
            this.yzBar.visible = false;
        };
        //押注end
        //发牌开始
        /**
         * 开始发牌
         */
        NiuniuSGameScene.prototype.initHandCards = function (e) {
            this.releaseYZUI();
            var data = e.data;
            var cards = data.cards;
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = NiuniuStep.FAPAI;
            this.createPokers();
            var players = roomInfo.players;
            for (var key in players) {
                var player = players[key];
                var index = this.directions[key];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    player.handCards = cards;
                    player.roundPattern = data.roundPattern;
                    this.cards1.renderByList(cards);
                }
                else {
                    player.cardLength = data.cardLength;
                    this['player' + index].visible = true;
                    var cards_1 = this['cards' + index];
                    cards_1.renderByList(player.cardLength);
                }
            }
            this.startMove();
            //动画过后展现
            // this.setAutoTimeout(() => {
            //进入看牌流程
            // roomInfo.roundStatus = NiuniuStep.XUANPAI;
            // }, this, 3500);
        };
        /**
         * 选牌  7
         */
        NiuniuSGameScene.prototype.startPlayCards = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            // if (!roomInfo.countdown) roomInfo.countdown = {};
            // roomInfo.countdown.start = data.serverTimeStampMS;
            // roomInfo.countdown.end = data.countdownMS + data.serverTimeStampMS;
            game.DateTimeManager.instance.updateServerTime(data.serverTimeStampMS);
        };
        NiuniuSGameScene.prototype.hideTouch = function () {
            this.caculatorGroup.visible = false;
            this.fiveBtn.visible = false;
            this.boomBtn.visible = false;
            this.lockTouch = true;
        };
        NiuniuSGameScene.prototype.findNotChooseOver = function () {
            var players = Global.roomProxy.getPlayers();
            for (var key in players) {
                var player = players[key];
                if (!player.handCards || player.handCards.length < 5) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 服务器推送什么牌型  8
         */
        NiuniuSGameScene.prototype.playCards = function (e) {
            //展示有牛没牛，但是不给其他玩家展示
            var data = e.data;
            var cards = data.handCards;
            var roundPattern = data.roundPattern;
            var selectCards = data.selectedCards;
            var index = data.playerIndex;
            var player = Global.roomProxy.getPlayerInfoByIndex(index);
            player.handCards = cards;
            player.roundPattern = roundPattern;
            player.selectCards = selectCards;
            /**
             * 显示完成
             */
            var dir = this.directions[index];
            // this["wc" + dir].visbile = true;
            this.showWc(index);
            if (Global.roomProxy.checkIndexIsMe(index)) {
                //是我
                this.hideTouch();
                this.cards1.delTouch();
                this.cards1.visible = false;
                this.cards1_1.visible = true;
                if (this.findNotChooseOver()) {
                    this.closeTipsGroup();
                    //this.timeBar.visible = false;
                }
                else {
                    this.showTipsGroup("等待其他玩家选牛");
                }
            }
            else {
                this["cards" + dir].visible = true;
                if (this.findNotChooseOver()) {
                    this.closeTipsGroup();
                    //this.timeBar.visible = false;
                }
            }
        };
        NiuniuSGameScene.prototype.showWc = function (key) {
            var dir = this.directions[key];
            switch (dir) {
                case "1":
                    this.wc1.visible = true;
                    break;
                case "2":
                    this.wc2.visible = true;
                    break;
                case "3":
                    this.wc3.visible = true;
                    break;
                case "4":
                    this.wc4.visible = true;
                    break;
            }
        };
        NiuniuSGameScene.prototype.sortShoupai = function (cards, selectCards) {
            if (!selectCards) {
                return cards;
            }
            var copyCard = selectCards.concat(cards);
            return _.uniq(copyCard);
        };
        /**
         * 玩家选牌结果 9
         */
        NiuniuSGameScene.prototype.playCardsFinish = function (e) {
            //玩家选牌完成，展示所有玩家的牌面。
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = NiuniuStep.EMPTY;
            Global.roomProxy.roomInfo.countdown = null;
            this.timeBar.visible = false;
            this.releaseKPUI();
            this.closeTipsGroup();
        };
        /**
         * 飞金币效果
         */
        NiuniuSGameScene.prototype.showGold2Header = function (index1, index2) {
            var _this = this;
            if (Global.runBack) {
                return;
            }
            var header1 = this['player' + index1]; //this.getHeaderByIndex(index1) as NiuniuNewHeader;
            var header2 = this['player' + index2]; //this.getHeaderByIndex(index2) as NiuniuNewHeader;
            var arr = [];
            for (var i = 0; i < 12; i++) {
                arr.push(i);
            }
            async.eachSeries(arr, function (num, callback) {
                var image = ObjectPool.produce("nn_coin_img", eui.Image);
                if (!image) {
                    image = new eui.Image("nn_coin_png");
                    image.scaleX = image.scaleY = 0.8;
                }
                image.horizontalCenter = header1.horizontalCenter + _.random(-20, 20);
                image.verticalCenter = header1.verticalCenter - 50 + _.random(-20, 20);
                _this.effectGroup.addChild(image);
                NiuniuUtils.playFjb();
                var time = _.random(200, 550);
                egret.Tween.get(image).wait(15 * (num / 2)).call(function () {
                    callback();
                }).to({
                    horizontalCenter: header2.horizontalCenter + _.random(-20, 20),
                    verticalCenter: header2.verticalCenter - 50 + _.random(-20, 20)
                }, time, egret.Ease.cubicInOut).call(function () {
                    game.UIUtils.removeSelf(image);
                    ObjectPool.reclaim("nn_coin_img", image);
                });
            });
        };
        NiuniuSGameScene.prototype.updateZhuangjiaLiushui = function (gold) {
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
        NiuniuSGameScene.prototype.roundSettlement = function (e) {
            var _this = this;
            //调用展示牌
            try {
                this.releaseKPUI();
                this.closeTipsGroup();
                var data_1 = e.data;
                var roomInfo = Global.roomProxy.roomInfo;
                var keys = NiuniuUtils.getNNSort(roomInfo.dealer, Global.roomProxy.getPlayersLength());
                async.eachSeries(keys, function (key, callback) {
                    var player = Global.roomProxy.getPlayerInfoByIndex(key);
                    var ptn = player.roundPattern;
                    var dir = _this.directions[key];
                    if (!Global.roomProxy.checkIndexIsMe(key)) {
                        var resultCards = _this.sortShoupai(player.handCards, player.selectCards);
                        var list1 = _this['cards' + dir];
                        list1.renderByList(resultCards);
                    }
                    else {
                        var resultCards = _this.sortShoupai(player.handCards, player.selectCards);
                        var list1 = _this['cards' + dir + "_" + dir];
                        list1.renderByList(resultCards);
                    }
                    _this.setAutoTimeout(function () {
                        var playerData = Global.roomProxy.getPlayerByIndex(key);
                        if (playerData) {
                            _this.showNiu(ptn, dir);
                            //播声音
                            NiuniuUtils.playShowNiu(playerData.sex, ptn);
                        }
                    }, _this, 100);
                    _this.setAutoTimeout(function () {
                        callback();
                    }, _this, 1000);
                }, function () {
                    _this.goldAni(data_1);
                });
            }
            catch (e) {
            }
        };
        NiuniuSGameScene.prototype.showYouWin = function (gold) {
            this.youwinGroup.visible = true;
            var winDb = new DBComponent("nn_youwin");
            winDb.x = 268;
            winDb.y = 30;
            winDb.callback = function () {
            };
            this.youwinGroup.addChild(winDb);
            this.mineWinLabel.visible = true;
            this.youwinGroup.addChild(this.mineWinLabel);
            winDb.playNamesAndLoop(["nn_youwin", "nn_youwin_loop"]);
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ targetGold: gold }, 500, egret.Ease.quadInOut);
        };
        /**
         * 金币过滤。
         */
        NiuniuSGameScene.prototype.goldAni = function (records) {
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
                    _this.setAutoTimeout(callback, _this, 1000); //1500 samrt缩短等待时间
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
                    _this.setAutoTimeout(callback, _this, 700); //1000 samrt缩短等待时间
                }
            ], function (data, callback) {
                //通吃和通赔
                var length = xian2zhuangRecords.length + zhuang2xianRecords.length;
                if (zhuang2xianRecords.length == length) {
                    SoundManager.getInstance().playEffect("poker_tp_mp3");
                    PukerUtils.showZJTongPei(_this.effectGroup);
                }
                else if (xian2zhuangRecords.length == length) {
                    SoundManager.getInstance().playEffect("poker_tc_mp3");
                    PukerUtils.showZJTongChi(_this.effectGroup);
                }
                //庄家飞闲家				
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
                        if (sum > 0) {
                            header.hideLiushuiLabel();
                            _this.showYouWin(sum);
                            NiuniuUtils.showWin();
                        }
                        Global.playerProxy.playerData.gold = lishuis.ownGold;
                    }
                    header.showLiushuiLabel(sum);
                }
                _this.setAutoTimeout(function () {
                    _this.restartBtn.visible = true;
                    _this.allowBack = true;
                    //延迟一秒 自动挂机
                    var remaicount = NiuniuGuaJiConfig.Instance.remainCount;
                    remaicount -= 1;
                    if (remaicount <= 0) {
                        NiuniuGuaJiConfig.Instance.setAutoStatus(false);
                        _this.autoBtn.source = _this.autoBtnUnSelecIcon;
                        //	Global.alertMediator.addAlert("停止挂机", null, null, true);
                        _this.showGuaJiTips("停止挂机");
                    }
                    if (NiuniuGuaJiConfig.Instance.autoStatus && remaicount > 0) {
                        LogUtils.logD("=====剩余得次数====" + remaicount);
                        NiuniuGuaJiConfig.Instance.setRemainCount(remaicount);
                        _this.setAutoTimeout(function () {
                            _this.restartBtnTouch();
                        }, _this, _this.autoDelayTime);
                    }
                }, _this, 2000);
            });
        };
        NiuniuSGameScene.prototype.test = function () {
            this.showHeaders_test();
            // this.restartBtn.visible = true;
            var card = [201, 202, 203, 204, 205];
            this.cards1.renderByList(card);
            this.cards1.visible = true;
            // this.setAutoTimeout(() => {
            // this.turnOutPoker(card);
            // }, this, 2000)
        };
        /**
         * 展现玩家头像
         */
        NiuniuSGameScene.prototype.showHeaders = function () {
            var players = Global.roomProxy.getPlayers();
            var zhuangId = Global.roomProxy.roomInfo.dealer; //换到抢庄的地方去。
            for (var key in players) {
                var dir = this.directions[key];
                var player = this['player' + dir];
                var header = this['header' + dir];
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    var cards = this['cards' + dir];
                    //cards.visible = false;
                }
                else {
                    var cards = this['cards' + dir];
                    cards.visible = false;
                }
                header.initWithPlayer(players[key]);
                header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
                player.visible = true;
                header.visible = true;
            }
            this['header2'].change2Left();
        };
        NiuniuSGameScene.prototype.runFapaiStep = function () {
        };
        NiuniuSGameScene.prototype.runXuanpaiStep = function () {
            var _this = this;
            var players = Global.roomProxy.getPlayers();
            this.qzBar.visible = false;
            this.yzBar.visible = false;
            this.cards1.addTouch();
            for (var key in players) {
                var player = players[key];
                var dirIndex = this.directions[key];
                var header = this.getHeaderByIndex(key);
                header.showBeishu(player.addAnte);
                if (Global.roomProxy.checkIndexIsMe(key)) {
                    if (player.isPlayCards) {
                        //选择了牌
                        this.cards1_1.visible = true;
                    }
                    else {
                        if (player.roundPattern == 13) {
                            this.otherBtnGroups.visible = true;
                            this.boomBtn.visible = true;
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    _this.boomBtnTouch();
                                }, this, this.autoDelayTime);
                            }
                        }
                        else if (player.roundPattern == 14) {
                            this.otherBtnGroups.visible = true;
                            this.fiveBtn.visible = true;
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    _this.fiveBtnTouch();
                                }, this, this.autoDelayTime);
                            }
                        }
                        else {
                            this.caculatorGroup.visible = true;
                            //smart 加上倒计时
                            this.timeBar.visible = true;
                            this.cards1.visible = true;
                            this.cards1.renderByList(player.handCards);
                            //如果是自动模式
                            if (NiuniuGuaJiConfig.Instance.autoStatus) {
                                this.setAutoTimeout(function () {
                                    _this.autoSelectCards();
                                }, this, this.autoDelayTime);
                            }
                        }
                    }
                }
                else {
                    var cards = this['cards' + this.directions[key]];
                    cards.renderByList(5);
                    cards.visible = true;
                }
            }
        };
        /**自动选择card*/
        NiuniuSGameScene.prototype.autoSelectCards = function () {
            var _this = this;
            var data = this.cards1.getYNCards();
            LogUtils.logD("====autoSelectCards====" + data.hanveNiu);
            if (data.hanveNiu) {
                var card = void 0;
                var ynCardsArr = data.ynCards;
                for (var i = 0; i < ynCardsArr.length; ++i) {
                    card = data.ynCards[i];
                    card.selectUp();
                }
                this.listUpThree(ynCardsArr);
                this.setAutoTimeout(function () {
                    _this.ynBtnTouchEnd();
                }, this, 1000);
            }
            else {
                this.wxBtnTouchEnd();
            }
        };
        /**
         * 展示不同时间节点状态
         */
        NiuniuSGameScene.prototype.showRunTimeByStep = function (step) {
            switch (step) {
                case NiuniuStep.QIANG_ZHUANG:
                    this.runQzStep();
                    break;
                case NiuniuStep.FAPAI:
                    this.timeBar.visible = false;
                    this.runFapaiStep();
                    break;
                case NiuniuStep.KAIPAI:
                case NiuniuStep.XUANPAI:
                    this.timeBar.visible = true;
                    this.runXuanpaiStep();
                    break;
                case NiuniuStep.ADDANTE:
                    this.timeBar.visible = true;
                    this.runAddanteStep();
                    break;
            }
        };
        /**
         * 翻牌效果，就是把扣下的牌翻过来。
         */
        NiuniuSGameScene.prototype.turnOutPoker = function (card) {
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
        //samrt
        NiuniuSGameScene.prototype.touchList = function (e) {
            // this.nplist = [];
            var nums = e.data;
            if (nums.length < 3) {
                this.setYNBtnGray();
            }
            else {
                // let count = 0;
                // let temp = 0;
                // for (let i = 0; i < nums.length; i++) {
                // 	let value = nums[i]["value"];
                // 	let color = nums[i]["color"];
                // 	temp = value;
                // 	if (temp > 10) {
                // 		temp = 10;
                // 	}
                // 	count += temp;
                // 	let cardValue = color * 100 + value;
                // 	this.nplist.push(cardValue);
                // }
                // if (count % 10 == 0) {
                // 	this.setYNBtnGray(false);
                // 	this.createYNDB();
                // }
                //smart
                this.listUpThree(nums);
            }
        };
        NiuniuSGameScene.prototype.listUpThree = function (nums) {
            this.nplist = [];
            var count = 0;
            var temp = 0;
            for (var i = 0; i < nums.length; i++) {
                var value = nums[i]["value"];
                var color = nums[i]["color"];
                temp = value;
                if (temp > 10) {
                    temp = 10;
                }
                count += temp;
                var cardValue = color * 100 + value;
                this.nplist.push(cardValue);
            }
            if (count % 10 == 0) {
                this.setYNBtnGray(false);
                //this.createYNDB();
            }
        };
        /**
         * 游戏结束
         * @param  {egret.TouchEvent} e
         */
        NiuniuSGameScene.prototype.roomFinished = function (e) {
            _super.prototype.roomGameOver.call(this, e);
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = NiuniuStep.CLOSE;
            this.status = NiuniuStatus.close;
            this.timeBar.visible = false;
            this.timeBar.removeTimer();
            if (data.status == 2) {
                Global.alertMediator.addAlert("牌局异常结束,请联系客服", function () {
                    CF.sN(SceneNotify.OPEN_NIUNIUSELECT);
                    CF.sN(SceneNotify.CLOSE_NIUNIUGAMES);
                }, null, true);
            }
        };
        /**
             * 展现玩家头像
             */
        NiuniuSGameScene.prototype.showHeaders_test = function () {
            var players = Global.roomProxy.getPlayers().length || [1, 2, 3, 4, 5, 6];
            //let zhuangId = Global.roomProxy.roomInfo.dealer;//换到抢庄的地方去。
            for (var key = 1; key <= 6; key++) {
                //	let dir = this.directions[key];
                var player = this['player' + key];
                var header = this['header' + key];
                if (key == 2) {
                    var cards = this['cards' + key];
                    cards.visible = false;
                }
                else {
                    var cards = this['cards' + key];
                    cards.visible = false;
                }
                //header.initWithPlayer(players[key]);
                player.visible = true;
                header.visible = true;
            }
            // this.randomEstates();
        };
        NiuniuSGameScene.prototype.createPokers = function () {
            var length = Global.roomProxy.getPlayersLength() || 6;
            for (var i = length * 5 - 1; i >= 0; i--) {
                var tempPokers = ObjectPool.produce("niuniu_poker", niuniu.NiuniuCard);
                if (!tempPokers) {
                    tempPokers = new niuniu.NiuniuCard();
                }
                this.effectGroup.addChild(tempPokers);
                tempPokers.name = "poker" + i;
                tempPokers.scaleX = tempPokers.scaleY = 0.55;
                tempPokers.verticalCenter = 0;
                tempPokers.horizontalCenter = 0.05 - i * 0.08;
            }
            // this.startMove();
        };
        /**
         * 发牌
         */
        NiuniuSGameScene.prototype.startMove = function () {
            var _this = this;
            var count = 1;
            var length = Global.roomProxy.getPlayersLength() || 6;
            var listArr = [];
            for (var i = 0; i < length; i++) {
                listArr[i] = i;
            }
            async.eachSeries(listArr, function (data, callback) {
                var time1 = 0;
                var _loop_1 = function (i) {
                    var poker = _this.effectGroup.getChildByName("poker" + i);
                    if (Global.runBack) {
                        game.UIUtils.removeSelf(poker);
                        ObjectPool.reclaim("niuniu_poker", poker);
                    }
                    else {
                        egret.Tween.get(poker)
                            .to({ verticalCenter: _this["pl" + count].verticalCenter, horizontalCenter: _this["pl" + count].horizontalCenter }, (150 + (50 * time1))).call(function () {
                            game.UIUtils.removeSelf(poker);
                            ObjectPool.reclaim("niuniu_poker", poker);
                        });
                    }
                    time1++;
                };
                for (var i = data * 5; i < (data + 1) * 5; i++) {
                    _loop_1(i);
                }
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
                    Global.roomProxy.roomInfo.roundStatus = NiuniuStep.XUANPAI;
                    _this.showRunTimeByStep(Global.roomProxy.roomInfo.roundStatus);
                }, _this, 1000);
            });
        };
        NiuniuSGameScene.prototype.tweenSync = function (node, showTime, hideTime) {
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
        NiuniuSGameScene.prototype.randomEstates = function () {
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
                                header_2.showBeishuGroup();
                                header_2.showIsZhuang(true);
                            }
                            else {
                                egret.Tween.get(header_2.headerImage_k).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).call(function () { NiuniuUtils.playDz(); }).to({ visible: true }, 80).to({ visible: false }, 80).to({ visible: true }, 80).call(function () {
                                    header_2.showBeishuGroup();
                                    header_2.showIsZhuang(true);
                                }, this);
                            }
                            _a.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 交换group位子
         */
        NiuniuSGameScene.prototype.changePlayerGroup = function (index1, index2) {
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
            this.niuniuTipsData[index1] = index2;
        };
        /**
         * 展示牛牌
         * @param  {} pt pattern
         * @param  {} direction 位子
         */
        NiuniuSGameScene.prototype.showNiu = function (pt, direction) {
            this.wc1.visible = this.wc2.visible = this.wc3.visible = this.wc4.visible = false;
            var newFen = new niuniu.NiuniuNewFen(pt);
            var dir = this.niuniuTipsData[direction] + "";
            switch (dir) {
                case "3":
                    newFen.x = 5;
                    newFen.y = 263;
                    break;
                case "1":
                case "2":
                    newFen.x = 10;
                    newFen.y = 320;
                    break;
                case "4":
                    newFen.x = 15;
                    newFen.y = 320;
                    break;
            }
            var pl = this["player" + dir];
            pl.addChild(newFen);
            return newFen;
        };
        NiuniuSGameScene.prototype.testShowNiu = function () {
            // PukerUtils.showZJTongChi(this.effectGroup);
            this.showYouWin(5000);
        };
        /**
         * 断线重连
         */
        NiuniuSGameScene.prototype.reconnectSuc = function (e) {
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
        NiuniuSGameScene.prototype.onChange = function () {
            var gold = NumberFormat.handleFloatDecimal(this.targetGold);
            this.mineWinLabel.text = "+" + gold;
        };
        return NiuniuSGameScene;
    }(game.BaseGameScene));
    niuniu.NiuniuSGameScene = NiuniuSGameScene;
    __reflect(NiuniuSGameScene.prototype, "niuniu.NiuniuSGameScene");
})(niuniu || (niuniu = {}));
