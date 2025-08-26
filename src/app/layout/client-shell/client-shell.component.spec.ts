import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShellComponent } from './client-shell.component';

describe('ClientShellComponent', () => {
  let component: ClientShellComponent;
  let fixture: ComponentFixture<ClientShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
