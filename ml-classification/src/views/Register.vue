<template>
<div>
    <main>
        <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div class="d-flex justify-content-center py-4">
                                <a href="index.html" class="logo d-flex align-items-center w-auto">
                                    <img src="../assets/img/logo.png" alt="">
                                    <span class="d-none d-lg-block">Machine Learning Project</span>
                                </a>
                            </div><!-- End Logo -->

                            <div v-if="errorList" style="color: red;">{{ errorList }}</div>
                            <section v-if="successMessage">
                                <div class="container">
                                    <div class="alert alert-success">
                                        {{ successMessage }}
                                    </div>
                                </div>
                            </section>
                            <div class="card mb-3">

                                <div class="card-body">
                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                                        <p class="text-center small">Enter your personal details to create account</p>
                                    </div>

                                    <div v-if="isLoading">
                                        <Spinner />
                                    </div>
                                    <form class="row g-3 " @submit.prevent="submitForm">
                                        <div class="col-12">
                                            <label for="yourName" class="form-label">Your Name</label>
                                            <input type="text" v-model="model.user.username" class="form-control" id="yourName">
                                            <div v-if="errorList.name" style="color: red;">{{ errorList.username[0] }}</div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourEmail" class="form-label">Your Email</label>
                                            <input type="email" v-model="model.user.email" class="form-control" id="yourEmail">
                                            <div v-if="errorList.email" style="color: red;">{{ errorList.email[0] }}</div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Password</label>
                                            <input type="password" v-model="model.user.password" class="form-control" id="yourPassword">
                                            <div v-if="errorList.password" style="color: red;">{{ errorList.password[0] }}</div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Confirm Password</label>
                                            <input type="password" v-model="model.user.password_confirmation" class="form-control" id="password_confirmation">
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">Create Account</button>
                                        </div>
                                        <div class="col-12">
                                            <p class="small mb-0">Already have an account? <router-link to="/login">Log in</router-link>
                                            </p>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </div>
    </main><!-- End #main -->
</div>
</template>

    
<script>
import axios from '../axios'
import Spinner from '../components/common/Spinner.vue'

export default {
    name: 'Register',

    data() {
        return {
            isLoading: false,
            successMessage: '',
            errorList: '',
            model: {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        }
    },
    components: {
        Spinner
    },
    methods: {
        async submitForm() {
            var mythis = this;

            try {
                if (this.model.user.password !== this.model.user.password_confirmation) {
                    this.errorList = "Passwords do not match";
                    return false;
                }

                this.isLoading = true;
                const res = await axios.post('/auth/register', this.model.user);
                this.isLoading = false;
                this.model.user = { ...this.model.user }; // Use spread operator for object copying
                this.errorList = '';
                this.successMessage = "Registration Successful";
                this.$router.push({ name: 'Login' });
            } catch (error) {
                if (error.response) {
                    if (error.response.status == 400) {
                        this.isLoading = false;
                        console.log(error.response.data.message);
                        mythis.errorList = error.response.data.message;
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        }

    }
}
</script>

    
<style>
    </style>
