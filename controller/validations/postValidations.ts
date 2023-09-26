import Joi from 'joi';

interface PostData {
    postname: string;
    postdescription: string;
    postid: string;
}

function postValidations(data: Partial<PostData>): PostData {

    const validationData: Record<string, Joi.Schema> = {};
    if (data.postid !== undefined) {
        validationData.postid = Joi.string()
            .guid({version: ['uuidv4']})
            .required()
            .messages({
                'string.guid': 'Geçerli bir UUID formatı bekleniyor.',
                'string.base': 'UUID bir dize olmalıdır.',
                'string.empty': 'UUID alanı boş bırakılamaz.',
                'any.required': 'UUID alanı zorunludur.',
            });
    }

    if (data.postname !== undefined) {
        validationData.postname = Joi
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
        validationData.postdescription = Joi
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
    const schema = Joi.object(validationData);
    const {error, value} = schema.validate(data);

    if (error) {
        throw new Error(error.details[0].message);
    }

    return value as PostData;
}

    export {
        postValidations
    }