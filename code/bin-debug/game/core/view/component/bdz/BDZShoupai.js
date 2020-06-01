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
 * @Author: MC Lee
 * @Date: 2019-03-27 13:54:51
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-24 18:04:36
 * @Description: 百得之手牌
 */
var BDZShoupai = (function (_super) {
    __extends(BDZShoupai, _super);
    function BDZShoupai() {
        var _this = _super.call(this) || this;
        _this.moveIndex = 1;
        _this.pokerLists = [];
        _this.selectLists = [];
        return _this;
    }
    BDZShoupai.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.skinName == "BDZLeftShoupaiSkin") {
            this.type = 1;
        }
        else {
            this.type = -1;
        }
        for (var i = 1; i <= 4; i++) {
            this.pokerLists.push(this["poker" + i]);
        }
        this.addTouchEvent(false);
        this.setNameByX();
        this.huanpaiLabel.text = "";
        this.kuangImage.visible = false;
    };
    BDZShoupai.prototype.getSelectCards = function () {
        for (var i = 0; i < this.pokerLists.length; i++) {
            var poker = this.pokerLists[i];
            if (poker && poker.selected) {
                game.Utils.removeArrayItem(this.pokerLists, poker);
                this.selectLists.push(poker);
                poker.selectDown();
                // CF.dP(ENo.BDZ_CARD_TOUCH, poker.name);
                i--;
            }
        }
        return this.selectLists;
    };
    BDZShoupai.prototype.getSelectCardsByOther = function (number) {
        for (var i = 1; i <= number; i++) {
            var poker = this.pokerLists[4 - i];
            game.Utils.removeArrayItem(this.pokerLists, poker);
            this.selectLists.push(poker);
        }
        return this.selectLists;
    };
    BDZShoupai.prototype.hebingCards = function (sort) {
        if (sort === void 0) { sort = true; }
        this.pokerLists = this.pokerLists.concat(this.selectLists);
        this.selectLists = [];
        this.setNames();
        // if(sort){
        this.autoSort(sort);
        // }
    };
    BDZShoupai.prototype.setNameByX = function () {
        var _this = this;
        this.pokerLists = _.sortBy(this.pokerLists, function (poker) {
            if (_this.type == 1) {
                return poker.x;
            }
            else {
                return poker.x * -1;
            }
        });
        this.setNames();
    };
    BDZShoupai.prototype.setNames = function () {
        for (var i = 0; i < this.pokerLists.length; i++) {
            this.pokerLists[i].name = (i + 1) + "";
        }
    };
    BDZShoupai.prototype.sortShoupaiByValue = function () {
        var sort1 = _.sortBy(this.pokerLists, function (poker) {
            return poker.number;
        });
        this.pokerLists = _.sortBy(sort1, function (poker) {
            return poker.number % 100;
        });
        this.setNames();
        this.autoSort(true);
    };
    BDZShoupai.prototype.autoSort = function (ani) {
        for (var i = 0; i < this.pokerLists.length; i++) {
            var poker = this.pokerLists[i];
            this.addChild(poker);
            var moveX = 6 + (i * 59);
            if (this.type == -1) {
                moveX = 43 + (i * 59);
            }
            if (ani && !Global.runBack) {
                egret.Tween.get(poker).to({
                    x: moveX
                }, 200, egret.Ease.circOut);
            }
            else {
                poker.x = moveX;
            }
        }
        if (this.qipaiRect) {
            this.addChild(this.qipaiRect);
        }
    };
    BDZShoupai.prototype.addTouchEvent = function (canTouch) {
        for (var i = 0; i < this.pokerLists.length; i++) {
            this.pokerLists[i].touchEnabled = canTouch;
        }
        for (var i = 0; i < this.selectLists.length; i++) {
            this.selectLists[i].touchEnabled = canTouch;
        }
    };
    BDZShoupai.prototype.hideAllShoupai = function () {
        for (var i = 1; i <= 4; i++) {
            this["poker" + i].visible = false;
        }
    };
    BDZShoupai.prototype.getGlobalIndex = function () {
        return this.getChildByName(this.moveIndex + "").localToGlobal();
    };
    BDZShoupai.prototype.showShoupai = function (index) {
        this.getChildByName(index + "").visible = true;
    };
    BDZShoupai.prototype.showShoupaiByAni = function (index, cardValue) {
        var poker = this.getChildByName(index);
        if (cardValue) {
            poker.initWithNum(cardValue);
        }
        else {
            var mineData = Global.roomProxy.getMineData();
            var cards = mineData.handCards.value;
            poker.initWithNum(cards[index - 1]);
        }
        poker.visible = true;
        poker.pokerB2ZAni1();
    };
    BDZShoupai.prototype.showShoupaiRecCard = function (values) {
        for (var i = 0; i < values.length; i++) {
            var card = values[i];
            var poker = this.getChildByName((i + 1) + "");
            poker.visible = true;
            poker.initWithNum(card);
            poker.showB2Z();
        }
    };
    BDZShoupai.prototype.showShoupaiRecLength = function (length) {
        for (var i = 0; i < length; i++) {
            var poker = this.getChildByName((i + 1) + "");
            poker.visible = true;
            poker.showZ2B();
        }
    };
    BDZShoupai.prototype.selectUpByIndex = function (index) {
        var poker = this.getChildByName(index);
        if (poker.selected) {
            return poker.selectDown();
        }
        else {
            return poker.selectUp();
        }
    };
    BDZShoupai.prototype.showKuangAni = function (useAni) {
        egret.Tween.removeTweens(this.kuangImage);
        this.kuangImage.alpha = 1;
        this.kuangImage.visible = useAni;
        if (useAni) {
            egret.Tween.get(this.kuangImage, { loop: true }).to({
                alpha: 0
            }, 500).to({
                alpha: 1
            }, 500);
        }
    };
    BDZShoupai.prototype.showHuanpaiCount = function (numberArr) {
        var str = "";
        for (var i = 0; i < numberArr.length; i++) {
            str += numberArr[i];
        }
        this.huanpaiLabel.text = str;
    };
    /**
     * 自动提示牌
     */
    BDZShoupai.prototype.autoTipsCards = function () {
        var mineInfo = Global.roomProxy.getMineInfo();
        var tipCard = mineInfo.tipCards;
        for (var i = 0; i < this.pokerLists.length; i++) {
            var poker = this.pokerLists[i];
            // CF.dP(ENo.BDZ_CARD_TOUCH, poker.name);
            if (tipCard.indexOf(poker.number) > -1) {
                poker.selectUp();
            }
            else {
                poker.selectDown();
            }
        }
    };
    BDZShoupai.prototype.cardsAllDown = function () {
        for (var i = 0; i < this.pokerLists.length; i++) {
            this.pokerLists[i].selectDown();
        }
        for (var i = 0; i < this.selectLists.length; i++) {
            this.selectLists[i].selectDown();
        }
    };
    BDZShoupai.prototype.fixedShoupai = function () {
        var pokerList = _.sortBy(this.pokerLists, "x");
        var index = 0;
        if (this.type == -1) {
            for (var i = 3; i >= 0; i--, index++) {
                var poker = pokerList[i];
                poker.parent.addChild(poker);
            }
        }
        else {
            for (var i = 0; i <= 3; i++, index++) {
                var poker = pokerList[i];
                poker.parent.addChild(poker);
            }
        }
        this.addChild(this.qipaiRect);
    };
    BDZShoupai.prototype.showQipaiAni = function (ani) {
        if (ani === void 0) { ani = true; }
        // let poker0 = this.poker1;//this.pokerLists[0];
        var pokerList = _.sortBy(this.pokerLists, "x");
        var index = 0;
        if (this.type == -1) {
            for (var i = 3; i >= 0; i--, index++) {
                var poker = pokerList[i];
                if (poker) {
                    egret.Tween.removeTweens(poker);
                    poker.selectDown();
                    poker.showZ2B();
                    if (ani && !Global.runBack) {
                        egret.Tween.get(poker).to({
                            x: pokerList[3].x - (30 * index),
                            y: 25
                        }, 200, egret.Ease.sineIn);
                    }
                    else {
                        poker.x = pokerList[3].x - (30 * index);
                        poker.y = 25;
                    }
                    poker.parent.addChild(poker);
                }
            }
        }
        else {
            for (var i = 0; i <= 3; i++, index++) {
                var poker = pokerList[i];
                if (poker) {
                    egret.Tween.removeTweens(poker);
                    poker.selectDown();
                    poker.showZ2B();
                    if (ani && !Global.runBack) {
                        egret.Tween.get(poker).to({
                            x: pokerList[0].x + (30 * index),
                            y: 25
                        }, 200, egret.Ease.sineIn);
                    }
                    else {
                        poker.x = pokerList[0].x + (30 * index);
                        poker.y = 25;
                    }
                    poker.parent.addChild(poker);
                }
            }
        }
        this.qipaiRect.visible = true;
        this.addChild(this.qipaiRect);
        // for (let i = 0; i < this.pokerLists.length; i++) {
        // 	let poker = this.pokerLists[i] as BDZPoker;
        // 	poker.selectDown();
        // 	poker.showZ2B();
        // 	if (ani) {
        // 		if (i > 0) {
        // 			egret.Tween.get(poker).to({
        // 				x: poker0.x + (30 * i)
        // 			}, 200, egret.Ease.sineIn)
        // 		}
        // 	} else {
        // 		poker.x = poker0.x + (30 * i);
        // 	}
        // }
    };
    /**
     * 其他玩家翻牌
     * @param  {} playerIndex
     */
    BDZShoupai.prototype.showOtherFanpai = function (playerIndex) {
        var playerData = Global.roomProxy.getPlayerByIndex(playerIndex);
        var cards = playerData.handCards.value;
        for (var i = 0; i < this.pokerLists.length; i++) {
            var poker = this.pokerLists[i];
            poker.selectDown();
            poker.initWithNum(cards[i]);
            poker.pokerB2ZAni2();
        }
    };
    return BDZShoupai;
}(game.BaseUI));
__reflect(BDZShoupai.prototype, "BDZShoupai");
