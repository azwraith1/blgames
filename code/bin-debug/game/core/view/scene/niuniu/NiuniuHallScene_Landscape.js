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
    var NiuniuHallScene_Landscape = (function (_super) {
        __extends(NiuniuHallScene_Landscape, _super);
        function NiuniuHallScene_Landscape() {
            var _this = _super.call(this) || this;
            /**
     * 关闭当前界面的通知
     */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE;
            /**
         * 记录界面的通知
         */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_NIUGAMERECORD_HORIZON;
            _this.skinName = "resource/skins/scene/niuniu/NiuniuHallSceneSkin_LandScape.exml";
            return _this;
        }
        /**
     * 渲染hallScene
     */
        NiuniuHallScene_Landscape.prototype.showHallBars = function () {
            this.centerGroup.alpha = 0;
            var nums = Global.gameProxy.gameNums["blnn"];
            var index = 1;
            var item;
            var fonts = [0, 0x083831, 0x0b1e3c, 0x472507, 0x762d09, 0x5a0937, 0x440707];
            for (var i in nums) {
                var barConfig = nums[i];
                var bar = this['bar' + index];
                bar.showBarByConfig(barConfig, index, fonts[index]);
                //game.UIUtils.removeSelf(this['yy' + index]);
                bar.visible = barConfig.enable;
                if (index == 6) {
                    bar.y += 12;
                }
                index++;
            }
            egret.Tween.get(this.centerGroup).to({
                alpha: 1
            }, 800);
        };
        return NiuniuHallScene_Landscape;
    }(niuniu.NiuniuHallScene));
    niuniu.NiuniuHallScene_Landscape = NiuniuHallScene_Landscape;
    __reflect(NiuniuHallScene_Landscape.prototype, "niuniu.NiuniuHallScene_Landscape");
})(niuniu || (niuniu = {}));
