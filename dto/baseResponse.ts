interface Data {
    code: number;
    error: boolean;
    success: boolean;
    data: any;
    message: string;
}

const baseResponseFunctionError = (data: Partial<Data>) => {
    const obj = {
        code: 500,
        error: true,
        success: false,
        data: {},
        message: 'Bir şeyler yolunda gitmedi.',
    };
    return {
        ...obj,
        code: data.code || obj.code,
        error: data.error || obj.error,
        success: obj.success,
        data: data.data || obj.data,
        message: data.message || obj.message,
    };
};

const baseResponseFunctionSuccess = (data: Partial<Data>) => {
    const obj = {
        code: 200,
        error: false,
        success: true,
        data: {},
        message: 'İşlem başarılı bir şekilde gerçekleşti.',
    };
    return {
        ...obj,
        code: data.code || obj.code,
        error: data.error || obj.error,
        success: obj.success,
        data: data.data || obj.data,
        message: data.message || obj.message,
    };
};

export = {
    baseResponseFunctionError,
    baseResponseFunctionSuccess
};
