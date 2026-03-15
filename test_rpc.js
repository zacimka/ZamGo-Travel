
const { createTRPCProxyClient, httpBatchLink } = require('@trpc/client');

const client = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
});

async function main() {
  try {
    const res = await client.auth.login.mutate({
      email: 'admin@zamgo.com',
      password: 'Nasriin0855',
    });
    console.log('Login Response:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Login Error:', err);
  }
}

main();
