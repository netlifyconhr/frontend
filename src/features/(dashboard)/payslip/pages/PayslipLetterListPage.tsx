import { PayslipLetter } from "../components/PayslipLetter";

export default function PayslipLetterListPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <PayslipLetter>
          <PayslipLetter.Header />
          <PayslipLetter.Body />
          <PayslipLetter.Footer />
        </PayslipLetter>
      </div>
    </div>
  );
}
