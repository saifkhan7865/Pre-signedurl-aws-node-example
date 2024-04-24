const express = require("express");
const aws = require("aws-sdk");
const cors = require("cors");

aws.config.update({
  accessKeyId: "XXxxxxxxxx",
  secretAccessKey: "xxxxxx",
  region: "ap-south-1",
});

const s3 = new aws.S3({
  region: "ap-south-1",
});
const app = express();

app.use(cors());
app.listen(3000, () => {
  console.log("listening on 3000 port");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/s3-presigned-url", async (req, res) => {
  const s3Parms = {
    Bucket: "testingbucketmk",
    Key: req.query.filename,
    Expires: 60 * 60,
    ContentType: req.query.mimetype,
  };

  const url = await s3.getSignedUrl("putObject", s3Parms);

  res.json({ url });
});
