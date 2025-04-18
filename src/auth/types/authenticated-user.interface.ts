export interface AuthenticatedUser {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
