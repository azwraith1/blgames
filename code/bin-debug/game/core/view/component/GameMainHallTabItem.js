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
var GameMainHallTabItem = (function (_super) {
    __extends(GameMainHallTabItem, _super);
    function GameMainHallTabItem(gameId) {
        var _this = _super.call(this, gameId) || this;
        _this.skinName = "GameMainTabItemSkin";
        return _this;
    }
    GameMainHallTabItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    GameMainHallTabItem.prototype.showStatus = function (isSeelect) {
        this.isSelect = isSeelect;
        this.listDB.removeChildren();
        if (isSeelect) {
            this.txtBg.visible = true;
            this.gameIdImage.source = "club_main_" + this.gameId + "_down_png";
            this.listDB.visible = true;
            var mc = GameCacheManager.instance.getCache("dt20_list_1");
            if (!mc) {
                mc = new DBComponent("dt20_list");
                GameCacheManager.instance.setCache("dt20_list_1", mc);
            }
            //let db: DBComponent = new DBComponent("dt20_list");
            this.listDB.addChild(mc);
            mc.playByFilename(-1);
        }
        else {
            this.txtBg.visible = false;
            this.listDB.visible = false;
            this.gameIdImage.source = "club_main_" + this.gameId + "_up_png";
        }
        if (TextUtils.instance.currentLanguage == "ko_kr") {
            TextUtils.instance.changeImage(this.gameIdImage);
        }
    };
    return GameMainHallTabItem;
}(ClubInnerRecordTabItem));
__reflect(GameMainHallTabItem.prototype, "GameMainHallTabItem");
