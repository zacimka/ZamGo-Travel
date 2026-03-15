
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

async function main() {
  const client = createTRPCProxyClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/trpc',
      }),
    ],
  });

  try {
    console.log('Logging in...');
    const loginRes = await client.auth.login.mutate({
      email: 'admin@zamgo.com',
      password: 'Nasriin0855',
    });
    console.log('Login Success. Token:', loginRes.token);

    const clientWithAuth = createTRPCProxyClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
          headers: {
            authorization: `Bearer ${loginRes.token}`,
          },
        }),
      ],
    });

    console.log('Fetching bookings...');
    const bookings = await clientWithAuth.bookings.getAllBookings.query();
    console.log('Bookings found:', bookings.length);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
