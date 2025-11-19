import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarToggle } from './sidebar-toggle';

describe('SidebarToggle', () => {
  let component: SidebarToggle;
  let fixture: ComponentFixture<SidebarToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
