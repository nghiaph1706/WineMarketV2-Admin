import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cart } from 'src/app/entity/cart.entity';
import { CartService } from 'src/app/service/cart/cart.service';
import { CartDetailsService } from 'src/app/service/cartDetails/cart-details.service';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  username = ''
  cart = new Cart
  carts = new Array
  cartDList = new Array
  filterForm: FormGroup = new FormGroup({
    Date: new FormControl,
    Username: new FormControl,
    Status: new FormControl
  })
  constructor(private cartService: CartService, private userService: UserService, private messageService: MessageService, private cartDService: CartDetailsService) { }

  ngOnInit(): void {
    this.cartService.getAll().subscribe(
      res => {
        this.carts = res
      },
      err => {
        console.log(err);
      }
    )
  }

  onView(id: string) {
    this.cartDService.findByCartId(id).subscribe(
      res => {
        this.cartDList = res
      }
    )
    this.cartService.find(id).subscribe(
      res => {
        this.cart = res
        this.userService.find(this.cart.userId).subscribe(
          res => {
            var user = res
            this.username = user.username
          }
        )
      }
    )
  }

  updateStatus(id: string, status: string) {
    var cart = new Cart
    this.cartService.find(id).subscribe(
      res => {
        cart = res
        cart.status = status
        this.cartService.update(cart).subscribe(
          res => {
            this.messageService.showSuccess('Update status: ' + status)
            this.cartService.getAll().subscribe(
              res => {
                this.carts = res
              },
              err => {
                console.log(err);
              }
            )
          }
        )
      }
    )

    
    this.username = ''
    this.cart = new Cart
    this.cartDList = new Array
  }

  onDelete(id: string) {
    this.cartService.delete(id).subscribe(
      res => {
        this.messageService.showSuccess('Delete cart success.')
      }
    )
    this.cartService.getAll().subscribe(
      res => {
        this.carts = res
      },
      err => {
        console.log(err);
      }
    )
    this.username = ''
    this.cart = new Cart
    this.cartDList = new Array
  }

  onFilter() {
    var date: string = this.filterForm.controls['Date'].value == null ? "" : this.filterForm.controls['Date'].value
    var username: string = this.filterForm.controls['Username'].value == null ? "" : this.filterForm.controls['Username'].value
    var status: string = this.filterForm.controls['Status'].value == null ? "" : this.filterForm.controls['Status'].value
    
    this.cartService.filter(date, username, status).subscribe(
      res => {
        this.carts = res
      }
    )
  }

  clearFilterForm() {
    this.filterForm.reset()
    this.cartService.getAll().subscribe(
      res => {
        this.carts = res
      },
      err => {
        console.log(err)
        this.messageService.showError('Failed to load List user')
      }
    )
  }

}
