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
var ClubInviteItem = (function (_super) {
    __extends(ClubInviteItem, _super);
    function ClubInviteItem() {
        var _this = _super.call(this) || this;
        // OFFLINE: 1, //离线
        // ONLINE: 2, //在线
        // MATCHING: 3, //匹配
        // GAMING: 4, //游戏中
        _this.canInvite = false;
        _this.skinName = "ClubInviteItemSkin" + CF.tis;
        return _this;
    }
    ClubInviteItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ClubInviteItem.prototype.dataChanged = function () {
        this.updateShow(this.data);
    };
    ClubInviteItem.prototype.updateShow = function (data) {
        if (data) {
            var head = "hall_header_" + data.sex + "_" + data.figureUrl + "_png";
            this.userHead.source = head;
            this.userName.text = "" + data.nickname;
            this.checkBtnState(data.status);
            this.playerId = data.id;
        }
    };
    ClubInviteItem.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    ClubInviteItem.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.inviteBtn:
                this.invite();
                break;
        }
    };
    ClubInviteItem.prototype.checkBtnState = function (state) {
        if (state == 2) {
            this.statusLabel.text = "(" + TextUtils.instance.getCurrentTextById(109) + ")";
            this.inviteBtn.source = RES.getRes("club_invite_1_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn1_kr_png");
            }
            this.inviteBtn.touchEnabled = true;
            this.canInvite = true;
            this.statusLabel.textColor = 0x2ac664;
        }
        else {
            this.inviteBtn.source = RES.getRes("club_invite_btn2_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn2_kr_png");
            }
            this.inviteBtn.touchEnabled = false;
            if (state == 1) {
                this.statusLabel.text = "(" + TextUtils.instance.getCurrentTextById(110) + ")";
                this.statusLabel.textColor = 0x9fa4a7;
            }
            else if (state == 4 || state == 3) {
                this.statusLabel.text = "(" + TextUtils.instance.getCurrentTextById(31) + ")";
                this.statusLabel.textColor = 0xf64c1e;
            }
            this.canInvite = false;
        }
    };
    ClubInviteItem.prototype.invite = function () {
        if (this.canInvite) {
            this.inviteBtn.source = RES.getRes("club_invite_2_png");
            if (CF.tis == "KR") {
                this.inviteBtn.source = RES.getRes("club_invite_btn2_kr_png");
            }
            this.inviteBtn.touchEnabled = false;
            this.sendInvite();
        }
    };
    ClubInviteItem.prototype.sendInvite = function () {
        var _this = this;
        CF.dP(ENo.CLUB_INVITE_PLAYER, { playerId: this.playerId });
        egret.setTimeout(function () {
            _this.inviteBtn.source = RES.getRes("club_invite_1_png");
            if (CF.tis == "KR") {
                _this.inviteBtn.source = RES.getRes("club_invite_btn1_kr_png");
            }
            _this.inviteBtn.touchEnabled = true;
        }, this, 15000);
    };
    return ClubInviteItem;
}(game.BaseItemRender));
__reflect(ClubInviteItem.prototype, "ClubInviteItem");
