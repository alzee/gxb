import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangepricePage } from './changeprice.page';

describe('ChangepricePage', () => {
  let component: ChangepricePage;
  let fixture: ComponentFixture<ChangepricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepricePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangepricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
