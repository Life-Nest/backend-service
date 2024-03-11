import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
import  { validationResult} from'express-validator';
export async function userRegisteration(req,res){

    const {name,email,password,national_id,phone_number,city,address,longitude,latitude,accuracy}=req.body;

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors:errors.array()[0].msg  });
        }
    
        let hashedPassword=await bcrypt.hash(password, 10);
        const newParent = await prisma.parent.create({
            data: {
                name: name, 
                email:email ,
                password_hash: hashedPassword,
                national_id: national_id,
                phone_number:phone_number,
                city: city,
                address: address,
                longitude:longitude, 
                latitude: latitude, 
                accuracy: accuracy,
            },
        });
        res.send(newParent).status(201);
      
    }
    catch(err){
        res.send(err.message);
    }
}
 


export async function userLogin(req,res){   
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        const {email,password}=req.body;

        // Find user by email
        const user = await prisma.parent.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }
        // Check password
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        // Generate JWT
        const token = jwt.sign({ id: user.id ,expiresIn: '7d'}, process.env.JWT_SECRETE);
        res.send(token);
    } catch (err) {
        res.status(500).send(err.message);
    }
}