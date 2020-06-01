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
 * @Date: 2018-06-25 14:25:23
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-22 15:00:57
 * @Description: 提前注册代理对象类
 */
var game;
(function (game) {
    var ModelPrepCommand = (function (_super) {
        __extends(ModelPrepCommand, _super);
        function ModelPrepCommand() {
            return _super.call(this) || this;
        }
        ModelPrepCommand.prototype.execute = function (notification) {
            var proxys = [
                game.NetProxy,
                game.PlayerProxy,
                game.GameProxy,
                game.RoomProxy
            ];
            var self = this;
            _.forEach(proxys, function (proxy, index) {
                var proxyObj = new proxys[index]();
                self.facade.registerProxy(proxyObj);
                if (proxyObj && proxyObj.init) {
                    proxyObj.init();
                }
            });
        };
        return ModelPrepCommand;
    }(puremvc.SimpleCommand));
    game.ModelPrepCommand = ModelPrepCommand;
    __reflect(ModelPrepCommand.prototype, "game.ModelPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
