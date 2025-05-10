import { UserPasswordChangeFormType } from "../../widgets";

export type UserPasswordChangeDataType = Omit<UserPasswordChangeFormType, 'passwordRepeat'>;