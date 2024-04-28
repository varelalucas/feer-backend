import { type Request, type Response } from "express";
import { prisma } from "../core/prisma.js";

export const portfolioController = {
  listAll: async (req: Request, res: Response) => {
    const { page, pageSize, filter }: any = req.query;

    const filterData = {
      page: parseInt(`${page}`) || 0,
      pageSize: parseInt(`${pageSize}`) || 10,
      filter: filter && typeof filter === "string" ? filter : "{}",
    };

    const findP = await prisma.portfolio.findMany({
      skip: filterData.page * filterData.pageSize,
      take: filterData.pageSize,
      where: JSON.parse(filterData.filter),
      orderBy: {
        dt_created_at: "desc",
      },
    });

    const totalP = await prisma.portfolio.count({
      where: JSON.parse(filterData.filter),
    });

    if (findP) {
      return res.processResponse(
        200,
        "Lista de portfólios consultada com sucesso!",
        {
          content: findP,
          total: totalP,
        }
      );
    }

    console.error(findP);
    return res.processResponse(500, "Erro ao consultar os usuários!");
  },

  create: async (req: Request, res: Response) => {
    const { data } = req.body;

    if (!data) {
      return res.processResponse(
        400,
        "É necessário informar os dados do portfolio!"
      );
    }

    const createP = await prisma.portfolio.create({
      data,
    });

    if (createP) {
      return res.processResponse(200, "Portfolio criado com sucesso!", createP);
    }

    return res.processResponse(500, "Erro ao criar o Portfolio!");
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;

    const paramsParsed = {
      id: parseInt(`${id}`) | 0,
    };

    const findP = await prisma.portfolio.findUnique({
      where: {
        id: paramsParsed.id,
      },
    });

    if (!findP) {
      return res.processResponse(400, "Portfolio com esse id não encontrado!");
    }

    const deleteP = await prisma.portfolio.delete({
      where: {
        id: paramsParsed.id,
      },
    });

    if (deleteP) {
      return res.processResponse(200, "Portfolio deletado com sucesso!");
    }

    return res.processResponse(500, "Erro ao deletar o Portfolio!");
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    if (!id) {
      return res.processResponse(400, "Id do Portfolio não informado");
    }

    const findP = await prisma.portfolio.findFirst({
      where: {
        id: parseInt(`${id}`) | 0,
      },
    });

    if (!findP) {
      return res.processResponse(400, "Portfolio com esse id não encontrado");
    }

    const updateP = await prisma.portfolio.update({
      where: {
        id: parseInt(`${id}`) | 0,
      },
      data,
    });

    if (updateP) {
      return res.processResponse(
        200,
        "Portfolio atualizado com sucesso",
        updateP
      );
    }

    return res.processResponse(500, "Erro ao atualizar Portfolio", updateP);
  },
};
