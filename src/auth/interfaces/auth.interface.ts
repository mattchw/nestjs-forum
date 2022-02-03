export interface IToken {
  userId: number;
  username: string;
  role: RoleType;
}

export interface IRequest extends Request {
  user?: IToken;
}

export const RoleStr = ['User', 'Admin'] as const;
export type RoleType = typeof RoleStr[number];
