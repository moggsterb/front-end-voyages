"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ReactSwagger({ spec }: { spec: Record<string, any> }) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
