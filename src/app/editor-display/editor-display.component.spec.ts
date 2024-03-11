import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDisplayComponent } from './editor-display.component';

describe('EditeurComponent', () => {
  let component: EditorDisplayComponent;
  let fixture: ComponentFixture<EditorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
