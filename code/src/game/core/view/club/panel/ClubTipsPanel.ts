// TypeScript file
class ClubTipsPanel extends game.BaseComponent {
    public resizeGroup: eui.Group;
    public jeishaoBtn: eui.ToggleButton;
    public guizeBtn: eui.ToggleButton;
    public guizeTips: eui.Scroller;
    public guizeGroup: eui.Group;
    public closeTipsBtn: eui.Button;

    public imag: eui.Image;

    public static _instance: ClubTipsPanel;

    public constructor() {
        super();
        this.skinName = `ClubTipsPanelSkin${CF.tis}`;
    }

    public static get instance() {
        if (!ClubTipsPanel._instance) {
            ClubTipsPanel._instance = new ClubTipsPanel();
        }

        return ClubTipsPanel._instance;
    }

    public createChildren() {
        super.createChildren();
        this.jeishaoBtn.currentState = "down";
        this.guizeBtn.currentState = "up";
        this.imag = new eui.Image(`club_jieshao${CF.tic}`);
        this.imag.y = 0;
        this.imag.horizontalCenter = -5;
        this.guizeGroup.addChild(this.imag);
    }

    protected onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.closeTipsBtn:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(ClubTipsPanel._instance);
                ClubTipsPanel._instance = null;
                break;
            case this.jeishaoBtn:
                this.switchRule("jieshao");
                break;
            case this.guizeBtn:
                this.switchRule("guize");
                break;
        }
    }

    private switchRule(name: string) {
        switch (name) {
            case "jieshao":
                if (this.jeishaoBtn.currentState == "down") return;
                this.jeishaoBtn.currentState = "down";
                this.guizeBtn.currentState = "up";
                game.UIUtils.removeSelf(this.imag);
                this.imag = new eui.Image(`club_jieshao${CF.tic}`);
                this.imag.y = 0;
                this.imag.horizontalCenter = -5;
                this.guizeGroup.addChild(this.imag);
                break;
            case "guize":
                if (this.guizeBtn.currentState == "down") return;
                this.guizeBtn.currentState = "down";
                this.jeishaoBtn.currentState = "up";
                game.UIUtils.removeSelf(this.imag);
                this.imag = new eui.Image(`club_ruler_png${CF.tic}`);
                this.imag.y = 0;
                this.imag.horizontalCenter = -5;
                this.guizeGroup.addChild(this.imag);
                break;
        }
    }

}