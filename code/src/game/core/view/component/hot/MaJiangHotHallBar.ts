class MaJiangHotHallBar extends game.BaseUI {
	private scroller: eui.Scroller;
	private itemGroup: eui.Group;
	private hotBtn: eui.Image;
	private isSelect:boolean=false;
	public constructor() {
		super();
		this.skinName = "MaJiangHotHallBar1Skin";
	}
	public createChildren() {
		super.createChildren();
		this.itemGroup.removeChildren();
		this.scroller.alpha = 0;
		//初始化造型
		let hallData = Global.gameProxy.sceneList;
		let index = 0;
		for (let i = 0; i < hallData.length; i++) {
			let hallItemData = hallData[i];
			if (hallItemData.gameId == "club") {
				continue;
			}
			if (hallItemData.grade == 2 || hallItemData.grade == 1) {
				let item = new HotBarItem(hallItemData, true);
				item.x = index * (item.width + 30);//10
				this.itemGroup.addChild(item);
				index++;
			}
		}
	}
	protected onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch(e.target){
            case this.hotBtn:
			let isSelect=!this.isSelect;
			this.isSelect=isSelect;
			this.onChange();
			break;
		}
	}

	protected onAdded() {
		super.onAdded();
		//this.hotBtn.addEventListener(egret.Event.CHANGE, this.onChange, this);
	}
	protected onRemoved() {
		super.onRemoved();
		//this.hotBtn.removeEventListener(egret.Event.CHANGE, this.onChange, this);
	}
	private onChange() {
		// var radioButton = <eui.ToggleButton>e.target;
		///获取当前单选按钮的状态
		CF.dP(ENo.MJ_HOTBTN_ONCLICK,this.isSelect);//radioButton.selected
		if (this.isSelect) {
			egret.Tween.get(this.scroller).to({ alpha: 1 }, 300);
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(this.scroller);
				this.scroller.alpha = 1;
			}, this, 300);
		}
		else {
			egret.Tween.get(this.scroller).to({ alpha: 0 }, 300);
			this.setAutoTimeout(() => {
				egret.Tween.removeTweens(this.scroller);
				this.scroller.alpha = 0;
			}, this, 300);
		}
	}
}