import express from 'express';
import {MongoClient} from "mongodb";
import {db, connectToDb} from "./db.js";

let articlesInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: []
    }, {
        name: 'learn-node',
        upvotes: 0,
        comments: []
    }, {
        name: 'learn-mongodb',
        upvotes: 0,
        comments: []
    },
]
const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;

    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article)
    } else {
        res.sendStatus(404);
    }
})

app.get('/api/articles', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db')
    const article = await db.collection('articles').find();
    res.send(article)
})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;

    await db.collection('articles').updateOne({
        name
    }, {
        $inc: {
            upvotes: 1
        }
    });

    const article = await db.collection('articles').findOne({name});
    if (article) {
        res.json(article);
    } else {
        res.send(`That articles doesn\'t exist`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {postedBy, text} = req.body;

    await db.collection('articles').updateOne({
        name
    }, {
        $push: {
            comments: {
                postedBy,
                text
            }
        }
    });

    const article = await db.collection('articles').findOne({name});

    if (article) {
        res.json(article);
    } else {
        res.send(`That articles doesn\'t exist`);
    }

});

app.get('/hello/:name', (req, res) => {
    const {name} = req.params
    res.send(`<h1>Hello! ${
        name
    }!</h1>`)
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log("Server is listening on port 8000");
    });
})
