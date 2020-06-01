var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-07-31 10:46:10
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-07-31 10:46:31
 * @Description: 对局流水bean
 */
var majiang;
(function (majiang) {
    var RecordBean = (function () {
        function RecordBean() {
        }
        return RecordBean;
    }());
    majiang.RecordBean = RecordBean;
    __reflect(RecordBean.prototype, "majiang.RecordBean");
})(majiang || (majiang = {}));
