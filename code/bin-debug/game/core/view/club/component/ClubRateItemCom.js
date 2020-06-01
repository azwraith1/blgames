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
var ClubRateItemCom = (function (_super) {
    __extends(ClubRateItemCom, _super);
    function ClubRateItemCom(gameId) {
        var _this = _super.call(this) || this;
        _this.gameId = gameId;
        _this.skinName = "ClubRateSetItemSkin";
        return _this;
    }
    /**设置输入文本 */
    ClubRateItemCom.prototype.setInputRate = function (data) {
        var _val = data[this.gameId.toString()];
        //if (org || org != "") {
        this.gameInputRateTxt.text = _val;
        // }
    };
    ClubRateItemCom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.gameInputRateTxt.restrict = ".0-9";
        this.gameInputRateTxt.maxChars = 6;
        this.gameNameTxt.text = GAME_NAME[this.gameId.toString()] + "：";
    };
    ClubRateItemCom.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.gameInputRateTxt.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.gameInputRateTxt.addEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
    };
    ClubRateItemCom.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        this.gameInputRateTxt.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        this.gameInputRateTxt.removeEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
    };
    ClubRateItemCom.prototype.onFouceOut = function (e) {
        var nameInput = e.target;
        if (!nameInput.text || nameInput.text == "") {
            nameInput.text = 0 + "";
        }
        CF.dP(ENo.CLUB_INNER_RATE_CHANGE, this);
    };
    ClubRateItemCom.prototype.onChange = function (e) {
        //限制输入为 小数点后一位
        this.gameInputRateTxt.text = Owen.UtilsString.ForceTrim(this.gameInputRateTxt.text, 1);
    };
    return ClubRateItemCom;
}(game.BaseUI));
__reflect(ClubRateItemCom.prototype, "ClubRateItemCom");
