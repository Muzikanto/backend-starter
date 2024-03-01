export type ILead<TDate = Date> = {
  id: string;

  name: string;
  email: string;
  message: string;

  createdAt: TDate;
};
