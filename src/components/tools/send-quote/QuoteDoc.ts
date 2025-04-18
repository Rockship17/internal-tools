import { QuoteData } from "@/types/quote"

export const generateQuoteDoc = (quoteData: QuoteData, recipientName: string): string => {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Quotation - ${recipientName}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.3;
      margin: 0;
      padding: 0;
    }

    .container {
      width: 100%;
    }

    .header {
      text-align: center;
      margin-bottom: 20pt;
    }

    .header h1 {
      font-size: 14pt;
      font-weight: bold;
      margin: 15pt 0;
    }

    .company-info {
      width: 100%;
      margin-bottom: 15pt;
    }

    .company-info td {
      vertical-align: top;
      padding: 0;
      border: none;
    }

    .company-logo {
      width: 150px;
      margin-bottom: 10pt;
    }

    table.quote-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15pt;
    }

    .quote-table th, .quote-table td {
      border: 1pt solid #000000;
      text-align: left;
    }

    .quote-table th {
      background-color: #f0f0f0;
      font-weight: bold;
    }

    .quote-table .no-column {
      width: 8%;
    }

    .quote-table .item-column {
      width: 52%;
    }

    .quote-table .mandays-column {
      width: 20%;
    }

    .quote-table .cost-column {
      width: 20%;
    }

    .total-row {
      font-weight: bold;
      background-color: #e0e0e0;
    }

    .notes {
      margin-top: 20pt;
    }

    .notes h3 {
      font-size: 11pt;
      margin-bottom: 8pt;
    }

    .notes ul {
      margin: 0;
      padding-left: 20pt;
    }

    .notes li {
      margin-bottom: 4pt;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>QUOTATION</h1>
    </div>

    <table class="company-info">
      <tr>
        <td style="width: 60%;">
          <img src="https://glenvill-bucket.s3.ap-southeast-1.amazonaws.com/rockship-logo.jpg" alt="logo" class="company-logo"><br>
          <strong>${quoteData.company.name}</strong><br>
          ${quoteData.company.address}
        </td>
        <td>
          <strong>To:</strong> ${recipientName}<br>
          <strong>Date:</strong> ${new Date().toLocaleDateString()}
        </td>
      </tr>
    </table>

    <table class="quote-table">
      <thead>
        <tr>
          <th class="no-column">No.</th>
          <th class="item-column">Item</th>
          <th class="mandays-column">Mandays</th>
          <th class="cost-column">Cost (mil VND)</th>
        </tr>
      </thead>
      <tbody>
        ${quoteData.quotationItems.map(item => `
          <tr>
            <td>${item.no}</td>
            <td>${item.item}</td>
            <td>${item.mandays}</td>
            <td>${item.costMilVND}</td>
          </tr>
        `).join("")}
        <tr class="total-row">
          <td colspan="2">Total one-time cost</td>
          <td>${quoteData.totalMandays}</td>
          <td>${quoteData.totalOneTimeCostMilVND}</td>
        </tr>
      </tbody>
    </table>

    <div class="notes">
      <h3>Notes:</h3>
      <ul>
        ${quoteData.notes.map(note => `<li>${note}</li>`).join("")}
      </ul>
    </div>
  </div>
</body>
</html>
`
  return htmlContent
}