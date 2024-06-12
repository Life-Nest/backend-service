import { PrismaClient } from '@prisma/client';
import { matchedData } from 'express-validator';


const prisma = new PrismaClient();

async function getReservations(req, res) {
  const { userId } = matchedData(req);
  const reservations = await prisma.reservation.findMany({
    where: {
      parent_id: userId,
    },
  });

  res.status(200).json({ reservations });
}

async function getReservation(req, res) {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: req.reservation_id,
      parent_id: req.parent_id,
    },
  });

  res.status(200).json({ ...reservation });
}

async function createReservation(req, res) {
  const reservation = await prisma.reservation.create({
    data: req.data,
  });
  
  res.status(201).json({ ...reservation });
}

async function updateReservation(req, res) {
  const reservation = await prisma.reservation.update({
    where: {
      id: req.reservation_id,
      parent_id: req.parent_id,
    },
    data: req.data,
  });

  res.status(200).json({ reservation });
}

async function deleteReservation(req, res) {
  const reservation = await prisma.reservation.delete({
    where: {
      id: req.reservation_id,
      parent_id: req.parent_id,
    },
  });

  res.status(200).json({ reservation });
}

export {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
}
