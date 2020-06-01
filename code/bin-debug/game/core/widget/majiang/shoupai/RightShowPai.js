/*
 * @Author: he bing
 * @Date: 2018-07-24 18:00:01
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-09-27 10:49:17
 * @Description: 右边玩家胡牌后，显示手中的牌
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
var majiang;
(function (majiang) {
    var RightShowPai = (function (_super) {
        __extends(RightShowPai, _super);
        function RightShowPai(arr, stus) {
            var _this = _super.call(this) || this;
            _this.colorArr1 = [];
            _this.colorArr2 = [];
            _this.arrysValues = [];
            _this.gaidongArr = [];
            _this.colorArr = arr;
            _this.value = stus;
            _this.skinName = new RightHuShowSkin();
            return _this;
        }
        RightShowPai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.value == 1) {
                this.show();
            }
            else if (this.value == 2) {
                this.showColors();
            }
        };
        RightShowPai.prototype.showColors = function () {
            for (var key in this.colorArr) {
                var nums = this.colorArr[key];
                for (var i = 0; i < nums; i++) {
                    this.colorArr1.push(Number(key));
                }
            }
            var baoCard = Global.gameProxy.roomInfo.baoCards;
            if (baoCard && baoCard[0]) {
                var newArr = [];
                for (var i = 0; i < this.colorArr1.length; i++) {
                    if (this.colorArr1[i] == baoCard[0]) {
                        game.Utils.removeArrayItem(this.colorArr1, baoCard[0]);
                        i--;
                        newArr.push(baoCard[0]);
                    }
                }
                this.colorArr1 = newArr.concat(this.colorArr1);
            }
            this.show();
        };
        RightShowPai.prototype.show = function () {
            if (this.value == 1) {
                this.rightHuShow_bei.visible = true;
                for (var i = 0; i < this.colorArr.length; i++) {
                    this.rightHuShow_bei.getChildAt(12 - i).visible = true;
                }
            }
            else if (this.value == 2) {
                var imgs = void 0;
                this.rightHuShow.visible = true;
                for (var i = 0; i <= 13; i++) {
                    var color = this.colorArr1[i];
                    imgs = this['color' + i];
                    if (color) {
                        this['image' + i].visible = true;
                        imgs.source = RES.getRes("color_value_" + this.colorArr1[i] + "_png");
                    }
                    else {
                        this['image' + i].visible = false;
                        imgs.source = "";
                    }
                }
                // for (let i = 0; i <= 13; i++) {
                // 	let color = this.colorArr1[i];
                // 	if(color){	
                // 		this.rightHuShow.getChildAt(13 - i).visible = true;
                // 		imgs = this.rightHuShow_color.getChildAt(13 - i) as eui.Image;
                // 		imgs.source = RES.getRes("color_value_" + this.colorArr1[i] + "_png");
                // 	}else{
                // 		this.rightHuShow.getChildAt(i).visible = false;
                // 		imgs.source = "";
                // 	}
                // }
            }
        };
        /**
     * 出牌，碰牌，杠牌
     */
        RightShowPai.prototype.chuPais = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 碰牌
         */
        RightShowPai.prototype.pengPai = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 摸牌
         */
        RightShowPai.prototype.moPais = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card, 1);
        };
        RightShowPai.prototype.zhimo = function (cards) {
            this.chushihuashuju();
            var card = _.initial(cards);
            this.shoupaifz(card);
        };
        /**
         * 手牌赋值
         */
        RightShowPai.prototype.shoupaifz = function (colorArrs, numbers) {
            try {
                var imgs = void 0;
                this.rightHuShow.visible = true;
                for (var i = 0; i < colorArrs.length; i++) {
                    this.rightHuShow.getChildAt(13 - i).visible = true;
                    this.rightHuShow_color.getChildAt(13 - i).visible = true;
                    imgs = this.rightHuShow_color.getChildAt(13 - i);
                    imgs.source = RES.getRes("color_value_" + colorArrs[i] + "_png");
                }
            }
            catch (e) {
                LogUtils.logI("cuol");
            }
        };
        /**
         * 换三张
         */
        RightShowPai.prototype.huansanzhang = function (cards) {
            for (var i = 0; i < cards.length; i++) {
                for (var j = 0; j < this.arrysValues.length; j++) {
                    if (cards[i] == this.arrysValues[j]) {
                        this.arrysValues.splice(j, 1);
                    }
                }
            }
            this.chushihuashuju();
            this.shoupaifz(this.arrysValues);
        };
        RightShowPai.prototype.initArr = function (cards) {
            this.arrysValues = [];
            this.chushihuashuju();
            var imgs;
            for (var key in cards) {
                var nums = cards[key];
                for (var i = 0; i < nums; i++) {
                    this.arrysValues.push(key);
                }
            }
            this.rightHuShow.visible = true;
            for (var i = 0; i < this.arrysValues.length; i++) {
                this.rightHuShow.getChildAt(i).visible = true;
                this.rightHuShow_color.getChildAt(i).visible = true;
                imgs = this.rightHuShow_color.getChildAt(i);
                imgs.source = RES.getRes("color_value_" + this.arrysValues[i] + "_png");
            }
        };
        /**
         * 值设空
         */
        RightShowPai.prototype.chushihuashuju = function () {
            this.rightHuShow.visible = false;
            for (var i = 0; i < 14; i++) {
                this.rightHuShow.getChildAt(i).visible = false;
                this.rightHuShow_color.getChildAt(i).visible = false;
            }
        };
        RightShowPai.prototype.findSelectIndex = function (card) {
            var arr = _.clone(this.colorArr1);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == card && this.gaidongArr.indexOf(i) == -1) {
                    return i;
                }
            }
            ;
            return -1;
        };
        RightShowPai.prototype.selectUpOrDown = function (card, up) {
            var index = this.findSelectIndex(card);
            this.gaidongArr.push(index);
            var di = this['image' + index];
            var color = this['color' + index];
            if (up) {
                egret.Tween.get(di).to({
                    x: di.x - 20
                }, 200);
                egret.Tween.get(color).to({
                    x: color.x - 20
                }, 200);
            }
            else {
                di.x -= 20;
                color.x -= 20;
                egret.Tween.get(di).wait(1000).to({
                    x: di.x + 20
                }, 200);
                egret.Tween.get(color).wait(1000).to({
                    x: color.x + 20
                }, 200);
            }
        };
        RightShowPai.prototype.updateShoupaiByArr = function (cardsArr, queType) {
            if (queType === void 0) { queType = 0; }
            this.colorArr1 = cardsArr;
            this.show();
        };
        RightShowPai.prototype.clearGaidong = function () {
            while (this.gaidongArr.length > 0) {
                var index = this.gaidongArr.pop();
                var di = this['image' + index];
                var color = this['color' + index];
                di.x += 20;
                color.x += 20;
            }
        };
        RightShowPai.prototype.updateShoupai = function (card) {
            this.colorArr = card;
            this.colorArr1 = [];
            this.showColors();
        };
        //亮倒
        RightShowPai.prototype.liangdaoMJ = function (playerData) {
            var displayCard = playerData.displayCard;
            var displayCards = majiang.MajiangUtils.getCardArrByJson(displayCard);
            //暗牌长度
            var maxCard = [14, 11, 8, 5, 2];
            var startLength = playerData.cardNum;
            if (maxCard.indexOf(startLength) > -1) {
                startLength -= 1;
            }
            var length = startLength - displayCards.length;
            for (var i = 38; i > 38 - length; i--) {
                this["image" + i].visible = true;
            }
            //显示明牌长度
            for (var i = 0; i < displayCards.length; i++) {
                var card = displayCards[i];
                this["color" + (i + length)].source = RES.getRes("color_value_" + card + "_png");
                this["image" + (i + length)].visible = true;
            }
        };
        return RightShowPai;
    }(eui.Component));
    majiang.RightShowPai = RightShowPai;
    __reflect(RightShowPai.prototype, "majiang.RightShowPai");
})(majiang || (majiang = {}));
