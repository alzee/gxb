import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BonusPage } from './bonus.page';

describe('BonusPage', () => {
  let component: BonusPage;
  let fixture: ComponentFixture<BonusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BonusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
