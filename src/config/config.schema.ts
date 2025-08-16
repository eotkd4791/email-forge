import { z } from 'zod';

export const configSchema = z
  .object({
    PORT: z.coerce.number().default(3000),
    EMAIL_PROVIDER: z.enum(['AWS_SES', 'RESEND', 'SENDGRID']),
    SENDER_EMAIL: z.email(),
    AWS_REGION: z.string().optional(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    SENDGRID_API_KEY: z.string().optional(),
  })
  .refine(
    data => {
      if (data.EMAIL_PROVIDER === 'AWS_SES') {
        return !!data.AWS_REGION && !!data.AWS_ACCESS_KEY_ID && !!data.AWS_SECRET_ACCESS_KEY;
      }
      return true;
    },
    {
      message: '이메일 프로바이더가 SES일 경우, AWS 관련 키와 region이 없습니다.',
      path: ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'],
    },
  )
  .refine(
    data => {
      if (data.EMAIL_PROVIDER === 'RESEND') {
        return !!data.RESEND_API_KEY;
      }
      return true;
    },
    { message: 'Resend API 키가 없습니다.', path: ['RESEND_API_KEY'] },
  )
  .refine(
    data => {
      if (data.EMAIL_PROVIDER === 'SENDGRID') {
        return !!data.SENDGRID_API_KEY;
      }
      return true;
    },
    { message: 'SendGrid API 키가 없습니다.', path: ['SENDGRID_API_KEY'] },
  );

export type Config = z.infer<typeof configSchema>;
