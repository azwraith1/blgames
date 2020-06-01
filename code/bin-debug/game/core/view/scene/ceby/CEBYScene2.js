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
var ceby;
(function (ceby) {
    var CEBYScene2 = (function (_super) {
        __extends(CEBYScene2, _super);
        function CEBYScene2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CEBYScene2;
    }(eui.Component));
    ceby.CEBYScene2 = CEBYScene2;
    __reflect(CEBYScene2.prototype, "ceby.CEBYScene2");
})(ceby || (ceby = {}));
