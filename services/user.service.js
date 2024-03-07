import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();
export async function getParents(){
    const parents = await prisma.parent.findMany();
    console.log("parents",parents);
    return parents;
    
}