(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module", "./defineType", "./BaseType", "./string", "./number", "./array", "./function"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
        factory(exports, module, require("./defineType"), require("./BaseType"), require("./string"), require("./number"), require("./array"), require("./function"));
    }
})(function (exports, module, _defineType, _BaseType, _string, _number, _array, _function) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var defineType = _interopRequire(_defineType);

    var BaseType = _interopRequire(_BaseType);

    var stringType = _interopRequire(_string);

    var numberType = _interopRequire(_number);

    var arrayType = _interopRequire(_array);

    var functionType = _interopRequire(_function);

    module.exports = {
        define: defineType,
        BaseType: BaseType,
        String: stringType,
        Number: numberType,
        Array: arrayType,
        Function: functionType
    };
});
//# sourceMappingURL=index.js.map