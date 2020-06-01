/*
 * @Author: he bing
 * @Date: 2018-07-24 17:59:54
 * @Last Modified by: li mengchan
 * @Last Modified time: 2019-01-14 18:23:18
 * @Description: 展示自己胡牌后，显示手中的牌
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
    var MineShowPai = (function (_super) {
        __extends(MineShowPai, _super);
        function MineShowPai(arr, stus) {
            var _this = _super.call(this) || this;
            _this.colorArr1 = [];
            _this.gaidongArr = [];
            _this.colorArr = arr;
            _this.value = stus;
            _this.skinName = new MineHuShowSkin();
            return _this;
        }
        MineShowPai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.showColors();
        };
        MineShowPai.prototype.showColors = function () {
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
        MineShowPai.prototype.show = function () {
            if (this.value == 2) {
                var imgs = void 0;
                this.mineHuShow.visible = true;
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
            }
        };
        MineShowPai.prototype.clearGaidong = function () {
            while (this.gaidongArr.length > 0) {
                var index = this.gaidongArr.pop();
                var di = this['image' + index];
                var color = this['color' + index];
                di.y += 20;
                color.y += 20;
            }
        };
        MineShowPai.prototype.updateShoupai = function (card) {
            this.colorArr = card;
            this.colorArr1 = [];
            this.showColors();
        };
        MineShowPai.prototype.updateShoupaiByArr = function (cardsArr, queType) {
            if (queType === void 0) { queType = 0; }
            this.colorArr1 = cardsArr;
            this.show();
        };
        MineShowPai.prototype.findSelectIndex = function (card) {
            var arr = _.clone(this.colorArr1);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == card && this.gaidongArr.indexOf(i) == -1) {
                    return i;
                }
            }
            ;
            return -1;
        };
        MineShowPai.prototype.selectUpOrDown = function (card, up) {
            var index = this.findSelectIndex(card);
            this.gaidongArr.push(index);
            var di = this['image' + index];
            var color = this['color' + index];
            if (up) {
                egret.Tween.get(di).to({
                    y: di.y - 20
                }, 200);
                egret.Tween.get(color).to({
                    y: color.y - 20
                }, 200);
            }
            else {
                di.y -= 20;
                color.y -= 20;
                egret.Tween.get(di).wait(1000).to({
                    y: di.y + 20
                }, 200);
                egret.Tween.get(color).wait(1000).to({
                    y: color.y + 20
                }, 200);
            }
        };
        return MineShowPai;
    }(eui.Component));
    majiang.MineShowPai = MineShowPai;
    __reflect(MineShowPai.prototype, "majiang.MineShowPai");
})(majiang || (majiang = {}));
