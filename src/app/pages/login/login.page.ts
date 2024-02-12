import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { DirectusService } from 'src/app/services/directus.service';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonText,
  IonFab,
  IonFabButton,
  IonButton,
  LoadingController,
  ToastController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonTitle,
    IonItem,
    IonInput,
    IonIcon,
    IonText,
    IonFab,
    IonFabButton,
    IonButton,
    NgIf,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  ionicForm!: FormGroup;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private directus: DirectusService
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
          Validators.required,
        ],
      ],
    });
  }

  async login() {
    if (this.ionicForm.invalid) return this.presentToast('form is invalid');
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.ionicForm.valid) {
      const user = await this.directus.login(this.ionicForm.value);
      console.log(user,"=================")
      loading.dismiss();
      if (!user) {
        return this.presentToast('invalid user');
      }
      this.router.navigate(['/daily-pulse']);
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'danger',
    });

    await toast.present();
  }
}
