import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetSetUsingSignals } from './get-set-using-signals';

describe('GetSetUsingSignals', () => {
  let component: GetSetUsingSignals;
  let fixture: ComponentFixture<GetSetUsingSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSetUsingSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(GetSetUsingSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
