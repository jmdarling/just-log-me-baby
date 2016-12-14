# Just Log Me Baby

[![Just Log Me Baby](http://img.youtube.com/vi/M2WB5yD7FfY/0.jpg)](http://www.youtube.com/watch?v=M2WB5yD7FfY "Just Love Me Baby")

[Just Love Me Baby - Rosco Gordon](https://www.youtube.com/watch?v=M2WB5yD7FfY)

## What is it?
A simple logging API. This app, accepts a post to ```/log/:database``` with content to log in the body. It will write this data to a Redis queue where consumers [Insert link to consumer repo here]() will pull items off and write them to wherever they should be written.

## How do I use it?
Make sure you are running Redis on the machine you will run this app on at the default port (I'll make this configurable eventually).

```
$npm i
$npm start
```
