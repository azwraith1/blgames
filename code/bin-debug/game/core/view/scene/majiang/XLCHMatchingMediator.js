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
    var XLCHMatchingMediator = (function (_super) {
        __extends(XLCHMatchingMediator, _super);
        function XLCHMatchingMediator() {
            var _this = _super.call(this, XLCHMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XLCHMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXLCH_MATCHING,
                SceneNotify.CLOSE_MJXLCH_MATCHING
            ];
        };
        XLCHMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XLCHMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.XLCHMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XLCHMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXLCH_MATCHING:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("majiang_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_MJXLCH_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XLCHMatchingMediator.NAME = "XLCHMatchingMediator";
        return XLCHMatchingMediator;
    }(BaseMediator));
    majiang.XLCHMatchingMediator = XLCHMatchingMediator;
    __reflect(XLCHMatchingMediator.prototype, "majiang.XLCHMatchingMediator");
})(majiang || (majiang = {}));
