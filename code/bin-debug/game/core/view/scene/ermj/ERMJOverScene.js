/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-25 18:47:28
 @Description: 麻将结算界面
 */
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
    var ERMJOverScene = (function (_super) {
        __extends(ERMJOverScene, _super);
        function ERMJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.isClubGame = false;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_ERMJ_OVER;
            _this.CLOSE_NOTIFY2 = SceneNotify.CLOSE_ERMJ;
            _this.settleData = settleData;
            _this.skinName = new ERMJOverSceneSkin();
            return _this;
        }
        ERMJOverScene.prototype.onAdded = function () {
            // roundPatternScore
            // roundPattern
            _super.prototype.onAdded.call(this);
            this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        ERMJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        ERMJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        ERMJOverScene.prototype.initHeaders = function () {
            //排序
            var roomInfo = Global.gameProxy.roomInfo;
            var players = roomInfo.players;
            var settlePlayers = this.settleData.players;
            //赢家和第一的换
            var winSettle = [];
            var failSettle = [];
            for (var key in settlePlayers) {
                var settle = settlePlayers[key];
                if (settle.gainGold > 0) {
                    winSettle.push(key);
                }
                else {
                    failSettle.push(key);
                }
            }
            var mineIndex = Global.gameProxy.getMineIndex();
            var otherIndex = 2;
            if (mineIndex == 2) {
                otherIndex = 1;
            }
            var mineData = Global.gameProxy.getMineGameData();
            this.nameLabel1.text = mineData.nickname;
            var headerId = mineData['figureUrl'] || mineData.figure_url;
            this.header1.source = "hall_header_" + mineData.sex + "_" + headerId + "_png";
            var mineGainGold = settlePlayers[mineIndex].gainGold;
            if (mineGainGold >= 0) {
                this.showMineWin();
            }
            else {
                this.showOtherWin();
            }
            if (settlePlayers[mineIndex].ownGold <= 0) {
                this["renshu1"].visible = true;
            }
            this.goldLabel1.text = mineGainGold > 0 ? "+" + mineGainGold : mineGainGold;
            //2号玩家
            var otherData = Global.gameProxy.getPlayerByIndex(otherIndex);
            this.nameLabel2.text = otherData.nickname;
            var otherDataGold = settlePlayers[otherIndex].gainGold;
            if (settlePlayers[otherIndex].ownGold <= 0) {
                this["renshu2"].visible = true;
            }
            var headerId1 = otherData['figureUrl'] || otherData.figure_url;
            this.header2.source = "hall_header_" + otherData.sex + "_" + headerId1 + "_png";
            this.goldLabel2.text = otherDataGold > 0 ? "+" + otherDataGold : otherDataGold;
            for (var i = 0; i < winSettle.length; i++) {
                var index = winSettle[i];
                var playerData = players[index];
                var settle = settlePlayers[index];
                this.goldLabel3.text = "+" + settle.gainGold;
                this.fanLabel.text = settle.roundPatternScore;
                if (settle.passHuTimes > 0) {
                    settle.roundPattern.push(110);
                    settle.roundPatternScoreArray.push(settle.passHuTimes);
                }
                this.showPais(settle);
                this.showFans(settle.roundPattern, settle.roundPatternScoreArray);
            }
        };
        ERMJOverScene.prototype.showOtherWin = function () {
            this.bgImage.source = RES.getRes("ermj_over_bg_1_png");
            this.headerbg2.source = RES.getRes("ermj_over_headerbg_1_png");
            this.headerbg1.source = RES.getRes("ermj_over_headerbg_2_png");
            this.nameLabel2.textColor = 0xfefab2;
            this.nameLabel2.strokeColor = 0xca7202;
            this.nameLabel1.textColor = 0xbdfde9;
            this.nameLabel1.strokeColor = 0x066d62;
            this.typeImage.source = RES.getRes("ermj_over_type_2_png");
            this.goldLabel2.font = "ermj_over_win1_fnt";
            this.goldLabel1.font = "ermj_over_lose_fnt";
            this.winTypeImage.source = RES.getRes("ermj_over_hutip_2_png");
        };
        /**
         * 转换为赢家的样子
         */
        ERMJOverScene.prototype.showMineWin = function () {
            this.bgImage.source = RES.getRes("ermj_over_bg_2_png");
            this.headerbg1.source = RES.getRes("ermj_over_headerbg_1_png");
            this.headerbg2.source = RES.getRes("ermj_over_headerbg_2_png");
            this.nameLabel1.textColor = 0xfefab2;
            this.nameLabel1.strokeColor = 0xca7202;
            this.nameLabel2.textColor = 0xbdfde9;
            this.nameLabel2.strokeColor = 0x066d62;
            this.typeImage.source = RES.getRes("ermj_over_type_1_png");
            this.goldLabel1.font = "ermj_over_win1_fnt";
            this.goldLabel2.font = "ermj_over_lose_fnt";
            this.winTypeImage.source = RES.getRes("ermj_over_hutip_1_png");
        };
        ERMJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showPais(this.settleData.players[this.settleData.winPlayer]);
            this.initHeaders();
            this.paiGroup.touchChildren = false;
            this.paiGroup.touchThrough = false;
            this.alpha = 0;
            egret.Tween.get(this).to({
                alpha: 1
            }, 1000, egret.Ease.circIn);
        };
        ERMJOverScene.prototype.showFans = function (fans, scores) {
            for (var i = 0; i < fans.length; i++) {
                var fanCount = new ERMJPatternItem(fans[i], scores[i]);
                this.contentGroup.addChild(fanCount);
            }
        };
        ERMJOverScene.prototype.createPai = function (value) {
            var shoupai = new majiang.MineShoupai(value);
            shoupai.resetValue(value);
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            return shoupai;
        };
        ERMJOverScene.prototype.showPais = function (playerData) {
            //吃 碰 杠
            var x = 0;
            var chiCards = playerData.chiCards; //selectCard
            // chiCards = [14];
            for (var i = 0; i < chiCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_1 = this.createPai(chiCards[i].selectCard - j);
                    shoupai_1.x = x;
                    x += shoupai_1.width * shoupai_1.scaleX - 0.75;
                }
                x += 5;
            }
            var pengCards = playerData.pengCards; //number
            for (var i = 0; i < pengCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_2 = this.createPai(pengCards[i]);
                    shoupai_2.x = x;
                    x += shoupai_2.width * shoupai_2.scaleX - 0.75;
                }
                x += 5;
            }
            var gangCards = playerData.gangCards; //card
            // gangCards = [14];
            for (var i = 0; i < gangCards.length; i++) {
                var gangData = gangCards[i];
                for (var j = 1; j <= 4; j++) {
                    if (gangData.gang == 2 || gangData.gang == 4) {
                        if (j == 4) {
                            var card = new eui.Image("mj_paibei_png");
                            card.scaleX = card.scaleY = 0.45;
                            card.x = x + 0.75;
                            card.y = 1;
                            this.paiGroup.addChild(card);
                            x += card.width * card.scaleX - 0.75;
                        }
                        else {
                            var shoupai_3 = this.createPai(gangCards[i].card);
                            shoupai_3.x = x;
                            x += shoupai_3.width * shoupai_3.scaleX - 0.75;
                        }
                    }
                    else {
                        var shoupai_4 = this.createPai(gangCards[i].card);
                        shoupai_4.x = x;
                        x += shoupai_4.width * shoupai_4.scaleX - 0.75;
                    }
                }
                x += 5;
            }
            // return;
            var huaCards = playerData.huaCards; //Number
            // huaCards = [55, 56, 57, 58];
            for (var i = 0; i < huaCards.length; i++) {
                var shoupai_5 = this.createPai(huaCards[i]);
                shoupai_5.x = x;
                x += shoupai_5.width * shoupai_5.scaleX - 0.75;
                // x += 5;
            }
            x += 5;
            // return;
            var handCards = playerData.handCards; //number	
            // handCards = { 12: 2, 13: 3, 14: 2 };
            for (var key in handCards) {
                var handCount = handCards[key];
                for (var i = 0; i < handCount; i++) {
                    var shoupai_6 = this.createPai(Number(key));
                    shoupai_6.x = x;
                    x += shoupai_6.width * shoupai_6.scaleX - 0.75;
                }
            }
            //间隔
            x += 5;
            var huCards = playerData.huCards; //number	
            // huCards = [13];
            var shoupai = this.createPai(huCards[0]);
            shoupai.x = x;
        };
        /**
         * 判断分数正负颜色
         */
        ERMJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        ERMJOverScene.prototype.nextBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var backHall, roomInfo, quitResp, data, quitResp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.lockReq) {
                                return [2 /*return*/];
                            }
                            this.lockReq = true;
                            backHall = function () {
                                CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_ERMJ);
                                CF.sN(SceneNotify.OPEN_ERMJ_HALL);
                            };
                            egret.setTimeout(function () {
                                _this.lockReq = false;
                            }, this, 5000);
                            roomInfo = Global.gameProxy.roomInfo;
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 1:
                            quitResp = _a.sent();
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            if (!quitResp) return [3 /*break*/, 3];
                            if (quitResp.error && quitResp.error.code != ErrorCode.ROOM_NOT_EXIST) {
                                if (quitResp.error.code != ErrorCode.ROOM_PLAYING) {
                                    backHall();
                                }
                                Global.alertMediator.addAlert(quitResp.error.msg, function () {
                                }, null, true);
                                return [2 /*return*/];
                            }
                            delete Global.gameProxy.lastGameConfig['roomId'];
                            data = _.clone(Global.gameProxy.lastGameConfig);
                            data['isContinue'] = true;
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_enter, data)];
                        case 2:
                            quitResp1 = _a.sent();
                            if (quitResp1) {
                                CF.sN(SceneNotify.OPEN_ERMJ_MATCHING, Global.gameProxy.lastGameConfig);
                                CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_ERMJ);
                            }
                            else {
                                Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                    backHall();
                                }, null, true);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                backHall();
                            }, null, true);
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 点击方法
         */
        ERMJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.playBtn://下一局
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    ERenClubReadyScene.instance.show(true);
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.CLOSE_NOTIFY2);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.CLOSE_NOTIFY2);
                                });
                                return [2 /*return*/];
                            }
                            this.nextBtnTouch();
                            break;
                        case this.backBtn://退出
                            CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
                            CF.sN(SceneNotify.CLOSE_ERMJ_OVER);
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        ERMJOverScene.prototype.back2ReadyScene = function (successCall, failCall) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ClubManager.instance.flushClubTable(successCall, failCall)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ERMJOverScene;
    }(game.BaseComponent));
    majiang.ERMJOverScene = ERMJOverScene;
    __reflect(ERMJOverScene.prototype, "majiang.ERMJOverScene");
})(majiang || (majiang = {}));
