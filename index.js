const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Service Review Server Running')
})


const uri = "mongodb+srv://service_review_user:qi3WWtiWLGfFpwM9@cluster0.klpdq3q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const userCollection = client.db('serviceReview').collection('category');

        app.get('/category', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const category = await cursor.toArray();
            res.send(category)
        })
    }
    finally{

    }
}
run().catch(error => console.log(error))


app.listen(port, () =>{
    console.log(`Service Review Server running on port ${port}`);
})