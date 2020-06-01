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
/**
 * 弹出提示
 */
var rbwar;
(function (rbwar) {
    var RbwPlayerListMediator = (function (_super) {
        __extends(RbwPlayerListMediator, _super);
        function RbwPlayerListMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, RbwPlayerListMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        RbwPlayerListMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RBWARPL,
                PanelNotify.CLOSE_RBWARPL
            ];
        };
        RbwPlayerListMediator.prototype.showViewComponent = function (type) {
            if (type === void 0) { type = 7; }
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new rbwar.RbwPlayerList();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        RbwPlayerListMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_RBWARPL: {
                    this.showViewComponent();
                    break;
                }
                case PanelNotify.CLOSE_RBWARPL:
                    this.closeViewComponent(0);
                    break;
            }
        };
        /**
         * 初始化面板ui
         */
        RbwPlayerListMediator.prototype.initUI = function () {
        };
        /**
         * 初始化面板数据
         */
        RbwPlayerListMediator.prototype.initData = function () {
        };
        RbwPlayerListMediator.NAME = "RbwPlayerListMediator";
        return RbwPlayerListMediator;
    }(BaseMediator));
    rbwar.RbwPlayerListMediator = RbwPlayerListMediator;
    __reflect(RbwPlayerListMediator.prototype, "rbwar.RbwPlayerListMediator");
})(rbwar || (rbwar = {}));
