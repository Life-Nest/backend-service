import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'

const prisma = new PrismaClient();

export async function getUsers(req, res) {
    try{

        const parents = await prisma.user.findMany();
        res.status(200).json(parents);
    }catch(err){
        res.status(500).json({msg:'server error getting all the users failed',error:err.message});
    }
}


export async function getUser(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }

        })
        if (!user)
            return res.status(404).json({ message: "user Not found" })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({msg:'server Error getting user failed',error:'err.message'});
    }
}

export async function updateUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({msg:'validation failed', errors: errors.array()[0].msg });
        }
        const newData = req.body;
        let hashedPassword = await bcrypt.hash(newData.password, 10);
        delete newData.password;
        newData.password_hash = hashedPassword;
        const id = parseInt(req.params.id);
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: newData
        });
        res.status(200).json({ updatedUser: updatedUser });
    } catch (err) {
        res.status(500).json({msg:"server Error updating user failed",error:err.message});

    }
}

export async function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ deleteUser: deletedUser });
    } catch (error) {
        res.status(500).json({msg:'server Error deleting user failed', error:err.message});

    }
}