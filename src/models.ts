import { IManySide, IOneSide } from "#interfaces.js";
import { model, Schema, SchemaDefinition } from "mongoose";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html
// https://transform.tools/json-to-mongoose

// ************************************************
const oneSideSchema = new Schema<SchemaDefinition<IOneSide>>(
    {
        _id: Number,
        email: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
    },
    { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false },
);

// ************************************************
const manySideSchema = new Schema<SchemaDefinition<IManySide>>(
    {
        _id: Number,
        customValidatorExample: {
            type: Number,
            validate: {
                message: "Nem páros számot adott meg!",
                validator: function (v: number) {
                    return v % 2 == 0;
                },
            },
        },
        dateExample: {
            default: new Date(),
            max: ["2100-12-31", "Csak 21. századi dátumot adhat meg!"],
            type: Date,
            validate: {
                message: "Az aktuális dátumnál nem adhat meg korábbi dátumot!",
                validator: function (v: Date) {
                    return v >= new Date();
                },
            },
        },
        description: {
            maxLength: [500, "A leírás maximum 500 karakter lehet!"],
            minLength: 10,
            required: true,
            type: String,
        },
        enumExample: {
            enum: {
                message: "{VALUE} is not supported",
                values: ["Coffee", "Tea"],
            },
            type: String,
        },
        FK_neve: {
            index: true,
            ref: "oneSideID", // "oneSideID" -> 1 oldali modell azonosítója, nem kell átírni!
            required: true,
            type: Number,
        },
        isGlutenFree: {
            required: true,
            type: Boolean,
        },
        minMaxExample: {
            max: [5, "Too many stars, got {VALUE}"],
            min: [1, "Too few stars, got {VALUE}"],
            required: [true, "minMaxExample field is required"],
            type: Number,
        },
        name: {
            maxLength: 60,
            required: true,
            type: String,
            unique: true,
        },
        prepTime: {
            default: 12,
            required: true,
            type: Number,
        },
    },
    { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true }, versionKey: false },
);

// Mongoose also supports populating virtuals.
// Help: https://mongoosejs.com/docs/tutorials/virtuals.html#populate
// You can give the "virtualPop" any name you want:

// Access oneSide from manySide:
// manySideSchema.virtual("virtualPop", {
//     ref: "oneSideID",
//     localField: "FK_neve",
//     foreignField: "_id", //ref_Field
//     justOne: true,
// });
// Use virtual for populate in manySide controller:
// const data = await this.many.find({},"-_id").populate("virtualPop", "-_id -prepTime");

// Access manySide from oneSide:
// oneSideSchema.virtual("virtualPop", {
//     ref: "manySideID",
//     localField: "_id",
//     foreignField: "FK_neve", //ref_Field
//     justOne: false,
// });
// Use virtual for populate in oneSide controller:
// const data = await this.one.find({},"-_id").populate("virtualPop", "-_id");

export const oneSideModel = model("oneSideID", oneSideSchema, "TáblaNeveOne");
export const manySideModel = model("manySideID", manySideSchema, "TáblaNeveMany");
