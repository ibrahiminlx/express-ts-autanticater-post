"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidations = void 0;
const joi_1 = __importDefault(require("joi"));
function postValidations(data) {
    const validationData = {};
    if (data.postid !== undefined) {
        validationData.postid = joi_1.default.string()
            .guid({ version: ['uuidv4'] })
            .required()
            .messages({
            'string.guid': 'Geçerli bir UUID formatı bekleniyor.',
            'string.base': 'UUID bir dize olmalıdır.',
            'string.empty': 'UUID alanı boş bırakılamaz.',
            'any.required': 'UUID alanı zorunludur.',
        });
    }
    if (data.postname !== undefined) {
        validationData.postname = joi_1.default
            .string()
            .min(10)
            .max(255)
            .required()
            .messages({
            'string.base': 'Başlık bir dize olmalıdır.',
            'string.empty': 'Başlık alanı boş bırakılamaz.',
            'string.min': 'Başlık en az 10 karakter uzunluğunda olmalıdır.',
            'string.max': 'Başlık en fazla 255 karakter uzunluğunda olmalıdır.',
            'any.required': 'Başlık alanı zorunludur.',
        });
    }
    if (data.postdescription !== undefined) {
        validationData.postdescription = joi_1.default
            .string()
            .min(30)
            .max(1000)
            .required()
            .messages({
            'string.base': 'Açıklama bir dize olmalıdır.',
            'string.empty': 'Açıklama alanı boş bırakılamaz.',
            'string.min': 'Açıklama en az 30 karakter uzunluğunda olmalıdır.',
            'string.max': 'Açıklama en fazla 1000 karakter uzunluğunda olmalıdır.',
            'any.required': 'Açıklama alanı zorunludur.',
        });
    }
    ;
    const schema = joi_1.default.object(validationData);
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return value;
}
exports.postValidations = postValidations;
