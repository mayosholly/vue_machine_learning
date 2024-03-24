<template>
<div>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1>Gold Prediction</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="">Home</a></li>
                    <li class="breadcrumb-item active">Gold Prediction with Logistic Regression</li>
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
                                <h5 class="card-title">Machine Learning Gold Prediction using Logistic Regression</h5>

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
                                            <input type="number" class="form-control" id="Open" step="0.01" v-model="model.gold.Open" placeholder="Open">
                                            <label for="Open">Open</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" step="0.01" v-model="model.gold.High" id="sex" placeholder="High">
                                            <label for="High">High</label>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="number" class="form-control" step="0.01" v-model="model.gold.Low" id="Low" placeholder="Low">
                                            <label for="Low">Low</label>
                                        </div>
                                    </div>
                       

                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary mx-2">Submit</button>
                                        <button type="reset" class="btn btn-secondary">Reset</button>
                                    </div>

                                    <div v-if="prediction !== null">
                                        <p>Based on the given parameters:</p>
                                        <h3>The Closing Price Prediction of Gold is: {{ prediction }}</h3>
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
    name: 'GoldLn',
    data() {
        return {
            successMessage: '',
            isLoading: false,
            errorList: '',
            prediction: '',
            model: {
                gold: {
                    Open: 0,
                    High: 0,
                    Low: 0,
                }
            }
        }
    },
    components: {
        Spinner
    },
    methods: {
        async submitForm() {
            console.log(this.model.gold);

            try {
                this.isLoading = true;
                const response = await axios.post('/predict-gold-ln', this.model.gold)
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
