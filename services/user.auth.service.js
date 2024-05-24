import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

export async function userRegisteration(req, res) {
  try {
    const {
      name,
      email,
      password,
      national_id,
      phone_number,
      city,
      address,
      longitude,
      latitude,
      accuracy
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
          field: errors.array()[0].path,
          code: 400
        }
      });
    }

    const existing = await prisma.user.findFirst({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        error: {
          message: 'That email is taken. Try another.',
          field: 'email',
          code: 409
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newParent = await prisma.user.create({
      data: {
        password_hash: hashedPassword,
        name,
        email,
        national_id,
        phone_number,
        city,
        address,
        longitude,
        latitude,
        accuracy,
      },
    });
    const token = jwt.sign(
      { id: newParent.id, role: 'parent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({ jwt_token: token });
  }
  catch (err) {
    res.status(500).json({
      error: {
        message: err.message,
        code: 500
      }
    });
  }
}



export async function userLogin(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
          field: errors.array()[0].path,
          code: 400
        }
      });
    }
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Couldn\'t find your account',
          field: 'email',
          code: 404
        }
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );
    if (!validPassword) {
      return res.status(401).json({
        error: {
          message: 'Wrong password',
          field: 'password',
          code: 401
        }
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: 'parent' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({ jwt_token: token });
  } catch (err) {
    res.status(500).json({
      error: {
        message: err.message,
        code: 500
      }
    });
  }
} 
