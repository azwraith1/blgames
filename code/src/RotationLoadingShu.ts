/**
 * 场景转换时候的资源加载
 */
class RotationLoadingShu extends game.BaseComponent {
    private static _instance: RotationLoadingShu;
    private callback: Function;
    private rotationImage: eui.Image;
    private progressLabel: eui.Label;
    private zOrder: number = 0;
    private closeBtn: eui.Button;
    public constructor() {
        super();
        if (RotationLoadingShu._instance) {
            throw new Error("SceneLoading使用单例");
        }
        this.skinName = new RotationLoadingShuSkin();
    }

    public static get instance(): RotationLoadingShu {
        if (!RotationLoadingShu._instance) {
            RotationLoadingShu._instance = new RotationLoadingShu();
        }
        return RotationLoadingShu._instance;
    }

    public onAdded() {
        super.onAdded();
    }

    public onRemoved() {
        super.onRemoved();
    }

    private groupName; string;
    /**
     * 加载资源组名，背景图片，回调
     * @param  {string} resGroup
     * @param  {string} bgSource
     * @param  {Function} callback
     */
    public load(resGroup: string[], bgSource: string, callback: Function, zOrder: number = 0) {
        game.UIUtils.changeResize(2);
        this.zOrder = zOrder;
        this.groupName = RESUtils.combGroupName(resGroup);
        if (RES.isGroupLoaded(this.groupName)) {
            game.UIUtils.removeFromParent(this);
            RotationLoadingShu._instance = null;
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

    public createChildren() {
        super.createChildren();
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

    public onTouchTap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.closeBtn:
                this.callback = null;
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                egret.Tween.removeTweens(this.rotationImage);
                game.UIUtils.removeFromParent(this);
                RotationLoadingShu._instance = null;
                break;
        }
    }

    private onResourceLoadOver() {
        egret.Tween.removeTweens(this.rotationImage);
        game.UIUtils.removeFromParent(this);
        RotationLoadingShu._instance = null;
        this.callback && this.callback();

    }
}