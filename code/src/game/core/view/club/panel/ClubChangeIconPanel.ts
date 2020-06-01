// TypeScript file
class ClubChangeIconPanel extends game.BaseComponent {
    public closeBtn: eui.Image;
    public headScroller: eui.Scroller;
    public iconGroup: eui.Group;
    public outrect: eui.Rect;
    public static _instance: ClubChangeIconPanel;

    public constructor() {
        super();
        this.skinName = "ClubChangeHeadPanelSkin";
    }

    public createChildren() {
        super.createChildren();
        this.headScroller.scrollPolicyV = "off";
        this.initList();
    }

    public static get instance() {
        if (!ClubChangeIconPanel._instance) {
            ClubChangeIconPanel._instance = new ClubChangeIconPanel();
        }
        return ClubChangeIconPanel._instance;
    }

    public initList() {
        for (let i = 1; i <= CLUB_HEAD.length; i++) {
            let item = new ClubIconItem();
            item.initIcon(i);
            if (i % 2 == 1) {
                item.x = Math.floor((i - 1) / 2) * (136 + 20);
                item.y = 10;
                this.iconGroup.addChild(item);
            } else {
                item.x = Math.floor((i - 1) / 2) * (136 + 20);
                item.y = 137 + 20;
                this.iconGroup.addChild(item);
            }
        }
    }

    public onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.outrect:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(ClubChangeIconPanel._instance);
                ClubChangeIconPanel._instance = null;
                if (ClubIconItem.clubIconIdex) {
                    CF.dP(ENo.CLUB_CHANGE_ICON);
                }
                ClubIconItem.clubIconIdex = 3;
                break;
        }
    }
}

var CLUB_HEAD = [1, 2, 3, 4, 5, 6, 7, 8, 9]
