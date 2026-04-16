const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ6g_Gigb-PaDhq6K3V35TqQzMU0Tqcn7nm2pJGpNM_xE6lApD9sYYwdt5A-NMqjyjhGY8lpytH0M7/pub?output=csv";

export interface SheetRow {
  Metric: string;
  Value: string;
  Previous: string;
  Unit: string;
  Trend: string;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (const char of line) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function getSheetData(): Promise<SheetRow[]> {
  const response = await fetch(SHEET_URL, { cache: "no-store" });
  const csv = await response.text();

  const lines = csv.trim().split("\n");
  const headers = parseCSVLine(lines[0]);

  const rows = lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      row[header] = values[i] ?? "";
    });
    return row as SheetRow;
  });

  return rows;
}