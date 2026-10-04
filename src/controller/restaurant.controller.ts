
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Member } from "../libs/types/member";


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




restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
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





    } catch (error) {
        console.error("Error in processSignup:", error);
        res.send(error);
    }
};

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin"); 

        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input);
        // TODO: SESSIONS AUTHENTICATION

           req.session.member = result;
        req.session.save(function () {
                 res.send(result);

        });


        
    } catch (error) {
        console.error("Error in processLogin:", error);
        res.send(error);
       
    }
};



export default restaurantController;