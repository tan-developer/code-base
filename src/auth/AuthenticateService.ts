import { jwtDecode, JwtPayload } from "jwt-decode";
import Constant from "@/constant/Constant";
import { IAccessToken } from "@/types/IToken";
import { stringNullOrEmpty } from "@/utils/StringUtils";

export default class AuthenticateService {
  private static instance : AuthenticateService;

  constructor() {
      if (AuthenticateService.instance) {
          return AuthenticateService.instance;
      }

      AuthenticateService.instance = this;

      return this;
  }

  public static checkExpiredToken = (token : IAccessToken) : Boolean => {
  
    const currentTime = new Date().getTime() / 1000;
  
    if (token.exp && token && currentTime > token.exp) {
      return true
    }
    return false
  }

  public static checkLogin = () : Boolean => {
    const token = AuthenticateService.getTokenFromLocalHost();

    if (stringNullOrEmpty(token)) {
      return false
    }

    const decodedToken : IAccessToken = AuthenticateService.decodeBearerToken(token);

    if (this.checkExpiredToken(decodedToken)) {

      return false
    }

    return true
  }

  logoutAll = () => {
    localStorage.removeItem(Constant.LocalStorage.TOKEN)
    // ? redirect to login 
  }


  public static getTokenByCode = (token : string) : string => {

    return ''
  }

  public static decodeBearerToken = <T>(token : string) : T => {
    try {
      return jwtDecode<T>(token)
    } catch (error) {
      return {
        aud : '',
        exp : 0,
        iat : 0,
        iss : '',
        jti : '',
        nbf : 0,
        sub : ''
      } as T
    }
  }
  
  public static authHeaer = () : string => {
    if (this.checkLogin()) {
      return `Bearer ${this.getTokenFromLocalHost()}`
    } else {
      this.logOutAll()
      return 'Bearer '
    }
  }


  // ? Get token from localhost
  public static getTokenFromLocalHost = () : string => {
      const token : string = localStorage.getItem(Constant.LocalStorage.TOKEN) ?? ''
      return token
  }

  public static logOutAll = (callback ?: Function ) : void => {
    console.warn("LOGOUT")

    if (typeof callback === 'function' ) {
      callback()
    }
  }


}