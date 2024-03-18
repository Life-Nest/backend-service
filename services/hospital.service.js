import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator'
let prisma = new PrismaClient();


export async function updateHospital(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw { error: errors.array()[0].msg, code: 400 };
    }
    const hospitalId = parseInt(req.params.id);
    const existingHospital = await prisma.hospital.findUnique({ where: { id: hospitalId } });
    if (!existingHospital) {
        throw { error: 'Hospital not found', code: 404 };
    }
    const newData = req.body;
    let hashedPassword = await bcrypt.hash(newData.password, 10);
    delete newData.password;
    newData.password_hash = hashedPassword;
    const updatedHospital = await prisma.hospital.update({
        where: { id: hospitalId },
        data: newData
    });

    return updatedHospital;
}

export async function deleteHospital(id) {
    const deletedHospital = await prisma.hospital.delete({
        where: { id: parseInt(id) }
    });
    return { deletedHospital };
}

export async function getHospital(id) {
    const hospital = await prisma.hospital.findUnique({
        where: { id: parseInt(id) }
    });

    if (!hospital) {
        throw { code: 404, error: 'Hospital not found' };
    }

    return hospital;
}


export async function getAllHospital() {
    const hospitals = await prisma.hospital.findMany();

    if (hospitals.length===0) {
        throw { code: 404, error: 'there is no hospitals now' };
    }

    return hospitals;
}


