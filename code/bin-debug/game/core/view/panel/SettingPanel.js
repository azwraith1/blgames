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
var SettingPanel = (function (_super) {
    __extends(SettingPanel, _super);
    function SettingPanel(setIndex) {
        if (setIndex === void 0) { setIndex = null; }
        var _this = _super.call(this) || this;
        if (setIndex == 1) {
            _this.skinName = "SettingMainSkin" + CF.tis;
            return _this;
        }
        else if (setIndex == 2) {
            _this.skinName = new DZMJSettingSkin();
            return _this;
        }
        else if (setIndex == "baccarat") {
            _this.skinName = "BJLSettingSkin" + CF.tis;
            return _this;
        }
        else if (setIndex == "blackjack") {
            _this.skinName = "BlackjSettingSkin" + CF.tis;
            return _this;
        }
        else if (setIndex == "majiang") {
            _this.skinName = "SettingMainSkin" + CF.tis;
            return _this;
        }
        else if (setIndex == "baicao" || setIndex == "superbaicao") {
            _this.skinName = "BaiCaoSettingSkin";
            return _this;
        }
        else if (setIndex == "bdz") {
            _this.skinName = "SettingMainSkinKR";
            return _this;
        }
        if (GameConfig.CURRENT_ISSHU && SettingShuSkin) {
            _this.skinName = new SettingShuSkin();
            return _this;
        }
        _this.skinName = new SettingSkin();
        return _this;
    }
    SettingPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.musicBtn.selected = SoundManager.getInstance().musicVolume == 1;
        this.soundBtn.selected = SoundManager.getInstance().effectVolume == 1;
    };
    SettingPanel.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.closeBtn:
            case this.rects:
                this.rects.visible = false;
                CF.sN(PanelNotify.CLOSE_SETTING);
                break;
            case this.musicBtn://音乐开关
                if (SoundManager.getInstance().musicVolume) {
                    SoundManager.getInstance().musicVolume = 0;
                }
                else {
                    SoundManager.getInstance().musicVolume = 1;
                }
                break;
            case this.soundBtn://声音开关
                if (SoundManager.getInstance().effectVolume) {
                    SoundManager.getInstance().effectVolume = 0;
                }
                else {
                    SoundManager.getInstance().effectVolume = 1;
                }
                break;
        }
    };
    SettingPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    return SettingPanel;
}(game.BaseComponent));
__reflect(SettingPanel.prototype, "SettingPanel");
