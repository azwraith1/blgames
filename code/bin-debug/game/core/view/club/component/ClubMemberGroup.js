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
var ClubMemberGroup = (function (_super) {
    __extends(ClubMemberGroup, _super);
    // private prePageLable: eui.Label;
    // private nextPageLable: eui.Label;
    function ClubMemberGroup() {
        var _this = _super.call(this) || this;
        _this.itemListArr = [];
        _this.itemCheckArr = [];
        _this.itemManageArr = [];
        _this.delta = 5;
        return _this;
        //this.skinName = `ClubMemberListGroupSkin${CF.tis}`;
        // LogUtils.logD("+===CF.tis==="+CF.tis);
    }
    ClubMemberGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.createAllItems();
        this.currentPage = 1;
    };
    ClubMemberGroup.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.prePageBtn:
                this.onTouchPre();
                break;
            case this.nextPageBtn:
                this.onTouchNext();
                break;
        }
    };
    ClubMemberGroup.prototype.crateItemsGroup = function (type, parentArr, clazz) {
        for (var i = 0; i < 5; ++i) {
            var item = new clazz(type);
            item.width = 694;
            item.height = 72;
            parentArr.push(item);
        }
    };
    ClubMemberGroup.prototype.createAllItems = function () {
        this.crateItemsGroup(MEMBER_NAME.CLUB_LIST, this.itemListArr, ClubMemberList);
        this.crateItemsGroup(MEMBER_NAME.CLUB_CHECK, this.itemCheckArr, ClubMemberCheck);
        this.crateItemsGroup(MEMBER_NAME.CLUB_MANAGE, this.itemManageArr, ClubMemerManage);
    };
    ClubMemberGroup.prototype.onTouchPre = function () {
        this.currentPage -= 1;
        if (this.currentPage < 1)
            this.currentPage = 1;
        this.showData();
    };
    ClubMemberGroup.prototype.onTouchNext = function () {
        this.currentPage += 1;
        if (this.currentPage > this.maxPage)
            this.currentPage = this.maxPage;
        this.showData();
    };
    ClubMemberGroup.prototype.initItemGroup = function () {
        this.itemGroup.removeChildren();
        this.currentPage = 1;
        switch (this.currentID) {
            case MEMBER_NAME.CLUB_LIST:
                this.init(this.itemListArr);
                break;
            case MEMBER_NAME.CLUB_CHECK:
                this.init(this.itemCheckArr);
                break;
            case MEMBER_NAME.CLUB_MANAGE:
                this.init(this.itemManageArr);
                break;
        }
    };
    ClubMemberGroup.prototype.init = function (targetArr) {
        for (var i = 0; i < targetArr.length; ++i) {
            var item = targetArr[i];
            item.setRoot(this);
            this.itemGroup.addChild(item);
        }
    };
    ClubMemberGroup.prototype.setData = function (data, currentId) {
        this.data = data;
        this.currentID = currentId;
        this.initItemGroup();
        this.maxPage = Math.ceil(this.data.length / this.delta);
        if (this.maxPage <= 0)
            this.currentPage = this.maxPage = 1;
        this.showData();
        if (currentId == MEMBER_NAME.CLUB_CHECK) {
            var item = this.root.getCheckItem();
            ClubInnerHallScene.instance.redPointImg.visible = item.redPoint.visible = this.data.length > 0;
            ClubManager.instance.canShowPoint = this.data.length > 0;
        }
    };
    ClubMemberGroup.prototype.setRoot = function (root) {
        this.root = root;
    };
    ClubMemberGroup.prototype.showData = function () {
        var pageStartIndex = (this.currentPage - 1) * this.delta;
        this.renderAllItems(this.data.slice(pageStartIndex, pageStartIndex + this.delta));
        this.currentDivMax.text = this.currentPage + "/" + this.maxPage;
    };
    ClubMemberGroup.prototype.renderAllItems = function (data) {
        var temp;
        for (var i = 0; i < 5; ++i) {
            temp = data[i];
            var item = this.itemGroup.getChildAt(i);
            if (temp) {
                item.visible = true;
                item.renderUI(temp);
            }
            else {
                item.visible = false;
            }
        }
    };
    ClubMemberGroup.prototype.hide = function () {
        this.itemGroup.removeChildren();
    };
    return ClubMemberGroup;
}(game.BaseComponent));
__reflect(ClubMemberGroup.prototype, "ClubMemberGroup");
