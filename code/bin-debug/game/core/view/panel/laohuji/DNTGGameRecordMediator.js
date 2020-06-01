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
var dntg;
(function (dntg) {
    var DNTGGameRecordMediator = (function (_super) {
        __extends(DNTGGameRecordMediator, _super);
        function DNTGGameRecordMediator() {
            var _this = _super.call(this, DNTGGameRecordMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        DNTGGameRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_DNTG_RECORD_PANEL,
                PanelNotify.CLOSE_DNTG_RECORD_PANEL
            ];
        };
        DNTGGameRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DNTGGameRecordMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new dntg.DNTGGameRecordPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DNTGGameRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_DNTG_RECORD_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_DNTG_RECORD_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DNTGGameRecordMediator.NAME = "DNTGGameRecordMediator";
        return DNTGGameRecordMediator;
    }(BaseMediator));
    dntg.DNTGGameRecordMediator = DNTGGameRecordMediator;
    __reflect(DNTGGameRecordMediator.prototype, "dntg.DNTGGameRecordMediator");
})(dntg || (dntg = {}));
