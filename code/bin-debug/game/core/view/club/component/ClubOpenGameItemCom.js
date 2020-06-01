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
var ClubOpenGameItemCom = (function (_super) {
    __extends(ClubOpenGameItemCom, _super);
    //默认设置按钮是开启得状态
    function ClubOpenGameItemCom(gameId, isSelect) {
        if (isSelect === void 0) { isSelect = true; }
        var _this = _super.call(this) || this;
        _this.gameId = gameId;
        _this.isSelcect = isSelect;
        _this.skinName = "ClubOpenGameItemComSkin";
        return _this;
    }
    ClubOpenGameItemCom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.gameRateTxt.text = GAME_NAME[this.gameId.toString()] + ":";
        this.setBtn.selected = this.isSelcect;
    };
    ClubOpenGameItemCom.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        this.setBtn.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    ClubOpenGameItemCom.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        this.setBtn.removeEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    ClubOpenGameItemCom.prototype.onChange = function (e) {
        CF.dP(ENo.CLUB_CLICK_OPENGAME);
    };
    return ClubOpenGameItemCom;
}(game.BaseUI));
__reflect(ClubOpenGameItemCom.prototype, "ClubOpenGameItemCom");
