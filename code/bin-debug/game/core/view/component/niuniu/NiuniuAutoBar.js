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
    var NiuniuAutoBar = (function (_super) {
        __extends(NiuniuAutoBar, _super);
        function NiuniuAutoBar() {
            var _this = _super.call(this) || this;
            _this.qzArr = [];
            _this.yzArr = [];
            _this.skinName = "NiuniuAutoBarSkin";
            return _this;
        }
        NiuniuAutoBar.prototype.getSelcet = function (groupParent) {
            var isClick = false;
            var qzBtn;
            for (var i = 0; i < groupParent.numChildren; ++i) {
                qzBtn = groupParent.getChildAt(i);
                if (qzBtn.selected) {
                    isClick = true;
                }
            }
            return isClick;
        };
        NiuniuAutoBar.prototype.starBtnState = function () {
            var isQZ = this.getSelcet(this.qzGroup);
            var isYZ = this.getSelcet(this.yzGroup);
            var isCount = this.getSelcet(this.countGroup);
            if (isQZ && isYZ && isCount) {
                this.setStartBtnGray(false);
            }
            else {
                this.setStartBtnGray(true);
            }
        };
        /**
         * 重置所有按钮得状态
         * */
        NiuniuAutoBar.prototype.resetState = function () {
            this.resetGroupState(this.qzGroup);
            this.resetGroupState(this.yzGroup);
            this.resetGroupState(this.countGroup);
            this.setStartBtnGray(true);
            this.bt1_lable.visible = false;
            this.bt2_lable.visible = false;
            this.bt3_lable.visible = false;
            this.qzArr = [];
            this.yzArr = [];
        };
        NiuniuAutoBar.prototype.setStartBtnGray = function (isGray) {
            game.UIUtils.setGray(this.startBtn, isGray);
            this.startBtn.touchEnabled = !isGray;
        };
        NiuniuAutoBar.prototype.setRoot = function (root) {
            this.rootScene = root;
        };
        NiuniuAutoBar.prototype.resetGroupState = function (qz) {
            var qzBtn;
            for (var i = 0; i < qz.numChildren; ++i) {
                qzBtn = qz.getChildAt(i);
                qzBtn.selected = false;
            }
        };
        Object.defineProperty(NiuniuAutoBar.prototype, "AutoCount", {
            /**获取挂机得次数 */
            get: function () {
                return this.autoCount;
            },
            enumerable: true,
            configurable: true
        });
        NiuniuAutoBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var radioBtn;
            for (var i = 0; i < this.countGroup.numChildren; ++i) {
                radioBtn = this.countGroup.getChildAt(i);
                radioBtn.addEventListener(egret.Event.CHANGE, this.onChange, this);
            }
            var qzBtn;
            for (var i = 0; i < this.qzGroup.numChildren; ++i) {
                qzBtn = this.qzGroup.getChildAt(i);
                qzBtn.addEventListener(egret.Event.CHANGE, this.onQZChange, this);
            }
            for (var i = 0; i < this.yzGroup.numChildren; ++i) {
                qzBtn = this.yzGroup.getChildAt(i);
                qzBtn.addEventListener(egret.Event.CHANGE, this.onYZChange, this);
            }
        };
        NiuniuAutoBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.countGroup.removeEventListener(egret.Event.CHANGE, this.onChange, this);
            var qzBtn;
            for (var i = 0; i < this.qzGroup.numChildren; ++i) {
                qzBtn = this.qzGroup.getChildAt(i);
                qzBtn.removeEventListener(egret.Event.CHANGE, this.onQZChange, this);
            }
            for (var i = 0; i < this.yzGroup.numChildren; ++i) {
                qzBtn = this.yzGroup.getChildAt(i);
                qzBtn.removeEventListener(egret.Event.CHANGE, this.onYZChange, this);
            }
        };
        NiuniuAutoBar.prototype.onYZChange = function (e) {
            var btn = e.target;
            if (btn.selected) {
                this.addArrayItem(this.yzArr, btn.name);
            }
            else {
                game.Utils.removeArrayItem(this.yzArr, btn.name);
            }
            this.starBtnState();
        };
        NiuniuAutoBar.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.startBtn:
                    this.onClickStartBtn();
                    break;
            }
        };
        NiuniuAutoBar.prototype.onClickStartBtn = function () {
            NiuniuGuaJiConfig.Instance.setRemainCount(this.autoCount);
            NiuniuGuaJiConfig.Instance.setQZArr(this.qzArr);
            NiuniuGuaJiConfig.Instance.setYZArr(this.yzArr);
            LogUtils.logD("======旋转次数=====" + this.autoCount);
            CF.dP(ENo.NIUNIU_GUAJI, true);
            this.visible = false;
            this.rootScene.rectMask.visible = false;
        };
        NiuniuAutoBar.prototype.addArrayItem = function (arr, item) {
            var index = arr.indexOf(item);
            if (index < 0) {
                arr.push(item);
            }
        };
        NiuniuAutoBar.prototype.onQZChange = function (e) {
            var btn = e.target;
            if (!btn.selected) {
                game.Utils.removeArrayItem(this.qzArr, btn.name);
                if (btn.name == "1") {
                    this.bt1_lable.visible = false;
                }
                else if (btn.name == "2") {
                    this.bt2_lable.visible = false;
                }
                else if (btn.name == "3") {
                    this.bt3_lable.visible = false;
                }
            }
            else {
                this.addArrayItem(this.qzArr, btn.name);
                if (btn.name == "1") {
                    this.bt1_lable.visible = true;
                }
                else if (btn.name == "2") {
                    this.bt2_lable.visible = true;
                }
                else if (btn.name == "3") {
                    this.bt3_lable.visible = true;
                }
            }
            this.starBtnState();
        };
        NiuniuAutoBar.prototype.onChange = function (e) {
            var radioButton = e.target;
            this.autoCount = radioButton.value;
            this.starBtnState();
        };
        return NiuniuAutoBar;
    }(game.BaseUI));
    niuniu.NiuniuAutoBar = NiuniuAutoBar;
    __reflect(NiuniuAutoBar.prototype, "niuniu.NiuniuAutoBar");
})(niuniu || (niuniu = {}));
