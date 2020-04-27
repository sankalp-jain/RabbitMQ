var amqp = require('amqplib/callback_api');
var ch;

amqp.connect("amqp://localhost", function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        ch = channel;
    });
});

exports.getResponse = function() {
    var queues = ['Sports', 'Business', 'Editorials', 'International', 'Political'];
    for(var i = 0; i < queues.length; i++) {
        var queue = queues[i];
        ch.assertQueue(queue, {
            durable: false
        });

        ch.consume(queue, function(msg) {
            console.log("Received %s", msg.content);
        });
    }    
    console.log("Broadcast latest changes to all usernames in queues");
}