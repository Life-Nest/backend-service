import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    let { name, email, password, role, hospital_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await prisma.hospitalStaff.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        role,
        hospital_id,
      },
    });
 
    // const secret= process.env.JWT_SECRET;
    const secret= "ghjghjgjgjhghj";

    //generate token
    const token = jwt.sign({ id: newStaff.id, role:role ,hospital_id:hospital_id},secret,{ expiresIn: '7d' });


    res.json(token);



  } catch (err) {
  
    res.status(500).json({ message:err.message });
  }
};

export const login = async (req, res) => {
  try {
    const staff = await prisma.hospitalStaff.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!staff) {
      return res
        .status(400)
        .json({ massage: "ther is no staff with this email" });
    }
    const password = req.body.password;
    const validPassword = await bcrypt.compare(password, staff.password_hash);
    if (!validPassword) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
  
    //generate token
    const token = jwt.sign(
      { id: staff.id, hospital_id:staff.hospital_id ,role: staff.role},
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(200).json({ jwt_token: token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
