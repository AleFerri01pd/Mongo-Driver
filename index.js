const MongoClient = require("mongodb").MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("hospital");
    const patients = database.collection("patient");
    // FIND Elementi
    const query = { /* name: "Ale" */ }; //possibile filtro per 
    const cursor = await patients.find(query);
    const val = await patients.find(query).toArray();

    val.forEach((element, index) => {
        console.log(element.name);
    });

    let rowMatched = await cursor.count();

    if (rowMatched > 0) {
        //UPDATE elementi
        console.log('+ di due elementi');
        const filter = {name: "Ale"};
        const newField = { $set: {gender: "Male"}};

        const result = await patients.updateMany(filter, newField);

        console.log(result);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

