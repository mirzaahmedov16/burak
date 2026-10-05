import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Member } from "../libs/types/member";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService();

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (error) {
    console.error("Error in goHome:", error);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");

    res.render("signup");
  } catch (error) {
    console.error("Error in getSignup:", error);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (error) {
    console.error("Error in getLogin:", error);
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processSignup");

    console.log("BODY:", req.body);

    const newMember: MemberInput = req.body;

    console.log("INPUT:", newMember);
    console.log("PASSWORD:", newMember.memberPassword);

    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember);

    // TODO: SESSIONS AUTHENTICATION

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin:", err);

    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/signup')</script>`,
    );
  }
};
restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    // TODO: SESSIONS AUTHENTICATION

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin:", err);

    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`,
    );
  }
};

restaurantController.logout = (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");

    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.redirect("/admin");
  }
};

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response,
) => {
  try {
    console.log("checkAuthSession");

    if (req.session?.member)
      res.send(
        `<script>alert('Hi, ${req.session.member.memberNick}'); window.location.href = '/admin';</script>`,
      );
    else
      res.send(
        `<script>alert('${Message.NOT_AUTHENTICATED}'); window.location.href = '/admin/login';</script>`,
      );
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

export default restaurantController;
