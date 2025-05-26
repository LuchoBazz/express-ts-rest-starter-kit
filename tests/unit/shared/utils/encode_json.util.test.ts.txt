import { ErrorMessage } from "../../../../src/adapters/api/errors/errors.enum";
import { ServerError } from "../../../../src/adapters/api/errors/server.error";
import { encodeJSON } from "../../../../src/core/shared/utils/encode_json.util";

describe.each([
  {
    description: "should parse valid JSON string",
    jsonString: '{"key": "value"}',
    defaultValue: undefined,
    expected: { key: "value" },
  },
  {
    description: "should return default value when given invalid JSON and defaultValue is provided",
    jsonString: "invalid json",
    defaultValue: { defaultKey: "defaultValue" },
    expected: { defaultKey: "defaultValue" },
  },
  {
    description: "should return empty object when given an empty string and defaultValue is provided",
    jsonString: "",
    defaultValue: {},
    expected: {},
  },
  {
    description: "should parse valid JSON number",
    jsonString: "123",
    defaultValue: undefined,
    expected: 123,
  },
  {
    description: "should return default value when parsing an empty string",
    jsonString: "",
    defaultValue: { fallback: "value" },
    expected: { fallback: "value" },
  },
])(
  "encodeJSON tests",
  ({
    description,
    jsonString,
    defaultValue,
    expected,
  }: {
    description: string;
    jsonString: string;
    defaultValue: any;
    expected: any;
  }) => {
    it(description, () => {
      const result = encodeJSON(jsonString, defaultValue);
      console.log(JSON.stringify({ result, expected }, undefined, 2));
      expect(result).toEqual(expected);
    });
  },
);

describe.each([
  {
    description: "should throw an error when invalid JSON is provided and no default value",
    jsonString: '{"name": "John", "age": 30',
    expectedError: ErrorMessage.JSON_DECODING_ERROR,
  },
  {
    description: "should throw an error when JSON is not parsable",
    jsonString: "Invalid JSON String",
    expectedError: ErrorMessage.JSON_DECODING_ERROR,
  },
  {
    description: "should throw an error when JSON contains unexpected tokens",
    jsonString: '{"name": "John", "age": "30" invalid}',
    expectedError: ErrorMessage.JSON_DECODING_ERROR,
  },
])("encodeJSON error tests", ({ description, jsonString, expectedError }) => {
  it(description, () => {
    expect(() => {
      encodeJSON(jsonString);
    }).toThrow(ServerError);

    expect(() => {
      encodeJSON(jsonString);
    }).toThrow(expectedError);
  });
});
