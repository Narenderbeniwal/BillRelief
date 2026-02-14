"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";

const ACCEPT = "application/pdf,image/jpeg,image/png,image/jpg";
const MAX_SIZE_MB = 10;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;

export function BillUploadForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [providerName, setProviderName] = useState("");
  const [error, setError] = useState("");

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/bills", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Upload failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
      router.push(`/dashboard/bills/${data.id}`);
    },
    onError: (err: Error) => setError(err.message),
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const f = e.target.files?.[0];
    if (!f) {
      setFile(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError(`File must be under ${MAX_SIZE_MB}MB`);
      setFile(null);
      return;
    }
    const type = f.type.toLowerCase();
    if (
      ![
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
      ].includes(type)
    ) {
      setError("Please upload a PDF or image (JPG, PNG).");
      setFile(null);
      return;
    }
    setFile(f);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    if (providerName.trim()) formData.append("providerName", providerName.trim());
    uploadMutation.mutate(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="file">Bill file (PDF, JPG, or PNG)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="file"
            type="file"
            accept={ACCEPT}
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {file && (
            <span className="text-sm text-muted-foreground truncate max-w-[180px]">
              {file.name}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="provider">Provider / facility name (optional)</Label>
        <Input
          id="provider"
          type="text"
          placeholder="e.g. City General Hospital"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        variant="yellow"
        className="w-full"
        disabled={!file || uploadMutation.isPending}
      >
        {uploadMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Upload and analyze
          </>
        )}
      </Button>
    </form>
  );
}
