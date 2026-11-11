import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterAppSignals } from './counter-app-signals';

describe('CounterAppSignals', () => {
  let component: CounterAppSignals;
  let fixture: ComponentFixture<CounterAppSignals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterAppSignals],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterAppSignals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
