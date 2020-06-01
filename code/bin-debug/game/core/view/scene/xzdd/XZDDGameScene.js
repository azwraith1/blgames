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
    var XZDDGameScene = (function (_super) {
        __extends(XZDDGameScene, _super);
        function XZDDGameScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pmdKey = "mjxzdd";
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_MJXZDD;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD_MATCHING;
            /**
             * 结算界面
             */
            _this.GAME_OVER_NOTIFY = SceneNotify.OPEN_MJXZDD_OVER;
            return _this;
        }
        XZDDGameScene.prototype.showWanfa = function () {
            if (this.isLuckeyGame) {
                this.wanfaImage.source = RES.getRes("match_mj_xyjjs_png");
                this.dizhu.text = "报名费:" + Global.gameProxy.roomInfo.entryFeeGold;
                this.dizhu.verticalCenter = 118;
            }
            else {
                this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
                this.dizhu.text = "底注:" + Global.gameProxy.roomInfo.betBase;
            }
        };
        XZDDGameScene.prototype.helpBtnTouch = function () {
            BaseMajiangHelpScene.getInstance("MajiangHelpSkin", "mj_help", "xzdd").show();
        };
        return XZDDGameScene;
    }(majiang.XLCHGameScene));
    majiang.XZDDGameScene = XZDDGameScene;
    __reflect(XZDDGameScene.prototype, "majiang.XZDDGameScene");
})(majiang || (majiang = {}));
