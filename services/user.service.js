import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator'
// Initialize Prisma client
const prisma = new PrismaClient();
export async function getUsers(req, res) {
    const parents = await prisma.parent.findMany();
    res.send(parents);
}


export async function getUser(req, res) {
    const id = parseInt(req.params.id);
    try {

        const user = await prisma.parent.findUnique({
            where: {
                id: id
            }

        })
        if(!user)
            return res.send({message:"user Not found"})
        res.send(user);
    } catch (err) {
        res.send(err.message);
    }
}

export async function updateUser(req, res) {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const newData=req.body;
    let hashedPassword=await bcrypt.hash(newData.password, 10);
    delete newData.password;
    newData.password_hash=hashedPassword;
    const id = parseInt(req.params.id);
        const updatedUser = await prisma.parent.update({
            where: {
                id: id
            },
            data: newData
        });
        res.send({updatedUser:updatedUser});
    } catch (err) {
        res.send(err.message);
       
    }
}

export async function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    try {
        const deletedUser = await prisma.parent.delete({
            where: {
                id: id
            }
        });
        res.send({deleteUser:deletedUser});
    } catch (error) {
        console.error('Error deleting user:', error);
        
    }
}