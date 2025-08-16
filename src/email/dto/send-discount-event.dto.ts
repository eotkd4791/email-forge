export class SendDiscountEventDto {
  users: Array<{ name: string; email: string }>;
  eventLink: string;
  subject: string;
}
