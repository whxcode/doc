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
var free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
var useKeyPress_1 = __importDefault(require("../../hooks/useKeyPress"));
var useContextMenu_1 = __importDefault(require("../../hooks/useContextMenu"));
var helper_1 = require("../../utils/helper");
var FileList = function (_a) {
    var files = _a.files, onFileClick = _a.onFileClick, onSaveEdit = _a.onSaveEdit, onFileDelete = _a.onFileDelete;
    var _b = (0, react_1.useState)(""), editStatus = _b[0], setEditStatus = _b[1];
    var _c = (0, react_1.useState)(""), value = _c[0], setValue = _c[1];
    var node = (0, react_1.useRef)(null);
    var enterPressed = (0, useKeyPress_1["default"])(13);
    var escPressed = (0, useKeyPress_1["default"])(27);
    var closeSearch = function (editItem) {
        setEditStatus("");
        setValue("");
        // if we are editing a newly created file, we should delete this file when pressing esc
        if (editItem.isNew) {
            onFileDelete(editItem.id);
        }
    };
    var clickedItem = (0, useContextMenu_1["default"])([
        {
            label: "打开",
            click: function () {
                var parentElement = (0, helper_1.getParentNode)(clickedItem.current, "file-item");
                if (parentElement) {
                    onFileClick(parentElement.dataset.id);
                }
            }
        },
        {
            label: "重命名",
            click: function () {
                var parentElement = (0, helper_1.getParentNode)(clickedItem.current, "file-item");
                if (parentElement) {
                    var _a = parentElement.dataset, id = _a.id, title = _a.title;
                    setEditStatus(id);
                    setValue(title);
                }
            }
        },
        {
            label: "删除",
            click: function () {
                var parentElement = (0, helper_1.getParentNode)(clickedItem.current, "file-item");
                if (parentElement) {
                    onFileDelete(parentElement.dataset.id);
                }
            }
        },
    ], ".file-list", [files]);
    (0, react_1.useEffect)(function () {
        var editItem = files.find(function (file) { return file.id === editStatus; });
        if (enterPressed && editStatus && value.trim() !== "") {
            onSaveEdit(editItem.id, value, editItem.isNew);
            setEditStatus("");
            setValue("");
        }
        if (escPressed && editStatus) {
            closeSearch(editItem);
        }
    });
    (0, react_1.useEffect)(function () {
        var newFile = files.find(function (file) { return file.isNew; });
        if (newFile) {
            setEditStatus(newFile.id);
            setValue(newFile.title);
        }
    }, [files]);
    (0, react_1.useEffect)(function () {
        if (editStatus) {
            node.current.focus();
        }
    }, [editStatus]);
    return ((0, jsx_runtime_1.jsx)("ul", __assign({ className: "list-group list-group-flush file-list" }, { children: files.map(function (file) { return ((0, jsx_runtime_1.jsxs)("li", __assign({ className: "list-group-item bg-light row d-flex align-items-center file-item mx-0", "data-id": file.id, "data-title": file.title }, { children: [file.id !== editStatus && !file.isNew && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "col-2" }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { size: "lg", icon: free_brands_svg_icons_1.faMarkdown }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", __assign({ className: "col-10 c-link", onClick: function () {
                                onFileClick(file.id);
                            } }, { children: file.title }), void 0)] }, void 0)), (file.id === editStatus || file.isNew) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { className: "form-control col-10", ref: node, value: value, placeholder: "\u8BF7\u8F93\u5165\u6587\u4EF6\u540D\u79F0", onChange: function (e) {
                                setValue(e.target.value);
                            } }, void 0), (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", className: "icon-button col-2", onClick: function () {
                                closeSearch(file);
                            } }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { title: "\u5173\u95ED", size: "lg", icon: free_solid_svg_icons_1.faTimes }, void 0) }), void 0)] }, void 0))] }), file.id)); }) }), void 0));
};
exports["default"] = FileList;
