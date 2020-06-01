module niuniu {
	export class NiuniuAutoBar extends game.BaseUI {
		private qzGroup: eui.Group;
		//	private qzValue: number;
		private yzGroup: eui.Group;
		// private yzValue: number;
		private countGroup: eui.Group;
		private autoCount: number;
		private startBtn: eui.Button;
		public bt1_lable: eui.BitmapLabel;
		public bt3_lable: eui.BitmapLabel;
		public bt2_lable: eui.BitmapLabel;
		private btn0: eui.ToggleButton;
		private qzArr: Array<string> = [];
		private yzArr: Array<string> = [];


		public constructor() {
			super();
			this.skinName = "NiuniuAutoBarSkin";
		}
		private getSelcet(groupParent: eui.Group): boolean {
			let isClick: boolean = false;
			let qzBtn: any;
			for (let i = 0; i < groupParent.numChildren; ++i) {
				qzBtn = groupParent.getChildAt(i);
				if (qzBtn.selected) {
					isClick = true;
				}
			}
			return isClick;
		}
		private starBtnState() {
			let isQZ = this.getSelcet(this.qzGroup);
			let isYZ = this.getSelcet(this.yzGroup);
			let isCount = this.getSelcet(this.countGroup);
			if (isQZ && isYZ && isCount) {
				this.setStartBtnGray(false);
			}
			else {
				this.setStartBtnGray(true);
			}
		}
		/**
		 * 重置所有按钮得状态 
		 * */
		public resetState() {
			this.resetGroupState(this.qzGroup);
			this.resetGroupState(this.yzGroup);
			this.resetGroupState(this.countGroup);
			this.setStartBtnGray(true);
			this.bt1_lable.visible = false;
			this.bt2_lable.visible = false;
			this.bt3_lable.visible = false;
			this.qzArr = [];
			this.yzArr = [];
		}
		private setStartBtnGray(isGray: boolean) {
			game.UIUtils.setGray(this.startBtn, isGray);
			this.startBtn.touchEnabled = !isGray;
		}
		private rootScene: NiuniuSGameScene;
		public setRoot(root) {
			this.rootScene = root;
		}

		private resetGroupState(qz: eui.Group) {
			let qzBtn: any;
			for (let i = 0; i < qz.numChildren; ++i) {
				qzBtn = qz.getChildAt(i);
				qzBtn.selected = false;
			}
		}
		/**获取挂机得次数 */
		public get AutoCount() {
			return this.autoCount;
		}
		protected createChildren() {
			super.createChildren();
			let radioBtn: eui.RadioButton;
			for (let i = 0; i < this.countGroup.numChildren; ++i) {
				radioBtn = (this.countGroup.getChildAt(i) as eui.RadioButton);
				radioBtn.addEventListener(egret.Event.CHANGE, this.onChange, this)
			}
			let qzBtn: eui.ToggleButton;
			for (let i = 0; i < this.qzGroup.numChildren; ++i) {
				qzBtn = (this.qzGroup.getChildAt(i) as eui.ToggleButton);
				qzBtn.addEventListener(egret.Event.CHANGE, this.onQZChange, this)
			}
			for (let i = 0; i < this.yzGroup.numChildren; ++i) {
				qzBtn = (this.yzGroup.getChildAt(i) as eui.ToggleButton);
				qzBtn.addEventListener(egret.Event.CHANGE, this.onYZChange, this)
			}
		}
		protected onRemoved() {
			super.onRemoved();
			this.countGroup.removeEventListener(egret.Event.CHANGE, this.onChange, this);
			let qzBtn: eui.ToggleButton;
			for (let i = 0; i < this.qzGroup.numChildren; ++i) {
				qzBtn = (this.qzGroup.getChildAt(i) as eui.ToggleButton);
				qzBtn.removeEventListener(egret.Event.CHANGE, this.onQZChange, this)
			}
			for (let i = 0; i < this.yzGroup.numChildren; ++i) {
				qzBtn = (this.yzGroup.getChildAt(i) as eui.ToggleButton);
				qzBtn.removeEventListener(egret.Event.CHANGE, this.onYZChange, this)
			}
		}
		private onYZChange(e: egret.TouchEvent) {
			let btn: eui.ToggleButton = e.target;
			if (btn.selected) {
				this.addArrayItem(this.yzArr, btn.name)
			}
			else {
				game.Utils.removeArrayItem(this.yzArr, btn.name);
			}
			this.starBtnState();
		}
		protected onTouchTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this.startBtn:
					this.onClickStartBtn();
					break;
			}
		}
		private onClickStartBtn() {
			NiuniuGuaJiConfig.Instance.setRemainCount(this.autoCount);
			NiuniuGuaJiConfig.Instance.setQZArr(this.qzArr);
			NiuniuGuaJiConfig.Instance.setYZArr(this.yzArr);
			LogUtils.logD("======旋转次数=====" + this.autoCount);
			CF.dP(ENo.NIUNIU_GUAJI, true);
			this.visible = false;
			this.rootScene.rectMask.visible = false;
		}
		public addArrayItem(arr: Array<any>, item: any) {
			var index = arr.indexOf(item);
			if (index < 0) {
				arr.push(item);
			}
		}
		private onQZChange(e: egret.Event) {
			let btn: eui.ToggleButton = e.target;
			if (!btn.selected) {
				game.Utils.removeArrayItem(this.qzArr, btn.name);
				if (btn.name == "1") {
					this.bt1_lable.visible = false;
				}
				else if (btn.name == "2") {
					this.bt2_lable.visible = false;
				}
				else if (btn.name == "3") {
					this.bt3_lable.visible = false;
				}
			}
			else {
				this.addArrayItem(this.qzArr, btn.name);
				if (btn.name == "1") {
					this.bt1_lable.visible = true;
				}
				else if (btn.name == "2") {
					this.bt2_lable.visible = true;
				}
				else if (btn.name == "3") {
					this.bt3_lable.visible = true;
				}
			}
			this.starBtnState();
		}
		private onChange(e: egret.Event) {
			var radioButton = <eui.RadioButton>e.target;
			this.autoCount = radioButton.value;
			this.starBtnState();
		}
	}
}