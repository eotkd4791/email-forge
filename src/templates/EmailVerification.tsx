import { Head, Heading, Hr, Link, Preview, Section, Text } from '@react-email/components';
import { Button } from './components/Button';
import { Layout } from './components/EmailLayout';

interface EmailVerificationProps {
  name: string;
  verificationLink: string;
}

const EmailVerification = ({ name, verificationLink }: EmailVerificationProps) => (
  <Layout head={<Head />} preview={<Preview>이메일을 인증하고 모든 기능을 이용해 보세요</Preview>}>
    <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
      이메일 주소를 인증해주세요
    </Heading>
    <Text className="text-black text-[14px] leading-[24px]">안녕하세요, {name}님!</Text>
    <Text className="text-black text-[14px] leading-[24px]">
      가입을 완료하려면 아래 버튼을 클릭하여 이메일 주소를 인증해주세요. 이 링크는 24시간 동안 유효합니다.
    </Text>
    <Section className="text-center mt-[32px] mb-[32px]">
      <Button href={verificationLink}>이메일 인증하기</Button>
    </Section>
    <Text className="text-black text-[14px] leading-[24px]">
      또는 다음 링크를 클릭하세요.
      <br />
      <Link href={verificationLink} className="text-blue-600">
        {verificationLink}
      </Link>
    </Text>
    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
    <Text className="text-[#666666] text-[12px] leading-[24px]">
      이 이메일은 본인이 요청하지 않은 경우 무시하셔도 됩니다.
    </Text>
  </Layout>
);

export default EmailVerification;
