import { prisma } from '../core/prisma.js';
export const ProjectsController = {
    listAll: async (req, res) => {
        const { page, pageSize, filter } = req.query;
        console.log('[project.controller] filter', filter);
        const filterData = {
            page: parseInt(`${page}`) || 0,
            pageSize: parseInt(`${pageSize}`) || 10,
            filter: filter && typeof filter === 'string' ? filter : '{}'
        };
        const findP = await prisma.project.findMany({
            skip: filterData.page * filterData.pageSize,
            take: filterData.pageSize,
            where: JSON.parse(filterData.filter),
            orderBy: {
                dt_created_at: 'desc'
            }
        });
        const totalP = await prisma.project.count({
            where: JSON.parse(filterData.filter)
        });
        if (findP) {
            return res.processResponse(200, 'Lista de projetos consultada com sucesso!', {
                content: findP,
                total: totalP
            });
        }
        return res.processResponse(500, 'Erro ao buscar projetos');
    },
    create: async (req, res) => {
        const { data } = req.body;
        if (!data) {
            return res.processResponse(400, 'Dados insuficientes para a criação do projeto');
        }
        const createP = await prisma.project.create({
            data
        });
        if (createP) {
            return res.processResponse(200, 'Projeto criado com sucesso', createP);
        }
        return res.processResponse(500, 'Erro ao criar projeto', createP);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.processResponse(400, 'Id do projeto não informado');
        }
        const findP = await prisma.project.findFirst({
            where: {
                id: parseInt(`${id}`) | 0
            }
        });
        if (!findP) {
            return res.processResponse(400, 'Projeto com esse id não encontrado');
        }
        const deleteP = await prisma.project.delete({
            where: { id: parseInt(id) }
        });
        if (deleteP) {
            return res.processResponse(200, 'Projeto deletado com sucesso', deleteP);
        }
        return res.processResponse(500, 'Erro ao deletar projeto', deleteP);
    },
    update: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.processResponse(400, 'Id do projeto não informado');
        }
        const findP = await prisma.project.findFirst({
            where: {
                id: parseInt(`${id}`)
            }
        });
        if (!findP) {
            return res.processResponse(400, 'Projeto com esse id não encontrado');
        }
        const { data } = req.body;
        if (!data) {
            return res.processResponse(400, 'Dados insuficientes para a atualização do projeto');
        }
        const updateP = await prisma.project.updateMany({
            where: { id: parseInt(id) },
            data
        });
        if (updateP) {
            return res.processResponse(200, 'Projeto atualizado com sucesso', updateP);
        }
        return res.processResponse(500, 'Erro ao atualizar projeto', updateP);
    }
};
