import { CarsModule } from './cars.module';

describe('CarsModule', () => {
  let carsModule: CarsModule;

  beforeEach(() => {
    carsModule = new CarsModule();
  });

  it('should create an instance', () => {
    expect(carsModule).toBeTruthy();
  });
});
