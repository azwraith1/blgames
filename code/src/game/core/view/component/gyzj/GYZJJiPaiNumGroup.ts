module majiang {
	export class GYZJJiPaiNumGroup extends game.BaseComponent{
		public mineGroup: eui.Group;
		public leftGroup: eui.Group;
		public topGroup: eui.Group;
		public rightGroup: eui.Group;

		public mineJiaoZui: eui.Image;
		public leftJiaoZui: eui.Image;
		public rightJiaoZui: eui.Image;
		public topJiaoZui: eui.Image;
		public jixuBtn: eui.Button;
		private onclickJiXu: Function;
		private thisObj: any;
		private isShaoji: boolean = false;
		public constructor() {
			super();
			this.skinName = "resource/skins/scene/gyzj/GYZJJiPaiNumGroupSkin.exml";
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		private removeGroupChidren() {
			this.mineGroup.removeChildren();
			this.leftGroup.removeChildren();
			this.rightGroup.removeChildren();
			this.topGroup.removeChildren();
		}
		protected createChildren() {
			super.createChildren();
			this.removeGroupChidren();
			this.jixuBtn.alpha = 0;
			this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchJiXu, this);
		}
		private onTouchJiXu() {
			CF.dP(ENo.GYZJ_ONCLICKJIXU);
		}
		/**创建鸡牌*/
		public createJiPai(chickCardInfo: any, direction: string, jiaozui: boolean, iswin: boolean = false) {
			var currentGroup: eui.Group = (this[direction + "Group"] as eui.Group);
			if (currentGroup.numChildren > 0) currentGroup.removeChildren();
			var _haveShaoJi: boolean = this.haveShaoji(chickCardInfo);
			this.setJiaoZuiFlag(direction, jiaozui, iswin, chickCardInfo, jiaozui, _haveShaoJi);
		}
		/**设置叫嘴的标识 */
		private setJiaoZuiFlag(direction: string, isJiaoZui: boolean, isWin: boolean = false, chickCardInfo: any, jiaozui: boolean, isShaoJi: boolean) {
			var jiaozuiImg: eui.Image = this[direction + "JiaoZui"];
			var resName: string;
			if (isWin) {
				resName = "gyzj_over_hu_png";
			}
			else {
				if (isJiaoZui) {
					resName = "gyzj_over_jiao_png";
				}
				else {
					resName = "gyzj_over_weij_png";
				}
			}
			if (isShaoJi) {
				resName = "gyzj_over_shaoji_png";
			}
			jiaozuiImg.source = RES.getRes(resName);
			jiaozuiImg.scaleX = 1.3;
			jiaozuiImg.scaleY = 1.3;
			jiaozuiImg.anchorOffsetX = jiaozuiImg.width / 2;
			jiaozuiImg.anchorOffsetY = jiaozuiImg.height / 2;
			egret.Tween.get(jiaozuiImg).to({ scaleX: 0.7, scaleY: 0.7 }, 500, egret.Ease.bounceOut).wait(300).call(
				() => {
					egret.Tween.get(this.jixuBtn).to({ alpha: 1 }, 500);

					this.showChickCard(chickCardInfo, jiaozui, direction, isWin);
				}, this
			)
		}

		private showChickCard(chickCardInfo, jiaozui, direction, iswin) {
			var item: ChickCardInfo;
			var jipai: GYZJJiPai;
			var data: any = this.chuliShuJu(chickCardInfo);
			for (var key in data) {
				item = data[key];
				jipai = new GYZJJiPai(item.cardVale, item.num, jiaozui, item.isChongFeng);
				jipai.setFont(jiaozui || iswin);
				this[direction + "Group"].addChild(jipai);
			}
		}
		private haveShaoji(chickCardInfo): boolean {
			var haveshaoJi: boolean = false;
			for (var key in chickCardInfo) {
				let _data = chickCardInfo[key];
				if (JSON.stringify(_data) === '{}') {
					continue;
				}
				for (var key in _data) {
					let singleData = _data[key];
					if (JSON.stringify(singleData) === '{}') {
						continue;
					}
					if (singleData.type == 7) {
						haveshaoJi = true;
					}
				}
			}
			return haveshaoJi;
		}
		private chuliShuJu(chickCardInfo): any {
			var _chickendata: Array<ChickCardInfo> = [];
			var _singleItem: ChickCardInfo;
			var obj: any = {};
			for (var key in chickCardInfo) {
				let _data = chickCardInfo[key];
				if (key == "general") {
					for (var key in _data) {
						let _singleData = _data[key];
						if (JSON.stringify(_singleData) === '{}') {
							continue;
						}
						_singleItem = new ChickCardInfo(Number(key), Number(_singleData.num), false);
						obj[key] = _singleItem;
					}
				}
				else if (key == "special") {
					if (JSON.stringify(_data) === '{}') {
						continue;
					}
					for (var key in _data) {
						let _singleData = _data[key];
						if (JSON.stringify(_singleData) === '{}') {
							continue;
						}
						if (obj[key]) {
							(obj[key] as ChickCardInfo).num += 1;
						}
						else {
							_singleItem = new ChickCardInfo(Number(key), Number(_singleData.num), false);
							obj[key] = _singleItem;
						}
						if (_singleData.type == 1) {
							(obj[key] as ChickCardInfo).isChongFeng = true;
						}
					}
				}
			}
			return obj;
		}
	}
	class ChickCardInfo {
		public cardVale: number;
		public num: number;
		public isChongFeng: boolean;
		public constructor(_cardVal: number, _num: number, _ischong: boolean) {
			this.cardVale = _cardVal;
			this.num = _num;
			this.isChongFeng = _ischong;
		}
	}
}