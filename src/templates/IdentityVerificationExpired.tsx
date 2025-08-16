import { Head, Heading, Hr, Link, Preview, Section, Text } from '@react-email/components';
import { Button } from './Button';
import { Layout } from './EmailLayout';

interface IdentityVerificationExpiredProps {
  name: string;
  verificationLink: string;
}

const IdentityVerificationExpired = ({ name, verificationLink }: IdentityVerificationExpiredProps) => (
  <Layout head={<Head />} preview={<Preview>중요: 신원 인증을 갱신해야 합니다</Preview>}>
    <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
      신원 인증이 만료되었습니다
    </Heading>
    <Text className="text-black text-[14px] leading-[24px]">안녕하세요, {name}님.</Text>
    <Text className="text-black text-[14px] leading-[24px]">
      회원님의 계정 보안을 위해 정기적으로 신원 인증을 갱신해야 합니다. 현재 사용 중인 신원 인증이 만료되어 일부 서비스
      사용이 제한될 수 있습니다.
    </Text>
    <Text className="text-black text-[14px] leading-[24px]">
      아래 버튼을 클릭하여 즉시 인증을 갱신하고 모든 서비스를 정상적으로 이용하세요.
    </Text>
    <Section className="text-center mt-[32px] mb-[32px]">
      <Button href={verificationLink}>신원 인증 갱신하기</Button>
    </Section>
    <Text className="text-black text-[14px] leading-[24px]">
      버튼이 작동하지 않으면, 다음 링크를 클릭하세요.
      <br />
      <Link href={verificationLink} className="text-blue-600">
        {verificationLink}
      </Link>
    </Text>
    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
    <Text className="text-[#666666] text-[12px] leading-[24px]">
      궁금한 점이 있으시면 언제든지 고객센터로 문의해주세요.
    </Text>
  </Layout>
);

export default IdentityVerificationExpired;
