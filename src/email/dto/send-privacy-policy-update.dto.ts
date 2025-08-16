export class SendPrivacyPolicyUpdateDto {
  users: Array<{ name: string; email: string }>;
  policyLink: string;
  subject: string;
}
