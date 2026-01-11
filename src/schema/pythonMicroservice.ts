import { SchemaNode } from "./types";
import { endpointSchema } from "./endpoint";

export const pythonMicroserviceSchema: SchemaNode = {
  type: "object",
  properties: {
    project: {
      type: "object",
      properties: {
        name: { type: "string", label: "Project Name", required: true },
        type: { type: "string", label: "Project Type", required: true },
        description: { type: "string", label: "Description" },
        version: { type: "string", label: "Version" },
      },
    },

    web: {
      type: "object",
      properties: {
        url_prefix: { type: "string", label: "URL Prefix" },
      },
    },

    python: {
      type: "object",
      properties: {
        version: { type: "string", label: "Python Version" },

        packages: {
          type: "list",
          label: "Python Packages",
          itemType: "string",
        },

        pre_install_commands: {
          type: "list",
          label: "Pre-install Commands",
          itemType: "string",
        },
      },
    },

    modules: {
      type: "object",
      properties: {
        observability: {
          type: "object",
          properties: {
            enabled: { type: "boolean", label: "Enabled" },
          },
        },
      },
    },

    endpoints: {
      type: "array",
      label: "API Endpoints",
      item: endpointSchema,
    },
  },
};
