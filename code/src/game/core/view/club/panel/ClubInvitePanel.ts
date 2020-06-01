// TypeScript file
class ClubInvitePanel extends eui.Component {
    public memberscroller: eui.Scroller;
    public memberList: eui.List;

    public static _instance: ClubInvitePanel;

    public constructor() {
        super();
        this.skinName = `ClubInviteMemberPanelSkin${CF.tis}`;
    }

    public static get instance() {
        if (!ClubInvitePanel._instance) {
            ClubInvitePanel._instance = new ClubInvitePanel();
        }
        return ClubInvitePanel._instance;
    }

    public hide() {
        game.UIUtils.removeSelf(ClubInvitePanel._instance);
        ClubInvitePanel._instance = null;
    }

    public show(memberList) {
        this.right = 0;
        this.bottom = 110;
        this.memberList.dataProvider = new eui.ArrayCollection(memberList);
        return this;
    }

    public createChildren() {
        super.createChildren();
        this.memberList.itemRenderer = ClubInviteItem;
        this.initMember();
    }

    public async initMember() {
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_getInvitePlayerList, {});
        Global.pomelo.clearLastLock();
        if (resp && !resp.error) {
            let atr = [];
            for (let i = 0; i < resp.length; i++) {
                atr.push(resp[i]);
            }
            this.memberList.dataProvider = new eui.ArrayCollection(atr);
        }
    }
}