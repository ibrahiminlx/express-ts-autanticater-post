"use strict";
const baseResponseFunctionError = (data) => {
    const obj = {
        code: 500,
        error: true,
        success: false,
        data: {},
        message: 'Bir şeyler yolunda gitmedi.',
    };
    return Object.assign(Object.assign({}, obj), { code: data.code || obj.code, error: data.error || obj.error, success: obj.success, data: data.data || obj.data, message: data.message || obj.message });
};
const baseResponseFunctionSuccess = (data) => {
    const obj = {
        code: 200,
        error: false,
        success: true,
        data: {},
        message: 'İşlem başarılı bir şekilde gerçekleşti.',
    };
    return Object.assign(Object.assign({}, obj), { code: data.code || obj.code, error: data.error || obj.error, success: obj.success, data: data.data || obj.data, message: data.message || obj.message });
};
module.exports = {
    baseResponseFunctionError,
    baseResponseFunctionSuccess
};
