const { getTypesFromDB, saveTypes } = require("./utils");

//Just get types from api, load em to db and send them back to the client.
const getTypes = async (req, res) => {
  try {
    await saveTypes();
    let types = await getTypesFromDB();
    types = types.map((t) => {
      return {
        id: t.id,
        name: t.name,
      };
    });
    res.send(types);
  } catch (error) {
    res.send({ errorMsg: error });
  }
};

module.exports = {
  getTypes,
};
