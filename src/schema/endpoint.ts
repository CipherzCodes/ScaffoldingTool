export const endpointSchema = {
  type: "object",
  properties: {
    name: { type: "string", label: "Endpoint Name", required: true },
    path: { type: "string", label: "Path", required: true },
    method: { type: "string", label: "HTTP Method", required: true },
    description: { type: "string", label: "Description" },

    params: {
      type: "array",
      label: "Parameters",
      item: {
        type: "object",
        properties: {
          name: { type: "string", label: "Param Name" },
          type: { type: "string", label: "Type" },
          required: { type: "boolean", label: "Required" },
          min_length: { type: "number", label: "Min Length" },
          max_length: { type: "number", label: "Max Length" },
        },
      },
    },

    cache: {
      type: "object",
      properties: {
        enabled: { type: "boolean", label: "Cache Enabled" },
      },
    },
  },
};
