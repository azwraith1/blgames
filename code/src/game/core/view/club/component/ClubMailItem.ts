// TypeScript file
class ClubMailItem extends game.BaseItemRender {
    public club: eui.Label;
    public clubId: eui.Label;
    public miaoshu: eui.Label;
    public clubstate: eui.Label;
    public clubTime: eui.Label;
    public deleteBtn: eui.Button;

    public thisId: number;

    public constructor() {
        super();
        this.skinName = "ClubMailItemSkin";
    }

    public createChildren() {
        super.createChildren();
    }

    protected dataChanged() {
        this.updateShow(this.data);
        this.clubstate.x = this.miaoshu.x + this.miaoshu.width + 15;
    }
    public updateShow(data: any) {
        if (data) {
            this.club.text = "" + data.content.title;
            this.clubId.text = "" + data.content.clubId;
            this.thisId = data.id;
            this.miaoshu.text = "" + data.content.clubName;
            this.clubstate.text = "" + data.content.txt;
            this.clubTime.text = DateUtils.dateFormat("yyyy-MM-dd hh:mm", data.time);
        }
    }

    private fmtDate(obj) {
        var date = new Date(obj * 1000);
        var y = date.getFullYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        var h = "0" + date.getHours();
        var mins = "0" + date.getMinutes();
        var sc = "0" + date.getSeconds();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
    }

    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.deleteBtn:
                this.deleteMail();
                break;
        }
    }

    public async deleteMail() {
        let resp = await game.PomeloManager.instance.request(ServerPostPath.hall_userHandler_c_delMail, { id: this.thisId });
        if (resp) {
            CF.dP(ENo.CLUB_FLASH_MAILS);
            CLubMailPanel.instance.mailNum -= 1;
        }
    }
}