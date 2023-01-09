const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
//userName=Service_Saver
//password=sIv5sEydkpDFM95x
app.get("/", (req, res) => {
  res.send("Initialize server");
});

// connecting string

const uri =
  "mongodb+srv://Service_Saver:sIv5sEydkpDFM95x@cluster0.hornnmm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const serviceCollection = client.db("Service_Saver").collection("Services");
    const reviewCollection = client.db("Service_Saver").collection("Review");

    app.post("/service", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await serviceCollection.insertOne(data);
      res.send(result);
    });
    app.get("/service", async (req, res) => {
      const result = await serviceCollection.find({}).toArray();
      // console.log(object);
      res.send(result);
    });
    app.get("/service/:id", async (req, res) => {
      const result = await serviceCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.send(result);
    });
    // review
    app.post("/review", async (req, res) => {
      const data = req.body;

      const result = await reviewCollection.insertOne(data);
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const id = req.query.serviceid;
      const result = await reviewCollection.find({ serviceId: id }).toArray();
      // console.log(object);
      res.send(result);
    });
    app.get("/review/:email", async (req, res) => {
      const email = req.params.email;

      const result = await reviewCollection.find({ email: email }).toArray();

      res.send(result);
    });
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;

      const result = await reviewCollection.deleteOne({ _id: ObjectId(id) });

      res.send(result);
    });
  } finally {
  }
};
run().catch(console.dir);

app.listen(port, () => console.log("Success..."));
