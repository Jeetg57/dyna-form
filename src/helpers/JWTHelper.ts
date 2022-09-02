export class JWTHelper {
  setJWT = (token: string) => {
    return window.sessionStorage.setItem("jwt", token);
  };
}
