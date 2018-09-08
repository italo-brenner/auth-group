import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupEditComponent } from './usergroup-edit.component';

describe('UsergroupEditComponent', () => {
  let component: UserGroupEditComponent;
  let fixture: ComponentFixture<UserGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
