import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppliesPage } from './applies.page';

describe('AppliesPage', () => {
  let component: AppliesPage;
  let fixture: ComponentFixture<AppliesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppliesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
