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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaSetPanl = (function (_super) {
        __extends(ZajinhuaSetPanl, _super);
        function ZajinhuaSetPanl() {
            var _this = _super.call(this) || this;
            _this.skinName = new ZajinhuaSetSkin();
            return _this;
        }
        ZajinhuaSetPanl.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.musicBtn.selected = SoundManager.getInstance().musicVolume == 1;
            this.soundBtn.selected = SoundManager.getInstance().effectVolume == 1;
        };
        ZajinhuaSetPanl.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.closeBtn:
                case this.rect:
                    this.rect.visible = false;
                    CF.sN(PanelNotify.CLOSE_ZJHSET);
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
        ZajinhuaSetPanl.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
        };
        return ZajinhuaSetPanl;
    }(game.BaseComponent));
    zajinhua.ZajinhuaSetPanl = ZajinhuaSetPanl;
    __reflect(ZajinhuaSetPanl.prototype, "zajinhua.ZajinhuaSetPanl");
})(zajinhua || (zajinhua = {}));
