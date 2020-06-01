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
    var GameRecordMediator = (function (_super) {
        __extends(GameRecordMediator, _super);
        function GameRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, GameRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        GameRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_GAMERECORD,
                PanelNotify.CLOSE_GAMERECORD
            ];
        };
        GameRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GameRecordMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GameRecordPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        GameRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_GAMERECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_GAMERECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GameRecordMediator.NAME = "GameRecordMediator";
        return GameRecordMediator;
    }(BaseMediator));
    majiang.GameRecordMediator = GameRecordMediator;
    __reflect(GameRecordMediator.prototype, "majiang.GameRecordMediator");
})(majiang || (majiang = {}));
