import { trace } from "@opentelemetry/api";
import { makeStartActiveSpan } from "graphile-config";

export const startActiveSpan = makeStartActiveSpan(trace.getTracer("grafserv"));
