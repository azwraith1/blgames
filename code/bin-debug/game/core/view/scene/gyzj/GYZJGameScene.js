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
    var GYZJGameScene = (function (_super) {
        __extends(GYZJGameScene, _super);
        function GYZJGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "gyzjmj";
            //选中的手牌
            _this.hszShoupaiArr = [];
            //是否显示过
            _this.showQingqueTipState = false;
            _this.startNumber = 108;
            _this.isOverSceneLoad = false;
            _this.canShowOverScene = false;
            /**
          * 玩家报听
          */
            _this.isTingStatus = false;
            //---检查有没有可以胡牌
            _this.huCards = [];
            /**
             * 检查当前手牌能否胡牌
             */
            // public checkMineShoupaiHu() {
            //     let mineData = Global.gameProxy.getMineGameData();
            //     if (!mineData.selectColor) {
            //         return
            //     }
            //     //已经胡牌就确定牌型
            //     if (mineData.huCards.length > 0) {
            //         return;
            //     }
            //     let huCards = window['TingCardTip'].getTings(mineData.cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            //     this.lastHuTips = huCards;
            //     this.tipBtn.visible = huCards.length > 0;
            // }
            _this.lastHuTips = [];
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_GYZJMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_GYZJMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_GYZJMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_GYZJ_MATCHING;
            /**
             * 结算界面
             */
            _this.GAME_OVER_NOTIFY = SceneNotify.OPEN_GYZJMJ_OVER;
            /**
          * 检查玩家是否有叫
          */
            _this.currentTings = [];
            _this.testBug1 = { "players": { "1": { "isDefeat": false, "handCards": { "17": 2, "19": 2, "23": 1, "24": 1, "25": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 4107.19, "bills": [], "score": 0, "isTing": true }, "2": { "isDefeat": false, "handCards": { "36": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 624.29, "bills": [], "score": 0, "isTing": true }, "3": { "isDefeat": false, "handCards": { "38": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 564.44, "bills": [], "score": 0, "isTing": true }, "4": { "isDefeat": false, "handCards": { "17": 2, "23": 1, "25": 1, "37": 1, "38": 1, "39": 1 }, "chickCardInfo": { "general": {}, "special": {} }, "gainGold": 0, "pumpGold": 0, "ownGold": 838.68, "bills": [], "score": 0, "isTing": true } }, "status": 1, "fireChickPlayerIndex": -1, "winPlayer": [], "lossPlayer": [], "chickCards": [21, 18], "catchChickCard": null, "remainNum": 0 };
            _this.skinName = "resource/skins/scene/gyzj/GYZJGameSceneSkin.exml";
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        GYZJGameScene.prototype.fapaiRound4 = function (sortDir) {
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
                    egret.setTimeout(function () {
                        _this.fapaiRoundOver();
                    }, _this, 400);
                }, _this, 400);
            });
        };
        GYZJGameScene.prototype.fapaiRoundOver = function () {
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
            }, this, 400);
        };
        /**
         * 这里是自动给玩家推荐三张牌的方法
         */
        GYZJGameScene.prototype.tishiSanzhang = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var hszCards = mineData.hszCardsTip;
            var data = [];
            for (var i = 0; i < hszCards.length; i++) {
                var hszCardVal = hszCards[i];
                var shoupai = this.mineShoupaiGroup.randomChoseThree(hszCardVal);
                if (shoupai) {
                    data.push(shoupai);
                }
            }
            return data;
        };
        /**
         * 这里将随机的三张牌加进去。
         */
        GYZJGameScene.prototype.showHSZTip = function () {
            var items = this.tishiSanzhang();
            try {
                for (var i = 0; i < 3; i++) {
                    this.hszShoupaiArr.push(items[i]);
                }
            }
            catch (e) {
                console.error(items);
            }
            if (!this.hszBar) {
                this.hszBar = new majiang.HSZBar();
                this.hszBar.horizontalCenter = 0;
                this.hszBar.bottom = 163;
                this.touchGroup.addChild(this.hszBar);
            }
            this.hszBar.onStart(this);
            this.hszBar.visible = true;
            this.maxTouchShoupai = 3;
            CF.dP(ENo.HSZ_SELECT_NUM, this.hszShoupaiArr.length);
        };
        //---回显胡牌end----------------------------------------------
        /**
         * 显示重新连接上来的UI
         */
        GYZJGameScene.prototype.showReconnectUI = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            // this.checkHszStatus(roomInfo);
            this.checkTrusteeStatus();
            this.checkChupaiStatus();
            this.checkTask();
            this.reloadAllChickenSign();
        };
        GYZJGameScene.prototype.checkChupaiStatus = function () {
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
         * 移除和换三张有关的UI
         */
        GYZJGameScene.prototype.removeHszUI = function () {
            for (var key in this.directions) {
                var direction = this.directions[key];
                game.UIUtils.removeSelf(this[direction + "NoHsz"]);
                game.UIUtils.removeSelf(this[direction + "Hsz"]);
                game.UIUtils.removeSelf(this.hszBar);
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        };
        /**
         * 移除和换三张有关的UI
         */
        GYZJGameScene.prototype.hideHszUI = function () {
            for (var key in this.directions) {
                var direction = this.directions[key];
                if (this[direction + "NoHsz"]) {
                    this[direction + "NoHsz"].visible = false;
                }
                if (this[direction + "Hsz"]) {
                    this[direction + "Hsz"].visible = false;
                }
                if (this.hszBar) {
                    this.hszBar.visible = false;
                }
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        };
        /**
         * 移除定缺UI
         */
        GYZJGameScene.prototype.removeDQUI = function () {
            if (this.mjDqBar) {
                this.mjDqBar.visible = false;
                game.UIUtils.removeSelf(this.mjDqBar);
                this.mjDqBar = null;
                this.otherChose.visible = false;
                if (this.otherChose) {
                    this.otherChose.visible = false;
                }
            }
        };
        /**
         * 展示玩家没有换三张的状态
         * @param  {number} index
         */
        GYZJGameScene.prototype.showNoSelectHszUI = function (index) {
            //如果是本人
            var direction = this.directions[index];
            if (direction == "mine") {
                this.showHSZTip();
            }
            else {
                var image = this[direction + "NoHsz"];
                var image1_1 = image.getChildAt(1);
                var image2_1 = image.getChildAt(2);
                var image3_1 = image.getChildAt(3);
                image.visible = true;
                egret.Tween.get(this, { loop: true }).call(function () {
                    image1_1.visible = true;
                }).wait(200).call(function () {
                    image2_1.visible = true;
                }).wait(200).call(function () {
                    image3_1.visible = true;
                }).wait(200).call(function () {
                    image2_1.visible = image3_1.visible = false;
                });
            }
        };
        /**
        * 展示玩家没有定缺的状态。
        * @param  {number} index
        */
        GYZJGameScene.prototype.showNoSelectDqUI = function (index) {
            //如果是本人
            var direction = this.directions[index];
            if (direction == "mine") {
                var mine = Global.gameProxy.getMineGameData();
                if (mine.selectColor == -1) {
                    this.showDingQue();
                }
            }
            else {
                var image = this[direction + "NoHsz"];
                var image1_2 = image.getChildAt(1);
                var image2_2 = image.getChildAt(2);
                var image3_2 = image.getChildAt(3);
                image.visible = true;
                egret.Tween.get(this, { loop: true }).call(function () {
                    image1_2.visible = true;
                }).wait(200).call(function () {
                    image2_2.visible = true;
                }).wait(200).call(function () {
                    image3_2.visible = true;
                }).wait(200).call(function () {
                    image2_2.visible = image3_2.visible = false;
                });
            }
        };
        /**
         * 展现换三张已经选择OK的界面
         * @param  {number} index
         */
        GYZJGameScene.prototype.showSelectedHszUI = function (index) {
            var direction = this.directions[index];
            //扣牌组
            var group = this[direction + "Hsz"];
            var shoupaiGroup = this[direction + "ShoupaiGroup"];
            //隐藏三张
            shoupaiGroup.hideRight3pais();
            if (direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
            group.visible = true;
        };
        /**
       * 展现定缺已经选择OK的界面
       * @param  {number} index
       */
        GYZJGameScene.prototype.showSelectedDqUI = function (index) {
            var direction = this.directions[index];
            if (direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
        };
        /**
         * 展示换三张动画
         * @param  {number} index
         * @param  {boolean} flag
         */
        GYZJGameScene.prototype.showHszAni = function (index) {
            var direction = this.directions[index];
            //扣牌组
            var group = this[direction + "Hsz"];
            //如果不是我
            var image = this[direction + "NoHsz"];
            if (image) {
                image.visible = false;
            }
            this[direction + "ShoupaiGroup"].hideRight3pais();
            //等待换三张的图片
            group.visible = true;
            switch (direction) {
                case "top":
                    egret.Tween.get(group).to({
                        top: group.top + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "mine":
                    egret.Tween.get(group).to({
                        bottom: group.bottom + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "left":
                    egret.Tween.get(group).to({
                        horizontalCenter: group.horizontalCenter + 15
                    }, 300, egret.Ease.sineIn);
                    break;
                case "right":
                    egret.Tween.get(group).to({
                        horizontalCenter: group.horizontalCenter - 15
                    }, 300, egret.Ease.sineIn);
                    break;
            }
        };
        GYZJGameScene.prototype.renderContent = function () {
            var _this = this;
            this.tipBtn.visible = false;
            //显示玩家头像
            this.showHeaders();
            //创建功能条
            this.createTaskBar();
            //重连的话不需要发牌
            //  || Global.runBack
            if (Global.gameProxy.reconnect) {
                this.paiQiang.reloadPaiQiang();
                for (var i = 1; i <= 4; i++) {
                    this.showShoupaiByIndex(i, true);
                }
                this.timeDirectionBar.removeTimer();
                this.timeDirectionBar.removeAllTween();
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
        GYZJGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _super.prototype.createChildren.call(this);
                            if (!!Global.gameProxy.roomInfo) return [3 /*break*/, 2];
                            return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
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
                            this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                            SoundManager.getInstance().playMusic("playingingame_mp3");
                            this.showWanfa();
                            return [2 /*return*/];
                    }
                });
            });
        };
        GYZJGameScene.prototype.chickDB = function (name, afterfinish, thisobj) {
            if (name === void 0) { name = "gyzj_chong"; }
            if (afterfinish === void 0) { afterfinish = null; }
            if (thisobj === void 0) { thisobj = null; }
            var db = new DBComponent(name);
            // db.x = penggang.localToGlobal().x + x;
            // db.y = penggang.localToGlobal().y + y;
            db.callback = function () {
                if (afterfinish)
                    afterfinish.call(thisobj);
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this.addChild(db);
            db.playByFilename(0);
            db.x = 596.52 + 20;
            db.y = 382.85 + 10;
        };
        GYZJGameScene.prototype.test = function (direction, i) {
            var _this = this;
            egret.setTimeout(function () {
                _this.playChickenDB("gyzj_zrj", direction, 2);
                //this.chickDB();
            }, this, 4000 * i);
        };
        GYZJGameScene.prototype.clearTingStatus = function () {
            if (this.isTingStatus) {
                this.isTingStatus = false;
                var mineData = Global.gameProxy.getMineGameData();
                this.mineShoupaiGroup.unLockAll();
                if (mineData.isBaoTing) {
                    this.mineShoupaiGroup.playerTing();
                }
            }
        };
        GYZJGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.backBtn:
                            if (this.restartBtn.visible) {
                                this.allowBack = true;
                            }
                            this.backBtnTouch();
                            break;
                        case this.lsBtn:
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.lsBtnTouch();
                            break;
                        case this.chatBtn:
                            // this.testPeng();
                            // //  syncGold
                            // return;
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.huTipsBar) {
                                this.huTipsBar.hideBar();
                            }
                            this.chatBtnTouch();
                            break;
                        case this.tipBtn:
                            if (this.recordBar) {
                                this.recordBar.hide();
                            }
                            if (this.ctBar) {
                                this.ctBar.hideBar();
                            }
                            this.tipsBtnTouch();
                            break;
                        case this.recordBar:
                            break;
                        case this.ctBar:
                            break;
                        case this.qxtgBtn:
                            this.cacelTuoguan();
                            break;
                        case this.gnBtn://点击功能按钮
                            this.gnBtn.visible = false;
                            this.gnGroup.visible = true;
                            this.touchGroup.addChild(this.gnGroup);
                            break;
                        case this.btn_shou://收起展开的功能组
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            break;
                        case this.btn_set://设置按钮，控制音乐音效的
                            this.settingBtnTouch();
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            break;
                        case this.btn_help://帮助按钮
                            this.helpBtnTouch();
                            //CF.sN(PanelNotify.OPEN_HELP);
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            break;
                        case this.touchGroup:
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
                            break;
                        case this.restartBtn:
                            this.restartBtnTouch();
                            break;
                        case this.gmBtn:
                            this.showMajiangTest();
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        GYZJGameScene.prototype.settingBtnTouch = function () {
            CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "majiang" });
        };
        GYZJGameScene.prototype.chupaiReq = function (touchShoupai) {
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
        //提牌，换三张，打牌的效果。
        GYZJGameScene.prototype.shoupaiTouchOn = function (e) {
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
            else if (this.maxTouchShoupai == 3) {
                //换三张
                if (touchShoupai.selected) {
                    touchShoupai.selectTouch();
                    game.Utils.removeArrayItem(this.hszShoupaiArr, touchShoupai);
                }
                else {
                    //判断花色
                    if (this.hszShoupaiArr.length < 3) {
                        if (this.hszShoupaiArr.length == 0) {
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        }
                        else if (this.hszShoupaiArr.length > 0) {
                            var shoupai = this.hszShoupaiArr[0];
                            if (majiang.MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
                                touchShoupai.selectTouch();
                                this.hszShoupaiArr.push(touchShoupai);
                            }
                            else {
                                for (var i = 0; i < this.hszShoupaiArr.length; i++) {
                                    this.hszShoupaiArr[i].selectTouch();
                                }
                                this.hszShoupaiArr = [];
                                touchShoupai.selectTouch();
                                this.hszShoupaiArr.push(touchShoupai);
                            }
                        }
                    }
                    else if (this.hszShoupaiArr.length == 3) {
                        var shoupai = this.hszShoupaiArr[0];
                        if (majiang.MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
                            this.hszShoupaiArr[0].selectTouch();
                            game.Utils.removeArrayItem(this.hszShoupaiArr, this.hszShoupaiArr[0]);
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        }
                        else {
                            for (var i = 0; i < this.hszShoupaiArr.length; i++) {
                                this.hszShoupaiArr[i].selectTouch();
                            }
                            this.hszShoupaiArr = [];
                            touchShoupai.selectTouch();
                            this.hszShoupaiArr.push(touchShoupai);
                        }
                    }
                }
                CF.dP(ENo.HSZ_SELECT_NUM, this.hszShoupaiArr.length);
            }
        };
        /**
         * 接收服务器换三张结束 开始走非定缺
         * @param  {egret.TouchEvent} e
         */
        GYZJGameScene.prototype.roomHszFinishiedPush = function (e) {
            this.otherChose.visible = false;
            Global.gameProxy.getMineGameData().selectColorTip = Number(e.data.selectColorTip);
            // this.checkDQStatus();
        };
        GYZJGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_roomStatusChange, this.roomStatusChange, this);
            CF.aE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.aE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.aE(ServerNotify.s_playerSelectHSZ, this.playerSelectHSZPush, this);
            CF.aE(ServerNotify.s_HSZCardExchanged, this.hSZCardExchangedPush, this);
            CF.aE(ServerNotify.s_roomHSZFinished, this.roomHszFinishiedPush, this);
            CF.aE(ServerNotify.s_playerSelectColor, this.playerSelectColorPush, this);
            CF.aE(ServerNotify.s_playerColorSelected, this.playerColorSelected, this);
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
            CF.aE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.aE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.aE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.aE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.aE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.aE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            CF.aE(ENo.GYZJ_ONCLICKJIXU, this.onClickJiXu, this);
        };
        GYZJGameScene.prototype.tuoguanStatusPush = function (e) {
            var resp = e.data;
            this.clearTingStatus();
            this.tgGroup.visible = resp.isTrustee;
            var playerData = Global.gameProxy.getMineGameData();
            playerData["isTrustee"] = resp.isTrustee;
        };
        GYZJGameScene.prototype.onClickJiXu = function () {
            this.fanPai.visible = false;
            this.jiPaiNumGroup.visible = false;
            CF.sN(this.GAME_OVER_NOTIFY, this.overSceneData);
        };
        /**
  * 玩家task推送
  * @param  {egret.Event} e
  */
        GYZJGameScene.prototype.hangupTaskPush = function (e) {
            var resp = e.data;
            var mine = Global.gameProxy.getMineGameData();
            mine.hidePass = resp.hidePass;
            mine.hangupTasks = resp.task;
            mine.taskIndex = resp.taskIndex;
            this.clearTingStatus();
            Global.gameProxy.roomInfo.hangupTaskSource = {};
            this.checkTask();
            //贵阳捉鸡修改
            var mineData = Global.gameProxy.getMineGameData();
            //  if (!mineData.isBaoTing && !mineData.isTrustee) this.checkHuTips();
        };
        GYZJGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.GYZJ_ONCLICKJIXU, this.onClickJiXu, this);
            CF.rE(ServerNotify.s_countdown, this.countDownPush, this);
            CF.rE(ENo.SHOUPAI_TOUCH, this.shoupaiTouchOn, this);
            CF.rE(ServerNotify.s_playerSelectHSZ, this.playerSelectHSZPush, this);
            CF.rE(ServerNotify.s_HSZCardExchanged, this.hSZCardExchangedPush, this);
            CF.rE(ServerNotify.s_roomHSZFinished, this.roomHszFinishiedPush, this);
            CF.rE(ServerNotify.s_playerSelectColor, this.playerSelectColorPush, this);
            CF.rE(ServerNotify.s_playerColorSelected, this.playerColorSelected, this);
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
            CF.rE(SceneNotify.CLOSE_MJ_JIESSUAN, this.closeMJCall, this);
            CF.rE(ServerNotify.s_playerBaoTing, this.playerBaoTingPush, this);
            CF.rE(ServerNotify.s_tings, this.tingInfoPush, this);
            CF.rE(ServerNotify.s_passTask, this.passTaskPush, this);
            CF.rE(ServerNotify.s_playerTingCards, this.s_playerTingCards, this);
            CF.rE(ENo.TING_FLUSH, this.s_playerTingCards, this);
            this.timeDirectionBar.removeTimer();
            this.timeDirectionBar.removeAllTween();
        };
        GYZJGameScene.prototype.playerBaoTing = function (tasks) {
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
        /**监听房间状态的变化 当玩家是飘的时候限制玩家打牌 除了传来的索引号 其他玩家都摸啥打啥*/
        GYZJGameScene.prototype.roomStatusChange = function (e) {
            var _this = this;
            //**当前飘的玩家索引号*/;
            var _resp = e.data;
            var _index = _resp.eventData.playerIndex;
            var direction = this.directions[_index];
            switch (_resp.eventData.chickType) {
                case 1:
                    LogUtils.logD("====================冲锋鸡=========================");
                    this.setAutoTimeout(function () {
                        _this.playChickenDB("gyzj_cfj", direction, 1);
                    }, this, 1000);
                    // this.setAutoTimeout(() => {
                    //     this[direction + "ChickenSign"].setCFChickenVis(true);
                    // }, this, 2000);
                    break;
                case 2:
                    this.setAutoTimeout(function () {
                        _this.playChickenDB("gyzj_zrj", direction, 2);
                    }, this, 1000);
                    LogUtils.logD("====================责任鸡=========================");
                    // this.showDriftTips(_resp.eventData)
                    break;
                case 3:
                    LogUtils.logD("====================包鸡=========================");
                    break;
                case 4:
                    LogUtils.logD("====================捉鸡=========================");
                    break;
                case 5:
                    LogUtils.logD("====================幺鸡=========================");
                    break;
                case 6:
                    LogUtils.logD("====================八筒=========================");
                    break;
                default:
                    break;
            }
        };
        GYZJGameScene.prototype.closeMJCall = function () {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        };
        /**
         * 有玩家确定换三张的推送
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.playerSelectHSZPush = function (e) {
            var resp = e.data;
            var players = [];
            var mineIndex = Global.gameProxy.getMineIndex();
            if (game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                Global.gameProxy.getMineGameData().selectedHSZCards = resp.cards;
            }
            if (!game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                players.push[resp.playerIndex];
            }
            if (players.length < 3 && game.Utils.valueEqual(mineIndex, resp.playerIndex)) {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
            this.showHszAni(resp.playerIndex);
        };
        /**
         * 换三张结果推送
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.hSZCardExchangedPush = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var resp, i, type, player, hszArr, cards;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resp = e.data;
                            if (this.hszBar) {
                                this.hszBar.visible = false;
                            }
                            this.otherChose.visible = false;
                            for (i = 0; i < this.hszShoupaiArr.length; i++) {
                                this.hszShoupaiArr[i].change2NoSelect();
                            }
                            Global.gameProxy.roomInfo.countdown = null;
                            type = resp.type;
                            player = Global.gameProxy.getMineGameData();
                            hszArr = player.selectedHSZCards;
                            //删掉玩家手牌
                            return [4 /*yield*/, Global.gameProxy.req2updateRoom()];
                        case 1:
                            //删掉玩家手牌
                            _a.sent();
                            cards = resp.cards;
                            this.hszCards = cards;
                            this.showHSZSucTip(type);
                            return [2 /*return*/];
                    }
                });
            });
        };
        GYZJGameScene.prototype.showHSZSucTip = function (type) {
            this.hszTipBar = new majiang.HSZTipBar(type);
            this.touchGroup.addChild(this.hszTipBar);
            this.hszTipBar.horizontalCenter = 0;
            this.hszTipBar.verticalCenter = -42;
            this.setAutoTimeout(this.hszOver, this, 1500);
        };
        /**
         * 发送换三张的请求
         */
        GYZJGameScene.prototype.sendHSZReq = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cardValue, reqData, resp, playerData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.hszShoupaiArr.length != 3) {
                                return [2 /*return*/];
                            }
                            cardValue = [];
                            this.hszShoupaiArr.forEach(function (shoupai) {
                                shoupai.selectTouch();
                                cardValue.push(shoupai.value);
                            });
                            this.maxTouchShoupai = 0;
                            reqData = { cards: cardValue };
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_mjHandler_c_selectHSZ, reqData)];
                        case 1:
                            resp = _a.sent();
                            //返回扣牌成功
                            if (resp.error.code == 0) {
                                this.hszBar.visible = false;
                                playerData = Global.gameProxy.getMineGameData();
                                playerData.selectedHSZCards = cardValue;
                                this.mineShoupaiGroup.hideRight3pais();
                            }
                            else {
                                this.maxTouchShoupai = 3;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 换三张完毕过后加入手牌
         */
        GYZJGameScene.prototype.hszJoinpai = function () {
            var _this = this;
            game.UIUtils.removeSelf(this.hszBar);
            this.hszBar = null;
            // let values = [13, 22, 23];
            var myCarsArr = Global.gameProxy.getMineShuopaiArr();
            this.mineShoupaiGroup.sortShoupaiByValue(myCarsArr, false);
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[0]).showDownAni();
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[1]).showDownAni();
            this.mineShoupaiGroup.findMajiangByValue(this.hszCards[2]).showDownAni();
            this.hszCards = null;
            this.topShoupaiGroup.showAllShoupai();
            this.leftShoupaiGroup.showAllShoupai();
            this.rightShoupaiGroup.showAllShoupai();
            //200毫秒后
            this.setAutoTimeout(function () {
                _this.checkDQStatus();
            }, this, 1000);
        };
        /**
         * 换三张结束
         */
        GYZJGameScene.prototype.hszOver = function () {
            this.hszShoupaiArr = [];
            game.UIUtils.removeSelf(this.hszTipBar);
            this.hszTipBar = null;
            this.leftHsz.visible = false;
            this.rightHsz.visible = false;
            this.mineHsz.visible = false;
            this.topHsz.visible = false;
            this.hszJoinpai();
        };
        GYZJGameScene.prototype.showDingQue = function () {
            if (this.mjDqBar) {
                return;
            }
            this.mjDqBar = new majiang.MajiangDQBar(this);
            this.touchGroup.addChild(this.mjDqBar);
            this.mjDqBar.horizontalCenter = 0;
            this.mjDqBar.bottom = 140;
        };
        /**
         * 选择定缺
         * @param  {number} type
         */
        GYZJGameScene.prototype.chooseDQ = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var route, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_selectColor;
                            this.mjDqBar.visible = false;
                            Global.gameProxy.getMineGameData().selectColor = type;
                            return [4 /*yield*/, Global.pomelo.request(route, { color: type })];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 判断定缺
         */
        GYZJGameScene.prototype.checkDQStatus = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var step = roomInfo.steps;
            if (roomInfo.selectColorStatus == 0 && step.indexOf(1) > -1) {
                this.hideHszUI();
                this.majiangStatus = MajiangStatusEnum.QINGQUE;
                var players = roomInfo.players;
                //2018-8-22,缺牌显示选择UI
                for (var key in players) {
                    var player = players[key];
                    //如果长度为0 则展现没有换三张的状态
                    if (player.selectColor == -1) {
                        this.showNoSelectDqUI(parseInt(key));
                    }
                    else {
                        this.showSelectedDqUI(parseInt(key));
                    }
                }
            }
            else {
                //不需要定缺
                this.removeDQUI();
                this.removeHszUI();
                var direction = this.directions[roomInfo.curPlay];
                this.timeDirectionBar.showLightByDirection(direction);
                this.showHeaderTips(roomInfo);
                this.checkOutPutByDirection();
                //这里判断如果手牌=14 则把最后一张牌给change出去
                var playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
                this.maxTouchShoupai = 1;
                this.showShoupai(direction);
                this.checkTask();
                this.checkHuTips();
                this.checkShowTips();
                // this.checkMineShoupaiHu
            }
            //如果不走定缺,就开始走座位算
        };
        /**
         * 在重新连接上来过后或者才发完手牌之后改变最后一张为摸牌
         * @param  {} direction
         */
        GYZJGameScene.prototype.showShoupai = function (direction) {
            this[direction + "ShoupaiGroup"].changeLast2Mopai();
        };
        /**
         * 定缺完毕
         */
        GYZJGameScene.prototype.dingqueOver = function (player) {
            this.removeHszUI();
            game.UIUtils.removeSelf(this.mjDqBar);
            //重新排序手牌
            // this.mineShoupaiGroup.sortMineShoupai();
            var cards = Global.gameProxy.getMineShuopaiArr();
            this.mineShoupaiGroup.sortShoupaiByValue(cards, false);
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            var direction = this.directions[roomInfo.curPlay];
            var playerData = Global.gameProxy.getPlayerByIndex(roomInfo.curPlay);
            if (Global.gameProxy.checkIndexIsMe(roomInfo.dealer)) {
                playerData.lastCard = cards[0];
            }
            //只是显示动画
            this.maxTouchShoupai = 1;
            this.showShoupai(direction);
            //定缺动画
            for (var i in player) {
                var name_1 = i + "_DqImage";
                var image = GameCacheManager.instance.getCache(name_1, eui.Image);
                image.width = image.height = 100;
                switch (this.directions[i]) {
                    case "left":
                        image.x = GameConfig.curWidth() / 2 - 190; //这里是获取中间计时器的坐标。计时器不偏离，这个就不得偏离。
                        image.y = GameConfig.curHeight() / 2 - 100;
                        break;
                    case "right":
                        image.x = GameConfig.curWidth() / 2 + 110;
                        image.y = GameConfig.curHeight() / 2 - 100;
                        break;
                    case "top":
                        image.x = GameConfig.curWidth() / 2 - 40;
                        image.y = GameConfig.curHeight() / 2 - 215;
                        break;
                    case "mine":
                        image.x = GameConfig.curWidth() / 2 - 40;
                        image.y = GameConfig.curHeight() / 2 + 25;
                        break;
                }
                this.dqtubiao(player[i], image);
                this.effectGroup.addChild(image);
                this.dqDonghua(i, player[i], image);
            }
            if (Global.gameProxy.roomInfo)
                this.checkTask();
            this.checkHuTips();
            this.checkShowTips();
            // this.checkOutPutByDirection(false);
        };
        /**
         * 定缺动画
         */
        GYZJGameScene.prototype.dqDonghua = function (i, pi, img) {
            var _this = this;
            var tw = egret.Tween.get(img);
            tw.to({ scaleX: 1, scaleY: 1 }, 300).to({}, 300).to({ x: this.getHeaderByDirection(i).x + 133.5, y: this.getHeaderByDirection(i).y - 19, scaleX: 0.35, scaleY: 0.35 }, 500).call(function () {
                // img.visible = false;
                game.UIUtils.removeSelf(img);
                _this.getHeaderByDirection(i).showColor(pi);
            }); //这里是获得头像的坐标。
        };
        /**
         * 定缺图标赋值
         */
        GYZJGameScene.prototype.dqtubiao = function (nums, img) {
            if (nums == 1) {
                img.source = "dq_color_1_png";
            }
            if (nums == 2) {
                img.source = "dq_color_2_png";
            }
            if (nums == 3) {
                img.source = "dq_color_3_png";
            }
        };
        /**
         * 哪一方玩家定缺完成
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.playerSelectColorPush = function (e) {
            var resp = e.data;
            var players = [];
            var mineIndex = Global.gameProxy.getMineIndex();
            var direction = this.directions[resp.playerIndex];
            if (direction != "mine") {
                players.push[resp.playerIndex];
                var image = this[direction + "NoHsz"];
                image.visible = false;
            }
            if (players.length < 3 && direction == "mine") {
                if (!Global.runBack) {
                    this.otherChose.visible = true;
                }
            }
        };
        /**
         * "players":{"1":3,"2":2}
         * 全部定缺完成
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.playerColorSelected = function (e) {
            this.otherChose.visible = false;
            this.removeDQUI();
            this.otherChose.visible = false;
            var resp = e.data;
            var players = resp.players;
            for (var key in players) {
                var playerData = Global.gameProxy.getPlayerByIndex(key);
                playerData.selectColor = players[key];
                this.getHeaderByDirection(key);
            }
            //差一个动画
            this.dingqueOver(players);
        };
        /**
         * 玩家出牌推送
         * {"playerIndex":1,"card":28}
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.playCardPush = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var card = resp.card;
            this.clearCountDown();
            this.clearTingStatus();
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            playerData.lastCard = 0;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            if (direction == "mine") {
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
                //this.checkMineShoupaiHu()
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            }
            else {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, card); //playMJPTHSound//playCardSound
            //  CF.dP(ENo.FIND_GYZJ_JIPAICOLOR, { "gyzj": [18, 21] });
        };
        GYZJGameScene.prototype.clearTouchOn = function () {
            if (this.touchShoupai) {
                this.touchShoupai.change2NoSelect();
                this.touchShoupai = null;
                // this.hideBars();
                CF.dP(ENo.FIND_COLOR, 0);
            }
        };
        GYZJGameScene.prototype.playerIsHu = function (playerIndex) {
            var data = Global.gameProxy.getPlayerByIndex(playerIndex);
            return data.huCards.length > 0;
        };
        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        GYZJGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang.MineShoupai);
            tempChupai.resetValue(value);
            // let tempChupai = new MineShoupai(value);
            this.effectGroup.addChild(tempChupai);
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
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
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    }
                    else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    }
                    else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    }
                    else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni(playerData.isBaoTing);
                    }
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
         * 检查task状态`
         */
        GYZJGameScene.prototype.checkTask = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var startX = roomInfo.curPlay;
            var direction = this.directions[startX];
            //如果房间中是有任务状态
            if (roomInfo.hangupTaskSource) {
                var mine = Global.gameProxy.getMineGameData();
                this.taskBar.showBtnsByData(mine);
                this.touchGroup.addChild(this.taskBar);
                // this.lockChupai = false;
            }
        };
        /**
         * 玩家杠牌
         * {"playerIndex":1,"from":2,"card":12}
         * @param  {egret.Event} e
         */
        GYZJGameScene.prototype.playerGangCard = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var from = resp.from;
            var direction = this.directions[playerIndex];
            this.clearCountDown();
            this.clearTingStatus();
            var group = this[direction + "ShoupaiGroup"];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            //记录玩家杠牌
            Global.gameProxy.recordPlayerGang(resp);
            if (direction == "mine") {
                Global.gameProxy.clearLastPai();
                this.mineShoupaiGroup.changePaiToVisible(false);
                this.hideBars();
                this.touchShoupaiClear();
                if (playerData.huCards.length > 0) {
                    this.flushTingCards();
                }
            }
            this.addEffectAni(direction, "gang");
            this.hideChupaiTips();
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                this.mineShoupaiGroup.removeShoupaiByGang(resp.card);
                this[direction + 'ShoupaiGroup'].hideMopai();
            }
            switch (resp.gang) {
                case 1://碰变杠,吊4个正面，巴雨
                    //    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    //   this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    //    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    // group.removeLastPai();
                    //手上四张暗杠
                    break;
                case 3://点杠
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    //  majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
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
            // this.checkTask();
        };
        GYZJGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playMJPTHSound(playerData.sex, "peng");
        };
        /**
              * 摸牌推送
              * {"playerIndex":2,"card":24,"remain":80,existHangup:}
              * @param  {egret.Event} e
              */
        GYZJGameScene.prototype.newCardPush = function (e) {
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
        GYZJGameScene.prototype.newCard = function (resp) {
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
        GYZJGameScene.prototype.hupaiPush = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, playerIndex, card, from, mainCard, mineData, huPlayerData, direction, fireChickPlayer, lastDirection, time;
                return __generator(this, function (_a) {
                    resp = e.data;
                    this.clearCountDown();
                    this.clearTingStatus();
                    playerIndex = resp.playerIndex;
                    card = resp.card;
                    from = resp.from;
                    mainCard = resp.mainCard;
                    mineData = Global.gameProxy.getMineGameData();
                    Global.gameProxy.addHuTasks(resp);
                    huPlayerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                    huPlayerData.huCards.push(card);
                    direction = this.directions[playerIndex];
                    fireChickPlayer = resp.fireChickPlayer;
                    if (fireChickPlayer > 0) {
                        this.showShaoJi(fireChickPlayer);
                    }
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
                        this.setAutoTimeout(function () {
                            _this.addXZDDHuTip(from, playerIndex, true);
                        }, this, 2000);
                        this[direction + "HupaiGroup"].addHu(resp, 2);
                        majiang.MajiangUtils.playMJPTHSound(huPlayerData.sex, "zimo");
                        // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 4);
                    }
                    else {
                        lastDirection = this.directions[from];
                        this.addEffectAni(direction, "hu");
                        this.setAutoTimeout(function () {
                            _this.addXZDDHuTip(from, playerIndex, true);
                        }, this, 2000);
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
                        // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 5);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 显示血战到底胡牌的提示
         */
        GYZJGameScene.prototype.addXZDDHuTip = function (from, playerIndex, ani) {
            if (ani === void 0) { ani = false; }
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.gameId != MajiangConfig.MJXZDD) {
                return;
            }
            if (playerIndex == Global.gameProxy.getMineIndex()) {
                this.checkShowrestartBtn();
                this.tgGroup.visible = false;
                return;
            }
            var name = "player_zimo_png";
            if (from != playerIndex) {
                name = "player_hu_png";
            }
            var direction = this.directions[playerIndex];
            var image = new eui.Image(name);
            image.scaleX = image.scaleY = 1.5;
            this.effectGroup.addChild(image);
            switch (direction) {
                case "mine":
                    image.horizontalCenter = 0;
                    image.bottom = 148;
                    this.checkShowrestartBtn();
                    this.tgGroup.visible = false;
                    break;
                case "left":
                    image.left = 220;
                    image.verticalCenter = -80;
                    break;
                case "right":
                    image.right = 220;
                    image.verticalCenter = -80;
                    break;
                case "top":
                    image.horizontalCenter = 0;
                    image.top = 80;
                    break;
            }
            if (ani) {
                image.alpha = 0;
                egret.Tween.get(image).to({
                    alpha: 1
                }, 200);
            }
        };
        /**
        * 刮风下雨
        * @param  {} direction
        * @param  {} effectName
        */
        GYZJGameScene.prototype.addGangAni = function (effectName, offerX, offerY, scale) {
            var _this = this;
            if (scale === void 0) { scale = 1; }
            GameCacheManager.instance.getMcCache(effectName, effectName, function (mv) {
                if (mv) {
                    var mcCallback_1 = function () {
                        mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                        game.UIUtils.removeSelf(mv);
                    };
                    mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                    _this.effectGroup.addChild(mv);
                    // game.UIUtils.setAnchorPot(mv);
                    mv.x = offerX;
                    mv.y = offerY;
                    mv.scaleX = mv.scaleY = scale;
                    mv.play(1);
                }
            });
        };
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        GYZJGameScene.prototype.createHJZYByDirection = function (direction, value) {
            var name = direction + "_hjzy";
            var hjzyTip = GameCacheManager.instance.getCache(name, majiang.HjzyTip);
            hjzyTip.showText(value);
            switch (direction) {
                case "mine":
                    hjzyTip.horizontalCenter = -15;
                    hjzyTip.bottom = 130;
                    break;
                case "left":
                    hjzyTip.left = 180;
                    hjzyTip.verticalCenter = -44;
                    break;
                case "right":
                    hjzyTip.right = 180;
                    hjzyTip.verticalCenter = -44;
                    break;
                case "top":
                    hjzyTip.horizontalCenter = -15;
                    hjzyTip.top = 100;
                    break;
            }
            this.effectGroup.addChild(hjzyTip);
            hjzyTip.showAni();
        };
        /**
         * 对局结束
         */
        GYZJGameScene.prototype.showDuijuAni = function (callback) {
            var name = "duijujieshu";
            var image = GameCacheManager.instance.getCache(name, eui.Image);
            image.source = RES.getRes("duijujieshu_png");
            LogUtils.logD("=======对局结束==============" + image.source);
            image.horizontalCenter = -30;
            image.verticalCenter = -50;
            this.addChild(image);
            image.alpha = 0;
            // image.alpha=1;
            image.x = image.x - 120;
            egret.Tween.get(image)
                .to({ horizontalCenter: -30, alpha: 0 })
                .to({ horizontalCenter: 30, alpha: 1 }, 1000)
                .to({ alpha: 0 }, 500);
            this.setAutoTimeout(function () {
                callback();
            }, this, 2500);
        };
        /**
         * 游戏数据结算信息。
         */
        GYZJGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players, chichenCards;
                return __generator(this, function (_a) {
                    this.overSceneData = null;
                    this.restartBtn.visible = false;
                    this.majiangStatus = MajiangStatusEnum.OVER;
                    this.gameTipsGroup.visible = this.gameTipsGroup2.visible = false;
                    this.timeDirectionBar.removeTimer();
                    this.timeDirectionBar.removeAllTween();
                    this.taskBar.hideAllBtns();
                    Global.gameProxy.roomInfo.curPlay = 0;
                    this.showHeaderTips(Global.gameProxy.roomInfo);
                    this.tgGroup.visible = false;
                    resp = e.data;
                    //testBug2
                    //  resp = this.testBug1;
                    this.overSceneData = resp;
                    LogUtils.logDJ("THIS IS  贵阳捉鸡结算界面 结算有问题 请复制这一段数据给我 不要截图  不要截图==================" + JSON.stringify(resp));
                    players = resp.players;
                    this.tgGroup.visible = false; //解决牌局结束，托管不消失。
                    this.gameOverShow(players);
                    chichenCards = resp.chickCards;
                    CF.dP(ENo.FIND_GYZJ_JIPAICOLOR, { "gyzj": chichenCards });
                    this.showDuijuAni(function () {
                        //this.checkChajiao(resp.players);
                        var catchChickCard = resp.catchChickCard;
                        var jiesuanDelayShow = 8000;
                        var mineData = Global.gameProxy.getMineGameData();
                        var mineIndex = Global.gameProxy.getMineIndex();
                        var showFanAni = true;
                        if (resp.winPlayer.length <= 0 && players[mineIndex].bills.length <= 0) {
                            showFanAni = false;
                        }
                        if (showFanAni) {
                            if (catchChickCard) {
                                jiesuanDelayShow += 1400;
                                _this.setAutoTimeout(function () {
                                    _this.fanPaiAni(catchChickCard, players, resp.winPlayer);
                                }, _this, 1400);
                            }
                            else {
                                _this.setAutoTimeout(function () {
                                    _this.jiPaiNumGroup.visible = true;
                                    for (var key in players) {
                                        var direction = _this.directions[key];
                                        var playerData = players[key];
                                        var chickCardInfo = playerData["chickCardInfo"];
                                        var isTing = playerData["isTing"];
                                        if (key == resp.winPlayer) {
                                            _this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, true);
                                        }
                                        else {
                                            _this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, false);
                                        }
                                    }
                                }, _this, 3000);
                                jiesuanDelayShow = 4000;
                            }
                        }
                        //修改所有玩家金币至抽水过后的金币
                        for (var index in players) {
                            var goldData = players[index];
                            var header = _this.getHeaderByDirection(index);
                            goldData.ownGold = goldData.ownGold;
                            header.updateGold(goldData.ownGold);
                        }
                        Global.playerProxy.updatePlayerGold(mineData.gold);
                        if (resp.winPlayer.length <= 0 && players[mineIndex].bills.length <= 0) {
                            _this.showHuangZhuang(function () {
                                _this.restartBtn.visible = true;
                                _this.restartBtn.alpha = 0;
                                egret.Tween.get(_this.restartBtn).to({
                                    alpha: 1
                                }, 300);
                            });
                            return;
                        }
                        if (resp.remainNum >= 0)
                            return;
                        _this.setAutoTimeout(function () {
                            _this.fanPai.visible = false;
                            _this.jiPaiNumGroup.visible = false;
                            CF.sN(_this.GAME_OVER_NOTIFY, _this.overSceneData);
                        }, _this, jiesuanDelayShow);
                    });
                    return [2 /*return*/];
                });
            });
        };
        GYZJGameScene.prototype.showHuangZhuang = function (callback) {
            var image = new eui.Image(RES.getRes("gyzjmj_game_liuju_png"));
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
        /**翻牌动画*/
        GYZJGameScene.prototype.fanPaiAni = function (catchChickCard, players, winPlayer) {
            var _this = this;
            this.paiQiang.removeNumByIndex();
            this.updateSypai();
            this.fanpaiGroup.visible = true;
            this.fanPai.visible = true;
            this.fanPai.alpha = 1;
            // this.fanPai.anchorOffsetX = this.fanPai.width / 2;
            // this.fanPai.anchorOffsetY = this.fanPai.height / 2;
            var fanCard = Number(catchChickCard["fanCard"]);
            var chickCard = Number(catchChickCard["chickCard"]);
            this.fanPai.fanPaiDB(fanCard, chickCard);
            var direction;
            var playerData;
            //代表是否下叫
            var isTing;
            var chickCardInfo;
            this.setAutoTimeout(function () {
                egret.Tween.get(_this.fanpaiGroup).to({ alpha: 0 }, 800).call(function () {
                    _this.jiPaiNumGroup.visible = true;
                    for (var key in players) {
                        direction = _this.directions[key];
                        playerData = players[key];
                        chickCardInfo = playerData["chickCardInfo"];
                        isTing = playerData["isTing"];
                        if (key == winPlayer) {
                            _this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, true);
                        }
                        else {
                            _this.jiPaiNumGroup.createJiPai(chickCardInfo, direction, isTing, false);
                        }
                    }
                }, _this);
                // }, this, 300);
            }, this, 1500);
        };
        GYZJGameScene.prototype.showShaoJi = function (playerIndex) {
            var directionStr = this.directions[playerIndex];
            var image = new eui.Image(RES.getRes("gyzj_over_shaoji1_png"));
            image.scaleX = 0.4;
            image.scaleY = 0.4;
            var _id = Global.gameProxy.roomInfo.gameId;
            image.alpha = 0;
            game.UIUtils.resetAnchorPoint(image);
            this.effectGroup.addChild(image);
            game.UIUtils.setAnchorPot(image);
            switch (directionStr) {
                case "mine":
                    image.x = GameConfig.curWidth() * 0.5;
                    image.y = GameConfig.curHeight() * 0.7;
                    break;
                case "left":
                    image.x = GameConfig.curWidth() * 0.24;
                    image.y = GameConfig.curHeight() * 0.4;
                    break;
                case "right":
                    image.x = GameConfig.curWidth() * 0.72;
                    image.y = GameConfig.curHeight() * 0.4;
                    break;
                case "top":
                    image.x = GameConfig.curWidth() * 0.5;
                    image.y = GameConfig.curHeight() * 0.2;
                    break;
            }
            egret.Tween.get(image).to({ alpha: 1, x: image.x + 50 }, 300).wait(1000).call(function () {
                game.UIUtils.removeSelf(image);
            }, this);
        };
        /**
         * 查大叫
         * type 3 : 5 一组
         * @param  {} records
         */
        GYZJGameScene.prototype.checkChajiao = function (players) {
            //   let chajiaoArr = records[3] || {};
            var roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var data = {};
            for (var key in players) {
                var bills = players[key].bills;
                for (var i = 0; i < bills.length; ++i) {
                    var bill = bills[i];
                    var type = bill.type;
                    if (type == 3) {
                        data[key] = { score: bill.info.score, type: "gyzj_3" }; //4
                    }
                }
            }
            for (var key in data) {
                this.showScoreAni(key, data[key]);
            }
        };
        /**
         * 退税
         * @param  {} records
         */
        GYZJGameScene.prototype.checkTuishui = function (records, callback) {
            var tuishuiArr = records[5] || {};
            var roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var data = {};
            for (var playerIndex in tuishuiArr) {
                var goldData = tuishuiArr[playerIndex];
                var playerData = roomInfo.players[playerIndex];
                goldData.gainGold = goldData.gainGold;
                playerData.gold += goldData.gainGold;
                data[playerIndex] = { score: goldData.gainGold, type: 5 };
            }
            var time = 0;
            for (var key in data) {
                time = 3000;
                if (data[key].score != 0) {
                    this.showScoreAni(key, data[key]);
                }
            }
            this.setAutoTimeout(callback, this, time);
        };
        GYZJGameScene.prototype.getTingArr = function (tings, value) {
            for (var i = 0; i < tings.length; i++) {
                var ting = tings[i];
                if (ting.out == value) {
                    return ting.tings;
                }
            }
            return [];
        };
        /**
         * 听牌提示
         */
        // public tipsBtnTouch() {
        //     if (!this.huTipsBar) {
        //         this.huTipsBar = new HuTipsBar();
        //         this.panelGroup.addChild(this.huTipsBar);
        //     }
        //     if (this.huTipsBar.visible) {
        //         this.huTipsBar.hideBar();
        //         return;
        //     }
        //     let mineData = Global.gameProxy.getMineGameData();
        //     let cards = _.clone(mineData.cards);
        //     if (mineData.lastCard) {
        //         MajiangUtils.updateCardsNum(cards, mineData.lastCard, -1);
        //     }
        //     let huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
        //     this.lastHuTips = huCards;
        //     this.showhupaiBar();
        // }
        /**
     * 听牌提示
     */
        GYZJGameScene.prototype.tipsBtnTouch = function () {
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
        GYZJGameScene.prototype.getGangArr = function (gangJson) {
            var gangArr = [];
            for (var i = 0; i < gangJson.length; i++) {
                gangArr.push(gangJson[i].card);
            }
            return gangArr;
        };
        /**
         * 杠牌之后如果胡牌了 刷新一次
         */
        GYZJGameScene.prototype.flushTingCards = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = this.mineShoupaiGroup.getShoupaiArr();
            var huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCards;
        };
        /**
         * 刷新胡牌提示
         */
        GYZJGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang.HuTipsScrollerBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        GYZJGameScene.prototype.showhupaiBar = function () {
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
        GYZJGameScene.prototype.updateTingByValue = function (value) {
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
        // protected showHuTips() {
        //     let mineShoupai = this.touchShoupai;
        //     if (Global.gameProxy.getMineGameData().huCards.length > 0) {
        //         return;
        //     }
        //     let value = mineShoupai.value;
        //     let mineCard = _.clone(Global.gameProxy.getMineGameData().cards);
        //     if (mineCard[value] > 1) {
        //         mineCard[value] -= 1;
        //     } else {
        //         delete mineCard[value];
        //     }
        //     let mineData = Global.gameProxy.getMineGameData();
        //     // if()
        //     let huCard = window['TingCardTip'].getTings(mineCard, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
        //     this.lastHuTips = huCard;
        //     this.tipsBarFlush();
        // }
        /**
            * 展现胡牌
            */
        GYZJGameScene.prototype.showHuTips = function () {
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
        /**
             * 检测胡牌提示
             */
        GYZJGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
            // if (Global.gameProxy.checkIsRoundMe()) {
            var tings = mineData.outCardTingCards;
            //  LogUtils.logD("===================哪些牌下叫===============" + JSON.stringify(tings));
            if (tings) {
                for (var i = 0; i < tings.length; i++) {
                    var data = tings[i].out;
                    LogUtils.logD("============本局要胡的牌是===========" + JSON.stringify(data));
                    this.mineShoupaiGroup.showHuTipsByValue(data);
                }
                // }
            }
        };
        //-------游戏内提示
        GYZJGameScene.prototype.checkShowTips = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.curPlay != Global.gameProxy.getMineIndex()) {
                return;
            }
            //显示庄家提示
            if (roomInfo.publicCardNum == this.startNumber && roomInfo.dealer == Global.gameProxy.getMineIndex()) {
                this.showGameTipGroup(1);
            }
            else {
                if (Global.gameProxy.findHasQueColor() && !this.showQingqueTipState) {
                    this.showQingqueTipState = true;
                    this.showGameTipGroup(2);
                }
            }
        };
        GYZJGameScene.prototype.showWanfa = function () {
            this.wanfaImage.source = RES.getRes("gyzj_game_title_png");
        };
        GYZJGameScene.prototype.s_playerTingCards = function (e) {
            // this.mineShoupaiGroup.changePaiToVisible(false);
            var data = e.data;
            // LogUtils.logD("听牌===============s_playerTingCards" + JSON.stringify(data, null, '\t'));
            var playerData = Global.gameProxy.getMineGameData();
            if (data.outCardTingCards) {
                playerData.outCardTingCards = data.outCardTingCards;
                this.clearTingStatus();
                var mineData = Global.gameProxy.getMineGameData();
                if (!mineData.isBaoTing && !playerData["isTrustee"])
                    this.checkHuTips();
                // if (this.needCheckTing) {
                // this.needCheckTing = false;
                // }
            }
            if (data.tingCards) {
                playerData.outCardTingCards = null;
                playerData.tingCards = this.currentTings = data.tingCards;
                this.tipBtn.visible = playerData.tingCards.length > 0;
            }
        };
        GYZJGameScene.prototype.tingInfoPush = function (e) {
            var data = e.data;
            var playerData = Global.gameProxy.getMineGameData();
            playerData.tingCards = this.currentTings = data;
        };
        GYZJGameScene.prototype.checkPlayerHasJiao = function () {
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
        /**
       * 玩家报听推送
       */
        GYZJGameScene.prototype.playerBaoTingPush = function (e) {
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
        /**重显所有的鸡牌标识*/
        GYZJGameScene.prototype.reloadAllChickenSign = function () {
            var playerIndex;
            var chongfengVis;
            var responseVis;
            var roomInfo = Global.gameProxy.roomInfo;
            for (var key in roomInfo.players) {
                var player = roomInfo.players[key];
                var direction = this.directions[key];
                var chickCards = player["chickCards"];
                if (chickCards.duty.length > 0) {
                    for (var i = 0; i < chickCards.duty.length; ++i) {
                        this[direction + "ChickenSign"].setChickenVisble(2);
                    }
                }
                if (chickCards.assault.length > 0) {
                    for (var i = 0; i < chickCards.assault.length; ++i) {
                        this[direction + "ChickenSign"].setChickenVisble(1);
                    }
                }
            }
        };
        /**播放动画*/
        GYZJGameScene.prototype.playChickenDB = function (name, direction, type) {
            var _this = this;
            var db = new DBComponent(name);
            db.callback = function () {
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this[direction + "ChickenGroup"].addChild(db);
            db.playByFilename(1);
            this.setAutoTimeout(function () {
                _this[direction + "ChickenSign"].setChickenVisble(type);
                // if (type == 1) {
                //     this[direction + "ChickenSign"].setCFChickenVis();
                // } else if (type == 2) {
                //     this[direction + "ChickenSign"].setZRchichenVis();
                // }
            }, this, 1000);
        };
        return GYZJGameScene;
    }(majiang.BaseMajiangScene));
    majiang.GYZJGameScene = GYZJGameScene;
    __reflect(GYZJGameScene.prototype, "majiang.GYZJGameScene");
})(majiang || (majiang = {}));
