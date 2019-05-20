import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StashBarComponent } from './stash-bar.component';

describe('StashBarComponent', () => {
  let component: StashBarComponent;
  let fixture: ComponentFixture<StashBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StashBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StashBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
