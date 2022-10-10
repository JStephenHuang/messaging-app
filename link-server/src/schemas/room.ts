import { JSONSchemaType } from "ajv";

interface RoomJoinBody {
  uuid: string;
}

interface RoomLeaveBody {
  uuid: string;
}

interface RoomCreateBody {
  name: string;
  owner: string;
}

interface RoomGetQuery {
  user: string;
}

const RoomGetQuerySchema: JSONSchemaType<RoomGetQuery> = {
  type: "object",
  required: ["user"],
  properties: {
    user: { type: "string" },
  },
};

const RoomCreateBodySchema: JSONSchemaType<RoomCreateBody> = {
  type: "object",
  required: ["name", "owner"],
  properties: {
    name: { type: "string" },
    owner: { type: "string" },
  },
};

const RoomJoinBodySchema: JSONSchemaType<RoomJoinBody> = {
  type: "object",
  required: ["uuid"],
  properties: {
    uuid: { type: "string" },
  },
};

const RoomLeaveBodySchema: JSONSchemaType<RoomLeaveBody> = {
  type: "object",
  required: ["uuid"],
  properties: {
    uuid: { type: "string" },
  },
};

export { RoomJoinBodySchema, RoomLeaveBodySchema, RoomCreateBodySchema, RoomGetQuerySchema };
