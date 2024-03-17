import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function getAllIncubators() {
  const allIncubators = await prisma.incubator.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return allIncubators;
}


async function getIncubator(incubatorId) {
  const incubator = await prisma.incubator.findUnique({
    where: {
      id: incubatorId,
    },
  });

  if (incubator === null) {
    return {message: 'Not Found!'};
  } else {
    return incubator;
  }
}


async function createIncubator(payload) {
  const rent = payload.rent_per_day;
  const incubatorData = {
    name: payload.name,
    type: payload.type,
    status: payload.status,
    rent_per_day: parseFloat(rent) !== parseInt(rent),
    hospital_id: Number.isInteger(payload.hospital_id)
  }

  return incubatorData;
  const newIncubator = await prisma.incubator.create({
    data: {
      ...payload,
      hospital: {
        connect: HospitalCreateWithoutIncubatorsInput,
      }
    }
  });

  return newIncubator;
}


async function updateIncubator(incubatorId, payload) {
  const updatedIncubator = await prisma.incubator.update({
    where: {
      id: incubatorId,
    },
    data: payload,
  });

  return updatedIncubator;
}


async function deleteIncubator(incubatorId) {
  const deletedIncubator = await prisma.incubator.delete({
    where: {
      id: incubatorId,
    },
  });

  return deletedIncubator;
}


export {
  getAllIncubators,
  getIncubator,
  createIncubator,
  updateIncubator,
  deleteIncubator
}
