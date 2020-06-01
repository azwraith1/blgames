var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var rbwar;
(function (rbwar) {
    var RBWUtils = (function () {
        function RBWUtils() {
        }
        RBWUtils.getReportWinCount = function (reports, type) {
            var count = 0;
            for (var i = reports.length - 1; i >= reports.length - 20; i--) {
                if (reports[i] == type) {
                    count++;
                }
            }
            return count;
        };
        //-----------------------------------声音控制--------------------------------------
        /**
         * 自己飞金币
         */
        RBWUtils.minePlayFjb = function () {
            SoundManager.getInstance().playEffect("rbw_minexz_mp3");
        };
        /**
         * 其他飞金币
         */
        RBWUtils.otherPlayFjb = function () {
            SoundManager.getInstance().playEffect("rbw_fcm_mp3");
        };
        /**
         * 开始下注停止下注
         */
        RBWUtils.beignOrStop = function (type) {
            if (type == 1) {
                SoundManager.getInstance().playEffect("rbw_ksxz_mp3");
            }
            else {
                SoundManager.getInstance().playEffect("rbw_tzxz_mp3");
            }
        };
        /**
         * 显示红黑输赢
         */
        RBWUtils.showWinOrLose = function (type) {
            if (type == 1) {
                SoundManager.getInstance().playEffect("rbw_rwin_mp3");
            }
            else {
                SoundManager.getInstance().playEffect("rbw_bwim_mp3");
            }
        };
        /**
         * 发牌
         */
        RBWUtils.fanpai = function () {
            SoundManager.getInstance().playEffect("rbw_fp_mp3");
        };
        /**
         * 自己赢
         */
        RBWUtils.mineWin = function () {
            SoundManager.getInstance().playEffect("rbw_win_mp3");
        };
        /**
         * 展示分数
         */
        RBWUtils.playSoundByFen = function (fen) {
            SoundManager.getInstance().playEffect("rbw_" + fen + "_mp3");
        };
        return RBWUtils;
    }());
    rbwar.RBWUtils = RBWUtils;
    __reflect(RBWUtils.prototype, "rbwar.RBWUtils");
})(rbwar || (rbwar = {}));
