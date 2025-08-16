import { Head, Heading, Hr, Link, Preview, Section, Text } from '@react-email/components';
import { Button } from './Button';
import { Layout } from './EmailLayout';

interface PrivacyPolicyUpdateProps {
  name: string;
  policyLink: string;
}

const PrivacyPolicyUpdate = ({ name, policyLink }: PrivacyPolicyUpdateProps) => (
  <Layout head={<Head />} preview={<Preview>중요: 개인정보 처리방침 변경 안내</Preview>}>
    <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
      개인정보 처리방침이 변경되었습니다
    </Heading>
    <Text className="text-black text-[14px] leading-[24px]">안녕하세요, {name}님.</Text>
    <Text className="text-black text-[14px] leading-[24px]">
      항상 저희 서비스를 이용해 주셔서 감사합니다. 회원님의 개인정보를 더욱 안전하게 보호하고, 관련 법규를 준수하기 위해
      개인정보 처리방침이 개정되어 안내해 드립니다.
    </Text>
    <Text className="text-black text-[14px] leading-[24px]">
      아래 버튼을 클릭하여 변경된 내용을 자세히 확인해 주시기 바랍니다.
    </Text>
    <Section className="text-center mt-[32px] mb-[32px]">
      <Button href={policyLink}>변경 내용 확인하기</Button>
    </Section>
    <Text className="text-black text-[14px] leading-[24px]">
      버튼이 작동하지 않으면, 다음 링크를 클릭하세요.
      <br />
      <Link href={policyLink} className="text-blue-600">
        {policyLink}
      </Link>
    </Text>
    <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
    <Text className="text-[#666666] text-[12px] leading-[24px]">
      본 안내는 정보통신망법 규정에 따라 수신 동의 여부와 관계없이 발송되었습니다.
    </Text>
  </Layout>
);

export default PrivacyPolicyUpdate;
