"use client"

import SendQuoteForm from "@/components/tools/send-quote/SendQuoteForm"
import QuotePreview from "@/components/tools/send-quote/QuotePreview"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function SendQuote() {
  const [showPreview, setShowPreview] = useState(true)

  return (
    <div className="container mx-auto px-4">
      <div>
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            {showPreview ? (
              <>
                <EyeOff className="h-4 w-4" /> Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" /> Show Preview
              </>
            )}
          </Button>
        </div>
        <ResizablePanelGroup direction="horizontal" className="grid grid-cols-2 gap-4">
          <ResizablePanel defaultSize={50}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Generate Quote</h2>
              <SendQuoteForm />
            </div>
          </ResizablePanel>
          {showPreview && (
            <>
              <ResizableHandle className="bg-gray-200" />
              <ResizablePanel defaultSize={50}>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Quote Preview</h2>
                  <QuotePreview />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
