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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var uuid_1 = require("uuid");
var helper_1 = require("./utils/helper");
var defaultFiles_1 = __importDefault(require("./utils/defaultFiles"));
var LeftPanel_1 = __importDefault(require("./views/LeftPanel"));
var RightPanel_1 = __importDefault(require("./views/RightPanel"));
require("bootstrap/dist/css/bootstrap.min.css");
require("./App.scss");
function App() {
    var _a = react_1["default"].useState(""), keyword = _a[0], setKeyword = _a[1];
    var _b = react_1["default"].useState((0, helper_1.flattenArr)(defaultFiles_1["default"])), files = _b[0], setFiles = _b[1];
    var _c = react_1["default"].useState(""), activeFileID = _c[0], setActionFileID = _c[1];
    var _d = react_1["default"].useState([]), openedFileIDS = _d[0], setOpenedFileIDS = _d[1];
    var _e = react_1["default"].useState([]), unsavedFileIDS = _e[0], setUnsavedFileIDS = _e[1];
    var openedFiles = openedFileIDS.map(function (id) {
        return files[id];
    });
    var handleSearchChange = function (keyword) {
        setKeyword(keyword);
    };
    var handleFileDelete = function (id) {
        delete files[id];
        setFiles(__assign({}, files));
        handleCloseTab(id);
    };
    var handleSaveEdit = function (id, title, isNew) {
        var file = files[id];
        file.title = title;
        file.isNew = false;
        setFiles(__assign({}, files));
    };
    var handleFileClick = function (id) {
        setActionFileID(id);
        setOpenedFileIDS(__spreadArray([], new Set(__spreadArray([id], openedFileIDS, true)), true));
    };
    var handleImport = function () { };
    var handleTabClick = function (id) {
        setActionFileID(id);
    };
    var handleCloseTab = function (id) {
        var s = new Set(__spreadArray([], openedFileIDS, true));
        s["delete"](id);
        var ids = __spreadArray([], s, true);
        if (id === activeFileID && ids.length !== 0) {
            setActionFileID(ids[0]);
        }
        setOpenedFileIDS(ids);
    };
    var handleEditorChange = function (id, value) {
        handleFileChange(id, value, "body");
        if (!unsavedFileIDS.includes(id)) {
            setUnsavedFileIDS(__spreadArray(__spreadArray([], unsavedFileIDS, true), [id], false));
        }
    };
    var handleFileChange = function (id, value, key) {
        var _a, _b;
        var newFile = __assign(__assign({}, files[id]), (_a = {}, _a[key] = value, _a));
        setFiles(__assign(__assign({}, files), (_b = {}, _b[id] = newFile, _b)));
    };
    var handleUpdateFileName = function (id, value) {
        handleFileChange(id, value, "title");
    };
    var createNewFile = function () {
        var _a;
        var id = (0, uuid_1.v4)();
        setFiles(__assign((_a = {}, _a[id] = {
            id: id,
            title: "",
            body: "",
            isNew: true,
            createdAt: Date.now()
        }, _a), files));
    };
    var filesData = react_1["default"].useMemo(function () {
        return keyword.length
            ? (0, helper_1.objToArr)(files).filter(function (f) { return f.title.includes(keyword); })
            : (0, helper_1.objToArr)(files);
    }, [keyword, files]);
    var activeFile = files[activeFileID];
    react_1["default"].useEffect(function () {
        console.log("11");
        window.setTimeout(function () {
            window.electron.ipcRenderer.send("");
            window.electron.ipcRenderer.invoke("test-1").then(function (data) {
                console.log(data);
            });
        }, 2000);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "App container-fluid px-0" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "row no-gutters" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col-3 px-0" }, { children: (0, jsx_runtime_1.jsx)(LeftPanel_1["default"], { files: filesData, onSaveEdit: handleSaveEdit, onFileDelete: handleFileDelete, onFileClick: handleFileClick, onChange: handleSearchChange, onImport: handleImport, handleUpdateFileName: handleUpdateFileName, createNewFile: createNewFile }) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-9 px-0" }, { children: (0, jsx_runtime_1.jsx)(RightPanel_1["default"], { activeFile: activeFile, activeFileID: activeFileID, openedFiles: openedFiles, unsavedFileIDS: unsavedFileIDS, onCloseTab: handleCloseTab, onTabClick: handleTabClick, onChange: handleEditorChange }) }))] })) })));
}
exports["default"] = App;
