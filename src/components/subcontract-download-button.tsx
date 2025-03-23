"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

export function SubcontractDownloadButton({
  subcontractId,
}: {
  subcontractId: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    const res = await fetch(`/api/pdf`, {
      method: "POST",
      body: JSON.stringify({ subcontractId }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setIsDownloading(false);
  };
  return (
    <Button variant="outline" disabled={isDownloading} onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? "Downloading..." : "Download"}
    </Button>
  );
}
