class DBComponent extends game.BaseUI {
	public armature: dragonBones.EgretArmatureDisplay;
	private dnName: string;
	public callback: Function;
	public currentName;
	public autoPos: boolean = true
	public constructor(dbName, autoPos = true) {
		super();
		this.autoPos = autoPos;
		this.dnName = dbName;
		this.createDb();

	}

	public resetPosition() {
		if (this.armature) {
			this.armature.x = this.width / 2;
			this.armature.y = this.height / 2;
		}
	}

	protected onAddedCall() {
		if (!this.autoPos) {
			return;
		}
		if (this.armature) {
			this.width = this.armature.width;
			this.height = this.armature.height;
		} else {
			LogUtils.logD(`res ---${this.dnName}---  not found 404`);
		}
	}

	public onAdded() {
		super.onAdded();
		this.onAddedCall();
	}

	public createDb() {
		let armature = DBFactory.instance.getDBAsync1(this.dnName) as dragonBones.EgretArmatureDisplay;
		if (armature) {
			this.armature = armature;
			this.addChild(armature);
			this.armature.touchEnabled = false;
			this.armature.addEventListener(egret.Event.COMPLETE, this.completeCall, this);
		}
	}

	private completeCall() {
		if (this.callback) {
			this.callback();
			return;
		}
		this.stop();
		game.UIUtils.removeSelf(this);
		GameCacheManager.instance.setCache(this.dnName, this);
	}

	public play(name: string = "default", times: number) {
		try {
			this.currentName = name;
			this.visible = true;
			this.armature.animation.play(name, times);
		} catch (e) {
		}

	}

	public play1(name: string = "default", times: number) {
		if (this.armature) {
			this.currentName = name;
			this.visible = true;
			this.armature.animation.play(name, times);
		}
	}
	public gotoAndStop(name: string = "default", frame?: any) {
		if (this.armature) {
			this.currentName = name;
			this.visible = true;
			this.armature.animation.gotoAndStop(name, 1);
		}
	}


	public playByFilename(times: number) {
		if (this.armature) {
			this.currentName = this.dnName;
			this.visible = true;
			this.armature.animation.play(this.currentName, times);
		}
	}

	public stop() {

	}
	public dbDispose() {
		if (this.armature) {
			this.currentName = this.dnName;
			this.armature.dispose();
		}
	}

	public playDefault(times: number) {
		if (this.armature) {
			this.currentName = "default";
			this.visible = true;
			this.armature.animation.gotoAndPlayByFrame("default", 0, times);
		}
	}


	public playNamesAndLoop(names: string[]) {
		async.eachSeries(names, (name, callback) => {
			this.callback = callback;
			this.play(name, 1);
		}, () => {
			this.play(this.currentName, -1);
		})
	}

	public playNamesAndLoop1(names: string[]) {
		async.eachSeries(names, (name, callback) => {
			this.callback = callback;
			this.play(name, 1);
		}, () => {
			this.play(this.currentName, 3);
		})
	}

	public playByNames(names: string[]) {
		async.eachSeries(names, (name, callback) => {
			this.callback = callback;
			this.play(name, 1);
		}, () => {
		})
	}


	public static create(cacheName, effectName) {
		let component = GameCacheManager.instance.getCache(cacheName);
		if (!component) {
			component = new DBComponent(effectName);
			GameCacheManager.instance.setCache(cacheName, component);
		}
		return component;
	}

	public static clearCache(cacheName) {
		GameCacheManager.instance.clearCache(cacheName);
	}

	public playByTime(name1, times: number) {
		if (this.armature) {
			this.currentName = name1;
			this.visible = true;
			this.armature.animation.gotoAndPlayByFrame(name1, 1, times);
		}
	}

	public play_first(name1, times: number) {
		if (this.armature) {
			this.currentName = name1;
			this.armature.animation.gotoAndPlayByFrame(name1, 1, times);
		}
	}

	public static dbMovie(name, movieName) {
		var anime_data = RES.getRes(name + "_ske_json");
		var anime_texture = RES.getRes(name + "_tex_png");
		var anime_texture_data = RES.getRes(name + "_tex_json");
		var db: dragonBones.EgretFactory = new dragonBones.EgretFactory();
		db.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(anime_data));
		db.addTextureAtlas(new dragonBones.EgretTextureAtlas(anime_texture, anime_texture_data));
		var anime: dragonBones.EgretArmatureDisplay = db.buildArmatureDisplay(movieName);
		return anime;
	}

	public realease() {
		game.UIUtils.removeSelf(this);
		GameCacheManager.instance.setCache(this.dnName, this);
	}
}