import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

/* 
    Esto es un 'hack' para que el hotreload de Next13
    no inicialize varios clientes de Prisma en development
*/
