class BaseInstanceScence extends game.BaseComponent {
	public constructor() {
		super();
	}
	public onAdded() {
		super.onAdded();
		CF.aE(ENo.CLOSE_ALL, this.hideUICom, this);
	}
	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLOSE_ALL, this.hideUICom, this);
	}
	public hideUICom() {
		if (this["hide"]) {
			this["hide"]();
		}
	}
}