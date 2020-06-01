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
/*
 * @Author: real MC Lee
 * @Date: 2019-07-31 13:49:24
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-08-13 14:16:51
 * @Description:
 */
var gdzw;
(function (gdzw) {
    var GDZWBaseIcon = (function (_super) {
        __extends(GDZWBaseIcon, _super);
        function GDZWBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dbName = "gdzw_icon_2_guang";
            _this.scatterLightX = 75.6;
            _this.scatterLightY = 97;
            _this.scatterLightY2 = 92.6;
            _this.iconKey = "gdzw";
            return _this;
        }
        /**
       * 展示中奖图标效果，特效
       */
        GDZWBaseIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            // this.cbzzIconBg.play("", 1);
            // this.cbzzIconKuang.play1("", 1);
            if (this.value <= 6) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                switch (this.value) {
                    case 1:
                        this.dbKaung = new DBComponent("gdzw_icon_1_cheek");
                        break;
                    case 3:
                    case 4:
                    case 5:
                        this.dbKaung = new DBComponent("gdzw_icon_2_cheek");
                        break;
                    case 6:
                        this.dbKaung = new DBComponent("gdzw_icon_3_cheek");
                        break;
                }
                this.dbKaung.x = 75;
                this.dbKaung.y = 92.2;
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        _this.icon.visible = true;
                        game.UIUtils.removeSelf(_this.dbComp);
                        _this.dbComp = null;
                        game.UIUtils.removeSelf(_this.dbKaung);
                        _this.dbKaung = null;
                    }
                };
                this.icon.visible = false;
                this.changePosition();
                // this.addChild(this.cbzzIconKuang);
                this.dbComp.play("", 1);
                this.dbKaung.play("", 4);
                this.addChild(this.dbComp);
                this.addChild(this.dbKaung);
            }
            else {
                this.dbKaung = new DBComponent("gdzw_default");
                this.dbKaung.play("", 2);
                this.dbKaung.callback = function () {
                    game.UIUtils.removeSelf(_this.dbKaung);
                    _this.dbKaung = null;
                };
                this.dbKaung.x = 75.5;
                this.dbKaung.y = 92.5;
                this.addChild(this.dbKaung);
            }
        };
        GDZWBaseIcon.prototype.showScatterIcon = function () {
            this.icon.visible = true;
        };
        return GDZWBaseIcon;
    }(game.BaseSlotIcon));
    gdzw.GDZWBaseIcon = GDZWBaseIcon;
    __reflect(GDZWBaseIcon.prototype, "gdzw.GDZWBaseIcon");
})(gdzw || (gdzw = {}));
