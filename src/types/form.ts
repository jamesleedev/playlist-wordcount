export interface FormData {
  spotify: string;
  word: string;
}

export interface Response {
  ok: boolean;
  msg: string;
  errors?: Record<string, string>;
}
