/*
 * @Author: real MC Lee 
 * @Date: 2019-07-01 18:19:50 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-16 14:51:40
 * @Description: 
 */
class SlotLoadingScene extends game.BaseComponent {
    private static _instance: any;
    private callback: Function;
    public resizeGroup: eui.Group;
    public loadingBarGroup: eui.Group;
    public processBar: eui.Image;
    public percentLabel: eui.Label;
    public clickGroup: eui.Group;
    private clickDb: DBComponent;
    public clickStart: eui.Image;
    public maskImag: eui.Image;
    public name: string;
    public quitBtn: eui.Button;
    private maskRect: egret.Rectangle;
    public constructor(name) {
        super();
        this.name = name;
        try {
            this.skinName = name;
        } catch (error) {
            LogUtils.logE("皮肤" + name + "bucunzai");
        }
        //添加进度遮罩
        switch (this.name) {
            case "GDZWLoadingSkin":
                this.maskRect = new egret.Rectangle(0, 0, 0, 56);
                this.processBar.mask = this.maskRect;
                break;
            case "CSDLoadingsSkin":
                this.maskRect = new egret.Rectangle(0, 0, 0, 26);
                this.processBar.mask = this.maskRect;
                break;
            case "SGWSLoadingSkin":
                this.maskRect = new egret.Rectangle(0, 0, 0, 55);
                this[`processBar2`].mask = this.maskRect;
                break;
            case "SNYXLoadingSkin":
                this.maskRect = new egret.Rectangle(0, 0, 0, 21);
                this[`processBar2`].mask = this.maskRect;
                break;
        }
    }
    public static getInstance(skinName: string): SlotLoadingScene {
        if (!SlotLoadingScene._instance) {
            SlotLoadingScene._instance = new SlotLoadingScene(skinName);
        }
        return SlotLoadingScene._instance;
    }
    /**
     * 需要加载的资源组
     * @param  {string} resGroup
     * @param  {Function} callback
     */
    public load(resGroup: string, callback: Function) {
        if (RES.isGroupLoaded(resGroup)) {
            this.loadingBarGroup.visible = false;
        } else {
            this.loadingBarGroup.visible = true;
        }
        this.resGroup = RESUtils.combGroupName(resGroup);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    }

    public onAdded() {
        super.onAdded();
    }

