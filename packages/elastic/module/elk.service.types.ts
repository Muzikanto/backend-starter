export type IElkItem<T extends Record<string, unknown>> = { id: string; score: number; source: T };

export type IElkInsertItem<T extends Record<string, unknown>> = { id: string; source: T };
