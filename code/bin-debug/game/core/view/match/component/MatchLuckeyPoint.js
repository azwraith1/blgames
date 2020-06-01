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
var MatchLuckeyPoint = (function (_super) {
    __extends(MatchLuckeyPoint, _super);
    function MatchLuckeyPoint(number) {
        var _this = _super.call(this) || this;
        _this.number = number;
        _this.skinName = new MatchLuckeyPointSkin();
        return _this;
    }
    MatchLuckeyPoint.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.winLabel.text = this.revertNumber(this.number);
    };
    MatchLuckeyPoint.prototype.show = function () {
        this.visible = true;
        var db = new DBComponent("jjc_bjjj");
        this.dbGroup.addChild(db);
        db.playNamesAndLoop(['jjc_bjjj', 'jjc_bjjj_loop']);
    };
    MatchLuckeyPoint.prototype.revertNumber = function (number) {
        if (number <= 99999) {
            return number + "";
        }
        else {
            return Math.floor(number / 10000) + "w";
        }
    };
    return MatchLuckeyPoint;
}(eui.Component));
__reflect(MatchLuckeyPoint.prototype, "MatchLuckeyPoint");
