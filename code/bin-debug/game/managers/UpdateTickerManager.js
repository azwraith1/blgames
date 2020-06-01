var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var UpdateTickerManager = (function () {
        function UpdateTickerManager() {
            this.allUpdateObjArr = [];
        }
        Object.defineProperty(UpdateTickerManager, "instance", {
            get: function () {
                if (!UpdateTickerManager._instance) {
                    UpdateTickerManager._instance = new UpdateTickerManager();
                }
                return UpdateTickerManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UpdateTickerManager, "onesec", {
            get: function () {
                if (!UpdateTickerManager._onesec) {
                    UpdateTickerManager._onesec = new UpdateTickerManager();
                }
                return UpdateTickerManager._onesec;
            },
            enumerable: true,
            configurable: true
        });
        UpdateTickerManager.prototype.add = function (target) {
            if (!game.Utils.isElinArr(target, this.allUpdateObjArr)) {
                this.allUpdateObjArr.push(target);
            }
        };
        UpdateTickerManager.prototype.remove = function (target) {
            var len = this.allUpdateObjArr.length;
            for (var i = 0; i < len; i++) {
                if (target == this.allUpdateObjArr[i]) {
                    this.allUpdateObjArr.splice(i, 1);
                }
            }
        };
        UpdateTickerManager.prototype.update = function (dt) {
            for (var i = 0; i < this.allUpdateObjArr.length; i++) {
                this.allUpdateObjArr[i].update(dt);
            }
        };
        return UpdateTickerManager;
    }());
    game.UpdateTickerManager = UpdateTickerManager;
    __reflect(UpdateTickerManager.prototype, "game.UpdateTickerManager");
})(game || (game = {}));
