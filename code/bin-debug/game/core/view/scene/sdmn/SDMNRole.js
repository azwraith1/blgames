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
 * @Date: 2019-05-29 15:05:25
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-10 15:12:58
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNRole = (function (_super) {
        __extends(SDMNRole, _super);
        function SDMNRole() {
            var _this = _super.call(this) || this;
            _this.skinName = "SDMNRoleSkin";
            return _this;
        }
        SDMNRole.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        /**
         * 初始化角色动画第一帧
         * @param  {} effectName
         */
        SDMNRole.prototype.showRoleAni = function (effectName) {
            switch (effectName) {
                case "sdmn_role1":
                    this.freewinRole0 = DBComponent.create("sdmn_roleani1", "sdmn_win_role1");
                    this.freewinRole0.scaleX = this.freewinRole0.scaleY = 4 / 3;
                    this.freewinRole0.horizontalCenter = 37;
                    this.freewinRole0.bottom = -88;
                    this.group.addChild(this.freewinRole0);
                    this.freewinRole0.resetPosition();
                    this.roleBg.source = RES.getRes("sdmn_freebg1_png");
                    this.freewinRole0.touchEnabled = false;
                    break;
                case "sdmn_role2":
                    this.freewinRole1 = DBComponent.create("sdmn_roleani2", "sdmn_win_role2");
                    this.freewinRole1.horizontalCenter = 12;
                    this.freewinRole1.scaleX = this.freewinRole1.scaleY = 4 / 3;
                    this.freewinRole1.bottom = -132;
                    this.group.addChild(this.freewinRole1);
                    this.freewinRole1.resetPosition();
                    this.roleBg.source = RES.getRes("sdmn_freebg2_png");
                    this.freewinRole1.touchEnabled = false;
                    break;
                case "sdmn_role3":
                    this.freewinRole2 = DBComponent.create("sdmn_roleani3", "sdmn_win_role3");
                    this.freewinRole2.horizontalCenter = 5;
                    this.freewinRole2.scaleX = this.freewinRole2.scaleY = 4 / 3;
                    this.freewinRole2.bottom = -65;
                    this.group.addChild(this.freewinRole2);
                    this.freewinRole2.resetPosition();
                    this.roleBg.source = RES.getRes("sdmn_freebg3_png");
                    this.freewinRole2.touchEnabled = false;
                    break;
                case "sdmn_role4":
                    this.freewinRole3 = DBComponent.create("sdmn_roleani4", "sdmn_win_role4");
                    this.freewinRole3.horizontalCenter = 24;
                    this.freewinRole3.scaleX = this.freewinRole3.scaleY = 4 / 3;
                    this.freewinRole3.bottom = -111;
                    this.group.addChild(this.freewinRole3);
                    this.freewinRole3.resetPosition();
                    this.roleBg.source = RES.getRes("sdmn_freebg4_png");
                    this.freewinRole3.touchEnabled = false;
                    break;
            }
            this.group.mask = this.maskRect;
        };
        /**
         * 播放动画
         * @param  {} index
         */
        SDMNRole.prototype.roleAni = function (index) {
            var _this = this;
            switch (index) {
                case 0:
                    this.freewinRole0.play("", 1);
                    break;
                case 1:
                    this.freewinRole1.play("", 1);
                    break;
                case 2:
                    this.freewinRole2.play("", 1);
                    break;
                case 3:
                    this.freewinRole3.play("", 1);
                    break;
            }
            this.group.mask = this.maskRect;
            this["freewinRole" + index].callback = function () {
                _this.removeRoleAni(index);
            };
        };
        /**
         * 移除动画，并初始化成第一帧
         * @param  {} index
         */
        SDMNRole.prototype.removeRoleAni = function (index) {
            game.UIUtils.removeSelf(this["freewinRole" + index]);
            this.group.addChild(this["freewinRole" + index]);
            this["freewinRole" + index].resetPosition();
        };
        return SDMNRole;
    }(game.BaseComponent));
    sdmn.SDMNRole = SDMNRole;
    __reflect(SDMNRole.prototype, "sdmn.SDMNRole");
})(sdmn || (sdmn = {}));
