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
var xyxm;
(function (xyxm) {
    var XYXMBaseIcon = (function (_super) {
        __extends(XYXMBaseIcon, _super);
        function XYXMBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "xyxm";
            _this.dbName = "xyxm_icon2_guang";
            _this.scatterLightX = 100.5;
            _this.scatterLightY = 84;
            _this.scatterLightY2 = 84;
            return _this;
        }
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        XYXMBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.dbKaung = new DBComponent("xyxm_icon_2_kuang");
            this.dbKaung.x = this.scatterLightX;
            this.dbKaung.y = this.scatterLightY;
            this.dbKaung.play("", 1);
            this.scatterGuang = new DBComponent(str);
            if (str == this.dbName) {
                this.icon.visible = false;
                this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            }
            this.scatterGuang.x = this.scatterLightX;
            this.scatterGuang.y = this.scatterLightY2;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
            this.addChild(this.dbKaung);
        };
        return XYXMBaseIcon;
    }(game.BaseSlotIcon));
    xyxm.XYXMBaseIcon = XYXMBaseIcon;
    __reflect(XYXMBaseIcon.prototype, "xyxm.XYXMBaseIcon");
})(xyxm || (xyxm = {}));
