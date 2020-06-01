class BJLPokerMiPai extends bjle.BJLPoker {
	public isZhuang: number;
	// public mipaiAni: egret.tween.TweenGroup;
	public id: number=null;
	private mipaiGroup: eui.Group;
	/**正面的最大值 */
	private maxZhengY: number=null;
	/**点击的面板 */
	private touchRec: eui.Rect;
	/**纠正正面和鼠标按下的偏差 */
	private delat=null;
	/**鼠标开始按下的Y值 */
	private mouseStartPosY: number=null;
	/**遮罩初始化时的Y值 */
	private maskStartPosY: number=null;
	/**正面反转完成后 遮罩的Y值*/
	private maskZhengEndY: number=null;
	/**鼠标按下与正面牌的距离 */
	private distanceY: number=null;
	private preZhengGroupY: number=null;
	private min: number = 0;
	public constructor() {
		super();
		this.touchEnabled = true;
		this.touchChildren = true;
		this.skinName = new BJLCardSkinMiPaiSkin();
	}

	public createChildren() {
		super.createChildren();
		this.delat = this.touchRec.y;
		this.maskStartPosY = this.mask.y;
		this.maxZhengY = this.zhengGroup.y;
		this.maskZhengEndY = this.maskStartPosY + 20;
		this.reseatPos();
		this.touchRec.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.touchRec.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}
	public reseatPos() {
		this.zhengGroup.y = this.maxZhengY;
		this.mask.y = this.maskStartPosY;
		this.beiImage.visible = true;
		this.zhengGroup.visible = true;
		this.valueLabel.alpha = 0;
		this.valueLabel.visible = true;
		this.touchRec.touchEnabled = true;
		this.smallColorImg.alpha = 0;
		this.smallColorImg.visible = true;
	}
	public removeLisen() {
		this.touchRec.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.touchRec.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}
	private onTouchBegin(evt: egret.TouchEvent) {
		this.mouseStartPosY = evt.localY;
		this.distanceY = evt.localY - this.zhengGroup.y + this.delat;
	//	LogUtils.logD("onTouchBegin evt.localY:" + evt.localY + "this.zhengGroup.y:" + this.zhengGroup.y + "this.delat" + this.delat + "distanceY：" + this.distanceY);
	}
	private onTouchMove(evt: egret.TouchEvent) {

		if (!this.distanceY) this.distanceY = evt.localY - this.zhengGroup.y + this.delat;
		let _y = evt.localY - this.distanceY + this.delat;
	//	LogUtils.logD("==onTouchMove=" + "evt.localY:" + evt.localY + "this.distanceY:" + this.distanceY + "this.delat:" + this.delat);
		let deltaDis = evt.localY - this.mouseStartPosY;
		let zhengStartPosY = this.zhengGroup.y;
		if (_y <= 0) {
			this.touchRec.touchEnabled = false;
			this.zhengGroup.y = 0;
			egret.Tween.get(this.mask).to({ y: this.maskZhengEndY }, 400).call(() => {
				egret.Tween.get(this.valueLabel).to({ alpha: 1 }, 200);
				egret.Tween.get(this.smallColorImg).to({ alpha: 1 }, 200).call(() => {
				//	LogUtils.logD("====你好====我在翻牌===");
					CF.dP(ENo.BJL_FANPAI, { isZhuang: this.isZhuang, id: this.id });
				}, this);
			});
		}
		else if (_y >= this.maxZhengY) {
			this.zhengGroup.y = this.maxZhengY;
		}
		else {
			this.zhengGroup.y = _y;
		}
		let currentY = this.zhengGroup.y;
		let delat = currentY - zhengStartPosY;
		this.mask.y += delat * 0.5;
		// LogUtils.logD("====onTouchMove zhenggroup==" + this.zhengGroup.y);
		// LogUtils.logD("=======onTouchMove this.mask.y==" + this.mask.y);

	}
	private onTouchEnd(evt: egret.TouchEvent) {
		var vars: any = {
			onChange: function (): void {
				let test = this.preZhengGroupY;
				let delat = this.zhengGroup.y - this.preZhengGroupY;
				this.preZhengGroupY = this.zhengGroup.y;
				let maskY = this.mask.y + delat * 0.5;
				if (maskY < this.maskStartPosY) {
					this.mask.y = maskY;
				}
				else {
					this.mask.y = this.maskStartPosY
				}
				//LogUtils.logD("===onTouchEnd =onChange mask===" + this.mask.y + "this.zhengGroup.y:" + this.zhengGroup.y + "delat:" + delat + "pre:" + test);
				if (this.mask.y > this.maskStartPosY) {
					this.mask.y = this.maskStartPosY;
					LogUtils.logD("====超值了=====");
				}
			},
			onChangeObj: this
		};
		if (this.zhengGroup.y > this.min) {
			this.preZhengGroupY = this.zhengGroup.y;
			egret.Tween.get(this.zhengGroup, vars).to({ y: this.maxZhengY }, 300).call(() => {
				//LogUtils.logD("onTouchEnd 结束的时候 this.zhengGroup.y：" + this.zhengGroup.y + "遮罩的位置：" + this.mask.y);
				this.zhengGroup.y = this.maxZhengY;
				this.mask.y = this.maskStartPosY;
			});
			egret.setTimeout(() => {
				this.zhengGroup.y = this.maxZhengY;
				this.mask.y = this.maskStartPosY;
			}, this, 300)
		}
		else {

		}
	}
}



