import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
  workoutType?: string;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent implements OnInit {
  userData: UserData[] = [];

  filterForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('All'),
  });

  generatedUsersHTML: string = '';

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 2;

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      // Store default users if no data is found
      localStorage.setItem('userData', JSON.stringify(this.userData));
    }
    this.generateUsersHTML();
  }

  // ✅ Load users from localStorage or initialize default users
  loadUsersFromLocalStorage() {
    const storedUsers = localStorage.getItem('userData');

    if (storedUsers && JSON.parse(storedUsers).length > 0) {
      this.userData = JSON.parse(storedUsers);
    } else {
      // Initialize default users if no data exists
      this.userData = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    console.log('Loaded userData:', this.userData); // ✅ Debug log
  }

  // ✅ Generate dynamic user rows
  generateUsersHTML() {
    this.generatedUsersHTML = this.paginatedData
      .map(
        (user) => `
        <tr class="border border-gray-800 p-3">
            <td class="p-3 text-center">
                <a href="/${user.name}" class="underline">${user.name}</a>
            </td>
            <td class="p-3 text-center">${this.getWorkoutTypes(user.workouts)}</td>
            <td class="p-3 text-center">${user.workouts.length}</td>
            <td class="p-3 text-center">${this.getTotalMinutes(user.workouts)}</td>
        </tr>`
      )
      .join('');
  }

  // ✅ Get workout types as a string
  getWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((w) => w.type).join(', ');
  }

  // ✅ Get total workout minutes
  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, w) => total + w.minutes, 0);
  }

  // ✅ Filter user data based on search & workout type
  filteredUserData(): UserData[] {
    const formValue = this.filterForm.value;

    return this.userData.filter((user) => {
      if (formValue.name && !user.name.toLowerCase().includes(formValue.name.toLowerCase())) {
        return false;
      }
      if (formValue.type === 'All') {
        return true;
      }
      return user.workouts.some(workout => workout.type === formValue.type);
    });
  }

  // ✅ Pagination logic
  get paginatedData() {
    const filteredData = this.filteredUserData();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredUserData().length / this.itemsPerPage);
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.generateUsersHTML();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.generateUsersHTML();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.generateUsersHTML();
    }
  }

  changeItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.currentPage = 1;
    this.generateUsersHTML();
  }
}
