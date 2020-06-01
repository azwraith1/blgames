var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TipsCompoment = (function (_super) {
    __extends(TipsCompoment, _super);
    function TipsCompoment() {
        var _this = _super.call(this) || this;
        _this._cache = new HashMap();
        if (TipsCompoment._instance) {
            throw new Error("DateTimer使用单例");
        }
        _this.skinName = new TipsSkin();
        return _this;
    }
    Object.defineProperty(TipsCompoment, "instance", {
        get: function () {
            if (!TipsCompoment._instance) {
                TipsCompoment._instance = new TipsCompoment();
            }
            return TipsCompoment._instance;
        },
        enumerable: true,
        configurable: true
    });
    TipsCompoment.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.touchEnabled = false;
        this.touchChildren = false;
        this.textLabel.textColor = 0XFFFFFF;
    };
    TipsCompoment.prototype.show = function (txt) {
        var _this = this;
        if (!TextUtils.instance.isChinese()) {
            return;
        }
        this.x = 0;
        this.rotation = 0;
        this.textLabel.text = txt;
        egret.Tween.removeTweens(this);
        if (!this.parent) {
            GameLayerManager.gameLayer().maskLayer.addChild(this);
        }
        this.visible = true;
        this.y = -this.height;
        this.resizeGroup.width = this.width = GameConfig.curWidth();
        egret.Tween.get(this).to({
            y: 0
        }, 200).wait(5000).to({
            y: -this.height
        }, 200).call(function () {
            _this.visible = false;
        });
    };
    return TipsCompoment;
}(eui.Component));
__reflect(TipsCompoment.prototype, "TipsCompoment");
