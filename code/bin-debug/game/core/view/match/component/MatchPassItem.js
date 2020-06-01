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
 * @Author: MC Lee
 * @Date: 2019-11-28 17:46:34
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 17:32:39
 * @Description: 晋级人数条
 */
var MatchPassItem = (function (_super) {
    __extends(MatchPassItem, _super);
    function MatchPassItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchPassItemSkin();
        return _this;
    }
    MatchPassItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchPassItem.prototype.showData = function (type, number) {
        this.typeImage2.source = RES.getRes("match_pass_type" + type + "_png");
        this.typeImage1.source = RES.getRes("match_pass_bar" + type + "_png");
        this.countLabel.font = "match_pass_num" + type + "_fnt";
        this.countLabel.text = number;
        egret.Tween.removeTweens(this.typeImage1);
        if (type == 2) {
            egret.Tween.get(this.typeImage1, { loop: true }).to({
                alpha: 0.5
            }, 1000).to({
                alpha: 1
            }, 1000);
        }
    };
    return MatchPassItem;
}(eui.Component));
__reflect(MatchPassItem.prototype, "MatchPassItem");
