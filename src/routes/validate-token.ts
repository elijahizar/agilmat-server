import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    //Il y a le token
    try {
      const bearerToken = headerToken.slice(7);
      //verifier si le token n'est pas expiré ou corrupted
      jwt.verify(bearerToken, process.env.SECRET_KEY || "pepito123");
      next();
    } catch (error) {
      res.status(401).json({
        msg: "token non valide",
      });
    }
  } else {
    res.status(401).json({
      msg: "pas access",
    });
  }
};

export default validateToken;
