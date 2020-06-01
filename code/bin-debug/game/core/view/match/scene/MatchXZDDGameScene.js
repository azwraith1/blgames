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
/*
 * @Author: MC Lee
 * @Date: 2019-11-27 14:34:11
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-23 11:56:04
 * @Description: 血战到底比赛场
 */
var majiang;
(function (majiang) {
    var MatchXZDDGameScene = (function (_super) {
        __extends(MatchXZDDGameScene, _super);
        function MatchXZDDGameScene() {
            var _this = _super.call(this) || this;
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_MATCH_MJXZDD;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_MATCH_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_MATCH_MJXZDD;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD_MATCHING;
            /**
             * 结算界面
             */
            _this.GAME_OVER_NOTIFY = SceneNotify.CLOSE_MATCH_OVER_MJXZDD;
            /**
             * 背景音乐
             */
            _this.bgMusic = "m_mjxzdd_bg1_mp3";
            _this.groupIndex = 1;
            _this.skinName = new majiang.XZDDMatchSceneSkin();
            return _this;
        }
        MatchXZDDGameScene.prototype.s_pushRaceInvite = function () {
        };
        MatchXZDDGameScene.prototype.clubInvite = function (e) {
        };
        MatchXZDDGameScene.prototype.updateGold = function () {
        };
        MatchXZDDGameScene.prototype.createChildren = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.createChildren.call(this);
                    RES.loadGroup("match_back");
                    RES.loadGroup("majiang_back");
                    this.showMatchInfo();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 显示比赛场的信息
         */
        MatchXZDDGameScene.prototype.showMatchInfo = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var mineData = Global.gameProxy.getMineGameData();
            var mineRank = 1;
            if (roomInfo.raceType == 2) {
                //定局积分
                this.peopleGroup.visible = false;
                this.group4Label1.text = roomInfo.raceNum + "/" + roomInfo.raceMaxNum;
                var players = roomInfo.players;
                for (var key in players) {
                    var playerData = players[key];
                    if (key != Global.gameProxy.getMineIndex() + "") {
                        //对比分数
                        if (playerData.gold > mineData.gold) {
                            mineRank++;
                        }
                    }
                    else {
                        if (!Global.gameProxy.reconnect) {
                            if (roomInfo.raceNum == 1) {
                                var beforeScore = playerData.beforeScore;
                                if (beforeScore) {
                                    TipsCompoment.instance.show("\u60A8\u7684\u4E0A\u4E00\u8F6E\u79EF\u5206" + beforeScore + ",\u8F6C\u6362\u4E3A\u672C\u8F6E\u79EF\u5206" + playerData.gold);
                                }
                            }
                        }
                    }
                }
                this.group4Label2.text = mineRank + "/4";
                this.group1.visible = this.group2.visible = this.group3.visible = false;
                this.group5.visible = this.group4.visible = true;
                this.group5.alpha = 0;
                var passLevels = roomInfo.passLevels;
                var index = passLevels.indexOf(roomInfo.curLevel);
                if (index == passLevels.length - 1) {
                    this.group5Label1.text = "\u51B3\u8D5B";
                }
                else {
                    var before = passLevels[index - 1];
                    this.group5Label1.text = "\u5F53\u524D" + before + "\u8FDB" + roomInfo.curLevel;
                }
                this.showDJYFAni();
            }
            else {
                //group1
                this.totalLabel.text = roomInfo.cutoffNum + "";
                this.passLabel.text = roomInfo.advanceNum;
                //group2
                this.group2Label1.text = "\u7B2C" + roomInfo.raceNum + "\u5C40";
                this.group2Label2.text = roomInfo.betBase;
                //group3
                this.group3Label1.text = "" + roomInfo.outScore;
                this.group5.visible = this.group4.visible = false;
                this.group1.visible = this.group2.visible = this.group3.visible = true;
                this.group2.alpha = this.group3.alpha = 0;
                this.group1.alpha = 1;
                this.peopleLabel.text = mineData.raceRank + "/" + roomInfo.remainPlayerSize;
                this.showDaliChujuAni();
            }
            var activityData = Global.gameProxy.matchItemData;
            this.titleLabel.text = activityData.title;
        };
        MatchXZDDGameScene.prototype.showDaliChujuAni = function () {
            var _this = this;
            var time = 3000;
            this.groupAniInterval = egret.setInterval(function () {
                egret.Tween.get(_this["group" + _this.groupIndex]).to({
                    alpha: 0
                }, 300);
                var nextGroup = _this.groupIndex + 1;
                if (nextGroup > 3) {
                    nextGroup = 1;
                }
                egret.Tween.get(_this["group" + nextGroup]).wait(300).to({
                    alpha: 1
                }, 300);
                _this.groupIndex = nextGroup;
            }, this, 3000);
        };
        /**
         * 定局积分东华
         */
        MatchXZDDGameScene.prototype.showDJYFAni = function () {
            var _this = this;
            var time = 3000;
            this.groupIndex = 4;
            this.groupAniInterval = egret.setInterval(function () {
                egret.Tween.get(_this["group" + _this.groupIndex]).to({
                    alpha: 0
                }, 300);
                var nextGroup = _this.groupIndex + 1;
                if (nextGroup > 5) {
                    nextGroup = 4;
                }
                egret.Tween.get(_this["group" + nextGroup]).wait(300).to({
                    alpha: 1
                }, 300);
                _this.groupIndex = nextGroup;
            }, this, 3000);
        };
        /**
         * 定局积分
         */
        MatchXZDDGameScene.prototype.showDingju = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var db;
            if (roomInfo.raceType == 2) {
                if (roomInfo.lastRace) {
                    db = new DBComponent("bsc_notice1");
                }
                else {
                    db = new DBComponent("bsc_notice2");
                }
                if (db) {
                    db.playByFilename(1);
                    this.effectGroup.addChild(db);
                    db.horizontalCenter = 0;
                    db.verticalCenter = 0;
                }
            }
        };
        MatchXZDDGameScene.prototype.showLunciAni = function () {
        };
        /**
         * 牌局开始的动画
         * @param  {} callback
         */
        MatchXZDDGameScene.prototype.showStartAni = function (callback) {
            var nickname = Global.playerProxy.playerData.nickname;
            var roomInfo = Global.gameProxy.roomInfo;
            var db;
            if (roomInfo.raceType == 2) {
                if (roomInfo.lastRace == 1) {
                    db = new DBComponent("bsc_notice1");
                }
                else {
                    db = new DBComponent("bsc_notice2");
                }
                if (db) {
                    db.playByFilename(1);
                    this.effectGroup.addChild(db);
                    if (roomInfo.lastRace == 1) {
                        db.armature.x = 280;
                    }
                    else {
                        db.armature.x = 500;
                    }
                    db.horizontalCenter = -200;
                    db.verticalCenter = 0;
                }
            }
            else {
                var startDb = new DBComponent("bsc_startgame");
                this.effectGroup.addChild(startDb);
                startDb.playByFilename(1);
                startDb.horizontalCenter = 0;
                startDb.verticalCenter = 0;
            }
            SoundManager.getInstance().playEffect("m_match_start_mp3");
            this.setAutoTimeout(function () {
                callback();
            }, this, 500);
        };
        MatchXZDDGameScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_pushRaceSettlementInfo, this.matchSettlement, this);
            CF.aE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
            CF.aE(ServerNotify.s_pushRaceWaitInfo, this.s_pushRaceWaitInfo, this);
            CF.aE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
            CF.aE(ENo.RANK_FLUSH, this.rankFlush, this);
        };
        MatchXZDDGameScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_pushRaceSettlementInfo, this.matchSettlement, this);
            CF.rE(ServerNotify.s_pushRaceReward, this.s_pushRaceReward, this);
            CF.rE(ServerNotify.s_pushRaceWaitInfo, this.s_pushRaceWaitInfo, this);
            CF.rE(ENo.RANK_FLUSH, this.rankFlush, this);
            CF.rE(ServerNotify.s_pushRemainTableNum, this.s_pushRemainTableNum, this);
            egret.clearInterval(this.groupAniInterval);
        };
        /**
         * 断线重连
         */
        MatchXZDDGameScene.prototype.reconnectSuc = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var reqData;
                return __generator(this, function (_a) {
                    //对局已经结束不做处理
                    if (this.majiangStatus == MajiangStatusEnum.OVER) {
                        return [2 /*return*/];
                    }
                    if (this.allowBack) {
                        Global.pomelo.disConnect();
                        Global.alertMediator.addAlert("网络错误,请重新进入游戏!", function () {
                            FrameUtils.flushWindow();
                        }, null, true);
                        return [2 /*return*/];
                    }
                    reqData = Global.gameProxy.lastGameConfig;
                    if (!reqData)
                        reqData = {};
                    if (!Global.gameProxy.roomInfo || !Global.gameProxy.roomInfo.roomId) {
                        this.backHall();
                        return [2 /*return*/];
                    }
                    if (Global.gameProxy.lastGameConfig && !Global.gameProxy.lastGameConfig.gameId) {
                        Global.gameProxy.lastGameConfig.gameId = Global.gameProxy.roomInfo.gameId;
                    }
                    reqData.roomId = Global.gameProxy.roomInfo.roomId;
                    reqData.gameId = Global.gameProxy.roomInfo.gameId;
                    reqData.sceneId = 1001;
                    if (reqData)
                        this.reconnectCall(reqData, Global.gameProxy);
                    return [2 /*return*/];
                });
            });
        };
        MatchXZDDGameScene.prototype.rankFlush = function (e) {
            var rank = e.data;
            this.peopleLabel.text = rank + "/" + Global.gameProxy.roomInfo.remainPlayerSize;
        };
        MatchXZDDGameScene.prototype.s_pushRemainTableNum = function (e) {
            var tableNum = e.data.remainTableNum;
            Global.gameProxy.roomInfo.remainTableNum = tableNum;
        };
        MatchXZDDGameScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (e.target) {
                        case this.peopleImage:
                            this.showRankPanel();
                            break;
                        default:
                            _super.prototype.onTouchTap.call(this, e);
                    }
                    return [2 /*return*/];
                });
            });
        };
        MatchXZDDGameScene.prototype.showRankPanel = function () {
            MatchRankPanel.instance.show();
        };
        MatchXZDDGameScene.prototype.s_pushRaceReward = function (e) {
            var data = e.data;
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.rewardDatas = data;
        };
        MatchXZDDGameScene.prototype.s_pushRaceWaitInfo = function (e) {
            var data = e.data;
            var roomInfo = Global.gameProxy.roomInfo;
            roomInfo.levelDatas = data;
        };
        /**
         * 展现玩家头像
         */
        MatchXZDDGameScene.prototype.showHeaders = function () {
            var players = Global.gameProxy.getPlayers();
            var zhuangId = Global.gameProxy.roomInfo.dealer;
            for (var key in players) {
                var playerData = players[key];
                var dir = this.directions[key];
                var header = this[dir + 'Header'];
                header.initWithData(playerData, dir);
                header.showIsZhuang(game.Utils.valueEqual(zhuangId, key));
                header.visible = true;
                if (playerData.isBaoTing) {
                    header.showTingImages(false);
                }
            }
        };
        MatchXZDDGameScene.prototype.matchSettlement = function (e) {
            var _this = this;
            this.restartBtn.visible = false;
            this.majiangStatus = MajiangStatusEnum.OVER;
            this.gameTipsGroup.visible = this.gameTipsGroup2.visible = false;
            this.timeDirectionBar.removeTimer();
            this.timeDirectionBar.removeAllTween();
            this.taskBar.hideAllBtns();
            Global.gameProxy.roomInfo.curPlay = 0;
            this.showHeaderTips(Global.gameProxy.roomInfo);
            this.tgGroup.visible = false;
            var resp = e.data;
            LogUtils.logD("======血流成河结算数据==========" + JSON.stringify(resp));
            var players = resp.players;
            this.gameOverShow(players);
            var roomInfo = Global.gameProxy.roomInfo;
            if (resp.rank) {
                roomInfo.currentRank = resp.rank;
            }
            this.showDuijuAni(function () {
                if (!Global.gameProxy.roomInfo) {
                    return;
                }
                //修改所有玩家金币至抽水过后的金币
                for (var index in players) {
                    var goldData = players[index];
                    //本桌排名
                    if (goldData.rank && Global.gameProxy.checkIndexIsMe(index)) {
                        roomInfo.tableRank = goldData.rank;
                    }
                    var header = _this.getHeaderByDirection(index);
                    goldData.ownGold = goldData.score;
                    header.updateGold(goldData.score);
                }
                var mineData = Global.gameProxy.getMineGameData();
                MatchRankPanel.instance.hide();
                MatchXZDDSettlePanel.instance.show(resp);
            });
        };
        MatchXZDDGameScene.prototype.checkPlayerIsOver = function () {
        };
        /*
         * 更新金币。
         */
        MatchXZDDGameScene.prototype.syncGold = function (syncData) {
            var _this = this;
            var _loop_1 = function (key) {
                var dirction = this_1.directions[key];
                var info = syncData[key].info;
                info.gainGold = info.gainGold;
                info.ownGold = info.ownGold;
                LogUtils.logD("info.gainGold= " + info.gainGold);
                if (dirction == "mine") {
                    Global.gameProxy.getMineGameData().gold = info.ownGold;
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
                this_1.getHeaderByDirection(key).updateGold(info.ownGold);
            };
            var this_1 = this;
            for (var key in syncData) {
                _loop_1(key);
            }
            this.flushDJJFRank();
        };
        /**
         * 显示血战到底胡牌的提示
         */
        MatchXZDDGameScene.prototype.addXZDDHuTip = function (from, playerIndex, ani) {
            if (ani === void 0) { ani = false; }
            var roomInfo = Global.gameProxy.roomInfo;
            if (roomInfo.gameId != MajiangConfig.MJXZDD) {
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
        MatchXZDDGameScene.prototype.flushDJJFRank = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var mineRank = 1;
            var mineData = Global.gameProxy.getMineGameData();
            if (roomInfo.raceType == 2) {
                //定局积分
                var players = roomInfo.players;
                for (var key in players) {
                    var playerData = players[key];
                    if (key != Global.gameProxy.getMineIndex() + "") {
                        //对比分数
                        if (playerData.gold > mineData.gold) {
                            mineRank++;
                        }
                    }
                }
                this.group4Label2.text = mineRank + "/4";
            }
        };
        return MatchXZDDGameScene;
    }(majiang.XZDDGameScene));
    majiang.MatchXZDDGameScene = MatchXZDDGameScene;
    __reflect(MatchXZDDGameScene.prototype, "majiang.MatchXZDDGameScene");
})(majiang || (majiang = {}));
