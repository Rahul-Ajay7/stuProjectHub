export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="max-w-3xl bg-white p-8 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-4">Refund Policy</h1>
        <p>
          Due to the nature of digital products, we generally do not offer refunds after a successful purchase.
        </p>
        <p className="mt-4">
          However, if there is a technical issue or if the downloaded file is corrupt or inaccessible, please contact us at{" "}
          <a href="mailto:support@stuprojecthub.com" className="text-purple-700 underline">
            support@stuprojecthub.com
          </a>{" "}
          within 7 days of purchase. We will investigate and process a refund or replacement as necessary.
        </p>
      </div>
    </div>
  );
}
