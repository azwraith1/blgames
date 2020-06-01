var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NiuniuUtils = (function () {
    function NiuniuUtils() {
    }
    NiuniuUtils.getNumberSum = function (numbers) {
        var sum = 0;
        for (var i = 0; i < numbers.length; i++) {
            var num = numbers[i] % 100;
            if (num > 10) {
                num = 10;
            }
            sum += num;
        }
        return sum;
    };
    /**
     * 根据自己的位子获取方位
     * @param  {number} mineIndex
     */
    NiuniuUtils.getDirectionByMine = function (mineIndex, playerLength) {
        var directionTrue = {};
        var dirArr = [];
        for (var i = mineIndex; i <= playerLength; i++) {
            dirArr.push(i);
        }
        for (var i = 1; i < mineIndex; i++) {
            dirArr.push(i);
        }
        for (var i = 0; i < dirArr.length; i++) {
            var data = dirArr[i];
            directionTrue[data] = (i + 1) + "";
        }
        return directionTrue;
    };
    NiuniuUtils.getNNSort = function (dealer, playerLength) {
        var dirArr = [];
        for (var i = dealer + 1; i <= playerLength; i++) {
            dirArr.push(i);
        }
        for (var i = 1; i < dealer; i++) {
            dirArr.push(i);
        }
        dirArr.push(dealer);
        return dirArr;
    };
    //------------------- 声音控制方法----------------------------------------------------
    /**
     * 播放出牌的声音。
     * sex性别，value打的牌面值。
     */
    NiuniuUtils.playShowNiu = function (sex, value) {
        var playerSound = sex == 1 ? "malecow_" : "femalecow_";
        var sound = playerSound + value + "_mp3";
        SoundManager.getInstance().playEffect(sound);
    };
    /**
 * 飞金币
 */
    NiuniuUtils.playFjb = function () {
        SoundManager.getInstance().playEffect("nns_fjb_mp3");
    };
    /**
     * 定庄
     */
    NiuniuUtils.playDz = function () {
        SoundManager.getInstance().playEffect("nns_dz_mp3");
    };
    /**
     * 选牌
     */
    NiuniuUtils.playClick = function () {
        SoundManager.getInstance().playEffect("nns_xuanpai_mp3");
    };
    /**
     * 显示赢
     */
    NiuniuUtils.showWin = function () {
        SoundManager.getInstance().playEffect("nns_win_mp3");
    };
    /**
     * 发牌
     */
    NiuniuUtils.fapai = function () {
        SoundManager.getInstance().playEffect("nns_fapai_mp3");
    };
    return NiuniuUtils;
}());
__reflect(NiuniuUtils.prototype, "NiuniuUtils");
