class ClubQuitTips extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public invitedGroup: eui.Group;
    public refuseBtn: eui.Button;
    public acceptBtn: eui.Button;

    public gameData: any;

    public static _instance: ClubQuitTips;

    public constructor() {
        super();
        this.skinName = `ClubInvitedPanelSkin${CF.tis}`;
    }

    public static get instance() {
        if (!ClubQuitTips._instance) {
            ClubQuitTips._instance = new ClubQuitTips();
        }
        return ClubQuitTips._instance;
    }

    public onAdded() {
        super.onAdded();
    }

    public onRemoved() {
        super.onRemoved();
    }

    public createChildren() {
        super.createChildren();
        this.initData();
    }

    public initData() {
        var tx: eui.Label = new eui.Label();;
        tx.x = tx.y = 0;
        tx.size = 30;
        tx.width = 360; tx.height = 90;
        // this.gameData = e.data;
        tx.text = TextUtils.instance.getCurrentTextById(114);
        tx.textColor = 0XA67004;
        this.invitedGroup.addChild(tx);
    }


    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.refuseBtn:
                // this.refuse();
                game.UIUtils.removeSelf(this);
                break;
            case this.acceptBtn:
                this.acceptInvite();
                break;
        }
    }
    public clubId: number;
    public setClubId(id) {
        this.clubId = id;
    }

    public async acceptInvite() {
        CF.dP(ENo.CLUB_HALL_QUIT, { clubId: this.clubId });
    }
}