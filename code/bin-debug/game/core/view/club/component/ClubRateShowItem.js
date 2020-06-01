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
var ClubRateShowItem = (function (_super) {
    __extends(ClubRateShowItem, _super);
    function ClubRateShowItem(gameId) {
        var _this = _super.call(this) || this;
        _this.per = "%";
        _this.gameId = gameId;
        _this.skinName = "ClubRateShowItemComSkin";
        return _this;
    }
    ClubRateShowItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.gameName = GAME_NAME[this.gameId.toString()] + ":";
    };
    ClubRateShowItem.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_INNER_RATE_CHANGE, this.onRateChange, this);
    };
    ClubRateShowItem.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_INNER_RATE_CHANGE, this.onRateChange, this);
    };
    ClubRateShowItem.prototype.onRateChange = function (e) {
        var data = e.data;
        if (data.gameId == this.gameId) {
            this.gameRateTxt.text = this.gameName + data.gameInputRateTxt.text + "%";
        }
    };
    Object.defineProperty(ClubRateShowItem.prototype, "rateVal", {
        /**获取rate的值 */
        get: function () {
            var tempt = this.gameRateTxt.text.replace(this.gameName, "");
            return tempt.replace(this.per, "");
        },
        enumerable: true,
        configurable: true
    });
    /**设置税率的值 */
    ClubRateShowItem.prototype.setRateVal = function (data) {
        var _val = data[this.gameId.toString()];
        this.gameRateTxt.text = this.gameName + Owen.Utils.multipleFun(_val, 100) + this.per;
    };
    return ClubRateShowItem;
}(game.BaseUI));
__reflect(ClubRateShowItem.prototype, "ClubRateShowItem");
