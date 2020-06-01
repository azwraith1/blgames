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
var bjle;
(function (bjle) {
    var BJLGameScene = (function (_super) {
        __extends(BJLGameScene, _super);
        function BJLGameScene() {
            var _this = _super.call(this) || this;
            // private win_zi: eui.Image;
            // private win_bg: eui.Image;
            /**
             * 背景音乐
             */
            _this.bgMusic = "bjl_bg_mp3";
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_BJLGAME;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_BJLHALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BJLGAME;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = null;
            _this.lockYZ = false; //锁定押注。
            _this.haveshowShouPaiAni = false;
            _this.cmNumList = []; //筹码list
            /**
             * 结算
             */
            _this.winPlayers = [];
            _this.updatePlayerGold = [];
            _this.cmList1 = [];
            _this.cmList2 = [];
            _this.cmList3 = [];
            _this.cmList4 = [];
            _this.cmList5 = [];
            _this.skinName = "BJLGameSceneSkin" + CF.tis;
            return _this;
        }
        Object.defineProperty(BJLGameScene.prototype, "isZhuangMi", {
            /**庄咪或者闲咪 */
            get: function () {
                var isZhungMi = MIPAI_DIRECTION.EMPTY;
                var zhuangBet = this.war1.Bet;
                var xianBet = this.war2.Bet;
                if (zhuangBet <= 0 && xianBet <= 0) {
                    return isZhungMi;
                }
                ;
                if (zhuangBet < xianBet) {
                    isZhungMi = MIPAI_DIRECTION.XIAN_MI;
                }
                else {
                    isZhungMi = MIPAI_DIRECTION.ZHUANG_MI;
                }
                return isZhungMi;
            },
            enumerable: true,
            configurable: true
        });
        /**断线 重绘咪牌ui */
        BJLGameScene.prototype.rerenderMiPaiUI = function (reconnect) {
            if (!reconnect)
                return;
            this.miPai.visible = false;
            var roomInfo = Global.roomProxy.roomInfo;
            var mineData = Global.roomProxy.getMineData();
            this.xianValue = roomInfo.idlePoint;
            this.zhuangValue = roomInfo.bankerPoint;
            this.mipaiXian = roomInfo.idleCard;
            this.mipaiZhuang = roomInfo.bankerCard;
            if (this.isZhuangMi != MIPAI_DIRECTION.EMPTY) {
                //新增牌 或者 首两张牌
                if (reconnect) {
                    this.onLineCards(1);
                    this.showPlayers();
                    this.showHeaders();
                    var isZhuang = this.isZhuangMi;
                    if (roomInfo.roundStatus == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                        this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
                        this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
                        //this.roomState.source = "bjl_xmp_png";
                        this.showZXPoker01();
                        // if (roomInfo.idleAddCards.length == 0 && roomInfo.bankerAddCards.length == 0) {
                        // 	this.showZhuangXianDian(roomInfo);
                        // 	return;
                        // }
                        // if (roomInfo.idleAddCards.length == 0 || roomInfo.bankerAddCards.length == 0) {
                        // 	this.pushXianAdd(roomInfo.idleAddCards, 0);
                        // }
                        if (roomInfo.idleAddCards.length > 0 && roomInfo.bankerAddCards.length > 0) {
                            this.pushXianAdd(roomInfo.idleAddCards, 0);
                        }
                    }
                    else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                        this.zpoker2.initWithNum(roomInfo.bankerAddCards[0]);
                        this.showZXPoker01();
                        this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
                        // this.roomState.source = "bjl_zmp_png";
                        // if (roomInfo.idleAddCards.length == 0 || roomInfo.bankerAddCards.length == 0) {
                        // 	this.pushZhuangAdd(roomInfo.bankerAddCards, 0);
                        // }
                        if (roomInfo.idleAddCards.length > 0 && roomInfo.bankerAddCards.length > 0) {
                            this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
                            if (!this.xpoker2.isZhengPoker && roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0)
                                this.addMiFanPai(1, this.xpoker2);
                            this.pushZhuangAdd(roomInfo.bankerAddCards, 0);
                        }
                    }
                    else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_HAND_CARD) {
                        this.miPai.visible = true;
                        this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
                        if (isZhuang == MIPAI_DIRECTION.ZHUANG_MI) {
                            if (roomInfo.bankerInitCards && roomInfo.bankerInitCards.length > 0) {
                                this.miPai.visible = true;
                                this.miPai.setPokerValue(roomInfo.bankerAddCards, isZhuang);
                            }
                        }
                        else if (isZhuang == MIPAI_DIRECTION.XIAN_MI) {
                            if (roomInfo.idleInitCards && roomInfo.idleInitCards.length > 0) {
                                this.miPai.visible = true;
                                this.miPai.setPokerValue(roomInfo.idleAddCards, isZhuang);
                            }
                        }
                    }
                }
            }
            else {
                if (reconnect) {
                    this.onLineCards(1);
                    this.showPlayers();
                    this.showHeaders();
                    //庄或则闲显示点数
                    if (roomInfo.roundStatus == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                        this.zpoker2.initWithNum(roomInfo.bankerAddCards[0]);
                        if (roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0) {
                            this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
                        }
                        this.showZXPoker01();
                        if (!this.xpoker2.isZhengPoker && roomInfo.idleAddCards && roomInfo.idleAddCards.length > 0)
                            this.addMiFanPai(1, this.xpoker2);
                        this.buPaiAni_MI(2);
                        this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
                    }
                    else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                        this.xpoker2.initWithNum(roomInfo.idleAddCards[0]);
                        this.showZXPoker01();
                        this.buPaiAni_MI(1);
                        this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
                    }
                    else if (roomInfo.roundStatus == ROOM_STATUS1.MINI_HAND_CARD) {
                        this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
                    }
                }
            }
            this.timeBar.visible = true;
        };
        BJLGameScene.prototype.setPokerAddValue = function () {
        };
        BJLGameScene.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            FrameUtils.changeBgImage("./resource/gameAssets/bjl_hall/bjl_hall.jpg");
            this.showBtnsType(1);
            // let num3 = [1, 1, 5, 5, 3, 5, 5, 1, 1, 1, 3, 5, 5, 1, 1, 6, 5, 1, 1, 5, 5, 5, 9, 5, 6, 7, 5, 5, 6, 11, 6, 1, 5, 5, 1, 9, 1, 5, 5, 2, 1, 1, 9, 1, 1, 1, 1, 1]
            // this.ld1.testNums(num3);
            // this.ld2.testNums(num3);
            // this.ld3.testNums(num3);
            // this.ld4.testNums(num3);
            // this.ld5.testNums(num3);
            // this.ld6.zhangWin(num3);
            // this.ld6.xianWin(num3);
            // return;
            this.createDBComponents();
            this.init();
            this.timeBar.startTime(this);
            this.hgtkInterval = egret.setInterval(function () {
                if (_this.lockYZ) {
                    _this.clearNormalJinbi();
                }
            }, this, 1000);
        };
        BJLGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
            CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.aE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
            CF.aE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
            //CF.aE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
            CF.aE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
            CF.aE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
            CF.aE(ServerNotify.s_playerBet, this.s_playerBet, this);
            CF.aE(ServerNotify.s_countdown, this.countdown, this);
            CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.aE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
            CF.aE(ServerNotify.s_enterResult, this.s_enterResult, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
            CF.aE(ServerNotify.s_ruffleCard, this.s_ruffleCard, this); //洗牌
            CF.aE(ServerNotify.s_cardsNumInfo, this.s_cardsNumInfo, this); //牌的数量
            CF.aE(ServerNotify.s_sendWayBillInfo, this.s_sendWayBillInfo, this); //路单
            CF.aE(ENo.BJL_FANPAI, this.fanPai, this); //翻牌
            CF.aE(ServerNotify.s_miniAddCards, this.s_miniAddCards, this); //咪补牌
            CF.aE(ServerNotify.s_miniInitCards, this.s_miniInitCards, this); //咪手牌
        };
        BJLGameScene.prototype.s_miniAddCards = function (e) {
            var num = e.data;
            var cloneData = JSON.parse(JSON.stringify(num));
            var roomInfo = Global.roomProxy.roomInfo;
            this.miPai.visible = false;
            if (cloneData.status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
            }
            else if (cloneData.status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
            }
            var cd1 = cloneData["camp1"];
            var cd2 = cloneData["camp2"];
            var addCardXian = cd1["addCards"];
            var addCardZhuang = cd2["addCards"];
            roomInfo.bankerCard = cd2["cards"];
            roomInfo.idleCard = cd1["cards"];
            roomInfo.idlePoint = cd1["value"];
            roomInfo.bankerPoint = cd2["value"];
            roomInfo.idleAddCards = cd1["addCards"];
            roomInfo.bankerAddCards = cd2["addCards"];
            this.xpaisValue(cd1["cards"]);
            this.zpaisValue(cd2["cards"]);
            this.showZXPoker01();
            var status = cloneData.status;
            if (status == ROOM_STATUS1.SETTLEMENT) {
                this.changeRoomStatus(ROOM_STATUS1.SETTLEMENT);
                this.showZhuangXianDian(roomInfo);
                return;
            }
            if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
                this.miPai.visible = false;
                if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                    this.buPaiAni_MI(1);
                }
                else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                    //如果闲有补牌 把闲翻到正面
                    if (addCardXian && addCardXian.length > 0) {
                        if (!this.xpoker2.isZhengPoker)
                            this.addMiFanPai(1, this.xpoker2);
                    }
                    this.buPaiAni_MI(2);
                }
                return;
            }
            if (addCardZhuang == undefined && addCardXian == undefined) {
                this.showZhuangXianDian(roomInfo);
                return;
            }
            if (addCardXian == undefined || addCardZhuang == undefined) {
                if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                    this.pushXianAdd(addCardXian);
                }
                else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                    this.pushZhuangAdd(addCardZhuang, 400);
                }
            }
            if (addCardXian && addCardZhuang) {
                if (status == ROOM_STATUS1.MINI_IDLE_ADD_CARD) {
                    this.pushXianAdd(addCardXian);
                }
                else if (status == ROOM_STATUS1.MINI_BANKER_ADD_CARD) {
                    if (addCardXian && addCardXian.length > 0) {
                        if (!this.xpoker2.isZhengPoker)
                            this.addMiFanPai(1, this.xpoker2);
                    }
                    this.pushZhuangAdd(addCardZhuang);
                }
            }
        };
        /**展示0和1
         * 庄闲得手牌正面 */
        BJLGameScene.prototype.showZXPoker01 = function () {
            for (var i = 0; i < 2; ++i) {
                var poker = this["xpoker" + i];
                if (!poker.isZhengPoker) {
                    poker.pokerScaleAni();
                }
            }
            for (var i = 0; i < 2; ++i) {
                var poker = this["zpoker" + i];
                if (!poker.isZhengPoker) {
                    poker.pokerScaleAni();
                }
            }
        };
        /**
         * 服务器推送闲家咪牌
         * 服务器推送 status=8 代表闲家咪
         *  */
        BJLGameScene.prototype.pushXianAdd = function (addCardXian, delayAdd) {
            var _this = this;
            if (delayAdd === void 0) { delayAdd = 400; }
            this.changeRoomStatus(ROOM_STATUS1.MINI_IDLE_ADD_CARD);
            // this.roomState.source = RES.getRes("bjl_xmp_png");
            //补牌动画
            this.setAutoTimeout(function () {
                _this.buPaiAni_MI(1);
            }, this, delayAdd);
            //房间状态
            if (this.isZhuangMi == MIPAI_DIRECTION.XIAN_MI) {
                this.setAutoTimeout(function () {
                    _this.miPai.visible = true;
                    _this.miPai.setAddCard(addCardXian, _this.isZhuangMi);
                }, this, 900);
            }
        };
        /**服务器推送庄家咪
         * status==9 代表庄咪
         */
        BJLGameScene.prototype.pushZhuangAdd = function (addCardZhuang, bupaiDelay) {
            var _this = this;
            if (bupaiDelay === void 0) { bupaiDelay = 0; }
            this.changeRoomStatus(ROOM_STATUS1.MINI_BANKER_ADD_CARD);
            this.setAutoTimeout(function () {
                _this.buPaiAni_MI(2);
            }, this, bupaiDelay);
            // this.roomState.source = RES.getRes("bjl_zmp_png");
            if (this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI) {
                this.setAutoTimeout(function () {
                    _this.miPai.visible = true;
                    _this.miPai.setAddCard(addCardZhuang, _this.isZhuangMi);
                }, this, 600);
            }
        };
        BJLGameScene.prototype.s_miniInitCards = function (e) {
            var num = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            var cd1 = num["camp1"];
            var cd2 = num["camp2"];
            var xian = cd1["initCards"];
            var zhuang = cd2["initCards"];
            roomInfo.idleInitCards = cd1["initCards"];
            roomInfo.bankerInitCards = cd2["initCards"];
            this.changeRoomStatus(ROOM_STATUS1.MINI_HAND_CARD);
            // this.xpaisValue(xian);
            // this.zpaisValue(zhuang);
            // //当庄闲都未下注 不弹出咪牌界面
            // if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
            // 	this.miPai.visible = false;
            // 	// this.showZheng();
            // 	return;
            // };
            // this.miPai.visible = true;
            // let cardsValue = this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI ? zhuang : xian;
            // this.miPai.setPokerValue(cardsValue, this.isZhuangMi);
        };
        BJLGameScene.prototype.fanPai = function (e) {
            var _this = this;
            var data = e.data;
            var id = data["id"];
            var pre = "z";
            if (data["isZhuang"] == MIPAI_DIRECTION.XIAN_MI) {
                pre = "x";
            }
            var poker = this[pre + "poker" + id];
            poker.visible = true;
            poker.showB2Z();
            if (id == 2 && pre == "z") {
                this.showZhuangXianDian(Global.roomProxy.roomInfo);
            }
            if (this[pre + "poker" + 0].isZhengPoker && this[pre + "poker" + 1].isZhengPoker) {
                this.setAutoTimeout(function () {
                    _this.miPai.visible = false;
                }, this, 1000);
            }
        };
        BJLGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
            CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.rE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
            CF.rE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
            //CF.rE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
            CF.rE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
            CF.rE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
            CF.rE(ServerNotify.s_playerBet, this.s_playerBet, this);
            CF.rE(ServerNotify.s_countdown, this.countdown, this);
            CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.rE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
            CF.rE(ServerNotify.s_enterResult, this.s_enterResult, this);
            CF.rE(ServerNotify.s_ruffleCard, this.s_ruffleCard, this); //洗牌
            CF.rE(ServerNotify.s_cardsNumInfo, this.s_cardsNumInfo, this); //牌的数量
            CF.rE(ServerNotify.s_sendWayBillInfo, this.s_sendWayBillInfo, this); //路单
            CF.rE(ENo.BJL_FANPAI, this.fanPai, this); //翻牌
            CF.rE(ServerNotify.s_miniAddCards, this.s_miniAddCards, this); //咪补牌
            CF.rE(ServerNotify.s_miniInitCards, this.s_miniInitCards, this); //咪手牌
            if (this.miPai)
                this.miPai.onRemoved();
        };
        /**
         * 需要的龙骨动画
         */
        BJLGameScene.prototype.createDBComponents = function () {
            var _this = this;
            this.vsDBComponent = DBComponent.create("vsDb", "bjl_notice" + TextUtils.instance.currentAniStr);
            this.dbGroup.addChild(this.vsDBComponent);
            this.vsDBComponent.visible = false;
            this.vsDBComponent.resetPosition();
            this.vsDBComponent.verticalCenter = -200;
            this.vsDBComponent.horizontalCenter = 365;
            this.playerDb1 = DBComponent.create("bjl_title1", "title");
            this.no1header.addDb(this.playerDb1);
            this.playerDb1.resetPosition();
            this.playerDb1.verticalCenter = -12;
            this.playerDb1.horizontalCenter = 0;
            this.playerDb1.play("title01", -1);
            this.playerDb = DBComponent.create("bjl_title", "title");
            this.luckyheader.addDb(this.playerDb);
            this.playerDb.resetPosition();
            this.playerDb.verticalCenter = 0;
            this.playerDb.horizontalCenter = 0;
            this.playerDb.play("title02", -1);
            this.xipaiDb = DBComponent.create("bjl_xipai", "xipai");
            this.dbGroup.addChild(this.xipaiDb);
            this.xipaiDb.visible = false;
            this.xipaiDb.resetPosition();
            this.xipaiDb.verticalCenter = -200;
            this.xipaiDb.horizontalCenter = 365;
            this.xipaiDb.callback = function () {
                _this.xipaiDb.visible = false;
            };
        };
        BJLGameScene.prototype.shouPaiAni = function () {
            var _this = this;
            if (Global.runBack)
                return;
            if (this.haveshowShouPaiAni)
                return;
            this.haveshowShouPaiAni = true;
            this.allCards = [];
            //let tartgetPos = new egret.Point(this.shouPaiPos.localToGlobal().x, this.shouPaiPos.localToGlobal().y);
            var groupNameArr = ["xpoker", "zpoker"];
            var groupName;
            for (var j = 0; j < groupNameArr.length; ++j) {
                groupName = groupNameArr[j];
                this.groupShouCardAni(groupName);
            }
            this.zhengBianBei();
            this.zpokerGroup.visible = false;
            this.xpokerGroup.visible = false;
            this.setAutoTimeout(function () {
                var count = 0;
                async.eachSeries(_this.allCards, function (card, callback) {
                    var time = 500;
                    egret.Tween.get(card).wait(15 * (count / 2)).call(function () {
                        count++;
                        callback();
                    }).to({
                        x: _this.shouPaiGroup.x,
                        y: _this.shouPaiGroup.y,
                        scaleX: 0.4,
                        scaleY: 0.4,
                        alpha: 0,
                    }, time, egret.Ease.cubicInOut).call(function () {
                        game.UIUtils.removeSelf(card);
                    });
                });
            }, this, 1010);
        };
        BJLGameScene.prototype.createBJLPoker = function (value, color, x, y, rotation, _scaleX, _scaleY, name, anchorX, anchorY) {
            var card = new bjle.BJLPoker();
            card.value = value;
            card.color = color;
            card.x = x;
            card.y = y;
            card.rotation = rotation;
            card.scaleX = _scaleX;
            card.scaleY = _scaleY;
            card.anchorOffsetX = anchorX;
            card.anchorOffsetY = anchorY;
            card.name = name;
            return card;
        };
        BJLGameScene.prototype.groupShouCardAni = function (groupNameKey) {
            var _this = this;
            if (groupNameKey === void 0) { groupNameKey = "xpoker"; }
            var arr = [];
            var cardGroup = this[groupNameKey + "Group"];
            var card;
            var newCard;
            for (var j = 0; j < 3; j++) {
                card = this[groupNameKey + j];
                var startPos = card.localToGlobal();
                if (card.visible) {
                    newCard = this.createBJLPoker(card.value, card.color, startPos.x, startPos.y, card.rotation, card.scaleX, card.scaleY, name, card.anchorOffsetX, card.anchorOffsetY);
                    newCard.name = groupNameKey + j;
                    this.uiGroup.addChild(newCard);
                    arr.push(newCard);
                    this.allCards.push(newCard);
                }
            }
            var num = 0;
            async.eachSeries(arr, function (card, callback) {
                var time = 1000;
                // let startPos = card.localToGlobal();
                // let waitTime = Math.random() * 2 * 15;
                // this.uiGroup.addChild(card);
                // card.x = startPos.x;
                // card.y = startPos.y;
                egret.Tween.get(card).wait(15 * (num / 2)).call(function () {
                    num++;
                    callback();
                }).to({
                    x: _this.shouPaiPos.localToGlobal().x,
                    y: _this.shouPaiPos.localToGlobal().y,
                    rotation: 0
                }, time, egret.Ease.cubicInOut).call(function () {
                    var _index = arr.indexOf(card);
                    arr.splice(_index, 1);
                    card.x = _this.shouPaiPos.localToGlobal().x;
                    card.y = _this.shouPaiPos.localToGlobal().y;
                    card.rotation = 0;
                    // cardGroup.addChild(card);
                });
            });
        };
        /**
         * 洗牌
         */
        BJLGameScene.prototype.s_ruffleCard = function (e) {
            this.xipaiDb.play("xipai", 1);
            var roomInfo = Global.roomProxy.roomInfo;
            for (var i = 0; i < 5; i++) {
                this["ld" + (i + 1)].chushihua();
            }
            roomInfo.wayBillInfo = [];
        };
        /**
         * 牌的数量
         */
        BJLGameScene.prototype.s_cardsNumInfo = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo['remainNum'] = data.remainNum + 4;
            roomInfo['usedNum'] = data.usedNum - 4;
            this.fpaiNums.text = data.remainNum;
            this.feipaiNums.text = data.usedNum;
        };
        /**
         * 路单
         */
        BJLGameScene.prototype.s_sendWayBillInfo = function (e) {
            var data = e.data;
            var num = data["bill"].concat([]);
            var roomInfo = Global.roomProxy.roomInfo;
            for (var i = 0; i < 5; i++) {
                this["ld" + (i + 1)].testNums(num);
            }
            this.ld6.zhangWin(num);
            this.ld6.xianWin(num);
            roomInfo.wayBillInfo = data["bill"];
        };
        /**
         * 初始化筹码
         */
        BJLGameScene.prototype.initCMList = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            this.cmNumList = roomInfo.addBet;
        };
        /**
         * 初始化项目并给数据赋值。
         */
        BJLGameScene.prototype.init = function () {
            this.initCMList();
            for (var i = 0; i < 5; i++) {
                this["war" + (i + 1)].init(this, 1);
            }
            for (var i = 1; i <= 4; i++) {
                var yzBtn = this['yzbtn' + i];
                yzBtn.setIndex(i);
                yzBtn.setContent(this.cmNumList[i - 1]);
            }
            //默认1
            this.currentMoney = this.cmNumList[0];
            this.showTouchValue(this.currentMoney);
            // //显示所有玩家头像信息
            var roomInfo = Global.roomProxy.roomInfo;
            var betMulti = roomInfo.betMulti; //玩家列表
            var wayBillInfo = roomInfo.wayBillInfo; //路单
            for (var i = 0; i < betMulti.length; i++) {
                var nums = 1 + ":" + betMulti[i];
                this["war" + (i + 1)].init_bili(nums);
            }
            this.fpaiNums.text = "" + roomInfo.remainNum;
            this.feipaiNums.text = "" + roomInfo.usedNum;
            this.renderRoomInfo();
            this.showPlayers();
            this.Waybill(wayBillInfo);
            this.dqjs.text = CF.tigc(136) + (wayBillInfo.length + 1);
            this.showRoomStatus(true);
        };
        /**
         * 路单
         */
        BJLGameScene.prototype.Waybill = function (wayBillInfo) {
            if (wayBillInfo.length == 0) {
                return;
            }
            var lds = wayBillInfo.concat([]);
            for (var i = 0; i < 5; i++) {
                this["ld" + (i + 1)].testNums(lds);
            }
            this.ld6.zhangWin(lds);
            this.ld6.xianWin(lds);
        };
        /**
         * 获取一个筹码
         */
        BJLGameScene.prototype.getNewBJLCm = function (index, value) {
            var jinbi = ObjectPool.produce("bjl_cm", bjle.BJLCmBtn);
            if (!jinbi) {
                jinbi = new bjle.BJLCmBtn(true);
            }
            jinbi.setIndex(index);
            jinbi.setContent(value);
            return jinbi;
        };
        BJLGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.backBtn:
                            this.showBtnsType(1);
                            this.backBtnTouchEnded();
                            break;
                        case this.settingBtn:
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "baccarat" });
                            break;
                        case this.recordBtn:
                            this.showBtnsType(1);
                            CF.sN(PanelNotify.OPEN_BJL_RECORD, "baccarat");
                            break;
                        case this.helpBtn:
                            this.showBtnsType(1);
                            BaseHelpShuPanel.getInstance("BJLHelpSkin" + CF.tis, "bjl_help", CF.tic).show();
                            break;
                        case this.xlbtn:
                            this.showBtnsType(2);
                            break;
                        case this.xlbtn1:
                            this.showBtnsType(1);
                            break;
                        case this.playersBtn:
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 减少内存
         */
        BJLGameScene.prototype.clearNormalJinbi = function () {
            var _this = this;
            var kongzhiNumber = 40;
            /**
             * 清理
             */
            var cleardata = function (type, number) {
                var list = _this['cmList' + type];
                while (number > 0) {
                    var jinbi = list.shift();
                    game.UIUtils.removeSelf(jinbi);
                    ObjectPool.reclaim("bjl_cm", jinbi);
                    number--;
                }
            };
            if (this.cmList1.length > kongzhiNumber) {
                cleardata(1, this.cmList1.length - kongzhiNumber);
            }
            if (this.cmList2.length > kongzhiNumber) {
                cleardata(2, this.cmList2.length - kongzhiNumber);
            }
            if (this.cmList3.length > kongzhiNumber) {
                cleardata(3, this.cmList3.length - kongzhiNumber);
            }
            if (this.cmList4.length > kongzhiNumber) {
                cleardata(4, this.cmList4.length - kongzhiNumber);
            }
            if (this.cmList5.length > kongzhiNumber) {
                cleardata(5, this.cmList5.length - kongzhiNumber);
            }
        };
        BJLGameScene.prototype.renderRoomInfo = function () {
            this.showHeaders();
            this.showCurrentBet();
        };
        /**
         * 显示当前已经下注的筹码数·
         */
        BJLGameScene.prototype.showCurrentBet = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            if (roomInfo.roundStatus != ROOM_STATUS1.SETTLEMENT) {
                var roundBetInfo = roomInfo.roundBetInfo;
                if (roundBetInfo) {
                    for (var key in roundBetInfo) {
                        var num = roundBetInfo[key];
                        this.updateWarScore(2, key, num, true);
                        this.otherPeopleYZ(num, Number(key), null);
                    }
                }
            }
            this.clearNormalJinbi();
            //显示自己的下注
            var mineData = Global.roomProxy.getMineData();
            if (mineData) {
                var data = mineData["betInfo"];
                for (var i in data) {
                    this.updateWarScore(1, i, data[i], false, true);
                }
            }
        };
        BJLGameScene.prototype.zhengBianBei = function () {
            this.xpoker0.showZ2B();
            this.xpoker1.showZ2B();
            this.xpoker2.showZ2B();
            this.zpoker0.showZ2B();
            this.zpoker1.showZ2B();
            this.xpoker2.showZ2B();
        };
        /**
         * 更新每个区域的筹码数量
         * type:1 自己 2: total
         */
        BJLGameScene.prototype.updateWarScore = function (type, warIndex, total, isAdd, isRecont) {
            var n = Number(warIndex);
            var war = this['war' + (n + 1)];
            if (type == 1) {
                war.updateMyValue(total, isAdd, isRecont);
            }
            else {
                war.updateTotalValue(total, isAdd);
            }
        };
        /**
         * 显示玩家头像
         */
        BJLGameScene.prototype.showHeaders = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            //LogUtils.logD("==========roomInfo======="+JSON.stringify(roomInfo));
            var richManList = roomInfo.playerList.richManList;
            //富豪
            var fuhao = richManList[0];
            this.no1header.initWithPlayer(fuhao, 1);
            var luckey = roomInfo.playerList.winRate1st;
            this.luckyheader.initWithPlayer(luckey, 10);
            var mineData = Global.roomProxy.getMineData();
            this.mineheader.initWithPlayer(mineData);
            if (mineData["uid"] == fuhao["pIndex"]) {
                this.no1header.initWithPlayer(mineData, 1);
                "";
            }
            else {
                this.no1header.initWithPlayer(fuhao, 1);
            }
            var index = 2;
            var i = 1;
            while (index < 6) {
                var player = richManList[i];
                var header = this['header' + index];
                index++;
                i++;
                if (!player) {
                    header.visible = false;
                    continue;
                }
                else {
                    header.visible = true;
                }
                header.initWithPlayer(player, i);
            }
            this.pjbh.text = CF.tigc(77) + Global.roomProxy.roomInfo.roundId;
        };
        /**
         * 找寻所有除了1之外的所有头像
         */
        BJLGameScene.prototype.updateTotalByHeaders = function (index, gold) {
            for (var i = 2; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    this['header' + i].updateGold(gold, false);
                }
            }
            if (this.no1header.index == index) {
                this.no1header.updateGold(gold, false);
            }
            if (this.luckyheader.index == index) {
                this.luckyheader.updateGold(gold, false);
            }
        };
        BJLGameScene.prototype.showXianPai = function (num) {
            for (var i = 0; i < num.length; i++) {
                if (i == 2) {
                    if (!this.xpoker2.isZhengPoker)
                        this.addMiFanPai(1, this.xpoker2);
                }
                else {
                    var poker = this["xpoker" + i];
                    poker.initWithNum(num[i]);
                    if (!poker.isZhengPoker)
                        poker.pokerScaleAni();
                }
            }
        };
        BJLGameScene.prototype.showZhuangPai = function (num) {
            for (var i = 0; i < num.length; i++) {
                if (i == 2) {
                    if (!this.zpoker2.isZhengPoker)
                        this.addMiFanPai(2, this.zpoker2);
                }
                else {
                    var poker = this["zpoker" + i];
                    poker.initWithNum(num[i]);
                    if (!poker.isZhengPoker)
                        poker.pokerScaleAni();
                }
            }
        };
        /**smart
         * 展示庄闲得点数
         *  */
        BJLGameScene.prototype.showZhuangXianDian = function (roomInfo) {
            this.xdian.visible = true;
            this.xdian.text = roomInfo.idlePoint + "."; //点数	
            this.zdian.visible = true;
            this.zdian.text = roomInfo.bankerPoint + "."; //点数
        };
        BJLGameScene.prototype.s_roundSettlement = function (e) {
            var _this = this;
            var data = e.data;
            //smart
            this.miPai.visible = false;
            var roomInfo = Global.roomProxy.roomInfo;
            if (roomInfo.playway == 2) {
                this.showXianPai(roomInfo.idleCard);
                this.showZhuangPai(roomInfo.bankerCard);
                this.showZhuangXianDian(roomInfo);
            }
            //smart
            //LogUtils.logD("==========结算数据=========="+JSON.stringify(data));
            this.winPlayers = [];
            this.changeRoomStatus(ROOM_STATUS1.SETTLEMENT);
            var winer = data.compareResult; //赢家
            var winZone = data.winZone;
            var playerwim = data.playerWinInfo;
            var failZone = data.failZone;
            var myInfo = data.myInfo;
            var lists = [];
            var list;
            for (var i = 0; i < failZone.length; i++) {
                list = this["cmList" + (failZone[i] + 1)];
                lists.push(list);
            }
            if (myInfo) {
                if (myInfo["gainGold"] > 0) {
                    this.winPlayers.push(this.mineheader);
                }
            }
            for (var i in playerwim) {
                var p = this.getHeaderByIndex(i);
                if (p) {
                    this.winPlayers.push(p);
                }
            }
            async.waterfall([
                function (callback) {
                    _this.showWin(winer);
                    for (var i = 0; i < winZone.length; i++) {
                        _this["war" + (winZone[i] + 1)].winAni();
                    }
                    callback();
                },
                function (callback) {
                    _this.group2Group(lists, winZone);
                    callback();
                },
                function (callback) {
                    _this.setAutoTimeout(function () {
                        _this.shouPaiAni();
                    }, _this, 1800);
                    //飘分
                    if (myInfo) {
                        if (myInfo["gainGold"] > 0) {
                            // if (!this.playerDb) {
                            _this.playerDb = new DBComponent("bjl_win2_vn");
                            _this.mineheader.addDb(_this.playerDb);
                            _this.playerDb.resetPosition();
                            _this.playerDb.verticalCenter = -30;
                            _this.playerDb.horizontalCenter = 0;
                            // }
                            // this.mineheader.addDb(this.playerDb);
                            _this.playerDb.playNamesAndLoop(["bjl_win2_vn", "bjl_win2_loop_vn"]);
                            _this.mineheader.showLiushuiLabel(myInfo["gainGold"]);
                        }
                        _this.mineheader.updateGold(myInfo["totalGold"]);
                        // this.setAutoTimeout(() => {
                        // 	this.playerDb.stop();
                        // 	game.UIUtils.removeSelf(this.playerDb);
                        // }, this, 3000);
                    }
                },
            ], function (data, callback) {
            });
        };
        /**
         * 显示输赢
         */
        BJLGameScene.prototype.showWin = function (player) {
            var _this = this;
            this.shuyinGroup.visible = true;
            var name;
            var name1;
            var houzhui = TextUtils.instance.currentAniStr;
            switch (player) {
                case 0:
                    name = "win_zy" + houzhui;
                    name1 = "win_zy_loop" + houzhui;
                    break;
                case 1:
                    name = "win_xy" + houzhui;
                    name1 = "win_xy_loop" + houzhui;
                    break;
                case 3:
                    name = "win_hj" + houzhui;
                    name1 = "win_hj_loop" + houzhui;
                    break;
            }
            this.shuyinGroup.removeChildren();
            this.winerDb = new DBComponent("win" + TextUtils.instance.currentAniStr);
            this.shuyinGroup.addChild(this.winerDb);
            this.winerDb.visible = false;
            this.winerDb.resetPosition();
            this.winerDb.verticalCenter = 0;
            this.winerDb.horizontalCenter = 0;
            this.winerDb.play(name, 1);
            this.winerDb.callback = function () {
                _this.winerDb.play(name1, 2);
                _this.winerDb.callback = function () {
                    _this.winerDb.visible = false;
                    game.UIUtils.removeSelf(_this.winerDb);
                };
            };
        };
        /**
         * Group飞Group
         */
        BJLGameScene.prototype.group2Group = function (starLists, endGroup) {
            var _this = this;
            var allCms = [];
            for (var i = 0; i < starLists.length; i++) {
                allCms = allCms.concat(starLists[i]);
            }
            var cm;
            var item;
            var gp2;
            var point;
            while (allCms.length > 0) {
                cm = allCms.pop();
                item = endGroup[Math.floor(Math.random() * endGroup.length)];
                this["cmList" + (item + 1)].push(cm);
                gp2 = this["gp" + (item + 1)];
                point = gp2.globalToLocal(cm.localToGlobal().x, cm.localToGlobal().y);
                cm.x = point.x;
                cm.y = point.y;
                gp2.addChild(cm);
                egret.Tween.get(cm).to({
                    x: _.random(25, (gp2.width - cm.width * 0.2)),
                    y: _.random(25, (gp2.height - cm.height * 0.2))
                }, _.random(300, 600));
            }
            this.setAutoTimeout(function () {
                var cm1;
                var starArray = [];
                if (endGroup.length > 1) {
                    if (_this.winPlayers.length > 0) {
                        var index = endGroup.pop();
                        var gp1 = _this["gp" + (index + 1)];
                        var list1 = _this["cmList" + (index + 1)];
                        _this.g2ps(_this.winPlayers, list1, gp1);
                        _this.qufen(endGroup);
                    }
                    else {
                        _this.qufen(endGroup);
                    }
                }
                else {
                    _this.winer1Zone(endGroup);
                }
            }, this, 1000);
        };
        /**
         * qufen
         */
        BJLGameScene.prototype.qufen = function (endGroup) {
            var cmsArray2;
            var gp2;
            for (var i = 0; i < endGroup.length; i++) {
                cmsArray2 = this["cmList" + (endGroup[i] + 1)];
                gp2 = this["gp" + (endGroup[i] + 1)];
                this.movieGroup(gp2, cmsArray2);
            }
        };
        /**
         *胜利区域1个
         */
        BJLGameScene.prototype.winer1Zone = function (endGroup) {
            var _this = this;
            var starArray = this["cmList" + (endGroup[0] + 1)];
            var group = this["gp" + (endGroup[0] + 1)];
            var n = Math.floor(starArray.length / 4);
            var list;
            var list3;
            if (this.winPlayers.length > 0) {
                list = starArray.splice(0, n);
                list3 = starArray;
                this.g2ps(this.winPlayers, list, group);
                this.setAutoTimeout(function () {
                    _this.movieGroup(group, list3);
                }, this, 100);
            }
            else {
                this.movieGroup(group, starArray);
            }
        };
        /**
         * group飞向玩家列表的动画
         */
        BJLGameScene.prototype.movieGroup = function (gp, list) {
            var _this = this;
            var _loop_1 = function () {
                var cm = list.pop();
                var point = gp.globalToLocal(this_1.playersBtn.localToGlobal().x + 30, this_1.playersBtn.localToGlobal().y + 30);
                egret.Tween.get(cm).to({
                    x: point.x,
                    y: point.y
                }, _.random(300, 600)).call(function () {
                    game.UIUtils.removeSelf(cm);
                    ObjectPool.reclaim("bjl_cm", cm);
                });
            };
            var this_1 = this;
            while (list.length > 0) {
                _loop_1();
            }
            this.setAutoTimeout(function () {
                _this.clearRoom();
            }, this, 1000);
        };
        /**
         * group飞玩家们；
         */
        BJLGameScene.prototype.g2ps = function (players, lists, group) {
            var _loop_2 = function () {
                var cm = lists.pop();
                var num = _.random(0, this_2.winPlayers.length - 1);
                var player = players[num];
                var point = void 0;
                if (player == this_2.luckyheader) {
                    point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
                }
                if (player == this_2.no1header) {
                    point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
                }
                if (player == this_2.mineheader) {
                    point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
                }
                else {
                    if (player) {
                        point = group.globalToLocal((player.localToGlobal().x + player.width / 2), (player.localToGlobal().y + player.height / 2));
                    }
                }
                if (point) {
                    egret.Tween.get(cm).to({
                        x: point.x,
                        y: point.y
                    }, _.random(300, 600)).call(function () {
                        game.UIUtils.removeSelf(cm);
                        ObjectPool.reclaim("bjl_cm", cm);
                    });
                }
            };
            var this_2 = this;
            while (lists.length > 0) {
                _loop_2();
            }
        };
        BJLGameScene.prototype.getHeaderByIndexType1 = function (index) {
            for (var i = 2; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return this['header' + i];
                }
            }
            return null;
        };
        /**
         * 根据坐标找到头像
         * @param  {} index
         */
        BJLGameScene.prototype.getHeaderByIndex = function (index) {
            for (var i = 2; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return this['header' + i];
                }
            }
            if (this.no1header.index == index) {
                return this.no1header;
            }
            if (this.luckyheader.index == index) {
                return this.luckyheader;
            }
            return null;
        };
        /**
         * 根据坐标找到头像
         * @param  {} index
         */
        BJLGameScene.prototype.getHeaderMovieType = function (index) {
            for (var i = 2; i <= 3; i++) {
                if (this['header' + i].index == index) {
                    return 3;
                }
            }
            for (var i = 4; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return 5;
                }
            }
            if (this.no1header.index == index) {
                return 6;
            }
            if (this.luckyheader.index == index) {
                return 7;
            }
            if (this.mineheader.index == index) {
                return 1;
            }
        };
        /**
         * 显示幸运星的选择
         */
        // private start2Move(betInfo, ani, camp?) {
        // 	if (ani) {
        // 		let moveX = 0;
        // 		let type1 = betInfo[1];
        // 		let type2 = betInfo[2];
        // 		let type3 = betInfo[3];
        // 		if (!type1 && !type2 && !type3) {
        // 			return;
        // 		};
        // 		if (!type1 && !type2) {
        // 		} else {
        // 			moveX = !!type2 ? 585 : 225;
        // 			if (this.luckStar.x == 1000) {
        // 				egret.Tween.get(this.luckStar).to({
        // 					x: moveX
        // 				}, 800, egret.Ease.sineIn);
        // 			} else {
        // 				this.luckStar.x = moveX;
        // 			}
        // 		}
        // 		if (!type3) {
        // 		} else {
        // 			if (this.luckStar0.x == 1000) {
        // 				egret.Tween.get(this.luckStar0).to({
        // 					x: 470,
        // 					y: 150
        // 				}, 800, egret.Ease.sineIn);
        // 			} else {
        // 				this.luckStar0.x = 470;
        // 				this.luckStar0.y = 150;
        // 			}
        // 		}
        // 	} else {
        // 		let moveX1 = 0;
        // 		let camp1 = camp[1];
        // 		let camp2 = camp[2];
        // 		let camp3 = camp[3];
        // 		if (!camp1 && !camp2 && !camp3) {
        // 			return;
        // 		}
        // 		if (!camp1 && !camp2) {
        // 		} else {
        // 			moveX1 = !!camp2 ? 585 : 225;
        // 			this.luckStar.x = moveX1;
        // 		}
        // 		if (!camp3) {
        // 		} else {
        // 			this.luckStar0.x = 470;
        // 			this.luckStar0.y = 150;
        // 		}
        // 	}
        // }
        /**
         *桌面上玩家下注，非自己和players
         */
        BJLGameScene.prototype.s_playerBet = function (e) {
            var _this = this;
            var data = e.data;
            //smart
            // this.zhengBianBei();
            var betInfo = data.betInfo;
            var playerIndex = data.pIndex;
            var updateHeaderAndMove = function (playerHeader, moveType) {
                if (playerHeader) {
                    var total_1 = 0;
                    for (var type in betInfo) {
                        var typeJSON = betInfo[type];
                        for (var numValue in typeJSON) {
                            var typeNumber = typeJSON[numValue];
                            for (var i = 0; i < typeNumber; i++) {
                                //smart
                                playerHeader.headerMovie(moveType);
                                _this.playerYZ(parseInt(numValue), parseInt(type), playerHeader);
                            }
                        }
                        var typeTotal = _this.getBetInfoTotalByType(betInfo, type);
                        total_1 += typeTotal;
                        _this.updateWarScore(2, type, typeTotal, true);
                    }
                    //this.updateGoldByHeader(playerHeader, total * -1, true, false);
                }
                else {
                    //LogUtils.logD(playerHeader.index + "不存在")
                }
            };
            var isLucky = false;
            var isNo1 = false;
            var total = this.getBetInfoTotal(betInfo);
            if (playerIndex == this.luckyheader.index) {
                isLucky = true;
                //this.start2Move(betInfo, true);
                if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                    //this.luckyheader.updateGold(total * -1, true);
                }
                else {
                    updateHeaderAndMove(this.luckyheader, 7);
                }
            }
            if (playerIndex == this.no1header.index) {
                isNo1 = true;
                if (Global.roomProxy.checkIndexIsMe(playerIndex) || isLucky) {
                    //this.no1header.updateGold(total * -1, true);
                }
                else {
                    updateHeaderAndMove(this.no1header, 6);
                }
            }
            var playerHeader = this.getHeaderByIndexType1(playerIndex);
            updateHeaderAndMove(playerHeader, this.getHeaderMovieType(playerIndex));
            // if (playerHeader) {
            // 	if (Global.roomProxy.checkIndexIsMe(playerHeader.index)) {
            // 		playerHeader.updateGold(total * -1, true);
            // 	} else {
            // 		updateHeaderAndMove(playerHeader, this.getHeaderMovieType(playerIndex));
            // 	}
            // }
        };
        BJLGameScene.prototype.countdown = function (e) {
            var data = e.data;
            var roomInfo = Global.roomProxy.roomInfo;
            if (!roomInfo.countdown) {
                roomInfo.countdown = {};
            }
            roomInfo.countdown = data;
            game.DateTimeManager.instance.updateServerTime(data.start);
        };
        /**
         * 房间刷新,处理玩家列表
         */
        BJLGameScene.prototype.s_roomInfo = function (e) {
            this.clearRoom();
            this.changeRoomStatus(ROOM_STATUS1.FREE);
            this.onLineCards(3);
            //this.vsMovie(2);如有，在处理
            //修改玩家头像
            var data = e.data;
            var players = Global.roomProxy.roomInfo.players;
            Global.roomProxy.roomInfo = data;
            Global.roomProxy.roomInfo.players = players;
            this.showHeaders();
            CF.dP(ENo.ROOM_FULSH);
            this.playersBtn.labelDisplay.text = data.playerList.playerCount;
        };
        BJLGameScene.prototype.s_roomStopBet = function () {
            this.changeRoomStatus(ROOM_STATUS1.STOP);
            if (TextUtils.instance.isChinese()) {
                rbwar.RBWUtils.beignOrStop(2); //声音文件
            }
            this.timeBar.visible = false;
        };
        BJLGameScene.prototype.s_roomStartBet = function (e) {
            var _this = this;
            this.roomState.visible = false;
            this.vsDBComponent.play("bjl_notice" + TextUtils.instance.currentAniStr, 1);
            if (TextUtils.instance.isChinese()) {
                SoundManager.getInstance().playEffect("bjl_ksxz_mp3");
            }
            this.vsDBComponent.callback = function () {
                _this.vsDBComponent.visible = false;
            };
            egret.setTimeout(function () {
                _this.changeRoomStatus(ROOM_STATUS1.BET);
                _this.timeBar.visible = true;
                _this.roomState.visible = true;
                _this.lockYZ = true;
            }, this, 1800);
        };
        /**
         * 改变房间状态
         */
        BJLGameScene.prototype.changeRoomStatus = function (status) {
            var roomInfo = Global.roomProxy.roomInfo;
            if (roomInfo) {
                roomInfo.roundStatus = status;
                this.showRoomStatus();
            }
        };
        /**
         * 开始新游戏
         */
        BJLGameScene.prototype.startNewRound = function (e) {
            this.roomState.visible = true;
            this.mineheader.lsfalse();
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.bankerCard = null;
            roomInfo.idleCard = null;
            roomInfo.bankerPoint = null;
            roomInfo.idlePoint = null;
            //smart
            roomInfo.idleInitCards = null;
            roomInfo.bankerInitCards = null;
            roomInfo.bankerAddCards = null;
            roomInfo.idleAddCards = null;
            if (this.playerDb) {
                this.playerDb.stop();
                game.UIUtils.removeSelf(this.playerDb);
            }
            //smart
            this.cleanCards();
            //smart
            this.starCardsAin();
            this.zpokerGroup.visible = true;
            this.xpokerGroup.visible = true;
            this.dqjs.text = CF.tigc(136) + (roomInfo.wayBillInfo.length + 1);
            this.changeRoomStatus(ROOM_STATUS1.START);
        };
        /**
         * 收到开牌消息
         */
        BJLGameScene.prototype.roomInitHandCards = function (e) {
            var data = e.data;
            this.openCards(data);
        };
        /**
         * 收到咪牌消息
         */
        BJLGameScene.prototype.getMiPaiCards = function (e) {
            //庄或者闲咪牌
        };
        /**
         * 断线重连后牌的2种展示；
         * 1,展示背面。
         * 3，隐藏。
         * 2，展示正面并赋值。
         */
        BJLGameScene.prototype.onLineCards = function (type) {
            if (type == 1) {
                this.zpokerGroup.visible = true;
                this.xpokerGroup.visible = true;
                for (var i = 0; i < 2; i++) {
                    var card = this["zpoker" + i];
                    var card1 = this["xpoker" + i];
                    card.visible = card1.visible = true;
                }
            }
            else if (type == 3) {
                //samrt
                this.zpokerGroup.visible = false;
                this.xpokerGroup.visible = false;
                this.haveshowShouPaiAni = false;
                // this.zpokerGroup.visible = true;
                // this.xpokerGroup.visible = true;
            }
            else {
                var data = Global.roomProxy.roomInfo;
                if (!data) {
                    return;
                }
                var openCardInfo = data.openCardInfo;
            }
        };
        BJLGameScene.prototype.showCards = function () {
            LogUtils.logD("======showCards======");
            var room = Global.roomProxy.roomInfo;
            if (room.bankerCard && room.idleCard) {
                this.initIdleCard(room.idleCard);
                this.initBankerCard(room.bankerCard);
            }
            if (room.bankerPoint != null && room.bankerPoint != undefined && room.bankerPoint > -1) {
                this.zdian.visible = true;
                this.zdian.text = room.bankerPoint + ".";
            }
            if (room.idlePoint != null && room.idlePoint != undefined && room.idlePoint > -1) {
                this.xdian.visible = true;
                this.xdian.text = room.idlePoint + ".";
            }
        };
        /**
         * 展示玩家总人数
         */
        BJLGameScene.prototype.showPlayers = function () {
            var data = Global.roomProxy.roomInfo;
            var playerList = data.playerList;
            var playerCount = playerList.playerCount;
            this.playersBtn.labelDisplay.text = playerCount;
        };
        /**
         * 清理牌，回到最初位置
         */
        BJLGameScene.prototype.cleanCards = function () {
            for (var i = 0; i < 3; i++) {
                var card = this["zpoker" + i];
                var card1 = this["xpoker" + i];
                card.showZ2B();
                card1.showZ2B();
                card.visible = card1.visible = false;
            }
            this.zdian.visible = false;
            this.xdian.visible = false;
        };
        /**
         * 发牌两张牌。
         */
        BJLGameScene.prototype.starCardsAin = function () {
            return __awaiter(this, void 0, void 0, function () {
                var count, i, poker;
                return __generator(this, function (_a) {
                    this.cleanCards();
                    count = 0;
                    for (i = 0; i < 4; i++) {
                        poker = this.getNewCar();
                        poker.name = "poker" + i;
                        this.fapaiGroup.addChild(poker);
                        poker.x = 0;
                        poker.y = 0;
                        poker.rotation = -45;
                        poker.scaleX = poker.scaleY = 0.3;
                        if (i < 2) {
                            this.starCardsAin_1(poker, this.xpokerGroup, i, i, count);
                        }
                        else {
                            this.starCardsAin_1(poker, this.zpokerGroup, i - 2, i, count);
                        }
                        this.updatePaiCount();
                        count++;
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 补牌
         * num=1闲补牌，num=2庄补牌
         */
        BJLGameScene.prototype.bupaiAin = function (num) {
            var poker = this.getNewCar();
            this.fapaiGroup.addChild(poker);
            poker.x = 0;
            poker.y = 0;
            poker.rotation = -45;
            poker.scaleX = poker.scaleY = 0.3;
            if (num == 1) {
                this.bupaiAin_1(poker, this.xpoker2, 1, this.xpokerGroup);
            }
            if (num == 2) {
                this.bupaiAin_1(poker, this.zpoker2, 2, this.zpokerGroup);
            }
        };
        /**咪牌补牌
         * num=1闲补牌，num=2庄补牌
        */
        BJLGameScene.prototype.buPaiAni_MI = function (num) {
            var poker = this.getNewCar();
            this.fapaiGroup.addChild(poker);
            poker.x = 0;
            poker.y = 0;
            poker.rotation = -45;
            poker.scaleX = poker.scaleY = 0.3;
            if (num == 1) {
                this.buPaiAniMi_1(poker, this.xpoker2, 1, this.xpokerGroup);
            }
            if (num == 2) {
                this.buPaiAniMi_1(poker, this.zpoker2, 2, this.zpokerGroup);
            }
        };
        /**
         * 补牌动画
         */
        BJLGameScene.prototype.bupaiAin_1 = function (poker, card, index, group) {
            var _this = this;
            this.updatePaiCount();
            var point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
            group.addChild(poker);
            poker.x = point.x;
            poker.y = point.y;
            if (Global.runBack) {
                poker.x = card.x;
                poker.y = card.y;
                poker.rotation = -90;
                poker.scaleX = poker.scaleY = 0.6;
                card.visible = true;
                poker.visible = false;
                card.showB2Z();
                if (index == 1) {
                    this.xdian.visible = true;
                    this.xdian.text = this.xianValue + "."; //点数
                }
                else {
                    this.zdian.visible = true;
                    this.zdian.text = this.zhuangValue + "."; //点数
                }
                return;
            }
            SoundManager.getInstance().playEffect("bjl_fp_mp3");
            egret.Tween.get(poker).to({ x: card.x, y: card.y, rotation: -90, scaleX: 0.6, scaleY: 0.6 }, 300).call(function () {
                card.visible = true;
                poker.visible = false;
            }).wait(500).call(function () {
                egret.Tween.get(card).to({ scaleX: 0 }, 150).call(function () { card.showB2Z(); }).to({ scaleX: 0.6 }, 150).call(function () {
                    if (index == 1) {
                        _this.xdian.visible = true;
                        _this.xdian.text = _this.xianValue + "."; //点数
                    }
                    else {
                        _this.zdian.visible = true;
                        _this.zdian.text = _this.zhuangValue + "."; //点数
                    }
                });
            });
        };
        /**咪牌补牌动画 */
        BJLGameScene.prototype.buPaiAniMi_1 = function (poker, card, index, group) {
            this.updatePaiCount();
            var point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
            group.addChild(poker);
            poker.x = point.x;
            poker.y = point.y;
            if (Global.runBack) {
                poker.x = card.x;
                poker.y = card.y;
                poker.rotation = -90;
                poker.scaleX = poker.scaleY = 0.6;
                card.visible = true;
                poker.visible = false;
                //card.showB2Z();
                return;
            }
            SoundManager.getInstance().playEffect("bjl_fp_mp3");
            egret.Tween.get(poker).to({ x: card.x, y: card.y, rotation: -90, scaleX: 0.6, scaleY: 0.6 }, 300).call(function () {
                card.visible = true;
                poker.visible = false;
            }).wait(500).call(function () {
            });
        };
        /**咪牌 补牌
         * 翻牌动画 1闲 2庄
         */
        BJLGameScene.prototype.addMiFanPai = function (index, card) {
            egret.Tween.get(card).to({ scaleX: 0 }, 150).call(function () { card.showB2Z(); }).to({ scaleX: 0.6 }, 150).call(function () {
            });
        };
        /**
         * 发牌刷新数量
         */
        BJLGameScene.prototype.updatePaiCount = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.remainNum--;
            roomInfo.usedNum++;
            this.fpaiNums.text = roomInfo.remainNum + "";
            this.feipaiNums.text = roomInfo.usedNum + "";
        };
        /**
         * 发牌动画
         */
        BJLGameScene.prototype.starCardsAin_1 = function (poker, group, i, j, count) {
            return __awaiter(this, void 0, void 0, function () {
                var point, card;
                return __generator(this, function (_a) {
                    point = group.globalToLocal(poker.localToGlobal().x, poker.localToGlobal().y);
                    poker.x = point.x;
                    poker.y = point.y;
                    group.addChild(poker);
                    if (j < 2) {
                        card = this["xpoker" + i];
                    }
                    else {
                        card = this["zpoker" + i];
                    }
                    this.setAutoTimeout(function () {
                        SoundManager.getInstance().playEffect("bjl_fp_mp3");
                    }, this, 300 * count);
                    egret.Tween.get(poker).wait(300 * count).to({ x: card.x, y: card.y, scaleX: 0.6, scaleY: 0.6, rotation: 0 }, 300);
                    this.setAutoTimeout(function () {
                        card.visible = true;
                        poker.visible = false;
                    }, this, 300 * count + 300);
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 开牌动画
         */
        BJLGameScene.prototype.openCards = function (num) {
            var _this = this;
            this.roomState.visible = false;
            var cd1 = num["camp1"];
            var cd2 = num["camp2"];
            this.xianValue = cd1["value"];
            this.xianCards = cd1["cards"];
            this.zhuangCards = cd2["cards"];
            this.zhuangValue = cd2["value"];
            this.xpaisValue(this.xianCards);
            this.zpaisValue(this.zhuangCards);
            this.setAutoTimeout(function () {
                _this.openCardsAni();
            }, this, 200);
        };
        /**
         * 庄家牌赋值
         */
        BJLGameScene.prototype.zpaisValue = function (num) {
            for (var i = 0; i < num.length; i++) {
                this["zpoker" + i].initWithNum(num[i]);
            }
        };
        BJLGameScene.prototype.initBankerCard = function (bankerCard) {
            for (var i = 0; i < bankerCard.length; i++) {
                this["zpoker" + i].visible = true;
                this["zpoker" + i].showB2Z();
                this["zpoker" + i].initWithNum(bankerCard[i]);
            }
        };
        BJLGameScene.prototype.initIdleCard = function (bankerCard) {
            for (var i = 0; i < bankerCard.length; i++) {
                this["xpoker" + i].visible = true;
                this["xpoker" + i].showB2Z();
                this["xpoker" + i].initWithNum(bankerCard[i]);
            }
        };
        /**
         * 闲家牌赋值
         */
        BJLGameScene.prototype.xpaisValue = function (num) {
            for (var i = 0; i < num.length; i++) {
                this["xpoker" + i].initWithNum(num[i]);
            }
        };
        /**
         * 开牌动画
         */
        BJLGameScene.prototype.openCardsAni = function () {
            var _this = this;
            if (Global.runBack) {
                this.xpoker0.showB2Z();
                this.xpoker1.showB2Z();
                this.zpoker0.showB2Z();
                this.zpoker1.showB2Z();
                if (this.xianCards.length == 3) {
                    this.bupaiAin(1);
                }
                else {
                    this.xdian.visible = true;
                    this.xdian.text = this.xianValue + "."; //点数					
                }
                if (this.zhuangCards.length == 3) {
                    this.bupaiAin(2);
                }
                else {
                    this.zdian.visible = true;
                    this.zdian.text = this.zhuangValue + "."; //点数							}						
                }
                return;
            }
            var time = 200 + 150;
            this.xpoker0.pokerScaleAni();
            this.setAutoTimeout(function () {
                _this.xpoker1.pokerScaleAni();
            }, this, time);
            this.setAutoTimeout(function () {
                _this.zpoker0.pokerScaleAni();
            }, this, time * 2 + 150);
            this.setAutoTimeout(function () {
                _this.zpoker1.pokerScaleAni();
            }, this, time * 3 + 150);
            this.setAutoTimeout(function () {
                if (_this.xianCards.length == 3) {
                    _this.bupaiAin(1);
                }
                else {
                    _this.xdian.visible = true;
                    _this.xdian.text = _this.xianValue + "."; //点数					
                }
            }, this, 1500);
            this.setAutoTimeout(function () {
                if (_this.zhuangCards.length == 3) {
                    _this.bupaiAin(2);
                }
                else {
                    _this.zdian.visible = true;
                    _this.zdian.text = _this.zhuangValue + "."; //点数							}						
                }
            }, this, 2000);
            // egret.Tween.get(this.xpoker0).to({ scaleX: 0 }, 200).call(() => { this.xpoker0.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
            // 	egret.Tween.get(this.xpoker1).to({ scaleX: 0 }, 150).call(() => { this.xpoker1.showB2Z() }).to({ scaleX: 0.6 }, 150).wait(100).call(() => {
            // 		egret.Tween.get(this.zpoker0).to({ scaleX: 0 }, 150).call(() => { this.zpoker0.showB2Z() }).to({ scaleX: 0.6 }, 150).call(() => {
            // 			egret.Tween.get(this.zpoker1).to({ scaleX: 0 }, 150).call(() => { this.zpoker1.showB2Z() }).to({ scaleX: 0.6 }, 150).wait(100).call(() => {
            // 				if (this.xianCards.length == 3) {
            // 					this.bupaiAin(1);
            // 				} else {
            // 					this.xdian.visible = true;
            // 					this.xdian.text = this.xianValue + ".";//点数					
            // 				}
            // 			}).wait(600).call(() => {
            // 				if (this.zhuangCards.length == 3) {
            // 					this.bupaiAin(2);
            // 				} else {
            // 					this.zdian.visible = true;
            // 					this.zdian.text = this.zhuangValue + ".";//点数							}						
            // 				}
            // 			})
            // 		});
            // 	});
            // });
        };
        /**
         * 获取一张牌
         */
        BJLGameScene.prototype.getNewCar = function () {
            var card = ObjectPool.produce("poker", bjle.BJLPoker);
            if (!card) {
                card = new bjle.BJLPoker();
            }
            return card;
        };
        /**
         * 玩家加入，废弃
         */
        BJLGameScene.prototype.playerEnter = function (e) {
            var roomInfo = Global.roomProxy.roomInfo;
            var richManList = roomInfo.playerList.richManList;
            var data = e.data;
            //	richManList.push(data.player);
            //this.updateRichManNum();
        };
        /**
         * 筹码选择
         */
        BJLGameScene.prototype.rbwarTouch = function (e) {
            var data = e.data;
            this.currentMoney = data;
            this.showTouchValue(this.currentMoney);
        };
        /**
         * 选那个那个亮
         */
        BJLGameScene.prototype.showTouchValue = function (value) {
            for (var i = 1; i <= 4; i++) {
                var yzBtn = this['yzbtn' + i];
                yzBtn.setTouchon(value);
            }
        };
        /**
         * 押庄
         */
        BJLGameScene.prototype.yzZhuang = function () {
            this.sendBetByMine(0);
        };
        /**
         * 押闲
         */
        BJLGameScene.prototype.yzXian = function () {
            this.sendBetByMine(1);
        };
        /**
         * 押庄对
         */
        BJLGameScene.prototype.yzZhuangDui = function () {
            this.sendBetByMine(2);
        };
        /**
         * 押和
         */
        BJLGameScene.prototype.yzHe = function () {
            this.sendBetByMine(3);
        };
        /**
         * 押闲对
         */
        BJLGameScene.prototype.yzXianDui = function () {
            this.sendBetByMine(4);
        };
        /**
         * 自己下注
         */
        BJLGameScene.prototype.sendBetByMine = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var currentMoney, player, data, info, path, jinbi, resp, max;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.lockYZ) {
                                this.showTips(CF.tigc(138));
                                return [2 /*return*/];
                            }
                            currentMoney = this.currentMoney;
                            player = Global.roomProxy.getMineData();
                            if (player.gold < currentMoney) {
                                this.showTips(CF.tigc(139));
                                return [2 /*return*/];
                            }
                            this.mineheader.headerMovie(1);
                            player.gold -= currentMoney;
                            this.mineheader.updateGold(player.gold);
                            this.updateWarScore(1, type, currentMoney, true);
                            this.updateWarScore(2, type, currentMoney, true);
                            data = { betInfo: {} };
                            info = data.betInfo[type] = {};
                            info[currentMoney] = 1;
                            path = ServerPostPath.game_bccaratHandler_c_bet;
                            jinbi = this.playerYZ(currentMoney, type, this.mineheader);
                            return [4 /*yield*/, Global.pomelo.request(path, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                if (resp.error.code == ErrorCode.BJL_BIGER2GOLD) {
                                    max = Global.roomProxy.roomInfo.zoneBetMax[type];
                                    this.showTips(TextUtils.instance.setTextById(124, {
                                        "1": max
                                    }));
                                }
                                else {
                                    this.showTips(resp.error.msg);
                                }
                                // this.noXiazhuCount = 0;
                                player.gold += currentMoney;
                                this.updateWarScore(1, type, -currentMoney, true);
                                this.updateWarScore(2, type, -currentMoney, true);
                                this.mineheader.updateGold(player.gold);
                                this.coin2Component(jinbi, type, this.mineheader);
                            }
                            else {
                                player.betInfo = resp;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        BJLGameScene.prototype.showTips = function (text) {
            var _this = this;
            if (!this.tipsGroup.visible) {
                this.tipsGroup.visible = true;
                this.tipsGroup.alpha = 0;
            }
            this.tipsLabel.text = text;
            this.tipsGroup.width = this.tipsLabel.width + 100;
            egret.Tween.removeTweens(this.tipsGroup);
            egret.Tween.get(this.tipsGroup).to({
                alpha: 1
            }, 100).wait(1000).to({
                alpha: 0
            }, 100).call(function () {
                _this.tipsGroup.visible = false;
            });
        };
        /**
         * 任何玩家下注
         * @param  {number} num
         * @param  {number} type
         * @param  {eui.Component} component:那个玩家
         */
        BJLGameScene.prototype.playerYZ = function (value, type, component) {
            if (component != this.playersBtn) {
                rbwar.RBWUtils.minePlayFjb(); //声音文件
            }
            var index = this.cmNumList.indexOf(value) + 1;
            var jinbi = this.getNewBJLCm(index, value);
            if (component == null) {
                this.coinMoveAni(jinbi, type, null);
            }
            else {
                var startPoint = component.localToGlobal();
                this.coinMoveAni(jinbi, type, startPoint);
            }
            return jinbi;
        };
        /**
         * 金币从group飞回来
         */
        BJLGameScene.prototype.coin2Component = function (jinbi, type, component) {
            var _this = this;
            var group = this['gp' + (type + 1)];
            var point1 = component.localToGlobal();
            var point = group.globalToLocal(point1.x + 50, point1.y + 50);
            egret.Tween.removeTweens(jinbi);
            egret.Tween.get(jinbi).to({
                x: point.x,
                y: point.y
            }, _.random(200, 400)).call(function () {
                game.UIUtils.removeSelf(jinbi);
                game.Utils.removeArrayItem(_this['cmList' + (type + 1)], jinbi);
            });
        };
        /**
         * 金币move动画
         * @param  {RBWarYzBtn} jinbi
         * @param  {number} type
         * @param  {egret.Point} startPoint
         */
        BJLGameScene.prototype.coinMoveAni = function (jinbi, type, startPoint) {
            var group = this['gp' + (type + 1)];
            game.UIUtils.setAnchorPot(jinbi);
            jinbi.rotation = 0;
            if (!startPoint) {
                group.addChild(jinbi);
                jinbi.scaleX = jinbi.scaleY = 0.4;
                jinbi.x = _.random(20, group.width - jinbi.width * 0.15);
                jinbi.y = _.random(20, group.height - jinbi.height * 0.15);
            }
            else {
                jinbi.scaleX = jinbi.scaleY = 0.45;
                startPoint = group.globalToLocal(startPoint.x + 40, startPoint.y + 40);
                jinbi.x = startPoint.x;
                jinbi.y = startPoint.y;
                group.addChild(jinbi);
                egret.Tween.get(jinbi).to({
                    x: _.random(20, group.width - jinbi.width * 0.15),
                    y: _.random(20, group.height - jinbi.height * 0.15),
                    rotation: _.random(0, 360 * 2)
                }, _.random(400, 700), egret.Ease.sineOut).to({
                    scaleX: 0.4,
                    scaleY: 0.4
                }, _.random(300, 500), egret.Ease.sineOut);
            }
            this['cmList' + (type + 1)].push(jinbi);
            return jinbi;
        };
        /**
         * 非场上玩家的押注
         */
        BJLGameScene.prototype.otherPeopleYZ = function (value, type, component) {
            if (component === void 0) { component = this.playersBtn; }
            var numbers = NumberFormat.chaifenScore(this.cmNumList, value);
            for (var key in numbers) {
                var num = numbers[key];
                for (var i = 0; i < num; i++) {
                    this.playerYZ(parseInt(key), type, component);
                }
            }
        };
        /**
         * 在界面打开后重新拉取房间数据
         */
        BJLGameScene.prototype.s_enterResult = function (e) {
            this.cleanCards();
            Global.roomProxy.clearRoomInfo();
            Global.roomProxy.setRoomInfo(e.data);
            CF.sN(SceneNotify.CLOSE_BJLGAME);
            CF.sN(SceneNotify.OPEN_BJLGAME);
            this.roomState.visible = true;
            this.roomState.source = RES.getRes("bjle_game_zbz" + CF.tic);
        };
        /**
         * 超过几局没下注，就踢人。
         */
        BJLGameScene.prototype.s_kickPlayer = function (e) {
            // Global.roomProxy.clearRoomInfo();
            var resp = e.data;
            CF.sN(SceneNotify.CLOSE_BJLGAME);
            CF.sN(SceneNotify.OPEN_BJLHALL);
            Global.alertMediator.closeViewComponent(0);
            Global.alertMediator.addAlert(resp.reason, null, null, true);
        };
        /**
         * 虚拟玩家投注
         */
        BJLGameScene.prototype.vPlayerBet = function (e) {
            var _this = this;
            var data = e.data;
            //smart
            //this.zhengBianBei();
            LogUtils.logD("vplayerbet" + JSON.stringify(data));
            var chuliData = this.getvPlayerBetData(data);
            var _loop_3 = function (j) {
                var temp = chuliData[j];
                this_3.setAutoTimeout(function () {
                    egret.Tween.get(_this.playersBtn).to({ bottom: 122 }, 100).to({ bottom: 132 }, 100);
                    for (var i = 0; i < temp.length; ++i) {
                        var value = temp[i];
                        var n = Number(i);
                        var war = _this['war' + (n + 1)];
                        war.updateTotalValue(value + 0, true);
                        rbwar.RBWUtils.otherPlayFjb(); //声音文件
                        _this.otherPeopleYZ(value + 0, Number(i));
                    }
                    //smart
                    // egret.Tween.get(this.playersBtn).to({ bottom: 122 }, 100).to({ bottom: 132 }, 100);
                    // for (let i in data) {
                    // 	let value = data[i];
                    // 	let n = Number(i);
                    // 	let war = this['war' + (n + 1)];
                    // 	war.updateTotalValue(value + 0, true);
                    // 	rbwar.RBWUtils.otherPlayFjb();//声音文件
                    // 	// if (data[i] == null) {
                    // 	// 	LogUtils.logD("=========")
                    // 	// }
                    // 	this.otherPeopleYZ(value + 0, parseInt(i));
                    // }
                }, this_3, 280 * j);
            };
            var this_3 = this;
            for (var j = 0; j < chuliData.length; ++j) {
                _loop_3(j);
            }
        };
        BJLGameScene.prototype.getvPlayerBetData = function (data) {
            var obj = {};
            var value;
            var min = 0;
            var max = 10000000;
            var arr = [];
            var fen = 3;
            var realData;
            for (var key in data) {
                var temp = this.ranAllo(data[key], min, max, fen, this.cmNumList[0]);
                obj[key] = temp;
                arr.push(temp);
            }
            return _.unzip(arr);
        };
        /**随机等额分配 */
        BJLGameScene.prototype.ranAllo = function (value, min, max, length, danwei) {
            var ran = [], arrId;
            //循环存放数组最小值
            for (var i = 0; i < length; i++) {
                ran[i] = min;
            }
            //计算剩下的值
            var spare = value - (min * length);
            while (spare > 0) {
                //生成数组随机ID
                arrId = Math.round(Math.random() * length);
                if (ran[arrId] < max) {
                    ran[arrId] += danwei;
                    spare -= danwei;
                }
            }
            return ran;
        };
        /**
         * 通过头像更新金币
         */
        BJLGameScene.prototype.updateGoldByHeader = function (header, gold, isAdd, bolen) {
            var _this = this;
            if (Global.roomProxy.checkIndexIsMe(header.index)) {
                this.mineheader.updateGold(0, isAdd);
                this.setAutoTimeout(function () {
                    if (bolen) {
                        _this.mineheader.showLiushuiLabel(gold);
                    }
                }, this, 1000);
            }
            else {
                if (header) {
                    header.updateGold(gold, isAdd);
                }
            }
        };
        /**
         * 通过Index更新金币
         */
        BJLGameScene.prototype.updateGoldByIndex = function (pIndex, gold, isAdd, bolen) {
            var _this = this;
            var header = this.getHeaderByIndex(pIndex);
            if (Global.roomProxy.checkIndexIsMe(pIndex)) {
                this.mineheader.updateGold(0, isAdd);
                this.setAutoTimeout(function () {
                    if (bolen) {
                        _this.mineheader.showLiushuiLabel(gold);
                    }
                }, this, 1000);
            }
            else {
                if (header) {
                    header.updateGold(gold, isAdd);
                }
            }
        };
        /**
         * 获取一波押注的总金额
         */
        BJLGameScene.prototype.getBetInfoTotal = function (betInfo) {
            var total = 0;
            for (var type in betInfo) {
                var typeJSON = betInfo[type];
                for (var numValue in typeJSON) {
                    var sum = Number(numValue) * typeJSON[numValue];
                    total += sum;
                }
            }
            return total;
        };
        /**
         * 获取某一个类型的总投注
         */
        BJLGameScene.prototype.getBetInfoTotalByType = function (betInfo, type) {
            var total = 0;
            var types = betInfo[type];
            if (types) {
                for (var numValue in types) {
                    var sum = Number(numValue) * types[numValue];
                    total += sum;
                }
            }
            return total;
        };
        /**
         * 清理房间数据
         */
        BJLGameScene.prototype.clearRoom = function () {
            for (var i = 0; i < 5; i++) {
                this["gp" + (i + 1)].removeChildren();
                this["cmList" + (i + 1)] = [];
            }
            for (var i = 0; i < 3; i++) {
                this["xpoker" + i].visible = false;
                this["zpoker" + i].visible = false;
            }
            this.zdian.visible = false;
            this.xdian.visible = false;
            this.shuyinGroup.visible = false;
            this.clearWarScores();
        };
        /**
         * 清理所有押注区域的分数
         */
        BJLGameScene.prototype.clearWarScores = function () {
            for (var i = 0; i < 5; i++) {
                this.updateWarScore(1, i, 0, false);
                this.updateWarScore(2, i, 0, false);
            }
        };
        /**
         * 退出
         */
        BJLGameScene.prototype.backBtnTouchEnded = function () {
            return __awaiter(this, void 0, void 0, function () {
                var quitResp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 1:
                            quitResp = _a.sent();
                            if (quitResp) {
                                if (quitResp.error && quitResp.error.code != 0) {
                                    Global.alertMediator.addAlert(quitResp.error.msg, function () {
                                    }, null, true);
                                    if (quitResp.error.code != -200) {
                                        CF.sN(SceneNotify.CLOSE_BJLGAME);
                                        CF.sN(SceneNotify.OPEN_BJLHALL);
                                    }
                                    return [2 /*return*/];
                                }
                                // Global.roomProxy.clearRoomInfo();
                                if (quitResp.gold != undefined && quitResp.gold != null) {
                                    Global.playerProxy.playerData.gold = quitResp.gold;
                                }
                                CF.sN(SceneNotify.CLOSE_BJLGAME);
                                CF.sN(SceneNotify.OPEN_BJLHALL);
                                return [2 /*return*/];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 断线重连
         */
        BJLGameScene.prototype.reconnectSuc = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var reqData, handler, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            reqData = Global.gameProxy.lastGameConfig;
                            handler = ServerPostPath.hall_sceneHandler_c_enter;
                            reqData['isContinue'] = false;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, reqData)];
                        case 1:
                            resp = _a.sent();
                            if (!resp) {
                                return [2 /*return*/];
                            }
                            if (!resp.error) {
                                resp.error = {};
                                resp.error.code = 0;
                            }
                            //游戏房间已经解散
                            if (resp.error.code == -213) {
                                CF.sN(SceneNotify.OPEN_BJLHALL);
                                CF.sN(SceneNotify.CLOSE_BJLGAME);
                                text = TextUtils.instance.getCurrentTextById(63);
                                Global.alertMediator.addAlert(text, null, null, true);
                                //弹出提示
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 显示房间当前的状态
         */
        BJLGameScene.prototype.showRoomStatus = function (reconnect) {
            if (reconnect === void 0) { reconnect = false; }
            var roomInfo = Global.roomProxy.roomInfo;
            switch (roomInfo.roundStatus) {
                case ROOM_STATUS1.MOREN:
                    this.lockYZ = false;
                    this.roomState.source = RES.getRes("bjle_game_zbz" + CF.tic);
                    if (reconnect) {
                        this.onLineCards(3);
                        this.showPlayers();
                        this.showHeaders();
                    }
                    this.timeBar.visible = false;
                    break;
                case ROOM_STATUS1.FREE:
                    this.lockYZ = false;
                    this.roomState.source = RES.getRes("bjle_game_zbz" + CF.tic);
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showPlayers();
                        this.showHeaders();
                    }
                    this.timeBar.visible = false;
                    break;
                case ROOM_STATUS1.START:
                    this.lockYZ = false;
                    this.roomState.source = RES.getRes("bjle_game_zb" + CF.tic);
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showPlayers();
                        this.showHeaders();
                    }
                    this.timeBar.visible = false;
                    break;
                case ROOM_STATUS1.BET:
                    this.lockYZ = true;
                    if (roomInfo.playway == 1) {
                        this.roomState.source = RES.getRes("bjle_game_xzz" + CF.tic);
                    }
                    else if (roomInfo.playway == 2) {
                        if (roomInfo.roomState == ROOM_STATUS1.MINI_HAND_CARD) {
                            return;
                        }
                        else {
                            this.roomState.source = RES.getRes("bjle_game_xzz" + CF.tic);
                        }
                    }
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showPlayers();
                        this.showHeaders();
                    }
                    //this.zhengBianBei();
                    this.timeBar.visible = true;
                    break;
                case ROOM_STATUS1.NEW_CARD:
                case ROOM_STATUS1.STOP:
                    this.lockYZ = false;
                    if (reconnect) {
                        if (roomInfo.playway == 1) {
                            this.onLineCards(1);
                            this.showPlayers();
                            this.showHeaders();
                            this.showCards();
                        }
                        else if (roomInfo.playway == 2) {
                            this.onLineCards(1);
                            this.showPlayers();
                            this.showHeaders();
                        }
                    }
                    else {
                        if (roomInfo.playway == 1) {
                            this.roomState.source = RES.getRes("bjle_game_bpz" + CF.tic);
                        }
                        else if (roomInfo.playway == 2) {
                            this.roomState.source = RES.getRes("bjl_mpz" + CF.tic);
                        }
                    }
                    this.timeBar.visible = false;
                    break;
                case ROOM_STATUS1.SETTLEMENT:
                    this.lockYZ = false;
                    this.timeBar.visible = false;
                    if (reconnect) {
                        this.onLineCards(2);
                        this.showPlayers();
                        this.showHeaders();
                        this.showCards();
                    }
                    else {
                        this.roomState.visible = true;
                        this.roomState.source = RES.getRes("bjle_game_pjz" + CF.tic);
                    }
                    break;
                case ROOM_STATUS1.MINI_IDLE_ADD_CARD:
                    this.roomState.visible = true;
                    this.roomState.source = RES.getRes("bjl_xmp" + CF.tic);
                    this.timeBar.visible = true;
                    if (reconnect) {
                        this.xpaisValue(roomInfo.idleInitCards);
                        this.zpaisValue(roomInfo.bankerInitCards);
                        this.rerenderMiPaiUI(reconnect);
                    }
                    break;
                case ROOM_STATUS1.MINI_BANKER_ADD_CARD:
                    this.roomState.visible = true;
                    this.roomState.source = RES.getRes("bjl_zmp" + CF.tic);
                    this.timeBar.visible = true;
                    if (reconnect) {
                        this.xpaisValue(roomInfo.idleInitCards);
                        this.zpaisValue(roomInfo.bankerInitCards);
                        this.rerenderMiPaiUI(reconnect);
                    }
                    break;
                case ROOM_STATUS1.MINI_HAND_CARD:
                    this.timeBar.visible = true;
                    // LogUtils.logD(`=====当前的状态=showRoomStatus==` + roomInfo.roundStatus + `playway:` + roomInfo.playway);
                    this.changeMiPaiSource();
                    if (reconnect) {
                        this.xpaisValue(roomInfo.idleInitCards);
                        this.zpaisValue(roomInfo.bankerInitCards);
                        this.rerenderMiPaiUI(reconnect);
                    }
                    else {
                        this.xpaisValue(roomInfo.idleInitCards);
                        this.zpaisValue(roomInfo.bankerInitCards);
                        //当庄闲都未下注 不弹出咪牌界面
                        if (this.isZhuangMi == MIPAI_DIRECTION.EMPTY) {
                            this.miPai.visible = false;
                            return;
                        }
                        ;
                        this.miPai.visible = true;
                        var cardsValue = this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI ? roomInfo.bankerInitCards : roomInfo.idleInitCards;
                        this.miPai.setPokerValue(cardsValue, this.isZhuangMi);
                    }
                    break;
            }
        };
        BJLGameScene.prototype.changeMiPaiSource = function () {
            var resName;
            if (this.isZhuangMi == MIPAI_DIRECTION.ZHUANG_MI) {
                resName = "bjl_zmp" + CF.tic;
            }
            else if (this.isZhuangMi == MIPAI_DIRECTION.XIAN_MI) {
                resName = "bjl_xmp" + CF.tic;
            }
            else {
                resName = "bjl_mpz" + CF.tic;
            }
            LogUtils.logD("======1111resName===" + resName);
            this.roomState.visible = true;
            this.roomState.source = RES.getRes(resName);
        };
        return BJLGameScene;
    }(game.BaseGameScene));
    bjle.BJLGameScene = BJLGameScene;
    __reflect(BJLGameScene.prototype, "bjle.BJLGameScene");
})(bjle || (bjle = {}));
var ROOM_STATUS1 = {
    MOREN: 0,
    FREE: 1,
    START: 2,
    BET: 3,
    STOP: 4,
    NEW_CARD: 5,
    SETTLEMENT: 6,
    MINI_HAND_CARD: 7,
    MINI_IDLE_ADD_CARD: 8,
    MINI_BANKER_ADD_CARD: 9 // 庄家咪补牌
};
