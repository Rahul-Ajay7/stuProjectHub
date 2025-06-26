import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 border-t">
      © 2025 StuProjectHub ·{" "}
      <Link href="/privacy" className="hover:underline text-purple-700">Privacy</Link>{" "}
      ·{" "}
      <Link href="/terms" className="hover:underline text-purple-700">Terms</Link>{" "}
      ·{" "}
      <Link href="/refund-policy" className="hover:underline text-purple-700">Refund Policy</Link>
    </footer>
  );
}
