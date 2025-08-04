import { Test, TestingModule } from '@nestjs/testing';
import { SESService } from './ses.service';

describe('SESService', () => {
  let service: SESService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SESService],
    }).compile();

    service = module.get<SESService>(SESService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
