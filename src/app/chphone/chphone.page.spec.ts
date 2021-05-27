import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChphonePage } from './chphone.page';

describe('ChphonePage', () => {
  let component: ChphonePage;
  let fixture: ComponentFixture<ChphonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChphonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChphonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
