import type { Span, Tracer } from "@opentelemetry/api";
import { trace } from "@opentelemetry/api";
import { isPromise } from "util/types";

export const makeStartActiveSpan =
  (tracer: Tracer) =>
  <T>(name: string, cb: (span: Span) => T): T =>
    tracer.startActiveSpan(name, (span) => {
      let isAsync = false;
      try {
        const res = cb(span);
        if (isPromise(res)) {
          isAsync = true;
          return res.finally(() => span.end()) as T;
        }

        return res;
      } finally {
        if (!isAsync) span.end();
      }
    });
export const startActiveSpan = makeStartActiveSpan(
  trace.getTracer("graphile-config"),
);

export function isPromiseLike<T>(
  value: T | PromiseLike<T>,
): value is PromiseLike<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as any).then === "function"
  );
}
