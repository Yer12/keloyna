<template>
  <div>
    <Header />
    <div class="container">
      <div class="login_form">
        <h1 class="login_title">Логин</h1>
        <form action="" onsubmit="return false">
          <input name="phone"
                 id="phone"
                 v-model="phone"
                 placeholder="Phone number"
                 type="text"
                 class="email"
          >
          <input type="password" placeholder="Пароль" class="password">
          <span class="forget_password">Забыли пароль?</span>
          <button type="submit"
                  :disabled="!phone && !password"
                  :class="!phone && !password ?'disabled': ''"
                  @click="login"
                  class="login_btn"
          >
            Войти
          </button>
          <p class="reg_text">Еще нет аккаунта? <span><router-link to="/registration">Регистрация</router-link></span></p>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/organisms/Header";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      phone: "",
      password: "",
      errors: [],
      error: false,
    }
  },
  methods: {
    login() {
      this.errors = []
      if(this.fromFilled === 'password') {
        if(!this.password) {
          this.errors.push("Неверный пароль !")
        }
        if(!this.validPassword(this.password)) {
          this.errors.push("Пароль должен состоять минимум из 6 символов или Неверный пароль !")
        }
        if(!this.errors.length) {
          this.$store.dispatch("loginUser", { phone: this.phone, password: this.password});
        }
        console.log(this.errors)
      }
      else {
        //
        // if(!this.validEmail(this.email)) {
        //   this.errors.push("Требуется действительный адрес электронной почты !")
        // }
        if(!this.errors.length){
          this.fromFilled = 'password';
        }
        console.log(this.errors)
      }
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword: function (password) {
      const containsUppercase = /[A-Z]/.test(password)
      const containsLowercase = /[a-z]/.test(password)
      const containsNumber = /[0-9]/.test(password)
      const minLenght = password.length > 6
      return containsUppercase && containsLowercase && containsNumber && minLenght
    },

  },

}
</script>

<style lang="scss" scoped>
section.container {
  height: 100%;
  display: flex;
  justify-items: center;
  margin-top: 100px;

}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login_form{
  width: 400px;
  height: 45%;
  padding: 40px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
}
.login_form form {
  display: flex;
  flex-direction: column;
}
.login_title {
  text-align: center;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #00AADE;
}
input {
  padding: 20px 26px;
  margin-bottom: 20px;
  background: #FFFFFF;
  border: 1px solid #D6D6D6;
  box-sizing: border-box;
  border-radius: 11px;
  font-size: 20px;
  outline-color: #00AADE;
}
input::placeholder {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #D6D6D6;
}
.email {
}
.forget_password {
  font-weight: 400;
  font-size: 15px;
  line-height: 149.7%;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  cursor: pointer;
  margin-bottom: 20px;
  color: #00AADE;

  text-align: right;
}
.reg_text {
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #8E8D8D;
  text-align: center;
}
.reg_text span a{
  text-decoration: none;
  color: #00AADE;
}
.login_btn {
  margin: 0 auto;
  background: #00AADE;
  cursor: pointer;
  border-radius: 22px;
  border: none;
  outline: none;
  width: 214px;
  padding: 10px 80px;
  font-weight: 400;
  font-size: 18px;
  line-height: 149.7%;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #FAFAFA;
}
.login_btn.disabled {
  background-color: #7C7C7C;
}

@media screen and (max-width: 600px) {
  .login_form {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
  }
  .login_form form {
    width: 90%;
  }
}
</style>