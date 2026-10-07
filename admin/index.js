const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.superAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only super admins can set claims.'
    );
  }
  const { uid, role } = data;
  await admin.auth().setCustomUserClaims(uid, { [role]: true });
  return { success: true };
});
