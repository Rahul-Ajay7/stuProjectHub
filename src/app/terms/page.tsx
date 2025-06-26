export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="max-w-3xl bg-white p-8 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p>
          By accessing StuProjectHub, you agree to comply with and be bound by the following terms:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>You must be at least 13 years old to use this platform.</li>
          <li>All uploaded projects must be your original work or you must have rights to sell them.</li>
          <li>We reserve the right to remove content that violates our policies.</li>
          <li>StuProjectHub is not liable for transactions made outside the platform.</li>
        </ul>
        <p className="mt-4">Violation of terms may result in suspension or termination of your account.</p>
      </div>
    </div>
  );
}
