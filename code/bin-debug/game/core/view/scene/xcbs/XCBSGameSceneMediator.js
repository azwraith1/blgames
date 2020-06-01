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
var xcbs;
(function (xcbs) {
    var XCBSMainMediator = (function (_super) {
        __extends(XCBSMainMediator, _super);
        function XCBSMainMediator() {
            var _this = _super.call(this, XCBSMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XCBSMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_XCBS,
                SceneNotify.CLOSE_XCBS
            ];
        };
        XCBSMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new xcbs.XCBSTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new xcbs.XCBSAutoGameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        XCBSMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new xcbs.XCBSGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XCBSMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_XCBS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_XCBS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XCBSMainMediator.NAME = "XCBSMainMediator";
        return XCBSMainMediator;
    }(BaseMediator));
    xcbs.XCBSMainMediator = XCBSMainMediator;
    __reflect(XCBSMainMediator.prototype, "xcbs.XCBSMainMediator");
})(xcbs || (xcbs = {}));
