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
// TypeScript file
var slot;
(function (slot) {
    var SlotAutoTips = (function (_super) {
        __extends(SlotAutoTips, _super);
        function SlotAutoTips() {
            var _this = _super.call(this) || this;
            _this.skinName = "SlotAuotTipsPanel";
            return _this;
        }
        Object.defineProperty(SlotAutoTips, "instance", {
            get: function () {
                if (!SlotAutoTips._instance) {
                    SlotAutoTips._instance = new SlotAutoTips();
                }
                return SlotAutoTips._instance;
            },
            enumerable: true,
            configurable: true
        });
        return SlotAutoTips;
    }(game.BaseComponent));
    slot.SlotAutoTips = SlotAutoTips;
    __reflect(SlotAutoTips.prototype, "slot.SlotAutoTips");
})(slot || (slot = {}));
