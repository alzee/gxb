import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickyPage } from './sticky.page';

describe('StickyPage', () => {
  let component: StickyPage;
  let fixture: ComponentFixture<StickyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
