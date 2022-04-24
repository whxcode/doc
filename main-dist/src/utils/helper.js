"use strict";
exports.__esModule = true;
exports.timestampToString = exports.getParentNode = exports.objToArr = exports.flattenArr = void 0;
var flattenArr = function (arr) {
    return arr.reduce(function (map, item) {
        map[item.id] = item;
        return map;
    }, {});
};
exports.flattenArr = flattenArr;
var objToArr = function (obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
};
exports.objToArr = objToArr;
var getParentNode = function (node, parentClassName) {
    var current = node;
    while (current !== null) {
        if (current.classList.contains(parentClassName)) {
            return current;
        }
        current = current.parentNode;
    }
    return false;
};
exports.getParentNode = getParentNode;
var timestampToString = function (timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
exports.timestampToString = timestampToString;
