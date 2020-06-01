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
    var SlotDeskMate = (function (_super) {
        __extends(SlotDeskMate, _super);
        function SlotDeskMate() {
            var _this = _super.call(this) || this;
            _this.skinName = new SlotDeskMateSkin();
            return _this;
        }
        Object.defineProperty(SlotDeskMate, "instance", {
            get: function () {
                if (!SlotDeskMate._instance) {
                    SlotDeskMate._instance = new SlotDeskMate();
                }
                return SlotDeskMate._instance;
            },
            enumerable: true,
            configurable: true
        });
        SlotDeskMate.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SlotDeskMate.prototype.initDeskMate = function () {
            for (var i = 0; i < game.LaohuUtils.slotDeskName.length; i++) {
                this["item" + (i + 1)].initItem(game.LaohuUtils.slotDeskName[i], game.LaohuUtils.slotDeskHead[i], game.LaohuUtils.slotDeskGid[i]);
                if (game.LaohuUtils.slotDeskName.length < 4) {
                    for (var j = game.LaohuUtils.slotDeskName.length; j <= 4; j++) {
                        if (this["item" + (j + 1)]) {
                            this["item" + (j + 1)].playerLeave();
                        }
                    }
                }
            }
        };
        SlotDeskMate.prototype.playerLeave = function () {
            for (var i = 1; i <= 4; i++) {
                if (this["item" + i].gid == game.LaohuUtils.playerEnter.gid) {
                    this["item" + i].playerLeave();
                    game.LaohuUtils.slotDeskHead.splice(i - 1, 1);
                    game.LaohuUtils.slotDeskName.splice(i - 1, 1);
                    game.LaohuUtils.slotDeskGid.splice(i - 1, 1);
                    this.initDeskMate();
                }
            }
        };
        SlotDeskMate.prototype.playerEnter = function () {
            if (game.LaohuUtils.slotDeskGid.length == 4) {
                return;
            }
            game.LaohuUtils.slotDeskName.push(game.LaohuUtils.playerEnter.name);
            game.LaohuUtils.slotDeskHead.push(game.LaohuUtils.playerEnter.head);
            game.LaohuUtils.slotDeskGid.push(game.LaohuUtils.playerEnter.gid);
            this["item" + game.LaohuUtils.slotDeskGid.length].playerEnter(game.LaohuUtils.playerEnter.name, game.LaohuUtils.playerEnter.head, game.LaohuUtils.playerEnter.gid);
        };
        // public playerBigwin(data) {
        //     let playerId = data.playerIndex;
        //     let gainGold = data.gainGold;
        //     this.binwinGold.text = gainGold + "";
        //     this.goldDownAni = new DBComponent("slot_desk_win");
        //     this.goldDownAni.play("", 0);
        //     this.goldDownAni.horizontalCenter = 0; this.goldDownAni.bottom = 0;
        //     this.goldDownAni.touchEnabled = false;
        //     this[`baseGroup`].addChild(this.goldDownAni);
        //     this.goldDownAni.resetPosition();
        //     var m = new egret.Shape(); m.graphics.beginFill(0xffffff); m.graphics.drawRect(0, 0, 223, 150);
        //     m.x = 0;
        //     m.y = -40;
        //     m.graphics.endFill();
        //     this.addChild(m);
        //     this[`slotdeskGroup`].mask = m;
        //     for (let i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
        //         if (playerId == game.LaohuUtils.slotDeskGid[i]) {
        //             this.item.initItem(game.LaohuUtils.slotDeskName[i], game.LaohuUtils.slotDeskHead[i], game.LaohuUtils.slotDeskGid[i]);
        //         }
        //     }
        //     egret.setTimeout(() => {
        //         this[`winGroup`].visible = false;
        //         this.item.visible = true;
        //         egret.setTimeout(() => {
        //             game.UIUtils.removeSelf(this.goldDownAni);
        //             this.currentState = "common";
        //             this.validateNow();
        //             this[`slotdeskGroup`].mask = null;
        //             game.UIUtils.removeSelf(m);
        //             this[`winGroup`].visible = true;
        //             this.item.visible = false;
        //         }, this, 3000);
        //     }, this, 5000);
        // }
        SlotDeskMate.prototype.touchOn = function () {
            this.touchonImag.source = "sgws_hall_desk_light_png";
        };
        SlotDeskMate.prototype.touchOff = function () {
            this.touchonImag.source = "sgws_hall_desk_dack_png";
        };
        return SlotDeskMate;
    }(eui.Component));
    slot.SlotDeskMate = SlotDeskMate;
    __reflect(SlotDeskMate.prototype, "slot.SlotDeskMate");
})(slot || (slot = {}));
