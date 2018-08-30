import { PlanesModule } from './planes.module';

describe('PlanesModule', () => {
  let planesModule: PlanesModule;

  beforeEach(() => {
    planesModule = new PlanesModule();
  });

  it('should create an instance', () => {
    expect(planesModule).toBeTruthy();
  });
});
