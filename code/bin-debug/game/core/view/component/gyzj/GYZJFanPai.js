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
    var GYZJFanPai = (function (_super) {
        __extends(GYZJFanPai, _super);
        function GYZJFanPai(value, paiNum) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/component/gyzj/GYZJFanPai.exml";
            return _this;
        }
        /**牌的值设定 */
        GYZJFanPai.prototype.setCardVal = function (val) {
            this.colorImage.source = RES.getRes("color_value_" + val + "_png");
        };
        /**牌的值设定 */
        GYZJFanPai.prototype.setBackCardVal = function (val) {
            this.colorImageback.source = RES.getRes("color_value_" + val + "_png");
        };
        /**
        *翻牌的一个动画
        * @param  {eui.Component} penggang
        * @param  {} x
        * @param  {} y
        */
        GYZJFanPai.prototype.fanPaiDB = function (fancard, chickeCard) {
            var _this = this;
            this.cardBack.visible = true;
            this.setBackCardVal(fancard);
            egret.setTimeout(function () {
                _this.cardBack.visible = false;
                var db = new DBComponent("mj_turn");
                db.callback = function () {
                    // if (afterfinish) afterfinish.call(thisobj);
                    game.UIUtils.removeSelf(db);
                    db = null;
                    _this.cardBack.visible = true;
                    _this.setBackCardVal(chickeCard);
                };
                _this.fanPaiGroup.addChild(db);
                db.playByFilename(1);
            }, this, 500);
        };
        return GYZJFanPai;
    }(eui.Component));
    majiang.GYZJFanPai = GYZJFanPai;
    __reflect(GYZJFanPai.prototype, "majiang.GYZJFanPai");
})(majiang || (majiang = {}));
