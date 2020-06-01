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
var BaseMaJiangHallScene = (function (_super) {
    __extends(BaseMaJiangHallScene, _super);
    function BaseMaJiangHallScene() {
        var _this = _super.call(this) || this;
        /**
     * 头像前缀
     */
        _this.headerFront = "hall_header";
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = null;
        _this.skinName = "BaseMaJiangHallSceneSkin";
        return _this;
    }
    BaseMaJiangHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        LogUtils.logD("======gameIDName=====" + ("mj_hallid_" + this.pmdKey + "_png"));
        this.gameIDName.source = "mj_hallid_" + this.pmdKey + "_png";
        Owen.UtilsString.playDB("dt20_coin", this.coinDB, -1);
        this.mjHotBar.bottom = 0;
        var ui_a = game.Utils.getURLQueryString("ui_a");
        if (ui_a == "1") {
            this.mjHotBar.visible = false;
        }
    };
    //大厅选场bar
    BaseMaJiangHallScene.prototype.showHallBars = function () {
        var nums = Global.gameProxy.gameNums[this.pmdKey];
        var index = 1;
        var item;
        for (var i in nums) {
            var barConfig = nums[i];
            item = new BaseMJHallBar(nums[i], index, this.pmdKey, this.loadGroups);
            item.name = "item" + i;
            this.contentGroup.addChild(item);
            item.showButtonAni(index * 100);
            //this.showButtonAni(item,index*150);
            item.x = 10 + item.width / 2 + (index - 1) * (item.width + 10); //20
            index++;
            item.alpha = 1;
        }
    };
    BaseMaJiangHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.MJ_HOTBTN_ONCLICK, this.hotBtnOnCLick, this);
    };
    BaseMaJiangHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.MJ_HOTBTN_ONCLICK, this.hotBtnOnCLick, this);
    };
    //热门游戏 
    BaseMaJiangHallScene.prototype.showHotBar = function () {
    };
    BaseMaJiangHallScene.prototype.hotBtnOnCLick = function (e) {
        var _this = this;
        var isClick = e.data;
        if (isClick) {
            egret.Tween.get(this.mjHotBar).to({ bottom: 100 }, 500, egret.Ease.quadOut);
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(_this.mjHotBar);
                _this.mjHotBar.bottom = 100;
            }, this, 500);
        }
        else {
            egret.Tween.get(this.mjHotBar).to({ bottom: 0 }, 500, egret.Ease.quadOut);
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(_this.mjHotBar);
                _this.mjHotBar.bottom = 0;
            }, this, 500);
        }
    };
    return BaseMaJiangHallScene;
}(game.BaseHallScene));
__reflect(BaseMaJiangHallScene.prototype, "BaseMaJiangHallScene");
