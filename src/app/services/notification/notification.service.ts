import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastr: ToastrService) {
  }

  info(message: string, title: string = null) {
    this.toastr.info(message, title);
  }

  success(message: string, title: string = null) {
    this.toastr.success(message, title);
  }

  warning(message: string, title: string = null) {
    this.toastr.warning(message, title);
  }

  error(message: string, title: string = null) {
    this.toastr.error(message, title);
  }

  show(message: string, title: string = null) {
    this.toastr.show(message, title);
  }
}
