import { Template } from "@/types/template";
import { pythonMicroserviceSchema } from "@/schema/pythonMicroservice";
// import { dotnetMicroserviceSchema } from "@/schema/dotnetMicroservice";

export const TEMPLATE_REGISTRY: Record<"Python" | "C#", Template[]> = {
  Python: [
    {
      id: "python-microservice",
      name: "Python Microservice",
      description: "Production-grade Python microservice",
      schema: pythonMicroserviceSchema,
    },
  ],

  "C#": [
    // {
    //   id: "dotnet-microservice",
    //   name: "ASP.NET Microservice",
    //   description: "ASP.NET Core REST service",
    //   schema: dotnetMicroserviceSchema,
    // },
  ],
};
