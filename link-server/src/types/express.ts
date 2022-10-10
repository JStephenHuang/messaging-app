import { Request, Response } from "express";
import { Query, Send } from "express-serve-static-core";

interface TypedRequest<U extends Query, V> extends Request {
  query: U;
  body: V;
}

interface TypedResponse<T> extends Response {
  json: Send<T, this>;
}

export { TypedRequest, TypedResponse };
