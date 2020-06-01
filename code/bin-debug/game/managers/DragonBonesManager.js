var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 龙骨动画的管理器
 * 	单列模式i
 * 	使用龙骨动画的工厂模式
 */
var DragonBonesManager = (function () {
    function DragonBonesManager() {
    }
    DragonBonesManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new DragonBonesManager();
        }
        return this.instance;
    };
    // public loadObj: egret.DisplayObjectContainer;
    /**
     * 龙骨动画的展示和播放
     *@param loadObj  添加龙骨动画的父容器
     *@param dragonbonesDataName  添加龙骨动画的名称
     *@param dragonbonesData 数据源
     *@param  textureData   图片的数据源
     *@param texture 图片的名称
     *@param dragonName  数据名称
     *@param aniName  需要的动画名称
     *@param xs   x的位置
     *@param ys   y的位置
     *@param playTimes   播放次数
     *@param timeScale 播放的速率
     *@param isAppend  是否需要回调函数
     *@param dragonbonesName 动画名称
     */
    DragonBonesManager.prototype.startDragon = function (loadObj, dragonbonesDataName, dragonbonesData, textureData, texture, dragonName, aniName, xs, ys, playTimes, timeScale, isAppend, dragonbonesName) {
        if (timeScale === void 0) { timeScale = 1; }
        if (isAppend === void 0) { isAppend = false; }
        if (dragonbonesName === void 0) { dragonbonesName = "dragonbones"; }
        if (this.factory == null) {
            this.factory = new dragonBones.EgretFactory(); //实例化龙骨动画工厂类
        }
        // let dragon: dragonBones.DragonBonesData = dragonBones.DataParser.parseDragonBonesData(RES.getRes(dragonbonesData));
        var dragon = this.factory.getDragonBonesData(dragonbonesDataName);
        if (dragon == null) {
            var dragon1 = dragonBones.DataParser.parseDragonBonesData(RES.getRes(dragonbonesData));
            this.factory.addDragonBonesData(dragon1);
        }
        var textureAtlasData = this.factory.getTextureAtlas(dragonbonesDataName);
        if (textureAtlasData == null) {
            var textureAtlasData1 = new dragonBones.EgretTextureAtlas(RES.getRes(texture), RES.getRes(textureData));
            this.factory.addTextureAtlas(textureAtlasData1);
        }
        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        var armature = this.factory.buildArmatureDisplay(dragonName);
        armature.animation.timeScale = timeScale;
        armature.animation.play(aniName, playTimes);
        armature.x = xs;
        armature.y = ys;
        armature.once(egret.Event.COMPLETE, oncomplete, this);
        armature.name = dragonbonesName;
        loadObj.addChild(armature);
        function oncomplete() {
            if (!isAppend) {
                loadObj.removeChild(armature);
            }
            armature.removeEventListener(egret.Event.COMPLETE, oncomplete, this);
        }
    };
    return DragonBonesManager;
}());
__reflect(DragonBonesManager.prototype, "DragonBonesManager");
