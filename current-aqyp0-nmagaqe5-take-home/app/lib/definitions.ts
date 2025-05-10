export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Pay = {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
};

export type Activity = {
  month: string;
  activity: number;
};

export type LatestPay = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestPayRaw = Omit<LatestPay, 'amount'> & {
  amount: number;
};

export type PaysTable = {
  id: string;
  contact_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ContactsTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_pays: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedContactsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_pays: number;
  total_pending: string;
  total_paid: string;
};

export type ContactField = {
  id: string;
  name: string;
};

export type PayForm = {
  id?: string;

  senderId: string;
  receiverId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
};

