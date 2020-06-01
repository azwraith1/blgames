class ObjectPool {
	private static cacheDict: Object = {};
	/**生产*/
	public static produce(cacheName: string, clazz: any) {
		if (!ObjectPool.cacheDict[cacheName]) {
			ObjectPool.cacheDict[cacheName] = [];
		}
		if (ObjectPool.cacheDict[cacheName].length > 0) {
			let one = ObjectPool.cacheDict[cacheName].shift();
			return one;
		} else {
			return null;
		}
	}
	/**回收*/
	public static reclaim(cacheName: string, obj: any): void {
		if (!ObjectPool.cacheDict[cacheName]) {
			ObjectPool.cacheDict[cacheName] = [];
		}
		if (ObjectPool.cacheDict[cacheName].length > 20) {
			obj = null;
			return;
		}
		ObjectPool.cacheDict[cacheName].push(obj);
	}
	/**
	 * 对象池数量
	 * @param  {} cacheName
	 */
	public static objectChildrenNum(cacheName) {
		return ObjectPool.cacheDict[cacheName].length;
	}
	/**
	 * 注销对象池
	 * @param  {} cacheName
	 */
	public static cancelPool(cacheName) {
		ObjectPool.cacheDict[cacheName] = null;
	}

	
}