import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users', () => {
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(['John', 'Jane', 'Doe']);
    });
  });

  it('should add a user and return the updated list', () => {
    service.addUser('Alice').subscribe((users) => {
      expect(users).toContain('Alice');
      expect(users.length).toBe(4);
    });
  });
});
