require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");


// == middleware ==
app.use(cors());
app.use(express.json());

// __________________________________________________________________________________

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.virnuu4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {

  try {
    const packageCollection = client.db("shoforPotheDB").collection("packages");
    const storyCollection = client.db("shoforPotheDB").collection("stories");
    const gallaryCollection = client.db("shoforPotheDB").collection("gallary");

    // ============= packages api starts ============
    app.get('/packages', async (req, res)=> {
        const result = await packageCollection.find().toArray() ;
        res.send(result)
    })

    // ============= stories api starts ============
    app.get('/stories', async (req, res)=> {
      const result = await storyCollection.find().toArray() ;
      res.send(result)
  })

      // ============= gallary with type api starts ============
      app.get('/gallary', async (req, res)=> {
        const result = await gallaryCollection.find().toArray() ;
        res.send(result)
    })





    // ______________________________________________________________________________
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// __________________________________________________________________________________
app.get("/", (req, res) => {
  res.send("assignmetn 12 api running");
});

app.listen(port, () => {
  console.log(`assignment-12 is running on port ${port}`);
});
