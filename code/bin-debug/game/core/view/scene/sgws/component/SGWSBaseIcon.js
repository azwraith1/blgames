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
var sgws;
(function (sgws) {
    var SGWSBaseIcon = (function (_super) {
        __extends(SGWSBaseIcon, _super);
        function SGWSBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "sgws";
            _this.dbName = "sgws_icon_2_guang";
            _this.scatterLightX = 71;
            _this.scatterLightY = 75.5;
            _this.scatterLightY2 = 75.5;
            return _this;
        }
        SGWSBaseIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                if (this.value == 2) {
                    this.dbComp = new DBComponent("sgws_icon_2_boom");
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            game.UIUtils.removeSelf(_this.dbComp);
                        }
                        egret.setTimeout(function () { _this.icon.visible = true; }, _this, 2000);
                    };
                }
                else if (this.value == 1) {
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            game.UIUtils.removeSelf(_this.dbComp);
                        }
                        egret.setTimeout(function () { _this.icon.visible = true; }, _this, 2000);
                    };
                }
                else if (this.value != 1 && this.value != 2) {
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            game.UIUtils.removeSelf(_this.dbComp);
                        }
                        egret.setTimeout(function () { _this.icon.visible = true; }, _this, 2000);
                    };
                }
                this.icon.visible = false;
                this.changePosition();
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        };
        SGWSBaseIcon.prototype.showDiComp = function () {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 71;
                this.dbLight.y = 75.5;
                this.dbLight.play("", 1);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        };
        SGWSBaseIcon.prototype.stopDiCom = function () {
            game.UIUtils.removeSelf(this.dbLight);
        };
        SGWSBaseIcon.prototype.showSmashingDB = function (time) {
            if (this.value) {
                this.dbLight = new DBComponent("sgws_light");
                this.dbLight.x = 71;
                this.dbLight.y = 75.5;
                this.dbLight.play("", time);
                this.addChild(this.dbLight);
                this.addChild(this.icon);
            }
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        SGWSBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.icon.source = "sgws_icon_2_mie_png";
            this.scatterGuang = new DBComponent(str);
            this.icon.visible = false;
            this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            this.scatterGuang.x = 71;
            this.scatterGuang.y = 75.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        SGWSBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 71;
            this.scatterGuang.y = 75.5;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        return SGWSBaseIcon;
    }(game.BaseSlotIcon));
    sgws.SGWSBaseIcon = SGWSBaseIcon;
    __reflect(SGWSBaseIcon.prototype, "sgws.SGWSBaseIcon");
})(sgws || (sgws = {}));
