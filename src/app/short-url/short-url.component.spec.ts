import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortUrlComponent } from './short-url.component';

describe('ShortUrlComponent', () => {
  let component: ShortUrlComponent;
  let fixture: ComponentFixture<ShortUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
