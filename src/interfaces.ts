import { Router } from "express";

export interface IController {
    router: Router;
}

// use JSON to TS converter Vs Code Extension!
export interface IManySide {
    _id: number;
    customValidatorExample: number;
    dateExample: Date;
    description: string;
    enumExample: string;
    FK_neve: number;
    isGlutenFree: boolean;
    minMaxExample: number;
    name: string;
    prepTime: number;
}

export interface IOneSide {
    _id: number;
    email: string;
    name: string;
}
