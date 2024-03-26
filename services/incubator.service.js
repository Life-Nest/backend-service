import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
  createIncubator,
  updateIncubator,
  deleteIncubator
}
