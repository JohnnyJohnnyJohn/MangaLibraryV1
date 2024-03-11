import {UserDto} from "./UserDto";

export interface AuthenticationResponseDto{
  user: UserDto;
  accessToken: string;
}
