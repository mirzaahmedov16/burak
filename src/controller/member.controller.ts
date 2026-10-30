import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import { ExtendedRequest, Member, MemberInput } from "../libs/types/member";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import { LoginInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService();
const authService = new AuthService();

const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");

    const input: MemberInput = req.body,
      result = await memberService.signup(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (error) {
    console.error("Error in signup:", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");

    const input: LoginInput = req.body,
      result = await memberService.login(input),
      token = await authService.createToken(result);

    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (error) {
    console.error("Error in login:", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("logout");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    return res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("Error, logout:", err);
    if (err instanceof Errors) return res.status(err.code).json(err);
    else return res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) {
      req.member = await authService.checkAuth(token);
    }

    if (!req.member) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
    }

    return next(); // <-- Faqat keyingi qadamga o'tkaziladi, res.json yozilmaydi!
  } catch (err) {
    console.log("Error, verifyAuth:", err);
    if (err instanceof Errors) {
      return res.status(err.code).json(err); // <-- return qo'shildi
    } else {
      return res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};
memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let member = null;
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);
    return next();

    console.log("member:", member);
    res.status(HttpCode.OK).json({ member: member });
  } catch (err) {
    console.log("Error, retrieveAuth:", err);
    return next();
  }
};

export default memberController;
