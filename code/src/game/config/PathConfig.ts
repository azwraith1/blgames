/*
 * @Author: li mengchan 
 * @Date: 2018-09-11 10:57:15 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-17 11:44:13
 * @Description: 
 */
enum PathTypeEnum {
	//192.168.2.98
	NEI_TEST1,
	//192.168.2.188
	NEI_TEST,
	//192.168.2.100
	NEI_TEST3,
	//外网测试 35.221.192.46
	WAI_TEST,

	//外网正式 
	WAI_PRODUCT,
	//QA专用测试
	QA_TEST,
	//预发布服务器
	PUBLISH_TEST,
	//国际外网测试服
	INTDEMO_TEST,
	//国内外测试服
	DEMO_TEST,

	ZIDINGYI,
	NEI_TEST2
}

class PathConfig {
	//http 或者 https
	public httpPath: string = "";

	public socketPath: string = "";
	//是否使用oss
	public use_oss: boolean = false;
	//oss地址
	public oss_path: string;
	//日志等级
	public log_level: number;
	public json_path: string;

	public debug_model: boolean = false;

	public token_login: boolean = false;

	public serverVersion;
}

class PathConfigFac {
	public static getPathByType(type: number): PathConfig {
		let pathConfig = new PathConfig();
		pathConfig.log_level = 2;
		switch (type) {
			case PathTypeEnum.NEI_TEST2:
				pathConfig.httpPath = "http://192.168.3.101:3002";
				pathConfig.use_oss = false;
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.debug_model = true;
				Const.LAST_TIME_RACE = 800 * 60 * 1000;
				break;
			case PathTypeEnum.NEI_TEST1:
				pathConfig.httpPath = "http://192.168.3.234:3002";
				pathConfig.use_oss = false;
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.debug_model = true;
				break;
			case PathTypeEnum.NEI_TEST:
				pathConfig.httpPath = "http://192.168.3.188:3002"//188
				pathConfig.use_oss = false;
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.debug_model = false;
				Const.LAST_TIME_RACE = 5 * 60 * 1000;
				break;
			case PathTypeEnum.NEI_TEST3:
				pathConfig.httpPath = "http://192.168.2.100:3002";
				pathConfig.use_oss = false;
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.debug_model = false;
				break;
			case PathTypeEnum.WAI_PRODUCT:
				pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
				pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
				pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
				pathConfig.log_level = LogUtils.INFO;
				pathConfig.debug_model = false;
				pathConfig.token_login = true;
				return pathConfig;
			//国外测试服
			case PathTypeEnum.INTDEMO_TEST:
				pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
				pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
				pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
				pathConfig.log_level = LogUtils.INFO;
				pathConfig.debug_model = false;
				break;
			//国内测试服
			case PathTypeEnum.DEMO_TEST:
				pathConfig.httpPath = "https://demo-game.qiweise.com";
				pathConfig.log_level = LogUtils.INFO;
				pathConfig.debug_model = false;
				break;
			//QA测试测试服	
			case PathTypeEnum.QA_TEST:
				pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
				pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
				pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
				pathConfig.debug_model = false;
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.token_login = true;
				break;
			//预发布服务器	
			case PathTypeEnum.PUBLISH_TEST:
				pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
				pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
				pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
				pathConfig.log_level = LogUtils.INFO;
				pathConfig.debug_model = false;
				pathConfig.token_login = true;
				break;
			case PathTypeEnum.ZIDINGYI:
				pathConfig.log_level = LogUtils.DEBUG;
				pathConfig.debug_model = true;
				break
		}
		let windowHerf = window.location.href;
		if (windowHerf.indexOf("127.0.0.1") > -1 || windowHerf.indexOf("192.168") > -1) {
			pathConfig.log_level = LogUtils.DEBUG;
			pathConfig.debug_model = true;
		}
		return pathConfig;
	}

}