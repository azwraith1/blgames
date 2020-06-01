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
var MaJiangHotHallBar = (function (_super) {
    __extends(MaJiangHotHallBar, _super);
    function MaJiangHotHallBar() {
        var _this = _super.call(this) || this;
        _this.isSelect = false;
        _this.skinName = "MaJiangHotHallBar1Skin";
        return _this;
    }
    MaJiangHotHallBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.itemGroup.removeChildren();
        this.scroller.alpha = 0;
        //初始化造型
        var hallData = Global.gameProxy.sceneList;
        var index = 0;
        for (var i = 0; i < hallData.length; i++) {
            var hallItemData = hallData[i];
            if (hallItemData.gameId == "club") {
                continue;
            }
            if (hallItemData.grade == 2 || hallItemData.grade == 1) {
                var item = new HotBarItem(hallItemData, true);
                item.x = index * (item.width + 30); //10
                this.itemGroup.addChild(item);
                index++;
            }
        }
    };
    MaJiangHotHallBar.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.hotBtn:
                var isSelect = !this.isSelect;
                this.isSelect = isSelect;
                this.onChange();
                break;
        }
    };
    MaJiangHotHallBar.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        //this.hotBtn.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    MaJiangHotHallBar.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        //this.hotBtn.removeEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    MaJiangHotHallBar.prototype.onChange = function () {
        var _this = this;
        // var radioButton = <eui.ToggleButton>e.target;
        ///获取当前单选按钮的状态
        CF.dP(ENo.MJ_HOTBTN_ONCLICK, this.isSelect); //radioButton.selected
        if (this.isSelect) {
            egret.Tween.get(this.scroller).to({ alpha: 1 }, 300);
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(_this.scroller);
                _this.scroller.alpha = 1;
            }, this, 300);
        }
        else {
            egret.Tween.get(this.scroller).to({ alpha: 0 }, 300);
            this.setAutoTimeout(function () {
                egret.Tween.removeTweens(_this.scroller);
                _this.scroller.alpha = 0;
            }, this, 300);
        }
    };
    return MaJiangHotHallBar;
}(game.BaseUI));
__reflect(MaJiangHotHallBar.prototype, "MaJiangHotHallBar");
