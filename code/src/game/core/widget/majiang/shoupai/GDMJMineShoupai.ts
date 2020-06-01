/*
 * @Author: Li MengChan 
 * @Date: 2018-06-28 10:10:59 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-02 11:45:04
 * @Description: 面向玩家手牌
 */
module majiang {
	export class GDMJMineShoupai extends game.BaseUI {
		//麻将存储数据格式
		public value: number = 0;
		public bgImage: eui.Image;
		private colorImage: eui.Image;
		public selected: boolean = false;
		public lock: boolean = false;
		public maskRect: eui.Rect;
		private maskRect1: eui.Rect;
		private touchHeight: number = 30;
		public huTip: eui.Image;
		private index: number;
		private tingLock: boolean = false;
		protected otherImage: eui.Image;
		public constructor(value) {
			super();
			this.value = value;
			this.skinName = new majiang.GDMJMineShoupaiSkin();
		}
		public createChildren() {
			super.createChildren();
			this.touchEnabled = true;
			this.touchHeight = 30;
			this.initWithData(this.value);
			this.maskRect.mask = this.bgImage;
		}

		public onRemoved() {
			super.onRemoved();
			this.removeTouch();
		}

		public addTouch() {
			if (this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
				return;
			}
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
		}

		public checkIsLaizi() {
			this.showOtherImage(this.value);
		}

		public removeTouch() {
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTap1, this);
		}

		public setPosition(pos) {
			this.index = pos;
		}

		public showOtherImage(value) {
			let roomInfo = Global.gameProxy.roomInfo;
			if (roomInfo) {
				if (roomInfo.baoCards && roomInfo.baoCards.length > 0) {
					this.otherImage.visible = Global.gameProxy.roomInfo.baoCards[0] == value;
					return;
				}
				if (roomInfo.gameId == "hbmj") {
					for (let key in roomInfo.players) {
						if (!Global.gameProxy.checkIndexIsMe(key)) {
							let playerData = roomInfo.players[key];
							let huCards = playerData.canHuCards;
							if (huCards && huCards.length > 0) {
								for (let i = 0; i < huCards.length; i++) {
									if (value == huCards[i].card) {
										this.showPaoImage();
										return;
									}
								}
							}
						}
					}
					this.otherImage.visible = false;
				}
			}
		}

		public showPaoImage() {
			this.otherImage.source = RES.getRes("hbmj_game_pao_png");
			this.otherImage.x = 41;
			this.otherImage.visible = true;

		}

		public isSelect() {
			if (this.y == this.touchHeight && this.selected) {
				return true;
			}
			return false;
		}

		public showLaiziImage() {
			this.otherImage.visible = true;
		}


		public hideLaiziImage() {
			this.otherImage.visible = false;
		}

		public showHuImage() {
			this.otherImage.source = RES.getRes(`gdmj_tip_hu_png`);
			this.otherImage.x = 0;
			this.otherImage.visible = true;
		}

		/**
		 * 根据自己传入的显示
		 */
		public showOtherImageByRes(sourceName) {
			this.otherImage.source = RES.getRes(sourceName);
			this.otherImage.visible = true;
		}

		public initWithData(value) {
			if (value <= 0) {
				this.visible = false;
			}
			this.showOtherImage(value);
			this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
		}

		public resetValue(value) {
			this.value = value;
			this.otherImage.visible = false;
			if (this.value <= 0) {
				this.colorImage.source = "";
			} else {
				this.showOtherImage(value);
				this.colorImage.source = RES.getRes("color_value_" + this.value + "_png");
			}
		}

		public onTouchTap1(e: egret.TouchEvent) {
			majiang.MajiangUtils.playClick();
			if (this.lock) {
				return;
			}
			this.touchOn();
		}

		public touchOn() {
			CF.dP(ENo.SHOUPAI_TOUCH, this);
		}

		public selectUp() {
			this.y = this.touchHeight;
			this.selected = true;
		}

		public selectDown() {
			this.y = this.anchorOffsetY;
			this.selected = false;
		}

		/**
		 * 如果选中就放下 ，否者就升起
		 */
		public selectTouch() {
			if (!this.selected) {
				this.y = this.touchHeight;
				this.selected = true;
			} else {
				this.y = this.anchorOffsetY;
				this.selected = false;
			}
			return this.selected;
		}

		public change2NoSelect() {
			this.y = this.anchorOffsetY;
			this.selected = false;
		}

		/**
		 * 做一个简单地下降动画
		 */
		public showDownAni() {
			this.lock = true;
			this.y = 0;
			egret.Tween.get(this).to({
				y: this.anchorOffsetY
			}, 300).call(() => {
				this.lock = false;
			});
		}

		/**
		 * 显示遮罩层
		 * @param  {} isVisible
		 */
		public setLihight(isVisible: boolean) {
			this.maskRect.visible = isVisible;
		}

		public colorIsLight(color) {
			if (this.lock) {
				return;
			}
			if (this.tingLock) {
				return;
			}
			let mjColor = Math.floor(this.value / 10);
			this.setLihight(game.Utils.valueEqual(color, mjColor));
		}

		public huLight() {
			this.maskRect.visible = true;
			this.lock = true;
			this.touchEnabled = false;
		}

		public tingLight() {
			this.tingLock = true;
			// this.touchEnabled = false;
			this.maskRect.visible = true;
			this.change2NoSelect();
		}

		public huUnLight() {
			this.maskRect.visible = false;
			this.lock = false;
			this.touchEnabled = true;
		}


		public addBirdImage() {
			let image = new eui.Image("hnmj_icon_bird1_png");
			this.addChild(image);
			image.width = 77;
			image.height = 26;
			image.x = 1;
			image.y = 85;
		}
	}
}