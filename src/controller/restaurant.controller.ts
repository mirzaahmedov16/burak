
import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";


const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome");
        res.send("Home page");
    } catch (error) {
        console.error("Error in goHome:", error);
       
    }
};


restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin");
        res.send("Login page");
    } catch (error) {
        console.error("Error in getLogin:", error);
       
    }
};


restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup");

        res.send("Signup page");
    } catch (error) {
        console.error("Error in getSignup:", error);
       
    }
};


restaurantController.processLogin = (req: Request, res: Response) => {
    try {
        console.log("processLogin");
        res.send("DONE");
    } catch (error) {
        console.error("Error in processLogin:", error);
       
    }
};

restaurantController.processSignup = (req: Request, res: Response) => {
    try {
        console.log("processSignup");
        res.send("DONE");
    } catch (error) {
        console.error("Error in processSignup:", error);
       
    }
};

export default restaurantController;