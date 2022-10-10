import { JSONSchemaType } from "ajv";

interface LoginBody {
  username: string;
  password: string;
}

interface RegisterBody {
  username: string;
  password: string;
}

const LoginBodySchema: JSONSchemaType<LoginBody> = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

const RegisterBodySchema: JSONSchemaType<RegisterBody> = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

export { LoginBodySchema, RegisterBodySchema };
