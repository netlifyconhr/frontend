import { ReleaseLetter } from "../components/ReleaseLetter";

export default function ExamFormListPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <ReleaseLetter>
          <ReleaseLetter.Header />
          <ReleaseLetter.Body />
          <ReleaseLetter.Footer />
        </ReleaseLetter>
      </div>
    </div>
  );
}
