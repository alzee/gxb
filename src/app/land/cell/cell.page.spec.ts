import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CellPage } from './cell.page';

describe('CellPage', () => {
  let component: CellPage;
  let fixture: ComponentFixture<CellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
