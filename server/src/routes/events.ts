import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types";
import { authenticateToken } from "./users";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/test", async (req: Request, res: Response) => {
  try {
    res.send("yoooo");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.status(201).json(events);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const {
        title,
        description,
        location,
        imageUrl,
        startDate,
        endDate,
        url,
      } = req.body;
      const organizerId = req.userId;

      if (!organizerId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const event = await prisma.event.create({
        data: {
          title,
          description,
          location,
          imageUrl,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          url,
          organizerId,
        },
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

export default router;
