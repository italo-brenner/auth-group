import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListComponent } from './usergroup-list.component';

describe('UsergroupListComponent', () => {
  let component: UserGroupListComponent;
  let fixture: ComponentFixture<UserGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
