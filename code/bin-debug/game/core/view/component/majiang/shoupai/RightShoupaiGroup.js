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
 * @Last Modified time: 2019-07-17 14:34:57
 * @Description: 上家手牌集合组
 */
var majiang;
(function (majiang_1) {
    var RightShoupaiGroup = (function (_super) {
        __extends(RightShoupaiGroup, _super);
        function RightShoupaiGroup() {
            var _this = _super.call(this) || this;
            _this.shoupais = [];
            return _this;
            // this.skinName = new RightShoupaiGroupSkin();
        }
        RightShoupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 初始化左家手牌
         * @param  {number} number 手牌数量
         */
        RightShoupaiGroup.prototype.initWithArr = function (number, visible) {
            if (visible === void 0) { visible = true; }
            _super.prototype.clearGroup.call(this);
            this.mopai = new majiang_1.RightShoupai();
            this.mainGroup.addChild(this.mopai);
            game.UIUtils.setAnchorPot(this.mopai);
            this.mopai.name = "mopai";
            this.mopai.visible = false;
            for (var i = number; i > 0; i--) {
                var shoupai = this.createShoupai(i);
                shoupai.visible = visible;
            }
        };
        RightShoupaiGroup.prototype.createShoupai = function (index) {
            var shoupai = new majiang_1.RightShoupai();
            this.mainGroup.addChild(shoupai);
            game.UIUtils.setAnchorPot(shoupai);
            var locationPoint = this.recordsJson[index];
            shoupai.changeBgResource(locationPoint.source);
            this.shoupais.push(shoupai);
            shoupai.x = locationPoint.x;
            shoupai.y = locationPoint.y;
            shoupai.name = locationPoint.name;
            return shoupai;
        };
        RightShoupaiGroup.prototype.removeShoupaiByPeng = function () {
            this.removeLastPai();
            this.removeLastPai();
        };
        /**
         * 根据牌重新绘制玩家手牌
         * @param  {number[]} cards
         */
        RightShoupaiGroup.prototype.changeColorWithArr = function (cards) {
            var color = Global.gameProxy.getPlayerByIndex(this.index).selectColor;
            var isHu = Global.gameProxy.getPlayerByIndex(this.index).huCards.length > 0;
            for (var i = 0; i < cards.length; i++) {
                var value = cards[i];
                var majiang = this.mainGroup.getChildByName("mj" + (i + 1));
                var pos = this.recordsJson[(i + 1)];
                if (majiang) {
                    majiang.x = pos.x - 2;
                    majiang.visible = true;
                    majiang.showColor(value);
                }
            }
        };
        RightShoupaiGroup.prototype.setPointByIndex = function (index) {
            if (index > 14) {
                // index = 14;
                return;
            }
            var pos = this.recordsJson[index];
            this.mopai.x = pos.x - 2;
            this.mopai.y = pos.y - 30;
            this.mopai.changeBgResource(pos.source);
        };
        RightShoupaiGroup.prototype.resetZorder = function () {
            for (var i = 14; i > 0; i--) {
                var lastShoupai = this.mainGroup.getChildByName("mj" + i);
                if (lastShoupai) {
                    this.mainGroup.addChild(lastShoupai);
                }
            }
        };
        return RightShoupaiGroup;
    }(majiang_1.BaseShoupaiGroup));
    majiang_1.RightShoupaiGroup = RightShoupaiGroup;
    __reflect(RightShoupaiGroup.prototype, "majiang.RightShoupaiGroup");
})(majiang || (majiang = {}));
