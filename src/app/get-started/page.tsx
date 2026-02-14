import { QualificationQuiz } from "@/components/get-started/QualificationQuiz";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <QualificationQuiz />
      </main>
    </div>
  );
}
