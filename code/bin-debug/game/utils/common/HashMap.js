var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HashMap = (function () {
    function HashMap() {
        this.data = {};
    }
    HashMap.prototype.set = function (K, V) {
        this.data[K] = V;
    };
    HashMap.prototype.put = function (K, V) {
        this.set(K, V);
    };
    /**
     * 根据Key获得数据，可以传入默认值
     * @param K
     * @param V
     * @returns {any}
     */
    HashMap.prototype.get = function (K, V) {
        if (arguments.length == 1) {
            return this.data[K];
        }
        else {
            if (this.has(K)) {
                return this.data[K];
            }
            else {
                return V;
            }
        }
    };
    /**
     * 追加，但是V必须是number的时候才有效
     * @param K
     * @param V {number}
     */
    HashMap.prototype.add = function (K, V) {
        // if (V instanceof Number) {
        //     var num = this.get(K, 0) + V;
        //     this.put(K, num);
        // }
    };
    HashMap.prototype.has = function (K) {
        return this.data.hasOwnProperty(K);
    };
    HashMap.prototype.remove = function (K) {
        this.data[K] = undefined;
        delete this.data[K];
    };
    HashMap.prototype.clear = function () {
        this.data = {};
    };
    HashMap.prototype.keys = function () {
        var arr = [];
        for (var key in this.data) {
            arr.push(key);
        }
        return arr;
    };
    HashMap.prototype.values = function () {
        var arr = [];
        for (var key in this.data) {
            arr.push(this.data[key]);
        }
        return arr;
    };
    /**
     * 重新设置
     * @param obj
     */
    HashMap.prototype.reset = function (obj) {
        if (obj) {
            this.data = obj.data || obj;
        }
    };
    /**
     * 将toJSON后的str数据转化回来
     * @param str
     */
    HashMap.prototype.parse = function (str) {
        if (str) {
            var obj = JSON.parse(str);
            this.data = obj;
        }
    };
    HashMap.prototype.toString = function () {
        return JSON.stringify(this.data);
    };
    return HashMap;
}());
__reflect(HashMap.prototype, "HashMap");
