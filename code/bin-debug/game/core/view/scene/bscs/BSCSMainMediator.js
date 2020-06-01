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
// TypeScript file
var bscs;
(function (bscs) {
    var BSCSMainMediator = (function (_super) {
        __extends(BSCSMainMediator, _super);
        function BSCSMainMediator() {
            var _this = _super.call(this, BSCSMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        BSCSMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_BSCS,
                SceneNotify.CLOSE_BSCS
            ];
        };
        BSCSMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new bscs.BSCSTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new bscs.BSCSAutoMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        BSCSMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bscs.BSCSMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BSCSMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_BSCS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_BSCS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BSCSMainMediator.NAME = "BSCSMainMediator";
        return BSCSMainMediator;
    }(BaseMediator));
    bscs.BSCSMainMediator = BSCSMainMediator;
    __reflect(BSCSMainMediator.prototype, "bscs.BSCSMainMediator");
})(bscs || (bscs = {}));
