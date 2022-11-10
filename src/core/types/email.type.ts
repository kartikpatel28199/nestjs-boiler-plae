export type EmailData = {
  to: string[];
  subject?: string;
  extras: Record<string, any>;
  templateId: string;
};
