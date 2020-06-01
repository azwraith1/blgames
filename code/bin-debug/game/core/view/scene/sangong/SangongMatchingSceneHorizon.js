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
var sangong;
(function (sangong) {
    var SangongMatchingSceneHorizon = (function (_super) {
        __extends(SangongMatchingSceneHorizon, _super);
        function SangongMatchingSceneHorizon() {
            var _this = _super.call(this) || this;
            /**
         * 关闭匹配通知
         */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SANGONG_WATING_HORIZON;
            /**
             * 打开游戏大厅
             */
            _this.GAME_HALL_NOTIFY = SceneNotify.OPEN_SANGONG_HALL_HORIZON;
            /**
             * 进入游戏通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_GAME_HORIZON;
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU_HORIZON;
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = PanelNotify.OPEN_SETTING;
            _this.skinName = "resource/skins/scene/sangong/SangongWaitSkinHorizon.exml";
            return _this;
        }
        return SangongMatchingSceneHorizon;
    }(sangong.SangongMatchingScene));
    sangong.SangongMatchingSceneHorizon = SangongMatchingSceneHorizon;
    __reflect(SangongMatchingSceneHorizon.prototype, "sangong.SangongMatchingSceneHorizon");
})(sangong || (sangong = {}));
