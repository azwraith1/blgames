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
var bjle;
(function (bjle) {
    var BJLPokerMiPaiGroup = (function (_super) {
        __extends(BJLPokerMiPaiGroup, _super);
        // public miPaiPlayer: eui.Label;
        function BJLPokerMiPaiGroup() {
            var _this = _super.call(this) || this;
            _this.skinName = "BJLCardSkinMiPaiGroupSkin";
            return _this;
        }
        BJLPokerMiPaiGroup.prototype.onRemoved = function () {
            for (var i = 0; i < 3; ++i) {
                this["poker" + i].removeLisen();
            }
        };
        BJLPokerMiPaiGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.poker0.id = 0;
            this.poker1.id = 1;
            this.poker2.id = 2;
        };
        /**设置poker得值*/
        BJLPokerMiPaiGroup.prototype.setPokerValue = function (nums, isZhuang) {
            if (isZhuang === void 0) { isZhuang = MIPAI_DIRECTION.ZHUANG_MI; }
            this.poker0.visible = true;
            this.poker1.visible = true;
            this.poker0.reseatPos();
            this.poker1.reseatPos();
            this.setMiPaiDirec(isZhuang);
            this.poker2.visible = false;
            for (var i = 0; i < nums.length; i++) {
                this["poker" + i].initWithNum(nums[i]);
                this["poker" + i].isZhuang = isZhuang;
            }
        };
        //    public resetPos(){
        // 	   this.poker0.reseatPos();
        // 	   this.poker1.reseatPos();
        // 	   this.poker2.reseatPos();
        //    }
        /**
         * 庄或闲咪牌
         */
        BJLPokerMiPaiGroup.prototype.setMiPaiDirec = function (isZhuang) {
            var res = "bjl_qzmp_png";
            if (isZhuang == MIPAI_DIRECTION.XIAN_MI)
                res = "bjl_qxmp_png";
            this.miPaiPlayer.source = res;
        };
        /**补牌 */
        BJLPokerMiPaiGroup.prototype.setAddCard = function (num, isZhuang) {
            if (isZhuang === void 0) { isZhuang = MIPAI_DIRECTION.ZHUANG_MI; }
            this.poker0.visible = false;
            this.poker1.visible = false;
            this.poker2.visible = true;
            this.poker2.reseatPos();
            this.poker2.initWithNum(num);
            this.poker2.isZhuang = isZhuang;
        };
        return BJLPokerMiPaiGroup;
    }(eui.Component));
    bjle.BJLPokerMiPaiGroup = BJLPokerMiPaiGroup;
    __reflect(BJLPokerMiPaiGroup.prototype, "bjle.BJLPokerMiPaiGroup");
})(bjle || (bjle = {}));
var MIPAI_DIRECTION = {
    EMPTY: 0,
    ZHUANG_MI: 1,
    XIAN_MI: 2,
};
