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
var majiang;
(function (majiang) {
    var HZMJPaiQiang136 = (function (_super) {
        __extends(HZMJPaiQiang136, _super);
        function HZMJPaiQiang136() {
            return _super.call(this) || this;
        }
        HZMJPaiQiang136.prototype.reloadPaiQiang = function () {
            var roomInfo = Global.gameProxy.roomInfo;
            var lessNum = roomInfo.publicCardNum;
            var _shengyu = 136 - lessNum;
            for (var i = 0; i < this.maxNumber - lessNum; i++) {
                this.removeNumByIndex();
            }
        };
        return HZMJPaiQiang136;
    }(majiang.PaiQiang136));
    majiang.HZMJPaiQiang136 = HZMJPaiQiang136;
    __reflect(HZMJPaiQiang136.prototype, "majiang.HZMJPaiQiang136");
})(majiang || (majiang = {}));
