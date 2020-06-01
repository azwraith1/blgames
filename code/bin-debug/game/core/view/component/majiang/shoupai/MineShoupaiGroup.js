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
/*
 * @Author: Li MengChan
 * @Date: 2018-06-28 10:27:19
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-03 15:26:11
 * @Description: 手牌集合组
 */
var majiang;
(function (majiang_1) {
    var MineShoupaiGroup = (function (_super) {
        __extends(MineShoupaiGroup, _super);
        function MineShoupaiGroup() {
            var _this = _super.call(this) || this;
            _this.shoupais = [];
            return _this;
            // this.skinName = new MineShoupaiGroupSkin();
        }
        MineShoupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.sortShoupais();
        };
        MineShoupaiGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.SHOUPAI_TOUCH_SUC, this.shoupaiTouchOn, this);
        };
        MineShoupaiGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.SHOUPAI_TOUCH_SUC, this.shoupaiTouchOn, this);
        };
        //-----new
        MineShoupaiGroup.prototype.sortShoupais = function () {
            var newArr = [];
            var mineData = Global.gameProxy.getMineGameData();
            var selectColor = mineData.selectColor;
            //手牌数组排序
            this.shoupais = _.sortBy(this.shoupais, function (shoupai) {
                if (Math.floor(shoupai.value / 10) == selectColor) {
                    return 40 + shoupai.value;
                }
                else {
                    return shoupai.value;
                }
            });
            //更新自己当前的牌 并且排序
            var sortCardsArr = Global.gameProxy.getMineShuopaiArr();
            //根据重新排序的坐标移动
            for (var i = 0; i < this.shoupais.length; i++) {
                var shoupai = this.shoupais[i];
                var index = sortCardsArr.indexOf(shoupai.value);
                sortCardsArr[index] = -1;
                shoupai.name = "mj" + (index + 1);
                var record = this.recordsJson[index + 1];
                if (Global.runBack) {
                    shoupai.setPosition(index + 1);
                    shoupai.x = record.x;
                }
                else {
                    if (record) {
                        shoupai.setPosition(index + 1);
                        egret.Tween.get(shoupai).to({
                            x: record.x
                        }, 300, egret.Ease.quintOut);
                    }
                }
            }
            this.checkShoupaiError();
        };
        /**
         * 玩家出牌
         */
        MineShoupaiGroup.prototype.sortShoupaisByChupai = function (value) {
            if (value === void 0) { value = null; }
            if (this.mopai == this.lastTouchPai) {
                this.checkShoupaiByChupaiError3();
                return;
            }
            if (value) {
                if (this.mopai.value == value) {
                    this.lastTouchPai = this.mopai;
                }
                else {
                    this.lastTouchPai = this.findMajiangByValue(value);
                }
            }
            var color = Global.gameProxy.getMineGameData().selectColor;
            if (this.lastTouchPai) {
                this.lastTouchPai.visible = true;
                this.lastTouchPai.x = this.mopai.x;
                this.lastTouchPai.y = this.mopai.y;
                this.lastTouchPai.resetValue(this.mopai.value);
                this.lastTouchPai.colorIsLight(color);
                this.lastTouchPai = null;
            }
            this.mopai.visible = false;
            //先把手中牌排序
            var sortCardsArr = Global.gameProxy.getMineShuopaiArr();
            for (var i = 0; i < this.shoupais.length; i++) {
                var shoupai = this.shoupais[i];
                shoupai.visible = true;
                var index = sortCardsArr.indexOf(shoupai.value);
                sortCardsArr[index] = -1;
                shoupai.name = "mj" + (index + 1);
                var record = this.recordsJson[index + 1];
                if (record) {
                    shoupai.colorIsLight(color);
                    shoupai.setPosition(index + 1);
                    if (Global.runBack) {
                        shoupai.x = record.x;
                        shoupai.y = record.y;
                    }
                    else {
                        egret.Tween.get(shoupai).to({
                            x: record.x,
                            y: record.y
                        }, 600, egret.Ease.quintOut);
                    }
                }
            }
            this.checkShoupaiByChupaiError();
        };
        ///---new end
        MineShoupaiGroup.prototype.shoupaiTouchOn = function (e) {
            this.lastTouchPai = e.data;
            //获取到上次的index
            this.lastIndex = -1;
            for (var i = 0; i <= 14; i++) {
                var majiang = this.mainGroup.getChildByName("mj" + (i + 1));
                if (majiang && majiang == this.lastTouchPai) {
                    this.lastIndex = i + 1;
                    break;
                }
            }
        };
        // public shoupaiTouchOn(e: egret.TouchEvent) {
        // 	this.lastTouchPai = e.data;
        // 	//获取到上次的index
        // 	this.lastIndex = -1;
        // 	for (let i = 0; i <= 14; i++) {
        // 		var majiang = this.mainGroup.getChildByName("mj" + (i + 1)) as MineShoupai;
        // 		if (majiang && majiang == this.lastTouchPai) {
        // 			this.lastIndex = i + 1;
        // 			break;
        // 		}
        // 	}
        // }
        /**
         * 初始化麻将数据
         * @param  {} majiangArr
         */
        MineShoupaiGroup.prototype.initWithArr = function (majiangArr, visible) {
            if (visible === void 0) { visible = true; }
            _super.prototype.clearGroup.call(this);
            var color = Global.gameProxy.getMineGameData().selectColor;
            for (var i = 0; i < majiangArr.length; i++) {
                var index = i;
                var value = majiangArr[index];
                var shoupai = this.createShoupai(index, value);
                shoupai.setPosition(index);
                shoupai.visible = visible;
                shoupai.colorIsLight(color);
            }
            this.mopai = new majiang_1.MineShoupai(0);
            this.mainGroup.addChild(this.mopai);
            this.mopai.visible = false;
            this.mopai.name = "mopai";
            this.mopai.setPosition(-1);
            game.UIUtils.setAnchorPot(this.mopai);
            this.mopai.y = this.mopai.anchorOffsetY;
            this.mopai.addTouch();
        };
        MineShoupaiGroup.prototype.createShoupai = function (index, value) {
            var shoupai = new majiang_1.MineShoupai(parseInt(value));
            this.shoupais.push(shoupai);
            this.mainGroup.addChild(shoupai);
            var point = this.recordsJson[index + 1];
            game.UIUtils.setAnchorPot(shoupai);
            shoupai.x = point.x;
            shoupai.y = shoupai.anchorOffsetY;
            shoupai.name = point.name;
            shoupai.visible = false;
            shoupai.addTouch();
            return shoupai;
        };
        /**
         * 根据牌重新绘制玩家手牌
         * @param  {number[]} cards
         */
        MineShoupaiGroup.prototype.sortShoupaiByValue = function (cards, ani) {
            if (ani === void 0) { ani = true; }
            var color = Global.gameProxy.getMineGameData().selectColor;
            var isHu = Global.gameProxy.getMineGameData().huCards.length > 0;
            for (var i = 0; i < cards.length; i++) {
                var value = cards[i];
                var majiang = this.mainGroup.getChildByName("mj" + (i + 1));
                var pos = this.recordsJson[(i + 1)];
                if (majiang) {
                    majiang.visible = true;
                    majiang.resetValue(value);
                    if (!isHu) {
                        majiang.colorIsLight(color);
                    }
                    if (ani) {
                        egret.Tween.get(majiang).to({
                            x: pos.x,
                            y: pos.y
                        }, 300, egret.Ease.quintOut);
                    }
                    else {
                        majiang.x = pos.x;
                        majiang.y = pos.y;
                    }
                }
            }
        };
        /**
         * sort手牌排序动画
         */
        MineShoupaiGroup.prototype.sortShoupaiByMopai = function (cards) {
            var color = Global.gameProxy.getMineGameData().selectColor;
            for (var i = 0; i < this.shoupais.length; i++) {
                var shoupai = this.shoupais[i];
                var index = cards.indexOf(shoupai.value);
                cards[index] = -1;
                var pos = this.recordsJson[(index + 1)];
                shoupai.visible = true;
                shoupai.x = pos.x;
                shoupai.y = pos.y;
                shoupai.colorIsLight(color);
            }
            this.checkShoupaiError();
        };
        /**
         * 根据name查找牌替换花色
         * @param  {} name
         * @param  {} value
         */
        MineShoupaiGroup.prototype.changeShoupaiValue = function (name, value) {
            var shoupai = this.mainGroup.getChildByName(name);
            shoupai.resetValue(value);
        };
        /**
         * 根据value查找
         * @param  {} value
         */
        MineShoupaiGroup.prototype.findMajiangByValue = function (value) {
            for (var i = 0; i < this.shoupais.length; i++) {
                var majiang = this.shoupais[i];
                if (majiang.value == value) {
                    return majiang;
                }
            }
            return null;
        };
        MineShoupaiGroup.prototype.showHuTipsByValue = function (value) {
            var arr = this.shoupais;
            if (this.mopai) {
                arr = arr.concat([this.mopai]);
            }
            for (var i = 0; i < arr.length; i++) {
                var pai = arr[i];
                if (pai.value == value && !pai.maskRect.visible) {
                    pai.huTip.visible = true;
                }
            }
        };
        /**
         * 隐藏三张
         */
        MineShoupaiGroup.prototype.hideRight3pais = function () {
            var myCarsArr = Global.gameProxy.getMineShuopaiArr();
            var selectHsz = Global.gameProxy.getMineGameData().selectedHSZCards;
            game.Utils.removeArrayItem(myCarsArr, selectHsz[0]);
            game.Utils.removeArrayItem(myCarsArr, selectHsz[1]);
            game.Utils.removeArrayItem(myCarsArr, selectHsz[2]);
            myCarsArr = myCarsArr.concat(selectHsz);
            this.sortShoupaiByValue(myCarsArr);
            //myCarsArr
            var index = 14;
            if (!this.mainGroup.getChildByName("mj" + index)) {
                index = 13;
            }
            for (var i = index; i > index - 3; i--) {
                this.mainGroup.getChildByName("mj" + i).visible = false;
            }
        };
        /*
         * 帮玩家选择三张牌
         */
        MineShoupaiGroup.prototype.randomChoseThree = function (value) {
            for (var i = 0; i < this.shoupais.length; i++) {
                var shoupai = this.shoupais[i];
                if (shoupai.selected) {
                    continue;
                }
                if (shoupai.value == value) {
                    shoupai.selectUp();
                    return shoupai;
                }
            }
            return null;
        };
        MineShoupaiGroup.prototype.sortMineShoupai = function () {
            var mineColorsArr = Global.gameProxy.getMineShuopaiArr();
            this.sortShoupaiByMopai(mineColorsArr);
        };
        /**
         * 摸牌
         * @param  {} card
         */
        MineShoupaiGroup.prototype.playerNewCardPush = function (card) {
            this.lastTouchPai = null;
            this.mopai.resetValue(card);
            this.showMopai(true);
        };
        /**
         * 摸牌动画
         * @param  {boolean} needAni
         */
        MineShoupaiGroup.prototype.showMopai = function (needAni) {
            var _this = this;
            // super.showMopai(needAni);
            this.setPointByIndex(this.shoupais.length + 1);
            for (var i = 0; i < this.shoupais.length; i++) {
                if (this.shoupais[i].visible == false) {
                    this.shoupais[i].visible = true;
                }
            }
            var mopai = this.mopai;
            var pos = this.recordsJson[this.shoupais.length + 1];
            if (pos) {
                mopai.x = pos.x + mopai.width / 2;
                mopai.y = mopai.anchorOffsetY;
            }
            var mineColor = Global.gameProxy.getMineGameData();
            mopai.colorIsLight(mineColor.selectColor);
            if (Global.runBack) {
                mopai.visible = true;
            }
            if (mopai.visible) {
                this.checkHuTips();
                return;
            }
            mopai.visible = true;
            egret.Tween.removeTweens(mopai);
            if (needAni) {
                var x = mopai.x;
                var y = mopai.anchorOffsetY;
                mopai.x += mopai.width;
                mopai.y -= mopai.height;
                mopai.rotation = 75;
                egret.Tween.get(mopai).to({
                    rotation: 0,
                    x: x,
                    y: y
                }, 350, egret.Ease.circIn).call(function () {
                    mopai.x = x;
                    mopai.y = y;
                    _this.checkHuTips();
                }, this);
            }
        };
        MineShoupaiGroup.prototype.shoupaiDowns = function () {
            for (var i = 0; i < this.shoupais.length; i++) {
                this.shoupais[i].change2NoSelect();
            }
        };
        /**
         * 删除手牌中一定数量的牌
         */
        MineShoupaiGroup.prototype.removeShoupaiByValue = function (value, number) {
            for (var i = 0; i < number; i++) {
                var pai = this.findMajiangByValue(value);
                if (pai) {
                    game.Utils.removeArrayItem(this.shoupais, pai);
                    game.UIUtils.removeSelf(pai);
                }
            }
        };
        /**
         * 删除手牌by碰
         * @param  {} value
         */
        MineShoupaiGroup.prototype.removeShoupaiByPeng = function (value) {
            this.removeShoupaiByValue(value, 2);
            this.lastTouchPai = null;
            this.sortShoupais();
            this.changeLast2Mopai();
        };
        MineShoupaiGroup.prototype.removeShoupaiByChi = function (card, maxCard) {
            for (var i = 0; i < 3; i++) {
                var value = maxCard - i;
                if (value != card) {
                    this.removeShoupaiByValue(value, 1);
                }
            }
            this.lastTouchPai = null;
            this.sortShoupais();
            this.changeLast2Mopai();
        };
        /**
         * 删除手牌by杠
         * @param  {} value
         */
        MineShoupaiGroup.prototype.removeShoupaiByGang = function (value) {
            this.lastTouchPai = null;
            if (this.mopai.visible && this.mopai.value != value) {
                this.lastTouchPai = this.findMajiangByValue(value);
                this.lastTouchPai.visible = false;
            }
            this.removeShoupaiByValue(value, 4);
            if (this.lastTouchPai) {
                this.mainGroup.addChild(this.lastTouchPai);
                this.shoupais.push(this.lastTouchPai);
                this.lastTouchPai.addTouch();
            }
            this.sortShoupaisByChupai();
        };
        MineShoupaiGroup.prototype.getMopaiPosition = function () {
            var number = this.mainGroup.numChildren + 1;
            return this.recordsJson[number];
        };
        MineShoupaiGroup.prototype.changeLast2Mopai = function () {
            if (this.isMopais(this.shoupais.length)) {
                var last = this.getLastMajiang();
                this.mopai.resetValue(last.value);
                game.UIUtils.removeSelf(last);
                game.Utils.removeArrayItem(this.shoupais, last);
                this.showMopai(false);
            }
        };
        /**
         * 锁定胡牌后无法点击
         */
        MineShoupaiGroup.prototype.lockHu = function () {
            for (var i = 0; i < this.shoupais.length; i++) {
                this.shoupais[i].huLight();
            }
        };
        MineShoupaiGroup.prototype.unLockAll = function () {
            var arr = this.shoupais;
            if (this.mopai) {
                arr = this.shoupais.concat([this.mopai]);
            }
            for (var i = 0; i < arr.length; i++) {
                arr[i].huUnLight();
                // arr[i].huTip.visible = false;;
            }
        };
        MineShoupaiGroup.prototype.unLockByValue = function (value) {
            var arr = this.shoupais;
            if (this.mopai) {
                arr = this.shoupais.concat([this.mopai]);
            }
            for (var i = 0; i < arr.length; i++) {
                var shoupai = arr[i];
                if (shoupai.value == value) {
                    shoupai.huUnLight();
                    shoupai.huTip.visible = true;
                }
            }
        };
        /**
         * 牌身上的胡牌提示隐藏
         * @param  {} visible
         */
        MineShoupaiGroup.prototype.changePaiToVisible = function (visible) {
            var paiArr = this.shoupais.concat([this.mopai]);
            for (var i = 0; i < paiArr.length; i++) {
                var pai = paiArr[i];
                pai.huTip.visible = visible;
            }
        };
        /**
         * 检测哪些牌打出去是可以胡的
         * @param  {} value
         */
        MineShoupaiGroup.prototype.changePaiToTip = function (value) {
            var paiArr = this.shoupais.concat([this.mopai]);
            for (var i = 0; i < paiArr.length; i++) {
                var pai = paiArr[i];
                if (!pai.huTip.visible && !pai.maskRect.visible) {
                    pai.huTip.visible = game.Utils.valueEqual(pai.value, value);
                }
            }
        };
        /**
         * 检测是不是定缺花色
         */
        MineShoupaiGroup.prototype.checkColors = function () {
            var color = Global.gameProxy.getMineGameData().selectColor;
            for (var i = 0; i < this.shoupais.length; i++) {
                var pai = this.shoupais[i];
                if (pai) {
                    pai.colorIsLight(color);
                }
            }
        };
        MineShoupaiGroup.prototype.checkShoupaiByChupaiError = function () {
            var arr = [13, 10, 7, 4, 1];
            //手牌错误
            if (arr.indexOf(this.shoupais.length) < 0) {
                console.log("手牌错误1");
                game.PomeloManager.instance.disConnect();
                return true;
            }
            if (this.checkShoupaiByChupaiError3()) {
                return true;
            }
            this.checkShoupaiByChupaiError2();
            return false;
        };
        MineShoupaiGroup.prototype.checkShoupaiByChupaiError3 = function () {
            for (var i = 1; i <= this.shoupais.length; i++) {
                var child = this.mainGroup.getChildByName("mj" + i);
                if (!child) {
                    console.log("手牌错误3");
                    game.PomeloManager.instance.disConnect();
                    return true;
                }
            }
        };
        MineShoupaiGroup.prototype.checkShoupaiError = function () {
            var arr = [12, 9, 6, 3];
            //手牌错误
            if (arr.indexOf(this.shoupais.length) > -1) {
                console.log("手牌错误2");
                game.PomeloManager.instance.disConnect();
                return true;
            }
            //
            var length = this.shoupais.length;
            if (this.isMopais(length)) {
                length -= 1;
            }
            for (var i = 1; i <= length; i++) {
                var child = this.mainGroup.getChildByName("mj" + i);
                if (!child) {
                    console.log("手牌错误4");
                    game.PomeloManager.instance.disConnect();
                    return true;
                }
            }
            return false;
        };
        /**
         * 判断打那张牌可以下叫
         */
        MineShoupaiGroup.prototype.checkHuTips = function () {
            try {
                //过滤大众麻将
                var gameConfig = Global.gameProxy.lastGameConfig;
                var mineData = Global.gameProxy.getMineGameData();
                if (gameConfig.gameId == 10006 || gameConfig.gameId == "dzmj") {
                    return;
                }
                //过滤 贵阳捉鸡
                if (gameConfig.gameId == 10019 || gameConfig.gameId == "gyzjmj") {
                    return;
                }
                if (gameConfig.gameId == 10020 || gameConfig.gameId == "ermj") {
                    return;
                }
                this.changePaiToVisible(false);
                var mineCard = Global.gameProxy.getMineShuopaiArr();
                if (mineData.huCards.length > 0 || !this.mopai.visible) {
                    return;
                }
                var huCards = {};
                for (var i = 0; i < mineCard.length; i++) {
                    var majiang_2 = {};
                    for (var j = 0; j < mineCard.length; j++) {
                        if (i == j) {
                            continue;
                        }
                        var value = mineCard[j];
                        if (majiang_2[value]) {
                            majiang_2[value] += 1;
                        }
                        else {
                            majiang_2[value] = 1;
                        }
                    }
                    var result = window['TingCardTip'].getTings(majiang_2, mineData.selectColor, mineData.pengCards, mineData.gangCards);
                    if (result.length > 0) {
                        huCards[mineCard[i]] = 1;
                    }
                }
                //根据value获取
                var huArr = _.keys(huCards);
                for (var i = 0; i < huArr.length; i++) {
                    var value = huArr[i];
                    this.changePaiToTip(value);
                }
            }
            catch (e) {
                // alert(JSON.stringify(e));	
            }
        };
        /**
         * 获取当前手牌的排数
         */
        MineShoupaiGroup.prototype.getShoupaiArr = function () {
            var majiang = {};
            for (var i = 0; i < this.shoupais.length; i++) {
                var shoupai = this.shoupais[i];
                if (majiang[shoupai.value]) {
                    majiang[shoupai.value]++;
                }
                else {
                    majiang[shoupai.value] = 1;
                }
            }
            return majiang;
        };
        MineShoupaiGroup.prototype.checkShoupaiByChupaiError2 = function () {
            for (var i = 0; i < this.shoupais.length; i++) {
                var pai = this.shoupais[i];
                var pai0 = this.shoupais[i + 1];
                if (pai && pai0) {
                    if (Math.abs(pai0.x - pai0.x) > (pai.width - 20)) {
                        game.PomeloManager.instance.disConnectAndReconnect();
                        return;
                    }
                }
            }
        };
        MineShoupaiGroup.prototype.playerTing = function () {
            for (var i = 0; i < this.shoupais.length; i++) {
                var pai = this.shoupais[i];
                pai.tingLight();
            }
        };
        return MineShoupaiGroup;
    }(majiang_1.BaseShoupaiGroup));
    majiang_1.MineShoupaiGroup = MineShoupaiGroup;
    __reflect(MineShoupaiGroup.prototype, "majiang.MineShoupaiGroup");
})(majiang || (majiang = {}));
