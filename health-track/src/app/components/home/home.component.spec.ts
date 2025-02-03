import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the standalone component instead of declaring it
      imports: [RouterTestingModule, HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template correctly', () => {
    const compiled = fixture.nativeElement;
    // Adjust the selector as per your template, e.g. an <h1> element or any unique element
    expect(compiled.querySelector('h1')).toBeTruthy();
  });

  it('should contain a router link', () => {
    const linkDebugElement = fixture.debugElement.query(By.directive(RouterLink));
    expect(linkDebugElement).toBeTruthy();
  });
});
