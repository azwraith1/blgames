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
var game;
(function (game) {
    var AlertMediator = (function (_super) {
        __extends(AlertMediator, _super);
        function AlertMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, AlertMediator.NAME, viewComponent) || this;
            _this.alertInterval = null; //定时器
            _this.alertWaiting = null; //等待列表是个数组
            _this.runningAlert = null; //正在提示的框
            _this.type = "panel";
            return _this;
        }
        AlertMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_ALERT,
                PanelNotify.CLOSE_ALERT
            ];
        };
        AlertMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.startInterVal();
            // this.alertWaiting = [];
            Global.alertMediator = this;
        };
        AlertMediator.prototype.showViewComponent = function (type) {
            if (type === void 0) { type = 7; }
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new game.AlertPanel(this.runningAlert);
            GameLayerManager.gameLayer().maskLayer.addChild(this.viewComponent);
            // this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        AlertMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_ALERT: {
                    if (!this.alertWaiting) {
                        this.alertWaiting = [];
                    }
                    var alertData = notification.getBody();
                    this.alertWaiting[0] = alertData;
                    this.checkHasAlert();
                    break;
                }
                case PanelNotify.CLOSE_ALERT:
                    this.runningAlert = null;
                    this.closeViewComponent(0);
                    break;
            }
        };
        AlertMediator.prototype.addAlert = function (content, okCallback, noCallback, onlyOkBtn) {
            if (okCallback === void 0) { okCallback = null; }
            if (noCallback === void 0) { noCallback = null; }
            if (onlyOkBtn === void 0) { onlyOkBtn = false; }
            if (!content) {
                return;
            }
            this.sendNotification(PanelNotify.OPEN_ALERT, {
                tips: content,
                okCallback: okCallback,
                noCallback: noCallback,
                onlyOkBtn: onlyOkBtn
            });
        };
        AlertMediator.prototype.addColorAller = function (content, color, okCallback, noCallback, onlyOkBtn) {
            if (color === void 0) { color = false; }
            if (okCallback === void 0) { okCallback = null; }
            if (noCallback === void 0) { noCallback = null; }
            if (onlyOkBtn === void 0) { onlyOkBtn = false; }
            if (!content) {
                return;
            }
            this.sendNotification(PanelNotify.OPEN_ALERT, {
                tips: content,
                haveColor: color,
                okCallback: okCallback,
                noCallback: noCallback,
                onlyOkBtn: onlyOkBtn
            });
        };
        AlertMediator.prototype.checkHasAlert = function () {
            this.runningAlert = this.alertWaiting.shift();
            this.showViewComponent();
        };
        /**
         * 初始化面板ui
         */
        AlertMediator.prototype.initUI = function () {
        };
        /**
         * 初始化面板数据
         */
        AlertMediator.prototype.initData = function () {
        };
        AlertMediator.NAME = "AlertMediator";
        return AlertMediator;
    }(BaseMediator));
    game.AlertMediator = AlertMediator;
    __reflect(AlertMediator.prototype, "game.AlertMediator");
})(game || (game = {}));
