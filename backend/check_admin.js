
const mongoose = require('mongoose');
const { User } = require('./src/models/User');
require('dotenv').config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: 'admin@zamgo.com' });
  console.log('Admin User:', JSON.stringify(user, null, 2));
  await mongoose.disconnect();
}

main().catch(console.error);
