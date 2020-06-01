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
var niuniu;
(function (niuniu) {
    var NiuniuJSMatchingScene = (function (_super) {
        __extends(NiuniuJSMatchingScene, _super);
        function NiuniuJSMatchingScene() {
            var _this = _super.call(this) || this;
            /**
        /**
         * 关闭匹配通知
         */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIU_JSMATCHING;
            /**
     * 进入游戏通知
     */
            _this.GAME_SCENE_NOTIFY = SceneNotify.OPEN_NIUNIUJSGAMES;
            return _this;
        }
        return NiuniuJSMatchingScene;
    }(niuniu.NiuniuMatchingScene));
    niuniu.NiuniuJSMatchingScene = NiuniuJSMatchingScene;
    __reflect(NiuniuJSMatchingScene.prototype, "niuniu.NiuniuJSMatchingScene");
})(niuniu || (niuniu = {}));
