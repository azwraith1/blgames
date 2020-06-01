module Owen {
	export class UtilsString {
		public constructor() {
		}
		public static isValidFloat(org: string) {
			let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
			return reg.test(org);
		}

		public static getType(type: number): string {
			switch (type) {
				case 5:
					return "退税";
				case 17:
					return "以小博大";
				case 0:
					return "桌费用";
				case 1:
					return "杠牌";
			}
		}
		/**弹窗弹出效果 */
		public static popAni(target: egret.DisplayObject) {
			target.scaleX = 0;
			target.scaleY = 0;
			target.alpha = 0;
			target.anchorOffsetX = target.width / 2;
			target.anchorOffsetY = target.height / 2;
			egret.Tween.get(target).to({ scalex: 1, scaley: 1 }, 250, egret.Ease.quadOut);
			egret.Tween.get(target).to({ alpha: 1 }, 200, egret.Ease.quadOut);
		}
		// BILL_TYPE: {
		//         TF: 0, //桌费用
		//         GANG: 1, //杠牌
		//         HU: 2, //胡牌
		//         PEI_JIAO: 3, //陪叫
		//         HUA_ZHU: 4, //花猪
		//         BACK_TAX: 5, //退税
		//         TRANSFER: 6, //呼叫转移
		//         ROUND_SETTLEMENT: 7, //牌局结算
		//         ROUND_BET: 8, //牌局投注
		//         GU_ZHU_YI_ZHI_BACK: 9, //孤注一掷返还
		//         SPECIAL_PATTERN_REWARD: 10, // (喜钱)当赢家牌型为特定牌型时，系统为额外为玩家加一定数量分数
		//         ROUND_SETTLEMENT_BACK: 11, // 结算返还
		//         SYNC: 12, // 金币同步
		//         BUY_MA: 13, //买马
		//         INSURANCE: 14,// 保险结算
		//         CATCH_BIRD: 15,// 抓鸟
		//         CATCH_CHICK: 16,// 捉鸡
		//         OVERLOAD_BACK: 17,// 以小博大
		//     },
		/**限制输入小数点后两位*/
		public static ForceTrim(org: string, len: number) {
			var substring = org.split('.', 2);
			if (substring.length < 1) {
				return org;
			}
			if (substring.length < 2) {
				return substring[0];
			}
			else {
				var frac = substring[1].substring(0, len);
				var fix = substring[0].toString();
				return fix + "." + frac;
			}
		}
		/**去掉空格*/
		public static ForceSpace(org: string) {
			var substring = org.split(" ");
			if (substring.length < 1) {
				return org;
			}
			let text = "";
			for (let i = 0; i < substring.length; ++i) {
				text = text + substring[i];
			}
			return text;
		}
		public static playDB(dbName: string, parent: egret.DisplayObjectContainer, count: number = 1, dispose: boolean = true, callBack: Function = null, thisObj: any = null): DBComponent {
			let CacheName: string = dbName + 1;
			let db: DBComponent = GameCacheManager.instance.getCache(CacheName);
			if (!db) {
				db = new DBComponent(dbName);
				GameCacheManager.instance.setCache(CacheName, db);
			}
			parent.addChild(db);
			db.playByFilename(count);
			db.callback = () => {
				if (callBack) callBack.call(thisObj, this);
				if (dispose) {
					game.UIUtils.removeSelf(db);
					db = null;
				}
			};
			return db;
		}
		public static createDBLoop(name: string = "jjc_zhuanzhou", parent: egret.DisplayObjectContainer) {
			let db = new DBComponent(name);
			let loopName = name + "_loop";
			db.playNamesAndLoop([name, loopName]);
			parent.addChild(db);
			return db;
		}
	}

	export class Utils {
		public constructor() {
		}
		public static whenHttpError(data: any) {
			console.log("HTTP ERROR : ", "error code==>:", data.code, "description==>:", data.description);
		}

		//math.parser().eval(a + "+" + b)
		/**
		 * 加法运算
		 * @param originalNum 原数
		 * @param addendNum 加数
		*/
		public static additionFun(originalNum: number, addendNum: number): number {
			let resultNum: number = 0;
			let s1 = 0;
			let s2 = 0;
			let m;
			let c;
			try {
				s1 = originalNum.toString().split(".")[1].length;
			}
			catch (e) { }
			try {
				s2 = addendNum.toString().split(".")[1].length;
			}
			catch (e) { }
			c = Math.abs(s1 - s2);
			m = Math.pow(10, Math.max(s1, s2));
			if (c > 0) {
				let cm = Math.pow(10, c);
				if (s1 > s2) {
					originalNum = Number(originalNum.toString().replace(".", ""));
					addendNum = Number(addendNum.toString().replace(".", "")) * cm;
				} else {
					originalNum = Number(originalNum.toString().replace(".", "")) * cm;
					addendNum = Number(addendNum.toString().replace(".", ""));
				}
			} else {
				originalNum = Number(originalNum.toString().replace(".", ""));
				addendNum = Number(addendNum.toString().replace(".", ""));
			}
			resultNum = (originalNum + addendNum) / m;
			return resultNum;
		}
		/**
		 * 减法运算
		 * @param originalNum 原数
		 * @param addendNum 减数
		*/
		public static subtractionFun(originalNum: number, subtractedNum: number): number {
			let resultNum: number = 0;
			let r1: number = 0;
			let r2: number = 0;
			let m: number = 0;
			let n: number = 0;
			try {
				r1 = originalNum.toString().split(".")[1].length;
			}
			catch (e) { }
			try {
				r2 = subtractedNum.toString().split(".")[1].length;
			}
			catch (e) { }
			m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度
			n = (r1 >= r2) ? r1 : r2;
			resultNum = Number(((originalNum * m - subtractedNum * m) / m).toFixed(n));
			return resultNum;
		}
		/**
		 * 乘法运算
		 * @param originalNum 原数
		 * @param addendNum 倍数
		*/
		public static multipleFun(originalNum: number, multipleNum: number): number {
			let resultNum: number = 0;
			let m = 0;
			let s1 = originalNum.toString();
			let s2 = multipleNum.toString();
			try {
				m += s1.split(".")[1].length
			} catch (e) { }
			try {
				m += s2.split(".")[1].length
			} catch (e) { }
			resultNum = (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m)
			return resultNum;
		}
		/**
		 * 除法运算
		 * @param originalNum 原数
		 * @param addendNum 除数
		*/
		public static divisorFun(originalNum: number, divisorNum: number): number {
			let resultNum = 0;
			let t1 = 0;
			let t2 = 0;
			let r1;
			let r2;
			try {
				t1 = originalNum.toString().split(".")[1].length
			} catch (e) { }
			try {
				t2 = divisorNum.toString().split(".")[1].length
			} catch (e) { }
			r1 = Number(originalNum.toString().replace(".", ""))
			r2 = Number(divisorNum.toString().replace(".", ""))
			resultNum = (r1 / r2) * Math.pow(10, t2 - t1);
			return resultNum;
		}
	}

}