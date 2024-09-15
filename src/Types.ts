import { SerializedError } from "@reduxjs/toolkit";

export interface logindata {
    email: string
    password: string
    cpassword?:string
    user?:string
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
    project?:ProjectData | null
}

export interface EstimationState{
    loading: boolean;
    estimationList: Record<string, any> | null;
    error: SerializedError | string | null;
    success: boolean;
    message:string|null;
    estimation:any|null;
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
    id?:string

}

export interface UserResponse {
    id: string;
    email: string;
    token: string;
    password?:string;
}