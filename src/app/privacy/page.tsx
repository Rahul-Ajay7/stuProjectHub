export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p>
          At StuProjectHub, your privacy is important to us. We only collect the
          information necessary to provide our services, such as your name, email,
          and project files. We do not sell or share your data with third parties.
        </p>
        <p className="mt-4">
          By using our platform, you agree to our use of cookies and storage of
          necessary information to maintain your session and preferences.
        </p>
        <p className="mt-4">
          Contact us at{" "}
          <a href="mailto:support@stuprojecthub.com" className="text-purple-700 underline">
            support@stuprojecthub.com
          </a>{" "}
          for any privacy-related concerns.
        </p>
      </div>
    </div>
  );
}
