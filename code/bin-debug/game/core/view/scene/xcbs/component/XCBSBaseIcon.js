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
var xcbs;
(function (xcbs) {
    var XCBSBaseIcon = (function (_super) {
        __extends(XCBSBaseIcon, _super);
        function XCBSBaseIcon() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.iconKey = "xcbs";
            _this.dbName = "xcbs_icon2_guang";
            _this.scatterLightX = 95;
            _this.scatterLightY = 90;
            _this.scatterLightY2 = 90;
            return _this;
        }
        XCBSBaseIcon.prototype.showSdDbComponet = function () {
            var _this = this;
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                if (this.value == 2) {
                    if (game.XCBSUtils.isFreeGame) {
                        this.dbComp.callback = function () {
                            if (_this.dbComp) {
                                game.UIUtils.removeSelf(_this.dbComp);
                            }
                            _this.dbBoom = new DBComponent(_this.iconKey + "_" + ("icon_" + _this.value) + "_boom");
                            _this.dbBoom.x = 95;
                            _this.dbBoom.y = 87;
                            _this.dbBoom.play("", 1);
                            _this.addChild(_this.dbBoom);
                            egret.setTimeout(function () { _this.icon.visible = true; }, _this, 1500);
                        };
                    }
                    else {
                        this.dbComp.callback = function () {
                            if (_this.dbComp) {
                                game.UIUtils.removeSelf(_this.dbComp);
                            }
                            egret.setTimeout(function () { _this.icon.visible = true; }, _this, 1500);
                        };
                    }
                }
                else if (this.value == 1) {
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            game.UIUtils.removeSelf(_this.dbComp);
                        }
                        _this.dbBoom = new DBComponent(_this.iconKey + "_" + ("icon_" + _this.value) + "_boom");
                        _this.dbBoom.x = 96;
                        _this.dbBoom.y = 90.5;
                        _this.dbBoom.play("", 1);
                        _this.addChild(_this.dbBoom);
                        egret.setTimeout(function () { _this.icon.visible = true; }, _this, 1500);
                    };
                }
                else if (this.value != 1 && this.value != 2) {
                    this.dbComp.callback = function () {
                        if (_this.dbComp) {
                            game.UIUtils.removeSelf(_this.dbComp);
                        }
                        _this.dbBoom = new DBComponent(_this.iconKey + "_" + ("icon_" + _this.value) + "_boom");
                        _this.dbBoom.x = 95.3;
                        _this.dbBoom.y = 90.2;
                        _this.dbBoom.play("", 1);
                        _this.addChild(_this.dbBoom);
                        egret.setTimeout(function () { _this.icon.visible = true; }, _this, 1500);
                    };
                }
                this.icon.visible = false;
                this.changePosition();
                this.dbComp.play("", 1);
                this.addChild(this.dbComp);
            }
        };
        XCBSBaseIcon.prototype.showSmashingDB = function (time) {
            var _this = this;
            if (this.value) {
                this.dbComp = this.createDbCom(this.iconKey + "_" + ("icon_" + this.value));
                this.icon.visible = false;
                this.dbComp.play("", time);
                this.addChild(this.dbComp);
                this.changePosition();
                this.dbComp.callback = function () {
                    game.UIUtils.removeSelf(_this.dbComp);
                    _this.icon.visible = true;
                };
            }
        };
        /**
         * @param  {string} str
         * 添加sdxl scatter特效
         */
        XCBSBaseIcon.prototype.addScatter = function (str) {
            var _this = this;
            this.scatterGuang = new DBComponent(str);
            this.icon.visible = false;
            this.scatterGuang.callback = function () { _this.icon.visible = true; game.UIUtils.removeSelf(_this.scatterGuang); };
            this.scatterGuang.x = 95;
            this.scatterGuang.y = 90;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        /**
         * @param  {string} str
         * 出现scatter图标亮一下的效果
         */
        XCBSBaseIcon.prototype.addScatter1 = function (str) {
            this.scatterGuang = new DBComponent(str);
            this.scatterGuang.x = 95;
            this.scatterGuang.y = 90;
            this.scatterGuang.play("", 1);
            this.addChild(this.scatterGuang);
        };
        return XCBSBaseIcon;
    }(game.BaseSlotIcon));
    xcbs.XCBSBaseIcon = XCBSBaseIcon;
    __reflect(XCBSBaseIcon.prototype, "xcbs.XCBSBaseIcon");
})(xcbs || (xcbs = {}));
