import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Tailwind } from '@react-email/components';
import { Button } from './Button';

interface DiscountEventProps {
  name: string;
  eventLink: string;
}

const DiscountEvent = ({ name, eventLink }: DiscountEventProps) => (
  <Html>
    <Head />
    <Preview>{name}님을 위한 특별 할인 이벤트!</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-[10px]">
        <Container className="border border-solid border-[#eaeaea] my-[40px] mx-auto p-[20px] w-full max-w-[465px]">
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            ✨ {name}님, 특별한 소식이 있어요! ✨
          </Heading>
          <Text className="text-black text-[14px] leading-[24px]">
            오직 {name}님과 같은 소중한 회원님들을 위해 깜짝 할인 이벤트를 준비했습니다.
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            지금 바로 아래 버튼을 눌러 놀라운 할인 혜택을 확인하고, 원하는 상품을 특별한 가격에 만나보세요. 이 기회는
            오직 한정된 기간 동안만 제공됩니다!
          </Text>
          <Section className="text-center mt-[32px] mb-[32px]">
            <Button href={eventLink}>할인 혜택 확인하기</Button>
          </Section>
          <Text className="text-black text-[14px] leading-[24px]">
            버튼이 작동하지 않으면, 다음 링크를 클릭하세요.
            <br />
            <a href={eventLink} className="text-blue-600">
              {eventLink}
            </a>
          </Text>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] w-full" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            이 정보가 유용하지 않으시다면, 언제든지 수신 거부할 수 있습니다.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default DiscountEvent;
