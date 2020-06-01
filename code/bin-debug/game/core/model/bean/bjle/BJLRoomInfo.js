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
var BJLRoomInfo = (function (_super) {
    __extends(BJLRoomInfo, _super);
    function BJLRoomInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerList = {
            richManList: [],
            winRate1st: {},
        };
        _this.r_isRoundWin = false;
        _this.b_isRoundWin = false;
        return _this;
    }
    return BJLRoomInfo;
}(BaseRoomInfo));
__reflect(BJLRoomInfo.prototype, "BJLRoomInfo");
