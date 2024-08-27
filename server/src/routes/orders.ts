import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types";
import { authenticateToken } from "./users";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        event: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
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

      const userOrders = await prisma.order.findMany({
        where: { userId: userId },
        include: {
          event: {
            include: {
              organizer: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(userOrders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/event/:eventId", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const eventOrders = await prisma.order.findMany({
      where: { eventId: eventId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        event: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(eventOrders);
  } catch (error) {
    console.error("Error fetching event orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        event: true,
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { eventId } = req.body;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const order = await prisma.order.create({
        data: {
          userId,
          eventId,
        },
        include: {
          event: true,
        },
      });

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ message: "Error creating order" });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const order = await prisma.order.findUnique({
        where: { id },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this order" });
      }

      const deletedOrder = await prisma.order.delete({
        where: { id },
      });

      res.status(200).json(deletedOrder);
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
