import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";

export const AuthGuard = () => {
  const auth = inject(TokenService);
  const router = inject(Router);

  if(!auth.isAuthenticated()) {
    router.navigateByUrl('/login')
    return false
  }
  return true
}
