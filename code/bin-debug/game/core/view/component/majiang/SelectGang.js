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
 * @Author: li mengchan
 * @Date: 2018-07-20 11:41:14
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-09-14 10:11:05
 * @Description: 多个杠牌的显示
 */
var majiang;
(function (majiang) {
    var SelectGang = (function (_super) {
        __extends(SelectGang, _super);
        function SelectGang() {
            return _super.call(this) || this;
            // this.skinName = new SelectGangSkin();
        }
        SelectGang.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SelectGang.prototype.initWithTask = function (taskArr) {
            this.taskArr = taskArr;
            this.itemGroup.removeChildren();
            for (var i = 0; i < taskArr.length; i++) {
                var item = new majiang.SelectGangItem(taskArr[i].card);
                this.itemGroup.addChild(item);
            }
            this.bgImage.width = this.itemGroup.width + 36;
            this.visible = true;
        };
        SelectGang.prototype.initWithChiTask = function (chiArr) {
            this.taskArr = chiArr;
            this.itemGroup.removeChildren();
            for (var i = 0; i < chiArr.length; i++) {
                var item = new majiang.SelectGangItem(chiArr[i], false);
                this.itemGroup.addChild(item);
            }
            this.bgImage.width = this.itemGroup.width + 36;
            this.visible = true;
        };
        SelectGang.prototype.hide = function () {
            this.taskArr = null;
            this.itemGroup.removeChildren();
            this.visible = false;
        };
        SelectGang.prototype.getMaxWidth = function () {
            return this.bgImage.width + 50;
        };
        return SelectGang;
    }(eui.Component));
    majiang.SelectGang = SelectGang;
    __reflect(SelectGang.prototype, "majiang.SelectGang");
})(majiang || (majiang = {}));
