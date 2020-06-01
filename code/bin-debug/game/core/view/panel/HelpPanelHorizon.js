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
var HelpPanelHorizon = (function (_super) {
    __extends(HelpPanelHorizon, _super);
    function HelpPanelHorizon(type) {
        var _this = _super.call(this, type) || this;
        _this.HELP_PANEL_NOTIFY = PanelNotify.CLOSE_HELP_SHU_HORIZON;
        _this.skinName = "NiuniuHelpSkinHorizon";
        return _this;
    }
    return HelpPanelHorizon;
}(HelpShuPanel));
__reflect(HelpPanelHorizon.prototype, "HelpPanelHorizon");
