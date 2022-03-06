import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://mikelly9:${process.env.dbPassword}@cluster0.cdizm.mongodb.net/Cluster0?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: false,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const getDbData = async () => {
	await client.connect();
	const collection = await client
		.db("barstool")
		.collection("feeds")
		.find()
		.toArray();
	return collection;
};

const updateDbData = async (documents) => {
	await client.connect();
	const upsert = await client
		.db("barstool")
		.collection("feeds")
		.bulkWrite(
			documents.map((d) => {
				return {
					updateOne: {
						filter: { _id: d._id },
						update: { $set: d },
						upsert: true,
					},
				};
			})
		);
	return upsert;
};

export { getDbData, updateDbData };
