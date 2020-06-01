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
 * @Author: MC Lee
 * @Date: 2019-10-08 10:41:42
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-27 18:49:56
 * @Description: 选场场景热门条
 */
var HotHallBar = (function (_super) {
    __extends(HotHallBar, _super);
    function HotHallBar() {
        var _this = _super.call(this) || this;
        _this.skinName = new HotHallBar1Skin();
        return _this;
    }
    HotHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化造型
        var hallData = Global.gameProxy.sceneList;
        var index = 0;
        for (var i = 0; i < hallData.length; i++) {
            var hallItemData = hallData[i];
            if (hallItemData.gameId == "club") {
                continue;
            }
            if (hallItemData.grade == 2 || hallItemData.grade == 1) {
                var item = new HotBarItem(hallItemData);
                item.x = index * (item.width + 10);
                this.itemGroup.addChild(item);
                index++;
            }
        }
        this.init();
    };
    HotHallBar.prototype.init = function () {
        var _this = this;
        // this.group1.visible = false;
        this.group1.x = 0;
        this.group2.x = -this.group2.width;
        this.group2.visible = false;
        this.setAutoTimeout(function () {
            _this.scroller.viewport.scrollH = _this.scroller.viewport.contentWidth - 376;
        }, this, 100);
    };
    HotHallBar.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.group1:
                majiang.MajiangUtils.playClick();
                this.group1Touch();
                break;
            case this.backBtn:
                this.backBtnTouch();
                break;
        }
    };
    /**
     */
    HotHallBar.prototype.group1Touch = function () {
        var _this = this;
        var time = 100;
        egret.Tween.removeTweens(this.group2);
        egret.Tween.removeTweens(this.group1);
        this.group2.visible = true;
        this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - 376;
        egret.Tween.get(this.group1).to({
            x: -this.group1.width
        }, time).call(function () {
            egret.Tween.get(_this.group2).to({
                x: 0
            }, time);
        });
        // this.group2.visible = true;
        // this.group1.visible = false;
    };
    /**
     */
    HotHallBar.prototype.backBtnTouch = function () {
        var _this = this;
        var time = 100;
        egret.Tween.removeTweens(this.group2);
        egret.Tween.removeTweens(this.group1);
        this.scroller.viewport.scrollH = this.scroller.viewport.contentWidth - 376;
        egret.Tween.get(this.group2).to({
            x: -this.group2.width
        }, time).call(function () {
            _this.group2.visible = false;
            egret.Tween.get(_this.group1).to({
                x: 0
            }, time);
        });
    };
    return HotHallBar;
}(game.BaseUI));
__reflect(HotHallBar.prototype, "HotHallBar");
