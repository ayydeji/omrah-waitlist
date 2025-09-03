import { google } from 'googleapis';

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Initialize Google Sheets API client
export async function getGoogleSheetsClient() {
  const client_email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const private_key = process.env.GOOGLE_SHEETS_PRIVATE_KEY;


  if (!client_email || !private_key) {
    throw new Error(`Missing Google Sheets credentials: client_email=${!!client_email}, private_key=${!!private_key}`);
  }

  // Clean and format the private key
  const cleanPrivateKey = private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: client_email,
    key: cleanPrivateKey,
    scopes: SCOPES,
  });

  // Authorize the client
  await auth.authorize();

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Add a row to Google Sheets
export async function addRowToSheet(data: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    throw new Error('Missing GOOGLE_SHEETS_SPREADSHEET_ID in environment variables');
  }

  const sheets = await getGoogleSheetsClient();
  
  // Prepare the row data in the order: email, first_name, last_name, timestamp
  const values = [
    [
      data.email,
      data.firstName,
      data.lastName,
      new Date().toISOString(),
    ]
  ];

  const request = {
    spreadsheetId,
    range: 'Sheet1!A:D', // Adjust range as needed
    valueInputOption: 'USER_ENTERED',
    resource: {
      values,
    },
  };

  const response = await sheets.spreadsheets.values.append(request);
  return response.data;
}