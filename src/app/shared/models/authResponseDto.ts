export interface authResponseDto {
  isActive?: boolean;
  isRegistered?: boolean;
  isSuccess: boolean;

  token: string;
  refreshToken: string;
  expiry?: string; // usually comes as ISO string from .NET

  fullName: string;
  role: number; // or RoleEnum if you map it
  userId?: number;

  message: string;
}