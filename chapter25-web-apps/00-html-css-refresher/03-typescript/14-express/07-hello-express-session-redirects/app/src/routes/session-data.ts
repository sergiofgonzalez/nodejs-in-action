import { Session } from 'express-session';

export interface ISessionData extends Session {
  username: string;
}