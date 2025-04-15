"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X } from "lucide-react"

interface QuoteItem {
  no: number
  item: string
  mandays: number
  cost: number
}

export default function QuotePreview() {
  const [isEditing, setIsEditing] = useState(false)
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { no: 0, item: "Requirement analysis & use case", mandays: 2, cost: 2 },
    { no: 1, item: "Conversation flow & prompt design", mandays: 4, cost: 4 },
    { no: 2, item: "Bot development & integration", mandays: 8, cost: 10 },
    { no: 3, item: "Knowledge base import & setup", mandays: 3, cost: 4 },
    { no: 4, item: "QA & Testing", mandays: 3, cost: 3 },
    { no: 5, item: "Deployment & onboarding", mandays: 2, cost: 2 },
  ])
  const [recipientName, setRecipientName] = useState("Testttt")

  const totalMandays = quoteItems.reduce((sum, item) => sum + item.mandays, 0)
  const totalCost = quoteItems.reduce((sum, item) => sum + item.cost, 0)
  const monthlyOperatingCost = 3

  const handleItemChange = (index: number, field: keyof QuoteItem, value: string | number) => {
    const newItems = [...quoteItems]
    if (field === 'mandays' || field === 'cost') {
      newItems[index][field] = Number(value)
    } else if (field === 'item') {
      newItems[index][field] = String(value)
    }
    setQuoteItems(newItems)
  }

  return (
    <Card className="p-6 mt-6 bg-white relative">
      <div className="absolute top-4 right-4 flex gap-2">
        {isEditing ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <X className="h-4 w-4" /> Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit2 className="h-4 w-4" /> Edit
          </Button>
        )}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold mb-2">Rockship Pte. Ltd.</h1>
          <p className="text-gray-600">OXLEY BIZHUB, 73 UBI ROAD 1, #08-54, Postal 408733</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold uppercase">QUOTATION</h2>
        </div>
      </div>

      {/* Recipient */}
      <div className="mb-8">
        {isEditing ? (
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="w-64"
            placeholder="Recipient Name"
          />
        ) : (
          <p className="font-semibold">To: {recipientName}</p>
        )}
      </div>

      {/* Quote Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">No.</th>
              <th className="border p-3 text-left">Item</th>
              <th className="border p-3 text-left">Mandays</th>
              <th className="border p-3 text-left">Cost (mil VND)</th>
            </tr>
          </thead>
          <tbody>
            {quoteItems.map((item, index) => (
              <tr key={item.no}>
                <td className="border p-3">{item.no}</td>
                <td className="border p-3">
                  {isEditing ? (
                    <Input
                      value={item.item}
                      onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.item
                  )}
                </td>
                <td className="border p-3">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={item.mandays}
                      onChange={(e) => handleItemChange(index, 'mandays', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.mandays
                  )}
                </td>
                <td className="border p-3">
                  {isEditing ? (
                    <Input
                      type="number"
                      value={item.cost}
                      onChange={(e) => handleItemChange(index, 'cost', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.cost
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="border p-3">
                Total one-time cost
              </td>
              <td className="border p-3">{totalMandays}</td>
              <td className="border p-3">{totalCost}</td>
            </tr>
            <tr>
              <td colSpan={2} className="border p-3">
                Monthly operating cost
              </td>
              <td className="border p-3"></td>
              <td className="border p-3">{monthlyOperatingCost}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Notes:</h3>
        <ul className="list-disc list-inside">
          <li>Development Timeline is around 1 month</li>
        </ul>
      </div>
    </Card>
  )
}
