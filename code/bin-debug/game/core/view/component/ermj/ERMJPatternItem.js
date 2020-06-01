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
var ERMJPatternItem = (function (_super) {
    __extends(ERMJPatternItem, _super);
    function ERMJPatternItem(pattern, score) {
        var _this = _super.call(this) || this;
        _this.pattern = pattern;
        _this.score = score;
        _this.skinName = new ERMJPattarnItemSkin();
        return _this;
    }
    ERMJPatternItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var text = ERMJPattern[this.pattern];
        this.patternLabel.text = text;
        if (this.pattern == 110) {
            this.fanLabel.text = this.score + "次";
        }
        else {
            this.fanLabel.text = this.score + "番";
        }
    };
    return ERMJPatternItem;
}(eui.Component));
__reflect(ERMJPatternItem.prototype, "ERMJPatternItem");
