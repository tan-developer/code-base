import { JwtPayload } from "jwt-decode";

export interface IAccessToken extends JwtPayload {
  userName : string,
}

export interface IRefreshToken extends JwtPayload {}