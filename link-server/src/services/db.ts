import { Sequelize, Dialect } from "sequelize";
import { initializeUserModel, User } from "../models/user";
import { initializeRoomModel, Room } from "../models/room";
import { initializeUserRoomModel } from "../models/user_room";
import { initializeMessageModel } from "../models/message";
import { initializeFriendModel, Friend } from "../models/friend";
import { initializeUserFriendModel } from "../models/user_friend";

let sequelize: Sequelize;

const initializeSequelize = async (dialect: Dialect, storage: string): Promise<Sequelize> => {
  sequelize = new Sequelize("database", "", "", {
    dialect: dialect,
    storage: storage,
  });

  const user = initializeUserModel(sequelize);
  const room = initializeRoomModel(sequelize);
  const userRoom = initializeUserRoomModel(sequelize);
  const message = initializeMessageModel(sequelize);
  const friend = initializeFriendModel(sequelize);
  const userFriend = initializeUserFriendModel(sequelize);

  user.belongsToMany(room, { through: userRoom });
  room.belongsToMany(user, { through: userRoom });

  user.belongsToMany(friend, { through: userFriend });
  friend.belongsToMany(user, { through: userFriend });

  user.hasMany(message);
  message.belongsTo(user);

  room.hasMany(message);
  message.belongsTo(room);

  friend.hasMany(message);
  message.belongsTo(friend);

  return await sequelize.sync();
};

const getSequelize = (): Sequelize => {
  return sequelize;
};

export { initializeSequelize, getSequelize };
