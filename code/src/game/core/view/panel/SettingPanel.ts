class SettingPanel extends game.BaseComponent {
	private closeBtn: eui.Button;
	private musicGroup: eui.Group;
	private soundGroup: eui.Group;
	private musicBtn: eui.ToggleSwitch;
	private soundBtn: eui.ToggleSwitch;
	public resizeGroup: eui.Group;
	public constructor(setIndex = null) {
		super();
		if (setIndex == 1) {
			this.skinName = `SettingMainSkin${CF.tis}`;
			return;
		} else if (setIndex == 2) {
			this.skinName = new DZMJSettingSkin();
			return;
		} else if (setIndex == "baccarat") {
			this.skinName = `BJLSettingSkin${CF.tis}`;
			return;
		} else if (setIndex == "blackjack") {
			this.skinName = `BlackjSettingSkin${CF.tis}`;
			return;
		} else if (setIndex == "majiang") {
			this.skinName = `SettingMainSkin${CF.tis}`;
			return;
		}
		else if (setIndex == "baicao" || setIndex == "superbaicao") {
			this.skinName = "BaiCaoSettingSkin";
			return;
		}else if(setIndex == "bdz"){
			this.skinName = "SettingMainSkinKR";
			return;
		}
		if (GameConfig.CURRENT_ISSHU && SettingShuSkin) {
			this.skinName = new SettingShuSkin();
			return;
		}
		this.skinName = new SettingSkin();
	}

	protected createChildren() {
		super.createChildren();
		this.musicBtn.selected = SoundManager.getInstance().musicVolume == 1;
		this.soundBtn.selected = SoundManager.getInstance().effectVolume == 1;
	}
	private rects: eui.Rect;
	public onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.closeBtn:
			case this.rects:
				this.rects.visible = false;
				CF.sN(PanelNotify.CLOSE_SETTING);
				break;
			case this.musicBtn://音乐开关
				if (SoundManager.getInstance().musicVolume) {
					SoundManager.getInstance().musicVolume = 0;
				} else {
					SoundManager.getInstance().musicVolume = 1;
				}
				break;
			case this.soundBtn://声音开关
				if (SoundManager.getInstance().effectVolume) {
					SoundManager.getInstance().effectVolume = 0;
				} else {
					SoundManager.getInstance().effectVolume = 1;
				}
				break;
		}
	}

	public onAdded() {
		super.onAdded();
	}
}
