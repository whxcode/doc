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
var classnames_1 = __importDefault(require("classnames"));
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
require("./TabList.scss");
var TabList = function (_a) {
    var files = _a.files, activeId = _a.activeId, unsaveIds = _a.unsaveIds, onTabClick = _a.onTabClick, onCloseTab = _a.onCloseTab;
    return ((0, jsx_runtime_1.jsx)("ul", __assign({ className: "nav nav-pills tablist-component" }, { children: files.map(function (file) {
            var withUnsavedMark = unsaveIds.includes(file.id);
            var fClassName = (0, classnames_1["default"])({
                "nav-link": true,
                active: file.id === activeId,
                withUnsaved: withUnsavedMark
            });
            return ((0, jsx_runtime_1.jsx)("li", __assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsxs)("a", __assign({ href: "#", className: fClassName, onClick: function (e) {
                        e.preventDefault();
                        onTabClick(file.id);
                    } }, { children: [file.title, (0, jsx_runtime_1.jsx)("span", __assign({ className: "ml-2 close-icon", onClick: function (e) {
                                e.stopPropagation();
                                onCloseTab(file.id);
                            } }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTimes }, void 0) }), void 0), withUnsavedMark && ((0, jsx_runtime_1.jsx)("span", { className: "rounded-circle ml-2 unsaved-icon" }, void 0))] }), void 0) }), file.id));
        }) }), void 0));
};
exports["default"] = TabList;
