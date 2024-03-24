<template>
<div>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1>Heart Disease Prediction</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active">Heart Disease Prediction</li>
                </ol>
            </nav>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">

                <!-- Left side columns -->
                <div class="col-lg-12">
                    <div class="row">

                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Machine Learning Heart Disease Prediction</h5>

                                <div v-if="isLoading">
                                    <Spinner />
                                </div>
                                <section v-if="successMessage">
                                    <div class="container">
                                        <div class="alert alert-success">
                                            {{ successMessage }}
                                        </div>
                                    </div>
                                </section>
                                <!-- Floating Labels Form -->
                                <form class="row g-3" @submit.prevent="submitForm">

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="age" v-model="model.heart.age" placeholder="Age">
                                            <label for="age">Age</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.sex" id="sex" placeholder="Sex">
                                            <label for="sex">Sex</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.cp" id="cp" placeholder="CP">
                                            <label for="cp">CP</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.trestbps" id="trestbps" placeholder="Trestbps">
                                            <label for="trestbps">Trestbps</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.chol" id="chol" placeholder="Chol">
                                            <label for="chol">Chol</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.fbs" id="floatingPassword" placeholder="FBS">
                                            <label for="floatingPassword">FBS</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.restecg" id="restecg" placeholder="Restecg">
                                            <label for="restecg">Restecg</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.thalach" id="thalach" placeholder="Thalach">
                                            <label for="thalach">Thalach</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.exang" id="exang" placeholder="Exang">
                                            <label for="exang">Exang</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.oldpeak" id="oldpeak" placeholder="Oldpeak">
                                            <label for="oldpeak">Oldpeak</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.slope" id="slope" placeholder="Slope">
                                            <label for="slope">Slope</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.ca" id="ca" placeholder="CA">
                                            <label for="ca">CA</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.heart.thal" id="thal" placeholder="Thal">
                                            <label for="thal">Thal</label>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary mx-2">Submit</button>
                                        <button type="reset" class="btn btn-secondary">Reset</button>
                                    </div>

                                    <div v-if="prediction !== null">
                                        <p>Based on the given parameters:</p>
                                        <h3>Heart Disease Prediction: {{ prediction === 1 ? 'Positive' : (prediction === 0 ? 'Negative' : '') }}</h3>
                                    </div>

                                </form><!-- End floating Labels Form -->

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </main>
</div>
</template>

<script>
import axios from '../axios'
import Spinner from '../components/common/Spinner.vue'

export default {
    name: 'Heart',
    data() {
        return {
            successMessage: '',
            isLoading: false,
            errorList: '',
            prediction: '',
            model: {
                heart: {
                    age: 0,
                    sex: 0,
                    cp: 0,
                    trestbps: 0,
                    chol: 0,
                    fbs: 0,
                    restecg: 0,
                    thalach: 0,
                    exang: 0,
                    oldpeak: 0,
                    slope: 0,
                    ca: 0,
                    thal: 0,
                }
            }
        }
    },
    components: {
        Spinner
    },
    methods: {
        async submitForm() {
            console.log(this.model.heart);

            try {
                this.isLoading = true;
                const response = await axios.post('/predict-heart', this.model.heart)
                console.log(response.data.prediction)
                this.prediction = response.data.prediction;
                this.successMessage = "Prediction Successfull"
                this.isLoading = false;
                setTimeout(() => {
                    this.successMessage = '';
                }, 5000);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.isLoading = false;
                        console.log(error.response);

                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }
        },

    }
}
</script>

<style>
    </style>
