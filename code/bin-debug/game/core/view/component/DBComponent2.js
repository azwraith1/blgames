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
var DBComponent2 = (function (_super) {
    __extends(DBComponent2, _super);
    function DBComponent2(dbName, autoPos) {
        if (autoPos === void 0) { autoPos = true; }
        return _super.call(this, dbName, autoPos) || this;
    }
    return DBComponent2;
}(DBComponent));
__reflect(DBComponent2.prototype, "DBComponent2");
