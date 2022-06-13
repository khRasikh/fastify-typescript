import { ObjectId } from "mongodb";

export default class Users {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}