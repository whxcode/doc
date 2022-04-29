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
var FileSearch_1 = __importDefault(require("./FileSearch"));
var FileList_1 = __importDefault(require("./FileList"));
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Bottom_1 = __importDefault(require("../Bottom"));
var LeftPanel = function (_a) {
    var files = _a.files, onFileDelete = _a.onFileDelete, onSaveEdit = _a.onSaveEdit, onFileClick = _a.onFileClick, onChange = _a.onChange, createNewFile = _a.createNewFile, onImport = _a.onImport;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(FileSearch_1["default"], { title: "\u4F60\u5728\u5E72\u561B", onFileSearch: onChange }, void 0), (0, jsx_runtime_1.jsx)(FileList_1["default"], { files: files, onFileClick: onFileClick, onFileDelete: onFileDelete, onSaveEdit: onSaveEdit }, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "row no-gutters" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col" }, { children: (0, jsx_runtime_1.jsx)(Bottom_1["default"], { text: "新建", colorClass: "btn-primary", icon: free_solid_svg_icons_1.faPlus, onBtnClick: createNewFile }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col" }, { children: (0, jsx_runtime_1.jsx)(Bottom_1["default"], { text: "导入", colorClass: "btn-success", icon: free_solid_svg_icons_1.faFileImport, onBtnClick: onImport }, void 0) }), void 0)] }), void 0)] }, void 0));
};
exports["default"] = LeftPanel;
