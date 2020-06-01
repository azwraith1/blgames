var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DBFactory = (function () {
    function DBFactory() {
        this.m_factorys = new HashMap();
    }
    /**
     * 获取影片剪辑
     * @param db    龙骨数据名称
     * @param json  龙骨JSON名称
     * @param png   龙骨PNG名称
     * @param name  龙骨名称
     */
    DBFactory.prototype.getDB = function (fileName) {
        if (fileName === void 0) { fileName = ""; }
        if (this.m_factorys.get(fileName)) {
            var dbFactory_1 = this.m_factorys.get(fileName);
            return dbFactory_1.buildArmatureDisplay(fileName);
        }
        var db = fileName + "_ske_json";
        var json = fileName + "_tex_json";
        var png = fileName + "_tex_png";
        var dragonbonesData = RES.getRes(db);
        var jsonData = RES.getRes(json);
        var pngData = RES.getRes(png);
        if (!dragonbonesData || !jsonData || !pngData) {
            LogUtils.logE("资源不存在");
            return;
        }
        var dbFactory = new dragonBones.EgretFactory();
        dbFactory.parseDragonBonesData(dragonbonesData);
        dbFactory.parseTextureAtlasData(jsonData, pngData);
        this.m_factorys.put(fileName, dbFactory);
        return dbFactory.buildArmatureDisplay(fileName);
    };
    Object.defineProperty(DBFactory, "instance", {
        get: function () {
            if (DBFactory.s_instance == null) {
                DBFactory.s_instance = new DBFactory();
            }
            return DBFactory.s_instance;
        },
        enumerable: true,
        configurable: true
    });
    DBFactory.prototype.getDBAsync1 = function (fileName) {
        // if (this.m_factorys.get(fileName)) {
        //     let dbFactory: dragonBones.EgretFactory = this.m_factorys.get(fileName);
        //     return dbFactory.buildArmatureDisplay(fileName);
        // }
        var db = fileName + "_ske_json";
        var json = fileName + "_tex_json";
        var png = fileName + "_tex_png";
        var dragonbonesData = RES.getRes(db);
        var jsonData = RES.getRes(json);
        var pngData = RES.getRes(png);
        if (!dragonbonesData || !jsonData || !pngData) {
            LogUtils.logI("资源不存在");
            return;
        }
        var dbFactory = new dragonBones.EgretFactory();
        dbFactory.parseDragonBonesData(dragonbonesData);
        dbFactory.parseTextureAtlasData(jsonData, pngData);
        // this.setCache(fileName, dbFactory);
        return dbFactory.buildArmatureDisplay(fileName);
    };
    DBFactory.prototype.setCache = function (name, cacheObj) {
        if (this.m_factorys.has[name]) {
            this.m_factorys[name] = cacheObj;
        }
        else {
            this.m_factorys.put(name, cacheObj);
        }
    };
    DBFactory.prototype.removeCache = function () {
        this.m_factorys.clear();
        this.m_factorys = new HashMap();
    };
    /**
 * 获取影片剪辑
 * @param db    龙骨数据名称
 * @param json  龙骨JSON名称
 * @param png   龙骨PNG名称
 * @param name  龙骨名称
 */
    DBFactory.prototype.getDBAsync = function (fileName, callback) {
        var _this = this;
        if (fileName === void 0) { fileName = ""; }
        if (this.m_factorys.get(fileName)) {
            var dbFactory_2 = this.m_factorys.get(fileName);
            return callback(dbFactory_2.buildArmatureDisplay(fileName));
        }
        var db = fileName + "_ske_json";
        var json = fileName + "_tex_json";
        var png = fileName + "_tex_png";
        var dragonbonesData = RES.getRes(db);
        var jsonData = RES.getRes(json);
        var pngData = RES.getRes(png);
        if (!dragonbonesData || !jsonData || !pngData) {
            LogUtils.logI("资源不存在");
            RES.getResAsync(db, function (data) {
                dragonbonesData = data;
                RES.getResAsync(json, function (data1) {
                    jsonData = data1;
                    RES.getResAsync(png, function (data2) {
                        pngData = data2;
                        var dbFactory = new dragonBones.EgretFactory();
                        _this.m_factorys.put(fileName, dbFactory);
                        dbFactory.parseDragonBonesData(dragonbonesData);
                        dbFactory.parseTextureAtlasData(jsonData, pngData);
                        callback(dbFactory.buildArmatureDisplay(fileName));
                    }, _this);
                }, _this);
            }, this);
            return;
        }
        var dbFactory = new dragonBones.EgretFactory();
        dbFactory.parseDragonBonesData(dragonbonesData);
        dbFactory.parseTextureAtlasData(jsonData, pngData);
        this.m_factorys.put(fileName, dbFactory);
        return callback(dbFactory.buildArmatureDisplay(fileName));
    };
    return DBFactory;
}());
__reflect(DBFactory.prototype, "DBFactory");
