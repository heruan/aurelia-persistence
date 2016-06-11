define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var UserFilter = exports.UserFilter = function UserFilter() {
        _classCallCheck(this, UserFilter);

        this.loading = false;
        this.active = false;
        this.visible = true;
        this.savable = true;
    };
});