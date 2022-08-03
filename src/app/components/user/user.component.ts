import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';
import { UploadService } from 'src/app/service/utils/upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  fileName: string = ''
  userForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Image: new FormControl,
    Email: new FormControl('', Validators.required),
    Role: new FormControl('', Validators.required)
  })
  filterForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl,
    Role: new FormControl
  })
  user: User 
  users: Array<User>
  constructor(private userService: UserService, private uploadService: UploadService, private messageService: MessageService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.user = new User('','','','','null.png',false)
    this.fileName = 'null.png'
    this.userService.getAll().subscribe(
      res => {
        this.users = res
      },
      err => {
        console.log(err)
        this.messageService.showError('Failed to load List user')
      }
    )
  }

  onUpdate(id: string) {
    var image = new FormData();
    if (this.userForm.controls['Image'].value != null) {
      image.append('file', this.userForm.controls['Image'].value);
      this.uploadService.uploadImage(image, 'user').subscribe(
        error => {
          console.log(error)
        }
      );
    }

    var username = this.userForm.controls['Username'].value == null ? this.user.username : this.userForm.controls['Username'].value
    var img = this.fileName == 'null.png' ? this.user.image : this.fileName.replace(" ","%20")
    var email = this.userForm.controls['Email'].value == null ? this.user.email : this.userForm.controls['Email'].value
    var role = this.userForm.controls['Role'].value == null ? this.user.role : this.userForm.controls['Role'].value
    var user: User = new User(id, username, this.user.password, email, img, role);

    this.userService.update(user).subscribe(
      data => {
        this.messageService.showSuccess('Update user success.')
        this.clearUserForm()
        this.clearFilterForm()
      },
      error => {
        this.messageService.showError('Update user failed')
        this.clearUserForm()
        this.clearFilterForm()
      }
    )
  }

  onCreate() {
    var image = new FormData();
    if (this.userForm.controls['Image'].value != null) {
      image.append('file', this.userForm.controls['Image'].value);
      this.uploadService.uploadImage(image, 'user').subscribe(
        error => {
          console.log(error)
        }
      );
    }
    
    var username = this.userForm.controls['Username'].value == null ? this.user.username : this.userForm.controls['Username'].value
    var img = this.fileName == 'null.png' ? this.user.image : this.fileName.replace(" ","%20")
    var email = this.userForm.controls['Email'].value == null ? this.user.email : this.userForm.controls['Email'].value
    var role = this.userForm.controls['Role'].value == null ? this.user.role : this.userForm.controls['Role'].value
    var user: User = new User("", username, this.user.password, email, img, role);
    
    this.userService.create(user).subscribe(
      data => {
        this.messageService.showSuccess('Create user success.')
        this.clearUserForm()
        this.clearFilterForm()
      },
      error => {
        this.messageService.showError('Create user failed')
        this.clearUserForm()
        this.clearFilterForm()
        console.log(error);
        
      }
    )
  }

  onDelete(id: string) {
    if (this.cookieService.get('user_Id') === id) {
      this.messageService.showError('Delete user failed. Can not delete yourself')
    } else {
      this.userService.delete(id).subscribe(
        res => {
          this.messageService.showSuccess('Delete user success.')
          this.clearUserForm()
          this.clearFilterForm()
        },
        err => {
          console.log(err);        
          this.messageService.showError('Delete user failed.')
          this.clearUserForm()
          this.clearFilterForm()
        }
      );
    }
  }

  onEdit(id: string) {
    this.userService.find(id).subscribe(
      res => {
        this.user = res
        this.fileName = this.user.image
        this.userForm.patchValue({
          Username: this.user.username,
          Email: this.user.email,
          Role: this.user.role
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onFilter() {
    var username: string = this.filterForm.controls['Username'].value == null ? "" : this.filterForm.controls['Username'].value
    var email: string = this.filterForm.controls['Email'].value == null ? "" : this.filterForm.controls['Email'].value
    var role: string = this.filterForm.controls['Role'].value == null ? "" : this.filterForm.controls['Role'].value
    
    this.userService.filter(username, email, role).subscribe(
      res => {
        this.users = res
        
      },
      err => {
        this.users = new Array
      }
    )
  }

  clearUserForm() {
    this.userForm.reset()
    this.user = new User('','','','','null.png',false)
  }

  clearFilterForm() {
    // this.filterForm.reset()
    // this.userService.getAll().subscribe(
    //   res => {
    //     this.users = res
    //   },
    //   err => {
    //     console.log(err)
    //     this.messageService.showError('Failed to load List user')
    //   }
    // )
    window.location.reload()
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.fileName = file.name;
      this.userForm.patchValue({
        Image: file
      });
    }
  }

}
