var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-08-23 13:54:56
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-06-19 20:07:39
 * @Description: 游戏缓存服务
 */
var GameCacheManager = (function () {
    function GameCacheManager() {
        this._cache = new HashMap();
        if (GameCacheManager._instance) {
            throw new Error("DateTimer使用单例");
        }
    }
    Object.defineProperty(GameCacheManager, "instance", {
        get: function () {
            if (!GameCacheManager._instance) {
                GameCacheManager._instance = new GameCacheManager();
            }
            return GameCacheManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从缓存中拿取东西
     * @param  {} name
     */
    GameCacheManager.prototype.getCache = function (name, clazz) {
        if (clazz === void 0) { clazz = null; }
        var cacheObj = this._cache.get(name);
        if (!cacheObj && clazz) {
            cacheObj = new clazz();
            this._cache.put(name, cacheObj);
            // L.logD("新建 " + name);
        }
        else {
            // L.logD("复用 " + name);
        }
        return cacheObj;
    };
    GameCacheManager.prototype.getMcCache = function (effectName, cacheName, callback) {
        var _this = this;
        return game.MCUtils.getMc(effectName, function (mv) {
            if (mv) {
                // console.error(cacheName  + "  新建");
                _this._cache.put(cacheName, mv);
                callback && callback(mv);
                return mv;
            }
        });
    };
    GameCacheManager.prototype.setCache = function (name, cacheObj) {
        if (this._cache.has[name]) {
            this._cache[name] = cacheObj;
        }
        else {
            this._cache.put(name, cacheObj);
        }
    };
    GameCacheManager.prototype.removeCache = function () {
        this._cache.clear();
        this._cache = new HashMap();
    };
    GameCacheManager.prototype.clearCache = function (name) {
        this._cache.remove(name);
    };
    return GameCacheManager;
}());
__reflect(GameCacheManager.prototype, "GameCacheManager");
