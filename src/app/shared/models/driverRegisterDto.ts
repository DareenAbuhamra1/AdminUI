export interface DriverRegisterDto {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  gender: number; // E.g., 1 for Male, 2 for Female
  dateOfBirth?: string; // YYYY-MM-DD
  vehicleLicense: string;
  driverLicense: string;
}