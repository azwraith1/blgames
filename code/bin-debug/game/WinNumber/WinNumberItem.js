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
var WinNumberItem = (function (_super) {
    __extends(WinNumberItem, _super);
    function WinNumberItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "WinNumberItemSkin";
        return _this;
    }
    WinNumberItem.prototype.setWinTxt = function (txt) {
        this.winTxt.text = txt;
    };
    Object.defineProperty(WinNumberItem.prototype, "winVal", {
        get: function () {
            return this.winTxt.text;
        },
        enumerable: true,
        configurable: true
    });
    return WinNumberItem;
}(game.BaseUI));
__reflect(WinNumberItem.prototype, "WinNumberItem");
