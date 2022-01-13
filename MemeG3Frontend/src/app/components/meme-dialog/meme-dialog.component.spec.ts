import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeDialogComponent } from './meme-dialog.component';

describe('MemeDialogComponent', () => {
  let component: MemeDialogComponent;
  let fixture: ComponentFixture<MemeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
