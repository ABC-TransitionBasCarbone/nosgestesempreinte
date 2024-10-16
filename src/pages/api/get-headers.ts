import type { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleSheetsService } from '@/services/googleSheetsService'

type ResponseData = {
  message: string;
  headers?: any
};

const SUCCESS_MESSAGES = {
  SUCCESS: 'The keys have been correctly recovered',
};

const ERROR_MESSAGES = {
  GET_HEADERS: 'An error occurred while retrieving the first line of the spreadsheet.',
  ROUTE_NOT_FOUND: 'API route not found.',
  CALL_API_GOOGLE: 'An error occurred when calling the google API.',
};

export default async function getHeaders(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: ERROR_MESSAGES.ROUTE_NOT_FOUND });
  }

  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    let headers : any[] = [];
    const service = getGoogleSheetsService()
    try {
      const response = await service.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:1',
      });
      if (response && response.data && response.data.values) {
        headers = response?.data?.values[0]
      }

      return res.status(200).json({ headers: headers, message: SUCCESS_MESSAGES.SUCCESS});
    }catch (error) {
      console.error('Append Error:', error);
      return res.status(500).json({ message: ERROR_MESSAGES.CALL_API_GOOGLE });
    }
  } catch (err) {
    console.error('Handler Error:', err);
    return res.status(500).json({ message: ERROR_MESSAGES.GET_HEADERS });
  }
}