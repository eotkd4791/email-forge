export type MailSenderParams = {
  to: string;
  subject: string;
  html: string;
  sender: string;
};

export interface MailSender {
  sendEmail(params: MailSenderParams): Promise<any>;
}
