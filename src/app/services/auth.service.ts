import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    
  }
  
  // Inicio de sesion
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( res => {
      localStorage.setItem('token', 'true');
      

      if(res.user?.emailVerified == true){
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['/verify-email']);
      }

    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // Registro de usuarios
  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registro completado');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // Cerrar sesion
  logout(){
    this.fireauth.signOut().then( ()=> {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // Restablecer contraseña
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert("Algo salio mal");
    })
  }

  // Verificar correo electronico
  sendEmailForVerification(user: any) {
    user.sendEmailForVerification.then( (res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert("Algo salio mal, no se pudo enviar el enalce a su correo.");
    })
  }

  // Iniciar sesion con Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message)
    })
  }

}
