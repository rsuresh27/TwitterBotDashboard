<template>
    <div v-if=tweet>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand di>NavBar</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item router-link to="/dashboard">Dashboard</b-nav-item>
                        <b-nav-item router-link to="/create-tweet">Create Tweet</b-nav-item>
                        <b-nav-item href="#">Detailed Metrics</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <router-view />
        </div>
        <b-container fluid style="padding: 50px; ">
            <b-row>
                <b-col sm="5" style="margin-right: 50px; ">
                    <table class="col-md-12">
                        <caption>Metrics for tweet {{ tweet["id"] }}</caption>
                        <thead>
                            <tr>
                                <th>Impressions</th>
                                <th>Profile Clicks</th>
                                <th>Retweets</th>
                                <th>Likes</th>
                                <th>Replies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ tweet["organic_metrics"]["impression_count"] }}</td>
                                <td>{{ tweet["organic_metrics"]["user_profile_clicks"] }}</td>
                                <td>{{ tweet["organic_metrics"]["retweet_count"] }}</td>
                                <td>{{ tweet["organic_metrics"]["like_count"] }}</td>
                                <td>{{ tweet["organic_metrics"]["reply_count"] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col sm="5">
                    <b-row>
                        Tweet Body:
                    </b-row>
                    <b-row>
                        {{ tweet["text"] }}
                    </b-row>
                </b-col>                
            </b-row>
            <b-row style="margin-top: 10px; ">
                <b-col sm="1">
                    <b-button v-on:click=deleteTweet class="btn form-control">Delete Tweet</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'tweet-metrics',
        data() {
            return {
                tweet: null,
            };
        },
        mounted() {
            this.tweet = this.$route.params.tweet;
        },
        methods: {
            deleteTweet() {
                axios.delete(`http://localhost:1338/tweet/${this.tweet["id"]}`).then(response => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);                  
                });
            }
        }
    };

</script>

<style scoped>
    th {
        background: #343a40;
        color: white;
    }

    td {
        border: 1px solid #343a40;
    }

    caption {
        caption-side: top;
    }
</style>