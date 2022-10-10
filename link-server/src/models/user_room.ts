import {
  Sequelize,
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  CreationOptional,
} from "sequelize";
import { Message } from "./message";

class UserRoom extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare roomId: number;
  declare Messages: Message[];
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
}

const initializeUserRoomModel = (sequelize: Sequelize) => {
  return UserRoom.init({}, { sequelize });
};

export { initializeUserRoomModel, UserRoom };
