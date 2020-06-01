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
    var XLCHOverMediator = (function (_super) {
        __extends(XLCHOverMediator, _super);
        function XLCHOverMediator() {
            var _this = _super.call(this, XLCHOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XLCHOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXLCH_OVER,
                SceneNotify.CLOSE_MJXLCH_OVER
            ];
        };
        XLCHOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XLCHOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.XLCHOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XLCHOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXLCH_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_MJXLCH_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XLCHOverMediator.NAME = "XLCHOverMediator";
        return XLCHOverMediator;
    }(BaseMediator));
    majiang.XLCHOverMediator = XLCHOverMediator;
    __reflect(XLCHOverMediator.prototype, "majiang.XLCHOverMediator");
})(majiang || (majiang = {}));
