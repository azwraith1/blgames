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
var BaiCaoCardList = (function (_super) {
    __extends(BaiCaoCardList, _super);
    function BaiCaoCardList() {
        var _this = _super.call(this) || this;
        _this.xPoint = [65, 144, 223];
        _this.yPoint = [93, 93, 93];
        _this.skinName = "BaiCaoCardListSkin";
        return _this;
    }
    BaiCaoCardList.prototype.getCurrentCard = function (currentIndex) {
        return this["poker" + currentIndex];
    };
    BaiCaoCardList.prototype.showMaskRect = function (visible) {
        if (visible === void 0) { visible = true; }
        for (var i = 1; i <= 3; i++) {
            this["poker" + i].showMask(visible);
        }
    };
    BaiCaoCardList.prototype.resetLists = function () {
        for (var i = 1; i <= 3; i++) {
            this["poker" + i].visible = false;
            this["poker" + i].showZ2B();
            this["poker" + i].showMask(false);
        }
    };
    BaiCaoCardList.prototype.showBei = function () {
        for (var i = 1; i <= 3; i++) {
            this["poker" + i].visible = true;
            this["poker" + i].showZ2B();
        }
    };
    BaiCaoCardList.prototype.showZheng = function (cards) {
        if (!cards) {
            return;
        }
        this.resetLists();
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var index = i + 1;
            var poker = this["poker" + index];
            poker.initWithNum(card);
            poker.visible = true;
            poker.showB2Z();
        }
    };
    BaiCaoCardList.prototype.fanCards = function () {
        for (var i = 1; i <= 3; i++) {
            this["poker" + i].visible = true;
            this["poker" + i].showB2Z();
        }
    };
    /**
 * 根据传入手牌显示
 * @param  {} cards
 */
    BaiCaoCardList.prototype.initWidthCard = function (cards) {
        if (!cards) {
            return;
        }
        this.resetLists();
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var index = i + 1;
            var poker = this["poker" + index];
            poker.initWithNum(card);
            poker.visible = true;
        }
    };
    /**初始化卡牌数据 */
    BaiCaoCardList.prototype.initCardsData = function (cards) {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var index = i + 1;
            var poker = this["poker" + index];
            poker.changeByNumber(card);
        }
    };
    /**
         * 展牌动画
         */
    BaiCaoCardList.prototype.cardAnimation = function () {
        if (Global.runBack) {
            //后台
            this.poker1.x = this.xPoint[0];
            this.poker1.y = this.yPoint[0];
            this.poker2.x = this.xPoint[1];
            this.poker2.y = this.yPoint[0];
            this.poker3.x = this.xPoint[2];
            this.poker3.y = this.yPoint[0];
            return;
        }
        SoundManager.getInstance().playEffect("bc_resultturn_mp3");
        this.alphaIs0();
        egret.Tween.get(this.poker1).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[0], y: this.yPoint[0] }, 300);
        egret.Tween.get(this.poker2).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[1], y: this.yPoint[1] }, 300);
        egret.Tween.get(this.poker3).to({ x: this.xPoint[0], y: this.yPoint[0] }, 50).to({ x: this.xPoint[2], y: this.yPoint[2] }, 300);
    };
    BaiCaoCardList.prototype.alphaIs0 = function () {
        for (var i = 1; i <= 3; i++) {
            var card = this["poker" + i];
            card.x = this.xPoint[0];
            card.y = this.yPoint[0];
        }
    };
    return BaiCaoCardList;
}(game.BaseUI));
__reflect(BaiCaoCardList.prototype, "BaiCaoCardList");
