import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteChampionsComponent } from './favourite-champions.component';

describe('FavouriteChampionsComponent', () => {
  let component: FavouriteChampionsComponent;
  let fixture: ComponentFixture<FavouriteChampionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteChampionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteChampionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
