/**
 * 场景转换时候的资源加载
 */
class RotationLoading extends game.BaseComponent {
    private static _instance: RotationLoading;
    private callback: Function;
    private rotationImage: eui.Image;
    private progressLabel: eui.Label;
    private zOrder: number;
    private closeBtn: eui.Button;
    private groupName; string;
    public constructor() {
        super();
        if (RotationLoading._instance) {
            throw new Error("SceneLoading使用单例");
        }
        this.skinName = new RotationLoadingSkin();
    }

    public static get instance(): RotationLoading {
        if (!RotationLoading._instance) {
            RotationLoading._instance = new RotationLoading();
        }
        return RotationLoading._instance;
    }
    /**
     * 加载资源组名，背景图片，回调
     * @param  {string} resGroup
     * @param  {string} bgSource
     * @param  {Function} callback
     */
    public load(resGroup: string[], bgSource: string, callback: Function, zOrder: number = 0) {
        this.zOrder = zOrder;
        game.UIUtils.changeResize(1);
        this.groupName = RESUtils.combGroupName(resGroup);
        if (RES.isGroupLoaded(this.groupName)) {
            game.UIUtils.removeFromParent(this);
            RotationLoading._instance = null;
            callback && callback();
            return;
        }
        this.progressLabel.text = "0%";
        egret.Tween.removeTweens(this);
        egret.Tween.get(this.rotationImage, { loop: true }).to({
            rotation: this.rotationImage.rotation - 360
        }, 1500);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    }


    /**
    * 开始加载资源
    */
    public beganLoadResGroup() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.groupName, this.zOrder);
    }

    public createChildren() {
        super.createChildren();
    }

    public onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.closeBtn:
                this.callback = null;
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                egret.Tween.removeTweens(this.rotationImage);
                game.UIUtils.removeFromParent(this);
                RotationLoading._instance = null;
                break;
        }
    }


    private onResourceLoadComplete(e: RES.ResourceEvent): void {
        if (e.groupName == this.groupName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(e: RES.ResourceEvent): void {
        if (e.groupName == this.groupName) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.progressLabel.text = rate + "%";
        }
    }

    private onResourceLoadOver() {
        egret.Tween.removeTweens(this.rotationImage);
        game.UIUtils.removeFromParent(this);
        RotationLoading._instance = null;
        this.callback && this.callback();
    }
}