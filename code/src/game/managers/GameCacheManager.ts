/*
 * @Author: li mengchan 
 * @Date: 2018-08-23 13:54:56 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-06-19 20:07:39
 * @Description: 游戏缓存服务
 */
class GameCacheManager {
	private static _instance: GameCacheManager;
	private _cache: HashMap<string, any> = new HashMap<string, any>();
	public constructor() {
		if (GameCacheManager._instance) {
			throw new Error("DateTimer使用单例");
		}
	}

	public static get instance(): GameCacheManager {
		if (!GameCacheManager._instance) {
			GameCacheManager._instance = new GameCacheManager();
		}
		return GameCacheManager._instance;
	}

	/**
	 * 从缓存中拿取东西
	 * @param  {} name
	 */
	public getCache(name, clazz = null) {
		let cacheObj = this._cache.get(name);
		if (!cacheObj && clazz) {
			cacheObj = new clazz();
			this._cache.put(name, cacheObj);
			// L.logD("新建 " + name);
		} else {
			// L.logD("复用 " + name);
		}
		return cacheObj;
	}


	public getMcCache(effectName, cacheName, callback) {

		return game.MCUtils.getMc(effectName, (mv: egret.MovieClip) => {
			if (mv) {
				// console.error(cacheName  + "  新建");
				this._cache.put(cacheName, mv);
				callback && callback(mv);
				return mv;
			}
		});
	}

	public setCache(name, cacheObj) {
		if (this._cache.has[name]) {
			this._cache[name] = cacheObj;
		} else {
			this._cache.put(name, cacheObj);
		}
	}

	public removeCache() {
		this._cache.clear();
		this._cache = new HashMap<string, any>();
	}


	public clearCache(name){
		this._cache.remove(name);
	}
}