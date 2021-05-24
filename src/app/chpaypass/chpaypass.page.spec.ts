import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChpaypassPage } from './chpaypass.page';

describe('ChpaypassPage', () => {
  let component: ChpaypassPage;
  let fixture: ComponentFixture<ChpaypassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChpaypassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChpaypassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
