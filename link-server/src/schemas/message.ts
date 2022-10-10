import { JSONSchemaType } from "ajv";

interface MessageSendBody {
  uuid: string;
  content: string;
}

interface MessageGetQuery {
  uuid: string;
}

const MessageSendBodySchema: JSONSchemaType<MessageSendBody> = {
  type: "object",
  required: ["uuid", "content"],
  properties: {
    uuid: { type: "string" },
    content: { type: "string" },
  },
};

const MessageGetQuerySchema: JSONSchemaType<MessageGetQuery> = {
  type: "object",
  required: ["uuid"],
  properties: {
    uuid: { type: "string" },
  },
};

export { MessageSendBodySchema, MessageGetQuerySchema };
