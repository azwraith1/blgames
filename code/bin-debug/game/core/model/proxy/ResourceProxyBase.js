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
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:27:41
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:27:41
 * @Description: 代理的基本类
 */
var ResourceProxyBase = (function (_super) {
    __extends(ResourceProxyBase, _super);
    function ResourceProxyBase(proxyName) {
        if (proxyName === void 0) { proxyName = ""; }
        var _this = _super.call(this, proxyName) || this;
        _this._dataMap = new Array(); //存储excel数据
        _this._proxyName = ""; //excel名称
        _this._proxyName = proxyName;
        return _this;
    }
    return ResourceProxyBase;
}(puremvc.Proxy));
__reflect(ResourceProxyBase.prototype, "ResourceProxyBase", ["puremvc.IProxy", "puremvc.INotifier"]);
