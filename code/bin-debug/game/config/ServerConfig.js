var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServerConfig = (function () {
    function ServerConfig() {
    }
    //服务器测试账号
    ServerConfig.USER_NAME = "xiongshe";
    //--------------上传版本必须用PathTypeEnum.PUBLISH_TEST---------------
    ServerConfig.PATH_TYPE = PathTypeEnum.NEI_TEST1;
    return ServerConfig;
}());
__reflect(ServerConfig.prototype, "ServerConfig");
