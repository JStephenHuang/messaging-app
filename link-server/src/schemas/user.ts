import { JSONSchemaType, str } from "ajv";

interface UserGetQuery {
  prefix: string;
  limit: string;
}
const UserGetQuerySchema: JSONSchemaType<UserGetQuery> = {
  type: "object",
  required: ["prefix"],
  properties: {
    prefix: { type: "string" },
    limit: { type: "string", default: "10" },
  },
};

export { UserGetQuerySchema, UserGetQuery };
