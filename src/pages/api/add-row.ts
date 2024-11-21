// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleSheetsService } from '@/services/googleSheetsService'

type ResponseData = {
  message: string;
};

const ERROR_MESSAGES = {
  MISSING_SPREADSHEET_ID: 'The SPREADSHEET_ID is not defined in the .env.',
  APPEND_ERROR: 'An error occurred while adding the row.',
  APPEND_ERROR_CAR: 'An error occurred while adding the row in car details.',
  ROUTE_NOT_FOUND: 'API route not found',
  HEADERS_ERROR: 'An error occurred while retrieving the headers',
  BAD_REQUEST: 'Request body could not be read properly.'
};

const SUCCESS_MESSAGES = {
  SUCCESS: 'The row was successfully added.',
};

export default async function addRow(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
  try {

    if (req.method !== 'POST') {
      return res.status(404).json({ message: ERROR_MESSAGES.ROUTE_NOT_FOUND });
    }
  
    const promises = [];
  
    const simulationResults = req.body.simulationResults;
    const voitures = req.body.voitures;

    if (!simulationResults || !voitures) {
      return res.status(400).json({ message: ERROR_MESSAGES.BAD_REQUEST });
    }
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      return res.status(400).json({ message: ERROR_MESSAGES.MISSING_SPREADSHEET_ID });
    }

    const service = getGoogleSheetsService()
    const values = [simulationResults];
    const resource = { values };

    promises.push(service.spreadsheets.values.append({
      spreadsheetId,
      valueInputOption: 'USER_ENTERED',
      range: 'A1',
      resource,
    }));

    if (voitures) {
      promises.push(service.spreadsheets.values.append({
        spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        range: "'details-trajet'!A1",
        resource: {
          values: voitures.map(({ label, opinionWayId, distance, reccurrence, period, passengers }) => [
            opinionWayId,
            label,
            distance,
            reccurrence,
            period,
            passengers,
          ])
        },
      }));
    }

    await Promise.all(promises);

    return res.status(200).json({ message: SUCCESS_MESSAGES.SUCCESS });
  } catch (err) {
    console.error('Handler Error:', err);
    return res.status(500).json({ message: ERROR_MESSAGES.APPEND_ERROR });
  }
}
