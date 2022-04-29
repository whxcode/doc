"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var BottomBtn = function (_a) {
    var text = _a.text, colorClass = _a.colorClass, icon = _a.icon, onBtnClick = _a.onBtnClick;
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", className: "btn btn-block no-border ".concat(colorClass), onClick: onBtnClick }, { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { className: "mr-2", size: "lg", icon: icon }, void 0), text] }), void 0));
};
exports["default"] = BottomBtn;
