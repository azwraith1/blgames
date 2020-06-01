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
 * @Date: 2018-06-29 10:09:12
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-23 15:51:13
 * @Description: 手牌的基本类: 13张 固定命名规范
 */
var majiang;
(function (majiang_1) {
    var BaseShoupaiGroup = (function (_super) {
        __extends(BaseShoupaiGroup, _super);
        function BaseShoupaiGroup() {
            var _this = _super.call(this) || this;
            //记录的详细的坐标点
            _this.recordsJson = {};
            _this.shoupais = [];
            return _this;
        }
        BaseShoupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //记录坐标点
            this.setRecords();
            this.mainGroup.removeChildren();
        };
        /**
         * 设置坐标点
         */
        BaseShoupaiGroup.prototype.setRecords = function () {
            for (var i = 1; i <= 14; i++) {
                var image = this['image' + i];
                game.UIUtils.setAnchorPot(image);
                if (image) {
                    this.recordsJson[i] = {};
                    this.recordsJson[i].source = image.source;
                    this.recordsJson[i].x = image.x;
                    this.recordsJson[i].y = image.y;
                    this.recordsJson[i].scaleX = image.scaleX;
                    this.recordsJson[i].scaleY = image.scaleY;
                    this.recordsJson[i].name = "mj" + i;
                    // this.recordsJson[i - 1] = new egret.Point(image.x, image.y);
                }
            }
        };
        /**
     * 游戏结束设置坐标点
     */
        BaseShoupaiGroup.prototype.setRecordsOver = function () {
            for (var i = 15; i <= 27; i++) {
                var image = this['image' + i];
                game.UIUtils.setAnchorPot(image);
                if (image) {
                    this.recordsJson[i] = {};
                    this.recordsJson[i].source = image.source;
                    this.recordsJson[i].x = image.x;
                    this.recordsJson[i].y = image.y;
                    this.recordsJson[i].scaleX = image.scaleX;
                    this.recordsJson[i].scaleY = image.scaleY;
                    this.recordsJson[i].name = "mj" + i;
                    // this.recordsJson[i - 1] = new egret.Point(image.x, image.y);
                }
            }
        };
        /**
         * 换三张隐藏右边3张牌
         */
        BaseShoupaiGroup.prototype.hideRight3pais = function (noVisible) {
            if (noVisible === void 0) { noVisible = false; }
            if (this.mainGroup.numChildren < 1) {
                return;
            }
            var index = 14;
            if (!this.mainGroup.getChildByName("mj" + index)) {
                index = 13;
            }
            for (var i = index; i > index - 3; i--) {
                if (this.mainGroup.getChildByName("mj" + i)) {
                    this.mainGroup.getChildByName("mj" + i).visible = noVisible;
                }
            }
        };
        /**
         * 换三张隐藏右边3张牌
         */
        BaseShoupaiGroup.prototype.hideRightByCount = function (count, isHide) {
            if (isHide === void 0) { isHide = false; }
            if (count == 0) {
                return;
            }
            if (this.mainGroup.numChildren < 1) {
                return;
            }
            var index = 14;
            if (!this.mainGroup.getChildByName("mj" + index)) {
                index = 13;
            }
            for (var i = index; i > index - count; i--) {
                if (this.mainGroup.getChildByName("mj" + i)) {
                    this.mainGroup.getChildByName("mj" + i).visible = isHide;
                }
            }
        };
        BaseShoupaiGroup.prototype.showAllShoupai = function () {
            for (var i = 0; i < this.shoupais.length; i++) {
                this.shoupais[i].visible = true;
            }
        };
        BaseShoupaiGroup.prototype.hidePaiByValue = function (value, isShow) {
            for (var i = 0; i < this.shoupais.length; i++) {
                if (this.shoupais[i].value == value) {
                    this.shoupais[i].visible = isShow;
                }
            }
            if (this.mopai) {
                if (this.mopai.value == value) {
                    this.mopai.visible = isShow;
                }
            }
        };
        BaseShoupaiGroup.prototype.isMopais = function (length) {
            var arrs = [2, 5, 8, 11, 14];
            return arrs.indexOf(length) > -1;
        };
        /**
         * 碰牌删除手牌2个
         * @param  {} color
         */
        BaseShoupaiGroup.prototype.removeShoupaiByPeng = function (color) {
            this.removeLastPai();
            this.removeLastPai();
        };
        BaseShoupaiGroup.prototype.removeShoupaiByChi = function (card, maxCard) {
            if (card === void 0) { card = null; }
            if (maxCard === void 0) { maxCard = null; }
            this.removeLastPai();
            this.removeLastPai();
        };
        BaseShoupaiGroup.prototype.removeLastPai = function () {
            var mj1 = this.getLastMajiang();
            game.Utils.removeArrayItem(this.shoupais, mj1);
            game.UIUtils.removeSelf(mj1);
        };
        BaseShoupaiGroup.prototype.getLastVisibleMajiang = function () {
            for (var i = 14; i > 0; i--) {
                var majiang_2 = this.mainGroup.getChildByName("mj" + i);
                if (majiang_2 && majiang_2.visible) {
                    return majiang_2;
                }
            }
            return null;
        };
        BaseShoupaiGroup.prototype.getLastMajiang = function () {
            for (var i = 14; i > 0; i--) {
                var majiang_3 = this.mainGroup.getChildByName("mj" + i);
                if (majiang_3) {
                    return majiang_3;
                }
            }
            return null;
        };
        BaseShoupaiGroup.prototype.getMopaiPosition = function () {
            var number = this.mainGroup.numChildren;
            return this.recordsJson[number];
        };
        /**
         * 重新连接过后
         */
        BaseShoupaiGroup.prototype.changeLast2Mopai = function (card) {
            //如果是摸牌的角度
            if (this.isMopais(this.shoupais.length)) {
                var last = this.getLastMajiang();
                if (card) {
                    this.mopai.resetValue(last.value);
                }
                game.Utils.removeArrayItem(this.shoupais, last);
                game.UIUtils.removeSelf(last);
                this.showMopai(false);
            }
        };
        BaseShoupaiGroup.prototype.hideMopai = function () {
            // egret.Tween.removeTweens(this.mopai);
            if (this.mopai) {
                this.mopai.visible = false;
            }
        };
        BaseShoupaiGroup.prototype.showOtherChupaiAni = function (isBaoTing) {
            var _this = this;
            if (isBaoTing === void 0) { isBaoTing = false; }
            if (Global.runBack || isBaoTing) {
                this.hideMopai();
                return;
            }
            var card = this.shoupais[Math.floor(_.random(0, this.shoupais.length - 1))];
            egret.Tween.get(this).call(function () {
                card.visible = false;
            }, this).wait(200).call(function () {
                _this.hideMopai();
            }).wait(200).call(function () {
                if (card != _this.mopai) {
                    card.visible = true;
                }
            });
        };
        BaseShoupaiGroup.prototype.showMopai = function (needAni) {
            this.mopai.visible = true;
            this.setPointByIndex(this.shoupais.length + 1);
        };
        BaseShoupaiGroup.prototype.playerNewCardPush = function (card) {
            if (card && this.mopai['colorImage']) {
                this.mopai['showColor'](card);
            }
            this.setPointByIndex(this.shoupais.length + 1);
            this.mopai.visible = true;
            var yIndex = this.mopai.y;
            this.mopai.y -= 20;
            egret.Tween.get(this.mopai).to({
                y: yIndex
            }, 200);
        };
        BaseShoupaiGroup.prototype.setPointByIndex = function (index) {
            var pos = this.recordsJson[index];
            if (pos) {
                this.mopai.x = pos.x;
                this.mopai.y = pos.y;
            }
            if (this.mopai.changeBgResource) {
                this.mopai.changeBgResource(pos.source);
            }
        };
        BaseShoupaiGroup.prototype.clearGroup = function () {
            this.shoupais = [];
            this.mainGroup.removeChildren();
            this.mopai = null;
        };
        BaseShoupaiGroup.prototype.shoupaisVisible = function () {
            for (var i = 0; i < this.mainGroup.numChildren; i++) {
                var child = this.mainGroup.getChildAt(i);
                child.visible = false;
            }
            for (var i = 0; i < this.shoupais.length; i++) {
                this.shoupais[i].visible = false;
            }
        };
        return BaseShoupaiGroup;
    }(game.BaseUI));
    majiang_1.BaseShoupaiGroup = BaseShoupaiGroup;
    __reflect(BaseShoupaiGroup.prototype, "majiang.BaseShoupaiGroup");
})(majiang || (majiang = {}));
