var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImageUtils = (function () {
    function ImageUtils() {
    }
    ImageUtils.showRes = function (image, name) {
        this.getRes(name, function (texture) {
            image.source = texture;
        });
    };
    ImageUtils.getRes = function (name, callback) {
        var texture = RES.getRes(name);
        if (texture) {
            return callback(texture);
        }
        else {
            RES.getResAsync(name, function (texture) {
                callback(texture);
            }, this);
            return null;
        }
        function createTexture(name) {
            var texture = RES.getRes(name);
            return texture;
        }
    };
    return ImageUtils;
}());
__reflect(ImageUtils.prototype, "ImageUtils");
