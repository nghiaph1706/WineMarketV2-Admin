import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/entity/brand.entity';
import { Category } from 'src/app/entity/category.entity';
import { Product } from 'src/app/entity/product.entity';
import { BrandService } from 'src/app/service/brand/brand.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { ProductService } from 'src/app/service/product/product.service';
import { MessageService } from 'src/app/service/utils/message.service';
import { UploadService } from 'src/app/service/utils/upload.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  fileName: string = '';
  page: number = 0
  productForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    Image: new FormControl(),
    Brand: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required)
  })
  filterForm: FormGroup = new FormGroup({
    name_like: new FormControl(),
    sort: new FormControl(),
    order: new FormControl(),
    brandId: new FormControl(),
    categoryId: new FormControl()
  })
  brands: Array<Brand> = new Array<Brand>()
  categories: Array<Category> = new Array()
  products: Array<any>
  prod: Product = new Product()
  constructor(private brandService: BrandService, private categoryService: CategoryService, private productService: ProductService, private uploadService: UploadService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.prod.image = 'null.png'
    this.fileName = 'null.png'
    this.productService.getProductsLimit(5).subscribe(
      res => {
        this.products = res
        this.categoryService.getAll().subscribe(
          res => {
            this.categories = res
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
        console.log(err)
        this.messageService.showError('Failed to load List product')
      }
    )
  }

  onUpdate(id: string) {
    var image = new FormData();
    if (this.productForm.controls['Image'].value != null) {
      image.append('file', this.productForm.controls['Image'].value);
      this.uploadService.uploadImage(image, 'product').subscribe(
        error => {
          console.log(error)
        }
      );
    }

    var product = new Product
    product.id = id
    product.name = this.productForm.controls['Name'].value == null ? this.prod.name : this.productForm.controls['Name'].value
    product.image = this.fileName == 'null.png' ? this.prod.image : this.fileName.replace(" ","%20")
    product.price = this.productForm.controls['Price'].value == null ? this.prod.price : this.productForm.controls['Price'].value
    product.brandId = this.productForm.controls['Brand'].value == null ? this.prod.brandId : this.productForm.controls['Brand'].value
    product.categoryId = this.productForm.controls['Category'].value == null ? this.prod.categoryId : this.productForm.controls['Category'].value

    this.productService.update(product).subscribe(
      data => {
        this.messageService.showSuccess('Update product success.')
        this.clearProductForm()
        this.clearFilterForm()
      },
      error => {
        this.messageService.showError('Update product failed')
        this.clearProductForm()
        this.clearFilterForm()
      }
    )
  }

  onCreate() {
    var image = new FormData();
    if (this.productForm.controls['Image'].value != null) {
      image.append('file', this.productForm.controls['Image'].value);
      this.uploadService.uploadImage(image, 'product').subscribe(
        error => {
          console.log(error)
        }
      );
    }
    
    var product = new Product
    product.id = ""
    product.name = this.productForm.controls['Name'].value
    product.image = this.fileName.replace(" ","%20")
    product.price = this.productForm.controls['Price'].value
    product.brandId = this.productForm.controls['Brand'].value
    product.categoryId = this.productForm.controls['Category'].value
    console.log(product);

    this.productService.create(product).subscribe(
      data => {
        this.messageService.showSuccess('Create product success.')
        this.clearProductForm()
        this.clearFilterForm()
      },
      error => {
        this.messageService.showError('Create product failed')
        this.clearProductForm()
        this.clearFilterForm()
      }
    )
  }

  onDelete(id: string) {
    this.productService.delete(id).subscribe(
      res => {
        this.messageService.showSuccess('Delete product success.')
        this.clearProductForm()
        this.clearFilterForm()
      },
      err => {
        console.log(err);        
        this.messageService.showSuccess('Delete product failed.')
        this.clearProductForm()
        this.clearFilterForm()
      }
    );
  }

  onEdit(id: string) {
    this.productService.find(id).subscribe(
      res => {
        this.prod = res
        this.fileName = this.prod.image
        this.loadBrandByCategory(this.prod.categoryId)
        this.productForm.patchValue({
          Name: this.prod.name,
          Category: this.prod.categoryId,
          Brand: this.prod.brandId,
          Price: this.prod.price
      })
      },
      err => {
        console.log(err);
      }
    )
  }

  onFilter() {
    var sort: string = this.filterForm.controls['sort'].value == null ? "name" : this.filterForm.controls['sort'].value
    var order: string = this.filterForm.controls['order'].value == null ? "asc" : this.filterForm.controls['order'].value
    var name_like: string = this.filterForm.controls['name_like'].value == null ? "" : this.filterForm.controls['name_like'].value
    var categoryId: string = this.filterForm.controls['categoryId'].value == null ? "" : this.filterForm.controls['categoryId'].value
    var brandId: string = this.filterForm.controls['brandId'].value == null ? "" : this.filterForm.controls['brandId'].value
    this.productService.getProductsLimit(100, 0, sort, order, name_like, categoryId, brandId).subscribe(
      res => {
        this.products = res
      },
      err => {
        this.products = new Array
      }
    )
  }

  clearProductForm() {
    this.productForm.reset()
    this.prod = new Product()
    this.prod.image = 'null.png'
  }

  clearFilterForm() {
    this.filterForm.reset()
    this.productService.getProductsLimit(7).subscribe(
      res => {
        this.products = res
      },
      err => {
        this.products = new Array
      }
    )
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.fileName = file.name;
      this.productForm.patchValue({
        Image: file
      });
    }
  }

  loadBrandByCategory(id: string){
    this.brandService.getByCategory(id).subscribe(
      res => {
        this.brands = res;
      },
      err => {
        console.log(err);
      })
  }

  showProductNext(page: number){
    this.page++
    this.productService.getProductsLimit(7, page).subscribe(
      res => {
        this.products = res
      },
      err => {
        this.products = new Array
      }
    )
  }

  showProductPrev(page: number){
    this.page--
    this.productService.getProductsLimit(7, page < 0 ? 0 : page).subscribe(
      res => {
        this.products = res
      },
      err => {
        this.products = new Array
      }
    )
  }

}
