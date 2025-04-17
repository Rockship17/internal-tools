import { QuoteData } from "./types"

export const generateQuoteDoc = (quoteData: QuoteData, recipientName: string): string => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Quotation - ${recipientName}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        .header { margin-bottom: 30px; }
        .company-info { margin-bottom: 20px; }
        .total-row { font-weight: bold; background-color: #f0f0f0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>QUOTATION</h1>
        <div class="company-info">
          <h2>${quoteData.company.name}</h2>
          <p>${quoteData.company.address}</p>
        </div>
        <div>
          <p><strong>To:</strong> ${recipientName}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Item</th>
            <th>Mandays</th>
            <th>Cost (mil VND)</th>
          </tr>
        </thead>
        <tbody>
          ${quoteData.quotationItems
      .map(
        (item) => `
            <tr>
              <td>${item.no}</td>
              <td>${item.item}</td>
              <td>${item.mandays}</td>
              <td>${item.costMilVND}</td>
            </tr>
          `
      )
      .join("")}
          <tr class="total-row">
            <td colspan="2">Total one-time cost</td>
            <td>${quoteData.totalMandays}</td>
            <td>${quoteData.totalOneTimeCostMilVND}</td>
          </tr>
          <tr>
            <td colspan="2">Monthly operating cost</td>
            <td></td>
            <td>${quoteData.monthlyOperatingCostMilVND}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Notes:</h3>
        <ul>
          ${quoteData.notes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    </body>
    </html>
  `
  return htmlContent
}