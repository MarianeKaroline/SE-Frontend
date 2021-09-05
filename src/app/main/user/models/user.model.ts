export interface UserModel {
  cpf: string,
  email: string,
  password: string,
  employee: boolean,
  token: string,
  tokenExpires: Date
}
