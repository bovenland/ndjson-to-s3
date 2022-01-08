#!/usr/bin/env node

const H = require('highland')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()

function upload (row) {
  return new Promise((resolve, reject) => {
    const params = {
      ...row,
      Body: JSON.stringify(row.Body),
      ContentType: 'application/json; charset=utf-8'
    }

    s3.putObject(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

let count = 0

H(process.stdin)
  .split()
  .compact()
  .map(JSON.parse)
  .flatMap((row) => H(upload(row)))
  .map((data) => ({
    count: count++,
    ...data
  }))
  .map(JSON.stringify)
  .intersperse('\n')
  .pipe(process.stdout)
