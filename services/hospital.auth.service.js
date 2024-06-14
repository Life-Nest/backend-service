import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

export async function registration(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { error: errors.array()[0].msg, code: 400 };
  }

  const {
    email,
    password,
    name,
    type,
    phone_number,
    city,
    address,
    longitude,
    latitude,
    accuracy
  } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);

  const hospital = await prisma.hospital.create({
    data: {
      email,
      password_hash: hashedPassword,
      name,
      type,
      phone_number,
      city,
      address,
      longitude,
      latitude,
      accuracy,
    },
  });
  return hospital;

}

export async function login(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw { error: errors.array()[0].msg, code: 400 };
  }

  const { email, password } = req.body;

  const hospital = await prisma.hospital.findUnique({
    where: {
      email
    }
  });
  if (!hospital) {
    throw { error: 'Hospital not found', code: 404 };
  }


  const passwordMatch = await bcrypt.compare(
    password,
    hospital.password_hash
  );
  if (!passwordMatch) {
    throw { error: 'Invalid credentials', code: 401 };
  }


  const token = jwt.sign(
    { hospitalId: hospital.id },
    process.env.JWT_SECRETE,
    { expiresIn: '7d' }
  );

  return { token };


}