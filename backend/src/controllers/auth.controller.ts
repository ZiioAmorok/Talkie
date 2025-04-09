import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Používateľ s týmto emailom už existuje." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser._id, res);

    res.status(201).json({ message: "Registrácia prebehla úspešne." });

  } catch (error) {
    console.error("Chyba pri registrácii:", error);
    res.status(500).json({ message: "Vnútorná chyba servera pri registrácii." });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Používateľ s týmto emailom neexistuje." });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Nesprávne heslo." });
      return;
    }

    const token = generateToken(user._id, res);

    res.status(200).json({ message: "Prihlásenie prebehlo úspešne.", token });
  } catch (error) {
    console.error("Chyba pri prihlásení:", error);
    res.status(500).json({ message: "Vnútorná chyba servera pri prihlásení." });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Odhlásenie prebehlo úspešne." });
  } catch (error) {
    console.error("Chyba pri odhlásení:", error);
    res.status(500).json({ message: "Vnútorná chyba servera pri odhlásení." });
  }
};
