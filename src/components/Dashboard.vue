<template>
    <div class="dashboard">
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
        <h1 style="padding: 5px">Twitter Bot Dashboard</h1>
        <div style="padding: 5px;">
            <input v-model="tweetIDFilter" placeholder="Filter table by tweet ID">
        </div>
        <div class="col-md-7" style="overflow: scroll; height: 700px;">
            <table class="table" style="position: relative">
                <thead>
                    <tr>
                        <th v-on:click="sort('id')">Tweet ID</th>
                        <th v-on:click="sort('impression_count')">Impressions</th>
                        <th v-on:click="sort('user_profile_clicks')">Profile Clicks</th>
                        <th v-on:click="sort('retweet_count')">Retweets</th>
                        <th v-on:click="sort('like_count')">Likes</th>
                        <th v-on:click="sort('reply_count')">Replies</th>
                        <th>Tweet Body</th>
                    </tr>
                </thead>
                <tbody v-for="metric in filteredAndSortedMetrics" v-bind:key="metric.id">
                    <tr>
                        <td><router-link :to="{ name: 'tweet-metrics', params: { tweet: {...metric} }}">{{ metric["id"] }}</router-link></td>
                        <td>{{ metric["organic_metrics"]["impression_count"] }}</td>
                        <td>{{ metric["organic_metrics"]["user_profile_clicks"] }}</td>
                        <td>{{ metric["organic_metrics"]["retweet_count"] }}</td>
                        <td>{{ metric["organic_metrics"]["like_count"] }}</td>
                        <td>{{ metric["organic_metrics"]["reply_count"] }}</td>
                        <td>{{ metric["text"] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="chart" v-if="dataLoaded">
            <Chart v-bind:labels="tweetIDs" v-bind:data="tweetImpressions" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Chart from './Chart.vue';

    export default {
        name: 'Dashboard',
        components: {
            Chart
        },
        props: {
            msg: String
        },
        data() {
            return {
                metrics: [],
                currentSort: 'id',
                currentSortOrder: 'desc',
                tweetIDFilter: '',
                tweetIDs: [],
                tweetImpressions: [],
                dataLoaded: false
            };
        },
        methods: {
            sort: function (s) {
                if (s == this.currentSort) {
                    this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = s;
            }
        },
        computed: {
            filteredAndSortedMetrics: function () {
                return this.metrics.filter(tweet => tweet["id"].includes(this.tweetIDFilter)).sort((a, b) => {
                    if (this.currentSort != 'id') {
                        a = a["organic_metrics"];
                        b = b["organic_metrics"];
                    }
                    let modifier = 1;
                    if (this.currentSortOrder === 'desc') modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                });
            }
        },
        mounted() {
            //api call
            axios.get("http://localhost:1338/metrics").then(response => {
                this.metrics = response.data;
                for (var i = 0; i < response.data.length; i++) {
                    this.tweetIDs.push(response.data[i]["id"]);
                    this.tweetImpressions.push(response.data[i]["organic_metrics"]["impression_count"]);
                }
                this.dataLoaded = true;
            });
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    th {
        background: #343a40;
        color: white;
        position: sticky;
        top: 0;
    }

    #row {
        padding: 10px;
    }
</style>

