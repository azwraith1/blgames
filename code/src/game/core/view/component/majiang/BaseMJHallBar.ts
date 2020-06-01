// TypeScript file
class BaseMJHallBar extends game.BaseUI {
    protected config;
    protected index: number;
    protected gameType;
    public zhunRuLable: eui.Label;
    public titleImage: eui.Image;
    public diZhuTxt: eui.Label;

    public touchRect5: eui.Rect;
    private gameIDName: eui.Image;
    public assetsGroupName: string;
    private mjBg: eui.Image;
    private dbGroup: eui.Group;
    private loadGroups: any;
    private specialPlay: eui.Image;
    public constructor(data, index, gameType, _loadGroups: any) {
        super();
        this.config = data;
        this.index = index;
        this.gameType = gameType;
        this.loadGroups = _loadGroups;
        this.skinName = "MaJiangCommonHallBarSkin";
    }

    public onAdded() {
        super.onAdded();
        game.UIUtils.setAnchorPot(this);
        this.touchRect5.touchEnabled = true;
        this.touchRect5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnded, this);
    }
	public showButtonAni(delay: number) {
		egret.Tween.removeTweens(this);
		this.scaleX = 0;
		this.scaleY = 0;
		this.alpha = 0;
		this.visible = false;
		egret.Tween.get(this).wait(delay).call(() => {
			this.visible = true;
		}).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut).to({ scaleX: 0.95, scaleY: 0.95 }, 100, egret.Ease.quadOut).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.quadOut);
		egret.Tween.get(this).wait(delay).to({ alpha: 0.6 }, 280, egret.Ease.quadOut).to({ alpha: 0.95 }, 280, egret.Ease.quadOut).to({ alpha: 1 }, 50, egret.Ease.quadOut);
	}
    public createChildren() {
        super.createChildren();
        this.showBarByConfig(this.config);
        this.mjBg.source = "mj_comom_" + this.index + "_png";
        this.showSpecialPlay(this.gameType);
    }

    private showSpecialPlay(gameName: string) {
        switch (gameName) {
            case "gdmj":
                this.specialPlay.visible = true;
                this.specialPlay.source = "mj_hall_ypm_png";
                break;
            case "mjxlch":
            case "mjxzdd":
                this.specialPlay.visible = true;
                this.specialPlay.source = "mj_hall_hsz_png";
                break;
            default:
                this.specialPlay.visible = false;
                break;
        }

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
            if (!GameConfig.GAME_CONFIG)
                GameConfig.GAME_CONFIG = RES.getRes("client_json");
            let text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
            Global.alertMediator.addAlert(text, null, null, true);
            return;
        }

        RotationLoading.instance.load(this.loadGroups, "", () => {
            CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: Global.gameProxy.getSceneNameByStr(this.gameType), sceneId: this.config.id, diFen: this.config.bet_base, zhun: this.config.gold_min });
        });
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);//50
    }

    public showBarByConfig(num) {
        this.setTxtColor(this.txtColor);
        this.diZhuTxt.text = "底注:" + num.bet_base;
        this.zhunRuLable.text = "准入:" + num.gold_min;
        let db: DBComponent = new DBComponent("dt20_majiang_xc");
        this.dbGroup.addChild(db);
        db.playByFilename(-1);
    }
    protected get txtColor() {
        switch (this.index) {
            case 1:
                return 0x7cc097;
            case 2:
                return 0x81abc7;
            case 3:
                return 0xcb848d;
            case 4:
                return 0xa279b6;
        }
    }
    protected setTxtColor(color: any) {
        this.diZhuTxt.textColor = color;
        this.zhunRuLable.textColor = color;
    }

}
