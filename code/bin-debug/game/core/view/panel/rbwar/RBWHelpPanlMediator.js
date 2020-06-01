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
var rbwar;
(function (rbwar) {
    var RBWHelpPanlMediator = (function (_super) {
        __extends(RBWHelpPanlMediator, _super);
        function RBWHelpPanlMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, RBWHelpPanlMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        RBWHelpPanlMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RBWARHELP,
                PanelNotify.CLOSE_RBWARHELP
            ];
        };
        RBWHelpPanlMediator.prototype.showViewComponent = function (type) {
            if (type === void 0) { type = 7; }
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new rbwar.RBWHelpPanl();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        RBWHelpPanlMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_RBWARHELP: {
                    this.showViewComponent();
                    break;
                }
                case PanelNotify.CLOSE_RBWARHELP:
                    this.closeViewComponent(0);
                    break;
            }
        };
        /**
         * 初始化面板ui
         */
        RBWHelpPanlMediator.prototype.initUI = function () {
        };
        /**
         * 初始化面板数据
         */
        RBWHelpPanlMediator.prototype.initData = function () {
        };
        RBWHelpPanlMediator.NAME = "RBWHelpPanlMediator";
        return RBWHelpPanlMediator;
    }(BaseMediator));
    rbwar.RBWHelpPanlMediator = RBWHelpPanlMediator;
    __reflect(RBWHelpPanlMediator.prototype, "rbwar.RBWHelpPanlMediator");
})(rbwar || (rbwar = {}));
