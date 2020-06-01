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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaRecordMediator = (function (_super) {
        __extends(ZajinhuaRecordMediator, _super);
        function ZajinhuaRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ZajinhuaRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        ZajinhuaRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_ZJHRECORD,
                PanelNotify.CLOSE_ZJHRECORD
            ];
        };
        ZajinhuaRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ZajinhuaRecordMediator.prototype.showViewComponent = function () {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new zajinhua.ZajinhuaRecordPanl();
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        ZajinhuaRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJHRECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_ZJHRECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ZajinhuaRecordMediator.NAME = "ZajinhuaRecordMediator";
        return ZajinhuaRecordMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaRecordMediator = ZajinhuaRecordMediator;
    __reflect(ZajinhuaRecordMediator.prototype, "zajinhua.ZajinhuaRecordMediator");
})(zajinhua || (zajinhua = {}));
