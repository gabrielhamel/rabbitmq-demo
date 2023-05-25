import { Channel, ConsumeMessage, connect } from 'amqplib';

function onMessage(channel: Channel) {
  return function (message: ConsumeMessage | null) {
    if (!message) {
      return;
    }

    console.log(
      `Received message from exchange: ${message.fields.exchange}, routing key: ${message.fields.routingKey}`,
    );

    const body = JSON.parse(message.content.toString() || '');
    console.log(body);

    // Acknowledge the message
    channel.ack(message);

    console.log('Message acknowledged');
  };
}

export async function entrypoint(): Promise<void> {
  const connection = await connect('amqp://user:password@localhost:5672/demo-vhost');

  console.log('Connected to RabbitMQ');

  const channel = await connection.createChannel();

  channel.consume(`demo-queue-dev`, onMessage(channel));
}
