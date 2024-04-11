<script>
import RequestItem from '@/components/requests/RequestItem.vue';

export default {
  name: 'RequestsReceived',
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    }
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadRequests() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('requests/loadRequests');
      } catch (e) {
        this.error = e.message || 'Something went wrong!';
      }

      this.isLoading = false;
    }
  },
  created() {
    this.loadRequests();
  }
};
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <ul v-else-if="hasRequests">
          <request-item
            v-for="request in receivedRequests"
            :email="request.userEmail"
            :message="request.message"
            :key="request.id"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>