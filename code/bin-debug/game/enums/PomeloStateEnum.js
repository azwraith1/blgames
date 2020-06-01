/*
 * @Author: li mengchan
 * @Date: 2018-07-25 10:49:06
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-07-25 10:51:22
 * @Description: 网络连接
 */
var PomeloStateEnum;
(function (PomeloStateEnum) {
    PomeloStateEnum[PomeloStateEnum["INIT"] = 0] = "INIT";
    PomeloStateEnum[PomeloStateEnum["DISCONNECT"] = 1] = "DISCONNECT";
    PomeloStateEnum[PomeloStateEnum["CONNECT"] = 2] = "CONNECT";
})(PomeloStateEnum || (PomeloStateEnum = {}));
