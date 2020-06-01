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
var majiang;
(function (majiang) {
    var HSZBar = (function (_super) {
        __extends(HSZBar, _super);
        function HSZBar() {
            var _this = _super.call(this) || this;
            _this.skinName = new HSZBarSkin();
            return _this;
        }
        HSZBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.timeCount = 10000;
        };
        HSZBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.enterBtn:
                    this.enterBtnTouch();
                    break;
            }
        };
        HSZBar.prototype.enterBtnTouch = function () {
            this.lock = true;
            this.root.sendHSZReq();
            this.visible = false;
            this.root.otherChose.visible = true;
        };
        HSZBar.prototype.hszNumberChange = function (e) {
            var num = e.data;
            if (num == 3) {
                this.enterBtn.touchEnabled = true;
                this.enterBtn.getChildAt(0)['source'] = RES.getRes("hsz_btn_bg_png");
                // this.bgImage.source = 
            }
            else {
                this.enterBtn.touchEnabled = false;
                this.enterBtn.getChildAt(0)['source'] = RES.getRes("hsz_btn_bg1_png");
            }
        };
        HSZBar.prototype.onStart = function (root) {
            this.root = root;
            CF.aE(ENo.HSZ_SELECT_NUM, this.hszNumberChange, this);
        };
        HSZBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        HSZBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.HSZ_SELECT_NUM, this.hszNumberChange, this);
        };
        return HSZBar;
    }(game.BaseUI));
    majiang.HSZBar = HSZBar;
    __reflect(HSZBar.prototype, "majiang.HSZBar");
})(majiang || (majiang = {}));
