var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    function ObjectPool() {
    }
    /**生产*/
    ObjectPool.produce = function (cacheName, clazz) {
        if (!ObjectPool.cacheDict[cacheName]) {
            ObjectPool.cacheDict[cacheName] = [];
        }
        if (ObjectPool.cacheDict[cacheName].length > 0) {
            var one = ObjectPool.cacheDict[cacheName].shift();
            return one;
        }
        else {
            return null;
        }
    };
    /**回收*/
    ObjectPool.reclaim = function (cacheName, obj) {
        if (!ObjectPool.cacheDict[cacheName]) {
            ObjectPool.cacheDict[cacheName] = [];
        }
        if (ObjectPool.cacheDict[cacheName].length > 20) {
            obj = null;
            return;
        }
        ObjectPool.cacheDict[cacheName].push(obj);
    };
    /**
     * 对象池数量
     * @param  {} cacheName
     */
    ObjectPool.objectChildrenNum = function (cacheName) {
        return ObjectPool.cacheDict[cacheName].length;
    };
    /**
     * 注销对象池
     * @param  {} cacheName
     */
    ObjectPool.cancelPool = function (cacheName) {
        ObjectPool.cacheDict[cacheName] = null;
    };
    ObjectPool.cacheDict = {};
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
