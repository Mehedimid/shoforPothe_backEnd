require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// == middleware ==
app.use(cors());
app.use(express.json());

// __________________________________________________________________________________

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.virnuu4.mongodb.net/?retryWrites=true&w=majority`;
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
    const guidesCollection = client.db("shoforPotheDB").collection("guides");
    const wishCollection = client.db("shoforPotheDB").collection("wishlist");
    const bookingCollection = client.db("shoforPotheDB").collection("bookings");
    const userCollection = client.db("shoforPotheDB").collection("users");

    // ============= packages api starts ============
    app.get("/packages", async (req, res) => {
      const result = await packageCollection.find().toArray();
      res.send(result);
    });

    // ============= stories api starts ============
    app.get("/stories", async (req, res) => {
      const result = await storyCollection.find().toArray();
      res.send(result);
    });

    app.post("/stories", async (req, res) => {
      const story = req.body
      const result = await storyCollection.insertOne(story)
      res.send(result);
    });


    // ============= gallary  type api starts ============
    app.get("/gallary", async (req, res) => {
      const result = await gallaryCollection.find().toArray();
      res.send(result);
    });



    // ================= users api =================
    app.post("/users", async (req, res) => {
      const user = req.body ;
      const query = {email : user.email}
      const existingUser = await userCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: "user exist already", insertedId: null });
      }
      const result = await userCollection.insertOne(user)
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });


    // ============= GUIDES   api starts ============
    app.get("/guides", async (req, res) => {
      const result = await guidesCollection.find().toArray();
      res.send(result);
    });

    app.patch("/guides/reviews/:id", async (req, res) => {
      const id = req.params;
      const newReview = req.body;
      console.log(newReview);
      const updateDoc = await guidesCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            reviews: newReview,
          },
        }
      );
      res.send(updateDoc);
    });

    // ============= wishlist api starts ============

    app.get("/wishlist", async (req, res) => {
      const result = await wishCollection.find().toArray();
      res.send(result);
    });

    app.post("/wishlist", async (req, res) => {
      const wish = req.body;
      // const query = {
      //   $and: [
      //     { email: wish.email },
      //     { packageId : wish.packageId}
      //   ],
      // };
      // const existingWish = await wishCollection.findOne(query)
      // if(existingWish){
      //   return res.send({ message: "package already exists in wishlist", insertedId: null });
      // }
      const result = await wishCollection.insertOne(wish);
      res.send(result);
    });

    app.delete("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.deleteOne(query);
      res.send(result);
    });

    // ============= BOOking api starts ============

    app.get("/bookings", async (req, res) => {
      const result = await bookingCollection.find().toArray();
      res.send(result);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body
      const result = await bookingCollection.insertOne(booking)
      res.send(result);
    });

    app.delete("/bookings/:id", async (req, res) => {
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result);
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
