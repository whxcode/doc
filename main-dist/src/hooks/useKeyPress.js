"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useKeyPress = function (targetKeyCode) {
    var _a = (0, react_1.useState)(false), keyPressed = _a[0], setKeyPressed = _a[1];
    var keyDownHandler = function (_a) {
        var keyCode = _a.keyCode;
        if (keyCode === targetKeyCode) {
            setKeyPressed(true);
        }
    };
    var keyUpHandler = function (_a) {
        var keyCode = _a.keyCode;
        if (keyCode === targetKeyCode) {
            setKeyPressed(false);
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);
        return function () {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
        };
    }, []);
    return keyPressed;
};
exports["default"] = useKeyPress;
