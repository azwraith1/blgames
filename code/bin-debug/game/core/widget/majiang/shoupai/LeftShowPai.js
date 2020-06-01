/*
 * @Author: he bing
 * @Date: 2018-07-24 18:00:09
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 14:29:09
 * @Description: 左方玩家胡牌后，显示手中的牌
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
    var LeftShowPai = (function (_super) {
        __extends(LeftShowPai, _super);
        function LeftShowPai(arr, stus) {
            var _this = _super.call(this) || this;
            _this.colorArr1 = [];
            _this.points = {};
            /**
             * 初始化给牌赋值。
             */
            _this.arrysValues = [];
            _this.gaidongArr = [];
            _this.colorArr = arr;
            _this.value = stus;
            _this.skinName = new majiang.LeftHuShowSkin();
            return _this;
        }
        LeftShowPai.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // for(let i = 0; i < this.leftHuShow.numChildren; i++){
            // 	if(!this.points['color']){
            // 		this.points['color'] = {};
            // 	}
            // 	let child = this.leftHuShow.getChildAt(i);
            // 	this.points['color'][i] = {x : child.x, y: child.y};
            // 	if(!this.points['di']){
            // 		this.points['di'] = {};
            // 	}
            // 	let child1 = this.leftHuShow_color.getChildAt(i);
            // 	this.points['di'][i] = {x : child1.x, y: child1.y};
            // }
            if (this.value == 1) {
                this.show();
            }
            else if (this.value == 2) {
                this.showColors();
            }
        };
        LeftShowPai.prototype.showColors = function () {
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
        LeftShowPai.prototype.show = function () {
            if (this.value == 1) {
                this.leftHuShow_bei.visible = true;
                for (var i = 0; i < this.colorArr.length; i++) {
                    this.leftHuShow_bei.getChildAt(i).visible = true;
                }
            }
            else if (this.value == 2) {
                var imgs = void 0;
                this.leftHuShow.visible = true;
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
        /**
     * 出牌，碰牌，杠牌
     */
        LeftShowPai.prototype.chuPais = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 碰牌
         */
        LeftShowPai.prototype.pengPai = function (card) {
            this.chushihuashuju();
            this.shoupaifz(card);
        };
        /**
         * 摸牌
         */
        LeftShowPai.prototype.moPais = function (cards) {
            this.chushihuashuju();
            this.shoupaifz(cards, 1);
        };
        /**
         * zhimo
         */
        LeftShowPai.prototype.zhimo = function (cards) {
            this.chushihuashuju();
            var card = _.initial(cards);
            this.shoupaifz(card);
        };
        /**
         * 摸，出牌赋值
         */
        LeftShowPai.prototype.shoupaifz = function (colorArrs, numbers) {
            try {
                var imgs = void 0;
                this.leftHuShow.visible = true;
                for (var i = 0; i < colorArrs.length; i++) {
                    this.leftHuShow.getChildAt(i).visible = true;
                    this.leftHuShow_color.getChildAt(i).visible = true;
                    imgs = this.leftHuShow_color.getChildAt(i);
                    imgs.source = RES.getRes("color_value_" + colorArrs[i] + "_png");
                }
            }
            catch (e) {
                LogUtils.logI("cuol");
            }
        };
        LeftShowPai.prototype.huansanzhang = function (cards) {
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
        LeftShowPai.prototype.initArr = function (cards) {
            this.arrysValues = [];
            this.chushihuashuju();
            var imgs;
            for (var key in cards) {
                var nums = cards[key];
                for (var i = 0; i < nums; i++) {
                    this.arrysValues.push(key);
                }
            }
            this.leftHuShow.visible = true;
            for (var i = 0; i < this.arrysValues.length; i++) {
                this.leftHuShow.getChildAt(i).visible = true;
                this.leftHuShow_color.getChildAt(i).visible = true;
                imgs = this.leftHuShow_color.getChildAt(i);
                imgs.source = RES.getRes("color_value_" + this.arrysValues[i] + "_png");
            }
        };
        /**
     * 值设空
     */
        LeftShowPai.prototype.chushihuashuju = function () {
            this.leftHuShow.visible = false;
            for (var i = 0; i < 14; i++) {
                this.leftHuShow.getChildAt(i).visible = false;
                this.leftHuShow_color.getChildAt(i).visible = false;
            }
        };
        LeftShowPai.prototype.clearGaidong = function () {
            while (this.gaidongArr.length > 0) {
                var index = this.gaidongArr.pop();
                var di = this['image' + index];
                var color = this['color' + index];
                di.x -= 20;
                color.x -= 20;
            }
        };
        LeftShowPai.prototype.updateShoupaiByArr = function (cardsArr, queType) {
            if (queType === void 0) { queType = 0; }
            this.colorArr1 = cardsArr;
            this.show();
        };
        LeftShowPai.prototype.updateShoupai = function (card) {
            this.colorArr = card;
            this.colorArr1 = [];
            this.showColors();
        };
        LeftShowPai.prototype.findSelectIndex = function (card) {
            var arr = _.clone(this.colorArr1);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == card && this.gaidongArr.indexOf(i) == -1) {
                    return i;
                }
            }
            ;
            return -1;
        };
        LeftShowPai.prototype.selectUpOrDown = function (card, up) {
            var index = this.findSelectIndex(card);
            this.gaidongArr.push(index);
            var di = this['image' + index];
            var color = this['color' + index];
            if (up) {
                egret.Tween.get(di).to({
                    x: di.x + 20
                }, 200);
                egret.Tween.get(color).to({
                    x: color.x + 20
                }, 200);
            }
            else {
                di.x += 20;
                color.x += 20;
                egret.Tween.get(di).wait(1000).to({
                    x: di.x - 20
                }, 200);
                egret.Tween.get(color).wait(1000).to({
                    x: color.x - 20
                }, 200);
            }
        };
        //亮倒
        LeftShowPai.prototype.liangdaoMJ = function (playerData) {
            var displayCard = playerData.displayCard;
            var displayCards = majiang.MajiangUtils.getCardArrByJson(displayCard);
            //暗牌长度
            var maxCard = [14, 11, 8, 5, 2];
            var startLength = playerData.cardNum;
            if (maxCard.indexOf(startLength) > -1) {
                startLength -= 1;
            }
            var length = startLength - displayCards.length;
            for (var i = 26; i < 26 + length; i++) {
                this["image" + i].visible = true;
            }
            //显示明牌长度
            for (var i = 0; i < displayCards.length; i++) {
                var card = displayCards[i];
                this["color" + (i + length)].source = RES.getRes("color_value_" + card + "_png");
                this["image" + (i + length)].visible = true;
            }
        };
        return LeftShowPai;
    }(eui.Component));
    majiang.LeftShowPai = LeftShowPai;
    __reflect(LeftShowPai.prototype, "majiang.LeftShowPai");
})(majiang || (majiang = {}));
