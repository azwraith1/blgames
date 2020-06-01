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
 * @Date: 2019-08-12 10:51:17
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-08-12 11:40:59
 * @Description: 抓鸟动画
 */
var HNMJBirdInfo = (function (_super) {
    __extends(HNMJBirdInfo, _super);
    function HNMJBirdInfo(birdInfo, birdCardResultInfo) {
        var _this = _super.call(this) || this;
        _this.birdInfo = birdInfo;
        _this.birdCardResultInfo = birdCardResultInfo;
        _this.skinName = "HNMJBirdInfoSkin";
        return _this;
    }
    HNMJBirdInfo.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.zhuaniaoImage.visible = true;
        this.zhuaniaoImage.scaleX = this.zhuaniaoImage.scaleY = 0;
        egret.Tween.get(this.zhuaniaoImage).to({
            scaleX: 1,
            scaleY: 1
        }, 400, egret.Ease.backInOut);
        this.pai1.alpha = this.pai2.alpha = 0;
        this.setAutoTimeout(function () {
            if (_this.birdInfo.length == 1) {
                _this.pai1.resetValue(_this.birdInfo[0]);
                _this.pai1.visible = true;
                egret.Tween.get(_this.pai1).to({
                    alpha: 1
                }, 200, egret.Ease.backInOut).to({
                    x: 25
                }, 200, egret.Ease.sineIn);
            }
            else {
                _this.pai1.resetValue(_this.birdInfo[0]);
                _this.pai2.resetValue(_this.birdInfo[1]);
                _this.pai1.visible = true;
                _this.pai2.visible = true;
                egret.Tween.get(_this.pai1).to({
                    alpha: 1
                }, 200, egret.Ease.sineIn).to({
                    x: 25
                }, 200);
                egret.Tween.get(_this.pai2).to({
                    alpha: 1
                }, 200, egret.Ease.sineIn).to({
                    x: _this.width - 25
                }, 200, egret.Ease.sineIn);
            }
            egret.setTimeout(function () {
                _this.addPaiAni();
            }, _this, 400);
        }, this, 400);
    };
    HNMJBirdInfo.prototype.addPaiAni = function () {
        var result0 = this.birdCardResultInfo[0];
        if (result0 != null && result0 != undefined) {
            if (result0 == 0) {
                this.pai1.setLihight(true);
            }
            else {
                var db1 = DBComponent.create("birdAni_1", "hnmj_zn");
                db1.playByFilename(0);
                db1.x = this.pai1.x;
                db1.y = this.pai1.y;
                this.addChild(db1);
                this.pai1.addBirdImage();
            }
        }
        var result1 = this.birdCardResultInfo[1];
        if (result1 != null && result1 != undefined) {
            if (result1 == 0) {
                this.pai2.setLihight(true);
            }
            else {
                var db2 = DBComponent.create("birdAni_2", "hnmj_zn");
                db2.x = this.pai2.x;
                db2.y = this.pai2.y;
                db2.playByFilename(0);
                this.addChild(db2);
                this.pai2.addBirdImage();
            }
        }
    };
    return HNMJBirdInfo;
}(game.BaseUI));
__reflect(HNMJBirdInfo.prototype, "HNMJBirdInfo");
