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
    var MajiangMinPaiMediator = (function (_super) {
        __extends(MajiangMinPaiMediator, _super);
        function MajiangMinPaiMediator() {
            var _this = _super.call(this, MajiangMinPaiMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        MajiangMinPaiMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_CESI,
                SceneNotify.CLOSE_CESI
            ];
        };
        MajiangMinPaiMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new HelpMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new majiang.GameRecordMediator());
        };
        /**
         * 固有写法
         */
        MajiangMinPaiMediator.prototype.showViewComponent = function (body) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.MajiangMinPaiScene(body);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        MajiangMinPaiMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_CESI:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_CESI:
                    this.closeViewComponent(1);
                    break;
            }
        };
        MajiangMinPaiMediator.NAME = "MajiangMinPaiMediator";
        return MajiangMinPaiMediator;
    }(BaseMediator));
    majiang.MajiangMinPaiMediator = MajiangMinPaiMediator;
    __reflect(MajiangMinPaiMediator.prototype, "majiang.MajiangMinPaiMediator");
})(majiang || (majiang = {}));
