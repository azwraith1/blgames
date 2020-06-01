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
var wszw;
(function (wszw) {
    var WSZWAutogameMediator = (function (_super) {
        __extends(WSZWAutogameMediator, _super);
        function WSZWAutogameMediator() {
            var _this = _super.call(this, WSZWAutogameMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        WSZWAutogameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_WSZW_AUTO_PANEL,
                PanelNotify.CLOSE_WSZW_AUTO_PANEL
            ];
        };
        WSZWAutogameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());\
        };
        WSZWAutogameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new wszw.WSZWAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        WSZWAutogameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_WSZW_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_WSZW_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        WSZWAutogameMediator.NAME = "WSZWAutogameMediator";
        return WSZWAutogameMediator;
    }(BaseMediator));
    wszw.WSZWAutogameMediator = WSZWAutogameMediator;
    __reflect(WSZWAutogameMediator.prototype, "wszw.WSZWAutogameMediator");
})(wszw || (wszw = {}));
