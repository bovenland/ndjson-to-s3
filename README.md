# @bovenland/ndjson-to-s3

Creates S3 objects from lines in [newline delimited JSON](http://ndjson.org/) files.

Expects each line to have 3 properties: `Bucket`, `Key` and `Body`.

Usage:

```bash
cat file.ndjson
  | jq -c '{ \
    Bucket: "files.boven.land", \
    Key: ("data/" + .osmId + ".json"), \
    Body: . \
  }' \
  | ./index.js
