mongod --dbpath "D:\a\full-stack-blog\my-blog-backend\mongo-db-data"

d:
cd D:\a\full-stack-blog\my-blog-backend
npm run dev

----
use react-blog-db
db.articles.insertMany([{
  "name": "learn-react",
  "upvotes": 7,
  "comments": [
    {
      "postedBy": "Ellen",
      "text": "this is a post by Ellen"
    },
    {
      "postedBy": "John",
      "text": "great post!!!"
    }
  ]
},{
  "name": "learn-node",
  "upvotes": 3,
  "comments": [
    {
      "postedBy": "Ellen",
      "text": "this is a post by Ellen"
    },
    {
      "text": "great article",
      "postedBy": "Mark"
    },
    {
      "postedBy": "a",
      "text": "a"
    },
  ]
},{
  "name": "learn-mongodb",
  "upvotes": 0,
  "comments": [
  {
      "postedBy": "Ellen",
      "text": "this is a post by Ellen"
    },
    {
      "postedBy": "John",
      "text": "great post!!!"
    }]
}])