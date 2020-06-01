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
var BaseInstanceScence = (function (_super) {
    __extends(BaseInstanceScence, _super);
    function BaseInstanceScence() {
        return _super.call(this) || this;
    }
    BaseInstanceScence.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLOSE_ALL, this.hideUICom, this);
    };
    BaseInstanceScence.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLOSE_ALL, this.hideUICom, this);
    };
    BaseInstanceScence.prototype.hideUICom = function () {
        if (this["hide"]) {
            this["hide"]();
        }
    };
    return BaseInstanceScence;
}(game.BaseComponent));
__reflect(BaseInstanceScence.prototype, "BaseInstanceScence");
