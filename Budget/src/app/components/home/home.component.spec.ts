import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockBudgetService: any;

  beforeEach(async(() => {
    mockBudgetService = jasmine.createSpyObj('BudgetService', ['getCurrentMonthStanding']);

    TestBed.overrideTemplate(
      HomeComponent,
      "<html>HTML for the component requires all dependent components to be loaded. Differ this to Feature test.</html>");

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: BudgetService, use: mockBudgetService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
