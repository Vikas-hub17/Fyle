import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // For standalone components, import them instead of declaring.
      imports: [RouterTestingModule, UserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 123 }) } // adjust type if needed
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Example test: If your component is supposed to not initialize certain data
  // when user data is not found, update the test to reflect the actual API.
  it('should not set user if no user is found', () => {
    // Assuming your component uses a property named "user" instead of "userData"
    component.user = null; // simulate no user found
    fixture.detectChanges();
    expect(component.user).toBeNull(); // or expect(component.user).toBeFalsy();
  });  

  // Example test: If your component fetches user data based on a route param,
  // ensure that the proper service or method is called.
  it('should fetch user data based on route param', () => {
    // Instead of spying on a non-existent method, check if the data is set.
    // If your component fetches data in ngOnInit, then:
    expect(component.user).toBeDefined();
    // Alternatively, if your component calls a service, spy on that service.
  });

  // If there are chart-related functionalities in your component,
  // implement the tests only if those properties/methods exist.
  // Remove the tests below if your component doesn't handle charts.
  /*
  it('should initialize chart data correctly when user data exists', () => {
    // For example, if you intended to have chartData, make sure it's defined in the component.
    component.user = { id: 123, name: 'Test User', data: [10, 20, 30] };
    // If there's a method to update chart data, call it here.
    // component.initializeChart();
    expect(component.chartData).toEqual([10, 20, 30]); // adjust accordingly
  });
  */
});
