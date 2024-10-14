import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { ServerError } from "../../../adapters/api/errors/server.error";

export const encodeJSON = <T>(jsonString: string, defaultValue?: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    const errorToBeThrown = new ServerError(ErrorMessage.JSON_DECODING_ERROR);
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }
    throw errorToBeThrown;
  }
};
