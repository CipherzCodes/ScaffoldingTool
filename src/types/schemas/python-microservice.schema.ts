export const pythonMicroserviceSchema = {
  project: {
    name: { type: "string", required: true },
    type: { type: "string", required: true },
    description: { type: "string", required: true },
    version: { type: "string", required: true },
  },

  web: {
    url_prefix: { type: "string", required: true },
  },

  python: {
    version: { type: "string", required: true },

    packages: {
      type: "list",
      itemType: "string",
    },

    pre_install_commands: {
      type: "list",
      itemType: "string",
    },
  },

  modules: {
    observability: {
      enabled: { type: "boolean" },

      logging: {
        enabled: { type: "boolean" },
        level: { type: "string" },
        provider: { type: "string" },
      },

      tracing: {
        enabled: { type: "boolean" },
        provider: { type: "string" },
      },

      metrics: {
        enabled: { type: "boolean" },
        provider: { type: "string" },
      },
    },

    caching: {
      enabled: { type: "boolean" },
      default_provider: { type: "string" },

      providers: {
        redis: {
          host: { type: "string" },
          port: { type: "number" },
        },
        inmemory: {
          max_size: { type: "number" },
        },
      },
    },
  },

  endpoints: {
    type: "array",
    item: {
      name: { type: "string", required: true },
      path: { type: "string", required: true },
      method: { type: "string", required: true },
      description: { type: "string" },

      params: {
        type: "array",
        item: {
          name: { type: "string" },
          type: { type: "string" },
          required: { type: "boolean" },
          min_length: { type: "number" },
          max_length: { type: "number" },
        },
      },

      cache: {
        enabled: { type: "boolean" },
      },
    },
  },
};
