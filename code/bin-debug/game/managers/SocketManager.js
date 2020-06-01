var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved.
 * 存放网络公共方法
 * 注意：是同步请求，不是异步
 */
var game;
(function (game) {
    var SocketManager = (function () {
        function SocketManager() {
            this.socketPath = "ws://192.168.10.161:6565";
            this.isRunning = true;
            this.callbackList = new HashMap();
            this.sequene = 1;
            if (SocketManager._instance) {
                throw new Error("DateTimer使用单例");
            }
            this.createSocket();
        }
        Object.defineProperty(SocketManager, "instance", {
            get: function () {
                if (!SocketManager._instance) {
                    SocketManager._instance = new SocketManager();
                }
                return SocketManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        SocketManager.prototype.createSocket = function () {
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            // this.socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //连接服务器
            this.socket.connectByUrl(this.socketPath);
        };
        SocketManager.prototype.onSocketOpen = function () {
            LogUtils.logD("打开连接");
        };
        SocketManager.prototype.onSocketClose = function () {
            LogUtils.logD("onSocketClose");
        };
        SocketManager.prototype.onSocketError = function () {
            LogUtils.logD("onSocketError");
        };
        SocketManager.prototype.onReceiveMessage = function (e) {
            if (!SocketManager.instance.isRunning) {
                return;
            }
            var data = this.socket.readUTF();
            // this.socket.readBytes()
            var jsonData;
            if (data) {
                jsonData = JSON.parse(data);
            }
            if (!jsonData) {
                return;
            }
            //服务器推送
            if (jsonData.type) {
                CF.sN(jsonData.type, jsonData.data);
                return;
            }
            if (jsonData.sequene) {
                var callback = this.callbackList.get(jsonData.sequene);
                if (callback) {
                    callback(jsonData);
                    this.callbackList.remove(jsonData.sequene);
                }
                return;
            }
        };
        return SocketManager;
    }());
    game.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "game.SocketManager");
})(game || (game = {}));
