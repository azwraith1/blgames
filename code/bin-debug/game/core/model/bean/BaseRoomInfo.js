var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BaseRoomInfo = (function () {
    function BaseRoomInfo() {
        this.r_isRoundWin = false;
        this.b_isRoundWin = false;
    }
    return BaseRoomInfo;
}());
__reflect(BaseRoomInfo.prototype, "BaseRoomInfo");
