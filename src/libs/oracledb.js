// import oracledb from "oracledb";

// async function connectToDatabase() {
//   try {
//     const connection = await oracledb.getConnection({
//       user: "c##project1",
//       password: "123",
//       connectString: "Danish.mshome.net:1522/XE",
//     });
//     console.log("Successfully connected to Oracle database");
//     return connection;
//   } catch (error) {
//     console.error("Error connecting to Oracle database:", error);
//     return null; // Return null to indicate a failed connection
//   }
// }

// export { connectToDatabase };

import oracledb from "oracledb";

async function connectToDatabase() {
  try {
    const connection = await oracledb.getConnection({
      user: "c##dbms",
      password: "123",
      connectString: "localhost:1522/orcl2",
    });
    console.log("Successfully connected to Oracle database");
    return connection;
  } catch (error) {
    console.error("Error connecting to Oracle database:", error);
    return null; // Return null to indicate a failed connection
  }
}

export { connectToDatabase };
