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
 * @Date: 2018-06-25 14:26:37
 * @Last Modified by: Li MengChan
 * @Last Modified time: 2018-07-02 12:09:59
 * @Description: http请求代理模块
 */
var game;
(function (game) {
    var NetProxy = (function (_super) {
        __extends(NetProxy, _super);
        function NetProxy() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.callbackList = new HashMap();
            return _this;
        }
        NetProxy.prototype.init = function () {
            Global.netProxy = this;
        };
        /**
         * 发送请求
         */
        NetProxy.prototype.sendRequest = function (url, data, callback) {
            var loader = new egret.URLLoader();
            this.callbackList.set(loader.hashCode, callback);
            loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            var request = new egret.URLRequest(url);
            request.requestHeaders.push(new egret.URLRequestHeader("Content-Type", "application/json;charset=utf-8"));
            request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
            request.data = JSON.stringify(data);
            loader.load(request);
        };
        NetProxy.prototype.sendRequestAsync = function (url, data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var loader = new egret.URLLoader();
                // this.callbackList.set(loader.hashCode, callback);
                loader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
                loader.addEventListener(egret.Event.COMPLETE, function (event) {
                    var loader = event.currentTarget;
                    loader.removeEventListener(egret.Event.COMPLETE, _this.onPostComplete, _this);
                    loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, _this.onPostIOError, _this);
                    var str = loader.data.replace(/\s/g, "");
                    var data = JSON.parse(str);
                    resolve(data);
                }, _this);
                var request = new egret.URLRequest(url);
                request.requestHeaders.push(new egret.URLRequestHeader("Content-Type", "application/json;charset=utf-8"));
                request.method = data ? egret.URLRequestMethod.POST : egret.URLRequestMethod.GET;
                request.data = JSON.stringify(data);
                loader.load(request);
            });
        };
        NetProxy.prototype.onPostComplete = function (event) {
            var loader = event.currentTarget;
            loader.removeEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            var str = loader.data.replace(/\s/g, "");
            var data = JSON.parse(str);
            var callback = this.callbackList.get(loader.hashCode);
            if (callback) {
                callback(data);
                this.callbackList.remove(loader.hashCode);
            }
        };
        NetProxy.prototype.onPostIOError = function (event) {
            egret.error("post error : " + event);
        };
        NetProxy.prototype.sendGetRequest = function (url, data, callback) {
            var loader = new egret.URLLoader();
            this.callbackList.set(loader.hashCode, callback);
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            var request = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.GET;
            var argsArr = [];
            // for (var key in data) {
            //     argsArr.push(key + "=" + data[key]);
            // }
            request.data = data; //new egret.URLVariables(argsArr.join("&"));
            loader.load(request);
        };
        NetProxy.NAME = "NetProxy";
        return NetProxy;
    }(ResourceProxyBase));
    game.NetProxy = NetProxy;
    __reflect(NetProxy.prototype, "game.NetProxy");
})(game || (game = {}));
