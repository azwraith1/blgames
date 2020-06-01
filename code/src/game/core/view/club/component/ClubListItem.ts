// TypeScript file
class ClubListItem extends game.BaseItemRender {
    public clubItemGroup: eui.Group;
    public clubIcon: eui.Image;
    public clubName: eui.Label;
    public clubId: eui.Label;
    public clubCreator: eui.Label;
    public clubContains: eui.Label;
    public clubDesks: eui.Label;
    public clubIden: eui.Label;
    public quitClubBtn: eui.Button;

    public thisClubiD: number;
    private touchRect: eui.Rect;

    public constructor() {
        super();
        this.skinName = `ClubListItemSkin${CF.tis}`;
    }

    public createChildren() {
        super.createChildren();
        // this.clubItemGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinThisClub, this);
        // this.quitClubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quitClub, this);
    }


    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.touchRect:
                this.joinThisClub();
                break;
            case this.quitClubBtn:
                this.quitClub();
                break;
        }

    }

    public onAdded() {
        super.onAdded();
        CF.aE(ENo.CLUB_HALL_QUIT, this.quit, this);
    }

    public onRemoved() {
        super.onRemoved();
        // this.clubItemGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinThisClub, this);
        // this.quitClubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quitClub, this);
        CF.rE(ENo.CLUB_HALL_QUIT, this.quit, this);
    }

    protected dataChanged() {
        this.updateShow(this.data);
    }

    public joinThisClub() {
        ClubConfigPanel.clubId = this.thisClubiD;
        egret.Tween.get(this.clubItemGroup).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(() => {
            CF.dP(ENo.CLUB_JOIN_CLUB, { club: this.data });
        })
    }

    protected updateShow(data) {
        if (data) {
            this.clubContains.text = "" + data.playerNum;
            this.clubCreator.text = "" + data.clubCreator;
            this.clubId.text = data.clubId + "";
            this.thisClubiD = data.clubId;
            this.clubName.text = data.name + "";
            this.clubIcon.source = "club_icon_" + data.iconId + "_png";
            this.clubDesks.text = data.tableNum + "";
            this.clubIden.text = "" + this.clubrole(data.role) + "";
        }
    }

    protected clubrole(role) {
        switch (role) {
            case 1:
                return TextUtils.instance.getCurrentTextById(45)
            case 2:
                return TextUtils.instance.getCurrentTextById(46)
            case 3:
                this.quitClubBtn.visible = true;
                return TextUtils.instance.getCurrentTextById(47)
        }
    }

    public quitClub() {
        CF.dP(ENo.CLUB_HALL_QUIT_TOUCH, { clubId: this.thisClubiD });
    }

    public async quit(e) {
        let data1 = { clubId: e.data.clubId };
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_quitClub, data1);
        if (resp) {
            if (resp.error && (resp.error.code != 0)) {
                if (resp.error.code == ErrorCode.BUSY_REQUEST) {
                    return;
                }
                Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
            }
            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
            if (ClubQuitTips._instance) {
                game.UIUtils.removeSelf(ClubQuitTips._instance);
                ClubQuitTips._instance = null;
            }
        }
    }
}