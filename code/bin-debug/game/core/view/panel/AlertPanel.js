/**
 *
 */
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
var game;
(function (game) {
    var AlertPanel = (function (_super) {
        __extends(AlertPanel, _super);
        function AlertPanel(tipContentData) {
            var _this = _super.call(this) || this;
            _this.haveColor = false;
            _this.tipsText = tipContentData.tips;
            if (tipContentData.haveColor) {
                _this.haveColor = tipContentData.haveColor;
            }
            _this.okCallback = tipContentData.okCallback || null;
            _this.noCallback = tipContentData.noCallback || null;
            _this.onlyOkBtn = tipContentData.onlyOkBtn || false;
            if (GameConfig.CURRENT_ISSHU && AlertShuSkin) {
                _this.skinName = new AlertShuSkin();
                return _this;
            }
            _this.skinName = new AlertSkin();
            return _this;
        }
        AlertPanel.prototype.setTxtColor = function (initGold, curGainGold, overloadBackGold) {
            this.labelTxt.textFlow = (new egret.HtmlTextParser).parser('<font>本局携带金额为</font>'
                + '<font color=0x159b7a>' + initGold + '</font>'
                + '<font>,当前赢取</font>'
                + '<font color=0x159b7a>' + curGainGold + '</font>'
                + '<font>,以小博大退还</font>'
                + '<font color=0x159b7a>' + overloadBackGold + '</font>');
        };
        AlertPanel.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.btnOk:
                    this.btnOkTouchEnded();
                    break;
                case this.btnNo:
                    this.btnNoTouchEnded();
                    break;
            }
            e.stopPropagation();
        };
        AlertPanel.prototype.btnNoTouchEnded = function () {
            if (this.noCallback) {
                this.noCallback();
            }
            this.btnNo.touchEnabled = false;
            CF.sN(PanelNotify.CLOSE_ALERT);
        };
        AlertPanel.prototype.btnOkTouchEnded = function () {
            if (this.okCallback) {
                this.okCallback();
            }
            this.btnOk.touchEnabled = false;
            CF.sN(PanelNotify.CLOSE_ALERT);
        };
        AlertPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.onlyOkBtn) {
                this.btnOk.horizontalCenter = 0;
                this.btnNo.visible = false;
            }
            if (this.haveColor) {
                this.setTxtColor(this.tipsText["initGold"], this.tipsText["curGainGold"], this.tipsText["overloadBackGold"]);
            }
            else {
                this.labelTxt && (this.labelTxt.text = this.tipsText);
            }
            this.tipsImage.source = RES.getRes("alert_wz" + CF.tic);
            this.btnOk.labelDisplay.text = TextUtils.instance.getCurrentTextById(83);
            this.btnNo.labelDisplay.text = TextUtils.instance.getCurrentTextById(104);
        };
        AlertPanel.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        AlertPanel.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.EVENT_RESIZE, this.eventResize, this);
        };
        return AlertPanel;
    }(game.BaseComponent));
    game.AlertPanel = AlertPanel;
    __reflect(AlertPanel.prototype, "game.AlertPanel");
})(game || (game = {}));
