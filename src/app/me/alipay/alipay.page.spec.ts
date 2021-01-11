import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlipayPage } from './alipay.page';

describe('AlipayPage', () => {
  let component: AlipayPage;
  let fixture: ComponentFixture<AlipayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlipayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlipayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
