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
var TabList_1 = __importDefault(require("./TabList"));
var react_simplemde_editor_1 = __importDefault(require("react-simplemde-editor"));
require("easymde/dist/easymde.min.css");
var RightPanel = function (_a) {
    var _b;
    var activeFileID = _a.activeFileID, unsavedFileIDS = _a.unsavedFileIDS, openedFiles = _a.openedFiles, onTabClick = _a.onTabClick, onCloseTab = _a.onCloseTab, onChange = _a.onChange, activeFile = _a.activeFile;
    return ((0, jsx_runtime_1.jsx)("div", { children: !activeFileID ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "start-page" }, { children: "\u8BF7\u6253\u5F00\u6587\u4EF6" }))) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TabList_1["default"], { activeId: activeFileID, files: openedFiles, unsaveIds: unsavedFileIDS, onCloseTab: onCloseTab, onTabClick: onTabClick }), (0, jsx_runtime_1.jsx)(react_simplemde_editor_1["default"], { value: (_b = activeFile === null || activeFile === void 0 ? void 0 : activeFile.body) !== null && _b !== void 0 ? _b : "", options: {
                        direction: "rtl"
                    }, onChange: function (value) {
                        onChange(activeFileID, value);
                    } })] })) }));
};
exports["default"] = RightPanel;
