/**
 * Created by egret on 2016/1/26.
 */
class Toast extends egret.DisplayObjectContainer {

    //存放Toast的容器
    private static _group: eui.Group;
    private static _cont: egret.DisplayObjectContainer;

    constructor() {
        super();
    }


    public static init(cont: egret.DisplayObjectContainer): void {
        this._cont = cont;
    }

    /**
     * 创建一个Toast弹窗的方法
     * 使用：Toast.launch(显示文本，对应的Toashi自定义皮肤路径,消失时间（可选）)
     * 前提： 
     *       1.需要先在游戏初始化时，初始化Toast.init(主舞台)
     *       2.所自定义的皮肤文件中，显示文本所对应的控件id，必须为label_toastcont
     */
    public static launch(msg: string, duration: number = 1200): void {
        if(!msg || msg==""){
            return;
        }
        if (this._cont) {
            if (!this._group) {
                //布局
                var vLayout: eui.VerticalLayout = new eui.VerticalLayout();
                vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
                this._group = new eui.Group();
                this._group.layout = vLayout;
                this._cont.addChild(this._group);
                this._group.touchEnabled = false;
                this._group.touchChildren = false;
            }
            this._group.width = GameConfig.CURRENT_WIDTH;
            //创建一个自定义的Toast
            var toast: ObjToast = new ObjToast();
            //自定义Toast的皮肤，可当成参数传入
            //toast.skinName = my_skin;
            toast.abxca = msg;
            var num = this._group.height / toast.height;
            toast.x = (GameConfig.CURRENT_WIDTH - toast.width) / 2;
            this._group.addChild(toast);
            if (num > 0.0) {
                this._group.y = this._group.y - (toast.height + 6);
            } else {
                this._group.y = GameConfig.CURRENT_HEIGHT / 2 - toast.height / 2;
            }
            egret.Tween.get(toast)
                .to({ alpha: 1 }, 800, egret.Ease.quintOut)
                .wait(duration)
                .to({ alpha: 0 }, 1200, egret.Ease.quintIn).call(() => {      /*  y: this.y - 50, */
                    if (this._group) {
                        var tmpMc: any = this._group.getChildAt(0);
                        this._group.removeChild(tmpMc);
                        tmpMc = null;
                        this._group.y += (toast.height + 6)
                    }
                });
        }
    }
}