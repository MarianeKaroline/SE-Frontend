export interface SignUpModel {
  cpf: string,
  fullName: string,
  phone: string,
  email: string,
  birthDate: Date,
  password: string,
  employee: boolean,
  accessInventory: boolean,
  accessRegister: boolean
}
