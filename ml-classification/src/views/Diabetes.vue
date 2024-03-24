<template>
<div>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1>Diabetes Prediction</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active">Diabetes Prediction</li>
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
                                <h5 class="card-title">Machine Learning Diabetes Prediction</h5>

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
                                            <input type="number" class="form-control" id="Pregnancies" v-model="model.diabetes.Pregnancies" placeholder="Pregnancies">
                                            <label for="Pregnancies">Pregnancies</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.Glucose" id="Glucose" placeholder="Glucose">
                                            <label for="Glucose">Glucose</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.BloodPressure" id="Blood Pressure" placeholder="Blood Pressure">
                                            <label for="Blood Pressure">Blood Pressure</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.SkinThickness" id="Skin Thickness" placeholder="Skin Thickness">
                                            <label for="Skin Thickness">Skin Thickness</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.Insulin" id="Insulin" placeholder="Insulin">
                                            <label for="Insulin">Insulin</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.BMI" id="floatingPassword" placeholder="Password">
                                            <label for="floatingPassword">BMI</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.DiabetesPedigreeFunction" id="Diabetes Pedigree Function" placeholder="Diabetes Pedigree Function">
                                            <label for="Diabetes Pedigree Function">Diabetes Pedigree Function</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" v-model="model.diabetes.Age" id="Age" placeholder="Age">
                                            <label for="Age">Age</label>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary mx-2">Submit</button>
                                        <button type="reset" class="btn btn-secondary">Reset</button>
                                    </div>

                                    <div v-if="prediction !== null">
                                        <p>Based on the given parameters:</p>
                                        <h3>Diabetes Prediction: {{ prediction === 1 ? 'Positive' : (prediction === 0 ? 'Negative' : '') }}</h3>
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
    name: 'Diabetes',
    data() {
        return {
            successMessage: '',
            isLoading: false,
            errorList: '',
            prediction: '',
            model: {
                diabetes: {
                    Pregnancies: 0,
                    Glucose: 0,
                    BloodPressure: 0,
                    SkinThickness: 0,
                    Insulin: 0,
                    BMI: 0,
                    DiabetesPedigreeFunction: 0,
                    Age: 0
                }
            }
        }
    },
    components: {
        Spinner
    },
    methods: {
        async submitForm() {
            console.log(this.model.diabetes);

            try {
                this.isLoading = true;
                const response = await axios.post('/predict-dibetics', this.model.diabetes)
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
