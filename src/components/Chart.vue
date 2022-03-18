<script>
    import { Line } from 'vue-chartjs';

    export default {
        extends: Line,
        props: {
            labels: Array,
            data: Array
        },
        mounted() {

            this.renderChart({ labels: this.labels, datasets: [{ label: 'Impressions', data: this.data }] });
        }
    };
</script>