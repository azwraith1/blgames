/*
 * @Author: li mengchan 
 * @Date: 2018-10-18 15:26:45 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-02 15:39:28
 * @Description: text文本国际化处理
 */
class TextUtils {
	private static _instance: TextUtils;
	public static get instance(): TextUtils {
		if (!TextUtils._instance) {
			TextUtils._instance = new TextUtils();
			TextUtils._instance.languageData = RES.getRes(`language_json`);
		}
		return TextUtils._instance;
	}

	public constructor() {
		if (TextUtils._instance) {
			throw new Error("TextUtils使用单例");
		}
	}
	public currentLanguage = "zh_cn";
	public currentSkinStr = "";
	public currentPngStr = "_png";
	public currentAniStr = "";
	public currentJPGStr = "_jpg";
	private languageData;
	public changeLanguage(language) {
		this.currentLanguage = language;
		if (language == "ko_kr") {
			this.currentSkinStr = "KR";
			this.currentAniStr = "_kr";
			this.currentPngStr = "_kr_png";
			this.currentJPGStr = "_kr_jpg";
		}
		if (language == "vi_vn") {
			this.currentSkinStr = "VN";
			this.currentAniStr = "_vn";
			this.currentPngStr = "_vn_png"
			this.currentJPGStr = "_vn_jpg";
		}
	}

	public isChinese(){
		return this.currentLanguage == "zh_cn"	;
	}

	public changeImage(p: eui.Image) {
		let source = p.source;
		if (source && typeof (source) == "string") {
			source = source.replace("_png", this.currentPngStr);
		}
		p.source = source;
	}

	public getCurrentTextById(id) {
		let languageJson = this.languageData[id];
		if (!languageJson) {
			return "load-" + id + "-fail";
		}
		let sureText = languageJson[this.currentLanguage];
		return sureText;
	}

	/**
	 * jsonData = {
	 * 	 "1": text1,
	 * 	 "2": text2,
	 *   "3": text3
	 * }
	 * 给数据设置最大支持3
	 */
	public setTextById(id, jsonData) {
		let sureText = this.getCurrentTextById(id) as string;
		if (!jsonData) {
			return sureText;
		}
		let languageJson = this.languageData[id];
		for (let i = 1; i <= 3; i++) {
			let data = jsonData[i];
			if (!data) {
				return sureText;
			}
			sureText = sureText.replace("${" + i + "}", data);
		}
		return sureText;
	}


	public async languageInter(p) {
		if (!TextUtils._instance.languageData) {
			await RES.loadGroup("preload");
			TextUtils._instance.languageData = RES.getRes(`language_json`);
		}
		if (!p) return;
		if (egret.is(p, egret.getQualifiedClassName(egret.TextField)) || egret.is(p, egret.getQualifiedClassName(eui.Label))) {
			let text = (p as egret.TextField).text;
			if (text.indexOf("lan:") > -1) {
				let textArr = text.split("lan:");
				let contentArr = textArr[1].split("||");
				let id = contentArr[0];
				let languageJson = this.languageData[id];
				if (!languageJson || !languageJson[this.currentLanguage]) {
					p.text = "load-" + id + "-fail";
				} else {
					let sureText = languageJson[this.currentLanguage];
					if (contentArr[1]) {
						p.text = sureText + contentArr[1]
					} else {
						p.text = sureText;
					}
				}
			}
		} else {
			var len = p.numChildren;
			for (var i = 0; i < len; i++) {
				var ch: egret.DisplayObjectContainer = <egret.DisplayObjectContainer>p.getChildAt(i);
				this.languageInter(ch);
			}
		}
	}


	/**
	 * 改变button图片
	 */
	public static cBtnRes(button: eui.Button, reouceName: string) {
		let icon = button.icon as any;
		if (icon && icon.source) {
			icon.source = RES.getRes(reouceName + TextUtils.instance.currentPngStr);
		}
	}
}