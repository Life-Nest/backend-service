import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllStaff = async (req, res) => {
  try {
    const staff = await prisma.hospitalStaff.findMany();
    if (staff.length === 0) {
      return res.status(400).json({ massage: "thers are no staff" });
    }

    res.json(staff);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const GetStaffById = async (req, res) => {
  try {
    const staff = await prisma.hospitalStaff.findFirst({
      where: {
        id: +req.params.id,
      },
    });
    if (!staff) {
      return res.status(400).json({ massage: "ther is no staff with this id" });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const DeleteStaffById = async (req, res) => {
  try {
    deletedStaff = await prisma.hospitalStaff.delete({
      where: {
        id: +req.params.id,
      },
    });
    if (!deletedStaff) {
      return res.status(400).json({ massage: "ther is no staff with this id" });
    }
  } catch (err) {
    res.status(500).json({ massage: err.message });
  }
};

export const UpdateStaff = async (req, res) => {
  try {
    const updatedStaff = await prisma.hospitalStaff.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });
    if (!updatedStaff) {
      return res.status(400).json({ massage: "ther is no staff with this id" });
    }
    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ massage: err.message });
  }
};
