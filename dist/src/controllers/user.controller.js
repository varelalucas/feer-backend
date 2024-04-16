"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const prisma_1 = require("../core/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.usersController = {
    listAll: async (req, res) => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        const { page, pageSize, filter } = req.query;
        const filterData = {
            page: parseInt(`${page}`) | 0,
            pageSize: parseInt(`${pageSize}`) | 10,
            filter: filter || {}
        };
        const findU = await prisma_1.prisma.user.findMany({
            skip: filterData.page * filterData.pageSize,
            take: filterData.pageSize,
            where: filterData.filter
        });
        const totalU = await prisma_1.prisma.user.count({
            where: filterData.filter
        });
        if (findU) {
            return res.processResponse(200, 'Lista de usuários consultada com sucesso!', {
                content: findU,
                total: totalU
            });
        }
        console.error(findU);
        return res.processResponse(500, 'Erro ao consultar os usuários!');
    },
    create: async (req, res) => {
        const { username, fullName, password } = req.body;
        if (!username || !fullName || !password) {
            return res.processResponse(400, 'É necessário informar os dados do usuário!');
        }
        const findU = await prisma_1.prisma.user.findUnique({
            where: { username }
        });
        if (findU) {
            return res.processResponse(400, 'Já existe um usuário com esse username');
        }
        const passwordString = password;
        bcrypt_1.default.hash(passwordString, 10, async (err, data) => {
            if (err) {
                console.error(err);
                res.processResponse(500, 'Erro ao criptografar a senha!');
            }
            const createU = await prisma_1.prisma.user.create({
                data: {
                    full_name: fullName,
                    username,
                    password: data
                }
            });
            if (createU) {
                return res.processResponse(200, 'Usuário criado com sucesso!', createU);
            }
            return res.processResponse(500, 'Erro ao criar o usuário!');
        });
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.processResponse(400, 'É necessário informar o username e a senha!');
        }
        const findU = await prisma_1.prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!findU) {
            return res.processResponse(401, 'Usuário não encontrado!');
        }
        bcrypt_1.default.compare(`${password}`, findU.password, async (err, data) => {
            if (err) {
                console.error(err);
                return res.processResponse(500, 'Erro ao comparar a senha!');
            }
            if (data) {
                const jwtToken = jsonwebtoken_1.default.sign(findU, process.env.JWT_SECRET_TOKEN);
                return res.processResponse(200, 'Usuário autenticado com sucesso!', {
                    token: jwtToken
                });
            }
            return res.processResponse(403, 'Senha do usuário inválida!');
        });
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const paramsParsed = {
            id: parseInt(`${id}`) | 0
        };
        const findU = await prisma_1.prisma.user.findUnique({
            where: {
                id: paramsParsed.id
            }
        });
        if (!findU) {
            return res.processResponse(400, 'Usuário não encontrado!');
        }
        const deleteU = await prisma_1.prisma.user.delete({
            where: {
                id: paramsParsed.id
            }
        });
        if (deleteU) {
            return res.processResponse(200, 'Usuário deletado com sucesso!');
        }
        return res.processResponse(500, 'Erro ao deletar o usuário!');
    }
};
