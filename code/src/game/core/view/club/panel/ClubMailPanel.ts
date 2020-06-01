// TypeScript file
class CLubMailPanel extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public emailScroller: eui.Scroller;
    public emailList: eui.List;
    public clearBtn: eui.Button;
    public closeBtn: eui.Image;
    public mailNum: number = 0;

    public static _instance: CLubMailPanel;
    public constructor() {
        super();
        this.skinName = `ClubHallEmailSkin${CF.tis}`;
    }

    public static get instance() {
        if (!CLubMailPanel._instance) {
            CLubMailPanel._instance = new CLubMailPanel();
        }
        return CLubMailPanel._instance;
    }

    public createChildren() {
        super.createChildren();
        this.emailList.itemRenderer = ClubMailItem;
        this.initList();
    }

    public onAdded() {
        super.onAdded();
        CF.aE(ENo.CLUB_FLASH_MAILS, this.flashMails, this);
    }

    public onRemoved() {
        super.onRemoved();
        CF.rE(ENo.CLUB_FLASH_MAILS, this.flashMails, this);
    }

    public async initList() {
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_userHandler_c_getMailList, {});
        Global.pomelo.clearLastLock();
        let atr = [];
        this[`nomessageGroup`].visible = resp.length == 0
        if (resp) {
            CLubMailPanel.instance.mailNum = resp.length;
            for (let i = 0; i < resp.length; i++) {
                atr.push(resp[i]);
            }
            this.emailList.itemRenderer = ClubMailItem;
            this.emailList.dataProvider = new eui.ArrayCollection(atr);
        }
        this.emailList.dataProvider = new eui.ArrayCollection(atr);
    }

    public flashMails() {
        this.initList();
    }

    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.clearBtn:
                this.clearAllMail();
                break;
            case this.closeBtn:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(CLubMailPanel._instance);
                CLubMailPanel._instance = null;
                break;
        }
    }

    public async clearAllMail() {
        let resp = await game.PomeloManager.instance.request(ServerPostPath.hall_userHandler_c_cleanMail, {});
        CLubMailPanel.instance.mailNum = 0;
        this.flashMails();
    }

}