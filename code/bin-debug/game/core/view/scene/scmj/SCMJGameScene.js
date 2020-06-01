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
    var SCMJGameScene = (function (_super) {
        __extends(SCMJGameScene, _super);
        function SCMJGameScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pmdKey = "mjxlch";
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SCMJ;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_SCMJ_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SCMJ;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_SCMJ_MATCHING;
            /**
             * 结算界面
             */
            _this.GAME_OVER_NOTIFY = SceneNotify.OPEN_SCMJ_OVER;
            return _this;
        }
        SCMJGameScene.prototype.showWanfa = function () {
            if (Global.gameProxy.diWen == "mjxlch") {
                this.wanfaImage.source = RES.getRes("xlch_hsz_png");
                this.pmdKey = "mjxlch";
            }
            else {
                this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
                this.pmdKey = "mjxzdd";
            }
        };
        return SCMJGameScene;
    }(majiang.XLCHGameScene));
    majiang.SCMJGameScene = SCMJGameScene;
    __reflect(SCMJGameScene.prototype, "majiang.SCMJGameScene");
})(majiang || (majiang = {}));
