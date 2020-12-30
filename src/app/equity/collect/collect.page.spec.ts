import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectPage } from './collect.page';

describe('CollectPage', () => {
  let component: CollectPage;
  let fixture: ComponentFixture<CollectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
