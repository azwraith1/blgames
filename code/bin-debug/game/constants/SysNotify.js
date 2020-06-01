var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:24:56
 * @Last Modified by:   Li MengChan
 * @Last Modified time: 2018-06-25 14:24:56
 * @Description: 服务器的消息通知
 */
var SysNotify = (function () {
    function SysNotify() {
    }
    return SysNotify;
}());
__reflect(SysNotify.prototype, "SysNotify");
