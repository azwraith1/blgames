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
 * @Last Modified time: 2019-07-17 14:34:33
 * @Description: 对家手牌集合组
 */
var majiang;
(function (majiang) {
    var TopShoupaiGroup = (function (_super) {
        __extends(TopShoupaiGroup, _super);
        function TopShoupaiGroup() {
            var _this = _super.call(this) || this;
            _this.shoupais = [];
            return _this;
            // this.skinName = new majiang.TopShoupaiGroupSkin();
        }
        TopShoupaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scaleX = this.scaleY = 1.3;
        };
        /**
         * 初始化左家手牌
         * @param  {number} number 手牌数量
         */
        TopShoupaiGroup.prototype.initWithArr = function (number, visible) {
            if (visible === void 0) { visible = true; }
            _super.prototype.clearGroup.call(this);
            for (var i = 1; i <= number; i++) {
                var shoupai = new majiang.TopShoupai();
                shoupai.changeBgResource(i);
                this.mainGroup.addChild(shoupai);
                game.UIUtils.setAnchorPot(shoupai);
                shoupai.visible = visible;
                this.shoupais.push(shoupai);
                var locationPoint = this.recordsJson[i];
                shoupai.x = locationPoint.x;
                shoupai.y = locationPoint.y;
                shoupai.name = locationPoint.name;
            }
            this.mopai = new majiang.TopShoupai();
            this.mainGroup.addChild(this.mopai);
            this.mopai.name = "mopai";
            game.UIUtils.setAnchorPot(this.mopai);
            this.mopai.visible = false;
            this.resetZorder();
        };
        TopShoupaiGroup.prototype.showMopaiAni = function () {
            var num = this.mainGroup.numChildren;
            var lastShoupai = this.mainGroup.getChildByName("mj" + (num));
            var locationPoint = this.recordsJson[num];
            lastShoupai.visible = true;
            lastShoupai.x = locationPoint.x - 30;
            lastShoupai.y = locationPoint.y;
            // this.resetZorder();
        };
        TopShoupaiGroup.prototype.showChupaiAni = function () {
            var num = this.mainGroup.numChildren;
            var lastShoupai = this.mainGroup.getChildByName("mj" + (num));
            lastShoupai.visible = false;
        };
        TopShoupaiGroup.prototype.setPointByIndex = function (index) {
            if (index > 14) {
                return;
                // index = 14;
            }
            var pos = this.recordsJson[index];
            this.mopai.x = pos.x - 20;
            this.mopai.y = pos.y;
            this.mopai.changeBgResource(index);
        };
        TopShoupaiGroup.prototype.resetZorder = function () {
            if (this.mopai) {
                this.mainGroup.addChild(this.mopai);
            }
            var zorder = [14, 13, 12, 11, 10, 9, 8, 7, 6, 1, 2, 3, 4, 5];
            for (var i = 0; i <= zorder.length - 1; i++) {
                if (this.mainGroup.getChildByName("mj" + zorder[i])) {
                    this.mainGroup.addChild(this.mainGroup.getChildByName("mj" + zorder[i]));
                }
            }
        };
        return TopShoupaiGroup;
    }(majiang.BaseShoupaiGroup));
    majiang.TopShoupaiGroup = TopShoupaiGroup;
    __reflect(TopShoupaiGroup.prototype, "majiang.TopShoupaiGroup");
})(majiang || (majiang = {}));
