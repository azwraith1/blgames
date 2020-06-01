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
var MainHallMediator = (function (_super) {
    __extends(MainHallMediator, _super);
    function MainHallMediator() {
        var _this = _super.call(this, MainHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    MainHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_MAIN_HALL,
            SceneNotify.CLOSE_MAIN_HALL
        ];
    };
    MainHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new majiang.DZMJHallMediator());
        this.facade.registerMediator(new niuniu.NiuniuHallMediator());
        this.facade.registerMediator(new niuniu.NiuniuHallMediator_Landscape());
        this.facade.registerMediator(new sangong.SangongHallMediator());
        //	this.facade.registerMediator(new sangong.SangongHallMediatorHorizon());
        this.facade.registerMediator(new rbwar.RBWarHallMediator());
        this.facade.registerMediator(new HelpShuMediator());
        this.facade.registerMediator(new HelpMediator());
        this.facade.registerMediator(new SettingMediator());
        this.facade.registerMediator(new game.LaohujiHallMediator());
        this.facade.registerMediator(new game.CloseLaohuMediator());
        this.facade.registerMediator(new rbwar.RBWarHallMediator());
        this.facade.registerMediator(new zajinhua.ZajinhuaHallSceneMediator());
        this.facade.registerMediator(new bjle.BJLGameSceneMediator());
        this.facade.registerMediator(new bjle.BJLHallSceneMediator());
        this.facade.registerMediator(new BlackJackHallMediator());
        this.facade.registerMediator(new BaseRecordMediator());
        this.facade.registerMediator(new GDMJHallMediator());
        this.facade.registerMediator(new HNMJHallMediator());
        this.facade.registerMediator(new majiang.XLCHHallMediator());
        this.facade.registerMediator(new majiang.HZMJHallMedior());
        this.facade.registerMediator(new majiang.XZDDHallMediator());
        this.facade.registerMediator(new majiang.SCMJHallMediator());
        this.facade.registerMediator(new HBMJHallMediator());
        this.facade.registerMediator(new majiang.GYZJHallMediator());
        this.facade.registerMediator(new majiang.ERMJHallMediator());
        this.facade.registerMediator(new BDZHallSceneMediator());
        this.facade.registerMediator(new MatchHallMediator());
        this.facade.registerMediator(new ClubHallMediator());
        this.facade.registerMediator(new BaiCaoHallMediator());
        this.facade.registerMediator(new SuperBaiCaoHallMediator());
    };
    /**
     * 固有写法
     */
    MainHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new MainHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    MainHallMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_MAIN_HALL:
                RotationLoading.instance.load(["main"], "", function () {
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_MAIN_HALL:
                this.closeViewComponent(1);
                break;
        }
    };
    MainHallMediator.NAME = "MainHallMediator";
    return MainHallMediator;
}(BaseMediator));
__reflect(MainHallMediator.prototype, "MainHallMediator");
