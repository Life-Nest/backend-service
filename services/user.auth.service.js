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
        msg: "validation failed",
        error: errors.array()[0].msg
      });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const newParent = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password_hash: hashedPassword,
        national_id: national_id,
        phone_number: phone_number,
        city: city,
        address: address,
        longitude: longitude,
        latitude: latitude,
        accuracy: accuracy,
      },
    });
    res.json({ newParent }).status(201);
  }
  catch (err) {
    res.status(500).json({
      msg: 'server Error registeration failed',
      error: err.message
    });
  }
}



export async function userLogin(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: 'server Error validation failde',
        error: errors.array()[0].msg
      });
    }
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );
    if (!validPassword) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, expiresIn: '7d' },
      process.env.JWT_SECRETE
    );
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({
      msg: 'server Error login failed',
      error: err.message
    });
  }
} 