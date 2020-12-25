import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquityPage } from './equity.page';

describe('EquityPage', () => {
  let component: EquityPage;
  let fixture: ComponentFixture<EquityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
