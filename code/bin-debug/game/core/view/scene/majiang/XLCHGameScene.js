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
(function (majiang_1) {
    var XLCHGameScene = (function (_super) {
        __extends(XLCHGameScene, _super);
        function XLCHGameScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "mjxlch";
            //选中的手牌
            _this.hszShoupaiArr = [];
            //是否显示过
            _this.showQingqueTipState = false;
            _this.startNumber = 108;
            /**
             * 背景音乐
             */
            _this.bgMusic = "playingingame_mp3";
            //---检查有没有可以胡牌
            _this.huCards = [];
            _this.lastHuTips = [];
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_MJXLCH;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_MJXLCH_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_MJXLCH;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_MJXLCH_MATCHING;
            /**
             * 结算界面
             */
            _this.GAME_OVER_NOTIFY = SceneNotify.OPEN_MJXLCH_OVER;
            _this.skinName = new majiang.MajiangSceneSkin();
            _this.leftHuShowGroup.removeChildren();
            _this.rightHuShowGroup.removeChildren();
            _this.topHuShowGroup.removeChildren();
            _this.mineHuShowGroup.removeChildren();
            return _this;
        }
        XLCHGameScene.prototype.updateGold = function () {
            // this['mineHeader'].updateXieGold(Global.playerProxy.playerData.gold, Global.playerProxy.playerData.curGainGold);
        };
        /**
        * 第四轮发牌，发完牌过后吧主玩家手牌顺序排序
        */
        XLCHGameScene.prototype.fapaiRound4 = function (sortDir) {
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
                    _this.setAutoTimeout(function () {
                        _this.fapaiRoundOver();
                    }, _this, 400);
                }, _this, 400);
            });
        };
        XLCHGameScene.prototype.fapaiRoundOver = function () {
            var _this = this;
            if (!Global.gameProxy.roomInfo) {
                return;
            }
            this.mineShoupaiGroup.visible = true;
            this.mineKoupaiGroup.visible = false;
            this.setAutoTimeout(function () {
                _this.checkHszStatus();
            }, this, 400);
        };
        /**
         * 这里是自动给玩家推荐三张牌的方法
         */
        XLCHGameScene.prototype.tishiSanzhang = function () {
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
        XLCHGameScene.prototype.showHSZTip = function () {
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
                this.hszBar = new majiang_1.HSZBar();
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
        XLCHGameScene.prototype.showReconnectUI = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            this.checkHszStatus(roomInfo);
            this.checkTrusteeStatus();
        };
        /**
         * 检测是否是换三张状态
         * @param  {GameRoomInfoBean} roomInfo
         */
        XLCHGameScene.prototype.checkHszStatus = function (roomInfo) {
            if (roomInfo === void 0) { roomInfo = Global.gameProxy.roomInfo; }
            //status == 0 则是换三张有完成状态
            var step = roomInfo.steps;
            this.timeDirectionBar.startTime(this);
            if (roomInfo.hszStatus == 0 && step.indexOf(0) > -1) {
                this.majiangStatus = MajiangStatusEnum.HSZ;
                var players = roomInfo.players;
                for (var key in players) {
                    var player = players[key];
                    //如果长度为0 则展现没有换三张的状态
                    if (player.selectedHSZCards.length == 0) {
                        this.showNoSelectHszUI(parseInt(key));
                    }
                    else {
                        this.showSelectedHszUI(parseInt(key));
                    }
                }
            }
            else {
                this.checkDQStatus();
            }
        };
        /**
         * 移除和换三张有关的UI
         */
        XLCHGameScene.prototype.removeHszUI = function () {
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
        XLCHGameScene.prototype.hideHszUI = function () {
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
        XLCHGameScene.prototype.removeDQUI = function () {
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
        XLCHGameScene.prototype.showNoSelectHszUI = function (index) {
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
        XLCHGameScene.prototype.showNoSelectDqUI = function (index) {
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
        XLCHGameScene.prototype.showSelectedHszUI = function (index) {
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
        XLCHGameScene.prototype.showSelectedDqUI = function (index) {
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
        XLCHGameScene.prototype.showHszAni = function (index) {
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
        /**
         * 展现玩家头像 重写 smart
         */
        XLCHGameScene.prototype.showHeaders = function () {
            var players = Global.gameProxy.getPlayers();
            var zhuangId = Global.gameProxy.roomInfo.dealer;
            for (var key in players) {
                var playerData = players[key];
                var dir = this.directions[key];
                var header = this[dir + 'Header'];
                if (this.isLuckeyGame) {
                    header.initWithData(playerData, dir);
                    header.showLinImage();
                }
                else {
                    header.xlchInitWithData(playerData, this.isClubGame, dir);
                }
                header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
                header.visible = true;
                if (playerData.isBaoTing) {
                    header.showTingImages(false);
                }
            }
        };
        XLCHGameScene.prototype.renderContent = function () {
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
                // this.timeDirectionBar.startTime(this);
                this.reloadPlayerChupais();
                this.showShengyuPai();
                this.showReconnectUI();
                this.checkPlayerIsOver();
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
        XLCHGameScene.prototype.createChildren = function () {
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
                            //设置玩家座位标示
                            this.majiangStatus = MajiangStatusEnum.READY;
                            //记录玩家坐标
                            this.directions = majiang_1.MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
                            this.paiQiang.showPaiQiang(this.directions);
                            this.renderChupaiGroups();
                            this.renderHupaiGroup();
                            this.renderContent();
                            this.backMovie();
                            this.roomIdLable.text = "牌局编号：" + Global.gameProxy.roomInfo.roomId;
                            this.showWanfa();
                            return [2 /*return*/];
                    }
                });
            });
        };
        XLCHGameScene.prototype.showWanfa = function () {
            if (this.isLuckeyGame) {
                this.wanfaImage.source = RES.getRes("match_mj_xyjjs_png");
                this.dizhu.text = "报名费:" + Global.gameProxy.roomInfo.entryFeeGold;
                this.dizhu.verticalCenter = 118;
            }
            else {
                this.wanfaImage.source = RES.getRes("xlch_hsz_png");
                this.dizhu.text = "底注:" + Global.gameProxy.roomInfo.betBase;
            }
        };
        XLCHGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
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
                            this.gnBtn.visible = true;
                            this.gnGroup.visible = false;
                            break;
                        case this.touchGroup:
                            if (this.touchShoupai) {
                                this.touchShoupai.change2NoSelect();
                                this.touchShoupai = null;
                                CF.dP(ENo.FIND_COLOR, 0);
                            }
                            this.hideBars();
                            break;
                        case this.restartBtn:
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    XZDDClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
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
        XLCHGameScene.prototype.helpBtnTouch = function () {
            BaseMajiangHelpScene.getInstance("MajiangHelpSkin", "mj_help", "xlch").show();
        };
        //提牌，换三张，打牌的效果。
        XLCHGameScene.prototype.shoupaiTouchOn = function (e) {
            var touchShoupai = e.data;
            //出牌状态
            if (this.maxTouchShoupai == 1) {
                //已经有选择的牌
                if (this.touchShoupai == touchShoupai && this.touchShoupai.isSelect()) {
                    if (!Global.gameProxy.checkIsRoundMe()) {
                        return;
                    }
                    if (this.lockChupai) {
                        return;
                    }
                    if (!Global.gameProxy.checkIsRoundMe()) {
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
                            if (majiang_1.MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
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
                        if (majiang_1.MajiangUtils.checkMajiangSameColor(shoupai.value, touchShoupai.value)) {
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
        XLCHGameScene.prototype.roomHszFinishiedPush = function (e) {
            this.otherChose.visible = false;
            Global.gameProxy.getMineGameData().selectColorTip = Number(e.data.selectColorTip);
            // this.checkDQStatus();
        };
        XLCHGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
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
        };
        // private s_overloadBackInfo(e: egret.Event) {
        //     let resp: any = e.data;
        //     let initGold = resp.initGold;
        //     let curGainGold = resp.curGainGold;
        //     let overloadBackGold = resp.overloadBackGold;
        //     let text = `由于以小博大机制，您携带的金额${initGold}，最大赢取${curGainGold}，剩余${overloadBackGold}将退还给其他玩家，是否确认退出？`;
        //     Global.alertMediator.addAlert(text, null, null, true);
        // }
        /**
         * 游戏积分变化
         * @param  {egret.Event} e
         */
        XLCHGameScene.prototype.syncGoldPush = function (e) {
            var _this = this;
            var resp = e.data;
            this.setAutoTimeout(function () {
                _this.syncGold(resp);
            }, this, 800);
        };
        XLCHGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
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
        };
        XLCHGameScene.prototype.closeMJCall = function () {
            this.restartBtn.visible = true;
            this.restartBtn.alpha = 1;
        };
        /*
                 * 更新金币。
                 */
        XLCHGameScene.prototype.syncGold = function (syncData) {
            var _this = this;
            var _loop_1 = function (key) {
                var dirction = this_1.directions[key];
                var info = syncData[key].info;
                info.gainGold = info.gainGold;
                info.ownGold = info.ownGold;
                if (dirction == "mine") {
                    Global.gameProxy.getMineGameData().gold = info.ownGold;
                    Global.playerProxy.playerData.gold = info.ownGold;
                    Global.gameProxy.addRecord(syncData[key]);
                }
                if (syncData[key].type == 6) {
                    this_1.setAutoTimeout(function () {
                        if (info.gainGold < 0) {
                            _this.createHJZYByDirection(dirction, info.gainGold);
                        }
                        else {
                            _this.createFontByDirection(dirction, info.gainGold);
                        }
                    }, this_1, 1000);
                }
                else {
                    this_1.createFontByDirection(dirction, info.gainGold);
                }
                //smart 携带金币
                // if (this.isClubGame) {
                //     this.getHeaderByDirection(key).updateGold(info.ownGold);
                // }
                // else {
                this_1.getHeaderByDirection(key).updateXieGold(info.ownGold, info.curGainGold);
                // }
                //输光了豆子
                if (info.isDefeat) {
                    this_1.setAutoTimeout(function () {
                        _this.createRenshuFont(dirction);
                        if (dirction == "mine") {
                            _this.mineShoupaiGroup.lockHu();
                        }
                        if (Global.gameProxy.roomInfo.publicCardNum != 0) {
                            _this.huPaiOrGameOver(dirction);
                        }
                    }, this_1, 1000);
                }
            };
            var this_1 = this;
            for (var key in syncData) {
                _loop_1(key);
            }
        };
        /**
         * 有玩家确定换三张的推送
         * @param  {egret.Event} e
         */
        XLCHGameScene.prototype.playerSelectHSZPush = function (e) {
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
        XLCHGameScene.prototype.hSZCardExchangedPush = function (e) {
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
        XLCHGameScene.prototype.showHSZSucTip = function (type) {
            this.hszTipBar = new majiang_1.HSZTipBar(type);
            this.touchGroup.addChild(this.hszTipBar);
            this.hszTipBar.horizontalCenter = 0;
            this.hszTipBar.verticalCenter = -42;
            this.setAutoTimeout(this.hszOver, this, 1500);
        };
        /**
         * 发送换三张的请求
         */
        XLCHGameScene.prototype.sendHSZReq = function () {
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
                                Global.pomelo.disConnectAndReconnect();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 换三张完毕过后加入手牌
         */
        XLCHGameScene.prototype.hszJoinpai = function () {
            var _this = this;
            try {
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
            }
            catch (e) {
                //重连
                game.PomeloManager.instance.disConnectAndReconnect();
            }
        };
        /**
         * 换三张结束
         */
        XLCHGameScene.prototype.hszOver = function () {
            this.hszShoupaiArr = [];
            game.UIUtils.removeSelf(this.hszTipBar);
            this.hszTipBar = null;
            this.leftHsz.visible = false;
            this.rightHsz.visible = false;
            this.mineHsz.visible = false;
            this.topHsz.visible = false;
            this.hszJoinpai();
        };
        XLCHGameScene.prototype.showDingQue = function () {
            if (this.mjDqBar) {
                return;
            }
            this.mjDqBar = new majiang_1.MajiangDQBar(this);
            this.touchGroup.addChild(this.mjDqBar);
            this.mjDqBar.horizontalCenter = 0;
            this.mjDqBar.bottom = 140;
        };
        /**
         * 选择定缺
         * @param  {number} type
         */
        XLCHGameScene.prototype.chooseDQ = function (type) {
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
        XLCHGameScene.prototype.checkDQStatus = function () {
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
        XLCHGameScene.prototype.showShoupai = function (direction) {
            this[direction + "ShoupaiGroup"].changeLast2Mopai();
        };
        /**
         * 定缺完毕
         */
        XLCHGameScene.prototype.dingqueOver = function (player) {
            this.removeHszUI();
            game.UIUtils.removeSelf(this.mjDqBar);
            if (this.otherChose) {
                this.otherChose.visible = false;
            }
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
        XLCHGameScene.prototype.dqDonghua = function (i, pi, img) {
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
        XLCHGameScene.prototype.dqtubiao = function (nums, img) {
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
        XLCHGameScene.prototype.playerSelectColorPush = function (e) {
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
        XLCHGameScene.prototype.playerColorSelected = function (e) {
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
        XLCHGameScene.prototype.playCardPush = function (e) {
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var card = resp.card;
            var direction = this.directions[playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            playerData.cardNum--;
            playerData.lastCard = 0;
            Global.gameProxy.roomInfo.hangupTaskSource = null;
            playerData.playCards.push(card);
            if (direction == "mine") {
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
                this.checkMineShoupaiHu();
                if (this.huTipsBar) {
                    this.huTipsBar.hideBar();
                }
            }
            else {
                Global.gameProxy.updateWanjiaShoupaiByIndex(card, -1, playerIndex);
            }
            this.showChupaiAni1(playerIndex, card);
            majiang_1.MajiangUtils.playCardSound(playerData.sex, card);
        };
        XLCHGameScene.prototype.clearTouchOn = function () {
            if (this.touchShoupai) {
                this.touchShoupai.change2NoSelect();
                this.touchShoupai = null;
                // this.hideBars();
                CF.dP(ENo.FIND_COLOR, 0);
            }
        };
        XLCHGameScene.prototype.playerIsHu = function (playerIndex) {
            var data = Global.gameProxy.getPlayerByIndex(playerIndex);
            return data.huCards.length > 0;
        };
        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        XLCHGameScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang_1.MineShoupai);
            tempChupai.resetValue(value);
            // let tempChupai = new MineShoupai(value);
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
                    if (this.playerIsHu(playerIndex)) {
                        this[direction + 'ShoupaiGroup'].hideMopai();
                    }
                    else {
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
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
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
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
                        this[direction + 'ShoupaiGroup'].showOtherChupaiAni();
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
        XLCHGameScene.prototype.checkTask = function () {
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
        XLCHGameScene.prototype.playerGangCard = function (e) {
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
                    // this.addGangAni("right", "xiayu", GameConfig.curWidth() * 0.5, GameConfig.curHeight() * 0.3);
                    // this.addGangAni("right", "guafeng", GameConfig.curWidth() * 0.41, GameConfig.curHeight() * 0.24);
                    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    // group.removeLastPai();
                    //手上四张暗杠
                    break;
                case 3://点杠
                    if (direction != "mine") {
                        group.removeLastPai();
                        group.removeLastPai();
                        group.removeLastPai();
                    }
                    majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    var lastDirection = this.directions[from];
                    this[lastDirection + "ChupaiGroup"].removeLastChupai();
                    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
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
            group.hideMopai();
            //再次检查
            // this.checkTask();
        };
        XLCHGameScene.prototype.playerPengCardPush = function (e) {
            _super.prototype.playerPengCardPush.call(this, e);
            //播放碰牌音效
            var resp = e.data;
            var playerIndex = resp.playerIndex;
            var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
            majiang.MajiangUtils.playHPGSound(playerData.sex, 1);
        };
        /**
         * 摸牌推送
         * {"playerIndex":2,"card":24,"remain":80,existHangup:}
         * @param  {egret.Event} e
         */
        XLCHGameScene.prototype.newCardPush = function (e) {
            var resp = e.data;
            this.paiQiang.removeNumByIndex();
            LogUtils.logD("==========当前手牌=====" + this.paiQiang.getPaiQiangNum());
            this.updateSypai();
            var direction = this.directions[resp.playerIndex];
            var playerData = Global.gameProxy.getPlayerByIndex(resp.playerIndex);
            playerData.cardNum++;
            this.taskBar.hideAllBtns();
            if (direction == "mine") {
                //先刷新自己手牌
                Global.gameProxy.updateWanjiaShoupai(resp.card, 1);
                playerData.lastCard = resp.card;
                this.mineShoupaiGroup.playerNewCardPush(playerData.lastCard);
                this.checkShowTips();
            }
            else {
                this[direction + "ShoupaiGroup"].playerNewCardPush();
                playerData.lastCard = 1;
            }
            this.lockChupai = true;
            this.clearAutoTimeout(this.lockChupaiTimeout);
            this.lockChupaiTimeout = this.setAutoTimeout(function () {
                this.lockChupai = false;
                ;
            }, this, 800);
        };
        /**
         * 胡牌推送
         *  {"playerIndex":1,"card":23,"from":1,"syncGold":{"1":{"1":{"type":2,"info":{"gainGold":3,"pumpGold":0,"ownGold":9503,"card":23}}
         * "2":{"type":2,"info":{"gainGold":-3,"pumpGold":0,"ownGold":9497,"card":23}}}}}
         * @param  {egret.Event} e
         */
        XLCHGameScene.prototype.hupaiPush = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, playerIndex, card, from, mainCard, mineData, huPlayerData, direction, lastDirection, time;
                return __generator(this, function (_a) {
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
                        this.setAutoTimeout(function () {
                            _this.addXZDDHuTip(from, playerIndex, true);
                        }, this, 2000);
                        this[direction + "HupaiGroup"].addHu(resp, 2);
                        majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 4);
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
                        majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 5);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 显示血战到底胡牌的提示
         */
        XLCHGameScene.prototype.addXZDDHuTip = function (from, playerIndex, ani) {
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
        XLCHGameScene.prototype.addGangAni = function (effectName, offerX, offerY, scale) {
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
        XLCHGameScene.prototype.createHJZYByDirection = function (direction, value) {
            var name = direction + "_hjzy";
            var hjzyTip = GameCacheManager.instance.getCache(name, majiang_1.HjzyTip);
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
        XLCHGameScene.prototype.showDuijuAni = function (callback) {
            var name = "duijujieshu";
            var image = GameCacheManager.instance.getCache(name, eui.Image);
            image.source = RES.getRes("duijujieshu_png");
            image.horizontalCenter = -30;
            image.verticalCenter = -50;
            this.effectGroup.addChild(image);
            image.alpha = 0;
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
        XLCHGameScene.prototype.settlementData = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var resp, players;
                return __generator(this, function (_a) {
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
                    LogUtils.logD("======血流成河结算数据==========" + JSON.stringify(resp));
                    players = resp.players;
                    this.tgGroup.visible = false; //解决牌局结束，托管不消失。
                    this.gameOverShow(players);
                    this.showDuijuAni(function () {
                        _this.checkChaHuazhu(resp.options.hpts, function () {
                            if (!Global.gameProxy.roomInfo) {
                                return;
                            }
                            //smart  携带金币
                            //修改所有玩家金币至抽水过后的金币
                            LogUtils.logD("=========settlementData========" + _this.isClubGame);
                            for (var index in players) {
                                var goldData = players[index];
                                var header = _this.getHeaderByDirection(index);
                                goldData.ownGold = goldData.ownGold;
                                // if (this.isClubGame) {
                                //     header.updateGold(goldData.ownGold);
                                // }
                                // else {
                                header.updateXieGold(goldData.ownGold, goldData.curGainGold);
                                // }
                            }
                            var mineData = Global.gameProxy.getMineGameData();
                            Global.playerProxy.updatePlayerGold(mineData.gold);
                            //test
                            CF.sN(_this.GAME_OVER_NOTIFY, { players: players, status: resp.status });
                        });
                    });
                    return [2 /*return*/];
                });
            });
        };
        XLCHGameScene.prototype.s_pushLuckySettlement = function (e) {
            var _this = this;
            var data = e.data;
            var players = data.players;
            this.gameOverShow(players);
            this.setAutoTimeout(function () {
                for (var index in players) {
                    var goldData = players[index];
                    var header = _this.getHeaderByDirection(index);
                    //smart clubgainGold
                    header.updateGold(goldData.score);
                }
                var mineGold = players[_this.proxy.getMineIndex()];
                if (mineGold.ownGold != undefined)
                    Global.playerProxy.playerData.gold = mineGold.ownGold;
                MatchJackeyResultPanel.instance.checkGoldBySHow(mineGold.gainGold, function () {
                    CF.sN(_this.CLOSE_NOTIFY);
                });
            }, this, 2000);
        };
        /**
         * 花猪
         * type 3 : 5 一组
         * @param  {} records
         */
        XLCHGameScene.prototype.checkChaHuazhu = function (records, callback) {
            var _this = this;
            var huazuArr = records[4] || {};
            var roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var data = {};
            for (var playerIndex in huazuArr) {
                var goldData = huazuArr[playerIndex];
                goldData.gainGold = goldData.gainGold;
                var playerData = roomInfo.players[playerIndex];
                playerData.gold += goldData.gainGold;
                data[playerIndex] = { score: goldData.gainGold, type: 4 };
            }
            var time = 0;
            for (var key in data) {
                time = 3000;
                this.showScoreAni(key, data[key]);
            }
            this.setAutoTimeout(function () {
                _this.checkChajiao(records, callback);
            }, this, time);
        };
        /**
            * 展现漂分动画 重写
            * type score
            * @param  {} scoreData
            */
        XLCHGameScene.prototype.showScoreAni = function (playerIndex, scoreData) {
            var _this = this;
            var directionStr = this.directions[playerIndex];
            if (Global.runBack) {
                var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                // if (this.isClubGame) {
                //     this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
                // }
                return;
            }
            var image = new eui.Image(RES.getRes("over_type_" + scoreData.type + "_png"));
            var _id = Global.gameProxy.roomInfo.gameId;
            if (_id == "gyzjmj") {
                image.scaleX = 0.6;
                image.scaleY = 0.6;
            }
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
            if (scoreData.score > 0) {
                image.visible = false;
            }
            egret.Tween.get(image).to({ alpha: 1, x: image.x + 50 }, 300).wait(1000).call(function () {
                game.UIUtils.removeSelf(image);
                /**
                 * @param  {} directionStr
                 */
                if (_id == "gyzjmj")
                    return;
                _this.createFontByDirection(directionStr, scoreData.score);
                var playerData = Global.gameProxy.getPlayerByIndex(playerIndex);
                // if (this.isClubGame) {
                //     this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
                // }
            }, this);
            // }
        };
        /**
         * 花猪和查大叫
         * type 3 : 5 一组
         * @param  {} records
         */
        XLCHGameScene.prototype.checkChajiao = function (records, callback) {
            var _this = this;
            var chajiaoArr = records[3] || {};
            var roomInfo = Global.gameProxy.roomInfo;
            if (!roomInfo) {
                return;
            }
            var data = {};
            for (var playerIndex in chajiaoArr) {
                var goldData = chajiaoArr[playerIndex];
                goldData.gainGold = goldData.gainGold;
                var playerData = roomInfo.players[playerIndex];
                playerData.gold += goldData.gainGold;
                data[playerIndex] = { score: goldData.gainGold, type: 3 };
            }
            var time = 0;
            for (var key in data) {
                time = 3000;
                this.showScoreAni(key, data[key]);
            }
            this.setAutoTimeout(function () {
                _this.checkTuishui(records, callback);
            }, this, time);
            // let myLiushui = records[Global.gameProxy.getMineIndex()];
        };
        /**
         * 退税
         * @param  {} records
         */
        XLCHGameScene.prototype.checkTuishui = function (records, callback) {
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
        /**
         * 听牌提示
         */
        XLCHGameScene.prototype.tipsBtnTouch = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang_1.HuTipsBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            if (this.huTipsBar.visible) {
                this.huTipsBar.hideBar();
                return;
            }
            var mineData = Global.gameProxy.getMineGameData();
            var cards = _.clone(mineData.cards);
            if (mineData.lastCard) {
                majiang_1.MajiangUtils.updateCardsNum(cards, mineData.lastCard, -1);
            }
            var huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCards;
            this.showhupaiBar();
        };
        XLCHGameScene.prototype.getGangArr = function (gangJson) {
            var gangArr = [];
            for (var i = 0; i < gangJson.length; i++) {
                gangArr.push(gangJson[i].card);
            }
            return gangArr;
        };
        /**
         * 杠牌之后如果胡牌了 刷新一次
         */
        XLCHGameScene.prototype.flushTingCards = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = this.mineShoupaiGroup.getShoupaiArr();
            var huCards = window['TingCardTip'].getTings(cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCards;
        };
        /**
         * 刷新胡牌提示
         */
        XLCHGameScene.prototype.tipsBarFlush = function () {
            if (!this.huTipsBar) {
                this.huTipsBar = new majiang_1.HuTipsBar();
                this.panelGroup.addChild(this.huTipsBar);
            }
            this.showhupaiBar();
        };
        XLCHGameScene.prototype.showhupaiBar = function () {
            for (var i = 0; i < this.lastHuTips.length; i++) {
                var huTip = this.lastHuTips[i];
                var count = majiang.MajiangUtils.findValueLess(huTip.value);
                huTip.count = count;
            }
            this.huTipsBar.showBar(this.lastHuTips);
        };
        /**
         * 检查当前手牌能否胡牌
         */
        XLCHGameScene.prototype.checkMineShoupaiHu = function () {
            var mineData = Global.gameProxy.getMineGameData();
            if (!mineData.selectColor) {
                return;
            }
            //已经胡牌就确定牌型
            if (mineData.huCards.length > 0) {
                return;
            }
            var huCards = window['TingCardTip'].getTings(mineData.cards, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCards;
            this.tipBtn.visible = huCards.length > 0;
        };
        /**
         * 展现胡牌
         */
        XLCHGameScene.prototype.showHuTips = function () {
            var mineShoupai = this.touchShoupai;
            if (Global.gameProxy.getMineGameData().huCards.length > 0) {
                return;
            }
            var value = mineShoupai.value;
            var mineCard = _.clone(Global.gameProxy.getMineGameData().cards);
            if (mineCard[value] > 1) {
                mineCard[value] -= 1;
            }
            else {
                delete mineCard[value];
            }
            var mineData = Global.gameProxy.getMineGameData();
            // if()
            var huCard = window['TingCardTip'].getTings(mineCard, mineData.selectColor, mineData.pengCards, this.getGangArr(mineData.gangCards));
            this.lastHuTips = huCard;
            this.tipsBarFlush();
        };
        /**
         * 检测胡牌提示
         */
        XLCHGameScene.prototype.checkHuTips = function () {
            var mineData = Global.gameProxy.getMineGameData();
            var cards = _.clone(mineData.cards);
            if (mineData.lastCard && mineData.huCards.length < 1) {
                this.mineShoupaiGroup.checkHuTips();
            }
            else {
                var majiang_2 = this.mineShoupaiGroup.getShoupaiArr();
                var huCard = window['TingCardTip'].getTings(majiang_2, mineData.selectColor);
                this.lastHuTips = huCard;
                this.tipBtn.visible = huCard.length > 0;
            }
        };
        //-------游戏内提示
        XLCHGameScene.prototype.checkShowTips = function () {
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
        return XLCHGameScene;
    }(majiang_1.BaseMajiangScene));
    majiang_1.XLCHGameScene = XLCHGameScene;
    __reflect(XLCHGameScene.prototype, "majiang.XLCHGameScene");
})(majiang || (majiang = {}));
