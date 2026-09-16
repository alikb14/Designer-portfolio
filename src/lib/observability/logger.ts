type LogContext = Record<string, unknown>;
type LogLevel = "error" | "info" | "warn";

const sensitiveKey = /(authorization|cookie|secret|token|password|signature)/i;

function redact(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redact);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        sensitiveKey.test(key) ? "[redacted]" : redact(nestedValue),
      ]),
    );
  }

  return value;
}

export function log(level: LogLevel, event: string, context: LogContext = {}) {
  const entry = JSON.stringify({
    context: redact(context),
    event,
    level,
    timestamp: new Date().toISOString(),
  });

  console[level](entry);
}
