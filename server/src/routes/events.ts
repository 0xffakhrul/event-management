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

router.get(
  "/user",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const userEvents = await prisma.event.findMany({
        where: { organizerId: userId },
        include: {
          organizer: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: { startDate: "desc" },
      });

      res.status(200).json(userEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

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

router.put(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        location,
        imageUrl,
        startDate,
        endDate,
        url,
      } = req.body;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.organizerId !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this event" });
      }

      const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
          title,
          description,
          location,
          imageUrl,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          url,
        },
      });

      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.delete({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
