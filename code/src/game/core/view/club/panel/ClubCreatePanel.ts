// TypeScript file
class ClubCreatePanel extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public createdGroup: eui.Group;
    public clubIcon: eui.Image;
    public clubName: eui.EditableText;
    public clubRate: eui.EditableText;
    public cancelCreateClub: eui.Image;
    public createClub: eui.Image;
    public clubCreateClose: eui.Button;


    public static _instance: ClubCreatePanel;
    public constructor() {
        super();
        this.skinName = `ClubCreatePanelSkin${CF.tis}`;
    }

    public createChildren() {
        super.createChildren();
    }

    public static get instance() {
        if (!ClubCreatePanel._instance) {
            ClubCreatePanel._instance = new ClubCreatePanel();
        }
        return ClubCreatePanel._instance;
    }

    public onAdded() {
        super.onAdded();
        CF.aE(ENo.CLUB_CHANGE_ICON, this.flashIcon, this);
    }

    public onRemoved() {
        super.onRemoved();
        CF.rE(ENo.CLUB_CHANGE_ICON, this.flashIcon, this);
    }

    public onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.cancelCreateClub:
                this.cancel();
                break;
            case this.clubIcon:
                this.changeClubIcon();
                break;
            case this.clubCreateClose:
                this.cancel();
                break;
        }
    }



    public async creatClub() {
        let clubName = this.clubName.text;
        if (clubName.length <= 0) {

            Toast.launch(TextUtils.instance.getCurrentTextById(86), 1);
            return;
        } else if (clubName.length > 6) {
            Toast.launch(TextUtils.instance.setTextById(87, { "1": 6 }), 1);
            return;
        }
        let rate = parseInt(this.clubRate.text) / 100;
        if (!rate || rate == NaN) { rate = 0.05 };
        let iconid = ClubIconItem.clubIconIdex;
        if (!iconid) iconid = 1;
        let data = { clubName: clubName, config: { pumpRate: rate }, iconId: iconid };
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_ubHandler_c_createClub, data);
        if (resp.clubId) {
            Toast.launch(TextUtils.instance.getCurrentTextById(88), 1);
            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
        } else {
            Toast.launch(resp.error.msg, 1);
            return;
        }
        this.cancel();

    }

    public changeClubIcon() {
        let changeHeadPanel = ClubChangeIconPanel.instance;
        this.resizeGroup.addChild(changeHeadPanel);

    }

    public cancel() {
        // this[`headBg`].visible = false;
        this.clubIcon.source = "club_create_change_png";
        this.clubIcon.horizontalCenter = 0;
        this.clubIcon.y = 161;
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubCreatePanel._instance);
        ClubCreatePanel._instance = null;
        ClubIconItem.clubIconIdex = 3;
    }

    private flashIcon() {
        if (ClubIconItem.clubIconIdex) {
            // this[`headBg`].visible = true;
            this.clubIcon.source = "club_icon_" + ClubIconItem.clubIconIdex + "_png";
            this.clubIcon.horizontalCenter = 0;
            this.clubIcon.scaleX = this.clubIcon.scaleY = 0.75;
        }
    }
}