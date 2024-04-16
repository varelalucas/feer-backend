"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioController = void 0;
const prisma_1 = require("../core/prisma");
exports.portfolioController = {
    listAll: async (req, res) => {
        const { page, pageSize, filter } = req.query;
        const filterData = {
            page: parseInt(`${page}`) | 0,
            pageSize: parseInt(`${pageSize}`) | 10,
            filter: filter || {}
        };
        console.log('[portfolio.controller] filterData', filterData);
        const findP = await prisma_1.prisma.portfolio.findMany({
            skip: filterData.page * filterData.pageSize,
            take: filterData.pageSize,
            where: filterData.filter
        });
        const totalP = await prisma_1.prisma.portfolio.count({
            where: filterData.filter
        });
        if (findP) {
            return res.processResponse(200, 'Lista de portfólios consultada com sucesso!', {
                content: findP,
                total: totalP
            });
        }
        console.error(findP);
        return res.processResponse(500, 'Erro ao consultar os usuários!');
    },
    create: async (req, res) => {
        const { data } = req.body;
        const createP = await prisma_1.prisma.portfolio.create({
            data
        });
        if (createP) {
            return res.processResponse(200, 'Portfolio criado com sucesso!', createP);
        }
        return res.processResponse(500, 'Erro ao criar o Portfolio!');
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const paramsParsed = {
            id: parseInt(`${id}`) | 0
        };
        const findP = await prisma_1.prisma.portfolio.findUnique({
            where: {
                id: paramsParsed.id
            }
        });
        if (!findP) {
            return res.processResponse(400, 'Portfolio com esse id não encontrado!');
        }
        const deleteP = await prisma_1.prisma.portfolio.delete({
            where: {
                id: paramsParsed.id
            }
        });
        if (deleteP) {
            return res.processResponse(200, 'Portfolio deletado com sucesso!');
        }
        return res.processResponse(500, 'Erro ao deletar o Portfolio!');
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { data } = req.body;
        if (!id) {
            return res.processResponse(400, 'Id do Portfolio não informado');
        }
        const findP = await prisma_1.prisma.portfolio.findFirst({
            where: {
                id: parseInt(`${id}`) | 0
            }
        });
        if (!findP) {
            return res.processResponse(400, 'Portfolio com esse id não encontrado');
        }
        const updateP = await prisma_1.prisma.portfolio.update({
            where: {
                id: parseInt(`${id}`) | 0
            },
            data
        });
        if (updateP) {
            return res.processResponse(200, 'Portfolio atualizado com sucesso', updateP);
        }
        return res.processResponse(500, 'Erro ao atualizar Portfolio', updateP);
    }
};
