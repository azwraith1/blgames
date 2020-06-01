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
var ceby;
(function (ceby) {
    var CEBYMainMediator = (function (_super) {
        __extends(CEBYMainMediator, _super);
        function CEBYMainMediator() {
            var _this = _super.call(this, CEBYMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        CEBYMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_CEBY,
                SceneNotify.CLOSE_CEBY
            ];
        };
        CEBYMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new ceby.CEBYTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new ceby.CEBYAutoGameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        CEBYMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new ceby.CEBYMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CEBYMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_CEBY:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_CEBY:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CEBYMainMediator.NAME = "CEBYMainMediator";
        return CEBYMainMediator;
    }(BaseMediator));
    ceby.CEBYMainMediator = CEBYMainMediator;
    __reflect(CEBYMainMediator.prototype, "ceby.CEBYMainMediator");
})(ceby || (ceby = {}));
