<template>
    <div>
    
        <main id="main" class="main">
    
            <div class="pagetitle">
                <h1>Orchid Prediction</h1>
                <nav>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="">Home</a></li>
                        <li class="breadcrumb-item active">Orchid Prediction</li>
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
                                    <h5 class="card-title">Machine Learning Orchid Prediction</h5>
    
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
    
                                        <div class="col-md-12">
                                <div class="form-floating ">
                                    <input type="file" class="form-control" @change="handleFileChange" accept="image/**">
                                    <label for="floatingName">File Upload</label>
                                    <div v-if="errorList.file" style="color: red;">{{ errorList.file[0] }}</div>
                                </div>
                                <div class="text-center">
                                    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" style="max-width: 200px; margin-top: 10px;">

                                </div>
                            </div>
                                       
                           
    
                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary mx-2">Submit</button>
                                            <button type="reset" class="btn btn-secondary">Reset</button>
                                        </div>
    
                                        <div v-if="prediction !== null">
                                            <h3>The Predicted Orchid Classification class is: {{ prediction }}</h3>
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
        name: 'Orchid',
        data() {
            return {
                successMessage: '',
                isLoading: false,
                errorList: '',
                prediction: '',
                image: null, // Rename 'file' to 'image'
            imageUrl: null,
            }
        },
        components: {
            Spinner
        },
        methods: {
            handleFileChange(e) {
            const file = e.target.files[0]
            this.image = file

            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                }
                reader.readAsDataURL(file)
            }
        },

            async submitForm() {
                const formData = new FormData();
                formData.append("file", this.image);
    
                try {
                    this.isLoading = true;
                    const response = await axios.post('/predict_orchid',  formData)
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
    