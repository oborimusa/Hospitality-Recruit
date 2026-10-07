const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'jobpitality-1cfb2'
});

async function setClaim() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node set-claim.js your-email@example.com');
    process.exit(1);
  }
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { superAdmin: true });
  console.log('✅ Super admin claim set for:', user.email);
  console.log('   UID:', user.uid);
}

setClaim().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
