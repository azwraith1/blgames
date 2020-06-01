/*
 * @Author: li mengchan
 * @Date: 2018-07-13 10:37:06
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-07-25 15:47:48
 * @Description: 麻将状态
 */
var MajiangStatusEnum;
(function (MajiangStatusEnum) {
    MajiangStatusEnum[MajiangStatusEnum["FAPAI"] = 0] = "FAPAI";
    MajiangStatusEnum[MajiangStatusEnum["READY"] = 1] = "READY";
    MajiangStatusEnum[MajiangStatusEnum["TASK"] = 2] = "TASK";
    MajiangStatusEnum[MajiangStatusEnum["MINE_CHUPAI"] = 3] = "MINE_CHUPAI";
    MajiangStatusEnum[MajiangStatusEnum["QINGQUE"] = 4] = "QINGQUE";
    MajiangStatusEnum[MajiangStatusEnum["HSZ"] = 5] = "HSZ";
    MajiangStatusEnum[MajiangStatusEnum["ANI"] = 6] = "ANI";
    MajiangStatusEnum[MajiangStatusEnum["OTHER_CHUPAI"] = 7] = "OTHER_CHUPAI";
    MajiangStatusEnum[MajiangStatusEnum["BLANK"] = 8] = "BLANK";
    MajiangStatusEnum[MajiangStatusEnum["CHUPAI_TASK"] = 9] = "CHUPAI_TASK";
    MajiangStatusEnum[MajiangStatusEnum["OVER"] = 10] = "OVER";
})(MajiangStatusEnum || (MajiangStatusEnum = {}));
