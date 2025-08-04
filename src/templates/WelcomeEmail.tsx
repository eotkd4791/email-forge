import { Html, Body, Container, Heading, Text } from '@react-email/components';

const WelcomeEmail = ({ name }: { name: string }) => (
  <Html>
    <Body>
      <Container>
        <Heading>{name}님, 가입을 환영합니다!</Heading>
        <Text>이메일 서비스에 오신 걸 환영합니다.</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;
