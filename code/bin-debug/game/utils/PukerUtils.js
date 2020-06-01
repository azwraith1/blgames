var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-10-18 15:26:45
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-24 18:21:50
 * @Description: 扑克工具类
 */
var PukerUtils = (function () {
    function PukerUtils() {
    }
    /**
     * 数字转扑克值
     * @param  {} number
     */
    PukerUtils.number2Puker = function (number) {
        if (number > 1 && number <= 10) {
            return number;
        }
        else if (number == 11) {
            return "J";
        }
        else if (number == 12) {
            return "Q";
        }
        else if (number == 13) {
            return "K";
        }
        else {
            return "A";
        }
    };
    /**
     * 0没事 1通吃 -1通赔
     * 判断通输或者通吃
     */
    PukerUtils.checkTongShuOrChi = function (records) {
        var group = _.groupBy(records, function (record) {
            return record.gainGold > 0;
        });
    };
    PukerUtils.showZJTongChi = function (effectGroup) {
        var db = GameCacheManager.instance.getCache("nn_tongchi");
        if (!db) {
            db = new DBComponent("nn_tongchi");
            GameCacheManager.instance.setCache("nn_tongchi", db);
        }
        db.callback = function () {
            game.UIUtils.removeSelf(db);
            GameCacheManager.instance.setCache("nn_tongchi", db);
        };
        effectGroup.addChild(db);
        db.verticalCenter = db.height / 2 - 150;
        db.horizontalCenter = db.width / 2;
        db.play("nn_tongchi", 1);
    };
    PukerUtils.showZJTongPei = function (effectGroup) {
        var db = GameCacheManager.instance.getCache("nn_tongpei");
        if (!db) {
            db = new DBComponent("nn_tongpei");
        }
        db.callback = function () {
            game.UIUtils.removeSelf(db);
            GameCacheManager.instance.setCache("nn_tongpei", db);
        };
        effectGroup.addChild(db);
        db.verticalCenter = db.height / 2 - 150;
        db.horizontalCenter = db.width / 2;
        db.play("nn_tongpei", 1);
    };
    PukerUtils.showZJTongChi_sg = function (effectGroup) {
        var db = GameCacheManager.instance.getCache("sg_tongying");
        if (!db) {
            db = new DBComponent("sg_tongying");
        }
        db.callback = function () {
            game.UIUtils.removeSelf(db);
            GameCacheManager.instance.setCache("sg_tongying", db);
        };
        effectGroup.addChild(db);
        db.verticalCenter = db.height / 2 - 150;
        db.horizontalCenter = db.width / 2;
        db.playDefault(1);
    };
    PukerUtils.showZJTongPei_sg = function (effectGroup) {
        var db = GameCacheManager.instance.getCache("sg_tongpei");
        if (!db) {
            db = new DBComponent("sg_tongpei");
        }
        db.callback = function () {
            game.UIUtils.removeSelf(db);
            GameCacheManager.instance.setCache("sg_tongpei", db);
        };
        effectGroup.addChild(db);
        db.verticalCenter = db.height / 2 - 150;
        db.horizontalCenter = db.width / 2;
        db.playDefault(1);
    };
    return PukerUtils;
}());
__reflect(PukerUtils.prototype, "PukerUtils");
