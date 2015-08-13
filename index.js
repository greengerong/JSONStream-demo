var request = require('request'),
    JSONStream = require('JSONStream'),
    es = require('event-stream')

var parser = JSONStream.parse('books.*.title') //emit parts that match this path (any element of the rows array)
    ,
    req = request({
        url: 'https://api.douban.com/v2/book/search?q=%E8%AE%A1%E7%AE%97%E6%9C%BA'
    }),
    logger = es.mapSync(function(data) { //create a stream that logs to stderr,
        console.error(data)
        console.log('--------------');
        return data
    })

req.pipe(parser)
parser.pipe(logger)
