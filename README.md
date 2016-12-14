# Just Log Me Baby

[![Just Log Me Baby](http://img.youtube.com/vi/M2WB5yD7FfY/0.jpg)](http://www.youtube.com/watch?v=M2WB5yD7FfY "Just Love Me Baby")

[Just Love Me Baby - Rosco Gordon](https://www.youtube.com/watch?v=M2WB5yD7FfY)

## What is it?
A simple logging API. This app, accepts a post to ```/log/:database``` with content to log in the body. It will write
this data to a Redis queue where consumers like [the mongo consumer](https://github.com/jmdarling/just-log-me-baby) will
pull items off and write them to wherever they should be written.

## How do I use it?
Set the PORT and REDIS_URL environment variables (also supports [dotenv](https://www.npmjs.com/package/dotenv)). The app
will default to run on port ```8080``` and attach to redis at ```//localhost:6379``` if environment variables are not
set.

```
$npm i
$npm start
```
