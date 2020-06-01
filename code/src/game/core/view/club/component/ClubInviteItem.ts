// TypeScript file
class ClubInviteItem extends game.BaseItemRender {
    public userHead: eui.Image;
    public inviteBtn: eui.Image;
    public userName: eui.Label;
    public playerId: number;
    public statusLabel: eui.Label;

    public constructor() {
        super();
        this.skinName = `ClubInviteItemSkin${CF.tis}`;
    }
    public createChildren() {
        super.createChildren();
    }

    protected dataChanged() {
        this.updateShow(this.data);
    }

    public updateShow(data: any) {
        if (data) {
            let head = `hall_header_${data.sex}_${data.figureUrl}_png`;
            this.userHead.source = head;
            this.userName.text = "" + data.nickname;
            this.checkBtnState(data.status);
            this.playerId = data.id;
        }
    }

    public onRemoved() {
        super.onRemoved();
    }

    protected onTouchTap(e: egret.Event) {
        switch (e.target) {
            case this.inviteBtn:
                this.invite();
                break;
        }
    }

    // OFFLINE: 1, //离线
    // ONLINE: 2, //在线
    // MATCHING: 3, //匹配
    // GAMING: 4, //游戏中

    private canInvite: boolean = false;
    protected checkBtnState(state: number) {
        if (state == 2) {
            this.statusLabel.text = "("+TextUtils.instance.getCurrentTextById(109)+")";
            this.inviteBtn.source = RES.getRes("club_invite_1_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn1_kr_png");
            }
            this.inviteBtn.touchEnabled = true;
            this.canInvite = true;
            this.statusLabel.textColor = 0x2ac664;
        } else {
            this.inviteBtn.source = RES.getRes("club_invite_btn2_png")
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn2_kr_png");
            }
            this.inviteBtn.touchEnabled = false;
            if (state == 1) {
                this.statusLabel.text = "("+TextUtils.instance.getCurrentTextById(110)+")";
                this.statusLabel.textColor = 0x9fa4a7;
            } else if (state == 4 || state == 3) {
                this.statusLabel.text = "("+TextUtils.instance.getCurrentTextById(31)+")";
                this.statusLabel.textColor = 0xf64c1e;
            }
            this.canInvite = false;
        }
    }

    private invite() {
        if (this.canInvite) {
            this.inviteBtn.source = RES.getRes("club_invite_2_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn2_kr_png");
            }
            this.inviteBtn.touchEnabled = false;
            this.sendInvite();
        }
    }

    public sendInvite() {
        CF.dP(ENo.CLUB_INVITE_PLAYER, { playerId: this.playerId });
        egret.setTimeout(() => {
            this.inviteBtn.source = RES.getRes("club_invite_1_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn1_kr_png");
            }
            this.inviteBtn.touchEnabled = true;
        }, this, 15000);
    }
}