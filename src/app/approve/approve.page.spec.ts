import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovePage } from './approve.page';

describe('ApprovePage', () => {
  let component: ApprovePage;
  let fixture: ComponentFixture<ApprovePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
