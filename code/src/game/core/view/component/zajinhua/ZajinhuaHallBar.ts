module zajinhua {
	export class ZajinhuaHallBar extends game.BaseUI {
		private config;
		private dbGroup: eui.Group;
		private difen: eui.BitmapLabel;
		private zhunru: eui.BitmapLabel;
		private index: number;
		private db1: eui.Image;
		private db2: eui.Image;
		private dyImage: eui.Image;
		public constructor(data, index) {
			super();
			this.config = data;
			this.index = index;
			this.skinName = new ZajinhuaHallbarSkin();
		}

		public onAdded() {
			super.onAdded();
			game.UIUtils.setAnchorPot(this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
		}

		public createChildren() {
			super.createChildren();
			this.showBarByConfig(this.config);

		}

		private lock: boolean = false;
		private onTouchEnded() {
			majiang.MajiangUtils.playClick();//管理声音的
			if (!this.config.enable) {
				Global.alertMediator.addAlert("即将开放,敬请期待", null, null, true);
				return;
			}
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
			RotationLoading.instance.load(["zhajinhua_game"], "", () => {
				CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: 10005, sceneId: this.config.id, diFen: this.config.bet_base, zhun: this.config.gold_min });
			});
			egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
		}

		private getDBName() {
			switch (this.index) {
				case 1:
					return `zjh_cjc`;
				case 2:
					return `zjh_zjc`;
				case 3:
					return `zjh_gjc`;
				case 4:
					return `zjh_wzc`;
			}

			this.db1.source = this.db2.source = RES.getRes(`zjh_hall_bar_db${this.index}_png`);
		}

		public showBarByConfig(num) {
			this.difen.text = "底分：" + num.bet_base;
			this.zhunru.text = "准入：" + num.gold_min;
			let dbComponent = GameCacheManager.instance.getCache(this.getDBName()) as DBComponent;
			if (!dbComponent) {
				dbComponent = new DBComponent(this.getDBName());
				dbComponent.touchEnabled = false;
			}
			dbComponent.playByFilename(0);
			this.dbGroup.addChild(dbComponent);
			dbComponent.resetPosition();
			this.dyImage.source = RES.getRes(`zjh_hall_bar_daoying${this.index}_png`);
		}
	}
}