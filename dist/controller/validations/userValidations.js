"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const joi_1 = __importDefault(require("joi"));
function userValidations(data) {
    const validationData = {};
    if (data.username !== undefined) {
        validationData.username = joi_1.default.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .messages({
            'string.base': 'Kullanıcı adı bir dize olmalıdır.',
            'string.empty': 'Kullanıcı adı alanı boş bırakılamaz.',
            'string.alphanum': 'Kullanıcı adı yalnızca harf ve rakamları içermelidir.',
            'string.min': 'Kullanıcı adı en az 3 karakter uzunluğunda olmalıdır.',
            'string.max': 'Kullanıcı adı en fazla 30 karakter uzunluğunda olmalıdır.',
            'any.required': 'Kullanıcı adı alanı zorunludur.',
        });
    }
    if (data.password !== undefined) {
        validationData.password = joi_1.default.string()
            .min(8)
            .max(30)
            .required()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,30}$"))
            .messages({
            'string.base': 'Şifre bir dize olmalıdır.',
            'string.empty': 'Şifre alanı boş bırakılamaz.',
            'string.min': 'Şifre en az 8 karakter uzunluğunda olmalıdır.',
            'string.max': 'Şifre en fazla 30 karakter uzunluğunda olmalıdır.',
            'string.pattern.base': 'Şifre en az bir küçük harf, bir büyük harf, bir sayı ve bir özel karakter içermelidir.',
            'any.required': 'Şifre alanı zorunludur.',
        });
    }
    if (data.role !== undefined) {
        validationData.role = joi_1.default.string()
            .valid('read', 'write', 'readwrite')
            .required()
            .messages({
            'string.base': 'Rol bir dize olmalıdır.',
            'string.empty': 'Rol alanı boş bırakılamaz.',
            'any.only': 'Geçersiz bir rol değeri. Geçerli değerler: read, write, readwrite.',
            'any.required': 'Rol alanı zorunludur.',
        });
    }
    const schema = joi_1.default.object(validationData);
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return value;
}
exports.userValidations = userValidations;
