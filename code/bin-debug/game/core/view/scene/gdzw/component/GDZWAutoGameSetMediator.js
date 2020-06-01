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
var gdzw;
(function (gdzw) {
    var GDZWAutoGameSetMediator = (function (_super) {
        __extends(GDZWAutoGameSetMediator, _super);
        function GDZWAutoGameSetMediator() {
            return _super.call(this, GDZWAutoGameSetMediator.NAME) || this;
        }
        GDZWAutoGameSetMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_GDZW_AUTO_PANEL,
                PanelNotify.CLOSE_GDZW_AUTO_PANEL
            ];
        };
        GDZWAutoGameSetMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        GDZWAutoGameSetMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new gdzw.GDZWAutoGameSet();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GDZWAutoGameSetMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_GDZW_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_GDZW_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GDZWAutoGameSetMediator.NAME = "GDZWAutoGameSetMediator";
        GDZWAutoGameSetMediator.type = "panel";
        return GDZWAutoGameSetMediator;
    }(BaseMediator));
    gdzw.GDZWAutoGameSetMediator = GDZWAutoGameSetMediator;
    __reflect(GDZWAutoGameSetMediator.prototype, "gdzw.GDZWAutoGameSetMediator");
})(gdzw || (gdzw = {}));
