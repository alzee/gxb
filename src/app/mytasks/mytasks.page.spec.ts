import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MytasksPage } from './mytasks.page';

describe('MytasksPage', () => {
  let component: MytasksPage;
  let fixture: ComponentFixture<MytasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MytasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
