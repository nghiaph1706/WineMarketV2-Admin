import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService, private translate: TranslateService) { }

  showSuccess(message: string){
    this.toastr.success(message, this.translate.instant('lblSuccess'))
  }

  showError(message: string){
    this.toastr.error(message, this.translate.instant('lblError'))
  }

  showWarning(message: string){
    this.toastr.warning(message, this.translate.instant('lblWarning'))
  }
}
