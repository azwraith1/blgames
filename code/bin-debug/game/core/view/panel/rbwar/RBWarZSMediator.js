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
    var RBWarZSMediator = (function (_super) {
        __extends(RBWarZSMediator, _super);
        function RBWarZSMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, RBWarZSMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        RBWarZSMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RBWARZS,
                PanelNotify.CLOSE_RBWARZS
            ];
        };
        RBWarZSMediator.prototype.showViewComponent = function (type) {
            if (type === void 0) { type = 7; }
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new rbwar.RBWarZSPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        RBWarZSMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_RBWARZS: {
                    this.showViewComponent();
                    break;
                }
                case PanelNotify.CLOSE_RBWARZS:
                    this.closeViewComponent(0);
                    break;
            }
        };
        /**
         * 初始化面板ui
         */
        RBWarZSMediator.prototype.initUI = function () {
        };
        /**
         * 初始化面板数据
         */
        RBWarZSMediator.prototype.initData = function () {
        };
        RBWarZSMediator.NAME = "RBWarZSMediator";
        return RBWarZSMediator;
    }(BaseMediator));
    rbwar.RBWarZSMediator = RBWarZSMediator;
    __reflect(RBWarZSMediator.prototype, "rbwar.RBWarZSMediator");
})(rbwar || (rbwar = {}));
