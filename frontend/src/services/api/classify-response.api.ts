import type { Schema } from 'yup';
import type { TAwaited } from '../../general.type';
import type { TIncomingFailureFields } from './dto';
import { validateDTO } from './dto';

// this is PER PROJECT TEMPLATE (mostly catch block) and can VARY depending on what server returns
export async function classifyResponse<
  TSchemaSuccess extends Schema,
  TSchemaFailure extends Schema,
  TIncomingFailureFieldsLocal extends TIncomingFailureFields,
  TReturn extends
    | {
        success: TAwaited<TSchemaSuccess['__outputType']>;
        failure?: undefined;
      }
    | {
        success?: undefined;
        failure: TAwaited<TSchemaFailure['__outputType']>;
      }
    | {
        success?: undefined;
        failure: TIncomingFailureFieldsLocal;
      },
>({
  response,
  expectedSuccessDTO,
  expectedFailureDTO,
}: {
  response: Response;
  expectedSuccessDTO: TSchemaSuccess;
  expectedFailureDTO: TSchemaFailure;
}): Promise<TReturn> {
  let parsedResponse: Record<string, unknown> | string;
  try {
    parsedResponse = (await response.clone().json()) as Record<string, unknown>;
  } catch {
    parsedResponse = await response.clone().text();
  }

  // handle expected success and failure
  try {
    if (response.status > 100 && response.status < 400) {
      return {
        success: await validateDTO({
          schema: expectedSuccessDTO,
          value: parsedResponse,
        }),
      } as TReturn;
    }

    return {
      failure: await validateDTO({
        schema: expectedFailureDTO,
        value: parsedResponse,
      }),
    } as TReturn;
  } catch {
    // handle unexpected and general responses (which didn't pass validation)
    switch (response.status) {
      case 429: {
        return {
          failure: { type: 4000, title: 'Rate limit error', detail: 'Too many requests' },
        } as TReturn;
      }
      default: {
        return {
          failure: { type: 5000, title: 'Unexpected response', detail: 'Internal error' },
        } as TReturn;
      }
    }
  }
}
