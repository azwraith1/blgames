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
var niuniu;
(function (niuniu) {
    var NiuniuNewQZBar = (function (_super) {
        __extends(NiuniuNewQZBar, _super);
        function NiuniuNewQZBar() {
            var _this = _super.call(this) || this;
            _this.qzList = [];
            _this.skinName = new NiuniuNewBtnSkin();
            return _this;
        }
        NiuniuNewQZBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NiuniuNewQZBar.prototype.show = function (qzData) {
            this.qzList = [];
            for (var key in qzData) {
                this.qzList.push(parseInt(key));
                var result = qzData[key];
                if (!result) {
                    // if (this['btn' + key].an) {
                    // 	this['btn' + key].an.visible = true;
                    // 	this['btn' + key].labelDisplay.alpha = 0.5;
                    // 	this['btn' + key].labelDisplay1.alpha = 0.5;
                    if (key != "0") {
                        game.UIUtils.setGray(this["btn" + key]);
                    }
                    // }
                    this['btn' + key].touchEnabled = false;
                }
                else {
                    if (this['btn' + key].ming) {
                        this['btn' + key].ming.visible = true;
                    }
                    this['btn' + key].touchEnabled = true;
                }
                // if (this['btn' + key].labelDisplay) {
                // 	this['btn' + key].labelDisplay.text = "x" + key;
                // }
            }
            this.visible = true;
        };
        NiuniuNewQZBar.prototype.setRoot = function (root) {
            this.rootScene = root;
        };
        NiuniuNewQZBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            LogUtils.logD("====抢庄===list" + this.qzList);
            switch (e.target) {
                case this.btn0:
                    //不抢
                    this.rootScene.sendQZReq(this.qzList[0]);
                    break;
                case this.btn1:
                    //第一个按钮
                    this.rootScene.sendQZReq(this.qzList[1]);
                    break;
                case this.btn2:
                    //第二个按钮
                    this.rootScene.sendQZReq(this.qzList[2]);
                    break;
                case this.btn3:
                    //第三个按钮
                    this.rootScene.sendQZReq(this.qzList[3]);
                    break;
            }
        };
        return NiuniuNewQZBar;
    }(game.BaseUI));
    niuniu.NiuniuNewQZBar = NiuniuNewQZBar;
    __reflect(NiuniuNewQZBar.prototype, "niuniu.NiuniuNewQZBar");
})(niuniu || (niuniu = {}));
