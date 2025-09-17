import { BackgroundVarification } from "../components/BackgroundVarificationCompound";

export default function BackgroundVarificationPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <BackgroundVarification>
          <BackgroundVarification.Header />
          <BackgroundVarification.Body />
          <BackgroundVarification.Footer />
        </BackgroundVarification>
      </div>
    </div>
  );
}