    public isQuited: boolean = false;//是否loading时退出
    public onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.quitBtn:
                if (ServerConfig.OP_RETURN_TYPE == "2") {
                    let alert = new game.AlertPanel("");
                    alert.tipsText = "是否确定返回平台？";
                    alert.okCallback = () => { window.open(ServerConfig.HOME_PAGE_URL); }
                    alert.noCallback = () => { game.UIUtils.removeSelf(alert) };
                    this.resizeGroup.addChild(alert);
                    return;
                } else {
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    this.isQuited = true;
                    game.UIUtils.removeFromParent(this);
                    SlotLoadingScene._instance = null;
                    // this.clickStart.alpha = 1;
                }
                break;
        }
    }

    public createChildren() {
        super.createChildren();
        if (ServerConfig.OP_RETURN_TYPE == "3") {
            this.quitBtn.visible = false;
        }
        this.clickDb = DBComponent.create("cbzz_click", "click");
        this.clickDb.x = 250;
        this.clickDb.y = 0;
        this.clickGroup.addChild(this.clickDb);
        this.clickDb.resetPosition();
    }
    /**
     * 资源加载开始
     */
    public beganLoadResGroup() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    }
    /**
     * 资源加载完成移除监听
     * @param  {RES.ResourceEvent} e
     */
    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    }
    /**
     * 资源加载进度条
     * @param  {RES.ResourceEvent} e
     */
    private onResourceProgress(e: RES.ResourceEvent): void {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            switch (this.name) {
                case "DNTGLoadingSkin":
                    this.processBar.width = rate / 100 * 629;
                    break;
                case "SDXLLoadingSkin":
                    this.processBar.width = rate / 100 * 679;
                    break;
                case "SDMNLoadingSkin":
                    this.processBar.width = rate / 100 * 996;
                    break;
                case "CBZZLaodingSkin":
                    this.processBar.width = rate / 100 * 762;
                    break;
                case "BSKGLoadingSkin":
                    this.processBar.width = rate / 100 * 866;
                    break
                case "RDSGLoadingSkin":
                    this.processBar.width = rate / 100 * 740;
                    break;
                case "AYLSLoadingSkin":
                    this.processBar.width = rate / 100 * 717;
                    break;
                case "GDZWLoadingSkin":
                    this.maskRect.width = rate / 100 * 721;
                    this.processBar.mask = this.maskRect;
                    break;
                case "BSCSLoadingSkin":
                    this.processBar.width = rate / 100 * 851;
                    break;
                case "CEBYLoadingSkin":
                    this.processBar.width = rate / 100 * 607;
                    break;
                case "ZCJLLoadingSkin":
                    this.processBar.width = rate / 100 * 941;
                    break;
                case "WSZWLoadingSkin":
                    this.processBar.width = rate / 100 * 935;
                    break;
                case "Lucky7LoadingSkin":
                    this.processBar.width = rate / 100 * 700;
                    break;
                case "CSDLoadingsSkin":
                    this.maskRect.width = rate / 100 * 795;
                    this.processBar.mask = this.maskRect;
                    break;
                case "XYSGLoadingSkin":
                    this.processBar.width = rate / 100 * 713;
                    break;
                case "XCBSLoadingSkin":
                    this.processBar.width = rate / 100 * 800;
                    break;
                case "SGWSLoadingSkin":
                    this.processBar.x = rate / 100 * 669;
                    this.maskRect.width = rate / 100 * 690;
                    this[`processBar2`].mask = this.maskRect;
                    break;
                case "SNYXLoadingSkin":
                    this.processBar.x = rate / 100 * 826 - 6;
                    this.maskRect.width = rate / 100 * 826;
                    this[`processBar2`].mask = this.maskRect;
                    break;
            }
            if (this.percentLabel) {//位图字体处理
                if (this.percentLabel instanceof eui.BitmapLabel)
                    this.percentLabel.text = rate + "%";
                else
                    this.percentLabel.text = "正在加载..." + rate + "%";
            }
        }
    }
    /**
     * 资源加载完成
     */
    private onResourceLoadOver() {
        if (this.isQuited) return;
        // game.releaseSlotRes.destoryLoadingScene();
        if (isFired) return;
        this.isQuited = true;
        this.loadingBarGroup.visible = false;
        this.clickGroup.visible = true;
        if (this.name == "SDMNLoadingSkin") {
            this.maskImag.visible = true;
            this.processBar.width = 996;
            this.clickDb.x = 640;
            this.clickDb.y = 50;
        } else if (this.name == "SGWSLoadingSkin") {
            this.processBar.x = 0;
        }
        else if (this.name == "SGWSLoadingSkin") {
            this.processBar.x = -6;
        }
        this.enterCBZZ();
    }
    /**
     * 展示点击开始动画
     */
    private showClickAni() {
        GameConst.LOAD_INDEX = 0;
        this.clickStart.alpha = 1;
        egret.Tween.get(this.clickStart).to({ alpha: 0 }, 2000).call(() => {
            this.clickDb.play("", 1);
        });
        this.clickDb.callback = () => {
            return this.showClickAni();
        }
    }
    /**
     * 进入加载完成的游戏
     */
    private enterCBZZ() {
        this.callback && this.callback();
        game.UIUtils.removeFromParent(this);
        SlotLoadingScene._instance = null;
        // this.clickStart.alpha = 1;
    }
}
var SLOT_LOADING_SKIN = {
    dntg: "DNTGLoadingSkin",
    sdxl: "SDXLLoadingSkin",
    cbzz: "CBZZLaodingSkin",
    sdmn: "SDMNLoadingSkin",
    bskg: "BSKGLoadingSkin",
    rdsg: "RDSGLoadingSkin",
    ayls: "AYLSLoadingSkin",
    gdzw: "GDZWLoadingSkin",
    bscs: "BSCSLoadingSkin",
    ceby: "CEBYLoadingSkin",
    xyxm: "XYXMLoadingSkin",
    zcjl: "ZCJLLoadingSkin",
    wszw: "WSZWLoadingSkin",
    lucky7: "Lucky7LoadingSkin",
    csd: "CSDLoadingsSkin",
    xysg: "XYSGLoadingSkin",
    xcbs: "XCBSLoadingSkin",
    sgws: "SGWSLoadingSkin",
    snyx: "SNYXLoadingSkin"
}
var isFired = false;