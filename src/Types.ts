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

export interface UserResponse {
    id: string;
    email: string;
    token: string;
    password?:string;
}