import { AppSharedModule } from './app-shared.module';

describe('AppSharedModule', () => {
  let appSharedModule: AppSharedModule;

  beforeEach(() => {
    appSharedModule = new AppSharedModule();
  });

  it('should create an instance', () => {
    expect(appSharedModule).toBeTruthy();
  });
});
