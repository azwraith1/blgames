class FrameUtils {
	public static isError: boolean = false;
	public static topFrame: string = "http://192.168.2.5:9023";
	public static iframeIsOk: boolean = false;

	public static iframeload() {
		var isOk = true;
		if (window.parent) {
			try {
				window.parent['checkSafiraStart']//如果跨域就报错
			}
			catch (e) {
				console.log("关闭上滑全屏");
				isOk = false;
			}
		}
		this.iframeIsOk = isOk;
	}

	public static postMessage(msg) {
		if (!FrameUtils.iframeIsOk) {
			return;
		}
		if (!window.parent) {
			return;
		}
		if (FrameUtils.isError) {
			return;
		}

		// if(GameConfig.CURRENT_ISSHU){
		// 	return;
		// }
		try {
			if (window.parent && window.parent['showTips']) {
				window.parent['showTips'](msg);
				return;
			}
		} catch (e) {
			FrameUtils.isError = true;
		}
	}

	public static checkSafariStart() {
		if (!FrameUtils.iframeIsOk) {
			return;
		}
		if (FrameUtils.isError) {
			return;
		}
		try {
			if (window.parent && window.parent['checkSafiraStart']) {
				window.parent['checkSafiraStart']();
				return true;
			}
			return false;
		} catch (e) {
			FrameUtils.isError = true;
			return false;
		}
	}

	public static showTips(msg) {
		if (!FrameUtils.iframeIsOk) {
			return;
		}
		if (FrameUtils.isError) {
			return;
		}
		try {
			if (window.parent && window.parent['showTips']) {
				window.parent['showTips'](msg);
				return true;
			}
			return false;
		} catch (e) {
			FrameUtils.isError = true;
			return false;
		}
	}

	public static tipsToggle() {
		if (!FrameUtils.iframeIsOk) {
			return;
		}
		if (FrameUtils.isError) {
			return;
		}
		try {
			if (window.parent && window.parent['toggle']) {
				window.parent['toggle']();
				return true;
			}
			return false;
		} catch (e) {
			FrameUtils.isError = true;
			return false;
		}
	}


	public static iphoneXScreen(width, height) {
		if (width == 1280 && (height >= 735 && height <= 780)) {
			this.showTips(0);
		} else if (width == 1436 && height == 720) {
			this.showTips(1);
		} else if (width == 1468 && height == 720) {
			this.showTips(1);
		} else if (width == 1594 && height == 720) {
			this.showTips(0);
		} else if ((width >= 1630 && width <= 1740) && height == 720) {
			this.showTips(0);
		}
		else if ((width >= 1570 && width <= 1630) && height == 720) {
			this.showTips(0);
		} else {
			this.showTips(1);
		}
	}


	public static flushWindow() {
		// if (FrameUtils.isError) {
		// 	return;
		// }
		if (window.parent) {
			window.location.reload();
			// window.parent.location.href = window.parent.location.href;
		} else {
			window.location.reload();
		}

	}

	public static goRecharge() {
		if (ServerConfig.RECHARGE_URL && ServerConfig.RECHARGE_URL != "null") {
			Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(72), () => {
				window.open(ServerConfig.RECHARGE_URL);
			}, null);
		}
	}

	public static goHome() {
		if (ServerConfig.HOME_PAGE_URL && ServerConfig.HOME_PAGE_URL != "null") {
			Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(73), () => {
				window.open(ServerConfig.HOME_PAGE_URL);
			}, null);
		}
	}

	private static resetZise;
	public static eventResize() {
		GameConfig.WINSIZE_WIDTH = GameConfig.curStage().stageWidth;
		GameConfig.WINSIZE_HEIGHT = GameConfig.curStage().stageHeight;
		var beforeData = { wBili: GameConfig.WINSIZE_BILI_WIDTH, hBili: GameConfig.WINSIZE_BILI_HEIGHT };
		GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
		GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
		CF.dP(ENo.EVENT_RESIZE, beforeData);
		if (this.resetZise) {
			egret.clearTimeout(this.resetZise);
			this.resetZise = null;
		}
		this.resetZise = egret.setTimeout(() => {
			GameConfig.CURRENT_WIDTH = GameConfig.curStage().stageWidth;
			GameConfig.CURRENT_HEIGHT = GameConfig.curStage().stageHeight;
			this.resetZise = null;
		}, this, 500);

	}

	public static changeBgImage(image) {
		if (NativeApi.instance.IsPC) {
			if (image) {
				document.getElementById("bgDiv").style.cssText = `background:url(${image}) no-repeat scroll center center/cover rgba(0, 0, 0, .1);`;
				document.getElementById("bgDiv").style.display = "";
				// 
			} else {
				document.getElementById("bgDiv").style.cssText = "";
				document.getElementById("bgDiv").style.display = "none";
			}
		}
	}
}