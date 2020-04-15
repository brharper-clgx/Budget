import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile.component';
import { BudgetService } from 'src/app/services/budget.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockBudgetService: any;

  beforeEach(async(() => {
    mockBudgetService = jasmine.createSpyObj('BudgetService', ['getProfile']);

    TestBed.overrideTemplate(
      ProfileComponent,
      "<html>HTML for the component requires all dependent components to be loaded. Differ this to Feature test.</html>");

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: BudgetService, use: mockBudgetService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
