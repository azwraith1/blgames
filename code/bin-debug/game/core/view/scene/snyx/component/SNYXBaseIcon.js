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
var snyx;
(function (snyx) {
    var SNYXBaseIcon = (function (_super) {
        __extends(SNYXBaseIcon, _super);
        function SNYXBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "snyx";
            _this.dbName = "snyx_icon_2_guang";
            _this.scatterLightX = 85;
            _this.scatterLightY = 77.5;
            _this.scatterLightY2 = 77.5;
            return _this;
        }
        SNYXBaseIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                // this.dbBoom = new DBComponent("snyx_default");
                // this.dbBoom.x = 84; this.dbBoom.y = 74.5;
                this.dbComp.callback = function () {
                    if (_this.dbComp) {
                        // game.UIUtils.removeSelf(this.dbComp);
                        game.UIUtils.removeSelf(_this.dbBoom);
                        _this.icon.visible = true;
                    }
                };
                this.icon.visible = false;
                this.changePosition();
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        };
        SNYXBaseIcon.prototype.showDiComp = function () {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 85;
                this.dbLight.y = 77.5;
                this.dbLight.play("", 1);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        };
        SNYXBaseIcon.prototype.stopDiCom = function () {
            game.UIUtils.removeSelf(this.dbLight);
        };
        SNYXBaseIcon.prototype.showSmashingDB = function (time) {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 85;
                this.dbLight.y = 77.5;
                this.dbLight.play("", time);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        SNYXBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            // this.icon.source = "sgws_icon_2_mie_png";
            this.scatterGuang = new DBComponent(str);
            // this.icon.visible = false;
            this.scatterGuang.callback = function () {
                // this.icon.visible = true;
                game.UIUtils.removeSelf(_this.scatterGuang);
            };
            this.scatterGuang.x = 83.1;
            this.scatterGuang.y = 76.9;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        SNYXBaseIcon.prototype.addScatter1 = function (str) {
            var _this = this;
            // this.icon.visible = false;
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 84;
            this.scatterGuang.y = 77.5;
            this.scatterGuang.play("", 1);
            this.scatterGuang.callback = function () {
                // this.icon.visible = true;
                game.UIUtils.removeSelf(_this.scatterGuang);
            };
            this.addChild(this.scatterGuang);
        };
        return SNYXBaseIcon;
    }(game.BaseSlotIcon));
    snyx.SNYXBaseIcon = SNYXBaseIcon;
    __reflect(SNYXBaseIcon.prototype, "snyx.SNYXBaseIcon");
})(snyx || (snyx = {}));
