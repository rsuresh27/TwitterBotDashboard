<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand di>NavBar</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item router-link to="/dashboard">Dashboard</b-nav-item>
                    <b-nav-item router-link to="/create-tweet">Create Tweet</b-nav-item>
                    <b-nav-item href="/advanced-metrics">Detailed Metrics</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-container fluid style="padding: 50px; ">
            <b-row>
                <b-col>
                    <b-row id="row">
                        <label for="textarea">New Tweet:</label>
                    </b-row>
                    <b-row id="row">
                        <b-col sm="10">
                            <b-form-textarea v-model="tweetBody" id="textarea"
                                             placeholder="New Tweet..."></b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-row id="row">
                        <b-col sm="10">
                            <b-button v-on:click=tweet class="btn form-control">Tweet</b-button>
                            <p style="padding: 15px; text-align: center" v-if="successfullyTweeted">Tweet Successfully Posted<button style="margin-left: 4px" variant="outline-primary" v-on:click=clearTweetMessage>x</button></p>
                            <p style="padding: 15px; text-align: center" v-if="tweetFailed">Failed To Post Tweet<button style="margin-left: 4px" variant="outline-primary" v-on:click=clearTweetMessage>x</button></p>
                            <p style="padding: 15px; text-align: center" v-if="tweetFailed">{{ tweetErrorMessage }}</p>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <b-row id="row">
                        <label for="tweetBody">Tweet Preview</label>
                    </b-row>
                    <b-row>
                        <p style="white-space: pre;">{{ tweetBody }}</p>
                    </b-row>
                </b-col>
            </b-row>


        </b-container>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'create-tweet',
        data() {
            return {
                tweetBody: '',
                tweetErrorMessage: '',
                successfullyTweeted: false,
                tweetFailed: false
            };
        },
        methods: {
            tweet() {
                console.log(this.tweetBody);

                axios.post("http://localhost:1338/tweet", { "tweetBody": this.tweetBody }).then(response => {
                    console.log(response.data);
                    if (response.status == 200) {
                        this.successfullyTweeted = true;
                        this.tweetBody = ''
                    }

                }).catch((error) => {
                    console.log(error);
                    this.tweetFailed = true;
                    this.tweetErrorMessage = error.data; 
                });
            },
            clearTweetMessage() {
                if (this.successfullyTweeted) {
                    this.successfullyTweeted = !this.successfullyTweeted;
                }
                if (this.tweetFailed) {
                    this.tweetFailed = !this.tweetFailed; 
                }

            }
        },
        mounted() {
            console.log(this.$route.params); 
        }
    };
</script>

<style scoped>
    #row {
        padding: 10px;
    }
</style>