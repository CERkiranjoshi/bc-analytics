import {Component, OnInit, ViewChild , ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;
  loading = false
  err = true;
  currentDate = new Date();

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    //https://stackoverflow.com/questions/34489916/load-external-js-script-dynamically-in-angular-2
  }

  signinUser(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    if (username=='bcindia' && password == 'bcindia') {
      this.err = false;
    } else {
      this.err = true;
    }
  }

}
