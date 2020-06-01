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
    var NiuniuNewYZBar = (function (_super) {
        __extends(NiuniuNewYZBar, _super);
        function NiuniuNewYZBar() {
            var _this = _super.call(this) || this;
            _this.qzList = [];
            _this.skinName = new NiuniuNewYZBtnSkin();
            return _this;
        }
        NiuniuNewYZBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        NiuniuNewYZBar.prototype.show = function (qzData) {
            this.qzList = [];
            var i = 0;
            for (var key in qzData) {
                this.qzList.push(parseInt(key));
                var result = qzData[key];
                if (!result) {
                    // if (this['btn' + i].an) {
                    game.UIUtils.setGray(this["btn" + i]);
                    // 	this['btn' + i].an.visible = true;
                    // 	this['btn' + i].labelDisplay.alpha = 0.5;
                    // }
                    this['btn' + i].touchEnabled = false;
                }
                else {
                    if (this['btn' + i].ming) {
                        this['btn' + i].ming.visible = true;
                    }
                    this['btn' + i].touchEnabled = true;
                }
                if (this['btn' + i].labelDisplay) {
                    this['btn' + i].labelDisplay.text = "x " + key;
                }
                i++;
            }
            this.visible = true;
        };
        NiuniuNewYZBar.prototype.setRoot = function (root) {
            this.rootScene = root;
        };
        NiuniuNewYZBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.btn0:
                    //不抢
                    this.rootScene.sendYZReq(this.qzList[0]);
                    break;
                case this.btn1:
                    //第一个按钮
                    this.rootScene.sendYZReq(this.qzList[1]);
                    break;
                case this.btn2:
                    //第二个按钮
                    this.rootScene.sendYZReq(this.qzList[2]);
                    break;
                case this.btn3:
                    //第三个按钮
                    this.rootScene.sendYZReq(this.qzList[3]);
                    break;
                case this.btn4:
                    //第三个按钮
                    this.rootScene.sendYZReq(this.qzList[4]);
                    break;
            }
        };
        return NiuniuNewYZBar;
    }(game.BaseUI));
    niuniu.NiuniuNewYZBar = NiuniuNewYZBar;
    __reflect(NiuniuNewYZBar.prototype, "niuniu.NiuniuNewYZBar");
})(niuniu || (niuniu = {}));
