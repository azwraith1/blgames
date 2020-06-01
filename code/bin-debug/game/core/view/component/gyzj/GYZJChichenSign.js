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
    var GYZJChichenSign = (function (_super) {
        __extends(GYZJChichenSign, _super);
        function GYZJChichenSign() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/component/gyzj/GYZJChichenSignSkin.exml";
            return _this;
        }
        GYZJChichenSign.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //this.cfChicken.initDB();
            this.cfChicken.setChickType(1);
            this.zrChicken.setChickType(2);
            // this.zrChicken.initDB();
        };
        /**冲锋 */
        GYZJChichenSign.prototype.setCFChickenVis = function () {
            this.cfChicken.visible = true;
            this.cfChicken.chickDB("gyzj_chong", function () {
            }, this);
        };
        /**责任*/
        GYZJChichenSign.prototype.setZRchichenVis = function () {
            this.zrChicken.visible = true;
            this.zrChicken.chickDB("gyzj_ze", function () {
            }, this);
        };
        /**1是冲锋鸡 2是责任鸡*/
        GYZJChichenSign.prototype.setChickenVisble = function (type) {
            if (this.cfChicken.visible == false) {
                if (type == 1) {
                    this.cfChicken.visible = true;
                    this.cfChicken.setChickType(type);
                    if (type == 1) {
                        this.cfChicken.chickDB("gyzj_chong", function () {
                        }, this);
                    }
                    else {
                        this.cfChicken.chickDB("gyzj_chong", function () {
                        }, this);
                    }
                }
                else {
                    if (type == 2 && this.zrChicken.visible == false && this.cfChicken.visible == false) {
                        this.zrChicken.visible = true;
                        this.zrChicken.setChickType(2);
                        this.zrChicken.chickDB("gyzj_ze", function () {
                        }, this);
                    }
                    else {
                        if (type == 2 && this.zrChicken.visible == true && this.cfChicken.visible == false) {
                            this.cfChicken.visible = true;
                            this.cfChicken.setChickType(2);
                            this.cfChicken.chickDB("gyzj_ze", function () {
                            }, this);
                        }
                    }
                }
            }
            else {
                if (this.cfChicken.visible) {
                    this.zrChicken.visible = true;
                    this.zrChicken.setChickType(type);
                    if (type == 1) {
                        this.zrChicken.chickDB("gyzj_ze", function () {
                        }, this);
                    }
                    else {
                        this.zrChicken.chickDB("gyzj_ze", function () {
                        }, this);
                    }
                }
            }
        };
        return GYZJChichenSign;
    }(eui.Component));
    majiang.GYZJChichenSign = GYZJChichenSign;
    __reflect(GYZJChichenSign.prototype, "majiang.GYZJChichenSign");
})(majiang || (majiang = {}));
