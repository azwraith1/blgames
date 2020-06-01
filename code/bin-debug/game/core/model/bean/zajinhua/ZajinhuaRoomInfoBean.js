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
// TypeScript file
var ZajinhuaRoomInfoBean = (function (_super) {
    __extends(ZajinhuaRoomInfoBean, _super);
    function ZajinhuaRoomInfoBean() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zdgz = false;
        return _this;
    }
    /**
    * 设置对局轮次
    * @param  {GameRoundData} roundData
    */
    ZajinhuaRoomInfoBean.prototype.setRoundData = function (roundData) {
        this.curRound = roundData.curRound;
        this.dealer = roundData.dealer;
        this.dealerLZ = roundData.dealerLZ;
        this.curPlay = roundData.dealer;
    };
    return ZajinhuaRoomInfoBean;
}(BaseRoomInfo));
__reflect(ZajinhuaRoomInfoBean.prototype, "ZajinhuaRoomInfoBean");
