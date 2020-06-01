var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameRoomInfoBean = (function () {
    function GameRoomInfoBean() {
    }
    GameRoomInfoBean.prototype.getRoomId = function () {
    };
    /**
     * 设置对局轮次
     * @param  {GameRoundData} roundData
     */
    GameRoomInfoBean.prototype.setRoundData = function (roundData) {
        this.curRound = roundData.curRound;
        this.dealer = roundData.dealer;
        this.dealerLZ = roundData.dealerLZ;
        this.curPlay = roundData.dealer;
    };
    GameRoomInfoBean.prototype.updateRoom = function (roomInfo) {
    };
    return GameRoomInfoBean;
}());
__reflect(GameRoomInfoBean.prototype, "GameRoomInfoBean");
