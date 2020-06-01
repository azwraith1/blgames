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
// TypeScript file
var slot;
(function (slot) {
    var SlotDeskWinIten = (function (_super) {
        __extends(SlotDeskWinIten, _super);
        function SlotDeskWinIten() {
            var _this = _super.call(this) || this;
            _this.skinName = "SlotDeskWinSkin";
            return _this;
        }
        Object.defineProperty(SlotDeskWinIten, "instance", {
            get: function () {
                if (!SlotDeskWinIten._instance) {
                    SlotDeskWinIten._instance = new SlotDeskWinIten();
                }
                return SlotDeskWinIten._instance;
            },
            enumerable: true,
            configurable: true
        });
        SlotDeskWinIten.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SlotDeskWinIten.prototype.showWin = function (data) {
            var _this = this;
            this.goldDownAni = new DBComponent("slot_desk_win");
            this.goldDownAni.play("", 0);
            this.goldDownAni.horizontalCenter = 100;
            this.goldDownAni.bottom = -45;
            this.goldDownAni.touchEnabled = false;
            this["baseGroup"].addChild(this.goldDownAni);
            this["baseGroup"].addChild(this.userGroup);
            this["baseGroup"].addChild(this.winGroup);
            this.goldDownAni.resetPosition();
            var playerId = data.playerIndex;
            var gainGold = data.gainGold;
            this.winGold.text = gainGold + "";
            for (var i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
                if (playerId == game.LaohuUtils.slotDeskGid[i]) {
                    this.userHead.source = game.LaohuUtils.slotDeskHead[i];
                    this.userName.text = game.LaohuUtils.slotDeskName[i];
                }
            }
            egret.Tween.get(this.userGroup).to({ alpha: 1 }, 4000).to({ alpha: 0 }, 1000).call(function () {
                _this.winGroup.visible = true;
            });
        };
        SlotDeskWinIten.prototype.remove = function () {
            game.UIUtils.removeSelf(this);
            SlotDeskWinIten._instance = null;
        };
        return SlotDeskWinIten;
    }(eui.Component));
    slot.SlotDeskWinIten = SlotDeskWinIten;
    __reflect(SlotDeskWinIten.prototype, "slot.SlotDeskWinIten");
})(slot || (slot = {}));
