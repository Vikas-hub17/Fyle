// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NavbarComponent } from './navbar.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { RouterLink } from '@angular/router'; // Import RouterLink
// import { By } from '@angular/platform-browser';

// describe('NavbarComponent', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, NavbarComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should render the logo', () => {
//     const logo = fixture.debugElement.query(By.css('p.logo'));
//     expect(logo).toBeTruthy();
//   });

//   it('should render the navigation links', () => {
//     const navLinks = fixture.debugElement.queryAll(By.css('a'));
//     expect(navLinks.length).toBeGreaterThan(0);
//   });

//   it('should navigate to HOME page when HOME link is clicked', () => {
//     const homeLink = fixture.debugElement.query(By.css('a.home-link'));
//     expect(homeLink).toBeTruthy();

//     // Access RouterLink directive directly
//     const routerLinkInstance = homeLink.injector.get(RouterLink) as RouterLink;
//     expect(routerLinkInstance).toBeTruthy();
//     expect(routerLinkInstance.routerLink).toEqual('/home');
//   });

//   it('should navigate to ADD WORKOUT page when ADD link is clicked', () => {
//     const addLink = fixture.debugElement.query(By.css('a.add-workout-link'));
//     expect(addLink).toBeTruthy();

//     const routerLinkInstance = addLink.injector.get(RouterLink) as RouterLink;
//     expect(routerLinkInstance).toBeTruthy();
//     expect(routerLinkInstance.routerLink).toEqual('/add-workout');
//   });

//   it('should navigate to EXPLORE page when EXPLORE link is clicked', () => {
//     const exploreLink = fixture.debugElement.query(By.css('a.explore-link'));
//     expect(exploreLink).toBeTruthy();

//     const routerLinkInstance = exploreLink.injector.get(RouterLink) as RouterLink;
//     expect(routerLinkInstance).toBeTruthy();
//     expect(routerLinkInstance.routerLink).toEqual('/explore');
//   });
// });
