var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-07-06 10:31:18
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-16 16:32:38
 * @Description: 麻将游戏玩家数据
 */
var PlayerGameDataBean = (function () {
    function PlayerGameDataBean() {
        //胡牌
        this.huCards = [2, 3, 3, 4];
        this.haveShowCaiShenTip = false;
    }
    return PlayerGameDataBean;
}());
__reflect(PlayerGameDataBean.prototype, "PlayerGameDataBean");
