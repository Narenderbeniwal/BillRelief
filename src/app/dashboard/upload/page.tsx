import { BillUploadForm } from "@/components/dashboard/BillUploadForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Upload a medical bill</CardTitle>
          <CardDescription>
            Upload a PDF, JPG, or PNG (max 10MB). Our AI will analyze it for errors and overcharges. Your file is stored securely and HIPAA compliant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BillUploadForm />
        </CardContent>
      </Card>
    </div>
  );
}
