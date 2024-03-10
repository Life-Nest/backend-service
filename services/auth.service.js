
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();
export async function parentRegister(reqBody){

    const {name,email,password,national_id,phone_number,city,address,longitude,latitude,accuracy}=reqBody;
    //validation 
     
    try{
        let hashedPassword=await bcrypt.hash(password, 10);
        console.log(national_id)
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
        return newParent;
    }
    catch(err){
        return err;
    }
}
 