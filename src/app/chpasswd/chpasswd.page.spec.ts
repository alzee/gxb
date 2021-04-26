import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChpasswdPage } from './chpasswd.page';

describe('ChpasswdPage', () => {
  let component: ChpasswdPage;
  let fixture: ComponentFixture<ChpasswdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChpasswdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChpasswdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
