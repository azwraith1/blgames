// TypeScript file
class ClubJoinPanel extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public label1: eui.BitmapLabel;
    public label2: eui.BitmapLabel;
    public label3: eui.BitmapLabel;
    public label4: eui.BitmapLabel;
    public label5: eui.BitmapLabel;
    public label6: eui.BitmapLabel;
    public label7: eui.BitmapLabel;
    public numclearall: eui.Button;
    public num0: eui.Button;
    public numclear: eui.Button;
    public backBtn: eui.Image;

    public static _instance: ClubJoinPanel;
    public constructor() {
        super();
        this.skinName = `ClubJoinPanelSkin${CF.tis}`;
    }

    public static get instance() {
        if (!ClubJoinPanel._instance) {
            ClubJoinPanel._instance = new ClubJoinPanel();
        }
        return ClubJoinPanel._instance;
    }

    public onTouchTap(e: egret.TouchEvent) {
        if (e.target.name) {
            this.inputNum = parseInt(e.target.name);
            egret.Tween.get(e.target).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(() => {
                this.textInput();
            })
        } else {
            switch (e.target) {
                case this.numclearall:
                    this.clearAllNum();
                    break;
                case this.numclear:
                    this.clearNum();
                    break;
                case this.backBtn:
                    this.quit();
                    break;
            }
        }
    }

    public inputIndex: number = 0;
    public inputNum: number;
    public textInput() {
        if (this.inputIndex >= 7) return;
        this.inputIndex += 1;
        this[`label${this.inputIndex}`].text = this.inputNum + "";
        if (this.inputIndex == 7) {
            this.joinClub();
        }
    }

    public clearAllNum() {
        for (let i = 1; i <= 7; i++) {
            this[`label${i}`].text = "";
            this.inputIndex = 0;
        }
    }

    public clearNum() {
        if (this.inputNum < 0) return;
        this[`label${this.inputIndex}`].text = "";
        this.inputIndex -= 1;
    }

    public quit() {
        this.inputIndex = 0;
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubJoinPanel._instance);
        ClubJoinPanel._instance = null;
    }

    public async joinClub() {
        let clubId: string = "";
        for (let i = 1; i <= 7; i++) {
            clubId = clubId.concat(this[`label${i}`].text);
        }
        let clubId2: number = parseInt(clubId);
        let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_joinClub, { clubId: clubId2 });
        if (resp) {
            if (resp.error.code) {
                Toast.launch(resp.error.msg, 1);
            } else {
                Toast.launch(TextUtils.instance.getCurrentTextById(16), 1);
                this.quit();
            }
            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
        } else {
            Toast.launch(resp.error.msg, 1);
            this.quit();
        }
    }

}