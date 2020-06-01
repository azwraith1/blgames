class Const {
	//最后几分钟提示
	public static LAST_TIME_RACE: number = 5 * 60 * 1000;
}

/**
 * 常用方法
 */
class CF {
	/**
	 * 获取语言png后缀
	 */
	public static get tic() {
		return TextUtils.instance.currentPngStr;
	}

	/**
	 * 获取语言jpg后缀
	 */
	public static get tij() {
		return TextUtils.instance.currentJPGStr;
	}

	/**
	 * 获取皮肤文件后缀
	 */
	public static get tis() {
		return TextUtils.instance.currentSkinStr;
	}

	/**
	 * 获取龙骨动画后缀后缀
	 */
	public static get tiAni() {
		return TextUtils.instance.currentAniStr;
	}

	/**
	 * 发送命令
	 */
	public static sN(notify: string, data?) {
		game.AppFacade.getInstance().sendNotification(notify, data);
	}

	/**
	 * 添加监听
	 */
	public static aE(type: string, callback: Function, targetObject) {
		EventManager.instance.addEvent(type, callback, targetObject);
	}

	/**
	 * 移除监听
	 */
	public static rE(type: string, callback: Function, targetObject) {
		EventManager.instance.removeEvent(type, callback, targetObject);
	}

	/**
	 * 发出监听事件
	 */
	public static dP(type: string, data?: any) {
		EventManager.instance.dispatch(type, data);
	}

	/**
	 * 根据id获取国际化文本值
	 */
	public static tigc(id: number) {
		return TextUtils.instance.getCurrentTextById(id);
	}
}