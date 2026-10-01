
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";


 const memberService = new MemberService();


const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.render("home");
    } catch (error) {
        console.error("Error in goHome:", error);
       
    }
};

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");

        res.render("signup");
    } catch (error) {
        console.error("Error in getSignup:", error);
       
    }
};



restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.render("login");
    } catch (error) {
        console.error("Error in getLogin:", error);
       
    }
};




restaurantController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log("processSignup");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember);
        // TODO: SESSIONS AUTHENTICATION

        res.send(result);

    } catch (error) {
        console.error("Error in processSignup:", error);
       res.send(error);
    }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log("processLogin"); 

        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);
        // TODO: SESSIONS AUTHENTICATION

        res.send(result);
    } catch (error) {
        console.error("Error in processLogin:", error);
        res.send(error);
       
    }
};



export default restaurantController;