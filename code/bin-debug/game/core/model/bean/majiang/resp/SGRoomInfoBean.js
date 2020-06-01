var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var SGRoomInfoBean = (function () {
    function SGRoomInfoBean() {
    }
    /**
     * 设置对局轮次
     * @param  {GameRoundData} roundData
     */
    SGRoomInfoBean.prototype.setRoundData = function (roundData) {
        this.curRound = roundData.curRound;
        this.dealer = roundData.dealer;
        this.dealerLZ = roundData.dealerLZ;
        this.curPlay = roundData.dealer;
    };
    return SGRoomInfoBean;
}());
__reflect(SGRoomInfoBean.prototype, "SGRoomInfoBean");
