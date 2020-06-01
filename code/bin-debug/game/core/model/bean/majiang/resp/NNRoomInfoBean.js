var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var NNRoomInfoBean = (function () {
    function NNRoomInfoBean() {
    }
    /**
     * 设置对局轮次
     * @param  {GameRoundData} roundData
     */
    NNRoomInfoBean.prototype.setRoundData = function (roundData) {
        this.curRound = roundData.curRound;
        this.dealer = roundData.dealer;
        this.dealerLZ = roundData.dealerLZ;
        this.curPlay = roundData.dealer;
    };
    return NNRoomInfoBean;
}());
__reflect(NNRoomInfoBean.prototype, "NNRoomInfoBean");
