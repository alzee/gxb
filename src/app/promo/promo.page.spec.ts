import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromoPage } from './promo.page';

describe('PromoPage', () => {
  let component: PromoPage;
  let fixture: ComponentFixture<PromoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
