export class CreateUserDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  role: string;
  uuid!: string;
  msisdn!: string;
}
