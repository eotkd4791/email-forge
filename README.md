# Email Forge

## 📝 설명

**Email Forge**는 다양한 이메일 제공자(AWS SES, Resend, SendGrid)를 지원하는 확장 가능한 고성능 이메일 전송 서비스입니다. [NestJS](https://nestjs.com/) 프레임워크를 기반으로 구축되었으며, [React Email](https://react.email/)을 사용하여 동적이고 아름다운 이메일 템플릿을 생성합니다.

이 프로젝트는 비동기 처리를 위해 BullMQ를 사용한 메시지 큐를 도입하여 대량의 이메일 요청도 안정적으로 처리할 수 있습니다. 또한, Prometheus와 Grafana를 통해 실시간으로 애플리케이션의 상태와 성능을 모니터링할 수 있는 대시보드를 제공합니다.

## ✨ 주요 기능

- **멀티 이메일 프로바이더 지원**: AWS SES, Resend, SendGrid 등 여러 이메일 서비스 제공자를 손쉽게 전환하며 사용할 수 있습니다.
- **동적 이메일 템플릿**: React와 Tailwind CSS를 사용하여 유지보수가 용이하고 재사용 가능한 이메일 템플릿을 작성합니다.
- **비동기 이메일 처리**: Redis 기반의 메시지 큐(BullMQ)를 통해 이메일 전송 작업을 비동기적으로 처리하여 API 응답 시간을 단축하고 안정성을 높입니다.
- **강력한 모니터링**: Prometheus를 통해 애플리케이션 메트릭을 수집하고, Grafana 대시보드를 통해 시각적으로 모니터링합니다.
- **유연한 설정**: `config.schema.ts`를 통해 환경 변수를 관리하고 유효성을 검사하여 설정을 중앙에서 관리합니다.
- **컨테이너 기반 환경**: Docker Compose를 사용하여 개발 및 프로덕션 환경을 손쉽게 구성하고 실행할 수 있습니다.

## 🚀 시작하기

### 사전 요구 사항

- [Node.js](https://nodejs.org/en/) (v22+)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) 및 [Docker Compose](https://docs.docker.com/compose/)

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/email-forge.git
cd email-forge
```

### 2. 의존성 설치

```bash
pnpm install
```

### 이메일 전송 API
