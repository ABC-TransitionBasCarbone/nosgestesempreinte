import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import keys from '../../data/keys.json';
import { validate as uuidValidate } from 'uuid';

type ResponseData = {
  message: string;
};

const ERROR_MESSAGES = {
  INVALID_UUID: 'The provided UUID is not valid.',
  MISSING_SPREADSHEET_ID: 'The SPREADSHEET_ID is not defined in the .env.',
  APPEND_ERROR: 'An error occurred while adding the row.',
  ROUTE_NOT_FOUND: 'API route not found',
};

const SUCCESS_MESSAGES = {
  SUCCESS: 'The row was successfully added.',
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: ERROR_MESSAGES.ROUTE_NOT_FOUND });
  }

  try {
    const data = req.body.data;
    if (!data) {
      return res.status(400).json({ message: ERROR_MESSAGES.INVALID_UUID });
    }

    const jsonData = JSON.parse(data);
    const userId = jsonData.user?.userId;
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!userId || !uuidValidate(userId)) {
      return res.status(422).json({ message: ERROR_MESSAGES.INVALID_UUID });
    }

    if (!spreadsheetId) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_SPREADSHEET_ID });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const service = google.sheets({ version: 'v4', auth });

    console.log(jsonData)

    const values = [mapDataToSheet(jsonData.simulation, keys)];
    values[0].unshift(userId); // Insert userId at the beginning

    const resource = { values };

    try {
      await service.spreadsheets.values.append({
        spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        range: 'A1',
        resource,
      });
      return res.status(200).json({ message: SUCCESS_MESSAGES.SUCCESS });
    } catch (error) {
      console.error('Append Error:', error);
      return res.status(500).json({ message: ERROR_MESSAGES.APPEND_ERROR });
    }
  } catch (err) {
    console.error('Handler Error:', err);
    return res.status(500).json({ message: ERROR_MESSAGES.APPEND_ERROR });
  }
}

function mapDataToSheet(simulationData: Record<string, any>, keys: string[]): any[][] {
  const values: any[] = [];
  keys.forEach(key => {
    const value = simulationData.situation[key] || '';
    values.push(value);
  });
  return values;
}
