import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddWorkoutComponent } from './add-workout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [AddWorkoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    localStorage.setItem('userData', JSON.stringify([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]));

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('userData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize workoutForm with default values', () => {
    const form = component.workoutForm;
    expect(form.controls['name'].value).toBe('');
    expect(form.controls['duration'].value).toBe('');
    expect(form.controls['type'].value).toBe('Gym');
  });

  it('should check form validity', () => {
    const form = component.workoutForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('John Doe');
    form.controls['duration'].setValue('60');
    form.controls['type'].setValue('Gym');
    expect(form.valid).toBeTruthy();
  });

  it('should add a workout and save to localStorage', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('Jane Smith');
    form.controls['duration'].setValue('45');
    form.controls['type'].setValue('Cycling');

    component.onSubmit();

    const updatedUserData = JSON.parse(localStorage.getItem('userData')!);
    const user = updatedUserData.find((u: any) => u.name === 'Jane Smith');

    expect(user).toBeTruthy();
    expect(user.workouts.length).toBe(2);
    expect(user.workouts[1]).toEqual({ type: 'Cycling', minutes: 45 });
    expect(router.navigate).toHaveBeenCalledWith(['/explore']);
  });

  it('should create a new user if user does not exist', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('New User');
    form.controls['duration'].setValue('30');
    form.controls['type'].setValue('Yoga');

    component.onSubmit();

    const updatedUserData = JSON.parse(localStorage.getItem('userData')!);
    const user = updatedUserData.find((u: any) => u.name === 'New User');

    expect(user).toBeTruthy();
    expect(user.workouts.length).toBe(1);
    expect(user.workouts[0]).toEqual({ type: 'Yoga', minutes: 30 });
    expect(router.navigate).toHaveBeenCalledWith(['/explore']);
  });

  it('should not submit the form if invalid', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('');
    form.controls['duration'].setValue('');
    form.controls['type'].setValue('');

    component.onSubmit();

    expect(localStorage.getItem('userData')).toBeTruthy();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not create a workout if duration is invalid (non-numeric)', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('John Doe');
    form.controls['duration'].setValue('invalid');
    form.controls['type'].setValue('Running');

    component.onSubmit();

    const updatedUserData = JSON.parse(localStorage.getItem('userData')!);
    const user = updatedUserData.find((u: any) => u.name === 'John Doe');

    expect(user?.workouts.length).toBe(1); // No new workout should be added
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not create a workout if name is missing', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('');
    form.controls['duration'].setValue('30');
    form.controls['type'].setValue('Yoga');

    component.onSubmit();

    const updatedUserData = JSON.parse(localStorage.getItem('userData')!);
    const user = updatedUserData.find((u: any) => u.name === '');

    expect(user).toBeUndefined(); // No user should be created
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should prevent duplicate workouts for an existing user', () => {
    spyOn(router, 'navigate');
    const form = component.workoutForm;

    form.controls['name'].setValue('Jane Smith');
    form.controls['duration'].setValue('30');
    form.controls['type'].setValue('Running');

    component.onSubmit();

    const updatedUserData = JSON.parse(localStorage.getItem('userData')!);
    const user = updatedUserData.find((u: any) => u.name === 'Jane Smith');

    // Since the workout already exists, it shouldn't be duplicated
    expect(user?.workouts.length).toBe(1); // Only 1 workout should be present
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
