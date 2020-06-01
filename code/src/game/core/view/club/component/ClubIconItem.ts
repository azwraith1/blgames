// TypeScript file
class ClubIconItem extends eui.Component {
    public clubHeadIcon: eui.Image;
    public choosed: eui.Image;
    public gou: eui.Image;

    public static clubIconIdex: number = 3;

    public constructor() {
        super();
        this.skinName = new ClubHeadIconItemSkin();
    }

    public createChildren() {
        super.createChildren();
        this.clubHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseIcon, this);
    }


    public initIcon(source: number) {
        if (ClubIconItem.clubIconIdex && source == ClubIconItem.clubIconIdex) {
            this.choosed.visible = this.gou.visible = true;
        }
        this.clubHeadIcon.source = "club_icon_" + source + "_png";
        this.clubHeadIcon.name = source + "";
    }


    private chooseIcon() {
        if (parseInt(this.clubHeadIcon.name) == ClubIconItem.clubIconIdex) return;
        ClubIconItem.clubIconIdex = parseInt(this.clubHeadIcon.name);
        this.choosed.visible = this.gou.visible = true;
        for (let i = 0; i < this.parent.numChildren; i++) {
            let item: any = this.parent.getChildAt(i);
            item.chooseOtherIcon();
        }
        game.UIUtils.removeSelf(this.parent);
        game.UIUtils.removeSelf(ClubChangeIconPanel._instance);
        ClubChangeIconPanel._instance = null;
        if (ClubIconItem.clubIconIdex) {
            CF.dP(ENo.CLUB_CHANGE_ICON);
        }
    }

    public chooseOtherIcon() {
        if (parseInt(this.clubHeadIcon.name) == ClubIconItem.clubIconIdex) return;
        this.choosed.visible = this.gou.visible = false;
    }
}