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
var niuniu;
(function (niuniu) {
    var NiuniuRecordPanlHorizon = (function (_super) {
        __extends(NiuniuRecordPanlHorizon, _super);
        function NiuniuRecordPanlHorizon(gameId) {
            var _this = _super.call(this, gameId) || this;
            _this.skinName = "NiuniusRecordSkinLandScape";
            return _this;
        }
        NiuniuRecordPanlHorizon.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            if (e.target == this.closeBtn || e.target == this.rects) {
                this.rects.visible = false;
                CF.sN(PanelNotify.CLOSE_NIUGAMERECORD_HORIZON);
            }
        };
        return NiuniuRecordPanlHorizon;
    }(niuniu.NiuniuRecordPanl));
    niuniu.NiuniuRecordPanlHorizon = NiuniuRecordPanlHorizon;
    __reflect(NiuniuRecordPanlHorizon.prototype, "niuniu.NiuniuRecordPanlHorizon");
})(niuniu || (niuniu = {}));
