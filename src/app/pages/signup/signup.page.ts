import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonHeader,
  IonToolbar,
  IonCol,
  IonTitle,
  IonItem,
  IonInput,
  IonIcon,
  IonText,
  IonFab,
  IonFabButton,
  IonButton,
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
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
    RouterLink,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SignupPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.signUP()
    this.ionicForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          // Validators.min(10)
        ],
      ],
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
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
          Validators.required,
        ],
      ],
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  async signUpWithGoogle() {
    console.log('signUpWithGoogle');
  }

  async signUP() {
    if (this.ionicForm.invalid) return this.presentToast('form is invalid');
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.ionicForm.valid) {
      const user: any = await this.authService
        .registerUser(this.ionicForm.value)
        .catch((err: any) => {
          this.presentToast(err);
          console.log(err);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(['/login']);
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }
  signUpUsingPhonenumber(contact: string) {
    this.authService.signInWithPhoneNumber(contact);
  }
  async presentToast(message: string) {
    console.log(message);

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
