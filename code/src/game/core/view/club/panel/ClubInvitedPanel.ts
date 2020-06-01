// TypeScript file
class ClubInvitedPanel extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public invitedGroup: eui.Group;
    public refuseBtn: eui.Button;
    public acceptBtn: eui.Button;

    public gameData: any;

    public static _instance: ClubInvitedPanel;

    public constructor() {
        super();
        this.skinName = `ClubInvitedPanelSkin${CF.tis}`;
    }

    public static get instance() {
        if (!ClubInvitedPanel._instance) {
            ClubInvitedPanel._instance = new ClubInvitedPanel();
        }
        return ClubInvitedPanel._instance;
    }

    public onAdded() {
        super.onAdded();
    }

    public onRemoved() {
        super.onRemoved();
    }

    public createChildren() {
        super.createChildren();
        if (GameConfig.CURRENT_ISSHU) {
            this.currentState = "shu";
            this.validateNow();
        } else {
            this.currentState = "heng";
        }
    }

    private data;
    public initData(e) {
        this.data = e.data;
        var tx: eui.Label = new eui.Label();;
        tx.x = tx.y = 0;
        tx.size = 30;
        tx.width = 360; tx.height = 90;
        this.gameData = e.data;
        tx.textColor = 0xa67044;
        let data = {
            "1": '<font color="#FBEB87" size="30">' + e.data.clubId + " " + e.data.clubName + '</font>',
            "2": '<font color="#FBEB87" size="30">' + e.data.invitePlayer + '</font>',
            "3": '<font color="#6FE6D9" size="30">' + this.gameName(e.data.gameId) + '</font>'
        }
        let text: any = TextUtils.instance.setTextById(85, data);
        tx.textFlow = (new egret.HtmlTextParser).parser(text);
        this.invitedGroup.addChild(tx);
    }

    protected gameName(id) {
        switch (id) {
            case 10005:
                return "炸金花";
            case 10002:
                return "血战到底";
            case 10003:
                return "抢庄牛牛";
            case 10020:
                return "二人麻将";
            case 10018:
                return "卡五星";
            case 10015:
                return "广东麻将";
            case 10009:
                return TextUtils.instance.getCurrentTextById(32);
        }
    }

    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.refuseBtn:
                this.refuse();
                game.UIUtils.removeSelf(this);
                break;
            case this.acceptBtn:
                this.acceptInvite();
                break;
        }
    }

    public async refuse() {
        let data = {
            tableId: this.gameData.tableId,
            clubId: this.gameData.clubId,   
            inviterId: this.gameData.inviterId
        }
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_refuseInviteGame, data);
        Global.pomelo.clearLastLock();
        if (resp) {
            if (resp.error && resp.error.code) {
                return;
            }
            ClubManager.instance.currentClub = resp;
        }
        game.UIUtils.removeSelf(this);
    }

    public async acceptInvite() {
        let data = {
            tableId: this.gameData.tableId,
            clubId: this.gameData.clubId
        }
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_enterClubHall, data);
        Global.pomelo.clearLastLock();
        if (resp) {
            if (resp.error && resp.error.code != 0) {
                game.UIUtils.removeSelf(this);
                Global.alertMediator.addAlert(resp.error.msg, null, null, true); return;
            }
            //smart 给游戏大厅数复制
            ClubManager.instance.currentClub = this.data;
            //smart role赋值
            if (!ClubManager.instance.currentClub.role) {
                if (ClubManager.instance.list) {
                    for (let i = 0; i < ClubManager.instance.list.length; ++i) {
                        let clubId = ClubManager.instance.list[i]["clubId"];
                        if (clubId == ClubManager.instance.currentClub.clubId) {
                            ClubManager.instance.currentClub.role = ClubManager.instance.list[i]["role"];
                        }
                    }
                }
            }
            ClubManager.instance.setClubData(resp);
            if (resp.clubInfo) {
                ClubManager.instance.currentClub = resp.clubInfo;
            }
            let innerHall = ClubInnerHallScene.instance;
            innerHall.joinScene(this.gameData);
            game.UIUtils.removeSelf(this);
            GameLayerManager.gameLayer().tipsLayer.removeChildren();
        }
    }
}