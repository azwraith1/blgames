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
    var HZMJOverScene = (function (_super) {
        __extends(HZMJOverScene, _super);
        function HZMJOverScene(settleData) {
            var _this = _super.call(this) || this;
            _this.currentIndex = 0;
            _this.maxIndex = 0;
            _this.settleData = settleData;
            //LogUtils.logDJ(this.settleData);
            LogUtils.logD(" ========================game  is  HZMJOverScene=============================");
            //LogUtils.logD(JSON.stringify(this.settleData, null, "\t"));
            LogUtils.logDJ(_this.settleData);
            LogUtils.logD(" ========================game  is  HZMJOverScene==============================");
            //this.skinName = new HNMJOverSceneSkin();
            _this.skinName = "resource/skins/scene/hzmj/HZMJOverSceneSkin.exml";
            return _this;
        }
        HZMJOverScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        HZMJOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        HZMJOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        HZMJOverScene.prototype.showWinPlayerInfos = function (winPlayers) {
            var mineIndex = Global.gameProxy.getMineIndex();
            for (var i = 0; i < winPlayers.length; i++) {
                var winIndex = winPlayers[i];
                var direction = this.directions[winIndex];
                var winPlayerData = this.settleData.players[winIndex];
                //创建一个图片一个倍数
                var item = this["item" + winIndex];
                item.showWinInfo(winPlayerData);
            }
        };
        /**
         * 展示赢家的牌
         */
        HZMJOverScene.prototype.showWinPlayers = function (winPlayerIndex) {
            var winPlayerData = this.settleData.players[winPlayerIndex];
            var index = this.settleData.winPlayer[this.currentIndex];
            var direction = this.directions[index];
            //创建一个图片一个倍数
            var image = new eui.Image(RES.getRes("hzmj_over_hutip_" + direction + "_png"));
            this.huInfoGroup.addChild(image);
            var _allWinBeiShu = winPlayerData.roundPatternScore;
            var label = new eui.BitmapLabel("" + winPlayerData.roundPatternScore + "b");
            label.font = "hzmj_over_font_1_fnt";
            label.scaleX = label.scaleY = 1.05;
            this.huInfoGroup.addChild(label);
        };
        /**
         * 显示玩家名称头像
         */
        HZMJOverScene.prototype.showPlayerInfos = function (index) {
            var playerData = Global.gameProxy.getPlayerByIndex(index);
            var item = this["item" + index];
            item.showPlayerDatas(playerData);
        };
        HZMJOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //LogUtils.logD("this is in gameover========================== create children");
            var mineIndex = Global.gameProxy.getMineIndex();
            // //=====>test
            // if (!mineIndex) mineIndex = 1;
            // //====>test
            var item = this["item" + mineIndex];
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 4);
            this.huInfoGroup.removeChildren();
            var winPlayer = this.settleData.winPlayer || [];
            // //===>test
            // if (!winPlayer || winPlayer.length == 0) winPlayer = this.settleData.winPlayerIndex;
            // //test
            if (winPlayer.length > 0) {
                this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
                this.maxIndex = this.settleData.winPlayer.length;
                this.showPais(this.settleData.players[this.settleData.winPlayer[0]]);
                //改变赢家 的背景图 和线
                var item_1 = this["item" + this.settleData.winPlayer[0]];
                // item.change2Win();
                //	this.flushBtn.visible = this.maxIndex >= 1;
            }
            //this.showPlayerInfos(winPlayer);
            this.setLiuShui(winPlayer, mineIndex);
            this.currentIndex = 0;
            this.paiGroup.touchChildren = false;
            this.paiGroup.touchThrough = false;
            this.alpha = 0;
            egret.Tween.get(this).to({
                alpha: 1
            }, 1000, egret.Ease.circIn);
        };
        /**流水 */
        HZMJOverScene.prototype.setLiuShui = function (winPlayer, mineIndex) {
            if (winPlayer.length <= 0)
                return;
            var _winPlayer = this.settleData.winPlayer[0];
            // //===>test
            // if (!winPlayer || winPlayer.length == 0) winPlayer = this.settleData.winPlayerIndex[0]
            // //test
            var _roomInfor = Global.gameProxy.roomInfo;
            var _beishu;
            var _score;
            for (var key in this.settleData.players) {
                var _item = this["item" + key];
                // _item.setWeiZhiLable()
                var _data = this.settleData.players[key];
                var _direction = this.directions[key];
                _item.setWeiZhiLable(_direction);
                _score = _data["gainGold"];
                var _owenGold = Number(_data["ownGold"]);
                //_owenGold = 0;
                _item.showPoChan(_owenGold);
                if (Number(key) == Number(mineIndex))
                    _item.setPlayerPanel();
                _beishu = _data["score"];
                //渲染赢家和输家
                if (key == winPlayer) {
                    /**设置赢的分数和倍数*/
                    _item.showBeiShu(_beishu, true);
                }
                else {
                    //	_beishu = Number(_data["bills"][0]["info"]["score"]);
                    _item.showBeiShu(_beishu);
                }
                if (key == _roomInfor.dealer.toString()) {
                    _item.zhuangImg.visible = true;
                    _item.mineTip.visible = false;
                }
                this.showPlayerInfos(key);
                _item.showScore(_score);
            }
        };
        HZMJOverScene.prototype.createPai = function (value) {
            var shoupai = new majiang.HZMJMineShoupai(value);
            shoupai.resetValue(value);
            shoupai.scaleX = shoupai.scaleY = 0.45;
            this.paiGroup.addChild(shoupai);
            return shoupai;
        };
        HZMJOverScene.prototype.showPais = function (playerData) {
            var labelText = "";
            var roundPattern = playerData.roundPattern;
            var roundPatternScoreArray = playerData.roundPatternScoreArray;
            for (var i = 0; i < roundPattern.length; i++) {
                labelText += HZMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
            }
            this.huInfoLabel.text = labelText;
            //吃 碰 杠
            var x = 0;
            var handCards = playerData.handCards; //number	
            //癞子
            var baoCard = Global.gameProxy.roomInfo.baoCards[0];
            var handCount = handCards[baoCard];
            for (var i = 0; i < handCount; i++) {
                var shoupai_1 = this.createPai(baoCard);
                shoupai_1.x = x;
                x += shoupai_1.width * shoupai_1.scaleX - 0.75;
                shoupai_1.showLaiziImage();
            }
            if (handCount > 0)
                x += 5;
            //癞子牌显示
            var chiCards = playerData.chiCards; //selectCard
            // chiCards = [14];
            for (var i = 0; i < chiCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_2 = this.createPai(chiCards[i].selectCard - j);
                    shoupai_2.x = x;
                    x += shoupai_2.width * shoupai_2.scaleX - 0.75;
                }
                x += 5;
            }
            var pengCards = playerData.pengCards; //number
            for (var i = 0; i < pengCards.length; i++) {
                for (var j = 2; j >= 0; j--) {
                    var shoupai_3 = this.createPai(pengCards[i]);
                    shoupai_3.x = x;
                    x += shoupai_3.width * shoupai_3.scaleX - 0.75;
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
                            var shoupai_4 = this.createPai(gangCards[i].card);
                            shoupai_4.x = x;
                            x += shoupai_4.width * shoupai_4.scaleX - 0.75;
                        }
                    }
                    else {
                        var shoupai_5 = this.createPai(gangCards[i].card);
                        shoupai_5.x = x;
                        x += shoupai_5.width * shoupai_5.scaleX - 0.75;
                    }
                }
                x += 5;
            }
            //x += 5;
            // return;
            // return;
            // handCards = { 12: 2, 13: 3, 14: 2 };
            for (var key in handCards) {
                if (key == baoCard + "") {
                    continue;
                }
                var handCount_1 = handCards[key];
                for (var i = 0; i < handCount_1; i++) {
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
        /**获取是否又财神牌 */
        HZMJOverScene.prototype.getHaveCaiShen = function (handCards) {
            var _caiShenCard = {};
            var _shengYuHandCards = {};
            for (var key in handCards) {
                var handCount = handCards[key];
                if (handCards[key] == 46) {
                    _caiShenCard[key] = handCount;
                }
                else {
                    _shengYuHandCards[key] = handCount;
                }
            }
            return { caishenCard: _caiShenCard, shengYuHandCard: _shengYuHandCards };
        };
        /**
         * 判断分数正负颜色
         */
        HZMJOverScene.prototype.socreW2L = function (color) {
            if (color < 0) {
                return 0x9EAEEE;
            }
            else {
                return 0xffffff;
            }
        };
        HZMJOverScene.prototype.nextBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var backHall, roomInfo, sceneConfig, betMin, quitResp, data, quitResp1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.lockReq) {
                                return [2 /*return*/];
                            }
                            this.lockReq = true;
                            backHall = function () {
                                CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HZMJ);
                                CF.sN(SceneNotify.OPEN_HZMJ_HALL);
                            };
                            egret.setTimeout(function () {
                                _this.lockReq = false;
                            }, this, 5000);
                            roomInfo = Global.gameProxy.roomInfo;
                            sceneConfig = Global.gameProxy.getSceneConfigByGame(roomInfo.gameId, roomInfo.sceneId);
                            betMin = sceneConfig.gold_min;
                            if (!(Global.playerProxy.playerData.gold <= 0 || Global.playerProxy.playerData.gold < betMin)) return [3 /*break*/, 1];
                            Global.alertMediator.addAlert("金币不足", null, null, true);
                            backHall();
                            return [2 /*return*/];
                        case 1: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 2:
                            quitResp = _a.sent();
                            if (quitResp.gold) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            if (!quitResp) return [3 /*break*/, 4];
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
                        case 3:
                            quitResp1 = _a.sent();
                            if (quitResp1) {
                                CF.sN(SceneNotify.OPEN_HZMJ_MATCHING, Global.gameProxy.lastGameConfig);
                                CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HZMJ);
                            }
                            else {
                                Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                    backHall();
                                }, null, true);
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            Global.alertMediator.addAlert("开始失败，请重新开始!", function () {
                                backHall();
                            }, null, true);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 点击方法
         */
        HZMJOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, quitResp;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.stopPropagation();
                            _a = e.target;
                            switch (_a) {
                                case this.playBtn: return [3 /*break*/, 1];
                                case this.backBtn: return [3 /*break*/, 2];
                                case this.flushBtn: return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 5];
                        case 1:
                            this.nextBtnTouch();
                            return [3 /*break*/, 5];
                        case 2: return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 3:
                            quitResp = _b.sent();
                            if (quitResp.gold != undefined && quitResp.gold != null) {
                                Global.playerProxy.playerData.gold = quitResp.gold;
                            }
                            Global.gameProxy.clearLastGameConfig();
                            if (quitResp) {
                                CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HZMJ);
                                CF.sN(SceneNotify.OPEN_HZMJ_HALL);
                            }
                            else {
                                CF.sN(SceneNotify.CLOSE_HZMJ_OVER);
                                CF.sN(SceneNotify.CLOSE_HZMJ);
                                CF.sN(SceneNotify.OPEN_HZMJ_HALL);
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            this.showNext();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        HZMJOverScene.prototype.showNext = function () {
            this.currentIndex++;
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            }
            this.paiGroup.removeChildren();
            this.huInfoGroup.removeChildren();
            this.showPais(this.settleData.players[this.settleData.winPlayer[this.currentIndex]]);
            this.showWinPlayers(this.settleData.winPlayer[this.currentIndex]);
        };
        return HZMJOverScene;
    }(game.BaseComponent));
    majiang.HZMJOverScene = HZMJOverScene;
    __reflect(HZMJOverScene.prototype, "majiang.HZMJOverScene");
})(majiang || (majiang = {}));
// private showPais(playerData) {
// 	//吃 碰 杠
// 	let labelText = "";
// 	let roundPattern = playerData.roundPattern;
// 	let roundPatternScoreArray = playerData.roundPatternScoreArray;
// 	for (let i = 0; i < roundPattern.length; i++) {
// 		labelText += HZMJPattern[roundPattern[i]] + " X" + roundPatternScoreArray[i] + "    ";
// 	}
// 	// let winFlag = this.settleData.winFlag;
// 	// if (winFlag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
// 	// 	let winPlayerData = this.settleData.players[this.settleData.winPlayer[0]];
// 	// 	if (winPlayerData.isShowZiMo) {
// 	// 		labelText += " 自摸 X2";
// 	// 	}
// 	// }
// 	this.huInfoLabel.text = labelText;
// 	let x = 0;
// 	let pengCards = playerData.pengCards;//number
// 	for (let i = 0; i < pengCards.length; i++) {
// 		for (let j = 2; j >= 0; j--) {
// 			let shoupai = this.createPai(pengCards[i]);
// 			shoupai.x = x;
// 			x += shoupai.width * shoupai.scaleX - 0.75;
// 		}
// 		x += 5;
// 	}
// 	let gangCards = playerData.gangCards;//card
// 	// gangCards = [14];
// 	for (let i = 0; i < gangCards.length; i++) {
// 		let gangData = gangCards[i];
// 		for (let j = 1; j <= 4; j++) {
// 			if (gangData.gang == 2 || gangData.gang == 4) {
// 				if (j == 4) {
// 					let card = new eui.Image("mj_paibei_png");
// 					card.scaleX = card.scaleY = 0.45;
// 					card.x = x + 0.75;
// 					card.y = 1;
// 					this.paiGroup.addChild(card);
// 					x += card.width * card.scaleX - 0.75;
// 				} else {
// 					let shoupai = this.createPai(gangCards[i].card);
// 					shoupai.x = x;
// 					x += shoupai.width * shoupai.scaleX - 0.75;
// 				}
// 			} else {
// 				let shoupai = this.createPai(gangCards[i].card);
// 				shoupai.x = x;
// 				x += shoupai.width * shoupai.scaleX - 0.75;
// 			}
// 		}
// 		x += 5;
// 	}
// 	// return;
// 	let handCards = playerData.handCards;//number	
// 	//癞子
// 	let baoCard = Global.gameProxy.roomInfo.baoCards[0];
// 	//let baoCard = 46;
// 	let handCount = handCards[baoCard];
// 	for (let i = 0; i < handCount; i++) {
// 		let shoupai = this.createPai(baoCard);
// 		shoupai.x = x;
// 		x += shoupai.width * shoupai.scaleX - 0.75;
// 		shoupai.showLaiziImage();
// 	}
// 	// handCards = { 12: 2, 13: 3, 14: 2 };
// 	for (let key in handCards) {
// 		if (key == baoCard + "") {
// 			continue
// 		}
// 		let handCount = handCards[key];
// 		for (let i = 0; i < handCount; i++) {
// 			let shoupai = this.createPai(Number(key));
// 			shoupai.x = x;
// 			x += shoupai.width * shoupai.scaleX - 0.75;
// 		}
// 	}
// 	//间隔
// 	x += 5;
// 	let huCards = playerData.huCards;//number	
// 	// huCards = [13];
// 	let shoupai = this.createPai(huCards[0]);
// 	shoupai.showHuImage();
// 	shoupai.x = x;
// 	x += shoupai.width * shoupai.scaleX - 0.75 + 5;
// 	// let birdCards = this.settleData.birdCardInfo;
// 	// for (let i = 0; i < birdCards.length; i++) {
// 	// 	let shoupai = this.createPai(Number(birdCards[i]));
// 	// 	shoupai.x = x;
// 	// 	x += shoupai.width * shoupai.scaleX - 0.75;
// 	// 	shoupai.showOtherImageByRes("hnmj_icon_bird_png");
// 	// }
// } 
