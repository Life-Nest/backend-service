import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/* Temporary function for testing purposes */
async function allIncs() {
  const incs = await prisma.hospital.findMany({
    include: {
      incubators: true,
    },
  });

  return incs;
}
/* Temporary function for testing purposes */

async function getAllIncubators(hospital_id) { 
  const allIncubators = await prisma.incubator.findMany({
    where: {
      hospital_id: hospital_id,
    },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      rent_per_day: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return allIncubators;
}


async function getIncubator(payload) {
  const { hospital_id, incubator_id } = payload;
  const incubator = await prisma.incubator.findUnique({
    where: {
      id: incubator_id,
      hospital_id: hospital_id,
    },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      rent_per_day: true,
    }
  });

  if (incubator === null) {
    return {
      error: {
        code: 404,
        msg: 'Resource Not Found'
      }
    }
  }

  return incubator;;
}

async function searchIncubator(query) {
  const { longitude, latitude, city } = query;
  const hospitals = await prisma.hospital.findMany({
    select: {
      id: true,
      name: true,
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

  // Distance Calculation
  hospitals.forEach(hospital => {
    hospital.distance = distance(
      latitude,
      hospital.latitude,
      longitude,
      hospital.longitude
    );
  });

  // Filter by Availability
  const filterByAvailability = hospital => {
    return hospital.incubators.length !== 0;
  }
  const filteredHospitals = hospitals.filter(filterByAvailability);

  // Sort by Distance
  const compareDistance = (a, b) => {
    return a.distance - b.distance;
  }
  const sortedHospitals = filteredHospitals.sort(compareDistance);

  return filteredHospitals.slice(0, 3);
}

function distance(
  latitude1,
  latitude2,
  longitude1,
  longitude2
) {
  // Longitude/Latitude differences
  const dLatitude = latitude2 - latitude1;
  const dLongitude = longitude2 - longitude1;

  // Haversine formula
  const a = Math.pow(Math.sin(dLatitude / 2), 2)
              + Math.cos(latitude1)
              * Math.cos(latitude2)
              * Math.pow(Math.sin(dLongitude / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers
  const R = 6371;

  return (R * c);
}


async function checkIncubatorName(hospitalId, name) {
  const existing = await prisma.incubator.findFirst({
    where: {
      hospital_id: hospitalId,
      name: name,
    },
  });

  if (existing) {
    const error = new Error('An Incubator with that name already exists');
    error.code = 409;
    throw error;
  }
}


async function createIncubator(payload) {
  const { hospital_id, name } = payload;
  try {
    await checkIncubatorName(hospital_id, name);
    const newIncubator = await prisma.incubator.create({
data: payload
    });

    return { msg: 'Incubator created successfully' };
  } catch (err) {
    if (err.code === 'P2003') {
      return {
        error: {
          code: 422,
          msg: 'The request cannot be processed due to a foreign key constraint violation'
        }
      }
    } else if (err.code === 409) {
      return {
        error: {
          code: err.code,
          msg: err.message
        }
      }
    }

    throw err;
  }
}


async function updateIncubator(payload) {
  const { incubator_id, hospital_id, ...data } = payload;
  try {
    await checkIncubatorName(hospital_id, data.name);
    const updatedIncubator = await prisma.incubator.update({
      where: {
        id: incubator_id,
        hospital_id: hospital_id
      },
      data: data,
    });

    return { msg: 'Incubator updated successfully' };
  } catch(err) {
    if (err.code === 'P2025') {
      return {
        error: {
          code: 404,
          msg: 'Resource Not Found'
        }
      }
    } else if (err.code === 409) {
      return {
        error: {
          code: err.code,
          msg: err.message
        }
      }
    }

    throw err;
  }
}


async function deleteIncubator(payload) {
  const { hospital_id, incubator_id } = payload;
  try {
    const deletedIncubator = await prisma.incubator.delete({
      where: {
        id: incubator_id,
        hospital_id,
      },
    });

    return { msg: 'Incubator deleted successfully' };
  } catch(err) {
    if (err.code === 'P2025') {
      return {
        error: {
          code: 404,
          msg: 'Resource Not Found'
        }
      }
    }

    throw err;
  }
}


export {
  getAllIncubators,
  getIncubator,
  searchIncubator,
  allIncs,
  createIncubator,
  updateIncubator,
  deleteIncubator
}
