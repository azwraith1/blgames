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
 * @Date: 2019-10-08 13:55:11
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 15:27:56
 * @Description: 热门条
 */
var HotBarItem = (function (_super) {
    __extends(HotBarItem, _super);
    function HotBarItem(itemData, isMaJiang) {
        if (isMaJiang === void 0) { isMaJiang = false; }
        var _this = _super.call(this) || this;
        _this.itemData = itemData;
        _this.isMaJiang = isMaJiang;
        _this.skinName = new HotBarItemSkin();
        if (isMaJiang)
            _this.skinName = "MaJiangHotBarItemSkin";
        return _this;
    }
    HotBarItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var name = this.itemData.groupCode;
        var resName = "hot_icon_" + name + "_png";
        if (this.isMaJiang)
            resName = "hot_icon_mj_" + name + "_png";
        ImageUtils.showRes(this.iconImage, resName); //smart
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    HotBarItem.prototype.onTouchTap = function () {
        var _this = this;
        egret.Tween.get(this).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            if (_this.itemData.grade == GRADE.DEV) {
                Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
                return;
            }
            else if (_this.itemData.grade == GRADE.MAINTENANCE) {
                Global.alertMediator.addAlert("游戏维护中", null, null, true);
                return;
            }
            //smart
            if (_this.isMaJiang) {
                CF.dP(ENo.MJ_HOTBTN_ONCLICK, false);
            }
            else {
                GameLayerManager.gameLayer().hotHallBar.backBtnTouch();
            }
            CF.dP(ENo.GO_OTHERHALL_SCENE, { gameId: _this.itemData.gameId });
        });
    };
    return HotBarItem;
}(eui.Component));
__reflect(HotBarItem.prototype, "HotBarItem");
