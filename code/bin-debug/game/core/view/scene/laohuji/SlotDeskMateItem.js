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
    var SlotDeskItem = (function (_super) {
        __extends(SlotDeskItem, _super);
        function SlotDeskItem() {
            var _this = _super.call(this) || this;
            _this.skinName = new SlotDeskMateItemSkin();
            return _this;
        }
        SlotDeskItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        SlotDeskItem.prototype.initItem = function (name, head, gid) {
            if (name && head) {
                this.userHead.source = head;
                this.userName.text = name + "";
                this.gid = gid;
                this.deskItemGroup.visible = true;
            }
        };
        SlotDeskItem.prototype.playerLeave = function () {
            this.deskItemGroup.visible = false;
            this.userHead.source = "";
            this.userName.text = "";
        };
        SlotDeskItem.prototype.playerEnter = function (name, head, gid) {
            if (name && head) {
                this.userHead.source = head;
                this.userName.text = name + "";
                this.deskItemGroup.visible = true;
                this.gid = gid;
            }
        };
        return SlotDeskItem;
    }(eui.Component));
    slot.SlotDeskItem = SlotDeskItem;
    __reflect(SlotDeskItem.prototype, "slot.SlotDeskItem");
})(slot || (slot = {}));
