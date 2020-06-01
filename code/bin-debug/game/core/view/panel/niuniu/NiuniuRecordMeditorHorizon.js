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
    var NiuniuRecordMeditorHorizon = (function (_super) {
        __extends(NiuniuRecordMeditorHorizon, _super);
        function NiuniuRecordMeditorHorizon(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, NiuniuRecordMeditorHorizon.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        NiuniuRecordMeditorHorizon.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_NIUGAMERECORD_HORIZON,
                PanelNotify.CLOSE_NIUGAMERECORD_HORIZON
            ];
        };
        NiuniuRecordMeditorHorizon.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        NiuniuRecordMeditorHorizon.prototype.showViewComponent = function (num) {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new niuniu.NiuniuRecordPanlHorizon(num);
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        NiuniuRecordMeditorHorizon.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_NIUGAMERECORD_HORIZON:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_NIUGAMERECORD_HORIZON:
                    this.closeViewComponent(1);
                    break;
            }
        };
        NiuniuRecordMeditorHorizon.NAME = "NiuniuRecordMeditorHorizon";
        return NiuniuRecordMeditorHorizon;
    }(BaseMediator));
    niuniu.NiuniuRecordMeditorHorizon = NiuniuRecordMeditorHorizon;
    __reflect(NiuniuRecordMeditorHorizon.prototype, "niuniu.NiuniuRecordMeditorHorizon");
})(niuniu || (niuniu = {}));
