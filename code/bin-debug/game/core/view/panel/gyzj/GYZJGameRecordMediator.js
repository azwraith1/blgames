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
var majiang;
(function (majiang) {
    var GYZJGameRecordMediator = (function (_super) {
        __extends(GYZJGameRecordMediator, _super);
        function GYZJGameRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, GYZJGameRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        GYZJGameRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_DZMJRECORD,
                PanelNotify.CLOSE_DZMJRECORD
            ];
        };
        GYZJGameRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GYZJGameRecordMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GYZJGameRecordPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        GYZJGameRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_GYZJRECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_GYZJRECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GYZJGameRecordMediator.NAME = "GYZJGameRecordMediator";
        return GYZJGameRecordMediator;
    }(BaseMediator));
    majiang.GYZJGameRecordMediator = GYZJGameRecordMediator;
    __reflect(GYZJGameRecordMediator.prototype, "majiang.GYZJGameRecordMediator");
})(majiang || (majiang = {}));
