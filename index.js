const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID, ObjectId } = require('bson');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Service Review Server Running')
})


const uri = "mongodb+srv://service_review_user:qi3WWtiWLGfFpwM9@cluster0.klpdq3q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('serviceReview').collection('category');
        const userReview = client.db('serviceReview').collection('review');

        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const category = await cursor.toArray();
            res.send(category)
        })
        
        app.get('/category/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const categories = await userCollection.findOne(query);
            res.send(categories);
        })

        app.post('/category', async (req, res) => {
            const category = req.body;
            const result = await userCollection.insertOne(category);
            res.send(result);
        })

        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = userReview.find(query);
            const review = await cursor.toArray();
            res.send(review)
        })
        
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await userReview.insertOne(review, new Date());
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))


app.listen(port, () => {
    console.log(`Service Review Server running on port ${port}`);
})