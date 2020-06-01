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
    var MajiangMinPaiScene = (function (_super) {
        __extends(MajiangMinPaiScene, _super);
        function MajiangMinPaiScene(isAuto) {
            if (isAuto === void 0) { isAuto = false; }
            var _this = _super.call(this) || this;
            _this.pmdKey = "mjxlch";
            //选中的手牌
            _this.hszShoupaiArr = [];
            _this.showQingqueTipState = false;
            _this.isShowHszTip = false;
            _this.auto = true;
            _this.backStr = "";
            _this.g2p = 0;
            _this.isOver = false;
            _this.isAuto = isAuto;
            _this.skinName = new majiang.MajiangMingPaiSceneSkin();
            return _this;
        }
        MajiangMinPaiScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        /**
         * time
         */
        MajiangMinPaiScene.prototype.time2Next = function (time, callback) {
            var _this = this;
            egret.setTimeout(function () {
                if (_this.auto) {
                    callback();
                }
                else {
                    _this.lastCallback = callback;
                }
            }, this, time);
        };
        MajiangMinPaiScene.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.nextBtn:
                    if (this.lastCallback) {
                        this.lastCallback();
                    }
                    break;
                case this.exitBtn:
                    CF.sN(SceneNotify.CLOSE_CESI);
                    break;
                case this.startBtn:
                    this.startReplay();
                    this.startBtn.visible = false;
                    break;
                case this.restartBtn:
                    CF.sN(SceneNotify.CLOSE_CESI);
                    CF.sN(SceneNotify.OPEN_CESI, true);
                    break;
            }
        };
        MajiangMinPaiScene.prototype.findPlayerByIndex = function (index) {
            return this.roomInfo.players[index];
        };
        MajiangMinPaiScene.prototype.s_roomInfo = function (itemData, callback) {
            this.roomInfo = _.clone(itemData);
            //渲染room信息
            this.roomIdLable.text = "牌局编号：" + this.roomInfo.roundId;
            var gameId = this.roomInfo.gameId;
            var sceneId = this.roomInfo.sceneId;
            var gameConfig = Global.gameProxy.getSceneConfigByGame(gameId, sceneId);
            this.dizhu.text = "底注:" + gameConfig.bet_base;
            if (gameId == "mjxlch") {
                this.wanfaImage.source = RES.getRes("xlch_hsz_png");
            }
            else {
                this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
            }
            this.directions = majiang.MajiangUtils.getDirectionByMine(1);
            this.showHeaders();
            if (this.auto) {
                callback();
            }
            else {
                this.lastCallback = callback;
            }
        };
        MajiangMinPaiScene.prototype.s_startNewRound = function (itemData, callback) {
            var dealer = itemData.dealer;
            var direction = this.directions[dealer];
            var header = this[direction + 'Header'];
            header.showIsZhuang(true);
            this.paiQiang.showPaiQiangByData(this.directions, this.roomInfo);
            this.paiQiang.reloadPaiQiangByRoomInfo(55);
            if (this.auto) {
                callback();
            }
            else {
                this.lastCallback = callback;
            }
        };
        MajiangMinPaiScene.prototype.showHSZSucTip = function (type) {
            var _this = this;
            this.hszTipBar = new majiang.HSZTipBar(type);
            this.touchGroup.addChild(this.hszTipBar);
            this.hszTipBar.horizontalCenter = 0;
            this.hszTipBar.verticalCenter = -42;
            egret.setTimeout(function () {
                game.UIUtils.removeSelf(_this.hszTipBar);
            }, this, 1500);
        };
        MajiangMinPaiScene.prototype.hszOver = function () {
            var players = this.roomInfo.players;
            for (var key in players) {
                var playerIndex = Number(key);
                var dir = this.directions[playerIndex];
                var playerData = this.findPlayerByIndex(playerIndex);
                var paiComp = this[dir + 'Pai'];
                if (paiComp.updateShoupai && paiComp.clearGaidong) {
                    paiComp.clearGaidong();
                    paiComp.updateShoupai(playerData.cards);
                }
                var cards = playerData.selectedHsz;
                for (var i = 0; i < cards.length; i++) {
                    var card = cards[i];
                    if (paiComp.selectUpOrDown) {
                        paiComp.selectUpOrDown(card, false);
                    }
                }
            }
        };
        MajiangMinPaiScene.prototype.s_HSZCardExchanged = function (itemData, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var type, cards, playerIndex, playerData, i, card;
                return __generator(this, function (_a) {
                    if (!this.isShowHszTip) {
                        this.isShowHszTip = true;
                        this.showHSZSucTip(itemData.type);
                    }
                    type = itemData.type;
                    cards = itemData.cards;
                    playerIndex = itemData.playerIndex;
                    playerData = this.findPlayerByIndex(playerIndex);
                    playerData.selectedHsz = cards;
                    // let paiComp = this[dir + 'Pai'];
                    for (i = 0; i < cards.length; i++) {
                        card = cards[i];
                        this.updateWanjiaShoupai(playerIndex, card, 1);
                    }
                    // }, this, 2000);
                    callback();
                    return [2 /*return*/];
                });
            });
        };
        MajiangMinPaiScene.prototype.updateShengyu = function () {
            this.syLabel.text = this.roomInfo.remain;
        };
        MajiangMinPaiScene.prototype.s_initHandCards = function (itemData, callback) {
            var cards = itemData.cards;
            this.roomInfo.remain = itemData.remain;
            var player = this.findPlayerByIndex(itemData.playerIndex);
            player.cards = cards;
            var cardsArr = majiang.MajiangUtils.getCardArrByIndex(player);
            this.showPlayerPai(player.cards, itemData.playerIndex);
            this.updateShengyu();
            if (this.auto) {
                callback();
            }
            else {
                this.lastCallback = callback;
            }
        };
        /**
      * 牌局结束显示自己手上的牌。
      */
        MajiangMinPaiScene.prototype.showPlayerPai = function (arr, index) {
            if (index == 1) {
                this.minePai = new majiang.MineShowPai(arr, 2);
                this.mineHuShowGroup.addChild(this.minePai);
                this.mineHuShowGroup.visible = true;
            }
            else if (index == 2) {
                this.rightPai = new majiang.RightShowPai(arr, 2);
                this.rightHuShowGroup.addChild(this.rightPai);
                this.rightHuShowGroup.visible = true;
            }
            else if (index == 3) {
                var tops = new majiang.TopShowPai(arr, 2);
                this.topHuShowGroup.addChild(tops);
                this.topHuShowGroup.visible = true;
                this.topPai = tops;
            }
            else if (index == 4) {
                var lefts = new majiang.LeftShowPai(arr, 2);
                this.leftHuShowGroup.addChild(lefts);
                this.leftHuShowGroup.visible = true;
                this.leftPai = lefts;
            }
        };
        /**
         * 展现玩家头像
         */
        MajiangMinPaiScene.prototype.showHeaders = function () {
            var players = this.roomInfo.players;
            for (var key in players) {
                var dir = this.directions[key];
                var header = this[dir + 'Header'];
                header.initWithData(players[key], dir);
                header.visible = true;
            }
        };
        MajiangMinPaiScene.prototype.createBefore = function () {
            var _this = this;
            var arr = [1, 1, 1, 1, 1, 1];
            async.eachSeries(arr, function (index, callback) {
                var item = _this.replayData.shift();
                _this[item.route](_.clone(item.msg), callback);
            }, function () {
                _this.paiQiang.reloadPaiQiangByRoomInfo(_this.roomInfo);
                if (_this.isAuto) {
                    _this.startReplay();
                    _this.startBtn.visible = false;
                }
            });
        };
        MajiangMinPaiScene.prototype.startReplay = function () {
            var _this = this;
            async.eachSeries(this.replayData, function (item, callback) {
                _this.lastCallback = null;
                if (_this[item.route]) {
                    _this[item.route](item.msg, callback);
                }
                else {
                }
            });
        };
        MajiangMinPaiScene.prototype.s_playerSelectColor = function (itemData, callback) {
            callback();
        };
        MajiangMinPaiScene.prototype.s_playerGangCard = function (itemData, callback) {
            var card = itemData.card, from = itemData.from, gangType = itemData.gang, playerIndex = itemData.playerIndex;
            var targets = itemData.targets;
            var direction = this.directions[playerIndex];
            var playerData = this.findPlayerByIndex(playerIndex);
            playerData.lastCard = 0;
            //记录玩家杠牌
            this.recordPlayerGang(card, playerIndex, gangType);
            this.updatePlayerShouPai(playerIndex);
            this.addEffectAni(direction, "gang");
            this.hideChupaiTips();
            switch (gangType) {
                case 1://碰变杠,吊4个正面，巴雨
                    // this.addGangAni("right", "xiayu", GameConfig.curWidth() * 0.5, GameConfig.curHeight() * 0.3);
                    // this.addGangAni("right", "guafeng", GameConfig.curWidth() * 0.41, GameConfig.curHeight() * 0.24);
                    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    this.addGangAni("xiayu", GameConfig.curWidth() * 0.5 + 10, GameConfig.curHeight() * 0.4 + 5);
                    // group.removeLastPai();
                    //手上四张暗杠
                    break;
                case 3://点杠
                    var lastDirection = this.directions[from];
                    this[lastDirection + "ChupaiGroup"].removeLastChupai();
                    this.addGangAni("guafeng", GameConfig.curWidth() * 0.5 + 5, GameConfig.curHeight() * 0.4 + 5, 2);
                    break;
            }
            var cardArr = majiang.MajiangUtils.getCardArrByIndex(playerData);
            //以上玩家数据修改 以下 玩家UI修改
            switch (gangType) {
                case 1://碰变杠,吊4个正面，巴雨
                    switch (direction) {
                        case "left":
                            this.leftPai.updateShoupaiByArr(cardArr);
                            this.leftPgGroup.add(1, card, 1);
                            break;
                        case "right":
                            this.rightPai.updateShoupaiByArr(cardArr);
                            this.rightPgGroup.add(1, card, 1);
                            break;
                        case "top":
                            this.topPai.updateShoupaiByArr(cardArr);
                            this.topPgGroup.add(1, card, 1);
                            break;
                        case "mine":
                            this.minePai.updateShoupaiByArr(cardArr);
                            this.minePgGroup.add(1, card, 1);
                            break;
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    break;
                case 4://调1个正面，3个背面。暗杠，起手就有三张，摸一张。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(4, card);
                            break;
                        case "right":
                            this.rightPgGroup.add(4, card);
                            break;
                        case "top":
                            this.topPgGroup.add(4, card);
                            break;
                        case "mine":
                            this.minePgGroup.add(4, card);
                            break;
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    break;
                case 2://调1个正面，3个背面。暗杠，起手就有四张。不一定第一轮就杠，可能会过几轮。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(2, card);
                            break;
                        case "right":
                            this.rightPgGroup.add(2, card);
                            break;
                        case "top":
                            this.topPgGroup.add(2, card);
                            break;
                        case "mine":
                            this.minePgGroup.add(2, card);
                            break;
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 3);
                    break;
                case 3://碰变杠,调4个正面，这里是自己碰，别人点。
                    switch (direction) {
                        case "left":
                            this.leftPgGroup.add(3, card);
                            break;
                        case "right":
                            this.rightPgGroup.add(3, card);
                            break;
                        case "top":
                            this.topPgGroup.add(3, card);
                            break;
                        case "mine":
                            this.minePgGroup.add(3, card);
                            break;
                    }
                    // majiang.MajiangUtils.playHPGSound(playerData.sex, 2);
                    break;
            }
            this.time2Next(times.s_playerGangCard, callback);
        };
        MajiangMinPaiScene.prototype.s_playerSelectHSZ = function (itemData, callback) {
            var cards = itemData.cards;
            var playerIndex = itemData.playerIndex;
            var playerData = this.findPlayerByIndex(playerIndex);
            var dir = this.directions[playerIndex];
            var paiComp = this[dir + 'Pai'];
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                this.updateWanjiaShoupai(playerIndex, card, -1);
                if (paiComp.selectUpOrDown) {
                    paiComp.selectUpOrDown(card, true);
                }
            }
            this.time2Next(times.s_playerSelectHSZ, callback);
        };
        MajiangMinPaiScene.prototype.enterFrame = function () {
            if (this.lastCallback && !this.auto) {
                this.nextBtn.visible = true;
            }
            else {
                this.nextBtn.visible = false;
            }
        };
        MajiangMinPaiScene.prototype.renderHupaiGroup = function () {
            for (var i = 1; i <= 4; i++) {
                var direction = this.directions[i];
                var hupaiGroup = this[direction + "HupaiGroup"];
                hupaiGroup.removeChildren();
                hupaiGroup.initWithDirection(direction);
                hupaiGroup.visible = true;
                hupaiGroup.initWithArr([]);
            }
        };
        MajiangMinPaiScene.prototype.s_passTask = function (itemData, callback) {
            callback();
        };
        MajiangMinPaiScene.prototype.s_trustee = function (itemData, callback) {
            callback();
        };
        MajiangMinPaiScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var newData = [];
            this.createBefore();
            this.renderHupaiGroup();
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        /**
         * 换三张结束
         */
        MajiangMinPaiScene.prototype.s_roomHSZFinished = function (itemData, callback) {
            var _this = this;
            if (this.auto) {
                egret.setTimeout(function () {
                    _this.hszOver();
                }, this, 2000);
            }
            else {
                this.hszOver();
            }
            egret.setTimeout(callback, this, 4000);
        };
        /**
         * 定缺结束
         */
        MajiangMinPaiScene.prototype.s_playerColorSelected = function (itemData, callback) {
            var players = itemData.players;
            for (var key in players) {
                var playerData = this.findPlayerByIndex(key);
                playerData.selectColor = players[key];
                this.getHeaderByDirection(key);
            }
            //差一个动画
            this.dingqueOver(players);
            for (var key in players) {
                var playerData = this.findPlayerByIndex(key);
                var dir = this.directions[key];
                var paiComp = this[dir + 'Pai'];
                var cards = majiang.MajiangUtils.getCardArrByIndex(playerData);
                if (paiComp.updateShoupai && paiComp.clearGaidong) {
                    paiComp.updateShoupaiByArr(cards);
                }
            }
            this.time2Next(times.s_playerColorSelected, callback);
        };
        /**
         * 定缺完毕
         */
        MajiangMinPaiScene.prototype.dingqueOver = function (player) {
            //重新排序手牌
            var roomInfo = this.roomInfo;
            roomInfo.curPlay = roomInfo.dealer;
            var direction = this.directions[roomInfo.curPlay];
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
        };
        /**
         * 定缺动画
         */
        MajiangMinPaiScene.prototype.dqDonghua = function (i, pi, img) {
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
        MajiangMinPaiScene.prototype.dqtubiao = function (nums, img) {
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
         * 玩家出牌
         */
        MajiangMinPaiScene.prototype.s_playCard = function (itemData, callback) {
            var playerIndex = itemData.playerIndex;
            var card = itemData.card;
            var playerData = this.findPlayerByIndex(playerIndex);
            this.updateWanjiaShoupai(playerIndex, card, -1);
            playerData.lastCard = 0;
            var paiComp = this[this.directions[playerIndex] + 'Pai'];
            var cards = majiang.MajiangUtils.getCardArrByIndex(playerData);
            paiComp.updateShoupaiByArr(cards);
            this.showChupaiAni1(playerIndex, card);
            this.time2Next(times.s_playCard, callback);
            // MajiangUtils.playCardSound(playerData.sex, card);
        };
        MajiangMinPaiScene.prototype.s_newCard = function (itemData, callback) {
            var playerIndex = itemData.playerIndex;
            var card = itemData.card;
            this.roomInfo.remain = itemData.remain;
            this.updateShengyu();
            var playerData = this.findPlayerByIndex(playerIndex);
            playerData.lastCard = card;
            this.updateWanjiaShoupai(playerIndex, card, 1);
            var cards = majiang.MajiangUtils.getCardArrByIndex(playerData);
            var paiComp = this[this.directions[playerIndex] + 'Pai'];
            paiComp.updateShoupaiByArr(cards);
            this.paiQiang.removeNumByIndex();
            this.time2Next(times.s_newCard, callback);
        };
        /**
         * 展现动画
         * @param  {} playerIndex
         * @param  {} value
         */
        MajiangMinPaiScene.prototype.showChupaiAni1 = function (playerIndex, value) {
            var _this = this;
            var direction = this.directions[playerIndex];
            var name = direction + "_ChuShoupai";
            var tempChupai = GameCacheManager.instance.getCache(name, majiang.MineShoupai);
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
                    break;
                case "right":
                    game.UIUtils.setUI2CenterY(tempChupai);
                    tempChupai.x = GameConfig.curWidth() * 0.7;
                    tempChupai.y -= 50;
                    targetMajiang = this.rightChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    break;
                case "top":
                    game.UIUtils.setUI2CenterX(tempChupai);
                    tempChupai.y = GameConfig.curHeight() * 0.2;
                    targetMajiang = this.topChupaiGroup.addChupai(value);
                    targetMajiang.visible = false;
                    break;
            }
            game.UIUtils.setAnchorPot(tempChupai);
            tempChupai.scaleX = 0;
            tempChupai.scaleY = 0;
            var pos = targetMajiang.localToGlobal();
            this.lastPlayCard = targetMajiang;
            egret.Tween.get(tempChupai).to({
                scaleX: 1,
                scaleY: 1
            }, 50).wait(500).to({
                scaleX: 0.5,
                scaleY: 0.5,
                y: pos.y + targetMajiang.height / 2,
                x: pos.x + targetMajiang.width / 2 + 10
            }, 100).call(function () {
                _this.showChupaiTips(pos, direction);
                game.UIUtils.removeSelf(tempChupai);
                targetMajiang.visible = true;
            }, this);
        };
        MajiangMinPaiScene.prototype.showChupaiTips = function (image, dirction) {
            if (!this.chupaiTips) {
                this.chupaiTips = new eui.Image("img_cptip_png");
                this.effectGroup.addChild(this.chupaiTips);
            }
            this.chupaiTips.visible = true;
            egret.Tween.removeTweens(this.chupaiTips);
            var widthHalf = GameConfig.curWidth() / 2;
            var heightHalf = GameConfig.curHeight() / 2;
            switch (dirction) {
                case "mine":
                    // this.chupaiTips.verticalCenter = widthHalf
                    this.chupaiTips.x = image.x + 7;
                    this.chupaiTips.y = image.y - 15;
                    break;
                case "left":
                    this.chupaiTips.x = image.x + 17;
                    this.chupaiTips.y = image.y - 20;
                    break;
                case "right":
                    this.chupaiTips.x = image.x + 17;
                    this.chupaiTips.y = image.y - 20;
                    break;
                case "top":
                    this.chupaiTips.x = image.x + 5;
                    this.chupaiTips.y = image.y - 15;
                    break;
            }
            var y = this.chupaiTips.y;
            egret.Tween.get(this.chupaiTips, { loop: true }).to({
                y: y - 10
            }, 1000).to({
                y: y
            }, 1000);
        };
        /**
         * 轮到谁
         */
        MajiangMinPaiScene.prototype.s_curPlay = function (itemData, callback) {
            this.roomInfo.curPlay = itemData.curPlay;
            this.timeDirectionBar.showLightByDirection(this.directions[this.roomInfo.curPlay]);
            callback();
        };
        MajiangMinPaiScene.prototype.s_hangupTask = function (itemData, callback) {
            callback();
        };
        /**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
        MajiangMinPaiScene.prototype.addEffectAni = function (direction, effectName) {
            var _this = this;
            GameCacheManager.instance.getMcCache(effectName, direction + "_" + effectName, function (mv) {
                if (mv) {
                    mv.scaleX = mv.scaleY = 1.2;
                    var mcCallback_1 = function () {
                        mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                        game.UIUtils.removeSelf(mv);
                    };
                    mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_1, _this);
                    _this.effectGroup.addChild(mv);
                    switch (direction) {
                        case "mine":
                            mv.x = GameConfig.curWidth() * 0.5;
                            mv.y = GameConfig.curHeight() * 0.75;
                            break;
                        case "left":
                            mv.x = GameConfig.curWidth() * 0.22;
                            mv.y = GameConfig.curHeight() * 0.4;
                            break;
                        case "right":
                            mv.x = GameConfig.curWidth() * 0.77;
                            mv.y = GameConfig.curHeight() * 0.4;
                            break;
                        case "top":
                            mv.x = GameConfig.curWidth() * 0.5;
                            mv.y = GameConfig.curHeight() * 0.2;
                            break;
                    }
                    mv.gotoAndPlay(1, 1);
                }
            });
        };
        MajiangMinPaiScene.prototype.hideChupaiTips = function () {
            this.lastPlayCard = null;
            if (this.chupaiTips) {
                this.chupaiTips.visible = false;
                egret.Tween.removeTweens(this.chupaiTips);
            }
        };
        MajiangMinPaiScene.prototype.s_playerReconnect = function (itemData, callback) {
            callback();
        };
        MajiangMinPaiScene.prototype.s_playerOffline = function (itemData, callback) {
            callback();
        };
        /**
         * 更新玩家手牌
         */
        MajiangMinPaiScene.prototype.updatePlayerShouPai = function (playerIndex) {
            var direction = this.directions[playerIndex];
            var playerData = this.findPlayerByIndex(playerIndex);
            var cardArr = majiang.MajiangUtils.getCardArrByIndex(playerData);
            var pai = this[direction + "Pai"];
            pai.updateShoupaiByArr(cardArr, 2);
        };
        /**
         * 玩家碰牌
         */
        MajiangMinPaiScene.prototype.s_playerPengCard = function (itemData, callback) {
            var card = itemData.card;
            var playerIndex = itemData.playerIndex;
            this.updateWanjiaShoupai(playerIndex, card, -2);
            this.updatePlayerShouPai(playerIndex);
            game.UIUtils.removeSelf(this.lastPlayCard);
            var direction = this.directions[playerIndex];
            //播放碰牌动画
            var lastDirection = this.directions[itemData.from];
            this[lastDirection + "ChupaiGroup"].removeLastChupai();
            this.addEffectAni(direction, "peng");
            this.hideChupaiTips();
            var playerData = this.findPlayerByIndex(playerIndex);
            var cards = majiang.MajiangUtils.getCardArrByIndex(playerData);
            switch (direction) {
                case "left":
                    //这里Add方法里面的两个参数第一个是1，2，3.1代表碰，2明杠，3暗杠。   color是牌面的花色值,还有个可选参数pbg?即碰变杠。
                    this.leftPgGroup.add(5, card);
                    break;
                case "right":
                    this.rightPgGroup.add(5, card);
                    break;
                case "top":
                    this.topPai.updateShoupaiByArr(cards, 2);
                    this.topPgGroup.add(5, card);
                    break;
                case "mine":
                    this.minePgGroup.add(5, card);
                    break;
            }
            this.time2Next(times.s_playerPengCard, callback);
            //播放碰牌音效
            // majiang.MajiangUtils.playHPGSound(playerData.sex, 1);
        };
        /**
         * 获取玩家头像
         * @param  {number} index
         */
        MajiangMinPaiScene.prototype.getHeaderByDirection = function (index) {
            return this[this.directions[index] + "Header"];
        };
        /**
         * 更新玩家手牌
         * @param  {} value
         */
        MajiangMinPaiScene.prototype.updateWanjiaShoupai = function (playerIndex, value, addNum) {
            var mineData = this.findPlayerByIndex(playerIndex);
            var cards = mineData.cards;
            var num = cards[value];
            if (!num) {
                if (addNum > 0) {
                    cards[value] = addNum;
                }
            }
            else {
                num += addNum;
                if (num < 1) {
                    delete cards[value];
                }
                else {
                    cards[value] = num;
                }
            }
        };
        /**
         * 同步金币
         */
        MajiangMinPaiScene.prototype.s_syncGold = function (itemData, callback) {
            // egret.setTimeout(() => {
            this.syncGold(itemData);
            this.time2Next(times.s_syncGold, callback);
            // }, this, 200)
        };
        /*
         * 更新金币。
         */
        MajiangMinPaiScene.prototype.syncGold = function (syncData) {
            var _this = this;
            var _loop_1 = function (key) {
                var dirction = this_1.directions[key];
                var info = syncData[key].info;
                if (syncData[key].type == 6) {
                    egret.setTimeout(function () {
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
                //输光了豆子
                if (info.isDefeat) {
                    egret.setTimeout(function () {
                        _this.createRenshuFont(dirction);
                    }, this_1, 1000);
                }
            };
            var this_1 = this;
            for (var key in syncData) {
                _loop_1(key);
            }
        };
        /**
         * 玩家认输
         * @param  {} direction
         */
        MajiangMinPaiScene.prototype.createRenshuFont = function (direction) {
            var roomInfo = this.roomInfo;
            if (roomInfo.remain < 1) {
                return;
            }
            //认输使用缓存
            var name = direction + "_renshuImage";
            var image = GameCacheManager.instance.getCache(name, eui.Image);
            if (!image.source) {
                image.source = RES.getRes("wz_rs_png");
            }
            game.UIUtils.setAnchorPot(image);
            image.alpha = 0;
            this.effectGroup.addChild(image);
            switch (direction) {
                case "mine":
                    image.horizontalCenter = 0;
                    image.bottom = 100;
                    break;
                case "left":
                    image.left = 210;
                    image.verticalCenter = -50;
                    break;
                case "right":
                    image.right = 210;
                    image.verticalCenter = -50;
                    break;
                case "top":
                    image.horizontalCenter = 0;
                    image.top = 100;
                    break;
            }
            egret.Tween.get(image).to({
                alpha: 1
            }, 1000);
        };
        /**
         * 呼叫转移漂分
         * @param  {} direction
         * @param  {} value
         */
        MajiangMinPaiScene.prototype.createHJZYByDirection = function (direction, value) {
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
         * 创建金币减少
         * @param  {} direction
         * @param  {} value
         */
        MajiangMinPaiScene.prototype.createFontByDirection = function (direction, value) {
            var text = value;
            if (value >= 0) {
                text = "+" + value;
            }
            else {
                text = value + "";
            }
            var label = new eui.BitmapLabel(text);
            if (value >= 0) {
                label.font = "ying_font_fnt"; //RES.getRes("");
            }
            else {
                label.font = "shu_font_fnt"; //RES.getRes("");
            }
            label.text = text;
            label.alpha = 0;
            label.scaleX = label.scaleY = 0.5;
            this.effectGroup.addChild(label);
            var pos = { x: 0, y: 0 };
            game.UIUtils.setAnchorPot(label);
            var endX;
            var endY;
            switch (direction) {
                case "mine":
                    label.x = GameConfig.curWidth() * 0.5 + pos.x;
                    label.y = GameConfig.curHeight() * 0.7 + pos.y;
                    break;
                case "left":
                    label.x = GameConfig.curWidth() * 0.28 + pos.x;
                    label.y = GameConfig.curHeight() * 0.4 + pos.y;
                    break;
                case "right":
                    label.x = GameConfig.curWidth() * 0.72 + pos.x;
                    label.y = GameConfig.curHeight() * 0.4 + pos.y;
                    break;
                case "top":
                    label.x = GameConfig.curWidth() * 0.5 + pos.x;
                    label.y = GameConfig.curHeight() * 0.2 + pos.y;
                    break;
            }
            egret.Tween.get(label).to({
                x: label.x + 30,
                alpha: 1
            }, 300).to({
                alpha: 0
            }, 1000).call(function () {
                game.UIUtils.removeSelf(label);
            });
        };
        /**
         * 记录玩家杠牌
         * @param  {} resp
         */
        MajiangMinPaiScene.prototype.recordPlayerGang = function (card, playerIndex, gangType) {
            this.updateWanjiaShoupai(playerIndex, card, -1);
            this.updateWanjiaShoupai(playerIndex, card, -1);
            this.updateWanjiaShoupai(playerIndex, card, -1);
            this.updateWanjiaShoupai(playerIndex, card, -1);
        };
        /**
        * 刮风下雨
        * @param  {} direction
        * @param  {} effectName
        */
        MajiangMinPaiScene.prototype.addGangAni = function (effectName, offerX, offerY, scale) {
            var _this = this;
            if (scale === void 0) { scale = 1; }
            GameCacheManager.instance.getMcCache(effectName, effectName, function (mv) {
                if (mv) {
                    var mcCallback_2 = function () {
                        mv.removeEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_2, _this);
                        game.UIUtils.removeSelf(mv);
                    };
                    mv.addEventListener(egret.MovieClipEvent.COMPLETE, mcCallback_2, _this);
                    _this.effectGroup.addChild(mv);
                    // game.UIUtils.setAnchorPot(mv);
                    mv.x = offerX;
                    mv.y = offerY;
                    mv.scaleX = mv.scaleY = scale;
                    mv.play(1);
                }
            });
        };
        MajiangMinPaiScene.prototype.s_cancelGangForQG = function (itemData, callback) {
            this.g2p = 1;
            var direction = this.directions[itemData.playerIndex];
            var color = itemData.gangInfo["card"];
            this[direction + 'PgGroup'].add(5, color, 3);
        };
        /**
         * 玩家胡牌
         */
        MajiangMinPaiScene.prototype.s_playerHu = function (itemData, callback) {
            var _this = this;
            var card = itemData.card, from = itemData.from, gsh = itemData.gsh, isZM = itemData.isZM, playerIndex = itemData.playerIndex;
            var mainCard = itemData.mainCard;
            var direction = this.directions[playerIndex];
            this.hideChupaiTips();
            var player = this.findPlayerByIndex(playerIndex);
            if (isZM) {
                this.updateWanjiaShoupai(playerIndex, card, -1);
                this.updatePlayerShouPai(playerIndex);
                player.lastCard = 0;
                if (gsh.gsh) {
                    this.addEffectAni(direction, "gsh");
                }
                else {
                    this.addEffectAni(direction, "zimo");
                }
                this[direction + "HupaiGroup"].addHu(itemData, 2);
                // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 4);
            }
            else {
                //点炮
                var lastDirection = this.directions[from];
                this.addEffectAni(direction, "hu");
                if (this.g2p == 1) {
                    egret.setTimeout(function () {
                        _this[direction + "HupaiGroup"].addHu(itemData, 1);
                    }, this, 400);
                }
                else {
                    var time = this[lastDirection + "ChupaiGroup"].showDianpaoAni(mainCard);
                    egret.setTimeout(function () {
                        _this[direction + "HupaiGroup"].addHu(itemData, 1);
                    }, this, time);
                }
                this.g2p = 0;
                // majiang.MajiangUtils.playHPGSound(huPlayerData.sex, 5);
            }
            this.time2Next(times.s_playerHu, callback);
        };
        MajiangMinPaiScene.prototype.s_roundSettlement = function (itemData, callback) {
            var _this = this;
            if (this.isOver) {
                callback();
                return;
            }
            this.isOver = true;
            var players = itemData.players;
            this.showDuijuAni(function () {
                _this.checkChajiao(itemData.options.hpts, function () {
                    // CF.sN(SceneNotify.OPEN_JIESUAN, { players: players, status: resp.status });
                });
            });
            this.time2Next(3000, callback);
        };
        MajiangMinPaiScene.prototype.s_roundRoomResult = function (itemData, callback) {
            callback();
        };
        /**
         * 花猪和查大叫
         * type 3 : 5 一组
         * @param  {} records
         */
        MajiangMinPaiScene.prototype.checkChajiao = function (records, callback) {
            var _this = this;
            var huazuArr = records[4] || {};
            var chajiaoArr = records[3] || {};
            var roomInfo = this.roomInfo;
            var data = {};
            for (var playerIndex in roomInfo.players) {
                var playerData = roomInfo.players[playerIndex];
                if (huazuArr[playerIndex]) {
                    var score = huazuArr[playerIndex];
                    playerData.gold += score.gainGold;
                    data[playerIndex] = { score: score.gainGold, type: 4 };
                }
                else if (chajiaoArr[playerIndex]) {
                    var score = chajiaoArr[playerIndex];
                    playerData.gold += score.gainGold;
                    data[playerIndex] = { score: score.gainGold, type: 3 };
                }
            }
            var time = 0;
            for (var key in data) {
                time = 3000;
                this.showScoreAni(key, data[key]);
            }
            egret.setTimeout(function () {
                _this.checkTuishui(records, callback);
            }, this, time);
            // let myLiushui = records[Global.gameProxy.getMineIndex()];
        };
        /**
         * 退税
         * @param  {} records
         */
        MajiangMinPaiScene.prototype.checkTuishui = function (records, callback) {
            var _this = this;
            var tuishuiArr = records[5] || {};
            var roomInfo = this.roomInfo;
            if (!roomInfo) {
                return;
            }
            var data = {};
            for (var playerIndex in roomInfo.players) {
                var playerData = roomInfo.players[playerIndex];
                if (tuishuiArr[playerIndex]) {
                    var score = tuishuiArr[playerIndex];
                    playerData.gold += score.gainGold;
                    data[playerIndex] = { score: score.gainGold, type: 5 };
                }
            }
            var time = 0;
            for (var key in data) {
                time = 3000;
                if (data[key].score != 0) {
                    this.showScoreAni(key, data[key]);
                }
            }
            egret.setTimeout(function () {
                callback();
                _this.restartBtn.visible = true;
            }, this, time);
        };
        /**
         * 展现漂分动画
         * type score
         * @param  {} scoreData
         */
        MajiangMinPaiScene.prototype.showScoreAni = function (playerIndex, scoreData) {
            var _this = this;
            var directionStr = this.directions[playerIndex];
            var image = new eui.Image(RES.getRes("over_type_" + scoreData.type + "_png"));
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
                _this.createFontByDirection(directionStr, scoreData.score);
                var playerData = _this.findPlayerByIndex(playerIndex);
                _this.getHeaderByDirection(playerIndex).updateGold(playerData.gold);
            }, this);
            // }
        };
        /**
         * 对局结束
         */
        MajiangMinPaiScene.prototype.showDuijuAni = function (callback) {
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
        return MajiangMinPaiScene;
    }(game.BaseScene));
    majiang.MajiangMinPaiScene = MajiangMinPaiScene;
    __reflect(MajiangMinPaiScene.prototype, "majiang.MajiangMinPaiScene");
})(majiang || (majiang = {}));
var times;
(function (times) {
    times[times["s_playCard"] = 1500] = "s_playCard";
    times[times["s_playerSelectHSZ"] = 10] = "s_playerSelectHSZ";
    times[times["s_playerColorSelected"] = 2000] = "s_playerColorSelected";
    times[times["s_newCard"] = 1000] = "s_newCard";
    times[times["s_playerPengCard"] = 2000] = "s_playerPengCard";
    times[times["s_playerGangCard"] = 2000] = "s_playerGangCard";
    times[times["s_syncGold"] = 2000] = "s_syncGold";
    times[times["s_playerHu"] = 2000] = "s_playerHu";
})(times || (times = {}));
