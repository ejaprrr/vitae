"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50 no-print">
      <Button 
        onClick={(e) => { e.preventDefault(); window.print(); }}
        theme="dark"
        className="flex items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Print PDF
      </Button>
    </div>
  );
}
