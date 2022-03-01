// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
// 	"mongodb+srv://mikelly9:<password>@cluster0.cdizm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
// 	const collection = client.db("test").collection("devices");
// 	// perform actions on the collection object
// 	client.close();
// });
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
	"mongodb+srv://mikelly9:<password>@cluster0.cdizm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
	const collection = client.db("test").collection("devices");
});
