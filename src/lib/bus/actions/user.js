import Immutable from "immutable";

import UserAPI from "../../api/user";
import { apiChainGenFor } from "../../util/promise_chains";

const UserActions = (bus) => {
  const userChainGen = apiChainGenFor({
    bus,
    model: "user",
    nSingle: "user",
    nMultiple: "users",
  });

  return {
    autoload: "loadActive",
    
    /**
     * Loads the active user from the server, if we have a session to reference
     */
    loadActive() {
      return UserAPI.getActive().then(({ user }) => {
        user.id = String(user.id);

        const iUser = Immutable.fromJS(user);

        bus.update(bus.state
          .setIn(["user", user.id], iUser)
          .setIn(["user", "active"], iUser)
        );

        return iUser;
      });
    },

    /**
     * Updates the user both locally and on the server.
     */
    update(data) {
      const {
        username, email, interests, postcode, password, verifyPassword,
        currentPassword,
      } = data;

      return UserAPI.updateUser({
        username,
        email,
        interests,
        postcode,
        password,
        verifyPassword,
        currentPassword,
      }).then(({ user }) => {
        user.id = String(user.id);

        const iUser = Immutable.fromJS(user);

        bus.update(bus.state
          .setIn(["user", "active"], iUser)
          .setIn(["user", user.id], iUser)
        );

        return iUser;
      });
    },

    /**
     * Creates a session for the user on the server and saves their data locally
     */
    login(data) {
      const { email, password } = data;

      return UserAPI.login({
        username: email,
        password,
      }).then(({ user }) => {
        user.id = String(user.id);

        const iUser = Immutable.fromJS(user);

        bus.resetState({ noUpdate: true });

        bus.update(bus.state
          .setIn(["user", "active"], iUser)
          .setIn(["user", user.id], iUser)
        );

        return iUser;
      });
    },

    /**
     * Invalidates the user's session serverside and clears local data.
     */
    logout(data) {
      return UserAPI.logout().then(() => {
        bus.resetState();

        return null;
      });
    },

    preRegister(data) {
      return UserAPI.preRegister(data);
    },
  };

};

export default UserActions;
