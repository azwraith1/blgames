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
var rbwar;
(function (rbwar) {
    var RBWarGameScene = (function (_super) {
        __extends(RBWarGameScene, _super);
        function RBWarGameScene() {
            var _this = _super.call(this) || this;
            //筹码集合
            _this.cmList1 = [];
            _this.cmList2 = [];
            _this.cmList3 = [];
            _this.cmNumList = [2, 5, 10, 50, 100];
            //所有玩家压的单边的分数，（红色的总共压的，黑色的总共压的）。
            _this.totleScore = 0;
            _this.lockYZ = true;
            //上一盘押注的值 {type:{1: value}}
            _this.lastYZData = {};
            //连续没下注的次数
            _this.noXiazhuCount = 0;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_RBWAR_GAME;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_RBWAR_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_RBWAR_GAME;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = null;
            /**
             * 开牌，先给牌面赋值
             */
            _this.luckyWin = false;
            _this.isPump = false;
            /**
             * 结算
             */
            _this.winPlayers = [];
            _this.updatePlayerGold = [];
            /**
             * 发牌动画
             */
            _this.rList = [];
            _this.bList = [];
            /**
             * {type:{1: value}}
             */
            _this.lastYzIsTouch = false;
            _this.skinName = new RBWarGameSkin();
            return _this;
        }
        /**展示红或者黑赢*/
        RBWarGameScene.prototype.showWinDirection = function (isHong) {
            if (isHong === void 0) { isHong = true; }
            this.winDirection.visible = false;
            //this.vsGroup.visible=false;
            this.winDirection.visible = true;
            this.winDirection.showWinAni(isHong);
        };
        RBWarGameScene.prototype.createChildren = function () {
            var _this = this;
            _super.prototype.createChildren.call(this);
            this.allowBack = true;
            this.createDBComponents();
            this.init();
            this.timeBar.startTime(this);
            this.hgtkInterval = egret.setInterval(function () {
                if (!_this.lockYZ) {
                    _this.clearNormalJinbi();
                }
            }, this, 200);
        };
        /**
         * 显示提示
         */
        RBWarGameScene.prototype.showTips = function (text) {
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
         * 减少内存
         */
        RBWarGameScene.prototype.clearNormalJinbi = function () {
            var _this = this;
            var kongzhiNumber = 100;
            var cleardata = function (type, number) {
                var list = _this['cmList' + type];
                while (number > 0) {
                    var jinbi = list.shift();
                    game.UIUtils.removeSelf(jinbi);
                    ObjectPool.reclaim("cm", jinbi);
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
        };
        RBWarGameScene.prototype.playwinDB = function () {
            var db = new DBComponent("hhdz_win");
            db.callback = function () {
                game.UIUtils.removeSelf(db);
                db = null;
            };
            this.winDBGroup.addChild(db);
            db.playByFilename(1);
        };
        /**
         * 创建好所有需要的龙骨动画
         */
        RBWarGameScene.prototype.createDBComponents = function () {
            var _this = this;
            this.vsDBComponent = DBComponent.create("vsDBComponent", "rbw_start");
            this.touchGroup.addChild(this.vsDBComponent);
            this.vsDBComponent.visible = false;
            this.vsDBComponent.resetPosition();
            this.vsDBComponent.verticalCenter = 0;
            this.vsDBComponent.horizontalCenter = 0;
            this.vsDBComponent.callback = function () {
                _this.vsDBComponent.visible = false;
            };
            // this.vsDBComponent.playDefault(1);
            this.anteDBComponent = DBComponent.create("rbw_ante", "rbw_ante");
            this.touchGroup.addChild(this.anteDBComponent);
            this.anteDBComponent.resetPosition();
            this.anteDBComponent.verticalCenter = 0;
            this.anteDBComponent.horizontalCenter = 0;
            this.anteDBComponent.visible = false;
            this.anteDBComponent.callback = function () {
                _this.anteDBComponent.visible = false;
            };
            this.winDb = DBComponent.create("rbw_mine_win", "rbw_mine_win");
            this.touchGroup.addChild(this.winDb);
            this.winDb.resetPosition();
            this.winDb.verticalCenter = 0;
            this.winDb.horizontalCenter = 0;
            this.winDb.visible = false;
            this.winDb.callback = function () {
                _this.winDb.visible = false;
            };
        };
        RBWarGameScene.prototype.createPersons = function () {
            var person1 = DBComponent.create("rbw_person1", "rbw_red_person");
            person1.scaleX = person1.scaleY = 0.22;
            person1.x = 120;
            person1.y = 62;
            this.group1.addChild(person1);
            this.person1 = person1;
            this.person1.playNamesAndLoop(["normal"]);
            var person2 = DBComponent.create("rbw_person2", "rbw_black_person");
            person2.scaleX = person2.scaleY = 0.21;
            person2.x = this.group2.width - 135;
            person2.y = 68;
            this.person2 = person2;
            this.person2.playNamesAndLoop(["normal"]);
            this.group2.addChild(person2);
        };
        RBWarGameScene.prototype.getNumsPokers = function (e) {
            var data = e.data;
            this.isPump = false;
            this.luckyWin = false;
            if (!data) {
                return;
            }
            for (var i in data) {
                if (i == "1") {
                    Global.roomProxy.roomInfo.rValues = data[i].cards.value;
                    Global.roomProxy.roomInfo.r_isRoundWin = data[i].isRoundWin;
                    Global.roomProxy.roomInfo.r_roundPattern = data[i].roundPattern;
                    var value = data[i].cards.value;
                    var pattern = data[i].roundPattern;
                    for (var i_1 = 0; i_1 < value.length; i_1++) {
                        var redCard = this["redCard" + (i_1 + 1)];
                        redCard.initWithNum(value[i_1]);
                    }
                }
                else if (i == "2") {
                    Global.roomProxy.roomInfo.bValues = data[i].cards.value;
                    Global.roomProxy.roomInfo.b_isRoundWin = data[i].isRoundWin;
                    Global.roomProxy.roomInfo.b_roundPattern = data[i].roundPattern;
                    var value = data[i].cards.value;
                    var pattern = data[i].roundPattern;
                    for (var i_2 = 0; i_2 < value.length; i_2++) {
                        var blackCard = this["blackCard" + (i_2 + 1)];
                        blackCard.initWithNum(value[i_2]);
                    }
                }
                else if (i == "isPump") {
                    this.isPump = data[i];
                }
                else {
                    this.luckyWin = data[i];
                }
            }
            this.removeCard();
            this.onLineCards(1);
            this.r_fanpaiMovie(Global.roomProxy.roomInfo.r_roundPattern, Global.roomProxy.roomInfo.b_roundPattern);
        };
        /**
         * 翻牌动画
         */
        RBWarGameScene.prototype.r_fanpaiMovie = function (fen1, fen2) {
            var _this = this;
            if (Global.runBack) {
                this.redCard1.showB2Z();
                this.redCard2.showB2Z();
                this.redCard3.showB2Z();
                this.blackCard1.showB2Z();
                this.blackCard2.showB2Z();
                this.blackCard3.showB2Z();
                this.showFen(1, fen1, 1);
                this.showFen(1, fen2, 2);
                this.showPlayerC2S();
                return;
            }
            var time = 400;
            this.setAutoTimeout(function () {
                _this.showFen(1, fen1, 1);
            }, this, time * 3 + 200);
            this.setAutoTimeout(function () {
                _this.showFen(1, fen2, 2);
            }, this, time * 6 + 400);
            this.setAutoTimeout(function () {
                _this.showPlayerC2S();
            }, this, time * 6 + 900);
            rbwar.RBWUtils.fanpai();
            egret.Tween.get(this.redCard1).to({ scaleX: 0 }, 200).call(function () { _this.redCard1.showB2Z(); }).to({ scaleX: 0.5 }, 200).call(function () {
                rbwar.RBWUtils.fanpai();
                egret.Tween.get(_this.redCard2).to({ scaleX: 0 }, 200).call(function () { _this.redCard2.showB2Z(); }).to({ scaleX: 0.5 }, 200).call(function () {
                    rbwar.RBWUtils.fanpai();
                    egret.Tween.get(_this.redCard3).to({ scaleX: 0.6, scaleY: 0.64 }, 200).to({ scaleX: 0 }, 200).call(function () { _this.redCard3.showB2Z(); }).to({ scaleX: 0.6, scaleY: 0.64 }, 200).to({ scaleX: 0.5, scaleY: 0.54 }, 200).call(function () {
                        rbwar.RBWUtils.fanpai();
                        egret.Tween.get(_this.blackCard1).to({ scaleX: 0 }, 200).call(function () { _this.blackCard1.showB2Z(); }).to({ scaleX: 0.5 }, 200).call(function () {
                            rbwar.RBWUtils.fanpai();
                            egret.Tween.get(_this.blackCard2).to({ scaleX: 0 }, 200).call(function () { _this.blackCard2.showB2Z(); }).to({ scaleX: 0.5 }, 200).call(function () {
                                rbwar.RBWUtils.fanpai();
                                egret.Tween.get(_this.blackCard3).to({ scaleX: 0.6, scaleY: 0.64 }, 200).to({ scaleX: 0 }, 200).call(function () { _this.blackCard3.showB2Z(); }).to({ scaleX: 0.6, scaleY: 0.64 }, 200).to({ scaleX: 0.5, scaleY: 0.54 }, 200).call(function () {
                                });
                            });
                        });
                    });
                });
            });
        };
        RBWarGameScene.prototype.showPlayerC2S = function () {
            if (!Global.roomProxy.roomInfo) {
                return;
            }
            if (this.isPump) {
                this.person2.playNamesAndLoop(['normal_cry', 'cry']);
                this.person1.playNamesAndLoop(['normal_cry', 'cry']);
            }
            else {
                if (Global.roomProxy.roomInfo.b_isRoundWin) {
                    rbwar.RBWUtils.showWinOrLose(2);
                    this.person2.playNamesAndLoop(['normal_smell', 'smell']);
                    this.person1.playNamesAndLoop(['normal_cry', 'cry']);
                }
                if (Global.roomProxy.roomInfo.r_isRoundWin) {
                    rbwar.RBWUtils.showWinOrLose(1);
                    this.person1.playNamesAndLoop(['normal_smell', 'smell']);
                    this.person2.playNamesAndLoop(['normal_cry', 'cry']);
                }
            }
        };
        /**
         * 展示红黑的牌型。
         * num:1展示，2隐藏
         * fen:具体牌型。
         * color：红黑两方。
         */
        RBWarGameScene.prototype.showFen = function (num, fen, color) {
            if (num == 1) {
                if (color == 1) {
                    this.rf_group.visible = true;
                    this.r_fen.source = RES.getRes("rb_" + fen + "_png");
                    rbwar.RBWUtils.playSoundByFen(fen);
                }
                else {
                    this.bf_group.visible = true;
                    this.b_fen.source = RES.getRes("rb_" + fen + "_png");
                    rbwar.RBWUtils.playSoundByFen(fen);
                }
            }
            else {
                this.rf_group.visible = false;
                this.bf_group.visible = false;
            }
        };
        RBWarGameScene.prototype.timeOut = function (num) {
            var _this = this;
            egret.Tween.removeTweens(this.timeBar);
            if (num == 1) {
                this.vsGroup.visible = false;
                this.timeBar.y = -112;
                egret.Tween.get(this.timeBar).to({ y: -2 }, 1500, egret.Ease.circOut);
            }
            else if (num == 3) {
                this.timeBar.y = -112;
            }
            else if (num == 4) {
                this.vsGroup.visible = false;
                this.timeBar.y = -2;
            }
            else if (num == 2) {
                this.vsGroup.visible = false;
                egret.Tween.get(this.timeBar).to({ y: -112 }, 1500, egret.Ease.circOut);
                this.setAutoTimeout(function () {
                    _this.vsMovie(1);
                }, this, 1500);
            }
        };
        RBWarGameScene.prototype.initCMList = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            this.cmNumList = roomInfo.addBet;
        };
        RBWarGameScene.prototype.init = function () {
            this.initCMList();
            this.war1.init(this, 1);
            this.war2.init(this, 2);
            this.war3.init(this, 3);
            for (var i = 1; i <= 5; i++) {
                var yzBtn = this['yzBtn' + i];
                yzBtn.setIndex(i);
                yzBtn.setContent(this.cmNumList[i - 1]);
            }
            this.xyBtn.setGray(true);
            this.qsBar.init();
            //默认1
            this.currentMoney = this.cmNumList[0];
            this.showTouchValue(this.currentMoney);
            //创建头顶人物
            this.createPersons();
            //显示所有玩家头像信息
            this.renderRoomInfo();
            this.showPlayers();
            this.showRoomStatus(true);
            var roomInfo = Global.roomProxy.roomInfo;
            var richManList = roomInfo.playerList.richManList;
            var luckey = roomInfo.playerList.winRate1st;
            this.start2Move(null, false, luckey.betCamp);
        };
        RBWarGameScene.prototype.renderRoomInfo = function () {
            this.qsBar.update();
            this.showHeaders();
            this.showCurrentBet();
        };
        /**
         * 显示当前已经下注的筹码数
         */
        RBWarGameScene.prototype.showCurrentBet = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            if (roomInfo.roundStatus != ROOM_STATUS.SETTLEMENT) {
                var roundBetInfo = roomInfo.roundBetInfo;
                if (roundBetInfo) {
                    for (var key in roundBetInfo) {
                        var num = roundBetInfo[key];
                        this.updateWarScore(2, key, num, true);
                        this.otherPeopleYZ(num, Number(key), null);
                    }
                }
            }
            //显示自己的下注
            var mineData = Global.roomProxy.getMineData();
            var mineBetInfo = mineData.betInfo;
            if (mineBetInfo) {
                for (var key in mineBetInfo) {
                    this.updateWarScore(1, key, mineBetInfo[key], false);
                }
            }
        };
        /**
         * type:1 自己 2: total
         */
        RBWarGameScene.prototype.updateWarScore = function (type, warIndex, total, isAdd) {
            var war = this['war' + warIndex];
            if (type == 1) {
                war.updateMyValue(total, isAdd);
            }
            else {
                war.updateTotalValue(total, isAdd);
            }
        };
        /**
         * 显示玩家头像
         */
        RBWarGameScene.prototype.showHeaders = function () {
            var roomInfo = Global.roomProxy.roomInfo;
            var richManList = roomInfo.playerList.richManList;
            //富豪
            var fuhao = richManList[0];
            this.no1Header.initWithPlayer(fuhao);
            var luckey = roomInfo.playerList.winRate1st;
            this.luckyHeader.initWithPlayer(luckey);
            var mineData = Global.roomProxy.getMineData();
            this.header1.initWithPlayer(mineData);
            if (mineData["uid"] == fuhao["pIndex"]) {
                this.no1Header.initWithPlayer(mineData);
            }
            else {
                this.no1Header.initWithPlayer(fuhao);
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
                // if (Global.roomProxy.checkIndexIsMe(player.pIndex)) {
                // 	i++;
                // 	continue;
                // }
                header.initWithPlayer(player);
            }
            this.roomid.text = "牌局编号：" + Global.roomProxy.roomInfo.roundId;
        };
        /**
         * 找寻所有除了1之外的所有头像
         */
        RBWarGameScene.prototype.updateTotalByHeaders = function (index, gold) {
            for (var i = 2; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    this['header' + i].updateGold(gold, false);
                }
            }
            if (this.no1Header.index == index) {
                this.no1Header.updateGold(gold, false);
            }
            if (this.luckyHeader.index == index) {
                this.luckyHeader.updateGold(gold, false);
            }
        };
        RBWarGameScene.prototype.s_roundSettlement = function (e) {
            var _this = this;
            var data = e.data;
            LogUtils.logD("============结算数据==========" + JSON.stringify(data));
            this.winPlayers = [];
            this.updatePlayerGold = [];
            var mineWin = false;
            if (data) {
                for (var i in data) {
                    var p = { i: i, g: data[i].gainGold };
                    this.updatePlayerGold.push(p);
                    if (Global.roomProxy.checkIndexIsMe(i)) {
                        this.winPlayers.push(this.header1);
                        var mineData = Global.roomProxy.getMineData();
                        mineData.gold += p.g;
                        Global.roomProxy.rbwRecord_time = 0;
                        var mineScores = this.war1.mineScore + this.war2.mineScore + this.war3.mineScore;
                        if (p.g > mineScores) {
                            mineWin = true;
                        }
                        Global.playerProxy.updatePlayerGold(mineData.gold);
                        var header = this.getHeaderByIndex(i);
                        this.updateTotalByHeaders(i, mineData.gold);
                    }
                    else {
                        var header = this.getHeaderByIndex(i);
                        if (header) {
                            this.winPlayers.push(header);
                        }
                    }
                }
            }
            if (this.luckyHeader.index == this.no1Header.index) {
                this.luckyHeader.updateGold(this.no1Header.playerInfo.gold, false);
            }
            this.changeRoomStatus(ROOM_STATUS.SETTLEMENT);
            if (this.cmGroup1.numChildren == 0 && this.cmGroup2.numChildren == 0 && this.cmGroup3.numChildren == 0) {
                return;
            }
            if (this.isPump) {
                this.g_12g_2(3, 1, 2); //系统赢
            }
            else {
                //11月5日修改 新增红或黑赢的龙骨动画
                if (Global.roomProxy.roomInfo.r_isRoundWin) {
                    //新增红赢动画
                    this.showWinDirection();
                    this.war1.winAni();
                    LogUtils.logD("======================红赢====================");
                    if (this.luckyWin) {
                        this.g_12g_2(2, 3, 1);
                        this.war3.winAni();
                    }
                    else {
                        this.g_22g_1(2, 3, 1);
                    }
                }
                if (Global.roomProxy.roomInfo.b_isRoundWin) {
                    //新增黑赢动画
                    this.showWinDirection(false);
                    LogUtils.logD("======================黑赢====================");
                    this.war2.winAni();
                    if (this.luckyWin) {
                        this.g_12g_2(1, 3, 2);
                        this.war3.winAni();
                    }
                    else {
                        this.g_22g_1(1, 3, 2);
                    }
                }
            }
            if (!this.isPump) {
                if (mineWin) {
                    this.setAutoTimeout(function () {
                        //smart
                        _this.playwinDB();
                        //this.winDb.play("start", 1);
                        rbwar.RBWUtils.mineWin();
                    }, this, 2000);
                }
            }
        };
        /**
         * 1飞2
         */
        RBWarGameScene.prototype.g_12g_2 = function (g1, g2, g3) {
            var _this = this;
            var list = this["cmList" + g1];
            var n1 = Math.floor(list.length / 3);
            var list_1 = list.splice(0, n1);
            var list_2 = list;
            var cm;
            var cm1;
            var gp1 = this["cmGroup" + g1];
            var gp2 = this["cmGroup" + g2];
            var gp3 = this["cmGroup" + g3];
            while (list_1.length > 0) {
                cm1 = list_1.pop();
                this["cmList" + g2].push(cm1);
                var point = gp2.globalToLocal(cm1.localToGlobal().x, cm1.localToGlobal().y);
                cm1.x = point.x;
                cm1.y = point.y;
                gp2.addChild(cm1);
                egret.Tween.get(cm1).to({
                    x: _.random(25, (gp2.width - cm1.width * 0.2)),
                    y: _.random(25, (gp2.height - cm1.height * 0.2))
                }, _.random(300, 600));
            }
            while (list_2.length > 0) {
                cm = list_2.pop();
                this["cmList" + g3].push(cm);
                var point1 = gp3.globalToLocal(cm.localToGlobal().x, cm.localToGlobal().y);
                cm.x = point1.x;
                cm.y = point1.y;
                gp3.addChild(cm);
                egret.Tween.get(cm).to({
                    x: _.random(25, (gp3.width - cm.width * 0.2)),
                    y: _.random(25, (gp3.height - cm.height * 0.2)),
                }, _.random(300, 600));
            }
            this.setAutoTimeout(function () {
                //等一秒
                rbwar.RBWUtils.otherPlayFjb(); //声音文件
                var l1;
                var l2;
                var list = _this["cmList" + g2];
                var list2 = _this["cmList" + g3];
                if (_this.updatePlayerGold.length > 0) {
                    for (var j = 0; j < _this.updatePlayerGold.length; j++) {
                        _this.updateGoldByIndex(_this.updatePlayerGold[j].i, _this.updatePlayerGold[j].g, true, true);
                    }
                }
                if (_this.winPlayers.length > 0) {
                    l1 = list.splice(0, _this.winPlayers.length * 2);
                    l2 = list2.splice(0, _this.winPlayers.length * 2);
                    list = list;
                    list2 = list2;
                    _this.g2ps(_this.winPlayers, l1, gp2);
                    _this.g2ps(_this.winPlayers, l2, gp3);
                    if (_this.isPump) {
                        _this.movieSystem(gp2, list);
                        _this.movieSystem(gp3, list2);
                    }
                    else {
                        _this.movieGroup(gp2, list);
                        _this.movieGroup(gp3, list2);
                    }
                }
                else {
                    if (_this.isPump) {
                        _this.movieSystem(gp2, list);
                        _this.movieSystem(gp3, list2);
                    }
                    else {
                        _this.movieGroup(gp2, list);
                        _this.movieGroup(gp3, list2);
                    }
                }
            }, this, 1000);
        };
        /**
         * 2飞1
         */
        RBWarGameScene.prototype.g_22g_1 = function (g1, g2, g3) {
            var _this = this;
            var list1 = this["cmList" + g1];
            var list2 = this["cmList" + g2];
            var cm2;
            var cm1;
            var point;
            var point1;
            var gp1 = this["cmGroup" + g1];
            var gp2 = this["cmGroup" + g2];
            var gp3 = this["cmGroup" + g3];
            while (list1.length > 0) {
                cm1 = list1.pop();
                this["cmList" + g3].push(cm1);
                point1 = gp3.globalToLocal(cm1.localToGlobal().x, cm1.localToGlobal().y);
                cm1.x = point1.x;
                cm1.y = point1.y;
                gp3.addChild(cm1);
                egret.Tween.get(cm1).to({
                    x: _.random(25, (gp3.width - cm1.width * 0.2)),
                    y: _.random(25, (gp3.height - cm1.height * 0.2))
                }, _.random(300, 600));
            }
            while (list2.length > 0) {
                cm2 = list2.pop();
                this["cmList" + g3].push(cm2);
                point = gp3.globalToLocal(cm2.localToGlobal().x, cm2.localToGlobal().y);
                cm2.x = point.x;
                cm2.y = point.y;
                gp3.addChild(cm2);
                egret.Tween.get(cm2).to({
                    x: _.random(25, (gp3.width - cm2.width * 0.2)),
                    y: _.random(25, (gp3.height - cm2.height * 0.2))
                }, _.random(300, 600));
            }
            if (this.updatePlayerGold.length > 0) {
                for (var j = 0; j < this.updatePlayerGold.length; j++) {
                    this.updateGoldByIndex(this.updatePlayerGold[j].i, this.updatePlayerGold[j].g, true, true);
                }
            }
            this.setAutoTimeout(function () {
                //等一秒
                rbwar.RBWUtils.otherPlayFjb();
                var lists = _this["cmList" + g3];
                var n = Math.floor(lists.length / 4);
                var list;
                var list3;
                if (_this.winPlayers.length > 0) {
                    list = lists.splice(0, n);
                    list3 = lists;
                }
                if (_this.winPlayers.length > 0) {
                    _this.g2ps(_this.winPlayers, list, gp3);
                    _this.movieGroup(gp3, list3);
                }
                else {
                    _this.movieGroup(gp3, lists);
                }
            }, this, 1000);
        };
        RBWarGameScene.prototype.getHeaderByIndexType1 = function (index) {
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
        RBWarGameScene.prototype.getHeaderByIndex = function (index) {
            for (var i = 1; i <= 5; i++) {
                if (this['header' + i].index == index) {
                    return this['header' + i];
                }
            }
            if (this.no1Header.index == index) {
                return this.no1Header;
            }
            if (this.luckyHeader.index == index) {
                return this.luckyHeader;
            }
            return null;
        };
        /**
         * 根据坐标找到头像
         * @param  {} index
         */
        RBWarGameScene.prototype.getHeaderMovieType = function (index) {
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
            if (this.no1Header.index == index) {
                return 6;
            }
            if (this.luckyHeader.index == index) {
                return 7;
            }
            if (this.header1.index == index) {
                return 1;
            }
        };
        /**
         * 显示幸运星的选择
         */
        RBWarGameScene.prototype.start2Move = function (betInfo, ani, camp) {
            if (ani) {
                var moveX = 0;
                var type1 = betInfo[1];
                var type2 = betInfo[2];
                var type3 = betInfo[3];
                if (!type1 && !type2 && !type3) {
                    return;
                }
                ;
                if (!type1 && !type2) {
                }
                else {
                    moveX = !!type2 ? 585 : 225;
                    if (this.luckStar.x == 1000) {
                        egret.Tween.get(this.luckStar).to({
                            x: moveX
                        }, 800, egret.Ease.sineIn);
                    }
                    else {
                        this.luckStar.x = moveX;
                    }
                }
                if (!type3) {
                }
                else {
                    if (this.luckStar0.x == 1000) {
                        egret.Tween.get(this.luckStar0).to({
                            x: 470,
                            y: 150
                        }, 800, egret.Ease.sineIn);
                    }
                    else {
                        this.luckStar0.x = 470;
                        this.luckStar0.y = 150;
                    }
                }
            }
            else {
                var moveX1 = 0;
                var camp1 = camp[1];
                var camp2 = camp[2];
                var camp3 = camp[3];
                if (!camp1 && !camp2 && !camp3) {
                    return;
                }
                if (!camp1 && !camp2) {
                }
                else {
                    moveX1 = !!camp2 ? 585 : 225;
                    this.luckStar.x = moveX1;
                }
                if (!camp3) {
                }
                else {
                    this.luckStar0.x = 470;
                    this.luckStar0.y = 150;
                }
            }
        };
        RBWarGameScene.prototype.s_playerBet = function (e) {
            var _this = this;
            var data = e.data;
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
                                playerHeader.headerMovie(moveType);
                                _this.playerYZ(parseInt(numValue), parseInt(type), playerHeader);
                            }
                        }
                        var typeTotal = _this.getBetInfoTotalByType(betInfo, type);
                        total_1 += typeTotal;
                        _this.updateWarScore(2, type, typeTotal, true);
                    }
                    _this.updateGoldByHeader(playerHeader, total_1 * -1, true, false);
                }
                else {
                    LogUtils.logD(playerHeader.index + "不存在");
                }
            };
            var isLucky = false;
            var isNo1 = false;
            var total = this.getBetInfoTotal(betInfo);
            if (playerIndex == this.luckyHeader.index) {
                isLucky = true;
                this.start2Move(betInfo, true);
                if (Global.roomProxy.checkIndexIsMe(playerIndex)) {
                    this.luckyHeader.updateGold(total * -1, true);
                }
                else {
                    updateHeaderAndMove(this.luckyHeader, 7);
                }
            }
            if (playerIndex == this.no1Header.index) {
                isNo1 = true;
                if (Global.roomProxy.checkIndexIsMe(playerIndex) || isLucky) {
                    this.no1Header.updateGold(total * -1, true);
                }
                else {
                    updateHeaderAndMove(this.no1Header, 6);
                }
            }
            var playerHeader = this.getHeaderByIndexType1(playerIndex);
            if (playerHeader) {
                if (isLucky || isNo1 || Global.roomProxy.checkIndexIsMe(playerHeader.index)) {
                    playerHeader.updateGold(total * -1, true);
                }
                else {
                    updateHeaderAndMove(playerHeader, this.getHeaderMovieType(playerIndex));
                }
            }
        };
        RBWarGameScene.prototype.countdown = function (e) {
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
        RBWarGameScene.prototype.s_roomInfo = function (e) {
            this.winDirection.visible = false;
            this.clearRoom();
            this.changeRoomStatus(ROOM_STATUS.FREE);
            this.onLineCards(3);
            this.showFen(2);
            this.vsMovie(2);
            //修改玩家头像
            var data = e.data;
            var players = Global.roomProxy.roomInfo.players;
            Global.roomProxy.roomInfo = data;
            Global.roomProxy.roomInfo.players = players;
            this.qsBar.update();
            this.showHeaders();
            CF.dP(ENo.ROOM_FULSH);
            this.person1.playNamesAndLoop(["normal"]);
            this.person2.playNamesAndLoop(["normal"]);
            this.playerListBtn.labelDisplay.text = data.playerList.playerCount;
        };
        RBWarGameScene.prototype.s_roomStopBet = function () {
            this.changeRoomStatus(ROOM_STATUS.STOP);
            rbwar.RBWUtils.beignOrStop(2);
            this.anteDBComponent.play("stop", 1);
            this.timeOut(2);
            //this.vsMovie(1);
        };
        RBWarGameScene.prototype.s_roomStartBet = function (e) {
            this.changeRoomStatus(ROOM_STATUS.BET);
            this.timeOut(1);
        };
        RBWarGameScene.prototype.changeRoomStatus = function (status) {
            var roomInfo = Global.roomProxy.roomInfo;
            roomInfo.roundStatus = status;
            this.showRoomStatus();
        };
        RBWarGameScene.prototype.startNewRound = function (e) {
            // this.noXiazhuCount ++;
            this.cleanAll();
            this.header1.showWin(1);
            this.rf_group.visible = false;
            this.bf_group.visible = false;
            this.winDb.visible = false;
            this.vsGroup.visible = false;
            this.person1.playNamesAndLoop(["normal"]);
            this.person2.playNamesAndLoop(["normal"]);
            this.vsDBComponent.playDefault(1);
            this.changeRoomStatus(ROOM_STATUS.START);
            // //第三把会提示
            // if(this.noXiazhuCount == 3){
            // 	Global.alertMediator.addAlert("您已经连续3局没有下注,连续5局未下注将会请离游戏桌", null, null, true);
            // }
        };
        RBWarGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.RBWAR_XUYA, this.xyBtnTouch, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
            CF.rE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.rE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
            CF.rE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
            CF.rE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
            CF.rE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
            CF.rE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
            CF.rE(ServerNotify.s_playerBet, this.s_playerBet, this);
            CF.rE(ServerNotify.s_countdown, this.countdown, this);
            CF.rE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.rE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.rE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
            CF.rE(ServerNotify.s_enterResult, this.s_enterResult, this);
        };
        RBWarGameScene.prototype.cleanAll = function () {
            this.war2.mineScore = this.war1.mineScore = this.war3.mineScore = 0;
            this.cmGroup1.removeChildren();
            this.cmGroup2.removeChildren();
            this.cmGroup3.removeChildren();
            this.war1.totalScore = this.war2.totalScore = this.war3.totalScore = 0;
            this.cmList1 = [];
            this.cmList2 = [];
            this.cmList2 = [];
        };
        /**
         * 收到发牌消息
         */
        RBWarGameScene.prototype.roomInitHandCards = function (e) {
            var data = e.data;
            this.cleanAll();
            this.vsMovie(2);
            this.changeRoomStatus(ROOM_STATUS.NEW_CARD);
            this.cardsMovies(data);
        };
        RBWarGameScene.prototype.cardsMovies = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var camp, type, value, i, card, i, i, card, i;
                return __generator(this, function (_a) {
                    this.onLineCards(3);
                    this.showFen(2);
                    Global.roomProxy.roomInfo.camp = data.camp;
                    Global.roomProxy.roomInfo.type = data.cards.type;
                    if (data.camp == 1) {
                        Global.roomProxy.roomInfo.rValue = data.cards.value;
                    }
                    else {
                        Global.roomProxy.roomInfo.bValue = data.cards.value;
                    }
                    camp = data.camp;
                    type = data.cards.type;
                    value = data.cards.value;
                    if (camp == 1) {
                        this.rList = [];
                        for (i = 1; i <= 3; i++) {
                            card = this.getNewCar();
                            card.name = "rCard" + i;
                            card.scaleX = 0.5;
                            card.scaleY = 0.54;
                            card.x = 510;
                            card.y = -40;
                            card.anchorOffsetX = card.width / 2;
                            card.anchorOffsetY = card.height / 2;
                            this.group1.addChild(card);
                            this.rList.push(card);
                        }
                        if (Global.runBack) {
                            for (i = 1; i <= 3; i++) {
                                this.group1.getChildByName("rCard" + i).y = this["redCard" + i].y;
                                this.group1.getChildByName("rCard" + i).x = this["redCard" + i].x;
                            }
                        }
                        else {
                            try {
                                this.setAutoTimeout(function () {
                                    egret.Tween.get(_this.group1.getChildByName("rCard1")).to({
                                        x: _this.redCard1.x,
                                        y: _this.redCard1.y
                                    }, 240);
                                    egret.Tween.get(_this.group1.getChildByName("rCard2")).to({
                                        x: _this.redCard1.x,
                                        y: _this.redCard1.y
                                    }, 300);
                                    egret.Tween.get(_this.group1.getChildByName("rCard3")).to({
                                        x: _this.redCard1.x,
                                        y: _this.redCard1.y
                                    }, 360).wait(100).call(function () {
                                        for (var i = 1; i <= 3; i++) {
                                            egret.Tween.get(_this.group1.getChildByName("rCard" + i)).to({
                                                x: _this["redCard" + i].x,
                                                y: _this["redCard" + i].y
                                            }, 150);
                                        }
                                    });
                                }, this, 50);
                            }
                            catch (e) {
                            }
                        }
                    }
                    else {
                        this.bList = [];
                        for (i = 1; i <= 3; i++) {
                            card = this.getNewCar();
                            card.name = "bCard" + i;
                            card.scaleX = 0.5;
                            card.scaleY = 0.54;
                            card.x = -55;
                            card.y = -46;
                            card.anchorOffsetX = card.width / 2;
                            card.anchorOffsetY = card.height / 2;
                            this.group2.addChild(card);
                            this.bList.push(card);
                        }
                        if (Global.runBack) {
                            for (i = 1; i <= 3; i++) {
                                this.group2.getChildByName("bCard" + i).y = this["blackCard" + i].y;
                                this.group2.getChildByName("bCard" + i).x = this["blackCard" + i].x;
                            }
                        }
                        else {
                            try {
                                this.setAutoTimeout(function () {
                                    egret.Tween.get(_this.group2.getChildByName("bCard1")).to({
                                        x: _this.blackCard3.x,
                                        y: _this.blackCard3.y
                                    }, 240);
                                    egret.Tween.get(_this.group2.getChildByName("bCard2")).to({
                                        x: _this.blackCard3.x,
                                        y: _this.blackCard3.y
                                    }, 300);
                                    egret.Tween.get(_this.group2.getChildByName("bCard3")).to({
                                        x: _this.blackCard3.x,
                                        y: _this.blackCard3.y
                                    }, 360).wait(100).call(function () {
                                        for (var i = 1; i <= 3; i++) {
                                            egret.Tween.get(_this.group2.getChildByName("bCard" + i)).to({
                                                x: _this["blackCard" + i].x,
                                                y: _this["blackCard" + i].y
                                            }, 150);
                                        }
                                    }).wait(500).call(function () {
                                        _this.anteDBComponent.play("start", 1);
                                        rbwar.RBWUtils.beignOrStop(1);
                                    });
                                }, this, 50);
                            }
                            catch (e) {
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 获取一张牌
         */
        RBWarGameScene.prototype.getNewCar = function () {
            var card = ObjectPool.produce("cards", rbwar.RBWarCards);
            if (!card) {
                card = new rbwar.RBWarCards();
            }
            return card;
        };
        /**
         * 断线重连后牌的2种展示；
         * 1,展示背面。
         * 3，隐藏。
         * 2，展示正面并赋值。
         */
        RBWarGameScene.prototype.onLineCards = function (type) {
            if (type == 1) {
                for (var i = 1; i <= 3; i++) {
                    var card = this["redCard" + i];
                    var card1 = this["blackCard" + i];
                    card.visible = card1.visible = true;
                }
            }
            else if (type == 3) {
                for (var i = 1; i <= 3; i++) {
                    var card = this["redCard" + i];
                    var card1 = this["blackCard" + i];
                    card.visible = card1.visible = false;
                }
            }
            else {
                var data = Global.roomProxy.roomInfo;
                if (!data) {
                    return;
                }
                var openCardInfo = data.openCardInfo;
                for (var i in openCardInfo) {
                    if (i == "1") {
                        Global.roomProxy.roomInfo.rValues = openCardInfo[i].cards.value;
                        Global.roomProxy.roomInfo.r_isRoundWin = openCardInfo[i].isRoundWin;
                        Global.roomProxy.roomInfo.r_roundPattern = openCardInfo[i].roundPattern;
                        var rValue = Global.roomProxy.roomInfo.rValues;
                        for (var i_3 = 0; i_3 < rValue.length; i_3++) {
                            var redCard = this["redCard" + (i_3 + 1)];
                            redCard.visible = true;
                            redCard.initWithNum(rValue[i_3]);
                        }
                    }
                    else if (i == "2") {
                        Global.roomProxy.roomInfo.bValues = openCardInfo[i].cards.value;
                        Global.roomProxy.roomInfo.b_isRoundWin = openCardInfo[i].isRoundWin;
                        Global.roomProxy.roomInfo.b_roundPattern = openCardInfo[i].roundPattern;
                        var bValue = Global.roomProxy.roomInfo.bValues;
                        for (var i_4 = 0; i_4 < bValue.length; i_4++) {
                            var blackCard = this["blackCard" + (i_4 + 1)];
                            blackCard.visible = true;
                            blackCard.initWithNum(bValue[i_4]);
                        }
                    }
                    else if (i == "isPump") {
                        this.isPump = data[i];
                    }
                    else {
                        this.luckyWin = data[i];
                    }
                }
                this.showPlayerC2S();
            }
        };
        /**
         * 展示玩家列表
         */
        RBWarGameScene.prototype.showPlayers = function () {
            var data = Global.roomProxy.roomInfo;
            var playerList = data.playerList;
            var playerCount = playerList.playerCount;
            this.playerListBtn.labelDisplay.text = playerCount;
        };
        /**
         * 移除发的牌
         */
        RBWarGameScene.prototype.removeCard = function () {
            while (this.rList.length > 0) {
                var card = this.rList.pop();
                game.UIUtils.removeSelf(card);
                ObjectPool.reclaim("cards", card);
            }
            while (this.bList.length > 0) {
                var card = this.bList.pop();
                game.UIUtils.removeSelf(card);
                ObjectPool.reclaim("cards", card);
            }
            for (var i = 1; i <= 3; i++) {
                var card = this["redCard" + i];
                var card1 = this["blackCard" + i];
                card.showZ2B();
                card1.showZ2B();
            }
        };
        /**
         * 玩家加入
         */
        RBWarGameScene.prototype.playerEnter = function (e) {
            var roomInfo = Global.roomProxy.roomInfo;
            var richManList = roomInfo.playerList.richManList;
            var data = e.data;
            //	richManList.push(data.player);
            //this.updateRichManNum();
        };
        RBWarGameScene.prototype.rbwarTouch = function (e) {
            var data = e.data;
            this.currentMoney = data;
            this.showTouchValue(this.currentMoney);
        };
        RBWarGameScene.prototype.showTouchValue = function (value) {
            for (var i = 1; i <= 5; i++) {
                var yzBtn = this['yzBtn' + i];
                yzBtn.setTouchon(value);
            }
        };
        /**
         * 金币从group飞回来
         */
        RBWarGameScene.prototype.coin2Component = function (jinbi, type, component) {
            var _this = this;
            var group = this['cmGroup' + type];
            var point1 = component.localToGlobal();
            var point = group.globalToLocal(point1.x + 50, point1.y + 50);
            egret.Tween.removeTweens(jinbi);
            egret.Tween.get(jinbi).to({
                x: point.x,
                y: point.y
            }, _.random(200, 400)).call(function () {
                game.UIUtils.removeSelf(jinbi);
                game.Utils.removeArrayItem(_this['cmList' + type], jinbi);
            });
        };
        RBWarGameScene.prototype.sendBetReq = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var currentMoney, player, data, info, path, jinbi, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.lockYZ) {
                                this.showTips("非下注阶段，无法下注");
                                return [2 /*return*/];
                            }
                            currentMoney = this.currentMoney;
                            player = Global.roomProxy.getMineData();
                            if (player.gold < currentMoney) {
                                this.showTips("金币不足");
                                return [2 /*return*/];
                            }
                            if (!this.lastYzIsTouch) {
                                this.lastYZData = {};
                            }
                            this.xyBtn.setGray(true);
                            this.lastYzIsTouch = true;
                            this.header1.headerMovie(1);
                            player.gold -= currentMoney;
                            this.header1.updateGold(player.gold);
                            this.updateWarScore(1, type, currentMoney, true);
                            this.updateWarScore(2, type, currentMoney, true);
                            data = { betInfo: {} };
                            info = data.betInfo[type] = {};
                            info[currentMoney] = 1;
                            path = ServerPostPath.game_rbWarHandler_c_bet;
                            jinbi = this.playerYZ(currentMoney, type, this.header1);
                            this.add2LastYz(currentMoney, type, 1);
                            return [4 /*yield*/, Global.pomelo.request(path, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                //错误
                                this.showTips(resp.error.msg);
                                // this.noXiazhuCount = 0;
                                this.add2LastYz(currentMoney, type, -1);
                                player.gold += currentMoney;
                                this.updateWarScore(1, type, -currentMoney, true);
                                this.updateWarScore(2, type, -currentMoney, true);
                                this.header1.updateGold(player.gold);
                                this.coin2Component(jinbi, type, this.header1);
                            }
                            else {
                                player.betInfo = resp;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        RBWarGameScene.prototype.yzRed = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.war2.mineScore > 0) {
                        // alert("只能选一边黑");
                        this.showTips("您已经在黑方押注，无法押注红方");
                        return [2 /*return*/];
                    }
                    this.sendBetReq(1);
                    return [2 /*return*/];
                });
            });
        };
        RBWarGameScene.prototype.yzBlack = function () {
            if (this.war1.mineScore > 0) {
                this.showTips("您已经在红方押注，无法押注黑方");
                return;
            }
            this.sendBetReq(2);
        };
        RBWarGameScene.prototype.yzHuixin = function () {
            this.sendBetReq(3);
        };
        RBWarGameScene.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.backBtn:
                    this.backBtnTouch();
                    break;
                case this.helpBtn:
                    CF.sN(PanelNotify.OPEN_RBWARHELP);
                    break;
                case this.playerListBtn:
                    CF.sN(PanelNotify.OPEN_RBWARPL);
                    break;
                case this.szBtn:
                    CF.sN(PanelNotify.OPEN_RBWARSET);
                    break;
                case this.recordBtn:
                    CF.sN(PanelNotify.OPEN_RBWARJL);
                    break;
            }
        };
        /**
         * 获取一个筹码
         */
        RBWarGameScene.prototype.getNewRBWarYz = function (index, value) {
            var jinbi = ObjectPool.produce("cm", rbwar.RBWarYzBtn);
            if (!jinbi) {
                jinbi = new rbwar.RBWarYzBtn(true);
            }
            jinbi.setIndex(index);
            jinbi.setContent(value);
            return jinbi;
        };
        /**
         * 任何玩家下注
         * @param  {number} num
         * @param  {number} type
         * @param  {eui.Component} component:那个玩家
         */
        RBWarGameScene.prototype.playerYZ = function (value, type, component) {
            if (component != this.playerListBtn) {
                rbwar.RBWUtils.minePlayFjb();
            }
            var index = this.cmNumList.indexOf(value) + 1;
            var jinbi = this.getNewRBWarYz(index, value);
            if (component == null) {
                this.coinMoveAni(jinbi, type, null);
            }
            else {
                if (component == this.luckyHeader) {
                    component.x = component.x + 200;
                    component.y = component.y + 40;
                }
                var startPoint = component.localToGlobal();
                this.coinMoveAni(jinbi, type, startPoint);
            }
            return jinbi;
        };
        /**
         * 金币move动画
         * @param  {RBWarYzBtn} jinbi
         * @param  {number} type
         * @param  {egret.Point} startPoint
         */
        RBWarGameScene.prototype.coinMoveAni = function (jinbi, type, startPoint) {
            var group = this['cmGroup' + type];
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
                startPoint = group.globalToLocal(startPoint.x, startPoint.y);
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
            this['cmList' + type].push(jinbi);
            return jinbi;
        };
        /**
         * 非场上玩家的押注
         */
        RBWarGameScene.prototype.otherPeopleYZ = function (value, type, component) {
            if (component === void 0) { component = this.playerListBtn; }
            var numbers = NumberFormat.chaifenScore(this.cmNumList, value);
            for (var key in numbers) {
                var num = numbers[key];
                for (var i = 0; i < num; i++) {
                    this.playerYZ(parseInt(key), type, component);
                }
            }
        };
        /**
         * 清理位置，回到初始
         */
        RBWarGameScene.prototype.cleanCM = function (group) {
            this.contentGroup.addChild(group);
            switch (group) {
                case this.cmGroup1:
                    group.x = 162.3;
                    group.y = 103.97;
                    break;
                case this.cmGroup2:
                    group.x = 669.27;
                    group.y = 103.97;
                    break;
                case this.cmGroup3:
                    group.x = 411.09;
                    group.y = 231.27;
                    break;
            }
        };
        /**
         * group飞向玩家列表的动画
         */
        RBWarGameScene.prototype.movieGroup = function (gp, list) {
            var _this = this;
            var _loop_1 = function () {
                var cm = list.pop();
                var point = gp.globalToLocal(this_1.playerListBtn.localToGlobal().x, this_1.playerListBtn.localToGlobal().y);
                // cm.x = point.x;
                // cm.y = point.y;
                egret.Tween.get(cm).to({
                    x: point.x,
                    y: point.y
                }, _.random(300, 600)).call(function () {
                    game.UIUtils.removeSelf(cm);
                    ObjectPool.reclaim("cm", cm);
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
         * group飞向系统动画
         */
        RBWarGameScene.prototype.movieSystem = function (gp, list) {
            var _this = this;
            var _loop_2 = function () {
                var cm = list.pop();
                var point = gp.globalToLocal(this_2.systemImage.localToGlobal().x, this_2.systemImage.localToGlobal().y);
                // cm.x = point.x;
                // cm.y = point.y;
                egret.Tween.get(cm).to({
                    x: point.x,
                    y: point.y
                }, _.random(300, 600)).call(function () {
                    game.UIUtils.removeSelf(cm);
                    ObjectPool.reclaim("cm", cm);
                });
            };
            var this_2 = this;
            while (list.length > 0) {
                _loop_2();
            }
            this.setAutoTimeout(function () {
                _this.clearRoom();
            }, this, 1000);
        };
        /**
         * group飞玩家们；
         */
        RBWarGameScene.prototype.g2ps = function (players, lists, group) {
            var _loop_3 = function () {
                var cm = lists.pop();
                var num = _.random(0, players.length - 1);
                var player = players[num];
                var point = void 0;
                if (player == this_3.luckyHeader) {
                    point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
                }
                if (player == this_3.no1Header) {
                    point = group.globalToLocal((player.localToGlobal().x + player.width * 0.7), (player.localToGlobal().y + player.height * 0.3));
                }
                else {
                    if (player) {
                        point = group.globalToLocal((player.localToGlobal().x + player.width / 2), (player.localToGlobal().y + player.height / 2));
                    }
                }
                if (Global.runBack) {
                    game.UIUtils.removeSelf(cm);
                    ObjectPool.reclaim("cm", cm);
                }
                else {
                    if (point) {
                        egret.Tween.get(cm).to({
                            x: point.x,
                            y: point.y
                        }, _.random(300, 600)).call(function () {
                            game.UIUtils.removeSelf(cm);
                            ObjectPool.reclaim("cm", cm);
                        });
                    }
                }
            };
            var this_3 = this;
            while (lists.length > 0) {
                _loop_3();
            }
        };
        /**
         * 显示在三个押注的数量
         */
        RBWarGameScene.prototype.showRBBarInfo = function () {
            var mineData = Global.roomProxy.getMineData();
            var betInfo = mineData.betInfo;
            for (var key in betInfo) {
                var war = this['war' + key];
                war.updateMyValue(betInfo[key], false);
            }
            //差房间中其他玩家押注所有
        };
        RBWarGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.RBWAR_XUYA, this.xyBtnTouch, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ENo.RBWAR_CM_TOUCH, this.rbwarTouch, this);
            CF.aE(ServerNotify.s_startNewRound, this.startNewRound, this);
            CF.aE(ServerNotify.s_roomInfo, this.s_roomInfo, this);
            CF.aE(ServerNotify.s_roomInitHandCards, this.roomInitHandCards, this);
            CF.aE(ServerNotify.s_roomOpenCards, this.getNumsPokers, this);
            CF.aE(ServerNotify.s_roomStartBet, this.s_roomStartBet, this);
            CF.aE(ServerNotify.s_roomStopBet, this.s_roomStopBet, this);
            CF.aE(ServerNotify.s_playerBet, this.s_playerBet, this);
            CF.aE(ServerNotify.s_countdown, this.countdown, this);
            CF.aE(ServerNotify.s_roundSettlement, this.s_roundSettlement, this);
            CF.aE(ServerNotify.s_VPlayerBet, this.vPlayerBet, this);
            CF.aE(ServerNotify.s_enterResult, this.s_enterResult, this);
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
            CF.aE(ServerNotify.s_kickGame, this.s_kickPlayer, this);
        };
        RBWarGameScene.prototype.s_enterResult = function (e) {
            Global.roomProxy.clearRoomInfo();
            Global.roomProxy.setRoomInfo(e.data);
            CF.sN(SceneNotify.CLOSE_RBWAR_GAME);
            CF.sN(SceneNotify.OPEN_RBWAR_GAME);
        };
        RBWarGameScene.prototype.s_kickPlayer = function (e) {
            var resp = e.data;
            Global.roomProxy.clearRoomInfo();
            CF.sN(SceneNotify.CLOSE_RBWAR_GAME);
            CF.sN(SceneNotify.OPEN_RBWAR_HALL);
            Global.alertMediator.closeViewComponent(0);
            Global.alertMediator.addAlert(resp.reason, null, null, true);
        };
        /**
         * 虚拟玩家投注
         */
        RBWarGameScene.prototype.vPlayerBet = function (e) {
            var data = e.data;
            egret.Tween.get(this.playerListBtn).to({ bottom: 37 }, 100).to({ bottom: 27 }, 100);
            for (var i in data) {
                var value = data[i];
                var war = this['war' + i];
                war.updateTotalValue(value, true);
                rbwar.RBWUtils.otherPlayFjb();
                this.otherPeopleYZ(value, parseInt(i));
            }
        };
        RBWarGameScene.prototype.showRoomStatus = function (reconnect) {
            if (reconnect === void 0) { reconnect = false; }
            var roomInfo = Global.roomProxy.roomInfo;
            switch (roomInfo.roundStatus) {
                case ROOM_STATUS.FREE:
                case ROOM_STATUS.START:
                    this.statusLabel.text = "准备中";
                    if (reconnect) {
                        this.onLineCards(3);
                        this.showFen(2);
                        this.showPlayers();
                        this.showHeaders();
                        this.timeOut(3);
                        this.vsMovie(2);
                    }
                    break;
                case ROOM_STATUS.NEW_CARD:
                    this.statusLabel.text = "准备中";
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showFen(2);
                        this.showPlayers();
                        this.showHeaders();
                        this.timeOut(3);
                        this.vsMovie(2);
                    }
                    break;
                case ROOM_STATUS.BET:
                    this.statusLabel.text = "下注中";
                    this.lastYzIsTouch = false;
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showFen(2);
                        this.showPlayers();
                        this.showHeaders();
                        this.timeOut(4);
                        this.vsMovie(2);
                    }
                    this.lockYZ = false;
                    if (_.keys(this.lastYZData).length > 0) {
                        this.xyBtn.setGray(false);
                    }
                    break;
                case ROOM_STATUS.STOP:
                    this.lockYZ = true;
                    this.statusLabel.text = "比牌中";
                    if (reconnect) {
                        this.onLineCards(1);
                        this.showFen(2);
                        this.showPlayers();
                        this.showHeaders();
                        this.timeOut(3);
                        this.vsMovie(3);
                    }
                    break;
                case ROOM_STATUS.SETTLEMENT:
                    this.statusLabel.text = "结算中";
                    //smart 
                    this.vsGroup.visible = false;
                    if (reconnect) {
                        this.onLineCards(2);
                        this.timeOut(3);
                        this.vsMovie(3);
                        this.showFen(1, Global.roomProxy.roomInfo.r_roundPattern, 1);
                        this.showFen(1, Global.roomProxy.roomInfo.b_roundPattern, 2);
                        this.showHeaders();
                        this.showPlayers();
                    }
                    break;
            }
        };
        RBWarGameScene.prototype.updateGoldByHeader = function (header, gold, isAdd, bolen) {
            var _this = this;
            if (Global.roomProxy.checkIndexIsMe(header.index)) {
                this.header1.updateGold(0, isAdd);
                this.setAutoTimeout(function () {
                    if (bolen) {
                        _this.header1.showLiushuiLabel(gold);
                    }
                }, this, 1000);
            }
            else {
                if (header) {
                    header.updateGold(gold, isAdd);
                }
            }
        };
        RBWarGameScene.prototype.updateGoldByIndex = function (pIndex, gold, isAdd, bolen) {
            var _this = this;
            var header = this.getHeaderByIndex(pIndex);
            if (Global.roomProxy.checkIndexIsMe(pIndex)) {
                this.header1.updateGold(0, isAdd);
                this.setAutoTimeout(function () {
                    if (bolen) {
                        _this.header1.showLiushuiLabel(gold);
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
        RBWarGameScene.prototype.getBetInfoTotal = function (betInfo) {
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
        RBWarGameScene.prototype.getBetInfoTotalByType = function (betInfo, type) {
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
        RBWarGameScene.prototype.getLastYzTotal = function () {
            var gold = 0;
            for (var key in this.lastYZData) {
                var numJson = this.lastYZData[key];
                for (var num in numJson) {
                    var count = numJson[num];
                    gold += count * Number(num);
                }
            }
            return gold;
        };
        RBWarGameScene.prototype.clearRoom = function () {
            this.cmGroup1.removeChildren();
            this.cmGroup2.removeChildren();
            this.cmGroup3.removeChildren();
            this.cmList1 = [];
            this.cmList2 = [];
            this.cmList3 = [];
            this.clearWarScores();
            this.luckStar.x = 1000;
            this.luckStar0.x = 1000;
            this.luckStar0.y = 0;
        };
        RBWarGameScene.prototype.clearWarScores = function () {
            for (var i = 1; i <= 3; i++) {
                this.updateWarScore(1, i, 0, false);
                this.updateWarScore(2, i, 0, false);
            }
        };
        //续压有关
        RBWarGameScene.prototype.xyBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var total, lastXiazhu, path, data, resp, player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.lockYZ) {
                                this.showTips("非下注阶段，无法下注");
                                return [2 /*return*/];
                            }
                            total = this.getLastYzTotal();
                            if (!Global.roomProxy.checkGold(total)) {
                                this.showTips("金币不足");
                                return [2 /*return*/];
                            }
                            this.xyBtn.setGray(true);
                            this.lastYzIsTouch = true;
                            lastXiazhu = this.lastYZData;
                            path = ServerPostPath.game_rbWarHandler_c_bet;
                            data = { betInfo: lastXiazhu };
                            return [4 /*yield*/, Global.pomelo.request(path, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp && resp.error && resp.error.code != 0) {
                                this.lastYzIsTouch = false;
                                this.xyBtn.setGray(false);
                                this.showTips(resp.error.msg);
                            }
                            else {
                                player = Global.roomProxy.getMineData();
                                player.betInfo = resp;
                                this.header1.updateGold(total * -1, true);
                                this.showXYAni(lastXiazhu);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        RBWarGameScene.prototype.showXYAni = function (lastYZData) {
            //飞金币
            //  {type:{1: value}}
            for (var key in lastYZData) {
                // {1: value}
                var typeTotal = 0;
                var valueJson = lastYZData[key];
                for (var num in valueJson) {
                    var count = valueJson[num];
                    typeTotal += count * Number(num);
                    for (var i = 0; i < count; i++) {
                        this.playerYZ(Number(num), Number(key), this.header1);
                    }
                }
                var war = this['war' + key];
                war.updateMyValue(typeTotal, true);
                war.updateTotalValue(typeTotal, true);
            }
        };
        RBWarGameScene.prototype.add2LastYz = function (money, type, num) {
            if (!this.lastYZData) {
                this.lastYZData = {};
            }
            if (!this.lastYZData[type]) {
                this.lastYZData[type] = {};
            }
            if (!this.lastYZData[type][money]) {
                this.lastYZData[type][money] = 1;
            }
            else {
                this.lastYZData[type][money] += num;
            }
        };
        /**
         * 断线重连
         */
        RBWarGameScene.prototype.reconnectSuc = function (e) {
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
                                this.reloadGame();
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
         * vs动画
         */
        RBWarGameScene.prototype.vsMovie = function (type) {
            if (type == 1) {
                // egret.Tween.removeTweens(this.vs_s);
                // egret.Tween.removeTweens(this.vs_v);
                // this.vs_v.y = -30;
                // this.vs_s.y = 56;
                // this.vs_g.visible = false;
                this.vsGroup.visible = true;
                // egret.Tween.get(this.vs_v).to({ y: 8 }, 120).to({ y: 5 }, 80);
                // egret.Tween.get(this.vs_s).to({ y: 19 }, 120);
                //新增vs动画
                this.vsDBAni();
                this.setAutoTimeout(function () {
                    //this.vs_g.visible = true;
                }, this, 120);
                this.setAutoTimeout(function () {
                    //this.vs_g.visible = false;
                }, this, 200);
            }
            else if (type == 3) {
                this.vsGroup.visible = true;
                //this.vs_g.visible = false;
            }
            else {
                this.vsGroup.visible = false;
            }
        };
        /**vs的龙骨动画 */
        RBWarGameScene.prototype.vsDBAni = function () {
            var _this = this;
            if (this.vsDB) {
                game.UIUtils.removeSelf(this.vsDB);
                this.vsDB = null;
            }
            this.vsDB = new DBComponent("hhdz_vs");
            this.vsDB.callback = function () {
                _this.vsDB.play("hhdz_vs_loop", -1);
                // game.UIUtils.removeSelf(db)
                // db = null;
            };
            this.vsGroup.addChild(this.vsDB);
            this.vsDB.play("hhdz_vs", 1);
        };
        return RBWarGameScene;
    }(game.BaseGameScene));
    rbwar.RBWarGameScene = RBWarGameScene;
    __reflect(RBWarGameScene.prototype, "rbwar.RBWarGameScene");
})(rbwar || (rbwar = {}));
var ROOM_STATUS = {
    FREE: 1,
    START: 2,
    NEW_CARD: 3,
    BET: 4,
    STOP: 5,
    SETTLEMENT: 6,
};
var RBW_PATTERN = {
    0: "散牌",
    1: "对子",
    2: "顺子",
    3: "金花",
    4: "顺金",
    5: "豹子",
    6: "对七"
};
