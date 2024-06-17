import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';


const prisma = new PrismaClient();

function distance(
  latitude1,
  latitude2,
  longitude1,
  longitude2
) {

  const dLatitude = latitude2 - latitude1;
  const dLongitude = longitude2 - longitude1;

  const a = Math.pow(Math.sin(dLatitude / 2), 2)
              + Math.cos(latitude1)
              * Math.cos(latitude2)
              * Math.pow(Math.sin(dLongitude / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of the earth in kilometers
  const R = 6371;

  return (R * c);
}

async function searchHospital(req, res) {
  const {
    longitude,
    latitude,
    page
  } = matchedData(req);
  const hospitals = await prisma.hospital.findMany({
    select: {
      name: true,
      email: true,
      type: true,
      phone_number: true,
      city: true,
      address: true,
      latitude: true,
      longitude: true,
      incubators: {
        where: {
          status: 'available',
        },
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  hospitals.forEach(hospital => {
    hospital.distance = distance(
      latitude,
      hospital.latitude,
      longitude,
      hospital.longitude
    );
  });

  const filterByAvailability = hospital => {
    return hospital.incubators.length !== 0;
  }
  const filteredHospitals = hospitals.filter(filterByAvailability);

  const compareDistance = (a, b) => {
    return a.distance - b.distance;
  }
  const sortedHospitals = filteredHospitals.sort(compareDistance);

  const start = page * 3;
  const end = start + 3;
  const result = filteredHospitals.slice(start, end);

  const trimmedResult = result.map((obj) => {
    const { incubators, distance, ...rest } = obj;
    return rest;
  });

  res.status(200).json({ hospitals: trimmedResult });
}


export {
  searchHospital,
}
