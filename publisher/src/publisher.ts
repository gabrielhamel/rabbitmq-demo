import { connect } from 'amqplib';

export async function entrypoint(): Promise<void> {
  const connection = await connect('amqp://user:password@localhost:5672/demo-vhost');

  console.log('Connected to RabbitMQ');

  const channel = await connection.createChannel();

  channel.publish(
    // Exchange
    'amq.direct',

    // Routing key
    `demo-rk-${process.env.ENV}`,

    // Message
    Buffer.from(
      JSON.stringify({
        title: `Test message on env ${process.env.ENV}`,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),
    ),
  );

  await channel.close();
  await connection.close();
}
