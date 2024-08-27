import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";

const router = express.Router();
const prisma = new PrismaClient();

interface IRegister {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface JwtPayload {
  userId: string;
}

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, username, firstName, lastName }: IRegister =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
      },
    });

    res
      .status(201)
      .json({ id: user.id, email: user.email, username: user.username });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: ILogin = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

router.get(
  "/validate-token",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json({ valid: true });
  }
);

export default router;
