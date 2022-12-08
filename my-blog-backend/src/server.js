import fs from 'fs';
import admin from "firebase-admin";
import express from 'express';
import {MongoClient} from "mongodb";
import {db, connectToDb} from "./db.js";

/* let articlesInfo = [
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
] */

const credentials = JSON.parse(fs.readFileSync('credentials.json'));
admin.initializeApp({credential: admin.credential.cert(credentials)});

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
    const {authtoken} = req.headers;
    console.log("authtoken: " + authtoken);

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            res.sendStatus(400);
        }
    }
    req.user = req.user || {};
    console.log("req.user: " + JSON.stringify(req.user));
    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;
    console.log("uid: " + JSON.stringify(uid))

    const article = await db.collection('articles').findOne({name});
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && ! upvoteIds.includes(uid);
        res.json(article)
    } else {
        res.sendStatus(404);
    }
})

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

/* app.get('/api/articles', async (req, res) => {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db')
    const article = await db.collection('articles').find();
    res.send(article)
}) */

app.put('/api/articles/:name/upvote', async (req, res) => {
    const {name} = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({name});
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && ! upvoteIds.include(uid);
        if (canUpvote) {
            await db.collection('articles').updateOne({
                names
            }, {
                $inc: {
                    upvotes: 1
                },
                $push: {
                    upvoteIds: uid
                }
            });
        }
        const updatedArticle = await db.collection('articles').findOne({name});
        res.json(updatedArticle);
    } else {
        res.send(`That articles doesn\'t exist`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const {name} = req.params;
    const {text} = req.body;
    const {email} = req.user;

    await db.collection('articles').updateOne({
        name
    }, {
        $push: {
            comments: {
                postedBy: email,
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
