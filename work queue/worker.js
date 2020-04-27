var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        var queue = 'newQueue';

        channel.assertQueue(queue, {
            durable: false
        })

        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log('Message sent is %s', msg.content.toString());
            setTimeout(function(){
                console.log("[x] done");
            }, secs * 1000);
        }, {
            noAck: true
        });
    });
});