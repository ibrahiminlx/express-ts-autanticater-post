"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userServices = require('../services/userServices');
let userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const json = yield userServices.userGet(req, res);
        res.status(200).json(json);
    }
    catch (e) {
        console.log('e', e);
        res.status(500).json({ Error: 'Bir hata olustu' });
    }
});
module.exports = {
    userGet
};
