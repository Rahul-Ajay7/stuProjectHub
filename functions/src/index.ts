import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Razorpay from "razorpay";

admin.initializeApp();

const razorpay = new Razorpay({
  key_id: "rzp_test_Sa0nZA8SAoLHJR",
  key_secret: "vEy84NfFVbR3m89QhTF8RnV1"
});

interface CreateOrderData {
  amount: number;
  currency?: string;
  receipt?: string;
}

export const createOrder = functions.https.onCall(
  async (request: functions.https.CallableRequest<CreateOrderData>) => {
    const { amount, currency, receipt } = request.data;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      return order;
    } catch (err) {
      console.error("Razorpay Error:", err);
      throw new functions.https.HttpsError("internal", "Unable to create Razorpay order.");
    }
  }
);
