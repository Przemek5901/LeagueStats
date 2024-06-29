import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMatchResultComponent } from './player-match-result.component';

describe('PlayerMatchResultComponent', () => {
  let component: PlayerMatchResultComponent;
  let fixture: ComponentFixture<PlayerMatchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerMatchResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerMatchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
