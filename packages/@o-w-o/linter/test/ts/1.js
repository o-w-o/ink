"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var str = 3;
console.log(str);
var num = "hi";
console.log(num);
exports.c = {
    str: num,
    num: str,
    fun: function (val) {
        console.log(val);
        return val;
    },
};
