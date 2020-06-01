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
 * @Last Modified time: 2019-07-17 14:34:48
 * @Description: 上家手牌集合组
 */
var majiang;
(function (majiang_1) {
    var LeftShoupaiGroup = (function (_super) {
        __extends(LeftShoupaiGroup, _super);
        function LeftShoupaiGroup() {
            var _this = _super.call(this) || this;
            _this.shoupais = [];
            return _this;
            // this.skinName = new LeftShoupaiGroupSkin();
        }
        LeftShoupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 初始化左家手牌
         * @param  {number} number 手牌数量
         */
        LeftShoupaiGroup.prototype.initWithArr = function (number, visible) {
            if (visible === void 0) { visible = true; }
            _super.prototype.clearGroup.call(this);
            for (var i = 1; i <= number; i++) {
                var shoupai = new majiang_1.LeftShoupai();
                this.mainGroup.addChild(shoupai);
                var locationPoint = this.recordsJson[i];
                game.UIUtils.setAnchorPot(shoupai);
                shoupai.changeBgResource(locationPoint.source);
                this.shoupais.push(shoupai);
                shoupai.visible = visible;
                shoupai.x = locationPoint.x;
                shoupai.y = locationPoint.y;
                shoupai.name = locationPoint.name;
            }
            this.mopai = new majiang_1.LeftShoupai();
            game.UIUtils.setAnchorPot(this.mopai);
            this.mainGroup.addChild(this.mopai);
            this.mopai.name = "mopai";
            this.mopai.visible = false;
        };
        LeftShoupaiGroup.prototype.removeShoupaiByPeng = function () {
            this.removeLastPai();
            this.removeLastPai();
        };
        /**
         * 根据牌重新绘制玩家手牌
         * @param  {number[]} cards
         */
        LeftShoupaiGroup.prototype.changeColorWithArr = function (cards) {
            var color = Global.gameProxy.getPlayerByIndex(this.index).selectColor;
            var isHu = Global.gameProxy.getPlayerByIndex(this.index).huCards.length > 0;
            for (var i = 0; i < cards.length; i++) {
                var value = cards[i];
                var majiang = this.mainGroup.getChildByName("mj" + (i + 1));
                var pos = this.recordsJson[(i + 1)];
                if (majiang) {
                    majiang.x = pos.x + 1;
                    majiang.y = pos.y;
                    majiang.visible = true;
                    majiang.showColor(value);
                }
            }
        };
        LeftShoupaiGroup.prototype.setPointByIndex = function (index) {
            if (index > 14) {
                return;
                // index = 14;
            }
            var pos = this.recordsJson[index];
            this.mopai.x = pos.x + 1;
            this.mopai.y = pos.y + 20;
            this.mopai.changeBgResource(pos.source);
        };
        /**
         * 玩家摸牌动画效果
         * @param  {} value
         */
        LeftShoupaiGroup.prototype.playerMopai = function (value) {
            var mopai = this.createShoupai(this.mainGroup.numChildren);
            var num = this.mainGroup.numChildren;
            var lastShoupai = this.createShoupai(num + 1);
            var locationPoint = this.recordsJson[num];
            lastShoupai.changeBgResource(locationPoint.source);
            lastShoupai.x = locationPoint.x;
            lastShoupai.y = locationPoint.y - 30;
            lastShoupai.visible = true;
            // this.resetZorder();
        };
        LeftShoupaiGroup.prototype.createShoupai = function (index) {
            var shoupai = new majiang_1.LeftShoupai();
            this.mainGroup.addChild(shoupai);
            var locationPoint = this.recordsJson[index];
            shoupai.changeBgResource(locationPoint.source);
            shoupai.x = locationPoint.x;
            shoupai.y = locationPoint.y;
            shoupai.name = locationPoint.name;
            return shoupai;
        };
        return LeftShoupaiGroup;
    }(majiang_1.BaseShoupaiGroup));
    majiang_1.LeftShoupaiGroup = LeftShoupaiGroup;
    __reflect(LeftShoupaiGroup.prototype, "majiang.LeftShoupaiGroup");
})(majiang || (majiang = {}));
