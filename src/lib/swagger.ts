import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "DFDS Mock API",
        description: "Swagger API Documentation for Mock API",
        version: "0.1.0",
      },
    },
    apiFolder: "src/app/api",
  });
  return spec;
};
