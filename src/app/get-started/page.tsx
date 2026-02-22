import { QualificationQuiz } from "@/components/get-started/QualificationQuiz";
import { CostUrgency } from "@/components/landing/CostUrgency";
import { SiteHeader } from "@/components/landing/SiteHeader";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <CostUrgency variant="default" />
        <div className="mt-8">
          <QualificationQuiz />
        </div>
      </main>
    </div>
  );
}
