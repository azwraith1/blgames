/*
 * @Author: he bing
 * @Date: 2018-07-24 18:00:05
 * @Last Modified by: li mengchan
 * @Last Modified time: 2019-01-14 19:10:29
 * @Description:对方玩家胡牌后，显示手中的牌
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
    var TopShowPai = (function (_super) {
        __extends(TopShowPai, _super);
        function TopShowPai(arr, stus) {
            var _this = _super.call(this) || this;
            _this.colorArr1 = [];
            _this.arrysValues = [];
            _this.gaidongArr = [];
            _this.colorArr = arr;
            _this.value = stus;
            _this.skinName = new TopHuShowSkin();
            return _this;
        }
        TopShowPai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.value == 1) {
                this.show();
            }
            else if (this.value == 2) {
                this.showColors();
            }
        };
        TopShowPai.prototype.showColors = function () {
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
        TopShowPai.prototype.show = function () {
            if (this.value == 1) {
                this.topHuShow_bei.visible = true;
                for (var i = 0; i < this.colorArr.length; i++) {
                    this.topHuShow_bei.getChildAt(i).visible = true;
                }
            }
            else if (this.value == 2) {
                var imgs = void 0;
                this.topHuShow.visible = true;
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
                // 		this.topHuShow.getChildAt(i).visible = true;
                // 		imgs = this.topHuShow_color.getChildAt(13 - i) as eui.Image;
                // 		imgs.source = RES.getRes("color_value_" + this.colorArr1[i] + "_png");
                // 	}else{
                // 		this.topHuShow.getChildAt(i).visible = false;
                // 		imgs.source = "";
                // 	}
                // }
            }
        };
        /**
     * 出牌，碰牌，杠牌
     */
        TopShowPai.prototype.chuPais = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 碰牌
         */
        TopShowPai.prototype.pengPai = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 摸牌
         */
        TopShowPai.prototype.moPais = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card, 1);
        };
        TopShowPai.prototype.zhimo = function (cards) {
            this.chushihuashuju();
            var card = _.initial(cards);
            this.shoupaifz(card);
        };
        TopShowPai.prototype.shoupaifz = function (colorArrs, numbers) {
            try {
                var imgs = void 0;
                this.topHuShow.visible = true;
                for (var i = 0; i < colorArrs.length; i++) {
                    this.topHuShow.getChildAt(i).visible = true;
                    this.topHuShow_color.getChildAt(13 - i).visible = true;
                    imgs = this.topHuShow_color.getChildAt(13 - i);
                    imgs.source = RES.getRes("color_value_" + colorArrs[i] + "_png");
                }
            }
            catch (e) {
                LogUtils.logI("cuol");
            }
        };
        TopShowPai.prototype.huansanzhang = function (cards) {
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
        TopShowPai.prototype.initArr = function (cards) {
            this.arrysValues = [];
            this.chushihuashuju();
            var imgs;
            for (var key in cards) {
                var nums = cards[key];
                for (var i = 0; i < nums; i++) {
                    this.arrysValues.push(key);
                }
            }
            this.topHuShow.visible = true;
            for (var i = 0; i < this.arrysValues.length; i++) {
                this.topHuShow.getChildAt(i).visible = true;
                this.topHuShow_color.getChildAt(13 - i).visible = true;
                imgs = this.topHuShow_color.getChildAt(13 - i);
                imgs.source = RES.getRes("color_value_" + this.arrysValues[i] + "_png");
            }
        };
        /**
 * 值设空
 */
        TopShowPai.prototype.chushihuashuju = function () {
            this.topHuShow.visible = false;
            for (var i = 0; i < 14; i++) {
                this.topHuShow.getChildAt(i).visible = false;
                this.topHuShow_color.getChildAt(i).visible = false;
            }
        };
        TopShowPai.prototype.clearGaidong = function () {
            while (this.gaidongArr.length > 0) {
                var index = this.gaidongArr.pop();
                var di = this['image' + index];
                var color = this['color' + index];
                di.y -= 10;
                color.y -= 10;
            }
        };
        TopShowPai.prototype.updateShoupaiByArr = function (cardsArr, queType) {
            if (queType === void 0) { queType = 0; }
            this.colorArr1 = cardsArr;
            this.show();
        };
        TopShowPai.prototype.updateShoupai = function (card) {
            this.colorArr = card;
            this.colorArr1 = [];
            this.showColors();
        };
        TopShowPai.prototype.findSelectIndex = function (card) {
            var arr = _.clone(this.colorArr1);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == card && this.gaidongArr.indexOf(i) == -1) {
                    return i;
                }
            }
            ;
            return -1;
        };
        TopShowPai.prototype.selectUpOrDown = function (card, up) {
            var index = this.findSelectIndex(card);
            this.gaidongArr.push(index);
            var di = this['image' + index];
            var color = this['color' + index];
            if (up) {
                egret.Tween.get(di).to({
                    y: di.y + 10
                }, 200);
                egret.Tween.get(color).to({
                    y: color.y + 10
                }, 200);
            }
            else {
                di.y += 10;
                color.y += 10;
                egret.Tween.get(di).wait(1000).to({
                    y: di.y - 10
                }, 200);
                egret.Tween.get(color).wait(1000).to({
                    y: color.y - 10
                }, 200);
            }
        };
        return TopShowPai;
    }(eui.Component));
    majiang.TopShowPai = TopShowPai;
    __reflect(TopShowPai.prototype, "majiang.TopShowPai");
})(majiang || (majiang = {}));
