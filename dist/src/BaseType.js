(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module", "lodash", "./lifecycle"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
        factory(exports, module, require("lodash"), require("./lifecycle"));
    }
})(function (exports, module, _lodash, _lifecycle) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var _ = _interopRequire(_lodash);

    var dirty = _lifecycle.dirty;

    function createReadOnly(source) {
        var readOnlyInstance = Object.create(source);
        readOnlyInstance.__isReadOnly__ = true;
        readOnlyInstance.constructor = source.constructor;
        return readOnlyInstance;
    }

    var BaseType = (function () {
        function BaseType(value) {
            var options = arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, BaseType);

            this.__isReadOnly__ = false;
            this.__readOnlyInstance__ = createReadOnly(this);
            this.__dirty__ = dirty.unKnown;
            this.__options__ = options;
            this.__value__ = this.constructor.wrapValue(value === undefined ? this.constructor.defaults() : value, this.constructor._spec, options);
        }

        _createClass(BaseType, {
            setValue: {
                value: function setValue(newValue) {
                    var _this = this;

                    this.$setDirty();
                    if (newValue instanceof BaseType) {
                        newValue = newValue.toJSON();
                    }
                    _.forEach(newValue, function (fieldValue, fieldName) {
                        if (_this.constructor._spec[fieldName]) {
                            _this[fieldName] = fieldValue;
                        }
                    });
                }
            },
            $asReadOnly: {
                value: function $asReadOnly() {
                    return this.__readOnlyInstance__;
                }
            },
            $setDirty: {

                // called when a change has been made to this object directly #lifecycle

                value: function $setDirty() {
                    this.__dirty__ = dirty.yes;
                }
            },
            $isDirty: {

                // may be called after changes are paused #lifecycle

                value: function $isDirty(cache) {
                    var result = this.__dirty__.isKnown ? this.__dirty__.isDirty : _.any(this.__value__, function (val) {
                        return val instanceof BaseType && val.$isDirty();
                    });
                    if (cache && !this.__isReadOnly__) {
                        this.__dirty__ = result ? dirty.yes : dirty.no;
                    }
                    return result;
                }
            },
            $resetDirty: {

                // resets the dirty state to unknown #lifecycle

                value: function $resetDirty() {
                    if (!this.__isReadOnly__) {
                        this.__dirty__ = dirty.unKnown;
                        _.forEach(this.__value__, function (val) {
                            if (val instanceof BaseType) {
                                val.$resetDirty();
                            }
                        });
                    }
                }
            },
            toJSON: {
                value: function toJSON() {
                    var _this = this;

                    return Object.keys(this.constructor._spec).reduce(function (json, key) {
                        var fieldValue = _this.__value__[key];
                        json[key] = fieldValue.toJSON ? fieldValue.toJSON() : fieldValue;
                        return json;
                    }, {});
                }
            },
            toPrettyPrint: {
                value: function toPrettyPrint() {
                    var msg = "{" + this + "}";
                    return msg;
                }
            }
        }, {
            create: {
                value: function create(value, options) {
                    return new this(value, options);
                }
            },
            wrapValue: {
                value: function wrapValue(value, spec, options) {
                    Object.keys(spec).forEach(function (key) {
                        var fieldValue = value[key] !== undefined ? value[key] : spec[key].defaults();
                        value[key] = spec[key].type.create(fieldValue, spec[key].options);
                    });
                    return value;
                }
            }
        });

        return BaseType;
    })();

    module.exports = BaseType;
});
//# sourceMappingURL=BaseType.js.map