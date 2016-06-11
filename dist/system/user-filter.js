"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var UserFilter;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("UserFilter", UserFilter = function UserFilter() {
                _classCallCheck(this, UserFilter);

                this.loading = false;
                this.active = false;
                this.visible = true;
                this.savable = true;
            });

            _export("UserFilter", UserFilter);
        }
    };
});