import { SerializedError } from "@reduxjs/toolkit";

export interface logindata {
    email: string
    password: string
    cpassword?:string
}

export interface AuthState {
    loading: boolean;
    userInfo: Record<string, any> | null;
    error: SerializedError | string | null;
    success: boolean;
}

export interface ProjectState {
    loading: boolean;
    projectList: Record<string, any> | null;
    error: SerializedError | string | null;
    success: boolean;
    message:string|null;
}

export interface ProjectData {
    customer:string;
    refNo: string;
    projectName:string
    projectNumber:number;
    areaLocation:string;
    address:string;
    duedate:Date;
    contact:number;
    manager:string;
    staff?:string;
    status:string;
    email:string

}

export interface UserResponse {
    id: string;
    email: string;
    token: string;
    password?:string;
}