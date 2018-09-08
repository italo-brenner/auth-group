import { UserGroupsModule } from './usergroups.module';

describe('UsergroupsModule', () => {
  let usergroupsModule: UserGroupsModule;

  beforeEach(() => {
    usergroupsModule = new UserGroupsModule();
  });

  it('should create an instance', () => {
    expect(usergroupsModule).toBeTruthy();
  });
});
