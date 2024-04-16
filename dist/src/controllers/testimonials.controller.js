"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialsController = void 0;
const prisma_1 = require("../core/prisma");
exports.testimonialsController = {
    listAll: async (req, res) => {
        const findT = await prisma_1.prisma.testimonial.findMany();
        if (findT) {
            return res.processResponse(200, 'Lista de testimonials consultada com sucesso!', {
                content: findT
            });
        }
        return res.processResponse(500, 'Erro ao consultar lista de testimonials');
    },
    create: async (req, res) => {
        const { data } = req.body;
        if (!data) {
            return res.processResponse(400, 'É necessário informar os dados do testimonial!');
        }
        const createT = await prisma_1.prisma.testimonial.create({
            data
        });
        if (createT) {
            return res.processResponse(200, 'Testimonial criado com sucesso!', createT);
        }
        return res.processResponse(500, 'Erro ao criar o testimonial!');
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const paramsParsed = {
            id: parseInt(`${id}`) | 0
        };
        const findT = await prisma_1.prisma.testimonial.findUnique({
            where: {
                id: paramsParsed.id
            }
        });
        if (!findT) {
            return res.processResponse(400, 'Testimonial não encontrado!');
        }
        const deleteT = await prisma_1.prisma.testimonial.delete({
            where: {
                id: paramsParsed.id
            }
        });
        if (deleteT) {
            return res.processResponse(200, 'Testimonial deletado com sucesso!');
        }
        return res.processResponse(500, 'Erro ao deletar o testimonial!');
    }
};
