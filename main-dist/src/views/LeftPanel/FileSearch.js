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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var useKeyPress_1 = __importDefault(require("../../hooks/useKeyPress"));
var useIpcRenderer_1 = __importDefault(require("../../hooks/useIpcRenderer"));
var FileSearch = function (_a) {
    var title = _a.title, onFileSearch = _a.onFileSearch;
    var _b = (0, react_1.useState)(false), inputActive = _b[0], setInputActive = _b[1];
    var _c = (0, react_1.useState)(""), value = _c[0], setValue = _c[1];
    var enterPressed = (0, useKeyPress_1["default"])(13);
    var escPressed = (0, useKeyPress_1["default"])(27);
    var node = (0, react_1.useRef)(null);
    var startSearch = function () {
        setInputActive(true);
    };
    var closeSearch = function () {
        setInputActive(false);
        setValue("");
        onFileSearch(false);
    };
    (0, useIpcRenderer_1["default"])({
        "search-file": startSearch
    });
    (0, react_1.useEffect)(function () {
        if (enterPressed && inputActive) {
            onFileSearch(value);
        }
        if (escPressed && inputActive) {
            closeSearch();
        }
    });
    (0, react_1.useEffect)(function () {
        if (inputActive) {
            node.current.focus();
        }
    }, [inputActive]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "alert alert-primary d-flex justify-content-between align-items-center mb-0" }, { children: [!inputActive && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { children: title }, void 0), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", className: "icon-button", onClick: startSearch }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { title: "\u641C\u7D22", size: "lg", icon: free_solid_svg_icons_1.faSearch }, void 0) }), void 0)] }, void 0)), inputActive && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { className: "form-control", value: value, ref: node, onChange: function (e) {
                            setValue(e.target.value);
                        } }, void 0), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", className: "icon-button", onClick: closeSearch }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { title: "\u5173\u95ED", size: "lg", icon: free_solid_svg_icons_1.faTimes }, void 0) }), void 0)] }, void 0))] }), void 0));
};
exports["default"] = FileSearch;
