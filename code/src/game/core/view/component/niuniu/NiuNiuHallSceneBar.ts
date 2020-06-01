module niuniu {
	export class NiuNiuHallSceneBar extends game.BaseUI {
		private zhunruLabel: eui.Label;
		private config;
		private effcGroup: eui.Group;
		public constructor() {
			super();
		}

		public onAdded() {
			super.onAdded();
			game.UIUtils.setAnchorPot(this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
		}

		public createChildren() {
			super.createChildren();
			this.zhunruLabel.text = "";
		}

		private lock: boolean = false;
		private onTouchEnded() {
			majiang.MajiangUtils.playClick();//管理声音的
			if (this.lock) {
				return;
			}
			this.lock = true;
			egret.setTimeout(function () {
				this.lock = false
			}, this, 1000);
			let playerGold = Global.playerProxy.playerData.gold;
			if (playerGold < this.config.gold_min) {
				let text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
				Global.alertMediator.addAlert(text, null, null, true);
				return;
			}
			RotationLoadingShu.instance.load(["niuniu_game"], "", () => {
				CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10003, sceneId: this.config.id, diFen: this.config.bet_base });
			});
			egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
		}
        
		public showBarByConfig(config, index, color) {
			// let mc: DBComponent = GameCacheManager.instance.getCache("niuniu_xc" + index);
			// if (!mc) {
			let	mc = new DBComponent("niuniu_xc" + index);
				GameCacheManager.instance.setCache("niuniu_xc" + index, mc);
			// }
			this.effcGroup.addChild(mc);
			mc.x = mc.width / 2;
			mc.y = mc.height / 2 + 55;
			mc.playDefault(-1);
			this.visible = true;
			this.config = config;
			let id = config.id;
			let gold_min = config.gold_min;
			egret.setTimeout(() => {
				switch (index) {
					case 1:
						this.zhunruLabel.y = 225; break;
					case 2:
						this.zhunruLabel.y = 225; break;
					case 3:
						this.zhunruLabel.y = 225; break;
					case 4:
						this.zhunruLabel.y = 225; break;
					case 5:
						this.zhunruLabel.y = 240; break;
					case 6:
						this.zhunruLabel.y = 228; break;
				}
				this.zhunruLabel.text = "准入:" + gold_min;
			}, this, 500);

			this.zhunruLabel.textColor = color
		}
	}
}