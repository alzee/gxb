import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OccupyPage } from './occupy.page';

describe('OccupyPage', () => {
  let component: OccupyPage;
  let fixture: ComponentFixture<OccupyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OccupyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
