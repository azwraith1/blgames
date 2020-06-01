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
    var SangongGameSceneHorizon = (function (_super) {
        __extends(SangongGameSceneHorizon, _super);
        function SangongGameSceneHorizon() {
            var _this = _super.call(this) || this;
            /**
         * 关闭当前界面通知
         */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SANGONG_GAME_HORIZON;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_WATING_HORIZON;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_GAME_HORIZON;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_SANGONG_HALL_HORIZON;
            /**
         * HELP界面
         */
            _this.HELP_PANEL_NOTIFY = PanelNotify.OPEN_HELP_SHU_HORIZON;
            /**
         * 记录界面
         */
            _this.RECORD_PANEL_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD_HORIZON;
            _this.skinName = "SangongGameSceneSkinHorizon";
            GameConfig.CURRENT_ISSHU = false;
            return _this;
        }
        /**
             * 展示点数
             */
        SangongGameSceneHorizon.prototype.showNiu = function (pt, direction) {
            var dir = this.directions[direction];
            var niuFen = new sangong.SangongFen(pt);
            var pl = this["player" + dir];
            pl.addChild(niuFen);
            switch (dir) {
                case "1":
                    niuFen.x = 350;
                    niuFen.y = 150;
                    break;
                case "2":
                    niuFen.x = -163;
                    niuFen.y = 150;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "3":
                    //niuFen.x = -170;
                    niuFen.x = -163;
                    niuFen.y = 180;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "4":
                    niuFen.x = 138;
                    niuFen.y = 180;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
                case "5":
                    niuFen.x = 138;
                    niuFen.y = 150;
                    niuFen.scaleX = niuFen.scaleY = 0.8;
                    break;
            }
        };
        return SangongGameSceneHorizon;
    }(sangong.SangongGameScene));
    sangong.SangongGameSceneHorizon = SangongGameSceneHorizon;
    __reflect(SangongGameSceneHorizon.prototype, "sangong.SangongGameSceneHorizon");
})(sangong || (sangong = {}));
