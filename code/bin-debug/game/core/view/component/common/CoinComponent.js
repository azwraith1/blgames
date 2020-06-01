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
 * @Date: 2019-06-12 10:42:40
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-06-27 19:13:53
 * @Description: 基础筹码金币类
 */
var CoinComponent = (function (_super) {
    __extends(CoinComponent, _super);
    function CoinComponent(coinType) {
        var _this = _super.call(this) || this;
        _this.selected = false;
        _this.CoinType = coinType;
        switch (coinType) {
            case CoinType.BLACKJ:
                _this.skinName = new BlackJCMSkin();
                break;
            case CoinType.BAICAO:
                _this.skinName = "BaiCaoCMSkin";
                break;
            case CoinType.SUPERBAICAO:
                _this.skinName = "SuperBaiCaoCMSkin";
                break;
        }
        return _this;
    }
    CoinComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchChildren = false;
        this.kImage.visible = false;
    };
    CoinComponent.prototype.setSelected = function (flag) {
        this.selected = flag;
        this.kImage.visible = flag;
    };
    /**
     * 显示金币
     */
    CoinComponent.prototype.showCoin = function (resourceName, value, betIndex) {
        if (betIndex === void 0) { betIndex = 0; }
        this.coinImage.source = RES.getRes(resourceName + "_png");
        this.scoreLabel.text = this.getCMNumber(value);
        this.score = value;
        this.betIndex = betIndex;
    };
    Object.defineProperty(CoinComponent.prototype, "BetIndex", {
        get: function () {
            return this.betIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示金币
     */
    CoinComponent.prototype.showBaiCaoCoin = function (resourceName, value, betIndex) {
        if (betIndex === void 0) { betIndex = 0; }
        this.coinImage.source = RES.getRes(resourceName + "_png");
        this.scoreLabel.text = NumberFormat.BaiCaoCoin(value); //NumberFormat.formatGold_scence(value) //this.getCMNumberBaiCao(value);
        this.score = value;
        this.betIndex = betIndex;
    };
    CoinComponent.prototype.updateNumber = function (value) {
        this.scoreLabel.text = this.getCMNumber(value);
        this.score = value;
    };
    /**
     *
     */
    CoinComponent.prototype.getCMNumber = function (value) {
        // if (value > 1000) {
        // 	return Math.floor(value / 1000) + "k"
        // }
        return value;
    };
    return CoinComponent;
}(eui.Component));
__reflect(CoinComponent.prototype, "CoinComponent");
var CoinType = {
    BLACKJ: 1,
    BAICAO: 2,
    SUPERBAICAO: 3
};
